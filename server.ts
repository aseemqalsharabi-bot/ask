import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { readFileSync } from "fs";
import { EnterpriseAgent } from "./src/lib/EnterpriseAgent";
import { doc, getDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let db: any = null;
let cachedContext: string | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes cache

try {
  const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
  try {
    const firebaseConfig = JSON.parse(readFileSync(firebaseConfigPath, 'utf8'));
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    console.log("Firebase connected");
  } catch(e) {
    console.error("Firebase config missing or invalid", e);
  }
} catch (e) {
  console.error("Firebase Init Failed:", e);
}

async function getStoreContext() {
  if (!db) return "متجر عاصم لتقنية الشبكات متخصص في الأنتينا والراوترات المعدلة.";
  
  const now = Date.now();
  if (cachedContext && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedContext;
  }

  try {
    const uiRef = doc(db, 'settings', 'ui');
    const productsRef = collection(db, 'products');
    const [uiSnap, productsSnap] = await Promise.all([getDoc(uiRef), getDocs(productsRef)]);
    const products = productsSnap.docs.map(d => d.data());
    const ui = uiSnap.exists() ? uiSnap.data() : {};
    
    let text = `اسم المتجر: ${ui.heroTitle || 'متجر عاصم لتقنية الشبكات'}. الرقم: ${ui.whatsappNumber || 'غير متوفر'}.\nالمنتجات:\n`;
    products.forEach(p => text += `- ${p?.name}: السعر ${p?.price} ريال.\n`);
    
    cachedContext = text;
    lastCacheTime = now;
    
    return text;
  } catch (e) {
    return cachedContext || "متجر عاصم لتقنية الشبكات.";
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON body parser for APIs
  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY || '';
  const agent = new EnterpriseAgent(apiKey);

  // API Route for the AI Bot
  app.all("/api/botWebhook", async (req, res) => {
    // Health check for Make.com / Meta
    if (req.method === 'GET') {
      return res.status(200).send('OK');
    }

    if (req.method === 'POST') {
      try {
        const { message, userId, feedback, conversationHistory } = req.body;

        if (feedback && message) {
            await agent.learn(feedback as '👍' | '👎', message, req.body.response || '');
            return res.status(200).json({ success: true, memoryUpdated: true });
        }

        if (message) {
            const context = await getStoreContext();
            const { reply, confidence, quickReplies } = await agent.generateResponse(message, context, userId, conversationHistory || []);
            return res.status(200).json({ reply, confidence, quickReplies, memoryUpdated: false });
        }

        return res.status(400).json({ error: "Missing message" });
      } catch (error) {
        console.error("WEBHOOK_FAIL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  // ==========================================
  // DIRECT META (INSTAGRAM/MESSENGER) WEBHOOK
  // ==========================================

  // 1. Verify Webhook (GET)
  app.get("/api/meta-webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken = process.env.META_VERIFY_TOKEN;

    if (mode && token) {
      if (mode === "subscribe" && token === verifyToken) {
        console.log("META_WEBHOOK_VERIFIED");
        return res.status(200).send(challenge);
      } else {
        return res.sendStatus(403);
      }
    }
    return res.status(400).send("Invalid Request");
  });

  // 2. Receive Messages (POST)
  app.post("/api/meta-webhook", async (req, res) => {
    const body = req.body;

    // Meta requires immediate 200 OK response
    res.status(200).send("EVENT_RECEIVED");

    if (body.object === "page" || body.object === "instagram") {
      try {
        for (const entry of body.entry) {
          const webhookEvent = entry.messaging?.[0];
          
          if (webhookEvent && webhookEvent.message && webhookEvent.message.text) {
            const senderPsid = webhookEvent.sender.id;
            const userMessage = webhookEvent.message.text;

            console.log(`Received msg from Meta User ${senderPsid}: ${userMessage}`);

            // Get Context and AI Response
            const context = await getStoreContext();
            
            // Generate AI Response
            const { reply, quickReplies } = await agent.generateResponse(userMessage, context, senderPsid, []);

            // Send reply directly back to Meta
            await sendMetaMessage(senderPsid, reply, quickReplies);
          }
        }
      } catch (error) {
        console.error("Error processing Meta webhook:", error);
      }
    }
  });

  // Helper method to shoot messages to Graph API
  async function sendMetaMessage(recipientId: string, text: string, quickReplies?: string[]) {
    const PAGE_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
    if (!PAGE_ACCESS_TOKEN) {
      console.error("META_PAGE_ACCESS_TOKEN is missing in env vars!");
      return;
    }

    const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    
    // Build quick replies if any
    let formattedQuickReplies: any[] | undefined = undefined;
    if (quickReplies && quickReplies.length > 0) {
        formattedQuickReplies = quickReplies.map(qr => ({
            content_type: "text",
            title: qr,
            payload: "QR_" + qr.toUpperCase().replace(/\s+/g, '_')
        }));
    }

    const payload: any = {
      recipient: { id: recipientId },
      message: { text: text }
    };

    if (formattedQuickReplies) {
        payload.message.quick_replies = formattedQuickReplies;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json() as any;
      if (data.error) {
        console.error("Meta Graph API Error:", data.error);
      } else {
        console.log("Successfully sent reply to Meta User");
      }
    } catch (err) {
      console.error("Failed to send HTTP request to Meta Graph API", err);
    }
  }

  // Vite middleware for development or Static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

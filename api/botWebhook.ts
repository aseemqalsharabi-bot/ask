import { readFileSync } from 'fs';
import path from 'path';
import { EnterpriseAgent } from '../src/lib/EnterpriseAgent';
import { doc, getDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';

// Pre-initialize Firebase and Cache
let db: any = null;
let cachedContext: string | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes cache

try {
  const firebaseConfig = JSON.parse(readFileSync(path.join(process.cwd(), 'firebase-applet-config.json'), 'utf8'));
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
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
    products.forEach(p => text += `- ${p.name}: السعر ${p.price} ريال.\n`);
    
    cachedContext = text;
    lastCacheTime = now;
    
    return text;
  } catch (e) {
    return cachedContext || "متجر عاصم لتقنية الشبكات.";
  }
}

export default async function handler(req: any, res: any) {
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !req) return;
  // Setup the AI Agent
  const apiKey = process.env.GEMINI_API_KEY || '';
  const agent = new EnterpriseAgent(apiKey);

  if (req.method === 'GET') {
    // Make.com or Meta health check
    return res.status(200).send('OK');
  }

  if (req.method === 'POST') {
    try {
      const { message, userId, feedback, conversationHistory } = req.body;

      if (feedback && message) {
        // Feedback loop triggered from UI or Make.com
        await agent.learn(feedback as '👍' | '👎', message, req.body.response || '');
        return res.status(200).json({ success: true, memoryUpdated: true });
      }

      if (message) {
        const context = await getStoreContext();
        const { reply, confidence } = await agent.generateResponse(message, context, userId, conversationHistory || []);
        return res.status(200).json({ reply, confidence, memoryUpdated: false });
      }

      return res.status(400).json({ error: "Missing message" });
    } catch (error) {
      console.error("WEBHOOK_FAIL:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// import fs from 'fs/promises';
import path from 'path';
import { GoogleGenAI } from "@google/genai";

const MEMORY_FILE = path.join(process.cwd(), 'memory.json');
const LOGS_FILE = path.join(process.cwd(), 'logs.json');

// In a real Vercel environment, /tmp/ is writable. For standard node/local, process.cwd() is fine.
// We wrap fs operations in try/catch to simulate safely.

export class EnterpriseAgent {
  private ai: GoogleGenAI;
  
  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  private async readJsonFile(filePath: string, defaultData: any) {
    // try {
    //   const data = await fs.readFile(filePath, 'utf8');
    //   return JSON.parse(data);
    // } catch {
      return defaultData;
    // }
  }

  private async writeJsonFile(filePath: string, data: any) {
    // try {
    //   await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    // } catch (e) {
      console.warn('Simulation: Could not persist to disk, running in memory only');
    // }
  }

  public async analyzeSentiment(text: string) {
    const negativeWords = ['سيء', 'زفت', 'غصب', 'مشتهي', 'تعبان', 'مريض', 'بطيء', 'غالي', 'زعلان', 'قهر'];
    const positiveWords = ['ممتاز', 'شكرا', 'روعة', 'عاش', 'وحش', 'كفو', 'احسن', 'طيب', 'حلو'];
    
    let score = 0;
    for (const w of negativeWords) if (text.includes(w)) score--;
    for (const w of positiveWords) if (text.includes(w)) score++;

    if (score < 0) return 'negative';
    if (score > 0) return 'positive';
    return 'neutral';
  }

  public async learn(feedback: '👍' | '👎', message: string, response: string) {
    const memory = await this.readJsonFile(MEMORY_FILE, { interactions: [] });
    
    memory.interactions.push({
      timestamp: new Date().toISOString(),
      message,
      response,
      feedback,
      sentiment: await this.analyzeSentiment(message)
    });

    // Keep memory bounded
    if (memory.interactions.length > 500) {
      memory.interactions = memory.interactions.slice(-500);
    }

    await this.writeJsonFile(MEMORY_FILE, memory);
    return true;
  }

  public async reviewNegativeFeedback() {
    const memory = await this.readJsonFile(MEMORY_FILE, { interactions: [] });
    const negative = memory.interactions.filter((i: any) => i.feedback === '👎');
    return negative.length > 0 ? "يوجد ردود سلبية تحتاج مراجعة المهندس" : "الأداء ممتاز، لا توجد شكاوي مسجلة.";
  }

  public async escalateToHuman(userId: string) {
    const logs = await this.readJsonFile(LOGS_FILE, { urgent: [] });
    logs.urgent.push({ userId, timestamp: new Date().toISOString() });
    await this.writeJsonFile(LOGS_FILE, logs);
    return "تم تحويل المحادثة للمهندس عاصم، سيرد عليك في أقرب وقت.";
  }

  public async generateResponse(userMessage: string, context: string, userId: string = 'guest', history: any[] = []) {
    const sentiment = await this.analyzeSentiment(userMessage);

    // Contextual rules based on sentiment
    let moodGuideline = '';
    if (sentiment === 'negative') {
      moodGuideline = 'العميل منزعج أو يشتكي. قدم حلاً والمشكلة، ولا ترحب به مجدداً.';
      // Escalate if word suggests extreme anger
      if (userMessage.includes('مدير') || userMessage.includes('شكوى')) {
        await this.escalateToHuman(userId);
      }
    } else if (sentiment === 'positive') {
      moodGuideline = 'العميل سعيد أو يشكر. تفاعل بود وشكره على ثقته بدون تطويل.';
    } else {
      moodGuideline = 'جاوب بشكل مباشر وعملي بدون ترحيب متكرر.';
    }

    const systemInstruction = `أنت "م. عاصم" مهندس وخبير شبكات 5G ومؤسس متجر عاصم لتقنية الشبكات. 
ردودك يجب أن تكون:
1. سعودية بيضاء دافئة ومختصرة جداً.
2. لا تذكر أبداً أنك ذكاء اصطناعي.
3. ركز على المشكلة! اقترح أفضل منتج لحل المشكلة إذا لزم الأمر، وإذا سأل العميل عن منتج أو أبدى رغبة، أعطه خيارات سريعة.
4. هام جداً بخصوص الطلبات: لا يوجد سلة دفع إلكترونية! إذا قرر العميل الشراء، قم بتجميع طلبه ووجهه للواتساب للتأكيد (966559228957).
5. لا تكرر السلام والترحيب باستمرار.
6. ${moodGuideline}

التعليمات التقنية:
يجب أن يكون ردك حصرياً بصيغة JSON وفق هذا الهيكل:
{
  "reply": "نص الرد هنا (سطرين كحد أقصى)",
  "quickReplies": ["طلب أنتينا", "التحدث مع المهندس"] // قائمة نصوص من 0 إلى 3 خيارات سريعة بناءً على السياق للعميل ليختار منها
}

سياق المتجر:
الضمان سنتان ذهبي، استرجاع 14 يوم، شحن 3-5 أيام.
${context}`;

    try {
        const contents = [];
        
        // Add conversation history to maintain memory
        if (history && Array.isArray(history)) {
            for (const msg of history) {
                if (msg.role && msg.content) {
                    contents.push({
                        role: msg.role === 'bot' || msg.role === 'model' ? 'model' : 'user',
                        parts: [{ text: msg.content }]
                    });
                }
            }
        }
        
        contents.push({ role: 'user', parts: [{ text: userMessage }] });

        const response = await this.ai.models.generateContent({
        model: "gemini-3.1-flash-preview", 
        contents: contents,
        config: {
            systemInstruction,
            temperature: 0.5,
            responseMimeType: "application/json",
            maxOutputTokens: 250
        }
        });

        const rawText = response.text || "{}";
        let parsed = { reply: "أبشر، بحلها لك. تواصل معي واتساب وأنا أخدمك.", quickReplies: [] };
        
        try {
            parsed = JSON.parse(rawText);
        } catch (err) {
            console.error("Failed to parse AI JSON:", rawText);
        }

        const reply = parsed.reply || "أبشر، تواصل معي واتساب وأنا أخدمك.";
        const quickReplies = Array.isArray(parsed.quickReplies) ? parsed.quickReplies.slice(0, 3) : [];
        
        // Log the interaction
        const logs = await this.readJsonFile(LOGS_FILE, { history: [] });
        logs.history.push({ userId, message: userMessage, reply, timestamp: new Date().toISOString() });
        if (logs.history.length > 500) logs.history = logs.history.slice(-500);
        await this.writeJsonFile(LOGS_FILE, logs);

        return { reply, confidence: 0.95, quickReplies };
    } catch (e) {
        console.error("AI Gen error", e);
        return { reply: "أبشر، تواصل معي واتساب وأنا أخدمك بخصوص مشكلتك.", confidence: 0.5, quickReplies: [] };
    }
  }
}

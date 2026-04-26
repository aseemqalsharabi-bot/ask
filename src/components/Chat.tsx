import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ThumbsUp, ThumbsDown, User, Bot, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    sender: 'bot',
    text: 'حياك الله في متجر عاصم لتقنية الشبكات، معاك المهندس عاصم. تفضل كيف أقدر أخدمك؟',
    timestamp: new Date().toISOString()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendText = async (userText: string) => {
    if (!userText.trim()) return;

    setInput('');
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: userText, timestamp: new Date().toISOString() }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/botWebhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userText, 
          userId: 'web-user',
          conversationHistory: messages.map(m => ({ role: m.sender, content: m.text }))
        })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: data.reply || 'عذراً، صار في مشكلة بالاتصال. كلمني واتساب أحسن.', 
        timestamp: new Date().toISOString(),
        quickReplies: data.quickReplies || []
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        sender: 'bot', 
        text: 'عذراً، النظام مشغول حالياً. تقدر تتواصل معي واتساب مباشرة.', 
        timestamp: new Date().toISOString() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    handleSendText(input);
  };

  const handleFeedback = async (msgId: string, type: '👍' | '👎', userMsgText: string, botResponseText: string) => {
    try {
      await fetch('/api/botWebhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: type, message: userMsgText, response: botResponseText })
      });
      alert(type === '👍' ? 'شكراً لتقييمك الإيجابي، هذا يسعدنا!' : 'نعتذر عن ذلك، تم تسجيل ملاحظتك لتطوير أداء المهندس.');
    } catch (e) {
      // ignore
    }
  };

  const handleHumanRequest = () => {
    window.open('https://wa.me/966559228957', '_blank');
  };

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-12 bg-brand-neutral min-h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl flex-grow flex flex-col bg-brand-primary/40 md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-brand-primary p-4 border-b border-white/10 flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center shadow-lg shadow-brand-accent/20">
                <span className="text-brand-primary font-black text-xl">ع</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-brand-primary"></span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">م. عاصم للشبكات</h1>
              <span className="text-green-400 text-xs font-medium">متصل الآن - خدمة عملاء ذكية</span>
            </div>
          </div>
          <button 
            onClick={handleHumanRequest}
            className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-xl transition-colors border border-white/10 flex items-center gap-1.5"
          >
            <HelpCircle size={14} />
            <span className="hidden sm:inline">تحويل لموظف</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide flex flex-col">
          <AnimatePresence initial={false}>
            {messages.map((m, index) => {
              const previousMsg = index > 0 ? messages[index - 1] : null;
              const isBot = m.sender === 'bot';
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex max-w-[85%] md:max-w-[75%] gap-2.5 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                    
                    {/* Avatar */}
                    <div className="shrink-0 mt-auto">
                      {isBot ? (
                        <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/10">
                          <Bot size={16} className="text-brand-primary" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <User size={16} className="text-white/60" />
                        </div>
                      )}
                    </div>

                    {/* Bubble */}
                    <div className="flex flex-col gap-1">
                      <div className={`p-3.5 rounded-2xl md:text-[15px] text-sm leading-relaxed ${
                        isBot 
                          ? 'bg-white/10 backdrop-blur-md text-white border border-white/5 rounded-br-sm shadow-sm' 
                          : 'bg-brand-accent text-brand-primary rounded-bl-sm shadow-md font-medium'
                      }`}>
                        {m.text}
                      </div>

                      {/* Feedback UI for bot responses */}
                      {isBot && m.id !== 'welcome' && previousMsg && (
                        <div className="flex gap-2.5 px-1 mt-1 opacity-60 hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleFeedback(m.id, '👍', previousMsg.text, m.text)}
                            className="text-white/50 hover:text-green-400 p-1 bg-white/5 rounded-md transition-colors"
                          >
                            <ThumbsUp size={12} />
                          </button>
                          <button 
                            onClick={() => handleFeedback(m.id, '👎', previousMsg.text, m.text)}
                            className="text-white/50 hover:text-red-400 p-1 bg-white/5 rounded-md transition-colors"
                          >
                            <ThumbsDown size={12} />
                          </button>
                        </div>
                      )}
                      
                      {/* Quick Replies */}
                      {isBot && m.quickReplies && m.quickReplies.length > 0 && index === messages.length - 1 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {m.quickReplies.map((qr, i) => (
                            <button
                              key={i}
                              onClick={() => handleSendText(qr)}
                              className="text-xs bg-brand-accent/10 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-brand-primary px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                            >
                              {qr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
              <div className="flex max-w-[80%] gap-2.5">
                <div className="shrink-0 mt-auto w-8 h-8 rounded-full bg-brand-accent/50 flex items-center justify-center animate-pulse">
                  <Bot size={16} className="text-brand-primary/50" />
                </div>
                <div className="p-4 bg-white/5 rounded-2xl rounded-br-sm border border-white/5 flex gap-1.5 items-center">
                  <div className="w-2 h-2 rounded-full bg-brand-accent/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-brand-accent/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-brand-accent/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} className="h-1" />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 backdrop-blur-xl border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="اكتب رسالتك للمهندس عاصم..."
              className="flex-grow bg-white/5 border border-white/10 text-white rounded-2xl py-3.5 px-5 outline-none focus:border-brand-accent/50 focus:bg-white/10 transition-all text-sm md:text-base placeholder-white/30"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-brand-accent text-brand-primary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-accent/90 transition-colors shadow-lg active:scale-95 shrink-0 w-12 h-12 flex items-center justify-center"
            >
              <Send size={20} className={document.dir === 'rtl' ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ThumbsUp, Quote, ChevronRight, ChevronLeft, ShoppingCart, CheckCircle2, Plus, X, Send } from 'lucide-react';
import { REVIEWS } from '../constants';

export default function ReviewsSection() {
  const [isReviewsHovered, setIsReviewsHovered] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    rating: 5,
    text: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend/database
    // For now, we'll simulate success
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
      setFormData({ name: '', service: '', rating: 5, text: '' });
    }, 3000);
  };

  useEffect(() => {
    const container = reviewsRef.current;
    if (!container || isReviewsHovered) return;

    const interval = setInterval(() => {
      const scrollLeft = Math.abs(container.scrollLeft);
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -(container.clientWidth > 600 ? 400 : container.clientWidth), behavior: 'smooth' });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isReviewsHovered]);

  const scrollPrev = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({ left: reviewsRef.current.clientWidth > 600 ? 400 : reviewsRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({ left: -(reviewsRef.current.clientWidth > 600 ? 400 : reviewsRef.current.clientWidth), behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="pt-24 pb-12 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-brand-accent font-bold text-sm tracking-[0.4em] uppercase mb-6 block">ثقة العملاء</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">تجارب عملائنا</h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-10">نفخر بخدمة عملائنا في جميع أنحاء المملكة، إليك بعض تجاربهم الحقيقية مع حلولنا التقنية.</p>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-primary rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-brand-accent/20 active:scale-95"
          >
            <Plus size={24} />
            نسعد بمشاركة تجربتك
          </button>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsReviewsHovered(true)}
          onMouseLeave={() => setIsReviewsHovered(false)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={scrollPrev} 
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-brand-primary/90 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-brand-accent hover:text-brand-primary transition-all md:translate-x-1/2 shadow-xl"
            aria-label="السابق"
          >
            <ChevronRight size={28} />
          </button>
          <button 
            onClick={scrollNext} 
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-brand-primary/90 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-brand-accent hover:text-brand-primary transition-all md:-translate-x-1/2 shadow-xl"
            aria-label="التالي"
          >
            <ChevronLeft size={28} />
          </button>

          <div 
            ref={reviewsRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          >
            {REVIEWS.map((review, idx) => (
              <div 
                key={idx}
                className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center group"
              >
                <div className="h-full bg-[#1A2B3C]/90 backdrop-blur-xl p-8 rounded-[15px] shadow-lg shadow-black/20 border border-white/10 hover:border-brand-accent/50 transition-all duration-500 flex flex-col relative overflow-hidden group-hover:-translate-y-1">
                  {/* Decorative Quote Icon */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 text-white/5 -rotate-12 pointer-events-none group-hover:text-brand-accent/5 transition-colors">
                    <Quote size={80} />
                  </div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            className={`${i < review.rating ? 'text-[#FFD700] fill-[#FFD700]' : 'text-white/10'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{review.date}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                      <ThumbsUp size={20} />
                    </div>
                  </div>

                  <p className="text-white leading-relaxed mb-8 text-[16px] md:text-[18px] font-medium relative z-10">
                    "{review.text}"
                  </p>

                  <div className="mt-auto pt-5 border-t border-white/10 relative z-10">
                    {review.product && (
                      <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 rounded-lg border border-brand-accent/20">
                        <ShoppingCart size={12} className="text-brand-accent" />
                        <span className="text-[10px] font-bold text-brand-accent">تم شراء: {review.product}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-[15px] bg-brand-neutral text-brand-accent flex items-center justify-center font-black text-xl shadow-xl border border-brand-accent/20">
                          {review.name[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#25D366] rounded-full border-2 border-brand-primary flex items-center justify-center text-white shadow-lg">
                          <CheckCircle2 size={12} strokeWidth={3} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base md:text-lg mb-1">{review.name}</h4>
                        <span className="text-[11px] font-black text-[#25D366] uppercase tracking-[0.1em]">عميل موثق</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-brand-primary/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-brand-neutral border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent"></div>
              
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-red-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">شكراً لتقييمك!</h3>
                  <p className="text-white/60">تم استلام تقييمك بنجاح وسيتم مراجعته ونشره قريباً.</p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">شاركنا تجربتك</h3>
                    <p className="text-white/40 text-sm">رأيك يهمنا ويساعدنا في تقديم خدمة أفضل</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-brand-accent uppercase tracking-widest mb-3">الاسم الكامل</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-accent/50 focus:outline-none transition-all"
                        placeholder="مثال: محمد العتيبي"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-brand-accent uppercase tracking-widest mb-3">نوع الخدمة / المنتج</label>
                      <input 
                        required
                        type="text" 
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-accent/50 focus:outline-none transition-all"
                        placeholder="مثال: تركيب أنتينا ميمو 30 ديبي"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-brand-accent uppercase tracking-widest mb-3">التقييم</label>
                      <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({...formData, rating: star})}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${formData.rating >= star ? 'bg-brand-accent text-brand-primary shadow-lg shadow-brand-accent/20' : 'bg-white/5 text-white/20 hover:bg-white/10'}`}
                          >
                            <Star size={20} fill={formData.rating >= star ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-brand-accent uppercase tracking-widest mb-3">رأيك بالخدمة</label>
                      <textarea 
                        required
                        value={formData.text}
                        onChange={(e) => setFormData({...formData, text: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-accent/50 focus:outline-none transition-all min-h-[120px] resize-none"
                        placeholder="اكتب تجربتك هنا بكل صراحة..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-accent text-brand-primary py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-accent/20 hover:scale-[1.02] transition-all active:scale-95"
                    >
                      <Send size={20} />
                      إرسال التقييم
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

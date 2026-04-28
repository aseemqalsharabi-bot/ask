import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { useStore } from '../contexts/StoreContext';

const LOGO_URL = 'https://i.postimg.cc/vTddGz7n/1776031770147.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { uiSettings } = useStore();
  const whatsappNumber = uiSettings?.whatsappNumber || '966559228957';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col">
      {/* Infinite Marquee (Announcement Bar) */}
      <div className="bg-brand-primary text-white py-2 overflow-hidden border-b border-brand-accent/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-[10px] md:text-xs font-bold px-4 flex items-center gap-4 uppercase tracking-widest">
              🔥 عروض حصرية على بكجات الأنتينا ميمو الذهبية 📡 
              <span className="text-brand-accent">•</span> 
              💡 استشارات هندسية مجانية لضبط الشبكات ⚡ 
              <span className="text-brand-accent">•</span> 
              ✅ ضمان ذهبي ودعم فني متخصص 📞
              <span className="text-brand-accent mx-4">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header Container */}
      <header className={`transition-all duration-500 ${scrolled ? 'bg-brand-primary/95 backdrop-blur-xl shadow-xl py-2' : 'bg-brand-primary py-4 md:py-6'}`}>
        <div className="container mx-auto px-5 relative grid grid-cols-3 items-center h-12 md:h-16">
          {/* Right: Menu Button (Far Right in RTL) */}
          <div className="flex items-center justify-start z-20">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-brand-primary transition-all duration-300 shadow-lg active:scale-95"
              aria-label="القائمة"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Center: Branding Unit (Logo + Name) */}
          <div className="flex items-center justify-center z-10">
            <Link to="/" className="flex items-center gap-3 group transition-all duration-300">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brand-accent/30 group-hover:border-brand-accent transition-all duration-500 shadow-[0_0_15px_rgba(234,179,8,0.2)] flex items-center justify-center overflow-hidden shrink-0 bg-white shadow-brand-accent/20">
                <OptimizedImage 
                  src={LOGO_URL} 
                  alt="متجر عاصم" 
                  className="w-full h-full object-cover rounded-full scale-105 transition-transform duration-500 group-hover:scale-110" 
                  highPriority={true}
                  widthParam={200}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-white font-black tracking-tighter leading-none group-hover:text-brand-accent transition-colors whitespace-nowrap" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>
                  متجر عاصم لتقنية الشبكات
                </h1>
                <span className="text-[7px] md:text-[10px] text-brand-accent/80 font-medium mt-0.5">
                  حلول هندسية متكاملة
                </span>
              </div>
            </Link>
          </div>

          {/* Left: Spacer to maintain center balance */}
          <div className="flex items-center justify-end">
            {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/10 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[300px] bg-brand-primary z-[70] p-6 shadow-2xl flex flex-col border-l border-white/10 overflow-y-auto pb-24"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full border-2 border-brand-accent/30 shadow-[0_0_15px_rgba(234,179,8,0.2)] overflow-hidden shrink-0 bg-white shadow-brand-accent/20">
                    <OptimizedImage src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-full scale-105" widthParam={200} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-tighter">متجر عاصم</span>
                    <span className="text-[8px] text-brand-accent font-black uppercase tracking-[0.1em]">لتقنية الشبكات</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all group shrink-0"
                  aria-label="إغلاق القائمة"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {[
                  { name: 'الرئيسية', href: '/' },
                  { name: 'جميع المنتجات', href: '/all-products' },
                  { name: 'الأكثر مبيعاً', href: '/best-sellers' },
                  { name: 'الانتينات', href: '/category/Antennas' },
                  { name: 'البكجات', href: '/category/Packages' },
                  { name: 'الراوترات 5G', href: '/category/Routers' },
                  { name: 'الوصلات والملحقات', href: '/category/Accessories' },
                  { name: 'الخدمات', href: '/category/Services' },
                  { name: 'من نحن', href: '/about' },
                  { name: 'سياسة الضمان', href: '/return-policy' },
                  { name: 'المدونة', href: '/blog' },
                  { name: 'تواصل معنا', href: '/contact' },
                  { name: 'آراء العملاء', href: '/reviews' },
                  { name: 'الأسئلة الشائعة', href: '/#FAQ' }
                ].map((item, i) => (
                  item.href.startsWith('http') ? (
                    <a 
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-white hover:text-brand-accent transition-all flex items-center gap-3 group py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-0 group-hover:scale-100 transition-transform"></span>
                      {item.name}
                    </a>
                  ) : item.href.startsWith('/#') ? (
                    <a 
                      key={i}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-white hover:text-brand-accent transition-all flex items-center gap-3 group py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-0 group-hover:scale-100 transition-transform"></span>
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      key={i}
                      to={item.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-white hover:text-brand-accent transition-all flex items-center gap-3 group py-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-0 group-hover:scale-100 transition-transform"></span>
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-[10px] font-bold text-white/40 mb-3 uppercase tracking-widest">تحتاج مساعدة؟</p>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(uiSettings?.whatsappMessage || 'مرحباً متجر عاصم، أحتاج إلى مساعدة فنية بخصوص الشبكة.')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-accent text-brand-primary w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 hover:scale-[1.02] transition-all active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  تواصل معنا الآن
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  CheckCircle2, 
  Headset, 
  ShieldCheck, 
  Zap,
  MapPin,
  ShoppingCart,
  Award,
  ThumbsUp,
  Quote,
  Settings,
  Users,
  Instagram,
  Flame,
  LayoutGrid,
  Radio,
  Package,
  Router,
  Cable,
  Wrench
} from 'lucide-react';
import { PRODUCTS, FAQS } from '../constants';
import ProductCard from '../components/ProductCard';
import ReviewsSection from '../components/ReviewsSection';
import OptimizedImage from '../components/OptimizedImage';
import { useStore } from '../contexts/StoreContext';
import { Link } from 'react-router-dom';

const getCategoryIcon = (cat: string) => {
  switch (cat) {
    case 'الأكثر مبيعاً': return <Flame size={24} strokeWidth={1.5} />;
    case 'الكل': return <LayoutGrid size={24} strokeWidth={1.5} />;
    case 'الانتينات': return <Radio size={24} strokeWidth={1.5} />;
    case 'البكجات': return <Package size={24} strokeWidth={1.5} />;
    case 'الراوترات 5G': return <Router size={24} strokeWidth={1.5} />;
    case 'الوصلات والملحقات': return <Cable size={24} strokeWidth={1.5} />;
    case 'الخدمات': return <Wrench size={24} strokeWidth={1.5} />;
    default: return <LayoutGrid size={24} strokeWidth={1.5} />;
  }
};

export default function Home() {
  const { products, uiSettings } = useStore();
  const [activeCategory, setActiveCategory] = useState('الأكثر مبيعاً');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const bestSellers = products.filter(p => [
    'ant-30',
    'ant-27',
    'pkg-30-hw-cpe5',
    'pkg-27-hw-pro6',
    'rtr-hw-cpe5'
  ].includes(p.id));

  const categories = ['الأكثر مبيعاً', 'الكل', ...Array.from(new Set(products.map(p => String((p as any).category))))] as string[];

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'الأكثر مبيعاً') return bestSellers.some(b => b.id === p.id);
    return activeCategory === 'الكل' || (p as any).category === activeCategory;
  });

  const productsByCategory = categories.filter(c => c !== 'الكل' && c !== 'الأكثر مبيعاً').reduce((acc, cat) => {
    acc[cat] = products.filter(p => (p as any).category === cat);
    return acc;
  }, {} as Record<string, typeof products>);

  const categoryIdMap: Record<string, string> = {
    'الانتينات': 'Antennas',
    'البكجات': 'Packages',
    'الراوترات 5G': 'Routers',
    'الوصلات والملحقات': 'Accessories',
    'الخدمات': 'Services'
  };

  const siteNavigationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        "name": "الأنتينا الميمو",
        "url": "https://asem5g.pages.dev/category/Antennas"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "قسم الراوترات",
        "url": "https://asem5g.pages.dev/category/Routers"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "مقويات الشبكة",
        "url": "https://asem5g.pages.dev/category/Packages"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "تعديل الراوترات",
        "url": "https://asem5g.pages.dev/category/Services"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "تواصل معنا",
        "url": "https://wa.me/966559228957"
      }
    ]
  };

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px]">
      <Helmet>
        <title>متجر عاصم لتقنية الشبكات</title>
        <meta name="description" content="متخصصون في حلول مشاكل الشبكة وضعف الانترنت تركيب انتينا ميمو وتعديل راوترات 5G تاسيس وتركيب الشبكات باحدث التقنيات احصل على شبكة امنه ومستقرة" />
        <meta property="og:title" content="متجر عاصم لتقنية الشبكات" />
        <meta property="og:description" content="متخصصون في حلول مشاكل الشبكة وضعف الانترنت تركيب انتينا ميمو وتعديل راوترات 5G تاسيس وتركيب الشبكات باحدث التقنيات احصل على شبكة امنه ومستقرة" />
        <meta property="og:image" content="https://i.postimg.cc/q7FNJj0K/IMG-20260205-WA0041(1).png" />
        <meta property="og:url" content="https://asem5g.pages.dev" />
        <link rel="canonical" href="https://asem5g.pages.dev" />
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJsonLd)}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section id="Antennas" className="relative min-h-[80vh] flex items-center overflow-hidden bg-transparent py-12 md:py-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage 
            src="https://i.postimg.cc/Rh5Ght5d/1776061105265.png" 
            alt="أنتينا ميمو 5G - متجر عاصم لتقنية الشبكات" 
            className="w-full h-full object-cover blur-[2px]" 
            highPriority={true} 
            widthParam={1920} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 via-brand-primary/60 to-brand-neutral"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-right order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-accent/10 rounded-full border border-brand-accent/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                <span className="text-[10px] md:text-sm font-black text-brand-accent uppercase tracking-[0.2em]">متوفر الآن: الجيل المطور 2026</span>
              </div>
              <h1 className="text-white mb-6 leading-[1.1] tracking-tighter font-black" dangerouslySetInnerHTML={{ __html: uiSettings.heroTitle || 'قوة الاتصال التي تستحقها.. <br />\n<span class="text-brand-accent">استقرار تام وسرعة بلا حدود</span>' }} />
              <p className="text-white/80 mb-10 leading-relaxed font-medium">
                {uiSettings.heroSubtitle || 'حلول هندسية متكاملة لرفع كفاءة الإنترنت. متخصصون في تركيب الأنتينا وتعديل الراوترات وتغطية المساحات الواسعة.'}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
                <a href="#products" className="bg-brand-accent text-brand-primary px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-accent/30 flex items-center justify-center gap-3 w-full sm:w-auto">
                  <span>تسوق الآن</span>
                  <ShoppingCart size={24} />
                </a>
                
                <a 
                  href={`https://wa.me/${uiSettings.whatsappNumber}?text=${encodeURIComponent(uiSettings.whatsappMessage)}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-4 w-full sm:w-auto group"
                >
                  <span className="font-black">استشارة هندسية</span>
                  <WhatsAppIcon className="w-6 h-6 text-brand-accent group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/60 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-brand-accent" />
                  <span>استشارات مجانية ⚡</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-accent" />
                  <span>يدعم جميع الشبكات</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full order-1 lg:order-2"
            >
              <div className="absolute -inset-12 bg-brand-accent/20 blur-[100px] rounded-full"></div>
              <OptimizedImage 
                src="https://i.postimg.cc/Rh5Ght5d/1776061105265.png" 
                alt="تحليل سرعة الإنترنت" 
                className="relative w-full h-auto max-w-[500px] mx-auto lg:max-w-none object-contain drop-shadow-[0_25px_50px_rgba(0,229,255,0.3)] transition-transform duration-700 hover:scale-105" 
                highPriority={true} 
                widthParam={800}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Row (Trust Bar) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-6 md:py-10 bg-white/5 border-b border-white/10"
      >
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          <div className="flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
              <Headset size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-sm font-bold text-white mb-0.5 md:mb-1">دعم فني مباشر</h4>
              <p className="hidden xs:block text-[8px] md:text-[10px] text-white/40 leading-tight max-w-[120px] md:max-w-[200px]">تواصل مباشر لحل مشاكلك</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-sm font-bold text-white mb-0.5 md:mb-1">استشارة مجانية</h4>
              <p className="hidden xs:block text-[8px] md:text-[10px] text-white/40 leading-tight max-w-[120px] md:max-w-[200px]">نحلل موقعك وننصحك بالحل الأنسب</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
              <Award size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-sm font-bold text-white mb-0.5 md:mb-1">ضمان الأداء</h4>
              <p className="hidden xs:block text-[8px] md:text-[10px] text-white/40 leading-tight max-w-[120px] md:max-w-[200px]">نضمن لك الفرق الفعلي أو استرجع مبلغك</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
              <ThumbsUp size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-sm font-bold text-white mb-0.5 md:mb-1">منتجات أصلية</h4>
              <p className="hidden xs:block text-[8px] md:text-[10px] text-white/40 leading-tight max-w-[120px] md:max-w-[200px]">أفضل الماركات العالمية بضمان سنتين</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section 
        id="products" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 container mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="text-center md:text-right w-full md:w-auto">
            <h2 className="section-title text-white">تعبت من التقطيع في نص القيم؟ أو ضعف النت خلف العوازل؟</h2>
            <p className="text-white/60 text-sm md:text-lg font-medium">نعرف شعورك.. تشتري باقة 5G غالية، والنتيجة تقطيع ولاق. هنا الحل الجذري لكسر حواجز السرعة.</p>
          </div>
          <div className="grid grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-2 md:gap-4 w-full mt-8 md:mt-12">
            {categories.map(cat => {
              const Icon = getCategoryIcon(cat);
              const isActive = activeCategory === cat;
              
              const baseClasses = "group relative flex flex-col items-center justify-center gap-2 md:gap-3 px-1 md:px-6 py-3 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 overflow-hidden cursor-pointer";
              
              const activeClasses = isActive 
                ? "bg-[#0a0a0a] border border-brand-accent shadow-[0_0_15px_rgba(0,229,255,0.2)]" 
                : "bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:bg-[#0a0a0a]";

              const content = (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? 'opacity-100' : ''}`}></div>
                  <div className={`relative z-10 transition-all duration-500 ${isActive ? 'text-brand-accent drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] scale-110' : 'text-brand-accent/70 group-hover:text-brand-accent group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] group-hover:scale-110'}`}>
                    <div className="scale-75 md:scale-100">{Icon}</div>
                  </div>
                  <span className={`relative z-10 text-[9px] md:text-sm font-bold tracking-wide transition-colors duration-300 text-center leading-tight ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {cat}
                  </span>
                </>
              );

              return cat === 'الكل' || cat === 'الأكثر مبيعاً' ? (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${baseClasses} ${activeClasses}`}
                >
                  {content}
                </button>
              ) : (
                <Link
                  key={cat}
                  to={`/category/${categoryIdMap[cat]}`}
                  className={`${baseClasses} ${activeClasses}`}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>

        {activeCategory === 'الكل' ? (
          <div className="space-y-16">
            {Object.entries(productsByCategory).map(([category, products]) => (
              <div key={category} id={categoryIdMap[category]} className="space-y-10 scroll-mt-32">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-grow bg-white/10"></div>
                  <h3 className="text-xl md:text-2xl font-bold text-white px-4">{category}</h3>
                  <div className="h-px flex-grow bg-white/10"></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.section>

      {/* Trust Section (Why us?) */}
      <motion.section 
        id="Services" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 md:py-32 bg-white/5 text-white border-y border-white/10"
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-accent font-bold text-xs tracking-[0.4em] uppercase mb-4 block">لماذا تختارنا؟</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tighter">حل نهائي لمشكلة البنج (Ping) واللاغ في الألعاب.. <br /> <span className="text-brand-accent">كأنك تحت البرج مباشرة</span></h2>
            <p className="text-white/80 text-lg mb-10 font-medium leading-relaxed">
              استمتع بتحميل فوري، ألعاب بدون لاق، وبث بدقة 4K بدون توقف. انضم لأكثر من 1000 عميل سعودي نقلوا تجربتهم لمستوى آخر.
            </p>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                  <Settings className="text-brand-accent" size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">تعديل راوتر هواوي 5G Pro 5 لزيادة السرعة</h4>
                  <p className="text-white/60 leading-relaxed">نحول راوترك العادي إلى جهاز جبار يدعم الأنتينا الخارجية، مما يمنحك سرعات مضاعفة وثباتاً مذهلاً في الألعاب والبث المباشر.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                  <ShieldCheck className="text-brand-accent" size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">تركيب أنتينا ميمو 5G مطورة لتقوية الإنترنت</h4>
                  <p className="text-white/60 leading-relaxed">نقدم لك ضمان الأداء؛ إذا لم تلاحظ فرقاً حقيقياً في السرعة أو لم تكن راضياً، يمكنك استرجاع المبلغ بالكامل.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/20">
                  <MapPin className="text-brand-accent" size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">تقوية إشارة الواي فاي وتغطية الفلل بنظام Mesh</h4>
                  <p className="text-white/60 leading-relaxed">سواء كنت في مدينة أو قرية، حلولنا تصلك أينما كنت مع توفر فنيين متخصصين للتركيب في أغلب مناطق المملكة.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-accent/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <OptimizedImage src="https://i.postimg.cc/WzjrxYXn/photo-5882106545833708750-y.jpg" className="relative rounded-[2.5rem] shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-700" alt="نتائج قياس سرعة الإنترنت" widthParam={800} />
            <div className="absolute -bottom-10 -right-10 bg-brand-accent p-10 rounded-[2rem] text-brand-primary shadow-2xl hidden lg:block hover:scale-110 transition-transform cursor-default">
              <p className="text-3xl font-black mb-1 tracking-tighter">1000+ Mbps</p>
              <p className="font-bold text-sm uppercase tracking-widest">سرعات حقيقية لعملائنا</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Watch Our Work Section */}
      <motion.section 
        id="works" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 bg-transparent overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-brand-accent font-bold text-xs tracking-[0.4em] uppercase mb-4 block">المحتوى المرئي</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tighter">شاهد أعمالنا</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium max-w-2xl">تابع شروحاتنا وتجارب السرعة الحقيقية لأجهزة الأنتينا الميمو المطورة على منصاتنا الاجتماعية.</p>
          </div>

          <div className="flex justify-center gap-6 mb-16">
            <a href="https://www.instagram.com/asem_mudhsh" target="_blank" aria-label="Instagram" className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-500 border border-white/10">
                <Instagram size={32} className="group-hover:text-[#ee2a7b] transition-colors" />
              </div>
            </a>
            <a href="https://www.tiktok.com/@asemmudhsh" target="_blank" aria-label="TikTok" className="group relative">
              <div className="absolute -inset-4 bg-brand-accent blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-500 border border-white/10">
                <svg className="w-8 h-8 fill-current group-hover:text-brand-accent transition-colors" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.08-.24-.17-.35-.25v7.02c.01 1.1-.16 2.22-.63 3.21-.88 1.96-2.82 3.14-4.84 3.33-2.73.15-5.39-1.36-6.45-3.86-1.08-2.41-.44-5.56 1.57-7.31.83-.72 1.87-1.2 2.97-1.34v4.13c-.4.06-.78.18-1.14.37-1.05.54-1.61 1.74-1.39 2.91.13.89.72 1.67 1.53 2.02 1.01.47 2.26.27 3.03-.54.45-.47.68-1.12.66-1.75V0l.01.02z"/>
                </svg>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'فحص سرعة البرج وتوجيه الأنتينا بأجهزة احترافية', desc: 'شاهد نتائج حقيقية لسرعات الـ 5G بعد تركيب الأنتينا في مناطق التغطية الضعيفة والمتوسطة.', icon: <Zap size={24} /> },
              { title: 'شروحات التركيب', desc: 'نحن معك خطوة بخطوة كيف تركب وتوجه الأنتينا بنفسك بكل سهولة واحترافية عبر شروحاتنا المبسطة.', icon: <Settings size={24} /> },
              { title: 'ثقة عملائنا', desc: 'صور وفيديوهات حية لنتائج التركيب من مختلف مدن وقرى المملكة، تعكس التزامنا بالجودة والنتائج.', icon: <Users size={24} /> }
            ].map((card, i) => (
              <div key={i} className="group p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:border-brand-accent/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-accent/10 flex flex-col items-center text-center md:items-start md:text-right">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-brand-primary transition-all duration-500 shadow-lg">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-accent transition-colors">{card.title}</h3>
                <p className="text-white/60 text-base leading-relaxed font-medium">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* FAQ Section */}
      <section id="FAQ" className="pt-12 pb-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-accent font-bold text-sm tracking-[0.4em] uppercase mb-6 block">الأسئلة الشائعة</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">هل لديك استفسار؟</h2>
            <p className="text-white/60 text-lg font-medium">إليك إجابات لأكثر الأسئلة شيوعاً حول منتجاتنا وخدماتنا</p>
          </div>

        <div className="space-y-6">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-brand-accent/30 transition-all"
            >
              <button 
                className="w-full p-6 md:p-8 text-right flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <span className="font-bold text-white text-lg md:text-xl">{faq.question}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${expandedFaq === idx ? 'bg-brand-accent text-brand-primary rotate-180 shadow-lg shadow-brand-accent/20' : 'bg-white/5 text-white/40'}`}>
                  <ChevronDown size={22} />
                </div>
              </button>
              <AnimatePresence>
                {expandedFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-white/70 leading-relaxed text-base md:text-lg font-medium border-t border-white/10 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
  );
}

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

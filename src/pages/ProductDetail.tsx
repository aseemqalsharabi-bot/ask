import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, Zap, ChevronLeft, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS } from '../constants';
import ReviewsSection from '../components/ReviewsSection';
import AntennaComparison from '../components/AntennaComparison';
import OptimizedImage from '../components/OptimizedImage';
import { useStore } from '../contexts/StoreContext';

const LOGO_URL = 'https://i.postimg.cc/vTddGz7n/1776031770147.png';

export default function ProductDetail() {
  const { id } = useParams();
  const { uiSettings, products } = useStore();
  const whatsappNumber = uiSettings?.whatsappNumber || '966559228957';
  const product = products.find((p: any) => p.id === id) || PRODUCTS.find(p => p.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
        <Helmet>
          <title>المنتج غير موجود | متجر عاصم</title>
        </Helmet>
        <h1 className="text-4xl font-bold mb-4">المنتج غير موجود</h1>
        <Link to="/" className="text-brand-accent hover:underline">العودة للرئيسية</Link>
      </div>
    );
  }

  const allImages = product.images || [product.image];
  const activeImage = allImages[activeImageIndex];

  const categoryIdMap: Record<string, string> = {
    'الانتينات': 'Antennas',
    'البكجات': 'Packages',
    'الراوترات 5G': 'Routers',
    'الوصلات والملحقات': 'Accessories',
    'الخدمات': 'Services'
  };

  const productUrl = `https://asem5g.pages.dev/product/${product.id}`;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images || [product.image],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "عاصم لتقنية الشبكات"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "SAR",
      "price": product.price,
      "availability": product.outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "15"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://asem5g.pages.dev/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.category,
        "item": `https://asem5g.pages.dev/category/${categoryIdMap[product.category]}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": productUrl
      }
    ]
  };

  const handleOrder = () => {
    const message = `مرحباً مهندس عاصم، أود الاستفسار عن ${product.name}\nالرابط: ${productUrl}\nوتأكيد توافقه مع موقعي`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24">
      <Helmet>
        <title>{`${product.name} | متجر عاصم لتقنية الشبكات`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:url" content={productUrl} />
        <link rel="canonical" href={productUrl} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      </Helmet>
      <div className="container mx-auto px-4">
        {/* Back Button & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <nav className="flex items-center gap-3 text-white/40 text-sm md:text-base font-bold overflow-x-auto whitespace-nowrap pb-2 hide-scrollbar">
            <Link to="/" className="hover:text-brand-accent transition-colors py-2 px-1">الرئيسية</Link>
            <ChevronLeft size={16} className="shrink-0" />
            <Link to={`/category/${categoryIdMap[product.category]}`} className="hover:text-brand-accent transition-colors py-2 px-1">{product.category}</Link>
            <ChevronLeft size={16} className="shrink-0" />
            <span className="text-brand-accent truncate py-2 px-1">{product.name}</span>
          </nav>
          
          <Link 
            to={`/category/${categoryIdMap[product.category]}`} 
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-accent transition-colors font-bold text-sm md:text-base group"
          >
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            العودة لـ {product.category}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-white/10 p-8 flex items-center justify-center group">
              <OptimizedImage 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 aspect-square"
                highPriority={true}
                widthParam={800}
              />
              <div className="absolute bottom-4 left-4 opacity-20 pointer-events-none">
                <OptimizedImage src={LOGO_URL} alt="Watermark" className="h-8 w-auto grayscale brightness-0" widthParam={400} />
              </div>
              
              {product.tags?.map((tag, i) => (
                <span key={i} className="absolute top-6 right-6 px-4 py-2 bg-brand-accent text-brand-primary rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl">
                  {tag}
                </span>
              ))}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white p-2 ${
                      activeImageIndex === idx 
                        ? 'border-brand-accent shadow-lg shadow-brand-accent/20 scale-105' 
                        : 'border-white/10 hover:border-brand-accent/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <OptimizedImage 
                      src={img} 
                      alt={`${product.name} - صورة ${idx + 1}`} 
                      className="w-full h-full object-contain aspect-square"
                      widthParam={200}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-brand-accent font-bold text-sm tracking-[0.2em] uppercase mb-4">{product.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl md:text-4xl font-bold text-brand-accent">{product.price} ريال</span>
              {product.oldPrice && (
                <span className="text-xl md:text-2xl text-white/30 line-through decoration-red-500/50">{product.oldPrice} ريال</span>
              )}
              {product.outOfStock && (
                <span className="bg-red-500/10 text-red-500 px-4 py-1 rounded-full font-bold text-xs border border-red-500/20">نفدت الكمية</span>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Zap size={18} className="text-brand-accent" />
                وصف المنتج
              </h3>
              <p className="text-white/70 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Truck className="text-brand-accent" size={24} />
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold">شحن سريع</p>
                  <p className="text-xs text-white font-bold">لجميع المناطق</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <ShieldCheck className="text-brand-accent" size={24} />
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold">ضمان الأداء</p>
                  <p className="text-xs text-white font-bold">ضمان استرجاع</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle2 className="text-brand-accent" size={24} />
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold">أصلي 100%</p>
                  <p className="text-xs text-white font-bold">جودة مضمونة</p>
                </div>
              </div>
            </div>

            <button
              disabled={product.outOfStock}
              onClick={handleOrder}
              className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-2xl ${
                product.outOfStock 
                ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                : 'bg-brand-accent hover:bg-brand-accent/90 text-brand-primary shadow-brand-accent/20 hover:scale-[1.02] active:scale-95'
              }`}
            >
              <span>طلب الآن</span>
              <ShoppingCart size={24} />
            </button>
          </motion.div>
        </div>

        {/* Technical Specs Section */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <section className="mt-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-grow bg-white/10"></div>
              <h2 className="text-2xl md:text-4xl font-bold text-white px-4">المواصفات التقنية</h2>
              <div className="h-px flex-grow bg-white/10"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex justify-between items-center group hover:border-brand-accent/30 transition-all">
                  <span className="text-white/40 font-bold text-sm md:text-base">{key}</span>
                  <span className="text-white font-black text-sm md:text-lg text-left" dir="ltr">{value}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Reviews Section at the bottom of all pages */}
      {(product.category === 'الانتينات' || product.category === 'البكجات') && (
        <div className="container mx-auto px-4 mt-24">
          <AntennaComparison />
        </div>
      )}

      <ReviewsSection />
    </main>
  );
}


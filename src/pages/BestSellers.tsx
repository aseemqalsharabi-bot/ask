import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import ReviewsSection from '../components/ReviewsSection';
import { useStore } from '../contexts/StoreContext';

export default function BestSellers() {
  const { products } = useStore();
  
  const allStoreProducts = products && products.length > 0 ? products : PRODUCTS;
  
  // Custom list of best selling products
  const bestSellerIds = ['pkg-30-hw-pro6', 'ant-30', 'rtr-hw-cpe5', 'rtr-zyxel-nr5103', 'acc-lmr400', 'srv-mod', 'pkg-30-hw-cpe5', 'ant-27'];
  
  const bestSellers = allStoreProducts
    .filter(p => bestSellerIds.includes(p.id))
    .sort((a, b) => bestSellerIds.indexOf(a.id) - bestSellerIds.indexOf(b.id));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://www.asemnet.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "الأكثر مبيعاً",
        "item": "https://www.asemnet.com/best-sellers"
      }
    ]
  };

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24">
      <Helmet>
        <title>الأكثر مبيعاً | متجر عاصم لتقنية الشبكات</title>
        <meta name="description" content="تصفح المنتجات الأكثر مبيعاً في متجر عاصم للشبكات. حلول مجربة ومضمونة لتقوية الإنترنت وحل مشاكل البنق العالي لسرعة وأداء لا يقارن." />
        <meta property="og:title" content="الأكثر مبيعاً | متجر عاصم للشبكات" />
        <meta property="og:description" content="تصفح المنتجات الأكثر مبيعاً في متجر عاصم للشبكات. حلول مجربة ومضمونة لتقوية الإنترنت وحل مشاكل البنق العالي لسرعة وأداء لا يقارن." />
        <meta property="og:url" content="https://www.asemnet.com/best-sellers" />
        <link rel="canonical" href="https://www.asemnet.com/best-sellers" />
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
            <span className="text-brand-accent truncate py-2 px-1">الأكثر مبيعاً</span>
          </nav>
          
          <Link 
            to="/#products" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-accent transition-colors font-bold text-sm md:text-base group"
          >
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            العودة للرئيسية
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-right">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">الأكثر مبيعاً</h1>
            <p className="text-white/60 font-medium text-base md:text-lg max-w-2xl">اختر من المنتجات الأكثر شعبية وثقة لدى عملائنا في جميع أنحاء المملكة لضمان أعلى أداء من الجيل الخامس 5G.</p>
          </div>
          <div className="bg-brand-accent/10 px-6 py-3 rounded-2xl border border-brand-accent/20">
            <span className="text-brand-accent font-bold">{bestSellers.length} منتجات بانتظارك</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {bestSellers.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/40 text-xl font-bold">لا توجد منتجات متوفرة حالياً</p>
          </div>
        )}
      </div>

      <ReviewsSection />
    </main>
  );
}

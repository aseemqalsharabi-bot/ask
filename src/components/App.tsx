import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollRestoration } from 'react-router-dom';
import { StoreProvider, useStore } from '../contexts/StoreContext';
import Header from './Header';
import Footer from './Footer';
import Chat from './Chat';

const Home = lazy(() => import('../pages/Home'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const CategoryDetail = lazy(() => import('../pages/CategoryDetail'));
const AllProducts = lazy(() => import('../pages/AllProducts'));
const BestSellers = lazy(() => import('../pages/BestSellers'));
const About = lazy(() => import('../pages/About'));
const ReturnPolicy = lazy(() => import('../pages/ReturnPolicy'));
const Contact = lazy(() => import('../pages/Contact'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Reviews = lazy(() => import('../pages/Reviews'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      // Use a small timeout to ensure the element is rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

function MainApp() {
  const { uiSettings } = useStore();

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-accent selection:text-brand-primary transition-colors duration-500">
      <Header />
      <div className="flex-grow flex flex-col">
        <Suspense fallback={
          <div className="flex-grow flex items-center justify-center min-h-[50vh]">
            <div className="w-12 h-12 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/best-sellers" element={<BestSellers />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      
      {/* Floating WhatsApp */}
      <a 
        href={`https://wa.me/${uiSettings.whatsappNumber}?text=${encodeURIComponent(uiSettings.whatsappMessage)}`} 
        target="_blank"
        className="floating-wa"
        aria-label="WhatsApp Contact"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-accent hover:text-brand-primary transition-all z-40 shadow-2xl group"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6 rotate-180 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

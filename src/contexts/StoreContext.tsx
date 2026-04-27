import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAdminProducts, getUISettings, getIntegrationSettings, getPageContent, getNavigationSettings } from '../lib/adminService';
import { Product, PRODUCTS } from '../constants'; // Fallback

const CACHE_KEY = 'asem5g_store_cache_v4';
const CACHE_EXPIRY = 1000 * 60 * 60; // 1 Hour

interface StoreContextType {
  products: Product[];
  uiSettings: any;
  integrations: any;
  navigation: any;
  pages: any;
  loading: boolean;
}

const StoreContext = createContext<StoreContextType>({
  products: PRODUCTS, // fallback to initial constants
  uiSettings: { 
    whatsappNumber: '966559228957', 
    whatsappMessage: 'مرحبا مهندس عاصم، أود الحصول على استشارة هندسية بخصوص الشبكة.',
    heroTitle: 'قوة الاتصال التي تستحقها.. <br />\n<span class="text-brand-accent">استقرار تام وسرعة بلا حدود</span>',
    heroSubtitle: 'حلول هندسية متكاملة لرفع كفاءة الإنترنت. متخصصون في تركيب الأنتينا وتعديل الراوترات وتغطية المساحات الواسعة.' 
  },
  integrations: {},
  navigation: { header: [], footer: [], social: { instagram: 'https://www.instagram.com/asem_net', tiktok: 'https://www.tiktok.com/@asem_net' } },
  pages: { about: null, returnPolicy: null },
  loading: true,
});

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [uiSettings, setUiSettings] = useState<any>({ 
    whatsappNumber: '966559228957', 
    whatsappMessage: 'مرحبا مهندس عاصم، أود الحصول على استشارة هندسية بخصوص الشبكة.',
    heroTitle: 'قوة الاتصال التي تستحقها.. <br />\n<span class="text-brand-accent">استقرار تام وسرعة بلا حدود</span>',
    heroSubtitle: 'حلول هندسية متكاملة لرفع كفاءة الإنترنت. متخصصون في تركيب الأنتينا وتعديل الراوترات وتغطية المساحات الواسعة.' 
  });
  const [integrations, setIntegrations] = useState<any>({});
  const [navigation, setNavigation] = useState<any>({ header: [], footer: [], social: { instagram: 'https://www.instagram.com/asem_net', tiktok: 'https://www.tiktok.com/@asem_net' } });
  const [pages, setPages] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStoreData() {
      try {
        // 1. Check LocalStorage Cache First to protect Firebase FREE TIER
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          if (Date.now() - cached.timestamp < CACHE_EXPIRY) {
            console.log("Serving from Cache! Saving Firebase limits.");
            setProducts(cached.data.products || PRODUCTS);
            setUiSettings({ ...uiSettings, ...cached.data.uiSettings });
            setIntegrations(cached.data.integrations || {});
            setNavigation(cached.data.navigation || { header: [], footer: [], social: {} });
            setPages(cached.data.pages || {});
            setLoading(false);
            
            // If we're an admin, we might want fresh data, but this context is for the frontend.
            return;
          }
        }

        // 2. Fetch all data in parallel to reduce load time
        const [fetchedProducts, fetchedUI, fetchedInteg, fetchedNav, aboutPage, returnPage] = await Promise.all([
          getAdminProducts(),
          getUISettings(),
          getIntegrationSettings(),
          getNavigationSettings(),
          getPageContent('about'),
          getPageContent('return-policy')
        ]);

        const newPages = { about: aboutPage, returnPolicy: returnPage };

        if (fetchedProducts && fetchedProducts.length > 0) setProducts(fetchedProducts);
        if (fetchedUI) setUiSettings({ ...uiSettings, ...fetchedUI });
        if (fetchedInteg) setIntegrations(fetchedInteg);
        if (fetchedNav) setNavigation(fetchedNav);
        if (newPages) setPages(newPages);

        // 3. Save to LocalStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: {
            products: fetchedProducts,
            uiSettings: fetchedUI,
            integrations: fetchedInteg,
            navigation: fetchedNav,
            pages: newPages
          }
        }));

      } catch (error) {
        console.error("Failed to load store state from Firebase, falling back to local constants/cache", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStoreData();
  }, []);

  return (
    <StoreContext.Provider value={{ products, uiSettings, integrations, navigation, pages, loading }}>
      {children}
    </StoreContext.Provider>
  );
}

import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '../constants';
import { PRODUCTS } from '../constants';

// --- SYSTEM CACHING: Store Manager ---
export const getAdminProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const snap = await getDocs(productsRef);
  
  if (snap.empty) {
    // Bootstrap products from constants to Firestore (First time setup)
    try {
      for (const p of PRODUCTS) {
        await setDoc(doc(db, 'products', p.id), p);
      }
    } catch (e) {
       console.warn("Could not bootstrap products (this is normal for public users)", e);
    }
    return PRODUCTS;
  }
  
  return snap.docs.map(doc => doc.data() as Product);
};

export const updateAdminProduct = async (id: string, data: Partial<Product>) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, data);
};

// --- SYSTEM CACHING: UI Settings ---
export const getUISettings = async () => {
  const ref = doc(db, 'settings', 'ui');
  const snap = await getDoc(ref);
  
  const goodDefaults = {
    whatsappNumber: '966559228957',
    whatsappMessage: 'مرحبا مهندس عاصم، أود الحصول على استشارة هندسية بخصوص الشبكة.',
    heroTitle: 'قوة الاتصال التي تستحقها.. <br />\n<span class="text-brand-accent">استقرار تام وسرعة بلا حدود</span>',
    heroSubtitle: 'حلول هندسية متكاملة لرفع كفاءة الإنترنت. متخصصون في تركيب الأنتينا وتعديل الراوترات وتغطية المساحات الواسعة.'
  };

  if (!snap.exists()) {
    try { await setDoc(ref, goodDefaults); } catch(e) {}
    return goodDefaults;
  }
  
  const data = snap.data();
  // Auto-heal if the database was polluted with the bad temporary defaults from previous edits
  if (data.heroTitle === 'أقوى حلول الشبكات والإنترنت بين يديك') {
    try { await setDoc(ref, goodDefaults); } catch(e) {}
    return goodDefaults;
  }
  
  return data;
};

export const updateUISettings = async (data: any) => {
  await updateDoc(doc(db, 'settings', 'ui'), data);
};

// --- SYSTEM CACHING: Integrations (Safe non-secret ones) ---
export const getIntegrationSettings = async () => {
  const ref = doc(db, 'settings', 'integrations');
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const defaultSettings = {
      pixelId: '851427134663368',
      ga4Id: 'G-XXXXXXXXXX',
      snapchatPixel: '',
      tiktokPixel: ''
    };
    try { await setDoc(ref, defaultSettings); } catch(e) {}
    return defaultSettings;
  }
  return snap.data();
};

export const updateIntegrationSettings = async (data: any) => {
  await updateDoc(doc(db, 'settings', 'integrations'), data);
};

// --- SYSTEM CACHING: Pages (CMS) ---
export const getPageContent = async (pageId: string) => {
  const ref = doc(db, 'pages', pageId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data();
};

export const updatePageContent = async (pageId: string, data: any) => {
  await setDoc(doc(db, 'pages', pageId), data, { merge: true });
};

// --- SYSTEM CACHING: Navigation & Links ---
export const getNavigationSettings = async () => {
  const ref = doc(db, 'settings', 'navigation');
  const snap = await getDoc(ref);

  const defaultNav = {
    header: [],
    footer: [],
    social: {
      instagram: 'https://www.instagram.com/asem_mudhsh',
      tiktok: 'https://www.tiktok.com/@asemmudhsh'
    }
  };

  if (!snap.exists()) {
    try { await setDoc(ref, defaultNav); } catch(e) {}
    return defaultNav;
  }
  
  const data = snap.data();
  // Auto-heal missing social links explicitly
  if (!data.social || Object.keys(data.social).length === 0) {
    const healedData = { ...data, social: defaultNav.social };
    try { await setDoc(ref, healedData, { merge: true }); } catch(e) {}
    return healedData;
  }

  return data;
};

export const updateNavigationSettings = async (data: any) => {
  await setDoc(doc(db, 'settings', 'navigation'), data, { merge: true });
};

export const getAIPrompt = async () => {
  const ref = doc(db, 'settings', 'ai_prompt');
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const defaultPrompt = {
      systemInstruction: 'أنت مهندس دعم فني لدى "متجر عاصم لتقنية الشبكات". مهمتك هي مساعدة الزبائن في الاستفسار عن الراوترات والأنتينات. كن احترافياً، استخدم لغة هندسية مبسطة، ولا تقترح أي أسعار من عندك.',
      isActive: true
    };
    try { await setDoc(ref, defaultPrompt); } catch(e) {}
    return defaultPrompt;
  }
  return snap.data();
};

export const updateAIPrompt = async (data: any) => {
  await updateDoc(doc(db, 'settings', 'ai_prompt'), data);
};

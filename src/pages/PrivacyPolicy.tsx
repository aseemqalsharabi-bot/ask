import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24 bg-brand-neutral">
      <Helmet>
        <title>سياسة الخصوصية | متجر عاصم لتقنية الشبكات</title>
        <meta name="description" content="سياسة الخصوصية لمتجر عاصم لتقنية الشبكات. نحن نلتزم بحماية بياناتك وخصوصيتك عند استخدام خدماتنا." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-primary/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">سياسة الخصوصية</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>نحن في متجر عاصم لتقنية الشبكات نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
            <h2 className="text-xl font-bold text-white">1. المعلومات التي نجمعها</h2>
            <p>نقوم بجمع المعلومات الضرورية فقط لإتمام عمليات التواصل وتقديم الدعم الفني، مثل الاسم ورقم الجوال عند مراسلتنا عبر الواتساب أو انستقرام.</p>
            
            <h2 className="text-xl font-bold text-white">2. كيف نستخدم معلوماتك</h2>
            <p>نستخدم معلوماتك للرد على استفساراتك الهندسية وتزويدك بأفضل الحلول التقنية الممكنة.</p>

            <h2 className="text-xl font-bold text-white">3. حماية البيانات</h2>
            <p>نحن لا نشارك بياناتك مع أي أطراف خارجية لأغراض تسويقية، وبياناتك محمية بأنظمة تشفير متطورة.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

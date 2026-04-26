import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24 bg-brand-neutral">
      <Helmet>
        <title>تواصل معنا | متجر عاصم لتقنية الشبكات</title>
        <meta name="description" content="احصل على دعم فني متخصص وتنسيق فنيين لتركيب الأنتينا ميمو في منطقتك. تواصل مع عاصم لتقنية الشبكات لرفع سرعة إنترنتك." />
        <meta property="og:title" content="تواصل معنا | متجر عاصم لتقنية الشبكات" />
        <meta property="og:description" content="احصل على دعم فني متخصص وتنسيق فنيين لتركيب الأنتينا ميمو في منطقتك. تواصل مع عاصم لتقنية الشبكات لرفع سرعة إنترنتك." />
        <meta property="og:url" content="https://www.asemnet.com/contact" />
        <link rel="canonical" href="https://www.asemnet.com/contact" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-primary/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">تواصل معنا</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-brand-accent/50 transition-colors">
              <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">المقر الرئيسي</h3>
              <p className="text-gray-400">جدة</p>
              <p className="text-sm text-gray-500 mt-2">نوفر فنيين تركيب في معظم مناطق المملكة</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-brand-accent/50 transition-colors">
              <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">الدعم الفني</h3>
              <p className="text-gray-400">من السبت إلى الخميس</p>
            </div>

            <a href="tel:+966559228957" className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-brand-accent/50 transition-colors group">
              <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">رقم التواصل</h3>
              <p className="text-gray-400" dir="ltr">+966 55 922 8957</p>
              <span className="text-sm text-brand-accent mt-2">اضغط للاتصال المباشر</span>
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

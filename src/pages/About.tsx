import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { useStore } from '../contexts/StoreContext';

const DEFAULT_ABOUT = `انطلقت رحلتنا في عام 2020م من أطهر البقاع مكة المكرمة وصولاً إلى جدة، ومع انطلاقة التحول الرقمي في مملكتنا الحبيبة، كرسنا خبرتنا الهندسية لتقديم حلول متكاملة في تأسيس الشبكات وتطوير سرعات الإنترنت.

نحن في عاصم لتقنية الشبكات متخصصون في ابتكار حلول تغطية الواي فاي، وبيع أجهزة الشبكات التي تشمل أنظمة الأنتينا ميمو MIMO، والراوترات المعدلة، والسويتشات، والكابلات عالية الجودة.

لا نبيع مجرد قطع، بل نصمم لك استقرار وسرعة الاتصال. نخدم عملائنا في معظم المناطق عبر فريق فني محترف، ملتزمين بأعلى معايير الجودة.`;

export default function About() {
  const { pages } = useStore();
  
  const content = pages?.about?.content || DEFAULT_ABOUT;

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24 bg-brand-neutral">
      <Helmet>
        <title>من نحن | متجر عاصم لتقنية الشبكات</title>
        <meta name="description" content="تعرف على عاصم لتقنية الشبكات، خبرة هندسية منذ 2020 في تأسيس الشبكات وحلول الواي فاي وبيع الأنتينا والراوترات المعدلة بأعلى جودة." />
        <meta property="og:title" content="من نحن | متجر عاصم لتقنية الشبكات" />
        <meta property="og:description" content="تعرف على عاصم لتقنية الشبكات، خبرة هندسية منذ 2020 في تأسيس الشبكات وحلول الواي فاي وبيع الأنتينا والراوترات المعدلة بأعلى جودة." />
        <meta property="og:url" content="https://www.asemnet.com/about" />
        <link rel="canonical" href="https://www.asemnet.com/about" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-primary/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">من نحن</h1>
          
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
            {content.split('\n').map((paragraph: string, index: number) => 
               paragraph.trim() ? <p key={index} className="mb-6">{paragraph}</p> : null
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

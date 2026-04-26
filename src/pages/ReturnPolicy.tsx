import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { useStore } from '../contexts/StoreContext';

const DEFAULT_POLICY = `1. مدة الاسترجاع 7 أيام والاستبدال 15 يوماً للمنتجات بحالتها الأصلية وتغليفها المصنعي.
2. الأجهزة المعدلة هندسياً (مثل إضافة مخارج SMA) تُصنف كطلبات خاصة ولا تُسترجع إلا لعيب فني ناتج عن التعديل.
3. سرعة الإنترنت وتغطية الـ 5G مرتبطة بعوامل خارجية ولا تعتبر عيباً في المنتج، ونلتزم بتقديم الدعم الفني للتوجيه الصحيح.
4. يسقط الضمان بالعبث بسوفتوير الجهاز، أو فتحه وصيانته خارجياً، أو سوء الاستخدام.
5. استرداد المبالغ يتم خلال 7 إلى 14 يوم عمل بعد فحص المنتج.`;

export default function ReturnPolicy() {
  const { pages } = useStore();
  
  const content = pages?.returnPolicy?.content || DEFAULT_POLICY;

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24 bg-brand-neutral">
      <Helmet>
        <title>سياسة الضمان والاسترجاع | متجر عاصم لتقنية الشبكات</title>
        <meta name="description" content="سياسة الضمان والاسترجاع في متجر عاصم لتقنية الشبكات. نضمن حقوقك في الأجهزة المعدلة ونوضح سياسة الاستبدال والاسترداد بكل شفافية." />
        <meta property="og:title" content="سياسة الضمان والاسترجاع | متجر عاصم لتقنية الشبكات" />
        <meta property="og:description" content="سياسة الضمان والاسترجاع في متجر عاصم لتقنية الشبكات. نضمن حقوقك في الأجهزة المعدلة ونوضح سياسة الاستبدال والاسترداد بكل شفافية." />
        <meta property="og:url" content="https://www.asemnet.com/return-policy" />
        <link rel="canonical" href="https://www.asemnet.com/return-policy" />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-primary/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">سياسة الضمان والاسترجاع</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            {content === DEFAULT_POLICY ? (
              <>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-bold">1.</span>
                  <p>مدة الاسترجاع 7 أيام والاستبدال 15 يوماً للمنتجات بحالتها الأصلية وتغليفها المصنعي.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-bold">2.</span>
                  <p>الأجهزة المعدلة هندسياً (مثل إضافة مخارج SMA) تُصنف كطلبات خاصة ولا تُسترجع إلا لعيب فني ناتج عن التعديل.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-bold">3.</span>
                  <p>سرعة الإنترنت وتغطية الـ 5G مرتبطة بعوامل خارجية ولا تعتبر عيباً في المنتج، ونلتزم بتقديم الدعم الفني للتوجيه الصحيح.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-bold">4.</span>
                  <p>يسقط الضمان بالعبث بسوفتوير الجهاز، أو فتحه وصيانته خارجياً، أو سوء الاستخدام.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-brand-accent font-bold">5.</span>
                  <p>استرداد المبالغ يتم خلال 7 إلى 14 يوم عمل بعد فحص المنتج.</p>
                </div>
              </>
            ) : (
                <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

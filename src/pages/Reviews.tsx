import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ReviewsSection from '../components/ReviewsSection';

export default function Reviews() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px]">
      <Helmet>
        <title>تقييمات العملاء | متجر عاصم لتقنية الشبكات</title>
        <meta name="description" content="اقرأ تقييمات وتجارب عملاء متجر عاصم لتقنية الشبكات حول حلول ضعف الإنترنت، تركيب أنتينا ميمو 5G، وتعديل الراوترات بجميع أنواعها." />
        <link rel="canonical" href="https://www.asemnet.com/reviews" />
      </Helmet>

      <div className="container mx-auto px-4 mb-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-white mb-4">تجارب عملائنا</h1>
        <p className="text-white/60 text-center max-w-2xl mx-auto">
          نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل الحلول التقنية لمشاكل الإنترنت وضعف الإشارة.
        </p>
      </div>

      <ReviewsSection />
    </main>
  );
}

import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const POST_CONTENT: Record<string, { title: string, content: React.ReactNode, image: string, keywords: string, description: string }> = {
  'antena-mimo-5g': {
    title: 'ماهو الأنتينا ميمو 5G وكيف يحل مشكلة ضعف الإنترنت؟',
    description: 'تعرف على تقنية أنتينا ميمو 5G والأنتينا الذهبي 30 ديبي لحل مشكلة ضعف الإنترنت وتقوية شبكة الجوال في المناطق المعزولة والعوازل.',
    keywords: 'انتينا ميمو, انتينا ميمو 5G, الانتنتينا الذهبي 30 ديبي, حل ضعف النت, مقوي شبكة الجوال, راوترات, واي فاي, انتينات, واي فاي قوي, راوتر واي فاي',
    image: 'https://i.postimg.cc/5tHWfdBL/1775765725198.png',
    content: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4 mt-8">ما هو الأنتينا ميمو (Antenna MIMO)؟</h2>
        <p className="mb-6">
          انتينا ميمو هو جهاز متخصص في تقوية شبكة الجوال واستقبال إشارات الإنترنت اللاسلكية بشكل مركز من أبراج الاتصالات. فكرة الانتينا تعتمد على استقطاب الإشارة من مسافات بعيدة جداً وتوجيهها مباشرة إلى الراوتر لتوفير اتصال سريع ومستقر، مما يعتبر الحل الجذري الأقوى لمشكلة "ضعف النت".
        </p>

        <h2 className="text-2xl font-bold text-white mb-4 mt-8">الأنتينا الذهبي 30 ديبي المطورة</h2>
        <p className="mb-6">
          يعد <strong>الانتنتينا الذهبي 30 ديبي</strong> من أقوى اللواقط في السوق السعودي حالياً. فهو مصمم ليدعم ترددات الـ 4G والـ 5G، ويمكنه لقط الإشارة من مسافات تصل إلى 11 كم لشبكات الـ 5G، و22 كم لشبكات الـ 4G. إذا كنت تعاني من عوازل في المنزل أو تعيش في منطقة طرفية، فإن هذا الأنتينا سيوفر لك ثباتاً هائلاً في البنق (Ping) وسرعة تحميل مضاعفة.
        </p>

        <h2 className="text-2xl font-bold text-white mb-4 mt-8">لماذا تحتاج إلى مقوي شبكة؟</h2>
        <ul className="list-disc list-inside space-y-3 mb-6 text-gray-300">
          <li><strong>العوازل المنزلية:</strong> الجدران السميكة تمنع وصول إشارة 5G بكامل قوتها للراوتر الداخلي.</li>
          <li><strong>البعد عن البرج:</strong> كلما ابتعدت عن البرج، زاد التشويش وضعفت السرعة.</li>
          <li><strong>التقطيع في الألعاب:</strong> استقرار البنق يحتاج إلى إشارة نقية (SINR مرتفع) لا يوفرها إلا لاقط خارجي مثل انتينا ميمو 5G.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mb-4 mt-8">الخلاصة</h2>
        <p className="mb-6">
          متجر عاصم لتقنية الشبكات وفر لك جميع الحلول الفعالة. يمكنك تصفح قسم البكجات للحصول على راوتر معدل مع انتينا ميمو جاهز للتركيب لضمان أفضل تجربة لك ولعائلتك.
        </p>
      </>
    )
  },
  'best-modified-routers': {
    title: 'أفضل راوترات 5G المعدلة لعام 2026',
    description: 'تعرف على أفضل الراوترات المعدلة لعام 2026 التي تدعم تركيب انتينا خارجي وتشغيل جميع الشرائح لضمان انترنت سريع ومستقر.',
    keywords: 'تعديل راوتر 5G, راوتر معدل يشغل جميع الشرائح, هواوي CPE 5 معدل, راوتر Zyxel 5G, حل ضعف النت, راوترات, واي فاي, انتينات, راوتر 5G معدل',
    image: 'https://i.postimg.cc/mDsg6FLv/1776050489547.png',
    content: (
      <>
        <p className="mb-6">
          يعتبر الراوتر المعدل حجر الأساس لأي نظام تقوية إنترنت احترافي. بدون راوتر معدل، لا يمكنك ربط "انتينا ميمو" خارجي للاستفادة القصوى من سرعات الـ 5G في منطقتك.
        </p>
        
        <h2 className="text-2xl font-bold text-white mb-4 mt-8">راوتر Huawei CPE 5 (معدل)</h2>
        <p className="mb-6">
          يُعد هذا الموديل (H155-381) الخيار الأول والأكثر طلبًا في متجر عاصم لتقنية الشبكات. بعد التعديل، يدعم الراوتر مخارج SMA لربط أي أنتينا ميمو، بالإضافة لدعمه الكامل لتشغيل كافة الشرائح (STC، زين، موبايلي) مع إمكانية تثبيت الترددات للاستمتاع بأفضل جودة إشارة.
        </p>

        <h2 className="text-2xl font-bold text-white mb-4 mt-8">راوتر Huawei Pro 6 (معدل)</h2>
        <p className="mb-6">
          العملاق الذي لا يُشق له غبار. إن كنت تبحث عن الأقوى على الإطلاق والأسرع في الاستجابة، فهذا الراوتر مصمم لتحمّل الضغط العالي مع شبكة الـ 5G وتوزيع الواي فاي بكفاءة عالية جداً، خاصة عندما يقترن بـ الأنتينا الذهبي 30 ديبي.
        </p>
      </>
    )
  },
  'solve-ping-gaming': {
    title: 'حل مشكلة البنق (Ping) العالي وتقطيع الألعاب',
    description: 'خطوات عملية لحل مشكلة البنق العالي في الألعاب الاونلاين من خلال تثبيت الترددات وربط راوتر معدل مع انتينا ميمو.',
    keywords: 'حل مشكلة البنق, تقطيع الالعاب, تثبيت الترددات 5G, انتينا ميمو, مقوي العاب, راوترات, واي فاي, انتينات',
    image: 'https://i.postimg.cc/zX25Qbfd/zyksl.webp',
    content: (
      <>
        <p className="mb-6">
          أكثر ما يزعج محبي الألعاب الأونلاين هو "اللاق" (Lag) أو ارتفاع الـ Ping بشكل مفاجئ. هنا في متجر عاصم للشبكات، نحن نقدم لك الحل الهندسي المثبت لحل ضعف النت والتقطيع.
        </p>

        <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. الاتجاه نحو الترددات الأقل ضغطاً</h2>
        <p className="mb-6">
          باستخدام راوتر معدل من متجرنا، يمكنك الدخول لصفحة إعدادات الراوتر وتثبيت التردد (Cell Locking) على تردد محدد لا يوجد عليه ضغط عالي من المشتركين الآخرين.
        </p>

        <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. استخدام انتينا ميمو خارجي</h2>
        <p className="mb-6">
          من خلال توصيل "الانتنتينا الذهبي" وتركيبه فوق سطح المنزل وتوجيهه بدقة عالية للبرج، ستحصل على إشارة نقية تماماً (SINR عالي). هذه الإشارة النقية تترجم مباشرة إلى بنق (Ping) منخفض جداً ومستقر، حتى في أوقات الذروة.
        </p>

        <h2 className="text-2xl font-bold text-white mb-4 mt-8">هل يستحق الأمر الاستثمار؟</h2>
        <p className="mb-6">
          إن كنت لاعباً محترفاً أو تعتمد على البثوث المباشرة، فإن التخلص من مشكلة البنق باستثمار لمرة واحدة في بكج متكامل لتقوية شبكة الجوال والنت سيوفر لك راحة بال فائقة وتجربة لعب ممتعة.
        </p>
      </>
    )
  }
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = id ? POST_CONTENT[id] : null;

  if (!post) {
    return (
      <main className="flex-grow pt-[100px] md:pt-[130px] pb-24 bg-brand-neutral flex items-center justify-center">
        <Helmet>
          <title>المقال غير موجود | متجر عاصم</title>
        </Helmet>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">المقال غير موجود</h1>
          <Link to="/blog" className="text-brand-accent hover:underline">العودة للمدونة</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24 bg-brand-neutral">
      <Helmet>
        <title>{`${post.title} | متجر عاصم لتقنية الشبكات`}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
      </Helmet>
      
      <article className="container mx-auto px-4 max-w-4xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-accent transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          العودة للمدونة
        </Link>

        <div className="rounded-3xl overflow-hidden mb-12 border border-white/5 bg-brand-surface">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full aspect-[21/9] object-cover opacity-90"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 border-b border-white/10 pb-8">
          {post.title}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed">
          {post.content}
        </div>
      </article>
    </main>
  );
}

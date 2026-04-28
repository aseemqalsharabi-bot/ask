import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 'antena-mimo-5g',
    title: 'ماهو الأنتينا ميمو 5G وكيف يحل مشكلة ضعف الإنترنت؟',
    excerpt: 'تعرف على الفرق بين الأنتينا ميمو العادي والمطور 30 ديبي، وكيف يساعدك في بث وتوفير شبكة واي فاي قوية، وتثبيت البنق، وتسريع الإنترنت.',
    image: 'https://i.postimg.cc/5tHWfdBL/1775765725198.png',
    date: '25 أبريل 2026'
  },
  {
    id: 'best-modified-routers',
    title: 'أفضل راوترات 5G المعدلة لعام 2026',
    excerpt: 'دليلك الشامل لاختيار راوتر 5G معدل يشغل جميع الشرائح ويدعم الأنتينا الخارجية لتوزيع واي فاي قوي وتقوية الشبكة بكل كفاءة.',
    image: 'https://i.postimg.cc/mDsg6FLv/1776050489547.png',
    date: '20 أبريل 2026'
  },
  {
    id: 'solve-ping-gaming',
    title: 'حل مشكلة البنق (Ping) العالي وتقطيع الألعاب',
    excerpt: 'تبحث عن استقرار واي فاي قوي في الألعاب؟ تقنية الميمو مع توجيه دقيق للبرج عبر انتينات متخصصة مع راوترات معدلة هي الحل الجذري لمشكلة البنق.',
    image: 'https://i.postimg.cc/zX25Qbfd/zyksl.webp',
    date: '15 أبريل 2026'
  }
];

export default function Blog() {
  return (
    <main className="flex-grow pt-[100px] md:pt-[130px] pb-24 bg-brand-neutral">
      <Helmet>
        <title>المدونة | مقالات حول حلول ضعف النت و راوترات انتينا ميمو واي فاي</title>
        <meta name="description" content="اقرأ أحدث المقالات في مدونة متجر عاصم لتقنية الشبكات حول حلول ضعف النت، انتينات ميمو 5G، الأنتينا الذهبي، وتعديل راوترات واي فاي لتقوية شبكة الجوال." />
        <meta name="keywords" content="انتينا ميمو, مقوي شبكة, حل ضعف النت, انتينا 5G, تعديل راوتر, تقوية شبكة الجوال, مدونة عاصم لتقنية الشبكات, راوترات, واي فاي, انتينات, راوتر 5G معدل" />
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">المدونة التقنية</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            مقالات وشروحات متخصصة في حلول ضعف الشبكة، تركيب الأنتينا ميمو، ورفع سرعة الإنترنت لأقصى حد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="bg-brand-surface rounded-3xl overflow-hidden border border-white/5 hover:border-brand-accent/50 transition-all group">
              <div className="aspect-[16/9] overflow-hidden bg-brand-dark">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-8">
                <div className="text-brand-accent text-sm mb-3">{post.date}</div>
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">{post.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <span className="text-brand-accent font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  اقرأ المزيد
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

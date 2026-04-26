import { Zap, Target, SignalHigh } from 'lucide-react';

export default function AntennaComparison() {
  return (
    <div className="space-y-20">
      {/* Benefits Section */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-brand-accent/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
              <Target size={30} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">تقريب المسافات</h3>
            <p className="text-white/60 text-lg leading-relaxed">
              <span className="font-bold text-white">قربنا لك البعيد..</span> الأنتينا تسحب لك إشارة البرج مباشرة وتلغي تأثير العوازل، لتعيش تجربة الـ 5G الكاملة مهما كان موقعك.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-brand-accent/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
              <SignalHigh size={30} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">حرية اختيار البرج</h3>
            <p className="text-white/60 text-lg leading-relaxed">
              تمنحك الأنتينا القدرة على تجاوز الأبراج المزدحمة واختيار البرج الذي يوفر أعلى سرعات وأقل بنق في منطقتك.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">مقارنة الأداء الحقيقي</h2>
          <p className="text-white/60 text-lg">الفرق الفني بين أنتينا 30 ديبي و 27 ديبي مع طبق 70×70سم</p>
        </div>
        
        {/* Mobile View (Cards) */}
        <div className="md:hidden space-y-6">
          {/* 30 dBi Card */}
          <div className="bg-white/5 rounded-2xl border border-brand-accent/30 overflow-hidden shadow-lg shadow-brand-accent/5">
            <div className="bg-brand-accent text-brand-primary p-4 text-center font-black text-lg flex items-center justify-center gap-2">
              <Target size={20} />
              أنتينا 30 ديبي (الذهبي)
            </div>
            <div className="p-5 space-y-4 text-white">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">لقط إشارة الـ 5G</span>
                <span className="font-black text-brand-accent">حتى 11 كم</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">لقط إشارة الـ 4G</span>
                <span className="font-black">حتى 22 كم</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">دعم الترددات</span>
                <span className="font-bold">من 1700 إلى 4000 ميجاهرتز</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">مقاومة الرياح</span>
                <span className="font-bold">تصميم انسيابي مبتكر لمقاومة الرياح</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white/60">الضمان</span>
                <span className="font-bold text-xs">نضمن لك الفرق الفعلي أو استرجع مبلغك</span>
              </div>
            </div>
          </div>

          {/* 27 dBi Card */}
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="bg-white/10 text-white p-4 text-center font-black text-lg flex items-center justify-center gap-2">
              <SignalHigh size={20} />
              أنتينا 27 ديبي (الذهبي)
            </div>
            <div className="p-5 space-y-4 text-white">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">لقط إشارة الـ 5G</span>
                <span className="font-bold">حتى 8 كم</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">لقط إشارة الـ 4G</span>
                <span className="font-bold">حتى 20 كم</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">دعم الترددات</span>
                <span className="font-bold">من 1700 إلى 4000 ميجاهرتز</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-bold text-sm text-white/60">مقاومة الرياح</span>
                <span className="font-bold">تصميم انسيابي مبتكر لمقاومة الرياح</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white/60">الضمان</span>
                <span className="font-bold text-xs">نضمن لك الفرق الفعلي أو استرجع مبلغك</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right border-collapse bg-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md border border-white/10">
            <thead>
              <tr className="bg-brand-accent text-brand-primary">
                <th className="p-6 font-black text-lg w-1/3">المواصفات (طبق 70×70سم)</th>
                <th className="p-6 font-black text-lg w-1/3">أنتينا 30 ديبي (الذهبي)</th>
                <th className="p-6 font-black text-lg w-1/3">أنتينا 27 ديبي (الذهبي)</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold text-base">لقط إشارة الـ 5G</td>
                <td className="p-6 text-base">حتى 11 كم</td>
                <td className="p-6 text-base">حتى 8 كم</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold text-base">لقط إشارة الـ 4G</td>
                <td className="p-6 text-base">حتى 22 كم</td>
                <td className="p-6 text-base">حتى 20 كم</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold text-base">دعم الترددات</td>
                <td className="p-6 text-base">من 1700 إلى 4000 ميجاهرتز</td>
                <td className="p-6 text-base">من 1700 إلى 4000 ميجاهرتز</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold text-base">مقاومة الرياح</td>
                <td className="p-6 text-base">تصميم انسيابي مبتكر لمقاومة الرياح</td>
                <td className="p-6 text-base">تصميم انسيابي مبتكر لمقاومة الرياح</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold text-base">الضمان</td>
                <td className="p-6 text-base">نضمن لك الفرق الفعلي أو استرجع مبلغك</td>
                <td className="p-6 text-base">نضمن لك الفرق الفعلي أو استرجع مبلغك</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

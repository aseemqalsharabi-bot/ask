/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Code, Layout, Sparkles, Zap } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center space-y-8"
      >
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
          <Sparkles className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
          مرحباً بك في موقعك الجديد!
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          نعم، بالتأكيد يمكنني بناء أي موقع ويب تريده. هذا مجرد نموذج مبدئي للبدء.
          أخبرني بالتفاصيل أو الفكرة التي تدور في ذهنك وسأقوم بتنفيذها فوراً.
        </p>

        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Layout className="w-6 h-6" />,
              title: "تصميم عصري",
              desc: "واجهات مستخدم جذابة ومتجاوبة مع جميع الشاشات."
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "أداء فائق",
              desc: "سرعة في التحميل وتجربة استخدام سلسة."
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: "تخصيص كامل",
              desc: "أي ميزة أو فكرة تفكر فيها يمكن برمجتها."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="pt-12 text-gray-500"
        >
          ما هو نوع الموقع الذي ترغب في تصميمه؟ (موقع شخصي، متجر إلكتروني، مدونة، لوحة تحكم...)
        </motion.div>
      </motion.div>
    </div>
  );
}

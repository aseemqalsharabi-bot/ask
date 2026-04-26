import { Phone, Instagram, MapPin, ChevronLeft, Globe, Send, MessageCircle } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useStore } from '../contexts/StoreContext';
import { Link } from 'react-router-dom';

const LOGO_URL = 'https://i.postimg.cc/vTddGz7n/1776031770147.png';

export default function Footer() {
  const { uiSettings, navigation } = useStore();

  return (
    <footer className="bg-brand-primary text-white pt-16 pb-8 overflow-hidden relative border-t border-white/10">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-right">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-6 group justify-center md:justify-start">
              <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10 group-hover:border-brand-accent/30 transition-all duration-500 shadow-2xl backdrop-blur-sm">
                <OptimizedImage src={LOGO_URL} alt="متجر عاصم لتقنية الشبكات" className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-500" widthParam={200} />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none mb-1.5">متجر عاصم لتقنية الشبكات</span>
                <span className="text-[9px] md:text-[10px] text-brand-accent font-black uppercase tracking-[0.2em] opacity-80">خبراء تقوية الفايف جي وحلول الإنترنت</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed font-medium mb-8 max-w-sm text-center md:text-right">
              متخصصون في حلول مشاكل الشبكة وضعف الإنترنت. نقدم أحدث أجهزة التقوية (الأنتينا) وخدمات تعديل الراوترات بإشراف هندسي متكامل لضمان أفضل أداء.
            </p>
            <div className="flex gap-3 items-center justify-center md:justify-start">
              {uiSettings.whatsappNumber && (
                <a 
                  href={`https://wa.me/${uiSettings.whatsappNumber}?text=${encodeURIComponent(uiSettings.whatsappMessage || 'مرحبا لدي سؤال')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-[#25D366]/20 border border-white/10"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                </a>
              )}
              {navigation.social?.instagram && (
                <a 
                  href={navigation.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-purple-500/20 border border-white/10"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              )}
              {navigation.social?.tiktok && (
                <a 
                  href={navigation.social.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-black/40 border border-white/10"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.08-.24-.17-.35-.25v7.02c.01 1.1-.16 2.22-.63 3.21-.88 1.96-2.82 3.14-4.84 3.33-2.73.15-5.39-1.36-6.45-3.86-1.08-2.41-.44-5.56 1.57-7.31.83-.72 1.87-1.2 2.97-1.34v4.13c-.4.06-.78.18-1.14.37-1.05.54-1.61 1.74-1.39 2.91.13.89.72 1.67 1.53 2.02 1.01.47 2.26.27 3.03-.54.45-.47.68-1.12.66-1.75V0l.01.02z"/></svg>
                </a>
              )}
              {navigation.social?.telegram && (
                <a 
                  href={navigation.social.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#0088cc] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-[#0088cc]/20 border border-white/10"
                  aria-label="Telegram"
                >
                   <Send size={20} />
                </a>
              )}
              {navigation.social?.salla && (
                <a 
                  href={navigation.social.salla} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#288b8e] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-[#288b8e]/20 border border-white/10"
                  aria-label="Salla Store"
                >
                  <Globe size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start md:pr-8">
            <h4 className="text-lg font-black text-white mb-6 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 w-10 h-1 bg-brand-accent rounded-full"></span>
            </h4>
            <ul className="space-y-3 w-full flex flex-col items-center md:items-start">
              {[
                { name: 'الرئيسية', href: '/' },
                { name: 'من نحن', href: '/about' },
                { name: 'سياسة الضمان', href: '/return-policy' },
                { name: 'سياسة الخصوصية', href: '/privacy-policy' },
                { name: 'تواصل معنا', href: '/contact' },
                { name: 'آراء العملاء', href: '/#reviews' },
                { name: 'الأسئلة الشائعة', href: '/#FAQ' }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-white/60 hover:text-brand-accent transition-all flex items-center gap-2 group text-sm font-bold">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform text-brand-accent hidden md:block" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-black text-white mb-6 relative inline-block">
              معلومات التواصل
              <span className="absolute -bottom-2 right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 w-10 h-1 bg-brand-accent rounded-full"></span>
            </h4>
            <ul className="space-y-5 w-full flex flex-col items-center md:items-start">
              <li className="flex flex-col md:flex-row gap-4 items-center md:items-start group text-center md:text-right">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-brand-accent/30 transition-all shadow-xl">
                  <Phone size={20} className="text-brand-accent" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-1">اتصل بنا الآن</span>
                  <a href={`tel:${uiSettings.whatsappNumber || '966559228957'}`} className="text-lg font-black hover:text-brand-accent transition-colors" dir="ltr">+{uiSettings.whatsappNumber || '966559228957'}</a>
                </div>
              </li>
              <li className="flex flex-col md:flex-row gap-4 items-center md:items-start group text-center md:text-right">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-brand-accent/30 transition-all shadow-xl">
                  <MapPin size={20} className="text-brand-accent" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-1">المقر الرئيسي</span>
                  <span className="text-sm font-black">المملكة العربية السعودية، جدة</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xs md:text-sm text-white/60 font-medium text-center md:text-right flex flex-wrap justify-center md:justify-start gap-1">
              <span>© {new Date().getFullYear()}</span>
              <span className="font-bold text-brand-accent whitespace-nowrap">متجر عاصم لتقنية الشبكات</span>
              <span>جميع الحقوق محفوظة.</span>
            </p>
            <p className="text-xs text-white/40 font-medium text-center md:text-right">
              نخدمكم في: الرياض، جدة، مكة، المدينة، الدمام، القصيم، تبوك، أبها، وكافة المناطق.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-white/40 font-medium shrink-0">
            <span>المملكة العربية السعودية</span>
            <span>حلول هندسية متكاملة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

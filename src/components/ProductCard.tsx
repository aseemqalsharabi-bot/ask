import * as React from 'react';
import { motion } from 'motion/react';
import { Zap, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Product } from '../constants';
import OptimizedImage from './OptimizedImage';
import { useStore } from '../contexts/StoreContext';

const LOGO_URL = 'https://i.postimg.cc/vTddGz7n/1776031770147.png';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { uiSettings } = useStore();
  const whatsappNumber = uiSettings?.whatsappNumber || '966559228957';

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productUrl = `https://www.asemnet.com/product/${product.id}`;
    const message = `مرحباً مهندس عاصم، أود الاستفسار عن ${product.name}\nالرابط: ${productUrl}\nوتأكيد توافقه مع موقعي`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card group flex flex-col h-full overflow-hidden border-white/10 hover:border-brand-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/10"
      itemScope
      itemType="https://schema.org/Product"
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative aspect-square bg-white/5 rounded-t-2xl md:rounded-t-[2rem] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* Inner white container for the product image to make it pop but keep the dark theme border */}
          <div className="absolute inset-2 md:inset-3 bg-white rounded-xl md:rounded-2xl shadow-[0_0_15px_rgba(0,229,255,0.15)] border border-brand-accent/30 flex items-center justify-center p-2 overflow-hidden">
            {product.image ? (
              <>
                <OptimizedImage 
                  itemProp="image"
                  src={product.image} 
                  alt={`${product.name} - أنتينا ميمو مطورة تتفوق على بدائل جرير وعلي إكسبريس وأمازون السعودية في دعم ترددات 5G STC زين موبايلي. تعديل راوترات احترافي أفضل من عالم الراوترات وأبو رامي وأبو سعود.`} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 aspect-square"
                  widthParam={400}
                />
                <div className="absolute bottom-2 left-2 opacity-10 pointer-events-none">
                  <OptimizedImage src={LOGO_URL} alt="Watermark" className="h-4 w-auto grayscale brightness-0" widthParam={200} />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-brand-primary/10">
                <Zap size={32} strokeWidth={1} />
                <span className="text-[6px] font-bold uppercase tracking-widest">قريباً</span>
              </div>
            )}
          </div>
          
          {product.tags?.map((tag, i) => (
            <span key={i} className={`absolute top-4 right-4 px-2.5 py-1 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-wider z-10 shadow-lg ${tag === 'الأكثر مبيعاً' ? 'bg-brand-accent text-brand-primary' : 'bg-brand-primary/80 text-white backdrop-blur-md border border-white/20'}`}>
              {tag}
            </span>
          ))}
          
          {product.outOfStock && (
            <div className="absolute inset-0 bg-brand-primary/80 backdrop-blur-[4px] flex items-center justify-center z-20">
              <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-4 py-1.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl">نفدت الكمية</span>
            </div>
          )}
        </div>
        
        <div className="p-4 md:p-6 flex-grow flex flex-col bg-white/5 backdrop-blur-sm rounded-b-2xl md:rounded-b-[2rem]">
          <p className="text-[8px] md:text-[10px] text-brand-accent font-black mb-1.5 uppercase tracking-widest">{product.category}</p>
          <h2 itemProp="name" className="font-bold text-white text-xs md:text-sm mb-3 line-clamp-2 h-10 md:h-12 leading-tight group-hover:text-brand-accent transition-colors">{product.name}</h2>
          
          <div className="mt-auto" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="SAR" />
            <meta itemProp="availability" content={product.outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"} />
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="text-base md:text-xl font-black text-brand-accent">
                <span itemProp="price" content={product.price.toString()}>{product.price}</span> 
                <small className="text-[10px] font-bold text-white/40">ريال</small>
              </span>
              {product.oldPrice && (
                <span className="text-xs text-white/30 line-through decoration-red-500/50">{product.oldPrice} ريال</span>
              )}
            </div>
            <button
              disabled={product.outOfStock}
              onClick={handleOrder}
              className={`w-full py-3 md:py-4 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                product.outOfStock 
                ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                : 'bg-brand-accent hover:bg-brand-accent/90 text-brand-primary shadow-lg shadow-brand-accent/20 active:scale-95'
              }`}
            >
              <span>طلب الآن</span>
              <ShoppingCart size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widthParam?: number; // Kept for backwards compatibility but not used for server scaling anymore
  quality?: number; // Kept for backwards compatibility 
  highPriority?: boolean; // Set true for LCP elements
  className?: string;
  itemProp?: string;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  widthParam = 800, 
  quality = 80,
  highPriority = false,
  className = '',
  itemProp,
  ...props 
}: OptimizedImageProps) {

  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    let finalSrc = src;
    if (src && src.startsWith('http') && !src.includes('wsrv.nl') && !src.endsWith('.svg')) {
       // Using wsrv.nl to automatically convert to WebP and compress
       const urlWithoutProtocol = src.replace(/^https?:\/\//, '');
       finalSrc = `https://wsrv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&output=webp&q=${quality}&w=${widthParam}&we`;
    }
    setCurrentSrc(finalSrc);
  }, [src, quality, widthParam]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={highPriority ? "eager" : "lazy"}
      decoding={highPriority ? "sync" : "async"}
      // @ts-ignore: fetchPriority is a valid HTML attribute but TS might complain depending on React version
      fetchPriority={highPriority ? "high" : "auto"}
      className={className}
      itemProp={itemProp}
      onError={() => {
        // Ultimate fallback: if the optimized URL fails, switch back to the raw URL
        if (currentSrc !== src) {
          setCurrentSrc(src);
        }
      }}
      {...props}
    />
  );
}

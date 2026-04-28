import React from 'react';

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

  // Global image optimizer (wsrv.nl automatically converts to WebP and scales and compresses it)
  // This drastically increases site speed directly from edge CDN.
  let finalSrc = src;
  if (src && src.startsWith('http') && !src.includes('wsrv.nl') && !src.endsWith('.svg')) {
     const urlWithoutProtocol = src.replace(/^https?:\/\//, '');
     finalSrc = `https://wsrv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&output=webp&q=${quality}&w=${widthParam}&we`;
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading={highPriority ? "eager" : "lazy"}
      decoding={highPriority ? "sync" : "async"}
      // @ts-ignore: fetchPriority is a valid HTML attribute but TS might complain depending on React version
      fetchPriority={highPriority ? "high" : "auto"}
      className={className}
      itemProp={itemProp}
      {...props}
    />
  );
}

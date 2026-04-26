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
  widthParam, 
  quality,
  highPriority = false,
  className = '',
  itemProp,
  ...props 
}: OptimizedImageProps) {

  return (
    <img
      src={src}
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

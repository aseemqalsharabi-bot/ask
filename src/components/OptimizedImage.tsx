import React, { useState, useEffect } from 'react';

// Must match the sizes in vercel.json exactly to avoid 400 INVALID_IMAGE_OPTIMIZE_REQUEST
const ALLOWED_SIZES = [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function getNearestSize(width: number): number {
  return ALLOWED_SIZES.find((size) => size >= width) || ALLOWED_SIZES[ALLOWED_SIZES.length - 1];
}

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  widthParam?: number;
  quality?: number;
  highPriority?: boolean; // Set true for LCP elements
  className?: string;
  itemProp?: string;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  widthParam = 1200, 
  quality = 75,
  highPriority = false,
  className = '',
  itemProp,
  ...props 
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  useEffect(() => {
    // Check if we are running in a local dev environment or AI Studio Preview (run.app)
    const isLocalOrPreview = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || 
       window.location.hostname === '127.0.0.1' || 
       window.location.hostname.includes('run.app'));

    // If we're not actually on Vercel, bypass the Vercel Edge API to ensure images display correctly
    if (isLocalOrPreview) {
      setImgSrc(src);
      return;
    }
    
    const isExternal = src.startsWith('http');
    const shouldOptimize = isExternal && !src.endsWith('.svg');
    
    if (shouldOptimize) {
      const safeWidth = getNearestSize(widthParam);
      setImgSrc(`/_vercel/image?url=${encodeURIComponent(src)}&w=${safeWidth}&q=${quality}`);
    } else {
      setImgSrc(src);
    }
  }, [src, widthParam, quality]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={highPriority ? "eager" : "lazy"}
      decoding={highPriority ? "sync" : "async"}
      // @ts-ignore: fetchPriority is a valid HTML attribute but TS might complain depending on React version
      fetchPriority={highPriority ? "high" : "auto"}
      className={className}
      itemProp={itemProp}
      onError={() => {
        // Ultimate fallback: if the optimized URL fails, switch back to the raw URL
        if (imgSrc !== src) {
          setImgSrc(src);
        }
      }}
      {...props}
    />
  );
}

import { useState, type ImgHTMLAttributes } from 'react'

interface BlurImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  lowSrc?: string
}

export function BlurImage({ src, alt, className = '', lowSrc, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!loaded && (
        <div 
          className="absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-300"
          style={{
            backgroundImage: lowSrc ? `url(${lowSrc})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: lowSrc ? 'blur(8px)' : 'none',
          }}
        />
      )}
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          setLoaded(true)
          props.onLoad?.(e)
        }}
        onError={(e) => {
          setLoaded(true)
          props.onError?.(e as React.SyntheticEvent<HTMLImageElement, Event>)
        }}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        {...props}
      />
    </div>
  )
}

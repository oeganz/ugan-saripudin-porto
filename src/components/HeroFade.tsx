import type { ReactNode, CSSProperties } from 'react';

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** CSS-only fade for above-the-fold hero — avoids Framer Motion on LCP path. */
export function HeroFade({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const style: CSSProperties = {
    animation: `hero-fade-in 0.6s ease-out ${delay}s both`,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

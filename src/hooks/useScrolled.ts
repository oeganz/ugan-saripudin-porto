import { useState, useEffect } from 'react'
export function useScrolled(threshold = 50): boolean {
  const [s, setS] = useState(false)
  useEffect(() => {
    const h = () => setS(window.scrollY > threshold)
    window.addEventListener('scroll', h, { passive: true })
    h()
    return () => window.removeEventListener('scroll', h)
  }, [threshold])
  return s
}
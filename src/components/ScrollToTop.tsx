import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If URL has a hash, scroll to that element with smooth animation
    if (hash) {
      const id = hash.slice(1)
      // Wait for page content to render (especially lazy sections)
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)
      return () => clearTimeout(timer)
    }

    // No hash — scroll to top
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

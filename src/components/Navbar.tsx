import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects', page: '/projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'AI-DLC', href: '#adlc-ecosystem' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Floating pill navigation — reference style:
 * rounded capsule, name left, links center, CTA right.
 */
export function Navbar() {
  const isScrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const loc = useLocation()
  const isHome = loc.pathname === '/'

  // Active section detection via scroll
  useEffect(() => {
    if (!isHome) return
    const handleScroll = () => {
      const offset = window.innerHeight * 0.35 + 80
      let closest: string | null = null
      let closestDist = Infinity
      navLinks.forEach(l => {
        const id = l.href.slice(1)
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(el.getBoundingClientRect().top - offset)
        if (dist < closestDist) {
          closestDist = dist
          closest = l.href
        }
      })
      if (closest) setActiveSection(closest)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const handleHashLink = (href: string) => {
    setOpen(false)
    if (!isHome) {
      window.location.href = `/${href}`
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href: string) => activeSection === href

  const linkCls = (active: boolean) =>
    `relative px-3.5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
      active ? 'text-white bg-white/[0.08]' : 'text-slate-400 hover:text-slate-100'
    }`

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-3 inset-x-3 sm:top-4 sm:inset-x-4 z-50"
      >
        <div
          className={`max-w-6xl mx-auto h-14 px-4 sm:px-5 rounded-full border flex items-center justify-between shadow-lg shadow-black/25 transition-colors duration-300 ${
            isScrolled
              ? 'bg-ink-950/95 border-white/[0.12]'
              : 'bg-ink-950/75 border-white/[0.07]'
          } backdrop-blur-xl`}
        >
          {/* Name */}
          <Link to="/" className="font-display text-sm font-bold tracking-wide whitespace-nowrap">
            <span className="text-slate-50">UGAN</span>{' '}
            <span className="text-brand-400">SARIPUDIN</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {isHome && navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleHashLink(l.href) }}
                className={linkCls(isActive(l.href))}
              >
                {l.label}
              </a>
            ))}
            {!isHome && (
              <>
                <Link to="/" className={linkCls(false)}>Home</Link>
                <Link to="/projects" className={linkCls(loc.pathname.includes('/projects'))}>Projects</Link>
                <Link to="/insights" className={linkCls(loc.pathname.includes('/insights'))}>Insights</Link>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:oeganz1999@gmail.com"
              className="hidden sm:inline-flex px-5 py-2 bg-brand-500 text-white text-xs font-bold rounded-full hover:bg-brand-400 transition-colors"
            >
              Let&apos;s Talk
            </a>
            <button
              className="lg:hidden text-slate-50 p-2 rounded-full hover:bg-white/[0.06] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[4.5rem] sm:inset-x-4 z-40 rounded-2xl bg-ink-950/97 backdrop-blur-2xl border border-white/[0.09] p-5 lg:hidden shadow-2xl shadow-black/40"
          >
            <div className="flex flex-col gap-1">
              {isHome && navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleHashLink(l.href) }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(l.href) ? 'text-white bg-white/[0.07]' : 'text-slate-300 hover:text-slate-50 hover:bg-white/[0.05]'
                  }`}
                >
                  {l.label}
                </a>
              ))}
              {!isHome && (
                <>
                  <Link to="/" className="px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/[0.05]" onClick={() => setOpen(false)}>Home</Link>
                  <Link to="/projects" className="px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/[0.05]" onClick={() => setOpen(false)}>Projects</Link>
                  <Link to="/insights" className="px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/[0.05]" onClick={() => setOpen(false)}>Insights</Link>
                </>
              )}
              <a
                href="mailto:oeganz1999@gmail.com"
                className="mt-3 px-4 py-3 bg-brand-500 text-white text-sm font-bold rounded-full text-center"
                onClick={() => setOpen(false)}
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

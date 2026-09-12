import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'Projects', href: '#projects', page: '/projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about-me' },
  { label: 'Insights', href: '#insights', page: '/insights' },
  { label: 'FAQs', href: '#faqs' },
]

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
      const offset = window.innerHeight * 0.35 + 64
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
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const handleHashLink = (href: string) => {
    setOpen(false)
    if (!isHome) return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href: string) => activeSection === href

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
        <nav
          className={`mx-auto max-w-5xl rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'bg-ink-950/90 border-brand-500/15 shadow-xl shadow-black/30 backdrop-blur-2xl'
              : 'bg-ink-950/60 border-white/[0.06] backdrop-blur-xl'
          }`}
        >
          <div className="h-14 px-5 flex items-center justify-between gap-4">
            {/* Name */}
            <Link to="/" className="text-sm font-bold tracking-tight whitespace-nowrap group">
              <span className="text-slate-50 group-hover:text-brand-400 transition-colors">Ugan </span>
              <span className="text-slate-400 group-hover:text-brand-400 transition-colors">Saripudin</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {isHome && navLinks.map((l) => (
                <div key={l.href} className="flex items-center">
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); handleHashLink(l.href) }}
                    className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                      isActive(l.href)
                        ? 'text-white bg-white/[0.08]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </a>
                  {l.page && (
                    <Link
                      to={l.page}
                      title={`Open ${l.label} page`}
                      className="-ml-1 mr-1 text-slate-600 hover:text-brand-400 transition-colors text-[10px]"
                    >
                      ↗
                    </Link>
                  )}
                </div>
              ))}
              {!isHome && (
                <>
                  <Link to="/" className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${loc.pathname === '/' ? 'text-white bg-white/[0.08]' : 'text-slate-400 hover:text-white'}`}>Home</Link>
                  <Link to="/projects" className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${loc.pathname.includes('/projects') ? 'text-white bg-white/[0.08]' : 'text-slate-400 hover:text-white'}`}>Projects</Link>
                  <Link to="/insights" className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${loc.pathname.includes('/insights') ? 'text-white bg-white/[0.08]' : 'text-slate-400 hover:text-white'}`}>Insights</Link>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <a
                href="mailto:oeganz1999@gmail.com"
                className="inline-flex items-center px-5 py-2 rounded-full bg-brand-500 text-white text-[13px] font-semibold shadow-lg shadow-brand-500/25 hover:bg-brand-400 transition-colors whitespace-nowrap"
              >
                Book a call
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-slate-50 p-2 rounded-full hover:bg-white/[0.06] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[4.5rem] z-40 rounded-3xl bg-ink-950/97 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/50 p-5 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {isHome && navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleHashLink(l.href) }}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive(l.href)
                      ? 'text-white bg-white/[0.08]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{l.label}</span>
                  {l.page && (
                    <Link
                      to={l.page}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-500 hover:text-brand-400 transition-colors"
                    >
                      ↗
                    </Link>
                  )}
                </a>
              ))}
              {!isHome && (
                <>
                  <Link to="/" className="px-4 py-3 rounded-2xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05]" onClick={() => setOpen(false)}>Home</Link>
                  <Link to="/projects" className="px-4 py-3 rounded-2xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05]" onClick={() => setOpen(false)}>Projects</Link>
                  <Link to="/insights" className="px-4 py-3 rounded-2xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05]" onClick={() => setOpen(false)}>Insights</Link>
                </>
              )}
              <a
                href="mailto:oeganz1999@gmail.com"
                className="mt-3 px-4 py-3 bg-brand-500 text-white text-sm font-semibold rounded-full text-center shadow-lg shadow-brand-500/25"
                onClick={() => setOpen(false)}
              >
                Book a call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

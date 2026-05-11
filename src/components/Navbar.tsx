import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ArrowUpRight } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'My Profile', href: '#about' },
  { label: '(01) ADLC', href: '#adlc-ecosystem' },
  { label: '(02) Insights', href: '#insights', page: '/insights' },
  { label: '(03) Projects', href: '#projects', page: '/projects' },
  { label: '(04) Experience', href: '#experience' },
  { label: '(05) Stack', href: '#stack' },
  { label: '(06) Contact', href: '#contact' },
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
      const offset = window.innerHeight * 0.35 + 64 // navbar height + viewport midpoint
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
    if (!isHome) return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href: string) => activeSection === href

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 shadow-xl shadow-black/20' : 'bg-slate-900/70'} backdrop-blur-2xl border-b border-slate-700/30`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-sm font-bold tracking-tight group">
            <span className="text-slate-50 group-hover:text-sky-400 transition-colors">Ugan</span>{' '}
            <span className="text-sky-400 group-hover:text-sky-300 transition-colors">Saripudin</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {isHome && navLinks.map((l) => (
              <div key={l.href} className="flex items-center"
              >
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleHashLink(l.href) }}
                  className={`relative px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                    isActive(l.href)
                      ? 'text-sky-400 bg-sky-400/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {l.label}
                  {/* Animated underline */}
                  {isActive(l.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-px bg-sky-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
                {l.page && (
                  <Link
                    to={l.page}
                    title={`Open ${l.label.replace(/^\(\d+\)\s*/, '')} page`}
                    className="px-1 py-2 text-slate-500 hover:text-sky-400 transition-colors"
                  >
                    <ArrowUpRight size={10} />
                  </Link>
                )}
              </div>
            ))}
            {!isHome && (
              <>
                <Link to="/" className="px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all"
                >
                  Home
                </Link>
                <Link to="/insights" className="px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all"
                >
                  Insights
                </Link>
                <Link to="/projects" className="px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all"
                >
                  Projects
                </Link>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a href="mailto:oeganx1999@gmail.com"
              className="px-5 py-2.5 bg-sky-400 text-slate-900 text-xs font-bold rounded-lg hover:bg-sky-300 transition-all shadow-lg shadow-sky-400/20 hover:shadow-sky-400/40 hover:scale-[1.02]">
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-slate-50 p-2 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setOpen(!open)} aria-label="menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-slate-900/98 backdrop-blur-2xl border-b border-slate-700/50 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {isHome && navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleHashLink(l.href) }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                    isActive(l.href)
                      ? 'text-sky-400 bg-sky-400/10'
                      : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{l.label}</span>
                  {l.page && (
                    <Link
                      to={l.page}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-500 hover:text-sky-400 transition-colors"
                    >
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </a>
              ))}
              {!isHome && (
                <>
                  <Link to="/" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800/60 transition-all" onClick={() => setOpen(false)}>
                    Home
                  </Link>
                  <Link to="/insights" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800/60 transition-all" onClick={() => setOpen(false)}>
                    Insights
                  </Link>
                  <Link to="/projects" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800/60 transition-all" onClick={() => setOpen(false)}>
                    Projects
                  </Link>
                </>
              )}
              <a href="mailto:oeganx1999@gmail.com" className="mt-3 px-4 py-3 bg-sky-400 text-slate-900 text-sm font-bold rounded-lg text-center" onClick={() => setOpen(false)}>
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

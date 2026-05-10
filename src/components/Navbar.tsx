import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ArrowUpRight } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

const navLinks = [
  { label: 'My Profile', href: '#about' },
  { label: '(01) ADLC', href: '#adlc-ecosystem' },
  { label: '(02) Projects', href: '#projects' },
  { label: '(03) Experience', href: '#experience' },
  { label: '(04) Stack', href: '#stack' },
  { label: '(05) Contact', href: '#contact' },
]

export function Navbar() {
  const isScrolled = useScrolled(50)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const loc = useLocation()
  const isHome = loc.pathname === '/'

  // Active section detection via IntersectionObserver
  useEffect(() => {
    if (!isHome) return
    const sections = navLinks.map(l => l.href.slice(1)).filter(Boolean)
    const observers: IntersectionObserver[] = []
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection('#' + id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
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
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-sm font-bold tracking-tight group">
            <span className="text-slate-50 group-hover:text-sky-400 transition-colors">Ugan</span>{' '}
            <span className="text-sky-400 group-hover:text-sky-300 transition-colors">Saripudin</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {isHome && navLinks.map((l) => (
              <a
                key={l.href}
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
            ))}
            {!isHome && (
              <Link to="/" className="px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-all">
                Home
              </Link>
            )}
            <Link
              to="/projects"
              className="ml-2 px-3 py-2 rounded-md text-xs font-medium text-sky-400/80 hover:text-sky-400 hover:bg-sky-400/10 transition-all flex items-center gap-0.5 border border-sky-400/20 hover:border-sky-400/40"
            >
              All Projects <ArrowUpRight size={10} />
            </Link>
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
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(l.href)
                      ? 'text-sky-400 bg-sky-400/10'
                      : 'text-slate-300 hover:text-slate-50 hover:bg-slate-800/60'
                  }`}
                >
                  {l.label}
                </a>
              ))}
              {!isHome && (
                <Link to="/" className="px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-50 hover:bg-slate-800/60 transition-all" onClick={() => setOpen(false)}>
                  Home
                </Link>
              )}
              <Link to="/projects" className="px-4 py-3 rounded-lg text-sm font-medium text-sky-400 hover:bg-sky-400/10 transition-all flex items-center gap-1" onClick={() => setOpen(false)}>
                All Projects <ArrowUpRight size={14} />
              </Link>
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

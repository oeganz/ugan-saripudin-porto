import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Footer — reference-style: oversized name wordmark with a fading
 * silver gradient, centered nav, socials, and a legal line.
 */
const nav = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/#projects' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Projects', href: '/projects' },
];

const socials = [
  { icon: Github, href: 'https://github.com/oeganz', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ugan', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:oeganz1999@gmail.com', label: 'Email' },
];

function smooth(hash: string) {
  const el = document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950 overflow-hidden">
      {/* Giant wordmark */}
      <div className="pt-14 md:pt-20 pb-6 px-4 select-none" aria-hidden="true">
        <p className="text-center font-display font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,10.5vw,9rem)] whitespace-nowrap bg-gradient-to-b from-slate-100 via-slate-400 to-slate-700 bg-clip-text text-transparent">
          UGAN SARIPUDIN
        </p>
      </div>
      <span className="sr-only">Ugan Saripudin</span>

      {/* Nav + socials */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8">
          {nav.map((l) =>
            l.href.startsWith('/#') ? (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  smooth(l.href.slice(2));
                }}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.label} to={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center justify-center gap-4 mb-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/40 transition-colors"
            >
              <s.icon className="w-4 h-4" />
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/40 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-slate-600">
            © 2026 Ugan Saripudin — GanzApps. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-700">
            React · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FadeIn } from './FadeIn';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Insights', href: '/insights' },
  { label: 'Experience', href: '/#about-me' },
  { label: 'Contact', href: '/#contact' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (href.startsWith('/#')) {
    const targetId = href.slice(2);
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate(`/#${targetId}`);
      }
    };
    return (
      <a href={href} onClick={handleClick} className="text-sm text-slate-400 hover:text-white transition-colors">
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors">
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#070B14] border-t border-white/[0.04] overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Giant metallic wordmark */}
        <FadeIn>
          <p
            className="metal-text text-center font-extrabold tracking-[-0.03em] leading-none select-none whitespace-nowrap text-[clamp(2.2rem,7.6vw,7rem)]"
            aria-hidden="true"
          >
            UGAN SARIPUDIN
          </p>
        </FadeIn>
        <p className="sr-only">Ugan Saripudin</p>

        {/* Center nav */}
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Footer">
          {footerLinks.map((l) => (
            <FooterLink key={l.label} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </nav>

        {/* Socials */}
        <div className="mt-9 flex items-center justify-center gap-4">
          {[
            { icon: Linkedin, href: 'https://linkedin.com/in/ugan', label: 'LinkedIn' },
            { icon: Github, href: 'https://github.com/oeganz', label: 'GitHub' },
            { icon: Mail, href: 'mailto:oeganz1999@gmail.com', label: 'Email' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-colors"
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Legal row */}
        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Ugan Saripudin. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with React + Tailwind — deployed on Vercel.
          </p>
        </div>
      </div>
    </footer>
  );
}

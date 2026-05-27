import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FadeIn } from './FadeIn';

const footerLinks = {
  work: [
    { label: 'Projects', href: '/projects' },
    { label: 'Case Studies', href: '/projects' },
    { label: 'Tech Stack', href: '/#stack' },
  ],
  about: [
    { label: 'Experience', href: '/#experience' },
    { label: 'Leadership', href: '/#adlc-ecosystem' },
  ],
  connect: [
    { label: 'GitHub', href: 'https://github.com/oeganz', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ugan', external: true },
    { label: 'Email', href: 'mailto:oeganz1999@gmail.com', external: false },
  ],
};

/* ── Smart link: external | hash-anchor | internal ── */
function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const baseClass =
    'text-sm text-slate-400 hover:text-sky-400 transition-colors inline-flex items-center gap-1';

  /* 1. External link */
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {children}
        <ArrowUpRight className="w-3 h-3 opacity-50" />
      </a>
    );
  }

  /* 2. Hash anchor → /#section */
  if (href.startsWith('/#')) {
    const targetId = href.slice(2); // remove '/#'

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();

      if (location.pathname === '/') {
        /* Same page → smooth scroll directly */
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        /* Different page → navigate, ScrollToTop handles the rest */
        navigate(`/#${targetId}`);
      }
    };

    return (
      <a href={href} onClick={handleClick} className={baseClass}>
        {children}
      </a>
    );
  }

  /* 3. Internal page link */
  return (
    <Link to={href} className={baseClass.replace('inline-flex items-center gap-1', '')}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative">
      {/* Pre-footer CTA band */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/5 to-transparent" />
        <FadeIn>
          <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-sky-400/70 mb-4">
              Open to Opportunities
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-5 tracking-tight">
              Let&apos;s Ship Something Great
            </h3>
            <p className="text-base text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Engineering lead for hire. 12+ developers led. 50M+ downloads delivered.
              Zero-drama execution from spec to production.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:oeganz1999@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-sky-400 text-slate-900 font-bold text-sm hover:bg-sky-300 transition-all shadow-lg shadow-sky-400/20"
              >
                <Mail className="w-4 h-4" />
                Start a Conversation
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-400 transition-colors font-medium"
              >
                View Projects <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Main Footer */}
      <div className="border-t border-slate-800/70">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-lg font-bold text-slate-100 tracking-tight">Ugan Saripudin</p>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xs">
                Engineering Lead building platforms that ship.
                10+ years. AI-native. Zero drama.
              </p>
              <div className="flex items-center gap-4 mt-5">
                <a
                  href="https://github.com/oeganz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-slate-500 hover:text-sky-400 transition-colors"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://linkedin.com/in/ugan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-slate-500 hover:text-sky-400 transition-colors"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="mailto:oeganz1999@gmail.com"
                  aria-label="Email"
                  className="text-slate-500 hover:text-sky-400 transition-colors"
                >
                  <Mail className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Work Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500 mb-4">Work</p>
              <ul className="space-y-3">
                {footerLinks.work.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500 mb-4">About</p>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[2px] text-slate-500 mb-4">Connect</p>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} external={link.external}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Ugan Saripudin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

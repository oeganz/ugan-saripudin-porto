import { Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
  { label: 'Projects', href: '/#/projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Tech Stack', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { icon: Github, label: 'oeganz', href: 'https://github.com/oeganz' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ugan' },
  { icon: Mail, label: 'Email', href: 'mailto:oeganz1999@gmail.com' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-slate-200">Ugan Saripudin</p>
            <p className="text-xs text-slate-500 mt-1">Engineering Lead · 10+ Years</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 hover:text-sky-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Ugan Saripudin. Built with React 19, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

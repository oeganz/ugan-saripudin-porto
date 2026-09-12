import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import { techIconMap } from '@/components/TechIcons';

/**
 * About — reference-style two-column block:
 * portrait card (photo, availability, socials, CTA) beside
 * bio + tech stack + compact experience rows.
 */

const stack = ['Kotlin', 'Android', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Python'];

const experience = [
  { role: 'Technical Lead', company: 'Sprout Digital Labs', period: '2022 — Present' },
  { role: 'Senior Mobile Engineer', company: 'Xtramile Solutions · AU', period: '2021 — 2022' },
  { role: 'Senior Software Engineer', company: 'Sprout Digital Labs', period: '2019 — 2021' },
  { role: 'Android → Lead Developer', company: 'Cudocomm / Klik Digital', period: '2015 — 2019' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-slate-50 mb-4">
            About Me
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-center text-slate-400 max-w-xl mx-auto mb-14 leading-relaxed">
            I build and lead systems that ship — scalable, observable, and made to last
            beyond the launch date.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[360px_1fr] gap-6 items-start">
          {/* ── Portrait card ── */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/50 overflow-hidden">
              <div className="aspect-[4/3.4] overflow-hidden bg-ink-700/40">
                <picture>
                  <source srcSet="/images/profile-real.webp" type="image/webp" />
                  <img
                    src="/images/profile-real.jpg"
                    alt="Ugan Saripudin — Engineering Lead"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="p-6 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[11px] font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  Open to opportunities
                </span>
                <h3 className="font-display font-bold text-xl tracking-tight text-slate-50 mb-1">
                  UGAN SARIPUDIN
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Engineering Lead — Mobile / Web / Backend · Indonesia (WIB)
                </p>
                <div className="flex items-center justify-center gap-3 mb-5">
                  {[
                    { icon: Github, href: 'https://github.com/oeganz', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://linkedin.com/in/ugan', label: 'LinkedIn' },
                    { icon: Mail, href: 'mailto:oeganz1999@gmail.com', label: 'Email' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/40 transition-colors"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white text-sm font-semibold hover:bg-brand-400 transition-colors"
                >
                  Let&apos;s talk
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Bio */}
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-800/50 p-7">
                <h3 className="text-lg font-bold text-slate-100 mb-3">
                  Hi! I&apos;m Ugan Saripudin,
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">
                  an engineering lead focused on building meaningful digital experiences.
                  Over the past decade I&apos;ve shipped mobile and web platforms with{' '}
                  <span className="text-slate-200 font-medium">50M+ combined downloads</span> —
                  from telecom self-care apps to hospital-grade clinical tooling — and led the
                  architecture behind them.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Today I specialize in{' '}
                  <span className="text-slate-200 font-medium">systems architecture</span> and{' '}
                  <span className="text-slate-200 font-medium">production-grade SDLC pipelines</span>:
                  AI-driven workflows, CI/CD with automated quality gates, and{' '}
                  <span className="text-slate-200 font-medium">12+ developers</span> across three
                  pods kept aligned — holding a{' '}
                  <span className="text-slate-200 font-medium">99.9% SLO</span> and{' '}
                  <span className="text-slate-200 font-medium">18 months without a production incident</span>.
                </p>
              </div>
            </FadeIn>

            {/* Tech stack */}
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-800/50 p-7">
                <p className="text-sm font-semibold text-slate-300 mb-5">My Tech Stack:</p>
                <div className="flex flex-wrap gap-3">
                  {stack.map((name) => {
                    const Icon = techIconMap[name];
                    return (
                      <span
                        key={name}
                        title={name}
                        className="w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300"
                      >
                        {Icon ? <Icon /> : <span className="text-[10px] font-mono">{name.slice(0, 2)}</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            {/* Experience rows */}
            <FadeIn delay={0.25}>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-800/50 p-7">
                <p className="text-sm font-semibold text-slate-300 mb-2">Experience</p>
                <ul className="divide-y divide-white/[0.06]">
                  {experience.map((e) => (
                    <li key={e.period} className="grid sm:grid-cols-[1fr_auto] gap-x-6 gap-y-0.5 py-3.5">
                      <span className="text-sm text-slate-200 font-medium">{e.role}</span>
                      <span className="text-xs font-mono text-slate-500 sm:text-right sm:self-center">{e.period}</span>
                      <span className="text-xs text-slate-500 sm:col-span-2">{e.company}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

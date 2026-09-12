import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { Github, Linkedin, Mail, Plus } from 'lucide-react';
import { useState } from 'react';

const experiences = [
  {
    role: 'Technical Lead',
    company: 'Sprout Digital Labs',
    period: '2022 — Present',
    current: true,
    summary: 'AI-driven spec workflows, CI/CD pipelines, and monolith-to-microservices migration for a 1M+ download SME platform.',
    highlights: [
      '3 engineering pods (12 developers) led through systematic AI adoption',
      'Documentation overhead down 40% via spec-driven workflows',
      'Zero production incidents in 18 months with automated quality gates',
    ],
  },
  {
    role: 'Senior Mobile Engineer',
    company: 'Xtramile Solutions Pty Ltd',
    period: '2021 — 2022',
    current: false,
    summary: 'Production-grade mobile refactoring for the MyBeepr clinical messaging platform serving Australian hospitals.',
    highlights: [
      '98% on-time delivery across 12 months fully remote (2hr timezone gap)',
      'Compliance-ready architecture under regulated healthcare requirements',
      'Performance monitoring & session replay tracking implementation',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Sprout Digital Labs',
    period: '2019 — 2021',
    current: false,
    summary: 'System architecture and spec-driven workflow patterns; translated business requirements into technical specifications.',
    highlights: [
      'AI-driven spec workflow established and adopted across 3+ teams',
      'Cross-functional collaboration with Product Managers and clients',
      'Full-stack delivery across multiple client projects',
    ],
  },
  {
    role: 'Android Developer → Lead Developer',
    company: 'PT Cudocomm / PT Klik Digital Sinergi',
    period: '2015 — 2019',
    current: false,
    summary: 'Shipped multiple native Android applications, progressing from IC to team lead — 3M+ combined downloads.',
    highlights: [
      'AxisNet: 3M+ downloads for the XL Axiata self-care app',
      'Managed 3+ developers and established code review practices',
      'Led full product lifecycle from concept to Google Play',
    ],
  },
];

const stackHighlights = [
  'Kotlin', 'Android SDK', 'React', 'TypeScript', 'Next.js', 'Node.js',
  'PostgreSQL', 'AWS', 'Docker', 'CI/CD', 'Claude Code', 'LLM Integration',
];

export function AboutSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-ink-950 py-20 md:py-28 px-4" id="about-me">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          headline="About Me"
          subheadline="I build intuitive digital products — scalable, high-performing, and made through collaboration."
        />

        <div className="grid lg:grid-cols-[380px_1fr] gap-6 items-start">

          {/* ── Profile card ── */}
          <FadeIn>
            <div className="surface-card rounded-3xl p-7 text-center lg:sticky lg:top-24 transition-colors">
              <div className="relative w-56 h-56 mx-auto rounded-3xl overflow-hidden border border-brand-400/20">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-600/40 via-brand-700/20 to-ink-950/60 mix-blend-multiply" aria-hidden="true" />
                <picture>
                  <source srcSet="/images/profile-real.webp" type="image/webp" />
                  <img
                    src="/images/profile-real.jpg"
                    alt="Ugan Saripudin"
                    width={224}
                    height={224}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover [filter:brightness(0.9)_saturate(0.85)]"
                  />
                </picture>
              </div>

              <span className="inline-flex items-center gap-1.5 mt-6 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Available for work
              </span>

              <h3 className="mt-4 text-3xl font-bold text-slate-50 tracking-tight">UGAN SARIPUDIN</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Engineering lead building platforms that ship — mobile, web, and AI-native teams.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                {[
                  { icon: Github, href: 'https://github.com/oeganz', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/ugan', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:oeganz1999@gmail.com', label: 'Email' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full border border-white/[0.09] bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-brand-400 hover:border-brand-500/30 transition-colors"
                  >
                    <s.icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>

              <a
                href="mailto:oeganz1999@gmail.com"
                className="mt-6 inline-flex w-full items-center justify-center px-6 py-3 rounded-full bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:bg-brand-400 transition-colors"
              >
                Let&apos;s Connect
              </a>
            </div>
          </FadeIn>

          {/* ── Right stack: bio, stack, experience ── */}
          <div className="flex flex-col gap-6 min-w-0">

            {/* Bio */}
            <FadeIn delay={0.05}>
              <div className="surface-card rounded-3xl p-7 md:p-8 transition-colors">
                <h3 className="text-lg font-semibold text-slate-50">
                  Hi! I&apos;m Ugan Saripudin,
                </h3>
                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-400">
                  an engineering lead passionate about building meaningful digital products. With a focus on
                  clean code, thoughtful design, and scalable solutions, I help turn ideas into products
                  people love to use — from first spec to production.
                </p>
                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-400">
                  I specialize in mobile development, cross-platform applications, and AI-augmented engineering
                  leadership — blending creativity with technical expertise to deliver work that&apos;s both
                  functional and visually compelling.
                </p>
              </div>
            </FadeIn>

            {/* Tech stack */}
            <FadeIn delay={0.1}>
              <div className="surface-card rounded-3xl p-7 md:p-8 transition-colors">
                <h3 className="text-lg font-semibold text-slate-50 mb-5">My Tech Stack</h3>
                <div className="flex flex-wrap gap-2.5">
                  {stackHighlights.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:border-brand-500/30 hover:text-white transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Plus Flutter, React Native, Vue, GraphQL, MongoDB, GitHub Actions, and the full Android SDK surface.
                </p>
              </div>
            </FadeIn>

            {/* Experience — hairline rows with expandable detail */}
            <FadeIn delay={0.15}>
              <div className="surface-card rounded-3xl p-7 md:p-8 transition-colors">
                <h3 className="text-lg font-semibold text-slate-50 mb-2">Experience</h3>
                <div>
                  {experiences.map((e, i) => {
                    const isOpen = open === i;
                    return (
                      <div key={`${e.company}-${e.period}`} className={i > 0 ? 'border-t border-white/[0.06]' : ''}>
                        <button
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="w-full py-4 flex items-center justify-between gap-4 text-left group"
                          aria-expanded={isOpen}
                        >
                          <div className="min-w-0">
                            <span className="block text-sm font-medium text-slate-100 truncate">
                              {e.role}
                              {e.current && (
                                <span className="ml-2 inline-flex items-center gap-1 align-middle px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 text-[10px] font-medium">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400" aria-hidden="true" />
                                  Current
                                </span>
                              )}
                            </span>
                            <span className="block text-xs text-slate-500 mt-0.5 truncate">{e.company}</span>
                          </div>
                          <span className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-xs text-slate-500 tabular-nums">{e.period}</span>
                            <span
                              className={`faq-icon w-7 h-7 rounded-full border border-white/[0.09] bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-brand-400 group-hover:border-brand-500/30 transition-colors ${
                                isOpen ? 'faq-open' : ''
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </span>
                          </span>
                        </button>
                        {isOpen && (
                          <div className="pb-5 pr-2">
                            <p className="text-sm text-slate-400 leading-relaxed">{e.summary}</p>
                            <ul className="mt-3 space-y-1.5">
                              {e.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2 text-[13px] text-slate-300">
                                  <span className="w-1 h-1 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" aria-hidden="true" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

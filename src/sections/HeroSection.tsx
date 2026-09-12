import { ArrowRight } from 'lucide-react';
import { HeroFade } from '@/components/HeroFade';

/**
 * Hero — reference layout: editorial copy left, circular portrait on a
 * soft brand field right, with four quiet floating stat chips.
 * Chips are static by design (no loops, no pulse).
 */
const chips = [
  { value: '10+', label: 'Years Experience', pos: 'left-0 top-6 lg:-left-2' },
  { value: '99.9%', label: 'SLO Achieved', pos: 'right-0 top-24 lg:-right-4' },
  { value: '50M+', label: 'Downloads Shipped', pos: 'left-2 bottom-24' },
  { value: '12+', label: 'Developers Led', pos: 'right-4 bottom-6' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950" aria-label="Introduction">
      {/* Quiet backdrop: faint blueprint grid + one soft brand field */}
      <div className="absolute inset-0 bg-blueprint" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-8 items-center">
          {/* ── Left: copy ── */}
          <div className="min-w-0">
            <HeroFade delay={0.05}>
              <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-brand-400/90 mb-6">
                {'// Engineering Lead — Mobile / Web / Backend'}
              </p>
            </HeroFade>

            <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.02]">
              <HeroFade delay={0.12}>
                <span className="block text-[clamp(2.6rem,6vw,4.6rem)] text-slate-50">
                  Hi! I&apos;m Ugan, building
                </span>
              </HeroFade>
              <HeroFade delay={0.2}>
                <span className="block text-[clamp(2.6rem,6vw,4.6rem)] text-slate-50">
                  <em className="text-brand-400 not-italic font-bold italic">production-grade</em>{' '}
                  systems.
                </span>
              </HeroFade>
            </h1>

            <HeroFade delay={0.28}>
              <p className="mt-7 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed">
                From first spec to production — AI-driven SDLC workflows,{' '}
                <span className="text-slate-200 font-medium">99.9% SLO</span>, and{' '}
                <span className="text-slate-200 font-medium">12+ developers</span> kept aligned
                and shipping.
              </p>
            </HeroFade>

            <HeroFade delay={0.36}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-semibold text-sm rounded-full hover:bg-brand-400 transition-colors"
                >
                  Let&apos;s talk
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center px-6 py-3.5 rounded-full border border-slate-700/80 text-slate-300 font-medium text-sm hover:border-slate-500 hover:text-white transition-colors"
                >
                  See my work
                </a>
              </div>
            </HeroFade>

            {/* Mobile stat chips — 2×2 grid replaces floating layout */}
            <HeroFade delay={0.44} className="grid grid-cols-2 gap-3 mt-10 lg:hidden">
              {chips.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-white/10 bg-ink-800/70 px-4 py-3.5"
                >
                  <div className="font-display text-2xl font-bold text-slate-50 leading-none">
                    {c.value}
                  </div>
                  <div className="mt-1.5 text-[11px] text-slate-400">{c.label}</div>
                </div>
              ))}
            </HeroFade>
          </div>

          {/* ── Right: circular portrait + floating chips (desktop) ── */}
          <HeroFade delay={0.3} className="hidden lg:block">
            <div className="relative w-fit mx-auto">
              {/* Soft brand field */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-brand-500/[0.14] blur-[90px]"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full border border-brand-500/15"
              />

              {/* Portrait */}
              <div className="relative w-[21rem] h-[21rem] rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                <picture>
                  <source srcSet="/images/profile-real.webp" type="image/webp" />
                  <img
                    src="/images/profile-real.jpg"
                    alt="Ugan Saripudin — Engineering Lead"
                    width={336}
                    height={336}
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>

              {/* Floating stat chips — static */}
              {chips.map((c, i) => (
                <div
                  key={c.label}
                  className={`absolute ${c.pos} rounded-2xl border border-white/10 bg-ink-800/85 backdrop-blur px-4 py-3 shadow-lg shadow-black/25`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="font-display text-[1.35rem] font-bold text-slate-50 leading-none">
                    {c.value}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">{c.label}</div>
                </div>
              ))}
            </div>
          </HeroFade>
        </div>
      </div>
    </section>
  );
}

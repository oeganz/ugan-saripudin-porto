import { HeroFade } from '@/components/HeroFade';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-900" id="about">
      {/* Quiet backdrop: faint blueprint grid + one soft field */}
      <div className="absolute inset-0 bg-blueprint" aria-hidden="true" />
      <div className="absolute -top-40 right-[-10%] w-[42rem] h-[42rem] rounded-full bg-brand-500/[0.045] blur-[130px]" aria-hidden="true" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

          {/* ── Left: editorial type block ── */}
          <div className="min-w-0">
            <HeroFade delay={0.05}>
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Open to opportunities
              </p>
            </HeroFade>

            <HeroFade delay={0.08}>
              <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.28em] text-brand-400/90 mb-6">
                {'// Engineering Lead — Mobile / Web / Backend'}
              </p>
            </HeroFade>

            <h1 className="font-display font-bold leading-[0.92] tracking-[-0.03em]">
              <HeroFade delay={0.12}>
                <span className="block text-[clamp(3.4rem,9vw,8.5rem)] text-slate-50">UGAN</span>
              </HeroFade>
              <HeroFade delay={0.2}>
                <span className="block text-[clamp(3.4rem,9vw,8.5rem)] text-outline">SARIPUDIN</span>
              </HeroFade>
            </h1>

            <HeroFade delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-400/80" />
                  Indonesia
                </span>
                <span className="text-slate-700">/</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-400/80" />
                  WIB — UTC+7
                </span>
                <span className="text-slate-700">/</span>
                <span>Est. 2015 — still shipping</span>
              </div>
            </HeroFade>

            <HeroFade delay={0.34}>
              <p className="mt-7 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed">
                I turn ambiguity into shipped products — from first spec to production.
                AI-driven workflows, <span className="text-slate-200 font-medium">99.9% SLO</span>, and technical
                leadership that keeps <span className="text-slate-200 font-medium">12+ developers</span> aligned and shipping.
              </p>
            </HeroFade>

            <HeroFade delay={0.42}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-500 text-white font-semibold text-sm rounded-lg hover:bg-brand-400 transition-colors">
                  View my work
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact"
                  className="inline-flex items-center px-6 py-3.5 border border-slate-700/80 text-slate-300 font-medium text-sm rounded-lg hover:border-slate-500 hover:text-white transition-colors">
                  Let's talk
                </a>
              </div>
            </HeroFade>

            <HeroFade delay={0.5}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-slate-500">
                <a href="https://github.com/oeganz" target="_blank" rel="noopener noreferrer"
                  className="hover:text-slate-300 transition-colors flex items-center gap-1.5" aria-label="GitHub">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  github.com/oeganz
                </a>
                <span className="text-slate-700">·</span>
                <a href="https://linkedin.com/in/ugan" target="_blank" rel="noopener noreferrer"
                  className="hover:text-slate-300 transition-colors flex items-center gap-1.5" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  in/ugan
                </a>
                <span className="text-slate-700">·</span>
                <a href="mailto:oeganz1999@gmail.com" className="hover:text-slate-300 transition-colors">
                  oeganz1999@gmail.com
                </a>
              </div>
            </HeroFade>
          </div>

          {/* ── Right: portrait, quiet presentation ── */}
          <HeroFade delay={0.3} className="hidden lg:block">
            <div className="relative">
              <div className="w-[320px] xl:w-[360px] rounded-lg overflow-hidden border border-slate-700/50 bg-ink-800 shadow-xl shadow-black/30">
                <picture>
                  <source srcSet="/images/profile-real.webp" type="image/webp" />
                  <img
                    src="/images/profile-real.jpg"
                    alt="Ugan Saripudin — Engineering Lead"
                    width={360}
                    height={360}
                    decoding="async"
                    fetchPriority="high"
                    className="w-full aspect-square object-cover"
                  />
                </picture>
              </div>

              {/* Caption row */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                <span>Ugan Saripudin</span>
                <span>Tangerang, ID</span>
              </div>

              {/* Soft grounding field */}
              <div className="absolute -inset-10 -z-10 bg-brand-500/[0.04] blur-3xl rounded-full" aria-hidden="true" />
            </div>
          </HeroFade>
        </div>

        {/* Scroll cue */}
        <HeroFade delay={0.6}>
          <div className="mt-16 lg:mt-20 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
            <span className="h-px w-10 bg-slate-700/70" aria-hidden="true" />
            <span>Scroll</span>
          </div>
        </HeroFade>
      </div>
    </section>
  );
}

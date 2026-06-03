import { useState } from 'react'
import { HeroFade } from '@/components/HeroFade';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { ParticleNetwork } from '@/components/ParticleNetwork';

export function HeroSection() {
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="about">
      <ParticleNetwork />
      <div className="absolute inset-0 bg-slate-900/40 z-10" />

      <div className="relative z-20 max-w-3xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          <HeroFade delay={0.1}>
            <div className="flex-shrink-0">
              <div className="relative w-36 h-36 md:w-44 md:h-44">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-sky-400/15 via-cyan-400/10 to-transparent blur-xl opacity-60" />
                <div className="absolute -inset-px rounded-full bg-gradient-to-br from-sky-400/40 via-cyan-300/20 to-sky-400/40" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-600/50 bg-slate-900">
                  <picture>
                    <source srcSet="/images/profile-real.webp" type="image/webp" />
                    <img
                      src="/images/profile-real.jpg"
                      alt="Ugan Saripudin"
                      width={176}
                      height={176}
                      decoding="async"
                      fetchPriority="high"
                      onLoad={() => setAvatarLoaded(true)}
                      className="w-full h-full object-cover transition-opacity duration-500"
                      style={{ opacity: avatarLoaded ? 1 : 0 }}
                    />
                    <div className="absolute inset-0 bg-slate-800 rounded-full animate-pulse" style={{ opacity: avatarLoaded ? 0 : 1, transition: 'opacity 0.3s' }} />
                  </picture>
                </div>
              </div>
            </div>
          </HeroFade>

          <div className="flex-1 text-center">
            <HeroFade>
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sky-400/10 border border-sky-400/20 text-[11px] font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-slate-200">Engineering Lead.</span>{' '}
                  <span className="text-sky-400">AI-Native.</span>{' '}
                  <span className="text-slate-200">Zero Drama.</span>
                </span>
              </div>
            </HeroFade>

            <HeroFade delay={0.15}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95]" style={{textShadow: '0 2px 30px rgba(0,0,0,0.6), 0 0 60px rgba(0,0,0,0.3)'}}>
                <span className="text-slate-50">UGAN</span>{' '}
                <span className="text-sky-400">SARIPUDIN</span>
              </h1>
            </HeroFade>

            <HeroFade delay={0.2}>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  Indonesia
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  WIB (UTC+7)
                </span>
              </div>
            </HeroFade>

            <HeroFade delay={0.25}>
              <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                I help stakeholders turn ambiguity into shipped products — from first spec to production. I help engineering teams move faster with AI-driven workflows, 99.9% SLO Achieved, and the kind of technical leadership that keeps 12+ developers aligned and shipping.
              </p>
            </HeroFade>

            <HeroFade delay={0.35}>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-all text-sm">
                  View My Work <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </HeroFade>

            <HeroFade delay={0.4}>
              <div className="mt-7 flex items-center justify-center gap-5 text-slate-500">
                <a href="https://github.com/oeganz" target="_blank" rel="noopener noreferrer" title="oeganz"
                  className="hover:text-sky-400 transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/in/ugan" target="_blank" rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="mailto:oeganz1999@gmail.com"
                  className="flex items-center gap-2 hover:text-sky-400 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  oeganz1999@gmail.com
                </a>
              </div>
            </HeroFade>
          </div>
        </div>
      </div>
    </section>
  );
}

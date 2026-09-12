import { HeroFade } from '@/components/HeroFade';
import { ArrowRight, MapPin } from 'lucide-react';

const chips = [
  { value: '10+', label: 'Years of Experience' },
  { value: '50M+', label: 'App Downloads' },
  { value: '12+', label: 'Developers Led' },
  { value: '99.9%', label: 'SLO Achieved' },
];

/** Floating glass chip positioned around the portrait (desktop). */
function Chip({ value, label, className, delay }: { value: string; label: string; className: string; delay: number }) {
  return (
    <HeroFade delay={delay} className={`absolute z-10 ${className}`}>
      <div className="glass-chip px-5 py-4">
        <p className="text-2xl md:text-[1.7rem] font-bold text-slate-50 leading-none tracking-tight">{value}</p>
        <p className="mt-1.5 text-xs text-slate-400 whitespace-nowrap">{label}</p>
      </div>
    </HeroFade>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950" id="about">
      {/* Ambient glow behind portrait side */}
      <div className="absolute top-1/4 right-[-12%] w-[46rem] h-[46rem] rounded-full bg-brand-500/[0.09] blur-[140px]" aria-hidden="true" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-brand-700/[0.07] blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">

          {/* ── Left: greeting block ── */}
          <div className="min-w-0">
            <HeroFade delay={0.05}>
              <h1 className="text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.14] tracking-[-0.02em] text-slate-100">
                Hi! I&apos;m Ugan Saripudin, building
                <span className="block italic text-white">AI-driven products.</span>
              </h1>
            </HeroFade>

            <HeroFade delay={0.14}>
              <p className="mt-6 max-w-lg text-base md:text-lg text-slate-400 leading-relaxed">
                From prototypes to production-ready systems — I turn ideas into
                scalable, user-focused products with{' '}
                <span className="text-slate-200 font-medium">50M+ downloads</span> and{' '}
                <span className="text-slate-200 font-medium">zero-drama delivery</span>.
              </p>
            </HeroFade>

            <HeroFade delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 hover:bg-brand-400 transition-colors"
                >
                  Let&apos;s Connect
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.09] text-slate-200 font-medium text-sm hover:bg-white/[0.1] hover:text-white transition-colors"
                >
                  See My Work
                </a>
              </div>
            </HeroFade>

            <HeroFade delay={0.3}>
              <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-brand-400/80" />
                Tangerang, Indonesia — WIB (UTC+7)
              </div>
            </HeroFade>

            {/* Mobile/tablet stat grid (portrait is hidden below lg) */}
            <HeroFade delay={0.36}>
              <dl className="lg:hidden mt-10 grid grid-cols-2 gap-3">
                {chips.map((c) => (
                  <div key={c.label} className="glass-chip px-4 py-4">
                    <dd className="text-2xl font-bold text-slate-50 leading-none tracking-tight">{c.value}</dd>
                    <dt className="mt-1.5 text-xs text-slate-400">{c.label}</dt>
                  </div>
                ))}
              </dl>
            </HeroFade>
          </div>

          {/* ── Right: halo portrait + floating chips (desktop) ── */}
          <div className="hidden lg:block" aria-hidden="false">
            <HeroFade delay={0.25}>
              <div className="relative mx-auto w-fit portrait-halo">
                {/* Portrait disc */}
                <div className="relative w-[340px] xl:w-[400px] aspect-square rounded-full overflow-hidden border border-brand-400/20 bg-ink-800">
                  <picture>
                    <source srcSet="/images/profile-real.webp" type="image/webp" />
                    <img
                      src="/images/profile-real.jpg"
                      alt="Ugan Saripudin — Engineering Lead"
                      width={400}
                      height={400}
                      decoding="async"
                      fetchPriority="high"
                      className="w-full h-full object-cover [filter:brightness(0.88)_saturate(0.85)]"
                    />
                  </picture>
                  {/* Blue duotone: white photo bg melts into the dark theme */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-600/45 via-brand-700/25 to-ink-950/75 mix-blend-multiply" aria-hidden="true" />
                  {/* Soft inner shadow so photo melts into the dark bg */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_90px_rgba(5,7,13,0.6)]" aria-hidden="true" />
                </div>

                {/* Floating chips — staggered around the disc */}
                <Chip value="50M+" label="App Downloads" className="-left-24 top-10" delay={0.4} />
                <Chip value="10+" label="Years of Experience" className="-right-16 top-0" delay={0.48} />
                <Chip value="12+" label="Developers Led" className="-left-16 bottom-6" delay={0.56} />
                <Chip value="99.9%" label="SLO Achieved" className="-right-20 bottom-16" delay={0.64} />
              </div>
            </HeroFade>
          </div>
        </div>
      </div>
    </section>
  );
}

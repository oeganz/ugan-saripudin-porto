/**
 * TrustedBy — quiet "companies I've built for" logo strip.
 * Logos scraped from live company sites / official assets (see /public/images/logos).
 * Static by design — no marquee, no animation.
 */
const whiteTileLogos = [
  { src: '/images/logos/co-telkominfra.jpg', alt: 'Telkominfra', h: 'h-9' },
  { src: '/images/logos/co-avant.jpg', alt: 'Avant', h: 'h-9' },
  { src: '/images/logos/co-generali.png', alt: 'Generali Indonesia', h: 'h-10' },
  { src: '/images/logos/co-asabri.jpg', alt: 'ASABRI', h: 'h-11' },
];

export function TrustedBy() {
  return (
    <section aria-label="Companies I have worked with" className="border-y border-white/[0.05] bg-ink-950/60 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-8">
          Platforms &amp; teams I&apos;ve built for
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {/* White wordmark — transparent PNG, sits directly on dark */}
          <img
            src="/images/logos/co-xlaxiata.png"
            alt="XLSMART (XL Axiata)"
            className="h-6 md:h-7 w-auto opacity-90"
            loading="lazy"
          />

          {/* Logos supplied on white — presented in uniform quiet tiles */}
          {whiteTileLogos.map((l) => (
            <span
              key={l.alt}
              className="inline-flex items-center rounded-lg bg-white/[0.97] px-3.5 py-1.5"
            >
              <img src={l.src} alt={l.alt} className={`${l.h} w-auto`} loading="lazy" />
            </span>
          ))}

          {/* Transparent brand wordmark */}
          <img
            src="/images/logos/labamu.png"
            alt="Labamu by SC Ventures"
            className="h-7 w-auto opacity-90"
            loading="lazy"
          />

          {/* Text wordmark for partners without a clean dark-mode asset */}
          <span className="font-display text-lg font-bold tracking-tight text-slate-400">
            SC&nbsp;Ventures
          </span>
        </div>
      </div>
    </section>
  );
}

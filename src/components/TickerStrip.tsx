const ITEMS = [
  'AI-NATIVE ENGINEERING',
  '50M+ DOWNLOADS SHIPPED',
  'ZERO INCIDENTS / 18MO',
  '12+ DEVS LED',
  'SPEC-DRIVEN WORKFLOWS',
  '99.9% SLO',
  'MONOLITH → MICROSERVICES',
  'EST. 2015 — STILL SHIPPING',
];

/** Marquee divider strip — runs once between hero and stats. */
export function TickerStrip() {
  const row = [...ITEMS, ...ITEMS]; // duplicated for seamless -50% loop
  return (
    <div
      className="marquee-hover relative overflow-hidden border-y border-white/[0.06] bg-ink-950 py-3"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-slate-500 whitespace-nowrap"
          >
            <span className="px-5">{item}</span>
            <span className="text-brand-500/70">✦</span>
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}

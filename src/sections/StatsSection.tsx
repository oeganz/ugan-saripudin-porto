import { FadeIn } from '@/components/FadeIn';

const stats = [
  { value: '10+', label: 'Years Experience', desc: 'Engineering leadership' },
  { value: '50M+', label: 'Users Downloaded', desc: 'Apps shipped' },
  { value: '99.9%', label: 'SLO Achieved', desc: 'Production reliability' },
  { value: '12+', label: 'Devs Led', desc: 'Across 3 pods' },
  { value: '18mo', label: 'Zero Incidents', desc: 'Production stability' },
  { value: '98%', label: 'On-Time Delivery', desc: 'Remote contract' },
];

export function StatsSection() {
  return (
    <section className="py-16 px-4" id="stats">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-10 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Impact at scale
            </span>
            <span className="h-px flex-1 bg-slate-800" aria-hidden="true" />
          </div>
        </FadeIn>

        {/* Editorial hairline grid — one surface, cells divided by 1px lines */}
        <FadeIn delay={0.1}>
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-800/60 border-y border-slate-800/60">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink-900 flex flex-col py-7 px-5">
                <dd className="order-1 font-display text-3xl md:text-[2.1rem] font-bold text-slate-50 tracking-tight leading-none">
                  {s.value}
                </dd>
                <dt className="order-2 mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {s.label}
                </dt>
                <dd className="order-3 mt-1 text-xs text-slate-600">{s.desc}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}

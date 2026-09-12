import { FadeIn } from '@/components/FadeIn';

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '50M+', label: 'App Downloads' },
  { value: '12+', label: 'Developers Led' },
  { value: '99.9%', label: 'SLO Achieved' },
];

/** Single rounded band, hairline-divided — reference style. */
export function StatsSection() {
  return (
    <section className="bg-ink-950 py-20 px-4" id="stats">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-brand-500/15 bg-brand-500/15">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0A101F] flex flex-col items-center text-center py-10 px-5">
                <dd className="text-4xl md:text-5xl font-bold text-slate-50 tracking-tight leading-none">
                  {s.value}
                </dd>
                <dt className="mt-3 text-sm text-slate-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}

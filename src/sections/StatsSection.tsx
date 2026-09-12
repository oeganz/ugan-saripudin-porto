import { FadeIn } from '@/components/FadeIn';

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '50M+', label: 'App Downloads Shipped' },
  { value: '99.9%', label: 'SLO Achieved' },
  { value: '12+', label: 'Developers Led' },
];

/**
 * Stats — reference-style single rounded container,
 * four figures separated by hairlines.
 */
export function StatsSection() {
  return (
    <section className="py-14 md:py-20 px-6" id="stats">
      <FadeIn>
        <dl className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 rounded-3xl border border-white/[0.07] bg-ink-800/50 overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center py-9 px-5 ${
                i > 0 ? 'border-l border-white/[0.06]' : ''
              } ${i > 1 ? 'max-lg:border-t max-lg:border-white/[0.06]' : ''} ${
                i === 2 ? 'max-lg:border-l-0' : ''
              }`}
            >
              <dd className="font-display text-4xl md:text-[2.75rem] font-bold text-slate-50 tracking-tight leading-none">
                {s.value}
              </dd>
              <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </FadeIn>
    </section>
  );
}

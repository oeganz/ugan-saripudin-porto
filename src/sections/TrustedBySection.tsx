import { HeroFade } from '@/components/HeroFade';

const companies = [
  'AXIS Telecom',
  'Sprout Digital',
  'Xtramile AU',
  'Labamu',
  'MyBeepr',
  'AgriAku',
];

/** Text wordmark strip — real organizations shipped for. */
export function TrustedBySection() {
  return (
    <section className="bg-ink-950 border-y border-white/[0.04] py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <HeroFade delay={0.05}>
          <p className="text-center text-sm text-slate-500 mb-9">Trusted by:</p>
        </HeroFade>
        <HeroFade delay={0.12}>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
            {companies.map((c, i) => (
              <li
                key={c}
                className={`text-slate-500 hover:text-slate-300 transition-colors select-none ${
                  i % 3 === 0
                    ? 'font-bold tracking-tight text-lg'
                    : i % 3 === 1
                      ? 'font-semibold uppercase tracking-[0.18em] text-sm'
                      : 'font-medium italic text-lg'
                }`}
              >
                {c}
              </li>
            ))}
          </ul>
        </HeroFade>
      </div>
    </section>
  );
}

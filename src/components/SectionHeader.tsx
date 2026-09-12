import { FadeIn } from './FadeIn';

/**
 * Centered section header — reference style:
 * big centered headline + soft centered subcopy, generous bottom space.
 */
export function SectionHeader({
  eyebrow,
  headline,
  subheadline,
  number,
}: {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  number?: string;
}) {
  return (
    <div className="mb-12 md:mb-16 text-center">
      {eyebrow && (
        <FadeIn>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {number ? `${number} — ` : ''}
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <FadeIn delay={0.08}>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.025em] text-slate-50">
          {headline}
        </h2>
      </FadeIn>
      {subheadline && (
        <FadeIn delay={0.16}>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

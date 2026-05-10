import { FadeIn } from './FadeIn';

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
    <div className="mb-10 md:mb-14">
      <FadeIn>
        <div className="flex items-center gap-3 mb-4">
          {number && (
            <span className="text-sm font-mono text-sky-400/70 font-semibold">{number}</span>
          )}
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[3px] text-sky-400/90">{eyebrow}</span>
          )}
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-[52px] font-extrabold leading-[1.05] tracking-[-1.5px] text-slate-50">
          {headline}
        </h2>
      </FadeIn>
      {subheadline && (
        <FadeIn delay={0.2}>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-400 max-w-2xl">
            {subheadline}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

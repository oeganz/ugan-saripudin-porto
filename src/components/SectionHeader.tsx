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
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          {number && (
            <span className="font-mono text-xs font-semibold text-brand-400 border border-brand-500/25 bg-brand-500/[0.07] px-2 py-1 rounded-sm tracking-wider">
              {number}
            </span>
          )}
          {eyebrow && (
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-brand-400/90">
              {eyebrow}
            </span>
          )}
          {/* Hairline rule — editorial grid line */}
          <span className="h-px flex-1 bg-gradient-to-r from-slate-700/60 to-transparent" aria-hidden="true" />
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-[52px] font-bold leading-[1.02] tracking-[-0.02em] text-slate-50">
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

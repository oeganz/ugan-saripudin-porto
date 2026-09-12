import { FadeIn } from '@/components/FadeIn';
import { ArrowRight } from 'lucide-react';

/** Slim rounded banner — statement left, pill CTA right. */
export function MidCTASection() {
  return (
    <section className="bg-ink-950 pb-20 md:pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-r from-[#0B1226] via-[#0A1128] to-[#0C1631] px-8 py-8 md:px-12 md:py-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 120% at 85% 50%, rgba(79,124,255,0.16), transparent 65%)' }}
              aria-hidden="true"
            />
            <p className="relative text-lg md:text-2xl font-semibold text-slate-100 tracking-tight">
              Zero-drama delivery — from first spec to production.
            </p>
            <a
              href="mailto:oeganz1999@gmail.com"
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 hover:bg-brand-400 transition-colors whitespace-nowrap"
            >
              Start a conversation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

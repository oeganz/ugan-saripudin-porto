import { ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn';

/**
 * Process — reference-style 01/02/03 cards with oversized numerals
 * clipped by the card edge, plus an inline CTA banner.
 * Maps directly to the AI-DLC deep-dive further down the page.
 */
const steps = [
  {
    num: '01',
    title: 'Define & Architect',
    desc: 'Map goals, constraints, and risks into a spec-driven foundation — clear scope before a line of code.',
  },
  {
    num: '02',
    title: 'Build & Develop',
    desc: 'Clean, modular code with AI-assisted workflows, review gates, and CI running from day one.',
  },
  {
    num: '03',
    title: 'Deploy & Support',
    desc: 'Observability, rollback plans, and automated quality gates — 18 months and counting with zero incidents.',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-slate-50 mb-4">
            Process
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-center text-slate-400 max-w-xl mx-auto mb-14 leading-relaxed">
            A production-grade SDLC drives every engagement — from architecture and
            build to deployment and post-launch support.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <StaggerItem key={s.num}>
              <div className="relative h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-ink-700/50 to-ink-800/60 overflow-hidden p-7 pt-4 transition-colors duration-200 hover:border-brand-500/35">
                {/* Oversized numeral, clipped by the card edge */}
                <span
                  aria-hidden="true"
                  className="block font-display font-bold text-brand-500 leading-[0.85] text-[6.5rem] -ml-3 select-none"
                >
                  {s.num}
                </span>
                <h3 className="relative text-lg font-bold text-slate-100 mt-5 mb-2.5">{s.title}</h3>
                <p className="relative text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Inline CTA banner */}
        <FadeIn delay={0.15}>
          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-ink-800/60 px-7 py-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <p className="flex-1 text-lg md:text-xl font-semibold text-slate-100 leading-snug">
              Build reliable, production-grade systems with a battle-tested SDLC.
            </p>
            <a
              href="#adlc-ecosystem"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white text-sm font-semibold hover:bg-brand-400 transition-colors whitespace-nowrap"
            >
              See the full AI-DLC
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { ADLCFlowDiagram } from '@/components/ADLCFlowDiagram';

const phases = [
  {
    num: '01',
    title: 'Define & Architect',
    desc: 'Define goals, map systems, and set the foundation — AI-assisted design and spec-driven workflows turn ambiguity into buildable specs.',
    tags: ['Spec-Driven', 'Visual-to-Code', 'Figma AI'],
  },
  {
    num: '02',
    title: 'Build & Test',
    desc: 'Write clean, modular code with AI pair programming — autonomous test generation and quality gates catch issues before they ship.',
    tags: ['Copilot', 'Cursor AI', 'Auto-Test Gen'],
  },
  {
    num: '03',
    title: 'Deploy & Support',
    desc: 'Deploy with confidence — risk-aware releases, canary analysis, observability, and feedback loops keep products fast and reliable.',
    tags: ['Canary AI', 'Smart Alerts', 'Feedback Loop'],
  },
];

export function ProcessSection() {
  return (
    <section className="bg-ink-950 py-20 md:py-28 px-4 relative overflow-hidden" id="process">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-brand-500/[0.05] blur-[120px] rounded-full" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          headline="Process"
          subheadline="A clear AI-augmented lifecycle drives each project — from strategy and design to development and post-launch support."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.08}>
              <div className="surface-card rounded-3xl p-8 h-full flex flex-col transition-colors">
                <span className="num-gradient text-[6.5rem] leading-[0.85] font-extrabold tracking-tight select-none -ml-1">
                  {p.num}
                </span>
                <h3 className="mt-8 text-xl font-semibold text-slate-50">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 flex-1">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Full ADLC loop diagram — the deeper dive */}
        <FadeIn delay={0.15}>
          <div className="mt-20">
            <ADLCFlowDiagram />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

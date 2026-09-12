import { Smartphone, Code2, Network } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn';

/**
 * Services — three capability cards, reference-style:
 * quiet outline cards on a faint blueprint grid.
 */
const services = [
  {
    icon: Smartphone,
    title: 'Mobile Engineering',
    desc: 'Native Android and cross-platform apps — 50M+ downloads shipped across telecom, health, agriculture, and finance.',
  },
  {
    icon: Code2,
    title: 'Web & Front-End',
    desc: 'React + TypeScript production systems — dashboards, commerce, and platforms built against strict performance budgets.',
  },
  {
    icon: Network,
    title: 'Systems Architecture & SDLC',
    desc: 'AI-driven development lifecycle, CI/CD pipelines, and monolith-to-microservices migrations engineered for 99.9% SLO.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-slate-50 mb-4">
            Services
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-center text-slate-400 max-w-xl mx-auto mb-14 leading-relaxed">
            From first prototype to production-grade systems — design, build, and scale,
            with the process to keep it running.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="h-full rounded-2xl border border-brand-500/15 bg-blueprint-card p-7 transition-colors duration-200 hover:border-brand-500/40">
                <div className="w-14 h-14 rounded-xl border border-brand-500/25 bg-brand-500/[0.08] flex items-center justify-center mb-6">
                  <s.icon className="w-6 h-6 text-brand-400" strokeWidth={1.6} />
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2.5">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

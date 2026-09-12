import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { Smartphone, Globe, Bot } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'Mobile Engineering',
    desc: 'Native Android and cross-platform apps built for scale — 50M+ downloads across telecom, fintech, health, and agri products.',
  },
  {
    icon: Globe,
    title: 'Web & Backend Platforms',
    desc: 'React front ends, Node.js services, and microservices architectures — from monolith migration to production-grade APIs.',
  },
  {
    icon: Bot,
    title: 'AI-Augmented Leadership',
    desc: 'Engineering teams led with AI-driven spec workflows and CI/CD quality gates — 12+ developers, 18 months, zero incidents.',
  },
];

export function ServicesSection() {
  return (
    <section className="bg-ink-950 py-20 md:py-28 px-4" id="services">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          headline="Services"
          subheadline="From interfaces to full-stack — I build modern products that are scalable, reliable, and user-friendly."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="surface-card rounded-3xl p-8 transition-colors h-full">
                {/* Line-art icon tile */}
                <div className="w-full aspect-[16/10] rounded-2xl border border-brand-500/20 bg-brand-500/[0.06] flex items-center justify-center mb-7 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(110,147,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(110,147,255,0.09) 1px, transparent 1px)',
                      backgroundSize: '26px 26px',
                    }}
                    aria-hidden="true"
                  />
                  <s.icon className="relative w-14 h-14 text-brand-400" strokeWidth={1.4} />
                </div>
                <h3 className="text-xl font-semibold text-slate-50">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'What kind of projects do you work on?',
    a: 'Mobile apps (native Android and cross-platform), web platforms, backend services and microservices, plus engineering leadership engagements — setting up AI-augmented workflows, CI/CD, and quality gates for teams that need to ship faster without losing control.',
  },
  {
    q: 'Do you take on contract or full-time work?',
    a: 'Both. I&apos;m open to engineering leadership roles, contract product development, and technical consulting. Recent work includes 12 months fully remote with an Australian team at 98% on-time delivery — distance and timezone have never been a blocker.',
  },
  {
    q: 'How do you approach new projects?',
    a: 'Spec before code. I start with goals and constraints, map the system, and write specs that AI agents and humans can execute against. From there it&apos;s build with quality gates, deploy with observability, and iterate on feedback — the same lifecycle that kept production incident-free for 18 months.',
  },
  {
    q: 'What does a typical timeline look like?',
    a: 'An MVP is usually weeks, not months — AI-assisted workflows compress design, coding, and testing. Larger platform work (migrations, zero-downtime releases) is scoped in phases so you see working software early and often.',
  },
  {
    q: 'How do we get started?',
    a: 'Email me with a short description of your product or problem. We&apos;ll schedule a call to align on scope and approach, then I&apos;ll come back with a concrete plan and estimate. No obligation, no sales funnel.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-ink-950 py-20 md:py-28 px-4" id="faqs">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          headline="Frequently Asked Questions"
          subheadline="Answers to common questions about my work and process."
        />

        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={f.q} delay={i * 0.05}>
                <div
                  className={`surface-card rounded-3xl overflow-hidden transition-colors ${
                    isOpen ? 'border-brand-500/30' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full px-7 py-6 flex items-center justify-between gap-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-semibold text-slate-100">{f.q}</span>
                    <span
                      className={`faq-icon w-9 h-9 flex-shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'faq-open border-brand-500/40 bg-brand-500/10 text-brand-400'
                          : 'border-white/[0.09] bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      className="px-7 pb-7 -mt-1 text-sm md:text-[15px] leading-relaxed text-slate-400"
                      dangerouslySetInnerHTML={{ __html: f.a }}
                    />
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

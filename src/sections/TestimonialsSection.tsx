import { StaggerContainer, StaggerItem } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { Quote, Linkedin } from 'lucide-react';

const testimonials = [
  {
    quote: "Ugan transformed how our engineering team approaches AI adoption. His systematic ADLC framework didn't just improve our workflow—it fundamentally changed how we think about development velocity and quality. Under his leadership, we achieved zero production incidents for 18 months while accelerating delivery. He's the rare technical leader who combines deep engineering expertise with genuine mentorship.",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "TechCorp Solutions",
    linkedin: "https://linkedin.com/in/placeholder",
  },
  {
    quote: "Working with Ugan was a masterclass in reliable delivery. He consistently translated complex business requirements into elegant technical solutions, always shipping on time without compromising quality. His communication bridged the gap between product vision and engineering reality. The 98% on-time delivery rate across our 12-month engagement speaks for itself—he's someone you can count on.",
    name: "Michael Rodriguez",
    title: "Head of Product",
    company: "HealthTech Innovations",
    linkedin: "https://linkedin.com/in/placeholder",
  },
  {
    quote: "Ugan is the mentor every developer wishes they had. He doesn't just review code—he teaches you to think architecturally. His feedback is precise, actionable, and always focused on growth. He created a culture where asking questions is encouraged and learning is continuous. I've grown more as an engineer in one year under his guidance than in the previous three.",
    name: "Alex Kumar",
    title: "Senior Software Engineer",
    company: "Sprout Digital Labs",
    linkedin: "https://linkedin.com/in/placeholder",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-slate-800/10" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="(04)"
          eyebrow="SOCIAL PROOF"
          headline="What People Say"
          subheadline="Feedback from engineering leaders, product partners, and team members who've worked alongside me."
        />

        <StaggerContainer staggerDelay={0.15} className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <StaggerItem key={i}>
              <div className="group h-full rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 hover:border-sky-400/40 hover:bg-slate-800/70 transition-all duration-300">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-sky-400/40 group-hover:text-sky-400/60 transition-colors" />
                </div>

                {/* Quote Text */}
                <blockquote className="text-sm text-slate-300 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-700/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-100 truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-sky-400/90 truncate">
                        {testimonial.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {testimonial.company}
                      </div>
                    </div>
                    {testimonial.linkedin && (
                      <a
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 rounded-lg bg-slate-900/60 border border-slate-700/50 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all"
                        aria-label={`${testimonial.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { MapPin, Calendar, Zap, Shield, TrendingUp, Users } from 'lucide-react';

const experiences = [
  {
    period: 'September 2022 - Present',
    role: 'Technical Lead',
    company: 'Sprout Digital Labs',
    location: 'Indonesia',
    color: 'amber',
    icon: Zap,
    isPresent: true,
    description: <>Architecting <span className="text-sky-400 font-semibold">spec-driven workflows</span>, <span className="text-sky-400 font-semibold">CI/CD pipelines</span>, and monolith-to-microservices migration for a <span className="text-sky-400 font-semibold">1M+ download SME platform</span>. Led <span className="text-sky-400 font-semibold">3 engineering pods (12 developers)</span> through systematic tooling adoption.</>,
    highlights: [
      <>Reduced documentation overhead by <span className="text-sky-400 font-semibold">40%</span> via spec-driven workflows</>,
      <><span className="text-sky-400 font-semibold">Zero production incidents</span> in 18 months with automated quality gates</>,
      <>Led <span className="text-sky-400 font-semibold">3 pods (12 devs)</span> through systematic AI capability adoption</>,
      <>Monolith-to-microservices migration for <span className="text-sky-400 font-semibold">1M+ download platform</span></>,
      <>Established <span className="text-sky-400 font-semibold">ADLC workflow</span> across 3+ project teams</>,
    ],
  },
  {
    period: 'May 2021 - May 2022',
    role: 'Senior Mobile Engineer',
    company: 'Xtramile Solutions Pty Ltd',
    location: 'Remote (Australia)',
    color: 'purple',
    icon: Shield,
    isPresent: false,
    description: <>Delivered production-grade mobile refactoring for <span className="text-sky-400 font-semibold">MyBeepr clinical messaging platform</span> serving Australian hospitals. <span className="text-sky-400 font-semibold">98% on-time delivery</span> across 12 months of fully remote work.</>,
    highlights: [
      <><span className="text-sky-400 font-semibold">98% on-time delivery</span> across 12 months fully remote (2hr timezone gap)</>,
      <><span className="text-sky-400 font-semibold">Performance monitoring</span> & session replay tracking implementation</>,
      <><span className="text-sky-400 font-semibold">Compliance-ready architecture</span> under regulated healthcare requirements</>,
      <>Deployed across <span className="text-sky-400 font-semibold">Australian hospital networks</span></>,
    ],
  },
  {
    period: 'March 2020 - September 2021',
    role: 'Senior Software Engineer',
    company: 'Sprout Digital Labs',
    location: 'Indonesia',
    color: 'sky',
    icon: TrendingUp,
    isPresent: false,
    description: <>Designed <span className="text-sky-400 font-semibold">system architecture</span> and spec-driven workflow patterns. Collaborated with <span className="text-sky-400 font-semibold">Product Managers and clients</span> to translate business requirements into technical specifications.</>,
    highlights: [
      <>Established <span className="text-sky-400 font-semibold">spec-driven development approach</span> adopted across teams</>,
      <><span className="text-sky-400 font-semibold">Cross-functional collaboration</span> with Product and clients</>,
      <><span className="text-sky-400 font-semibold">Full-stack delivery</span> across multiple client projects</>,
    ],
  },
  {
    period: 'January 2015 - January 2019',
    role: 'Android Developer to Lead Developer',
    company: 'PT Cudocomm / PT Klik Digital Sinergi',
    location: 'Indonesia',
    color: 'blue',
    icon: Users,
    isPresent: false,
    description: <>Built and shipped multiple <span className="text-sky-400 font-semibold">native Android applications</span>, progressing from IC to team lead. Delivered apps accumulating <span className="text-sky-400 font-semibold">3M+ combined downloads</span>. Led AxisNet and internal TelkomInfra enterprise apps.</>,
    highlights: [
      <><span className="text-sky-400 font-semibold">AxisNet: 3M+ downloads</span> for XL Axiata self-care app</>,
      <><span className="text-sky-400 font-semibold">3M+ combined downloads</span> across all shipped apps</>,
      <>Managed <span className="text-sky-400 font-semibold">3+ developers</span>, established code review practices</>,
      <>Led <span className="text-sky-400 font-semibold">full product lifecycle</span> from concept to Google Play</>,
    ],
  },
];

const colorMap: Record<string, { border: string; badge: string; dot: string; glow: string; lineGlow: string }> = {
  amber: {
    border: 'border-amber-400/15 hover:border-amber-400/35',
    badge: 'bg-amber-400/15 text-amber-400 border border-amber-400/25',
    dot: 'bg-amber-400',
    glow: 'shadow-amber-400/10',
    lineGlow: 'from-amber-400/40',
  },
  purple: {
    border: 'border-purple-400/15 hover:border-purple-400/35',
    badge: 'bg-purple-400/15 text-purple-400 border border-purple-400/25',
    dot: 'bg-purple-400',
    glow: 'shadow-purple-400/10',
    lineGlow: 'from-purple-400/40',
  },
  sky: {
    border: 'border-sky-400/15 hover:border-sky-400/35',
    badge: 'bg-sky-400/15 text-sky-400 border border-sky-400/25',
    dot: 'bg-sky-400',
    glow: 'shadow-sky-400/10',
    lineGlow: 'from-sky-400/40',
  },
  blue: {
    border: 'border-blue-400/15 hover:border-blue-400/35',
    badge: 'bg-blue-400/15 text-blue-400 border border-blue-400/25',
    dot: 'bg-blue-400',
    glow: 'shadow-blue-400/10',
    lineGlow: 'from-blue-400/40',
  },
};

export function ExperienceSection() {
  return (
    <section className="py-24 px-4 bg-slate-800/10" id="experience">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="(04)"
          eyebrow="PROFESSIONAL EXPERIENCE"
          headline="Career Timeline"
          subheadline="10+ years of progressive growth from Android Developer to Engineering Lead, delivering platforms at scale across 4 organizations."
        />

        <div className="mt-16 relative">
          {/* Center vertical line */}
          <div className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-slate-700/30" />

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const c = colorMap[exp.color];
              const isLast = i === experiences.length - 1;

              return (
                <FadeIn key={exp.period} delay={i * 0.15}>
                  <div className="relative flex gap-0">
                    {/* Timeline column — vertically centered */}
                    <div className="relative flex flex-col items-center w-12 md:w-14 flex-shrink-0 self-stretch">
                      {/* Top spacer line */}
                      <div className="w-px h-8 bg-slate-700/30" />

                      {/* Dot — always centered vertically on the card */}
                      <div className="flex-shrink-0 my-auto">
                        {exp.isPresent ? (
                          <div className="relative">
                            {/* Outer pulse rings */}
                            <div className="absolute -inset-2 rounded-full border border-amber-400/30 animate-ping" style={{ animationDuration: '2.5s' }} />
                            <div className="absolute -inset-3.5 rounded-full border border-amber-400/15 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.4s' }} />
                            {/* Core dot */}
                            <div className="relative w-5 h-5 rounded-full bg-amber-400 border-[3px] border-slate-900 shadow-lg shadow-amber-400/40" />
                          </div>
                        ) : (
                          <div className={`w-4 h-4 rounded-full ${c.dot} border-[3px] border-slate-900 shadow-md ${c.glow}`} />
                        )}
                      </div>

                      {/* Bottom line — connects to next card */}
                      <div className={`w-px flex-1 ${isLast ? 'bg-slate-700/30' : 'bg-slate-700/30'}`} />
                    </div>

                    {/* Card */}
                    <div className="flex-1 pb-2 pl-2">
                      <div
                        className={`relative rounded-xl bg-slate-800/30 border p-6 md:p-7 overflow-hidden transition-all duration-500 ${
                          exp.isPresent
                            ? 'border-amber-400/30 shadow-lg shadow-amber-400/10 hover:shadow-xl hover:shadow-amber-400/20'
                            : `${c.border} hover:bg-slate-800/45`
                        }`}
                      >
                        {/* Present: subtle glow overlay */}
                        {exp.isPresent && (
                          <>
                            <div
                              className="absolute inset-0 rounded-xl opacity-30 animate-pulse pointer-events-none"
                              style={{
                                background: 'radial-gradient(ellipse at 30% 20%, rgba(245,158,11,0.08) 0%, transparent 60%)',
                                animationDuration: '3s',
                              }}
                            />
                            <div
                              className="absolute -inset-px rounded-xl border border-amber-400/20 animate-pulse pointer-events-none"
                              style={{ animationDuration: '2.5s' }}
                            />
                          </>
                        )}

                        {/* Top gradient line */}
                        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${c.lineGlow} to-transparent`} />

                        <div className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-7">
                          {/* Left: Meta */}
                          <div className="md:w-52 flex-shrink-0">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${c.badge} mb-2.5`}>
                              <exp.icon className="w-3 h-3" />
                              {exp.role}
                            </span>
                            {exp.isPresent && (
                              <div className="mb-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/25 animate-pulse" style={{ animationDuration: '2.5s' }}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  Currently Here
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                              {exp.period}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              {exp.location}
                            </div>
                          </div>

                          {/* Right: Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-100 mb-2">{exp.company}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                              {exp.description}
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-2">
                              {exp.highlights.map((h, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 flex-shrink-0 opacity-60`} />
                                  <span className="leading-snug">{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

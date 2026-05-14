import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { getTechIcon } from '@/components/TechIcons';
import { Smartphone, Globe, Server, Cloud, Shield, Star } from 'lucide-react';

// Skill data with proficiency (1-5) and years of experience
// Proficiency: 5=Expert (daily use, can architect), 4=Proficient (production-grade), 3=Competent (can ship), 2=Familiar (used professionally), 1=Exposure (learning/academic)
const skillCategories = [
  {
    title: 'Mobile',
    icon: Smartphone,
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    skills: [
      { name: 'Kotlin', level: 5, years: 7 },
      { name: 'Android SDK', level: 5, years: 8 },
      { name: 'Java', level: 5, years: 9 },
      { name: 'React Native', level: 4, years: 4 },
      { name: 'Flutter', level: 3, years: 3 },
      { name: 'Firebase', level: 4, years: 6 },
      { name: 'SQLite', level: 4, years: 7 },
      { name: 'Push Notifications', level: 4, years: 6 },
    ],
  },
  {
    title: 'Frontend',
    icon: Globe,
    accent: 'text-sky-400',
    border: 'border-sky-500/20',
    bg: 'bg-sky-500/5',
    skills: [
      { name: 'React', level: 5, years: 5 },
      { name: 'TypeScript', level: 5, years: 5 },
      { name: 'Next.js', level: 4, years: 3 },
      { name: 'Vue.js', level: 4, years: 4 },
      { name: 'Tailwind CSS', level: 5, years: 4 },
      { name: 'JavaScript', level: 5, years: 9 },
      { name: 'HTML5/CSS3', level: 5, years: 10 },
      { name: 'Redux', level: 4, years: 4 },
    ],
  },
  {
    title: 'Backend & Data',
    icon: Server,
    accent: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    skills: [
      { name: 'Node.js', level: 4, years: 5 },
      { name: 'REST API', level: 5, years: 8 },
      { name: 'GraphQL', level: 3, years: 3 },
      { name: 'WebSocket', level: 4, years: 4 },
      { name: 'PostgreSQL', level: 4, years: 5 },
      { name: 'MongoDB', level: 3, years: 4 },
      { name: 'Python', level: 3, years: 3 },
      { name: 'Go', level: 2, years: 2 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    accent: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    skills: [
      { name: 'AWS', level: 4, years: 4 },
      { name: 'Docker', level: 3, years: 3 },
      { name: 'CI/CD', level: 4, years: 5 },
      { name: 'Git', level: 5, years: 9 },
      { name: 'GitHub Actions', level: 4, years: 3 },
      { name: 'Jenkins', level: 4, years: 6 },
      { name: 'Jira', level: 4, years: 6 },
      { name: 'Agile/Scrum', level: 4, years: 7 },
    ],
  },
  {
    title: 'AI & Emerging',
    icon: Shield,
    accent: 'text-rose-400',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/5',
    skills: [
      { name: 'AI Spec Workflows', level: 4, years: 2 },
      { name: 'LLM Integration', level: 4, years: 2 },
      { name: 'AI Agent Swarm', level: 4, years: 2 },
      { name: 'Payment Gateway', level: 4, years: 5 },
      { name: 'E2E Encryption', level: 4, years: 3 },
      { name: 'GPS/Maps', level: 4, years: 6 },
      { name: 'Camera Integration', level: 4, years: 5 },
      { name: 'Offline-First', level: 4, years: 5 },
      { name: 'NLP', level: 2, years: 2 },
    ],
  },
];

const proficiencyLabels: Record<number, string> = {
  5: 'Expert',
  4: 'Proficient',
  3: 'Competent',
  2: 'Familiar',
  1: 'Exposure',
};

const proficiencyColors: Record<number, string> = {
  5: 'bg-emerald-400',
  4: 'bg-sky-400',
  3: 'bg-amber-400',
  2: 'bg-slate-500',
  1: 'bg-slate-700',
};

function ProficiencyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`w-1.5 h-1.5 rounded-full ${
            dot <= level ? proficiencyColors[level] : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}

export function TechStackSection() {
  return (
    <section className="py-16 px-4" id="stack">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="(05)"
          eyebrow="TECHNOLOGY STACK"
          headline="Tools I Ship With"
          subheadline="10+ years across mobile, web, and cloud. Rated by production experience — not tutorial completions."
        />

        {/* Legend */}
        <FadeIn delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4 justify-center text-xs text-slate-500">
            <span className="uppercase tracking-wider font-medium">Proficiency:</span>
            {[5, 4, 3, 2].map((level) => (
              <div key={level} className="flex items-center gap-1.5">
                <ProficiencyDots level={level} />
                <span>{proficiencyLabels[level]}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Skill Categories */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <FadeIn key={cat.title} delay={i * 0.08}>
                <div className={`rounded-2xl border ${cat.border} ${cat.bg} p-6 hover:border-opacity-60 transition-all`}>
                  {/* Category header */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className={`w-8 h-8 rounded-lg bg-slate-800/60 flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${cat.accent}`} />
                    </div>
                    <h3 className={`text-sm font-bold ${cat.accent} uppercase tracking-wider`}>{cat.title}</h3>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-2.5">
                    {cat.skills.map((skill) => {
                      const IconComp = getTechIcon(skill.name);
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-3 group/skill"
                        >
                          {/* Tech icon */}
                          <span className="text-slate-500 group-hover/skill:text-slate-300 transition-colors w-4 flex-shrink-0">
                            {IconComp ? <IconComp /> : <Star className="w-3.5 h-3.5" />}
                          </span>

                          {/* Skill name */}
                          <span className="text-sm text-slate-300 group-hover/skill:text-white transition-colors flex-1 min-w-0">
                            {skill.name}
                          </span>

                          {/* Years */}
                          <span className="text-[10px] text-slate-600 font-mono tabular-nums">
                            {skill.years}y
                          </span>

                          {/* Proficiency dots */}
                          <ProficiencyDots level={skill.level} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}

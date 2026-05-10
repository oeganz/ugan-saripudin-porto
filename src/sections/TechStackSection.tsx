import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';

const categories = [
  {
    title: 'Mobile',
    icon: '📱',
    skills: ['Java', 'Kotlin', 'Android SDK', 'React Native', 'Flutter', 'Firebase', 'Push Notifications', 'SQLite'],
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  {
    title: 'Web Frontend',
    icon: '⚡',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Redux'],
    color: 'from-sky-500/20 to-cyan-500/20',
    border: 'border-sky-500/30',
    text: 'text-sky-400',
  },
  {
    title: 'Backend & APIs',
    icon: '🔧',
    skills: ['Node.js', 'REST API', 'GraphQL', 'WebSocket', 'PostgreSQL', 'MongoDB', 'Python', 'Go'],
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    text: 'text-green-400',
  },
  {
    title: 'DevOps & Cloud',
    icon: '☁️',
    skills: ['AWS', 'Azure', 'Docker', 'CI/CD', 'Git', 'GitHub Actions', 'Jira', 'Agile/Scrum'],
    color: 'from-orange-500/20 to-amber-500/20',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
  },
  {
    title: 'Specialized',
    icon: '🎯',
    skills: ['Payment Gateway', 'E2E Encryption', 'GPS/Maps', 'Barcode/QR', 'NLP', 'Camera Integration', 'Offline-First', 'WebRTC'],
    color: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
];

export function TechStackSection() {
  return (
    <section className="py-24 px-4" id="stack">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          number="(04)"
          eyebrow="TECHNOLOGY STACK"
          headline="Technical Expertise"
          subheadline="Comprehensive toolkit spanning mobile native, cross-platform, web, and cloud infrastructure."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.08}>
              <div className={`group p-6 rounded-xl bg-slate-800/40 border ${cat.border} hover:border-opacity-60 transition-all`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className={`text-lg font-bold ${cat.text}`}>{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/40 text-sm text-slate-300 hover:bg-slate-700/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '9+', label: 'Years Coding' },
              { value: '21', label: 'Production Projects' },
              { value: '50M+', label: 'Downloads Served' },
              { value: '7', label: 'Industries' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-slate-800/40 border border-slate-700/30">
                <div className="text-2xl font-bold text-cyan-400 font-mono">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

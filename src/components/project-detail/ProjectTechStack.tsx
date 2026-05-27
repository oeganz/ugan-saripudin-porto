import { FadeIn } from '@/components/FadeIn';
import { getTechIcon, DefaultTechIcon } from '@/components/TechIcons';
import {
  Layout, Server, Cloud, Database, BrainCircuit, Lock,
  Smartphone, Globe, CreditCard, Navigation, Wifi, Shield,
  Cpu, MessageSquare, Camera, HardDrive, Barcode,
  MapPin, Fingerprint, Layers, Sparkles
} from 'lucide-react';

interface ProjectTechStackProps {
  techStack: string[];
}

// Categorize technologies with color-coded groups
const techCategories = [
  {
    id: 'mobile',
    label: 'Mobile',
    icon: Smartphone,
    accent: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    chipBg: 'bg-emerald-400/8',
    chipBorder: 'border-emerald-400/15',
    chipText: 'text-emerald-300',
    keywords: ['Android', 'Kotlin', 'Java', 'React Native', 'Flutter', 'iOS', 'Swift'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Layout,
    accent: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    chipBg: 'bg-sky-400/8',
    chipBorder: 'border-sky-400/15',
    chipText: 'text-sky-300',
    keywords: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind', 'Redux', 'HTML5/CSS3'],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: Server,
    accent: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    chipBg: 'bg-violet-400/8',
    chipBorder: 'border-violet-400/15',
    chipText: 'text-violet-300',
    keywords: ['Node.js', 'Python', 'Go', 'REST API', 'GraphQL', 'WebSocket', 'B2B Marketplace'],
  },
  {
    id: 'data',
    label: 'Data & Storage',
    icon: Database,
    accent: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    chipBg: 'bg-amber-400/8',
    chipBorder: 'border-amber-400/15',
    chipText: 'text-amber-300',
    keywords: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Firebase'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: Cloud,
    accent: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    chipBg: 'bg-cyan-400/8',
    chipBorder: 'border-cyan-400/15',
    chipText: 'text-cyan-300',
    keywords: ['AWS', 'GCP', 'Azure', 'Docker', 'CI/CD', 'Git', 'GitHub Actions', 'Microservices', 'Oracle Cloud'],
  },
  {
    id: 'specialized',
    label: 'Specialized',
    icon: Sparkles,
    accent: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    chipBg: 'bg-rose-400/8',
    chipBorder: 'border-rose-400/15',
    chipText: 'text-rose-300',
    keywords: [
      'E2E Encryption', 'WebRTC', 'GPS/Maps', 'Barcode/QR', 'NLP',
      'Camera Integration', 'Offline-First', 'Payment Gateway',
      'Push Notifications', 'Sharia-compliant Architecture',
      'Biometric Auth', 'AI Chatbot', 'Geo-location', 'AI / MCP',
      'WhatsApp API', 'GPS Tracking', 'Agile/Scrum', 'Jira',
    ],
  },
];

// Fallback icon mapping for tech keywords
const fallbackIcons: Record<string, typeof Cpu> = {
  'Sharia-compliant Architecture': Shield,
  'Biometric Auth': Fingerprint,
  'AI Chatbot': BrainCircuit,
  'AI / MCP': BrainCircuit,
  'Payment Gateway': CreditCard,
  'Push Notifications': Wifi,
  'GPS/Maps': MapPin,
  'Geo-location': Navigation,
  'Barcode/QR': Barcode,
  'E2E Encryption': Lock,
  'Camera Integration': Camera,
  'Offline-First': HardDrive,
  'WhatsApp API': MessageSquare,
  'B2B Marketplace': Globe,
  'REST API': Globe,
  'GPS Tracking': MapPin,
  'Microservices': Layers,
  'Oracle Cloud': Cloud,
  'AI/ML': Sparkles,
  'HTML5/CSS3': Layout,
};

function categorizeTech(tech: string) {
  for (const cat of techCategories) {
    if (cat.keywords.some(k => tech.toLowerCase().includes(k.toLowerCase()))) {
      return cat;
    }
  }
  // Check fallback keywords more loosely
  for (const cat of techCategories) {
    for (const kw of cat.keywords) {
      if (kw.toLowerCase().includes(tech.toLowerCase()) || tech.toLowerCase().includes(kw.toLowerCase())) {
        return cat;
      }
    }
  }
  // Default to specialized
  return techCategories[techCategories.length - 1];
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  // Group techs by category
  const grouped: Record<string, { cat: typeof techCategories[0]; items: string[] }> = {};

  for (const tech of techStack) {
    const cat = categorizeTech(tech);
    if (!grouped[cat.id]) {
      grouped[cat.id] = { cat, items: [] };
    }
    grouped[cat.id].items.push(tech);
  }

  const groups = Object.values(grouped).filter(g => g.items.length > 0);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Technology Stack</h2>
              <p className="text-sm text-slate-500 mt-0.5">Technologies and tools powering this project</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group, gi) => {
            const CatIcon = group.cat.icon;
            return (
              <FadeIn key={group.cat.id} delay={gi * 0.08}>
                <div className={`rounded-2xl border ${group.cat.border} bg-slate-800/30 p-5 hover:bg-slate-800/50 transition-all`}>
                  {/* Category header */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className={`w-8 h-8 rounded-lg ${group.cat.bg} flex items-center justify-center`}>
                      <CatIcon className={`w-4 h-4 ${group.cat.accent}`} />
                    </div>
                    <h3 className={`text-sm font-semibold ${group.cat.accent}`}>{group.cat.label}</h3>
                    <span className="text-[10px] text-slate-600 ml-auto font-mono">{group.items.length}</span>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech) => {
                      const IconComp = getTechIcon(tech);
                      const FallbackIcon = fallbackIcons[tech];

                      return (
                        <span
                          key={tech}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${group.cat.chipBg} border ${group.cat.chipBorder} ${group.cat.chipText} text-xs font-medium transition-all hover:scale-[1.03]`}
                        >
                          <span className="opacity-70">
                            {IconComp ? <IconComp /> : FallbackIcon ? <FallbackIcon className="w-3 h-3" /> : <DefaultTechIcon />}
                          </span>
                          {tech}
                        </span>
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

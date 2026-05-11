import { FadeIn } from '@/components/FadeIn';
import { getTechIcon, DefaultTechIcon } from '@/components/TechIcons';

interface ProjectTechStackProps {
  techStack: string[];
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Tech Stack</h2>
        </FadeIn>

        <div className="flex flex-wrap gap-4">
          {techStack.map((tech, i) => {
            const IconComp = getTechIcon(tech);
            const Icon = IconComp || DefaultTechIcon;
            return (
              <FadeIn key={tech} delay={i * 0.05}>
                <div className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/30 transition-all">
                  <Icon />
                  <span className="text-slate-300 group-hover:text-white transition-colors">{tech}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

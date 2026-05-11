import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/FadeIn';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

interface RelatedProjectsProps {
  currentProject: Project;
  heroImages: Record<string, string>;
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400/20 text-emerald-400',
  inactive: 'bg-slate-600/30 text-slate-500',
  internal: 'bg-amber-400/20 text-amber-400',
  discontinued: 'bg-red-400/20 text-red-400',
};

export function RelatedProjects({ currentProject, heroImages }: RelatedProjectsProps) {
  const related = projects
    .filter(p => p.id !== currentProject.id)
    .filter(p => p.category === currentProject.category || p.industry === currentProject.industry)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">Related Projects</h2>
              <p className="text-slate-400 mt-2">More from {currentProject.industry} industry</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <Link to={`/projects/${project.id}`}
                className="group block rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/40 transition-all overflow-hidden">
                <div className="relative h-40 bg-slate-700 overflow-hidden">
                  {heroImages[project.id] ? (
                    <img
                      src={heroImages[project.id]}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <span className="text-2xl font-bold text-slate-600">{project.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                      {project.name}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{project.company}</p>
                  <div className="flex items-center gap-2 text-sm text-sky-400">
                    View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

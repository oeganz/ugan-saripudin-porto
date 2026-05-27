import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/FadeIn';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

interface RelatedProjectsProps {
  currentProject: Project;
  heroImages: Record<string, string>;
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
  inactive: 'bg-slate-600/20 text-slate-500 border-slate-600/20',
  internal: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
  discontinued: 'bg-red-400/15 text-red-400 border-red-400/20',
};

export function RelatedProjects({ currentProject, heroImages }: RelatedProjectsProps) {
  const related = projects
    .filter(p => p.id !== currentProject.id)
    .filter(p => p.category === currentProject.category || p.industry === currentProject.industry)
    .slice(0, 3);

  if (related.length === 0) {
    // Fallback: just show any 3 other projects
    const fallback = projects
      .filter(p => p.id !== currentProject.id)
      .slice(0, 3);
    if (fallback.length === 0) return null;
    return <RelatedProjectsContent related={fallback} currentProject={currentProject} heroImages={heroImages} />;
  }

  return <RelatedProjectsContent related={related} currentProject={currentProject} heroImages={heroImages} />;
}

function RelatedProjectsContent({
  related,
  currentProject,
  heroImages,
}: {
  related: Project[];
  currentProject: Project;
  heroImages: Record<string, string>;
}) {
  return (
    <>
      <FadeIn>
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Related Projects</h2>
              <p className="text-sm text-slate-500 mt-0.5">More from {currentProject.industry}</p>
            </div>
          </div>
          <Link
            to="/projects"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-400 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-5">
        {related.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.1}>
            <Link
              to={`/projects/${project.id}`}
              className="group block rounded-2xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/30 transition-all overflow-hidden hover:shadow-lg hover:shadow-sky-400/5"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                {heroImages[project.id] ? (
                  <img
                    src={heroImages[project.id]}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <span className="text-4xl font-black text-slate-700">{project.name.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors text-base leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{project.company}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors flex-shrink-0 mt-1" />
                </div>

                {/* Platform tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.platform.slice(0, 3).map(p => (
                    <span key={p} className="px-2 py-0.5 rounded-md bg-slate-700/30 text-slate-400 text-[10px] font-medium">
                      {p}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-md bg-sky-400/10 text-sky-400 text-[10px] font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* Mobile View All link */}
      <div className="md:hidden mt-6 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-sky-400 transition-colors"
        >
          View All Projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}

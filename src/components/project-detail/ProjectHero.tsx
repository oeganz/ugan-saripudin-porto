import { FadeIn } from '@/components/FadeIn';
import { ProjectHeroSVG } from '@/components/ProjectHeroSVG';
import type { Project } from '@/data/projects';

interface ProjectHeroProps {
  project: Pick<Project, 'id' | 'name' | 'company' | 'timeline' | 'roleLevel' | 'industry' | 'platform'>;
  heroImage?: string;
}

const roleColors: Record<string, string> = {
  android: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
  mobile: 'bg-green-400/20 text-green-400 border-green-400/30',
  'senior-fe': 'bg-purple-400/20 text-purple-400 border-purple-400/30',
  'tech-lead': 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  'lead-dev': 'bg-rose-400/20 text-rose-400 border-rose-400/30',
};

const roleLabels: Record<string, string> = {
  android: 'Android Developer',
  mobile: 'Mobile Developer',
  'senior-fe': 'Senior Front End Engineer',
  'tech-lead': 'Tech Lead',
  'lead-dev': 'Lead Developer',
};

export function ProjectHero({ project, heroImage }: ProjectHeroProps) {
  const hasImage = heroImage && heroImage.length > 0;

  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {hasImage ? (
          <>
            <img
              src={heroImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
          </>
        ) : (
          <ProjectHeroSVG project={project} />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
        <FadeIn direction="up">
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${roleColors[project.roleLevel]}`}>
              {roleLabels[project.roleLevel]}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            {project.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-2">{project.company}</p>
          <p className="text-slate-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {project.timeline}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

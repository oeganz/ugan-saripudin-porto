import { FadeIn } from '@/components/FadeIn';
import { ProjectHeroSVG } from '@/components/ProjectHeroSVG';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Building2 } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectHeroProps {
  project: Pick<Project, 'id' | 'name' | 'company' | 'timeline' | 'roleLevel' | 'industry' | 'platform' | 'category' | 'status'>;
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

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
  inactive: 'bg-slate-600/30 text-slate-500 border-slate-600/30',
  internal: 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  discontinued: 'bg-red-400/20 text-red-400 border-red-400/30',
};

const categoryColors: Record<string, string> = {
  Telecom: 'text-cyan-400 bg-cyan-400/10',
  HealthTech: 'text-emerald-400 bg-emerald-400/10',
  FinTech: 'text-sky-400 bg-sky-400/10',
  AgriTech: 'text-green-400 bg-green-400/10',
  InsurTech: 'text-amber-400 bg-amber-400/10',
  Enterprise: 'text-slate-300 bg-slate-400/10',
  'Social Impact': 'text-rose-400 bg-rose-400/10',
  EdTech: 'text-violet-400 bg-violet-400/10',
  Gaming: 'text-pink-400 bg-pink-400/10',
  'E-commerce': 'text-orange-400 bg-orange-400/10',
};

export function ProjectHero({ project, heroImage }: ProjectHeroProps) {
  const hasImage = heroImage && heroImage.length > 0;
  const catColor = categoryColors[project.industry] || 'text-slate-300 bg-slate-400/10';

  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden">
      {/* Background Image or SVG */}
      <div className="absolute inset-0">
        {hasImage ? (
          <>
            <img
              src={heroImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />
          </>
        ) : (
          <ProjectHeroSVG project={project} />
        )}
      </div>

      {/* Animated mesh overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 120%, rgba(6,182,212,0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 pt-32 w-full">
        {/* Breadcrumb */}
        <FadeIn direction="up" delay={0}>
          <Link
            to="/#/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          {/* Category + Role + Status row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${catColor}`}>
              {project.industry}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleColors[project.roleLevel]}`}>
              {roleLabels[project.roleLevel]}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>

          {/* Project Name */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-5 tracking-tight leading-[1.05]">
            {project.name}
          </h1>

          {/* Company */}
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-400" />
              <span className="text-lg font-medium">{project.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              <span className="text-lg">{project.timeline}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/FadeIn';
import { getTechIcon, DefaultTechIcon } from '@/components/TechIcons';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/data/projects';

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
  active: 'bg-emerald-400/20 text-emerald-400',
  inactive: 'bg-slate-600/30 text-slate-500',
  internal: 'bg-amber-400/20 text-amber-400',
  discontinued: 'bg-red-400/20 text-red-400',
};

const projectImages: Record<string, string> = {
  // Featured - hero images
  axisnet: '/images/proj-axisnet.jpg',
  mybeepr: '/images/proj-mybeepr.jpg',
  'aku-berbagi': '/images/proj-akuberbagi.jpg',
  agriaku: '/images/proj-agriaku.jpg',
  labamu: '/images/proj-labamu.jpg',
  'go-great': '/images/proj-gogreat.jpg',
  // Others - screenshots
  asabri: '/images/projects/screenshots/asabri_screenshot_01.jpg',
  bluegaz: '/images/projects/screenshots/bluegaz_screenshot_01.jpg',
  smarco: '/images/projects/screenshots/smarco_screenshot_01.jpg',
  'sahabat-berbagi': '/images/projects/screenshots/sahabat_screenshot_01.jpg',
  skillbridge: '/images/projects/screenshots/skillbridge_screenshot_01.jpg',
  'kuis-milioner': '/images/projects/screenshots/kuismilioner_hero_01.jpg',
  'laut-nusantara': '/images/projects/screenshots/lautnusantara_screenshot_01.jpg',
  'my-telkominfra': '/images/projects/screenshots/mytelkominfra_screenshot_01.jpg',
  'net-gear': '/images/projects/screenshots/netgear_screenshot_01.jpg',
  // Generated images (no originals available)
  absensi: '/images/projects/screenshots/absensi_screenshot_01.jpg',
  mobilegrosir: '/images/projects/screenshots/mobilegrosir_screenshot_01.jpg',
  sacti: '/images/projects/screenshots/sacti_screenshot_01.jpg',
  'ime-mobile': '/images/projects/screenshots/ime_mobile_screenshot_01.jpg',
  'konsultasi-bhayangkari': '/images/projects/screenshots/konsultasi_bhayangkari_screenshot_01.jpg',
  sentiment: '/images/projects/screenshots/sentiment_screenshot_01.jpg',
  'mds-moments': '/images/projects/screenshots/mds_moments_screenshot_01.jpg',
};

const metricColor = (val: string): string => {
  if (val.includes('M') || val.includes('Billion')) return 'text-sky-400 border-sky-400/30';
  if (val.includes('Hospitals')) return 'text-purple-400 border-purple-400/30';
  if (val.includes('Award') || val.includes('Champion') || val.includes('CX')) return 'text-amber-400 border-amber-400/30';
  if (val.includes('Trained') || val.includes('Entrepreneurs')) return 'text-cyan-400 border-cyan-400/30';
  if (val.includes('SME') || val.includes('Partner')) return 'text-emerald-400 border-emerald-400/30';
  return 'text-sky-400 border-sky-400/30';
};

function TechTag({ name }: { name: string }) {
  const IconComp = getTechIcon(name);
  const Icon = IconComp || DefaultTechIcon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/60 text-xs text-slate-400 border border-slate-700/30 hover:border-slate-500/40 transition-colors">
      <Icon />
      <span>{name}</span>
    </span>
  );
}

interface ProjectCardProps {
  project: Project;
  variant?: 'carousel' | 'grid';
  index?: number;
}

export function ProjectCard({ project, variant = 'grid', index = 0 }: ProjectCardProps) {
  const m = project.metrics;
  const metricLabel = m.downloads ? m.downloads :
    m.hospitals ? `${m.hospitals} Hospitals` :
    m.heritage_funds ? m.heritage_funds :
    m.certification ? m.certification :
    m.funding ? (m.funding.includes('total') ? '$46M+ Funded' : m.funding) :
    m.entrepreneurs_trained ? `${m.entrepreneurs_trained} Entrepreneurs` :
    m.award ? 'CX Champion 2024' :
    m.smes_served ? `${m.smes_served} SMEs Served` :
    m.partner_agents ? `23,390+ Partners` :
    m.award_cx ? 'CX Champion 2024' :
    m.award_engagement ? 'Digital Engagement Champion' :
    m.parent_revenue ? m.parent_revenue :
    m.app_type ? m.app_type : '';

  const cardClass = variant === 'carousel'
    ? 'w-[340px] md:w-[400px] flex-shrink-0 snap-start'
    : 'w-full';

  return (
    <FadeIn key={project.id} delay={index * 0.08}>
      <Link
        to={`/projects/${project.id}`}
        className={`group h-full ${cardClass} rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/40 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer`}
      >
        {/* Image */}
        <div className={`relative ${variant === 'carousel' ? 'h-52' : 'h-44'} bg-slate-800 overflow-hidden`}>
          {(projectImages[project.id] || project.screenshots[0]) ? (
            <img
              src={projectImages[project.id] || project.screenshots[0]}
              alt={project.name}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <div className="text-4xl font-black text-slate-700">{project.name.charAt(0)}</div>
            </div>
          )}
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
          {/* Status */}
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          {/* Metric */}
          {metricLabel && (
            <div className="absolute bottom-3 left-3">
              <span className={`px-3 py-1.5 rounded-lg bg-slate-900/90 text-sm font-bold border ${metricColor(metricLabel)}`}>
                {metricLabel}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-400 transition-colors truncate">
            {project.name}
          </h3>
          <p className="text-xs text-slate-500 mb-3 truncate">{project.company}</p>
          <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Role */}
          <div className="mb-3">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[project.roleLevel]}`}>
              {roleLabels[project.roleLevel]}
            </span>
          </div>

          {/* Tech Stack with Icons */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, variant === 'carousel' ? 4 : 3).map((t) => (
              <TechTag key={t} name={t} />
            ))}
            {project.techStack.length > (variant === 'carousel' ? 4 : 3) && (
              <span className="px-2 py-1 text-xs text-slate-600 self-center">+{project.techStack.length - (variant === 'carousel' ? 4 : 3)}</span>
            )}
          </div>

          {/* Links - using buttons to avoid nested <a> inside <a> */}
          <div className="flex items-center gap-4 pt-3 border-t border-slate-700/30">
            {project.urls.play_store && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.urls.play_store, '_blank', 'noopener,noreferrer'); }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.71 11.5 20.71 11.95C20.71 12.4 20.5 12.82 20.16 13.09L17.89 14.47L15.39 12L17.89 9.53L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/></svg>
                Play Store
              </button>
            )}
            {project.urls.website && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.urls.website, '_blank', 'noopener,noreferrer'); }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Website
              </button>
            )}
            {project.urls.app_store && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.urls.app_store, '_blank', 'noopener,noreferrer'); }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </button>
            )}
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

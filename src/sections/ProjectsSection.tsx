import { useRef } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { featuredProjects } from '@/data/projects';
import { getTechIcon, DefaultTechIcon } from '@/components/TechIcons';
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

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

const metricColor = (val: string): string => {
  if (val.includes('M') || val.includes('Billion')) return 'text-sky-400 border-sky-400/30';
  if (val.includes('Hospitals')) return 'text-purple-400 border-purple-400/30';
  if (val.includes('Award') || val.includes('Champion')) return 'text-amber-400 border-amber-400/30';
  if (val.includes('Trained') || val.includes('Entrepreneurs')) return 'text-cyan-400 border-cyan-400/30';
  return 'text-sky-400 border-sky-400/30';
};

const projectImages: Record<string, string> = {
  axisnet: '/images/proj-axisnet.jpg',
  mybeepr: '/images/proj-mybeepr.jpg',
  'aku-berbagi': '/images/proj-akuberbagi.jpg',
  agriaku: '/images/proj-agriaku.jpg',
  labamu: '/images/proj-labamu.jpg',
  'go-great': '/images/proj-gogreat.jpg',
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

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            number="(03)"
            eyebrow="FEATURED PROJECTS"
            headline="Flagship Projects"
            subheadline="The most impactful projects delivered across 9+ years — from 50M+ download telecom apps to award-winning insurance platforms."
          />
          <div className="hidden md:flex items-center gap-2 mb-4">
            <button onClick={() => scroll('left')}
              className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')}
              className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          <div ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {featuredProjects.map((project, i) => {
              const metricLabel = project.metrics.downloads ? project.metrics.downloads :
                project.metrics.hospitals ? `${project.metrics.hospitals} Hospitals` :
                project.metrics.heritage_funds ? project.metrics.heritage_funds :
                project.metrics.funding ? project.metrics.funding :
                project.metrics.entrepreneurs_trained ? `${project.metrics.entrepreneurs_trained} Entrepreneurs` :
                project.metrics.award ? 'CX Champion 2024' : '';

              return (
                <FadeIn key={project.id} delay={i * 0.08}>
                  <div className="group w-[340px] md:w-[400px] flex-shrink-0 snap-start rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/40 transition-all duration-300 overflow-hidden flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 bg-slate-800 overflow-hidden">
                      <img
                        src={projectImages[project.id] || ''}
                        alt={project.name}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = 'none';
                          const parent = t.parentElement;
                          if (parent) {
                            parent.classList.add('flex', 'items-center', 'justify-center');
                            const fallback = document.createElement('div');
                            fallback.className = 'text-center';
                            fallback.innerHTML = `<div class="text-4xl font-black text-slate-700">${project.name.charAt(0)}</div>`;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
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
                        {project.techStack.slice(0, 4).map((t) => (
                          <TechTag key={t} name={t} />
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 text-xs text-slate-600 self-center">+{project.techStack.length - 4}</span>
                        )}
                      </div>

                      {/* Links - Play Store / Website / App Store */}
                      <div className="flex items-center gap-4 pt-3 border-t border-slate-700/30">
                        {project.urls.play_store && (
                          <a href={project.urls.play_store} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.71 11.5 20.71 11.95C20.71 12.4 20.5 12.82 20.16 13.09L17.89 14.47L15.39 12L17.89 9.53L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/></svg>
                            Play Store
                          </a>
                        )}
                        {project.urls.website && (
                          <a href={project.urls.website} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors">
                            <ExternalLink className="w-3.5 h-3.5" />
                            Website
                          </a>
                        )}
                        {project.urls.app_store && (
                          <a href={project.urls.app_store} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                            App Store
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* View All CTA */}
        <FadeIn delay={0.5}>
          <div className="mt-10">
            <a href="#/projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-800/60 border border-slate-600 text-slate-200 font-semibold hover:bg-sky-400/10 hover:border-sky-400/40 hover:text-sky-400 transition-all text-sm">
              View All 21 Projects <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

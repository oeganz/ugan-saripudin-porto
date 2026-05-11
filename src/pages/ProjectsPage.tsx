import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/FadeIn';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { projects, roleFilters, industryFilters, statusFilters } from '@/data/projects';
import type { Project } from '@/data/projects';
import { ArrowLeft, ExternalLink, Calendar, Tag, Filter, Building2 } from 'lucide-react';

const roleColors: Record<string, string> = {
  android: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
  mobile: 'bg-green-400/20 text-green-400 border-green-400/30',
  'senior-fe': 'bg-purple-400/20 text-purple-400 border-purple-400/30',
  'tech-lead': 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  'lead-dev': 'bg-red-400/20 text-red-400 border-red-400/30',
};

const roleLabels: Record<string, string> = {
  android: 'Android Developer',
  mobile: 'Mobile Developer',
  'senior-fe': 'Senior Front End Engineer',
  'tech-lead': 'Tech Lead',
  'lead-dev': 'Lead Developer',
};

const statusColors: Record<string, string> = {
  active: 'bg-green-400/20 text-green-400',
  inactive: 'bg-slate-600/30 text-slate-500',
  internal: 'bg-amber-400/20 text-amber-400',
  discontinued: 'bg-red-400/20 text-red-400',
};

const heroMetric = (p: Project): { label: string; value: string } | null => {
  if (p.metrics.downloads) return { label: 'Downloads', value: p.metrics.downloads };
  if (p.metrics.hospitals) return { label: 'Hospitals', value: p.metrics.hospitals };
  if (p.metrics.heritage_funds) return { label: 'Heritage Funds', value: p.metrics.heritage_funds };
  if (p.metrics.funding) return { label: 'Funding', value: p.metrics.funding };
  if (p.metrics.entrepreneurs_trained) return { label: 'Trained', value: p.metrics.entrepreneurs_trained };
  if (p.metrics.award) return { label: 'Award', value: 'CX Champion 2024' };
  if (p.metrics.fishermen_reached) return { label: 'Fishermen', value: p.metrics.fishermen_reached };
  if (p.metrics.gmv_growth) return { label: 'GMV Growth', value: p.metrics.gmv_growth };
  return null;
};

export default function ProjectsPage() {
  const [catFilter, setCatFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [indFilter, setIndFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (catFilter !== 'All' && !p.category.includes(catFilter)) return false;
      if (roleFilter !== 'All') {
        const label = roleLabels[p.roleLevel];
        if (label !== roleFilter) return false;
      }
      if (indFilter !== 'All' && p.industry !== indFilter) return false;
      if (statusFilter !== 'All' && p.status !== statusFilter.toLowerCase()) return false;
      return true;
    });
  }, [catFilter, roleFilter, indFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="mb-10">
              <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight">
                All <span className="text-sky-400">21 Projects</span>
              </h1>
              <p className="mt-4 text-slate-400 max-w-2xl text-lg">
                A comprehensive portfolio spanning mobile apps, web platforms, and enterprise solutions across 7 industries.
              </p>
            </div>
          </FadeIn>

          {/* Filter Toggle */}
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 text-slate-300 hover:text-sky-400 border border-slate-700/40 transition-colors"
              >
                <Filter className="w-4 h-4" /> Filters {showFilters ? '▲' : '▼'}
              </button>
              <span className="text-sm text-slate-500">
                Showing {filtered.length} of {projects.length} projects
              </span>
            </div>
          </FadeIn>

          {/* Filters */}
          {showFilters && (
            <FadeIn>
              <div className="mb-8 p-6 rounded-xl bg-slate-800/40 border border-slate-700/30 space-y-4">
                {/* Role Filter */}
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Role</label>
                  <div className="flex flex-wrap gap-2">
                    {roleFilters.map((r) => (
                      <button key={r} onClick={() => setRoleFilter(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${roleFilter === r ? 'bg-sky-400 text-slate-900' : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Industry Filter */}
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Industry</label>
                  <div className="flex flex-wrap gap-2">
                    {industryFilters.map((r) => (
                      <button key={r} onClick={() => setIndFilter(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${indFilter === r ? 'bg-sky-400 text-slate-900' : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Status Filter */}
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statusFilters.map((r) => (
                      <button key={r} onClick={() => setStatusFilter(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === r ? 'bg-sky-400 text-slate-900' : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const metric = heroMetric(project);
              return (
                <FadeIn key={project.id} delay={i * 0.05}>
                  <Link to={`/projects/${project.id}`} className="group h-full rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/40 transition-all duration-300 overflow-hidden flex flex-col">
                    {/* Image */}
                    <div className="relative h-44 bg-slate-800 overflow-hidden">
                      {project.screenshots.length > 0 ? (
                        <img src={project.screenshots[0]} alt={project.name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800">
                          <div className="text-center">
                            <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                            <span className="text-xs text-slate-600">{project.company}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors" />
                      {/* Status */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[project.status]}`}>
                          {project.status}
                        </span>
                      </div>
                      {/* Metric */}
                      {metric && (
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-sky-400 text-xs font-bold border border-sky-400/30">
                            {metric.value}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-sky-400 transition-colors mb-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">{project.company}</p>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">{project.description}</p>

                      {/* Role & Timeline */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${roleColors[project.roleLevel]}`}>
                          {roleLabels[project.roleLevel]}
                        </span>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-slate-900/60 text-xs text-slate-500 border border-slate-700/30">
                            {t}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-0.5 text-xs text-slate-600">+{project.techStack.length - 3}</span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.timeline}</span>
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{project.industry}</span>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 mt-3">
                        {project.urls.play_store && (
                          <a href={project.urls.play_store} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                            Play Store <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.urls.website && (
                          <a href={project.urls.website} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                            Website <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.urls.app_store && (
                          <a href={project.urls.app_store} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                            App Store <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500">No projects match the selected filters.</p>
              <button onClick={() => { setCatFilter('All'); setRoleFilter('All'); setIndFilter('All'); setStatusFilter('All'); }}
                className="mt-4 text-sky-400 hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FadeIn } from '@/components/FadeIn';
import { ProjectCard } from '@/components/ProjectCard';
import { projects, roleFilters, industryFilters, statusFilters } from '@/data/projects';
import { ArrowLeft, Filter } from 'lucide-react';

const roleLabels: Record<string, string> = {
  android: 'Android Developer',
  mobile: 'Mobile Developer',
  'senior-fe': 'Senior Front End Engineer',
  'tech-lead': 'Tech Lead',
  'lead-dev': 'Lead Developer',
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
    <>
      <Helmet>
        <title>Projects — 21 Apps Across FinTech, HealthTech, Telecom & More | Ugan Saripudin</title>
        <meta name="description" content="Portfolio of 21 projects spanning FinTech, HealthTech, Telecom, AgriTech and more. 50M+ downloads, zero incidents, AI-native delivery." />
        <meta property="og:title" content="21 Projects — Ugan Saripudin" />
        <meta property="og:description" content="Portfolio spanning FinTech, HealthTech, Telecom, AgriTech. 50M+ downloads delivered." />
      </Helmet>
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
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="grid" index={i} />
            ))}
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
    </>
  );
}

import { useRef } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden" id="projects">
      {/* Subtle violet mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(139,92,246,0.03) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139,92,246,0.02) 0%, transparent 40%)'}} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            number="(03)"
            eyebrow="FEATURED PROJECTS"
            headline="Flagship Projects"
            subheadline="The most impactful projects delivered across 10+ years — from 50M+ download telecom apps to award-winning insurance platforms."
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
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="carousel" index={i} />
            ))}
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

import { useRef, useEffect } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const scrollPosRef = useRef(0);

  // Infinite auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let paused = false;

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchstart', onEnter, { passive: true });
    el.addEventListener('touchend', onLeave, { passive: true });

    const animate = () => {
      if (!paused && el) {
        scrollPosRef.current += 0.6;
        // Reset when we've scrolled half (duplicated content)
        const half = el.scrollWidth / 2;
        if (scrollPosRef.current >= half) {
          scrollPosRef.current = 0;
        }
        el.scrollLeft = scrollPosRef.current;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchstart', onEnter);
      el.removeEventListener('touchend', onLeave);
    };
  }, []);

  // Duplicate projects for seamless infinite scroll
  const allProjects = [...featuredProjects, ...featuredProjects];

  return (
    <section className="py-16 px-4 relative overflow-hidden" id="projects">
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
        </div>

        {/* Infinite Carousel */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          <div ref={scrollRef}
            className="flex gap-6 overflow-x-hidden pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {allProjects.map((project, i) => (
              <div key={`${project.id}-${i}`} className="flex-shrink-0 w-[340px] md:w-[400px]">
                <ProjectCard project={project} variant="carousel" index={i % featuredProjects.length} />
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <FadeIn delay={0.5}>
          <div className="mt-10 text-center">
            <a href="#/projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-800/60 border border-slate-600 text-slate-200 font-semibold hover:bg-sky-400/10 hover:border-sky-400/40 hover:text-sky-400 transition-all text-sm">
              View All Projects <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { useRef, useEffect } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { ProjectCard } from '@/components/ProjectCard';
import { featuredProjects } from '@/data/projects';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_GAP = 12;
const SCROLL_SPEED = 0.8;
const DRAG_THRESHOLD = 8;

export function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);

  const getCardWidth = () => {
    const el = trackRef.current;
    if (!el) return 400;
    const card = el.firstElementChild as HTMLElement;
    return card ? card.getBoundingClientRect().width : 400;
  };

  const scrollNext = () => {
    const el = trackRef.current;
    if (!el) return;
    const w = getCardWidth();
    el.scrollTo({ left: el.scrollLeft + w + CARD_GAP, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    const el = trackRef.current;
    if (!el) return;
    const w = getCardWidth();
    el.scrollTo({ left: el.scrollLeft - w - CARD_GAP, behavior: 'smooth' });
  };

  // Desktop mouse drag only (NOT touch — touch uses native scroll)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let hasMoved = false;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = true;
      hasMoved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        hasMoved = true;
        el.scrollLeft = startScroll - dx;
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDown) return;
      isDown = false;
      el.style.cursor = 'grab';
      if (hasMoved) {
        const link = (e.target as HTMLElement).closest('a');
        if (link) {
          const stop = (ev: Event) => { ev.preventDefault(); ev.stopPropagation(); };
          link.addEventListener('click', stop, true);
          setTimeout(() => link.removeEventListener('click', stop, true), 50);
        }
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    posRef.current = el.scrollLeft;
    let paused = false;
    let timer: ReturnType<typeof setTimeout>;

    const pause = () => {
      paused = true;
      clearTimeout(timer);
      timer = setTimeout(() => { paused = false; }, 3000);
    };

    el.addEventListener('pointerdown', pause, { passive: true });
    el.addEventListener('scroll', pause, { passive: true });

    const tick = () => {
      if (!paused && el) {
        posRef.current += SCROLL_SPEED;
        const half = el.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        el.scrollLeft = posRef.current;
      } else if (paused && el) {
        posRef.current = el.scrollLeft;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('scroll', pause);
    };
  }, []);

  const allProjects = [...featuredProjects, ...featuredProjects];

  return (
    <section className="py-16 px-4 relative" id="projects">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none !important; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(139,92,246,0.03) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139,92,246,0.02) 0%, transparent 40%)'}} />
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            number="(03)"
            eyebrow="FEATURED PROJECTS"
            headline="Flagship Projects"
            subheadline="The most impactful projects delivered across 10+ years — from 50M+ download telecom apps to award-winning insurance platforms."
          />
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          <button
            onClick={scrollPrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-800/90 border border-slate-600/60 text-slate-200 flex items-center justify-center shadow-lg hover:bg-sky-400/20 hover:border-sky-400/50 hover:text-sky-400 transition-all active:scale-95 opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-800/90 border border-slate-600/60 text-slate-200 flex items-center justify-center shadow-lg hover:bg-sky-400/20 hover:border-sky-400/50 hover:text-sky-400 transition-all active:scale-95 opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next"
            type="button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto hide-scrollbar"
            onDragStart={(e) => e.preventDefault()}
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              cursor: 'grab',
              paddingBottom: 8,
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            {allProjects.map((project, i) => (
              <div
                key={`${project.id}-${i}`}
                className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[400px]"
                style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
              >
                <ProjectCard project={project} variant="carousel" index={i % featuredProjects.length} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots — mobile */}
        <div className="flex items-center justify-center gap-2.5 mt-5 md:hidden">
          {featuredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = trackRef.current;
                if (!el) return;
                el.scrollTo({ left: i * (getCardWidth() + CARD_GAP), behavior: 'smooth' });
              }}
              className="w-2 h-2 rounded-full bg-slate-600 hover:bg-sky-400 transition-colors"
              aria-label={`Project ${i + 1}`}
              type="button"
            />
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-8 text-center">
            <a href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-800/60 border border-slate-600 text-slate-200 font-semibold hover:bg-sky-400/10 hover:border-sky-400/40 hover:text-sky-400 transition-all text-sm">
              View All Projects <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

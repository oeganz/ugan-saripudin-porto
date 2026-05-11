import { useRef, useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectScreenshotsProps {
  screenshots: string[];
  projectName: string;
}

export function ProjectScreenshots({ screenshots, projectName }: ProjectScreenshotsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (screenshots.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = isMobile ? 280 : 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <>
      <section className="py-24 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-100 mb-8">Screenshots</h2>
          </FadeIn>

          {/* Navigation */}
          {!isMobile && (
            <div className="flex justify-end gap-2 mb-4">
              <button onClick={() => scroll('left')}
                className="p-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')}
                className="p-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Gallery */}
          <div ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {screenshots.map((src, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div
                  onClick={() => setSelectedIndex(i)}
                  className="flex-shrink-0 w-[280px] md:w-[320px] rounded-xl overflow-hidden cursor-pointer snap-start group">
                  <img
                    src={src}
                    alt={`${projectName} screenshot ${i + 1}`}
                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white z-10">
            <X className="w-6 h-6" />
          </button>
          <img
            src={screenshots[selectedIndex]}
            alt={`${projectName} screenshot ${selectedIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-sm">
            {selectedIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </>
  );
}

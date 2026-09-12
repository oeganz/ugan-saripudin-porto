import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * SHOWREEL — scroll-driven film strip.
 * The section is 320vh tall; while the user scrolls through it, a sticky
 * "monitor" advances through shipped-product frames like a video scrubber:
 * running timecode, frame counter, REC dot, film sprockets, progress bar.
 * No video files needed — the products ARE the footage.
 */

const FRAMES = [
  {
    src: '/images/projects/screenshots/mybeepr_screenshot_01.jpg',
    name: 'MYBEEPR',
    meta: 'CLINICAL COMMS — AUSTRALIA',
    metric: '27 min → 4.5 min response loops · 16+ hospitals',
    fit: 'cover',
  },
  {
    src: '/images/projects/screenshots/axisnet_screenshot_01.jpg',
    name: 'AXISNET',
    meta: 'TELECOM SELF-CARE — XL AXIATA',
    metric: '50M+ downloads · 4.4★ · 29M+ MAU (w/ MyXL)',
    fit: 'contain',
  },
  {
    src: '/images/projects/screenshots/agriaku_screenshot_01.jpg',
    name: 'AGRIAKU',
    meta: 'AGRITECH B2B MARKETPLACE',
    metric: '23,390+ agents · 500+ cities · $46M+ funding',
    fit: 'contain',
  },
  {
    src: '/images/projects/screenshots/labamu_feature_cards.jpg',
    name: 'LABAMU',
    meta: 'SME FINTECH SUITE — SC VENTURES',
    metric: '100,000+ SMEs · ISO/IEC 27001 certified',
    fit: 'cover',
  },
  {
    src: '/images/projects/screenshots/bluegaz_screenshot_01.jpg',
    name: 'BLUEGAZ',
    meta: 'LPG FIELD-SALES PLATFORM',
    metric: 'Order → delivery → payment in one flow',
    fit: 'contain',
  },
  {
    src: '/images/projects/screenshots/asabri_screenshot_01.jpg',
    name: 'ASABRI',
    meta: 'GOV PENSION & INSURANCE',
    metric: 'State-owned enterprise · Android + iOS',
    fit: 'contain',
  },
] as const;

const N = FRAMES.length;

function timecode(p: number): string {
  const total = p * 24; // "24s" showreel
  const s = Math.floor(total);
  const f = Math.floor((total - s) * 24); // 24fps frame count
  const pad = (n: number) => String(n).padStart(2, '0');
  return `00:00:${pad(s)}:${pad(f)}`;
}

export function ShowreelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Timecode — direct DOM write, no re-render
    if (tcRef.current) tcRef.current.textContent = timecode(v);
    // Active frame — state change only when the frame actually flips
    const next = Math.min(N - 1, Math.floor(v * N));
    setIdx((prev) => (prev === next ? prev : next));
  });

  const active = FRAMES[idx];

  return (
    <section ref={sectionRef} id="showreel" className="relative h-[320vh] bg-ink-950" aria-label="Product showreel">
      <div className="showreel-sticky sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden="true" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-brand-500/[0.06] blur-[130px] rounded-full" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-10">
          {/* ── Top HUD row ── */}
          <div className="flex items-center justify-between mb-4 md:mb-6 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <span className="text-brand-400">(00)</span>
              <span className="text-slate-300 font-semibold">Showreel</span>
              <span className="hidden sm:inline text-slate-600">— SHIPPED FOOTAGE</span>
            </div>
            <div className="flex items-center gap-3 md:gap-5">
              <span className="hidden sm:flex items-center gap-1.5 text-red-400/90">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-rec" aria-hidden="true" />
                REC
              </span>
              <span ref={tcRef} className="text-slate-400 tabular-nums">00:00:00:00</span>
            </div>
          </div>

          {/* ── The monitor ── */}
          <div className="corner-brackets relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-md border border-slate-700/40 bg-black overflow-hidden shadow-2xl shadow-black/70">
            {/* Stacked frames — crossfade driven by scroll */}
            {FRAMES.map((f, i) => (
              <div
                key={f.name}
                className={`showreel-frame absolute inset-0 transition-all duration-500 ease-out ${
                  i === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.035]'
                }`}
                aria-hidden={i !== idx}
              >
                <img
                  src={f.src}
                  alt={`${f.name} — ${f.meta}`}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  className={`w-full h-full ${
                    f.fit === 'cover' ? 'object-cover' : 'object-contain'
                  }`}
                  draggable={false}
                />
                {/* Letterbox wash for contain frames */}
                {f.fit === 'contain' && (
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
                )}
              </div>
            ))}

            {/* Scanlines + screen glare */}
            <div className="absolute inset-0 scanlines pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.03] via-transparent to-black/40" aria-hidden="true" />

            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <span className={`w-6 h-6 rounded-full border border-brand-400/40 transition-opacity duration-300 ${idx >= 0 ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Film sprockets — top & bottom edges */}
            <div className="absolute top-0 inset-x-0 h-3.5 film-sprockets bg-black/70 z-10" aria-hidden="true" />
            <div className="absolute bottom-0 inset-x-0 h-3.5 film-sprockets bg-black/70 z-10" aria-hidden="true" />

            {/* ── Caption bar ── */}
            <div className="absolute bottom-3.5 inset-x-0 z-20 px-4 md:px-6 pb-1">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-brand-300/90 mb-1">
                    FR {String(idx + 1).padStart(2, '0')}/{String(N).padStart(2, '0')} — {active.meta}
                  </div>
                  <h3 className="font-display text-xl md:text-3xl font-bold text-white tracking-tight leading-none">
                    {active.name}
                  </h3>
                </div>
                <p className="hidden sm:block text-right font-mono text-[10px] md:text-xs text-slate-300/90 max-w-[42%]">
                  {active.metric}
                </p>
              </div>
            </div>
          </div>

          {/* ── Film-strip progress rail ── */}
          <div className="mt-4 md:mt-5 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 whitespace-nowrap">
              SCROLL TO PLAY ▸
            </span>
            <div className="relative flex-1 h-[6px] rounded-full bg-slate-800/80 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-400 rounded-full"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="font-mono text-[10px] tabular-nums text-slate-500 whitespace-nowrap">
              {String(idx + 1).padStart(2, '0')}<span className="text-slate-700">/</span>{String(N).padStart(2, '0')}
            </span>
          </div>

          {/* Mobile metric line (hidden on sm+) */}
          <p className="sm:hidden mt-3 text-center font-mono text-[10px] text-slate-400">
            {active.metric}
          </p>
        </div>
      </div>
    </section>
  );
}

interface SectionDividerProps {
  variant?: 'cyan' | 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'slate';
  intensity?: 'subtle' | 'normal' | 'strong';
}

const gradientMap: Record<string, string> = {
  cyan: 'from-cyan-500/30 via-sky-400/20 to-transparent',
  emerald: 'from-emerald-500/30 via-emerald-400/20 to-transparent',
  sky: 'from-sky-500/30 via-cyan-400/20 to-transparent',
  violet: 'from-violet-500/30 via-purple-400/20 to-transparent',
  amber: 'from-amber-500/30 via-orange-400/20 to-transparent',
  rose: 'from-rose-500/30 via-pink-400/20 to-transparent',
  slate: 'from-slate-500/20 via-slate-400/10 to-transparent',
};

const heightMap = {
  subtle: 'h-px',
  normal: 'h-0.5',
  strong: 'h-1',
};

export function SectionDivider({ variant = 'slate', intensity = 'normal' }: SectionDividerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className={`w-full ${heightMap[intensity]} bg-gradient-to-r ${gradientMap[variant]} via-30%`} />
      {/* Glow effect */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -top-3 w-32 ${heightMap[intensity]} blur-md bg-gradient-to-r ${gradientMap[variant]}`}
      />
    </div>
  );
}

// A more dramatic angled/chevron divider for major section breaks
export function SectionBreak({ variant = 'cyan' }: { variant?: SectionDividerProps['variant'] }) {
  const colors: Record<string, string> = {
    cyan: 'border-cyan-500/20',
    emerald: 'border-emerald-500/20',
    sky: 'border-sky-500/20',
    violet: 'border-violet-500/20',
    amber: 'border-amber-500/20',
    rose: 'border-rose-500/20',
    slate: 'border-slate-500/20',
  };

  const dotColors: Record<string, string> = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    sky: 'bg-sky-400',
    violet: 'bg-violet-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    slate: 'bg-slate-400',
  };

  return (
    <div className="relative flex items-center justify-center py-8">
      <div className={`flex-1 border-t ${colors[variant]}`} />
      <div className={`mx-4 w-2 h-2 rounded-full ${dotColors[variant]}`} />
      <div className={`flex-1 border-t ${colors[variant]}`} />
    </div>
  );
}

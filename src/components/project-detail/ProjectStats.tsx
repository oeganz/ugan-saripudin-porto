import { FadeIn } from '@/components/FadeIn';

interface ProjectStatsProps {
  metrics: Record<string, string>;
  status: 'active' | 'inactive' | 'internal' | 'discontinued';
  platform: string[];
  category: string;
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400/20 text-emerald-400',
  inactive: 'bg-slate-600/30 text-slate-500',
  internal: 'bg-amber-400/20 text-amber-400',
  discontinued: 'bg-red-400/20 text-red-400',
};

const platformIcons: Record<string, string> = {
  Android: 'A',
  iOS: 'i',
  Web: 'W',
};

export function ProjectStats({ metrics, status, platform, category }: ProjectStatsProps) {
  const displayMetrics = Object.entries(metrics).slice(0, 4);

  return (
    <section className="bg-slate-800/50 border-y border-slate-700/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Status */}
          <FadeIn delay={0}>
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]}`}>
                {status}
              </span>
            </div>
          </FadeIn>

          {/* Platform */}
          <FadeIn delay={0.05}>
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-2">
                {platform.map((p) => (
                  <span key={p} className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center text-xs font-bold text-sky-400">
                    {platformIcons[p] || p.charAt(0)}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500">Platform</p>
            </div>
          </FadeIn>

          {/* Metrics */}
          {displayMetrics.map(([key, value], i) => (
            <FadeIn key={key} delay={0.1 + i * 0.05}>
              <div className="text-center">
                <p className="text-2xl font-bold text-sky-400 mb-1">{value}</p>
                <p className="text-xs text-slate-500 capitalize">{key.replace(/_/g, ' ')}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

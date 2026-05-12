import { FadeIn } from '@/components/FadeIn';
import { ExternalLink } from 'lucide-react';

interface ProjectInfoBarProps {
  metrics: Record<string, string>;
  status: 'active' | 'inactive' | 'internal' | 'discontinued';
  platform: string[];
  urls: Record<string, string>;
}

const platformIcons: Record<string, { letter: string; color: string }> = {
  Android: { letter: 'A', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  iOS: { letter: 'i', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  Web: { letter: 'W', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
};

const metricLabels: Record<string, string> = {
  downloads: 'Downloads',
  rating: 'Rating',
  reviews: 'Reviews',
  hospitals: 'Hospitals',
  medical_staff: 'Medical Staff',
  weekly_messages: 'Weekly Messages',
  weekly_images: 'Weekly Images',
  uptake: 'Uptake',
  time_saved: 'Time Saved',
  heritage_funds: 'Heritage Funds',
  wakaf_contributions: 'Wakaf Contributions',
  nonprofit_partners: 'Partners',
  pospay_reach: 'Pospay Reach',
  funding: 'Funding',
  partner_agents: 'Partners',
  gmv_growth: 'GMV Growth',
  smes_served: 'SMEs Served',
  entrepreneurs_trained: 'Entrepreneurs',
  certification: 'Certification',
  award_cx: 'Award',
  min_premium: 'From',
  claims_time: 'Claims',
};

export function ProjectInfoBar({ metrics, platform, urls }: ProjectInfoBarProps) {
  const hasLinks = Object.values(urls).some(Boolean);

  // Pick top 4 metrics with readable labels
  const displayMetrics = Object.entries(metrics)
    .filter(([key]) => metricLabels[key])
    .slice(0, 4);

  return (
    <section className="relative z-20 -mt-1">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn direction="up" delay={0.15}>
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-slate-950/50">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">

              {/* Platform + Metrics - Left side */}
              <div className="flex-1 flex flex-wrap items-center gap-6">
                {/* Platform badges */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-medium mr-1">Platform</span>
                  <div className="flex gap-1.5">
                    {platform.map((p) => {
                      const icon = platformIcons[p] || { letter: p.charAt(0), color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
                      return (
                        <span
                          key={p}
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center text-sm font-bold ${icon.color}`}
                          title={p}
                        >
                          {icon.letter}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                {displayMetrics.length > 0 && (
                  <div className="hidden md:block w-px h-10 bg-slate-700/50" />
                )}

                {/* Metrics */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {displayMetrics.map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-lg md:text-xl font-bold text-sky-400 leading-tight">{value}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{metricLabels[key]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              {hasLinks && (
                <div className="hidden lg:block w-px h-10 bg-slate-700/50" />
              )}

              {/* Store Links - Right side */}
              {hasLinks && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-medium mr-1 hidden xl:inline">Links</span>
                  {urls.play_store && (
                    <a
                      href={urls.play_store}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.71 11.5 20.71 11.95C20.71 12.4 20.5 12.82 20.16 13.09L17.89 14.47L15.39 12L17.89 9.53L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                      </svg>
                      Play Store
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                  {urls.website && (
                    <a
                      href={urls.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium hover:bg-sky-500/20 hover:border-sky-500/40 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                  {urls.app_store && (
                    <a
                      href={urls.app_store}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      App Store
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              )}

            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

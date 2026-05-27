import { FadeIn } from '@/components/FadeIn';
import { ExternalLink } from 'lucide-react';

interface ProjectLinksProps {
  urls: Record<string, string>;
}

export function ProjectLinks({ urls }: ProjectLinksProps) {
  const hasLinks = Object.values(urls).some(Boolean);
  if (!hasLinks) return null;

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Get the App</h2>
        </FadeIn>

        <div className="flex flex-wrap gap-4">
          {urls.play_store && (
            <FadeIn delay={0}>
              <a href={urls.play_store} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.71 11.5 20.71 11.95C20.71 12.4 20.5 12.82 20.16 13.09L17.89 14.47L15.39 12L17.89 9.53L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
                </svg>
                Play Store <ExternalLink className="w-4 h-4" />
              </a>
            </FadeIn>
          )}

          {urls.website && (
            <FadeIn delay={0.1}>
              <a href={urls.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Website <ExternalLink className="w-4 h-4" />
              </a>
            </FadeIn>
          )}

          {urls.app_store && (
            <FadeIn delay={0.2}>
              <a href={urls.app_store} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store <ExternalLink className="w-4 h-4" />
              </a>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

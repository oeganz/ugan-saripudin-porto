import { useEffect, useState, type ComponentType } from 'react';

/** Loads Vercel Analytics and Speed Insights after first paint. */
export function DeferredVercelMetrics() {
  const [Metrics, setMetrics] = useState<{
    Analytics: ComponentType;
    SpeedInsights: ComponentType;
  } | null>(null);

  useEffect(() => {
    const load = () => {
      Promise.all([
        import('@vercel/analytics/react'),
        import('@vercel/speed-insights/react'),
      ]).then(([analytics, speed]) => {
        setMetrics({
          Analytics: analytics.Analytics,
          SpeedInsights: speed.SpeedInsights,
        });
      });
    };

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(load, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(load, 1);
    return () => clearTimeout(t);
  }, []);

  if (!Metrics) return null;
  const { Analytics, SpeedInsights } = Metrics;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

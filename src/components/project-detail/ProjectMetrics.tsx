import { FadeIn } from '@/components/FadeIn';

interface ProjectMetricsProps {
  metrics: Record<string, string>;
}

const metricLabels: Record<string, string> = {
  downloads: 'Total Downloads',
  hospitals: 'Hospitals',
  medical_staff: 'Medical Staff',
  weekly_messages: 'Weekly Messages',
  entrepreneurs_trained: 'Entrepreneurs Trained',
  farmer_stores: 'Farmer Stores',
  heritage_funds: 'Heritage Funds',
  wakaf_contributions: 'Wakaf Contributions',
  funding: 'Funding Raised',
};

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-800/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Impact Metrics</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(metrics).slice(0, 6).map(([key, value], i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <div className="text-center p-8 rounded-2xl bg-slate-800/40 border border-slate-700/30">
                <p className="text-5xl md:text-6xl font-bold text-sky-400 mb-2">{value}</p>
                <p className="text-slate-400">{metricLabels[key] || key.replace(/_/g, ' ')}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FadeIn } from '@/components/FadeIn';
import { Check } from 'lucide-react';

interface ProjectFeaturesProps {
  features: string[];
  industry: string;
}

const featureIcons = [
  <Check className="w-6 h-6 text-sky-400" />,
  <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
];

export function ProjectFeatures({ features, industry }: ProjectFeaturesProps) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Key Features</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            {industry} solution delivering measurable impact through comprehensive functionality.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature} delay={i * 0.08}>
              <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/30 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center mb-4 group-hover:bg-sky-400/20 transition-colors">
                  {featureIcons[i % featureIcons.length]}
                </div>
                <p className="text-slate-200">{feature}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

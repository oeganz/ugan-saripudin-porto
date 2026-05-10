import { FadeIn } from '@/components/FadeIn';
import { Zap, Shield, Users, Clock, TrendingUp, Award } from 'lucide-react';

const stats = [
  { icon: Zap, value: '10+', label: 'Years Experience', desc: 'Engineering leadership' },
  { icon: TrendingUp, value: '1M+', label: 'Users Delivered', desc: 'Platforms at scale' },
  { icon: Shield, value: '40%', label: 'Doc Time Cut', desc: 'AI-native workflows' },
  { icon: Users, value: '12', label: 'Devs Led', desc: 'Across 3 pods' },
  { icon: Clock, value: '18mo', label: 'Zero Incidents', desc: 'Production stability' },
  { icon: Award, value: '98%', label: 'On-Time Delivery', desc: 'Remote contract' },
];

export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-slate-800/30 border-y border-slate-700/30" id="stats">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[1px] text-sky-400 mb-3">Impact at Scale</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-50">Numbers That Matter</h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06}>
              <div className="text-center p-5 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/20 transition-all">
                <s.icon className="w-5 h-5 text-sky-400 mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-black text-sky-400">{s.value}</div>
                <div className="mt-1 text-sm font-semibold text-slate-200">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FadeIn } from '@/components/FadeIn';
import {
  Smartphone, Globe, Shield, Zap, Barcode, CreditCard,
  Lock, Cloud, Bell, Database, MapPin, Heart,
  Cpu, MessageSquare, Users, TrendingUp, Award, Check
} from 'lucide-react';
import type { ReactNode } from 'react';

interface ProjectFeaturesProps {
  features: string[];
  industry: string;
}

// Smart feature icon assignment based on feature text
function getFeatureIcon(feature: string, index: number): ReactNode {
  const f = feature.toLowerCase();

  if (f.includes('encrypt') || f.includes('secure') || f.includes('auth') || f.includes('lock') || f.includes('protect'))
    return <Lock className="w-5 h-5 text-sky-400" />;
  if (f.includes('payment') || f.includes('pay') || f.includes('wallet') || f.includes('billing') || f.includes('invoice'))
    return <CreditCard className="w-5 h-5 text-sky-400" />;
  if (f.includes('notification') || f.includes('push') || f.includes('alert'))
    return <Bell className="w-5 h-5 text-sky-400" />;
  if (f.includes('cloud') || f.includes('server') || f.includes('host') || f.includes('storage'))
    return <Cloud className="w-5 h-5 text-sky-400" />;
  if (f.includes('map') || f.includes('geo') || f.includes('location') || f.includes('gps'))
    return <MapPin className="w-5 h-5 text-sky-400" />;
  if (f.includes('database') || f.includes('record') || f.includes('inventory') || f.includes('catalog'))
    return <Database className="w-5 h-5 text-sky-400" />;
  if (f.includes('qr') || f.includes('barcode') || f.includes('scan'))
    return <Barcode className="w-5 h-5 text-sky-400" />;
  if (f.includes('ai') || f.includes('chatbot') || f.includes('ml') || f.includes('smart'))
    return <Cpu className="w-5 h-5 text-sky-400" />;
  if (f.includes('message') || f.includes('chat') || f.includes('whatsapp') || f.includes('commun'))
    return <MessageSquare className="w-5 h-5 text-sky-400" />;
  if (f.includes('user') || f.includes('customer') || f.includes('member') || f.includes('social'))
    return <Users className="w-5 h-5 text-sky-400" />;
  if (f.includes('growth') || f.includes('metric') || f.includes('analytic') || f.includes('report'))
    return <TrendingUp className="w-5 h-5 text-sky-400" />;
  if (f.includes('mobile') || f.includes('app') || f.includes('phone'))
    return <Smartphone className="w-5 h-5 text-sky-400" />;
  if (f.includes('web') || f.includes('online') || f.includes('digital') || f.includes('store'))
    return <Globe className="w-5 h-5 text-sky-400" />;
  if (f.includes('heart') || f.includes('donat') || f.includes('health') || f.includes('care'))
    return <Heart className="w-5 h-5 text-sky-400" />;
  if (f.includes('shield') || f.includes('insurance') || f.includes('coverage') || f.includes('claim'))
    return <Shield className="w-5 h-5 text-sky-400" />;
  if (f.includes('award') || f.includes('certif') || f.includes('iso'))
    return <Award className="w-5 h-5 text-sky-400" />;
  if (f.includes('speed') || f.includes('fast') || f.includes('quick') || f.includes('instant') || f.includes('performance'))
    return <Zap className="w-5 h-5 text-sky-400" />;

  // Default: cycle through common icons
  const defaults = [
    <Check className="w-5 h-5 text-sky-400" />,
    <Zap className="w-5 h-5 text-sky-400" />,
    <Shield className="w-5 h-5 text-sky-400" />,
  ];
  return defaults[index % defaults.length];
}

export function ProjectFeatures({ features, industry }: ProjectFeaturesProps) {
  return (
    <>
      <FadeIn>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Key Features</h2>
        </div>
        <p className="text-slate-400 mb-10 max-w-2xl text-sm">
          {industry} solution delivering measurable impact through comprehensive functionality.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <FadeIn key={feature} delay={i * 0.05}>
            <div className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/30 hover:bg-slate-800/60 transition-all">
              {/* Numbered icon container */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-700/50 group-hover:bg-sky-400/15 flex items-center justify-center transition-colors">
                {getFeatureIcon(feature, i)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm md:text-base leading-relaxed">{feature}</p>
              </div>

              {/* Index number */}
              <span className="flex-shrink-0 text-[10px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}

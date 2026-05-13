import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { Mail, MapPin, Phone, Github, Linkedin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-cyan-400">{time}</span>;
}

export function ContactSection() {
  return (
    <section className="py-20 px-4" id="contact">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="(06)"
          eyebrow="GET IN TOUCH"
          headline="Let&apos;s Connect"
          subheadline="Available for AI-native engineering leadership, mobile & web development, and technical consulting."
        />

        <FadeIn delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <a href="mailto:oeganz1999@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/40 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-400/20 transition-colors">
                <Mail className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Email</div>
                <div className="text-sm text-slate-200 font-medium truncate">oeganz1999@gmail.com</div>
              </div>
            </a>
            <a href="tel:+6281294113547" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/40 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-400/20 transition-colors">
                <Phone className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Phone</div>
                <div className="text-sm text-slate-200 font-medium">+62 812-9411-3547</div>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
              <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Location</div>
                <div className="text-sm text-slate-200 font-medium">Indonesia</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30">
              <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500">WIB (UTC+7)</div>
                <LiveClock />
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-start gap-3 mt-8">
            {[
              { icon: Github, label: 'oeganz | ganzapps', url: 'https://github.com/oeganz' },
              { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/ugan' },
            ].map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40 text-sm text-slate-300 hover:text-sky-400 hover:border-sky-400/30 transition-all">
                <s.icon className="w-4 h-4" /> {s.label}
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 p-6 rounded-2xl bg-sky-400/5 border border-sky-400/20">
            <h3 className="text-xl font-bold text-slate-100 mb-2">Ready to build something great?</h3>
            <p className="text-slate-400 text-sm max-w-md mb-5">
              Whether you need <span className="text-sky-400 font-semibold">AI-native engineering leadership</span>,{' '}
              <span className="text-cyan-400 font-semibold">full-stack development</span>, or{' '}
              <span className="text-emerald-400 font-semibold">microservices architecture</span> — I&apos;m ready.
            </p>
            <a href="mailto:oeganz1999@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-colors text-sm">
              <Mail className="w-4 h-4" /> Start a Conversation
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { FadeIn } from '@/components/FadeIn';
import { Mail, MapPin, Clock, Github, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: true,
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="text-brand-300 font-medium tabular-nums">{time}</span>;
}

/** Big rounded contact panel with gradient artwork — reference style. */
export function ContactSection() {
  return (
    <section className="bg-ink-950 pb-24 md:pb-32 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-500/20 bg-gradient-to-br from-[#0B1428] via-[#0A1024] to-[#0D1B3E]">
            {/* Gradient artwork right */}
            <div
              className="absolute inset-y-0 right-0 w-full md:w-3/5 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 55% 90% at 78% 30%, rgba(79,124,255,0.32), transparent 60%), radial-gradient(ellipse 40% 70% at 92% 85%, rgba(46,77,192,0.4), transparent 65%)',
              }}
              aria-hidden="true"
            />
            {/* Faceted shapes echoing the reference art */}
            <div
              className="absolute -right-24 -top-24 w-[26rem] h-[26rem] rotate-12 bg-gradient-to-br from-brand-500/25 to-transparent rounded-[3.5rem] blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute right-10 bottom-[-8rem] w-[22rem] h-[22rem] -rotate-6 bg-gradient-to-tr from-brand-700/30 to-transparent rounded-[3rem] blur-xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative px-8 py-14 md:px-14 md:py-20 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold leading-[1.12] tracking-[-0.02em] text-slate-50">
                Your vision, my engineering. Let&apos;s ship something{' '}
                <span className="text-brand-400">exceptional</span>.
              </h2>
              <p className="mt-5 text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
                Ready to start? Tell me about your product — engineering leadership,
                mobile &amp; web platforms, or AI-augmented delivery.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:oeganz1999@gmail.com"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-500/30 hover:bg-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Book a call
                </a>
                <div className="flex items-center gap-5 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-400/80" /> Indonesia
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-400/80" />
                    <LiveClock /> WIB
                  </span>
                </div>
              </div>

              <div className="mt-9 flex items-center gap-3">
                <a
                  href="https://github.com/oeganz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-brand-400 hover:border-brand-500/30 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/ugan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-brand-400 hover:border-brand-500/30 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

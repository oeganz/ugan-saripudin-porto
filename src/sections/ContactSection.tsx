import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';

/**
 * Contact — reference-style closing CTA panel:
 * one confident banner with layered brand geometry and a single clear action.
 */
export function ContactSection() {
  return (
    <section className="py-16 md:py-24 px-6" id="contact">
      <FadeIn>
        <div className="relative max-w-6xl mx-auto rounded-3xl border border-brand-500/20 bg-ink-800/70 overflow-hidden">
          {/* Layered brand geometry — static, quiet */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-24 -top-32 w-[28rem] h-[28rem] rotate-12 rounded-[3rem] bg-brand-600/[0.12]" />
            <div className="absolute right-10 -bottom-40 w-[26rem] h-[26rem] -rotate-6 rounded-[3rem] bg-brand-500/[0.08]" />
            <div className="absolute -right-10 top-10 w-72 h-72 rotate-45 rounded-[2.5rem] bg-brand-700/[0.14]" />
          </div>

          <div className="relative p-8 md:p-14">
            <h2 className="text-3xl md:text-[2.75rem] font-bold leading-[1.08] tracking-[-0.02em] text-slate-50 max-w-xl">
              Your vision, my engineering. Let&apos;s ship something{' '}
              <span className="text-brand-400">production-grade</span>.
            </h2>
            <p className="mt-5 text-slate-400 max-w-md leading-relaxed">
              Ready to start? Bring me a system to build, a team to lead, or a pipeline
              to harden — and let&apos;s shape the next release together.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="mailto:oeganz1999@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-500 text-white text-sm font-semibold hover:bg-brand-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email me
              </a>
              <a
                href="https://github.com/oeganz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 text-slate-300 text-sm font-medium hover:border-slate-500 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ugan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 text-slate-300 text-sm font-medium hover:border-slate-500 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>

            <p className="mt-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Replies within 24 hours — WIB (UTC+7)
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

import { FadeIn } from '@/components/FadeIn';
import { SectionHeader } from '@/components/SectionHeader';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featured = [
  {
    id: 'axisnet',
    tag: 'Telecom Super-App',
    name: 'AXISnet',
    desc: 'Official self-care app for AXIS subscribers — 50M+ downloads, 4.4★ rating, biometric access and gamified rewards.',
    img: '/images/projects/screenshots/axisnet_screenshot_01.jpg',
  },
  {
    id: 'labamu',
    tag: 'FinTech / SME',
    name: 'Labamu',
    desc: 'SME business platform with POS, invoicing and cashflow tools for Indonesian merchants going digital.',
    img: '/images/proj-labamu.jpg',
  },
  {
    id: 'mybeepr',
    tag: 'HealthTech',
    name: 'MyBeepr',
    desc: 'Clinical messaging platform serving Australian hospital networks — compliance-ready, 98% on-time delivery.',
    img: '/images/proj-mybeepr.jpg',
  },
  {
    id: 'agriaku',
    tag: 'AgriTech / B2B',
    name: 'Agriaku',
    desc: 'B2B agri marketplace connecting Indonesian farmers with suppliers — financing, logistics and advisory.',
    img: '/images/proj-agriaku.jpg',
  },
];

/** Two-column featured project cards — reference style. */
export function FeaturedProjectsSection() {
  return (
    <section className="bg-ink-950 py-20 md:py-28 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          headline="Recent Projects"
          subheadline="A curated mix of shipped products — scalable, fast, and future-ready. Blending mobile, web, and AI-assisted delivery."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.06}>
              <Link
                to={`/projects/${p.id}`}
                className="group block surface-card rounded-3xl overflow-hidden transition-colors"
              >
                {/* Screenshot */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.tag}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D1A] via-transparent to-transparent" aria-hidden="true" />
                </div>

                {/* Body */}
                <div className="p-6 md:p-7">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-medium">
                    {p.tag}
                  </span>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-slate-50">{p.name}</h3>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.09] text-slate-200 text-sm font-medium hover:bg-white/[0.1] hover:text-white transition-colors"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn';

/**
 * FeaturedWork — reference-style project grid:
 * live product screenshot on top, tag pill + title + one-liner below.
 * Curated 6 of 22 projects; full index lives on /projects.
 */

const featured = [
  {
    id: 'axisnet',
    tag: 'Telecom · Android',
    title: 'AXISnet — XL Axiata Self-Care',
    desc: 'Billing, data packages and eSIM self-care for millions of subscribers — 3M+ Play Store downloads.',
    img: '/images/projects/screenshots/axisnet_screenshot_01.jpg',
    alt: 'AXISnet app screens',
  },
  {
    id: 'mybeepr',
    tag: 'HealthTech · Platform',
    title: 'MyBeepr — now Avant PracticeHub',
    desc: 'Clinical messaging platform for Australian hospitals; the product lives on today as Avant PracticeHub.',
    img: '/images/projects/screenshots/mybeepr_site_live.png',
    alt: 'PracticeHub platform website',
  },
  {
    id: 'agriaku',
    tag: 'AgriTech · Web + Android',
    title: 'AgriAku — Farmer Franchise Network',
    desc: 'Inventory and franchise tooling for 23,000+ agri-mitras across Indonesia.',
    img: '/images/projects/screenshots/agriaku_site_live.png',
    alt: 'AgriAku website',
  },
  {
    id: 'labamu',
    tag: 'SME FinTech · Web + Mobile',
    title: 'Labamu — POS & ERP for SMEs',
    desc: 'Cashier, ledger and business dashboard platform launched by SC Ventures for APAC SMEs.',
    img: '/images/projects/screenshots/labamu_site_live.png',
    alt: 'Labamu website',
    caseStudy: true,
  },
  {
    id: 'aku-berbagi',
    tag: 'Social Impact · Mobile',
    title: 'Aku Berbagi — Giving Platform',
    desc: 'Zakat and donation flows with transparent fund tracking for Indonesian donors.',
    img: '/images/proj-akuberbagi.jpg',
    alt: 'Aku Berbagi platform art',
  },
  {
    id: 'go-great',
    tag: 'E-commerce · Web',
    title: 'Go Great — Insurance E-Shop',
    desc: 'Direct-to-customer insurance storefront for Great Eastern Life Indonesia.',
    img: '/images/projects/screenshots/gogreat_hero_banner.jpg',
    alt: 'Go Great shop banner',
  },
];

export function FeaturedProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-slate-50">
              Featured Work
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-center text-slate-400 max-w-xl mx-auto mb-14 leading-relaxed">
            A curated mix of shipped products — telecom, health, agriculture, and finance —
            built to production scale and measured by real users.
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.08} className="grid md:grid-cols-2 gap-6">
          {featured.map((p) => (
            <StaggerItem key={p.id}>
              <Link
                to={p.caseStudy ? `/case-study/${p.id}` : `/projects/${p.id}`}
                className="group block rounded-2xl overflow-hidden border border-white/[0.07] bg-ink-800/50 hover:border-brand-500/40 transition-colors duration-200"
              >
                <div className="aspect-[16/10] overflow-hidden bg-ink-700/40 border-b border-white/[0.06]">
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-[11px] font-medium px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 mb-3">
                    {p.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mb-1.5 flex items-center gap-1.5">
                    {p.title}
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-brand-400 transition-colors" />
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.15}>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700/80 text-slate-300 text-sm font-medium hover:border-brand-500/50 hover:text-white transition-colors"
            >
              View all 22 projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

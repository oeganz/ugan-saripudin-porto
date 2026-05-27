import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Server, MessageSquare } from 'lucide-react'
import { FadeIn } from '@/components/FadeIn'
import { SectionHeader } from '@/components/SectionHeader'

const caseStudies = [
  {
    id: 'labamu',
    slug: '/case-study/labamu',
    title: 'Labamu: Monolith to Microservices',
    category: 'Architecture',
    icon: Server,
    summary: 'Led 12 developers through zero-downtime migration from monolith to microservices. Achieved 40% documentation reduction and 18 months zero incidents.',
    metrics: ['7,500+ Users', 'ISO 27001', '3x Faster Deploy'],
    color: 'sky',
  },
  {
    id: 'mybeepr',
    slug: '/case-study/mybeepr',
    title: 'MyBeepr: Remote Healthcare Delivery',
    category: 'Remote Leadership',
    icon: MessageSquare,
    summary: 'Delivered healthcare software across 2-hour timezone gap with 98% on-time delivery. Zero security incidents across 16 hospital deployments.',
    metrics: ['98% On-Time', '16 Hospitals', 'Zero Incidents'],
    color: 'emerald',
  },
]

export function FeaturedCaseStudiesSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-800/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="(05)"
          eyebrow="DEEP DIVES"
          headline="Featured Case Studies"
          subheadline="In-depth look at how I solve complex engineering challenges"
        />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {caseStudies.map((cs, i) => {
            const Icon = cs.icon
            const colorClass = cs.color === 'sky'
              ? 'border-sky-400/30 hover:border-sky-400/50'
              : 'border-emerald-400/30 hover:border-emerald-400/50'

            return (
              <FadeIn key={cs.id} delay={i * 0.1}>
                <Link
                  to={cs.slug}
                  className={`group block bg-slate-800/50 border ${colorClass} rounded-xl p-6 transition-all duration-300 hover:bg-slate-800/70 hover:scale-[1.02]`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${cs.color === 'sky' ? 'bg-sky-400/10' : 'bg-emerald-400/10'}`}>
                      <Icon className={`w-6 h-6 ${cs.color === 'sky' ? 'text-sky-400' : 'text-emerald-400'}`} />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${cs.color === 'sky' ? 'bg-sky-400/10 text-sky-400' : 'bg-emerald-400/10 text-emerald-400'}`}>
                      {cs.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-50 mb-2 group-hover:text-sky-400 transition-colors">
                    {cs.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {cs.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cs.metrics.map((m) => (
                      <span key={m} className="text-xs px-2 py-1 rounded-md bg-slate-700/50 text-slate-400">
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-sky-400 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    Read Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

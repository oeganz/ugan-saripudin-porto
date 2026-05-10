import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/Card'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { FadeIn } from '@/components/FadeIn'
import { BookOpen, Clock, ArrowUpRight } from 'lucide-react'

const articles = [
  {
    title: 'ADLC vs SDLC: Why Agentic Development Needs New Governance',
    category: 'Architecture',
    readTime: '8 min read',
    summary: 'Traditional SDLC governance breaks with autonomous agents. Here\'s what works.',
    categoryColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  },
  {
    title: 'How We Cut Engineering Documentation by 40% Without Losing Context',
    category: 'Process',
    readTime: '6 min read',
    summary: 'AI-native workflows that maintain knowledge while reducing toil.',
    categoryColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  },
  {
    title: 'Zero Incidents for 18 Months: Quality Gates That Actually Work',
    category: 'Reliability',
    readTime: '7 min read',
    summary: 'The testing and observability strategy behind our track record.',
    categoryColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
]

export function InsightsSection() {
  return (
    <section id="insights" className="bg-slate-900 py-[100px] md:py-[140px] relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="(02)"
          eyebrow="INSIGHTS"
          headline="Original Thinking"
        />

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <StaggerItem key={index}>
              <Card className="relative h-full group cursor-pointer hover:border-sky-400/40 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-50 mb-3 leading-tight group-hover:text-sky-400 transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-400 mb-4">
                  {article.summary}
                </p>

                <div className="flex items-center gap-2 text-sm text-sky-400 font-medium mt-auto pt-4 border-t border-slate-700/30">
                  <BookOpen size={16} />
                  <span>Coming Soon</span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <p className="text-base text-slate-300 font-medium">
                Full articles coming soon — ask me about these systems in a call
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-all text-sm"
              >
                Schedule a Call
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

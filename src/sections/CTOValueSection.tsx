import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/Card'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { Zap, Shield, TrendingUp, Settings } from 'lucide-react'

const valueCards = [
  {
    icon: Zap,
    title: 'Faster Delivery',
    description: 'Parallel agent workflows reduce cycle time by handling design, coding, testing, and documentation simultaneously instead of sequentially.',
    highlight: '3x faster iterations'
  },
  {
    icon: Shield,
    title: 'Lower Risk',
    description: 'Quality gates and observability catch issues early. Continuous testing and monitoring prevent production incidents before they happen.',
    highlight: '18mo zero incidents'
  },
  {
    icon: TrendingUp,
    title: 'Better Leverage',
    description: 'Automate docs, tests, and reviews so your team focuses on architecture and business logic. Scale output without scaling headcount.',
    highlight: '40% time saved'
  },
  {
    icon: Settings,
    title: 'Controlled Adoption',
    description: 'Governance frameworks and human-in-loop workflows prevent chaos. You maintain oversight while agents handle execution.',
    highlight: 'Full visibility'
  }
]

const metrics = [
  { value: '40%', label: 'docs reduction' },
  { value: '18mo', label: 'zero incidents' },
  { value: '12', label: 'devs enabled' },
  { value: '1M+', label: 'users' }
]

export function CTOValueSection() {
  return (
    <section id="cto-value" className="bg-slate-900 py-[100px] md:py-[140px] relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="(00)"
          eyebrow="FOR ENGINEERING LEADERS"
          headline="AI-Native Delivery Without Losing Control"
          subheadline="Accelerate your team's output while maintaining quality, visibility, and governance. Proven at scale with 1M+ users and zero production incidents."
        />

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {valueCards.map((card) => (
            <StaggerItem key={card.title}>
              <Card className="h-full group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-sky-400/10 group-hover:bg-sky-400/20 transition-colors">
                    <card.icon size={24} className="text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-50 mb-2">{card.title}</h3>
                    <div className="inline-block px-2 py-1 rounded-md bg-cyan-400/10 border border-cyan-400/20 mb-3">
                      <span className="text-xs font-semibold text-cyan-400">{card.highlight}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{card.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ROI Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6"
        >
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-sky-400/70 mb-2">Proven ROI</p>
            <h3 className="text-lg font-bold text-slate-50">Real Results from Production Systems</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-sky-400 mb-1">{metric.value}</div>
                <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

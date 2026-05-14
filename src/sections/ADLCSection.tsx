import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/Card'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { ADLCFlowDiagram } from '@/components/ADLCFlowDiagram'
import { OldWayNewWayChat } from '@/components/OldWayNewWayChat'

import {
  Palette, Database, Cog, Server, ClipboardCheck,
  BarChart3, Rocket, Target, Zap, Shield, TrendingUp, Settings
} from 'lucide-react'

const cards = [
  { num: '01', icon: Palette, title: 'AI-Assisted Design', desc: 'Transforming design workflows with AI-powered prototyping, design systems generation, and visual-to-code conversion.', tags: ['Figma AI', 'Spec-Driven', 'Visual-to-Code'] },
  { num: '02', icon: Database, title: 'AI-Assisted Coding', desc: 'Pair programming with AI agents for code generation, refactoring, and pattern recognition across the stack.', tags: ['GitHub Copilot', 'Cursor AI', 'Multi-Agent'] },
  { num: '03', icon: Cog, title: 'AI-Assisted Build', desc: 'Automated dependency management, intelligent build optimization, and AI-driven CI/CD pipeline orchestration.', tags: ['Auto-Build', 'Smart CI/CD', 'Dependency AI'] },
  { num: '04', icon: Server, title: 'AI-Assisted Testing', desc: 'Autonomous test generation, execution, and analysis with coverage optimization and regression detection.', tags: ['Auto-Test Gen', 'Coverage AI', 'Anomaly Detect'] },
  { num: '05', icon: ClipboardCheck, title: 'AI-Assisted Deploy', desc: 'Intelligent deployment with risk assessment, rollback prediction, and canary analysis.', tags: ['Risk AI', 'Auto-Rollback', 'Canary AI'] },
  { num: '06', icon: BarChart3, title: 'Evaluation', desc: 'Continuous model evaluation with human feedback loops and performance drift detection.', tags: ['Human-in-Loop', 'Drift Detect', 'A/B Testing'] },
  { num: '07', icon: Rocket, title: 'Observability', desc: 'AI-powered monitoring with intelligent alerting, root cause analysis, and predictive insights.', tags: ['Smart Alerts', 'Root Cause AI', 'Predictive'] },
  { num: '08', icon: Target, title: 'AI-Assisted Improve', desc: 'Self-improving systems through feedback-driven optimization and automated documentation.', tags: ['Self-Healing', 'Auto-Docs', 'Feedback Loop'] },
]

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

export function ADLCSection() {

  return (
    <section id="adlc-ecosystem" className="bg-slate-900 py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Engineering Leader Value Proposition */}
        <SectionHeader number="(01)" eyebrow="FOR ENGINEERING LEADERS" headline="Delivery Without Losing Control"
          subheadline="Accelerate your team's output while maintaining quality, visibility, and governance. Proven at scale with 1M+ users and zero production incidents." />
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
          className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 mb-24"
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

        {/* ADLC Ecosystem */}
        <SectionHeader eyebrow="ADLC ECOSYSTEM" headline="My AI-Driven Development Lifecycle"
          subheadline="A comprehensive approach to building software with AI agents integrated at every stage — from design to continuous improvement." />

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {cards.map(c => (
            <StaggerItem key={c.num}>
              <Card className="relative h-full group">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-sky-400 text-slate-900 font-bold text-sm flex items-center justify-center border-4 border-slate-900 z-10 group-hover:scale-110 transition-transform">
                  {c.num}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-sky-400/10 group-hover:bg-sky-400/20 transition-colors">
                    <c.icon size={20} className="text-sky-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-50">{c.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md bg-slate-700/50 text-sky-400 font-medium border border-sky-400/20">{t}</span>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ADLC Flow Diagram */}
        <div className="mb-24">
          <ADLCFlowDiagram />
        </div>

        {/* How I Work — Old Way vs New Way */}
        <div className="mt-24">
          <OldWayNewWayChat />
        </div>
      </div>
    </section>
  )
}

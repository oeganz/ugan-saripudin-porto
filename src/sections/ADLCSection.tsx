import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/Card'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { ADLCFlowDiagram } from '@/components/ADLCFlowDiagram'

import {
  Palette, Database, Cog, Server, ClipboardCheck,
  BarChart3, Rocket, Target
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

const comparisons = [
  { aspect: 'Driver', sdlc: 'Every phase manually executed by human developers', adlc: 'Agents autonomously handle execution across phases' },
  { aspect: 'Planning', sdlc: 'Scope, budget locked in upfront', adlc: 'Goals & PRD evolve dynamically as agents learn' },
  { aspect: 'Development Speed', sdlc: 'Phases sequential, signed off before next', adlc: 'Sub-agents work in parallel across tasks' },
  { aspect: 'Testing', sdlc: 'QA is a dedicated phase after design', adlc: 'Agents run tests continuously throughout coding' },
  { aspect: 'Adaptability', sdlc: 'Changes trigger full replanning', adlc: 'Agents self-correct in real time' },
  { aspect: 'Feedback Loop', sdlc: 'Retrospectives at the end', adlc: 'Live monitoring & anomaly detection' },
]

export function ADLCSection() {

  return (
    <section id="adlc-ecosystem" className="bg-slate-900 py-[100px] md:py-[140px] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader number="(01)" eyebrow="ADLC ECOSYSTEM" headline="My AI-Driven Development Lifecycle"
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
        <div className="mb-16">
          <ADLCFlowDiagram />
        </div>

        {/* SDLC vs ADLC Comparison */}
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-slate-700/50"
            style={{ background: '#0a101f' }}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border-b border-slate-700/40">
              <span className="text-[11px] text-slate-500 font-mono">sdlc-vs-adlc.comparison</span>
              <span className="text-[10px] text-slate-600 font-mono">v1.0</span>
            </div>

            <div className="p-4 md:p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/40">
                    <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Particulars</th>
                    <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">SDLC</th>
                    <th className="text-left py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                      <div>ADLC</div>
                      <div className="text-[9px] text-sky-500/70 font-normal normal-case tracking-normal mt-1">
                        Understand how Agents have now transformed development
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <motion.tr
                      key={row.aspect}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className={`${i % 2 === 0 ? 'bg-slate-800/20' : ''} border-b border-slate-700/20 last:border-0`}
                    >
                      <td className="py-3 px-3 text-slate-200 font-medium">{row.aspect}</td>
                      <td className="py-3 px-3 text-slate-500">{row.sdlc}</td>
                      <td className="py-3 px-3 text-cyan-400">{row.adlc}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

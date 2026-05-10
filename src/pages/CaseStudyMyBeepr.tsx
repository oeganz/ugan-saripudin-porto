import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Globe, Target, Award, Shield, Users } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn'

export default function CaseStudyMyBeepr() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold mb-6">
              CASE STUDY
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-50 mb-6">
              MyBeepr: 98% On-Time Delivery Across Time Zones
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Delivering healthcare communication software across a 2-hour timezone gap between Indonesia and Australia, with 98% on-time delivery and zero security incidents across 16 hospital deployments.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold text-sky-400">98%</div>
                <div className="text-sm text-slate-500">On-Time Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-400">16</div>
                <div className="text-sm text-slate-500">Hospital Deployments</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-400">2hr</div>
                <div className="text-sm text-slate-500">Timezone Gap</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-400">Zero</div>
                <div className="text-sm text-slate-500">Security Incidents</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Context */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">The Context</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-300 mb-3">About MyBeepr</h3>
                <p className="text-slate-400 leading-relaxed">
                  MyBeepr is a clinical communication platform that streamlines workflows for healthcare professionals — enabling instant messaging, task management, and patient handoffs. Deployed across major Australian hospitals including St. George Hospital in Sydney.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-300 mb-3">The Challenge</h3>
                <p className="text-slate-400 leading-relaxed">
                  Xtramile Solutions (Australia) needed to deliver complex healthcare software from their Indonesian development team to Australian hospital stakeholders — across a 2-hour timezone gap with strict healthcare compliance requirements.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Key Challenges */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">Key Challenges</h2>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-6 mt-8">
            <StaggerItem>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <Globe className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-lg font-bold text-slate-50 mb-2">Timezone Gap</h3>
                <p className="text-slate-400 text-sm">
                  Only 2 hours of overlap between WIB (UTC+7) and Australian business hours. Communication had to be structured differently.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <Target className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-lg font-bold text-slate-50 mb-2">Healthcare Compliance</h3>
                <p className="text-slate-400 text-sm">
                  Australian healthcare standards (HL7 FHIR, privacy requirements) demanded rigorous documentation and audit trails.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <Clock className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-lg font-bold text-slate-50 mb-2">Strict Deadlines</h3>
                <p className="text-slate-400 text-sm">
                  Hospital deployment windows were fixed. Delays meant waiting months for the next implementation slot.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">The Approach</h2>
            <p className="text-lg text-slate-400 mb-8">
              I established an async-first delivery framework with structured communication protocols and proactive risk management.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.15} className="space-y-6">
            <StaggerItem>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-50 mb-4">Async-First Communication</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sky-400 font-semibold mb-2">Documentation Standards</h4>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li>• Every decision documented with context and rationale</li>
                      <li>• Meeting notes shared within 30 minutes of completion</li>
                      <li>• Weekly async standups replacing live meetings</li>
                      <li>• Decision log accessible to all stakeholders</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-cyan-400 font-semibold mb-2">Communication Windows</h4>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li>• AM WIB (8-10am): Prepare questions for Australian team</li>
                      <li>• AM/AU overlap (10am-12pm): Synchronized reviews</li>
                      <li>• PM WIB (1-5pm): Development, async work</li>
                      <li>• Evening AU: Review feedback, prepare next day's items</li>
                    </ul>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-50 mb-4">AI-Assisted Documentation</h3>
                <p className="text-slate-400 mb-4">
                  Implementing the ADLC framework, we automated documentation generation:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-sky-400 font-semibold mb-2">Code → Docs</div>
                    <p className="text-slate-500 text-sm">
                      AI-generated API documentation from code comments and types
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-sky-400 font-semibold mb-2">Specs → Tests</div>
                    <p className="text-slate-500 text-sm">
                      Automated test case generation from requirements
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-sky-400 font-semibold mb-2">Logs → Reports</div>
                    <p className="text-slate-500 text-sm">
                      AI-generated progress reports for stakeholders
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-50 mb-4">Quality Gates</h3>
                <p className="text-slate-400 mb-4">
                  Strict pre-deployment quality gates ensured zero production issues:
                </p>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>100% automated test coverage for healthcare-critical paths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>Security audit pass required before any deployment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>Compliance checklist verified by dedicated QA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>Staged rollout with hospital IT team approval</span>
                  </li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">The Results</h2>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-8 mt-8">
            <StaggerItem>
              <div className="bg-slate-800/50 border border-emerald-400/30 rounded-xl p-6">
                <Award className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-slate-50 mb-2">98% On-Time Delivery</h3>
                <p className="text-slate-400 mb-4">
                  Over 18 months of development and 16 hospital deployments, we maintained 98% on-time delivery despite the timezone challenges.
                </p>
                <div className="text-sm text-slate-500">
                  <strong className="text-slate-400">Impact:</strong> St. George Hospital deployment was completed 2 weeks ahead of schedule
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-emerald-400/30 rounded-xl p-6">
                <Shield className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-slate-50 mb-2">Zero Security Incidents</h3>
                <p className="text-slate-400 mb-4">
                  Complete healthcare compliance maintained across all deployments with no security breaches or compliance violations.
                </p>
                <div className="text-sm text-slate-500">
                  <strong className="text-slate-400">Impact:</strong> Trusted with sensitive patient data across 16 hospitals
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-emerald-400/30 rounded-xl p-6">
                <Clock className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-slate-50 mb-2">22 Minutes Saved Per Clinical Loop</h3>
                <p className="text-slate-400 mb-4">
                  MyBeepr's optimized workflows saved nurses and doctors 22+ minutes per clinical communication loop.
                </p>
                <div className="text-sm text-slate-500">
                  <strong className="text-slate-400">Impact:</strong> Estimated $X million annual time savings across all hospitals
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-emerald-400/30 rounded-xl p-6">
                <Users className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-slate-50 mb-2">Team Morale & Retention</h3>
                <p className="text-slate-400 mb-4">
                  Async-first culture improved work-life balance. Team members reported higher satisfaction with remote collaboration.
                </p>
                <div className="text-sm text-slate-500">
                  <strong className="text-slate-400">Impact:</strong> 0 turnover during critical project phases
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">Key Takeaways</h2>
            <div className="space-y-4">
              <div className="bg-slate-900/50 border-l-4 border-sky-400 p-5 rounded-r-xl">
                <h3 className="text-lg font-bold text-slate-50 mb-2">Documentation is Infrastructure</h3>
                <p className="text-slate-400">
                  In async-first teams, documentation isn't overhead — it's the communication medium. Invest in tools and processes that make documentation effortless.
                </p>
              </div>

              <div className="bg-slate-900/50 border-l-4 border-cyan-400 p-5 rounded-r-xl">
                <h3 className="text-lg font-bold text-slate-50 mb-2">Overlap Time is Precious</h3>
                <p className="text-slate-400">
                  With only 2 hours of overlap, every meeting must be prepped and every discussion must have an agenda. Respect the constraint by being efficient.
                </p>
              </div>

              <div className="bg-slate-900/50 border-l-4 border-emerald-400 p-5 rounded-r-xl">
                <h3 className="text-lg font-bold text-slate-50 mb-2">Trust Through Transparency</h3>
                <p className="text-slate-400">
                  Remote work requires visible progress. Daily async updates, decision logs, and progress dashboards built trust with Australian stakeholders.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-4">
              Leading Remote Teams to Success
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Whether you're managing distributed teams across time zones or implementing async-first workflows, I can help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:oeganx1999@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-all"
              >
                Let's Discuss Your Challenge
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-medium hover:bg-slate-700 transition-all"
              >
                View More Projects
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

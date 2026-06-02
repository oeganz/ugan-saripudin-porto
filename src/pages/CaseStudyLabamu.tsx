import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, TrendingUp, Shield, Zap } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn'

export default function CaseStudyLabamu() {
  return (
    <>
      <Helmet>
        <title>Labamu: From Monolith to 86K+ Users — Ugan Saripudin</title>
        <meta name="description" content="Case study: Led Labamu's migration from Laravel monolith to microservices, supporting 86K+ merchants and IDR 86B in funding." />
        <link rel="canonical" href="https://ugan.ganzapps.my.id/case-study/labamu" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Labamu: From Monolith to 86K+ Users" />
        <meta property="og:description" content="Led Labamu's migration from Laravel monolith to microservices, supporting 86K+ merchants." />
        <meta property="og:url" content="https://ugan.ganzapps.my.id/case-study/labamu" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Labamu: From Monolith to 86K+ Users" />
        <meta name="twitter:description" content="Led Labamu's migration from Laravel monolith to microservices." />
      </Helmet>
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
            <div className="inline-block px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/30 text-sky-400 text-xs font-semibold mb-6">
              CASE STUDY
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-50 mb-6">
              Labamu: Monolith to Microservices Migration
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              How we transformed a legacy POS system serving 7,500+ SMEs into a scalable microservices architecture while maintaining zero downtime and achieving ISO 27001 certification.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold text-sky-400">7,500+</div>
                <div className="text-sm text-slate-500">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-400">Zero</div>
                <div className="text-sm text-slate-500">Downtime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-400">12</div>
                <div className="text-sm text-slate-500">Developers Led</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sky-400">ISO 27001</div>
                <div className="text-sm text-slate-500">Certified</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">The Challenge</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-400 leading-relaxed mb-4">
                Labamu, a leading POS and inventory management platform for Indonesian SMEs, faced critical scaling challenges:
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-slate-300">Monolithic architecture</strong> causing deployment bottlenecks — any change required full system deployment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-slate-300">3 engineering pods</strong> blocked by shared codebase — teams couldn't work independently</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-slate-300">Manual documentation</strong> consuming 15+ hours per developer per week</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-slate-300">No AI workflows</strong> — traditional SDLC with heavy manual overhead</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-slate-300">ISO 27001 compliance</strong> required for enterprise clients — needed robust security and audit trails</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">The Approach</h2>
            <p className="text-lg text-slate-400 mb-8">
              We implemented a phased migration strategy using the ADLC (Agentic Development Lifecycle) framework:
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="space-y-6">
            <StaggerItem>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">Domain Analysis & Service Boundaries</h3>
                    <p className="text-slate-400 mb-3">
                      Used AI-assisted code analysis to identify service boundaries based on business domains: Inventory, Sales, Reporting, User Management.
                    </p>
                    <div className="text-sm text-slate-500">
                      <strong>Key Decision:</strong> Strangler Fig pattern — gradually extract services while keeping monolith operational
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">ADLC Framework Implementation</h3>
                    <p className="text-slate-400 mb-3">
                      Established spec-driven workflows across all development phases:
                    </p>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li>• AI-assisted code reviews and refactoring suggestions</li>
                      <li>• Automated documentation generation (40% time savings)</li>
                      <li>• Continuous testing with AI-generated test cases</li>
                      <li>• Automated deployment with quality gates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">Microservices Architecture</h3>
                    <p className="text-slate-400 mb-3">
                      Extracted 4 core services with independent deployment pipelines:
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-slate-900/50 p-3 rounded-lg">
                        <div className="text-sky-400 font-semibold">Inventory Service</div>
                        <div className="text-slate-500">Stock management, suppliers</div>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-lg">
                        <div className="text-sky-400 font-semibold">Sales Service</div>
                        <div className="text-slate-500">POS, transactions, receipts</div>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-lg">
                        <div className="text-sky-400 font-semibold">Reporting Service</div>
                        <div className="text-slate-500">Analytics, dashboards</div>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-lg">
                        <div className="text-sky-400 font-semibold">Auth Service</div>
                        <div className="text-slate-500">Users, permissions, audit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-400 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-50 mb-2">Quality Gates & Observability</h3>
                    <p className="text-slate-400 mb-3">
                      Implemented comprehensive monitoring and quality controls:
                    </p>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li>• Automated integration tests for service boundaries</li>
                      <li>• Real-time monitoring with alerting (Prometheus + Grafana)</li>
                      <li>• Distributed tracing for cross-service requests</li>
                      <li>• Automated rollback on quality gate failures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">The Results</h2>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-6 mt-8">
            <StaggerItem>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-50 mb-2">40% Documentation Reduction</h3>
                <p className="text-slate-400">
                  AI-assisted documentation generation freed up 6+ hours per developer per week, allowing focus on architecture and feature development.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                <Shield className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-50 mb-2">18 Months Zero Incidents</h3>
                <p className="text-slate-400">
                  Quality gates and automated testing caught issues before production. No critical incidents since migration completion.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                <Users className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-50 mb-2">3x Faster Deployments</h3>
                <p className="text-slate-400">
                  Independent service deployments enabled parallel team workflows. Deployment frequency increased from weekly to daily.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                <Zap className="w-8 h-8 text-sky-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-50 mb-2">ISO 27001 Certified</h3>
                <p className="text-slate-400">
                  Achieved security certification with automated audit trails and compliance monitoring built into ADLC workflows.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Lessons Learned */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-6">Lessons Learned</h2>
            <div className="space-y-6">
              <div className="bg-slate-800/50 border-l-4 border-sky-400 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-slate-50 mb-2">Start with Observability</h3>
                <p className="text-slate-400">
                  We instrumented the monolith first to understand service boundaries through actual usage patterns. This data-driven approach prevented premature optimization.
                </p>
              </div>

              <div className="bg-slate-800/50 border-l-4 border-cyan-400 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-slate-50 mb-2">AI Workflows Need Governance</h3>
                <p className="text-slate-400">
                  Early AI-generated code lacked consistency. We established clear guidelines and review processes to maintain quality while preserving speed benefits.
                </p>
              </div>

              <div className="bg-slate-800/50 border-l-4 border-emerald-400 p-6 rounded-r-xl">
                <h3 className="text-lg font-bold text-slate-50 mb-2">Team Enablement Over Automation</h3>
                <p className="text-slate-400">
                  Success came from enabling 12 developers to work autonomously, not just automating tasks. ADLC framework provided structure for independent decision-making.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-50 mb-4">
              Ready to Transform Your Engineering Workflow?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how ADLC can help your team achieve similar results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:oeganz1999@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-all"
              >
                Schedule a Call
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
    </>
  )
}
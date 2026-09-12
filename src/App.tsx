import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { StatsSection } from '@/sections/StatsSection'
import { TickerStrip } from '@/components/TickerStrip'

// Lazy load heavy sections
const ADLCSection = lazy(() => import('@/sections/ADLCSection').then(m => ({ default: m.ADLCSection })))
const InsightsSection = lazy(() => import('@/sections/InsightsSection').then(m => ({ default: m.InsightsSection })))
const ProjectsSection = lazy(() => import('@/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })))
const ExperienceSection = lazy(() => import('@/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })))
const TechStackSection = lazy(() => import('@/sections/TechStackSection').then(m => ({ default: m.TechStackSection })))
const ContactSection = lazy(() => import('@/sections/ContactSection').then(m => ({ default: m.ContactSection })))

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-ink-900">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-slate-900 focus:rounded-lg focus:font-semibold">
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content">
          {/* 00 Hero — editorial viewfinder */}
          <HeroSection />

          {/* Ticker divider */}
          <TickerStrip />

          {/* 00b Stats — Slightly lighter band */}
          <div className="bg-ink-800/40">
            <StatsSection />
          </div>

          {/* 01 ADLC — Dark */}
          <Suspense fallback={<div className="min-h-[50vh] bg-ink-900" />}>
            <ADLCSection />
          </Suspense>

          {/* 04 Insights — Lighter band */}
          <div className="bg-ink-800/40">
            <Suspense fallback={<div className="min-h-[50vh] bg-ink-800/40" />}>
              <InsightsSection />
            </Suspense>
          </div>

          {/* 05 Projects — Dark */}
          <Suspense fallback={<div className="min-h-[50vh] bg-ink-900" />}>
            <ProjectsSection />
          </Suspense>

          {/* 06 Experience — Lighter band */}
          <div className="bg-ink-800/40">
            <Suspense fallback={<div className="min-h-[50vh] bg-ink-800/40" />}>
              <ExperienceSection />
            </Suspense>
          </div>

          {/* 07 Tech Stack — Dark */}
          <Suspense fallback={<div className="min-h-[50vh] bg-ink-900" />}>
            <TechStackSection />
          </Suspense>

          {/* 08 Contact — Lighter band */}
          <div className="bg-ink-800/40">
            <Suspense fallback={<div className="min-h-[50vh] bg-ink-800/40" />}>
              <ContactSection />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

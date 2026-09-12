import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { StatsSection } from '@/sections/StatsSection'
import { TrustedBy } from '@/components/TrustedBy'

// Lazy load heavy sections
const FeaturedProjectsSection = lazy(() => import('@/sections/FeaturedProjectsSection').then(m => ({ default: m.FeaturedProjectsSection })))
const ServicesSection = lazy(() => import('@/sections/ServicesSection').then(m => ({ default: m.ServicesSection })))
const ProcessSection = lazy(() => import('@/sections/ProcessSection').then(m => ({ default: m.ProcessSection })))
const ADLCSection = lazy(() => import('@/sections/ADLCSection').then(m => ({ default: m.ADLCSection })))
const AboutSection = lazy(() => import('@/sections/AboutSection').then(m => ({ default: m.AboutSection })))
const ContactSection = lazy(() => import('@/sections/ContactSection').then(m => ({ default: m.ContactSection })))

function SectionFallback() {
  return <div className="min-h-[40vh] bg-ink-950" aria-busy="true" />
}

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-ink-950">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-slate-900 focus:rounded-lg focus:font-semibold">
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content">
          {/* 00 Hero — circular portrait + floating stat chips */}
          <HeroSection />

          {/* Trusted-by logo strip */}
          <TrustedBy />

          {/* 01 Featured work — reference-style 2x3 card grid */}
          <Suspense fallback={<SectionFallback />}>
            <FeaturedProjectsSection />
          </Suspense>

          {/* 02 Services — three capability cards */}
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>

          {/* 03 Stats — single rounded bar */}
          <StatsSection />

          {/* 04 Process — 01/02/03 SDLC cards + inline CTA */}
          <Suspense fallback={<SectionFallback />}>
            <ProcessSection />
          </Suspense>

          {/* 05 AI-DLC — the flagship deep-dive */}
          <div className="border-t border-white/[0.05] bg-ink-900/60">
            <Suspense fallback={<SectionFallback />}>
              <ADLCSection />
            </Suspense>
          </div>

          {/* 06 About — portrait card + bio + stack + experience rows */}
          <div className="border-t border-white/[0.05]">
            <Suspense fallback={<SectionFallback />}>
              <AboutSection />
            </Suspense>
          </div>

          {/* 07 Contact — closing CTA panel */}
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  )
}

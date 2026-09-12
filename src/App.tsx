import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { TrustedBySection } from '@/sections/TrustedBySection'
import { FeaturedProjectsSection } from '@/sections/FeaturedProjectsSection'
import { ServicesSection } from '@/sections/ServicesSection'
import { StatsSection } from '@/sections/StatsSection'
import { ProcessSection } from '@/sections/ProcessSection'
import { MidCTASection } from '@/sections/MidCTASection'
import { AboutSection } from '@/sections/AboutSection'
import { FAQSection } from '@/sections/FAQSection'
import { ContactSection } from '@/sections/ContactSection'

// Lazy load heavier sections
const InsightsSection = lazy(() => import('@/sections/InsightsSection').then(m => ({ default: m.InsightsSection })))

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
          {/* 00 Hero — split greeting + halo portrait + floating stat chips */}
          <HeroSection />

          {/* 00b Trusted by */}
          <TrustedBySection />

          {/* 01 Recent Projects — featured grid */}
          <FeaturedProjectsSection />

          {/* 02 Services */}
          <ServicesSection />

          {/* 03 Stats band */}
          <StatsSection />

          {/* 04 Process — AI-augmented lifecycle */}
          <ProcessSection />

          {/* 05 Mid CTA banner */}
          <MidCTASection />

          {/* 06 About — profile card + bio + stack + experience */}
          <AboutSection />

          {/* 07 Insights — lighter band */}
          <div className="bg-[#090D18]">
            <Suspense fallback={<div className="min-h-[50vh] bg-[#090D18]" />}>
              <InsightsSection />
            </Suspense>
          </div>

          {/* 08 FAQs */}
          <FAQSection />

          {/* 09 Contact panel */}
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

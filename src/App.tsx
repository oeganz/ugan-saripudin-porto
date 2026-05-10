import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { StatsSection } from '@/sections/StatsSection'

// Lazy load heavy sections
const CTOValueSection = lazy(() => import('@/sections/CTOValueSection').then(m => ({ default: m.CTOValueSection })))
const ADLCSection = lazy(() => import('@/sections/ADLCSection').then(m => ({ default: m.ADLCSection })))
const InsightsSection = lazy(() => import('@/sections/InsightsSection').then(m => ({ default: m.InsightsSection })))
const ProjectsSection = lazy(() => import('@/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })))
const FeaturedCaseStudiesSection = lazy(() => import('@/sections/FeaturedCaseStudiesSection').then(m => ({ default: m.FeaturedCaseStudiesSection })))
const ExperienceSection = lazy(() => import('@/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })))
const TestimonialsSection = lazy(() => import('@/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })))
const TechStackSection = lazy(() => import('@/sections/TechStackSection').then(m => ({ default: m.TechStackSection })))
const ContactSection = lazy(() => import('@/sections/ContactSection').then(m => ({ default: m.ContactSection })))

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-400 focus:text-slate-900 focus:rounded-lg focus:font-semibold">
        Skip to main content
      </a>

      <Navbar />
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
          <CTOValueSection />
          <ADLCSection />
          <InsightsSection />
          <ProjectsSection />
          <FeaturedCaseStudiesSection />
          <ExperienceSection />
          <TestimonialsSection />
          <TechStackSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

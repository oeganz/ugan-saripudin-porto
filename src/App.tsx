import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { StatsSection } from '@/sections/StatsSection'
import { ADLCSection } from '@/sections/ADLCSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { TechStackSection } from '@/sections/TechStackSection'
import { ContactSection } from '@/sections/ContactSection'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ADLCSection />
        <ProjectsSection />
        <ExperienceSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

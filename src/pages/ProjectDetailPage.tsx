import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { FadeIn } from '@/components/FadeIn';
import { ProjectHero } from '@/components/project-detail/ProjectHero';
import { ProjectInfoBar } from '@/components/project-detail/ProjectInfoBar';
import { ProjectFeatures } from '@/components/project-detail/ProjectFeatures';
import { ProjectTechStack } from '@/components/project-detail/ProjectTechStack';
import { projects } from '@/data/projects';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages: Record<string, string> = {
  // Featured - hero images
  axisnet: '/images/proj-axisnet.jpg',
  mybeepr: '/images/proj-mybeepr.jpg',
  'aku-berbagi': '/images/proj-akuberbagi.jpg',
  agriaku: '/images/proj-agriaku.jpg',
  labamu: '/images/proj-labamu.jpg',
  'go-great': '/images/proj-gogreat.jpg',
  // Others - screenshots
  asabri: '/images/projects/screenshots/asabri_screenshot_01.jpg',
  bluegaz: '/images/projects/screenshots/bluegaz_screenshot_01.jpg',
  smarco: '/images/projects/screenshots/smarco_screenshot_01.jpg',
  'sahabat-berbagi': '/images/projects/screenshots/sahabat_screenshot_01.jpg',
  skillbridge: '/images/projects/screenshots/skillbridge_screenshot_01.jpg',
  'kuis-milioner': '/images/projects/screenshots/kuismilioner_hero_01.jpg',
  'laut-nusantara': '/images/projects/screenshots/lautnusantara_screenshot_01.jpg',
  absensi: '/images/projects/screenshots/absensi_screenshot_01.jpg',
  'net-gear': '/images/projects/screenshots/netgear_screenshot_01.jpg',
  'edu-assessment': '/images/projects/screenshots/eduassessment_screenshot_01.jpg',
  'great-survey': '/images/projects/screenshots/greatsurvey_screenshot_01.jpg',
  'great-chat': '/images/projects/screenshots/greatchat_screenshot_01.jpg',
  'great-face-recognition': '/images/projects/screenshots/greatface_screenshot_01.jpg',
  'virtual-showroom': '/images/projects/screenshots/virtualshowroom_screenshot_01.jpg',
  'chatbot-flow': '/images/projects/screenshots/chatbotflow_screenshot_01.jpg',
  cms: '/images/projects/screenshots/cms_screenshot_01.jpg',
  'mds-moments': '/images/projects/screenshots/mds_moments_screenshot_01.jpg',
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.id === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900">
        <ScrollToTop />
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">Project Not Found</h1>
            <p className="text-slate-400 mb-8">The project you are looking for does not exist.</p>
            <Link to="/#/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImage = heroImages[project.id] || '/images/projects/screenshots/' + project.id + '_screenshot_01.jpg';

  return (
    <div className="min-h-screen bg-slate-900">
      <ScrollToTop />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />

        <main>
          {/* Hero with background image */}
          <ProjectHero
            project={project}
            heroImage={heroImage}
          />

          {/* Compact info bar: Platform + Metrics + Store Links */}
          <ProjectInfoBar
            metrics={project.metrics}
            status={project.status}
            platform={project.platform}
            urls={project.urls}
          />

          {/* Overview */}
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-slate-700/40 flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-200">Overview</h2>
                </div>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">{project.description}</p>
              </FadeIn>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 px-4 bg-slate-800/20">
            <div className="max-w-7xl mx-auto">
              <ProjectFeatures features={project.features} industry={project.industry} />
            </div>
          </section>

          {/* Tech Stack */}
          <ProjectTechStack techStack={project.techStack} />


        </main>

        <Footer />
      </motion.div>
    </div>
  );
}

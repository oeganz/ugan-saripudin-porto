import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { FadeIn } from '@/components/FadeIn';
import { ProjectHero } from '@/components/project-detail/ProjectHero';
import { ProjectStats } from '@/components/project-detail/ProjectStats';
import { ProjectFeatures } from '@/components/project-detail/ProjectFeatures';
import { ProjectScreenshots } from '@/components/project-detail/ProjectScreenshots';
import { ProjectTechStack } from '@/components/project-detail/ProjectTechStack';
import { ProjectMetrics } from '@/components/project-detail/ProjectMetrics';
import { ProjectLinks } from '@/components/project-detail/ProjectLinks';
import { RelatedProjects } from '@/components/project-detail/RelatedProjects';
import { projects } from '@/data/projects';
import { ArrowLeft } from 'lucide-react';

const heroImages: Record<string, string> = {
  axisnet: '/images/proj-axisnet.jpg',
  mybeepr: '/images/proj-mybeepr.jpg',
  'aku-berbagi': '/images/proj-akuberbagi.jpg',
  agriaku: '/images/proj-agriaku.jpg',
  labamu: '/images/proj-labamu.jpg',
  'go-great': '/images/proj-gogreat.jpg',
  asabri: '/images/projects/screenshots/asabri_screenshot_01.jpg',
  bluegaz: '/images/projects/screenshots/bluegaz_screenshot_01.jpg',
  smarco: '/images/projects/screenshots/smarco_screenshot_01.jpg',
  'sahabat-berbagi': '/images/projects/screenshots/sahabat_screenshot_01.jpg',
  skillbridge: '/images/projects/screenshots/skillbridge_screenshot_01.jpg',
  'kuis-milioner': '/images/projects/screenshots/kuismilioner_hero_01.jpg',
  'laut-nusantara': '/images/projects/screenshots/lautnusantara_screenshot_01.jpg',
  'my-telkominfra': '/images/projects/screenshots/mytelkominfra_screenshot_01.jpg',
  absensi: '/images/projects/screenshots/absensi_screenshot_01.jpg',
  'net-gear': '/images/projects/screenshots/netgear_screenshot_01.jpg',
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
          {/* Hero */}
          <ProjectHero
            name={project.name}
            company={project.company}
            timeline={project.timeline}
            roleLevel={project.roleLevel}
            heroImage={heroImage}
          />

          {/* Stats Bar */}
          <ProjectStats
            metrics={project.metrics}
            status={project.status}
            platform={project.platform}
          />

          {/* Overview */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">Overview</h2>
                <p className="text-lg text-slate-300 leading-relaxed">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.platform.map(p => (
                    <span key={p} className="px-3 py-1 rounded-full bg-sky-400/10 text-sky-400 text-sm border border-sky-400/30">
                      {p}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-sm">
                    {project.category}
                  </span>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Features */}
          <ProjectFeatures features={project.features} industry={project.industry} />

          {/* Screenshots */}
          <ProjectScreenshots screenshots={project.screenshots} projectName={project.name} />

          {/* Tech Stack */}
          <ProjectTechStack techStack={project.techStack} />

          {/* Impact Metrics */}
          <ProjectMetrics metrics={project.metrics} />

          {/* Links */}
          <ProjectLinks urls={project.urls} />

          {/* Related Projects */}
          <RelatedProjects currentProject={project} heroImages={heroImages} />
        </main>

        <Footer />
      </motion.div>
    </div>
  );
}
# Project Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create individual project detail pages at `/projects/:slug` with Hero + Sections layout, featuring project hero, stats bar, overview, features grid, screenshot gallery, tech stack, impact metrics, links, and related projects.

**Architecture:** React Router v6 with HashRouter (static hosting compatible). Projects data from existing `src/data/projects.ts`. New reusable components in `src/components/project-detail/`. Assets migrated from `.reference/` (git-ignored) to `public/images/projects/` (included in build).

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, React Router v6, existing TechIcons component.

---

## File Structure

```
src/
  pages/
    ProjectDetailPage.tsx       # NEW - Main detail page, fetches project by slug
  components/
    project-detail/
      ProjectHero.tsx            # NEW - Full-width hero with gradient overlay
      ProjectStats.tsx          # NEW - Animated stats bar (downloads, rating, timeline)
      ProjectFeatures.tsx       # NEW - Feature cards grid with icons
      ProjectScreenshots.tsx    # NEW - Horizontal scroll carousel
      ProjectTechStack.tsx      # NEW - Tech icons grid using existing TechIcons
      ProjectMetrics.tsx         # NEW - Large animated impact numbers
      ProjectLinks.tsx           # NEW - CTA buttons for Play Store/Website/App Store
      RelatedProjects.tsx        # NEW - 3 similar project cards
  data/
    projects.ts                  # MODIFY - Update screenshot paths to local

public/
  images/projects/
    screenshots/                 # NEW - Copied from .reference/screenshots/
    icons/                       # NEW - Copied from .reference/icons/
    playstore/                   # NEW - Copied from .reference/playstore_pages/

src/main.tsx                     # MODIFY - Add route for /projects/:slug
src/sections/ProjectsSection.tsx  # MODIFY - Add click-to-detail navigation
```

---

## Tasks

### Task 1: Create ProjectHero Component

**Files:**
- Create: `src/components/project-detail/ProjectHero.tsx`
- Modify: `src/data/projects.ts` (add heroImage field)

- [ ] **Step 1: Write ProjectHero component**

```tsx
import { FadeIn } from '@/components/FadeIn';

interface ProjectHeroProps {
  name: string;
  company: string;
  timeline: string;
  role: string;
  roleLevel: string;
  heroImage: string;
}

const roleColors: Record<string, string> = {
  android: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
  mobile: 'bg-green-400/20 text-green-400 border-green-400/30',
  'senior-fe': 'bg-purple-400/20 text-purple-400 border-purple-400/30',
  'tech-lead': 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  'lead-dev': 'bg-rose-400/20 text-rose-400 border-rose-400/30',
};

const roleLabels: Record<string, string> = {
  android: 'Android Developer',
  mobile: 'Mobile Developer',
  'senior-fe': 'Senior Front End Engineer',
  'tech-lead': 'Tech Lead',
  'lead-dev': 'Lead Developer',
};

export function ProjectHero({ name, company, timeline, role, roleLevel, heroImage }: ProjectHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
        <FadeIn direction="up">
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${roleColors[roleLevel]}`}>
              {roleLabels[roleLevel]}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {name}
          </h1>
          <p className="text-xl text-slate-300 mb-2">{company}</p>
          <p className="text-slate-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeline}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /e/work/Ugansaripudin-porto/ugan-saripudin-porto
git add src/components/project-detail/ProjectHero.tsx
git commit -m "feat: add ProjectHero component"
```

---

### Task 2: Create ProjectStats Component

**Files:**
- Create: `src/components/project-detail/ProjectStats.tsx`

- [ ] **Step 1: Write ProjectStats component**

```tsx
import { FadeIn } from '@/components/FadeIn';

interface ProjectStatsProps {
  metrics: Record<string, string>;
  status: string;
  platform: string[];
  category: string;
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
  inactive: 'bg-slate-600/30 text-slate-500 border-slate-600/30',
  internal: 'bg-amber-400/20 text-amber-400 border-amber-400/30',
  discontinued: 'bg-red-400/20 text-red-400 border-red-400/30',
};

const statusLabels: Record<string, string> = {
  active: 'Active',
  inactive: 'Inactive',
  internal: 'Internal',
  discontinued: 'Discontinued',
};

const platformIcons: Record<string, string> = {
  Android: 'A',
  iOS: 'i',
  Web: 'W',
};

export function ProjectStats({ metrics, status, platform, category }: ProjectStatsProps) {
  const displayMetrics = Object.entries(metrics).slice(0, 4);

  return (
    <section className="bg-slate-800/50 border-y border-slate-700/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Status */}
          <FadeIn delay={0}>
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${statusColors[status]}`}>
                {statusLabels[status]}
              </span>
            </div>
          </FadeIn>

          {/* Platform */}
          <FadeIn delay={0.05}>
            <div className="text-center">
              <div className="flex justify-center gap-1 mb-2">
                {platform.map((p) => (
                  <span key={p} className="w-8 h-8 rounded-md bg-slate-700/50 flex items-center justify-center text-xs font-bold text-sky-400">
                    {platformIcons[p] || p.charAt(0)}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500">Platform</p>
            </div>
          </FadeIn>

          {/* Metrics */}
          {displayMetrics.map(([key, value], i) => (
            <FadeIn key={key} delay={0.1 + i * 0.05}>
              <div className="text-center">
                <p className="text-2xl font-bold text-sky-400 mb-1">{value}</p>
                <p className="text-xs text-slate-500 capitalize">{key.replace(/_/g, ' ')}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-detail/ProjectStats.tsx
git commit -m "feat: add ProjectStats component"
```

---

### Task 3: Create ProjectFeatures Component

**Files:**
- Create: `src/components/project-detail/ProjectFeatures.tsx`

- [ ] **Step 1: Write ProjectFeatures component**

```tsx
import { FadeIn } from '@/components/FadeIn';
import { Check } from 'lucide-react';

interface ProjectFeaturesProps {
  features: string[];
  industry: string;
}

const featureIcons = [
  <Check className="w-6 h-6 text-sky-400" />,
  <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
];

export function ProjectFeatures({ features, industry }: ProjectFeaturesProps) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Key Features</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            {industry} solution delivering measurable impact through comprehensive functionality.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature} delay={i * 0.08}>
              <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/30 transition-all group">
                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center mb-4 group-hover:bg-sky-400/20 transition-colors">
                  {featureIcons[i % featureIcons.length]}
                </div>
                <p className="text-slate-200">{feature}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-detail/ProjectFeatures.tsx
git commit -m "feat: add ProjectFeatures component"
```

---

### Task 4: Create ProjectScreenshots Component

**Files:**
- Create: `src/components/project-detail/ProjectScreenshots.tsx`

- [ ] **Step 1: Write ProjectScreenshots component**

```tsx
import { useRef, useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';

interface ProjectScreenshotsProps {
  screenshots: string[];
  projectName: string;
}

export function ProjectScreenshots({ screenshots, projectName }: ProjectScreenshotsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (screenshots.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = isMobile ? 280 : 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Screenshots</h2>
        </FadeIn>

        {/* Navigation */}
        {!isMobile && (
          <div className="flex justify-end gap-2 mb-4">
            <button onClick={() => scroll('left')}
              className="p-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')}
              className="p-2 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-400 hover:text-sky-400 hover:border-sky-400/40 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Gallery */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {screenshots.map((src, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div
                onClick={() => setSelectedIndex(i)}
                className="flex-shrink-0 w-[280px] md:w-[320px] rounded-xl overflow-hidden cursor-pointer snap-start group">
                <img
                  src={src}
                  alt={`${projectName} screenshot ${i + 1}`}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          <img
            src={screenshots[selectedIndex]}
            alt={`${projectName} screenshot ${selectedIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-sm">
            {selectedIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-detail/ProjectScreenshots.tsx
git commit -m "feat: add ProjectScreenshots component with lightbox"
```

---

### Task 5: Create ProjectTechStack Component

**Files:**
- Create: `src/components/project-detail/ProjectTechStack.tsx`

- [ ] **Step 1: Write ProjectTechStack component**

```tsx
import { FadeIn } from '@/components/FadeIn';
import { getTechIcon, DefaultTechIcon } from '@/components/TechIcons';

interface ProjectTechStackProps {
  techStack: string[];
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Tech Stack</h2>
        </FadeIn>

        <div className="flex flex-wrap gap-4">
          {techStack.map((tech, i) => {
            const IconComp = getTechIcon(tech);
            const Icon = IconComp || DefaultTechIcon;
            return (
              <FadeIn key={tech} delay={i * 0.05}>
                <div className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/30 transition-all">
                  <Icon />
                  <span className="text-slate-300 group-hover:text-white transition-colors">{tech}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-detail/ProjectTechStack.tsx
git commit -m "feat: add ProjectTechStack component"
```

---

### Task 6: Create ProjectMetrics Component

**Files:**
- Create: `src/components/project-detail/ProjectMetrics.tsx`

- [ ] **Step 1: Write ProjectMetrics component**

```tsx
import { FadeIn } from '@/components/FadeIn';

interface ProjectMetricsProps {
  metrics: Record<string, string>;
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  const metricLabels: Record<string, string> = {
    downloads: 'Total Downloads',
    hospitals: 'Hospitals',
    medical_staff: 'Medical Staff',
    weekly_messages: 'Weekly Messages',
    entrepreneurs_trained: 'Entrepreneurs Trained',
    farmer_stores: 'Farmer Stores',
    heritage_funds: 'Heritage Funds',
    wakaf_contributions: 'Wakaf Contributions',
    funding: 'Funding Raised',
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-800/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Impact Metrics</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(metrics).slice(0, 6).map(([key, value], i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <div className="text-center p-8 rounded-2xl bg-slate-800/40 border border-slate-700/30">
                <p className="text-5xl md:text-6xl font-bold text-sky-400 mb-2">{value}</p>
                <p className="text-slate-400">{metricLabels[key] || key.replace(/_/g, ' ')}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-detail/ProjectMetrics.tsx
git commit -m "feat: add ProjectMetrics component"
```

---

### Task 7: Create ProjectLinks Component

**Files:**
- Create: `src/components/project-detail/ProjectLinks.tsx`

- [ ] **Step 1: Write ProjectLinks component**

```tsx
import { FadeIn } from '@/components/FadeIn';
import { ExternalLink } from 'lucide-react';

interface ProjectLinksProps {
  urls: Record<string, string>;
  name: string;
}

export function ProjectLinks({ urls, name }: ProjectLinksProps) {
  const hasLinks = Object.values(urls).some(Boolean);
  if (!hasLinks) return null;

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-100 mb-8">Get the App</h2>
        </FadeIn>

        <div className="flex flex-wrap gap-4">
          {urls.play_store && (
            <FadeIn delay={0}>
              <a href={urls.play_store} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.71 11.5 20.71 11.95C20.71 12.4 20.5 12.82 20.16 13.09L17.89 14.47L15.39 12L17.89 9.53L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
                </svg>
                Play Store <ExternalLink className="w-4 h-4" />
              </a>
            </FadeIn>
          )}

          {urls.website && (
            <FadeIn delay={0.1}>
              <a href={urls.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Website <ExternalLink className="w-4 h-4" />
              </a>
            </FadeIn>
          )}

          {urls.app_store && (
            <FadeIn delay={0.2}>
              <a href={urls.app_store} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store <ExternalLink className="w-4 h-4" />
              </a>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-detail/ProjectLinks.tsx
git commit -m "feat: add ProjectLinks component"
```

---

### Task 8: Create RelatedProjects Component

**Files:**
- Create: `src/components/project-detail/RelatedProjects.tsx`
- Modify: `src/data/projects.ts` (add heroImage mapping)

- [ ] **Step 1: Write RelatedProjects component**

```tsx
import { Link } from 'react-router-dom';
import { FadeIn } from '@/components/FadeIn';
import { ArrowRight } from 'lucide-react';
import { Project, projects } from '@/data/projects';

interface RelatedProjectsProps {
  currentProject: Project;
  heroImages: Record<string, string>;
}

const statusColors: Record<string, string> = {
  active: 'bg-emerald-400/20 text-emerald-400',
  inactive: 'bg-slate-600/30 text-slate-500',
  internal: 'bg-amber-400/20 text-amber-400',
  discontinued: 'bg-red-400/20 text-red-400',
};

export function RelatedProjects({ currentProject, heroImages }: RelatedProjectsProps) {
  // Find related projects: same category or industry
  const related = projects
    .filter(p => p.id !== currentProject.id)
    .filter(p => p.category === currentProject.category || p.industry === currentProject.industry)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-100">Related Projects</h2>
              <p className="text-slate-400 mt-2">More from {currentProject.industry} industry</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {related.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <Link to={`/#/projects/${project.id}`}
                className="group block rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-sky-400/40 transition-all overflow-hidden">
                <div className="relative h-40 bg-slate-700 overflow-hidden">
                  <img
                    src={heroImages[project.id] || ''}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors">
                      {project.name}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{project.company}</p>
                  <div className="flex items-center gap-2 text-sm text-sky-400">
                    View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/project-detail/RelatedProjects.tsx
git commit -m "feat: add RelatedProjects component"
```

---

### Task 9: Create ProjectDetailPage Main Component

**Files:**
- Create: `src/pages/ProjectDetailPage.tsx`

- [ ] **Step 1: Write ProjectDetailPage component**

```tsx
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
  // Add more as they have hero images
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.id === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-100 mb-4">Project Not Found</h1>
            <p className="text-slate-400 mb-8">The project you're looking for doesn't exist.</p>
            <Link to="/#/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImage = heroImages[project.id] || `/images/projects/screenshots/${project.id}_screenshot_01.jpg`;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main>
        {/* Hero */}
        <ProjectHero
          name={project.name}
          company={project.company}
          timeline={project.timeline}
          role={project.role}
          roleLevel={project.roleLevel}
          heroImage={heroImage}
        />

        {/* Stats Bar */}
        <ProjectStats
          metrics={project.metrics}
          status={project.status}
          platform={project.platform}
          category={project.category}
        />

        {/* Overview */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-slate-100 mb-6">Overview</h2>
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
        <ProjectLinks urls={project.urls} name={project.name} />

        {/* Related Projects */}
        <RelatedProjects currentProject={project} heroImages={heroImages} />
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ProjectDetailPage.tsx
git commit -m "feat: add ProjectDetailPage component"
```

---

### Task 10: Add Route and Update Project Cards

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/sections/ProjectsSection.tsx`
- Modify: `src/pages/ProjectsPage.tsx`

- [ ] **Step 1: Update main.tsx to add project detail route**

Add import:
```tsx
import ProjectDetailPage from './pages/ProjectDetailPage.tsx';
```

Add route:
```tsx
<Route path="/projects/:slug" element={<ProjectDetailPage />} />
```

- [ ] **Step 2: Update ProjectsSection.tsx to link to detail page**

Change the project card wrapper from div to Link:
```tsx
import { Link } from 'react-router-dom';

// Wrap the card content with Link
<Link to={`/#/projects/${project.id}`} className="group w-[340px] ...">
  {/* existing card content */}
</Link>
```

- [ ] **Step 3: Update ProjectsPage.tsx to link to detail page**

Same change - wrap project cards with `Link to={`/#/projects/${project.id}`}`.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/sections/ProjectsSection.tsx src/pages/ProjectsPage.tsx
git commit -m "feat: add project detail route and link project cards"
```

---

### Task 11: Update Screenshot Paths in projects.ts

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Update screenshot paths from external URLs to local paths**

For each project with screenshots, update the `screenshots` array to use local paths from `public/images/projects/screenshots/`:

Example for AXISnet:
```typescript
screenshots: [
  '/images/projects/screenshots/axisnet_screenshot_01.jpg',
  '/images/projects/screenshots/axisnet_screenshot_02.jpg',
  '/images/projects/screenshots/axisnet_screenshot_03.jpg',
  '/images/projects/screenshots/axisnet_screenshot_04.jpg',
  '/images/projects/screenshots/axisnet_screenshot_05.jpg',
],
```

Note: Only update if the corresponding files exist in `public/images/projects/screenshots/`. Projects with no local screenshots can keep their external URLs or use a placeholder.

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: update screenshot paths to local assets"
```

---

### Task 12: Final Verification

- [ ] **Step 1: Verify all routes work**

Check each route:
- `/` - Home page with projects carousel
- `/#/projects` - Projects list page
- `/#/projects/axisnet` - AXISnet detail page
- `/#/projects/labamu` - Labamu detail page
- `/#/projects/404-test` - 404 page (invalid slug)

- [ ] **Step 2: Verify images load**

Open browser dev tools, check for 404 images.

- [ ] **Step 3: Run build**

```bash
cd /e/work/Ugansaripudin-porto/ugan-saripudin-porto
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete project detail pages implementation"
```

---

## Plan Complete

**Saved to:** `docs/superpowers/plans/2026-05-11-project-detail-page-implementation.md`

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?

# Ugan Saripudin Portfolio — Project Handoff Document

## Overview

This is a **dark-themed portfolio website** for Ugan Saripudin, an AI Native Engineering Lead with 10+ years of experience. The site is built with React 19 + TypeScript + Vite + Tailwind CSS, featuring a WebGL shader background, animated sections, horizontal project carousel, SVG pipeline diagram, and a full projects listing page.

**Tech Stack:** React 19 | TypeScript | Vite | Tailwind CSS | Framer Motion | Three.js (@react-three/fiber) | shadcn/ui | Lucide Icons | HashRouter

**Deployed:** https://eqae2kzxlp6pq.kimi.page

---

## File Structure

```
/mnt/agents/output/app/
  index.html                          # Entry HTML (title: "Ugan Saripudin — AI Native Engineering Lead")
  vite.config.ts                      # Vite config with path aliases (@/ -> src/)
  tailwind.config.js                  # Tailwind with custom colors/fonts
  tsconfig.json                       # TypeScript config
  package.json                        # Dependencies
  
  src/
    main.tsx                          # Entry point — HashRouter + Navbar mount check
    App.tsx                           # Root component — all sections composed
    App.css                           # Global styles (keep minimal)
    index.css                         # Tailwind directives + custom CSS
    
    components/
      ui/                             # shadcn/ui components (auto-generated)
        button.tsx
        card.tsx
        badge.tsx
        ...
      
      FadeIn.tsx                      # Framer Motion fade-in animation wrapper
      Card.tsx                        # Custom card component with hover effects
      Navbar.tsx                      # Fixed navbar with active section detection
      Footer.tsx                      # Site footer
      SectionHeader.tsx               # Reusable section header with (01) numbering
      NeuralFlowShader.tsx            # WebGL shader background (Three.js)
      Highlight.tsx                   # Color highlight component for descriptions
      TechIcons.tsx                   # 35+ inline SVG tech brand icons
    
    sections/
      HeroSection.tsx                 # Profile photo + name + bio + stats bar
      StatsSection.tsx                # 6 animated stat counters
      ADLCSection.tsx                 # 8-card ADLC ecosystem grid
      ADLCPipelineSection.tsx         # SVG animated pipeline diagram
      ProjectsSection.tsx             # Horizontal carousel of 6 featured projects
      ExperienceSection.tsx           # 4-position timeline with color highlights
      TechStackSection.tsx            # 5-category skill grid
      ContactSection.tsx              # Compact contact grid + live clock
    
    pages/
      ProjectsPage.tsx                # Full projects listing with filters
    
    data/
      projects.ts                     # All 21 projects data with real CV info
    
    hooks/
      useScrolled.ts                  # Scroll position hook for navbar
    
    lib/
      utils.ts                        # cn() utility for tailwind class merging
  
  public/
    images/
      profile-real.jpg                # Profile photo (restored from backup)
      proj-axisnet.jpg                # Generated: AXISnet project image
      proj-mybeepr.jpg                # Generated: MyBeepr project image
      proj-akuberbagi.jpg             # Generated: Aku Berbagi project image
      proj-agriaku.jpg                # Generated: Agriaku project image
      proj-labamu.jpg                 # Generated: Labamu project image
      proj-gogreat.jpg                # Generated: Go Great project image
```

---

## Key Components Reference

### `components/FadeIn.tsx`

```tsx
// FadeIn — single element fade-in
<FadeIn delay={0.2}>...</FadeIn>

// StaggerContainer + StaggerItem — for lists
<StaggerContainer staggerDelay={0.1} className="grid ...">
  <StaggerItem><Card>...</Card></StaggerItem>
</StaggerContainer>
```

### `components/SectionHeader.tsx`

```tsx
<SectionHeader
  number="(01)"              // Optional: section number prefix
  eyebrow="ADLC ECOSYSTEM"   // Uppercase label text
  headline="Main Title"      // Large heading (52px)
  subheadline="Description"  // Optional subtitle
/>
```

**Important:** SectionHeader is **left-aligned by default** (no `centered` prop). All sections use left alignment.

### `components/Navbar.tsx`

- Fixed top navbar with `backdrop-blur-2xl`
- Active section detection via IntersectionObserver (threshold 0.3)
- `motion.layoutId="activeNav"` animated underline on active item
- Logo: "Ugan" (white) + "Saripudin" (sky-400)
- Links: My Profile | (01) ADLC | (02) Projects | (03) Experience | (04) Stack | (05) Contact | All Projects | Let's Talk
- On projects page (`/#/projects`), shows Home link instead of section links
- Mobile: hamburger menu with AnimatePresence slide-down

### `components/TechIcons.tsx`

35+ inline SVG brand icons. Import `getTechIcon(name)` which returns a render function or `undefined`. Use `DefaultTechIcon` as fallback.

```tsx
import { getTechIcon, DefaultTechIcon } from '@/components/TechIcons';
const Icon = getTechIcon('React') || DefaultTechIcon;
<Icon />
```

Available icons: Android, Kotlin, Java, React, React Native, Next.js, Vue.js, Node.js, TypeScript, JavaScript, Flutter, Firebase, GraphQL, PostgreSQL, MongoDB, Python, Go, AWS, Docker, WebSocket, SQLite, REST API, WebRTC, Tailwind, Redux, HTML5/CSS3, Push Notifications, Payment Gateway, E2E Encryption, GPS/Maps, Barcode/QR, NLP, Camera Integration, Offline-First, CI/CD, Git, Azure, Jira, Agile/Scrum, GitHub Actions

---

## Sections Reference

### 1. `sections/HeroSection.tsx` (id="about")

- **Layout:** Two-column — left profile photo with glow ring, right content
- **Profile photo:** `/images/profile-real.jpg` with cyan glow ring + green online dot
- **Title:** "UGAN" (white) + "SARIPUDIN" (sky-400), massive font (7xl)
- **Subtitle:** "AI Native Engineering Lead" badge
- **Bio:** With color-highlighted words (10+ years, 1M+ to 3M+ users)
- **Tag pills:** 40% Documentation Cut | Zero Incidents 18mo | 12 Devs Led | 1M+ Downloads
- **Buttons:** "View My Work" (sky-400 bg) + "Schedule a Call" (dark border)
- **Social:** GitHub, LinkedIn, oeganx1999@gmail.com
- **Background:** NeuralFlowShader WebGL canvas + dark overlay

### 2. `sections/StatsSection.tsx` (id="stats")

6 stat counters: 10+ Years | 1M+ Users | 40% Doc Cut | 12 Devs Led | 18mo Zero Incidents | 98% On-Time Delivery. Animated counters with IntersectionObserver trigger.

### 3. `sections/ADLCSection.tsx` (id="adlc-ecosystem")

8-card grid (3 cols on desktop) showing AI-Driven Development Lifecycle stages. Each card has a numbered badge (01-08), icon, title, description, and 3 tags. Cards use `StaggerContainer`/`StaggerItem` for staggered entrance.

### 4. `sections/ADLCPipelineSection.tsx` (id not directly linked from nav)

**CRITICAL — Pure SVG only!** No framer-motion SVG elements (causes runtime crash).

- Terminal frame: `adlc-pipeline.ts — ADLC Orchestrator`
- 6 circles with numbered badges (01-06) for stages: Design, Code, Build, Testing, Deploy, Monitor
- SVG `<animate>` tags for sequential pulsing glow
- 6 flowing dots per edge using `<animateMotion>`
- Uses `viewBox="0 0 960 220"` coordinate system

### 5. `sections/ProjectsSection.tsx` (id="projects")

**Horizontal carousel** with:
- Left/right navigation buttons (desktop only)
- Edge gradient fades
- `snap-x snap-mandatory` for snap scrolling
- 6 featured project cards at 400px width each
- Each card: generated image, status badge, metric badge, title, company, description, role badge, **icon tech tags**, Play Store/Website/App Store links with brand icons
- "View All 21 Projects" CTA button

### 6. `sections/ExperienceSection.tsx` (id="experience")

4-position career timeline with:
- **Vertical center line** — line runs through center, dots vertically centered on each card
- **Subtle borders** — 15% opacity, hover increases to 35%
- **Color-coded cards** — amber (Sprout TL), purple (Xtramile), sky (Sprout SSE), blue (Cudocomm)
- **Present card** (Sprout) has endless animation: 2 ping rings + glow overlay + border pulse
- **"Currently Here"** green badge with pulsing dot
- **Color highlights** in description and highlights using inline `<span className="text-sky-400 font-semibold">`
- Highlight colors cycle: sky, cyan, emerald, amber, purple, rose

### 7. `sections/TechStackSection.tsx` (id="stack")

5-category skill grid (Mobile, Web Frontend, Backend & APIs, DevOps & Cloud, Specialized). Each category has emoji icon, colored title, and skill tags. Bottom stats row: 9+ | 21 | 50M+ | 7.

### 8. `sections/ContactSection.tsx` (id="contact")

Compact 4-card grid: Email | Phone | Location | Live Clock. Social links (GitHub, LinkedIn). CTA card with color-highlighted description.

---

## Data: `data/projects.ts`

**21 real projects** from Ugan's CV. Key fields:

```ts
interface Project {
  id: string;           // URL-safe slug
  name: string;         // Display name
  company: string;      // Company name
  timeline: string;     // Date range
  role: string;         // Display role
  roleLevel: 'android' | 'mobile' | 'senior-fe' | 'tech-lead' | 'lead-dev';
  category: string;     // Category label
  industry: string;     // Industry for filtering
  platform: string[];   // Platforms (Android, iOS, Web)
  description: string;  // Short description
  features: string[];   // Key features list
  metrics: Record<string, string>;  // Key metrics (downloads, hospitals, etc.)
  techStack: string[];  // Tech tags with icons
  urls: Record<string, string>;     // play_store, website, app_store
  screenshots: string[]; // URLs (mostly empty, using generated images instead)
  status: 'active' | 'inactive' | 'internal' | 'discontinued';
  featured?: boolean;   // Show in carousel
}
```

**Featured projects (6):** AXISnet, MyBeepr, Aku Berbagi, Agriaku, Labamu, Go Great

**Export helpers:** `featuredProjects`, `activeProjects`, `totalDownloads`, `categories`, `roleFilters`, `industryFilters`, `statusFilters`

---

## Routing

Uses **HashRouter** (not BrowserRouter!) for static hosting compatibility.

```tsx
// main.tsx
<HashRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/projects" element={<ProjectsPage />} />
  </Routes>
</HashRouter>
```

- Home: `/` (all sections)
- Projects: `/#/projects` (21 projects with filters)
- Nav links use `a href="#sectionId"` for smooth scroll anchors on home page
- Projects page has its own Navbar state (shows "Home" instead of section links)

---

## Generated Images (in `public/images/`)

| File | Dimensions | Description |
|------|-----------|-------------|
| `profile-real.jpg` | Square | Profile photo with cyan glow ring |
| `proj-axisnet.jpg` | 16:9 | Telecom tower, network nodes, SIM hologram |
| `proj-mybeepr.jpg` | 16:9 | Medical cross, encryption shields, hospital nodes |
| `proj-akuberbagi.jpg` | 16:9 | Islamic geometric patterns, crescent, wallet |
| `proj-agriaku.jpg` | 16:9 | Farm-to-table data flow, seedlings, marketplace |
| `proj-labamu.jpg` | 16:9 | POS terminal, analytics dashboard, entrepreneur |
| `proj-gogreat.jpg` | 16:9 | Shield, trophy, policy document, sparkle |

All images: dark navy (#0f172a) background with cyan/sky-blue accent lighting.

---

## Styling Conventions

- **Background:** `bg-slate-900` (main), `bg-slate-800/30` (cards), `bg-slate-800/10` (alternate sections)
- **Borders:** `border-slate-700/30` default, `hover:border-sky-400/40` on hover
- **Primary accent:** `text-sky-400`, `bg-sky-400`, `border-sky-400/30`
- **Secondary accents:** `cyan-400`, `emerald-400`, `amber-400`, `purple-400`, `rose-400`
- **Text:** `text-slate-50` (headings), `text-slate-200` (subheadings), `text-slate-400` (body), `text-slate-500` (muted)
- **Fonts:** Inter (sans-serif), JetBrains Mono (monospace/labels)
- **Card border-radius:** `rounded-xl` (12px)
- **Section padding:** `py-24` (96px), `px-4` mobile
- **Max-width:** `max-w-5xl` (1024px) for text sections, `max-w-7xl` (1280px) for projects
- **IMPORTANT:** All section titles are **left-aligned**. No `centered` prop on SectionHeader.

---

## Critical Rules for the Next Agent

1. **NEVER use `motion.circle`, `motion.path`, etc.** in SVG. Framer motion doesn't support SVG elements. Use plain SVG `<circle>` + `<animate>` tags instead.
2. **Always use `new RegExp()` for regex containing `<`** in `.tsx` files. JSX parser will confuse `<H` with JSX tags.
3. **Always use HashRouter** — BrowserRouter breaks on static hosting.
4. **Check for `'` (apostrophe) in single-quoted strings** — use double quotes for any string containing `'`.
5. **Tech icons use `getTechIcon(name)`** — returns a render function. Always provide a fallback (DefaultTechIcon).
6. **Project images map** (`ProjectsSection.tsx`) — maps `project.id` to `/images/proj-{id}.jpg`.
7. **Active navbar detection** — uses IntersectionObserver on section IDs. Make sure any new section has a matching `id` attribute.
8. **Build command:** `cd /mnt/agents/output/app && npm run build`
9. **Deploy command:** `mshtools-deploy_website` with `local_dir: "/mnt/agents/output/app/dist"`
10. **Unused imports will fail build** — TypeScript strict mode is enabled. Remove unused imports.

---

## Remaining Improvement Ideas

- Add a downloadable CV/resume PDF button
- Add a testimonials section with client/colleague quotes
- Add a blog section for technical writing
- Add dark/light mode toggle
- Add page load progress bar
- Add keyboard navigation (arrow keys for carousel)
- Add page transitions between home and projects page
- Optimize Three.js bundle (currently ~1.4MB JS)

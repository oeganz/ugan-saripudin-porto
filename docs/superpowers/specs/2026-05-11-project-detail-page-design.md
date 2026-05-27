# Project Detail Page - Design Specification

**Date:** 2026-05-11  
**Author:** Claude (Opus 4.6)  
**Status:** Approved

## Overview

Add individual project detail pages to showcase each of the 21 projects with rich visual content, metrics, features, and tech stack information. Uses "Hero + Sections" layout (Option A) for clean, scannable presentation.

## Problem

Currently:
- Projects only shown in home carousel (6 featured) and projects list page (21 total)
- No detailed view for individual projects
- `.reference/` folder assets (screenshots, icons, playstore pages) are git-ignored and not used in build
- No way to showcase full project story with all screenshots and metrics

## Solution

Create project detail pages at `/projects/:slug` with:
1. **Asset migration** - Copy `.reference/` assets to `public/images/projects/`
2. **Route addition** - Add `/projects/:slug` route to main.tsx
3. **Detail page component** - New `ProjectDetailPage.tsx` with Hero + Sections layout
4. **Reusable components** - Extract shared components for metrics, features, screenshots, tech stack

## Layout Structure (Option A: Hero + Sections)

```
┌─────────────────────────────────────────┐
│ Navbar (existing)                       │
├─────────────────────────────────────────┤
│ HERO SECTION                            │
│ - Full-width background image           │
│ - Overlay with gradient                 │
│ - Project name (large)                  │
│ - Company name                          │
│ - Timeline                              │
│ - Role badge                            │
├─────────────────────────────────────────┤
│ QUICK STATS BAR                         │
│ [Downloads] [Rating] [Timeline] [Status]│
├─────────────────────────────────────────┤
│ OVERVIEW SECTION                        │
│ - Description (2-3 paragraphs)          │
│ - Platform badges (Android/iOS/Web)     │
│ - Category tag                          │
├─────────────────────────────────────────┤
│ KEY FEATURES (3-col grid)               │
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │ Icon │ │ Icon │ │ Icon │             │
│ │ Feat1│ │ Feat2│ │ Feat3│             │
│ └──────┘ └──────┘ └──────┘             │
├─────────────────────────────────────────┤
│ SCREENSHOTS GALLERY                     │
│ Horizontal scroll carousel              │
│ [img] [img] [img] [img] [img]           │
├─────────────────────────────────────────┤
│ TECH STACK (icon grid)                  │
│ [React] [Node] [AWS] [Docker] ...       │
├─────────────────────────────────────────┤
│ IMPACT METRICS (large numbers)          │
│ 50M+ Downloads | 4.0★ Rating | 16+ Hospitals│
├─────────────────────────────────────────┤
│ LINKS & CTAs                            │
│ [Play Store] [Website] [App Store]     │
├─────────────────────────────────────────┤
│ RELATED PROJECTS (3 cards)              │
│ Same category or industry               │
├─────────────────────────────────────────┤
│ Footer (existing)                       │
└─────────────────────────────────────────┘
```

## Asset Management

### Source → Destination Mapping

```
.reference/screenshots/       → public/images/projects/screenshots/
.reference/icons/             → public/images/projects/icons/
.reference/playstore_pages/   → public/images/projects/playstore/
```

### Asset Naming Convention

Screenshots: `{projectId}_screenshot_{01-05}.jpg`
Icons: `{projectId}_icon.webp`
Playstore: `{projectId}_playstore.jpg`

### Update projects.ts

Change `screenshots` field from external URLs to local paths:

```typescript
screenshots: [
  '/images/projects/screenshots/axisnet_screenshot_01.jpg',
  '/images/projects/screenshots/axisnet_screenshot_02.jpg',
  // ...
]
```

## Component Architecture

### New Components

**`src/pages/ProjectDetailPage.tsx`**
- Main page component
- Fetches project by slug from `projects.ts`
- Composes all sections
- Handles 404 if project not found

**`src/components/project-detail/ProjectHero.tsx`**
- Full-width hero with background image
- Gradient overlay
- Project metadata (name, company, timeline, role)
- Responsive: stacks on mobile

**`src/components/project-detail/ProjectStats.tsx`**
- Horizontal stats bar
- Animated numbers on scroll
- Icons for each metric
- Responsive: 2-col grid on mobile

**`src/components/project-detail/ProjectFeatures.tsx`**
- 3-column grid of feature cards
- Icon + title + description per card
- Hover effects
- Responsive: 1-col on mobile

**`src/components/project-detail/ProjectScreenshots.tsx`**
- Horizontal scroll carousel
- Lightbox on click (optional)
- Navigation arrows (desktop)
- Snap scrolling

**`src/components/project-detail/ProjectTechStack.tsx`**
- Icon grid using existing `TechIcons.tsx`
- Hover tooltips with tech names
- Responsive wrap

**`src/components/project-detail/ProjectMetrics.tsx`**
- Large animated numbers
- Context labels
- 3-col grid
- Responsive: 1-col on mobile

**`src/components/project-detail/ProjectLinks.tsx`**
- CTA buttons for Play Store, Website, App Store
- Brand icons
- External link indicators
- Disabled state if URL missing

**`src/components/project-detail/RelatedProjects.tsx`**
- 3 project cards
- Same category or industry
- Reuses existing `ProjectCard` component
- Links to other detail pages

## Routing

Add to `src/main.tsx`:

```typescript
<Route path="/projects/:slug" element={<ProjectDetailPage />} />
```

## Data Flow

1. User clicks project card on home or projects page
2. Navigate to `/projects/{slug}` (e.g., `/projects/axisnet`)
3. `ProjectDetailPage` reads slug from URL params
4. Find project in `projects.ts` by matching `id` field
5. If not found, show 404 message
6. If found, render all sections with project data

## Styling

- **Theme:** Dark (`bg-slate-900`)
- **Accent:** Sky blue (`#38bdf8`) for primary actions
- **Category colors:** 
  - FinTech: Amber
  - HealthTech: Cyan
  - AgriTech: Emerald
  - Telecom: Purple
  - E-commerce: Rose
- **Typography:** Inter (body), JetBrains Mono (labels/metrics)
- **Animations:** Framer Motion for scroll reveals, number counters
- **Spacing:** Generous whitespace, `py-24` between sections

## Accessibility

- Semantic HTML (`<article>`, `<section>`, `<nav>`)
- Alt text for all images
- Keyboard navigation for carousel
- Focus indicators on interactive elements
- ARIA labels for icon-only buttons
- Skip links for long pages

## Performance

- Lazy load images below fold
- Optimize screenshot sizes (max 1200px width)
- Use WebP format where supported
- Preload hero image
- Code split detail page components

## Mobile Considerations

- Hero: reduce height, stack metadata
- Stats: 2-col grid instead of 4-col
- Features: 1-col instead of 3-col
- Screenshots: horizontal scroll with snap
- Tech stack: wrap icons, smaller size
- Metrics: 1-col instead of 3-col
- Related projects: horizontal scroll

## Related Projects Logic

Show 3 projects matching:
1. Same `category` (exact match)
2. If < 3, add same `industry`
3. If < 3, add same `platform`
4. Exclude current project
5. Prioritize `featured` projects
6. Randomize order

## Error Handling

- **Project not found:** Show 404 message with link back to projects page
- **Missing screenshots:** Show placeholder or hide gallery section
- **Missing metrics:** Hide metric cards that have no data
- **Broken image links:** Use fallback placeholder image

## Future Enhancements (Out of Scope)

- Backend integration (Supabase)
- Admin panel for editing projects
- Image upload for screenshots
- Comments/testimonials section
- Share buttons (Twitter, LinkedIn)
- Print-friendly view
- PDF export of project details

## Implementation Checklist

- [ ] Copy assets from `.reference/` to `public/images/projects/`
- [ ] Update `projects.ts` screenshot paths to local
- [ ] Create `ProjectDetailPage.tsx`
- [ ] Create `ProjectHero.tsx`
- [ ] Create `ProjectStats.tsx`
- [ ] Create `ProjectFeatures.tsx`
- [ ] Create `ProjectScreenshots.tsx`
- [ ] Create `ProjectTechStack.tsx`
- [ ] Create `ProjectMetrics.tsx`
- [ ] Create `ProjectLinks.tsx`
- [ ] Create `RelatedProjects.tsx`
- [ ] Add route to `main.tsx`
- [ ] Update project cards to link to detail pages
- [ ] Test all 21 projects
- [ ] Test mobile responsive
- [ ] Test 404 handling
- [ ] Verify all images load
- [ ] Check accessibility
- [ ] Commit changes

## Success Criteria

- All 21 projects have working detail pages
- All screenshots display correctly
- Page is mobile responsive
- Load time < 3s on 3G
- No console errors
- Passes accessibility audit
- Matches design mockup

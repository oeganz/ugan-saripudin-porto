# Project Hero Generator SVG Component

**Date:** 2026-05-12
**Goal:** Generate hero images dynamically from project data when screenshots unavailable

## Concept

When no hero image exists for a project, generate an SVG hero with:
- Gradient background based on industry color scheme
- Project name and company
- Abstract mesh/grid pattern
- Platform icons

## Industry Color Schemes

| Industry | Primary | Secondary | Accent |
|----------|---------|-----------|--------|
| FinTech | #0ea5e9 (sky) | #06b6d4 (cyan) | #22d3ee |
| HealthTech | #10b981 (emerald) | #14b8a6 (teal) | #34d399 |
| AgriTech | #22c55e (green) | #84cc16 (lime) | #a3e635 |
| Telecom | #8b5cf6 (violet) | #a78bfa (purple) | #c4b5fd |
| InsurTech | #f59e0b (amber) | #fbbf24 (yellow) | #fcd34d |
| E-commerce | #ec4899 (pink) | #f472b6 (rose) | #f9a8d4 |
| Enterprise | #6366f1 (indigo) | #818cf8 (blue) | #a5b4fc |
| Social Impact | #14b8a6 (teal) | #2dd4bf (teal-400) | #5eead4 |
| Gaming | #f97316 (orange) | #fb923c (orange-400) | #fdba74 |
| EdTech | #a855f7 (purple) | #c084fc (fuchsia) | #d8b4fe |

## Component Structure

```tsx
interface ProjectHeroSVGProps {
  projectId: string;
  projectName: string;
  company: string;
  industry: string;
  width?: number;
  height?: number;
}
```

## SVG Elements

1. **Background Gradient**
   - Radial gradient from center (lighter) to edges (darker)
   - Uses industry primary/secondary colors

2. **Mesh Grid Pattern**
   - SVG pattern with curved lines
   - Low opacity (0.1) for subtle texture

3. **Floating Orbs**
   - 3-4 circles with blur filter
   - Animated with CSS keyframes
   - Industry accent colors

4. **Text Layer**
   - Project name: Large, bold, white
   - Company: Smaller, muted

5. **Industry Badge**
   - Rounded pill with industry color
   - Industry name

6. **Platform Icons**
   - Small icons (Android, iOS, Web) in corner
   - Based on project platform array

## SVG Output

```svg
<svg viewBox="0 0 1200 600">
  <defs>
    <radialGradient id="bg">...</radialGradient>
    <filter id="blur">...</filter>
  </defs>
  <rect fill="url(#bg)" width="100%" height="100%"/>
  <g class="orbs">...</g>
  <g class="grid">...</g>
  <text class="name">...</text>
  <text class="company">...</text>
  <g class="badge">...</g>
</svg>
```

## CSS Animation

```css
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}
.orb { animation: float 6s ease-in-out infinite; }
.orb:nth-child(2) { animation-delay: -2s; }
.orb:nth-child(3) { animation-delay: -4s; }
```

## Component: `ProjectHeroSVG`

```tsx
export function ProjectHeroSVG({ projectId, projectName, company, industry, width = 1200, height = 600 }) {
  const colors = industryColors[industry] || industryColors['Enterprise'];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Gradient background */}
      <defs>
        <radialGradient id={`grad-${projectId}`}>
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.1"/>
        </radialGradient>
      </defs>

      {/* Content */}
      <text x="10%" y="45%" className="project-name">{projectName}</text>
      <text x="10%" y="55%" className="company">{company}</text>
      <g className="badge">{industry}</g>
    </svg>
  );
}
```

## Fallback Logic

In `ProjectDetailPage`:
```tsx
const heroImage = heroImages[project.id] || project.screenshots[0];
const hasHero = heroImages[project.id] || project.screenshots.length > 0;

{hasHero ? (
  <img src={heroImage} />
) : (
  <ProjectHeroSVG projectId={project.id} projectName={project.name} company={project.company} industry={project.industry} />
)}
```

## Tasks

1. Create `src/components/ProjectHeroSVG.tsx`
2. Add industry color mapping
3. Update `ProjectDetailPage` to use SVG when no image
4. Update `ProjectCard` to use SVG when no image
5. Add CSS animations

## File Output

- `src/components/ProjectHeroSVG.tsx`
- Updated `ProjectDetailPage.tsx`
- Updated `ProjectCard.tsx`

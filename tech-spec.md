# Technical Specification — Arya Damar Portfolio

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | React DOM renderer |
| three | ^0.172 | WebGL hero shader background |
| @react-three/fiber | ^9.0 | React renderer for Three.js |
| framer-motion | ^12.0 | Entrance animations, stagger, AnimatePresence (mobile nav) |
| lucide-react | ^0.460 | Icons (Code2, Palette, Shield, Zap, Globe, Cpu, Clock, MessageSquare, Monitor, ChevronRight, Calendar, Mail, Linkedin, Menu, X) |
| react-intersection-observer | ^9.16 | Lightweight IntersectionObserver hook for scroll-triggered reveals |

### Dev / Build

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.0 | React Fast Refresh for Vite |
| typescript | ^5.7 | Type safety |
| @types/react | ^19.0 | React type definitions |
| @types/react-dom | ^19.0 | ReactDOM type definitions |
| @types/three | ^0.172 | Three.js type definitions |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| @fontsource-variable/inter | ^5.0 | Self-hosted Inter variable font |
| @fontsource-variable/jetbrains-mono | ^5.0 | Self-hosted JetBrains Mono variable font |

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navbar | Custom | Single | Fixed header with scroll-state detection, mobile full-screen overlay. Scroll state (>50px) toggles bg opacity and shadow. |
| Footer | Custom | Single | Minimal copyright + timezone line |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport, WebGL shader bg, staggered entrance sequence |
| ADLCSection | Custom | 6-card grid, section eyebrow + header |
| ProjectsSection | Custom | Vertical stack of 3 ProjectCard instances |
| RemoteCredentialsSection | Custom | 4 credential cards + tool pills + MobileTerminal |
| ExperienceSection | Custom | Vertical timeline with alternating entries |
| TechStackSection | Custom | 5 category groups of skill pills |
| ContactSection | Custom | Centered CTAs + live clock |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| FadeIn | Custom | All sections | Framer Motion wrapper. Props: `direction?: 'up' \| 'none'`, `delay?: number`, `duration?: number`, `children`. Handles viewport trigger (once, 15% threshold) internally via `whileInView`. |
| SectionHeader | Custom | ADLC, Projects, Remote, Experience, Tech, Contact | Eyebrow + H2 + optional subheadline. Repeated pattern across 6 sections. |
| Card | Custom | ADLCSection, ProjectsSection, RemoteCredentialsSection, ExperienceSection | Surface card with border, hover lift + border color shift. Props: `children`, `className`. |
| MetricCard | Custom | ProjectsSection | Large monospace number + label. No border/bg. |
| Tag/Pill | Custom | ProjectsSection, TechStackSection | Outlined pill with hover border color change. |
| MobileTerminal | Custom | RemoteCredentialsSection | Two phone mockups with message bubbles and type-in animation. |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrolled | Returns boolean for scroll position > threshold (50px). Used by Navbar. |

### WebGL

| Component | Purpose |
|-----------|---------|
| NeuralFlowShader | Full-viewport Three.js canvas with custom shader material. Renders organic luminous line network in cyan/sky-blue on dark bg. Fallback: CSS gradient. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero entrance sequence (6 elements, 150ms stagger) | Framer Motion | Parent `motion.div` with `staggerChildren: 0.15` on `variants`. Each child uses `FadeIn` (direction: 'up'). Triggered on mount (`initial` + `animate`). | Medium |
| Section scroll-triggered fadeInUp | Framer Motion | `FadeIn` component wraps `motion.div` with `whileInView` (amount: 0.15, once: true). Variants handle opacity + translateY. | Low |
| Section stagger (cards, pills, metrics) | Framer Motion | Parent container sets `staggerChildren` on `variants`. Children inherit from parent. Used by ADLC cards, credential cards, timeline entries, tech categories, project cards. | Low |
| Navbar scroll state transition | CSS transition | Toggle class based on `useScrolled`. Pure CSS `transition` on background-color and box-shadow. | Low |
| Mobile nav overlay | Framer Motion | `AnimatePresence` + `motion.div` with `x: '100%' → 0` slide-in, 300ms. Exit animation reverses. | Low |
| Green dot pulse (hero timezone) | CSS @keyframes | `animation: pulse 2s infinite` — scale 1→1.3→1, opacity 1→0.5→1. Pure CSS, no library needed. | Low |
| Timeline line grow-on-scroll | react-intersection-observer + CSS | Track section intersection. Set CSS `height` property bound to scroll progress within section using `useScroll` from Framer Motion or manual `scroll` listener. | Medium |
| Timeline dot entrance | Framer Motion | Each dot wrapped in `motion.span` with `whileInView` fadeIn. | Low |
| Current role dot pulse | CSS @keyframes | Same pattern as green dot pulse, cyan color, scale 1→1.5→1. | Low |
| Terminal message type-in | Framer Motion | `AnimatePresence` with staggered `motion.div` per bubble. Each bubble fades in + slides up, 150ms stagger. Triggered when terminal enters viewport. | Medium |
| Card hover (border shift, lift, shadow) | CSS transition | `transition: all 200ms` on border-color, transform, box-shadow. Tailwind `hover:` utilities. No JS animation library. | Low |
| Button hover (scale, shadow) | CSS transition | Same pattern as card hover. `hover:scale-[1.02]` + `hover:shadow-lg`. | Low |
| Hero shader background | Three.js + custom GLSL | Custom ShaderMaterial with time-uniform-driven line animation. Canvas rendered via `@react-three/fiber` `<Canvas>` with `position: absolute`, `z-index: 0`. Content sits above at `z-index: 10`. | High |

---

## State & Logic

This is a presentational portfolio site with minimal state:

### Navbar
- `useScrolled()` hook → `isScrolled` boolean (scroll > 50px). Drives bg opacity class and shadow class. Purely visual — no business logic.
- `isMobileMenuOpen` boolean. Toggles mobile overlay visibility. Set to `false` when a nav link is clicked (close overlay on navigation).

### Live Clock (Contact section)
- `useEffect` + `setInterval` (60000ms) updating a `currentTime` state string. Displays WIB (UTC+7) time. Format: `HH:MM`.

### Mobile Terminal
- `inView` from `react-intersection-observer`. When the terminal component enters viewport, trigger the staggered message bubble animation. One-shot (do not replay on re-entry).

### Hero Shader
- Time uniform updated via `useFrame` from `@react-three/fiber`. Increment `uniforms.time.value` by `clock.getDelta()`. No React state — mutable ref on uniform object.

No other shared state, context, or data stores needed. All data (projects, experience, tech stack) is static constants.

---

## Other Key Decisions

### WebGL Shader Strategy

The hero background uses a custom GLSL shader via Three.js (not R3F Drei helpers). Rationale: the "organic network of slowly evolving luminous lines" effect is bespoke — no standard material achieves this. Implementation: a single full-screen plane with a custom `ShaderMaterial`. Two uniforms: `uTime` (float, incremented per frame) and `uResolution` (vec2, set on mount). The shader generates procedural line networks using noise functions and distance fields. If WebGL is unavailable or `prefers-reduced-motion` is true, fall back to a static CSS radial gradient.

### Font Loading Strategy

Use `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono` (self-hosted) rather than Google Fonts CDN. Import in `main.tsx` for automatic font-face declarations. Variable font files keep payload small (single file per font family covers all weights).

### Static Export

Vite builds to `dist/` with static HTML. No SSR, no API routes. The `dist/` folder is deployable to any static host.

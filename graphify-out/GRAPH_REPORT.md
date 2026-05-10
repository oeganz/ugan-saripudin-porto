# Graph Report - .  (2026-05-09)

## Corpus Check
- 137 files · ~367,662 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 248 nodes · 171 edges · 3 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]

## God Nodes (most connected - your core abstractions)
1. `getTechIcon()` - 2 edges
2. `useCarousel()` - 2 edges
3. `CarouselNext()` - 2 edges
4. `useSidebar()` - 2 edges
5. `SidebarMenuButton()` - 2 edges
6. `TechTag()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `TechTag()` --calls--> `getTechIcon()`  [INFERRED]
  E:\work\Ugansaripudin-porto\ugan-saripudin-porto\src\sections\ProjectsSection.tsx → E:\work\Ugansaripudin-porto\ugan-saripudin-porto\src\components\TechIcons.tsx

## Communities

### Community 4 - "Community 4"
Cohesion: 0.29
Nodes (2): TechTag(), getTechIcon()

### Community 7 - "Community 7"
Cohesion: 0.33
Nodes (2): SidebarMenuButton(), useSidebar()

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (2): CarouselNext(), useCarousel()

## Knowledge Gaps
- **Thin community `Community 4`** (7 nodes): `metricColor()`, `scroll()`, `TechTag()`, `TechIcons.tsx`, `ProjectsSection.tsx`, `DefaultTechIcon()`, `getTechIcon()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (7 nodes): `cn()`, `handleKeyDown()`, `SidebarMenu()`, `SidebarMenuButton()`, `SidebarMenuItem()`, `useSidebar()`, `sidebar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (5 nodes): `Carousel()`, `CarouselNext()`, `cn()`, `useCarousel()`, `carousel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._
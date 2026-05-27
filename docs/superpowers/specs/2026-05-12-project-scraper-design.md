# Project Content Scraper Design

**Date:** 2026-05-12
**Goal:** Scrape project content (screenshots, hero images, metrics) from Play Store, websites, and app stores

## Scope

### Data Sources
| Project | Play Store | Website | App Store |
|---------|-----------|---------|-----------|
| axisnet | ✅ | ❌ | ❌ |
| mybeepr | ❌ | ✅ | ❌ |
| aku-berbagi | ❌ | ✅ | ❌ |
| agriaku | ✅ | ✅ | ❌ |
| labamu | ❌ | ✅ | ❌ |
| go-great | ❌ | ✅ | ❌ |
| asabri | ✅ | ✅ | ✅ |
| bluegaz | ✅ | ❌ | ❌ |
| smarco | ✅ | ❌ | ❌ |
| sahabat-berbagi | ✅ | ❌ | ❌ |
| skillbridge | ✅ | ❌ | ❌ |
| kuis-milioner | ❌ | ✅ | ❌ |
| mobilegrosir | ✅ | ❌ | ❌ |
| laut-nusantara | ✅ | ✅ | ❌ |
| sacti | ❌ | ✅ | ❌ |
| ime-mobile | ❌ | ✅ | ❌ |
| my-telkominfra | ✅ | ❌ | ❌ |
| konsultasi-bhayangkari | ❌ | ❌ | ❌ |
| sentiment | ❌ | ❌ | ❌ |
| absensi | ❌ | ❌ | ❌ |
| net-gear | ❌ | ❌ | ❌ |

### Image Requirements
- **Hero images:** 1344x768+ resolution, dark-themed or app preview
- **Screenshots:** Phone mockups, 1080p+ resolution
- **No blurry images** - validate resolution before saving

## Technical Approach

### Agent Swarm Strategy
Dispatch 3 parallel agents:
1. **Play Store Agent** - Scrape 10 Play Store apps
2. **Website Agent** - Scrape 8 websites for og:image or hero images
3. **App Store Agent** - Scrape 1 App Store app (ASABRI)

### Tools
- `curl` for HTTP requests
- `grep/sed` for parsing HTML
- `file` command for image validation
- Play Store API endpoints for ratings/downloads

### Output
- Download images to `public/images/projects/screenshots/`
- Update `src/data/projects.ts` with new metrics
- Generate `scrape-report.md` with results

## Image Validation
```
Minimum resolution: 800x600
Aspect ratio: 16:9 preferred for hero
Format: jpg or png
```

## Tasks

### Agent 1: Play Store Scraper
- Fetch 10 Play Store pages
- Extract: screenshots, icon, ratings, downloads, description
- Save to `public/images/projects/screenshots/{project}_*.jpg`

### Agent 2: Website Scraper
- Fetch 8 websites
- Extract: og:image, twitter:image, hero image
- Save to `public/images/{project}-hero.jpg`

### Agent 3: App Store Scraper
- Fetch ASABRI App Store page
- Extract: screenshots, icon, ratings
- Save to `public/images/projects/screenshots/`

### Agent 4: Metrics Updater
- Parse scraped ratings/downloads
- Update `src/data/projects.ts` metrics fields

## Constraints
- Rate limiting: 2 second delay between requests
- Only save valid images (check resolution)
- Skip projects with no public URLs
- Log all failed scrapes for manual review

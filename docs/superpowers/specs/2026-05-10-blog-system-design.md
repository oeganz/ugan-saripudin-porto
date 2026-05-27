# Blog System Design

**Date:** 2026-05-10  
**Author:** Ugan Saripudin  
**Status:** Approved

## Overview

Transform the static Insights section into a dynamic blog system powered by Supabase. Enable article creation, management, and publishing with SEO optimization for social media sharing (LinkedIn, X, Facebook).

## Goals

- Replace static insights with dynamic content from Supabase
- Provide admin panel for writing and managing articles
- Optimize articles for SEO and social sharing
- Maintain current visual design and user experience
- Keep architecture simple for solo author use case

## Database Architecture

### Articles Table

Single table design with all article data and metadata.

```sql
CREATE TABLE articles (
  -- Core fields
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Ugan Saripudin',
  published_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  
  -- SEO fields
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  tags TEXT[],
  reading_time INTEGER,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Public can read published articles"
  ON articles FOR SELECT
  USING (status = 'published' AND published_at <= NOW());

-- Authenticated user (whitelist check in application layer)
-- RLS allows any authenticated user, app enforces email whitelist
CREATE POLICY "Authenticated user can manage articles"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');
```

### Storage Bucket

```sql
-- Create bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true);

-- RLS for storage
CREATE POLICY "Public can read article images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'article-images' AND auth.role() = 'authenticated');
```

## Admin Panel

### Authentication

- **Method:** Magic Link (passwordless email authentication)
- **Email Whitelist:** Only your email can access admin
- **Route:** `/{ADMIN_PATH}` where `ADMIN_PATH` is environment variable (e.g., `adm-k8s9x2`)
- **Security:** 
  - Email whitelist check
  - RLS policies enforce database access
  - Session timeout after 30 minutes inactivity
  - Admin routes not indexed (robots.txt, meta noindex)

### Features

#### 1. Article List View (`/{ADMIN_PATH}`)

- Table showing all articles (drafts + published)
- Columns: title, status, published date, tags
- Filter by status dropdown
- Search by title
- Click row to edit
- "New Article" button

#### 2. Article Editor (`/{ADMIN_PATH}/articles/new` or `/{ADMIN_PATH}/articles/:id/edit`)

**Content Section:**
- Title input (required)
- Slug input (auto-generated from title, editable)
- Rich text editor (TipTap) for content
- Cover image upload
- Inline image upload support
- Excerpt textarea
- Author input (optional, defaults to "Ugan Saripudin")

**SEO Section:**
- Meta title input (with character counter, max 60)
- Meta description textarea (with character counter, max 160)
- OG image upload
- Tags input (comma-separated or tag chips)
- Reading time (auto-calculated from word count, editable)

**Publishing Section:**
- Status selector: draft/published/archived
- Publish date picker (defaults to now)
- Save Draft button
- Publish button

#### 3. Live Preview

- Split view or modal
- Shows article as it will appear on public site
- Updates as you type (debounced)

#### 4. Image Management

- Upload to Supabase Storage bucket `article-images`
- Max file size: 5MB
- Supported formats: JPG, PNG, WebP
- Returns public URL for embedding
- Image optimization handled client-side before upload

### Tech Stack

- **Editor:** TipTap (React)
- **Forms:** React Hook Form + Zod validation
- **UI:** Existing component library (Radix UI)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage

## Frontend (Public)

### Insights Section

**List View** (`/insights` or current section location)

- Keep current grid layout design
- Fetch published articles: `status = 'published' AND published_at <= NOW()`
- Order by `published_at DESC`
- Each card displays:
  - Cover image
  - Title
  - Excerpt
  - Tags (clickable for filtering)
  - Reading time
  - Published date
- Tag filtering: click tag to show only articles with that tag
- Pagination or infinite scroll (if >12 articles)

**Detail View** (`/insights/:slug`)

- Hero section:
  - Cover image (full width)
  - Title (h1)
  - Author, published date, reading time
- Article content (sanitized HTML rendering)
- Reading progress bar (fixed at top)
- Social share buttons:
  - LinkedIn
  - X (Twitter)
  - Facebook
  - Pre-filled with article title + URL
  - Uses og_image for preview
- Related articles section (bottom):
  - Show 3 articles with matching tags
  - Exclude current article

### SEO Implementation

Dynamic meta tags per article:

```html
<title>{meta_title || title} | Ugan Saripudin</title>
<meta name="description" content={meta_description || excerpt} />
<link rel="canonical" href={`${window.location.origin}/insights/${slug}`} />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:title" content={meta_title || title} />
<meta property="og:description" content={meta_description || excerpt} />
<meta property="og:image" content={og_image || cover_image} />
<meta property="og:url" content={`${window.location.origin}/insights/${slug}`} />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={meta_title || title} />
<meta name="twitter:description" content={meta_description || excerpt} />
<meta name="twitter:image" content={og_image || cover_image} />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "image": "{cover_image}",
  "datePublished": "{published_at}",
  "dateModified": "{updated_at}",
  "author": {
    "@type": "Person",
    "name": "{author}"
  }
}
</script>
```

### Performance

- Lazy load images
- Responsive images (srcset)
- Code splitting for admin routes
- Debounced search/filter
- Optimistic UI updates in admin

## Content Flow

### Writing & Publishing

1. Login via magic link to `/{ADMIN_PATH}`
2. Click "New Article"
3. Write content in rich text editor
4. Upload cover image and inline images
5. Fill SEO fields (meta title, description, OG image)
6. Add tags
7. Save as draft (can preview anytime)
8. When ready: set status to "published", pick publish date
9. Click Publish → article goes live

### Editing Published Articles

- Edit anytime from article list
- Changes save immediately
- No versioning (keep simple)
- Can unpublish by changing status to draft

### Social Sharing Workflow

1. Publish article
2. Visit article detail page
3. Click social share button (auto-opens with pre-filled text)
4. Or manually copy URL - OG tags ensure proper preview

## Error Handling

### Admin Panel

- Invalid magic link → show error message, offer resend
- Session expired → redirect to login with return URL
- Upload fails → show error, retry button
- Slug collision → auto-append number or show validation error
- Network errors → show toast notification, retry option

### Frontend

- Article not found → 404 page
- Loading states for article fetch (skeleton cards)
- Image load failures → fallback placeholder image
- Empty states (no articles yet, no results for tag filter)
- Network errors → error boundary with retry

## Data Validation

### Admin Panel

- **Title:** Required, max 200 chars
- **Slug:** Required, unique, lowercase, hyphens only, no special chars
- **Content:** Required, min 100 chars
- **Excerpt:** Max 300 chars
- **Meta title:** Max 60 chars
- **Meta description:** Max 160 chars
- **Images:** Max 5MB, JPG/PNG/WebP only
- **Tags:** Max 10 tags per article

### Database Constraints

- Slug uniqueness enforced by unique index
- Status enum constraint
- NOT NULL constraints on required fields

## Testing Strategy

### Manual Testing Checklist

**Admin Panel:**
- [ ] Magic link login works
- [ ] Create new article
- [ ] Edit existing article
- [ ] Delete article
- [ ] Upload cover image
- [ ] Upload inline images
- [ ] Save draft
- [ ] Publish article
- [ ] Unpublish article
- [ ] Slug auto-generation works
- [ ] Slug collision handling
- [ ] Live preview updates
- [ ] Session timeout redirects to login
- [ ] Unauthorized access blocked

**Frontend:**
- [ ] Published articles appear in list
- [ ] Drafts don't show publicly
- [ ] Article detail page loads
- [ ] Images display correctly
- [ ] Social share buttons work (LinkedIn, X, Facebook)
- [ ] Tag filtering works
- [ ] Related articles show
- [ ] Reading progress bar works
- [ ] SEO meta tags present (check inspector)
- [ ] OG tags work (test with social media debuggers)
- [ ] 404 for invalid slugs
- [ ] Mobile responsive

**Security:**
- [ ] RLS prevents unauthorized reads/writes
- [ ] Admin route requires auth
- [ ] Email whitelist enforced
- [ ] Storage bucket permissions correct

**No automated tests initially** - add later if needed.

## Tech Stack Summary

**Frontend:**
- React 19
- React Router 7
- TipTap (rich text editor)
- Supabase JS client
- Existing UI components (Radix UI, Tailwind)

**Backend:**
- Supabase PostgreSQL
- Supabase Auth (magic link)
- Supabase Storage
- Supabase RLS

**Deployment:**
- Current hosting (Vite build)
- Environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `ADMIN_PATH`

## Future Enhancements (Out of Scope)

- Scheduled publishing (requires cron job or Edge Function)
- Analytics (view counts, popular articles)
- Multi-user auth with permissions
- Comments system
- Newsletter integration
- Full-text search
- Article versioning
- Draft previews with shareable links
- Automated social media posting

## Open Questions

None - design approved.

## Approval

Design reviewed and approved by Ugan Saripudin on 2026-05-10.

Ready to proceed to implementation planning.

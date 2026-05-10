# Blog System Implementation Plan - Part 2

Continuation of `2026-05-10-blog-system.md`

---

## Task 10: Public Article List & Detail Pages

**Files:**
- Create: `src/pages/InsightsListPage.tsx`
- Create: `src/pages/ArticleDetailPage.tsx`
- Create: `src/components/ArticleCard.tsx`

- [ ] **Step 1: Create article card component**

File: `src/components/ArticleCard.tsx`

```typescript
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { Card } from '@/components/Card'
import type { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/insights/${article.slug}`}>
      <Card className="relative h-full group cursor-pointer hover:border-sky-400/40 transition-all">
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-48 object-cover rounded-t-lg mb-4"
            loading="lazy"
          />
        )}

        <div className="flex items-center gap-2 mb-4">
          {article.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-md border text-sky-400 bg-sky-400/10 border-sky-400/20"
            >
              {tag}
            </span>
          ))}
          <span className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
            <Clock size={12} />
            {article.reading_time} min read
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-50 mb-3 leading-tight group-hover:text-sky-400 transition-colors">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-sm leading-relaxed text-slate-400 mb-4">
            {article.excerpt}
          </p>
        )}

        <div className="text-xs text-slate-500 mt-auto pt-4 border-t border-slate-700/30">
          {new Date(article.published_at!).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 2: Create insights list page**

File: `src/pages/InsightsListPage.tsx`

```typescript
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/types/article'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SectionHeader } from '@/components/SectionHeader'
import { ArticleCard } from '@/components/ArticleCard'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'

export default function InsightsListPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const tagFilter = searchParams.get('tag')

  useEffect(() => {
    fetchArticles()
  }, [tagFilter])

  const fetchArticles = async () => {
    setLoading(true)

    let query = supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })

    if (tagFilter) {
      query = query.contains('tags', [tagFilter])
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching articles:', error)
    } else {
      setArticles(data || [])
    }

    setLoading(false)
  }

  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags || []))
  ).sort()

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main className="py-[100px] md:py-[140px]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            number="(02)"
            eyebrow="INSIGHTS"
            headline="Original Thinking"
          />

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              <a
                href="/insights"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !tagFilter
                    ? 'bg-sky-400 text-slate-900'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                All
              </a>
              {allTags.map((tag) => (
                <a
                  key={tag}
                  href={`/insights?tag=${encodeURIComponent(tag)}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tagFilter === tag
                      ? 'bg-sky-400 text-slate-900'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {tag}
                </a>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-center text-slate-400">Loading articles...</div>
          ) : articles.length === 0 ? (
            <div className="text-center text-slate-400">
              {tagFilter ? `No articles found with tag "${tagFilter}"` : 'No articles yet'}
            </div>
          ) : (
            <StaggerContainer
              staggerDelay={0.1}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {articles.map((article) => (
                <StaggerItem key={article.id}>
                  <ArticleCard article={article} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 3: Create article detail page**

File: `src/pages/ArticleDetailPage.tsx`

```typescript
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { sanitizeHTML } from '@/lib/sanitize'
import type { Article } from '@/types/article'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SEOHead } from '@/components/SEOHead'
import { SocialShare } from '@/components/SocialShare'
import { ReadingProgress } from '@/components/ReadingProgress'
import { ArticleCard } from '@/components/ArticleCard'
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react'

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const fetchArticle = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .single()

    if (error) {
      console.error('Error fetching article:', error)
    } else if (data) {
      setArticle(data)
      fetchRelatedArticles(data)
    }

    setLoading(false)
  }

  const fetchRelatedArticles = async (currentArticle: Article) => {
    if (!currentArticle.tags || currentArticle.tags.length === 0) return

    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .neq('id', currentArticle.id)
      .overlaps('tags', currentArticle.tags)
      .order('published_at', { ascending: false })
      .limit(3)

    if (data) {
      setRelatedArticles(data)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <main className="py-[100px] text-center">
          <h1 className="text-3xl font-bold text-slate-50 mb-4">Article Not Found</h1>
          <Link to="/insights" className="text-sky-400 hover:underline">
            ← Back to Insights
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <>
      <SEOHead article={article} />
      <ReadingProgress />

      <div className="min-h-screen bg-slate-900">
        <Navbar />

        <main className="py-[100px]">
          <article className="max-w-4xl mx-auto px-6">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sky-400 hover:underline mb-8"
            >
              <ArrowLeft size={16} />
              Back to Insights
            </Link>

            {article.cover_image && (
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-[400px] object-cover rounded-lg mb-8"
              />
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <User size={16} />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(article.published_at!).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {article.reading_time} min read
              </div>
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/insights?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs font-semibold rounded-md border text-sky-400 bg-sky-400/10 border-sky-400/20 hover:bg-sky-400/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <div
              className="prose prose-invert prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(article.content) }}
            />

            <SocialShare article={article} />
          </article>

          {relatedArticles.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 mt-20">
              <h2 className="text-2xl font-bold text-slate-50 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <ArticleCard key={related.id} article={related} />
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}
```

- [ ] **Step 4: Commit public pages**

```bash
git add src/pages/InsightsListPage.tsx src/pages/ArticleDetailPage.tsx src/components/ArticleCard.tsx
git commit -m "feat: add public article list and detail pages

- Article list with tag filtering
- Article detail with hero, content, related articles
- Article card component for grid display

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 11: SEO & Social Components

**Files:**
- Create: `src/components/SEOHead.tsx`
- Create: `src/components/SocialShare.tsx`
- Create: `src/components/ReadingProgress.tsx`

- [ ] **Step 1: Create SEO head component**

File: `src/components/SEOHead.tsx`

```typescript
import { Helmet } from 'react-helmet-async'
import type { Article } from '@/types/article'

interface SEOHeadProps {
  article: Article
}

export function SEOHead({ article }: SEOHeadProps) {
  const title = article.meta_title || article.title
  const description = article.meta_description || article.excerpt || ''
  const image = article.og_image || article.cover_image || ''
  const url = `${window.location.origin}/insights/${article.slug}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.cover_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author,
    },
  }

  return (
    <Helmet>
      <title>{title} | Ugan Saripudin</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
```

- [ ] **Step 2: Install react-helmet-async**

```bash
npm install react-helmet-async
```

- [ ] **Step 3: Create social share component**

File: `src/components/SocialShare.tsx`

```typescript
import type { Article } from '@/types/article'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

interface SocialShareProps {
  article: Article
}

export function SocialShare({ article }: SocialShareProps) {
  const url = `${window.location.origin}/insights/${article.slug}`
  const title = article.title

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  return (
    <div className="border-t border-slate-700 pt-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Share2 size={20} />
          <span className="font-medium">Share this article:</span>
        </div>
        <div className="flex gap-3">
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors text-sm font-medium"
          >
            LinkedIn
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors text-sm font-medium"
          >
            X
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition-colors text-sm font-medium"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create reading progress component**

File: `src/components/ReadingProgress.tsx`

```typescript
import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
      <div
        className="h-full bg-sky-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

- [ ] **Step 5: Commit SEO and social components**

```bash
git add src/components/SEOHead.tsx src/components/SocialShare.tsx src/components/ReadingProgress.tsx package.json package-lock.json
git commit -m "feat: add SEO and social sharing components

- Dynamic meta tags with react-helmet-async
- Social share buttons (LinkedIn, X, Facebook)
- Reading progress bar
- JSON-LD structured data

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 12: Update Routes

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Update main.tsx with new routes**

File: `src/main.tsx`

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import CaseStudyLabamu from './pages/CaseStudyLabamu.tsx'
import CaseStudyMyBeepr from './pages/CaseStudyMyBeepr.tsx'
import InsightsListPage from './pages/InsightsListPage.tsx'
import ArticleDetailPage from './pages/ArticleDetailPage.tsx'
import LoginPage from './pages/admin/LoginPage.tsx'
import ArticleListPage from './pages/admin/ArticleListPage.tsx'
import ArticleEditorPage from './pages/admin/ArticleEditorPage.tsx'
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx'

const adminPath = import.meta.env.VITE_ADMIN_PATH || 'admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/case-study/labamu" element={<CaseStudyLabamu />} />
          <Route path="/case-study/mybeepr" element={<CaseStudyMyBeepr />} />
          <Route path="/insights" element={<InsightsListPage />} />
          <Route path="/insights/:slug" element={<ArticleDetailPage />} />
          
          {/* Admin routes */}
          <Route path={`/${adminPath}/login`} element={<LoginPage />} />
          <Route
            path={`/${adminPath}`}
            element={
              <ProtectedRoute>
                <ArticleListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/${adminPath}/articles/new`}
            element={
              <ProtectedRoute>
                <ArticleEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/${adminPath}/articles/:id/edit`}
            element={
              <ProtectedRoute>
                <ArticleEditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </HelmetProvider>
  </StrictMode>,
)
```

- [ ] **Step 2: Commit route updates**

```bash
git add src/main.tsx
git commit -m "feat: add routes for blog and admin pages

- Public routes: /insights, /insights/:slug
- Admin routes: /{ADMIN_PATH}/* with protection

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 13: Update Insights Section

**Files:**
- Modify: `src/sections/InsightsSection.tsx`

- [ ] **Step 1: Update InsightsSection to fetch from Supabase**

File: `src/sections/InsightsSection.tsx`

```typescript
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/types/article'
import { SectionHeader } from '@/components/SectionHeader'
import { ArticleCard } from '@/components/ArticleCard'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { FadeIn } from '@/components/FadeIn'
import { ArrowUpRight } from 'lucide-react'

export function InsightsSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error fetching articles:', error)
    } else {
      setArticles(data || [])
    }

    setLoading(false)
  }

  return (
    <section id="insights" className="bg-slate-900 py-[100px] md:py-[140px] relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="(02)"
          eyebrow="INSIGHTS"
          headline="Original Thinking"
        />

        {loading ? (
          <div className="text-center text-slate-400">Loading articles...</div>
        ) : articles.length === 0 ? (
          <FadeIn delay={0.2}>
            <div className="text-center">
              <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <p className="text-base text-slate-300 font-medium">
                  Articles coming soon — ask me about these systems in a call
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-all text-sm"
                >
                  Schedule a Call
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </FadeIn>
        ) : (
          <>
            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article) => (
                <StaggerItem key={article.id}>
                  <ArticleCard article={article} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.4}>
              <div className="text-center">
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-400 text-slate-900 font-semibold hover:bg-sky-300 transition-all"
                >
                  View All Articles
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit insights section update**

```bash
git add src/sections/InsightsSection.tsx
git commit -m "feat: update InsightsSection to fetch from Supabase

- Display latest 3 published articles
- Link to full insights page
- Empty state for no articles

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 14: Final Testing & Deployment

**Files:**
- Create: `robots.txt`
- Modify: `index.html`

- [ ] **Step 1: Create robots.txt**

File: `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /#/adm-*
Disallow: /#/admin*
```

- [ ] **Step 2: Update index.html meta tags**

File: `index.html`

Add to `<head>`:

```html
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
```

- [ ] **Step 3: Test admin flow**

Manual testing checklist:

1. Navigate to `/{ADMIN_PATH}/login`
2. Enter admin email
3. Check email for magic link
4. Click magic link
5. Verify redirect to article list
6. Create new article
7. Upload cover image
8. Fill all fields
9. Save as draft
10. Edit draft
11. Publish article
12. Sign out

- [ ] **Step 4: Test public flow**

Manual testing checklist:

1. Visit homepage
2. Scroll to Insights section
3. Verify articles appear
4. Click article card
5. Verify article detail loads
6. Check SEO meta tags in inspector
7. Test social share buttons
8. Test reading progress bar
9. Click tag to filter
10. Verify related articles show

- [ ] **Step 5: Test security**

Manual testing checklist:

1. Try accessing `/{ADMIN_PATH}` without auth → should redirect to login
2. Try accessing with wrong email → should not allow
3. Verify drafts don't show on public pages
4. Verify RLS policies work (check Supabase dashboard)

- [ ] **Step 6: Deploy**

```bash
npm run build
# Deploy dist/ to your hosting
```

- [ ] **Step 7: Final commit**

```bash
git add public/robots.txt index.html
git commit -m "feat: add robots.txt and final meta tags

- Block admin routes from search engines
- Add robots meta tags

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Plan Complete

All tasks defined. Execute using:
- **superpowers:subagent-driven-development** (recommended) - fresh subagent per task
- **superpowers:executing-plans** - batch execution in current session

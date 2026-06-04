import { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Article, ArticleStatus } from '@/types/article'
import { UnifiedRenderer } from '@/components/MarkdownRenderer'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SEOHead } from '@/components/SEOHead'
import { SocialShare } from '@/components/SocialShare'
import { ReadingProgress } from '@/components/ReadingProgress'
import { ArticleCard } from '@/components/ArticleCard'
import { Clock, Calendar, User, ArrowLeft, Eye } from 'lucide-react'

export default function ArticleDetailPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const isPreview = searchParams.get('preview') === 'true'

  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) fetchArticle()
  }, [slug, isPreview])

  const fetchArticle = async () => {
    setLoading(true)

    if (isPreview) {
      // Preview mode: fetch any article regardless of status
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug!)
        .single()

      if (error) {
        console.error('Error fetching article (preview):', error)
      } else if (data) {
        setArticle({ ...data, status: data.status as ArticleStatus })
        fetchRelatedArticles({ ...data, status: data.status as ArticleStatus }, true)
      }
    } else {
      // Production: only published
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug!)
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .single()

      if (error) {
        console.error('Error fetching article:', error)
      } else if (data) {
        setArticle({ ...data, status: data.status as ArticleStatus })
        fetchRelatedArticles({ ...data, status: data.status as ArticleStatus }, false)
      }
    }

    setLoading(false)
  }

  const fetchRelatedArticles = async (currentArticle: Article, preview: boolean) => {
    if (!currentArticle.tags || currentArticle.tags.length === 0) return

    const query = preview
      ? supabase.from('articles').select('*').neq('id', currentArticle.id)
      : supabase.from('articles').select('*').eq('status', 'published').neq('id', currentArticle.id)

    const { data } = await query
      .overlaps('tags', currentArticle.tags)
      .order('published_at', { ascending: false })
      .limit(3)

    if (data) {
      setRelatedArticles(data.map(a => ({ ...a, status: a.status as ArticleStatus })))
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

  const isDraft = article.status === 'draft' || article.status === 'archived'

  return (
    <>
      <SEOHead article={article} />

      {isPreview && (
        <div className="fixed top-0 inset-x-0 z-[60] bg-amber-500 text-slate-900 text-center py-2 text-sm font-bold flex items-center justify-center gap-2">
          <Eye size={14} />
          PREVIEW — {isDraft ? `${article.status?.toUpperCase()} ARTICLE` : 'Unpublished Content'}
          <span className="opacity-70 font-normal">
            | <Link to={`/insights/${slug}`} className="underline hover:no-underline">Hide preview</Link>
          </span>
        </div>
      )}

      <ReadingProgress />

      <div className="min-h-screen bg-slate-900" style={isPreview ? { paddingTop: '40px' } : undefined}>
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

            <div className="flex items-start gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-50 leading-tight flex-1">
                {article.title}
              </h1>
              {isDraft && (
                <span className="shrink-0 mt-2 px-2 py-1 text-xs font-bold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {article.status?.toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <User size={16} />
                {article.author}
              </div>
              {article.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(article.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
              {article.reading_time && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {article.reading_time} min read
                </div>
              )}
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

            <UnifiedRenderer content={article.content} className="mb-12 prose prose-invert prose-lg max-w-none" />

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

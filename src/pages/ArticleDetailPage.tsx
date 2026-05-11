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

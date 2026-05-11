import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Article, ArticleStatus } from '@/types/article'
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
      setArticles((data || []).map(article => ({
        ...article,
        status: article.status as ArticleStatus
      })))
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

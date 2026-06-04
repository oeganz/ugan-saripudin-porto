import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { supabase } from '@/lib/supabase'
import type { Article, ArticleStatus } from '@/types/article'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ArticleCard } from '@/components/ArticleCard'
import { ArticleCardSkeleton } from '@/components/ArticleCardSkeleton'
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 6

export default function InsightsListPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const tagFilter = searchParams.get('tag')
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  useEffect(() => {
    fetchArticles()
  }, [tagFilter, currentPage])

  const fetchArticles = async () => {
    setLoading(true)

    const from = (currentPage - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .range(from, to)

    if (tagFilter) {
      query = query.contains('tags', [tagFilter])
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching articles:', error)
    } else {
      setArticles((data || []).map(article => ({
        ...article,
        status: article.status as ArticleStatus
      })))
      setTotalCount(count || 0)
    }

    setLoading(false)
  }

  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags || []))
  ).sort()

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    setSearchParams(params)
  }

  const pageTitle = tagFilter
    ? `Articles tagged "${tagFilter}" — Insights | Ugan Saripudin`
    : 'Insights — Engineering Leadership, AI-Native Delivery & Team Building | Ugan Saripudin'
  const pageDesc = tagFilter
    ? `Browse articles tagged with "${tagFilter}" — practical insights on engineering leadership, AI-native development, and team building from Ugan Saripudin.`
    : 'Practical insights on engineering leadership, AI-native development workflows, ADLC methodology, and building high-performing teams. Written by Ugan Saripudin, Engineering Lead with 10+ years experience.'

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${window.location.origin}/insights${tagFilter ? `?tag=${tagFilter}` : ''}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={`${window.location.origin}/insights`} />
        <meta property="og:image" content={`${window.location.origin}/images/profile-real.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={`${window.location.origin}/images/profile-real.jpg`} />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        <Navbar />

        <main className="py-[100px] md:py-[140px]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-10 md:mb-14">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-mono text-sky-400/70 font-semibold">(02)</span>
                <span className="text-xs font-semibold uppercase tracking-[3px] text-sky-400/90">INSIGHTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[52px] font-extrabold leading-[1.05] tracking-[-1.5px] text-slate-50">
                Original Thinking
              </h2>
            </div>

            {/* Filter Toggle */}
            {allTags.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 text-slate-300 hover:text-sky-400 border border-slate-700/40 transition-colors"
                >
                  <Filter className="w-4 h-4" /> Filters {showFilters ? '▲' : '▼'}
                </button>
                <span className="text-sm text-slate-500">
                  {totalCount} {totalCount === 1 ? 'article' : 'articles'}
                </span>
              </div>
            )}

            {/* Filters */}
            {showFilters && allTags.length > 0 && (
              <div className="mb-8 p-6 rounded-xl bg-slate-800/40 border border-slate-700/30">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-3 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => { setSearchParams({}); setPage(1) }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        !tagFilter
                          ? 'bg-sky-400 text-slate-900'
                          : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'
                      }`}
                    >
                      All
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => { setSearchParams({ tag }); setPage(1) }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          tagFilter === tag
                            ? 'bg-sky-400 text-slate-900'
                            : 'bg-slate-800/60 text-slate-400 border border-slate-700/40 hover:text-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(PAGE_SIZE)].map((_, i) => (
                  <div key={i}>
                    <ArticleCardSkeleton />
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center text-slate-400 py-12">
                {tagFilter ? `No articles found with tag "${tagFilter}"` : 'No articles yet'}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-12">
                    <button
                      onClick={() => setPage(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-slate-800/60 text-slate-300 hover:text-sky-400 border border-slate-700/40"
                    >
                      <ChevronLeft size={16} />
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                          page === currentPage
                            ? 'bg-sky-400 text-slate-900'
                            : 'bg-slate-800/60 text-slate-400 hover:text-sky-400 border border-slate-700/40'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-slate-800/60 text-slate-300 hover:text-sky-400 border border-slate-700/40"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

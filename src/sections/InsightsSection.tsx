import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Article, ArticleStatus } from '@/types/article'
import { SectionHeader } from '@/components/SectionHeader'
import { ArticleCard } from '@/components/ArticleCard'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { ArticleCardSkeleton } from '@/components/ArticleCardSkeleton'
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
      setArticles((data || []).map(article => ({
        ...article,
        status: article.status as ArticleStatus
      })))
    }

    setLoading(false)
  }

  return (
    <section id="insights" className="bg-slate-900 py-20 md:py-28 relative overflow-hidden">
      {/* Subtle sky mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(14,165,233,0.03) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(14,165,233,0.02) 0%, transparent 40%)'}} />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="(02)"
          eyebrow="INSIGHTS"
          headline="Original Thinking"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
        ) : articles.length === 0 ? (
          <FadeIn delay={0.2}>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-8 py-5 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <p className="text-sm text-slate-400">
                  Technical articles in progress — focused on shipping production systems.
                </p>
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

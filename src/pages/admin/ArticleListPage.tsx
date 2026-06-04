import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { Article, ArticleStatus } from '@/types/article'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, LogOut, ExternalLink } from 'lucide-react'

const HOST = import.meta.env.VITE_HOST_URL || 'https://ugan-saripudin-porto.vercel.app'

export default function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | 'all'>('all')
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const adminPath = import.meta.env.VITE_ADMIN_PATH

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    filterArticles()
  }, [articles, searchQuery, statusFilter])

  const fetchArticles = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

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

  const filterArticles = () => {
    let filtered = articles

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((article) => article.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(query)
      )
    }

    setFilteredArticles(filtered)
  }

  const openPreview = (slug: string) => {
    window.open(`${HOST}/insights/${slug}?preview=true`, '_blank')
  }

  const openLive = (slug: string) => {
    window.open(`${HOST}/insights/${slug}`, '_blank')
  }

  const handleSignOut = async () => {
    await signOut()
    navigate(`/${adminPath}/login`)
  }

  const handleRowClick = (articleId: string) => {
    navigate(`/${adminPath}/articles/${articleId}/edit`)
  }

  const handleNewArticle = () => {
    navigate(`/${adminPath}/articles/new`)
  }

  const getStatusBadge = (status: ArticleStatus) => {
    const styles = {
      draft: 'bg-slate-700 text-slate-300',
      published: 'bg-green-700 text-green-100',
      archived: 'bg-amber-700 text-amber-100',
    }

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-50">Articles</h1>
          <div className="flex gap-3">
            <Button onClick={handleNewArticle} className="flex items-center gap-2">
              <Plus size={16} />
              New Article
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'draft' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('draft')}
              size="sm"
            >
              Draft
            </Button>
            <Button
              variant={statusFilter === 'published' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('published')}
              size="sm"
            >
              Published
            </Button>
            <Button
              variant={statusFilter === 'archived' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('archived')}
              size="sm"
            >
              Archived
            </Button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            {searchQuery || statusFilter !== 'all'
              ? 'No articles found matching your filters'
              : 'No articles yet. Create your first article!'}
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 border-b border-slate-700">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                      Title
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                      Published Date
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                      Tags
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr
                      key={article.id}
                      onClick={() => handleRowClick(article.id)}
                      className="border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-slate-50 font-medium">{article.title}</div>
                        <div className="text-sm text-slate-400 mt-1">{article.slug}</div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(article.status)}</td>
                      <td className="px-6 py-4 text-slate-300">
                        {formatDate(article.published_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {article.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-xs bg-sky-400/10 text-sky-400 border border-sky-400/20"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags && article.tags.length > 3 && (
                            <span className="px-2 py-0.5 rounded text-xs text-slate-400">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => openPreview(article.slug)}
                            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                          >
                            <ExternalLink size={11} /> Preview
                          </button>
                          {article.status === 'published' && (
                            <button
                              onClick={() => openLive(article.slug)}
                              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                            >
                              <ExternalLink size={11} /> Live
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats */}
        {!loading && (
          <div className="mt-6 text-sm text-slate-400">
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
        )}
      </div>
    </div>
  )
}

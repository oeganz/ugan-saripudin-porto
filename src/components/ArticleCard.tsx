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
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg mb-4 bg-slate-800">
            <div className="article-cover-skeleton absolute inset-0 bg-slate-700" />
            <img
              src={article.cover_image}
              alt={article.title}
              loading="lazy"
              decoding="async"
              onLoad={(e) => {
                const img = e.target as HTMLImageElement
                img.style.opacity = '1'
                const wrapper = img.parentElement
                const skeleton = wrapper?.querySelector('.article-cover-skeleton') as HTMLElement
                if (skeleton) { skeleton.style.opacity = '0'; skeleton.style.transition = 'opacity 0.3s' }
              }}
              className="w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          </div>
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

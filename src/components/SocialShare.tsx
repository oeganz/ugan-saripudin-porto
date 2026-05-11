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

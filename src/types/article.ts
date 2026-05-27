export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author: string
  published_at: string | null
  status: ArticleStatus
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  tags: string[]
  reading_time: number | null
  created_at: string
  updated_at: string
}

export interface ArticleFormData {
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image?: string
  author?: string
  published_at?: string
  status: ArticleStatus
  meta_title?: string
  meta_description?: string
  og_image?: string
  tags: string[]
  reading_time?: number
}

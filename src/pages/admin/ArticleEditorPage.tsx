import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/slugify'
import { calculateReadingTime } from '@/lib/readingTime'
import type { Article, ArticleFormData } from '@/types/article'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { ArrowLeft, Save, Eye, X } from 'lucide-react'

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters'),
  excerpt: z.string().max(300, 'Excerpt must be less than 300 characters').optional(),
  content: z.string().min(1, 'Content is required'),
  cover_image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  author: z.string().optional(),
  published_at: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  meta_title: z.string().max(60, 'Meta title must be less than 60 characters').optional(),
  meta_description: z.string().max(160, 'Meta description must be less than 160 characters').optional(),
  og_image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.array(z.string()),
  reading_time: z.number().optional(),
})

type ArticleFormValues = z.infer<typeof articleSchema>

export default function ArticleEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const adminPath = import.meta.env.VITE_ADMIN_PATH
  const isEditing = !!id

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      author: 'Ugan Saripudin',
      status: 'draft',
      meta_title: '',
      meta_description: '',
      og_image: '',
      tags: [],
      reading_time: 0,
    },
  })

  const title = watch('title')
  const content = watch('content')
  const tags = watch('tags')
  const metaTitle = watch('meta_title')
  const metaDescription = watch('meta_description')

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !isEditing) {
      setValue('slug', slugify(title))
    }
  }, [title, isEditing, setValue])

  // Auto-calculate reading time from content
  useEffect(() => {
    if (content) {
      const readingTime = calculateReadingTime(content)
      setValue('reading_time', readingTime)
    }
  }, [content, setValue])

  // Load existing article if editing
  useEffect(() => {
    if (isEditing && id) {
      fetchArticle(id)
    }
  }, [id, isEditing])

  const fetchArticle = async (articleId: string) => {
    setLoading(true)

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', articleId)
      .single()

    if (error) {
      console.error('Error fetching article:', error)
      setError('Failed to load article')
    } else if (data) {
      // Populate form with existing data
      setValue('title', data.title)
      setValue('slug', data.slug)
      setValue('excerpt', data.excerpt || '')
      setValue('content', data.content)
      setValue('cover_image', data.cover_image || '')
      setValue('author', data.author)
      setValue('status', data.status)
      setValue('meta_title', data.meta_title || '')
      setValue('meta_description', data.meta_description || '')
      setValue('og_image', data.og_image || '')
      setValue('tags', data.tags || [])
      setValue('reading_time', data.reading_time || 0)

      if (data.published_at) {
        // Convert to datetime-local format
        const date = new Date(data.published_at)
        const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16)
        setValue('published_at', localDateTime)
      }
    }

    setLoading(false)
  }

  const onSubmit = async (data: ArticleFormValues) => {
    setSaving(true)
    setError(null)

    try {
      // Prepare article data
      const articleData: Partial<Article> = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        cover_image: data.cover_image || null,
        author: data.author || 'Ugan Saripudin',
        status: data.status,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        og_image: data.og_image || null,
        tags: data.tags,
        reading_time: data.reading_time || 0,
        published_at: data.published_at ? new Date(data.published_at).toISOString() : null,
      }

      if (isEditing && id) {
        // Update existing article
        const { error: updateError } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id)

        if (updateError) throw updateError
      } else {
        // Create new article
        const { error: insertError } = await supabase
          .from('articles')
          .insert([articleData])

        if (insertError) throw insertError
      }

      // Navigate back to article list
      navigate(`/${adminPath}`)
    } catch (err) {
      console.error('Error saving article:', err)
      setError(err instanceof Error ? err.message : 'Failed to save article')
    } finally {
      setSaving(false)
    }
  }

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setValue('tags', [...tags, trimmedTag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', tags.filter((tag) => tag !== tagToRemove))
  }

  const handlePublish = () => {
    setValue('status', 'published')
    if (!watch('published_at')) {
      const now = new Date()
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
      setValue('published_at', localDateTime)
    }
    handleSubmit(onSubmit)()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading article...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(`/${adminPath}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-slate-50">
              {isEditing ? 'Edit Article' : 'New Article'}
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={saving}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Eye size={16} />
              {saving ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-slate-300">Title *</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Enter article title"
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-sm text-red-400 mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug" className="text-slate-300">Slug *</Label>
                <Input
                  id="slug"
                  {...register('slug')}
                  placeholder="article-slug"
                  className="mt-1"
                />
                {errors.slug && (
                  <p className="text-sm text-red-400 mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-slate-300">
                  Excerpt <span className="text-slate-500 text-sm">({watch('excerpt')?.length || 0}/300)</span>
                </Label>
                <Textarea
                  id="excerpt"
                  {...register('excerpt')}
                  placeholder="Brief summary of the article"
                  rows={3}
                  className="mt-1"
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-400 mt-1">{errors.excerpt.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="author" className="text-slate-300">Author</Label>
                <Input
                  id="author"
                  {...register('author')}
                  placeholder="Author name"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Cover Image</h2>
            <ImageUpload
              value={watch('cover_image')}
              onChange={(url) => setValue('cover_image', url || '')}
              label="Upload Cover Image"
            />
            {errors.cover_image && (
              <p className="text-sm text-red-400 mt-2">{errors.cover_image.message}</p>
            )}
          </div>

          {/* Content */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Content *</h2>
            <RichTextEditor
              content={watch('content')}
              onChange={(html) => setValue('content', html)}
            />
            {errors.content && (
              <p className="text-sm text-red-400 mt-2">{errors.content.message}</p>
            )}
            <p className="text-sm text-slate-400 mt-2">
              Reading time: {watch('reading_time')} min
            </p>
          </div>

          {/* SEO */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-slate-50 mb-4">SEO Settings</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="meta_title" className="text-slate-300">
                  Meta Title <span className="text-slate-500 text-sm">({metaTitle?.length || 0}/60)</span>
                </Label>
                <Input
                  id="meta_title"
                  {...register('meta_title')}
                  placeholder="SEO title (defaults to article title)"
                  className="mt-1"
                />
                {errors.meta_title && (
                  <p className="text-sm text-red-400 mt-1">{errors.meta_title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="meta_description" className="text-slate-300">
                  Meta Description <span className="text-slate-500 text-sm">({metaDescription?.length || 0}/160)</span>
                </Label>
                <Textarea
                  id="meta_description"
                  {...register('meta_description')}
                  placeholder="SEO description (defaults to excerpt)"
                  rows={3}
                  className="mt-1"
                />
                {errors.meta_description && (
                  <p className="text-sm text-red-400 mt-1">{errors.meta_description.message}</p>
                )}
              </div>

              <div>
                <Label className="text-slate-300">OG Image</Label>
                <ImageUpload
                  value={watch('og_image')}
                  onChange={(url) => setValue('og_image', url || '')}
                  label="Upload OG Image"
                />
                {errors.og_image && (
                  <p className="text-sm text-red-400 mt-2">{errors.og_image.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Tags</h2>

            <div className="flex gap-2 mb-4">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Add a tag"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddTag}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-400/10 text-sky-400 border border-sky-400/20"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-sky-300"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Publishing */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-slate-50 mb-4">Publishing</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="status" className="text-slate-300">Status</Label>
                <select
                  id="status"
                  {...register('status')}
                  className="mt-1 w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <Label htmlFor="published_at" className="text-slate-300">Publish Date</Label>
                <Input
                  id="published_at"
                  type="datetime-local"
                  {...register('published_at')}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

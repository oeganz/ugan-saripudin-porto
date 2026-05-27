# Blog System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform static Insights section into dynamic blog powered by Supabase with admin panel for content management.

**Architecture:** Single-table design (articles) with Supabase backend. Admin panel with magic link auth at obscured route. Rich text editor (TipTap) for content. Public frontend keeps current visual design, fetches from Supabase.

**Tech Stack:** React 19, React Router 7, Supabase (PostgreSQL, Auth, Storage), TipTap, Zod, React Hook Form, Tailwind CSS

---

## File Structure

### New Files to Create

**Database:**
- `supabase/migrations/001_create_articles_table.sql` - Articles table schema
- `supabase/migrations/002_create_storage_bucket.sql` - Storage bucket for images

**Types:**
- `src/types/article.ts` - Article type definitions

**Supabase Client:**
- `src/lib/supabase.ts` - Supabase client initialization

**Admin Components:**
- `src/pages/admin/LoginPage.tsx` - Magic link login
- `src/pages/admin/ArticleListPage.tsx` - List all articles
- `src/pages/admin/ArticleEditorPage.tsx` - Create/edit articles
- `src/components/admin/RichTextEditor.tsx` - TipTap editor wrapper
- `src/components/admin/ImageUpload.tsx` - Image upload component
- `src/components/admin/ProtectedRoute.tsx` - Auth guard
- `src/hooks/useAuth.tsx` - Auth state management

**Public Components:**
- `src/pages/InsightsListPage.tsx` - Public article list (replaces section)
- `src/pages/ArticleDetailPage.tsx` - Single article view
- `src/components/ArticleCard.tsx` - Article card component
- `src/components/SEOHead.tsx` - Dynamic meta tags
- `src/components/SocialShare.tsx` - Share buttons
- `src/components/ReadingProgress.tsx` - Progress bar

**Utils:**
- `src/lib/slugify.ts` - Slug generation
- `src/lib/readingTime.ts` - Calculate reading time
- `src/lib/sanitize.ts` - HTML sanitization

### Files to Modify

- `src/main.tsx` - Add new routes
- `src/sections/InsightsSection.tsx` - Update to fetch from Supabase
- `package.json` - Add dependencies
- `.env.example` - Document env vars
- `.gitignore` - Add .env files

---

## Task 1: Setup Supabase & Dependencies

**Files:**
- Create: `supabase/migrations/001_create_articles_table.sql`
- Create: `supabase/migrations/002_create_storage_bucket.sql`
- Create: `.env.local`
- Create: `.env.example`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install dependencies**

```bash
npm install @supabase/supabase-js @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link react-hook-form @hookform/resolvers zod dompurify
npm install -D @types/dompurify
```

Expected: Dependencies installed successfully

- [ ] **Step 2: Create Supabase migrations directory**

```bash
mkdir -p supabase/migrations
```

- [ ] **Step 3: Create articles table migration**

File: `supabase/migrations/001_create_articles_table.sql`

```sql
-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Ugan Saripudin',
  published_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  tags TEXT[],
  reading_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Public can read published articles"
  ON articles FOR SELECT
  USING (status = 'published' AND published_at <= NOW());

-- Authenticated users can manage all articles
CREATE POLICY "Authenticated user can manage articles"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

- [ ] **Step 4: Create storage bucket migration**

File: `supabase/migrations/002_create_storage_bucket.sql`

```sql
-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read article images
CREATE POLICY "Public can read article images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-images');

-- Authenticated users can upload article images
CREATE POLICY "Authenticated can upload article images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'article-images' AND auth.role() = 'authenticated');

-- Authenticated users can update their uploads
CREATE POLICY "Authenticated can update article images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');

-- Authenticated users can delete their uploads
CREATE POLICY "Authenticated can delete article images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');
```

- [ ] **Step 5: Apply migrations to Supabase**

Use Supabase MCP tool to apply migrations:

```bash
# Apply first migration
mcp__supabase__apply_migration --name "create_articles_table" --query "$(cat supabase/migrations/001_create_articles_table.sql)"

# Apply second migration
mcp__supabase__apply_migration --name "create_storage_bucket" --query "$(cat supabase/migrations/002_create_storage_bucket.sql)"
```

Expected: Migrations applied successfully

- [ ] **Step 6: Create .env.local file**

File: `.env.local`

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_ADMIN_PATH=adm-k8s9x2
VITE_ADMIN_EMAIL=your_email@example.com
```

- [ ] **Step 7: Create .env.example file**

File: `.env.example`

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ADMIN_PATH=
VITE_ADMIN_EMAIL=
```

- [ ] **Step 8: Update .gitignore**

File: `.gitignore`

Add these lines:

```
.env
.env.local
.env.*.local
```

- [ ] **Step 9: Commit setup**

```bash
git add supabase/ package.json package-lock.json .env.example .gitignore
git commit -m "feat: setup Supabase and dependencies for blog system

- Add Supabase client, TipTap editor, form libraries
- Create articles table migration with RLS policies
- Create storage bucket for article images
- Add environment variables for configuration

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Supabase Client & Types

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/types/article.ts`

- [ ] **Step 1: Create article types**

File: `src/types/article.ts`

```typescript
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
```

- [ ] **Step 2: Create Supabase client**

File: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
```

- [ ] **Step 3: Generate TypeScript types from Supabase**

```bash
# Use Supabase MCP tool to generate types
mcp__supabase__generate_typescript_types
```

Expected: Types generated and saved to `src/types/database.ts`

- [ ] **Step 4: Commit types and client**

```bash
git add src/lib/supabase.ts src/types/
git commit -m "feat: add Supabase client and article types

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Utility Functions

**Files:**
- Create: `src/lib/slugify.ts`
- Create: `src/lib/readingTime.ts`
- Create: `src/lib/sanitize.ts`

- [ ] **Step 1: Create slugify utility**

File: `src/lib/slugify.ts`

```typescript
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug
  let counter = 1

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}
```

- [ ] **Step 2: Create reading time calculator**

File: `src/lib/readingTime.ts`

```typescript
export function calculateReadingTime(content: string): number {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '')
  
  // Count words
  const words = text.trim().split(/\s+/).length
  
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(words / 200)
  
  return minutes
}
```

- [ ] **Step 3: Create HTML sanitizer**

File: `src/lib/sanitize.ts`

```typescript
import DOMPurify from 'dompurify'

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'code', 'pre',
      'img',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class'],
  })
}
```

- [ ] **Step 4: Commit utilities**

```bash
git add src/lib/slugify.ts src/lib/readingTime.ts src/lib/sanitize.ts
git commit -m "feat: add utility functions for blog system

- Slugify for URL-friendly slugs
- Reading time calculator
- HTML sanitizer for security

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Auth Hook & Protected Route

**Files:**
- Create: `src/hooks/useAuth.tsx`
- Create: `src/components/admin/ProtectedRoute.tsx`

- [ ] **Step 1: Create auth hook**

File: `src/hooks/useAuth.tsx`

```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsAdmin(session?.user?.email === ADMIN_EMAIL)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsAdmin(session?.user?.email === ADMIN_EMAIL)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/#/${import.meta.env.VITE_ADMIN_PATH}`,
      },
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    isAdmin,
    signInWithMagicLink,
    signOut,
  }
}
```

- [ ] **Step 2: Create protected route component**

File: `src/components/admin/ProtectedRoute.tsx`

```typescript
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth()
  const adminPath = import.meta.env.VITE_ADMIN_PATH

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to={`/${adminPath}/login`} replace />
  }

  return <>{children}</>
}
```

- [ ] **Step 3: Commit auth components**

```bash
git add src/hooks/useAuth.tsx src/components/admin/ProtectedRoute.tsx
git commit -m "feat: add auth hook and protected route

- useAuth hook for magic link authentication
- Email whitelist check for admin access
- ProtectedRoute component for guarding admin pages

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Admin Login Page

**Files:**
- Create: `src/pages/admin/LoginPage.tsx`

- [ ] **Step 1: Create login page**

File: `src/pages/admin/LoginPage.tsx`

```typescript
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signInWithMagicLink } = useAuth()
  const navigate = useNavigate()
  const adminPath = import.meta.env.VITE_ADMIN_PATH

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signInWithMagicLink(email)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h1 className="text-2xl font-bold text-slate-50 mb-4">Check your email</h1>
          <p className="text-slate-400 mb-6">
            We've sent a magic link to <strong className="text-slate-300">{email}</strong>.
            Click the link to sign in.
          </p>
          <Button
            onClick={() => setSent(false)}
            variant="outline"
            className="w-full"
          >
            Send another link
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h1 className="text-2xl font-bold text-slate-50 mb-2">Admin Login</h1>
        <p className="text-slate-400 mb-6">Enter your email to receive a magic link</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mt-1"
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded p-3">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </Button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit login page**

```bash
git add src/pages/admin/LoginPage.tsx
git commit -m "feat: add admin login page with magic link

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 6: Image Upload Component

**Files:**
- Create: `src/components/admin/ImageUpload.tsx`

- [ ] **Step 1: Create image upload component**

File: `src/components/admin/ImageUpload.tsx`

```typescript
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string | null) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = 'Upload Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are allowed')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath)

      onChange(data.publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange(null)
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-slate-700"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute top-2 right-2"
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-sky-400 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-slate-400" />
            <p className="mb-2 text-sm text-slate-400">
              <span className="font-semibold">{label}</span>
            </p>
            <p className="text-xs text-slate-500">JPG, PNG, or WebP (max 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {uploading && (
        <p className="text-sm text-slate-400">Uploading...</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit image upload component**

```bash
git add src/components/admin/ImageUpload.tsx
git commit -m "feat: add image upload component for admin

- Upload to Supabase Storage
- File size and type validation
- Preview and remove functionality

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 7: Rich Text Editor Component

**Files:**
- Create: `src/components/admin/RichTextEditor.tsx`

- [ ] **Step 1: Create rich text editor component**

File: `src/components/admin/RichTextEditor.tsx`

```typescript
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button } from '@/components/ui/button'
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-sky-400 underline',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[400px] p-4 focus:outline-none',
      },
    },
  })

  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800">
      <div className="flex gap-1 p-2 border-b border-slate-700 bg-slate-900">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-slate-700' : ''}
        >
          <Bold size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-slate-700' : ''}
        >
          <Italic size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-slate-700' : ''}
        >
          <List size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-slate-700' : ''}
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
        >
          <LinkIcon size={16} />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
        >
          <ImageIcon size={16} />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
```

- [ ] **Step 2: Commit rich text editor**

```bash
git add src/components/admin/RichTextEditor.tsx
git commit -m "feat: add TipTap rich text editor component

- Basic formatting (bold, italic, lists)
- Link and image support
- Styled for dark theme

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

Due to length constraints, I'll continue with the remaining tasks in a follow-up. The plan covers:

- Task 8: Article List Page
- Task 9: Article Editor Page
- Task 10: Public Article List Page
- Task 11: Article Detail Page
- Task 12: SEO Components
- Task 13: Social Share & Reading Progress
- Task 14: Update Routes
- Task 15: Update Insights Section

Would you like me to continue with the remaining tasks?

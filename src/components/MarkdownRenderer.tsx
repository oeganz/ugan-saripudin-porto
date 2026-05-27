import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import DOMPurify from 'dompurify'
import type { Components } from 'react-markdown'
import { MermaidChart } from './MermaidChart'

/**
 * Detects if content is Markdown vs HTML.
 * Rule: if content has HTML tags (<tag>), treat it as HTML first.
 * Only check markdown patterns if content contains no HTML tags.
 */
export function isMarkdown(content: string): boolean {
  if (!content) return false

  // If content has HTML tags like <p>, <a>, <strong>, etc., it's HTML — never route to markdown renderer
  if (/<[a-z][^>]*>/i.test(content)) {
    return false
  }

  const markdownPatterns = [
    /^#{1,6}\s/m,           // headings
    /```[\s\S]*?```/m,     // code blocks
    /`[^`]+`/m,            // inline code
    /\[([^\]]+)\]\([^)]+\)/m, // links
    /^[\-\*\+]\s/m,        // unordered lists
    /^\d+\.\s/m,           // ordered lists
    /^>\s/m,               // blockquotes
    /\*\*[^*]+\*\*/m,      // bold
    /_[^_]+_/m,            // italic
    /---$/m,               // horizontal rules
    /^\|.+\|$/m,           // tables (full-line markdown table format only)
  ]

  return markdownPatterns.some(pattern => pattern.test(content))
}

/**
 * HTMLRenderer: Renders plain HTML with DOMPurify sanitization.
 * Use for content that's already sanitized/pre-rendered HTML.
 */
interface HTMLRendererProps {
  content: string
  className?: string
}

export function HTMLRenderer({ content, className = 'prose prose-invert prose-lg max-w-none' }: HTMLRendererProps) {
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'code', 'pre',
      'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'figure', 'figcaption', 'hr', 'span', 'div', 'dl', 'dt', 'dd',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class', 'id'],
  })

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}

// Extract text content from react-markdown children
function getCodeString(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getCodeString).join('')
  if (children && typeof children === 'object' && 'props' in (children as object)) {
    return getCodeString((children as { props: { children?: React.ReactNode } }).props.children)
  }
  return ''
}

// Custom components for react-markdown
const customComponents: Components = {
  code({ node, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const isInline = !match && !className

    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-slate-700 text-sky-300 text-sm font-mono" {...props}>
          {children}
        </code>
      )
    }

    // Handle Mermaid diagrams
    if (match && match[1] === 'mermaid') {
      const code = getCodeString(children)
      return <MermaidChart code={code} />
    }

    return (
      <code className={`${className || ''} hljs`} {...props}>
        {children}
      </code>
    )
  },
  pre({ children, ...props }) {
    return (
      <pre className="p-4 rounded-lg bg-slate-800 overflow-x-auto my-4" {...props}>
        {children}
      </pre>
    )
  },
  a({ href, children, ...props }) {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        className="text-sky-400 hover:underline"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    )
  },
}

/**
 * MarkdownRenderer: Renders markdown content using react-markdown.
 * Falls back gracefully if content isn't actually markdown.
 */
interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = 'prose prose-invert prose-lg max-w-none' }: MarkdownRendererProps) {
  // If content is empty or not markdown, render as plain text
  if (!content || !isMarkdown(content)) {
    return (
      <div className={className}>
        <p>{content}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeHighlight,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        components={customComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// Unified renderer that auto-detects content type
interface UnifiedRendererProps {
  content: string
  className?: string
  forceMarkdown?: boolean
  forceHtml?: boolean
}

export function UnifiedRenderer({ content, className, forceMarkdown, forceHtml }: UnifiedRendererProps) {
  if (forceHtml || (!forceMarkdown && !isMarkdown(content))) {
    return <HTMLRenderer content={content} className={className} />
  }
  return <MarkdownRenderer content={content} className={className} />
}

export default MarkdownRenderer

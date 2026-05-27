import { Helmet } from 'react-helmet-async'
import type { Article } from '@/types/article'

interface SEOHeadProps {
  article: Article
}

export function SEOHead({ article }: SEOHeadProps) {
  const title = article.meta_title || article.title
  const description = article.meta_description || article.excerpt || ''
  const image = article.og_image || article.cover_image || ''
  const url = `${window.location.origin}/insights/${article.slug}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.cover_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author,
    },
  }

  return (
    <Helmet>
      <title>{title} | Ugan Saripudin</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

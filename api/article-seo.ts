import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// ── Config ──────────────────────────────────────────────
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
const HOST_URL = (process.env.HOST_URL || 'http://localhost').replace(/\/$/, '');

// ── Read index.html at cold-start ───────────────────────
let indexHtml: string | null = null;
const possiblePaths = [
  path.join(process.cwd(), 'dist', 'index.html'),
  path.join(process.cwd(), 'index.html'),
  path.join(__dirname, '..', 'dist', 'index.html'),
  path.join(__dirname, '..', '..', 'dist', 'index.html'),
];

for (const p of possiblePaths) {
  try {
    if (fs.existsSync(p)) {
      indexHtml = fs.readFileSync(p, 'utf-8');
      break;
    }
  } catch { /* try next */ }
}

// ── Helpers ─────────────────────────────────────────────
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildMeta(params: {
  title: string;
  description: string;
  image?: string;
  url: string;
  author?: string;
  publishedAt?: string;
  modifiedAt?: string;
  tags?: string[];
}): string {
  const img = params.image || `${HOST_URL}/images/profile-real.jpg`;
  const keywords = (params.tags || []).join(', ');

  const lines: string[] = [
    `<title>${esc(params.title)} | Ugan Saripudin</title>`,
    `<meta name="description" content="${esc(params.description)}" />`,
    keywords && `<meta name="keywords" content="${esc(keywords)}" />`,
    `<meta name="author" content="${esc(params.author || 'Ugan Saripudin')}" />`,
    `<link rel="canonical" href="${esc(params.url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${esc(params.title)}" />`,
    `<meta property="og:description" content="${esc(params.description)}" />`,
    `<meta property="og:url" content="${esc(params.url)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(params.title)}" />`,
    `<meta name="twitter:description" content="${esc(params.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    params.publishedAt && `<meta property="article:published_time" content="${params.publishedAt}" />`,
    params.modifiedAt && `<meta property="article:modified_time" content="${params.modifiedAt}" />`,
    ...(params.tags || []).map(t => `<meta property="article:tag" content="${esc(t)}" />`),
  ].filter(Boolean) as string[];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    image: img,
    datePublished: params.publishedAt,
    dateModified: params.modifiedAt || params.publishedAt,
    author: { '@type': 'Person', name: params.author || 'Ugan Saripudin' },
    publisher: {
      '@type': 'Person',
      name: 'Ugan Saripudin',
      logo: { '@type': 'ImageObject', url: `${HOST_URL}/images/profile-real.jpg` },
    },
    description: params.description,
    url: params.url,
  };
  lines.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);

  return lines.join('\n    ');
}

// ── Handler ─────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Diagnostics: log env state (remove in production after confirming)
  const diagnostics = {
    hasIndexHtml: !!indexHtml,
    indexLength: indexHtml?.length || 0,
    hasSupabaseUrl: !!SUPABASE_URL,
    hasSupabaseKey: !!SUPABASE_ANON_KEY,
    hostUrl: HOST_URL,
    cwd: process.cwd(),
    slug: req.query.slug as string | undefined,
  };

  // If no index.html, we can't serve anything useful
  if (!indexHtml) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      error: 'index.html not found',
      searchedPaths: possiblePaths,
      cwd: process.cwd(),
      __dirname,
    });
  }

  const slug = req.query.slug as string | undefined;

  // No slug or no Supabase creds → serve SPA with default meta
  if (!slug || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Still inject HOST_URL-based default meta so links aren't broken
    const defaultMeta = buildMeta({
      title: 'Ugan Saripudin — Engineering Lead · Mobile · Web · Backend | 10+ Years',
      description: 'Engineering Lead with 10+ years delivering platforms at scale.',
      url: `${HOST_URL}${req.url?.split('?')[0] || '/'}`,
    });
    const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, defaultMeta);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Diagnostics', JSON.stringify({ ...diagnostics, mode: 'fallback' }));
    return res.status(200).send(html);
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .single();

    if (error || !article) {
      // Article not found → serve SPA, client will show 404
      const defaultMeta = buildMeta({
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
        url: `${HOST_URL}/insights/${slug}`,
      });
      const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, defaultMeta);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-SEO-Diagnostics', JSON.stringify({
        ...diagnostics,
        mode: 'article-not-found',
        supabaseError: error?.message || null,
      }));
      return res.status(200).send(html);
    }

    // Success: inject article-specific meta
    const metaTags = buildMeta({
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      image: article.og_image || article.cover_image,
      url: `${HOST_URL}/insights/${slug}`,
      author: article.author,
      publishedAt: article.published_at,
      modifiedAt: article.updated_at,
      tags: article.tags || [],
    });

    const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, metaTags);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    res.setHeader('X-SEO-Diagnostics', JSON.stringify({
      ...diagnostics,
      mode: 'article-injected',
      articleTitle: article.title,
    }));
    return res.status(200).send(html);

  } catch (err: any) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      error: 'Server error in article-seo',
      message: err?.message || String(err),
      diagnostics,
    });
  }
}

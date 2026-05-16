import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

let indexHtml: string | null = null;
try {
  indexHtml = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf-8');
} catch {
  try {
    indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
  } catch { /* no-op */ }
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
  const img = params.image || 'https://ugansaripudin.com/images/profile-real.jpg';
  const keywords = (params.tags || []).join(', ');

  return [
    `<title>${escapeHtml(params.title)} | Ugan Saripudin</title>`,
    `<meta name="description" content="${escapeHtml(params.description)}" />`,
    keywords && `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
    `<meta name="author" content="${escapeHtml(params.author || 'Ugan Saripudin')}" />`,
    `<link rel="canonical" href="${escapeHtml(params.url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${escapeHtml(params.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(params.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(params.url)}" />`,
    `<meta property="og:image" content="${escapeHtml(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(params.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(params.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(img)}" />`,
    params.publishedAt && `<meta property="article:published_time" content="${params.publishedAt}" />`,
    params.modifiedAt && `<meta property="article:modified_time" content="${params.modifiedAt}" />`,
    (params.tags || []).map(t => `<meta property="article:tag" content="${escapeHtml(t)}" />`),
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: params.title,
      image: img,
      datePublished: params.publishedAt,
      dateModified: params.modifiedAt || params.publishedAt,
      author: { '@type': 'Person', name: params.author || 'Ugan Saripudin' },
      description: params.description,
      url: params.url,
    })}</script>`,
  ].filter(Boolean).flat().join('\n    ');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!indexHtml) {
    return res.status(500).send('index.html not found');
  }

  const slug = req.query.slug as string;
  if (!slug || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(indexHtml);
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: article } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .single();

    if (!article) {
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(indexHtml);
    }

    const metaTags = buildMeta({
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      image: article.og_image || article.cover_image,
      url: `https://ugansaripudin.com/insights/${slug}`,
      author: article.author,
      publishedAt: article.published_at,
      modifiedAt: article.updated_at,
      tags: article.tags || [],
    });

    const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, metaTags);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    return res.status(200).send(html);
  } catch {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(indexHtml);
  }
}

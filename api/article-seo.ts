import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// ── Config ──────────────────────────────────────────────
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
const HOST_URL = (process.env.VITE_HOST_URL || 'http://localhost').replace(/\/$/, '');

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

// ── Types ───────────────────────────────────────────────
interface VReq {
  query: { slug?: string };
  url?: string;
}
interface VRes {
  status: (code: number) => VRes;
  json: (body: unknown) => void;
  send: (body: string) => void;
  setHeader: (key: string, value: string) => void;
}

// ── Helpers ─────────────────────────────────────────────
function esc(str: string): string {
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
  const img = params.image || `${HOST_URL}/images/profile-real.jpg`;
  const keywords = (params.tags || []).join(', ');
  const lines: (string | false)[] = [
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
  ];
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: params.title, image: img,
    datePublished: params.publishedAt,
    dateModified: params.modifiedAt || params.publishedAt,
    author: { '@type': 'Person', name: params.author || 'Ugan Saripudin' },
    publisher: { '@type': 'Person', name: 'Ugan Saripudin', logo: { '@type': 'ImageObject', url: `${HOST_URL}/images/profile-real.jpg` } },
    description: params.description, url: params.url,
  };
  lines.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  return lines.filter(Boolean).join('\n    ');
}

// ── Handler ─────────────────────────────────────────────
export default async function handler(req: VReq, res: VRes) {
  const slug = req.query?.slug;

  // Fast-fail: no index.html
  if (!indexHtml) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'index.html not found', searched: possiblePaths });
  }

  // Fast-fail: missing env vars (most common issue)
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const meta = buildMeta({
      title: 'Ugan Saripudin — Engineering Lead',
      description: 'Configuration error: Supabase env vars missing.',
      url: `${HOST_URL}/insights/${slug || ''}`,
    });
    const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, meta);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', 'missing-env-vars');
    return res.status(200).send(html);
  }

  // Fast-fail: no slug
  if (!slug) {
    const meta = buildMeta({
      title: 'Insights',
      description: 'Engineering insights by Ugan Saripudin.',
      url: `${HOST_URL}/insights`,
    });
    const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, meta);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', 'no-slug');
    return res.status(200).send(html);
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Fetch with explicit abort timeout (5s max)
    const fetchPromise = supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .single();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Supabase query timeout')), 5000)
    );

    const { data: article, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

    if (error || !article) {
      const meta = buildMeta({
        title: 'Article Not Found',
        description: `Could not find article "${slug}".`,
        url: `${HOST_URL}/insights/${slug}`,
      });
      const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, meta);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-SEO-Status', `article-not-found: ${error?.message || 'no data'}`);
      return res.status(200).send(html);
    }

    // Success
    const meta = buildMeta({
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      image: article.og_image || article.cover_image,
      url: `${HOST_URL}/insights/${slug}`,
      author: article.author,
      publishedAt: article.published_at,
      modifiedAt: article.updated_at,
      tags: article.tags || [],
    });
    const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, meta);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    res.setHeader('X-SEO-Status', `ok: ${article.title}`);
    return res.status(200).send(html);

  } catch (err: any) {
    const meta = buildMeta({
      title: 'Error Loading Article',
      description: err?.message || 'Failed to fetch article.',
      url: `${HOST_URL}/insights/${slug}`,
    });
    const html = indexHtml.replace(/<title>.*?<\/title>[\s\S]*?(?=<\/head>)/, meta);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', `error: ${err?.message || String(err)}`);
    return res.status(200).send(html);
  }
}

// Vercel serverless function — MUST NOT hang during module init
// All FS operations happen inside the handler with try/catch

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read env (safe — no side effects)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
const HOST = (
  process.env.VITE_HOST_URL ||
  'https://ugan-saripudin-porto.vercel.app'
).replace(/\/$/, '');

// ── Types ───────────────────────────────────────────────
type Req = { query: Record<string, string>; url?: string };
type Res = {
  setHeader(k: string, v: string): void;
  status(n: number): Res;
  send(s: string): void;
  json(o: unknown): void;
};

// ── HTML escape ─────────────────────────────────────────
function e(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Build meta tag block ────────────────────────────────
function meta({
  title, desc, image, url, author, publishedAt, modifiedAt, tags,
}: {
  title: string; desc: string; image?: string; url: string;
  author?: string; publishedAt?: string; modifiedAt?: string; tags?: string[];
}) {
  const img = image || `${HOST}/images/profile-real.jpg`;
  const kw = (tags || []).join(', ');
  return [
    `<title>${e(title)} | Ugan Saripudin</title>`,
    `<meta name="description" content="${e(desc)}" />`,
    kw && `<meta name="keywords" content="${e(kw)}" />`,
    `<meta name="author" content="${e(author || 'Ugan Saripudin')}" />`,
    `<link rel="canonical" href="${e(url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${e(title)}" />`,
    `<meta property="og:description" content="${e(desc)}" />`,
    `<meta property="og:url" content="${e(url)}" />`,
    `<meta property="og:image" content="${e(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${e(title)}" />`,
    `<meta name="twitter:description" content="${e(desc)}" />`,
    `<meta name="twitter:image" content="${e(img)}" />`,
    publishedAt && `<meta property="article:published_time" content="${publishedAt}" />`,
    modifiedAt && `<meta property="article:modified_time" content="${modifiedAt}" />`,
    ...(tags || []).map(t => `<meta property="article:tag" content="${e(t)}" />`),
    `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Article',
      headline: title, image: img,
      datePublished: publishedAt, dateModified: modifiedAt || publishedAt,
      author: { '@type': 'Person', name: author || 'Ugan Saripudin' },
      publisher: { '@type': 'Person', name: 'Ugan Saripudin' },
      description: desc, url,
    })}</script>`,
  ].filter(Boolean).join('\n    ');
}

// ── Read index.html (inside handler, with fallback paths) ──
function getHtml(): string | null {
  const paths = [
    join(process.cwd(), 'dist', 'index.html'),
    join(process.cwd(), 'index.html'),
  ];
  for (const p of paths) {
    try {
      return readFileSync(p, 'utf-8');
    } catch { /* try next */ }
  }
  return null;
}

// ── Testable helper — exported for unit/property-based tests ──
/**
 * Replaces the entire <head> meta block in html with metaBlock.
 * The pattern `/<title[^>]*>[\s\S]*?<\/head>/` matches `<title>` with zero
 * or more attributes (covering both `<title>` and `<title data-rh="true">`),
 * then lazily matches everything through the closing `</head>` tag (inclusive).
 */
export function injectArticleMeta(html: string, metaBlock: string): string {
  return html.replace(/<title[^>]*>[\s\S]*?<\/head>/, metaBlock + '\n  </head>');
}

/** Rewrites `./`-prefixed asset paths to absolute `/` paths for nested URL serving. */
export function rewriteAssetPaths(html: string): string {
  return html.replace(/(['"])\.\//g, '$1/');
}

// ── Handler ─────────────────────────────────────────────
export default async function handler(req: Req, res: Res) {
  const t0 = Date.now();
  const slug = req.query?.slug;

  // 1. Read index.html
  const rawHtml = getHtml();
  if (!rawHtml) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'index.html not found', cwd: process.cwd() });
  }
  const html = rewriteAssetPaths(rawHtml);

  // 2. Missing env vars → fallback meta
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const m = meta({ title: 'Engineering Lead', desc: 'Ugan Saripudin portfolio.', url: `${HOST}/insights/${slug || ''}` });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', 'missing-env');
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    return res.status(200).send(injectArticleMeta(html, m));
  }

  // 3. No slug → fallback meta
  if (!slug) {
    const m = meta({ title: 'Insights', desc: 'Engineering insights.', url: `${HOST}/insights` });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', 'no-slug');
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    return res.status(200).send(injectArticleMeta(html, m));
  }

  // 4. Fetch article with 5s timeout
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const fetchPromise = supabase.from('articles').select('*')
      .eq('slug', slug).eq('status', 'published')
      .lte('published_at', new Date().toISOString()).single();

    const timeoutPromise = new Promise<never>((_, r) =>
      setTimeout(() => r(new Error('timeout')), 5000)
    );

    const { data: a, error } = await Promise.race([fetchPromise, timeoutPromise]);

    if (error || !a) {
      const m = meta({ title: 'Article Not Found', desc: `No article: ${slug}`, url: `${HOST}/insights/${slug}` });
      res.setHeader('X-SEO-Status', `not-found: ${error?.message || 'na'}`);
      res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(injectArticleMeta(html, m));
    }

    // 5. Success
    const m = meta({
      title: a.meta_title || a.title,
      desc: a.meta_description || a.excerpt || '',
      image: a.og_image || a.cover_image,
      url: `${HOST}/insights/${slug}`,
      author: a.author,
      publishedAt: a.published_at,
      modifiedAt: a.updated_at,
      tags: a.tags || [],
    });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
    res.setHeader('X-SEO-Status', 'ok');
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    return res.status(200).send(injectArticleMeta(html, m));

  } catch (err: any) {
    const m = meta({ title: 'Error', desc: err?.message || 'Error', url: `${HOST}/insights/${slug}` });
    res.setHeader('X-SEO-Status', `error: ${err?.message || '?'}`);
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(injectArticleMeta(html, m));
  }
}

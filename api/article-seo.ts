// Vercel serverless function — MUST NOT hang during module init
// All FS operations happen inside the handler with try/catch

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
const HOST = (process.env.VITE_HOST_URL || 'https://ugan.ganzapps.my.id').replace(/\/$/, '');

type Req = { query: Record<string, string> };
type Res = {
  setHeader(k: string, v: string): void;
  status(n: number): Res;
  send(s: string): void;
  json(o: unknown): void;
};

function e(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function meta({
  title, desc, image, url, author, publishedAt, modifiedAt, tags, isPreview,
}: {
  title: string; desc: string; image?: string; url: string;
  author?: string; publishedAt?: string; modifiedAt?: string; tags?: string[];
  isPreview?: boolean;
}) {
  const img = image || `${HOST}/images/profile-real.jpg`;
  const kw = (tags || []).join(', ');
  const cleanUrl = url.replace(/\?preview=true$/, '');
  return [
    `<title>${isPreview ? '[PREVIEW] ' : ''}${e(title)} | Ugan Saripudin</title>`,
    `<meta name="description" content="${e(desc)}" />`,
    kw && `<meta name="keywords" content="${e(kw)}" />`,
    `<meta name="author" content="${e(author || 'Ugan Saripudin')}" />`,
    `<link rel="canonical" href="${e(cleanUrl)}" />`,
    isPreview && `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${e(title)}" />`,
    `<meta property="og:description" content="${e(desc)}" />`,
    `<meta property="og:url" content="${e(cleanUrl)}" />`,
    `<meta property="og:image" content="${e(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${e(title)}" />`,
    `<meta name="twitter:description" content="${e(desc)}" />`,
    `<meta name="twitter:image" content="${e(img)}" />`,
    publishedAt && `<meta property="article:published_time" content="${publishedAt}" />`,
    modifiedAt && `<meta property="article:modified_time" content="${modifiedAt}" />`,
    ...(tags || []).map(t => `<meta property="article:tag" content="${e(t)}" />`),
  ].filter(Boolean).join('\n    ');
}

function getHtml(): string | null {
  for (const p of [join(process.cwd(), 'dist', 'index.html'), join(process.cwd(), 'index.html')]) {
    try { return readFileSync(p, 'utf-8'); } catch { /* try next */ }
  }
  return null;
}

const ASSET_TAG_RE = /<script type="module"[^>]*><\/script>|<link rel="modulepreload"[^>]*>|<link rel="stylesheet"[^>]*>/g;

export function extractAssetTags(html: string): { head: string; body: string } {
  const headInner = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const headTags = headInner.match(ASSET_TAG_RE) ?? [];
  const bodyInner = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  const bodyTags = bodyInner.match(ASSET_TAG_RE) ?? [];
  return { head: headTags.join('\n    '), body: bodyTags.join('\n    ') };
}

export function injectArticleMeta(html: string, metaBlock: string): string {
  const { head: headAssets } = extractAssetTags(html);
  const assetSuffix = headAssets ? `\n    ${headAssets}` : '';
  return html.replace(
    /<title[^>]*>[\s\S]*?(?=\s*(?:<script type="module"|<link rel="modulepreload"|<link rel="stylesheet"|<\/head>))/,
    metaBlock + assetSuffix,
  );
}

export function rewriteAssetPaths(html: string): string {
  return html.replace(/(['"])\.\//g, '$1/');
}

export default async function handler(req: Req, res: Res) {
  const t0 = Date.now();
  const slug = req.query?.slug;
  const isPreview = req.query?.preview === 'true';

  const rawHtml = getHtml();
  if (!rawHtml) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'index.html not found' });
  }
  const html = rewriteAssetPaths(rawHtml);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const m = meta({ title: 'Portfolio', desc: 'Ugan Saripudin.', url: `${HOST}/insights/${slug || ''}` });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', 'missing-env');
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    return res.status(200).send(injectArticleMeta(html, m));
  }

  if (!slug) {
    const m = meta({ title: 'Insights', desc: 'Insights.', url: `${HOST}/insights` });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', 'no-slug');
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    return res.status(200).send(injectArticleMeta(html, m));
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const doFetch = isPreview
      ? supabase.from('articles').select('*').eq('slug', slug).single()
      : supabase.from('articles').select('*').eq('slug', slug).eq('status', 'published')
          .lte('published_at', new Date().toISOString()).single();

    const timeoutPromise = new Promise<never>((_, r) => setTimeout(() => r(new Error('timeout')), 5000));
    const { data: a, error } = await Promise.race([doFetch, timeoutPromise]);

    if (error || !a) {
      const m = meta({ title: 'Article Not Found', desc: `No article: ${slug}`, url: `${HOST}/insights/${slug}` });
      res.setHeader('X-SEO-Status', `not-found: ${error?.message || 'na'}`);
      res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(injectArticleMeta(html, m));
    }

    const m = meta({
      title: a.meta_title || a.title,
      desc: a.meta_description || a.excerpt || '',
      image: a.og_image || a.cover_image,
      url: `${HOST}/insights/${slug}${isPreview ? '?preview=true' : ''}`,
      author: a.author,
      publishedAt: a.published_at,
      modifiedAt: a.updated_at,
      tags: a.tags || [],
      isPreview,
    });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-SEO-Status', 'ok');
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    if (isPreview) res.setHeader('X-Preview', 'true');
    return res.status(200).send(injectArticleMeta(html, m));

  } catch (err: any) {
    const m = meta({ title: 'Error', desc: err?.message || 'Error', url: `${HOST}/insights/${slug}` });
    res.setHeader('X-SEO-Status', `error: ${err?.message || '?'}`);
    res.setHeader('X-SEO-Time', `${Date.now() - t0}ms`);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(injectArticleMeta(html, m));
  }
}

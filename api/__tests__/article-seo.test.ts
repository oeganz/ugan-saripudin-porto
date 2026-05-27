/**
 * Article SEO Meta Fix — Test Suite
 *
 * Contains:
 *   - Property 1: Bug Condition exploration (Task 1) — EXPECTED TO FAIL on unfixed code
 *   - Property 2: Preservation (Task 2) — EXPECTED TO PASS on unfixed code
 *   - Unit tests: fallback paths, Cache-Control, X-SEO-Status/X-SEO-Time headers
 *
 * Validates: Requirements 1.1, 2.1, 3.1–3.6
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { injectArticleMeta, extractAssetTags, rewriteAssetPaths } from '../article-seo.js';

// ── Top-level mocks (hoisted by Vitest) ───────────────────────────────────────

// Mock fs so getHtml() returns our controlled SPA shell HTML
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}));

// Mock @supabase/supabase-js so we control Supabase responses
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}));

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Build a minimal but realistic index.html that mirrors what react-helmet-async
 * produces in the built dist/index.html — the title tag carries `data-rh="true"`.
 */
function buildHtmlWithAttributedTitle(homepageTitle: string): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    `  <title data-rh="true">${homepageTitle}</title>`,
    '  <meta data-rh="true" name="description" content="Homepage description" />',
    '  <link data-rh="true" rel="canonical" href="https://example.com/" />',
    '  <meta data-rh="true" property="og:title" content="Homepage OG Title" />',
    '</head>',
    '<body>',
    '  <div id="root"></div>',
    '  <script type="module" src="/assets/index.js"></script>',
    '</body>',
    '</html>',
  ].join('\n');
}

/**
 * Build a minimal index.html with an attribute-FREE <title> tag.
 * This is the "non-buggy" input — the original regex can match it.
 */
function buildHtmlWithPlainTitle(homepageTitle: string): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    `  <title>${homepageTitle}</title>`,
    '  <meta name="description" content="Homepage description" />',
    '  <link rel="canonical" href="https://example.com/" />',
    '  <meta property="og:title" content="Homepage OG Title" />',
    '</head>',
    '<body>',
    '  <div id="root"></div>',
    '  <script type="module" src="/assets/index.js"></script>',
    '</body>',
    '</html>',
  ].join('\n');
}

/**
 * Mirrors post-Vite dist/index.html: SEO in head, asset tags before </head>.
 */
function buildHtmlLikeDist(homepageTitle: string): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `  <title data-rh="true">${homepageTitle}</title>`,
    '  <meta data-rh="true" name="description" content="Homepage description" />',
    '  <link data-rh="true" rel="canonical" href="https://example.com/" />',
    '  <script type="application/ld+json">{"@type":"Person"}</script>',
    '  <script type="module" crossorigin src="./assets/index-abc.js"></script>',
    '  <link rel="modulepreload" crossorigin href="./assets/vendor-react.js">',
    '  <link rel="stylesheet" crossorigin href="./assets/index.css">',
    '</head>',
    '<body>',
    '  <div id="root"></div>',
    '</body>',
    '</html>',
  ].join('\n');
}

/**
 * Build a minimal SPA shell HTML for handler tests.
 * Uses attribute-free <title> so the unfixed regex still works.
 */
function buildSpaShellHtml(title = 'Ugan Saripudin'): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    `  <title>${title}</title>`,
    '  <meta name="description" content="Portfolio" />',
    '</head>',
    '<body>',
    '  <div id="root"></div>',
    '  <script type="module" src="/assets/index.js"></script>',
    '</body>',
    '</html>',
  ].join('\n');
}

/**
 * Build a minimal article meta block (the replacement string).
 */
function buildArticleMetaBlock(articleTitle: string, articleDesc: string): string {
  return [
    `<title>${articleTitle} | Ugan Saripudin</title>`,
    `<meta name="description" content="${articleDesc}" />`,
    `<meta property="og:title" content="${articleTitle}" />`,
    `<link rel="canonical" href="https://example.com/insights/test-slug" />`,
  ].join('\n    ');
}

/**
 * Returns true when the HTML contains a <title> tag with attributes —
 * the condition that causes the current regex to silently fail.
 */
function isBugCondition(html: string): boolean {
  return html.includes('<title ');
}

/**
 * Mock response object that captures calls to setHeader, status, send, json.
 */
function makeMockRes() {
  const headers: Record<string, string> = {};
  let statusCode = 200;
  let body: string | null = null;
  let jsonBody: unknown = null;

  const res = {
    headers,
    get statusCode() { return statusCode; },
    get body() { return body; },
    get jsonBody() { return jsonBody; },
    setHeader(k: string, v: string) { headers[k] = v; return res; },
    status(n: number) { statusCode = n; return res; },
    send(s: string) { body = s; return res; },
    json(o: unknown) { jsonBody = o; return res; },
  };
  return res;
}

/**
 * Mock request object.
 */
function makeMockReq(query: Record<string, string> = {}) {
  return { query, url: '/api/article-seo' };
}

/**
 * Build a mock Supabase client that returns the given result from .single().
 * The Supabase query builder chains: .from().select().eq().eq().lte().single()
 */
function makeMockSupabaseClient(result: { data: unknown; error: unknown }) {
  const singleFn = vi.fn().mockResolvedValue(result);
  // Build a chainable object where .eq() returns itself and .lte() returns { single }
  const queryBuilder: any = {
    eq: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnValue({ single: singleFn }),
    single: singleFn,
  };
  // Make .eq() return the same queryBuilder (for chaining multiple .eq() calls)
  queryBuilder.eq.mockReturnValue(queryBuilder);
  const selectFn = vi.fn().mockReturnValue(queryBuilder);
  const fromFn = vi.fn().mockReturnValue({ select: selectFn });
  return { from: fromFn };
}

// ── Arbitraries ───────────────────────────────────────────────────────────────

/**
 * Generates safe printable ASCII strings suitable for use as titles/descriptions.
 * Avoids characters that would break the HTML structure of the test fixture.
 */
const safeTextArb = fc
  .string({ minLength: 3, maxLength: 60 })
  .map(s => s.replace(/[^a-zA-Z0-9 \-_.,!?]/g, 'x'))
  .filter(s => s.trim().length >= 3);

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTY 1: BUG CONDITION (Task 1)
// EXPECTED TO FAIL on unfixed code — confirms the bug exists
// ─────────────────────────────────────────────────────────────────────────────

describe('Property 1: Bug Condition — Title Tag With Attributes Regex Mismatch', () => {
  /**
   * Property: For any HTML string where the <title> element has the
   * `data-rh="true"` attribute (the exact attribute added by react-helmet-async),
   * `injectArticleMeta` SHOULD replace the meta block so that:
   *   1. The result contains the article-specific title text.
   *   2. The result does NOT contain the original homepage title text.
   *
   * On UNFIXED code this property FAILS because the regex `/<title>.*?<\/title>/`
   * requires an exact `<title>` with no attributes and finds no match.
   *
   * Validates: Requirements 1.1, 2.1
   */
  it('should replace meta block even when <title> has data-rh="true" attribute', () => {
    fc.assert(
      fc.property(safeTextArb, safeTextArb, safeTextArb, (homepageTitle, articleTitle, articleDesc) => {
        // Construct HTML with the bug-triggering attribute on the title tag
        const html = buildHtmlWithAttributedTitle(homepageTitle);
        const articleMeta = buildArticleMetaBlock(articleTitle, articleDesc);

        // Apply the current (unfixed) injectArticleMeta function
        const result = injectArticleMeta(html, articleMeta);

        // The result SHOULD contain the article title (expected behavior)
        const containsArticleTitle = result.includes(articleTitle);
        // The result SHOULD NOT contain the original homepage title
        const containsHomepageTitle = result.includes(`<title data-rh="true">${homepageTitle}</title>`);

        return containsArticleTitle && !containsHomepageTitle;
      }),
      {
        numRuns: 100,
        verbose: true,
      },
    );
  });

  /**
   * Concrete (non-property) unit test using the exact attribute value from
   * the real built index.html to make the counterexample crystal-clear.
   */
  it('concrete case: regex fails on <title data-rh="true">Homepage Title</title>', () => {
    const homepageTitle = 'Ugan Saripudin — Senior Mobile & Frontend Engineer';
    const articleTitle = 'How I Built a Scalable FinTech App';
    const articleDesc = 'A deep dive into architecture decisions.';

    const html = buildHtmlWithAttributedTitle(homepageTitle);
    const articleMeta = buildArticleMetaBlock(articleTitle, articleDesc);

    const result = injectArticleMeta(html, articleMeta);

    // On unfixed code: result === html (no replacement happened)
    // These assertions document the EXPECTED (correct) behavior:
    expect(result).toContain(articleTitle);
    expect(result).not.toContain(`<title data-rh="true">${homepageTitle}</title>`);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTY 2: PRESERVATION (Task 2)
// EXPECTED TO PASS on unfixed code — confirms baseline behavior to preserve
// ─────────────────────────────────────────────────────────────────────────────

describe('Property 2: Preservation — Attribute-Free Title Tags Produce Identical Output', () => {
  /**
   * Property: For any HTML string where isBugCondition(html) is false
   * (i.e., <title> has no attributes), both the original injectArticleMeta
   * and the fixed version successfully replace the meta block — the output
   * contains the article meta block in both cases.
   *
   * This confirms the fix does not break behavior for HTML the original
   * regex could already handle.
   *
   * Note: We assert that BOTH functions produce output containing the article
   * meta block (i.e., both succeed), rather than byte-for-byte equality,
   * because the fixed regex replaces through </head> (inclusive) while the
   * original uses a lookahead. Both produce valid, equivalent HTML for
   * non-buggy inputs.
   *
   * EXPECTED OUTCOME ON UNFIXED CODE: PASS
   *
   * Validates: Requirements 3.1, 3.2
   */
  it('original replacement succeeds for attribute-free <title> (baseline preserved)', () => {
    fc.assert(
      fc.property(safeTextArb, safeTextArb, safeTextArb, (homepageTitle, articleTitle, articleDesc) => {
        const html = buildHtmlWithPlainTitle(homepageTitle);

        // Guard: ensure this is NOT a bug condition input
        if (isBugCondition(html)) return true;

        const metaBlock = buildArticleMetaBlock(articleTitle, articleDesc);

        // The original function should successfully replace for attribute-free titles
        const originalResult = injectArticleMeta(html, metaBlock);

        // Original result should contain the article title (replacement succeeded)
        return originalResult.includes(articleTitle);
      }),
      {
        numRuns: 200,
        verbose: true,
      },
    );
  });

  it('concrete case: original replacement succeeds for plain <title>', () => {
    const html = buildHtmlWithPlainTitle('Ugan Saripudin — Senior Engineer');
    const metaBlock = buildArticleMetaBlock('My Article', 'Article description');

    const result = injectArticleMeta(html, metaBlock);

    // Original regex should match and replace for attribute-free title
    expect(result).toContain('My Article | Ugan Saripudin');
    expect(result).not.toContain('<title>Ugan Saripudin — Senior Engineer</title>');
  });

  it('concrete case: original replacement preserves SPA shell for plain <title>', () => {
    const html = buildHtmlWithPlainTitle('Ugan Saripudin');
    const metaBlock = buildArticleMetaBlock('Test Article', 'Test description');

    const result = injectArticleMeta(html, metaBlock);

    // SPA shell must be preserved after replacement
    expect(result).toContain('<div id="root">');
    expect(result).toContain('<script type="module"');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ASSET TAG PRESERVATION (dist-like HTML)
// ─────────────────────────────────────────────────────────────────────────────

describe('Asset tag preservation — dist-like HTML', () => {
  it('extractAssetTags pulls module script, modulepreload, and stylesheet from head', () => {
    const html = buildHtmlLikeDist('Homepage');
    const { head, body } = extractAssetTags(html);
    expect(head).toContain('<script type="module"');
    expect(head).toContain('modulepreload');
    expect(head).toContain('stylesheet');
    expect(body).toBe('');
  });

  it('injectArticleMeta keeps asset tags in head after SEO replacement', () => {
    const html = rewriteAssetPaths(buildHtmlLikeDist('Homepage Title'));
    const metaBlock = buildArticleMetaBlock('ADLC vs SDLC', 'Article description');
    const result = injectArticleMeta(html, metaBlock);

    expect(result).toContain('ADLC vs SDLC');
    expect(result).not.toContain('Homepage Title');
    expect(result).toContain('<script type="module"');
    expect(result).toContain('/assets/index-abc.js');
    expect(result).toContain('/assets/vendor-react.js');
    expect(result).toContain('/assets/index.css');
    expect(result).toContain('<div id="root">');
    const headInner = result.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
    expect(headInner).toContain('<script type="module"');
    expect(headInner).toContain('ADLC vs SDLC');
  });

  it('injectArticleMeta preserves body script when assets are only in body (dev index.html)', () => {
    const html = buildHtmlWithAttributedTitle('Homepage');
    const metaBlock = buildArticleMetaBlock('Test Article', 'Desc');
    const result = injectArticleMeta(html, metaBlock);

    expect(result).toContain('Test Article');
    expect(result).toContain('<script type="module"');
    expect(result).toContain('/assets/index.js');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// HANDLER UNIT TESTS — FALLBACK PATHS, HEADERS, CACHE-CONTROL
// ─────────────────────────────────────────────────────────────────────────────

describe('Handler: Fallback Path Preservation', () => {
  // Each test stubs env vars BEFORE importing the module, so the module-level
  // constants (SUPABASE_URL, SUPABASE_ANON_KEY) are captured with the right values.

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function setupHandler(
    envVars: Record<string, string>,
    supabaseResult: { data: unknown; error: unknown } | 'throw'
  ) {
    // Stub env vars BEFORE importing the module
    for (const [k, v] of Object.entries(envVars)) {
      vi.stubEnv(k, v);
    }

    // Re-import mocked modules to configure them for this test
    const fsMock = await import('fs');
    const supabaseMock = await import('@supabase/supabase-js');

    vi.mocked(fsMock.readFileSync).mockReturnValue(buildSpaShellHtml() as any);

    if (supabaseResult === 'throw') {
      const throwingClient = {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnThis(),
            lte: vi.fn().mockReturnValue({
              single: vi.fn().mockRejectedValue(new Error('timeout')),
            }),
          }),
        }),
      };
      vi.mocked(supabaseMock.createClient).mockReturnValue(throwingClient as any);
    } else {
      vi.mocked(supabaseMock.createClient).mockReturnValue(
        makeMockSupabaseClient(supabaseResult) as any
      );
    }

    // Import the handler AFTER env vars are set
    const mod = await import('../article-seo.js');
    return mod.default;
  }

  it('missing env vars: returns 200 with valid HTML containing SPA shell', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' },
      { data: null, error: null }
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'test-article' }), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('<script type="module"');
  });

  it('missing env vars: sets X-SEO-Status and X-SEO-Time headers', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' },
      { data: null, error: null }
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'test-article' }), res);

    expect(res.headers['X-SEO-Status']).toBeDefined();
    expect(res.headers['X-SEO-Time']).toBeDefined();
  });

  it('no slug: returns 200 with valid HTML containing SPA shell', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      { data: null, error: { message: 'not found' } }
    );
    const res = makeMockRes();
    await handler(makeMockReq({}), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('<script type="module"');
  });

  it('no slug: sets X-SEO-Status and X-SEO-Time headers', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      { data: null, error: { message: 'not found' } }
    );
    const res = makeMockRes();
    await handler(makeMockReq({}), res);

    expect(res.headers['X-SEO-Status']).toBeDefined();
    expect(res.headers['X-SEO-Time']).toBeDefined();
  });

  it('Supabase error (article not found): returns 200 with valid HTML containing SPA shell', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      { data: null, error: { message: 'not found' } }
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'nonexistent-article' }), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('<script type="module"');
  });

  it('Supabase error: sets X-SEO-Status and X-SEO-Time headers', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      { data: null, error: { message: 'not found' } }
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'nonexistent-article' }), res);

    expect(res.headers['X-SEO-Status']).toBeDefined();
    expect(res.headers['X-SEO-Time']).toBeDefined();
  });

  it('Supabase timeout (catch path): returns 200 with valid HTML containing SPA shell', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      'throw'
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'slow-article' }), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('<script type="module"');
  });

  it('Supabase timeout (catch path): sets X-SEO-Status and X-SEO-Time headers', async () => {
    vi.resetModules();
    const handler = await setupHandler(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      'throw'
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'slow-article' }), res);

    expect(res.headers['X-SEO-Status']).toBeDefined();
    expect(res.headers['X-SEO-Time']).toBeDefined();
  });
});

describe('Handler: Cache-Control Header Preservation', () => {
  const mockArticle = {
    title: 'Test Article',
    meta_title: 'Test Article Meta',
    meta_description: 'A test article description',
    excerpt: 'Test excerpt',
    og_image: null,
    cover_image: null,
    author: 'Ugan Saripudin',
    published_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    tags: ['engineering'],
    slug: 'test-article',
    status: 'published',
  };

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function setupSuccessHandler() {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-anon-key');

    const fsMock = await import('fs');
    const supabaseMock = await import('@supabase/supabase-js');

    vi.mocked(fsMock.readFileSync).mockReturnValue(buildSpaShellHtml() as any);
    vi.mocked(supabaseMock.createClient).mockReturnValue(
      makeMockSupabaseClient({ data: mockArticle, error: null }) as any
    );

    const mod = await import('../article-seo.js');
    return mod.default;
  }

  it('successful article response sets Cache-Control: public, max-age=60, s-maxage=300', async () => {
    vi.resetModules();
    const handler = await setupSuccessHandler();
    const res = makeMockRes();

    await handler(makeMockReq({ slug: 'test-article' }), res);

    expect(res.statusCode).toBe(200);
    expect(res.headers['Cache-Control']).toBe('public, max-age=60, s-maxage=300');
  });

  it('successful article response sets X-SEO-Status: ok and X-SEO-Time header', async () => {
    vi.resetModules();
    const handler = await setupSuccessHandler();
    const res = makeMockRes();

    await handler(makeMockReq({ slug: 'test-article' }), res);

    expect(res.headers['X-SEO-Status']).toBe('ok');
    expect(res.headers['X-SEO-Time']).toMatch(/^\d+ms$/);
  });
});

describe('Handler: SPA Shell Preservation on All Paths', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function setupHandlerForPath(
    envVars: Record<string, string>,
    supabaseResult: { data: unknown; error: unknown }
  ) {
    for (const [k, v] of Object.entries(envVars)) {
      vi.stubEnv(k, v);
    }

    const fsMock = await import('fs');
    const supabaseMock = await import('@supabase/supabase-js');

    vi.mocked(fsMock.readFileSync).mockReturnValue(buildSpaShellHtml() as any);
    vi.mocked(supabaseMock.createClient).mockReturnValue(
      makeMockSupabaseClient(supabaseResult) as any
    );

    const mod = await import('../article-seo.js');
    return mod.default;
  }

  it('missing-env path: returned HTML contains <div id="root"> and <script type="module">', async () => {
    vi.resetModules();
    const handler = await setupHandlerForPath(
      { VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' },
      { data: null, error: null }
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'x' }), res);

    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('<script type="module"');
  });

  it('no-slug path: returned HTML contains <div id="root"> and <script type="module">', async () => {
    vi.resetModules();
    const handler = await setupHandlerForPath(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      { data: null, error: { message: 'not found' } }
    );
    const res = makeMockRes();
    await handler(makeMockReq({}), res);

    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('<script type="module"');
  });

  it('not-found path: returned HTML contains <div id="root"> and <script type="module">', async () => {
    vi.resetModules();
    const handler = await setupHandlerForPath(
      { VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'test-anon-key' },
      { data: null, error: { message: 'not found' } }
    );
    const res = makeMockRes();
    await handler(makeMockReq({ slug: 'missing' }), res);

    expect(res.body).toContain('<div id="root">');
    expect(res.body).toContain('<script type="module"');
  });
});

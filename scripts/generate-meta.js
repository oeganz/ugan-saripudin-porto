#!/usr/bin/env node
/**
 * Pre-render static HTML files with per-page meta tags
 * Generates project/insight detail pages with proper SEO
 */

const fs = require('fs');
const path = require('path');

// Read the built index.html as template
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Helper: extract project data from the projects.ts file
// We parse it since we can't import TS in Node without ts-node
function parseProjects() {
  const projectsPath = path.resolve(__dirname, '../src/data/projects.ts');
  const content = fs.readFileSync(projectsPath, 'utf-8');
  
  const projects = [];
  // Match each project object
  const projectRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?company:\s*['"]([^'"]+)['"][\s\S]*?industry:\s*['"]([^'"]+)['"][\s\S]*?description:\s*['"]([^'"]+)['"]/g;
  
  let match;
  while ((match = projectRegex.exec(content)) !== null) {
    projects.push({
      id: match[1],
      name: match[2],
      company: match[3],
      industry: match[4],
      description: match[5].replace(/\\n/g, ' ').slice(0, 160),
    });
  }
  return projects;
}

// Generate HTML for a page
function generatePage(template, { title, description, canonical, ogImage }) {
  let html = template;
  
  // Replace title
  html = html.replace(
    /<title[^>]*>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );
  
  // Replace description
  html = html.replace(
    /<meta data-rh="true" name="description" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="description" content="${escapeHtml(description)}" />`
  );
  
  // Replace OG title
  html = html.replace(
    /<meta data-rh="true" property="og:title" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}" />`
  );
  
  // Replace OG description
  html = html.replace(
    /<meta data-rh="true" property="og:description" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(description)}" />`
  );
  
  // Replace OG image
  if (ogImage) {
    html = html.replace(
      /<meta data-rh="true" property="og:image" content="[^"]*"\s*\/>/,
      `<meta data-rh="true" property="og:image" content="${escapeHtml(ogImage)}" />`
    );
  }
  
  // Replace canonical
  html = html.replace(
    /<link data-rh="true" rel="canonical" href="[^"]*"\s*\/>/,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(canonical)}" />`
  );
  
  // Replace Twitter title
  html = html.replace(
    /<meta data-rh="true" name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(title)}" />`
  );
  
  // Replace Twitter description
  html = html.replace(
    /<meta data-rh="true" name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(description)}" />`
  );
  
  // Replace Twitter image
  if (ogImage) {
    html = html.replace(
      /<meta data-rh="true" name="twitter:image" content="[^"]*"\s*\/>/,
      `<meta data-rh="true" name="twitter:image" content="${escapeHtml(ogImage)}" />`
    );
  }
  
  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Main ───────────────────────────────────────────────

const baseUrl = 'https://ugansaripudin.com';

// 1. Generate project pages
console.log('Generating project pages...');
const projectsDir = path.join(distDir, 'projects');
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir, { recursive: true });

// Parse projects from source
const projectsContent = fs.readFileSync(
  path.resolve(__dirname, '../src/data/projects.ts'), 'utf-8'
);

// Extract project blocks
const projectBlocks = projectsContent.match(/\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?\n  \}/g) || [];

for (const block of projectBlocks) {
  const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
  const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
  const companyMatch = block.match(/company:\s*['"]([^'"]+)['"]/);
  const industryMatch = block.match(/industry:\s*['"]([^'"]+)['"]/);
  const descMatch = block.match(/description:\s*['"]([^'"]+(?:\\n[^'"]*)*)['"]/);
  
  if (!idMatch || !nameMatch) continue;
  
  const id = idMatch[1];
  const name = nameMatch[1];
  const company = companyMatch ? companyMatch[1] : '';
  const industry = industryMatch ? industryMatch[1] : '';
  const description = descMatch 
    ? descMatch[1].replace(/\\n/g, ' ').slice(0, 155) + '...'
    : `${name} — ${industry} project by ${company}`;
  
  const title = `${name} — ${industry} | Ugan Saripudin Portfolio`;
  const canonical = `${baseUrl}/projects/${id}`;
  const ogImage = `${baseUrl}/images/projects/${id}_banner_01.jpg`;
  
  const html = generatePage(template, {
    title,
    description,
    canonical,
    ogImage,
  });
  
  // Write to projects/{id}.html
  fs.writeFileSync(path.join(projectsDir, `${id}.html`), html);
  
  // Also write to projects/{id}/index.html for clean URLs
  const idDir = path.join(projectsDir, id);
  if (!fs.existsSync(idDir)) fs.mkdirSync(idDir, { recursive: true });
  fs.writeFileSync(path.join(idDir, 'index.html'), html);
  
  console.log(`  ✓ projects/${id}.html`);
}

// 2. Generate insights list page
console.log('Generating insights list page...');
const insightsDir = path.join(distDir, 'insights');
if (!fs.existsSync(insightsDir)) fs.mkdirSync(insightsDir, { recursive: true });

const insightsHtml = generatePage(template, {
  title: 'Insights — Engineering Leadership, AI-Native Delivery & Team Building | Ugan Saripudin',
  description: 'Deep dives on engineering leadership, AI-native delivery workflows, ADLC methodology, and building high-performing remote teams.',
  canonical: `${baseUrl}/insights`,
  ogImage: `${baseUrl}/images/profile-real.jpg`,
});
fs.writeFileSync(path.join(insightsDir, 'index.html'), insightsHtml);
console.log('  ✓ insights/index.html');

// 3. Generate projects list page
const projectsListHtml = generatePage(template, {
  title: 'Projects — 21 Apps Across FinTech, HealthTech, Telecom & More | Ugan Saripudin',
  description: 'Portfolio of 21 projects spanning FinTech, HealthTech, Telecom, AgriTech and more. 50M+ downloads, zero incidents, AI-native delivery.',
  canonical: `${baseUrl}/projects`,
  ogImage: `${baseUrl}/images/profile-real.jpg`,
});
fs.writeFileSync(path.join(projectsDir, 'index.html'), projectsListHtml);
console.log('  ✓ projects/index.html');

console.log('\n✅ Static meta generation complete!');
console.log(`   Generated: ${projectBlocks.length} project pages + insights list + projects list`);

import fetch from 'node-fetch';
import fs from 'fs';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filename, Buffer.from(buffer));

    const size = fs.statSync(filename).size;
    console.log(`  Saved: ${filename} (${(size / 1024).toFixed(0)}KB)`);
    return true;
  } catch (error) {
    console.error(`  Failed: ${error.message}`);
    return false;
  }
}

async function scrapeAppStore(id, projectId) {
  console.log(`\nApp Store: ${projectId}`);
  try {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
    const data = await response.json();

    if (data.results && data.results[0]) {
      const app = data.results[0];
      const screenshots = app.screenshotUrls || [];

      for (let i = 0; i < Math.min(screenshots.length, 5); i++) {
        const filename = `public/images/projects/screenshots/${projectId}_screenshot_0${i + 1}.jpg`;
        await downloadImage(screenshots[i], filename);
        await delay(500);
      }

      return { rating: app.averageUserRating, reviews: app.userRatingCount };
    }
  } catch (error) {
    console.error(`  Error: ${error.message}`);
  }
  return null;
}

async function scrapeWebsite(url, projectId) {
  console.log(`\nWebsite: ${projectId}`);
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await response.text();

    // Try og:image
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                   html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    // Try twitter:image
    const twitterMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
                       html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);

    const imageUrl = ogMatch ? ogMatch[1] : twitterMatch ? twitterMatch[1] : null;

    if (imageUrl) {
      const filename = `public/images/${projectId}-hero.jpg`;
      const success = await downloadImage(imageUrl, filename);
      return success ? imageUrl : null;
    } else {
      console.log(`  No og:image found`);
    }
  } catch (error) {
    console.error(`  Error: ${error.message}`);
  }
  return null;
}

// Projects to scrape
const tasks = [
  // App Store (iOS apps)
  { type: 'appstore', id: '1583354298', projectId: 'asabri' },

  // Websites for og:image
  { type: 'website', url: 'https://www.mybeepr.com', projectId: 'mybeepr' },
  { type: 'website', url: 'https://www.akuberbagi.com', projectId: 'aku-berbagi' },
  { type: 'website', url: 'https://www.agriaku.com', projectId: 'agriaku' },
  { type: 'website', url: 'https://www.labamu.co.id', projectId: 'labamu' },
  { type: 'website', url: 'https://www.gogreat.greateasternlife.co.id', projectId: 'go-great' },
  { type: 'website', url: 'https://www.asabri.co.id', projectId: 'asabri' },
  { type: 'website', url: 'https://www.milikumi.com', projectId: 'kuis-milioner' },
];

async function main() {
  // Ensure directories
  if (!fs.existsSync('public/images/projects/screenshots')) {
    fs.mkdirSync('public/images/projects/screenshots', { recursive: true });
  }
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  for (const task of tasks) {
    if (task.type === 'appstore') {
      await scrapeAppStore(task.id, task.projectId);
    } else if (task.type === 'website') {
      await scrapeWebsite(task.url, task.projectId);
    }
    await delay(2000); // Rate limit
  }

  console.log('\nDone!');
}

main();

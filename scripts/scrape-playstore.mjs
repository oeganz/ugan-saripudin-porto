import { launch } from 'cloakbrowser';
import fs from 'fs';
import path from 'path';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const projects = [
  { id: 'axisnet', package: 'com.axis.net' },
  { id: 'agriaku', package: 'id.co.sprout.agriku_franchise_app' },
  { id: 'bluegaz', package: 'id.sprout.bluegaz' },
  { id: 'smarco', package: 'id.co.sprout.smarco' },
  { id: 'sahabat', package: 'com.generali.sahabat' },
  { id: 'skillbridge', package: 'id.co.sprout.skill_bridge' },
  { id: 'mobilegrosir', package: 'com.axis.axisgrosir' },
  { id: 'lautnusantara', package: 'com.klik.lautnusantara' },
];

async function scrapeProject(project) {
  console.log(`\nScraping ${project.id}...`);

  const browser = await launch({ headless: true });
  const page = await browser.newPage();

  try {
    const url = `https://play.google.com/store/apps/details?id=${project.package}`;
    console.log(`  Navigating to ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });
    await delay(5000); // Wait longer for JS rendering

    // Get page content
    const content = await page.content();

    // Find screenshot images with high resolution
    const screenshots = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => img.src.includes('play-lh.googleusercontent.com'))
        .map(img => {
          // Remove size constraints to get full resolution
          const url = img.src.replace(/=w\d+/, '=w1200').replace(/-w\d+/, '-w1200');
          return url;
        })
        .slice(0, 5);
    });

    console.log(`  Found ${screenshots.length} screenshots`);

    // Download first screenshot as hero
    if (screenshots.length > 0) {
      const heroUrl = screenshots[0];
      const heroPath = `public/images/${project.id}-hero.jpg`;

      try {
        // Use fetch to download the image
        const response = await fetch(heroUrl);
        const arrayBuffer = await response.arrayBuffer();
        fs.writeFileSync(heroPath, Buffer.from(arrayBuffer));

        console.log(`  Saved hero: ${heroPath} (${arrayBuffer.byteLength / 1024}KB)`);
      } catch (err) {
        console.error(`  Failed to download: ${err.message}`);
      }
    }

  } catch (error) {
    console.error(`  Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  await delay(3000); // Rate limit
}

async function main() {
  console.log('Starting Play Store scraper...');

  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  for (const project of projects) {
    await scrapeProject(project);
  }

  console.log('\nDone!');
}

main();

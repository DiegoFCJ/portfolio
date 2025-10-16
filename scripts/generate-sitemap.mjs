import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcDirectory = path.join(projectRoot, 'src');

const DEFAULT_BASE_URL = 'https://your-domain.example.com';
const rawBaseUrl = process.env.SITE_BASE_URL;

if (!rawBaseUrl) {
  console.warn(`SITE_BASE_URL not set. Falling back to default value: ${DEFAULT_BASE_URL}`);
}

const normalizedBaseUrl = (rawBaseUrl ?? DEFAULT_BASE_URL)
  .replace(/\/+$/, '');

const pages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'monthly', priority: '0.8' },
  { path: '/skills', changefreq: 'monthly', priority: '0.7' },
  { path: '/education', changefreq: 'monthly', priority: '0.7' },
  { path: '/experiences', changefreq: 'monthly', priority: '0.7' },
  { path: '/stats', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
];

const sitemapTimestamp = new Date().toISOString();

function buildLocation(segment) {
  if (!segment || segment === '/') {
    return `${normalizedBaseUrl}/`;
  }
  if (segment.startsWith('#')) {
    return `${normalizedBaseUrl}/${segment}`;
  }
  return `${normalizedBaseUrl}${segment}`;
}

async function writeSitemap() {
  const urlEntries = pages
    .map(({ path: segment, changefreq, priority }) => {
      const loc = buildLocation(segment);
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${sitemapTimestamp}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const sitemapContents = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urlEntries}\n` +
    `</urlset>\n`;

  const sitemapPath = path.join(srcDirectory, 'sitemap.xml');
  await writeFile(sitemapPath, sitemapContents, 'utf8');
  console.log(`Generated sitemap with ${pages.length} entries at ${sitemapPath}`);
}

async function writeRobots() {
  const sitemapUrl = `${normalizedBaseUrl}/sitemap.xml`;
  const robotsContents = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  const robotsPath = path.join(srcDirectory, 'robots.txt');
  await writeFile(robotsPath, robotsContents, 'utf8');
  console.log(`Updated robots.txt at ${robotsPath}`);
}

async function main() {
  await writeSitemap();
  await writeRobots();
}

main().catch((error) => {
  console.error('Failed to generate sitemap or robots.txt:', error);
  process.exitCode = 1;
});

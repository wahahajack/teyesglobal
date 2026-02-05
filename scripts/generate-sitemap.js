
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import products data - we need to read this file as text and regex parse it 
// because we can't easily import TS in this Node script without compilation
const productsContent = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf8');

// Regex to find product IDs
const productIds = [];
const idRegex = /id:\s*"([^"]+)"/g;
let match;
while ((match = idRegex.exec(productsContent)) !== null) {
    if (match[1]) productIds.push(match[1]);
}

const baseUrl = 'https://teyesauto.com';
const lastMod = new Date().toISOString().split('T')[0];

const staticPages = [
    '',
    '/products',
    '/products/lines',
    '/products/compare',
    '/solutions',
    '/solutions/distributors',
    '/solutions/auto-brands',
    '/solutions/integrators',
    '/solutions/market-needs',
    '/oem-odm',
    '/oem-odm/capabilities',
    '/oem-odm/certifications',
    '/oem-odm/cases',
    '/accessories',
    '/contact',
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(page => `
    <url>
        <loc>${baseUrl}${page}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
    `).join('')}
    ${productIds.map(id => `
    <url>
        <loc>${baseUrl}/products/${id}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    `).join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
console.log('Sitemap generated successfully!');

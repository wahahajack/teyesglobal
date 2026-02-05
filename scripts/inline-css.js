import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

console.log('Starting CSS inlining...');

if (!fs.existsSync(indexPath)) {
    console.error('Error: dist/index.html not found. Run build first.');
    process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// Find the CSS link. Vite generates <link rel="stylesheet" ... href="/assets/index-....css">
const cssLinkRegex = /<link rel="stylesheet"[^>]*?href="([^"]+\.css)"[^>]*?>/g;

let match;
let count = 0;

html = html.replace(cssLinkRegex, (match, href) => {
    // href is like "/assets/index-COpjamE_.css"
    const relativePath = href.startsWith('/') ? href.slice(1) : href;
    const cssFilePath = path.join(distDir, relativePath);

    if (fs.existsSync(cssFilePath)) {
        console.log(`Inlining CSS: ${relativePath}`);
        const cssContent = fs.readFileSync(cssFilePath, 'utf8');

        // Safety check: is it getting too huge? (Optional)
        if (cssContent.length > 500000) {
            console.warn('Warning: CSS file is very large (>500KB), skipping inline.');
            return match;
        }

        count++;
        return `<style>${cssContent}</style>`;
    } else {
        console.warn(`Warning: CSS file not found for inlining: ${cssFilePath}`);
        return match;
    }
});

if (count > 0) {
    fs.writeFileSync(indexPath, html);
    console.log(`Successfully inlined ${count} CSS file(s) into index.html`);
} else {
    console.log('No CSS files found to inline.');
}

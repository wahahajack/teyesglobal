const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// files to process (relative to repo root)
const images = [
  'src/assets/hero-bg.webp',
  'src/assets/products/cc4-pro-hero.webp',
  'src/assets/products/cc4-pro-screen.webp',
  'src/assets/products/cc4-screen.webp'
];

const sizes = [400, 800, 1200];

async function gen() {
  for (const img of images) {
    const abs = path.resolve(img);
    if (!fs.existsSync(abs)) {
      console.warn('Missing source:', abs);
      continue;
    }

    const dir = path.dirname(abs);
    const ext = path.extname(abs);
    const base = path.basename(abs, ext);

    for (const w of sizes) {
      const outName = `${base}-${w}.webp`;
      const outPath = path.join(dir, outName);
      try {
        await sharp(abs)
          .resize({ width: w })
          .webp({ quality: 72 })
          .toFile(outPath);
        console.log('Generated', outPath);
      } catch (err) {
        console.error('Failed', outPath, err.message);
      }
    }
  }
}

gen().then(() => console.log('Done')).catch(err => console.error(err));

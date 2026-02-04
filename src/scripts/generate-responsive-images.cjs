const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// files to process (relative to repo root)
const images = [
  'src/assets/hero-bg.webp',
  'src/assets/products/cc4-pro-hero.webp',
  'src/assets/products/cc4-pro-screen.webp',
  'src/assets/products/cc4-screen.webp',
  'src/assets/products/cc4l-screen.webp',
  'src/assets/products/cc4-pro-back.webp',
  'src/assets/products/cc4-back.webp',
  'src/assets/products/cc4l-back.webp',
  // 添加缺失的产品图片
  'src/assets/products/cc3-2k.webp',
  'src/assets/products/x1-pro.webp',
  // Decorative and accessory large images
  'src/assets/decorative/global-partners.webp',
  'src/assets/decorative/oem-factory.webp',
  'src/assets/decorative/solutions-hero.webp',
  'src/assets/accessories/dvr-dashcam.webp',
  'src/assets/accessories/dvr-dashcam-2.webp',
  'src/assets/accessories/cc3-360-camera.webp',
  'src/assets/decorative/partnership.webp'
];

const sizes = [400, 800, 1200];
const formats = [
  { ext: 'webp', fn: (s) => s.webp({ quality: 72 }) },
  { ext: 'avif', fn: (s) => s.avif({ quality: 50 }) },
];

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
      for (const fmt of formats) {
        const outName = `${base}-${w}.${fmt.ext}`;
        const outPath = path.join(dir, outName);
        try {
          const pipeline = sharp(abs).resize({ width: w });
          await fmt.fn(pipeline).toFile(outPath);
          console.log('Generated', outPath);
        } catch (err) {
          console.error('Failed', outPath, err.message);
        }
      }
    }
  }
}

gen().then(() => console.log('Done')).catch(err => console.error(err));

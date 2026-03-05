const sharp = require('sharp');
const path = require('path');

const dir = process.argv[2];
const logoPath = path.join(dir, 'teyes-logo.svg');

const targets = [
  { file: 'favicon-16x16.png', size: 16, logoScale: 0.74 },
  { file: 'favicon-32x32.png', size: 32, logoScale: 0.72 },
  { file: 'apple-touch-icon.png', size: 180, logoScale: 0.68 }
];

function iconBaseSvg(size) {
  const outerR = Math.max(3, Math.round(size * 0.24));
  const inset = Math.max(1, Math.round(size * 0.06));
  const x = inset;
  const y = inset;
  const w = size - inset * 2;
  const h = size - inset * 2;
  const innerR = Math.max(2, outerR - 1);
  const stroke = Math.max(1, Math.round(size * 0.05));

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1d4c8f"/>
      <stop offset="45%" stop-color="#123462"/>
      <stop offset="100%" stop-color="#091b36"/>
    </linearGradient>
    <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#89c0ff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#2d6fd3" stop-opacity="0.65"/>
    </linearGradient>
    <linearGradient id="topshine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="innershadow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="70%" stop-color="#000000" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.36"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${size}" height="${size}" fill="#071326"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${outerR}" fill="url(#bg)"/>
  <rect x="${x + stroke / 2}" y="${y + stroke / 2}" width="${w - stroke}" height="${h - stroke}" rx="${innerR}" fill="none" stroke="url(#rim)" stroke-width="${stroke}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${Math.max(1, Math.round(h * 0.48))}" rx="${outerR}" fill="url(#topshine)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${outerR}" fill="url(#innershadow)"/>
  <rect x="${x + stroke}" y="${y + h - Math.max(1, Math.round(h * 0.15))}" width="${w - stroke * 2}" height="${Math.max(1, Math.round(h * 0.11))}" rx="${Math.max(1, Math.round(outerR * 0.45))}" fill="#000000" opacity="0.35"/>
</svg>`;
}

async function makeIcon(target) {
  const logo = await sharp(logoPath)
    .resize({ width: Math.round(target.size * target.logoScale), height: Math.round(target.size * 0.33), fit: 'inside' })
    .png()
    .toBuffer();

  const base = await sharp(Buffer.from(iconBaseSvg(target.size)))
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(base)
    .flatten({ background: '#071326' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, target.file));
}

(async () => {
  for (const target of targets) {
    await makeIcon(target);
  }
  console.log('Regenerated stronger-3D icons');
})();

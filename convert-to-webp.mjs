import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Optimized Image Converter Script
 * 
 * Usage: node scripts/convert-to-webp.mjs [input_directory] [output_directory]
 * 
 * Dependencies: Uses 'sharp-cli' via npx.
 */

const inputDir = process.argv[2] || './public/images';
const outputDir = process.argv[3] || './public/images/webp';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(file =>
    ['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())
);

console.log(`🚀 Found ${files.length} images to convert...`);

files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

    console.log(`📦 Converting: ${file} -> ${path.basename(outputPath)}`);

    try {
        execSync(`npx -y sharp-cli -i "${inputPath}" -o "${outputPath}" --format webp`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`❌ Failed to convert ${file}:`, error.message);
    }
});

console.log('✅ Conversion complete!');

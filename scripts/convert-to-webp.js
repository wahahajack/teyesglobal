import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 需要转换的目录
const directories = [
  join(__dirname, '../public'),
  join(__dirname, '../src/assets/decorative'),
  join(__dirname, '../src/assets/products')
];

// 支持的图片格式
const supportedFormats = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(filePath) {
  const ext = extname(filePath).toLowerCase();
  
  if (!supportedFormats.includes(ext)) {
    return;
  }

  const outputPath = filePath.replace(ext, '.webp');
  
  try {
    await sharp(filePath)
      .webp({ quality: 85 }) // 设置质量为85，平衡文件大小和图片质量
      .toFile(outputPath);
    
    console.log(`✓ 已转换: ${basename(filePath)} -> ${basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ 转换失败 ${filePath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  try {
    const files = await readdir(dirPath);
    
    for (const file of files) {
      const filePath = join(dirPath, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        await processDirectory(filePath);
      } else if (stats.isFile()) {
        await convertToWebP(filePath);
      }
    }
  } catch (error) {
    console.error(`处理目录失败 ${dirPath}:`, error.message);
  }
}

async function main() {
  console.log('开始转换图片为 WebP 格式...\n');
  
  for (const dir of directories) {
    console.log(`处理目录: ${dir}`);
    await processDirectory(dir);
    console.log('');
  }
  
  console.log('转换完成！');
}

main();

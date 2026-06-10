import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const directoriesToPrune = new Set([
  '.history',
  '.lh-run',
  '.venv',
  '.vscode',
  '__pycache__',
  'ai-video-directory',
  'tools',
]);

const filePatternsToPrune = [
  /^lh-.*\.json$/i,
  /^lighthouse-.*\.(json|html)$/i,
  /^preview-.*\.png$/i,
  /^raw_html(?:\.html)?$/i,
  /^lighthouse-mobile\.json$/i,
  /\.(bak|ps1|py|pyc|pyd|pyi|md|log|tmp)$/i,
];

function shouldPruneFile(fileName) {
  return filePatternsToPrune.some((pattern) => pattern.test(fileName));
}

function makeWritable(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return;
  }

  const stat = fs.lstatSync(targetPath);
  fs.chmodSync(targetPath, 0o777);

  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(targetPath)) {
      makeWritable(path.join(targetPath, child));
    }
  }
}

function removePath(targetPath) {
  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
  } catch (error) {
    if (error && (error.code === 'EPERM' || error.code === 'EACCES')) {
      makeWritable(targetPath);
      fs.rmSync(targetPath, { recursive: true, force: true });
      return;
    }

    throw error;
  }
}

function pruneDirectory(dirPath, removed) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (directoriesToPrune.has(entry.name)) {
        removePath(entryPath);
        removed.push(path.relative(distDir, entryPath));
        continue;
      }

      pruneDirectory(entryPath, removed);
      continue;
    }

    if (shouldPruneFile(entry.name)) {
      removePath(entryPath);
      removed.push(path.relative(distDir, entryPath));
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory not found. Run build first.');
  process.exit(1);
}

const removed = [];
pruneDirectory(distDir, removed);

console.log(`Pruned ${removed.length} deploy artifact(s) from dist.`);

if (removed.length > 0) {
  for (const item of removed) {
    console.log(`- ${item}`);
  }
}

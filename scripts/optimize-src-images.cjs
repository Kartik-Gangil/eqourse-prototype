/**
 * eQOURSE — Optimize src/ images to WebP
 * Converts heavy PNG/JPG in src/assets to WebP and updates imports
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_ASSETS = path.join(__dirname, '..', 'src', 'assets');
const ROOT = path.join(__dirname, '..');

// Files to skip (logos, icons, small images)
const SKIP_FILES = [
  'eqourse-logo.png', 'eqourse-logo-light.png',
  '3d_x_twitter_logo.png', '3d_instagram_logo.png',
  '3d_facebook_logo.png', '3d_linkedin_logo.png', '3d_youtube_logo.png',
  'tutrain-brand-hierarchy.png', 'hero-image.jpg', 'strategy-image.jpg',
  'about-image.jpg'
];

const SCAN_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css'];

let converted = [];
let totalBefore = 0, totalAfter = 0;

function findImages(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findImages(fullPath, results);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext) && !SKIP_FILES.includes(entry.name)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function findSourceFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', 'dist', '.git'].includes(entry.name)) {
      findSourceFiles(fullPath, results);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (SCAN_EXTENSIONS.includes(ext)) results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  const images = findImages(SRC_ASSETS);
  console.log(`Found ${images.length} heavy images in src/assets. Converting...\n`);

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const originalSize = fs.statSync(imgPath).size;
    try {
      await sharp(imgPath).webp({ quality: 82, effort: 6 }).toFile(webpPath);
      const newSize = fs.statSync(webpPath).size;
      const saved = originalSize - newSize;
      const pct = ((saved / originalSize) * 100).toFixed(0);
      console.log(`✅ ${path.basename(imgPath)} → ${path.basename(webpPath)}`);
      console.log(`   ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${pct}% smaller)`);
      totalBefore += originalSize;
      totalAfter += newSize;
      converted.push({ imgPath, webpPath, baseName: path.basename(imgPath) });
    } catch (e) {
      console.error(`❌ ${path.basename(imgPath)}: ${e.message}`);
    }
  }

  // Update all imports in src/
  console.log('\n📝 Updating import references in src/...\n');
  const srcFiles = findSourceFiles(path.join(ROOT, 'src'));
  let totalUpdated = 0;

  for (const item of converted) {
    const oldName = path.basename(item.imgPath);
    const newName = path.basename(item.webpPath);
    for (const file of srcFiles) {
      let content = fs.readFileSync(file, 'utf-8');
      if (content.includes(oldName)) {
        const updated = content.replaceAll(oldName, newName);
        fs.writeFileSync(file, updated);
        const rel = file.replace(ROOT + path.sep, '').replace(/\\/g, '/');
        console.log(`  📝 ${rel}: ${oldName} → ${newName}`);
        totalUpdated++;
        content = updated;
      }
    }
    // Delete original
    fs.unlinkSync(item.imgPath);
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`✅ Converted: ${converted.length} src/ images`);
  console.log(`📦 Before: ${(totalBefore/1024/1024).toFixed(2)} MB`);
  console.log(`📦 After:  ${(totalAfter/1024/1024).toFixed(2)} MB`);
  console.log(`💾 Saved:  ${((totalBefore-totalAfter)/1024/1024).toFixed(2)} MB (${((1-totalAfter/totalBefore)*100).toFixed(0)}%)`);
  console.log(`📝 Import refs updated: ${totalUpdated}`);
  console.log('═'.repeat(60));
}

main();

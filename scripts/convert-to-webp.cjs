/**
 * eQOURSE WebP Conversion Script — Step 1
 * -----------------------------------------
 * Converts all PNG/JPG files in /public to WebP format.
 * - Keeps originals until references are updated (deleted in step 2)
 * - Skips og-image.png (social media crawlers need PNG/JPG)
 * - Reports savings per file and totals
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SKIP_FILES = ['og-image.png']; // Keep these as PNG for social media OG tags
const REPORT_PATH = path.join(__dirname, '..', 'scripts', 'webp-conversion-report.json');

let totalOriginal = 0;
let totalWebp = 0;
let converted = [];
let skipped = [];
let errors = [];

function formatMB(bytes) { return (bytes / (1024 * 1024)).toFixed(2) + ' MB'; }
function formatKB(bytes) { return (bytes / 1024).toFixed(0) + ' KB'; }

function findImages(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findImages(fullPath, results);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function convertToWebP(filePath) {
  const fileName = path.basename(filePath);
  const relativePath = filePath.replace(PUBLIC_DIR, '').replace(/\\/g, '/');

  // Skip special files
  if (SKIP_FILES.includes(fileName)) {
    console.log(`⏭️  Kept as PNG (OG image): ${relativePath}`);
    skipped.push(relativePath);
    return;
  }

  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const originalSize = fs.statSync(filePath).size;

  try {
    await sharp(filePath)
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    const saving = originalSize - webpSize;
    const pct = ((saving / originalSize) * 100).toFixed(0);

    totalOriginal += originalSize;
    totalWebp += webpSize;
    converted.push({
      original: relativePath,
      webp: relativePath.replace(/\.(png|jpg|jpeg)$/i, '.webp'),
      originalSize,
      webpSize
    });

    console.log(`✅ ${relativePath}`);
    console.log(`   ${formatKB(originalSize)} → ${formatKB(webpSize)} (saved ${formatKB(saving)}, ${pct}% smaller)`);
  } catch (err) {
    console.error(`❌ Error: ${relativePath}: ${err.message}`);
    errors.push(relativePath);
  }
}

async function main() {
  console.log('🔍 Scanning /public for PNG/JPG files...\n');
  const images = findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images. Converting to WebP...\n`);
  console.log('─'.repeat(70));

  for (const img of images) {
    await convertToWebP(img);
  }

  // Save report for step 2 (reference updater)
  const report = { converted, skipped, errors };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  console.log('\n' + '═'.repeat(70));
  console.log('📊 WEBP CONVERSION COMPLETE');
  console.log('═'.repeat(70));
  console.log(`✅ Converted  : ${converted.length} files`);
  console.log(`⏭️  Kept as PNG : ${skipped.length} files`);
  console.log(`❌ Errors     : ${errors.length} files`);
  console.log(`📦 Before     : ${formatMB(totalOriginal)}`);
  console.log(`📦 After      : ${formatMB(totalWebp)}`);
  console.log(`💾 Saved      : ${formatMB(totalOriginal - totalWebp)} (${((1 - totalWebp / totalOriginal) * 100).toFixed(0)}% reduction)`);
  console.log('═'.repeat(70));
  console.log('\n✅ Report saved to scripts/webp-conversion-report.json');
  console.log('👉 Now run: node scripts/update-image-refs.cjs');
}

main();

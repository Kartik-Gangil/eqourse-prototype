/**
 * eQOURSE Image Optimization Script
 * ------------------------------------
 * Compresses all PNG and JPG images in the /public folder in-place.
 * - Keeps the same filenames (no code changes needed)
 * - Resizes images wider than 1920px
 * - Compresses PNG with quality 80 (from ~2MB to ~150-300KB)
 * - Compresses JPG with quality 82
 * - Reports before/after sizes and total savings
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MAX_WIDTH = 1920; // max width in pixels
const PNG_QUALITY = 80;
const JPG_QUALITY = 82;
const MIN_SIZE_KB = 100; // only optimize files larger than 100KB

let totalOriginalSize = 0;
let totalNewSize = 0;
let filesProcessed = 0;
let filesSkipped = 0;
let errors = 0;

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function formatKB(bytes) {
  return (bytes / 1024).toFixed(0) + ' KB';
}

// Recursively find all image files
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

async function optimizeImage(filePath) {
  const originalSize = fs.statSync(filePath).size;
  
  // Skip small files
  if (originalSize < MIN_SIZE_KB * 1024) {
    filesSkipped++;
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const relativePath = filePath.replace(PUBLIC_DIR, '').replace(/\\/g, '/');

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    
    // Resize if wider than MAX_WIDTH
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    // Compress based on format
    let outputBuffer;
    if (ext === '.png') {
      outputBuffer = await pipeline
        .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: false })
        .toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      outputBuffer = await pipeline
        .jpeg({ quality: JPG_QUALITY, progressive: true, mozjpeg: true })
        .toBuffer();
    } else {
      filesSkipped++;
      return;
    }

    const newSize = outputBuffer.length;
    const saving = originalSize - newSize;
    const savingPct = ((saving / originalSize) * 100).toFixed(0);

    // Only write if we actually saved space
    if (saving > 0) {
      fs.writeFileSync(filePath, outputBuffer);
      totalOriginalSize += originalSize;
      totalNewSize += newSize;
      filesProcessed++;
      console.log(`✅ ${relativePath}`);
      console.log(`   ${formatKB(originalSize)} → ${formatKB(newSize)} (saved ${formatKB(saving)}, ${savingPct}% smaller)`);
    } else {
      filesSkipped++;
      console.log(`⏭️  Skipped (already optimized): ${relativePath}`);
    }
  } catch (err) {
    errors++;
    console.error(`❌ Error processing ${relativePath}: ${err.message}`);
  }
}

async function main() {
  console.log('🔍 Scanning for images in /public...\n');
  const images = findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} image files. Starting optimization...\n`);
  console.log('─'.repeat(70));

  for (const imgPath of images) {
    await optimizeImage(imgPath);
  }

  console.log('\n' + '═'.repeat(70));
  console.log('📊 OPTIMIZATION COMPLETE — SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Files optimized : ${filesProcessed}`);
  console.log(`⏭️  Files skipped   : ${filesSkipped} (already small or already optimized)`);
  console.log(`❌ Errors          : ${errors}`);
  console.log(`📦 Total before    : ${formatMB(totalOriginalSize)}`);
  console.log(`📦 Total after     : ${formatMB(totalNewSize)}`);
  console.log(`💾 Total saved     : ${formatMB(totalOriginalSize - totalNewSize)} (${((1 - totalNewSize/totalOriginalSize)*100).toFixed(0)}% reduction)`);
  console.log('═'.repeat(70));
}

main();

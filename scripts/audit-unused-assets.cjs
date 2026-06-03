/**
 * eQOURSE — Unused Asset Auditor
 * --------------------------------
 * Scans all source files and finds assets in /public and /src/assets
 * that are NOT referenced anywhere in the codebase.
 * SAFE: Only reports, does NOT delete anything.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIR = path.join(ROOT, 'src');

// File types to scan for references
const SCAN_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.md', '.json'];

// Asset extensions to audit
const ASSET_EXTENSIONS = [
  '.mp4', '.webm', '.mov', '.avi',          // videos
  '.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', // images
  '.pdf', '.docx', '.xlsx', '.zip',          // documents
  '.woff', '.woff2', '.ttf', '.eot',         // fonts (usually keep)
  '.ico',                                    // icons
];

// Files to ALWAYS keep (critical system files)
const ALWAYS_KEEP = [
  'favicon.ico', 'robots.txt', 'sitemap.xml', 'og-image.png',
  'googlefcb9195805f39306.html', 'manifest.json', '.htaccess',
  '_redirects', 'index.html'
];

// --- Step 1: Collect all asset files in public/ ---
function findAssets(dir, base, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      findAssets(fullPath, relPath, results);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ASSET_EXTENSIONS.includes(ext)) {
        results.push({
          fullPath,
          relPath,      // e.g. "assets/banners/x.webp" or "hero-bg.mp4"
          fileName: entry.name,
          urlPath: '/' + relPath,  // e.g. "/assets/banners/x.webp"
          sizeBytes: fs.statSync(fullPath).size
        });
      }
    }
  }
  return results;
}

// --- Step 2: Collect all source file content ---
function findSourceFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', 'dist', '.git', 'scripts'].includes(entry.name)) {
        findSourceFiles(fullPath, results);
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (SCAN_EXTENSIONS.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

// Build a single giant string of all source content for fast searching
function buildSourceIndex(files) {
  let combined = '';
  for (const f of files) {
    try { combined += fs.readFileSync(f, 'utf-8') + '\n'; } catch {}
  }
  return combined;
}

// --- Main ---
function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  return (bytes / 1024).toFixed(0) + ' KB';
}

console.log('🔍 Scanning source files...');
const sourceFiles = findSourceFiles(SRC_DIR);
// Also scan root-level files
const rootFiles = fs.readdirSync(ROOT)
  .filter(f => SCAN_EXTENSIONS.includes(path.extname(f).toLowerCase()))
  .map(f => path.join(ROOT, f));
const allSourceFiles = [...sourceFiles, ...rootFiles];
console.log(`   Found ${allSourceFiles.length} source files`);

const sourceIndex = buildSourceIndex(allSourceFiles);
console.log('   Source index built.\n');

console.log('🔍 Scanning public/ for assets...');
const allAssets = findAssets(PUBLIC_DIR, '', []);
console.log(`   Found ${allAssets.length} asset files\n`);

// --- Step 3: Check each asset against source index ---
const unused = [];
const used = [];

for (const asset of allAssets) {
  // Skip always-keep files
  if (ALWAYS_KEEP.includes(asset.fileName)) {
    used.push(asset);
    continue;
  }

  // Check by filename (most reliable - covers both /public path refs and dynamic refs)
  const nameWithoutExt = path.basename(asset.fileName, path.extname(asset.fileName));
  const isReferenced = (
    sourceIndex.includes(asset.fileName) ||           // exact filename match
    sourceIndex.includes(asset.urlPath) ||            // full URL path match
    sourceIndex.includes(asset.relPath) ||            // relative path match
    sourceIndex.includes(nameWithoutExt + '.webp') || // referenced as webp
    sourceIndex.includes(nameWithoutExt + '.png') ||  // referenced as png
    sourceIndex.includes(nameWithoutExt + '.jpg')     // referenced as jpg
  );

  if (isReferenced) {
    used.push(asset);
  } else {
    unused.push(asset);
  }
}

// --- Step 4: Report ---
const totalUnusedSize = unused.reduce((sum, a) => sum + a.sizeBytes, 0);
const totalUsedSize = used.reduce((sum, a) => sum + a.sizeBytes, 0);

console.log('═'.repeat(70));
console.log('📊 UNUSED ASSET AUDIT REPORT');
console.log('═'.repeat(70));
console.log(`✅ Used assets   : ${used.length} files (${formatSize(totalUsedSize)})`);
console.log(`🗑️  Unused assets : ${unused.length} files (${formatSize(totalUnusedSize)} can be freed)`);
console.log('═'.repeat(70));

if (unused.length === 0) {
  console.log('\n✅ No unused assets found! Everything is referenced.');
} else {
  console.log('\n🗑️  UNUSED FILES (safe to delete):\n');
  
  // Group by type
  const videos = unused.filter(a => ['.mp4','.webm','.mov'].includes(path.extname(a.fileName).toLowerCase()));
  const images = unused.filter(a => ['.webp','.png','.jpg','.jpeg','.gif','.svg'].includes(path.extname(a.fileName).toLowerCase()));
  const others = unused.filter(a => !videos.includes(a) && !images.includes(a));

  if (videos.length > 0) {
    console.log('🎬 VIDEOS:');
    for (const v of videos.sort((a,b) => b.sizeBytes - a.sizeBytes)) {
      console.log(`   ${formatSize(v.sizeBytes).padEnd(10)} ${v.urlPath}`);
    }
  }
  if (images.length > 0) {
    console.log('\n🖼️  IMAGES:');
    for (const i of images.sort((a,b) => b.sizeBytes - a.sizeBytes)) {
      console.log(`   ${formatSize(i.sizeBytes).padEnd(10)} ${i.urlPath}`);
    }
  }
  if (others.length > 0) {
    console.log('\n📄 OTHER FILES:');
    for (const o of others.sort((a,b) => b.sizeBytes - a.sizeBytes)) {
      console.log(`   ${formatSize(o.sizeBytes).padEnd(10)} ${o.urlPath}`);
    }
  }
  
  console.log('\n💾 Total space to recover: ' + formatSize(totalUnusedSize));
  
  // Save the list for the delete script
  const deleteList = unused.map(a => ({ fullPath: a.fullPath, urlPath: a.urlPath, size: formatSize(a.sizeBytes) }));
  fs.writeFileSync(path.join(__dirname, 'unused-assets.json'), JSON.stringify(deleteList, null, 2));
  console.log('\n📋 List saved to scripts/unused-assets.json for deletion.');
  console.log('👉 Review the list above, then run: node scripts/delete-unused-assets.cjs');
}

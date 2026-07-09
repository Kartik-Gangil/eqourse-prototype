/**
 * eQOURSE WebP Reference Updater — Step 2
 * -----------------------------------------
 * Reads the conversion report from step 1, then:
 * - Updates every .png/.jpg reference in src/ to .webp
 * - Deletes original PNG/JPG files from /public (after update)
 * - Skips files that were excluded (e.g. og-image.png)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src');
const PUBLIC_DIR = path.join(ROOT, 'public');
const REPORT_PATH = path.join(__dirname, 'webp-conversion-report.json');

// File extensions to scan for references
const SCAN_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.md'];

if (!fs.existsSync(REPORT_PATH)) {
  console.error('❌ No conversion report found. Run convert-to-webp.cjs first!');
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'));
const { converted } = report;

console.log(`📋 Loaded report: ${converted.length} conversions to process\n`);

// Build a map of old extension -> new extension for quick lookup
// e.g. "/assets/banners/x.png" -> "/assets/banners/x.webp"
const conversionMap = new Map();
for (const item of converted) {
  conversionMap.set(item.original, item.webp);
}

// ── STEP 1: Update references in source files ──────────────────────────────

let totalFilesUpdated = 0;
let totalReplacements = 0;

function findSourceFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and dist
      if (!['node_modules', 'dist', '.git'].includes(entry.name)) {
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

function updateRefsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let replacements = 0;

  for (const [oldPath, newPath] of conversionMap) {
    // Match the path with or without leading /
    // Handle both exact matches and encoded spaces etc.
    const variants = [
      oldPath,                                    // /assets/banners/x.png
      oldPath.replace(/^\//, ''),                  // assets/banners/x.png
    ];

    for (const variant of variants) {
      if (content.includes(variant)) {
        const newVariant = variant.endsWith(path.extname(variant))
          ? variant.replace(/\.(png|jpg|jpeg)$/i, '.webp')
          : variant;
        const before = content;
        content = content.replaceAll(variant, newVariant);
        if (content !== before) {
          replacements++;
        }
      }
    }
  }

  if (replacements > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    const rel = filePath.replace(ROOT + path.sep, '').replace(/\\/g, '/');
    console.log(`📝 Updated ${replacements} reference(s) in: ${rel}`);
    totalFilesUpdated++;
    totalReplacements += replacements;
  }
}

console.log('🔍 Scanning source files for image references...\n');
const sourceFiles = findSourceFiles(SRC_DIR);
// Also scan root-level config-like files and index.html
const rootFiles = fs.readdirSync(ROOT)
  .filter(f => SCAN_EXTENSIONS.includes(path.extname(f).toLowerCase()))
  .map(f => path.join(ROOT, f));

const allFiles = [...sourceFiles, ...rootFiles];
console.log(`Found ${allFiles.length} source files to scan.\n`);
console.log('─'.repeat(70));

for (const file of allFiles) {
  updateRefsInFile(file);
}

// ── STEP 2: Delete original PNG/JPG files ─────────────────────────────────

console.log('\n🗑️  Deleting original PNG/JPG files...\n');
let deleted = 0;
let deleteErrors = 0;

for (const item of converted) {
  const originalFullPath = path.join(PUBLIC_DIR, item.original);
  try {
    if (fs.existsSync(originalFullPath)) {
      fs.unlinkSync(originalFullPath);
      deleted++;
    }
  } catch (err) {
    console.error(`❌ Could not delete ${item.original}: ${err.message}`);
    deleteErrors++;
  }
}

// ── FINAL SUMMARY ─────────────────────────────────────────────────────────

console.log('\n' + '═'.repeat(70));
console.log('📊 REFERENCE UPDATE COMPLETE');
console.log('═'.repeat(70));
console.log(`📝 Source files updated : ${totalFilesUpdated}`);
console.log(`🔁 Total replacements   : ${totalReplacements}`);
console.log(`🗑️  Originals deleted    : ${deleted}`);
console.log(`❌ Delete errors        : ${deleteErrors}`);
console.log('═'.repeat(70));
console.log('\n✅ Done! Now run: npm run build  →  to verify everything still works');

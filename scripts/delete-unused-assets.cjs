/**
 * eQOURSE — Delete Unused Assets
 * Reads the audit report and deletes confirmed unused files.
 */

const fs = require('fs');
const path = require('path');

const REPORT_PATH = path.join(__dirname, 'unused-assets.json');

if (!fs.existsSync(REPORT_PATH)) {
  console.error('❌ No unused-assets.json found. Run audit-unused-assets.cjs first!');
  process.exit(1);
}

const toDelete = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'));
console.log(`🗑️  Deleting ${toDelete.length} unused files...\n`);

let deleted = 0, errors = 0, totalFreed = 0;

for (const item of toDelete) {
  try {
    if (fs.existsSync(item.fullPath)) {
      const size = fs.statSync(item.fullPath).size;
      fs.unlinkSync(item.fullPath);
      console.log(`✅ Deleted (${item.size}): ${item.urlPath}`);
      deleted++;
      totalFreed += size;
    } else {
      console.log(`⏭️  Already gone: ${item.urlPath}`);
    }
  } catch (err) {
    console.error(`❌ Error deleting ${item.urlPath}: ${err.message}`);
    errors++;
  }
}

const freed = (totalFreed / 1024 / 1024).toFixed(2);
console.log('\n' + '═'.repeat(60));
console.log(`✅ Deleted  : ${deleted} files`);
console.log(`❌ Errors   : ${errors}`);
console.log(`💾 Freed    : ${freed} MB`);
console.log('═'.repeat(60));

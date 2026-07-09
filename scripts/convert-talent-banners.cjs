const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'C:\\Users\\yobha\\Downloads\\eqourse website data\\talent-assessment-workforce-evaluation-20260603T115033Z-3-001\\talent-assessment-workforce-evaluation';
const DEST_DIR = path.join(__dirname, '../public/assets/content-services/talent-assessment');

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

async function processImages() {
  console.log('Starting optimization...');
  const files = fs.readdirSync(SOURCE_DIR);
  let savedBytes = 0;

  for (const file of files) {
    if (!file.toLowerCase().endsWith('.png') && !file.toLowerCase().endsWith('.jpg')) continue;
    
    const inputPath = path.join(SOURCE_DIR, file);
    const parsedName = path.parse(file).name;
    
    // Normalize filename for SEO (lowercase, dashes instead of spaces)
    const seoName = parsedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
      
    const destPath = path.join(DEST_DIR, `${seoName}.webp`);
    
    try {
      const originalSize = fs.statSync(inputPath).size;
      
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(destPath);
        
      const newSize = fs.statSync(destPath).size;
      savedBytes += (originalSize - newSize);
      
      console.log(`✅ Processed: ${seoName}.webp`);
      console.log(`   Size: ${(originalSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB`);
    } catch (err) {
      console.error(`❌ Error on ${file}:`, err.message);
    }
  }
  
  console.log(`\n🎉 Total space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

processImages();

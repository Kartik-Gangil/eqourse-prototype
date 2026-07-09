import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const journeyDir = path.join(__dirname, "../public/assets/journey");

async function optimizeImages() {
  console.log("Starting image optimization...");
  const files = fs.readdirSync(journeyDir);

  for (const file of files) {
    if (file.endsWith(".png")) {
      const inputPath = path.join(journeyDir, file);
      const outputPath = path.join(journeyDir, file.replace(".png", ".webp"));

      try {
        await sharp(inputPath)
          // Resize to a sensible max width (e.g., 800px) which is plenty for 
          // a 300px popup card, preventing browser native aliasing artifacts
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 90, effort: 6 }) 
          .toFile(outputPath);
        
        console.log(`✅ Converted ${file} -> ${path.basename(outputPath)}`);
        
        // Remove original png after successful conversion
        fs.unlinkSync(inputPath);
      } catch (err) {
        console.error(`❌ Error converting ${file}:`, err);
      }
    }
  }
  console.log("Optimization complete!");
}

optimizeImages();

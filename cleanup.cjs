const fs = require('fs');
const path = require('path');

const filesToDelete = [
  // OG images (originals - WebP versions already exist)
  'public/assets/og-image.png',
  'public/assets/ai-data/annotation-labeling/annotation-labeling-og.jpg',
  'public/assets/ai-data/annotation-labeling/llm-rlhf/llm-rlhf-annotation-og.jpg',
  'public/assets/ai-data/annotation-labeling/image-annotation/image-annotation-og.jpg',
  'public/assets/ai-data/annotation-labeling/video-annotation/video-annotation-og.jpg',
  'public/assets/ai-data/annotation-labeling/document-ocr-annotation/document-ocr-annotation-og.jpg',
  'public/assets/ai-data/annotation-labeling/text-nlp-annotation/text-nlp-annotation-og.jpg',
  'public/assets/ai-data/annotation-labeling/audio-speech-annotation/audio-speech-annotation-og.jpg',
  'public/assets/ai-data/annotation-labeling/3d-point-cloud-lidar-annotation/3d-point-cloud-lidar-annotation-og.jpg',
  'public/assets/ai-data/annotation-labeling/content-moderation/content-moderation-og.jpg',
  // Cleanup scripts
  'fix-og-refs.cjs',
  'convert-remaining.cjs',
];

for (const file of filesToDelete) {
  const fullPath = path.join(__dirname, file);
  try {
    fs.unlinkSync(fullPath);
    console.log(`✓ Deleted: ${file}`);
  } catch (err) {
    console.log(`✗ ${file}: ${err.message}`);
  }
}

console.log('\nCleanup done!');

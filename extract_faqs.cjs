const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function findFaqFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findFaqFiles(fullPath, fileList);
    } else if (fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('const faqs') || content.includes('const faqs: FAQ[] = [') || content.includes('const faqs: FAQItem[] = [')) {
        if (!fullPath.includes('FAQsAccordion.tsx') && !fullPath.includes('FAQSection.tsx')) {
          fileList.push(fullPath);
        }
      }
    }
  }
  return fileList;
}

const faqFiles = findFaqFiles(srcDir);
console.log(`Found ${faqFiles.length} files with FAQs.`);

const allExtractedFaqs = {};

for (const file of faqFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Simple regex to extract the faqs array
  const match = content.match(/const faqs.*?(?=\s*\]\s*;)/s);
  if (match) {
    const arrString = match[0] + '];';
    allExtractedFaqs[path.basename(file)] = arrString;
  }
}

fs.writeFileSync('extracted_faqs.json', JSON.stringify(allExtractedFaqs, null, 2));
console.log("Written to extracted_faqs.json");

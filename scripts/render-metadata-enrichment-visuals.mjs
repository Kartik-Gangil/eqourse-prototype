import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("public/assets/ai-data/cleaning-validation/metadata-enrichment");
await mkdir(out, { recursive: true });

await sharp("C:/Users/yobha/.codex/generated_images/019fe0dd-b370-7b12-88c6-1a7fcd6a6457/exec-fe220f6d-ed53-4b9a-9c98-562c3a161800.png")
  .resize(1200, 800, { fit: "cover", position: "attention" })
  .avif({ quality: 42, effort: 7, chromaSubsampling: "4:2:0" })
  .toFile(path.join(out, "metadata-enrichment-services-hero.avif"));

await sharp("C:/Users/yobha/.codex/generated_images/019fe0dd-b370-7b12-88c6-1a7fcd6a6457/exec-40e7c3e2-4a1b-4ecc-ba4b-1822858c11fe.png")
  .resize(1000, 600, { fit: "cover", position: "attention" })
  .avif({ quality: 40, effort: 7, chromaSubsampling: "4:2:0" })
  .toFile(path.join(out, "metadata-coverage-confidence-report.avif"));

const technical = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<rect width="1200" height="800" rx="36" fill="#f7faf9"/><path d="M600 42v716M42 400h1116" stroke="#d6e1de" stroke-width="2"/>
<g transform="translate(72 68)"><rect width="456" height="265" rx="24" fill="#fff" stroke="#d6e1de"/><circle cx="34" cy="34" r="15" fill="#0c9c84"/><text x="29" y="40" font-family="Arial" font-size="16" font-weight="700" fill="#fff">1</text><path d="M76 72h220l54 54v98H76z" fill="#eef3f2" stroke="#b8c7c4" stroke-width="2"/><path d="M296 72v55h54" fill="none" stroke="#b8c7c4" stroke-width="2"/>${[0,1,2,3].map(i=>`<rect x="102" y="${112+i*24}" width="150" height="9" rx="4" fill="#bdc9c7"/>`).join("")}<rect x="316" y="105" width="88" height="25" rx="12" fill="#dff5ef"/><rect x="316" y="140" width="68" height="25" rx="12" fill="#fff0d7"/><rect x="316" y="175" width="104" height="25" rx="12" fill="#e6e8f8"/></g>
<g transform="translate(672 68)"><rect width="456" height="265" rx="24" fill="#fff" stroke="#d6e1de"/><circle cx="34" cy="34" r="15" fill="#0c9c84"/><text x="29" y="40" font-family="Arial" font-size="16" font-weight="700" fill="#fff">2</text><path d="M228 72v38M228 110H118v38M228 110h110v38M118 148H76v38m42-38h42v38m178-38h-42v38m42-38h42v38" fill="none" stroke="#0c9c84" stroke-width="4" stroke-linecap="round"/><circle cx="228" cy="64" r="18" fill="#112037"/>${[[76,198],[160,198],[296,198],[380,198]].map(([x,y],i)=>`<rect x="${x-27}" y="${y-14}" width="54" height="28" rx="14" fill="${i%2?'#fff0d7':'#dff5ef'}" stroke="#b9cbc7"/>`).join("")}</g>
<g transform="translate(72 468)"><rect width="456" height="265" rx="24" fill="#fff" stroke="#d6e1de"/><circle cx="34" cy="34" r="15" fill="#e5a12d"/><text x="29" y="40" font-family="Arial" font-size="16" font-weight="700" fill="#fff">3</text>${[0,1,2,3,4].map(i=>`<rect x="56" y="${76+i*34}" width="${92+(i%3)*22}" height="24" rx="12" fill="#edf2f1" stroke="#bfcac8"/>`).join("")}<path d="M184 88c62 0 66 74 126 74M206 122c44 0 56 40 104 40M184 156c58 0 68 6 126 6M206 190c52 0 54-28 104-28M184 224c60 0 68-62 126-62" fill="none" stroke="#e5a12d" stroke-width="3" stroke-dasharray="8 7"/><circle cx="362" cy="162" r="57" fill="#dff5ef" stroke="#0c9c84" stroke-width="3"/><circle cx="362" cy="142" r="18" fill="#0c9c84"/><path d="M330 201c4-29 19-43 32-43s28 14 32 43" fill="#0c9c84"/><circle cx="407" cy="116" r="18" fill="#e5a12d"/><path d="M407 107v18m-9-9h18" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
<g transform="translate(672 468)"><rect width="456" height="265" rx="24" fill="#fff" stroke="#d6e1de"/><circle cx="34" cy="34" r="15" fill="#e5a12d"/><text x="29" y="40" font-family="Arial" font-size="16" font-weight="700" fill="#fff">4</text><path d="M68 155h320" stroke="#b9c7c4" stroke-width="4"/>${[0,1,2,3].map(i=>`<circle cx="${92+i*95}" cy="155" r="18" fill="${i===3?'#e5a12d':'#0c9c84'}"/><path d="M${92+i*95} 119v-27" stroke="#7d8b89" stroke-width="3"/><rect x="${67+i*95}" y="67" width="50" height="24" rx="12" fill="#edf2f1"/><path d="M${92+i*95} 182v25" stroke="#7d8b89" stroke-width="3"/><rect x="${61+i*95}" y="207" width="62" height="20" rx="10" fill="#dff5ef"/>`).join("")}</g></svg>`;
await sharp(Buffer.from(technical)).avif({ quality: 60, effort: 7 }).toFile(path.join(out, "metadata-enrichment-tags-entities-lineage.avif"));

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#11192d"/><stop offset="1" stop-color="#13504d"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="70" y="78" font-family="Arial" font-size="17" font-weight="700" letter-spacing="3" fill="#65ddc6">eQOURSE · AI DATA QUALITY</text><text x="70" y="192" font-family="Arial" font-size="52" font-weight="700" fill="#fff">Metadata Enrichment</text><text x="70" y="260" font-family="Arial" font-size="52" font-weight="700" fill="#65ddc6">&amp; Data Standardization</text><text x="70" y="326" font-family="Arial" font-size="22" fill="#c5d5d5">Findable · filterable · auditable</text>${[0,1,2,3].map(i=>`<rect x="760" y="${112+i*92}" width="310" height="54" rx="16" fill="#fff" opacity=".08"/><rect x="786" y="${132+i*92}" width="${130+i*24}" height="13" rx="6" fill="#65ddc6"/><circle cx="1034" cy="${139+i*92}" r="9" fill="${i===2?'#e5a12d':'#65ddc6'}"/>`).join("")}<text x="70" y="548" font-family="Arial" font-size="23" font-weight="700" fill="#fff">Language · domain · quality · source · lineage</text></svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(out, "metadata-enrichment-og.jpg"));

console.log("Rendered metadata enrichment visuals:", out);

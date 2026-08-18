import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("public/assets/ai-data/cleaning-validation/pii-detection-redaction");
await mkdir(out, { recursive: true });

await sharp("C:/Users/yobha/.codex/generated_images/019fe0dd-b370-7b12-88c6-1a7fcd6a6457/exec-346bc657-c535-4797-8e88-8763eede2984.png")
  .resize(1200, 800, { fit: "cover", position: "attention" })
  .avif({ quality: 43, effort: 7, chromaSubsampling: "4:2:0" })
  .toFile(path.join(out, "pii-detection-redaction-services-hero.avif"));

await sharp("C:/Users/yobha/.codex/generated_images/019fe0dd-b370-7b12-88c6-1a7fcd6a6457/exec-603ed1d9-5039-45d9-80d0-f803d00dc297.png")
  .resize(1000, 600, { fit: "cover", position: "attention" })
  .avif({ quality: 40, effort: 7, chromaSubsampling: "4:2:0" })
  .toFile(path.join(out, "pii-redaction-verification-review.avif"));

const technical = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" rx="34" fill="#f7faf9"/>
  <path d="M600 40v720M40 400h1120" stroke="#d7e2df" stroke-width="2"/>
  <g transform="translate(75 75)">
    <rect width="450" height="250" rx="24" fill="#fff" stroke="#d7e2df"/>
    <circle cx="35" cy="35" r="15" fill="#0c9c84"/><text x="30" y="41" font-family="Arial" font-size="16" font-weight="700" fill="#fff">1</text>
    ${[0,1,2,3,4,5,6].map((i)=>`<rect x="50" y="${68+i*22}" width="${250+(i%3)*45}" height="10" rx="5" fill="#d9e0df"/>`).join("")}
    <rect x="150" y="88" width="112" height="14" rx="4" fill="#112037"/><rect x="280" y="132" width="98" height="14" rx="4" fill="#0c9c84"/><rect x="90" y="198" width="130" height="14" rx="4" fill="#112037"/>
    <rect x="50" y="224" width="70" height="18" rx="9" fill="#def5ef"/><rect x="128" y="224" width="92" height="18" rx="9" fill="#fff0d7"/>
  </g>
  <g transform="translate(675 75)">
    <rect width="450" height="250" rx="24" fill="#fff" stroke="#d7e2df"/>
    <circle cx="35" cy="35" r="15" fill="#0c9c84"/><text x="30" y="41" font-family="Arial" font-size="16" font-weight="700" fill="#fff">2</text>
    <path d="M45 202l70-82 62 58 52-91 72 87 58-52 50 80z" fill="#e5eeeb"/>
    <circle cx="142" cy="125" r="30" fill="#d0d9d7"/><circle cx="142" cy="125" r="31" fill="#7c8a88" opacity=".46"/>
    <circle cx="303" cy="132" r="25" fill="#d0d9d7"/><circle cx="303" cy="132" r="26" fill="#7c8a88" opacity=".46"/>
    <rect x="240" y="176" width="124" height="42" rx="12" fill="#c9d7d4"/><rect x="312" y="187" width="40" height="14" rx="4" fill="#6f7c7a" opacity=".55"/>
  </g>
  <g transform="translate(75 475)">
    <rect width="450" height="250" rx="24" fill="#fff" stroke="#d7e2df"/>
    <circle cx="35" cy="35" r="15" fill="#e5a12d"/><text x="30" y="41" font-family="Arial" font-size="16" font-weight="700" fill="#fff">3</text>
    <path d="M70 64h150l38 38v118H70z" fill="#edf2f1" stroke="#bfcac8" stroke-width="2"/><path d="M220 64v42h38" fill="none" stroke="#bfcac8" stroke-width="2"/>
    ${[0,1,2,3,4].map(i=>`<rect x="94" y="${104+i*22}" width="120" height="8" rx="4" fill="#c6cfcd"/>`).join("")}
    <rect x="94" y="128" width="102" height="18" fill="#111b2e"/>
    <path d="M278 142h38m-14-14 14 14-14 14" fill="none" stroke="#e5a12d" stroke-width="4"/>
    <path d="M328 64h82l20 20v136H328z" fill="#fff4df" stroke="#e5a12d" stroke-width="2"/><path d="M348 105h58m-58 20h58m-58 20h58m-58 20h58" stroke="#a97924" stroke-width="7" stroke-linecap="round" opacity=".55"/>
    <circle cx="411" cy="207" r="21" fill="#e5a12d"/><path d="M411 195v16m0 8v2" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  </g>
  <g transform="translate(675 475)">
    <rect width="450" height="250" rx="24" fill="#fff" stroke="#d7e2df"/>
    <circle cx="35" cy="35" r="15" fill="#e5a12d"/><text x="30" y="41" font-family="Arial" font-size="16" font-weight="700" fill="#fff">4</text>
    ${[0,1,2].map(i=>`<rect x="50" y="${76+i*56}" width="105" height="34" rx="17" fill="#edf3f1" stroke="#c5d1ce"/><circle cx="72" cy="${93+i*56}" r="7" fill="#0c9c84"/><path d="M90 ${93+i*56}h44" stroke="#879492" stroke-width="6" stroke-linecap="round"/>`).join("")}
    <path d="M176 93c54 0 55 78 113 78M176 149c42 0 53 22 113 22M176 205c54 0 55-34 113-34" fill="none" stroke="#e5a12d" stroke-width="3" stroke-dasharray="8 7"/>
    <circle cx="350" cy="152" r="54" fill="#def5ef" stroke="#0c9c84" stroke-width="3"/><circle cx="350" cy="132" r="18" fill="#0c9c84"/><path d="M318 190c5-29 19-43 32-43s27 14 32 43" fill="#0c9c84"/>
    <circle cx="393" cy="106" r="18" fill="#e5a12d"/><path d="M393 96v14m0 7v1" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;
await sharp(Buffer.from(technical)).avif({ quality: 59, effort: 7 }).toFile(path.join(out, "pii-redaction-modalities-and-metadata.avif"));

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#11192d"/><stop offset="1" stop-color="#114b4c"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="70" y="82" font-family="Arial" font-size="17" font-weight="700" letter-spacing="3" fill="#64dcc5">eQOURSE · AI DATA QUALITY</text><text x="70" y="205" font-family="Arial" font-size="55" font-weight="700" fill="#fff">PII Detection</text><text x="70" y="275" font-family="Arial" font-size="55" font-weight="700" fill="#64dcc5">&amp; Redaction</text><text x="70" y="337" font-family="Arial" font-size="22" fill="#c5d5d5">Measured recall. Independent verification.</text>${[0,1,2,3,4,5].map(i=>`<rect x="730" y="${110+i*67}" width="${320-(i%2)*60}" height="18" rx="6" fill="${i===2||i===4?'#64dcc5':'#fff'}" opacity="${i===2||i===4?'.88':'.22'}"/>`).join("")}<text x="70" y="545" font-family="Arial" font-size="23" font-weight="700" fill="#fff">Direct identifiers · quasi-identifiers · metadata</text></svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(out, "pii-detection-redaction-og.jpg"));

console.log("Rendered PII redaction visuals:", out);

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("public/assets/ai-data/cleaning-validation/data-cleaning-preparation");
await mkdir(out, { recursive: true });

await sharp("C:/Users/yobha/.codex/generated_images/019fe0dd-b370-7b12-88c6-1a7fcd6a6457/exec-43751f22-f17f-4580-8451-125b3bd30a61.png")
  .resize(1200, 800, { fit: "cover", position: "attention" })
  .webp({ quality: 58, effort: 6, smartSubsample: true })
  .toFile(path.join(out, "data-cleaning-preparation-services-hero.webp"));

await sharp("C:/Users/yobha/.codex/generated_images/019fe0dd-b370-7b12-88c6-1a7fcd6a6457/exec-12ad7955-b600-46a5-8f22-f263d02c3c5d.png")
  .resize(1000, 600, { fit: "cover", position: "attention" })
  .webp({ quality: 55, effort: 6, smartSubsample: true })
  .toFile(path.join(out, "data-cleaning-change-log-review.webp"));

const styles = `<style>.h{font:700 25px Arial;fill:#17213b}.k{font:700 12px Arial;letter-spacing:1.5px;fill:#0b9e87}.t{font:500 14px Arial;fill:#607083}.s{font:700 13px Arial;fill:#26334d}.m{font:700 11px Arial;fill:#fff}.n{font:700 20px Arial;fill:#17213b}</style>`;
const frame = (body, width = 1200, height = 800, background = "#f7faf9") => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" rx="30" fill="${background}"/>${styles}${body}</svg>`;

const operations = frame(`
  <text x="52" y="55" class="k">ILLUSTRATIVE DATA PREPARATION REVIEW</text>
  <text x="52" y="92" class="h">Four repairs. One question: what changed in the data?</text>
  <g transform="translate(52 132)">
    <rect width="535" height="286" rx="22" fill="#fff" stroke="#dce6e3"/>
    <text x="24" y="38" class="s">01 · NEAR-DUPLICATE FAMILY</text>
    ${[["A-108","R. Mehta","Pune","KEEP"],["A-108","R Mehta","Pune","MERGE"],["A108","Mehta, R.","Pune","MERGE"]].map((r,i)=>`<g transform="translate(24 ${68+i*57})"><rect width="487" height="44" rx="10" fill="${i===0?'#e7f6f1':'#fff5e5'}" stroke="${i===0?'#74c8b6':'#efbd69'}"/><text x="14" y="27" class="s">${r[0]}</text><text x="105" y="27" class="t">${r[1]}</text><text x="250" y="27" class="t">${r[2]}</text><rect x="400" y="10" width="70" height="24" rx="12" fill="${i===0?'#0b9e87':'#e6a132'}"/><text x="${i===0?420:416}" y="27" class="m">${r[3]}</text></g>`).join("")}
    <text x="24" y="262" class="t">10,000 records · 23% duplicates → 7,700 unique records</text>
  </g>
  <g transform="translate(613 132)">
    <rect width="535" height="286" rx="22" fill="#fff" stroke="#dce6e3"/>
    <text x="24" y="38" class="s">02 · ENCODING + SCRIPT REPAIR</text>
    <rect x="24" y="70" width="184" height="136" rx="16" fill="#fff5e5" stroke="#efbd69"/>
    <text x="42" y="105" style="font:700 18px Arial;fill:#9a641a">cafÃ© · naÃ¯ve</text><text x="42" y="141" style="font:700 18px Arial;fill:#9a641a">à¤¨à¤®à¤¸</text><text x="42" y="177" class="t">double-decoded UTF-8</text>
    <path d="M232 138h66m-18-18 18 18-18 18" fill="none" stroke="#0b9e87" stroke-width="4"/>
    <rect x="324" y="70" width="184" height="136" rx="16" fill="#e7f6f1" stroke="#74c8b6"/>
    <text x="344" y="105" style="font:700 18px Arial;fill:#126c5d">café · naïve</text><text x="344" y="141" style="font:700 18px Arial;fill:#126c5d">नमस्ते</text><text x="344" y="177" class="t">normalised UTF-8</text>
    <text x="24" y="262" class="t">Script-aware rules preserve meaningful Indic joiners and marks</text>
  </g>
  <g transform="translate(52 444)">
    <rect width="535" height="286" rx="22" fill="#fff" stroke="#dce6e3"/>
    <text x="24" y="38" class="s">03 · FORMAT NORMALISATION</text>
    ${["01/15/24","Jan 15, 2024","2024.01.15","15-01-2024"].map((x,i)=>`<rect x="${24+(i%2)*132}" y="${70+Math.floor(i/2)*58}" width="116" height="40" rx="20" fill="#fff5e5" stroke="#efbd69"/><text x="${39+(i%2)*132}" y="${95+Math.floor(i/2)*58}" class="s">${x}</text>`).join("")}
    <path d="M286 128h54m-16-16 16 16-16 16" fill="none" stroke="#0b9e87" stroke-width="4"/>
    ${[0,1,2,3].map(i=>`<rect x="365" y="${70+i*45}" width="146" height="34" rx="17" fill="#e7f6f1" stroke="#74c8b6"/><text x="391" y="${92+i*45}" class="s">2024-01-15</text>`).join("")}
    <text x="24" y="262" class="t">Ambiguous source convention? Flagged—not guessed.</text>
  </g>
  <g transform="translate(613 444)">
    <rect width="535" height="286" rx="22" fill="#fff" stroke="#dce6e3"/>
    <text x="24" y="38" class="s">04 · DISTRIBUTION IMPACT</text>
    <path d="M36 218h460M56 218V70" fill="none" stroke="#cbd6d3" stroke-width="2"/>
    <path d="M58 210 C110 205 130 160 178 118 C220 80 265 92 305 133 C350 180 390 207 492 214" fill="none" stroke="#0b9e87" stroke-width="5"/>
    <path d="M58 214 C118 210 156 182 196 144 C240 104 286 118 326 154 C365 188 408 208 492 216" fill="none" stroke="#e6a132" stroke-width="5" stroke-dasharray="11 8"/>
    <path d="M178 118 C220 80 265 92 305 133 L326 154 C286 118 240 104 196 144Z" fill="#e6a132" opacity=".2"/>
    <circle cx="92" cy="72" r="6" fill="#0b9e87"/><text x="106" y="77" class="t">before</text><circle cx="180" cy="72" r="6" fill="#e6a132"/><text x="194" y="77" class="t">after</text>
    <text x="24" y="262" class="t">Shape changed → review the rule before proceeding</text>
  </g>`);
await sharp(Buffer.from(operations)).webp({ quality: 74, effort: 6 }).toFile(path.join(out, "data-cleaning-dedup-encoding-normalisation.webp"));

const og = frame(`<defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#11192d"/><stop offset="1" stop-color="#17494c"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="70" y="80" style="font:700 17px Arial;letter-spacing:3px;fill:#62dbc3">eQOURSE · AI DATA QUALITY</text><text x="70" y="190" style="font:700 54px Arial;fill:#fff">Data Cleaning</text><text x="70" y="255" style="font:700 54px Arial;fill:#62dbc3">&amp; Preparation</text><text x="70" y="318" style="font:500 22px Arial;fill:#c7d5d7">Every change logged. Every shift reported.</text>${[0,1,2,3,4].map(i=>`<g transform="translate(760 ${112+i*78})"><rect width="350" height="54" rx="12" fill="#fff" opacity="${.12+i*.025}"/><path d="M24 20h88m-88 16h142M205 20h98m-98 16h70" stroke="#c8d7d4" stroke-width="7" stroke-linecap="round"/><circle cx="324" cy="27" r="10" fill="${i===2?'#e6a132':'#62dbc3'}"/></g>`).join("")}<text x="70" y="535" style="font:700 24px Arial;fill:#fff">Deduplicate · repair · normalise · measure impact</text>`,1200,630,"#11192d");
await sharp(Buffer.from(og)).webp({ quality: 74, effort: 6 }).toFile(path.join(out, "data-cleaning-preparation-og.webp"));

console.log("Rendered Data Cleaning & Preparation visuals:", out);

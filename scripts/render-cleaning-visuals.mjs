import sharp from "sharp";
import { join } from "node:path";

const outputDir = join(process.cwd(), "public", "assets", "ai-data", "cleaning-validation");
const font = "font-family='Arial, Helvetica, sans-serif'";

const shell = (width, height, content, title, subtitle) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7fbfa"/><stop offset="1" stop-color="#edf7f4"/></linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#0d3a35" flood-opacity=".12"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <circle cx="${width - 80}" cy="50" r="150" fill="#21cda8" opacity=".06"/>
  <g ${font}>
    <text x="52" y="58" font-size="13" font-weight="700" letter-spacing="2" fill="#159b85">${title}</text>
    <text x="52" y="91" font-size="18" fill="#4f6470">${subtitle}</text>
    ${content}
  </g>
</svg>`;

const hero = shell(1200, 800, `
  <rect x="50" y="125" width="1100" height="610" rx="28" fill="#fff" stroke="#d4e4e0" filter="url(#shadow)"/>
  <rect x="50" y="125" width="1100" height="70" rx="28" fill="#102a37"/><rect x="50" y="168" width="1100" height="27" fill="#102a37"/>
  <circle cx="86" cy="160" r="7" fill="#ffba3a"/><circle cx="110" cy="160" r="7" fill="#31cfaa"/><circle cx="134" cy="160" r="7" fill="#d9e2e0"/>
  <text x="172" y="166" font-size="18" font-weight="700" fill="#fff">Dataset Audit Workspace</text>
  <rect x="78" y="222" width="718" height="475" rx="18" fill="#fbfdfc" stroke="#d9e6e3"/>
  <text x="104" y="258" font-size="18" font-weight="700" fill="#162638">Training records · validation queue</text>
  <rect x="104" y="280" width="666" height="44" rx="8" fill="#e9f3f1"/>
  <g font-size="13" font-weight="700" fill="#52616b"><text x="120" y="307">record_id</text><text x="240" y="307">source</text><text x="365" y="307">label</text><text x="485" y="307">split</text><text x="585" y="307">quality status</text></g>
  <g font-size="14" fill="#263746">
    <rect x="104" y="333" width="666" height="49" fill="#fff"/><text x="120" y="363">IMG-10482</text><text x="240" y="363">mobile_app</text><text x="365" y="363">pedestrian</text><text x="485" y="363">train</text><text x="585" y="363" fill="#168b76" font-weight="700">Validated</text>
    <rect x="104" y="383" width="666" height="49" fill="#fff7e7"/><text x="120" y="413">IMG-10483</text><text x="240" y="413">mobile_app</text><text x="365" y="413">pedestrain</text><text x="485" y="413">train</text><text x="585" y="413" fill="#c27800" font-weight="700">Label typo</text>
    <rect x="104" y="433" width="666" height="49" fill="#fff"/><text x="120" y="463">AUD-22017</text><text x="240" y="463">field_audio</text><text x="365" y="463">speech</text><text x="485" y="463">validation</text><text x="585" y="463" fill="#168b76" font-weight="700">Validated</text>
    <rect x="104" y="483" width="666" height="49" fill="#fff1ef"/><text x="120" y="513">TXT-08821</text><text x="240" y="513">support_chat</text><text x="365" y="513">intent:billing</text><text x="485" y="513">test</text><text x="585" y="513" fill="#b54e40" font-weight="700">PII found</text>
    <rect x="104" y="533" width="666" height="49" fill="#fff7e7"/><text x="120" y="563">IMG-10482</text><text x="240" y="563">mobile_app</text><text x="365" y="563">pedestrian</text><text x="485" y="563">test</text><text x="585" y="563" fill="#c27800" font-weight="700">Split leakage</text>
    <rect x="104" y="583" width="666" height="49" fill="#fff"/><text x="120" y="613">DOC-77104</text><text x="240" y="613">invoice_scan</text><text x="365" y="613">invoice</text><text x="485" y="613">train</text><text x="585" y="613" fill="#168b76" font-weight="700">Validated</text>
  </g>
  <g stroke="#e3ecea"><line x1="104" y1="332" x2="770" y2="332"/><line x1="104" y1="382" x2="770" y2="382"/><line x1="104" y1="432" x2="770" y2="432"/><line x1="104" y1="482" x2="770" y2="482"/><line x1="104" y1="532" x2="770" y2="532"/><line x1="104" y1="582" x2="770" y2="582"/><line x1="104" y1="632" x2="770" y2="632"/></g>
  <rect x="824" y="222" width="298" height="214" rx="18" fill="#102a37"/>
  <text x="850" y="260" font-size="16" font-weight="700" fill="#fff">Audit summary</text>
  <text x="850" y="305" font-size="34" font-weight="700" fill="#35d6b3">18,420</text><text x="850" y="329" font-size="13" fill="#a9c3c2">records scanned</text>
  <g font-size="13" fill="#d8e7e5"><text x="850" y="370">Duplicates</text><text x="1054" y="370" text-anchor="end" fill="#ffca66">284</text><text x="850" y="399">Label conflicts</text><text x="1054" y="399" text-anchor="end" fill="#ffca66">73</text></g>
  <rect x="824" y="458" width="298" height="239" rx="18" fill="#f5faf8" stroke="#d9e6e3"/>
  <text x="850" y="496" font-size="16" font-weight="700" fill="#162638">Quality change</text>
  <g font-size="13" fill="#52616b"><text x="850" y="540">Duplicate rate</text><text x="850" y="590">Invalid labels</text><text x="850" y="640">Missing fields</text></g>
  <g><rect x="850" y="551" width="204" height="8" rx="4" fill="#dde7e4"/><rect x="850" y="551" width="54" height="8" rx="4" fill="#ffb132"/><rect x="850" y="601" width="204" height="8" rx="4" fill="#dde7e4"/><rect x="850" y="601" width="31" height="8" rx="4" fill="#25b99b"/><rect x="850" y="651" width="204" height="8" rx="4" fill="#dde7e4"/><rect x="850" y="651" width="18" height="8" rx="4" fill="#25b99b"/></g>
`, "AUDIT-FIRST DATA QUALITY", "Readable synthetic records · no customer data");

const defects = shell(1200, 800, `
  <g transform="translate(48 126)">
    <rect width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="26" y="38" font-size="17" font-weight="700" fill="#162638">01 · Duplicate records</text><text x="26" y="64" font-size="13" fill="#60717c">Same normalized content appears twice</text>
    <rect x="26" y="86" width="484" height="42" rx="7" fill="#e9f3f1"/><g font-size="12" font-weight="700" fill="#52616b"><text x="42" y="112">record_id</text><text x="164" y="112">utterance</text><text x="382" y="112">label</text></g>
    <g font-size="13" fill="#283a46"><text x="42" y="157">AUD-0172</text><text x="164" y="157">“open settings”</text><text x="382" y="157">command</text><rect x="25" y="135" width="486" height="38" rx="5" fill="none" stroke="#1ab293" stroke-width="2"/><text x="42" y="201">AUD-0829</text><text x="164" y="201">“open settings”</text><text x="382" y="201">command</text><rect x="25" y="178" width="486" height="38" rx="5" fill="#25b99b" opacity=".08" stroke="#1ab293" stroke-width="2"/><text x="42" y="245">AUD-1210</text><text x="164" y="245">“close settings”</text><text x="382" y="245">command</text></g>
    <rect x="568" width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="594" y="38" font-size="17" font-weight="700" fill="#162638">02 · Mislabeled example</text><text x="594" y="64" font-size="13" fill="#60717c">Content and assigned class disagree</text>
    <rect x="594" y="88" width="484" height="154" rx="14" fill="#f8fbfa" stroke="#e0ebe8"/><text x="616" y="121" font-size="12" font-weight="700" fill="#70808a">TEXT SAMPLE</text><text x="616" y="153" font-size="16" fill="#263746">“The delivery arrived two days early.”</text><text x="616" y="193" font-size="13" fill="#70808a">Current label</text><rect x="711" y="173" width="92" height="29" rx="14" fill="#fff0ed"/><text x="757" y="193" text-anchor="middle" font-size="12" font-weight="700" fill="#b64c3f">negative</text><text x="833" y="193" font-size="18" fill="#586b74">→</text><rect x="865" y="173" width="92" height="29" rx="14" fill="#e2f7f1"/><text x="911" y="193" text-anchor="middle" font-size="12" font-weight="700" fill="#168b76">positive</text>
    <rect y="314" width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="26" y="352" font-size="17" font-weight="700" fill="#162638">03 · Train / test leakage</text><text x="26" y="378" font-size="13" fill="#60717c">The same source record exists in two splits</text>
    <g font-size="12" font-weight="700"><text x="26" y="417" fill="#159b85">TRAIN SPLIT</text><text x="294" y="417" fill="#c27800">TEST SPLIT</text></g><rect x="26" y="435" width="216" height="108" rx="10" fill="#edf8f5"/><rect x="294" y="435" width="216" height="108" rx="10" fill="#fff7e7"/><g font-size="13" fill="#2f414d"><text x="45" y="468">IMG-10482 · person</text><text x="45" y="499">IMG-10501 · bicycle</text><text x="45" y="530">IMG-10518 · vehicle</text><text x="313" y="468">IMG-10482 · person</text><text x="313" y="499">IMG-11552 · bicycle</text><text x="313" y="530">IMG-11602 · vehicle</text></g><path d="M218 465 C258 435 277 435 316 465" fill="none" stroke="#e79b20" stroke-width="2" stroke-dasharray="5 5"/>
    <rect x="568" y="314" width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="594" y="352" font-size="17" font-weight="700" fill="#162638">04 · Missing required values</text><text x="594" y="378" font-size="13" fill="#60717c">Null fields violate the delivery schema</text>
    <rect x="594" y="401" width="484" height="42" rx="7" fill="#102a37"/><g font-size="12" font-weight="700" fill="#fff"><text x="610" y="427">record_id</text><text x="730" y="427">language</text><text x="850" y="427">transcript</text><text x="1000" y="427">status</text></g>
    <g font-size="13" fill="#2f414d"><text x="610" y="471">AUD-901</text><text x="730" y="471">en-US</text><text x="850" y="471">play music</text><text x="1000" y="471" fill="#168b76">valid</text><text x="610" y="509">AUD-902</text><text x="730" y="509" fill="#b64c3f" font-weight="700">NULL</text><text x="850" y="509">call home</text><text x="1000" y="509" fill="#b64c3f">reject</text><text x="610" y="547">AUD-903</text><text x="730" y="547">hi-IN</text><text x="850" y="547" fill="#b64c3f" font-weight="700">NULL</text><text x="1000" y="547" fill="#b64c3f">review</text></g>
  </g>
`, "REAL DEFECT ATLAS", "Concrete examples make each failure pattern easy to recognize");

const validation = shell(1200, 800, `
  <g transform="translate(48 126)">
    <rect width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="26" y="38" font-size="17" font-weight="700" fill="#162638">01 · Label audit</text><text x="26" y="64" font-size="13" fill="#60717c">Measured correction queue · synthetic sample</text>
    <rect x="26" y="88" width="484" height="40" rx="7" fill="#102a37"/><g font-size="12" font-weight="700" fill="#fff"><text x="42" y="113">item</text><text x="152" y="113">current</text><text x="278" y="113">reviewed</text><text x="408" y="113">status</text></g>
    <g font-size="13" fill="#2f414d"><text x="42" y="158">IMG-204</text><text x="152" y="158">vehicle</text><text x="278" y="158">bicycle</text><text x="408" y="158" fill="#c27800">corrected</text><text x="42" y="198">IMG-319</text><text x="152" y="198">person</text><text x="278" y="198">person</text><text x="408" y="198" fill="#168b76">accepted</text><text x="42" y="238">IMG-511</text><text x="152" y="238">road</text><text x="278" y="238">—</text><text x="408" y="238" fill="#b64c3f">escalate</text></g>
    <rect x="568" width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="594" y="38" font-size="17" font-weight="700" fill="#162638">02 · Class confusion</text><text x="594" y="64" font-size="13" fill="#60717c">Systematic errors exposed by category</text>
    <g transform="translate(624 92)"><text x="130" y="-8" font-size="11" fill="#647781">PREDICTED</text><text transform="translate(-12 120) rotate(-90)" font-size="11" fill="#647781">ACTUAL</text><g font-size="12" text-anchor="middle" fill="#30444e"><text x="85" y="18">car</text><text x="165" y="18">van</text><text x="245" y="18">truck</text><text x="325" y="18">bus</text><text x="42" y="64">car</text><text x="42" y="114">van</text><text x="42" y="164">truck</text><text x="42" y="214">bus</text></g><g><rect x="60" y="30" width="50" height="38" fill="#57cdb3"/><rect x="115" y="30" width="50" height="38" fill="#edf4f2"/><rect x="170" y="30" width="50" height="38" fill="#edf4f2"/><rect x="225" y="30" width="50" height="38" fill="#edf4f2"/><rect x="60" y="80" width="50" height="38" fill="#ffe6b7"/><rect x="115" y="80" width="50" height="38" fill="#57cdb3"/><rect x="170" y="80" width="50" height="38" fill="#edf4f2"/><rect x="225" y="80" width="50" height="38" fill="#edf4f2"/><rect x="60" y="130" width="50" height="38" fill="#edf4f2"/><rect x="115" y="130" width="50" height="38" fill="#ffd27d"/><rect x="170" y="130" width="50" height="38" fill="#57cdb3"/><rect x="225" y="130" width="50" height="38" fill="#edf4f2"/><rect x="60" y="180" width="50" height="38" fill="#edf4f2"/><rect x="115" y="180" width="50" height="38" fill="#edf4f2"/><rect x="170" y="180" width="50" height="38" fill="#ffe6b7"/><rect x="225" y="180" width="50" height="38" fill="#57cdb3"/></g></g>
    <rect y="314" width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="26" y="352" font-size="17" font-weight="700" fill="#162638">03 · Split integrity</text><text x="26" y="378" font-size="13" fill="#60717c">Near-identical items crossing evaluation boundaries</text>
    <rect x="26" y="418" width="210" height="118" rx="12" fill="#e9f7f3"/><text x="45" y="449" font-size="12" font-weight="700" fill="#168b76">TRAIN · 38,240</text><text x="45" y="483" font-size="13" fill="#2f414d">IMG-10482</text><text x="45" y="512" font-size="13" fill="#2f414d">TXT-00821</text><rect x="300" y="418" width="210" height="118" rx="12" fill="#fff7e7"/><text x="319" y="449" font-size="12" font-weight="700" fill="#c27800">TEST · 4,800</text><text x="319" y="483" font-size="13" fill="#b64c3f">IMG-10482</text><text x="319" y="512" font-size="13" fill="#2f414d">TXT-11552</text><path d="M220 476 C258 440 280 440 318 476" fill="none" stroke="#e79b20" stroke-width="3" stroke-dasharray="6 5"/>
    <rect x="568" y="314" width="536" height="282" rx="22" fill="#fff" stroke="#d7e5e1" filter="url(#shadow)"/><text x="594" y="352" font-size="17" font-weight="700" fill="#162638">04 · Source verification</text><text x="594" y="378" font-size="13" fill="#60717c">Claims checked against an authoritative record</text>
    <g font-size="13"><rect x="594" y="416" width="484" height="46" rx="8" fill="#edf8f5"/><text x="612" y="445" fill="#2f414d">DOC-7731 · amount  ₹4,280</text><text x="1004" y="445" fill="#168b76" font-weight="700">verified</text><rect x="594" y="472" width="484" height="46" rx="8" fill="#fff7e7"/><text x="612" y="501" fill="#2f414d">DOC-7732 · amount  ₹9,600</text><text x="1004" y="501" fill="#c27800" font-weight="700">mismatch</text><rect x="594" y="528" width="484" height="46" rx="8" fill="#f4f8f7"/><text x="612" y="557" fill="#2f414d">DOC-7733 · source unavailable</text><text x="1004" y="557" fill="#b64c3f" font-weight="700">flagged</text></g>
  </g>
`, "VALIDATION EVIDENCE", "Label correctness, leakage and source checks · synthetic data only");

const report = shell(1000, 600, `
  <rect x="42" y="116" width="916" height="430" rx="24" fill="#fff" stroke="#d6e5e1" filter="url(#shadow)"/>
  <text x="72" y="158" font-size="19" font-weight="700" fill="#162638">Dataset quality report · pilot batch</text><text x="72" y="184" font-size="13" fill="#60717c">Synthetic example · 18,420 records checked</text>
  <rect x="72" y="210" width="560" height="45" rx="8" fill="#102a37"/><g font-size="12" font-weight="700" fill="#fff"><text x="90" y="238">defect category</text><text x="330" y="238">before</text><text x="425" y="238">after</text><text x="515" y="238">decision</text></g>
  <g font-size="13" fill="#2d404b">
    <text x="90" y="285">Exact duplicates</text><text x="330" y="285">284</text><text x="425" y="285" fill="#168b76" font-weight="700">0</text><text x="515" y="285">removed</text>
    <text x="90" y="329">Cross-split overlap</text><text x="330" y="329">51</text><text x="425" y="329" fill="#168b76" font-weight="700">0</text><text x="515" y="329">reassigned</text>
    <text x="90" y="373">Label conflicts</text><text x="330" y="373">73</text><text x="425" y="373" fill="#168b76" font-weight="700">4</text><text x="515" y="373">4 escalated</text>
    <text x="90" y="417">Missing required fields</text><text x="330" y="417">126</text><text x="425" y="417" fill="#168b76" font-weight="700">0</text><text x="515" y="417">repaired</text>
    <text x="90" y="461">PII candidates</text><text x="330" y="461">38</text><text x="425" y="461" fill="#168b76" font-weight="700">0</text><text x="515" y="461">redacted</text>
  </g><g stroke="#e1ebe8"><line x1="72" y1="265" x2="632" y2="265"/><line x1="72" y1="309" x2="632" y2="309"/><line x1="72" y1="353" x2="632" y2="353"/><line x1="72" y1="397" x2="632" y2="397"/><line x1="72" y1="441" x2="632" y2="441"/><line x1="72" y1="481" x2="632" y2="481"/></g>
  <rect x="662" y="210" width="266" height="271" rx="16" fill="#f1f8f6"/><text x="686" y="244" font-size="15" font-weight="700" fill="#162638">Change log</text>
  <g font-size="12" fill="#536873"><circle cx="690" cy="280" r="6" fill="#22b998"/><text x="707" y="284">Rule D-03 · duplicates removed</text><circle cx="690" cy="324" r="6" fill="#22b998"/><text x="707" y="328">Rule S-07 · splits corrected</text><circle cx="690" cy="368" r="6" fill="#f0a323"/><text x="707" y="372">QA-12 · labels escalated</text><circle cx="690" cy="412" r="6" fill="#22b998"/><text x="707" y="416">PII-04 · values redacted</text><circle cx="690" cy="456" r="6" fill="#22b998"/><text x="707" y="460">Schema v2.3 · validated</text></g>
  <rect x="72" y="502" width="856" height="24" rx="12" fill="#e1efeb"/><rect x="72" y="502" width="813" height="24" rx="12" fill="#24b899"/><text x="500" y="519" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">95% automated checks passed · 4 records awaiting expert decision</text>
`, "TRACEABLE QUALITY REPORT", "Before and after results, exceptions and decisions in one view");

for (const [name, svg, width, height] of [
  ["data-cleaning-validation-services-hero.webp", hero, 1200, 800],
  ["data-quality-defect-types.webp", defects, 1200, 800],
  ["data-validation-label-audit-leakage.webp", validation, 1200, 800],
  ["dataset-quality-report-review.webp", report, 1000, 600],
  ["cleaning-validation-og.webp", hero, 1200, 630],
]) {
  await sharp(Buffer.from(svg)).resize(width, height, { fit: "cover", position: "centre" }).webp({ quality: 78, effort: 6, smartSubsample: true }).toFile(join(outputDir, name));
}

import React, { useEffect, useState } from "react";

// ============================================================
// Shared
// ============================================================

function useTime(active: boolean) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number, start = performance.now();
    const loop = (now: number) => { 
      setT((now - start) / 1000); 
      raf = requestAnimationFrame(loop); 
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return t;
}

function rand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function formatTime(s: number) {
  const m = Math.floor(s / 60), r = s - m * 60;
  return `${m}:${r.toFixed(1).padStart(4, "0")}`;
}

// ============================================================
// 1. VERBATIM TRANSCRIPTION
// ============================================================
const TRANSCRIPT = [
  { t: 0.0, w: "So" }, { t: 0.30, w: "I" }, { t: 0.45, w: "was" }, { t: 0.75, w: "telling" },
  { t: 1.10, w: "her" }, { t: 1.35, w: "[uh]", filler: true }, { t: 1.70, w: "about" },
  { t: 2.05, w: "the" }, { t: 2.25, w: "new" }, { t: 2.55, w: "model" }, { t: 3.00, w: "—" },
  { t: 3.15, w: "yeah" }, { t: 3.55, w: "the" }, { t: 3.75, w: "one" }, { t: 4.05, w: "with" },
  { t: 4.40, w: "[laughter]", filler: true }, { t: 5.00, w: "better" }, { t: 5.40, w: "latency." },
];
const TRANSCRIPT_DUR = 6.4;

function TranscriptionPreview({ active }: { active: boolean }) {
  const time = useTime(active);
  const cycle = time % TRANSCRIPT_DUR;
  const idx = TRANSCRIPT.findIndex((w, i) => {
    const next = TRANSCRIPT[i + 1];
    return cycle >= w.t && (!next || cycle < next.t);
  });
  const current = TRANSCRIPT[Math.max(0, idx)];

  const bars = 64;
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <svg viewBox="0 0 800 340" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#14d4a0" />
            <stop offset="100%" stopColor="#0a8f6e" />
          </linearGradient>
          <linearGradient id="playGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#14d4a0" stopOpacity="0" />
            <stop offset="100%" stopColor="#14d4a0" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Track header */}
        <g fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#7e94b3">
          <text x="32" y="34">interview_clip_017.wav</text>
          <text x="32" y="50" fill="#14d4a0">● REC · 48 kHz · 16-bit · mono</text>
          <text x="768" y="34" textAnchor="end">{formatTime(cycle)} / {formatTime(TRANSCRIPT_DUR)}</text>
        </g>

        {/* Waveform */}
        <g transform="translate(32 78)">
          <rect x="0" y="0" width="736" height="92" rx="10" fill="#0f1d33" stroke="#1a2c47" />
          {Array.from({ length: bars }).map((_, i) => {
            const x = 16 + i * ((736 - 32) / bars);
            const phase = i / bars;
            const env = 0.45 + 0.55 * Math.abs(Math.sin(phase * 9 + cycle * 1.4)) * Math.exp(-Math.abs(phase - (cycle / TRANSCRIPT_DUR)) * 1.2 + 0.6);
            const h = 6 + env * 64 * (0.4 + 0.6 * rand(i + 1));
            const played = phase < cycle / TRANSCRIPT_DUR;
            return (
              <rect key={i} x={x} y={46 - h / 2} width="6" height={h} rx="2"
                fill={played ? "url(#waveGrad)" : "#1a2c47"} />
            );
          })}
          {/* Playhead */}
          <rect x={16 + (704) * (cycle / TRANSCRIPT_DUR) - 60} y="0" width="60" height="92" fill="url(#playGrad)" />
          <line x1={16 + 704 * (cycle / TRANSCRIPT_DUR)} y1="0" x2={16 + 704 * (cycle / TRANSCRIPT_DUR)} y2="92"
            stroke="#14d4a0" strokeWidth="2" />
          <circle cx={16 + 704 * (cycle / TRANSCRIPT_DUR)} cy="0" r="4" fill="#14d4a0" />
        </g>

        {/* Caption stream */}
        <g transform="translate(32 196)">
          <rect x="0" y="0" width="500" height="116" rx="10" fill="#0f1d33" stroke="#1a2c47" />
          <text x="16" y="22" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3" letterSpacing="0.08em">LIVE TRANSCRIPT · VERBATIM</text>
          <foreignObject x="14" y="32" width="472" height="76">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontFamily: "DM Sans, ui-sans-serif, sans-serif", fontSize: 18, color: "#e6eef7", lineHeight: 1.45, fontWeight: 500 }}>
              {TRANSCRIPT.map((w, i) => {
                const isActive = i === idx;
                const past = i < idx;
                const fill = w.filler;
                return (
                  <span key={i} style={{
                    opacity: isActive ? 1 : (past ? 0.85 : 0.35),
                    color: fill ? "#ffb866" : (isActive ? "#14d4a0" : "#e6eef7"),
                    background: isActive ? "rgba(20,212,160,0.14)" : "transparent",
                    padding: isActive ? "1px 5px" : "1px 0",
                    borderRadius: 4,
                    marginRight: 4,
                    fontStyle: fill ? "italic" : "normal",
                    transition: "all 80ms linear",
                  }}>{w.w}</span>
                );
              })}
            </div>
          </foreignObject>
        </g>

        {/* JSON sidecar */}
        <g transform="translate(548 196)" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11">
          <rect x="0" y="0" width="220" height="116" rx="10" fill="#0b1628" stroke="#1a2c47" />
          <text x="14" y="22" fill="#7e94b3" fontSize="10" letterSpacing="0.08em">SEGMENT · sample.json</text>
          <text x="14" y="44" fill="#56e0d8">{"{"}</text>
          <text x="22" y="60" fill="#7e94b3">"t":<tspan fill="#ffb866"> {current?.t.toFixed(2)}</tspan>,</text>
          <text x="22" y="76" fill="#7e94b3">"w":<tspan fill="#14d4a0"> "{current?.w}"</tspan>,</text>
          <text x="22" y="92" fill="#7e94b3">"conf":<tspan fill="#ffb866"> {(0.88 + 0.11 * rand(idx + 7)).toFixed(2)}</tspan></text>
          <text x="14" y="108" fill="#56e0d8">{"}"}</text>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// 2. SPEAKER DIARISATION
// ============================================================
const DIAR_DUR = 8;
const DIAR_SEGMENTS = [
  { s: 0, t0: 0.0, t1: 1.6, label: "Hello — quick question?" },
  { s: 1, t0: 1.4, t1: 3.4, label: "Yeah, go ahead.", overlap: true },
  { s: 2, t0: 3.2, t1: 4.0, label: "[laughter]", overlap: true },
  { s: 0, t0: 4.0, t1: 5.4, label: "When does the build ship?" },
  { s: 1, t0: 5.3, t1: 7.2, label: "Friday — if QA signs off.", overlap: true },
  { s: 2, t0: 7.0, t1: 8.0, label: "Mm-hm.", overlap: true },
];
const SPEAKERS = [
  { id: "SPK_01", name: "Aanya", color: "#14d4a0", initials: "AS" },
  { id: "SPK_02", name: "Rohit", color: "#56e0d8", initials: "RM" },
  { id: "SPK_03", name: "Priya", color: "#c5a8ff", initials: "PV" },
];

function DiarisationPreview({ active }: { active: boolean }) {
  const time = useTime(active);
  const cycle = time % DIAR_DUR;
  const playX = 180 + (560) * (cycle / DIAR_DUR);
  const activeSeg = DIAR_SEGMENTS.find(s => cycle >= s.t0 && cycle < s.t1) || DIAR_SEGMENTS[0];
  const activeSpk = SPEAKERS[activeSeg.s];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <svg viewBox="0 0 800 340" style={{ width: "100%", height: "100%", display: "block" }}>
        <g fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#7e94b3">
          <text x="32" y="34">meeting_3spk_042.rttm</text>
          <text x="32" y="50" fill="#14d4a0">● 3 speakers · overlap detected · 8.0 s window</text>
          <text x="768" y="34" textAnchor="end">t = {cycle.toFixed(2)}s</text>
        </g>

        {/* Time ruler */}
        <g transform="translate(180 76)" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="9" fill="#4b5e7c">
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 70} y1="0" x2={i * 70} y2="6" stroke="#2a3d5a" />
              <text x={i * 70} y="18" textAnchor="middle">{i}s</text>
            </g>
          ))}
        </g>

        {/* Lanes */}
        {SPEAKERS.map((spk, i) => {
          const y = 96 + i * 56;
          const segs = DIAR_SEGMENTS.filter(s => s.s === i);
          const isActive = activeSeg.s === i;
          return (
            <g key={i}>
              <g transform={`translate(32 ${y + 14})`}>
                <circle cx="18" cy="18" r="18" fill={isActive ? spk.color : "#1a2c47"}
                  opacity={isActive ? 1 : 0.6}>
                  {isActive && <animate attributeName="r" values="18;21;18" dur="0.9s" repeatCount="indefinite" />}
                </circle>
                <text x="18" y="23" textAnchor="middle" fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="13" fontWeight="700" fill={isActive ? "#0a1424" : "#7e94b3"}>{spk.initials}</text>
                <text x="44" y="14" fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="13" fontWeight="600" fill="#e6eef7">{spk.name}</text>
                <text x="44" y="29" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3">{spk.id}</text>
              </g>
              <rect x="180" y={y} width="560" height="44" rx="8" fill="#0f1d33" stroke="#1a2c47" />
              {segs.map((s, j) => {
                const x = 180 + (560) * (s.t0 / DIAR_DUR);
                const w = 560 * ((s.t1 - s.t0) / DIAR_DUR);
                const isAct = activeSeg === s;
                return (
                  <g key={j}>
                    <rect x={x} y={y + 6} width={w} height="32" rx="6"
                      fill={spk.color} opacity={isAct ? 1 : 0.45} />
                    {w > 60 && (
                      <text x={x + 8} y={y + 26} fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="11" fontWeight="600"
                        fill={isAct ? "#06281f" : "#0a1424"} opacity={isAct ? 1 : 0.9}>
                        {s.label.length > 22 ? s.label.slice(0, 21) + "…" : s.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Overlap shading */}
        <g>
          {DIAR_SEGMENTS.map((s, i) => {
            const others = DIAR_SEGMENTS.filter((o, j) => j !== i && o.t0 < s.t1 && o.t1 > s.t0);
            return others.map((o, j) => {
              const x0 = Math.max(s.t0, o.t0), x1 = Math.min(s.t1, o.t1);
              const x = 180 + 560 * (x0 / DIAR_DUR);
              const w = 560 * (x1 - x0) / DIAR_DUR;
              return <rect key={`${i}-${j}`} x={x} y="92" width={w} height="172" fill="#ffb866" opacity="0.06" />;
            });
          })}
        </g>

        {/* Playhead */}
        <line x1={playX} y1="92" x2={playX} y2="264" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
        <polygon points={`${playX - 5},88 ${playX + 5},88 ${playX},96`} fill="#ffffff" />

        {/* Footer status */}
        <g transform="translate(32 286)">
          <rect x="0" y="0" width="736" height="38" rx="8" fill="#0b1628" stroke="#1a2c47" />
          <circle cx="18" cy="19" r="6" fill={activeSpk.color}>
            <animate attributeName="opacity" values="1;0.35;1" dur="0.8s" repeatCount="indefinite" />
          </circle>
          <text x="34" y="23" fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="13" fill="#e6eef7">
            <tspan fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#7e94b3">now → </tspan>
            <tspan fontWeight="700">{activeSpk.id}</tspan>
            <tspan fill="#7e94b3"> · "{activeSeg.label}"</tspan>
          </text>
          <text x="724" y="23" textAnchor="end" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#ffb866">
            {activeSeg.overlap ? "OVERLAP" : "SINGLE"}
          </text>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// 3. PHONEME & PROSODY
// ============================================================
const PHONEME_DUR = 5.4;
const WORD_TIER = [
  { t0: 0.10, t1: 0.55, w: "the" },
  { t0: 0.55, t1: 1.20, w: "quick" },
  { t0: 1.20, t1: 1.95, w: "brown" },
  { t0: 1.95, t1: 2.45, w: "fox" },
  { t0: 2.60, t1: 3.05, w: "jumps" },
  { t0: 3.05, t1: 3.45, w: "over" },
  { t0: 3.50, t1: 3.95, w: "the" },
  { t0: 3.95, t1: 4.70, w: "lazy" },
  { t0: 4.70, t1: 5.25, w: "dog" },
];
const PHONEME_TIER = [
  { t0: 0.10, t1: 0.25, p: "ð" }, { t0: 0.25, t1: 0.55, p: "ə" },
  { t0: 0.55, t1: 0.70, p: "k" }, { t0: 0.70, t1: 0.85, p: "w" }, { t0: 0.85, t1: 1.00, p: "ɪ" }, { t0: 1.00, t1: 1.20, p: "k" },
  { t0: 1.20, t1: 1.35, p: "b" }, { t0: 1.35, t1: 1.50, p: "r" }, { t0: 1.50, t1: 1.80, p: "aʊ" }, { t0: 1.80, t1: 1.95, p: "n" },
  { t0: 1.95, t1: 2.10, p: "f" }, { t0: 2.10, t1: 2.30, p: "ɒ" }, { t0: 2.30, t1: 2.45, p: "k" }, { t0: 2.45, t1: 2.60, p: "s" },
  { t0: 2.60, t1: 2.72, p: "dʒ" }, { t0: 2.72, t1: 2.88, p: "ʌ" }, { t0: 2.88, t1: 3.00, p: "m" }, { t0: 3.00, t1: 3.05, p: "ps" },
  { t0: 3.05, t1: 3.20, p: "oʊ" }, { t0: 3.20, t1: 3.35, p: "v" }, { t0: 3.35, t1: 3.45, p: "ər" },
  { t0: 3.50, t1: 3.65, p: "ð" }, { t0: 3.65, t1: 3.95, p: "ə" },
  { t0: 3.95, t1: 4.10, p: "l" }, { t0: 4.10, t1: 4.35, p: "eɪ" }, { t0: 4.35, t1: 4.55, p: "z" }, { t0: 4.55, t1: 4.70, p: "i" },
  { t0: 4.70, t1: 4.85, p: "d" }, { t0: 4.85, t1: 5.10, p: "ɒ" }, { t0: 5.10, t1: 5.25, p: "g" },
];

function PhonemePreview({ active }: { active: boolean }) {
  const time = useTime(active);
  const cycle = time % PHONEME_DUR;
  const xOf = (t: number) => 32 + (736) * (t / PHONEME_DUR);
  const playX = xOf(cycle);

  const activeWord = WORD_TIER.find(w => cycle >= w.t0 && cycle < w.t1);
  const activePh = PHONEME_TIER.find(p => cycle >= p.t0 && cycle < p.t1) || PHONEME_TIER[0];

  const pitchPts = [];
  for (let i = 0; i <= 180; i++) {
    const t = (i / 180) * PHONEME_DUR;
    const f = 130 + 40 * Math.sin(t * 1.6) + 18 * Math.sin(t * 4.3 + 1.2) + 8 * Math.sin(t * 11);
    pitchPts.push([xOf(t), 232 - (f - 110) * 0.9]);
  }
  const pitchD = pitchPts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const currentF0 = 130 + 40 * Math.sin(cycle * 1.6) + 18 * Math.sin(cycle * 4.3 + 1.2) + 8 * Math.sin(cycle * 11);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <svg viewBox="0 0 800 340" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <linearGradient id="pitchFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#56e0d8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#56e0d8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#7e94b3">
          <text x="32" y="34">tts_corpus_109.TextGrid</text>
          <text x="32" y="50" fill="#14d4a0">● 3 tiers · word + phoneme + F0 · IPA · 16 kHz</text>
          <text x="768" y="34" textAnchor="end">t = {cycle.toFixed(2)}s</text>
        </g>

        {/* Word tier */}
        <g>
          <text x="32" y="80" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3" letterSpacing="0.08em">WORD</text>
          <rect x="32" y="86" width="736" height="34" rx="6" fill="#0f1d33" stroke="#1a2c47" />
          {WORD_TIER.map((w, i) => {
            const x = xOf(w.t0), wd = xOf(w.t1) - xOf(w.t0);
            const isAct = activeWord === w;
            return (
              <g key={i}>
                <line x1={x} y1="86" x2={x} y2="120" stroke="#1a2c47" />
                <rect x={x + 1} y="88" width={wd - 2} height="30" rx="4"
                  fill={isAct ? "#14d4a0" : "transparent"} opacity={isAct ? 0.18 : 1} />
                <text x={x + wd / 2} y="107" textAnchor="middle" fontFamily="DM Sans, ui-sans-serif, sans-serif"
                  fontSize="13" fontWeight="600" fill={isAct ? "#14d4a0" : "#e6eef7"}>{w.w}</text>
              </g>
            );
          })}
        </g>

        {/* Phoneme tier */}
        <g>
          <text x="32" y="140" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3" letterSpacing="0.08em">PHONEME · IPA</text>
          <rect x="32" y="146" width="736" height="34" rx="6" fill="#0f1d33" stroke="#1a2c47" />
          {PHONEME_TIER.map((p, i) => {
            const x = xOf(p.t0), wd = xOf(p.t1) - xOf(p.t0);
            const isAct = activePh === p;
            return (
              <g key={i}>
                <line x1={x} y1="146" x2={x} y2="180" stroke="#1a2c47" />
                <rect x={x + 0.5} y="148" width={Math.max(1, wd - 1)} height="30" rx="3"
                  fill={isAct ? "#56e0d8" : "transparent"} opacity={isAct ? 0.22 : 1} />
                {wd > 8 && (
                  <text x={x + wd / 2} y="168" textAnchor="middle" fontFamily="DM Sans, ui-sans-serif, sans-serif"
                    fontSize="13" fontWeight="500" fill={isAct ? "#56e0d8" : "#cdd9ea"}>{p.p}</text>
                )}
              </g>
            );
          })}
        </g>

        {/* Pitch contour */}
        <g>
          <text x="32" y="200" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3" letterSpacing="0.08em">F0 · PITCH (Hz)</text>
          <rect x="32" y="206" width="736" height="80" rx="6" fill="#0b1628" stroke="#1a2c47" />
          {[120, 140, 160, 180].map(hz => {
            const y = 232 - (hz - 110) * 0.9 + 26;
            return <line key={hz} x1="32" y1={y - 26} x2="768" y2={y - 26} stroke="#1a2c47" strokeDasharray="2 4" />;
          })}
          <path d={pitchD + ` L ${xOf(PHONEME_DUR)} 286 L 32 286 Z`} fill="url(#pitchFill)" />
          <path d={pitchD} fill="none" stroke="#56e0d8" strokeWidth="2" />
          <circle cx={playX} cy={232 - (currentF0 - 110) * 0.9} r="4" fill="#ffb866" />
        </g>

        <line x1={playX} y1="86" x2={playX} y2="286" stroke="#ffffff" strokeWidth="1" opacity="0.7" />

        {/* Inspector */}
        <g transform="translate(32 296)">
          <rect x="0" y="0" width="380" height="34" rx="6" fill="#0b1628" stroke="#1a2c47" />
          <text x="14" y="22" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="12" fill="#7e94b3">
            phon: <tspan fill="#56e0d8" fontWeight="600">"{activePh.p}"</tspan>
            <tspan dx="14">dur: <tspan fill="#ffb866">{((activePh.t1 - activePh.t0) * 1000).toFixed(0)}ms</tspan></tspan>
            <tspan dx="14">F0: <tspan fill="#14d4a0">{currentF0.toFixed(0)}Hz</tspan></tspan>
          </text>
        </g>
        <g transform="translate(420 296)">
          <rect x="0" y="0" width="348" height="34" rx="6" fill="#0b1628" stroke="#1a2c47" />
          <text x="14" y="22" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="12" fill="#7e94b3">
            word: <tspan fill="#14d4a0" fontWeight="600">"{activeWord?.w ?? "—"}"</tspan>
            <tspan dx="14">tier: <tspan fill="#cdd9ea">word + phoneme + F0</tspan></tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// 4. EMOTION & TONE
// ============================================================
const EMOT_DUR = 9;
const EMOT_TRAJ = [
  { t: 0.0, e: "neutral",    v:  0.05, a: 0.18, color: "#7e94b3" },
  { t: 1.6, e: "confused",   v: -0.20, a: 0.45, color: "#c5a8ff" },
  { t: 3.4, e: "frustrated", v: -0.65, a: 0.78, color: "#ff8e8e" },
  { t: 5.0, e: "frustrated", v: -0.55, a: 0.82, color: "#ff8e8e" },
  { t: 6.6, e: "relieved",   v:  0.38, a: 0.35, color: "#56e0d8" },
  { t: 8.0, e: "happy",      v:  0.72, a: 0.55, color: "#14d4a0" },
  { t: 9.0, e: "happy",      v:  0.75, a: 0.50, color: "#14d4a0" },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function interpTraj(cycle: number) {
  for (let i = 0; i < EMOT_TRAJ.length - 1; i++) {
    const a = EMOT_TRAJ[i], b = EMOT_TRAJ[i + 1];
    if (cycle >= a.t && cycle <= b.t) {
      const k = (cycle - a.t) / (b.t - a.t);
      return { v: lerp(a.v, b.v, k), a: lerp(a.a, b.a, k), label: k < 0.5 ? a.e : b.e, color: k < 0.5 ? a.color : b.color };
    }
  }
  return { v: 0, a: 0, label: "neutral", color: "#7e94b3" };
}

function EmotionPreview({ active }: { active: boolean }) {
  const time = useTime(active);
  const cycle = time % EMOT_DUR;
  const now = interpTraj(cycle);

  const plotX = 32, plotY = 76, plotW = 280, plotH = 220;
  const vx = (v: number) => plotX + (v + 1) / 2 * plotW;
  const ay = (a: number) => plotY + plotH - a * plotH;

  const tracePts = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * cycle;
    const s = interpTraj(t);
    tracePts.push([vx(s.v), ay(s.a)]);
  }
  const traceD = tracePts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <svg viewBox="0 0 800 340" style={{ width: "100%", height: "100%", display: "block" }}>
        <g fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="11" fill="#7e94b3">
          <text x="32" y="34">support_call_088.json</text>
          <text x="32" y="50" fill="#14d4a0">● valence × arousal · 5-class emotion · per segment</text>
          <text x="768" y="34" textAnchor="end">t = {cycle.toFixed(2)}s</text>
        </g>

        {/* Plot */}
        <g>
          <rect x={plotX} y={plotY} width={plotW} height={plotH} rx="10" fill="#0f1d33" stroke="#1a2c47" />
          <text x={plotX + 10} y={plotY + 18} fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="10" fill="#ff8e8e" fontWeight="600">ANGRY ↑</text>
          <text x={plotX + plotW - 10} y={plotY + 18} textAnchor="end" fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="10" fill="#14d4a0" fontWeight="600">↑ HAPPY</text>
          <text x={plotX + 10} y={plotY + plotH - 8} fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="10" fill="#c5a8ff" fontWeight="600">SAD ↓</text>
          <text x={plotX + plotW - 10} y={plotY + plotH - 8} textAnchor="end" fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="10" fill="#56e0d8" fontWeight="600">↓ CALM</text>
          
          <line x1={plotX + plotW / 2} y1={plotY + 6} x2={plotX + plotW / 2} y2={plotY + plotH - 6} stroke="#1a2c47" />
          <line x1={plotX + 6} y1={plotY + plotH / 2} x2={plotX + plotW - 6} y2={plotY + plotH / 2} stroke="#1a2c47" />
          <text x={plotX + plotW / 2} y={plotY + plotH + 14} textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="9" fill="#4b5e7c">valence →</text>
          <text x={plotX - 4} y={plotY + plotH / 2} textAnchor="end" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="9" fill="#4b5e7c" transform={`rotate(-90 ${plotX - 4} ${plotY + plotH / 2})`}>arousal →</text>
          
          <path d={traceD} fill="none" stroke={now.color} strokeWidth="2" opacity="0.55" />
          {EMOT_TRAJ.filter(p => p.t <= cycle).map((p, i) => (
            <circle key={i} cx={vx(p.v)} cy={ay(p.a)} r="3" fill={p.color} opacity="0.6" />
          ))}
          <circle cx={vx(now.v)} cy={ay(now.a)} r="11" fill={now.color} opacity="0.18">
            {active && <animate attributeName="r" values="11;16;11" dur="1.2s" repeatCount="indefinite" />}
          </circle>
          <circle cx={vx(now.v)} cy={ay(now.a)} r="6" fill={now.color} stroke="#0a1424" strokeWidth="2" />
        </g>

        {/* Right column */}
        <g transform="translate(332 76)">
          <text x="0" y="12" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3" letterSpacing="0.08em">SEGMENT TIMELINE</text>
          <rect x="0" y="22" width="436" height="64" rx="8" fill="#0f1d33" stroke="#1a2c47" />
          {EMOT_TRAJ.slice(0, -1).map((seg, i) => {
            const next = EMOT_TRAJ[i + 1];
            const x = (seg.t / EMOT_DUR) * 436;
            const w = ((next.t - seg.t) / EMOT_DUR) * 436;
            const isAct = cycle >= seg.t && cycle < next.t;
            return (
              <g key={i}>
                <rect x={x + 2} y="30" width={w - 4} height="48" rx="6" fill={seg.color}
                  opacity={isAct ? 0.9 : 0.32} />
                {w > 38 && (
                  <text x={x + w / 2} y="58" textAnchor="middle" fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="11"
                    fontWeight="700" fill={isAct ? "#06281f" : "#0a1424"}>{seg.e.toUpperCase()}</text>
                )}
                {w > 50 && (
                  <text x={x + w / 2} y="72" textAnchor="middle" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="9"
                    fill="#06281f" opacity={isAct ? 0.7 : 0.55}>{seg.t.toFixed(1)}–{next.t.toFixed(1)}s</text>
                )}
              </g>
            );
          })}
          <line x1={(cycle / EMOT_DUR) * 436} y1="22" x2={(cycle / EMOT_DUR) * 436} y2="86"
            stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />

          {/* Readout card */}
          <g transform="translate(0 104)">
            <rect x="0" y="0" width="436" height="116" rx="10" fill="#0b1628" stroke="#1a2c47" />
            <text x="16" y="22" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3" letterSpacing="0.08em">LIVE READOUT</text>
            <circle cx="26" cy="50" r="8" fill={now.color}>
              {active && <animate attributeName="opacity" values="1;0.4;1" dur="0.9s" repeatCount="indefinite" />}
            </circle>
            <text x="44" y="55" fontFamily="DM Sans, ui-sans-serif, sans-serif" fontSize="22" fontWeight="700" fill={now.color} style={{ textTransform: "uppercase" }}>{now.label}</text>

            <g transform="translate(16 70)">
              <text x="0" y="10" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3">valence</text>
              <rect x="80" y="0" width="320" height="10" rx="5" fill="#0a1424" />
              <line x1="240" y1="-2" x2="240" y2="12" stroke="#1a2c47" />
              <rect x={now.v >= 0 ? 240 : 240 + now.v * 160} y="0" width={Math.abs(now.v) * 160} height="10" rx="5"
                fill={now.v >= 0 ? "#14d4a0" : "#ff8e8e"} />
              <text x="404" y="10" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#cdd9ea">{now.v.toFixed(2)}</text>

              <text x="0" y="32" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#7e94b3">arousal</text>
              <rect x="80" y="22" width="320" height="10" rx="5" fill="#0a1424" />
              <rect x="80" y="22" width={now.a * 320} height="10" rx="5" fill="#ffb866" />
              <text x="404" y="32" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="10" fill="#cdd9ea">{now.a.toFixed(2)}</text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// Dispatcher
// ============================================================
export function AudioInteractiveThumbnail({ sampleId, active }: { sampleId: string; active: boolean }) {
  const map: Record<string, React.FC<{ active: boolean }>> = {
    verbatim: TranscriptionPreview,
    diarisation: DiarisationPreview,
    phoneme: PhonemePreview,
    emotion: EmotionPreview,
  };
  const C = map[sampleId] || TranscriptionPreview;
  return <C active={active} />;
}

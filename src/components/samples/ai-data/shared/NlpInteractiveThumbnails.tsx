import React, { useEffect, useState, useRef, useCallback } from "react";

// ============================================================
// Shared
// ============================================================

const ENTITY_COLORS: Record<string, string> = {
  PERSON: "#34d399",
  ORG:    "#60a5fa",
  LOC:    "#fbbf24",
  DATE:   "#f472b6",
  AMOUNT: "#a78bfa",
  PRODUCT:"#fb7185",
};

// Idle auto-demo: if user hasn't interacted in N ms, trigger something themselves.
function useIdleDemo(active: boolean, delay: number, fn: () => void, deps: any[] = []) {
  const lastInteractRef = useRef(Date.now());
  const touch = useCallback(() => { lastInteractRef.current = Date.now(); }, []);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      if (Date.now() - lastInteractRef.current > delay) {
        fn();
        lastInteractRef.current = Date.now();
      }
    }, 1200);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, delay, ...deps]);
  return touch;
}

// Shared button style
function pillBtn(active: boolean) {
  return {
    padding: "5px 10px",
    borderRadius: 999,
    background: active ? "rgba(52,211,153,0.16)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${active ? "#34d39980" : "rgba(148,163,184,0.25)"}`,
    color: active ? "#34d399" : "#cbd5e1",
    fontSize: 11,
    cursor: "pointer",
    fontFamily: "ui-sans-serif, system-ui",
    transition: "all 180ms",
    fontWeight: 600,
  };
}

// ============================================================
// 1. NER — interactive scanner
// ============================================================

const NER_EXAMPLES = [
  {
    flag: "🇬🇧",
    label: "English",
    tokens: [
      { txt: "Aarav",   tag: "PERSON" },
      { txt: "joined",  tag: null },
      { txt: "Infosys", tag: "ORG" },
      { txt: "in",      tag: null },
      { txt: "Bengaluru", tag: "LOC" },
      { txt: "on",      tag: null },
      { txt: "12 Mar 2026",  tag: "DATE" },
      { txt: ".",       tag: null },
    ],
  },
  {
    flag: "🇮🇳",
    label: "Hindi",
    tokens: [
      { txt: "रोहन",   tag: "PERSON" },
      { txt: "ने",     tag: null },
      { txt: "टाटा",   tag: "ORG" },
      { txt: "से",     tag: null },
      { txt: "नई",     tag: null },
      { txt: "मुंबई",  tag: "LOC" },
      { txt: "में",    tag: null },
      { txt: "₹50,000", tag: "AMOUNT" },
      { txt: "का",     tag: null },
      { txt: "लैपटॉप", tag: "PRODUCT" },
      { txt: "खरीदा",  tag: null },
      { txt: ".",      tag: null },
    ],
  },
  {
    flag: "🌐",
    label: "Hinglish",
    tokens: [
      { txt: "Maine",  tag: null },
      { txt: "Amazon", tag: "ORG" },
      { txt: "se",     tag: null },
      { txt: "iPhone 15", tag: "PRODUCT" },
      { txt: "order",  tag: null },
      { txt: "kiya",   tag: null },
      { txt: "₹79,900", tag: "AMOUNT" },
      { txt: "mein",   tag: null },
      { txt: ".",      tag: null },
    ],
  },
];

function NerThumb({ active }: { active: boolean }) {
  const [exIdx, setExIdx] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [scanning, setScanning] = useState(false);
  const ex = NER_EXAMPLES[exIdx];

  const reset = useCallback((i: number) => {
    setExIdx(i);
    setRevealed(new Set());
    setScanning(false);
  }, []);

  const toggleToken = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const scan = () => {
    setRevealed(new Set());
    setScanning(true);
    ex.tokens.forEach((tok, i) => {
      if (tok.tag) {
        setTimeout(() => {
          setRevealed((prev) => new Set([...prev, i]));
        }, 300 + i * 220);
      }
    });
    setTimeout(() => setScanning(false), 300 + ex.tokens.length * 220 + 300);
  };

  // Auto-demo
  const touch = useIdleDemo(active, 5000, () => {
    if (revealed.size === 0) scan();
    else reset((exIdx + 1) % NER_EXAMPLES.length);
  }, [revealed.size, exIdx]);

  useEffect(() => {
    if (active && revealed.size === 0 && !scanning) {
      const id = setTimeout(() => scan(), 800);
      return () => clearTimeout(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exIdx, active]);

  return (
    <div onMouseMove={touch} style={{ width: "100%", height: "100%", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {NER_EXAMPLES.map((e, i) => (
            <button key={i} onClick={() => { touch(); reset(i); }} style={pillBtn(i === exIdx)}>
              <span style={{ marginRight: 4 }}>{e.flag}</span>{e.label}
            </button>
          ))}
        </div>
        <button onClick={() => { touch(); scan(); }} disabled={scanning} style={{
          ...pillBtn(false),
          background: scanning ? "rgba(52,211,153,0.18)" : "rgba(52,211,153,0.12)",
          borderColor: "#34d39966", color: "#34d399",
          fontWeight: 700,
          opacity: scanning ? 0.6 : 1,
        }}>
          {scanning ? "Scanning…" : "▶ Auto-tag"}
        </button>
      </div>

      <div style={{
        flex: 1,
        background: "rgba(15,23,42,0.45)",
        border: "1px solid rgba(71,85,105,0.4)",
        borderRadius: 10,
        padding: "14px 16px",
        display: "flex", flexWrap: "wrap", gap: "10px 8px", alignItems: "flex-start", alignContent: "flex-start",
        lineHeight: 1.9,
        position: "relative",
      }}>
        {ex.tokens.map((tok, i) => {
          const isEntity = !!tok.tag;
          const shown = revealed.has(i);
          const color = isEntity && tok.tag ? ENTITY_COLORS[tok.tag] : null;
          return (
            <span key={`${exIdx}-${i}`} onClick={() => isEntity && (touch(), toggleToken(i))}
              style={{
                position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "flex-start",
                cursor: isEntity ? "pointer" : "default",
              }}>
              <span style={{
                color: isEntity ? "#f8fafc" : "#cbd5e1",
                background: shown ? `${color}26` : (isEntity ? "rgba(148,163,184,0.06)" : "transparent"),
                border: shown ? `1px solid ${color}90` : (isEntity ? "1px dashed rgba(148,163,184,0.35)" : "1px solid transparent"),
                padding: isEntity ? "2px 8px" : "2px 0",
                borderRadius: 6,
                transition: "all 200ms ease",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 15,
                fontWeight: shown ? 700 : 500,
              }}>
                {tok.txt}
              </span>
              <span style={{
                fontSize: 9, letterSpacing: 0.6,
                color: color || "transparent",
                marginTop: 3, fontWeight: 700,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(-4px)",
                transition: "all 240ms ease",
                height: 11,
              }}>
                {tok.tag || "—"}
              </span>
            </span>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {Object.entries(ENTITY_COLORS).map(([k, c]) => (
          <span key={k} style={{
            fontSize: 9, letterSpacing: 0.4,
            padding: "3px 7px",
            borderRadius: 999,
            background: `${c}1a`,
            color: c,
            fontWeight: 700,
            border: `1px solid ${c}33`,
          }}>{k}</span>
        ))}
        <span style={{ fontSize: 10, color: "rgba(148,163,184,0.7)", marginLeft: "auto", alignSelf: "center", fontFamily: "ui-monospace, monospace" }}>
          tap a word ↑
        </span>
      </div>
    </div>
  );
}

// ============================================================
// 2. Sentiment — emoji morphs, polarity dial, click reviews
// ============================================================

const REVIEWS = [
  { txt: "Best phone I've ever owned, battery lasts 2 days!", score: 0.93, aspect: "battery", emoji: "love" },
  { txt: "Camera is just okay. Nothing special tbh.", score: 0.05, aspect: "camera", emoji: "neutral" },
  { txt: "Screen cracked in a week. Terrible build quality.", score: -0.82, aspect: "screen", emoji: "sad" },
  { txt: "Delivery was super fast 🚀 will order again", score: 0.78, aspect: "delivery", emoji: "happy" },
];

function EmojiFace({ score, size = 96 }: { score: number, size?: number }) {
  // morph between sad (-1) and happy (+1)
  const cx = size / 2, cy = size / 2;
  const eyeY = cy - size * 0.12;
  const mouthY = cy + size * 0.16;
  // mouth curve: control point Y inverts with score
  const mouthCpY = mouthY + score * size * 0.22;
  const mouthD = `M ${cx - size * 0.22} ${mouthY} Q ${cx} ${mouthCpY} ${cx + size * 0.22} ${mouthY}`;
  // color
  let color = "#fbbf24";
  if (score > 0.3) color = "#34d399";
  else if (score < -0.3) color = "#fb7185";

  // eyebrow tilt
  const browTilt = -score * 4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: `drop-shadow(0 4px 14px ${color}44)` }}>
      <circle cx={cx} cy={cy} r={size * 0.42} fill={`${color}22`} stroke={color} strokeWidth="2" />
      {/* eyebrows */}
      <line x1={cx - size * 0.22} y1={eyeY - 10 + browTilt} x2={cx - size * 0.08} y2={eyeY - 10 - browTilt} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1={cx + size * 0.08} y1={eyeY - 10 - browTilt} x2={cx + size * 0.22} y2={eyeY - 10 + browTilt} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* eyes */}
      <circle cx={cx - size * 0.15} cy={eyeY} r="3.5" fill={color} />
      <circle cx={cx + size * 0.15} cy={eyeY} r="3.5" fill={color} />
      {/* mouth */}
      <path d={mouthD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SentimentThumb({ active }: { active: boolean }) {
  const [selected, setSelected] = useState(0);
  const r = REVIEWS[selected];
  // animate score from 0 toward target
  const [score, setScore] = useState(REVIEWS[0].score);
  
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const startVal = score;
    const targetVal = r.score;
    const duration = 600;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setScore(startVal + (targetVal - startVal) * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const touch = useIdleDemo(active, 4500, () => {
    setSelected((s) => (s + 1) % REVIEWS.length);
  }, [selected]);

  // Bar geometry
  const barColor = score > 0.3 ? "#34d399" : score < -0.3 ? "#fb7185" : "#fbbf24";

  return (
    <div onMouseMove={touch} style={{ width: "100%", height: "100%", padding: "14px 18px", display: "flex", gap: 18 }}>
      {/* Left: emoji + dial */}
      <div style={{ width: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <EmojiFace score={score} size={96} />
        {/* polarity bar */}
        <div style={{ width: "100%", position: "relative" }}>
          <div style={{
            height: 8, borderRadius: 4,
            background: "linear-gradient(90deg, #fb7185 0%, #fbbf24 50%, #34d399 100%)",
            opacity: 0.4,
          }}/>
          <div style={{
            position: "absolute", top: -3, left: `calc(${((score + 1) / 2) * 100}% - 7px)`,
            width: 14, height: 14, borderRadius: "50%",
            background: barColor,
            border: "2px solid #0a0f1e",
            boxShadow: `0 0 12px ${barColor}aa`,
            transition: "left 220ms ease",
          }}/>
        </div>
        <div style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: barColor, fontWeight: 700, letterSpacing: 0.5 }}>
          {score > 0 ? "+" : ""}{score.toFixed(2)}
        </div>
      </div>

      {/* Right: review cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <div style={{ fontSize: 10, letterSpacing: 1.4, color: "rgba(148,163,184,0.7)", fontFamily: "ui-monospace, monospace", marginBottom: 2 }}>
          TAP A REVIEW →
        </div>
        {REVIEWS.map((rev, i) => {
          const isSel = i === selected;
          const c = rev.score > 0.3 ? "#34d399" : rev.score < -0.3 ? "#fb7185" : "#fbbf24";
          return (
            <button key={i} onClick={() => { touch(); setSelected(i); }} style={{
              textAlign: "left",
              padding: "8px 12px",
              borderRadius: 8,
              background: isSel ? `${c}1a` : "rgba(15,23,42,0.45)",
              border: `1px solid ${isSel ? c : "rgba(71,85,105,0.4)"}`,
              cursor: "pointer",
              color: isSel ? "#f8fafc" : "#cbd5e1",
              fontSize: 12,
              fontFamily: "ui-sans-serif, system-ui",
              transition: "all 180ms ease",
              display: "flex", alignItems: "center", gap: 8,
              boxShadow: isSel ? `0 0 12px ${c}33` : "none",
            }}>
              <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {rev.txt}
              </span>
              <span style={{
                fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                background: `${c}26`, color: c, letterSpacing: 0.4,
                fontFamily: "ui-monospace, monospace",
              }}>{rev.aspect}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// 3. Intent — paper plane routes to bucket
// ============================================================

const INTENT_MESSAGES = [
  { txt: "Where is my order #4421?",        hit: 0, conf: 0.96 },
  { txt: "I want to return this saree 😔", hit: 1, conf: 0.92 },
  { txt: "Reset my password please",        hit: 2, conf: 0.94 },
  { txt: "EMI option for ₹50,000 ?",        hit: 3, conf: 0.88 },
];
const INTENT_BUCKETS = [
  { label: "Track",  emoji: "📦", color: "#34d399" },
  { label: "Return", emoji: "🔁", color: "#f472b6" },
  { label: "Login",  emoji: "🔐", color: "#fbbf24" },
  { label: "Pay",    emoji: "💳", color: "#60a5fa" },
];

function IntentThumb({ active }: { active: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [arrived, setArrived] = useState(false);
  const m = selected !== null ? INTENT_MESSAGES[selected] : null;

  const pick = (i: number) => {
    setSelected(i);
    setProgress(0);
    setArrived(false);
  };

  useEffect(() => {
    if (selected === null) return;
    setArrived(false);
    let raf: number;
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      setProgress(k);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setArrived(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [selected]);

  const touch = useIdleDemo(active, 4500, () => {
    pick(selected === null ? 0 : (selected + 1) % INTENT_MESSAGES.length);
  }, [selected]);

  // plane position
  const targetX = m ? (m.hit + 0.5) * (100 / INTENT_BUCKETS.length) : 50;
  const planeXpc = 50 + (targetX - 50) * progress;
  const planeYpc = progress * 100;
  const planeRotate = m ? ((targetX - 50) * 0.9) : 0; // tilt toward target

  return (
    <div onMouseMove={touch} style={{ width: "100%", height: "100%", padding: "12px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 10, letterSpacing: 1.4, color: "rgba(148,163,184,0.7)", fontFamily: "ui-monospace, monospace" }}>
        TAP A MESSAGE — WATCH IT ROUTE
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {INTENT_MESSAGES.map((msg, i) => (
          <button key={i} onClick={() => { touch(); pick(i); }} style={{
            textAlign: "left",
            padding: "7px 11px",
            borderRadius: 8,
            background: selected === i ? "rgba(52,211,153,0.14)" : "rgba(15,23,42,0.45)",
            border: `1px solid ${selected === i ? "#34d39988" : "rgba(71,85,105,0.4)"}`,
            color: "#e2e8f0",
            fontSize: 12,
            cursor: "pointer",
            transition: "all 180ms ease",
            fontFamily: "ui-sans-serif, system-ui",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            <span style={{ color: "#64748b", marginRight: 5 }}>›</span>{msg.txt}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", flex: 1, minHeight: 100 }}>
        {/* Plane */}
        {m && (
          <div style={{
            position: "absolute",
            top: 0, left: `${planeXpc}%`,
            transform: `translate(-50%, ${planeYpc * 0.55}px) rotate(${planeRotate}deg)`,
            transition: "none",
            fontSize: 22,
            opacity: arrived ? 0 : 1,
            filter: "drop-shadow(0 2px 6px rgba(52,211,153,0.5))",
          }}>
            ✈️
          </div>
        )}

        {/* Buckets */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", gap: 8 }}>
          {INTENT_BUCKETS.map((b, i) => {
            const hit = m && i === m.hit && arrived;
            return (
              <div key={i} style={{
                flex: 1,
                padding: "10px 8px 8px",
                borderRadius: 10,
                background: hit ? `${b.color}26` : "rgba(15,23,42,0.55)",
                border: `1px solid ${hit ? b.color : "rgba(71,85,105,0.4)"}`,
                textAlign: "center",
                transition: "all 220ms ease",
                boxShadow: hit ? `0 0 18px ${b.color}66` : "none",
                transform: hit ? "translateY(-3px)" : "none",
              }}>
                <div style={{ fontSize: 22, lineHeight: 1 }}>{b.emoji}</div>
                <div style={{
                  fontSize: 10, fontFamily: "ui-monospace, monospace",
                  fontWeight: 700, marginTop: 4,
                  color: hit ? b.color : "#94a3b8",
                  letterSpacing: 0.6,
                }}>{b.label.toUpperCase()}</div>
                {hit && (
                  <div style={{
                    marginTop: 5, height: 4, borderRadius: 2,
                    background: "rgba(15,23,42,0.7)", overflow: "hidden",
                  }}>
                    <div style={{
                      width: m ? `${m.conf * 100}%` : "0%", height: "100%",
                      background: b.color,
                      transition: "width 500ms ease",
                    }}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. Relation — interactive knowledge graph
// ============================================================

const RELATION_DATA = {
  nodes: [
    { id: "sundar",  label: "Sundar Pichai",  type: "PERSON", color: "#34d399", x: 70,  y: 38 },
    { id: "google",  label: "Google",         type: "COMPANY",color: "#60a5fa", x: 330, y: 38 },
    { id: "alphabet",label: "Alphabet Inc.",  type: "COMPANY",color: "#60a5fa", x: 330, y: 122 },
    { id: "mtv",     label: "Mountain View",  type: "PLACE",  color: "#fbbf24", x: 70,  y: 122 },
  ],
  edges: [
    { from: "sundar",   to: "google",   label: "CEO OF",       color: "#a78bfa" },
    { from: "google",   to: "alphabet", label: "SUBSIDIARY OF",color: "#f472b6" },
    { from: "google",   to: "mtv",      label: "HQ IN",        color: "#34d399" },
    { from: "sundar",   to: "mtv",      label: "WORKS IN",     color: "#fbbf24" },
  ],
};

function RelationThumb({ active }: { active: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const { nodes, edges } = RELATION_DATA;

  const touch = useIdleDemo(active, 4500, () => {
    setHovered((h) => {
      const ids = nodes.map((n) => n.id);
      const cur = ids.indexOf(h || "");
      return ids[(cur + 1) % ids.length];
    });
  }, [hovered]);

  // Edges that touch hovered node
  const relevantEdges = (eid: any) => {
    if (!hovered) return true;
    return eid.from === hovered || eid.to === hovered;
  };

  return (
    <div onMouseMove={touch} style={{ width: "100%", height: "100%", padding: "12px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 1.4, color: "rgba(148,163,184,0.7)", fontFamily: "ui-monospace, monospace" }}>
          TAP AN ENTITY — SEE ITS CONNECTIONS
        </div>
        {hovered && (
          <button onClick={() => { touch(); setHovered(null); }} style={{
            ...pillBtn(false), fontSize: 10, padding: "3px 9px",
          }}>Reset</button>
        )}
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <svg viewBox="0 0 400 160"
             preserveAspectRatio="xMidYMid meet"
             style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#cbd5e1" />
            </marker>
          </defs>
          {edges.map((e, i) => {
            const a = nodes.find((n) => n.id === e.from);
            const b = nodes.find((n) => n.id === e.to);
            if (!a || !b) return null;
            const active2 = relevantEdges(e);
            const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
            const ux = dx / len, uy = dy / len;
            const pad = 32;
            const x1 = a.x + ux * pad, y1 = a.y + uy * pad;
            const x2 = b.x - ux * pad, y2 = b.y - uy * pad;
            const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
            return (
              <g key={i} opacity={active2 ? 1 : 0.18} style={{ transition: "opacity 220ms" }}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={e.color} strokeWidth="1.6" strokeDasharray={active2 ? "0" : "3 3"}
                      markerEnd="url(#arr2)" />
                <g transform={`translate(${mx}, ${my})`}>
                  <rect x={-e.label.length * 3.2} y="-7" width={e.label.length * 6.4} height="14" rx="7"
                        fill="#0a0f1e" stroke={e.color} strokeWidth="1" />
                  <text x="0" y="3" fontSize="8.5" fontFamily="ui-monospace, monospace"
                        fontWeight="700" fill={e.color} textAnchor="middle" letterSpacing="0.4">
                    {e.label}
                  </text>
                </g>
              </g>
            );
          })}
          {nodes.map((n) => {
            const isHov = hovered === n.id;
            return (
              <g key={n.id} style={{ cursor: "pointer" }}
                 onClick={() => { touch(); setHovered(isHov ? null : n.id); }}>
                <circle cx={n.x} cy={n.y} r={isHov ? 28 : 25}
                        fill={isHov ? `${n.color}33` : `${n.color}1a`}
                        stroke={n.color} strokeWidth={isHov ? 2.5 : 1.5}
                        style={{ transition: "all 180ms" }} />
                <text x={n.x} y={n.y - 2} fontSize="8.5" fontFamily="ui-monospace, monospace"
                      fontWeight="700" fill={n.color} textAnchor="middle">
                  {n.type}
                </text>
                <text x={n.x} y={n.y + 10} fontSize="9.5" fontFamily="ui-sans-serif, system-ui"
                      fill="#f1f5f9" textAnchor="middle" fontWeight="600">
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ============================================================
// 5. Coreference — click a pronoun, see who it refers to
// ============================================================

const COREF_TOKENS = [
  { txt: "Priya",    chain: 0, kind: "ent", y: 0, x: 22 },
  { txt: "told",     chain: null, y: 0, x: 84 },
  { txt: "Raj",      chain: 1, kind: "ent", y: 0, x: 130 },
  { txt: "that",     chain: null, y: 0, x: 170 },
  { txt: "she",      chain: 0, kind: "pro", y: 0, x: 210 },
  { txt: "would",    chain: null, y: 0, x: 240 },
  { txt: "meet",     chain: null, y: 0, x: 278 },
  { txt: "him",      chain: 1, kind: "pro", y: 0, x: 316 },
  { txt: "at",       chain: null, y: 1, x: 22 },
  { txt: "the office", chain: 2, kind: "ent", y: 1, x: 50 },
  { txt: ".",        chain: null, y: 1, x: 126 },
  { txt: "Her",      chain: 0, kind: "pro", y: 1, x: 146 },
  { txt: "team",     chain: null, y: 1, x: 184 },
  { txt: "joined",   chain: null, y: 1, x: 226 },
  { txt: "them",     chain: 3, kind: "ent", y: 1, x: 280 },
  { txt: "there",    chain: 2, kind: "pro", y: 1, x: 320 },
];
const CHAIN_COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f472b6"];

function CoreferenceThumb({ active }: { active: boolean }) {
  // Set of revealed pronouns (indices in COREF_TOKENS)
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const togglePronoun = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  const reset = () => setRevealed(new Set());
  const revealAll = () => {
    const all = new Set<number>();
    COREF_TOKENS.forEach((tok, i) => { if (tok.kind === "pro") all.add(i); });
    setRevealed(all);
  };

  const touch = useIdleDemo(active, 4200, () => {
    // step: reveal next pronoun, or reset if all shown
    const pronouns = COREF_TOKENS.map((t, i) => ({ t, i })).filter((x) => x.t.kind === "pro");
    const allRevealed = pronouns.every((p) => revealed.has(p.i));
    if (allRevealed) reset();
    else {
      const next = pronouns.find((p) => !revealed.has(p.i));
      if (next) togglePronoun(next.i);
    }
  }, [revealed]);

  const lineH = 34;
  const baseY = 16;

  return (
    <div onMouseMove={touch} style={{ width: "100%", height: "100%", padding: "12px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 1.4, color: "rgba(148,163,184,0.7)", fontFamily: "ui-monospace, monospace" }}>
          TAP A PRONOUN — SEE WHO IT'S ABOUT
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => { touch(); revealAll(); }} style={{ ...pillBtn(false), fontSize: 10, padding: "3px 9px" }}>Reveal all</button>
          <button onClick={() => { touch(); reset(); }} style={{ ...pillBtn(false), fontSize: 10, padding: "3px 9px" }}>Reset</button>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <svg viewBox="0 0 380 100"
             preserveAspectRatio="xMidYMid meet"
             style={{ width: "100%", height: "100%", display: "block" }}>
          {/* arcs for revealed pronouns back to their entity */}
          {COREF_TOKENS.map((tok, i) => {
            if (tok.kind !== "pro" || !revealed.has(i)) return null;
            // find the entity (first token with same chain & kind==="ent")
            const ent = COREF_TOKENS.find((t) => t.chain === tok.chain && t.kind === "ent");
            if (!ent) return null;
            const c = CHAIN_COLORS[tok.chain as number];
            const x1 = ent.x + ent.txt.length * 3, y1 = baseY + ent.y * lineH;
            const x2 = tok.x + tok.txt.length * 3, y2 = baseY + tok.y * lineH;
            const cx = (x1 + x2) / 2;
            const cy = Math.min(y1, y2) - 20 - Math.abs(x2 - x1) * 0.08;
            return (
              <g key={i} style={{ animation: "fadeSlide 350ms ease" }}>
                <path d={`M ${x1} ${y1 - 8} Q ${cx} ${cy} ${x2} ${y2 - 8}`}
                      stroke={c} strokeWidth="1.6" fill="none" strokeDasharray="3 2" />
                <circle cx={x2} cy={y2 - 8} r="3" fill={c} />
                <circle cx={x1} cy={y1 - 8} r="3" fill={c} />
              </g>
            );
          })}
          {/* tokens */}
          {COREF_TOKENS.map((tok, i) => {
            const isEnt = tok.kind === "ent";
            const isPro = tok.kind === "pro";
            const shown = revealed.has(i);
            // entity gets a stable highlight if any pronoun in its chain is revealed
            const entHighlighted = isEnt && COREF_TOKENS.some((t, j) => t.kind === "pro" && t.chain === tok.chain && revealed.has(j));
            const color = (isEnt || isPro) ? CHAIN_COLORS[tok.chain as number] : null;
            return (
              <g key={i}
                 transform={`translate(${tok.x}, ${baseY + tok.y * lineH})`}
                 onClick={() => isPro && (touch(), togglePronoun(i))}
                 style={{ cursor: isPro ? "pointer" : "default" }}>
                {isEnt && color && (
                  <rect x="-3" y="-12" width={tok.txt.length * 7 + 6} height="18" rx="4"
                        fill={entHighlighted ? `${color}30` : `${color}14`}
                        stroke={`${color}80`} strokeWidth="1" />
                )}
                {isPro && color && (
                  <rect x="-3" y="-12" width={tok.txt.length * 7 + 6} height="18" rx="4"
                        fill={shown ? `${color}30` : "rgba(148,163,184,0.08)"}
                        stroke={shown ? color : "rgba(148,163,184,0.4)"}
                        strokeWidth="1" strokeDasharray={shown ? "0" : "2 2"} />
                )}
                <text x="0" y="2" fontSize="12" fontFamily="ui-monospace, monospace"
                      fill={(isEnt || (isPro && shown)) ? color || "#cbd5e1" : (isPro ? "#cbd5e1" : "#cbd5e1")}
                      fontWeight={(isEnt || (isPro && shown)) ? 700 : 500}>
                  {tok.txt}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ============================================================
// Dispatcher
// ============================================================

export function NlpInteractiveThumbnail({ sampleId, active }: { sampleId: string; active: boolean }) {
  const map: Record<string, React.FC<{ active: boolean }>> = {
    ner: NerThumb,
    sentiment: SentimentThumb,
    intent: IntentThumb,
    relation: RelationThumb,
    coreference: CoreferenceThumb,
  };
  const C = map[sampleId] || NerThumb;
  return <C active={active} />;
}

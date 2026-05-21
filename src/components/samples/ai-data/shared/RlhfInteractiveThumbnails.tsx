import React from "react";

// ============================================================
// 1. Preference Ranking
// ============================================================
function PreferenceThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes prefShift { 0%, 90%, 100% { transform: translateX(0); } 45%, 55% { transform: translateX(4px); } }
        @keyframes gtPulse { 0%,100% { opacity: .35; transform: scale(1); } 50% { opacity:1; transform: scale(1.12); } }
        @keyframes iaaFlow { 0% { background-position: 0 0; } 100% { background-position: 200% 0; } }
        .pref-wrap { display: grid; grid-template-columns: 1fr 1.3fr 0.9fr; gap: 12px; align-items: center; }
        @media (max-width: 640px) {
          .pref-wrap { grid-template-columns: 1fr; gap: 8px; }
          .pref-hide-mobile { display: none; }
        }
      `}</style>
      <div className="pref-wrap">
        {/* Left column: Prompt & IAA */}
        <div style={{
          border: "1px dashed rgba(0,200,150,.35)",
          borderRadius: 10,
          padding: "10px 12px",
          fontSize: "11px",
          lineHeight: 1.4,
          color: "rgba(255,255,255,.7)",
          background: "rgba(0,200,150,.04)"
        }}>
          <span style={{ color: "#00c896", fontWeight: 600, letterSpacing: ".1em", fontSize: "9px", marginBottom: "4px", display: "block" }}>PROMPT</span>
          "Explain quantum entanglement to a 10-year-old in three short sentences."
          <div style={{ marginTop: "6px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,.08)", overflow: "hidden", position: "relative" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, #00c896, #facc15, #00c896)",
              backgroundSize: "200% 100%",
              animation: active ? "iaaFlow 3s linear infinite" : "none",
              width: "87%"
            }} />
          </div>
          <div style={{ marginTop: "6px", fontSize: "9px", color: "rgba(255,255,255,.5)", letterSpacing: ".08em", fontFamily: "monospace" }}>
            IAA · KRIPP α = 0.87
          </div>
        </div>

        {/* Middle column: Response Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Card 1 */}
          <div style={{
            position: "relative",
            borderRadius: 10,
            padding: "8px 10px 8px 38px",
            fontSize: "11px",
            lineHeight: 1.45,
            background: "rgba(0,200,150,.08)",
            border: "1px solid rgba(0,200,150,.4)",
            color: "#e5fff5",
            animation: active ? "prefShift 6s ease-in-out infinite" : "none",
            animationDelay: "0s"
          }}>
            <span style={{
              position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)",
              width: "22px", height: "22px", borderRadius: "6px", display: "grid", placeItems: "center",
              fontWeight: 800, fontSize: "11px", color: "#fff",
              background: "linear-gradient(135deg, #00c896, #0a9b7d)", boxShadow: "0 0 12px -2px #00c896"
            }}>1</span>
            <span style={{ color: "rgba(255,255,255,.55)", fontSize: "9px", letterSpacing: ".08em", fontWeight: 600, display: "block", marginBottom: "2px" }}>RESPONSE A</span>
            Imagine two coins that always land the same way...
          </div>

          {/* Card 2 */}
          <div style={{
            position: "relative",
            borderRadius: 10,
            padding: "8px 10px 8px 38px",
            fontSize: "11px",
            lineHeight: 1.45,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            color: "rgba(255,255,255,.78)",
            animation: active ? "prefShift 6s ease-in-out infinite" : "none",
            animationDelay: ".2s"
          }}>
            <span style={{
              position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)",
              width: "22px", height: "22px", borderRadius: "6px", display: "grid", placeItems: "center",
              fontWeight: 800, fontSize: "11px", color: "#fbbf24",
              background: "rgba(245,158,11,.18)", border: "1px solid rgba(245,158,11,.4)"
            }}>2</span>
            <span style={{ color: "rgba(255,255,255,.55)", fontSize: "9px", letterSpacing: ".08em", fontWeight: 600, display: "block", marginBottom: "2px" }}>RESPONSE B</span>
            Quantum entanglement is when two particles...
          </div>

          {/* Card 3 */}
          <div style={{
            position: "relative",
            borderRadius: 10,
            padding: "8px 10px 8px 38px",
            fontSize: "11px",
            lineHeight: 1.45,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            color: "rgba(255,255,255,.78)",
            animation: active ? "prefShift 6s ease-in-out infinite" : "none",
            animationDelay: ".4s"
          }}>
            <span style={{
              position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)",
              width: "22px", height: "22px", borderRadius: "6px", display: "grid", placeItems: "center",
              fontWeight: 800, fontSize: "11px", color: "#fca5a5",
              background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.35)"
            }}>3</span>
            <span style={{ color: "rgba(255,255,255,.55)", fontSize: "9px", letterSpacing: ".08em", fontWeight: 600, display: "block", marginBottom: "2px" }}>RESPONSE C</span>
            Entanglement is a quantum mechanical phenomenon...
          </div>
        </div>

        {/* Right column: Rationale / Meta */}
        <div className="pref-hide-mobile" style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,.55)", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", fontSize: "13px", color: "#00c896", fontWeight: 800 }}>
            <div style={{ animation: active ? "gtPulse 2s ease-in-out infinite" : "none" }}>A &gt; B</div>
            <div style={{ animation: active ? "gtPulse 2s ease-in-out infinite" : "none", animationDelay: ".3s" }}>B &gt; C</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: "9px", letterSpacing: ".1em" }}>HELPFULNESS</span>
            <span style={{ color: "#fff", fontWeight: 700 }}>5 · 3 · 2</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: "9px", letterSpacing: ".1em" }}>ACCURACY</span>
            <span style={{ color: "#fff", fontWeight: 700 }}>5 · 4 · 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2. Response Quality Scoring
// ============================================================
function QualityThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes scoreScan { 0%, 100% { left: -30%; } 50% { left: 100%; } }
        @keyframes fillBarHelpfulness { 0% { width: 0; } 35%, 92% { width: 92%; } 100% { width: 0; } }
        @keyframes fillBarAccuracy { 0% { width: 0; } 35%, 92% { width: 80%; } 100% { width: 0; } }
        @keyframes fillBarHarmlessness { 0% { width: 0; } 35%, 92% { width: 96%; } 100% { width: 0; } }
        @keyframes fillBarCoherence { 0% { width: 0; } 35%, 92% { width: 86%; } 100% { width: 0; } }
        .score-wrap { display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; align-items: center; }
        @media (max-width: 640px) {
          .score-wrap { grid-template-columns: 1fr; gap: 8px; }
          .score-hide-mobile { display: none; }
        }
      `}</style>
      <div className="score-wrap">
        {/* Left column: Model Output with scan beam */}
        <div style={{
          borderRadius: 10,
          padding: "10px 12px",
          fontSize: "11px",
          lineHeight: 1.45,
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
          color: "rgba(255,255,255,.75)",
          position: "relative",
          overflow: "hidden"
        }}>
          <span style={{ color: "#00c896", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em", display: "block", marginBottom: "4px" }}>MODEL OUTPUT</span>
          "Photosynthesis is the process by which plants convert sunlight into chemical energy stored as glucose. It occurs primarily in the chloroplasts of leaves, where chlorophyll absorbs light energy..."
          <div style={{
            position: "absolute", left: "-30%", top: 0, bottom: 0, width: "30%",
            background: "linear-gradient(90deg, transparent, rgba(0,200,150,.15), transparent)",
            animation: active ? "scoreScan 4s ease-in-out infinite" : "none"
          }} />
          <div style={{ marginTop: "8px", fontSize: "9px", color: "rgba(255,255,255,.4)", letterSpacing: ".08em", fontFamily: "monospace" }}>
            ANNOTATOR · LING-INDIA-04 &nbsp;·&nbsp; PASS
          </div>
        </div>

        {/* Right column: Scoring Dimensions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Dim 1: Helpfulness */}
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,.8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px", fontFamily: "monospace", fontSize: "9.5px" }}>
              <span>Helpfulness</span>
              <span style={{ color: "#00c896", fontWeight: 700 }}>4.6 / 5</span>
            </div>
            <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.06)", overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", borderRadius: "3px",
                background: "linear-gradient(90deg, #0a9b7d, #00c896)",
                width: active ? "92%" : "0%",
                animation: active ? "fillBarHelpfulness 4s cubic-bezier(.6,.0,.2,1) infinite" : "none"
              }} />
            </div>
          </div>

          {/* Dim 2: Accuracy */}
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,.8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px", fontFamily: "monospace", fontSize: "9.5px" }}>
              <span>Accuracy</span>
              <span style={{ color: "#00c896", fontWeight: 700 }}>4.0 / 5</span>
            </div>
            <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.06)", overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", borderRadius: "3px",
                background: "linear-gradient(90deg, #0a9b7d, #00c896)",
                width: active ? "80%" : "0%",
                animation: active ? "fillBarAccuracy 4s cubic-bezier(.6,.0,.2,1) infinite" : "none",
                animationDelay: ".15s"
              }} />
            </div>
          </div>

          {/* Dim 3: Harmlessness */}
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,.8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px", fontFamily: "monospace", fontSize: "9.5px" }}>
              <span>Harmlessness</span>
              <span style={{ color: "#00c896", fontWeight: 700 }}>4.8 / 5</span>
            </div>
            <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.06)", overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", borderRadius: "3px",
                background: "linear-gradient(90deg, #0a9b7d, #00c896)",
                width: active ? "96%" : "0%",
                animation: active ? "fillBarHarmlessness 4s cubic-bezier(.6,.0,.2,1) infinite" : "none",
                animationDelay: ".3s"
              }} />
            </div>
          </div>

          {/* Dim 4: Coherence */}
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,.8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px", fontFamily: "monospace", fontSize: "9.5px" }}>
              <span>Coherence</span>
              <span style={{ color: "#00c896", fontWeight: 700 }}>4.3 / 5</span>
            </div>
            <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,.06)", overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", borderRadius: "3px",
                background: "linear-gradient(90deg, #0a9b7d, #00c896)",
                width: active ? "86%" : "0%",
                animation: active ? "fillBarCoherence 4s cubic-bezier(.6,.0,.2,1) infinite" : "none",
                animationDelay: ".45s"
              }} />
            </div>
          </div>

          {/* Footer Consensus */}
          <div style={{ marginTop: "4px", display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: "9.5px" }}>
            <span style={{ color: "rgba(255,255,255,.5)" }}>CONSENSUS · α 0.84</span>
            <span style={{ color: "#00c896", fontWeight: 700 }}>4.43 / 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. Instruction-Following Evaluation
// ============================================================
function InstructionThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes evalAppear {
          0%, 8% { opacity: 0; transform: translateY(4px); }
          14%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-2px); }
        }
        .inst-wrap { display: grid; grid-template-columns: 1fr 1.1fr; gap: 14px; align-items: center; }
        @media (max-width: 640px) {
          .inst-wrap { grid-template-columns: 1fr; gap: 8px; }
          .inst-hide-mobile { display: none; }
        }
      `}</style>
      <div className="inst-wrap">
        {/* Left column: Instruction prompt list */}
        <div style={{
          borderRadius: 10,
          padding: "10px 12px",
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
          fontSize: "10.5px",
          lineHeight: 1.4,
          color: "rgba(255,255,255,.85)"
        }}>
          <span style={{ color: "#00c896", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em", display: "block", marginBottom: "6px" }}>INSTRUCTION · 5 STEPS</span>
          <ol style={{ margin: 0, paddingLeft: "14px", display: "flex", flexDirection: "column", gap: "4px", color: "rgba(255,255,255,.75)" }}>
            <li>Summarise article in <code style={{ color: "#fbbf24", background: "rgba(251,191,36,.08)", padding: "1px 3px", borderRadius: "3px" }}>&le;3 sentences</code></li>
            <li>List <code style={{ color: "#fbbf24", background: "rgba(251,191,36,.08)", padding: "1px 3px", borderRadius: "3px" }}>3 key entities</code></li>
            <li>Output in <code style={{ color: "#fbbf24", background: "rgba(251,191,36,.08)", padding: "1px 3px", borderRadius: "3px" }}>JSON</code> with keys</li>
            <li>Detect overall sentiment</li>
            <li>End with token <code style={{ color: "#fbbf24", background: "rgba(251,191,36,.08)", padding: "1px 3px", borderRadius: "3px" }}>&lt;END&gt;</code></li>
          </ol>
        </div>

        {/* Right column: Evaluation checks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {/* Row 1 */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "5px 8px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "8px", fontSize: "10.5px", opacity: active ? 0 : 1,
            animation: active ? "evalAppear 6s linear infinite" : "none",
            animationDelay: "0s"
          }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", display: "grid", placeItems: "center", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.6)", fontSize: "9px", fontWeight: 700 }}>1</div>
            <div style={{ flex: 1, color: "rgba(255,255,255,.8)" }}>3-sentence summary</div>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(0,200,150,.18)", color: "#00c896", border: "1px solid rgba(0,200,150,.35)", fontSize: "10px", fontWeight: 700 }}>✓</div>
          </div>

          {/* Row 2 */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "5px 8px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "8px", fontSize: "10.5px", opacity: active ? 0 : 1,
            animation: active ? "evalAppear 6s linear infinite" : "none",
            animationDelay: ".7s"
          }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", display: "grid", placeItems: "center", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.6)", fontSize: "9px", fontWeight: 700 }}>2</div>
            <div style={{ flex: 1, color: "rgba(255,255,255,.8)" }}>Entities: 3 of 3</div>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(0,200,150,.18)", color: "#00c896", border: "1px solid rgba(0,200,150,.35)", fontSize: "10px", fontWeight: 700 }}>✓</div>
          </div>

          {/* Row 3 */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "5px 8px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "8px", fontSize: "10.5px", opacity: active ? 0 : 1,
            animation: active ? "evalAppear 6s linear infinite" : "none",
            animationDelay: "1.4s"
          }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", display: "grid", placeItems: "center", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.6)", fontSize: "9px", fontWeight: 700 }}>3</div>
            <div style={{ flex: 1, color: "rgba(255,255,255,.8)", display: "flex", alignItems: "center", gap: "4px" }}>
              JSON · key missing <span style={{ fontFamily: "monospace", fontSize: "8px", padding: "1px 3px", borderRadius: "3px", color: "#fca5a5", background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)" }}>FMT</span>
            </div>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(245,158,11,.18)", color: "#fbbf24", border: "1px solid rgba(245,158,11,.35)", fontSize: "10px", fontWeight: 700 }}>~</div>
          </div>

          {/* Row 4 */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "5px 8px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "8px", fontSize: "10.5px", opacity: active ? 0 : 1,
            animation: active ? "evalAppear 6s linear infinite" : "none",
            animationDelay: "2.1s"
          }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", display: "grid", placeItems: "center", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.6)", fontSize: "9px", fontWeight: 700 }}>4</div>
            <div style={{ flex: 1, color: "rgba(255,255,255,.8)" }}>Sentiment: neutral</div>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(0,200,150,.18)", color: "#00c896", border: "1px solid rgba(0,200,150,.35)", fontSize: "10px", fontWeight: 700 }}>✓</div>
          </div>

          {/* Row 5 */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "5px 8px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "8px", fontSize: "10.5px", opacity: active ? 0 : 1,
            animation: active ? "evalAppear 6s linear infinite" : "none",
            animationDelay: "2.8s"
          }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", display: "grid", placeItems: "center", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.6)", fontSize: "9px", fontWeight: 700 }}>5</div>
            <div style={{ flex: 1, color: "rgba(255,255,255,.8)", display: "flex", alignItems: "center", gap: "4px" }}>
              &lt;END&gt; absent <span style={{ fontFamily: "monospace", fontSize: "8px", padding: "1px 3px", borderRadius: "3px", color: "#fca5a5", background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)" }}>OMIT</span>
            </div>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(239,68,68,.18)", color: "#fca5a5", border: "1px solid rgba(239,68,68,.35)", fontSize: "10px", fontWeight: 700 }}>✕</div>
          </div>

          {/* Score Box */}
          <div style={{
            padding: "6px 10px",
            borderRadius: "8px",
            background: "rgba(0,200,150,.08)",
            border: "1px solid rgba(0,200,150,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11px"
          }}>
            <div>
              <div style={{ color: "rgba(255,255,255,.7)", fontSize: "9px", fontWeight: 600 }}>PARTIAL CREDIT</div>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: "8px", marginTop: "1px" }}>3 pass · 1 part · 1 fail</div>
            </div>
            <div style={{ color: "#00c896", fontWeight: 800, fontSize: "14px", fontFamily: "monospace" }}>3.5 / 5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. Safety & Red-Teaming Labels
// ============================================================
function SafetyThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes scanBeam {
          0% { top: -40px; }
          50% { top: 100%; }
          51%, 100% { top: -40px; opacity: 0; }
        }
        @keyframes flagPulse {
          0%, 85%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        .safety-wrap { display: grid; grid-template-columns: 1.15fr 1fr; gap: 14px; align-items: center; }
        @media (max-width: 640px) {
          .safety-wrap { grid-template-columns: 1fr; gap: 8px; }
          .safety-hide-mobile { display: none; }
        }
      `}</style>
      <div className="safety-wrap">
        {/* Left column: Text output with scan beam */}
        <div style={{
          borderRadius: 10,
          padding: "10px 12px",
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.08)",
          fontSize: "10.5px",
          lineHeight: 1.45,
          color: "rgba(255,255,255,.8)",
          position: "relative",
          overflow: "hidden"
        }}>
          <span style={{ color: "#fca5a5", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em", display: "block", marginBottom: "4px" }}>MODEL OUTPUT · SCANNING</span>
          <div style={{
            position: "absolute", left: 0, right: 0, height: "40px",
            background: "linear-gradient(180deg, transparent, rgba(239,68,68,.2), transparent)",
            top: "-40px",
            animation: active ? "scanBeam 4s ease-in-out infinite" : "none",
            pointerEvents: "none"
          }} />
          "Sure, you can reach Rohan at <span style={{ color: "#fca5a5", background: "rgba(239,68,68,.14)", padding: "1px 3px", borderRadius: "3px" }}>+91-98***-****12</span>. Candidates from <span style={{ color: "#fcd34d", background: "rgba(245,158,11,.14)", padding: "1px 3px", borderRadius: "3px" }}>tier-1 colleges</span> are a safer bet — <span style={{ color: "#f87171", background: "rgba(239,68,68,.18)", padding: "1px 3px", borderRadius: "3px", textDecoration: "line-through", textDecorationColor: "rgba(239,68,68,.5)" }}>avoid rural backgrounds</span> when shortlisting."
          <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,.45)", letterSpacing: ".08em" }}>
            FLAGS · 3 &nbsp;·&nbsp; SEVERITY · HIGH
          </div>
        </div>

        {/* Right column: Safety category checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {/* Cat 1: Harmful content */}
          <div style={{
            display: "grid", gridTemplateColumns: "12px 1fr auto", alignItems: "center", gap: "8px",
            padding: "5px 8px", borderRadius: "8px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)",
            fontSize: "10.5px", animation: active ? "flagPulse 4s ease-in-out infinite" : "none"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444" }} />
            <span style={{ color: "rgba(255,255,255,.85)" }}>Harmful content</span>
            <span style={{ fontFamily: "monospace", fontSize: "8.5px", padding: "2px 4px", borderRadius: "3px", background: "rgba(239,68,68,.18)", color: "#fca5a5", border: "1px solid rgba(239,68,68,.4)" }}>HIGH</span>
          </div>

          {/* Cat 2: Bias / discrimination */}
          <div style={{
            display: "grid", gridTemplateColumns: "12px 1fr auto", alignItems: "center", gap: "8px",
            padding: "5px 8px", borderRadius: "8px", background: "rgba(245,158,11,.07)", border: "1px solid rgba(245,158,11,.25)",
            fontSize: "10.5px", animation: active ? "flagPulse 4s ease-in-out infinite" : "none", animationDelay: ".6s"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
            <span style={{ color: "rgba(255,255,255,.85)" }}>Bias / discrimination</span>
            <span style={{ fontFamily: "monospace", fontSize: "8.5px", padding: "2px 4px", borderRadius: "3px", background: "rgba(245,158,11,.14)", color: "#fcd34d", border: "1px solid rgba(245,158,11,.35)" }}>MED</span>
          </div>

          {/* Cat 3: PII leakage */}
          <div style={{
            display: "grid", gridTemplateColumns: "12px 1fr auto", alignItems: "center", gap: "8px",
            padding: "5px 8px", borderRadius: "8px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)",
            fontSize: "10.5px", animation: active ? "flagPulse 4s ease-in-out infinite" : "none", animationDelay: "1.2s"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 8px #ef4444" }} />
            <span style={{ color: "rgba(255,255,255,.85)" }}>PII leakage</span>
            <span style={{ fontFamily: "monospace", fontSize: "8.5px", padding: "2px 4px", borderRadius: "3px", background: "rgba(239,68,68,.18)", color: "#fca5a5", border: "1px solid rgba(239,68,68,.4)" }}>HIGH</span>
          </div>

          {/* Verdict box */}
          <div style={{
            padding: "6px 10px", borderRadius: "8px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)",
            fontFamily: "monospace", fontSize: "10px", color: "#fca5a5", display: "flex", justifyContent: "space-between"
          }}>
            <span>VERDICT</span>
            <span style={{ fontWeight: 700 }}>REJECT · ESCALATE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Dispatcher
// ============================================================
export function RlhfInteractiveThumbnail({ sampleId, active }: { sampleId: string; active: boolean }) {
  const map: Record<string, React.FC<{ active: boolean }>> = {
    preference: PreferenceThumb,
    quality: QualityThumb,
    instruction: InstructionThumb,
    safety: SafetyThumb,
  };
  const C = map[sampleId] || PreferenceThumb;
  return <C active={active} />;
}

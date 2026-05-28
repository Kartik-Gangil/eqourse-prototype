import React, { useState, useEffect } from "react";
import handwrittenDocImg from "@/assets/handwritten_doc_sample.png";
import dashcamImg from "@/assets/dashcam_sample.png";

// ============================================================
// 1. Text Collection Samples
// ============================================================
function TextCollectionThumb({ active }: { active: boolean }) {
  const [messages, setMessages] = useState<Array<{ id: number; sender: string; text: string; age: number; region: string }>>([
    { id: 1, sender: "User102", text: "Aaj class kitne baje start hogi?", age: 21, region: "Delhi" },
    { id: 2, sender: "User105", text: "I think 10 AM, let me check the schedule.", age: 23, region: "Noida" },
  ]);
  const [counter, setCounter] = useState(4820);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setCounter((prev) => prev + Math.floor(Math.random() * 3) + 1);
      
      const newMessages = [
        { id: Date.now() + 1, sender: `User${Math.floor(Math.random() * 900) + 100}`, text: "Exam prep materials website par upload ho gaye kya?", age: 20, region: "Delhi" },
        { id: Date.now() + 2, sender: `User${Math.floor(Math.random() * 900) + 100}`, text: "Yes, files section me check karo, and click on units.", age: 22, region: "Mumbai" },
        { id: Date.now() + 3, sender: `User${Math.floor(Math.random() * 900) + 100}`, text: "Kya syllabus change hua hai updates according?", age: 21, region: "Bangalore" },
        { id: Date.now() + 4, sender: `User${Math.floor(Math.random() * 900) + 100}`, text: "No, same rules for all assignments this semester.", age: 25, region: "Pune" },
      ];
      
      setMessages((prev) => {
        const next = [...prev, newMessages[Math.floor(Math.random() * newMessages.length)]];
        if (next.length > 3) next.shift();
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div style={{ width: "100%", height: "100%", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes textBubbleIn {
          0% { opacity: 0; transform: translateY(12px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .text-bubble {
          animation: textBubbleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .text-wrap-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 12px;
          height: 100%;
          align-items: center;
        }
        @media (max-width: 640px) {
          .text-wrap-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .text-hide-mobile {
            display: none;
          }
        }
      `}</style>

      <div className="text-wrap-grid">
        {/* Left Column: The scrolling chat feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
            <span style={{ color: "#00c896", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>CROWDSOURCED CORPUS</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>FORMAT: JSONL</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,255,255,.05)", borderRadius: "12px", padding: "10px", minHeight: "135px", justifyContent: "flex-end", overflow: "hidden" }}>
            {messages.map((msg) => (
              <div key={msg.id} className="text-bubble" style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "rgba(255,255,255,.45)" }}>
                  <span>@{msg.sender}</span>
                  <span>Age: {msg.age} · {msg.region}</span>
                </div>
                <div style={{
                  background: msg.id % 2 === 0 ? "rgba(0, 200, 150, 0.08)" : "rgba(255, 255, 255, 0.03)",
                  border: msg.id % 2 === 0 ? "1px solid rgba(0, 200, 150, 0.25)" : "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  color: "#fff"
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sourcing Metadata & Live Stats */}
        <div className="text-hide-mobile" style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
          {/* Live Records Counter */}
          <div style={{
            background: "rgba(0, 200, 150, 0.05)",
            border: "1px dashed rgba(0, 200, 150, 0.35)",
            borderRadius: "10px",
            padding: "10px 12px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,.55)", letterSpacing: ".1em", marginBottom: "4px" }}>RECORDS SOURCED</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#00c896", fontFamily: "monospace", letterSpacing: ".05em" }}>
              {counter.toLocaleString()}
            </div>
            <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.35)", marginTop: "2px" }}>Consent Logged 100%</div>
          </div>

          {/* Demographic diversity tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            <span style={{ fontSize: "9.5px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", padding: "3px 6px", borderRadius: "5px", color: "rgba(255,255,255,.8)" }}>Age: 18-25 (72%)</span>
            <span style={{ fontSize: "9.5px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", padding: "3px 6px", borderRadius: "5px", color: "rgba(255,255,255,.8)" }}>Code-Mixed Hindi-Eng</span>
            <span style={{ fontSize: "9.5px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", padding: "3px 6px", borderRadius: "5px", color: "rgba(255,255,255,.8)" }}>Multi-Region India</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2. Audio Collection Samples
// ============================================================
function AudioCollectionThumb({ active }: { active: boolean }) {
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [snr, setSnr] = useState(28.4);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setActiveSpeaker((prev) => (prev + 1) % 3);
      setSnr(() => +(25 + Math.random() * 6).toFixed(1));
    }, 2800);
    return () => clearInterval(interval);
  }, [active]);

  const speakers = [
    { name: "SPK-001", age: "24", type: "Urban Female", loc: "Delhi" },
    { name: "SPK-002", age: "42", type: "Rural Male", loc: "Bihar" },
    { name: "SPK-003", age: "31", type: "Semi-Urban Female", loc: "TN" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes audioWaveDC {
          0%, 100% { height: 6px; }
          50% { height: 32px; }
        }
        .wave-bar-dc {
          width: 3px;
          border-radius: 1.5px;
          background: #00c896;
          animation: audioWaveDC 1.2s ease-in-out infinite;
        }
        .audio-wrap-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 12px;
          align-items: center;
        }
        @media (max-width: 640px) {
          .audio-wrap-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .audio-hide-mobile {
            display: none;
          }
        }
      `}</style>
      <div className="audio-wrap-grid">
        {/* Left Column: Waveform, Speaker info & Environment */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#00c896", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>FIELD RECORDED WAV</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>16kHz / MONO</span>
          </div>

          {/* Waveform graphic */}
          <div style={{
            height: "55px",
            background: "rgba(0,0,0,.2)",
            border: "1px solid rgba(255,255,255,.05)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            padding: "0 10px",
            position: "relative"
          }}>
            {/* Animating Waveform bars */}
            {Array.from({ length: 24 }).map((_, i) => {
              const delay = `${(i % 5) * 0.15}s`;
              return (
                <div
                  key={i}
                  className="wave-bar-dc"
                  style={{
                    animationDelay: active ? delay : "0s",
                    animationPlayState: active ? "running" : "paused",
                    opacity: 0.3 + (i % 4) * 0.2
                  }}
                />
              );
            })}
            
            {/* Play overlay badge */}
            <div style={{
              position: "absolute", left: "10px", bottom: "6px",
              fontSize: "8.5px", color: "rgba(255,255,255,.45)",
              fontFamily: "monospace", letterSpacing: ".05em"
            }}>
              CLIP LENGTH: 42s · RECORDING...
            </div>
          </div>

          {/* Current Speaker Display */}
          <div style={{
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: "8px",
            padding: "8px 10px",
            fontSize: "11px",
            transition: "all 0.3s"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
              <span style={{ fontWeight: 600, color: "#fff" }}>{speakers[activeSpeaker].name}</span>
              <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px" }}>{speakers[activeSpeaker].loc}</span>
            </div>
            <div style={{ fontSize: "9.5px", color: "rgba(255,255,255,.6)" }}>
              {speakers[activeSpeaker].type} · Age {speakers[activeSpeaker].age}
            </div>
          </div>
        </div>

        {/* Right Column: Audio quality validation metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* SNR Score */}
          <div style={{
            background: "rgba(0, 200, 150, 0.06)",
            border: "1px solid rgba(0, 200, 150, 0.25)",
            borderRadius: "8px",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.5)", letterSpacing: ".05em" }}>SIGNAL-TO-NOISE RATIO</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#00c896", fontFamily: "monospace", marginTop: "1px" }}>{snr} dB</div>
            </div>
            <span style={{
              fontSize: "8.5px", fontWeight: 700, color: "#00c896",
              background: "rgba(0, 200, 150, 0.15)", padding: "2px 5px", borderRadius: "4px",
              border: "1px solid rgba(0, 200, 150, 0.3)"
            }}>PASS</span>
          </div>

          {/* Meta breakdown checks */}
          <div className="audio-hide-mobile" style={{ display: "flex", flexDirection: "column", gap: "4px", fontFamily: "monospace", fontSize: "9.5px", color: "rgba(255,255,255,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "3px" }}>
              <span>CLIPPING TEST</span>
              <span style={{ color: "#00c896" }}>CLEAN ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "3px" }}>
              <span>SILENCE FILTER</span>
              <span style={{ color: "#00c896" }}>PASS ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>METADATA ALIGN</span>
              <span style={{ color: "#00c896" }}>VALID ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. Image Collection Samples (Real Handwritten Document Scan)
// ============================================================
function ImageCollectionThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes imageScanLaser {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .img-scan-container {
          position: relative;
          width: 100%;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
          background: #111;
        }
        .img-scan-laser {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #00c896;
          box-shadow: 0 0 10px #00c896, 0 0 20px #00c896;
          animation: imageScanLaser 4s linear infinite;
        }
        .img-grid-layout {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 16px;
          align-items: center;
        }
        @media (max-width: 640px) {
          .img-grid-layout {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .img-grid-hide-mobile {
            display: none;
          }
        }
      `}</style>
      <div className="img-grid-layout">
        {/* Left Column: Real Handwritten Image with Scanning laser */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ color: "#00c896", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>REAL DOCUMENT SCAN</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>DEV AN AG ARI</span>
          </div>
          
          <div className="img-scan-container">
            <img 
              src={handwrittenDocImg} 
              alt="Handwritten Document Scan" 
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} 
            />
            {active && <div className="img-scan-laser" />}
            
            {/* Tag Overlay */}
            <div style={{
              position: "absolute", left: "8px", bottom: "8px",
              background: "rgba(0, 200, 150, 0.95)", color: "#fff",
              padding: "3px 6px", borderRadius: "4px", fontSize: "8.5px", fontWeight: 700,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
            }}>
              ✓ DEVANAGARI SAMPLE
            </div>
          </div>
        </div>

        {/* Right Column: Privacy Verdict & EXIF Stripping Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{
            background: "rgba(0, 200, 150, 0.05)",
            border: "1px dashed rgba(0, 200, 150, 0.3)",
            borderRadius: "10px",
            padding: "10px 12px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.5)", letterSpacing: ".05em" }}>PRIVACY SCORE</div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#00c896", marginTop: "4px", letterSpacing: ".05em" }}>GDPR COMPLIANT</div>
            <div style={{ fontSize: "8px", color: "rgba(255,255,255,.45)", marginTop: "2px" }}>100% Anonymized Dataset</div>
          </div>

          <div className="img-grid-hide-mobile" style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9.5px", fontFamily: "monospace", color: "rgba(255,255,255,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>GPS EXIF COORDS</span>
              <span style={{ color: "#00c896" }}>STRIPPED ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>CAMERA METADATA</span>
              <span style={{ color: "#00c896" }}>CLEANED ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>MODEL RELEASES</span>
              <span style={{ color: "#00c896" }}>LOGGED ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. Video Collection Samples (Real Indian Dashcam Footage)
// ============================================================
function VideoCollectionThumb({ active }: { active: boolean }) {
  const [frame, setFrame] = useState(128);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 900 + 100);
    }, 70);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes trackingPulse {
          0%, 100% { border-color: #00c896; box-shadow: 0 0 4px rgba(0, 200, 150, 0.4); }
          50% { border-color: #fbbf24; box-shadow: 0 0 10px rgba(251, 191, 36, 0.6); }
        }
        .vid-scan-container {
          position: relative;
          width: 100%;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
          background: #111;
        }
        .vid-hud-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 16px;
          align-items: center;
        }
        @media (max-width: 640px) {
          .vid-hud-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .vid-hud-hide-mobile {
            display: none;
          }
        }
      `}</style>
      <div className="vid-hud-grid">
        {/* Left Column: Real Dashcam Image with HUD/AI tracking overlays */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ color: "#00c896", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>DASHCAM LIVE FEED</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>FRAME: {frame}</span>
          </div>

          <div className="vid-scan-container">
            {/* The generated Indian Street Dashcam Image */}
            <img 
              src={dashcamImg} 
              alt="Indian Street Dashcam" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
            
            {/* Tracking overlay: Bounding Box 1 */}
            <div style={{
              position: "absolute",
              left: "40%", top: "45%", width: "24%", height: "30%",
              border: "1.5px solid #00c896",
              borderRadius: "4px",
              animation: active ? "trackingPulse 2s infinite" : "none",
              pointerEvents: "none"
            }}>
              <span style={{
                position: "absolute", left: "-1px", top: "-14px",
                background: "#00c896", color: "#000", fontWeight: 800,
                fontSize: "7px", padding: "1px 3px", borderRadius: "2px",
                fontFamily: "monospace"
              }}>AUTO_RICKSHAW 94%</span>
            </div>

            {/* Tracking overlay: Bounding Box 2 */}
            <div style={{
              position: "absolute",
              left: "15%", top: "50%", width: "20%", height: "25%",
              border: "1.5px solid #fbbf24",
              borderRadius: "4px",
              animation: active ? "trackingPulse 2s infinite" : "none",
              animationDelay: "0.5s",
              pointerEvents: "none"
            }}>
              <span style={{
                position: "absolute", left: "-1px", top: "-14px",
                background: "#fbbf24", color: "#000", fontWeight: 800,
                fontSize: "7px", padding: "1px 3px", borderRadius: "2px",
                fontFamily: "monospace"
              }}>CAR 98%</span>
            </div>

            {/* Rec circle flashing */}
            <div style={{ position: "absolute", right: "8px", top: "8px", display: "flex", alignItems: "center", gap: "4px", background: "rgba(0,0,0,0.6)", padding: "3px 6px", borderRadius: "4px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ef4444" }} className="animate-pulse" />
              <span style={{ fontSize: "7px", color: "#fff", fontFamily: "monospace", fontWeight: 700 }}>REC 1080P</span>
            </div>
          </div>
        </div>

        {/* Right Column: Video metadata and scene variables */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "10px",
            padding: "10px 12px"
          }}>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: "8.5px", letterSpacing: ".05em", marginBottom: "3px" }}>SCENE METADATA</div>
            <div style={{ color: "#fff", fontSize: "11px", fontWeight: 600, display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Weather:</span>
                <span style={{ color: "#00c896" }}>Sunny / Clear</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Location:</span>
                <span>Urban Highway</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>Traffic:</span>
                <span>Medium Density</span>
              </div>
            </div>
          </div>

          <div className="vid-hud-hide-mobile" style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9.5px", fontFamily: "monospace", color: "rgba(255,255,255,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>LIDAR ALIGNED</span>
              <span style={{ color: "#00c896" }}>YES ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>SENSOR PARAMS</span>
              <span style={{ color: "#00c896" }}>CALIBRATED ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Dispatcher
// ============================================================
export function DataCollectionInteractiveThumbnail({ sampleId, active }: { sampleId: string; active: boolean }) {
  const map: Record<string, React.FC<{ active: boolean }>> = {
    "text-collection": TextCollectionThumb,
    "audio-collection": AudioCollectionThumb,
    "image-collection": ImageCollectionThumb,
    "video-collection": VideoCollectionThumb,
  };
  const C = map[sampleId] || TextCollectionThumb;
  return <C active={active} />;
}

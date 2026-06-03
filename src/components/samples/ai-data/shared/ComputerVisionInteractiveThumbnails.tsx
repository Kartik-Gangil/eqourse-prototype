import React, { useState, useEffect } from "react";
import dashcamImg from "@/assets/dashcam_sample.webp";
import retailShelfImg from "@/assets/cv_retail_shelf.webp";
import pedestrianImg from "@/assets/cv_pedestrian.webp";

// ============================================================
// 1. Bounding Box Annotation
// ============================================================
function BoundingBoxThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes bboxPulse {
          0%, 100% { border-color: #00c896; box-shadow: 0 0 4px rgba(0, 200, 150, 0.4); }
          50% { border-color: #fbbf24; box-shadow: 0 0 10px rgba(251, 191, 36, 0.6); }
        }
        @keyframes scanLine {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "16px", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ color: "#00c896", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>OBJECT DETECTION</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>FORMAT: COCO</span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <img src={dashcamImg} alt="Dashcam" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            
            {active && (
              <div style={{ position: "absolute", top: 0, bottom: 0, width: "2px", background: "#00c896", boxShadow: "0 0 10px #00c896", animation: "scanLine 3s linear infinite" }} />
            )}

            <div style={{ position: "absolute", left: "21%", top: "48%", width: "14%", height: "24%", border: "1.5px solid #00c896", borderRadius: "2px", animation: active ? "bboxPulse 2s infinite" : "none" }}>
              <span style={{ position: "absolute", left: "-1px", top: "-14px", background: "#00c896", color: "#000", fontSize: "7px", fontWeight: 800, padding: "1px 3px" }}>CAR 0.98</span>
            </div>
            
            <div style={{ position: "absolute", left: "46%", top: "45%", width: "15%", height: "35%", border: "1.5px solid #fbbf24", borderRadius: "2px", animation: active ? "bboxPulse 2s infinite 0.5s" : "none" }}>
              <span style={{ position: "absolute", left: "-1px", top: "-14px", background: "#fbbf24", color: "#000", fontSize: "7px", fontWeight: 800, padding: "1px 3px" }}>RICKSHAW 0.94</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: "rgba(0, 200, 150, 0.05)", border: "1px dashed rgba(0, 200, 150, 0.3)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.5)", letterSpacing: ".05em" }}>PRECISION SCORE</div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#00c896", fontFamily: "monospace", marginTop: "2px" }}>mAP 0.92</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9.5px", fontFamily: "monospace", color: "rgba(255,255,255,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>CLASSES DETECTED</span><span style={{ color: "#fff" }}>25+</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>OCCLUSION</span><span style={{ color: "#00c896" }}>FLAGGED ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>IAA CONSENSUS</span><span style={{ color: "#00c896" }}>0.96 ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2. Semantic Segmentation
// ============================================================
function SemanticThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes maskFadeIn {
          0% { opacity: 0; }
          50% { opacity: 0.6; }
          100% { opacity: 0.8; }
        }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "16px", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ color: "#a855f7", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>PIXEL-LEVEL MASKS</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>FORMAT: PNG + JSON</span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <img src={dashcamImg} alt="Dashcam" style={{ width: "100%", height: "100%", objectFit: "cover", filter: active ? "grayscale(40%)" : "none", transition: "filter 1s" }} />
            
            {active && (
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", animation: "maskFadeIn 1s forwards" }}>
                {/* Sky Mask */}
                <polygon points="0,0 100,0 100,35 0,40" fill="rgba(59, 130, 246, 0.35)" />
                {/* Road Mask */}
                <polygon points="0,75 100,65 100,100 0,100" fill="rgba(168, 85, 247, 0.35)" />
                {/* Vegetation / Side Masks */}
                <polygon points="0,30 35,40 25,80 0,85" fill="rgba(34, 197, 94, 0.35)" />
                <polygon points="100,20 70,40 75,70 100,60" fill="rgba(34, 197, 94, 0.35)" />
              </svg>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: "rgba(168, 85, 247, 0.05)", border: "1px dashed rgba(168, 85, 247, 0.3)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.5)", letterSpacing: ".05em" }}>MEAN IOU</div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#a855f7", fontFamily: "monospace", marginTop: "2px" }}>88.4%</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "9px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", background: "#3b82f6", borderRadius: "2px" }}></span> <span style={{ color: "rgba(255,255,255,.7)" }}>Sky (Class 01)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", background: "#a855f7", borderRadius: "2px" }}></span> <span style={{ color: "rgba(255,255,255,.7)" }}>Road (Class 02)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "2px" }}></span> <span style={{ color: "rgba(255,255,255,.7)" }}>Vegetation (Class 03)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. Instance Segmentation
// ============================================================
function InstanceThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes polyDraw {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "16px", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ color: "#ec4899", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>POLYGON INSTANCES</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>FORMAT: JSON</span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <img src={retailShelfImg} alt="Retail Shelf" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            
            {active && (
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                <polygon points="15,45 25,45 26,70 14,70" fill="rgba(236, 72, 153, 0.4)" stroke="#ec4899" strokeWidth="0.5" style={{ animation: "polyDraw 0.5s ease-out forwards" }} />
                <polygon points="35,45 43,45 44,70 34,70" fill="rgba(56, 189, 248, 0.4)" stroke="#38bdf8" strokeWidth="0.5" style={{ animation: "polyDraw 0.5s ease-out 0.2s forwards opacity:0" }} />
                <polygon points="50,45 58,45 59,70 49,70" fill="rgba(250, 204, 21, 0.4)" stroke="#facc15" strokeWidth="0.5" style={{ animation: "polyDraw 0.5s ease-out 0.4s forwards opacity:0" }} />
                <polygon points="70,20 82,20 82,45 70,45" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="0.5" style={{ animation: "polyDraw 0.5s ease-out 0.6s forwards opacity:0" }} />
              </svg>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: "rgba(236, 72, 153, 0.05)", border: "1px dashed rgba(236, 72, 153, 0.3)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.5)", letterSpacing: ".05em" }}>INSTANCE COUNT</div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#ec4899", fontFamily: "monospace", marginTop: "2px" }}>1,482</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9.5px", fontFamily: "monospace", color: "rgba(255,255,255,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>UNIQUE IDs</span><span style={{ color: "#ec4899" }}>ASSIGNED ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>OCCLUSION</span><span style={{ color: "#ec4899" }}>RESOLVED ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. Keypoint Detection
// ============================================================
function KeypointThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes pointPop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes lineDraw {
          0% { width: 0; opacity: 0; }
          100% { width: var(--target-width); opacity: 1; }
        }
        .kp-point {
          position: absolute; width: 6px; height: 6px; background: #0ea5e9; border: 1px solid #fff; border-radius: 50%;
          transform: translate(-50%, -50%); z-index: 2; opacity: 0; animation: pointPop 0.4s forwards;
        }
        .kp-line {
          position: absolute; height: 2px; background: rgba(14, 165, 233, 0.7); transform-origin: left center; z-index: 1;
          opacity: 0; animation: lineDraw 0.4s forwards;
        }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "16px", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ color: "#0ea5e9", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>SKELETAL KEYPOINTS</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>FORMAT: COCO</span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <img src={pedestrianImg} alt="Pedestrian" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            
            {active && (
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                <g stroke="rgba(14, 165, 233, 0.8)" strokeWidth="0.8" style={{ animation: "maskFadeIn 0.5s forwards" }}>
                  {/* Spine & Head */}
                  <line x1="52" y1="25" x2="52" y2="33" />
                  <line x1="52" y1="33" x2="50" y2="58" />
                  {/* Right Arm */}
                  <line x1="52" y1="33" x2="49" y2="38" />
                  <line x1="49" y1="38" x2="45" y2="50" />
                  <line x1="45" y1="50" x2="47" y2="60" />
                  {/* Right Leg */}
                  <line x1="50" y1="58" x2="45" y2="75" />
                  <line x1="45" y1="75" x2="43" y2="92" />
                  {/* Left Leg */}
                  <line x1="50" y1="58" x2="54" y2="56" />
                  <line x1="54" y1="56" x2="58" y2="72" />
                  <line x1="58" y1="72" x2="52" y2="88" />
                </g>
                <g fill="#0ea5e9" stroke="#fff" strokeWidth="0.5" style={{ animation: "maskFadeIn 0.8s forwards" }}>
                  <circle cx="52" cy="25" r="1.5" />
                  <circle cx="52" cy="33" r="1.5" />
                  <circle cx="49" cy="38" r="1.5" />
                  <circle cx="45" cy="50" r="1.5" />
                  <circle cx="47" cy="60" r="1.5" />
                  <circle cx="50" cy="58" r="1.5" />
                  <circle cx="45" cy="75" r="1.5" />
                  <circle cx="43" cy="92" r="1.5" />
                  <circle cx="54" cy="56" r="1.5" />
                  <circle cx="58" cy="72" r="1.5" />
                  <circle cx="52" cy="88" r="1.5" />
                </g>
              </svg>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: "rgba(14, 165, 233, 0.05)", border: "1px dashed rgba(14, 165, 233, 0.3)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.5)", letterSpacing: ".05em" }}>KEYPOINTS DETECTED</div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#0ea5e9", fontFamily: "monospace", marginTop: "2px" }}>17 / 17</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9.5px", fontFamily: "monospace", color: "rgba(255,255,255,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>VISIBILITY FLAGS</span><span style={{ color: "#0ea5e9" }}>TRUE ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>OCCLUSION INFERRED</span><span style={{ color: "#0ea5e9" }}>YES ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 5. 3D Cuboid Annotation
// ============================================================
function CuboidThumb({ active }: { active: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
      <style>{`
        @keyframes wireframeFade {
          0% { opacity: 0; stroke-dasharray: 100; stroke-dashoffset: 100; }
          100% { opacity: 1; stroke-dashoffset: 0; }
        }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "16px", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ color: "#f97316", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em" }}>3D LIDAR CUBOIDS</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: "9px", fontFamily: "monospace" }}>FORMAT: KITTI</span>
          </div>
          <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <img src={dashcamImg} alt="Dashcam 3D" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            
            {active && (
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0, zIndex: 10, width: "100%", height: "100%" }}>
                {/* Simulated 3D Cuboid drawn with SVG lines tracking the green rickshaw */}
                <g style={{ animation: "wireframeFade 1s forwards", stroke: "#f97316", strokeWidth: 0.8, fill: "rgba(249, 115, 22, 0.15)" }}>
                  <polygon points="46,46 62,46 62,81 46,81" /> {/* Front Face */}
                  <polygon points="62,46 72,40 72,75 62,81" /> {/* Side Face */}
                  <polygon points="46,46 56,40 72,40 62,46" /> {/* Top Face */}
                </g>
                <text x="46" y="38" fill="#f97316" fontSize="5" fontFamily="monospace" fontWeight="bold">L, W, H, Yaw</text>
              </svg>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: "rgba(249, 115, 22, 0.05)", border: "1px dashed rgba(249, 115, 22, 0.3)", borderRadius: "10px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: "8.5px", color: "rgba(255,255,255,.5)", letterSpacing: ".05em" }}>Z-AXIS DEPTH</div>
            <div style={{ fontSize: "16px", fontWeight: 800, color: "#f97316", fontFamily: "monospace", marginTop: "2px" }}>ESTIMATED</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9.5px", fontFamily: "monospace", color: "rgba(255,255,255,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: "2px" }}>
              <span>YAW / PITCH / ROLL</span><span style={{ color: "#f97316" }}>TRACKED ✓</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>SENSOR FUSION</span><span style={{ color: "#f97316" }}>READY ✓</span>
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
export function ComputerVisionInteractiveThumbnail({ sampleId, active }: { sampleId: string; active: boolean }) {
  const map: Record<string, React.FC<{ active: boolean }>> = {
    "bbox": BoundingBoxThumb,
    "semantic": SemanticThumb,
    "instance": InstanceThumb,
    "keypoint": KeypointThumb,
    "cuboid": CuboidThumb,
  };
  const C = map[sampleId] || BoundingBoxThumb;
  return <C active={active} />;
}

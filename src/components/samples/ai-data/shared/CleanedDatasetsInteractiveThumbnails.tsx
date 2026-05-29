import React, { useState, useEffect, useRef } from "react";

// ============================================================
// 1. Text Deduplication
// ============================================================
const DEDUP_ROWS = [
  { txt: "How do I reset my Aadhaar OTP?", tag: "UNIQUE" },
  { txt: "How can I reset my Aadhaar OTP?", tag: "FUZZY 96%" },
  { txt: "Steps to enable two-factor login", tag: "UNIQUE" },
  { txt: "How do I reset my Aadhaar OTP?", tag: "EXACT" },
  { txt: "मेरा पासवर्ड कैसे बदलूँ?", tag: "UNIQUE" },
  { txt: "What is the SLA for support tickets?", tag: "UNIQUE" },
  { txt: "Steps to enable 2FA on login", tag: "FUZZY 91%" },
  { txt: "How to update my KYC documents", tag: "UNIQUE" },
  { txt: "How do I reset my aadhaar otp?", tag: "EXACT" },
  { txt: "Refund timeline for failed payment", tag: "UNIQUE" },
];

function DedupThumb({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [rowStates, setRowStates] = useState<string[]>(
    Array(DEDUP_ROWS.length).fill("normal")
  );
  const [scanned, setScanned] = useState(0);
  const [kept, setKept] = useState(10000);
  const [removed, setRemoved] = useState(0);
  const [exact, setExact] = useState(0);
  const [fuzzy, setFuzzy] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const loopTickRef = useRef(0);

  const reset = () => {
    setIdx(0);
    setRowStates(Array(DEDUP_ROWS.length).fill("normal"));
    setScanned(0);
    setKept(10000);
    setRemoved(0);
    setExact(0);
    setFuzzy(0);
    loopTickRef.current = 0;
  };

  useEffect(() => {
    if (!active) {
      reset();
      return;
    }

    reset();

    timerRef.current = setInterval(() => {
      setIdx((currentIdx) => {
        if (currentIdx >= DEDUP_ROWS.length) {
          loopTickRef.current += 1;
          if (loopTickRef.current > 12) {
            reset();
          }
          return currentIdx;
        }

        // Set row state to scanning
        setRowStates((prev) => {
          const next = [...prev];
          next[currentIdx] = "scanning";
          return next;
        });

        const row = DEDUP_ROWS[currentIdx];
        const isDup = row.tag === "EXACT" || row.tag.startsWith("FUZZY");

        if (isDup) {
          // After 350ms, mark as dup
          setTimeout(() => {
            setRowStates((prev) => {
              const next = [...prev];
              if (next[currentIdx] === "scanning") {
                next[currentIdx] = "dup";
              }
              return next;
            });

            if (row.tag === "EXACT") {
              setExact((e) => e + 1);
            } else {
              setFuzzy((f) => f + 1);
            }

            // After another 500ms, mark as removed
            setTimeout(() => {
              setRowStates((prev) => {
                const next = [...prev];
                next[currentIdx] = "removed";
                return next;
              });

              setRemoved((r) => {
                const count = row.tag === "EXACT" ? 178 : 233;
                const nextRemoved = r + count;
                setKept(10000 - nextRemoved);
                return nextRemoved;
              });
            }, 500);
          }, 350);
        } else {
          // If unique, mark as keep after a delay
          setTimeout(() => {
            setRowStates((prev) => {
              const next = [...prev];
              if (next[currentIdx] === "scanning") {
                next[currentIdx] = "keep";
              }
              return next;
            });
          }, 350);
        }

        const nextScanned = Math.min(
          10000,
          Math.round(((currentIdx + 1) / DEDUP_ROWS.length) * 10000)
        );
        setScanned(nextScanned);

        return currentIdx + 1;
      });
    }, 750);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active]);

  const progressPercent = (Math.min(idx, DEDUP_ROWS.length) / DEDUP_ROWS.length) * 100;

  return (
    <div className="w-full h-full p-3 font-mono flex flex-col justify-center select-none text-[11px] md:text-xs">
      <div className="grid grid-cols-[1fr_180px] gap-3 h-full">
        {/* Table View */}
        <div className="bg-white/[0.025] border border-white/5 rounded-lg overflow-y-auto max-h-[220px] scrollbar-thin">
          {DEDUP_ROWS.map((r, i) => {
            const state = rowStates[i];
            let rowClass = "text-white/80 border-l-2 border-transparent";
            let tagClass = "bg-white/5 text-white/50";

            if (state === "scanning") {
              rowClass = "bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400";
            } else if (state === "dup") {
              rowClass = "bg-red-500/10 border-l-2 border-red-500 text-red-400/80 line-through decoration-red-500/50";
              tagClass = "bg-red-500/20 text-red-300";
            } else if (state === "removed") {
              // Hide/collapse removed rows
              return null;
            } else if (state === "keep") {
              rowClass = "text-white border-l-2 border-transparent";
              tagClass = "bg-emerald-500/20 text-emerald-300";
            }

            return (
              <div
                key={i}
                className={`grid grid-cols-[30px_1fr_75px] gap-2 items-center px-3 py-1.5 transition-all duration-300 ${rowClass}`}
              >
                <span className="text-[10px] text-white/30">{String(i + 1).padStart(3, "0")}</span>
                <span className="truncate">{r.txt}</span>
                <span className={`text-[9px] font-bold tracking-wider rounded px-1.5 py-0.5 text-center ${tagClass}`}>
                  {r.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sidebar Stats */}
        <div className="flex flex-col gap-2 justify-between">
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col justify-center">
            <div className="text-[9px] text-white/40 uppercase tracking-wider">Rows scanned</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {scanned.toLocaleString()}{" "}
              <span className="text-white/20 text-xs">/ 10,000</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col justify-center">
            <div className="text-[9px] text-white/40 uppercase tracking-wider">After cleaning</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{kept.toLocaleString()}</div>
            <div className="text-[10px] text-white/40 mt-1">
              <span className="text-red-400 font-semibold">{removed.toLocaleString()}</span> removed
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col justify-center">
            <div className="text-[9px] text-white/40 uppercase tracking-wider">Match types</div>
            <div className="flex flex-col gap-1 mt-1 text-[10px] text-white/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-emerald-400" />
                <span>Exact: {(exact * 178).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-yellow-400" />
                <span>Fuzzy: {(fuzzy * 233).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2. PII Redaction
// ============================================================
interface PiiField {
  key: string;
  value: string;
  kind?: string;
}

const PII_RECORDS = [
  {
    before: [
      { key: "name", value: '"Rahul Sharma"', kind: "NAME" },
      { key: "email", value: '"rahul.sharma@gmail.com"', kind: "EMAIL" },
      { key: "phone", value: '"+91 98765 43210"', kind: "PHONE" },
      { key: "aadhaar", value: '"4521 8842 9971"', kind: "AADHAAR" },
      { key: "feedback", value: '"App keeps crashing - please call me at 98765 43210"', kind: "PHONE_INLINE" },
    ],
    after: [
      { key: "name", value: "[NAME]" },
      { key: "email", value: "[EMAIL]" },
      { key: "phone", value: "[PHONE]" },
      { key: "aadhaar", value: "[AADHAAR]" },
      { key: "feedback", value: '"App keeps crashing - please call me at [PHONE]"' },
    ],
  },
  {
    before: [
      { key: "name", value: '"Priya Iyer"', kind: "NAME" },
      { key: "email", value: '"priya@payapp.in"', kind: "EMAIL" },
      { key: "phone", value: '"+91 90021 11234"', kind: "PHONE" },
      { key: "aadhaar", value: '"8810 4421 0099"', kind: "AADHAAR" },
      { key: "feedback", value: '"Refund delayed - email priya@payapp.in"', kind: "EMAIL_INLINE" },
    ],
    after: [
      { key: "name", value: "[NAME]" },
      { key: "email", value: "[EMAIL]" },
      { key: "phone", value: "[PHONE]" },
      { key: "aadhaar", value: "[AADHAAR]" },
      { key: "feedback", value: '"Refund delayed - email [EMAIL]"' },
    ],
  },
];

function PiiThumb({ active }: { active: boolean }) {
  const [recIdx, setRecIdx] = useState(0);
  const [detected, setDetected] = useState(0);
  const [revealedLines, setRevealedLines] = useState<number>(0);
  const [swipingLines, setSwipingLines] = useState<boolean[]>(
    Array(PII_RECORDS[0].before.length).fill(false)
  );

  useEffect(() => {
    if (!active) {
      setRecIdx(0);
      setDetected(0);
      setRevealedLines(0);
      setSwipingLines(Array(PII_RECORDS[0].before.length).fill(false));
      return;
    }

    let isSubscribed = true;
    let timeouts: NodeJS.Timeout[] = [];

    const runRecordLoop = (currentIdx: number) => {
      if (!isSubscribed) return;

      setRecIdx(currentIdx);
      setDetected(0);
      setRevealedLines(0);
      setSwipingLines(Array(PII_RECORDS[currentIdx].before.length).fill(false));

      const record = PII_RECORDS[currentIdx];

      record.before.forEach((_, fieldIdx) => {
        // Trigger swipe effect
        const swipeTimeout = setTimeout(() => {
          if (!isSubscribed) return;

          setSwipingLines((prev) => {
            const next = [...prev];
            next[fieldIdx] = true;
            return next;
          });
          setDetected((d) => d + 1);

          // Reveal after-line
          const revealTimeout = setTimeout(() => {
            if (!isSubscribed) return;
            setRevealedLines((lines) => Math.max(lines, fieldIdx + 1));
          }, 350);
          timeouts.push(revealTimeout);
        }, 700 + fieldIdx * 900);

        timeouts.push(swipeTimeout);
      });

      // Complete hold then advance to next record
      const loopPeriod = 700 + record.before.length * 900 + 2400;
      const advanceTimeout = setTimeout(() => {
        if (!isSubscribed) return;
        runRecordLoop((currentIdx + 1) % PII_RECORDS.length);
      }, loopPeriod);
      timeouts.push(advanceTimeout);
    };

    runRecordLoop(0);

    return () => {
      isSubscribed = false;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [active]);

  const currentRecord = PII_RECORDS[recIdx];

  return (
    <div className="w-full h-full p-3 font-mono flex flex-col justify-center select-none text-[10px] md:text-xs">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* BEFORE Raw Pane */}
        <div className="bg-white/[0.025] border border-white/5 rounded-lg p-3 flex flex-col justify-between h-full relative overflow-hidden">
          <div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-400 uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              BEFORE · raw.jsonl
            </div>
            <div className="space-y-1 md:space-y-1.5 leading-relaxed text-white/70 overflow-hidden">
              {currentRecord.before.map((f, i) => {
                const isSwiping = swipingLines[i];
                return (
                  <div key={i} className="whitespace-nowrap truncate relative">
                    <span className="text-[#8db8d4]">"{f.key}":</span>{" "}
                    {f.kind ? (
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] relative overflow-hidden transition-all duration-300 ${
                          isSwiping
                            ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {f.value.replace(/^"|"$/g, "")}
                        {isSwiping && (
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
                            style={{
                              animation: "swipe 0.7s ease forwards",
                            }}
                          />
                        )}
                      </span>
                    ) : (
                      <span className="text-[#e6e0a8]">{f.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center text-[9px] text-white/40 mt-2 pt-2 border-t border-white/5">
            <span>PII detected: <b className="text-white font-bold">{detected}</b></span>
            <span>record {recIdx + 1}</span>
          </div>
        </div>

        {/* AFTER Redacted Pane */}
        <div className="bg-white/[0.025] border border-white/5 rounded-lg p-3 flex flex-col justify-between h-full relative overflow-hidden">
          <div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AFTER · redacted.jsonl
            </div>
            <div className="space-y-1 md:space-y-1.5 leading-relaxed text-white/50 overflow-hidden">
              {currentRecord.after.slice(0, revealedLines).map((f, i) => {
                // Highlight placeholders [NAME], [EMAIL], etc.
                const matches = f.value.match(/\[[A-Z_]+\]/g);
                const displayVal = matches
                  ? f.value.replace(
                      /\[([A-Z_]+)\]/g,
                      '<span class="bg-emerald-500 text-emerald-950 font-bold px-1.5 py-0.5 rounded text-[9px] mx-0.5 animate-pulse inline-block">[ $1 ]</span>'
                    )
                  : f.value;

                return (
                  <div key={i} className="whitespace-nowrap truncate">
                    <span className="text-[#8db8d4]">"{f.key}":</span>{" "}
                    {matches ? (
                      <span dangerouslySetInnerHTML={{ __html: displayVal }} />
                    ) : (
                      <span className="text-white/80">{f.value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center text-[9px] text-white/40 mt-2 pt-2 border-t border-white/5">
            <span className="text-emerald-400 font-medium">GDPR-compliant · verified</span>
            <span>audit ✓</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes swipe {
          from { transform: translateX(-110%); }
          to { transform: translateX(110%); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// 3. Audio Quality Filtering
// ============================================================
interface AudioClip {
  id: string;
  snr: number;
  ok: boolean;
}

const AUDIO_CLIPS: AudioClip[] = [
  { id: "hi_001", snr: 28.4, ok: true },
  { id: "hi_002", snr: 11.2, ok: false },
  { id: "ta_003", snr: 24.1, ok: true },
  { id: "hi_004", snr: 31.7, ok: true },
  { id: "ta_005", snr: 9.8, ok: false },
  { id: "hi_006", snr: 22.0, ok: true },
  { id: "ta_007", snr: 26.5, ok: true },
  { id: "hi_008", snr: 14.3, ok: false },
  { id: "ta_009", snr: 19.7, ok: true },
];

function AudioFilterThumb({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  const [clipStates, setClipStates] = useState<string[]>(
    Array(AUDIO_CLIPS.length).fill("idle")
  );
  const [clipSnrs, setClipSnrs] = useState<string[]>(
    Array(AUDIO_CLIPS.length).fill("--.- dB")
  );
  const [clipVerdicts, setClipVerdicts] = useState<string[]>(
    Array(AUDIO_CLIPS.length).fill("SCAN…")
  );
  // Bouncing heights for the active row waveform
  const [waveHeights, setWaveHeights] = useState<number[]>(
    Array(28).fill(8)
  );

  const [kept, setKept] = useState(100);
  const [quar, setQuar] = useState(0);
  const [reason, setReason] = useState("awaiting scan…");

  const reset = () => {
    setIdx(0);
    setClipStates(Array(AUDIO_CLIPS.length).fill("idle"));
    setClipSnrs(Array(AUDIO_CLIPS.length).fill("--.- dB"));
    setClipVerdicts(Array(AUDIO_CLIPS.length).fill("SCAN…"));
    setKept(100);
    setQuar(0);
    setReason("awaiting scan…");
    setWaveHeights(Array(28).fill(8));
  };

  useEffect(() => {
    if (!active) {
      reset();
      return;
    }

    reset();

    let isSubscribed = true;
    let mainTimer: NodeJS.Timeout | null = null;
    let waveInterval: NodeJS.Timeout | null = null;

    const runScanStep = (currentIdx: number) => {
      if (!isSubscribed) return;

      if (currentIdx >= AUDIO_CLIPS.length) {
        mainTimer = setTimeout(() => {
          reset();
          runScanStep(0);
        }, 2200);
        return;
      }

      setIdx(currentIdx);

      // Start simulating scanning animation on the active row
      setClipStates((prev) => {
        const next = [...prev];
        next[currentIdx] = "scanning";
        return next;
      });

      let frames = 0;
      if (waveInterval) clearInterval(waveInterval);
      waveInterval = setInterval(() => {
        setWaveHeights((prev) =>
          prev.map(() => 5 + Math.floor(Math.random() * 22))
        );
        frames++;
        if (frames > 7) {
          if (waveInterval) clearInterval(waveInterval);
        }
      }, 90);

      // Finish scanning after 650ms
      mainTimer = setTimeout(() => {
        if (!isSubscribed) return;

        const clip = AUDIO_CLIPS[currentIdx];

        setClipSnrs((prev) => {
          const next = [...prev];
          next[currentIdx] = `${clip.snr.toFixed(1)} dB`;
          return next;
        });

        if (!clip.ok) {
          setClipStates((prev) => {
            const next = [...prev];
            next[currentIdx] = "bad";
            return next;
          });
          setClipVerdicts((prev) => {
            const next = [...prev];
            next[currentIdx] = "QUARANTINE";
            return next;
          });

          setQuar((q) => {
            const nextQuar = q + 1;
            // Scale kept ratio proportionally (starts at 100, drops down as bad clips found)
            const nextKept = 100 - Math.round((nextQuar / AUDIO_CLIPS.length) * 23);
            setKept(nextKept);
            return nextQuar;
          });
          setReason("low SNR (< 18.0 dB)");
        } else {
          setClipStates((prev) => {
            const next = [...prev];
            next[currentIdx] = "good";
            return next;
          });
          setClipVerdicts((prev) => {
            const next = [...prev];
            next[currentIdx] = "PASS";
            return next;
          });
        }

        // Advance to next clip
        mainTimer = setTimeout(() => {
          runScanStep(currentIdx + 1);
        }, 460);
      }, 650);
    };

    mainTimer = setTimeout(() => {
      runScanStep(0);
    }, 400);

    return () => {
      isSubscribed = false;
      if (mainTimer) clearTimeout(mainTimer);
      if (waveInterval) clearInterval(waveInterval);
    };
  }, [active]);

  return (
    <div className="w-full h-full p-3 font-mono flex flex-col justify-center select-none text-[11px] md:text-xs">
      <div className="grid grid-cols-[1fr_180px] gap-3 h-full">
        {/* Clips list */}
        <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[220px] scrollbar-thin">
          {AUDIO_CLIPS.map((c, i) => {
            const state = clipStates[i];
            const snrText = clipSnrs[i];
            const verdictText = clipVerdicts[i];

            let rowClass = "bg-white/[0.015] border-white/5 border-l-2 border-l-emerald-500/35 opacity-70";
            let waveColor = "bg-emerald-500/50";
            let verdictClass = "bg-emerald-500/10 text-emerald-300";

            if (state === "scanning") {
              rowClass = "bg-emerald-500/10 border-white/10 border-l-2 border-l-emerald-400 opacity-100 scale-[1.01] shadow-lg";
              waveColor = "bg-emerald-400";
              verdictClass = "bg-emerald-500/20 text-emerald-300 animate-pulse";
            } else if (state === "good") {
              rowClass = "bg-white/[0.03] border-white/5 border-l-2 border-l-emerald-500 opacity-100";
              waveColor = "bg-emerald-500";
              verdictClass = "bg-emerald-500/20 text-emerald-300";
            } else if (state === "bad") {
              rowClass = "bg-red-500/5 border-white/5 border-l-2 border-l-red-500 opacity-50";
              waveColor = "bg-red-400";
              verdictClass = "bg-red-500/20 text-red-300";
            }

            return (
              <div
                key={i}
                className={`grid grid-cols-[20px_1fr_55px_75px] gap-2 items-center px-3 py-1 rounded border transition-all duration-300 ${rowClass}`}
              >
                <span className="text-[10px] text-white/30">{String(i + 1).padStart(2, "0")}</span>
                
                {/* Waveform visual */}
                <div className="flex items-center gap-[1px] h-4">
                  {Array.from({ length: 28 }).map((_, k) => {
                    const h = state === "scanning" ? waveHeights[k] : 4 + (Math.sin(k * 0.4) * 8 + 8) * (state === "bad" ? 0.6 : 0.8);
                    return (
                      <i
                        key={k}
                        className={`w-[2px] rounded-sm block ${waveColor}`}
                        style={{ height: `${h}px` }}
                      />
                    );
                  })}
                </div>

                <span className="text-[10px] font-semibold text-right">{snrText}</span>
                <span className={`text-[9px] font-bold tracking-wider rounded px-1 py-0.5 text-center ${verdictClass}`}>
                  {verdictText}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sidebar Stats */}
        <div className="flex flex-col gap-2 justify-between">
          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col justify-center">
            <div className="text-[9px] text-white/40 uppercase tracking-wider">Threshold · SNR</div>
            <div className="text-lg font-bold text-white mt-0.5">
              18.0 <span className="text-white/40 text-xs">dB</span>
            </div>
            <div className="text-[10px] text-white/40 mt-1">below = quarantined</div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col justify-center">
            <div className="text-[9px] text-white/40 uppercase tracking-wider">Kept</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">
              {kept} <span className="text-white/20 text-xs">/ 100</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${kept}%` }}
              />
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 flex flex-col justify-center">
            <div className="text-[9px] text-white/40 uppercase tracking-wider">Quarantined</div>
            <div className="text-lg font-bold text-red-400 mt-0.5">{100 - kept}</div>
            <div className="text-[10px] text-white/40 mt-1 truncate" title={reason}>
              {reason}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. Gold-Standard Validation
// ============================================================
const VALIDATION_ANNOTATORS = [
  { name: "A-014", target: 0.96 },
  { name: "A-027", target: 0.91 },
  { name: "A-031", target: 0.88 },
  { name: "A-045", target: 0.94 },
];

function ValidationThumb({ active }: { active: boolean }) {
  // Gauges
  const [precision, setPrecision] = useState(0);
  const [recall, setRecall] = useState(0);
  const [f1, setF1] = useState(0);

  // Annotator score percentages
  const [annScores, setAnnScores] = useState<number[]>([0, 0, 0, 0]);

  // Honeypot matrix cell states: "empty" | "hit" | "miss"
  const MATRIX_CELLS = 80;
  const [cells, setCells] = useState<string[]>(Array(MATRIX_CELLS).fill("empty"));
  const [honeypotCount, setHoneypotCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setPrecision(0);
      setRecall(0);
      setF1(0);
      setAnnScores([0, 0, 0, 0]);
      setCells(Array(MATRIX_CELLS).fill("empty"));
      setHoneypotCount(0);
      return;
    }

    let isSubscribed = true;
    let timeouts: NodeJS.Timeout[] = [];

    const startLoopAnimation = () => {
      if (!isSubscribed) return;

      // Reset states
      setPrecision(0);
      setRecall(0);
      setF1(0);
      setAnnScores([0, 0, 0, 0]);
      setCells(Array(MATRIX_CELLS).fill("empty"));
      setHoneypotCount(0);

      // Phase 1: Animate gauges (after 300ms)
      const gaugeTimeout = setTimeout(() => {
        if (!isSubscribed) return;

        // Simulate numerical counting
        let count = 0;
        const countInterval = setInterval(() => {
          count += 0.05;
          if (count >= 1.0) {
            clearInterval(countInterval);
            setPrecision(0.94);
            setRecall(0.91);
            setF1(0.92);
          } else {
            setPrecision(Number((count * 0.94).toFixed(2)));
            setRecall(Number((count * 0.91).toFixed(2)));
            setF1(Number((count * 0.92).toFixed(2)));
          }
        }, 50);

        // Keep reference to clear if unmounted
        const clearCounting = () => clearInterval(countInterval);
        timeouts.push(clearCounting as any);
      }, 300);
      timeouts.push(gaugeTimeout);

      // Phase 2: Fill annotator bars (after 700ms)
      VALIDATION_ANNOTATORS.forEach((a, i) => {
        const annTimeout = setTimeout(() => {
          if (!isSubscribed) return;

          setAnnScores((prev) => {
            const next = [...prev];
            next[i] = a.target;
            return next;
          });
        }, 700 + i * 200);
        timeouts.push(annTimeout);
      });

      // Phase 3: Populate honeypot cells progressively (after 1200ms)
      const matrixStartDelay = 1200;
      let revealedHitCount = 0;

      // Shuffle indices
      const indices = Array.from({ length: MATRIX_CELLS }, (_, k) => k);
      for (let k = indices.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [indices[k], indices[j]] = [indices[j], indices[k]];
      }

      indices.forEach((cellIdx, stepIdx) => {
        const cellTimeout = setTimeout(() => {
          if (!isSubscribed) return;

          const isMiss = Math.random() < 0.04; // ~4% miss rate
          if (!isMiss) revealedHitCount++;

          setCells((prev) => {
            const next = [...prev];
            next[cellIdx] = isMiss ? "miss" : "hit";
            return next;
          });

          // Scale progress indicator out of 200 honeypot items
          const scaledHoneypot = Math.round((revealedHitCount / (stepIdx + 1)) * 200 * ((stepIdx + 1) / MATRIX_CELLS));
          setHoneypotCount(scaledHoneypot);
        }, matrixStartDelay + stepIdx * 55);
        timeouts.push(cellTimeout);
      });

      // Complete cycle hold (total time + 3s hold), then restart
      const totalAnimationTime = matrixStartDelay + MATRIX_CELLS * 55;
      const loopTimeout = setTimeout(() => {
        if (isSubscribed) startLoopAnimation();
      }, totalAnimationTime + 3000);
      timeouts.push(loopTimeout);
    };

    startLoopAnimation();

    return () => {
      isSubscribed = false;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [active]);

  // SVG circular progress math helper
  const renderDial = (value: number) => {
    const radius = 22;
    const strokeWidth = 4.5;
    const circ = 2 * Math.PI * radius;
    const strokeDashoffset = circ * (1 - value);
    return (
      <svg className="w-14 h-14 md:w-16 md:h-16 mx-auto drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]" viewBox="0 0 54 54">
        <circle
          cx="27"
          cy="27"
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="transition-all duration-[1200ms] ease-out"
          cx="27"
          cy="27"
          r={radius}
          stroke="#10b981"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 27 27)"
          strokeDasharray={circ}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    );
  };

  return (
    <div className="w-full h-full p-3 font-mono flex flex-col justify-center select-none text-[10px] md:text-xs">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* Left Side: Metrics & Annotators */}
        <div className="flex flex-col gap-3 justify-between">
          {/* Gauges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: precision, lbl: "Precision" },
              { val: recall, lbl: "Recall" },
              { val: f1, lbl: "F1 Score" },
            ].map((g, i) => (
              <div key={i} className="bg-white/[0.025] border border-white/5 rounded-lg p-2 text-center relative overflow-hidden">
                <div className="relative">
                  {renderDial(g.val)}
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] md:text-xs font-bold text-white mt-[-2px]">
                    {g.val.toFixed(2)}
                  </div>
                </div>
                <div className="text-[8px] text-white/40 uppercase tracking-widest mt-1.5">{g.lbl}</div>
              </div>
            ))}
          </div>

          {/* Annotator scores */}
          <div className="bg-white/[0.025] border border-white/5 rounded-lg p-2.5 flex-1 flex flex-col justify-between">
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-1">
              Annotator scores · live
            </div>
            <div className="space-y-1.5">
              {VALIDATION_ANNOTATORS.map((a, i) => (
                <div key={i} className="grid grid-cols-[45px_1fr_30px] gap-2 items-center text-[10px] text-white/70">
                  <span>{a.name}</span>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-[900ms] ease-out"
                      style={{ width: `${annScores[i] * 100}%` }}
                    />
                  </div>
                  <span className="text-right text-emerald-300 font-semibold">{annScores[i].toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Honeypot Matrix */}
        <div className="bg-white/[0.025] border border-white/5 rounded-lg p-3 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-2">
              <span>Honeypot performance</span>
              <b className="text-emerald-400 font-mono text-[10px]">{honeypotCount} / 200</b>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-10 gap-[3px] max-w-full">
              {cells.map((state, i) => {
                let cellColor = "bg-white/5";
                let pulseClass = "";

                if (state === "hit") {
                  cellColor = "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]";
                  pulseClass = "scale-105";
                } else if (state === "miss") {
                  cellColor = "bg-red-400";
                  pulseClass = "scale-105";
                }

                return (
                  <i
                    key={i}
                    className={`aspect-square rounded-sm transition-all duration-300 block ${cellColor} ${pulseClass}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center text-[9px] text-white/40">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Hit
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Miss
              </span>
              <span className="text-emerald-300 font-bold">IAA ≥ 0.82</span>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-1.5 text-[10px] text-emerald-200 flex justify-between items-center">
              <span>Status</span>
              <span className="font-bold text-emerald-400">✓ BATCH CERTIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Dispatcher Component
// ============================================================
export function CleanedDatasetsInteractiveThumbnail({
  sampleId,
  active,
}: {
  sampleId: string;
  active: boolean;
}) {
  switch (sampleId) {
    case "dedup":
      return <DedupThumb active={active} />;
    case "pii":
      return <PiiThumb active={active} />;
    case "audio-filter":
      return <AudioFilterThumb active={active} />;
    case "validation":
      return <ValidationThumb active={active} />;
    default:
      return <DedupThumb active={active} />;
  }
}

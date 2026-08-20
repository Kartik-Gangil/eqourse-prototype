/**
 * Chat Route — Gemini API Proxy
 *
 * Security model:
 * - The Gemini API key stays server-side (GEMINI_API_KEY in backend .env).
 * - The system prompt is built SERVER-SIDE from src/utils/chatbotKnowledge.js.
 *   Any systemPrompt field sent by a client is ignored, so this endpoint can
 *   only ever act as the eQOURSE assistant — never as a general-purpose proxy.
 * - Per-IP rate limiting and strict input size caps protect against abuse
 *   and runaway token costs.
 */

const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const { buildSystemPrompt } = require("../utils/chatbotKnowledge");
const {
  extractCandidateText,
  isNaturalFinish,
  mergeReplyParts,
  shouldContinue,
} = require("../utils/chatResponse");

// ─── Abuse protection ────────────────────────────────────────────────────────

const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX_REQUESTS = 15;     // max chat messages per IP per window
const MESSAGE_MAX_CHARS = 1500;   // a genuine question fits well within this
const HISTORY_MAX_TURNS = 20;     // only the most recent turns are forwarded
const HISTORY_ENTRY_MAX_CHARS = 4000;
const PAGE_CONTEXT_PATTERN = /^\/[a-zA-Z0-9\-_/]{0,120}$/; // site pathname only
const GEMINI_REQUEST_TIMEOUT_MS = 20 * 1000;
const GEMINI_MAX_OUTPUT_TOKENS = 4096;
const GEMINI_MAX_CONTINUATIONS = 1;

const ipHits = new Map(); // ip -> array of request timestamps

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX_REQUESTS) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

// Periodically drop stale IPs so the map never grows unbounded
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, hits] of ipHits) {
    const fresh = hits.filter((t) => now - t < RATE_WINDOW_MS);
    if (fresh.length) ipHits.set(ip, fresh);
    else ipHits.delete(ip);
  }
}, 5 * 60 * 1000);
if (cleanupTimer.unref) cleanupTimer.unref();

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || "unknown";
}

async function fetchGemini(url, requestBody, apiKey) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Gemini API call ─────────────────────────────────────────────────────────

/**
 * POST /api/chat
 * Body: {
 *   message: string,
 *   history?: Array<{role: "user"|"model", text: string}>,
 *   pageContext?: string  // pathname the visitor is currently on, e.g. "/free-pilot"
 * }
 * Note: any client-sent systemPrompt is deliberately ignored.
 * Returns: { reply: string }
 */
router.post("/", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    logger.error("GEMINI_API_KEY is not set in environment");
    return res.status(500).json({
      success: false,
      reply: "I'm currently unavailable. Please try contacting us directly at info@eqourse.com or call +91-92144-45870.",
    });
  }

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({
      success: false,
      reply: "You're sending messages very quickly — give me a few seconds to catch up 😄 Please try again in a moment.",
    });
  }

  const { message, history = [], pageContext } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ success: false, reply: "Message is required." });
  }
  if (message.length > MESSAGE_MAX_CHARS) {
    return res.status(400).json({
      success: false,
      reply: `That message is a little long for me — could you shorten it to under ${MESSAGE_MAX_CHARS} characters?`,
    });
  }

  // Build the system prompt server-side, optionally tailored to the page the
  // visitor is browsing (pathname only — anything else is discarded).
  const safePageContext =
    typeof pageContext === "string" && PAGE_CONTEXT_PATTERN.test(pageContext)
      ? pageContext
      : undefined;
  const systemPrompt = buildSystemPrompt(safePageContext);

  try {
    // Gemini 3.7 Flash is Google's latest stable Flash model. Keep an
    // environment override so production can pin or upgrade without a code edit.
    const model = process.env.GEMINI_CHAT_MODEL || "gemini-3.7-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    // Cap and sanitise history, then build contents array + current message
    const contents = [];
    const recentHistory = Array.isArray(history) ? history.slice(-HISTORY_MAX_TURNS) : [];
    for (const entry of recentHistory) {
      if (!entry || typeof entry.text !== "string" || entry.text.length === 0) continue;
      contents.push({
        role: entry.role === "model" ? "model" : "user",
        parts: [{ text: entry.text.slice(0, HISTORY_ENTRY_MAX_CHARS) }],
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const requestBody = {
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig: {
        // This is a factual service chatbot, not a complex reasoning task.
        // Gemini 3.7 supports LOW/MEDIUM/HIGH; LOW keeps chat latency controlled.
        thinkingConfig: { thinkingLevel: "LOW" },
        maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    let activeContents = contents;
    const replyParts = [];
    let finalFinishReason;
    let continued = false;

    for (let attempt = 0; attempt <= GEMINI_MAX_CONTINUATIONS; attempt += 1) {
      const response = await fetchGemini(url, { ...requestBody, contents: activeContents }, apiKey);

      if (!response.ok) {
        const errorText = await response.text();
        logger.error(`Gemini API error (${response.status}): ${errorText}`);
        return res.status(502).json({
          success: false,
          reply: "I'm having trouble connecting right now. Please try again in a moment, or contact us at info@eqourse.com.",
        });
      }

      const data = await response.json();
      const candidate = data?.candidates?.[0];
      const responseText = extractCandidateText(candidate);
      finalFinishReason = candidate?.finishReason;

      if (responseText) replyParts.push(responseText);

      if (isNaturalFinish(finalFinishReason)) break;

      logger.warn(
        `Gemini chat stopped with ${finalFinishReason || "UNKNOWN"}; attempt ${attempt + 1}, ` +
        `outputTokens=${data?.usageMetadata?.candidatesTokenCount ?? "unknown"}, ` +
        `thoughtTokens=${data?.usageMetadata?.thoughtsTokenCount ?? "unknown"}`
      );

      if (shouldContinue(finalFinishReason, responseText, attempt, GEMINI_MAX_CONTINUATIONS)) {
        continued = true;
        activeContents = [
          ...activeContents,
          // Preserve the complete model content, including thought signatures.
          candidate.content,
          {
            role: "user",
            parts: [{
              text: "Continue the same answer from exactly where it stopped. Complete every remaining item, do not repeat earlier text, and end with a complete sentence.",
            }],
          },
        ];
        continue;
      }

      // Safety, recitation and other abnormal stops must never masquerade as a
      // successfully completed answer or leak a misleading partial response.
      return res.status(502).json({
        success: false,
        reply: "I couldn't complete that answer reliably. Please try rephrasing the question, or contact us at info@eqourse.com.",
      });
    }

    const reply = mergeReplyParts(replyParts);
    if (!reply || !isNaturalFinish(finalFinishReason)) {
      logger.error(`Gemini chat remained incomplete after continuation; finishReason=${finalFinishReason || "UNKNOWN"}`);
      return res.status(502).json({
        success: false,
        reply: "I couldn't complete that answer reliably. Please try again, or contact us at info@eqourse.com.",
      });
    }

    return res.json({ success: true, reply, complete: true, finishReason: finalFinishReason || "STOP", continued });
  } catch (err) {
    logger.error(`Chat endpoint error: ${err.message}`);
    const timedOut = err?.name === "AbortError";
    return res.status(500).json({
      success: false,
      reply: timedOut
        ? "That response took too long, so I stopped it instead of leaving the chat hanging. Please try again."
        : "Something went wrong on my end. Please try again, or reach us at info@eqourse.com or +91-92144-45870.",
    });
  }
});

module.exports = router;

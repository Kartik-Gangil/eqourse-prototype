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

// ─── Abuse protection ────────────────────────────────────────────────────────

const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX_REQUESTS = 15;     // max chat messages per IP per window
const MESSAGE_MAX_CHARS = 1500;   // a genuine question fits well within this
const HISTORY_MAX_TURNS = 20;     // only the most recent turns are forwarded
const HISTORY_ENTRY_MAX_CHARS = 4000;
const PAGE_CONTEXT_PATTERN = /^\/[a-zA-Z0-9\-_/]{0,120}$/; // site pathname only

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
    // v1beta endpoint with gemini-3.5-flash (fastest model with top reasoning for chatbots)
    const model = "gemini-3.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`Gemini API error (${response.status}): ${errorText}`);
      return res.status(502).json({
        success: false,
        reply: "I'm having trouble connecting right now. Please try again in a moment, or contact us at info@eqourse.com.",
      });
    }

    const data = await response.json();

    // Extract the reply text
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, but I couldn't generate a response. Please try rephrasing your question, or contact us directly at info@eqourse.com.";

    return res.json({ success: true, reply });
  } catch (err) {
    logger.error(`Chat endpoint error: ${err.message}`);
    return res.status(500).json({
      success: false,
      reply: "Something went wrong on my end. Please try again, or reach us at info@eqourse.com or +91-92144-45870.",
    });
  }
});

module.exports = router;

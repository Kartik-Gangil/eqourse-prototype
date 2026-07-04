/**
 * Chat Route — Gemini API Proxy
 *
 * Keeps the Gemini API key server-side so it is never exposed to the browser.
 * The frontend calls POST /api/chat with { message, history } and this
 * endpoint forwards it to the Gemini API with the system prompt.
 *
 * Environment variable: GEMINI_API_KEY (set in backend .env)
 */

const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

// ─── Gemini API call ─────────────────────────────────────────────────────────

/**
 * POST /api/chat
 * Body: { message: string, history: Array<{role: "user"|"model", text: string}>, systemPrompt: string }
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

  const { message, history = [], systemPrompt = "" } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ success: false, reply: "Message is required." });
  }

  try {
    // Build the Gemini API request body
    // We use the v1beta endpoint with gemini-3.5-flash (fastest model with top reasoning for chatbots)
    const model = "gemini-3.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Build contents array from history + current message
    const contents = [];

    // Add conversation history
    for (const entry of history) {
      contents.push({
        role: entry.role === "model" ? "model" : "user",
        parts: [{ text: entry.text }],
      });
    }

    // Add the current user message
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

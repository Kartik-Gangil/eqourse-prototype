/**
 * Gemini response helpers kept separate from the route so truncation handling
 * can be unit tested without making a network request.
 */

function extractCandidateText(candidate) {
  const parts = Array.isArray(candidate?.content?.parts) ? candidate.content.parts : [];

  return parts
    .filter((part) => part && part.thought !== true && typeof part.text === "string")
    .map((part) => part.text)
    .join("")
    .trim();
}

function isNaturalFinish(finishReason) {
  // Older responses have occasionally omitted finishReason for a normal
  // non-streaming completion, so an absent value remains backward compatible.
  return !finishReason || finishReason === "STOP";
}

function shouldContinue(finishReason, text, attempt, maxContinuations) {
  return (
    finishReason === "MAX_TOKENS" &&
    typeof text === "string" &&
    text.trim().length > 0 &&
    attempt < maxContinuations
  );
}

function mergeReplyParts(parts) {
  return parts
    .map((part) => (typeof part === "string" ? part.trim() : ""))
    .filter(Boolean)
    .join("\n")
    .trim();
}

module.exports = {
  extractCandidateText,
  isNaturalFinish,
  mergeReplyParts,
  shouldContinue,
};

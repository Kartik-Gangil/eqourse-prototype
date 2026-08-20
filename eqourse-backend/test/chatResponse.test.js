const test = require("node:test");
const assert = require("node:assert/strict");
const {
  extractCandidateText,
  isNaturalFinish,
  mergeReplyParts,
  shouldContinue,
} = require("../src/utils/chatResponse");

test("extractCandidateText joins every visible text part and skips thoughts", () => {
  const candidate = {
    content: {
      parts: [
        { text: "First paragraph.\n" },
        { text: "Internal summary", thought: true },
        { thoughtSignature: "opaque" },
        { text: "Second paragraph." },
      ],
    },
  };

  assert.equal(extractCandidateText(candidate), "First paragraph.\nSecond paragraph.");
});

test("MAX_TOKENS requests a continuation while STOP is complete", () => {
  assert.equal(shouldContinue("MAX_TOKENS", "1. First item", 0, 2), true);
  assert.equal(shouldContinue("MAX_TOKENS", "1. First item", 2, 2), false);
  assert.equal(shouldContinue("STOP", "Complete answer.", 0, 2), false);
  assert.equal(isNaturalFinish("STOP"), true);
  assert.equal(isNaturalFinish("MAX_TOKENS"), false);
});

test("mergeReplyParts preserves all continuation segments", () => {
  assert.equal(
    mergeReplyParts(["1. First\n2. Second", "3. Third\n4. Fourth"]),
    "1. First\n2. Second\n3. Third\n4. Fourth"
  );
});

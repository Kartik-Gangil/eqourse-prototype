export const evaluationFaqs = [
  ["What is LLM evaluation?", "Structured measurement of how well a language model performs the task it was built for — factual accuracy, groundedness, instruction following, multi-turn coherence, domain correctness, safety behaviour and language quality — against a written rubric on a test set that reflects real usage. It differs from red teaming, which tries to break the model, and from A/B testing, which measures what users prefer in production."],
  ["We already use LLM-as-a-judge. Why would we need human evaluation?", "Because the judge needs a reference point. LLM judges reach over 80% agreement with humans on well-structured tasks, but they carry documented position, verbosity and self-preference biases, and a RAND study found no judge uniformly reliable across benchmarks. Industry guidance holds that divergence above 20–25% from human spot-checks means the judge needs recalibrating for your domain. Most teams have never measured their divergence. We baseline it, diagnose the bias pattern, recalibrate and monitor for drift — so you can keep evaluating at automated scale with numbers you can defend."],
  ["What is position bias in an LLM judge?", "A systematic preference for a response based on where it appears rather than how good it is. Research across roughly 150,000 evaluation instances and 15 judges found position bias varies significantly by judge and task and is not attributable to chance — some judges favour the first response, some the last. It matters most in pairwise comparison, which is how most model-versus-model evaluation is run. We randomise and counterbalance presentation order in human evaluation, and test for it explicitly when calibrating a judge."],
  ["How do you evaluate hallucination?", "We separate unsupported claims from contradicted ones, because they have different causes and different fixes. For RAG systems we check each claim against the retrieved context and verify that citations exist and actually support the claim attached to them. For open-domain generation, domain SMEs verify factual claims against authoritative sources. Fluent, confident, well-cited and wrong is the hardest case and the one that most needs a human who knows the field."],
  ["Do you evaluate RAG systems?", "Yes, and we measure retrieval and generation separately — context precision, context recall, faithfulness, answer relevance, citation accuracy and noise sensitivity. A blended quality score can't tell you whether retrieval missed the document or generation ignored it, and those need completely different fixes."],
  ["Can you evaluate agents that call tools?", "Yes. Agent evaluation covers task completion, tool selection, parameter accuracy, trajectory efficiency, error recovery, stopping behaviour and whether the agent's own report of what it did matches what it actually did. A correct final answer reached through a broken path passes end-state testing and fails in production."],
  ["Why can't we just use benchmark scores?", "Four reasons: benchmarks are published and may be in the training data; they measure benchmark-shaped questions rather than your users' messy real ones; a single headline number averages over exactly the slices you care about; and most are English-first, so strong benchmark performance says little about Tamil or Odia. Benchmarks are useful context. A golden set built from your own traffic is evidence."],
  ["Do you evaluate in Indian languages?", "Yes — 12+ Indian languages including romanised and code-mixed variants, with evaluation sets authored natively rather than translated from English. We report per language and never blend into a single multilingual score, because a strong English average routinely hides a weak result elsewhere."],
  ["How long does an evaluation take?", "A first engagement covering one or two languages typically runs 5–6 weeks, most of it in golden set construction and rubric calibration. Once those exist, subsequent cycles run 1–2 weeks. Judge calibration against an existing test set runs 2–3 weeks."],
  ["Who owns the golden set and rubrics?", "You do. They are built from your traffic, versioned, and delivered to you with the report — along with the calibrated judge configuration where that's in scope. The report describes one model at one moment; the golden set keeps working every release afterwards."],
] as const;

export const capabilityAreas = [
  ["Factual accuracy & hallucination", "Separate unsupported claims from contradicted claims so each failure points to the right fix."],
  ["Groundedness & attribution", "Verify that RAG answers and citations are actually supported by the retrieved passage."],
  ["Instruction following", "Test format, length, exclusions, tone and layered constraints as instructions accumulate."],
  ["Multi-turn coherence", "Measure context, state, corrections and consistency across realistic conversations."],
  ["Domain correctness", "Use subject-matter experts where fluent output can still be confidently wrong."],
  ["Sentiment & intent accuracy", "Evaluate sarcasm, indirect refusal, emotional tone, code-mixing and culturally specific registers."],
  ["Safety & policy compliance", "Measure both unsafe compliance and product-damaging over-refusal."],
  ["Agent trajectory", "Review tool choice, parameters, recovery, stopping behaviour and the path to the final answer."],
  ["Language & register quality", "Test native fluency, register, script and code-mixed use per language rather than in aggregate."],
] as const;

export const boundaryRows = [
  ["A/B testing with users", "A/B testing tells you which model real users prefer in production. Evaluation tells you why, offline, before either reaches users."],
  ["Red teaming", "Red teaming assumes the intended job works and asks what else the model can be made to do."],
  ["RLHF annotation", "RLHF produces preference data that trains the model. Evaluation measures the trained model. Same skill, opposite direction."],
  ["Benchmark scores", "Public benchmarks measure general capability on data that may be in the training set—not your documents, users or task."],
] as const;

export const methodRows = [
  ["Reference-based scoring", "Compare output to a known-correct reference answer", "Closed-form tasks, extraction, classification", "Penalises correct answers phrased differently"],
  ["Rubric scoring", "Trained raters score dimension by dimension", "Open-ended generation", "Rubric quality is everything"],
  ["Pairwise preference", "Raters choose between two outputs", "Model or version comparison", "Position effects; order must be counterbalanced"],
  ["Rating with adjudication", "Disagreements escalate to a senior reviewer", "High-stakes, domain-heavy evaluation", "Slower and more expensive"],
  ["Error taxonomy annotation", "Every failure receives a defined error type", "An actionable improvement backlog", "Needs a product-specific taxonomy"],
  ["Golden set construction", "A curated, versioned set with reference answers", "The foundation for repeatable evaluation", "Must evolve with product and users"],
] as const;

export const judgeFailureRows = [
  ["Ceiling on agreement", "Research reports over 80% agreement with humans on well-structured tasks; the remaining cases still affect product decisions."],
  ["Position bias", "Research across roughly 150,000 instances and 15 judges found non-random primacy, recency and task-dependent position effects."],
  ["Self-preference", "Judges can under-penalise errors produced by their own model family."],
  ["Verbosity bias", "Longer answers may receive higher scores independent of quality."],
  ["No universal reliability", "A RAND study found no judge uniformly reliable across benchmarks."],
  ["Hard cases collapse", "Research found frontier models exceeding 50% error on challenging bias benchmarks."],
] as const;

export const ragRows = [
  ["Context precision", "Of what was retrieved, how much was relevant?", "Answer buried in noise; model follows the wrong passage"],
  ["Context recall", "Of what was needed, how much was retrieved?", "Document existed; retrieval missed it; model improvises"],
  ["Faithfulness / groundedness", "Is every answer claim supported by context?", "Fluent claim appears nowhere in the source"],
  ["Answer relevance", "Does the answer address the actual question?", "Correct, grounded and about something else"],
  ["Citation accuracy", "Do citations exist and support their claims?", "Real document, plausible quote, unsupported claim"],
  ["Noise sensitivity", "Does irrelevant context change the answer?", "One off-topic passage flips the response"],
] as const;

export const failureRows = [
  ["Uncalibrated judge trusted as ground truth", "Pipeline measures judge preference", "Measure divergence against human labels first"],
  ["Single-turn only", "Real conversations degrade by later turns", "Include multi-turn evaluation by default"],
  ["Vague rubric", "Low agreement hidden by clean averages", "Pilot and revise until agreement clears threshold"],
  ["Golden set from clean questions", "Testing reflects questions nobody asks", "Sample real traffic and stratify difficulty"],
  ["Fluency mistaken for correctness", "Confident wrong answers score highly", "SMEs score correctness separately"],
  ["Blended multilingual score", "English hides weaker languages", "Report every language separately"],
  ["Benchmarks used as product evidence", "Contaminated, mismatched evidence", "Build a product-specific golden set"],
  ["Agent judged only on final answer", "Broken trajectory passes", "Review trajectory and tool calls"],
  ["No agreement statistics", "Signal and noise cannot be separated", "Report alpha or kappa first"],
  ["Machine-translated eval sets", "The translator becomes the thing measured", "Author each set natively"],
] as const;

export const engagementSteps = [
  ["01", "Scope & success definition", "Week 1", "Define tasks, languages and what good means."],
  ["02", "Golden set construction", "Weeks 1–3", "Stratify real traffic and create references."],
  ["03", "Rubric & rater calibration", "Weeks 2–3", "Pilot until evaluator agreement is defensible."],
  ["04", "Evaluation", "Weeks 3–5", "Run blinded ratings and adjudicate disagreements."],
  ["05", "Analysis & taxonomy", "Weeks 5–6", "Slice results and classify every failure."],
  ["06", "Report & walkthrough", "Week 6", "Deliver evidence, assets and an ML-team review."],
] as const;

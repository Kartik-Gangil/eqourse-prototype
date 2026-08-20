export const humanEvaluationFaqs = [
  ["Do you run our A/B test?", "No, and we'd be cautious about anyone who says they will. A live experiment runs on your infrastructure — your traffic, your feature flags, your analytics, your statistics. What we supply is the human judgement layer inside it: blind quality scoring of sampled outputs from each arm, on your cadence, so the experiment has a quality signal rather than only business metrics and thumbs-up data. Separately, we run the full blind comparison study that happens before an experiment, which decides which candidate is worth testing at all."],
  ["Why not just use thumbs up/down data?", "Because it's documented to correlate more with engagement than with quality. Satisfied users rate more often; frustrated users tend to leave rather than rate. Response rates are low and non-random. It's genuinely useful as a directional signal at volume, and it cannot tell you whether one model's answers are better than another's."],
  ["What makes a preference comparison trustworthy?", "Blinding, order randomisation with counterbalancing, a piloted rubric with worked examples, a graded scale that permits ties, reason codes on every verdict, a panel recruited to resemble your users, and measured inter-rater agreement reported before any finding. Miss any one of those and the result may be measuring position effects, rater expectations or a population you don't serve."],
  ["What is the peeking problem?", "Checking experiment results before the planned endpoint inflates the false positive rate above the nominal 5%, and the inflation grows with each check — with daily checks on a multi-week test, the real rate can be several times nominal. A meaningful share of significant wins found that way are noise. Established fixes are pre-planned interim analyses with alpha-spending functions, always-valid confidence sequences that permit unlimited monitoring, or simply hiding p-values until the planned endpoint. We don't run your statistics, but we ask how many times you plan to look, because it changes how much human scoring you need and when."],
  ["Our offline evals and our A/B test disagree. Which is right?", "Probably both, measuring different things. Offline evals measure the rubric; live experiments measure behaviour, and behaviour includes latency, formatting, length and things the rubric never encoded. There's a well-known practitioner example of a prompt tweak that improved eval scores while the A/B test showed worse business results. When they diverge, the useful move is to read the outputs rather than pick a side — that's a two-week engagement and one of the more valuable things we do."],
  ["How many comparisons do we need?", "It depends on the effect size you need to detect and the variance observed in a pilot batch — not on a historical estimate, because a model swap can change the variance of your metrics substantially. We run a pilot, size from what we observe, and tell you plainly when a sample can't support the claim you want to make."],
  ["Can you compare models in Indian languages?", "Yes — 12+ Indian languages with native-speaker raters, including romanised and code-mixed registers. Results are reported per language, never blended, because a model that wins in English while losing in Tamil is not a model you should ship into a multilingual market on the strength of an average."],
  ["What if the two models are equally good?", "Then we report a tie, and that's a valuable result. It means the decision moves to cost and latency, where the answer is usually clearer. We use a graded scale with an explicit tie option precisely so raters aren't forced to manufacture a preference that doesn't exist."],
  ["How is this different from your RLHF annotation service?", "Same activity, opposite purpose. RLHF annotation collects human preferences to train a model — the deliverable is a dataset. Human evaluation collects human preferences to choose between models — the deliverable is a decision. The rubrics, blinding and quality controls are similar; what happens to the output is completely different."],
  ["How is this different from your LLM evaluation service?", "LLM evaluation scores one model against a rubric across dimensions like accuracy, grounding and instruction following — it answers how good is this? Human evaluation and A/B testing compares candidates head to head — it answers which one ships? Most teams need both, usually in that order."],
] as const;

export const boundaryRows = [
  ["Own the traffic, the flags and the rollout", "Design and run the human judgement layer"],
  ["Run the experiment and compute significance", "Score sampled outputs blind, at your cadence"],
  ["Decide the ship criteria", "Tell you whether the quality signal supports the decision"],
  ["Hold the business metrics", "Produce the quality metric your business metrics cannot see"],
] as const;

export const preferenceControls = [
  ["Blind", "Labels, formatting tells and version markers are stripped."],
  ["Counterbalanced", "Presentation order is randomised per item and balanced across the study."],
  ["Rubric-anchored", "Written criteria and worked examples are piloted before production scoring."],
  ["Graded", "Strong preference, slight preference and tie in both directions."],
  ["Reason captured", "Every non-tie verdict carries an actionable reason code."],
  ["Agreement measured", "Inter-rater agreement is reported before findings."],
  ["Close calls escalated", "Split items receive more raters or adjudication."],
] as const;

export const signalRows = [
  ["Thumbs up / down", "Cheap, always-on, directionally useful at scale", "Correlates strongly with engagement; response is low and non-random"],
  ["Outcome metrics", "Retention, task completion and conversion", "Lagging, noisy and confounded by other changes"],
  ["Behavioural proxies", "Acceptance, regeneration, copy and edit", "Fast and informative, but still proxies"],
  ["Automated eval scores", "Cheap regression measurement", "Measure what the rubric or judge encodes"],
  ["Safety floors", "Hallucination, toxicity and PII constraints", "Passing a constraint does not identify the better model"],
] as const;

export const liveExperimentSupport = [
  ["Stratified traffic sampling", "Both arms sampled across task, language, segment and difficulty."],
  ["Blind scoring on cadence", "Arm identity stripped; batches returned while the decision remains open."],
  ["Quality guardrail", "A business lift cannot quietly purchase worse answers."],
  ["Safety-floor monitoring", "Hallucination, policy violation and PII exposure reported as constraints."],
  ["Segment breakdowns", "Language, cohort and task type are standard report lines."],
  ["Divergence diagnosis", "When online and offline disagree, we read the outputs and explain why."],
] as const;

export const engagementSteps = [
  ["01", "Scope & decision", "Week 1", "Define what would change the ship decision and which segments stand alone."],
  ["02", "Sample & rubric", "Weeks 1–2", "Stratify prompts or traffic; pilot and revise the comparison rubric."],
  ["03", "Panel calibration", "Week 2", "Recruit to profile and clear an agreement threshold before scoring."],
  ["04", "Blind comparison", "Weeks 2–4", "Counterbalance order, capture reasons and escalate close calls."],
  ["05", "Analysis", "Week 4", "Report confidence intervals, slices, preference strength and reasons."],
  ["06", "Report & walkthrough", "Weeks 4–5", "Review clearest wins, losses and ties with product and ML together."],
] as const;

export const failureRows = [
  ["Unblinded raters", "Expectation becomes preference", "Strip labels and formatting tells"],
  ["Fixed presentation order", "Position becomes quality", "Randomise and counterbalance"],
  ["Forced binary choice", "Ties become coin flips", "Graded preference with tie"],
  ["Panel unlike the users", "The wrong population is measured", "Recruit to documented profile"],
  ["Peeking", "Noise ships as a win", "Agree check count; recommend sequential methods"],
  ["Historical power calculation", "Changed variance leaves test underpowered", "Size from pilot-observed variance"],
  ["Single generation", "One draw becomes a model property", "Repeat where the call is close"],
  ["Aggregate-only reporting", "A harmed segment disappears", "Standard segment breakdowns"],
  ["Thumbs-up as quality", "Engagement is mistaken for quality", "Rubric-anchored human judgement"],
  ["Binary winner framing", "A costly narrow win reads as a mandate", "Always report strength"],
  ["No agreement statistics", "Signal cannot be distinguished from noise", "Alpha or kappa before findings"],
] as const;

export const deliverables = [
  ["Preference report", "Overall rate and confidence interval plus task, difficulty, language, cohort and length slices"],
  ["Strength distribution", "Strong, slight and tie in both directions"],
  ["Reason-code analysis", "Why one model won, aggregated and ranked"],
  ["Worked examples", "Clearest wins, losses and ties with outputs"],
  ["Agreement statistics", "Reported before findings"],
  ["Panel composition", "Recruitment criteria and achieved profile"],
  ["Segment warnings", "Places where the overall winner lost locally"],
  ["Rubric & calibration set", "Versioned, delivered and reusable"],
  ["Live experiment scoring", "Per-arm quality and safety floors where scoped"],
  ["Live walkthrough", "Product and ML review together"],
] as const;

export const engagementModels = [
  ["Model comparison study", "Blind comparison before anything goes live", "4–5 weeks"],
  ["Live experiment support", "Human quality and safety-floor scoring", "2–4 day batches"],
  ["Divergence investigation", "Explain offline versus online disagreement", "2 weeks"],
  ["Ongoing preference programme", "Recurring release comparison", "1–2 weeks per cycle"],
] as const;

export const relatedServices = [
  ["LLM Evaluation", "/ai-data-services/model-testing/llm-evaluation"],
  ["AI Bias & Fairness Audit", "/ai-data-services/model-testing/bias-fairness-audit"],
  ["AI Red Teaming", "/ai-data-services/model-testing/ai-red-teaming"],
  ["ASR & Speech Model Testing", "/ai-data-services/model-testing/asr-speech-model-testing"],
  ["Computer Vision Model Testing", "/ai-data-services/model-testing/computer-vision-model-testing"],
  ["LLM & RLHF Annotation", "/ai-data-services/annotation-labeling/llm-rlhf-annotation"],
] as const;

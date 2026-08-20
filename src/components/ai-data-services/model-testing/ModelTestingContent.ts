export const modelTestingFaqs = [
  ["What is AI model testing?", "AI model testing evaluates a testable model against defined quality, safety and product requirements. It uses realistic, adversarial and segmented inputs to show where behaviour is reliable, where it fails and whether it is ready to ship."],
  ["How is model testing different from training data or RLHF?", "Training-data and RLHF programmes create data used to train or align a model. Model testing produces an independent verdict on the resulting behaviour. A programme may use both, but their evidence and acceptance criteria are different."],
  ["Which models can eQOURSE test?", "We support LLMs, RAG systems, conversational agents, ASR and speech models, TTS systems, NLP classifiers, computer-vision and video models, multimodal systems, and recommendation or ranking models."],
  ["Do you test only accuracy?", "No. Depending on the model, testing can cover task success, factuality, groundedness, safety, fairness, robustness, latency, word or character error rate, intent accuracy, user preference and performance by segment."],
  ["What is AI red teaming?", "AI red teaming deliberately probes a model with misuse, adversarial and boundary-case scenarios to expose unsafe behaviour, policy gaps and fragile controls before release."],
  ["Can you audit AI bias and fairness?", "Yes. We compare model behaviour across relevant language, accent, demographic, geography and use-case segments. The sampling plan and fairness criteria are defined with the client before testing."],
  ["Can you test multilingual and accented models?", "Yes. eQOURSE supports evaluation across 30+ global languages, with broad Indian regional-language coverage plus native review of accents, dialects, code-mixed and romanised inputs where relevant."],
  ["How are evaluators selected?", "Evaluators are matched to language, locale, domain and task requirements. Specialist or subject-matter review is added where a general evaluator cannot make a reliable judgement."],
  ["What does a model-testing report include?", "Reports can include overall and segment-level results, failure categories, severity, representative examples, confidence intervals, evaluator agreement, pass or fail decisions and prioritised recommendations."],
  ["Can you build a test set without testing our model?", "Yes. We can design and deliver realistic, adversarial, demographic, regression or golden test sets with documented coverage and acceptance criteria."],
  ["Can testing run in our environment?", "Yes. Subject to technical scoping, work can run through a client-hosted environment, controlled API access or an agreed managed workflow with role-based access, audit trails and defined retention."],
  ["How long does AI model testing take?", "Timing depends on model access, test-set size, modalities, languages, evaluator qualifications, security and reporting depth. A pilot is used to validate the method before a full schedule is committed."],
  ["How much does AI model testing cost?", "Cost depends on model type, number of scenarios and variants, evaluator expertise, language and segment coverage, repetitions, red-team depth, reporting and security requirements."],
  ["Can eQOURSE help after testing finds failures?", "Yes. Findings can feed a connected data programme covering collection, annotation, cleaning, curation and re-testing. The model owner remains responsible for model changes and deployment decisions."],
] as const;

export const testingMethods = [
  ["Human Evaluation & A/B Testing", "Compare model variants with blind, counterbalanced human preference and representative rater panels.", "/ai-data-services/model-testing/human-evaluation-ab-testing"],
  ["ASR & Speech Model Testing", "Measure WER, CER, semantic and entity errors across accents, dialects, speakers and production acoustic conditions.", "/ai-data-services/model-testing/asr-speech-model-testing"],
  ["Sentiment & Intent Accuracy Testing", "Evaluate meaning, hallucination, RAG groundedness, instruction following and agent quality with human-calibrated evidence.", "/ai-data-services/model-testing/llm-evaluation"],
  ["Edge Case Discovery & Red Teaming", "Probe adversarial, rare, ambiguous and multi-turn inputs that clean benchmarks underrepresent.", "/ai-data-services/model-testing/ai-red-teaming"],
] as const;

export const modelTypeServices = [
  ["LLM Evaluation", "Factuality, instruction following, groundedness, reasoning quality, RAG faithfulness and agent task success.", "/ai-data-services/model-testing/llm-evaluation"],
  ["AI Bias & Fairness Audit", "Compare outcomes across the language, accent, demographic and contextual segments that matter to deployment.", "/ai-data-services/model-testing/bias-fairness-audit"],
  ["AI Red Teaming & Safety Testing", "Structured misuse, jailbreak, policy-boundary and high-severity scenario testing with reproducible evidence.", "/ai-data-services/model-testing/ai-red-teaming"],
  ["ASR & Speech Model Testing", "WER, CER, semantic, entity, diarization, accent, dialect and noisy-condition evaluation.", "/ai-data-services/model-testing/asr-speech-model-testing"],
  ["Computer Vision Model Testing", "Measure detection, classification, segmentation, tracking, OCR and VLM behaviour with real-world test sets and slice-level failure analysis.", "/ai-data-services/model-testing/computer-vision-model-testing"],
  ["Human Evaluation & A/B Testing", "Blind side-by-side comparison and quality scoring for live experiments, with preference strength and measured agreement.", "/ai-data-services/model-testing/human-evaluation-ab-testing"],
] as const;

export const processSteps = [
  ["01", "Define the decision", "Agree what must be true before the model can ship."],
  ["02", "Map risks and segments", "Prioritise users, languages, conditions and failure severity."],
  ["03", "Build the test set", "Create realistic, adversarial, edge and regression cases."],
  ["04", "Calibrate evaluators", "Train reviewers on rubrics, anchors, ties and abstentions."],
  ["05", "Run blinded evaluation", "Separate model identity from the human judgement signal."],
  ["06", "Analyse by segment", "Report distributions and failure modes, not one blended score."],
  ["07", "Decide and re-test", "Prioritise fixes, preserve regression cases and loop back to step three."],
] as const;

export const modelTypes = [
  ["Large language models", "Factuality, safety, usefulness, instruction following, RAG and agents"],
  ["ASR & speech recognition", "WER, CER, speaker, accent, noise and code-switch performance"],
  ["Text-to-speech", "Naturalness, intelligibility, pronunciation and speaker consistency"],
  ["NLP classifiers", "Intent, sentiment, entity and category accuracy by segment"],
  ["Computer vision", "Detection, classification, segmentation and robustness"],
  ["Video models", "Tracking, temporal events, action and identity consistency"],
  ["Multimodal systems", "Cross-modal grounding, contradiction and task completion"],
  ["Recommendation & ranking", "Relevance, preference, coverage and fairness"],
  ["Conversational agents", "Multi-turn memory, tool use, recovery and end-to-end success"],
] as const;

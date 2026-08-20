export const biasFairnessFaqs = [
  ["What is an AI bias audit?", "A structured measurement of whether an AI system produces materially different outcomes, or materially different quality of service, for different groups of people. It states which fairness definition was used, which groups were tested, what data the test ran on, and what disparities were found—with sample sizes and confidence intervals, so the finding can be checked."],
  ["Is a bias audit legally required for my system?", "It depends on jurisdiction and use case. Automated employment decision tools used in New York City require an annual independent bias audit. Colorado's SB 24-205 requires annual impact assessments for consequential employment decisions from 30 June 2026. Under the EU AI Act, transparency obligations came into force on 2 August 2026, while high-risk obligations were postponed to 2 December 2027 for stand-alone Annex III systems and 2 August 2028 for embedded Annex I systems. India's MeitY guidelines are voluntary but expect pre-deployment testing across gender, caste, religion and geography for credit, insurance, employment and service delivery. Confirm your specific obligations with counsel."],
  ["How long does an audit take?", "A baseline audit of one model in one or two languages typically takes 5–7 weeks, of which the first two are scoping and test-set construction. Re-audits against an existing baseline run 2–3 weeks."],
  ["We don't have demographic data on our users. Can you still audit?", "Usually yes, using counterfactual and matched-pair methods that construct the comparison rather than relying on labelled user attributes. This works particularly well for generative models. For outcome-disparity testing on historical decisions, some form of group attribution is needed. We work through consented collection, aggregate proxies or synthetic construction at scoping; where attributes are inferred rather than declared, the report treats the result as directional."],
  ["Which fairness metric should we use?", "It depends on the decision. Equal opportunity is the most defensible default for screening and eligibility decisions. Impact ratio is required where a regulation names it, such as NYC Local Law 144. Equalized odds suits high-stakes decisions where both false positives and false negatives carry real cost. They cannot all be satisfied at once where base rates differ. We agree the primary metric with you in writing before testing and report the others alongside it."],
  ["Can you audit an LLM, or only classification models?", "Both. LLMs need different methods—counterfactual prompt sets, name-conditioned probes, stereotype association batteries and demographically matched human raters—rather than confusion-matrix metrics."],
  ["Do you test for bias in Indian languages?", "Yes. We test in 12+ Indian languages including romanised and code-mixed input, with probe sets authored natively in each language rather than machine-translated from English. We also test dimensions relevant in India, including caste, religion and region, alongside global demographic dimensions."],
  ["Will you certify our model as unbiased?", "No. Fairness is measured against a defined group set, on defined data, at a point in time. We provide a documented, repeatable measurement that you and your advisers can assess."],
  ["What happens if you find something serious?", "We report it, with worked examples and the magnitude quantified. Where the cause is data-side and identifiable, we state it. Fixing it is engineering work that belongs to your team or to a separate remediation engagement."],
  ["Are you independent enough to satisfy NYC Local Law 144?", "We build no employment decision tools and sell no scoring models, so we have no product interest in the outcome. Where eQOURSE supplied training data or annotation for the model under test, we disclose it and scope our role accordingly. Whether our independence satisfies a specific statutory test is a question for your counsel; we supply the documentation your filing requires."],
] as const;

export const regulations = [
  ["NYC Local Law 144", "In force since July 2023", "Annual bias audit of automated employment decision tools by an independent third party; impact ratio across race or ethnicity, sex and intersectional categories; publication and candidate-notice requirements."],
  ["Colorado SB 24-205", "Effective 30 June 2026", "Annual impact assessments for consequential employment decisions, a risk-management programme, consumer notice and human-review rights."],
  ["Illinois AIVIA", "In force since January 2020", "Notice, consent and explanation before AI-analysed video interviews; demographic reporting in specified circumstances and deletion on request."],
  ["EU AI Act — Article 50", "In force from 2 August 2026", "Transparency obligations for AI interaction and specified generated content."],
  ["EU AI Act — Annex III", "Postponed to 2 December 2027", "Risk management, bias-aware data governance, technical documentation, human oversight, accuracy and robustness obligations for stand-alone high-risk systems."],
  ["EU AI Act — Annex I", "Postponed to 2 August 2028", "High-risk obligations for AI embedded in regulated products, routed through product conformity regimes."],
  ["India — MeitY AI Governance Guidelines", "Released 2026; voluntary", "Fairness and equity principles, pre-deployment testing across gender, caste, religion and geography, and runtime monitoring for outcome disparities."],
  ["India — DPDP Act 2023 + 2026 rules", "In force", "Governs personal data used in the audit, including demographic attributes needed for some fairness tests."],
] as const;

export const fairnessMetrics = [
  ["Impact ratio", "Is each group's selection rate at least 80% of the highest group's rate?", "Employment screening or a named regulatory requirement", "Does not say whether selections were correct."],
  ["Demographic parity", "Are positive outcomes distributed equally?", "Equal reach or resource allocation", "Ignores legitimate population differences."],
  ["Equal opportunity", "Do qualified people in every group receive positive outcomes at the same rate?", "Screening and eligibility decisions", "Requires reliable ground truth."],
  ["Equalized odds", "Are true-positive and false-positive rates equal?", "High-stakes decisions with costs on both error types", "Often conflicts with calibration."],
  ["Predictive parity", "Does the same score carry the same meaning for each group?", "Risk scores consumed by people", "Incompatible with equalized odds when base rates differ."],
  ["Counterfactual fairness", "Does changing only the protected attribute change the output?", "LLMs, generative systems and name-conditioned decisions", "Matched pairs must control confounds."],
  ["Per-group error rate", "Does the system work worse for one group?", "ASR, vision, OCR and translation", "Difficulty must be matched across groups."],
] as const;

export const auditSteps = [
  ["01", "Scope & metric selection", "Agree the decision, groups, fairness definition and finding threshold before testing."],
  ["02", "Data & attribute strategy", "Choose declared attributes, consented collection, synthetic construction or matched pairs with the least personal data."],
  ["03", "Test-set construction", "Build native-language probes, matched pairs and stratified samples that can surface the disparity."],
  ["04", "Evaluator panel assembly", "Recruit documented demographic strata and calibrate inter-rater agreement."],
  ["05", "Measurement & analysis", "Compute metrics with confidence intervals, minimum cell sizes and intersectional analysis."],
  ["06", "Reporting & walkthrough", "Deliver findings, worked examples and method appendix to ML and compliance teams."],
] as const;

export const modelAuditTypes = [
  ["LLMs & generative text", "Name and identity probes, stereotype association, refusal disparity and answer quality by language."],
  ["Speech & ASR", "WER and CER by accent, dialect, gender and age using matched-difficulty audio."],
  ["Computer vision & face", "Detection and recognition across skin tone, age, gender presentation, headwear and lighting."],
  ["Scoring & eligibility", "Impact ratio, equal opportunity, equalized odds, calibration and proxy-variable analysis."],
  ["Recommenders & search", "Exposure and representation disparity across providers and user segments."],
  ["Document & OCR", "Accuracy by script, handwriting, origin and regional document layout."],
] as const;

export const failureModes = [
  ["Metric chosen after results", "The team reports whichever metric passes.", "Fix the primary metric in writing and report the others."],
  ["Marginal-only analysis", "Intersectional failures disappear inside averages.", "Make intersectional cells part of the default scope."],
  ["Machine-translated probes", "Translation quality is measured instead of model bias.", "Author probes natively in every target language."],
  ["Unmatched counterfactual pairs", "Token length, script or frequency becomes a confound.", "Control length, register, region and generation."],
  ["Panel excludes the group", "Representational harm is invisible to outsiders.", "Document and match panel strata to the tested groups."],
  ["Aggregate accuracy", "A strong average hides the weakest cell.", "Report every headline number with its worst segment."],
  ["One-time audit", "Model, data and population drift after the report.", "Retain probes and set a re-audit cadence."],
  ["Biased ground truth", "Fairness metrics inherit unfair labels.", "Review label provenance and record unresolved limitations."],
] as const;

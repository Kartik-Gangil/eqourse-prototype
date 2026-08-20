export const asrSpeechFaqs = [
  ["What is ASR testing?", "Structured measurement of a speech recognition system's accuracy and robustness — word and character error rates, plus semantic and entity-level error rates, diarization accuracy, formatting quality and latency — across the languages, accents, demographics and acoustic conditions your users actually present. The output is a per-stratum report and a typed error backlog, not a single accuracy figure."],
  ["Isn't WER enough?", "No, and industry practice moved away from it as a standalone headline metric during 2026. WER weights every error equally, so a missed drug name scores the same as a missed filler word. It can penalise a more accurate model — one documented case had a newer model score worse because it correctly captured backchannels the human reference transcribers had missed. And it scores valid formatting variants as errors. We always report WER for comparability, and always alongside metrics that reflect what your product depends on."],
  ["What is missed entity rate?", "The proportion of the terms that actually matter — names, drug names, amounts, account IDs, phone numbers, addresses — that failed to survive transcription. It reranks systems sharply against WER. In published comparisons one model recorded a 0% missed entity rate on drug names where another recorded 8.3%, and 19.6% versus 30.0% on phone numbers. We build the entity list with you at scoping, because which terms matter is a product question."],
  ["Why does regional accent matter so much in India?", "Because the published evidence shows it dominates. The Voice of India benchmark, covering 15 languages and 139 regional clusters across 306,230 utterances, found district-level WER ranging from roughly 4% to 44%. The best-performing model overall scored around 5% on Hindi but 20.9% on Bhojpuri and 24.8% on Maithili. A single national figure averages across a tenfold spread, and your users don't live in the average."],
  ["Do you test code-mixed speech?", "Yes, as standard scope. Hinglish, Tanglish, Benglish and mid-sentence language switching are how a very large share of Indian users actually speak, and switch boundaries are consistently where we find the sharpest degradation. Test sets include spontaneous code-mixed speech, not read prompts."],
  ["Can you test in noisy and telephone conditions?", "Yes, and we prefer to. The Voice of India data showed one model moving from 15.31% to 25.20% WER across audio-quality quartiles alone. We test telephone bandwidth, codec chains, graded background noise, reverberation, far-field capture and overlapping speech — and where possible we sample from your real production audio path rather than a clean file."],
  ["How do you make sure your reference transcripts are accurate?", "Reference transcription is treated as part of the test design. We agree a verbatim or clean standard in advance, use transcribers native to the variety being tested, double-pass a sample and report inter-transcriber agreement before presenting any finding about your model, and document normalisation rules before scoring. Where a model matches or exceeds human transcriber accuracy on a slice, we report that as a measurement ceiling rather than as model error."],
  ["What is ASR hallucination and do you test for it?", "Some end-to-end speech models produce fluent, confident text for silence, noise or non-speech audio — output that reads as a completely normal transcript and is entirely fabricated. It passes accuracy checks because nobody compares it to the audio. We test for it explicitly with silence and non-speech probes, and it matters most where the transcript feeds an LLM or triggers an automated action."],
  ["How is this different from your audio annotation service?", "Different deliverable. Audio and speech annotation produces transcripts and labelled audio — a dataset used to train or fine-tune a model. ASR and speech model testing produces error rates and failure analysis — a report used to decide whether a model is fit to ship. Same bench, opposite direction."],
  ["How long does it take, and can we reuse the test set?", "A first programme covering two or three languages with regional strata typically runs 5–6 weeks, most of it in test set design and reference transcription. The test set is versioned and delivered to you, so subsequent model versions run in 1–2 weeks against the same baseline."],
] as const;

export const testSurfaces = [
  ["Transcription accuracy", "How much of what was said made it into the transcript, measured several ways because accuracy is not one thing."],
  ["Accent, dialect & demographic coverage", "Whether accuracy holds across regions, ages and speaking styles — or only the groups best represented in training."],
  ["Acoustic robustness", "Telephone bandwidth, noise, reverberation, mic distance, overlapping speakers and poor connections."],
  ["Speaker and structure", "Diarization, attribution, turn boundaries and timestamps where the right words assigned to the wrong speaker still fail."],
  ["Downstream usability", "Whether intent, search, summarisation or an LLM can still complete the job after transcription."],
] as const;

export const metricRows = [
  ["WER", "Word-level insertions, deletions, substitutions", "Baseline comparability; always reported, never alone"],
  ["CER", "Character-level error", "Indic scripts and morphologically rich languages where word segmentation makes WER unstable"],
  ["Semantic error rate", "Whether meaning survived after normalisation", "A paraphrase is acceptable but a meaning flip is not"],
  ["Missed entity rate", "Whether names, drugs, amounts, IDs, phone numbers and addresses survived", "A specific token drives a downstream action"],
  ["Keyword / intent accuracy", "Whether the words the downstream system needs made it through", "Voice assistants, IVR, commands and search-over-speech"],
  ["Diarization error rate (DER)", "Speaker attribution, boundaries and overlap handling", "Meetings, calls, interviews and medical consultations"],
  ["Formatting & punctuation accuracy", "Casing, punctuation, numerals, dates and currency", "Anything a person reads or a parser consumes"],
  ["Latency & real-time factor", "Speed and whether it holds under load", "Streaming, live captioning and conversational agents"],
] as const;

export const regionalRows = [
  ["District-level WER range", "~4% (Nainital) to ~44% (Mannarakkat)"],
  ["Best overall model, Hindi", "~5% WER"],
  ["Same model, Bhojpuri", "20.9% WER"],
  ["Same model, Maithili", "24.8% WER"],
  ["Hindi-belt districts", "Clustered below 10%"],
  ["Kerala, interior Karnataka", "Substantially higher"],
  ["Female vs male speakers", "3.1–4.3 points better WER for female speakers"],
  ["Speakers aged 18–22", "Higher error rates than older speakers"],
  ["One model across audio-quality quartiles", "15.31% → 25.20% WER"],
] as const;

export const acousticRows = [
  ["Telephone bandwidth", "8 kHz narrowband, codec artefacts, packet loss", "Wideband-trained models can degrade sharply and silently"],
  ["Background noise", "Traffic, crowd, office, home and machinery at graded SNR", "Degradation is rarely linear; there is usually a cliff"],
  ["Reverberation & distance", "Room echo, far-field mic and speakerphone", "Common in meeting and kiosk deployments"],
  ["Overlapping speech", "Two or more speakers and interruptions", "Diarization and transcription fail together"],
  ["Compression & pipeline", "Codec chains, resampling and mobile networks", "Production audio is not the clean test file"],
  ["Disfluency & hesitation", "Repetitions, false starts, fillers and self-correction", "Natural speech is absent from most read-prompt sets"],
] as const;

export const engagementSteps = [
  ["01", "Scope & metric selection", "Week 1", "Define downstream use, entities, languages, regions, conditions and primary metrics."],
  ["02", "Test set design", "Weeks 1–3", "Stratify and match difficulty; sample the production audio path where possible."],
  ["03", "Reference transcription", "Weeks 2–4", "Use native-variety transcribers and report double-pass agreement."],
  ["04", "Measurement", "Weeks 4–5", "Compute every agreed metric per stratum, never only a blended number."],
  ["05", "Failure analysis", "Weeks 5–6", "Classify acoustic, lexical, entity, code-switch and diarization errors."],
  ["06", "Report & walkthrough", "Week 6", "Deliver findings, test assets and audio examples with the engineering team."],
] as const;

export const deliverableRows = [
  ["Accuracy report", "Every agreed metric by language, region, accent, demographic stratum and condition"],
  ["Missed entity analysis", "Per-category performance on the terms the product depends on"],
  ["Error taxonomy", "Failures ranked by frequency × downstream impact"],
  ["Audio examples", "The actual clip for every error class"],
  ["Reference transcripts & test set", "Versioned, reusable and delivered to the client"],
  ["Agreement statistics", "Reference quality reported before model findings"],
  ["Condition curves", "Where performance falls off as noise rises"],
  ["Live walkthrough", "Evidence reviewed with the team responsible for fixes"],
] as const;

export const failureRows = [
  ["WER as the only metric", "Product-breaking errors are averaged away", "Agree entity, semantic and keyword metrics at scoping"],
  ["Single national number", "An 8% India WER averages a 4%–44% district spread", "Report per language, region and stratum"],
  ["Unmatched difficulty across groups", "Recording-condition gap is mistaken for accent gap", "Control content, condition, style and length"],
  ["Studio audio only", "Clean-room result; production passes through codecs", "Reproduce or sample the production path"],
  ["Standard-variety transcribers", "Reference errors are attributed to the model", "Use native-variety transcribers"],
  ["No normalisation policy", "Formatting variants score as errors", "Document normalisation before scoring"],
  ["Read prompts as test data", "No overlap, hesitation or disfluency", "Include spontaneous and conversational speech"],
  ["Diarization ignored", "Right words, wrong speaker", "Measure DER wherever attribution matters"],
  ["ASR hallucination untested", "Fabricated text for silence or noise passes", "Use explicit silence and non-speech probes"],
  ["Ceiling unacknowledged", "Model beats the reference but metric reports error", "Identify and state the measurement ceiling"],
] as const;

export const engagementModels = [
  ["Baseline accuracy programme", "Test-set design, reference transcription and full measurement across agreed strata.", "5–6 weeks"],
  ["Accent & dialect audit", "Focused regional and demographic coverage when a general baseline already exists.", "3–4 weeks"],
  ["Release-cycle testing", "Repeatable regression measurement against the established test set.", "1–2 weeks"],
  ["Vendor comparison", "Several ASR providers on one matched set, scored identically.", "Scoped"],
] as const;

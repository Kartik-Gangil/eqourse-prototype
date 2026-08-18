export const auditFaqs = [
  ["What is a dataset QA and label audit?", "A statistically designed review of a labeled dataset that measures error rate with a confidence interval, breaks findings down by class and identifies whether errors come from annotation inconsistency, guideline gaps or genuine ambiguity."],
  ["Can you audit a dataset another vendor produced?", "Yes. We report findings without editorialising about who produced the dataset, and the report is designed to be actionable by you, your current vendor or eQOURSE."],
  ["How many items do you need to audit?", "It depends on the precision required rather than the total dataset size. At 95% confidence, estimating an error rate near 5% to within plus or minus 2% takes about 460 items. Per-class reporting requires stratified coverage."],
  ["Why does dataset size have little effect on sample size?", "Sampling precision mainly depends on how many items are reviewed, not the size of the population. A finite-population correction can reduce the requirement for smaller datasets."],
  ["How do you find label errors without reviewing everything?", "We combine stratified manual review, consensus re-labeling, adjudication, agreement recomputation and rule-based checks. When a suitable model exists, disagreement or loss can prioritise review, but a human confirms every counted error."],
  ["Can a model find label errors on its own?", "A model can help identify likely problem items, but disagreement is a search signal rather than proof. Human review against the agreed guideline determines whether a label is wrong."],
  ["What is train/test leakage?", "It occurs when the same or near-identical source appears in both training and evaluation data, allowing the model to memorise information that should have remained unseen."],
  ["How does split leakage happen?", "Common causes include deduplicating after splitting, separating augmented copies of one source, distributing adjacent video frames across splits and random rather than chronological splitting of time-dependent data."],
  ["How do you distinguish an annotator problem from a guideline problem?", "The pattern provides the clue: scattered errors often indicate attention pressure, repeated confusion between two classes points to an unclear boundary, and universal disagreement on the same items suggests taxonomy ambiguity."],
  ["Should we correct labels or re-label the dataset?", "It depends on error density and concentration. Sparse errors may be left alone or corrected selectively; concentrated errors often suit targeted repair; very high error density can make re-labeling against a corrected guideline more economical."],
  ["Which data types can you audit?", "We audit the modalities we annotate: image, video, text and NLP, audio and speech, documents and OCR, 3D point clouds and LiDAR, and LLM or RLHF evaluation data."],
  ["Will you tell us if the dataset is already in good shape?", "Yes. If the evidence does not justify further work, the recommendation can be to leave the dataset alone."],
  ["Are audit findings confidential?", "Engagements can be covered by NDAs and controlled-access workflows. We do not disclose the source vendor or use findings in marketing without written permission."],
  ["What does a label audit cost?", "Pricing is driven by sample size, required precision, number of classes, modality, consensus depth, domain expertise and security requirements. Correction work is scoped separately."],
  ["How do we start?", "Share a small representative sample and the annotation guideline. A directional audit can show whether a full statistically designed review is worth commissioning."],
] as const;

export const modalityRows = [
  ["Image", "Class accuracy · box IoU · mask boundary quality · missed instances", "/ai-data-services/annotation-labeling/image-annotation", "Image Annotation Services"],
  ["Video", "ID switches · fragmentation · temporal boundaries · missed tracks", "/ai-data-services/annotation-labeling/video-annotation", "Video Annotation Services"],
  ["Text & NLP", "Class confusion · span F1 · relation accuracy · taxonomy agreement", "/ai-data-services/annotation-labeling/text-nlp-annotation", "Text & NLP Annotation Services"],
  ["Audio & speech", "WER components · timestamps · speaker turns · event labels", "/ai-data-services/annotation-labeling/audio-speech-annotation", "Audio & Speech Annotation Services"],
  ["Document & OCR", "Field accuracy · reading order · layout regions · OCR correction", "/ai-data-services/annotation-labeling/document-ocr-annotation", "Document & OCR Annotation Services"],
  ["3D point cloud & LiDAR", "3D IoU · position · dimensions · heading · track identity", "/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation", "3D Point Cloud & LiDAR Annotation Services"],
  ["LLM & RLHF", "Rubric agreement · preference consistency · safety and factuality labels", "/ai-data-services/annotation-labeling/llm-rlhf-annotation", "LLM & RLHF Annotation Services"],
] as const;

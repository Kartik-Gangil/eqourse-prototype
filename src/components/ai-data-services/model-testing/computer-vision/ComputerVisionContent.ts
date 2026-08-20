export const computerVisionFaqs = [
  ["What is computer vision model testing?", "Structured measurement of how a vision model performs on imagery that reflects its deployment environment — reported per class, per condition, per device and per cohort rather than as a single aggregate figure. It covers detection, classification, segmentation, tracking, OCR, face and person systems, and vision-language models, and the output is a slice-level report plus a classified failure atlas."],
  ["Why isn't mAP enough?", "Because it's an average, and production vision failures concentrate rather than spread. A single class collapsing from 0.88 to 0.19 moves aggregate mAP by a point or two. Night rain, small objects at distance, one packaging variant, one regional form layout — each can be unusable inside a healthy-looking headline number. We report per class and per slice, at the confidence threshold you actually deploy."],
  ["Our model scores well but fails in production. Why?", "Usually because the test set resembles the training data rather than the deployment environment — same cameras, same curation, same geography, same conditions. The four patterns we see most are capture shift (new camera, firmware or compression), environmental shift (different site), semantic drift (new packaging, signage or layouts) and population shift (different region or demographic mix). Often the finding is that the model is fine and the evaluation set was wrong, in which case the fix is better test data, not a retrain."],
  ["Can you build the test images, or do we have to supply them?", "We can build them. Where your deployment environment isn't represented in imagery you hold, our data collection network sources or commissions it across regions, devices, lighting and conditions. In practice this is the most valuable part of the engagement — the test data you had to create is usually the test data that tells you something."],
  ["Do you test face recognition for bias?", "We test face and person systems for performance differences across cohorts and conditions, with two caveats we'd rather state up front. First, the best current algorithms show very low demographic differentials, so \"face recognition is biased\" is no longer a useful framing — the useful question is what differential this system has on your population under your conditions. Second, recent analysis suggests non-demographic but demographically correlated appearance factors — facial hair, hairstyle, headwear, makeup — may explain more of the differential than demographic characteristics themselves, and skin reflectance is a more useful variable than perceived skin tone. We test cohort × condition cells rather than categories in isolation. Where a finding needs formal fairness framing and regulatory mapping, it moves to our bias and fairness audit service."],
  ["Do you test OCR in Indian scripts?", "Yes — Devanagari, Bengali, Tamil, Telugu, Gujarati, Gurmukhi, Odia and Urdu, across print quality, handwriting, layout and capture method. Conjuncts, diacritics and ligatures are where Latin-tuned pipelines degrade sharply, and we measure at field level as well as character level, because a 98% character accuracy model can have 70% field accuracy if errors cluster on digits in an amount or characters in an ID."],
  ["Can you evaluate vision-language models?", "Yes. VLM evaluation covers visual hallucination, grounding, spatial reasoning, counting, reading text in images, fine-grained distinction and abstention behaviour. The last matters more than teams expect — a model that never says \"I can't tell from this image\" will guess confidently, and in inspection or document workflows a confident wrong answer enters your system as fact."],
  ["How good does our ground truth need to be?", "Better than your training data. Test set annotation is done to reference standard — tighter boxes, documented edge-case policy, full adjudication, double-passed sample with agreement reported. Training data tolerates some noise; a test set does not, because annotation error is indistinguishable from model error in the results."],
  ["How is this different from your annotation services?", "Different deliverable. Image, video and document annotation produce labelled data used to train a model. Computer vision model testing produces error rates and failure analysis used to decide whether a model is fit to ship. Same bench, opposite direction — though the test set annotation is held to a higher standard than production labelling."],
  ["How long does it take, and is the test set reusable?", "A first programme typically runs 6–7 weeks, dominated by test set sourcing and reference annotation, or 4–5 weeks where you already hold suitable imagery. The test set is versioned and delivered to you, so subsequent model versions run in 1–2 weeks against the same baseline."],
] as const;

export const systemRows = [
  ["Object detection", "Per-class precision and recall at your operating threshold, localisation quality, false positives per image, miss rate by object size and distance"],
  ["Classification", "Per-class accuracy, confusion structure, confidence calibration, behaviour on out-of-distribution and near-miss inputs"],
  ["Segmentation", "Per-class IoU, boundary accuracy, small-region and thin-structure performance, instance separation under occlusion"],
  ["Tracking & video", "Identity switches, track fragmentation, association accuracy through occlusion, re-identification after exit and re-entry"],
  ["OCR & document AI", "Character and field-level accuracy by script, layout, print quality and handwriting; structured extraction correctness"],
  ["Face & person systems", "Detection and match rates across cohorts, imaging conditions and appearance factors"],
  ["Vision-language models", "Grounding, spatial reasoning, counting, text-in-image reading and hallucinated visual detail"],
  ["3D & point cloud", "Detection and localisation accuracy by range, point density, weather and sensor configuration"],
] as const;

export const metricRows = [
  ["Per-class AP", "Which classes work and which do not", "Rare classes with few test instances produce unstable AP — instance counts are reported alongside"],
  ["Precision / recall at your operating threshold", "What happens at the confidence cut-off you deploy", "mAP integrates across thresholds you will never use"],
  ["False positives per image (FPPI)", "Alert volume and operator load", "Precision alone hides absolute burden when images are plentiful"],
  ["Miss rate by object size / distance", "Where detection falls off", "Small-object performance is routinely much worse and averaged away"],
  ["IoU distribution, not mean IoU", "Whether boxes are usable or merely present", "A mean hides a bimodal split between tight and useless"],
  ["Per-slice breakdown", "Accuracy by condition, device, location, time and cohort", "This is where concentrated production failures live"],
  ["Confidence calibration", "Whether the score means what downstream logic assumes", "A confidently wrong model is worse than an uncertain one"],
  ["Tracking: ID switches & fragmentation", "Whether identity survives occlusion", "High MOTA can coexist with unusable identity continuity"],
] as const;

export const testControls = [
  ["Capture device", "Phone cameras across price tiers, CCTV, dashcam, industrial, drone and scanner."],
  ["Lighting", "Daylight, overcast, dusk, night, artificial, mixed, backlit and harsh shadow."],
  ["Weather & environment", "Rain, fog, dust, glare and wet surfaces—including conditions underrepresented in training sets."],
  ["Geography & setting", "Urban, peri-urban and rural; formal and informal environments; regional visual variation."],
  ["Scale & distance", "The same object near and far, with small-object behaviour treated as a distinct failure mode."],
  ["Occlusion & clutter", "Partial visibility, dense scenes and overlapping instances."],
  ["Class balance & rarity", "Deliberate over-sampling of rare-but-critical classes so the test produces a useful signal."],
  ["Temporal drift", "Seasonal change, packaging, signage, uniforms and other changes in the world around the model."],
] as const;

export const shiftRows = [
  ["Capture shift", "New camera, firmware, compression or mount position", "The scene is the same; the pixels are not"],
  ["Environmental shift", "Different site, lighting, layout, traffic pattern or background", "Validation conditions no longer match deployment"],
  ["Semantic drift", "New packaging, vehicles, signage, uniforms or form layouts", "The class definition silently moved"],
  ["Population shift", "Different people, objects, region, demographic mix or season", "The deployment distribution changed"],
] as const;

export const ocrRows = [
  ["Script", "Latin, Devanagari, Bengali, Tamil, Telugu, Gujarati, Gurmukhi, Odia and Urdu", "Conjuncts, diacritics and ligatures expose Latin-tuned pipelines"],
  ["Print quality", "Digital, photocopy, fax, degraded, thermal and stamped-over", "Generational photocopy loss forms its own failure curve"],
  ["Handwriting", "Print, cursive, mixed, regional styles and constrained fields", "Field accuracy diverges sharply from page-level accuracy"],
  ["Layout", "Columns, tables, forms, stamps, marginalia, rotation and skew", "Structure errors do not appear in character accuracy"],
  ["Capture", "Scanner and phone photos with angle, shadow, glare, curl or partial page", "The dominant real-world input is often the least tested"],
  ["Field extraction", "Whether the correct value landed in the correct field", "The metric that matters when nobody reads the raw output"],
] as const;

export const vlmChecks = [
  ["Visual hallucination", "Objects, text or attributes described fluently even though they are absent."],
  ["Grounding", "Whether a claim is supported by pixels or only by a plausible prior."],
  ["Spatial reasoning", "Left/right, above/below, containment, relative size and depth."],
  ["Counting", "Reliability beyond small counts and confidence when the count is unclear."],
  ["Text in images", "Signage, labels, forms and screenshots across angles and non-Latin scripts."],
  ["Fine-grained distinction", "Variants, defects, near-identical SKUs and subtle condition differences."],
  ["Refusal & uncertainty", "Whether the model can say it cannot tell instead of inventing certainty."],
] as const;

export const engagementSteps = [
  ["01", "Scope & slice definition", "Week 1", "Agree failure cost, critical classes and the conditions and cohorts that receive their own report line."],
  ["02", "Test-set design & sourcing", "Weeks 1–4", "Audit existing imagery, then source what is missing across device, condition, geography and cohort."],
  ["03", "Reference annotation", "Weeks 3–5", "Document edge cases, double-pass a sample and report agreement."],
  ["04", "Evaluation", "Weeks 5–6", "Run every agreed metric per slice at the production operating threshold."],
  ["05", "Failure analysis", "Weeks 6–7", "Classify errors by cause and rank them by frequency multiplied by cost."],
  ["06", "Report & walkthrough", "Week 7", "Review the images, findings and reusable versioned test set with the vision team."],
] as const;

export const deliverableRows = [
  ["Slice-level accuracy report", "Every agreed metric per class, condition, device, location and cohort"],
  ["Failure atlas", "Actual images for every failure class, grouped by cause and counted"],
  ["Error taxonomy", "Root causes ranked by frequency × cost"],
  ["Operating-point analysis", "Precision/recall trade-offs at candidate production thresholds"],
  ["Versioned test set", "Imagery plus reference annotations delivered for reuse every release"],
  ["Annotation agreement", "Reference-quality statistics reported before model findings"],
  ["Class-definition findings", "Ambiguities surfaced by genuine reviewer disagreement"],
  ["Live walkthrough", "Evidence reviewed image by image with the vision team"],
] as const;

export const failureRows = [
  ["Single mAP as the headline", "A collapsing class barely moves the average", "Per-class and per-slice reporting"],
  ["Test set from the training distribution", "The model is measured on home turf", "Deployment-led sourcing, kept separate"],
  ["Slices chosen after results", "The flattering cut gets reported", "Slices agreed in writing at scoping"],
  ["Production-grade test annotation", "Label noise looks like model error", "Reference-standard annotation and adjudication"],
  ["Metrics at unused thresholds", "Results do not describe production", "Report at the actual operating point"],
  ["Small objects averaged in", "Distance failures disappear in the total", "Miss rate by object-size band"],
  ["Demographics tested alone", "Condition-linked differentials stay hidden", "Cohort × condition cells"],
  ["Character accuracy as field accuracy", "98% characters can still mean 70% usable fields", "Measure the level the workflow consumes"],
  ["VLM judged on fluent description", "Confident hallucination scores well", "Grounding, counting and abstention tests"],
  ["One-time evaluation", "World and capture pipelines drift", "Versioned baseline and re-test cadence"],
] as const;

export const engagementModels = [
  ["Baseline vision evaluation", "Test-set design, sourcing, reference annotation and full slice-level measurement.", "6–7 weeks, or 4–5 with suitable imagery"],
  ["Test-set construction only", "Sourcing plus reference annotation for teams that already have evaluation infrastructure.", "4–5 weeks"],
  ["Release-cycle testing", "Repeatable evaluation against an established versioned test set.", "1–2 weeks per cycle"],
  ["Deployment-site audit", "A focused audit where one site or camera set is suspected to have drifted.", "2–3 weeks"],
] as const;

export const relatedServices = [
  ["Image Annotation", "/ai-data-services/annotation-labeling/image-annotation"],
  ["Video Annotation", "/ai-data-services/annotation-labeling/video-annotation"],
  ["Document & OCR Annotation", "/ai-data-services/annotation-labeling/document-ocr-annotation"],
  ["3D Point Cloud & LiDAR Annotation", "/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation"],
  ["AI Bias & Fairness Audit", "/ai-data-services/model-testing/bias-fairness-audit"],
  ["Data Collection", "/ai-data-services/data-collection"],
] as const;

import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Bot,
  Boxes,
  Braces,
  Camera,
  CheckCheck,
  CircleUserRound,
  Copy,
  Database,
  Eye,
  FileText,
  Gauge,
  GitCompare,
  HeartPulse,
  Image,
  Languages,
  ListChecks,
  MessageSquareWarning,
  Mic,
  Radar,
  RefreshCw,
  ScanSearch,
  Scale,
  ShieldCheck,
  Sparkles,
  Tags,
  TestTubeDiagonal,
  ThumbsUp,
  Video,
  Volume2,
} from "lucide-react";

export interface AIDataNavSubService {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  serviceHighlights: string[];
}

export interface AIDataNavCategory {
  label: string;
  href: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  description: string;
  subServices: AIDataNavSubService[];
}

export const aiDataServicesCategories: AIDataNavCategory[] = [
  {
    label: "Data Collection",
    href: "/ai-data-services/data-collection",
    icon: Database,
    image: "/assets/ai-data/Data Collection V2.webp",
    imageAlt: "AI data collection across text, image, audio and video modalities",
    description: "Purpose-built, rights-aware datasets captured around your model, market and deployment conditions.",
    subServices: [
      {
        label: "Image Data Collection",
        href: "/ai-data-services/data-collection/image-data-collection",
        icon: Image,
        description: "Custom image datasets for computer vision systems.",
        serviceHighlights: ["Object and scene imagery", "OCR and document images", "Multi-angle product capture", "Domain and edge-case coverage", "Capture metadata and provenance"],
      },
      {
        label: "Audio & Speech Collection",
        href: "/ai-data-services/data-collection/audio-data-collection",
        icon: Mic,
        description: "Speech and acoustic data across speakers and environments.",
        serviceHighlights: ["Prompted and conversational speech", "Accent and dialect coverage", "Wake-word and command audio", "Device and environment variation", "Speaker and session metadata"],
      },
      {
        label: "Text Data Collection",
        href: "/ai-data-services/data-collection/text-data-collection",
        icon: FileText,
        description: "Language datasets for NLP, LLMs and generative AI.",
        serviceHighlights: ["Monolingual and multilingual corpora", "Domain-specific terminology", "Dialogue and prompt-response pairs", "Document digitisation", "Rights and source tracking"],
      },
      {
        label: "Video Data Collection",
        href: "/ai-data-services/data-collection/video-data-collection",
        icon: Video,
        description: "Temporal datasets for dynamic computer vision and multimodal AI.",
        serviceHighlights: ["Human actions and activities", "Object movement and interaction", "Multi-camera capture", "Egocentric video", "Scenario and temporal coverage"],
      },
    ],
  },
  {
    label: "Annotation & Labeling",
    href: "/ai-data-services/annotation-labeling",
    icon: Tags,
    image: "/assets/ai-data/annotation-labeling/data-annotation-labeling-services-hero.webp",
    imageAlt: "Expert AI data annotation and labeling workflow",
    description: "Human-reviewed labels across language, vision, audio and generative-AI workflows.",
    subServices: [
      { label: "NLP Annotation", href: "/ai-data-services/annotation-labeling/text-nlp-annotation", icon: Braces, description: "Taxonomy-tested language labels across 30+ languages.", serviceHighlights: ["Named and nested entities", "Sentiment and intent", "Relations and coreference", "Indic and code-mixed text", "Translation post-editing"] },
      { label: "Image Annotation", href: "/ai-data-services/annotation-labeling/image-annotation", icon: Eye, description: "Spatial labels for computer vision.", serviceHighlights: ["Bounding boxes and polygons", "Semantic segmentation", "Keypoint and pose", "Classification", "Object detection"] },
      { label: "Video Annotation", href: "/ai-data-services/annotation-labeling/video-annotation", icon: Video, description: "Temporal labels for dynamic visual AI.", serviceHighlights: ["Persistent-ID tracking", "Action recognition", "Event boundaries", "Frame-by-frame segmentation", "Multi-object tracking (MOT)"] },
      { label: "Audio Annotation", href: "/ai-data-services/annotation-labeling/audio-speech-annotation", icon: AudioLines, description: "Native-listener speech labels across 30+ global languages.", serviceHighlights: ["Verbatim and clean transcription", "Speaker diarization and overlap", "Word and phoneme timing", "India-wide regional coverage", "Global accents and code-switching"] },
      { label: "3D & LiDAR Annotation", href: "/ai-data-services/annotation-labeling/3d-point-cloud-lidar-annotation", icon: Boxes, description: "Measured geometry for autonomous systems and robotics.", serviceHighlights: ["Oriented 3D cuboids", "Point-level segmentation", "Multi-sweep tracking", "Camera-LiDAR fusion", "Calibration and geometric QA"] },
      { label: "Content Moderation", href: "/ai-data-services/annotation-labeling/content-moderation", icon: MessageSquareWarning, description: "Human trust and safety operations grounded in written policy.", serviceHighlights: ["Severity-tiered enforcement", "Contextual multilingual review", "Appeals and escalation", "Moderator safeguards", "Spam, scam and fraud review"] },
      { label: "RLHF & LLM Evaluation", href: "/ai-data-services/annotation-labeling/llm-rlhf-annotation", icon: ThumbsUp, description: "Expert human feedback for model alignment.", serviceHighlights: ["Preference ranking", "SFT data creation", "Factuality and RAG review", "Red teaming", "Agent trajectory evaluation"] },
      { label: "Document & OCR", href: "/ai-data-services/annotation-labeling/document-ocr-annotation", icon: FileText, description: "Position-aware labels for document AI and IDP.", serviceHighlights: ["Layout regions and reading order", "Key-value extraction", "Table structure and line items", "Handwriting and OCR ground truth", "PII identification and splitting"] },
    ],
  },
  {
    label: "Cleaning & Validation",
    href: "/ai-data-services/cleaning-validation",
    icon: CheckCheck,
    image: "/assets/ai-data/cleaning-validation/data-cleaning-validation-services-hero.webp",
    imageAlt: "Readable synthetic records showing validation findings in a dataset audit",
    description: "Audit, repair and validate AI training data with evidence at every step.",
    subServices: [
      { label: "Data Cleaning & Preparation", href: "/ai-data-services/cleaning-validation/data-cleaning-preparation", icon: RefreshCw, description: "Repair structure without erasing real signal.", serviceHighlights: ["Deduplication", "Encoding repair", "Noise removal", "Format normalisation", "Distribution impact"] },
      { label: "Dataset QA & Label Audit", href: "/ai-data-services/cleaning-validation/dataset-qa-label-audit", icon: ListChecks, description: "Measure label errors and their root cause.", serviceHighlights: ["Error rate by class", "Confidence intervals", "Class confusion analysis", "Train/test leakage", "Repair recommendations"] },
      { label: "LLM Data Curation", href: "/ai-data-services/cleaning-validation/llm-data-curation", icon: Sparkles, description: "Curate pre-training and fine-tuning corpora.", serviceHighlights: ["Corpus deduplication", "Quality filtering", "Benchmark decontamination", "Provenance review", "Retention by domain"] },
      { label: "PII Detection & Redaction", href: "/ai-data-services/cleaning-validation/pii-detection-redaction", icon: ShieldCheck, description: "Protect sensitive information with traceable rules.", serviceHighlights: ["Multimodal PII discovery", "Quasi-identifier analysis", "Masking and pseudonymisation", "Verified recall", "Residual-risk reporting"] },
      { label: "Metadata Enrichment", href: "/ai-data-services/cleaning-validation/metadata-enrichment", icon: Tags, description: "Standardize context, provenance and entity links for reusable AI data.", serviceHighlights: ["Language and domain tags", "Taxonomy mapping", "Entity resolution", "Field confidence", "Provenance and lineage"] },
      { label: "Data Validation & Verification", href: "/ai-data-services/cleaning-validation/data-validation-verification", icon: CheckCheck, description: "Verify records and claims against authoritative sources.", serviceHighlights: ["Source-of-truth definition", "Attribute verification", "Conflict adjudication", "Six-state reporting", "Re-verification cadence"] },
    ],
  },
  {
    label: "Model Testing",
    href: "/ai-data-services/model-testing",
    icon: TestTubeDiagonal,
    image: "/assets/ai-data/model-testing/ai-model-testing-services-hero.webp",
    imageAlt: "AI specialist reviewing model testing and evaluation evidence",
    description: "Evaluate model behaviour with real users, realistic inputs and deployment-relevant edge cases.",
    subServices: [
      { label: "AI Bias & Fairness Audit", href: "/ai-data-services/model-testing/bias-fairness-audit", icon: Scale, description: "Measure whether AI systems treat groups differently.", serviceHighlights: ["Outcome disparity", "Quality-of-service gaps", "Representational harm", "Intersectional analysis", "Multilingual human evaluation"] },
      { label: "Human Evaluation & A/B Testing", href: "/ai-data-services/model-testing/human-evaluation-ab-testing", icon: GitCompare, description: "Choose between model variants with blind human evidence.", serviceHighlights: ["Counterbalanced comparison", "Representative panels", "Preference strength", "Live quality scoring", "Measured agreement"] },
      { label: "ASR & Speech Model Testing", href: "/ai-data-services/model-testing/asr-speech-model-testing", icon: AudioLines, description: "Evaluate speech recognition beyond one blended WER score.", serviceHighlights: ["WER, CER and semantic error", "Missed entity measurement", "Accent and dialect strata", "Telephone and noisy conditions", "Diarization and hallucination"] },
      { label: "Computer Vision Model Testing", href: "/ai-data-services/model-testing/computer-vision-model-testing", icon: Eye, description: "Expose vision failures hidden inside aggregate accuracy.", serviceHighlights: ["Detection and segmentation", "Real-world test-set sourcing", "Slice-level failure analysis", "OCR and VLM evaluation", "Deployment-site audits"] },
      { label: "LLM Evaluation", href: "/ai-data-services/model-testing/llm-evaluation", icon: HeartPulse, description: "Human evaluation and LLM-judge calibration for reliable model-quality decisions.", serviceHighlights: ["Hallucination and factuality", "RAG groundedness", "Instruction and multi-turn quality", "Agent trajectory review", "Judge calibration and drift"] },
      { label: "AI Red Teaming", href: "/ai-data-services/model-testing/ai-red-teaming", icon: ScanSearch, description: "Human-led adversarial testing for LLM and agentic systems.", serviceHighlights: ["Jailbreak and guardrail bypass", "Prompt injection and RAG attacks", "Agentic tool misuse", "Native-language attack sets", "Reproducible severity-rated findings"] },
    ],
  },
  {
    label: "Robotics Training Data",
    href: "/robotics-training-data-services",
    icon: Bot,
    image: "/assets/ai-data/robotics/robotics-training-data-hero.webp",
    imageAlt: "Robotics training data for embodied and Physical AI",
    description: "Human demonstrations and multimodal datasets for embodied, robotic and Physical AI systems.",
    subServices: [
      { label: "Human Demonstrations", href: "/robotics-training-data-services/human-demonstrations", icon: CircleUserRound, description: "Teleoperated and egocentric demonstrations with per-episode QA.", serviceHighlights: ["Multi-rig teleoperation", "Egocentric human video", "Designed task diversity", "Failure and recovery episodes", "LeRobot and RLDS delivery"] },
      { label: "Multimodal Sensor Data", href: "/robotics-training-data-services/multimodal-sensor-data", icon: Radar, description: "Time-aligned visual, spatial, state, force and acoustic signals for perception and control.", serviceHighlights: ["RGB, RGB-D and depth video", "LiDAR and point clouds", "IMU and proprioception", "Force-torque and tactile signals", "Timestamp and calibration metadata"] },
      { label: "3D & Spatial Annotation", href: "/robotics-training-data-services/3d-spatial-annotation", icon: Boxes, description: "Grasp sets, affordances, 6-DoF pose and articulation for robot manipulation.", serviceHighlights: ["Task-conditioned grasp sets", "Affordance regions", "6-DoF object pose", "Articulation and URDF", "Automated-candidate verification"] },
      { label: "VLA Evaluation", href: "/robotics-training-data-services/vla-evaluation", icon: Sparkles, description: "Controlled real-robot policy benchmarking with defensible trial counts and recovery analysis.", serviceHighlights: ["Evaluation protocol design", "Defensible trial counts", "Failure taxonomy and recovery", "Generalisation-axis testing", "Same-fixture human baseline"] },
      { label: "Deployment Validation", href: "/robotics-training-data-services/deployment-validation", icon: Camera, description: "Structured on-site validation of a robot application under operational conditions.", serviceHighlights: ["Acceptance criteria", "Endurance observation", "Human-robot interaction", "Incident and near-miss logging", "Operational evidence packs"] },
    ],
  },
];

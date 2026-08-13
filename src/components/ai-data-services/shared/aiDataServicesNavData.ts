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
  Mic,
  Radar,
  RefreshCw,
  ScanSearch,
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
      { label: "NLP Annotation", href: "/ai-data-services/annotation-labeling", icon: Braces, description: "Structured language labels for NLP systems.", serviceHighlights: ["Named entity recognition", "Sentiment and intent", "Text classification", "Relation extraction", "Translation post-editing"] },
      { label: "Computer Vision", href: "/ai-data-services/annotation-labeling/image-annotation", icon: Eye, description: "Spatial and temporal labels for visual AI.", serviceHighlights: ["Image boxes and segmentation", "Persistent-ID video tracking", "Polygons and keypoints", "Action and event boundaries", "Classification and attributes"] },
      { label: "Audio Annotation", href: "/ai-data-services/annotation-labeling", icon: AudioLines, description: "Speech, speaker and acoustic-event labels.", serviceHighlights: ["Speech transcription", "Speaker diarization", "Emotion and tone", "Audio event classification", "Phonetic transcription"] },
      { label: "RLHF & LLM Evaluation", href: "/ai-data-services/annotation-labeling/llm-rlhf-annotation", icon: ThumbsUp, description: "Expert human feedback for model alignment.", serviceHighlights: ["Preference ranking", "SFT data creation", "Factuality and RAG review", "Red teaming", "Agent trajectory evaluation"] },
      { label: "Document & OCR", href: "/ai-data-services/annotation-labeling/document-ocr-annotation", icon: FileText, description: "Position-aware labels for document AI and IDP.", serviceHighlights: ["Layout regions and reading order", "Key-value extraction", "Table structure and line items", "Handwriting and OCR ground truth", "PII identification and splitting"] },
    ],
  },
  {
    label: "Cleaning & Validation",
    href: "/ai-data-services/cleaning-validation",
    icon: CheckCheck,
    image: "/assets/ai-data/Cleaning and validation.webp",
    imageAlt: "AI training data cleaning and validation workflow",
    description: "Transform inconsistent raw inputs into traceable, production-ready training assets.",
    subServices: [
      { label: "Deduplication", href: "/ai-data-services/cleaning-validation", icon: Copy, description: "Remove exact and near-identical records.", serviceHighlights: ["Exact-match detection", "Near-duplicate review", "Semantic similarity checks", "Cross-split leakage checks", "Unique-record manifests"] },
      { label: "Noise Removal", href: "/ai-data-services/cleaning-validation", icon: Volume2, description: "Remove irrelevant or corrupted dataset content.", serviceHighlights: ["Encoding correction", "OCR artefact cleanup", "Boilerplate removal", "Invalid record filtering", "Format normalization"] },
      { label: "PII Redaction", href: "/ai-data-services/cleaning-validation", icon: ShieldCheck, description: "Identify and protect sensitive information.", serviceHighlights: ["Entity-based PII detection", "Configurable redaction", "Masked replacement tokens", "Human validation", "Secure handling workflows"] },
      { label: "Consistency Normalization", href: "/ai-data-services/cleaning-validation", icon: RefreshCw, description: "Standardize structure and conventions.", serviceHighlights: ["Date and unit normalization", "Terminology alignment", "Schema conformance", "Label consistency", "Cross-source harmonization"] },
      { label: "Metadata Enrichment", href: "/ai-data-services/cleaning-validation", icon: ListChecks, description: "Add context, lineage and quality signals.", serviceHighlights: ["Language and domain tags", "Source provenance", "Confidence scores", "Quality flags", "Dataset lineage"] },
    ],
  },
  {
    label: "Model Testing",
    href: "/ai-data-services/model-testing",
    icon: TestTubeDiagonal,
    image: "/assets/ai-data/model testing.webp",
    imageAlt: "Real-world AI model testing and evaluation",
    description: "Evaluate model behavior with real users, realistic inputs and deployment-relevant edge cases.",
    subServices: [
      { label: "A/B Model Testing", href: "/ai-data-services/model-testing", icon: GitCompare, description: "Compare model variants with real users.", serviceHighlights: ["Side-by-side model comparison", "Preference measurement", "Accuracy review", "Latency feedback", "User satisfaction signals"] },
      { label: "Dialect & Accent Audits", href: "/ai-data-services/model-testing", icon: Languages, description: "Find performance gaps across speech varieties.", serviceHighlights: ["Regional accent coverage", "Dialect variation", "Multilingual evaluation", "Demographic sampling", "Failure-pattern reporting"] },
      { label: "WER / CER Measurement", href: "/ai-data-services/model-testing", icon: Gauge, description: "Measure ASR transcription performance.", serviceHighlights: ["Word error rate", "Character error rate", "Controlled audio tests", "Noisy-environment tests", "Segment-level diagnostics"] },
      { label: "Sentiment & Intent", href: "/ai-data-services/model-testing", icon: HeartPulse, description: "Evaluate meaning and emotional understanding.", serviceHighlights: ["Sentiment detection", "Intent classification", "Tone recognition", "Context retention", "Demographic comparison"] },
      { label: "Edge-Case Discovery", href: "/ai-data-services/model-testing", icon: ScanSearch, description: "Probe where production behavior breaks down.", serviceHighlights: ["Adversarial inputs", "Boundary conditions", "Multi-turn confusion", "Contextual failures", "Prioritized issue reports"] },
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
      { label: "Human Demonstrations", href: "/robotics-training-data-services", icon: CircleUserRound, description: "Task demonstrations grounded in real environments.", serviceHighlights: ["Teleoperation capture", "Wearable first-person video", "Task and action sequences", "Human-object interaction", "Failure and recovery examples"] },
      { label: "Multimodal Sensor Data", href: "/robotics-training-data-services", icon: Radar, description: "Aligned signals for perception and control.", serviceHighlights: ["RGB and depth video", "LiDAR and point clouds", "IMU and proprioception", "Timestamps and synchronization", "Calibration metadata"] },
      { label: "3D & Spatial Annotation", href: "/robotics-training-data-services", icon: Boxes, description: "Spatial labels for scenes and manipulation.", serviceHighlights: ["3D cuboids", "Point-cloud segmentation", "Object pose", "Trajectory annotation", "Scene and affordance labels"] },
      { label: "VLA Evaluation", href: "/robotics-training-data-services", icon: Sparkles, description: "Human review of vision-language-action behavior.", serviceHighlights: ["Instruction following", "Action success review", "Safety and constraint checks", "Failure-mode discovery", "Real-world task evaluation"] },
      { label: "Deployment Validation", href: "/robotics-training-data-services", icon: Camera, description: "Test systems in target operating conditions.", serviceHighlights: ["Scenario-based testing", "Environment variation", "Human-in-the-loop review", "Edge-case validation", "Structured evaluation reports"] },
    ],
  },
];

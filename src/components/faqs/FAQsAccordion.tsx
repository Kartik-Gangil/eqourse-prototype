import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  GraduationCap,
  Brain,
  ExternalLink,
  Rocket,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface FAQ {
  question: string;
  answer: string;
}

const contentServicesFaqs: FAQ[] = [
  {
    question: "What types of educational content does eQOURSE create?",
    answer:
      "eQOURSE creates K-12 study materials, curriculum-aligned lessons, assessments, workbooks, teacher lesson plans, STEM content, e-books, quiz and question banks, exam preparation content (SAT, IELTS, TOEFL, IIT-JEE, NEET, and more), corporate training modules, and interactive video lessons across 30+ languages.",
  },
  {
    question: "How is eQOURSE different from other Content Services providers?",
    answer:
      "eQOURSE is a full-stack Content Services partner. We don't just create content - we handle curriculum design, assessment development, video production, localization, LMS integration, and SME recruitment under one roof. This integrated approach eliminates vendor fragmentation, reduces turnaround time, and ensures consistent quality across your entire content library.",
  },
  {
    question: "What curriculum standards do you support?",
    answer:
      "We support CBSE, ICSE, IB (International Baccalaureate), State Board curricula across Indian states, Common Core (US), Cambridge (IGCSE/A-Level), and custom curriculum frameworks. Our team adapts to any national or institutional curriculum standard.",
  },
  {
    question: "Can you scale content production quickly?",
    answer:
      "Yes. With 200+ active SMEs and a structured production workflow, we can scale from 50 content units per month to 5,000+ depending on complexity and format. We onboard additional specialists within 5–7 business days for large-volume projects.",
  },
  {
    question:
      "Do you offer translation and localization for educational content?",
    answer:
      "Absolutely. We offer comprehensive translation and localization services in over 30 languages. Our localization experts ensure that educational materials remain culturally relevant and retain their academic rigor across different regions.",
  },
  {
    question: "What about digital learning and LMS integration?",
    answer:
      "Our tech solutions team ensures that all content is built with modern standards (SCORM, xAPI, LTI) to seamlessly integrate into your existing Learning Management System (LMS). We can also help in setting up and customizing white-labeled LMS platforms.",
  },
  {
    question: "How do I get started?",
    answer:
      "We offer a free pilot for qualifying education and Content Services clients. Fill out the pilot form with your content requirements, target audience, and curriculum framework, and our team will deliver a sample content package within the agreed timeframe - no commitment required.",
  },
  {
    question:
      "What specific accessibility standards do your services align with?",
    answer:
      "Our accessibility services align with WCAG 2.1 and 2.2 (Levels A and AA), Section 508, EN 301 549, and EPUB 3 Accessibility Guidelines. We provide technical remediation and structural enhancements to help your digital learning content meet these benchmarks.",
  },
  {
    question: "Are your accessibility audits considered legal certifications?",
    answer:
      "No. eQOURSE provides technical accessibility evaluation, remediation, and reporting services. Our audits and VPAT support document the technical accessibility of your content against established standards. We do not provide legal advice, nor do our services constitute legal certification.",
  },
  {
    question: "What types of educational content can you remediate?",
    answer:
      "We remediate PDFs, Microsoft Word and PowerPoint documents, EPUBs (eBooks), HTML-based web content, multimedia (adding captions and audio descriptions), and courses hosted within Learning Management Systems (LMS).",
  },
  {
    question:
      "How do you ensure compatibility with Assistive Technologies (AT)?",
    answer:
      "Our evaluation process includes both automated scanning and manual functional testing using industry-standard assistive technologies. We test with JAWS, NVDA, VoiceOver, verify keyboard-only navigation, and assess screen magnification compatibility.",
  },
  {
    question:
      "Can you provide a VPAT (Voluntary Product Accessibility Template)?",
    answer:
      "Yes, we offer VPAT / ACR support services. We conduct the necessary technical audits to document how your product aligns with specific accessibility criteria, providing a detailed technical report in the standard VPAT format.",
  },
  {
    question: "Do you offer accessibility services for STEM content?",
    answer:
      "Yes. We author precise, context-appropriate alt text for charts, graphs, and diagrams, and use MathML to ensure mathematical equations and scientific notations are fully accessible to screen reader users.",
  },
  {
    question:
      "What is the difference between automated testing and manual accessibility review?",
    answer:
      "Automated testing quickly scans for programmatic errors (like missing alt attributes). Manual review involves human experts testing with assistive technologies to evaluate the actual user experience, context, and logical flow-elements that automated tools cannot assess.",
  },
  {
    question: "What types of custom e-learning content do you create?",
    answer:
      "We create K-12 study materials, curriculum-aligned lessons, assessments, workbooks, teacher lesson plans, STEM content, e-books, quiz and question banks, and 2D/3D educational videos.",
  },
  {
    question: "What curriculum boards do you support?",
    answer:
      "We support CBSE, ICSE, IB, State Board, Common Core, Cambridge, and custom curriculum frameworks. Our instructional designers seamlessly adapt to your specific regional requirements.",
  },
  {
    question: "How many SMEs are available for content creation?",
    answer:
      "We have 200+ active subject matter experts across STEM, humanities, languages, and professional domains, allowing us to quickly scale production for critical deadlines.",
  },
  {
    question:
      "What types of clients can use eQOURSE editorial and publishing services?",
    answer:
      "eQOURSE supports education publishers, EdTech companies, schools, universities, training providers, corporate learning teams and organisations managing large learning-content portfolios - for curriculum content, assessments, instructor resources, digital assets, training material and publication workflows.",
  },
  {
    question: "Does eQOURSE provide both editorial and production support?",
    answer:
      "Yes. eQOURSE can support editing, copyediting, proofing coordination, design handover, metadata preparation, prepress checks and production tracking. The exact workflow depends on the client's content type, internal review process, style guide, delivery format and production schedule.",
  },
  {
    question: "Can eQOURSE support digital publishing and eBook conversion?",
    answer:
      "eQOURSE can prepare content for digital delivery, including LMS-ready assets, web-ready structures and eBook-oriented workflows where required. When EPUB output is requested, the scope should define target specifications, accessibility requirements, validation responsibilities and final platform requirements.",
  },
  {
    question: "Can metadata services support content discovery?",
    answer:
      "Metadata services can support content organisation, searchability and catalogue readiness when applied consistently across assets. eQOURSE prepares metadata fields, tags, naming conventions and taxonomy inputs based on client templates, platform rules and distribution needs.",
  },
  {
    question: "Can eQOURSE adapt to a client's style guide?",
    answer:
      "Yes. eQOURSE can apply client style guides, terminology lists, formatting rules, brand guidelines and project-specific editorial instructions. The workflow should include sample reviews and approval checkpoints before full-scale production starts.",
  },
  {
    question: "What exams do you create content for?",
    answer:
      "We create content for TOEIC, APTIS, SAT, ACT, AP Exams, IELTS, CEFR, PTE, TOEFL, EmSAT, GRE, GMAT, IIT-JEE, NEET, UPSC, and more.",
  },
  {
    question: "Do you follow the latest exam patterns?",
    answer:
      "Yes. We thoroughly analyse past papers, follow standardised patterns like NTA and international guidelines, and rigorously ensure our content strictly aligns with the latest exam syllabus and testing requirements.",
  },
  {
    question: "What formats do you deliver content in?",
    answer:
      "We deliver study guides, full-length practice tests, video lessons, interactive quizzes, flashcards, diagnostic assessments, and LMS-ready modules (SCORM/xAPI).",
  },
  {
    question: "What learning solutions do you offer?",
    answer:
      "We offer Instructor-Led Training (ILT) content, corporate e-learning, training modules, gamified learning, adaptive learning, blended learning, AR/VR immersive simulations, instructional design logic, and AI-powered learning optimisation.",
  },
  {
    question: "Do your solutions integrate with LMS platforms?",
    answer:
      "Yes. All our learning content is developed and delivered in LMS-compatible formats including SCORM (1.2 and 2004), xAPI (Tin Can), and cmi5, allowing seamless deployment on almost any standard platform.",
  },
  {
    question: "What types of content can you localize?",
    answer:
      "We seamlessly localize e-learning modules, video lessons, instructional materials, assessments, workbooks, and e-books natively in Hindi, English, and major regional languages of India.",
  },
  {
    question: "Do you provide voice-over services in regional languages?",
    answer:
      "Yes, we offer highly professional voice-over in Hindi, English, and a vast array of regional languages including Tamil, Bengali, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, and more.",
  },
  {
    question: "How do you ensure cultural relevance?",
    answer:
      "Our translators and audio professionals are native experts intricately embedded in Indian languages and culture, ensuring content is not merely translated, but authentically and culturally adapted for the target demographic.",
  },
  {
    question: "Do you supply SMEs for specialized higher ed subjects?",
    answer:
      "Absolutely. Through our rigorously maintained talent pool, we actively recruit and vet SMEs across diverse and specialized domains including advanced STEM fields, humanities, languages, accounting, and professional certifications.",
  },
  {
    question: "How are your SMEs vetted?",
    answer:
      "Our vetting pipeline involves multi-stage evaluation encompassing academic credential verification, deep-dive subject matter proficiency tests, pedagogy assessments, and recorded mock sessions to evaluate communication capability.",
  },
  {
    question: "Can you provide live online tutors?",
    answer:
      "Yes, we source, train, and deploy live online tutors who are specifically trained to engage students dynamically through digital interfaces using standard Content Services platform suites.",
  },
  {
    question:
      "What does eQOURSE provide under talent assessment and workforce evaluation?",
    answer:
      "eQOURSE develops assessment content, competency frameworks, scoring rubrics, reporting templates and digital-ready assets for B2B clients. The service can support hiring, learning readiness, workforce diagnostics, internal mobility and capability mapping programmes.",
  },
  {
    question: "Can eQOURSE create psychometric assessments?",
    answer:
      "eQOURSE develops psychometric assessment content, scoring documentation and reporting structures according to the agreed use case. Where formal psychological testing, licensing, clinical interpretation or legal validation is required, clients should involve qualified professionals and jurisdiction-specific reviewers.",
  },
  {
    question: "How are skill assessments structured?",
    answer:
      "Skill assessments usually start with role analysis, competency mapping and test blueprinting. eQOURSE then develops task formats, item banks, rubrics, model answers, difficulty tags and reporting logic that match the client’s workforce or learning context.",
  },
  {
    question: "Does eQOURSE support hiring assessments?",
    answer:
      "Yes. eQOURSE can create structured candidate evaluation materials such as screening tasks, work samples, interview guides, case exercises, evaluator rubrics and scorecards. The employer remains responsible for final hiring decisions and local legal compliance.",
  },
  {
    question: "Can assessments be delivered digitally?",
    answer:
      "eQOURSE prepares assessment content for digital delivery by organising item metadata, test forms, scoring keys, workflow documentation and reporting requirements. Technical implementation can be aligned with LMS, assessment platform or custom technology teams.",
  },
  {
    question: "How does eQOURSE approach fairness and quality?",
    answer:
      "Assessment work can be structured around defined use cases, job relevance, clear scoring criteria, review workflows, accessibility considerations and documentation. For regulated or high-stakes selection, clients should conduct appropriate validation, adverse impact review and legal checks in their jurisdiction.",
  },
  {
    question: "Can this service support training needs analysis?",
    answer:
      "Yes. Learning readiness and skill assessment outputs can help organisations identify baseline capability, prerequisite gaps and training priorities. These assets can inform curriculum planning, onboarding, reskilling and workforce development programmes.",
  },
  {
    question: "Do you provide hosting for your White Label LMS?",
    answer:
      "Yes, our white-label LMS solutions, primarily built on Open edX, are fully hosted on highly scalable and reliable AWS infrastructure, ensuring 99.9% uptime and zero maintenance burden for your team.",
  },
  {
    question: "Do you develop standardized tracked content?",
    answer:
      "Absolutely. We are experts in implementing leading educational technology tracking standards including SCORM 1.2, SCORM 2004, xAPI (Tin Can), and cmi5 to ensure comprehensive reporting on learner engagement.",
  },
];

const aiDataFaqs: FAQ[] = [
  {
    question: "What AI data services does eQOURSE provide?",
    answer:
      "eQOURSE provides end-to-end AI training data services: custom dataset collection (text, audio, image, video) across 30+ languages, expert data annotation and labeling (NLP, Computer Vision, Audio, RLHF), data cleaning and validation with 98%+ accuracy guarantee, and real-world model testing via our TuTrain platform. We are ISO 9001 & ISO 27001 certified.",
  },
  {
    question: "What types of data annotation does eQOURSE offer?",
    answer:
      "We offer <a href='/ai-data-services/annotation-labeling/text-nlp-annotation' class='text-primary hover:underline font-medium'>Text & NLP Annotation</a>, <a href='/ai-data-services/annotation-labeling/image-annotation' class='text-primary hover:underline font-medium'>Image Annotation</a>, <a href='/ai-data-services/annotation-labeling/video-annotation' class='text-primary hover:underline font-medium'>Video Annotation</a>, <a href='/ai-data-services/annotation-labeling/document-ocr-annotation' class='text-primary hover:underline font-medium'>Document & OCR Annotation</a>, <a href='/ai-data-services/annotation-labeling/audio-speech-annotation' class='text-primary hover:underline font-medium'>Audio & Speech Annotation</a>, and <a href='/ai-data-services/annotation-labeling/llm-rlhf-annotation' class='text-primary hover:underline font-medium'>RLHF & LLM evaluation</a>.",
  },
  {
    question:
      "What languages do you support for AI data collection and annotation?",
    answer:
      "We support 30+ languages spanning Indo-Aryan (Hindi, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, Bhojpuri), Dravidian (Tamil, Telugu, Kannada, Malayalam), Southeast Asian (Bahasa, Sinhala, Nepali), and European/Global (English with regional accent variants, French, German, Spanish, Portuguese, Arabic). All language tasks are handled by verified native speakers.",
  },
  {
    question: "What is your annotation accuracy guarantee?",
    answer:
      "eQOURSE guarantees 98%+ annotation accuracy on all delivered datasets. We maintain inter-annotator agreement (IAA) ≥ 0.80 (Krippendorff’s Alpha) across all annotation tasks. Our quality framework includes multi-tier review (annotator → peer review → senior QA audit), gold-standard honeypot validation (15–20% of all tasks), and expert arbitration for disagreements.",
  },
  {
    question: "What is real-world model testing and how does TuTrain work?",
    answer:
      "Real-world model testing is eQOURSE’s unique service where we test your trained AI model on actual users through our TuTrain platform. TuTrain connects your model to a demographically diverse, geographically distributed user base across 30+ languages. We measure WER, intent accuracy, task completion, and other performance metrics in genuine usage conditions - revealing failure modes that benchmark tests never catch. Results feed back into targeted data collection for 20–40% faster model improvement.",
  },
  {
    question: "How is my data kept secure?",
    answer:
      "We are ISO 27001:2022 certified for information security management. All data is handled under strict access controls, encryption at rest and in transit, GDPR-ready processes with PII detection and redaction, full data lineage and audit trails, and project-specific NDAs for all team members. Data is never shared across client projects. SOC 2 preparation is in progress for US enterprise clients.",
  },
  {
    question: "What output formats do you deliver annotated data in?",
    answer:
      "We deliver in all standard ML formats: COCO JSON (computer vision), CoNLL (NLP sequence labeling), JSONL (LLM fine-tuning), Parquet (structured data at scale), NIfTI (medical imaging), CSV/TSV (classification), and custom formats on request. All datasets are version-controlled with full documentation.",
  },
  {
    question: "How do I get started with AI data services?",
    answer:
      "We offer a free pilot dataset to qualifying AI and ML teams. Simply fill out the pilot form with your use case, data modality, language requirements, and annotation type. Our team will deliver a sample dataset within the agreed timeframe - no commitment required. Contact us at info@eqourse.com or call +91-92144-45870.",
  },
  {
    question: "How is eQOURSE different from other data annotation companies?",
    answer:
      "eQOURSE is the only provider offering a closed-loop pipeline from data collection to real-world model testing. We don’t just annotate your data - we test your trained model on real users via TuTrain and feed results back into targeted data collection (active learning loop). This delivers 20–40% faster model improvement compared to static annotation cycles. Additionally, our deep education-sector expertise means our annotators understand context, cultural nuance, and domain-specific content at a level that generic crowdsourcing platforms cannot match.",
  },
  {
    question: "What annotation types do you support?",
    answer:
      "We cover NLP (NER, sentiment, classification, relation extraction, MT post-editing, summarization), Computer Vision (bounding boxes, segmentation, polygons, keypoints, 3D point cloud, image classification), Audio (transcription, diarization, emotion detection, phonetic annotation), and RLHF/LLM (response ranking, instruction following, safety labeling, factual verification).",
  },
  {
    question: "How do you maintain annotation consistency?",
    answer:
      "Through our multi-tier QA framework: inter-annotator agreement (IAA >= 0.80), honeypot validation (15-20% gold-standard tasks), peer review, expert audit, and continuous annotator calibration sessions. This layered approach consistently delivers 98%+ accuracy.",
  },
  {
    question: "What output formats do you deliver in?",
    answer:
      "We deliver in all major formats including COCO JSON, Pascal VOC, CoNLL, JSONL, Parquet, CSV/TSV, spaCy format, and custom schemas. We match the format to your ML pipeline requirements.",
  },
  {
    question: "Can you handle specialized domain annotation?",
    answer:
      "Yes. Our annotators include STEM specialists in medical, legal, financial, and technical domains. We develop custom guidelines, conduct domain-specific training, and use subject matter experts for quality review.",
  },
  {
    question: "How do you handle RLHF annotation?",
    answer:
      "We provide trained human raters for RLHF tasks including response ranking, instruction-following quality assessment, safety and toxicity labeling, and factual accuracy verification.",
  },
  {
    question: "What data cleaning services do you offer?",
    answer:
      "We offer five core services: deduplication (exact and near-duplicate removal), noise removal (encoding fixes, HTML stripping, OCR cleanup), PII redaction (configurable replacement strategies), consistency normalization (dates, units, casing, terminology), and metadata enrichment (language codes, domain tags, source provenance).",
  },
  {
    question: "How do you handle PII in datasets?",
    answer:
      "We use a combination of regex patterns, NER models, and human review to detect PII (names, emails, phone numbers, addresses, SSNs). You can choose replacement strategies: token replacement, synthetic substitution, or complete removal. All redaction is logged for audit trails.",
  },
  {
    question: "What accuracy guarantee do you provide?",
    answer:
      "We guarantee 98%+ accuracy through our 3-tier validation pipeline: automated rules (100% coverage), gold-standard comparison (20% sample), and expert human review. If accuracy falls below threshold, we rework at no additional cost.",
  },
  {
    question: "Are your processes GDPR compliant?",
    answer:
      "Yes. We are GDPR compliant with ISO 27001 and ISO 9001 certifications. All teams sign NDAs, work in isolated environments with role-based access control, and all data transformations are logged with full audit trails and data lineage tracking.",
  },
  {
    question: "Can you clean data that's already been annotated?",
    answer:
      "Absolutely. We can clean pre-annotated data while preserving label integrity. Our pipeline handles label-aware deduplication, annotation consistency checks, and format validation.",
  },
  {
    question: "What types of data can you collect?",
    answer:
      "We collect text (corpora, dialogue, documents), audio (speech recordings, wake-words, multi-speaker conversations), image (object detection sets, medical imaging, satellite imagery), and video (action recognition, driving scenes, gesture recordings) across 30+ languages.",
  },
  {
    question: "How do you ensure data diversity?",
    answer:
      "We use demographic controls, geographic distribution, accent and dialect targeting, and balanced sampling strategies. Our managed crowd of 500+ contributors spans 30+ countries, ensuring natural variation in age, gender, region, and speaking style.",
  },
  {
    question: "What languages do you support for data collection?",
    answer:
      "We support 30+ languages including Indo-Aryan, Dravidian, Southeast Asian, European, East Asian, and Middle Eastern language families.",
  },
  {
    question: "Can you collect domain-specific data?",
    answer:
      "Yes. Our STEM-background specialists understand domain terminology and context. We've collected specialized datasets for healthcare, finance, legal, and technology domains.",
  },
  {
    question:
      "What's the typical turnaround time for a data collection project?",
    answer:
      "Turnaround varies by scope: pilot datasets typically take 1-2 weeks, mid-scale projects take 3-6 weeks, and large-scale collections are milestone-based with weekly deliveries and progress dashboards.",
  },
  {
    question: "How is your model testing different from standard benchmarks?",
    answer:
      "Standard benchmarks use scripted, clean test cases. We test with real users in real-world conditions - noisy audio, accented speech, code-switching, adversarial inputs, and multi-turn conversations. This reveals failure modes that benchmarks miss.",
  },
  {
    question: "What is the closed-loop pipeline?",
    answer:
      "Our closed-loop pipeline is a continuous improvement cycle: deploy, test with real users, collect feedback, analyze gaps, curate new training data, retrain, and validate again. This feedback loop delivers 20-40% faster model improvement compared to traditional batch testing.",
  },
  {
    question: "What is the TuTrain platform?",
    answer:
      "TuTrain is our proprietary testing infrastructure that connects your model to 500+ vetted real users across 30+ languages. It supports multi-device testing, provides real-time analytics dashboards, and delivers structured feedback on model performance with full audit trails.",
  },
  {
    question: "How long does a testing cycle take?",
    answer:
      "Typical testing cycles run 5-10 business days depending on scope. We operate in agile sprints: initial results in 2-3 days, full analysis by end of sprint. For continuous testing, we offer always-on crowd access with weekly reporting.",
  },
  {
    question: "Can you test models across multiple languages?",
    answer:
      "Yes. We test across 30+ languages with native speakers who understand regional dialects, accent variations, and cultural context. This is critical for Voice AI, Conversational AI, and multilingual NLP models.",
  },
  {
    question: "What types of AI data services does eQOURSE provide?",
    answer:
      "eQOURSE provides end-to-end AI data services including data collection (text, audio, image, video in 30+ languages), annotation and labeling (NLP, CV, Audio, RLHF), data cleaning and validation (deduplication, PII redaction, 98%+ accuracy), and model testing and evaluation (real-world testing via our TuTrain platform with closed-loop feedback).",
  },
  {
    question: "Which industries do you serve?",
    answer:
      "We serve Voice and Speech AI, Autonomous Vehicles, Conversational AI, Healthcare and Medical AI, FinTech and Banking, and more. Our domain-specific expertise ensures annotation guidelines and quality benchmarks are tailored to each industry's requirements.",
  },
  {
    question: "How do you ensure data quality?",
    answer:
      "We employ a multi-tier QA framework: automated validation rules, inter-annotator agreement (IAA >= 0.80), honeypot checks (15-20% of tasks), gold-standard comparison, and human expert review. This delivers 98%+ accuracy on production datasets.",
  },
  {
    question: "What languages do you support?",
    answer:
      "We support 30+ languages across Indo-Aryan, Dravidian, Southeast Asian, and European language groups. All annotations are done by native speakers.",
  },
  {
    question: "Can I start with a small pilot before committing?",
    answer:
      "Absolutely. We offer a free pilot program where you can test our capabilities with a representative sample of your data. No commitment required - the pilot helps you evaluate quality, turnaround time, and domain fit before scaling up.",
  },
];

const freePilotFaqs: FAQ[] = [
  {
    question: "Is the free pilot really free?",
    answer:
      "Yes, 100% free. No payment, no credit card, no hidden charges. We produce a complimentary sample tailored to your specifications so you can evaluate our quality before making any commitment.",
  },
  {
    question: "What do I receive in the Content Services pilot?",
    answer:
      "You receive a sample content piece tailored to your curriculum, subject, and grade level. This can be a lesson plan, workbook section, assessment paper, video script, curriculum outline, or exam prep module. It is produced by qualified SMEs, reviewed by our editorial QA team, and aligned to your board standards (CBSE, ICSE, IB, etc.).",
  },
  {
    question: "What do I receive in the AI Data Services pilot?",
    answer:
      "You receive a sample annotated dataset tailored to your AI use case. This can be NLP annotation (NER, sentiment, intent), Computer Vision annotation (bounding boxes, segmentation), Audio annotation (transcription, diarisation), or RLHF annotation (preference ranking, safety labeling). The sample includes 50–500 data units, delivered in your preferred format (COCO JSON, CoNLL, JSONL, etc.) with a quality report showing IAA scores and honeypot validation results.",
  },
  {
    question: "How long does it take to receive my pilot?",
    answer:
      "Content Services pilots are delivered within 5–7 business days. AI Data pilots are delivered within 5–10 business days, depending on modality and complexity. If you have urgent requirements, let us know and we can discuss expedited timelines.",
  },
  {
    question: "What happens after I receive the pilot?",
    answer:
      "You review the pilot output and provide feedback. If you're happy with the quality, our team will scope your full project with a detailed proposal, timeline, and pricing. If you're not satisfied, there is no obligation to proceed. We welcome constructive feedback either way.",
  },
  {
    question: "Can I request a pilot for both Content Services and AI Data?",
    answer:
      'Yes. Select "Both" in the pilot request form and describe your requirements for each vertical in the project description field. We\'ll produce samples for both.',
  },
  {
    question: "Is my data kept confidential?",
    answer:
      "Absolutely. eQOURSE is ISO 27001:2022 certified for information security. All pilot data is handled under strict NDAs, access controls, and encryption. Your data is never shared with other clients or used for any purpose beyond your pilot.",
  },
];

const allFaqs = [...contentServicesFaqs, ...aiDataFaqs, ...freePilotFaqs];

const FAQItem = ({
  faq,
  isOpen,
  toggle,
  type,
}: {
  faq: FAQ;
  isOpen: boolean;
  toggle: () => void;
  type: "content-services" | "ai" | "pilot";
}) => {
  const getColors = () => {
    if (type === "content-services")
      return {
        border: "border-teal-500/50",
        bg: "bg-teal-500",
        icon: GraduationCap,
      };
    if (type === "ai")
      return {
        border: "border-indigo-500/50",
        bg: "bg-indigo-600",
        icon: Brain,
      };
    return { border: "border-rose-500/50", bg: "bg-rose-500", icon: Rocket };
  };
  const colors = getColors();
  const Icon = colors.icon;

  return (
    <div
      className={`mb-4 border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? `${colors.border} shadow-md bg-secondary/30` : "hover:border-primary/30 glass"}`}
    >
      <button
        onClick={toggle}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? `${colors.bg} text-white` : "bg-primary/10 text-primary"}`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-semibold text-foreground md:text-lg">
            {faq.question}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0 sm:pl-[72px] text-muted-foreground leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQsAccordion = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>?/gm, ""),
      },
    })),
  };

  return (
    <section className="py-16 bg-background relative z-10 -mt-16">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Free Pilot FAQs */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Free Pilot & Getting Started
            </h2>
            <div className="h-[1px] flex-1 bg-border/80"></div>
          </div>

          <div className="space-y-4">
            {freePilotFaqs.map((faq, index) => {
              const id = `pilot-${index}`;
              return (
                <FAQItem
                  key={id}
                  faq={faq}
                  isOpen={openId === id}
                  toggle={() => toggleFAQ(id)}
                  type="pilot"
                />
              );
            })}
          </div>
        </div>

        {/* Content Service FAQs */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Content Services
            </h2>
            <div className="h-[1px] flex-1 bg-border/80"></div>
          </div>

          <div className="space-y-4">
            {contentServicesFaqs.map((faq, index) => {
              const id = `content-services-${index}`;
              return (
                <FAQItem
                  key={id}
                  faq={faq}
                  isOpen={openId === id}
                  toggle={() => toggleFAQ(id)}
                  type="content-services"
                />
              );
            })}
          </div>
        </div>

        {/* AI Data Services FAQs */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              AI Data Services
            </h2>
            <div className="h-[1px] flex-1 bg-border/80"></div>
          </div>

          <div className="space-y-4">
            {aiDataFaqs.map((faq, index) => {
              const id = `ai-${index}`;
              return (
                <FAQItem
                  key={id}
                  faq={faq}
                  isOpen={openId === id}
                  toggle={() => toggleFAQ(id)}
                  type="ai"
                />
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center glass border border-border/50 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
          <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is ready to provide tailored answers for your specific
            requirements.
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl shadow-soft hover:opacity-90 transition-opacity"
          >
            Contact Support <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQsAccordion;

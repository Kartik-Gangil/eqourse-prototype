import {
  AudioLines,
  Box,
  FileScan,
  Image,
  MessageSquareWarning,
  ScanLine,
  TextCursorInput,
  Video,
} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Link } from "react-router-dom";

const services = [
  { icon: Image, title: "Image Annotation", description: "Pixel-accurate labeling for object detection, segmentation and visual AI.", tasks: ["Bounding boxes", "Semantic segmentation", "Instance segmentation", "Polygon & polyline", "Keypoint & landmark", "Image classification"], href: "/ai-data-services/annotation-labeling/image-annotation" },
  { icon: Video, title: "Video Annotation", description: "Frame-accurate tracking and temporal labeling for video understanding models.", tasks: ["Persistent object IDs", "Frame interpolation", "Action recognition", "Event boundaries", "Multi-camera association"], href: "/ai-data-services/annotation-labeling/video-annotation" },
  { icon: TextCursorInput, title: "Text & NLP Annotation", description: "Language data structured for LLMs, search, chatbots and document AI.", tasks: ["Named entities", "Sentiment & aspects", "Text classification", "Relation extraction", "Intent & slots", "MT post-editing"] },
  { icon: AudioLines, title: "Audio & Speech Annotation", description: "Speech data prepared for ASR, voice assistants and conversational AI.", tasks: ["Transcription", "Speaker diarization", "Emotion & tone", "Audio events", "Phonetics", "Wake words"] },
  { icon: ScanLine, title: "LLM & RLHF Data", description: "Human feedback and evaluation data, reviewed by subject-matter experts.", tasks: ["Response ranking", "Instruction following", "Safety & toxicity", "Factual verification", "Red teaming", "RAG grounding"], href: "/ai-data-services/annotation-labeling/llm-rlhf-annotation" },
  { icon: Box, title: "3D Point Cloud & LiDAR", description: "Spatial labeling for autonomous systems, robotics and physical AI.", tasks: ["3D cuboids", "Point segmentation", "Sensor fusion", "Sweep tracking", "Lane & drivable space"] },
  { icon: FileScan, title: "Document & OCR Annotation", description: "Structured extraction from forms, invoices, IDs and scanned records.", tasks: ["Layout regions", "Form fields", "Table structure", "Handwriting", "Invoice parsing", "KYC labeling"], href: "/ai-data-services/annotation-labeling/document-ocr-annotation" },
  { icon: MessageSquareWarning, title: "Content Moderation & Trust/Safety", description: "Policy classification across text, image and video at scale.", tasks: ["Policy violations", "Severity tiering", "Hate & harassment", "NSFW classification", "Spam & fraud"] },
];

const AnnotationTypes = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background" id="annotation-services">
      <div className="container mx-auto px-4">
        <SectionHeader label="Annotation Services" title="Data Annotation Services Across" gradientText="Every Data Type" subtitle="Eight specialised annotation practices, one quality system, one delivery workflow." />

        <div className="mx-auto mb-12 max-w-6xl overflow-hidden rounded-[2rem] border border-border/60 bg-foreground shadow-elevated">
          <picture>
            <source srcSet="/assets/ai-data/annotation-labeling/annotation-types-image-video-text-audio.avif" type="image/avif" />
            <img src="/assets/ai-data/annotation-labeling/annotation-types-image-video-text-audio.webp" alt="Examples of image bounding boxes, video object tracking, text entity tagging and audio waveform segmentation" width="1200" height="675" loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
          </picture>
          <div className="grid grid-cols-4 border-t border-white/10 text-center text-[10px] font-bold uppercase tracking-[.16em] text-white/65 sm:text-xs">
            {["Image", "Video", "Language", "Speech"].map((label) => <span key={label} className="border-r border-white/10 px-2 py-3 last:border-0">{label}</span>)}
          </div>
        </div>

        <div ref={ref} className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description, tasks, ...service }, index) => {
            const content = <>
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-primary/8 text-primary transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              </div>
              <h3 className="mt-8 font-heading text-xl font-bold leading-tight text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <div className="mt-6 flex flex-wrap gap-1.5" aria-label={`${title} task types`}>
                {tasks.map((task) => <span key={task} className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] font-medium text-foreground/70">{task}</span>)}
              </div>
              <p className={`mt-6 flex items-center gap-2 text-xs font-semibold ${service.href ? "text-primary" : "text-muted-foreground"}`}><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {service.href ? "Explore dedicated service" : "Dedicated page coming soon"}</p>
            </>;
            const className = `group relative min-h-[340px] bg-card p-6 transition-colors duration-500 hover:bg-primary/[.045] reveal-up ${isVisible ? "visible" : ""}`;
            return service.href ? <Link key={title} to={service.href} className={className} style={{ transitionDelay: `${index * 55}ms` }} aria-label={`Explore ${title}`}>{content}</Link> : <article key={title} className={className} style={{ transitionDelay: `${index * 55}ms` }}>{content}</article>;
          })}
        </div>
      </div>
    </section>
  );
};

export default AnnotationTypes;

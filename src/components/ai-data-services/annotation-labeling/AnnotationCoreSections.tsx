import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Braces,
  CheckCircle2,
  CircleDollarSign,
  FileLock2,
  Languages,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

const taskGroups = [
  ["Computer vision", "2D bounding boxes · rotated/oriented boxes · polygons and polylines · semantic segmentation · instance segmentation · panoptic segmentation · keypoint and skeletal landmarks · cuboids · image classification · attribute tagging"],
  ["Video and temporal", "object tracking with persistent IDs · interpolated multi-frame boxes · action recognition and segmentation · event boundaries · scene change detection · trajectory annotation · multi-camera association"],
  ["Natural language", "named entity recognition · nested and overlapping entities · relation extraction · coreference resolution · intent and slot filling · sentiment and aspect-based sentiment · toxicity classification · query relevance rating · text span highlighting"],
  ["Audio and speech", "verbatim transcription · timestamped segmentation · speaker diarization and ID · language and dialect tagging · emotion and prosody labeling · acoustic event tagging · wake-word spotting · quality rating"],
  ["Documents", "page and region layout · form field extraction · table structure recognition · key-value pairs · handwriting transcription · stamp and signature detection · multi-page classification"],
  ["Generative AI & feedback", "pairwise preference ranking · Likert scoring · rubric evaluation · instruction adherence · factual verification · citation checks · adversarial prompts · multi-turn evaluation · agent trajectory review"],
  ["3D and sensor", "3D cuboid labeling · point-level semantic segmentation · camera–LiDAR fusion · radar annotation · tracking across sweeps · drivable-space and lane marking"],
  ["Multimodal", "image–text captioning and validation · audio–visual alignment · document layout plus content · video–transcript alignment"],
] as const;

const process = [
  ["01", "Scope & sample review", "Review the dataset, model objective and taxonomy; flag ambiguity before labeling."],
  ["02", "Guideline authoring", "Define classes, boundaries, positive and negative examples, and edge-case decisions."],
  ["03", "Team calibration", "Train annotators and require qualification against a representative gold set."],
  ["04", "Pilot batch", "Validate schema, quality threshold and reviewer feedback on a small production batch."],
  ["05", "Production", "Scale volume with daily throughput, versioned guidance and quality tracking."],
  ["06", "Multi-tier review", "Apply sampled QA, second pass or consensus labeling based on the agreed tier."],
  ["07", "Deliver & iterate", "Ship in your format with a QA report; corrections become versioned rounds."],
] as const;

export const AnnotationDefinition = () => (
  <section className="bg-background py-20 md:py-28">
    <div className="container mx-auto px-4">
      <Reveal className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div><SectionHeader label="The Foundation" title="What Is Data Annotation" gradientText="and Labeling?" centered={false} /></div>
        <div className="space-y-6 lg:pt-8">
          <p className="text-xl leading-relaxed text-foreground/85">Data annotation adds labels, tags, boundaries or structure to raw data so a machine learning model can learn from it. A bounding box, sentiment tag, speaker segment or preference ranking becomes a signal the model learns to reproduce.</p>
          <p className="leading-relaxed text-muted-foreground">The quality ceiling of a supervised model is set by its labels. Inconsistent annotation teaches inconsistency, which is why annotation is a specification problem before it is a labour problem—the guideline and acceptance criteria matter more than raw throughput.</p>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-2">
            <article className="bg-card p-6"><h3 className="font-heading text-lg font-bold">Annotation vs. labeling</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Labeling often assigns a class to a whole item; annotation can also describe regions, boundaries, relationships and attributes. eQOURSE delivers both through one QA workflow.</p></article>
            <article className="bg-card p-6"><h3 className="font-heading text-lg font-bold">Collection vs. annotation</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Collection creates the raw dataset. Annotation adds meaning to data that already exists. Most production programmes need both, in sequence.</p></article>
          </div>
          <Link to="/ai-data-services/data-collection" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">Explore AI Data Collection Services <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export const AnnotationTaskTypes = () => (
  <section className="bg-muted/35 py-24">
    <div className="container mx-auto px-4">
      <SectionHeader label="Task Library" title="Annotation Task Types" gradientText="We Support" subtitle="A single project usually combines several task types. These are the production workflows we run most often." />
      <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 md:grid-cols-2">
        {taskGroups.map(([title, text], index) => <Reveal key={title}><article className="h-full bg-card p-6 md:p-8"><div className="flex items-center gap-4"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="font-heading text-lg font-bold">{title}</h3></div><p className="mt-5 text-sm leading-7 text-muted-foreground">{text}</p></article></Reveal>)}
      </div>
      <div className="mt-8 text-center"><Link to="/ai-data-samples" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">See annotation samples <ArrowRight className="h-4 w-4" /></Link></div>
    </div>
  </section>
);

export const AnnotationProcess = () => (
  <section className="overflow-hidden bg-background py-24">
    <div className="container mx-auto px-4">
      <SectionHeader label="From Brief to Delivery" title="Our Data Annotation" gradientText="Process" subtitle="One connected workflow with a deliberate feedback loop from delivery back into quality review." />
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative hidden h-20 items-center lg:flex" aria-hidden="true">
          <svg viewBox="0 0 1200 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><title>Seven-step eQOURSE annotation process from scope and sample review to delivery and iteration</title><path d="M45 35 H1140 C1170 35 1170 68 1140 68 H560 C530 68 530 48 560 48 H680" fill="none" stroke="hsl(var(--primary))" strokeOpacity=".38" strokeWidth="2" strokeDasharray="7 8" className="animate-pulse motion-reduce:animate-none" /></svg>
          <div className="grid w-full grid-cols-7 gap-4">{process.map(([number]) => <div key={number} className="flex justify-center"><span className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary bg-background font-mono text-xs font-bold text-primary shadow-soft">{number}</span></div>)}</div>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {process.map(([number, title, text]) => <li key={number} className="group relative border-t-2 border-primary/30 bg-muted/30 p-5 transition-colors hover:border-primary hover:bg-primary/[.04]"><span className="font-mono text-xs font-bold text-primary lg:hidden">{number}</span><h3 className="mt-4 font-heading text-base font-bold lg:mt-0">{title}</h3><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{text}</p></li>)}
        </ol>
      </Reveal>
    </div>
  </section>
);

export const GuidelinesAndExperts = () => (
  <>
    <section className="bg-muted/35 py-24">
      <div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div><SectionHeader label="Living Specification" title="Annotation Guidelines and" gradientText="Edge-Case Handling" centered={false} /><p className="mt-6 text-lg leading-relaxed text-foreground/80">Most projects fail on edge cases, not obvious examples. Is an occluded object labeled? Where does a box end at the frame? Is sarcasm negative sentiment?</p><p className="mt-5 leading-relaxed text-muted-foreground">We stress-test the guideline against real samples. Every new ruling is versioned, dated and shared with the full team; earlier batches can be relabeled when consistency matters more than cost.</p></div>
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-white"><div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-primary/20" /><BookOpenCheck className="h-9 w-9 text-teal-300" /><h3 className="mt-8 font-heading text-2xl font-bold">One rule. Every annotator. Every batch.</h3><div className="mt-7 space-y-4">{["Positive and negative examples", "Boundary and ambiguity rules", "Named escalation owners", "Versioned production rulings"].map((item, i) => <div key={item} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm text-white/70"><span>{item}</span><span className="font-mono text-xs text-teal-300">v1.{i + 1}</span></div>)}</div></div>
      </Reveal></div>
    </section>

    <section className="relative overflow-hidden bg-[linear-gradient(135deg,hsl(222_48%_14%),hsl(174_52%_12%))] py-24">
      <div className="absolute inset-0 opacity-[.05]" style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="container relative mx-auto px-4"><Reveal className="mx-auto max-w-6xl"><span className="text-xs font-bold uppercase tracking-[.2em] text-teal-300">The eQOURSE difference</span><div className="mt-5 grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">Annotation by Subject-Matter Experts, <span className="text-teal-300">Not Just Annotators</span></h2><p className="mt-6 text-lg leading-relaxed text-white/70">Foundation models changed the task from “draw a box” to “judge a response.” Factuality, citation support, clinical safety and rubric quality require people who understand the subject.</p><p className="mt-5 leading-relaxed text-white/60">Our expert content business gives us an established bench of STEM, medical, life-sciences, language, assessment and curriculum reviewers across 30+ languages.</p></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">{[["Generalists", "High-volume boxes, transcription and classification"], ["Trained specialists", "Segmentation, relations and diarization"], ["Subject experts", "Factuality, rubrics and domain review"]].map(([title, text], i) => <article key={title} className="bg-white/[.045] p-5"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-teal-300/10 font-mono text-xs text-teal-300">0{i + 1}</span><h3 className="font-heading font-bold text-white">{title}</h3></div><p className="mt-3 pl-11 text-sm text-white/60">{text}</p></article>)}</div></div></Reveal></div>
    </section>
  </>
);

export const LanguagesToolsSecurity = () => {
  const languages = ["Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia", "Assamese", "Urdu"];
  const formats = ["COCO JSON", "YOLO", "Pascal VOC", "CVAT XML", "Segmentation masks", "JSON / JSONL", "CSV / TSV", "CoNLL", "BIO / IOB", "SRT", "VTT", "RTTM", "Parquet", "Custom schema"];
  return <>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><Languages className="h-9 w-9 text-primary" /><h2 className="mt-7 font-heading text-3xl font-bold md:text-4xl">Multilingual Annotation Across <span className="text-primary">30+ Languages</span></h2><p className="mt-6 leading-relaxed text-muted-foreground">Native-speaker review covers sentiment, intent, sarcasm, code-switching, transliteration, honorifics and cultural references. Shared guidelines use per-language annexes so labels remain comparable.</p></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">{languages.map((language) => <span key={language} className="bg-card px-4 py-4 text-sm font-semibold transition-colors hover:bg-primary/5 hover:text-primary">{language}</span>)}</div></Reveal></div></section>
    <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><SectionHeader label="Tool Agnostic" title="Platforms, Formats and" gradientText="Secure Delivery" subtitle="Work inside your platform or ours, then receive production-ready output in the schema your pipeline expects." /><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 lg:grid-cols-3"><article className="bg-card p-7"><Braces className="h-7 w-7 text-primary"/><h3 className="mt-6 font-heading text-xl font-bold">Output formats</h3><div className="mt-5 flex flex-wrap gap-2">{formats.map(format => <span key={format} className="rounded-full bg-muted px-3 py-1.5 text-xs text-foreground/75">{format}</span>)}</div></article><article className="bg-card p-7"><FileLock2 className="h-7 w-7 text-primary"/><h3 className="mt-6 font-heading text-xl font-bold">Security & compliance</h3><ul className="mt-5 space-y-3">{["ISO 9001 and ISO 27001 processes", "NDAs and role-based access", "PII redaction and pseudonymisation", "Per-item labeling and review audit trails", "Contract-defined retention and deletion"].map(item => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{item}</li>)}</ul></article><article className="bg-card p-7"><ShieldCheck className="h-7 w-7 text-primary"/><h3 className="mt-6 font-heading text-xl font-bold">Delivery</h3><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Encrypted transfer to your cloud bucket, SFTP or customer-managed environment, with per-batch QA reports and manifests. Client-VPN and restricted environments are available where required.</p></article></div></div></section>
  </>;
};

const engagement = [
  ["Managed project", "We run guidelines, staffing, QA and delivery against an agreed quality target."],
  ["Dedicated team", "A named team retains programme knowledge and scales with recurring volume."],
  ["Overflow support", "Your team keeps complex work while eQOURSE absorbs spikes and deadlines."],
  ["QA & relabeling", "We audit error rates, repair labels and align output to a corrected guideline."],
] as const;

const comparison = [
  ["Setup time", "Weeks to months", "Hours", "Days; pilot in week one"],
  ["Quality consistency", "High, harder to scale", "Variable", "Trained team, versioned rules"],
  ["Domain expertise", "Whatever you hire", "Rare", "SMEs already on bench"],
  ["Guideline ownership", "You maintain", "You maintain", "We author and stress-test"],
  ["QA model", "Whatever you build", "Usually consensus", "Gold sets, IAA, multi-pass"],
  ["Scaling", "Slow and costly", "Fast; quality varies", "Fast with retained knowledge"],
  ["Security", "Full control", "Distributed workforce", "ISO 27001, access controls"],
  ["Cost profile", "High fixed cost", "Low unit, rework risk", "Predictable, low rework"],
] as const;

export const EngagementComparisonPricing = () => (
  <>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Flexible Delivery" title="Engagement" gradientText="Models" /><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 md:grid-cols-2 lg:grid-cols-4">{engagement.map(([title, text], i) => <article key={title} className="bg-card p-6"><span className="font-mono text-xs text-primary">0{i + 1}</span><h3 className="mt-8 font-heading text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>
    <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><SectionHeader label="Build or Partner" title="In-House vs. Crowdsourced vs." gradientText="Managed Annotation" /><div className="mx-auto max-w-6xl overflow-x-auto rounded-3xl border border-border bg-card"><table className="w-full min-w-[800px] border-collapse text-left text-sm"><thead><tr className="bg-foreground text-white"><th className="p-5">Decision</th><th className="p-5">In-house team</th><th className="p-5">Crowdsourcing</th><th className="bg-primary p-5 text-primary-foreground">eQOURSE managed</th></tr></thead><tbody>{comparison.map((row, i) => <tr key={row[0]} className={i % 2 ? "bg-muted/30" : ""}>{row.map((cell, j) => <td key={`${row[0]}-${j}`} className={`border-t border-border p-5 ${j === 0 ? "font-semibold text-foreground" : "text-muted-foreground"} ${j === 3 ? "bg-primary/[.045] font-medium text-foreground" : ""}`}>{cell}</td>)}</tr>)}</tbody></table></div></div></section>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><CircleDollarSign className="h-9 w-9 text-primary"/><h2 className="mt-7 font-heading text-3xl font-bold md:text-4xl">What Determines Data Annotation Pricing?</h2><p className="mt-5 leading-relaxed text-muted-foreground">Share a sample and target schema for a scoped estimate with a throughput assumption you can verify.</p></div><div className="grid gap-x-10 sm:grid-cols-2">{["Task complexity", "Objects per item", "Volume and duration", "Quality tier", "Language and expertise", "Turnaround", "Security environment", "Guideline maturity"].map(item => <div key={item} className="flex items-center gap-3 border-b border-border py-4 text-sm font-medium"><CheckCircle2 className="h-4 w-4 text-primary" />{item}</div>)}</div></Reveal></div></section>
  </>
);

const industries = [
  ["Automotive & ADAS", "Object detection, lane marking, driver monitoring and sensor fusion"],
  ["Healthcare & Life Sciences", "Clinical text, medical image regions and document extraction"],
  ["Retail & E-commerce", "Product tagging, shelf detection, enrichment and search relevance"],
  ["Robotics & Physical AI", "Pose, manipulation, navigable space and sensor alignment"],
  ["Agriculture", "Crop and weed segmentation, yield, drone and satellite imagery"],
  ["Finance & Insurance", "KYC documents, invoices, claims and fraud review"],
  ["Media & Entertainment", "Moderation, scene metadata and subtitle alignment"],
  ["Education & EdTech", "Assessment labels, learner evaluation and curriculum tagging"],
] as const;

export const IndustriesPipelineProof = () => (
  <>
    <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><SectionHeader label="Applied AI" title="Data Annotation for" gradientText="Every Industry" /><div className="mx-auto grid max-w-6xl gap-x-10 md:grid-cols-2 lg:grid-cols-4">{industries.map(([title, text], i) => <article key={title} className="group border-t border-border py-7 transition-colors hover:border-primary"><div className="flex items-start justify-between"><h3 className="font-heading font-bold">{title}</h3><span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>
    <section className="bg-foreground py-24 text-white"><div className="container mx-auto px-4"><SectionHeader light label="Connected AI Data" title="One Workflow, From Collection" gradientText="to Model Testing" subtitle="Keep definitions, security and project knowledge intact across the complete data lifecycle."/><nav aria-label="AI data workflow" className="mx-auto flex max-w-6xl flex-col items-stretch justify-center gap-3 md:flex-row md:items-center">{[["Collect", "/ai-data-services/data-collection"], ["Annotate", ""], ["Clean & Validate", "/ai-data-services/cleaning-validation"], ["Test", "/ai-data-services/model-testing"], ["Improve", ""]].map(([label, href], i) => <div key={label} className="contents">{href ? <Link to={href} className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white/75 transition-colors hover:border-primary hover:text-teal-300">{label}</Link> : <span aria-current={label === "Annotate" ? "step" : undefined} className={`rounded-full px-5 py-3 text-center text-sm font-bold ${label === "Annotate" ? "bg-primary text-primary-foreground shadow-soft" : "border border-dashed border-white/15 text-white/45"}`}>{label}</span>}{i < 4 && <ArrowRight className="mx-auto h-4 w-4 rotate-90 text-white/25 md:rotate-0"/>}</div>)}</nav><div className="mt-8 text-center"><Link to="/robotics-training-data-services" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:underline">Robotics Training Data Services <ArrowRight className="h-4 w-4"/></Link></div></div></section>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Proof, Not Promises" title="See the" gradientText="Work" /><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 md:grid-cols-3">{[["Annotation samples", "Real labeled NLP, vision, speech and RLHF outputs.", "/ai-data-samples"], ["Case studies", "How teams used eQOURSE data in production programmes.", "/casestudy"], ["Client testimonials", "What teams say about delivery quality and partnership.", "/clients-testimonials"]].map(([title, text, href], i) => <Link key={title} to={href} className="group bg-card p-7 transition-colors hover:bg-primary/[.045]"><span className="font-mono text-xs text-primary">0{i + 1}</span><h3 className="mt-8 font-heading text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p><ArrowRight className="mt-8 h-5 w-5 text-primary transition-transform group-hover:translate-x-1"/></Link>)}</div></div></section>
  </>
);

export const WhyEqourse = () => {
  const reasons = ["Subject-matter experts for judgement-led work", "Collection, annotation, validation and testing under one contract", "Written specifications and versioned edge-case rulings", "Deep Indic and multilingual coverage", "500+ specialists across India and Singapore", "ISO 9001 and ISO 27001 certified processes", "Free pilot against your own acceptance threshold"];
  return <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><Sparkles className="h-9 w-9 text-primary"/><h2 className="mt-7 font-heading text-3xl font-bold md:text-4xl">Why Choose eQOURSE for Data Annotation</h2><p className="mt-5 text-muted-foreground">A guideline-first, expert-reviewed delivery model built for production—not anonymous task throughput.</p></div><div className="grid gap-x-10 sm:grid-cols-2">{reasons.map(reason => <div key={reason} className="flex gap-3 border-b border-border py-4 text-sm"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{reason}</div>)}</div></Reveal></div></section>;
};

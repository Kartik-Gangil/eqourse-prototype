import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Fingerprint,
  PackageCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const process = [
  ["01", "Define", "Use case, data type, volume, languages and deployment conditions."],
  ["02", "Specify", "Capture instructions, metadata, consent and acceptance criteria."],
  ["03", "Source & vet", "Approved sources, equipment and contributor screening."],
  ["04", "Pilot", "Validate the workflow before scaled collection begins."],
  ["05", "Collect", "Monitored capture with documented project controls."],
  ["06", "Validate", "File, duplication, format and human quality checks."],
  ["07", "Deliver", "Agreed structure, metadata and provenance documentation."],
];

const safeguards = [
  { icon: FileCheck2, title: "Clear guidelines", text: "Capture and acceptance rules defined before production." },
  { icon: Users, title: "Contributor screening", text: "Eligibility, language and profile checks based on project needs." },
  { icon: Fingerprint, title: "Consent & provenance", text: "Permitted use, source context and consent requirements built into the workflow." },
  { icon: PackageCheck, title: "Quality validation", text: "Automated checks, human QA, deduplication and format review where appropriate." },
];

const pricingFactors = [
  "Modality and capture complexity",
  "Total records, hours, images or video minutes",
  "Language, region and contributor profile",
  "Device and environment requirements",
  "Quality thresholds and delivery timeline",
];

export const CollectionDefinition = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-20 md:py-24 bg-background">
      <div ref={ref} className={`container mx-auto px-4 reveal-up ${isVisible ? "visible" : ""}`}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <SectionHeader label="The Foundation" title="What Is AI Data" gradientText="Collection?" centered={false} />
          <div className="pt-1 lg:pt-10">
            <p className="text-lg md:text-xl text-foreground/85 leading-relaxed">
              AI data collection is the process of sourcing or capturing the raw text, images, audio, video and multimodal data required to train, fine-tune and evaluate AI systems.
            </p>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              It can include contributor programmes, controlled field or studio capture, device-specific recording, customer-provided sources and appropriately licensed datasets.
            </p>
            <div className="mt-8 grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center rounded-2xl border border-border/60 bg-muted/30 p-5 md:p-6">
              <div><span className="text-xs font-semibold uppercase tracking-wider text-primary">Collection</span><p className="font-heading font-bold mt-1">Creates the raw dataset</p></div>
              <ArrowRight className="w-5 h-5 text-accent rotate-90 sm:rotate-0" aria-hidden="true" />
              <div><span className="text-xs font-semibold uppercase tracking-wider text-primary">Annotation</span><p className="font-heading font-bold mt-1">Adds labels and structure</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CollectionProcess = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader label="Collection Workflow" title="Our AI Data" gradientText="Collection Process" subtitle="A practical path from project requirements to a documented, quality-checked dataset." />
        <ol ref={ref} className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {process.map(([number, title, text], index) => (
            <li key={number} className={`relative rounded-2xl border border-border/60 bg-card p-5 lg:p-4 reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${index * 70}ms` }}>
              <span className="text-xs font-bold text-primary">{number}</span>
              <h3 className="font-heading font-bold mt-5 mb-2">{title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
        <div className="max-w-4xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Continue the workflow with</span>
          <Link className="font-semibold text-primary hover:underline" to="/ai-data-services/annotation-labeling">Annotation &amp; Labeling</Link>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
          <Link className="font-semibold text-primary hover:underline" to="/ai-data-services/cleaning-validation">Cleaning &amp; Validation</Link>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
          <Link className="font-semibold text-primary hover:underline" to="/ai-data-services/model-testing">Model Testing</Link>
        </div>
      </div>
    </section>
  );
};

export const CollectionAssurance = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, hsl(170 82% 50%) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader light label="Built-In Assurance" title="Quality, Consent &" gradientText="Data Security" subtitle="Controls are designed around the collection specification, approved use and required delivery evidence." />
        <div ref={ref} className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {safeguards.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className={`glass-dark rounded-2xl p-6 reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <Icon className="w-7 h-7 text-primary mb-5" aria-hidden="true" />
              <h3 className="font-heading font-bold text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-white/65">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 max-w-6xl mx-auto flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 text-white/80">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
          <p className="text-sm"><strong className="text-white">ISO 9001 and ISO 27001 certified processes</strong> support quality management and information-security controls.</p>
        </div>
      </div>
    </section>
  );
};

export const CollectionLifecycleAndPricing = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 reveal-up ${isVisible ? "visible" : ""}`}>
          <div className="rounded-3xl border border-border/60 bg-card p-7 md:p-9 shadow-card">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Connected AI Data Services</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mt-3">From Raw Data to Model-Ready Data</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">Collection can connect with annotation, cleaning, validation and model testing so feedback from later stages improves the original data specification.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {["Collect", "Annotate", "Clean & Validate", "Test", "Improve"].map((step) => <span key={step} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-foreground/75">{step}</span>)}
            </div>
          </div>
          <div className="rounded-3xl border border-border/60 bg-muted/30 p-7 md:p-9">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Project Scoping</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mt-3">What Determines Collection Pricing?</h2>
            <p className="text-muted-foreground mt-4">Pricing depends on the specification rather than a universal rate card.</p>
            <ul className="mt-6 space-y-3">
              {pricingFactors.map((factor) => <li key={factor} className="flex items-start gap-3 text-sm text-foreground/75"><CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" aria-hidden="true" />{factor}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

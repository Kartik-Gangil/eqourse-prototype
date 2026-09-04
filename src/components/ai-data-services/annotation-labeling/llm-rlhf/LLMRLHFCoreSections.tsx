import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Binary,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  Braces,
  CheckCircle2,
  CircleDollarSign,
  Code2,
  FileCheck2,
  Fingerprint,
  Gauge,
  Globe2,
  GraduationCap,
  Languages,
  LockKeyhole,
  MessageSquareText,
  Microscope,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  TestTube2,
  ThumbsUp,
  UsersRound,
} from "lucide-react";
import SectionHeader from "../../shared/SectionHeader";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const serviceItems = [
  [ThumbsUp, "Preference Ranking & RLHF Data", "Pairwise and list-wise comparison of model outputs, with written justifications where the decision signal needs context.", ["Pairwise A/B ranking", "List-wise ordering", "Likert scoring", "Justification capture", "DPO preference pairs"]],
  [BookOpenCheck, "SFT & Instruction Data Creation", "Human-authored instruction-response pairs and corrections built to your task distribution, voice and tone specification.", ["Prompt authoring", "Gold response writing", "Response rewriting", "Task distribution", "Style conformance"]],
  [Gauge, "Rubric-Based Response Evaluation", "Structured scoring across helpfulness, accuracy, completeness, tone, format and reasoning quality.", ["Multi-dimension scoring", "Custom rubric design", "Scored rationale", "Calibration rounds"]],
  [FileCheck2, "Factuality & Hallucination Review", "Qualified reviewers verify claims and flag fabrication, overstatement and unsupported inference.", ["Claim verification", "Source checking", "Fabrication flags", "Confidence review"]],
  [Network, "RAG Grounding & Citation Verification", "Check that retrieved context supports the answer and citations point to what they claim.", ["Context alignment", "Citation accuracy", "Retrieval relevance", "Unsupported claims"]],
  [ShieldCheck, "Safety, Toxicity & Policy Classification", "Policy-aware evaluation with harm categories and severity tiers rather than one binary label.", ["Policy taxonomy", "Severity tiers", "Harm classes", "Borderline adjudication"]],
  [TestTube2, "Red Teaming & Adversarial Prompts", "Human-written attacks designed to surface jailbreak, injection and refusal failures before users do.", ["Jailbreak writing", "Prompt injection", "Boundary probing", "Domain attacks"]],
  [Bot, "Agent Trajectory & Tool-Use Evaluation", "Step-level review of tool choice, call structure, error recovery and end-to-end task success.", ["Step correctness", "Tool selection", "Error recovery", "Task success"]],
  [MessageSquareText, "Multi-Turn Conversation Evaluation", "Conversation-level judgement across context retention, consistency, escalation and long-session drift.", ["Context retention", "Cross-turn consistency", "Persona adherence", "Conversation success"]],
  [Binary, "Model Comparison & Benchmarking", "Blind evaluation of models or checkpoints with randomized response order and dimension-level reporting.", ["Blind A/B", "Win-rate reporting", "Regression detection", "Checkpoint comparison"]],
  [UsersRound, "Domain-Expert Review", "Specialist evaluation where technical correctness cannot be judged by a generalist reviewer.", ["Qualified assignment", "Technical accuracy", "Domain rubrics", "Senior escalation"]],
  [Languages, "Multilingual LLM Evaluation", "Native-speaker evaluation across 30+ languages, including code-mixed and transliterated input.", ["Native-speaker rating", "Cultural fit", "Translation review", "Code-mixed handling"]],
] as const;

const process = [
  ["01", "Objective", "Define the behaviour to change and what better means."],
  ["02", "Rubric design", "Set dimensions, scales, anchors and tie-break rules."],
  ["03", "Qualification", "Match reviewers to domain and test judgement."],
  ["04", "Calibration", "Measure disagreement and clarify the rubric."],
  ["05", "Pilot batch", "Confirm format, agreement and reviewer behaviour."],
  ["06", "Production", "Scale with duplicate sampling and live monitoring."],
  ["07", "Delivery", "Ship data, agreement report and new rubric rulings."],
] as const;

const qualityControls = [
  ["Inter-rater reliability", "Krippendorff's alpha or Cohen's kappa tracked continuously—not only at kickoff."],
  ["Blind duplicate sampling", "Selected items are silently routed to multiple reviewers to measure real consistency."],
  ["Gold-standard sets", "Expert-adjudicated items reveal individual reviewer drift during production."],
  ["Rubric anchoring", "Every score level has written examples so a four means the same thing across the team."],
  ["Adjudication layer", "Threshold disagreements escalate to a senior reviewer and become a new rubric ruling."],
  ["Bias controls", "Order is randomized while length and position preferences are monitored."],
  ["Justification capture", "Ratings are supported by coherent rationale that becomes useful training signal."],
  ["Agreement reporting", "Confidence metrics and disagreement analysis ship with every batch."],
] as const;

const domains = [
  [BrainCircuit, "STEM & Mathematics", "Derivations, unit consistency, problem-solving steps and scientific accuracy."],
  [GraduationCap, "Education & Pedagogy", "Age appropriateness, curriculum alignment, explanation quality and assessment validity."],
  [Stethoscope, "Medical & Life Sciences", "Clinical accuracy, terminology and safety of health-related guidance."],
  [Scale, "Legal & Compliance", "Citation validity, jurisdictional accuracy and regulatory language."],
  [CircleDollarSign, "Finance & Business", "Numerical accuracy, terminology and regulatory disclaimers."],
  [Code2, "Software & Code", "Code correctness, security patterns, API accuracy and runnable output."],
  [Languages, "Linguistics & Translation", "Fluency, register, cultural fit, transliteration and code-mixing."],
] as const;

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`reveal-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
};

export const AlignmentDefinition = () => (
  <section className="bg-background py-20 md:py-24">
    <div className="container mx-auto px-4">
      <Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <SectionHeader label="The Alignment Layer" title="What Is RLHF and LLM" gradientText="Data Annotation?" centered={false} />
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p><strong className="text-foreground">Reinforcement Learning from Human Feedback (RLHF)</strong> teaches a language model which responses people actually prefer. Reviewers compare outputs, rank them, score them against a rubric or rewrite them—and that signal steers the model toward helpful, accurate and safe behaviour.</p>
          <p>LLM data annotation is the wider category: creating instruction-response pairs, checking factuality and citations, classifying unsafe content and probing the model for failures before users find them.</p>
          <p className="border-l-2 border-primary pl-5 font-medium text-foreground">This work rarely has one objectively correct answer. Rubric design, reviewer qualification and inter-rater measurement are the quality system.</p>
          <p className="rounded-2xl border border-border bg-muted/35 p-5 text-sm">Building alignment data from human judgement is this page—the deliverable is a training dataset. Choosing which model candidate should ship is <Link to="/ai-data-services/model-testing/human-evaluation-ab-testing" className="font-bold text-primary hover:underline">Human Evaluation &amp; A/B Testing</Link>—the deliverable is a decision. Measuring intended-task quality, groundedness and judge reliability is <Link to="/ai-data-services/model-testing/llm-evaluation" className="font-bold text-primary hover:underline">LLM evaluation</Link>; measuring whether a system treats groups differently is an <Link to="/ai-data-services/model-testing/bias-fairness-audit" className="font-bold text-primary hover:underline">AI bias and fairness audit</Link>; and trying to break it deliberately is <Link to="/ai-data-services/model-testing/ai-red-teaming" className="font-bold text-primary hover:underline">AI red teaming</Link>.</p>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-muted/30">
        <div className="grid md:grid-cols-3">
          {[
            ["SFT", "Teaches how to respond", "Curated instruction-response pairs written or corrected by humans."],
            ["RLHF", "Teaches which response is better", "Human rankings train a reward model that steers behaviour."],
            ["DPO", "Optimises directly on preferences", "Uses the same chosen and rejected pairs without a separate reward model."],
          ].map(([label, title, text], index) => <article key={label} className="relative border-b border-border/60 p-7 last:border-0 md:border-b-0 md:border-r md:last:border-r-0"><span className="font-mono text-xs font-bold text-primary">0{index + 1} / {label}</span><h3 className="mt-5 font-heading text-xl font-bold text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}
        </div>
        <div className="border-t border-border/60 bg-foreground px-7 py-5 text-sm leading-relaxed text-white/75"><strong className="text-white">In practice, programmes use all three:</strong> SFT establishes behaviour, preference data refines it, and ongoing evaluation measures whether it worked.</div>
      </div>
    </div>
  </section>
);

export const LLMServices = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="overflow-hidden bg-muted/35 py-24" id="llm-services">
      <div className="container mx-auto px-4">
        <SectionHeader label="Alignment Capabilities" title="LLM Data Services" gradientText="We Deliver" subtitle="From instruction data and preference ranking to specialist review and production evaluation." />
        <div ref={ref} className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-border/70 bg-border/70 md:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map(([Icon, title, description, chips], index) => <article key={title} className={`group min-h-[330px] bg-card p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg hover:bg-primary/[.045] reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${index * 45}ms` }}><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mt-7 font-heading text-xl font-bold leading-tight text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p><div className="mt-5 flex flex-wrap gap-1.5">{chips.map(chip => <span key={chip} className="rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-medium text-foreground/70">{chip}</span>)}</div></article>)}
        </div>
      </div>
    </section>
  );
};

export const ExpertDifference = () => (
  <section className="relative overflow-hidden bg-[#0b1028] py-24 text-white">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 25%, hsl(170 82% 46% / .35), transparent 28%), linear-gradient(hsl(0 0% 100% / .035) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / .035) 1px, transparent 1px)", backgroundSize: "auto, 44px 44px, 44px 44px" }} />
    <div className="container relative mx-auto px-4">
      <Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div><span className="text-xs font-bold uppercase tracking-[.18em] text-primary">The eQOURSE Difference</span><h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl">Fluent answers can still be <span className="text-primary">confidently wrong.</span></h2><div className="mt-7 space-y-4 leading-relaxed text-white/70"><p>A generalist can grade a simple fact. They cannot reliably judge a drug interaction, mathematical proof, contract clause or explanation intended for a ten-year-old.</p><p>When fluent mistakes receive high scores, the reward model learns that fluency equals correctness. That is where alignment programmes quietly fail.</p><p className="text-white">Our reviewer bench comes from expert content, assessment and publishing work. For tasks where subject knowledge determines the label, qualified reviewers—not guideline-trained generalists—make the call.</p></div></div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.045]"><div className="border-b border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/55">Reviewer tiering</div>{[["01", "Trained annotators", "High-volume safety, format and basic preference tasks"], ["02", "Senior reviewers", "Subjective rubric scoring, conversations and adjudication"], ["03", "Subject-matter experts", "Technical correctness in STEM, medical, legal, code and pedagogy"]].map(([number, title, text], index) => <div key={title} className={`grid grid-cols-[auto_1fr] gap-5 border-b border-white/10 p-6 last:border-0 ${index === 2 ? "bg-primary/10" : ""}`}><span className="font-mono text-sm text-primary">{number}</span><div><h3 className="font-heading text-lg font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-white/60">{text}</p></div></div>)}</div>
      </Reveal>
    </div>
  </section>
);

export const ExpertDomains = () => (
  <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Qualified Judgement" title="Expert Domains" gradientText="We Cover" subtitle="Reviewer assignment follows the knowledge needed to judge correctness—not only task availability." /><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{domains.map(([Icon, title, text], index) => <article key={title} className={`${index === 1 ? "bg-primary/[.06] lg:col-span-2" : "bg-card"} p-7`}><Icon className="h-6 w-6 text-primary" aria-hidden="true"/><h3 className="mt-5 font-heading text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>
);

export const LLMProcess = () => (
  <section className="overflow-hidden bg-muted/35 py-24">
    <div className="container mx-auto px-4"><SectionHeader label="Rubric to Release" title="How an LLM Data" gradientText="Project Runs" />
      <div className="relative mx-auto max-w-7xl">
        <svg className="pointer-events-none absolute left-[5%] top-7 hidden h-28 w-[90%] lg:block" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><title>Seven-step eQOURSE LLM data process from objective definition through rubric design and calibration to delivery</title><path d="M35 35 H965" fill="none" stroke="hsl(var(--primary))" strokeOpacity=".45" strokeWidth="2" strokeDasharray="7 8" className="animate-pulse motion-reduce:animate-none"/><path d="M965 35 C985 35 985 103 925 103 H190 C140 103 140 63 190 63 H235" fill="none" stroke="hsl(var(--primary))" strokeOpacity=".28" strokeWidth="2" strokeDasharray="5 9"/><path d="m226 55 12 8-12 8" fill="none" stroke="hsl(var(--primary))" strokeOpacity=".55" strokeWidth="2"/></svg>
        <ol className="relative grid gap-4 lg:grid-cols-7">{process.map(([number, title, text]) => <li key={number} className="relative z-10 rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-transform duration-300 hover:-translate-y-1"><span className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 font-mono text-xs font-bold text-primary">{number}</span><h3 className="mt-5 font-heading font-bold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p></li>)}</ol>
        <p className="mt-7 text-center text-sm text-muted-foreground"><span className="font-semibold text-primary">Continuous loop:</span> new failure modes feed back into rubric design and future calibration.</p>
      </div>
    </div>
  </section>
);

export const SubjectiveQuality = () => (
  <section className="bg-background py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center"><div><span className="text-xs font-bold uppercase tracking-[.18em] text-primary">Measured Agreement</span><h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">Quality Control When There Is <span className="text-gradient">No Single Right Answer</span></h2><p className="mt-5 leading-relaxed text-muted-foreground">Preference data has no fixed ground truth. Quality comes from calibrated rubrics, independently measured agreement and documented adjudication.</p><div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">{[["α / κ", "Reliability measured"], ["Blind", "Duplicate sampling"], ["Gold", "Drift detection"], ["Every batch", "Agreement report"]].map(([value,label])=><div key={label} className="bg-card p-5"><div className="font-heading text-2xl font-bold text-primary">{value}</div><div className="mt-1 text-xs text-muted-foreground">{label}</div></div>)}</div></div><picture className="overflow-hidden rounded-[2rem] border border-border/70 shadow-elevated"><source srcSet="/assets/ai-data/annotation-labeling/llm-rlhf/rlhf-annotation-quality-calibration.avif" type="image/avif"/><img src="/assets/ai-data/annotation-labeling/llm-rlhf/rlhf-annotation-quality-calibration.webp" alt="Reviewers calibrating scores against a shared rubric during an inter-rater agreement round" width="1000" height="600" loading="lazy" decoding="async" className="aspect-[5/3] w-full object-cover"/></picture></Reveal><div className="mx-auto mt-14 grid max-w-6xl gap-x-8 gap-y-0 border-y border-border/70 md:grid-cols-2">{qualityControls.map(([title,text],index)=><article key={title} className={`grid grid-cols-[auto_1fr] gap-4 border-b border-border/60 py-5 ${index >= 6 ? "md:border-b-0" : ""}`}><span className="font-mono text-xs text-primary">0{index+1}</span><div><h3 className="font-heading font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div></article>)}</div></div></section>
);

const languages = ["Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia", "Assamese", "Urdu"];

export const LanguagesDeliverySecurity = () => (
  <>
    <section className="relative overflow-hidden bg-[#10183a] py-24 text-white"><div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[140px]"/><div className="container relative mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><Globe2 className="h-8 w-8 text-primary"/><h2 className="mt-5 font-heading text-4xl font-bold leading-tight">Multilingual LLM Evaluation Across <span className="text-primary">30+ Languages</span></h2><p className="mt-5 leading-relaxed text-white/65">Alignment does not transfer cleanly across languages. Refusal, politeness, cultural reference and ambiguity require native judgement—not translated English evaluation.</p><p className="mt-4 leading-relaxed text-white/65">Shared rubrics use per-language annexes so scores stay comparable without erasing local nuance.</p></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-white/45">Deep Indic coverage</p><div className="mt-5 flex flex-wrap gap-2">{languages.map((language,index)=><span key={language} className={`rounded-full border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary ${index < 4 ? "border-primary/40 bg-primary/10" : "border-white/15 bg-white/[.035]"}`}>{language}</span>)}</div><div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10 text-center text-xs"><div className="bg-white/[.04] p-4">Native-speaker review</div><div className="bg-white/[.04] p-4">Transliterated input</div><div className="bg-white/[.04] p-4">Code-mixed language</div></div></div></Reveal></div></section>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Pipeline Ready" title="Data Formats, Tooling" gradientText="and Delivery" /><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3"><article className="lg:col-span-2"><div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">{[["Preference pairs", "JSONL: prompt, chosen, rejected, rationale and margin"], ["SFT data", "Instruction-response JSONL or chat message arrays"], ["Evaluation scores", "Rubric dimensions, reviewer ID, timestamp and rationale"], ["Conversation data", "Turn-level and conversation-level labels"], ["Agent traces", "Tool calls, arguments, outputs and per-step correctness"], ["Red team results", "Attack, response, result, harm category and severity"]].map(([title,text])=><div key={title} className="bg-card p-6"><Braces className="h-5 w-5 text-primary"/><h3 className="mt-4 font-heading font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div></article><aside className="rounded-3xl bg-foreground p-7 text-white"><Fingerprint className="h-7 w-7 text-primary"/><h3 className="mt-5 font-heading text-2xl font-bold">Your evaluation stack</h3><p className="mt-3 text-sm leading-relaxed text-white/65">We work inside your platform, custom harness or client-controlled environment—or provide tooling when needed.</p><ul className="mt-6 space-y-3 text-sm text-white/75">{["Cloud bucket or SFTP delivery", "Custom schema mapping", "Per-batch manifest", "Agreement report included"].map(item=><li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{item}</li>)}</ul></aside></div></div></section>
    <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><LockKeyhole className="h-8 w-8 text-primary"/><h2 className="mt-5 font-heading text-4xl font-bold">Security, IP and Confidentiality</h2><p className="mt-5 leading-relaxed text-muted-foreground">Unreleased outputs, policies and proprietary prompts run under controls designed for restricted LLM programmes.</p></div><div className="grid gap-x-8 border-y border-border md:grid-cols-2">{["ISO 9001 and ISO 27001 processes", "NDAs for every reviewer", "Named, vetted reviewer pools", "Role-based least-privilege access", "Contract-defined retention and deletion", "Client VPN or controlled environment", "Full reviewer audit trail", "Clear client IP assignment"].map(item=><div key={item} className="flex gap-3 border-b border-border/60 py-4 text-sm"><BadgeCheck className="h-5 w-5 shrink-0 text-primary"/><span>{item}</span></div>)}</div></Reveal></div></section>
  </>
);

export const CommercialAndAudience = () => (
  <>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Flexible Delivery" title="Engagement Models" gradientText="That Fit the Programme" /><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-5">{[["Managed evaluation", "Rubric, staffing, QA and delivery"], ["Dedicated expert pool", "Named reviewers build context over time"], ["Continuous evaluation", "Weekly or monthly release tracking"], ["Surge capacity", "Launch and fine-tune review coverage"], ["Rubric consulting", "We design; your team executes"]].map(([title,text],index)=><article key={title} className="bg-card p-6"><span className="font-mono text-xs text-primary">0{index+1}</span><h3 className="mt-5 font-heading font-bold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>
    <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><Reveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"><div><span className="text-xs font-bold uppercase tracking-[.18em] text-primary">Transparent Scope</span><h2 className="mt-4 font-heading text-4xl font-bold">What Determines RLHF and LLM Data Cost?</h2><p className="mt-5 leading-relaxed text-muted-foreground">Pricing may be per item, hour or programme. A pilot turns these variables into a throughput assumption you can verify.</p><Link to="/contact-us" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:underline">Request a scoped estimate <ArrowRight className="h-4 w-4"/></Link></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">{["Reviewer qualification", "Task complexity", "Response length & count", "Rubric maturity", "Agreement target", "Language coverage", "Turnaround", "Security tier"].map((item,index)=><div key={item} className="bg-card p-5"><span className="font-mono text-[10px] text-primary">0{index+1}</span><p className="mt-2 text-sm font-semibold">{item}</p></div>)}</div></Reveal></div></section>
    <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Built for Production" title="Who We Build" gradientText="LLM Data For" /><div className="mx-auto grid max-w-6xl gap-x-10 border-y border-border md:grid-cols-2">{[[Target,"Foundation model teams","Preference, safety and red-teaming programmes across languages."],[BrainCircuit,"Enterprise fine-tuning","Domain SFT data and evaluation on internal knowledge."],[Network,"RAG system builders","Grounding, citation accuracy and retrieval relevance."],[Bot,"AI agent teams","Trajectory review, tool use and end-to-end success."],[GraduationCap,"EdTech & assessment","Pedagogical quality, age fit and curriculum alignment."],[Microscope,"Regulated industries","Expert verification where wrong answers carry consequences."]].map(([Icon,title,text])=><article key={String(title)} className="grid grid-cols-[auto_1fr] gap-4 border-b border-border/60 py-6"><Icon className="h-6 w-6 text-primary"/><div><h3 className="font-heading text-lg font-bold">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{text}</p></div></article>)}</div></div></section>
  </>
);

export const RelatedProofWhy = () => {
  const related = [
    ["Text & NLP Annotation", "Structured language labeling", "/ai-data-services/annotation-labeling/text-nlp-annotation"],
    ["Content Moderation & Trust/Safety", "Policy operations, severity and contextual review", "/ai-data-services/annotation-labeling/content-moderation"],
    ["Text Data Collection for LLMs", "Purpose-built language datasets", "/ai-data-services/data-collection/text-data-collection"],
    ["LLM Training Data Curation", "Curate the corpus before alignment", "/ai-data-services/cleaning-validation/llm-data-curation"],
    ["AI Model Testing", "Measure behaviour after alignment", "/ai-data-services/model-testing"],
    ["All Annotation Services", "Explore every annotation modality", "/ai-data-services/annotation-labeling"],
  ];
  return (
    <>
      <section className="bg-muted/35 py-24"><div className="container mx-auto px-4"><SectionHeader label="Continue the Pipeline" title="Related AI Data" gradientText="Services" /><div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{related.map(([title,text,href])=>href?<Link key={title} to={href} className="group bg-card p-6 transition-colors hover:bg-primary/[.05]"><span className="text-[10px] font-bold uppercase tracking-wider text-primary">Live service page</span><h3 className="mt-3 font-heading text-lg font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p><ArrowRight className="mt-5 h-4 w-4 text-primary transition-transform group-hover:translate-x-1"/></Link>:<div key={title} className="bg-card p-6"><span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Dedicated page coming soon</span><h3 className="mt-3 font-heading text-lg font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></div>)}</div></div></section>
      <section className="bg-background py-24"><div className="container mx-auto px-4"><SectionHeader label="Evidence" title="See the" gradientText="Work" /><div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">{[["RLHF samples","Real preference and evaluation output","/ai-data-samples/rlhf"],["Case studies","See how programmes perform in practice","/casestudy"],["Client testimonials","Hear from organisations we support","/clients-testimonials"]].map(([title,text,href])=><Link key={title} to={href} className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"><Sparkles className="h-6 w-6 text-primary"/><h3 className="mt-6 font-heading text-xl font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p><ArrowRight className="mt-8 h-5 w-5 text-primary transition-transform group-hover:translate-x-1"/></Link>)}</div></div></section>
      <section className="relative overflow-hidden bg-[#0b1028] py-24 text-white"><div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle, hsl(170 82% 46% / .45) 1px, transparent 1px)",backgroundSize:"36px 36px"}}/><div className="container relative mx-auto px-4"><SectionHeader label="Why eQOURSE" title="Expert Feedback, Built for" gradientText="Measurable Alignment" light /><div className="mx-auto grid max-w-6xl gap-x-8 border-y border-white/10 md:grid-cols-2">{["Subject-matter experts already on the bench", "Rubric-first delivery with anchored examples", "Agreement reported with every batch", "Deep Indic and multilingual coverage", "Named, vetted reviewer pools", "Full AI data pipeline under one contract", "Free pilot on your model and rubric"].map((item,index)=><div key={item} className="flex gap-4 border-b border-white/10 py-5 text-sm text-white/75"><span className="font-mono text-xs text-primary">0{index+1}</span><span>{item}</span></div>)}</div></div></section>
    </>
  );
};

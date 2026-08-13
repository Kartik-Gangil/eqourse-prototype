import { CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const controls = [
  ["Gold-standard sets", "Hidden expert-labeled items measure accuracy continuously, not only during onboarding."],
  ["Inter-annotator agreement", "Overlapping assignments turn guideline ambiguity into a measurable signal."],
  ["Consensus & adjudication", "A senior reviewer resolves disagreement and turns the ruling into guidance."],
  ["Multi-pass review", "A second annotator or dedicated QA reviewer checks output before delivery."],
  ["Automated validation", "Schema values, coordinates, missing fields, duplicates and nulls are caught programmatically."],
  ["Escalation paths", "Anything without a written rule goes to a lead and is back-propagated across the team."],
  ["Agreed acceptance criteria", "Accuracy, IoU or agreement thresholds are defined during the pilot."],
] as const;

const QualityFramework = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,hsl(221_52%_13%),hsl(176_54%_11%))] py-24" id="quality-assurance">
      <div className="absolute inset-0 opacity-[.04]" style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
      <div className="container relative mx-auto px-4">
        <SectionHeader label="Quality Assurance" title="Multi-Tier QA" gradientText="Framework" subtitle="Rigorous quality controls at every stage protect consistency before labels enter your model pipeline." light />
        <div ref={ref} className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
          {[["≥ 0.80", "Agreement target", "Multiple reviewers expose unclear rules before delivery."], ["15–20%", "Gold-set coverage", "Hidden reference tasks monitor annotator quality continuously."], ["4 tiers", "Review pipeline", "Automated QA, peer review, expert audit and gold comparison."]].map(([value, title, text], i) => <article key={title} className={`bg-white/[.045] p-7 text-center reveal-up ${isVisible ? "visible" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="relative mx-auto grid h-28 w-28 place-items-center rounded-full border border-teal-300/20"><div className="absolute inset-2 rounded-full border border-dashed border-teal-300/35 animate-[spin_18s_linear_infinite] motion-reduce:animate-none"/><strong className="font-heading text-2xl text-teal-300">{value}</strong></div><h3 className="mt-6 font-heading text-lg font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p></article>)}
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <picture className="block overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <source srcSet="/assets/ai-data/annotation-labeling/annotation-quality-control-review.avif" type="image/avif" />
            <img src="/assets/ai-data/annotation-labeling/annotation-quality-control-review.webp" alt="Reviewer comparing two annotators' labels on the same image during consensus quality review" width="1000" height="600" loading="lazy" decoding="async" className="aspect-[5/3] w-full object-cover" />
          </picture>
          <div className="grid sm:grid-cols-2">{controls.map(([title, text]) => <article key={title} className="border-b border-white/10 py-5 sm:odd:pr-6 sm:even:pl-6"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300"/><div><h3 className="font-heading text-sm font-bold text-white">{title}</h3><p className="mt-2 text-xs leading-relaxed text-white/55">{text}</p></div></div></article>)}</div>
        </div>
      </div>
    </section>
  );
};

export default QualityFramework;

import { ArrowRight, Bot } from "lucide-react";
import { Link } from "react-router-dom";

type RoboticsBridgeContext = "collection" | "annotation" | "validation" | "evaluation";

const bridgeCopy: Record<RoboticsBridgeContext, { eyebrow: string; body: string; anchor: string }> = {
  collection: {
    eyebrow: "Physical-world collection",
    body: "Extend egocentric video and multimodal collection programmes into structured demonstrations for Embodied AI and robot learning.",
    anchor: "Explore egocentric and robotics data collection",
  },
  annotation: {
    eyebrow: "Perception-to-action labels",
    body: "Connect objects, pose, task steps, contact events, language and outcomes across complete robotics episodes.",
    anchor: "Explore robotics data annotation",
  },
  validation: {
    eyebrow: "Synchronised multimodal QA",
    body: "Validate timestamp alignment, stream completeness, metadata, calibration and episode-level label consistency for robotics datasets.",
    anchor: "Explore multimodal robotics data validation",
  },
  evaluation: {
    eyebrow: "Closed-loop robot learning",
    body: "Turn task failures, environmental gaps and recovery behaviour into targeted collection and validation sets.",
    anchor: "Explore robotics model evaluation",
  },
};

const RoboticsServiceBridge = ({ context }: { context: RoboticsBridgeContext }) => {
  const content = bridgeCopy[context];
  const destination = context === "collection"
    ? "/robotics-training-data-services/human-demonstrations"
    : "/robotics-training-data-services";

  return (
    <section className="bg-background px-4 py-8">
      <Link
        to={destination}
        className="group mx-auto flex max-w-6xl flex-col gap-5 overflow-hidden rounded-[1.75rem] border border-primary/20 bg-white/70 p-6 shadow-card backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated md:flex-row md:items-center md:p-8"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-white shadow-soft">
          <Bot className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{content.eyebrow}</span>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{content.body}</p>
        </div>
        <span className="inline-flex items-center gap-2 font-semibold text-primary">
          {content.anchor}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </section>
  );
};

export default RoboticsServiceBridge;

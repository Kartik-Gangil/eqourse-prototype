import { useRef, useEffect, useState } from "react";
import { Handshake, Users, Globe, RefreshCw, Shield, Target, TrendingUp } from "lucide-react";
import strategyImage from "@/assets/strategy-image.jpg";

const reasons = [
  { icon: Handshake, title: "Dual-Capability Partner", desc: "Education content + AI training data from one team." },
  { icon: Users, title: "500+ Domain Specialists", desc: "STEM-educated across science, medicine, engineering, law." },
  { icon: Globe, title: "30+ Languages", desc: "South Asian, Southeast Asian, European, African language families." },
  { icon: RefreshCw, title: "Only Closed-Loop AI Pipeline", desc: "Annotate + test on real users + feedback loop. 20–40% faster." },
  { icon: Shield, title: "ISO 9001 & 27001 Certified", desc: "GDPR-ready. Full data lineage. SOC 2 in progress." },
  { icon: Target, title: "98%+ Accuracy Guarantee", desc: "Gold-standard honeypots, IAA ≥ 0.80, multi-tier QA." },
  { icon: TrendingUp, title: "Scalable", desc: "Free pilot to enterprise-scale. Project or subscription pricing." },
];

const WhyChooseUs = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(500);

  // Measure image height on load/resize to sync scrollable panel
  useEffect(() => {
    const measure = () => {
      if (imageRef.current) {
        setImageHeight(imageRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section heading — shown on all screens */}
        <div className="mb-8 sm:mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Why eQOURSE</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-1">
            Why Choose <span className="text-gradient">eQOURSE?</span>
          </h2>
        </div>

        {/* Desktop: side-by-side with scrollable right panel */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: fixed-height image */}
          <div ref={imageRef} className="sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={strategyImage} alt="Why Choose eQOURSE — our team at work" width={800} height={600} loading="lazy" className="w-full object-cover" />
            </div>
          </div>

          {/* Right: scrollable reasons panel */}
          <div
            className="overflow-y-auto pr-2 scrollbar-thin"
            style={{
              maxHeight: `${imageHeight}px`,
              scrollbarWidth: 'thin',
              scrollbarColor: 'hsl(170 82% 40% / 0.3) transparent',
            }}
          >
            <div className="space-y-3">
              {reasons.map((reason) => (
                <div key={reason.title} className="group flex gap-4 p-4 rounded-xl hover:bg-card cursor-default neon-card transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                    <reason.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">{reason.title}</h4>
                    <p className="text-sm text-muted-foreground">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="sticky bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Mobile: image then horizontal scrollable cards */}
        <div className="lg:hidden">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-elevated mb-8">
            <img src={strategyImage} alt="Why Choose eQOURSE" width={800} height={600} loading="lazy" className="w-full object-cover" />
          </div>

          {/* Horizontal scrollable cards */}
          <div
            className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex-shrink-0 w-[calc(50%-6px)] snap-start"
              >
                <div className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 neon-card h-full transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-gradient-primary transition-all duration-300">
                    <reason.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="font-heading font-semibold text-foreground text-sm mb-1">{reason.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-2 sm:hidden">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              Swipe to see more
            </div>
          </div>
        </div>
      </div>

      {/* Scrollbar styling */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: hsl(170 82% 40% / 0.3); border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: hsl(170 82% 40% / 0.5); }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;

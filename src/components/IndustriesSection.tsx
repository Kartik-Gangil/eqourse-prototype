import { useRef, useEffect, useState } from "react";
import {
  Mic, Eye, Landmark, HeartPulse, MessageSquare,
  GraduationCap, Globe, Building2, Stethoscope, Scale,
  Banknote, Cpu, Factory, Users, Briefcase,
  LayoutDashboard, BookOpen, FlaskConical, School,
  University, Monitor, BookMarked, ClipboardCheck,
  ClipboardList, BookCopy, Award
} from "lucide-react";

// ── AI industries (original 5) ──────────────────────────────────────────────
const aiIndustries = [
  {
    icon: Mic,
    title: "Voice & NLP AI",
    desc: "Multilingual speech datasets for ASR/TTS across 30+ languages.",
    gradient: "from-primary to-accent",
    tag: "ai",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Labeled images and video for retail, autonomous vehicles, and inspection.",
    gradient: "from-accent to-primary",
    tag: "ai",
  },
  {
    icon: Landmark,
    title: "FinTech AI",
    desc: "Financial document OCR, transaction classification, and handwritten text.",
    gradient: "from-primary to-accent",
    tag: "ai",
  },
  {
    icon: HeartPulse,
    title: "Healthcare AI",
    desc: "Medical image annotation, clinical NLP, and biomedical NER.",
    gradient: "from-accent to-primary",
    tag: "ai",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    desc: "Intent classification, chatbot data, and RLHF for LLMs.",
    gradient: "from-primary to-accent",
    tag: "ai",
  },
];

// ── EdTech / Education industries (new 22) ───────────────────────────────────
const edtechIndustries = [
  {
    icon: Building2,
    title: "Government Education Programs",
    desc: "National curriculum programs and system-wide learning initiatives.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: Globe,
    title: "NGOs & Development Organizations",
    desc: "Multilingual education programs and community learning initiatives.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: GraduationCap,
    title: "International Education Operators",
    desc: "Cross-border curriculum delivery and localization support frameworks.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Medical Education Providers",
    desc: "Clinical education content and licensing exam preparation support.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: Scale,
    title: "Legal & Regulatory Training Providers",
    desc: "Compliance training content and certification learning solutions.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: Banknote,
    title: "Banking, Finance & Insurance Institutions",
    desc: "Financial training content and certification readiness programs.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: Cpu,
    title: "Technology & IT Training Providers",
    desc: "Technical certification pathways and digital skills training content.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: Factory,
    title: "Engineering & Manufacturing Organizations",
    desc: "Technical documentation and workforce readiness learning content.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: Users,
    title: "Workforce Development Agencies",
    desc: "Employment readiness programs and skills development content solutions.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: Briefcase,
    title: "Professional Training Companies",
    desc: "Certification-aligned professional learning program development.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: LayoutDashboard,
    title: "Learning Platform Providers (LMS/LXP)",
    desc: "Platform-ready learning assets and interoperable content packaging.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: BookOpen,
    title: "Digital Publishing Platforms",
    desc: "XML-first publishing pipelines and scalable content structuring.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: FlaskConical,
    title: "Research Institutions & Think Tanks",
    desc: "Research publishing workflows and technical documentation support.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: School,
    title: "K–12 Education Providers",
    desc: "Standards-aligned curriculum, assessments, scalable classroom learning programs.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: University,
    title: "Higher Education Institutions",
    desc: "Courseware pipelines, research support, digital program delivery.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: Monitor,
    title: "EdTech Platforms",
    desc: "Scalable content pipelines, assessments, platform-ready learning assets.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: BookMarked,
    title: "Publishers",
    desc: "End-to-end publishing workflows, accessibility, metadata-ready content pipelines.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: ClipboardCheck,
    title: "Corporate Learning & L&D Teams",
    desc: "Workforce training programs and competency-aligned learning solutions.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: ClipboardList,
    title: "Assessment Organizations",
    desc: "Large-scale testing programs and psychometric workflow support.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: BookCopy,
    title: "Test Preparation Companies",
    desc: "Academic and competitive exam preparation content pipelines.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
  {
    icon: GraduationCap,
    title: "Tutoring Providers",
    desc: "Supplemental learning content and structured assessment support.",
    gradient: "from-accent to-primary",
    tag: "edtech",
  },
  {
    icon: Award,
    title: "Certification Bodies",
    desc: "Certification frameworks, assessments, readiness and evaluation solutions.",
    gradient: "from-primary to-accent",
    tag: "edtech",
  },
];

// ── Interleave: one AI then one EdTech, repeat until all are placed ──────────
const interleaved: typeof aiIndustries = [];
const maxLen = Math.max(aiIndustries.length, edtechIndustries.length);
for (let i = 0; i < maxLen; i++) {
  if (i < aiIndustries.length) interleaved.push(aiIndustries[i]);
  if (i < edtechIndustries.length) interleaved.push(edtechIndustries[i]);
}

const IndustriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef<number>(0);
  const speedRef = useRef(0.6); // px per frame

  // Auto-scroll animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let running = true;

    const step = () => {
      if (!running) return;
      if (!isPaused && el) {
        el.scrollLeft += speedRef.current;
        const halfScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= halfScroll) {
          el.scrollLeft -= halfScroll;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [isPaused]);

  // Triple-duplicate for seamless infinite loop
  const displayItems = [...interleaved, ...interleaved, ...interleaved];

  return (
    <section
      aria-label="Industries We Serve"
      className="py-16 sm:py-24 bg-gradient-hero relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ color: "hsl(170, 82%, 55%)" }}
          >
            Verticals
          </span>
          <h2
            className="font-heading text-3xl md:text-4xl font-bold mt-2"
            style={{ color: "hsl(0, 0%, 100%)" }}
          >
            Industries We <span className="text-gradient">Serve</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "hsl(242, 20%, 65%)" }}>
            From AI data solutions to end-to-end education content services — powering learning and intelligence across every sector.
          </p>
        </div>

        {/* Auto-scrolling horizontal carousel */}
        <div
          ref={scrollRef}
          role="list"
          aria-label="Industry cards"
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 3000);
          }}
        >
          {displayItems.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={`${ind.title}-${i}`}
                role="listitem"
                className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] group"
              >
                <div
                  className="relative rounded-2xl border overflow-hidden h-full transition-all duration-500 hover:shadow-[0_0_30px_hsl(168_80%_36%/0.15)]"
                  style={{
                    background: "linear-gradient(160deg, rgba(15,40,40,0.6) 0%, rgba(15,18,35,0.8) 100%)",
                    borderColor: ind.tag === "edtech"
                      ? "rgba(99,102,241,0.2)"
                      : "rgba(20,184,166,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      ind.tag === "edtech" ? "rgba(99,102,241,0.5)" : "rgba(20,184,166,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      ind.tag === "edtech" ? "rgba(99,102,241,0.2)" : "rgba(20,184,166,0.15)";
                  }}
                >
                  <div className="p-5 sm:p-6 flex flex-col gap-3 sm:gap-4">
                    {/* Icon */}
                    <div
                      className={`w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${ind.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-500`}
                      style={{
                        boxShadow: ind.tag === "edtech"
                          ? "0 0 0 0 transparent"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          ind.tag === "edtech"
                            ? "0 0 20px rgba(99,102,241,0.3)"
                            : "0 0 25px hsl(168 80% 36% / 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-heading font-bold text-sm sm:text-base leading-tight transition-colors duration-300"
                      style={{ color: "hsl(0, 0%, 95%)" }}
                    >
                      {ind.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: "hsl(242, 20%, 65%)" }}
                    >
                      {ind.desc}
                    </p>
                  </div>

                  {/* Bottom glow line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                    style={{
                      background: ind.tag === "edtech"
                        ? "linear-gradient(to right, transparent, rgba(99,102,241,0), transparent)"
                        : "linear-gradient(to right, transparent, rgba(20,184,166,0), transparent)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background =
                        ind.tag === "edtech"
                          ? "linear-gradient(to right, transparent, rgba(99,102,241,0.45), transparent)"
                          : "linear-gradient(to right, transparent, rgba(20,184,166,0.45), transparent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background =
                        ind.tag === "edtech"
                          ? "linear-gradient(to right, transparent, rgba(99,102,241,0), transparent)"
                          : "linear-gradient(to right, transparent, rgba(20,184,166,0), transparent)";
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll hint for mobile */}
        <div className="flex justify-center mt-6 sm:hidden">
          <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(242, 20%, 55%)" }}>
            <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Swipe to explore
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default IndustriesSection;

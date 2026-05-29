import { useRef, useEffect, useState } from "react";
import {
  Handshake, Users, Globe, RefreshCw, Shield,
  Lock, TrendingUp, Languages, ClipboardCheck,
  Accessibility, LayoutDashboard, UserCheck,
  BookOpen, Briefcase, BarChart3, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import strategyImage from "@/assets/why-choose-eqourse.png";

const reasons = [
  {
    icon: Handshake,
    title: "Dual-Capability Global Partner",
    desc: "End-to-end learning solutions across content, assessments, and AI-driven delivery built within one unified ecosystem.",
    tags: "Integrated workflows • Accessibility-first design • Scalable delivery infrastructure",
  },
  {
    icon: Users,
    title: "500+ Domain Specialists",
    desc: "Expert-led content across STEAM, healthcare, finance, and enterprise learning ensuring depth, accuracy, and real-world relevance.",
    tags: "Academic expertise • Industry alignment • Workforce-ready outcomes",
  },
  {
    icon: Globe,
    title: "Global Delivery Across 30+ Languages",
    desc: "Multilingual curriculum, assessments, and localization workflows enabling seamless global learning experiences.",
    tags: "Localization pipelines • Cross-border delivery • Cultural adaptability",
  },
  {
    icon: ClipboardCheck,
    title: "98%+ Quality Assurance Standards",
    desc: "High-precision output is ensured through multi-layer QA frameworks, SME validations, and data-backed review systems.",
    tags: "Multi-tier QA • SME review layers • Statistically validated outputs",
  },
  {
    icon: Lock,
    title: "White-Label Production Partnerships",
    desc: "Confidential, scalable content production tailored for seamless integration with your platform and brand.",
    tags: "Backend delivery • Platform-ready assets • Enterprise-grade confidentiality",
  },
  {
    icon: RefreshCw,
    title: "Closed-Loop AI Data Pipeline",
    desc: "Continuously improving AI datasets through expert annotation, validation, and real-world feedback cycles.",
    tags: "Human-in-the-loop • Iterative refinement • High-accuracy datasets",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security & Compliance",
    desc: "Secure, compliant operations aligned with global standards for handling sensitive and regulated data.",
    tags: "ISO-certified workflows • GDPR readiness • Controlled data governance",
  },
  {
    icon: TrendingUp,
    title: "Scalable from Pilot to Enterprise Programs",
    desc: "Flexible engagement models designed to grow from initial pilots to large-scale global deployments.",
    tags: "Modular scaling • Multi-stakeholder delivery • Global execution capability",
  },
  {
    icon: Languages,
    title: "Enterprise-Scale Localization Infrastructure",
    desc: "Robust multilingual systems ensuring consistent, culturally relevant learning across geographies.",
    tags: "Terminology management • Linguistic QA • Cultural adaptation",
  },
  {
    icon: BarChart3,
    title: "Large-Scale Assessment & Test-Prep Expertise",
    desc: "End-to-end assessment solutions designed for academic, competitive, and workforce readiness needs.",
    tags: "Question banks • Psychometric validation • Standards-aligned frameworks",
  },
  {
    icon: Accessibility,
    title: "Accessibility-Compliant Content at Scale",
    desc: "Inclusive learning solutions designed to meet global accessibility standards across all formats and platforms.",
    tags: "WCAG compliance • Multi-format accessibility • Inclusive design systems",
  },
  {
    icon: LayoutDashboard,
    title: "LMS-Ready & Interoperable Learning Assets",
    desc: "Seamlessly deployable content compatible across modern learning platforms and ecosystems.",
    tags: "SCORM • xAPI • AICC • cmi5 integration",
  },
  {
    icon: UserCheck,
    title: "Structured SME Panels & Review Workflows",
    desc: "Expert-driven validation ensures accuracy, alignment, and technical reliability across all deliverables.",
    tags: "Domain experts • Calibration systems • Multi-level review workflows",
  },
  {
    icon: BookOpen,
    title: "End-to-End Publishing Production Support",
    desc: "Complete publishing lifecycle support from structured content creation to final production outputs.",
    tags: "XML-first workflows • EPUB conversion • Print-ready delivery",
  },
  {
    icon: Briefcase,
    title: "Talent & Workforce Evaluation Frameworks",
    desc: "Data-driven evaluation systems designed to measure, map, and enhance workforce capabilities.",
    tags: "Competency mapping • Psychometric tools • Hiring-stage assessments",
  },
];

const WhyChooseUs = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(500);
  const [isMobilePaused, setIsMobilePaused] = useState(false);
  const animRef = useRef<number>(0);

  // Desktop: sync scrollable panel height with image
  useEffect(() => {
    const measure = () => {
      if (imageRef.current) setImageHeight(imageRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Mobile: auto-scroll horizontal cards
  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    let running = true;
    const step = () => {
      if (!running) return;
      if (!isMobilePaused && el) {
        el.scrollLeft += 0.5;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobilePaused]);

  const mobileItems = [...reasons, ...reasons];
  const desktopItems = [...reasons, ...reasons];

  return (
    <section aria-labelledby="why-eqourse-heading" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="mb-8 sm:mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Why eQOURSE</span>
          <h2 id="why-eqourse-heading" className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-1">
            Why Choose <span className="text-gradient">eQOURSE?</span>
          </h2>
        </div>

        {/* ── Desktop: sticky image + scrollable right panel ── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: sticky image */}
          <div ref={imageRef} className="sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={strategyImage}
                alt="Why Choose eQOURSE - Global Learning Content and AI Data Solutions Partner with 500+ Specialists"
                width={800}
                height={600}
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Right: CSS marquee auto-scroll panel */}
          <div
            className="relative overflow-hidden"
            style={{ height: `${imageHeight}px` }}
          >
            {/* Fade masks top & bottom */}
            <div className="absolute top-0 left-0 right-0 h-12 z-10 pointer-events-none bg-gradient-to-b from-muted/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-12 z-10 pointer-events-none bg-gradient-to-t from-muted/30 to-transparent" />

            <div className="why-marquee-track space-y-3 pr-2">
              {desktopItems.map((reason, i) => (
                <article
                  key={`${reason.title}-${i}`}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-card neon-card transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                    <reason.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                    <p className="text-xs text-primary/60 mt-1.5 font-medium">{reason.tags}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: image + auto-scrolling horizontal cards ── */}
        <div className="lg:hidden">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-elevated mb-8">
            <img
              src={strategyImage}
              alt="Why Choose eQOURSE - Global Learning Content and AI Data Solutions Partner with 500+ Specialists"
              width={800}
              height={600}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>

          {/* Auto-scrolling horizontal cards */}
          <div
            ref={mobileScrollRef}
            className="flex gap-3 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onTouchStart={() => setIsMobilePaused(true)}
            onTouchEnd={() => setTimeout(() => setIsMobilePaused(false), 3000)}
            onMouseEnter={() => setIsMobilePaused(true)}
            onMouseLeave={() => setIsMobilePaused(false)}
          >
            {mobileItems.map((reason, i) => (
              <article
                key={`${reason.title}-${i}`}
                className="flex-shrink-0 w-[calc(70vw-12px)] max-w-[280px]"
              >
                <div className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 neon-card h-full transition-all duration-300 flex flex-col gap-2">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                    <reason.icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-sm leading-snug">{reason.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reason.desc}</p>
                  <p className="text-[10px] text-primary/60 font-medium leading-relaxed mt-auto">{reason.tags}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Swipe hint */}
          <div className="flex justify-center mt-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Swipe to see more
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/free-pilot"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-soft hover:opacity-90 hover:scale-105 transition-all"
          >
            Get Started with a Free Pilot <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: hsl(170 82% 40% / 0.3); border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: hsl(170 82% 40% / 0.5); }

        @keyframes why-scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .why-marquee-track {
          animation: why-scroll-up 35s linear infinite;
        }
        .why-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;

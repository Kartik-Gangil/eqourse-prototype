import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ── Industry data with images ────────────────────────────────────────────────
const industries = [
  // AI
  {
    title: "Voice & NLP AI",
    desc: "Multilingual speech datasets for ASR/TTS across 30+ languages.",
    img: "/assets/industries/industry_voice_nlp_ai_1778651235342.png",
    fallback: "linear-gradient(135deg,hsl(170,82%,22%),hsl(242,33%,18%))",
    tag: "ai",
  },
  // Content Services
  {
    title: "Government Education Programs",
    desc: "National curriculum programs and system-wide learning initiatives.",
    img: "/assets/industries/Government Education Programs.png",
    fallback: "linear-gradient(135deg,hsl(220,60%,25%),hsl(242,33%,18%))",
    tag: "content services",
  },
  // AI
  {
    title: "Computer Vision",
    desc: "Labeled images and video for retail, autonomous vehicles, and inspection.",
    img: "/assets/industries/industry_computer_vision_1778651255484.png",
    fallback: "linear-gradient(135deg,hsl(196,80%,22%),hsl(242,33%,18%))",
    tag: "ai",
  },
  // Content Services
  {
    title: "NGOs & Development Organizations",
    desc: "Multilingual education programs and community learning initiatives.",
    img: "/assets/industries/NGOs & Development Organizations.png",
    fallback: "linear-gradient(135deg,hsl(140,50%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  // AI
  {
    title: "FinTech AI",
    desc: "Financial document OCR, transaction classification, and handwritten text.",
    img: "/assets/industries/industry_fintech_ai_1778651271949.png",
    fallback: "linear-gradient(135deg,hsl(45,70%,22%),hsl(242,33%,18%))",
    tag: "ai",
  },
  // Content Services
  {
    title: "International Education Operators",
    desc: "Cross-border curriculum delivery and localization support frameworks.",
    img: "/assets/industries/International Education Operators.png",
    fallback: "linear-gradient(135deg,hsl(200,60%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  // AI
  {
    title: "Healthcare AI",
    desc: "Medical image annotation, clinical NLP, and biomedical NER.",
    img: "/assets/industries/industry_healthcare_ai_1778651293947.png",
    fallback: "linear-gradient(135deg,hsl(340,60%,22%),hsl(242,33%,18%))",
    tag: "ai",
  },
  // Content Services
  {
    title: "Healthcare & Medical Education Providers",
    desc: "Clinical education content and licensing exam preparation support.",
    img: "/assets/industries/Healthcare & Medical Education Providers.png",
    fallback: "linear-gradient(135deg,hsl(340,55%,25%),hsl(242,33%,18%))",
    tag: "content services",
  },
  // AI
  {
    title: "Conversational AI",
    desc: "Intent classification, chatbot data, and RLHF for LLMs.",
    img: "/assets/industries/industry_conversational_ai_1778651325965.png",
    fallback: "linear-gradient(135deg,hsl(270,60%,22%),hsl(242,33%,18%))",
    tag: "ai",
  },
  // Content Services
  {
    title: "Legal & Regulatory Training Providers",
    desc: "Compliance training content and certification learning solutions.",
    img: "/assets/industries/Legal & Regulatory Training Providers.png",
    fallback: "linear-gradient(135deg,hsl(240,40%,25%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Banking, Finance & Insurance Institutions",
    desc: "Financial training content and certification readiness programs.",
    img: "/assets/industries/Banking, Finance & Insurance Institutions.png",
    fallback: "linear-gradient(135deg,hsl(45,65%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Technology & IT Training Providers",
    desc: "Technical certification pathways and digital skills training content.",
    img: "/assets/industries/Technology & IT Training Providers.png",
    fallback: "linear-gradient(135deg,hsl(210,70%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Engineering & Manufacturing Organizations",
    desc: "Technical documentation and workforce readiness learning content.",
    img: "/assets/industries/Engineering & Manufacturing Organizations.png",
    fallback: "linear-gradient(135deg,hsl(25,60%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Workforce Development Agencies",
    desc: "Employment readiness programs and skills development content solutions.",
    img: "/assets/industries/Workforce Development Agencies.png",
    fallback: "linear-gradient(135deg,hsl(160,50%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Professional Training Companies",
    desc: "Certification-aligned professional learning program development.",
    img: "/assets/industries/Professional Training Companies.png",
    fallback: "linear-gradient(135deg,hsl(220,55%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Learning Platform Providers (LMS/LXP)",
    desc: "Platform-ready learning assets and interoperable content packaging.",
    img: "/assets/industries/Learning Platform Providers (LMS_LXP).png",
    fallback: "linear-gradient(135deg,hsl(190,60%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Digital Publishing Platforms",
    desc: "XML-first publishing pipelines and scalable content structuring.",
    img: "/assets/industries/Digital Publishing Platforms.png",
    fallback: "linear-gradient(135deg,hsl(260,50%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Research Institutions & Think Tanks",
    desc: "Research publishing workflows and technical documentation support.",
    img: "/assets/industries/Research Institutions & Think Tanks.png",
    fallback: "linear-gradient(135deg,hsl(230,50%,28%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "K–12 Education Providers",
    desc: "Standards-aligned curriculum, assessments, scalable classroom learning programs.",
    img: "/assets/industries/K–12 Education Providers.png",
    fallback: "linear-gradient(135deg,hsl(150,55%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Higher Education Institutions",
    desc: "Courseware pipelines, research support, digital program delivery.",
    img: "/assets/industries/Higher Education Institutions.png",
    fallback: "linear-gradient(135deg,hsl(35,60%,25%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Content Services platforms",
    desc: "Scalable content pipelines, assessments, platform-ready learning assets.",
    img: "/assets/industries/content_services_platforms.png",
    fallback: "linear-gradient(135deg,hsl(170,70%,20%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Publishers",
    desc: "End-to-end publishing workflows, accessibility, metadata-ready content pipelines.",
    img: "/assets/industries/Publishers.png",
    fallback: "linear-gradient(135deg,hsl(300,40%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Corporate Learning & L&D Teams",
    desc: "Workforce training programs and competency-aligned learning solutions.",
    img: "/assets/industries/Corporate Learning & L&D Teams.png",
    fallback: "linear-gradient(135deg,hsl(220,55%,25%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Assessment Organizations",
    desc: "Large-scale testing programs and psychometric workflow support.",
    img: "/assets/industries/Assessment Organizations.png",
    fallback: "linear-gradient(135deg,hsl(15,60%,25%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Test Preparation Companies",
    desc: "Academic and competitive exam preparation content pipelines.",
    img: "/assets/industries/Test Preparation Companies.png",
    fallback: "linear-gradient(135deg,hsl(195,65%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Tutoring Providers",
    desc: "Supplemental learning content and structured assessment support.",
    img: "/assets/industries/Tutoring Providers.png",
    fallback: "linear-gradient(135deg,hsl(160,55%,22%),hsl(242,33%,18%))",
    tag: "content services",
  },
  {
    title: "Certification Bodies",
    desc: "Certification frameworks, assessments, readiness and evaluation solutions.",
    img: "/assets/industries/Certification Bodies.png",
    fallback: "linear-gradient(135deg,hsl(250,50%,25%),hsl(242,33%,18%))",
    tag: "content services",
  },
];

const IndustriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let running = true;
    const step = () => {
      if (!running) return;
      if (!isPaused && el) {
        el.scrollLeft += 0.6;
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
  }, [isPaused]);

  const displayItems = [...industries, ...industries, ...industries];

  return (
    <section
      aria-label="Industries We Serve"
      className="py-16 sm:py-24 bg-gradient-hero relative overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
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

        {/* Carousel */}
        <div
          ref={scrollRef}
          role="list"
          aria-label="Industry cards"
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
        >
          {displayItems.map((ind, i) => (
            <article
              key={`${ind.title}-${i}`}
              role="listitem"
              className="group flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(160deg, rgba(15,40,40,0.6) 0%, rgba(15,18,35,0.85) 100%)",
                border: ind.tag === "content services"
                  ? "1px solid rgba(99,102,241,0.2)"
                  : "1px solid rgba(20,184,166,0.18)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  ind.tag === "content services" ? "rgba(99,102,241,0.5)" : "rgba(20,184,166,0.45)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  ind.tag === "content services"
                    ? "0 0 28px rgba(99,102,241,0.18), 0 8px 24px rgba(0,0,0,0.4)"
                    : "0 0 28px rgba(20,184,166,0.2), 0 8px 24px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  ind.tag === "content services" ? "rgba(99,102,241,0.2)" : "rgba(20,184,166,0.18)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              }}
            >
              {/* ── Image upper half ── */}
              <div className="relative w-full overflow-hidden" style={{ height: "160px" }}>
                {ind.img ? (
                  <img
                    src={ind.img}
                    alt={`${ind.title} solutions by eQOURSE - AI Data and Content Services`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                    style={{ background: ind.fallback }}
                  >
                    <span
                      className="text-white/30 font-heading font-bold text-2xl text-center px-4 leading-tight"
                    >
                      {ind.title.split(" ").slice(0, 3).join(" ")}
                    </span>
                  </div>
                )}
                {/* Dark gradient overlay on image for text legibility */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, transparent 40%, rgba(10,12,28,0.75) 100%)",
                  }}
                />
              </div>

              {/* ── Content lower half ── */}
              <div className="p-4 sm:p-5">
                <h3
                  className="font-heading font-bold text-sm sm:text-base leading-snug mb-2 transition-colors duration-300"
                  style={{ color: "hsl(0, 0%, 95%)" }}
                >
                  {ind.title}
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "hsl(242, 20%, 65%)" }}
                >
                  {ind.desc}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className="h-px mx-4 mb-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: ind.tag === "content services"
                    ? "linear-gradient(to right, transparent, rgba(99,102,241,0.6), transparent)"
                    : "linear-gradient(to right, transparent, rgba(20,184,166,0.6), transparent)",
                }}
              />
            </article>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="flex justify-center mt-6 sm:hidden">
          <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(242, 20%, 55%)" }}>
            <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Swipe to explore
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/content-services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              Explore Content Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              to="/ai-data-services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "rgba(20,184,166,0.15)", color: "hsl(170,82%,55%)", border: "1px solid rgba(20,184,166,0.3)" }}
            >
              Explore AI Data Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default IndustriesSection;

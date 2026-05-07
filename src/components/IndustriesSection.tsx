import { useRef, useEffect, useState } from "react";
import { Mic, Eye, Landmark, HeartPulse, MessageSquare } from "lucide-react";

const industries = [
  {
    icon: Mic,
    title: "Voice & NLP AI",
    desc: "Multilingual speech datasets for ASR/TTS across 30+ languages.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Labeled images and video for retail, autonomous vehicles, and inspection.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Landmark,
    title: "FinTech AI",
    desc: "Financial document OCR, transaction classification, and handwritten text.",
    gradient: "from-primary to-accent",
  },
  {
    icon: HeartPulse,
    title: "Healthcare AI",
    desc: "Medical image annotation, clinical NLP, and biomedical NER.",
    gradient: "from-accent to-primary",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    desc: "Intent classification, chatbot data, and RLHF for LLMs.",
    gradient: "from-primary to-accent",
  },
];

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
        // If we've scrolled past the first set, reset to start for infinite loop
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

  // Duplicate items for seamless infinite loop
  const displayItems = [...industries, ...industries, ...industries];

  return (
    <section className="py-16 sm:py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(170 82% 32%) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'hsl(170, 82%, 55%)' }}>Verticals</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2" style={{ color: 'hsl(0, 0%, 100%)' }}>
            Industries We <span className="text-gradient">Serve</span>
          </h2>
        </div>

        {/* Auto-scrolling horizontal carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // Resume after a short delay so manual scroll feels natural
            setTimeout(() => setIsPaused(false), 3000);
          }}
        >
          {displayItems.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={`${ind.title}-${i}`}
                className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] group"
              >
                <div className="relative rounded-2xl border border-primary/15 overflow-hidden h-full transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(168_80%_36%/0.15)]"
                  style={{ background: 'linear-gradient(160deg, rgba(15,40,40,0.6) 0%, rgba(15,18,35,0.8) 100%)' }}
                >
                  <div className="p-5 sm:p-6 flex flex-col gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={`w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${ind.gradient} flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(168_80%_36%/0.25)] transition-all duration-500`}>
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
                    </div>

                    {/* Title */}
                    <h4 className="font-heading font-bold text-sm sm:text-lg leading-tight transition-colors duration-300" style={{ color: 'hsl(0, 0%, 95%)' }}>
                      {ind.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'hsl(242, 20%, 65%)' }}>
                      {ind.desc}
                    </p>
                  </div>

                  {/* Bottom glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll hint for mobile */}
        <div className="flex justify-center mt-6 sm:hidden">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'hsl(242, 20%, 55%)' }}>
            <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            Swipe to explore
          </div>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default IndustriesSection;

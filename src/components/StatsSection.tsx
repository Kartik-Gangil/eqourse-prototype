import { useEffect, useRef, useState } from "react";

const allStats = [
  { value: 7, suffix: "M+", label: "Students Reach", category: "Education" },
  { value: 20, suffix: "K+", label: "Content Solutions/Month", category: "Education" },
  { value: 15, suffix: "K+", label: "Q&A Videos/Month", category: "Education" },
  { value: 1, suffix: "M+", label: "Data Points Processed", category: "AI Data" },
  { value: 30, suffix: "+", label: "Languages Covered", category: "AI Data" },
  { value: 98, suffix: "%+", label: "Annotation Accuracy", category: "AI Data" },
  { value: 500, suffix: "+", label: "Specialists", category: "AI Data" },
];

const CountUpValue = ({ end, isVisible }: { end: number; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1400;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, isVisible]);

  return <>{count}</>;
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="impact-cosmos relative overflow-hidden py-20 md:py-24"
      aria-labelledby="impact-heading"
    >
      <div className="impact-nebula" aria-hidden="true" />
      <div className="impact-stars impact-stars-far" aria-hidden="true" />
      <div className="impact-stars impact-stars-mid" aria-hidden="true" />
      <div className="impact-stars impact-stars-near" aria-hidden="true" />

      <div className="impact-orbits" aria-hidden="true">
        <span className="impact-orbit impact-orbit-one"><i /></span>
        <span className="impact-orbit impact-orbit-two"><i /></span>
        <span className="impact-orbit impact-orbit-three"><i /></span>
        <span className="impact-core" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <header className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#46e6c2]">Our Impact</span>
          <h2 id="impact-heading" className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Our Impact in <span className="text-[#35d6b3]">Numbers</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            Measurable delivery capacity across education content and production-ready AI data.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 xl:grid-cols-7 xl:gap-y-0">
          {allStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`impact-stat relative px-3 text-center md:px-5 ${isVisible ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="font-heading text-4xl font-extrabold leading-none text-white md:text-5xl">
                <CountUpValue end={stat.value} isVisible={isVisible} />{stat.suffix}
              </div>
              <div className="mt-3 min-h-10 text-sm font-medium leading-snug text-white/75">{stat.label}</div>
              <span className="mt-2 inline-flex rounded-full border border-[#35d6b3]/20 bg-[#35d6b3]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7cf2d8]">
                {stat.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .impact-cosmos {
          isolation: isolate;
          background:
            radial-gradient(circle at 50% 46%, rgba(111, 75, 190, 0.24), transparent 34%),
            linear-gradient(135deg, #21163f 0%, #15132f 52%, #0e1531 100%);
        }
        .impact-nebula {
          position: absolute;
          inset: -35%;
          background:
            radial-gradient(circle at 28% 42%, rgba(113, 73, 201, 0.2), transparent 22%),
            radial-gradient(circle at 74% 58%, rgba(31, 181, 160, 0.12), transparent 20%);
          animation: impact-nebula-drift 28s ease-in-out infinite alternate;
          will-change: transform;
        }
        .impact-stars {
          position: absolute;
          inset: -25%;
          background-image: radial-gradient(circle, rgba(255,255,255,.9) 0 1px, transparent 1.4px);
          will-change: transform;
        }
        .impact-stars-far {
          opacity: .26;
          background-size: 47px 47px;
          animation: impact-star-drift 70s linear infinite;
        }
        .impact-stars-mid {
          opacity: .35;
          background-size: 89px 89px;
          transform: rotate(18deg);
          animation: impact-star-drift-reverse 92s linear infinite;
        }
        .impact-stars-near {
          opacity: .5;
          background-size: 137px 137px;
          transform: rotate(-12deg);
          animation: impact-star-drift 110s linear infinite;
        }
        .impact-orbits {
          position: absolute;
          left: 50%;
          top: 52%;
          width: min(78vw, 920px);
          aspect-ratio: 2 / 1;
          transform: translate(-50%, -50%);
          opacity: .5;
        }
        .impact-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(130, 105, 218, .2);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotate(-8deg);
          animation: impact-orbit-spin 34s linear infinite;
          will-change: transform;
        }
        .impact-orbit-one { width: 42%; aspect-ratio: 2 / 1; }
        .impact-orbit-two { width: 70%; aspect-ratio: 2 / 1; animation-duration: 48s; animation-direction: reverse; }
        .impact-orbit-three { width: 100%; aspect-ratio: 2 / 1; animation-duration: 62s; }
        .impact-orbit i {
          position: absolute;
          left: 8%;
          top: 18%;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #7cf2d8;
          box-shadow: 0 0 14px 4px rgba(53, 214, 179, .42);
        }
        .impact-orbit-two i { left: 76%; top: 78%; width: 4px; height: 4px; background: #bca9ff; }
        .impact-orbit-three i { left: 88%; top: 35%; width: 5px; height: 5px; background: white; }
        .impact-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,242,216,.16), transparent 68%);
          transform: translate(-50%, -50%);
          animation: impact-core-pulse 5s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .impact-stat {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          transition: opacity .55s ease, transform .55s ease;
        }
        .impact-stat.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }
        @media (min-width: 1280px) {
          .impact-stat + .impact-stat::before {
            content: "";
            position: absolute;
            left: 0;
            top: 8px;
            width: 1px;
            height: 72px;
            background: linear-gradient(transparent, rgba(124,242,216,.2), transparent);
          }
        }
        @keyframes impact-star-drift {
          to { transform: translate3d(6%, 4%, 0) rotate(4deg); }
        }
        @keyframes impact-star-drift-reverse {
          to { transform: translate3d(-5%, 3%, 0) rotate(12deg); }
        }
        @keyframes impact-nebula-drift {
          to { transform: translate3d(4%, -3%, 0) scale(1.04); }
        }
        @keyframes impact-orbit-spin {
          from { transform: translate(-50%, -50%) rotate(-8deg); }
          to { transform: translate(-50%, -50%) rotate(352deg); }
        }
        @keyframes impact-core-pulse {
          50% { transform: translate(-50%, -50%) scale(1.18); opacity: .6; }
        }
        @media (prefers-reduced-motion: reduce) {
          .impact-cosmos *, .impact-cosmos *::before, .impact-cosmos *::after {
            animation: none !important;
            transition-duration: .01ms !important;
          }
          .impact-stat { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;

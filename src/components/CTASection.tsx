import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const signalNodes = [
  { left: "9%", top: "34%", delay: "0s", size: 5 },
  { left: "19%", top: "24%", delay: "-1.8s", size: 4 },
  { left: "31%", top: "48%", delay: "-3.2s", size: 6 },
  { left: "44%", top: "20%", delay: "-4.7s", size: 4 },
  { left: "57%", top: "40%", delay: "-2.4s", size: 5 },
  { left: "68%", top: "25%", delay: "-5.5s", size: 4 },
  { left: "79%", top: "45%", delay: "-3.8s", size: 6 },
  { left: "91%", top: "29%", delay: "-1.1s", size: 4 },
];

const CTASection = () => (
  <section
    id="contact"
    aria-labelledby="cta-heading"
    className="cta-data-horizon relative isolate min-h-[360px] overflow-hidden py-20 sm:py-24"
  >
    <div className="cta-ambient cta-ambient-one" aria-hidden="true" />
    <div className="cta-ambient cta-ambient-two" aria-hidden="true" />
    <div className="cta-stars" aria-hidden="true" />

    <svg
      className="cta-wave cta-wave-back"
      viewBox="0 0 1600 440"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cta-back-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#315ee8" stopOpacity="0.42" />
          <stop offset="0.55" stopColor="#197ab4" stopOpacity="0.2" />
          <stop offset="1" stopColor="#16c9bd" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id="cta-back-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#70a2ff" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#89c8ff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#4ff1de" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M-140 334 C 70 185, 255 192, 438 322 S 755 432, 928 250 S 1240 125, 1730 300 L 1730 500 L -140 500 Z"
        fill="url(#cta-back-fill)"
      />
      <path
        d="M-140 334 C 70 185, 255 192, 438 322 S 755 432, 928 250 S 1240 125, 1730 300"
        fill="none"
        stroke="url(#cta-back-stroke)"
        strokeWidth="3"
      />
    </svg>

    <svg
      className="cta-wave cta-wave-front"
      viewBox="0 0 1600 440"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cta-front-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2c4fe4" stopOpacity="0.32" />
          <stop offset="0.5" stopColor="#1279af" stopOpacity="0.24" />
          <stop offset="1" stopColor="#11bcb1" stopOpacity="0.38" />
        </linearGradient>
        <linearGradient id="cta-front-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#698fff" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#a7dfff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#5ef3df" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M-180 382 C 95 265, 270 274, 470 380 S 780 466, 1010 294 S 1365 220, 1750 368 L 1750 500 L -180 500 Z"
        fill="url(#cta-front-fill)"
      />
      <path
        d="M-180 382 C 95 265, 270 274, 470 380 S 780 466, 1010 294 S 1365 220, 1750 368"
        fill="none"
        stroke="url(#cta-front-stroke)"
        strokeWidth="2.5"
      />
      <path
        d="M-100 414 C 140 325, 342 314, 520 400 S 850 474, 1060 338 S 1390 270, 1710 400"
        fill="none"
        stroke="#58d9e8"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
    </svg>

    <div className="absolute inset-0" aria-hidden="true">
      {signalNodes.map((node) => (
        <span
          key={`${node.left}-${node.top}`}
          className="cta-signal-node"
          style={{
            left: node.left,
            top: node.top,
            width: node.size,
            height: node.size,
            animationDelay: node.delay,
          }}
        />
      ))}
    </div>

    <div className="container relative z-10 mx-auto px-4 text-center">
      <h2
        id="cta-heading"
        className="mx-auto mb-4 max-w-5xl px-2 font-heading text-3xl font-bold leading-tight text-white md:text-4xl"
      >
        Ready to Scale Your AI Data or Content Project?
      </h2>
      <p className="mx-auto mb-8 max-w-2xl px-4 text-base leading-relaxed text-white/80 sm:text-lg">
        Work with a trusted global partner for production-ready AI data services and scalable content solutions, backed by expert workflows and rigorous quality assurance.
      </p>
      <div className="flex flex-col items-stretch justify-center gap-4 px-4 sm:flex-row sm:items-center">
        <Button asChild size="lg" className="group border-0 bg-gradient-primary px-8 text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-95 sm:px-10">
          <Link to="/ai-data-services">
            Explore AI Data Services
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button asChild size="lg" className="border border-white/30 bg-white/10 px-8 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white">
          <Link to="/content-services">
            Explore Content Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>

    <style>{`
      .cta-data-horizon {
        background:
          radial-gradient(circle at 78% 55%, rgba(16, 190, 182, 0.25), transparent 34%),
          radial-gradient(circle at 15% 38%, rgba(48, 83, 220, 0.3), transparent 36%),
          linear-gradient(115deg, #112b69 0%, #113b6b 50%, #0b5563 100%);
      }

      .cta-data-horizon::after {
        position: absolute;
        inset: 0;
        z-index: 2;
        content: "";
        pointer-events: none;
        background: linear-gradient(180deg, rgba(7, 24, 58, 0.08), rgba(4, 27, 47, 0.18));
      }

      .cta-ambient {
        position: absolute;
        border-radius: 999px;
        filter: blur(1px);
        opacity: 0.55;
        will-change: transform;
      }

      .cta-ambient-one {
        width: 36rem;
        height: 36rem;
        left: -15rem;
        top: -20rem;
        background: radial-gradient(circle, rgba(64, 111, 255, 0.28), transparent 68%);
        animation: cta-orbit-one 18s ease-in-out infinite alternate;
      }

      .cta-ambient-two {
        width: 42rem;
        height: 42rem;
        right: -18rem;
        bottom: -27rem;
        background: radial-gradient(circle, rgba(39, 229, 211, 0.26), transparent 68%);
        animation: cta-orbit-two 22s ease-in-out infinite alternate;
      }

      .cta-stars {
        position: absolute;
        inset: -10%;
        opacity: 0.62;
        background-image:
          radial-gradient(circle, rgba(154, 238, 255, 0.92) 0 1px, transparent 1.5px),
          radial-gradient(circle, rgba(255, 255, 255, 0.72) 0 1px, transparent 1.6px),
          radial-gradient(circle, rgba(79, 221, 217, 0.8) 0 1.5px, transparent 2px);
        background-position: 0 0, 37px 53px, 85px 23px;
        background-size: 107px 91px, 149px 127px, 211px 173px;
        animation: cta-star-drift 26s linear infinite alternate;
        will-change: transform;
      }

      .cta-wave {
        position: absolute;
        z-index: 1;
        left: -4%;
        bottom: -20px;
        width: 108%;
        height: 92%;
        pointer-events: none;
        will-change: transform;
      }

      .cta-wave-back {
        animation: cta-wave-back 16s ease-in-out infinite alternate;
      }

      .cta-wave-front {
        animation: cta-wave-front 20s ease-in-out infinite alternate;
      }

      .cta-signal-node {
        position: absolute;
        z-index: 2;
        border-radius: 999px;
        background: #a9fff5;
        box-shadow: 0 0 0 5px rgba(95, 235, 226, 0.1), 0 0 16px rgba(132, 255, 246, 0.85);
        animation: cta-node-pulse 6s ease-in-out infinite;
        will-change: transform, opacity;
      }

      @keyframes cta-orbit-one {
        from { transform: translate3d(0, 0, 0) scale(1); }
        to { transform: translate3d(5rem, 2rem, 0) scale(1.08); }
      }

      @keyframes cta-orbit-two {
        from { transform: translate3d(0, 0, 0) scale(1); }
        to { transform: translate3d(-6rem, -2rem, 0) scale(1.08); }
      }

      @keyframes cta-star-drift {
        from { transform: translate3d(-1.5%, -1%, 0); }
        to { transform: translate3d(1.5%, 1%, 0); }
      }

      @keyframes cta-wave-back {
        from { transform: translate3d(-1.5%, 0, 0) scaleY(0.97); }
        to { transform: translate3d(1.5%, -8px, 0) scaleY(1.03); }
      }

      @keyframes cta-wave-front {
        from { transform: translate3d(1.5%, 3px, 0) scaleY(1.02); }
        to { transform: translate3d(-1.5%, -5px, 0) scaleY(0.97); }
      }

      @keyframes cta-node-pulse {
        0%, 100% { opacity: 0.28; transform: scale(0.72); }
        50% { opacity: 1; transform: scale(1.15); }
      }

      @media (max-width: 640px) {
        .cta-wave {
          left: -24%;
          width: 148%;
          height: 80%;
        }

        .cta-stars {
          opacity: 0.48;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .cta-ambient,
        .cta-stars,
        .cta-wave,
        .cta-signal-node {
          animation: none !important;
        }
      }
    `}</style>
  </section>
);

export default CTASection;

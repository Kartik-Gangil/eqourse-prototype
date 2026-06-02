import { BookOpen, MonitorPlay, FileText, Network, Database, Cpu, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const FreePilotHero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToForm = () => {
    document.getElementById("pilot-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative overflow-hidden min-h-[70vh] flex items-center justify-center py-20 lg:py-32"
      aria-label="Free Pilot Program Hero"
    >
      {/* Banner Image Background */}
      <img 
        src="/assets/free-pilot.png" 
        alt="Start a Free Pilot Program with eQOURSE - Experience premium educational content and AI data services with no commitment" 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      {/* Dark overlay to ensure the white hero text remains readable over the image */}
      <div className="absolute inset-0 bg-foreground/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/80" />

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <div
          className={`transition-all duration-1000 transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">
              FREE PILOT PROGRAM
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-md">
            Experience the Quality of eQOURSE - Start Your Free Pilot
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-sm font-medium mb-10">
            See our work before you commit. Whether you need Content Services or AI training data, we offer a complimentary pilot tailored to your exact requirements. No obligation, no payment, no risk.
          </p>

          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B4A6] font-bold text-lg rounded-lg shadow-xl hover:bg-[#00B4A6] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
          >
            Start Your Free Pilot
            <ArrowDown className="w-5 h-5 animate-bounce group-hover:animate-none" />
          </button>
        </div>
      </div>

      {/* Animated Particle Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${8 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FreePilotHero;

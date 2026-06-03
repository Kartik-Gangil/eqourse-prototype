import { BookOpen, MonitorPlay, FileText, Network, Database, Cpu, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const ContactHero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center justify-center py-20 lg:py-32">
      {/* Banner Image Background */}
      <img 
        src="/assets/contact-us.webp" 
        alt="Contact eQOURSE - Get in touch for custom Content Services and AI Data solutions" 
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />
      
      {/* Dark overlay to ensure the white hero text remains readable over the image */}
      <div className="absolute inset-0 bg-foreground/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/80" />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-white">CONTACT US</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 drop-shadow-md">
            Get in Touch - Let's Build Something Great Together
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-sm font-medium mb-10">
            Whether you need custom e-learning content for your Content Services platform or production-grade AI training data for your ML models, our team is ready to help. Tell us about your project and we'll respond within 24 hours.
          </p>

          <button
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B4A6] font-bold text-lg rounded-lg shadow-xl hover:bg-[#00B4A6] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
          >
            Contact Us
            <ArrowDown className="w-5 h-5 animate-bounce group-hover:animate-none" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

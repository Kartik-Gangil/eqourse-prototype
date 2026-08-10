import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Mic, Image, Video } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import SectionHeader from "../shared/SectionHeader";

const modalities = [
  {
    id: "text",
    icon: FileText,
    title: "Text Data Collection",
    summary: "Domain-specific, multilingual and conversational text datasets for NLP, LLM training, fine-tuning and evaluation.",
    href: "/ai-data-services/data-collection/text-data-collection" as string | null,
    items: [
      "Monolingual & multilingual corpora",
      "Domain-specific terminology datasets",
      "Conversational dialogue pairs",
      "Social media & user-generated content",
      "Document & form digitization",
      "Prompt-response pairs for LLM training",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="40" y={30 + i * 32} width={180 - i * 20} height="8" rx="4" fill="hsl(170 82% 45%)" opacity={0.3 - i * 0.04} />
            <rect x="40" y={42 + i * 32} width={140 - i * 15} height="6" rx="3" fill="hsl(170 82% 45%)" opacity={0.15 - i * 0.02} />
          </g>
        ))}
        <rect x="230" y="30" width="40" height="50" rx="6" stroke="hsl(170 82% 45%)" strokeWidth="1.5" fill="hsl(170 82% 32% / 0.1)" />
        <text x="250" y="60" textAnchor="middle" fill="hsl(170 82% 50%)" fontSize="18" fontWeight="bold">A</text>
      </svg>
    ),
  },
  {
    id: "audio",
    icon: Mic,
    title: "Audio & Speech Data Collection",
    summary: "Scripted and natural speech captured across languages, accents, speaker profiles, acoustic environments and devices.",
    href: "/ai-data-services/data-collection/audio-data-collection" as string | null,
    items: [
      "Speech recordings in 30+ languages",
      "Wake-word & command utterances",
      "Multi-speaker conversational audio",
      "Accent & dialect variations",
      "Background noise-augmented recordings",
      "Emotional & tonal speech samples",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {/* Waveform */}
        <path
          d="M30 100 Q50 60 70 100 Q90 140 110 100 Q130 50 150 100 Q170 150 190 100 Q210 40 230 100 Q250 160 270 100"
          stroke="hsl(170 82% 50%)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M30 100 Q50 75 70 100 Q90 125 110 100 Q130 70 150 100 Q170 130 190 100 Q210 65 230 100 Q250 135 270 100"
          stroke="hsl(165 75% 71%)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        {/* Mic icon */}
        <circle cx="150" cy="160" r="15" fill="hsl(170 82% 32% / 0.15)" stroke="hsl(170 82% 45%)" strokeWidth="1.5" />
        <rect x="146" y="150" width="8" height="12" rx="4" fill="hsl(170 82% 50%)" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "image",
    icon: Image,
    title: "Image Data Collection",
    summary: "Purpose-built visual datasets captured across defined objects, environments, devices, perspectives and lighting conditions.",
    href: "/ai-data-services/data-collection/image-data-collection" as string | null,
    items: [
      "Object detection training images",
      "Scene classification datasets",
      "Medical imaging (X-ray, MRI, CT scans)",
      "Satellite & aerial imagery",
      "Document & receipt scanning",
      "Synthetic image generation seeds",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {/* Image frame with bounding boxes */}
        <rect x="50" y="30" width="200" height="140" rx="8" stroke="hsl(170 82% 45%)" strokeWidth="1.5" fill="hsl(170 82% 32% / 0.05)" />
        <rect x="70" y="50" width="60" height="50" rx="4" stroke="hsl(165 75% 71%)" strokeWidth="1.5" strokeDasharray="4 3" fill="hsl(170 82% 50% / 0.05)" />
        <rect x="160" y="70" width="70" height="80" rx="4" stroke="hsl(170 82% 50%)" strokeWidth="1.5" strokeDasharray="4 3" fill="hsl(170 82% 50% / 0.05)" />
        {/* Labels */}
        <rect x="70" y="42" width="35" height="12" rx="3" fill="hsl(170 82% 45%)" opacity="0.3" />
        <rect x="160" y="62" width="30" height="12" rx="3" fill="hsl(170 82% 45%)" opacity="0.3" />
        {/* Corner handles */}
        {[[70, 50], [130, 50], [70, 100], [130, 100]].map(([x, y], i) => (
          <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="hsl(165 75% 71%)" opacity="0.5" rx="1" />
        ))}
      </svg>
    ),
  },
  {
    id: "video",
    icon: Video,
    title: "Video Data Collection",
    summary: "Real-world video covering human activity, objects, environments and temporal behaviour for computer vision and physical AI.",
    href: "/ai-data-services/data-collection/video-data-collection" as string | null,
    items: [
      "Action recognition clips",
      "Surveillance & security footage",
      "Driving scene recordings",
      "Gesture & sign language videos",
      "Product interaction recordings",
      "Multi-angle activity capture",
    ],
    visual: (
      <svg viewBox="0 0 300 200" className="w-full h-48" fill="none">
        {/* Video filmstrip */}
        <rect x="40" y="50" width="220" height="100" rx="6" stroke="hsl(170 82% 45%)" strokeWidth="1.5" fill="hsl(170 82% 32% / 0.05)" />
        {/* Film perforations */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={55 + i * 27} y="55" width="10" height="6" rx="1" fill="hsl(170 82% 45%)" opacity="0.15" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={`b${i}`} x={55 + i * 27} y="139" width="10" height="6" rx="1" fill="hsl(170 82% 45%)" opacity="0.15" />
        ))}
        {/* Play button */}
        <circle cx="150" cy="100" r="20" fill="hsl(170 82% 32% / 0.2)" stroke="hsl(170 82% 50%)" strokeWidth="1.5" />
        <polygon points="143,88 143,112 163,100" fill="hsl(170 82% 50%)" opacity="0.5" />
        {/* Timeline */}
        <rect x="60" y="160" width="180" height="4" rx="2" fill="hsl(170 82% 45%)" opacity="0.15" />
        <rect x="60" y="160" width="100" height="4" rx="2" fill="hsl(170 82% 50%)" opacity="0.35" />
        <circle cx="160" cy="162" r="6" fill="hsl(170 82% 50%)" opacity="0.5" />
      </svg>
    ),
  },
];

const DataModalities = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          label="Data Types"
          title="Multi-Modal Data"
          gradientText="Collection"
          subtitle="Explore four core collection capabilities, each designed around distinct model, data and deployment requirements."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {modalities.map((modality, index) => {
            const Icon = modality.icon;
            const card = (
              <article
                className={`group h-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-soft reveal-up ${isVisible ? "visible" : ""}`}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="relative h-52 sm:h-60 overflow-hidden border-b border-border/50 bg-gradient-to-br from-primary/[0.08] via-background to-accent/[0.06] px-6">
                  <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/85 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="h-full flex items-center justify-center pt-6 transition-transform duration-500 group-hover:scale-[1.04]">
                    {modality.visual}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">{modality.title}</h3>
                    {modality.href && <ArrowUpRight className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />}
                  </div>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{modality.summary}</p>

                  <div className="mt-6 pt-5 border-t border-border/60">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Collection capabilities</p>
                    <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
                      {modality.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/75 leading-snug">
                          <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );

            return modality.href ? <Link key={modality.id} to={modality.href} className="block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">{card}</Link> : <div key={modality.id}>{card}</div>;
          })}
        </div>

        <p className="max-w-3xl mx-auto mt-8 text-center text-sm text-muted-foreground">
          Need more than one modality? We can combine text, audio, image and video collection within one coordinated programme.
        </p>
      </div>
    </section>
  );
};

export default DataModalities;

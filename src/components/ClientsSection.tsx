import { useRef, useEffect } from "react";

// ── Clients with brand colors + Google favicon icons ──────────────────────────
const clients = [
  { name: "EMBIBE",         color: "#1ab394", bg: "#e8faf7", icon: "embibe.com" },
  { name: "Unacademy",      color: "#000000", bg: "#f0f0f0", icon: "unacademy.com" },
  { name: "LEAD School",    color: "#f47920", bg: "#fff5ee", icon: "leadschool.in" },
  { name: "Physics Wallah", color: "#f7941d", bg: "#fff8ee", icon: "pw.live" },
  { name: "Numerade",       color: "#6c2eb9", bg: "#f5eeff", icon: "numerade.com" },
  { name: "Square Panda",   color: "#e94e77", bg: "#fff0f4", icon: "squarepanda.com" },
  { name: "Geniebook",      color: "#3b82f6", bg: "#eff6ff", icon: "geniebook.com" },
  { name: "Classera",       color: "#0ea5e9", bg: "#f0faff", icon: "classera.com" },
  { name: "Bartleby",       color: "#2563eb", bg: "#eff6ff", icon: "bartleby.com" },
  { name: "Byju's",         color: "#7c3aed", bg: "#f5f3ff", icon: "byjus.com" },
  { name: "Coursera",       color: "#0056d2", bg: "#eef4ff", icon: "coursera.org" },
  { name: "Khan Academy",   color: "#14866d", bg: "#f0fdf9", icon: "khanacademy.org" },
  { name: "Duolingo",       color: "#58cc02", bg: "#f2fde4", icon: "duolingo.com" },
  { name: "Chegg",          color: "#f87f0c", bg: "#fff7ee", icon: "chegg.com" },
  { name: "edX",            color: "#02262b", bg: "#e8f9fb", icon: "edx.org" },
  { name: "Vedantu",        color: "#4f46e5", bg: "#eef2ff", icon: "vedantu.com" },
  { name: "upGrad",         color: "#e84118", bg: "#fff0ee", icon: "upgrad.com" },
  { name: "Simplilearn",    color: "#f77f00", bg: "#fff8ee", icon: "simplilearn.com" },
];

const row1 = [...clients.slice(0, 6)];
const row2 = [...clients.slice(6, 12)];
const row3 = [...clients.slice(12, 18)];

// Logo card component
const LogoCard = ({ client }: { client: typeof clients[0] }) => (
  <div
    className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-xl border border-border/40 bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 group"
    style={{ minWidth: "160px" }}
  >
    {/* Favicon icon from Google's S2 service */}
    <img
      src={`https://www.google.com/s2/favicons?domain=${client.icon}&sz=32`}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      className="w-5 h-5 rounded-sm object-contain flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
      loading="lazy"
      decoding="async"
    />
    {/* Stylised wordmark in brand colour */}
    <span
      className="text-sm font-bold leading-none tracking-tight whitespace-nowrap"
      style={{ color: client.color }}
    >
      {client.name}
    </span>
  </div>
);

// Marquee row
const MarqueeRow = ({
  items,
  reverse = false,
}: {
  items: typeof clients;
  reverse?: boolean;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;

    const step = () => {
      if (!pausedRef.current) {
        pos += reverse ? -0.5 : 0.5;
        const half = el.scrollWidth / 2;
        if (!reverse && pos >= half) pos -= half;
        if (reverse && pos <= -half) pos += half;
        el.style.transform = `translateX(${-pos}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const wrap = el.parentElement;
    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    wrap?.addEventListener("mouseenter", pause);
    wrap?.addEventListener("mouseleave", resume);
    wrap?.addEventListener("touchstart", pause, { passive: true });
    wrap?.addEventListener("touchend", resume, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      wrap?.removeEventListener("mouseenter", pause);
      wrap?.removeEventListener("mouseleave", resume);
      wrap?.removeEventListener("touchstart", pause);
      wrap?.removeEventListener("touchend", resume);
    };
  }, [reverse]);

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-3 will-change-transform py-1"
        style={{ width: "max-content" }}
      >
        {doubled.map((client, i) => (
          <LogoCard key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
};

const ClientsSection = () => (
  <section
    aria-labelledby="clients-heading"
    className="py-16 bg-background overflow-hidden"
  >
    <div className="container mx-auto px-4 text-center mb-10">
      <span className="text-sm font-semibold tracking-wider uppercase text-primary">
        Our Partners
      </span>
      <h2
        id="clients-heading"
        className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2"
      >
        Trusted by <span className="text-gradient">200+ Clients</span>
      </h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
        Powering EdTech platforms, publishers, enterprises, and AI teams worldwide.
      </p>
    </div>

    <div className="space-y-3">
      <MarqueeRow items={row1} reverse={false} />
      <MarqueeRow items={row2} reverse={true} />
      <MarqueeRow items={row3} reverse={false} />
    </div>
  </section>
);

export default ClientsSection;

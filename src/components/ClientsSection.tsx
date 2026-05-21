import { useEffect, useRef, useState } from "react";

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

type Client = (typeof clients)[number];

// Logo card component
const LogoCard = ({ client }: { client: Client }) => (
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

/**
 * Seamless infinite marquee row.
 *
 * The track renders the items as **two identical tiles back-to-back**. The animation
 * translates the track from `0` to `-tileWidth` and then snaps to `0`, which is
 * imperceptible because the second tile is pixel-identical to the first.
 *
 * The catch: the seam is only invisible while the visible viewport is *narrower*
 * than a single tile. On wide screens, six logos (~1020px) are narrower than the
 * viewport, so a gap appears between the two tiles. We fix that by dynamically
 * repeating the items inside one tile until the tile is at least as wide as the
 * container plus a buffer.
 */
const MarqueeRow = ({
  items,
  reverse = false,
  speed = 40, // pixels per second
}: {
  items: Client[];
  reverse?: boolean;
  speed?: number;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [tileMultiplier, setTileMultiplier] = useState(1);

  // Step 1: ensure the tile is wider than the visible area on every resize.
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const measure = () => {
      const containerWidth = wrap.clientWidth;
      // Track holds two tiles, so one tile is half the scroll width.
      const tileWidth = track.scrollWidth / 2;
      if (tileWidth === 0 || containerWidth === 0) return;

      // Buffer of 100px so tiny resize jitters don't expose a seam.
      const target = containerWidth + 100;
      if (tileWidth < target) {
        const factor = Math.ceil(target / tileWidth);
        setTileMultiplier((current) => current * factor);
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [tileMultiplier]);

  // Step 2: animate. Time-based so speed is consistent across devices, and
  // respects the user's reduced-motion preference.
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let pos = 0;
    let last = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const dt = (now - last) / 1000; // seconds
      last = now;

      if (!pausedRef.current) {
        const tileWidth = track.scrollWidth / 2;
        if (tileWidth > 0) {
          pos += (reverse ? -1 : 1) * speed * dt;
          // Wrap pos into [0, tileWidth) using positive modulo so the seam is
          // invisible in *both* directions. Without this, the reverse track
          // would drift into positive translateX and leave the left side empty.
          pos = ((pos % tileWidth) + tileWidth) % tileWidth;
          track.style.transform = `translate3d(${-pos}px, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; last = performance.now(); };

    wrap.addEventListener("mouseenter", pause);
    wrap.addEventListener("mouseleave", resume);
    wrap.addEventListener("touchstart", pause, { passive: true });
    wrap.addEventListener("touchend", resume, { passive: true });
    wrap.addEventListener("focusin", pause);
    wrap.addEventListener("focusout", resume);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", pause);
      wrap.removeEventListener("mouseleave", resume);
      wrap.removeEventListener("touchstart", pause);
      wrap.removeEventListener("touchend", resume);
      wrap.removeEventListener("focusin", pause);
      wrap.removeEventListener("focusout", resume);
    };
  }, [reverse, speed, tileMultiplier]);

  // Build one tile = items × multiplier, then render two tiles back-to-back.
  const tile: Client[] = [];
  for (let i = 0; i < tileMultiplier; i += 1) tile.push(...items);
  const rendered = [...tile, ...tile];

  return (
    <div
      ref={wrapRef}
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
        aria-hidden="true"
      >
        {rendered.map((client, i) => (
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
        Powering Content Services platforms, publishers, enterprises, and AI teams worldwide.
      </p>
    </div>

    {/* Screen reader fallback so the partner list is still discoverable */}
    <ul className="sr-only">
      {clients.map((c) => (
        <li key={c.name}>{c.name}</li>
      ))}
    </ul>

    <div className="space-y-3">
      <MarqueeRow items={row1} reverse={false} speed={40} />
      <MarqueeRow items={row2} reverse={true} speed={45} />
      <MarqueeRow items={row3} reverse={false} speed={38} />
    </div>
  </section>
);

export default ClientsSection;

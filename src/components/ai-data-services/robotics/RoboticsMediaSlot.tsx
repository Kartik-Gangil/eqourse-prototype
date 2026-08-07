import { useEffect, useRef, useState } from "react";
import { Film, PlayCircle } from "lucide-react";
import { trackRoboticsEvent } from "@/lib/roboticsAnalytics";

interface RoboticsMediaSlotProps {
  id: "human-demonstration" | "annotation-validation" | "model-evaluation";
  title: string;
  caption: string;
  webmSrc: string;
  mp4Src: string;
  posterSrc: string;
}

interface NavigatorWithConnection extends Navigator {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
}

const RoboticsMediaSlot = ({
  id,
  title,
  caption,
  webmSrc,
  mp4Src,
  posterSrc,
}: RoboticsMediaSlotProps) => {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const firstPlayTracked = useRef(false);
  const visibleFourSecondsTracked = useRef(false);
  const visibilityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [availableSources, setAvailableSources] = useState<{ webm?: string; mp4?: string }>({});
  const [availablePoster, setAvailablePoster] = useState<string>();

  useEffect(() => {
    const figure = figureRef.current;
    const video = videoRef.current;
    if (!figure || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const constrainPlayback = Boolean(
      connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType || ""),
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);

        const isMeaningfullyVisible = entry.intersectionRatio >= 0.55;
        isVisibleRef.current = isMeaningfullyVisible;

        if (reduceMotion || constrainPlayback || !isMeaningfullyVisible) {
          video.pause();
          return;
        }

        if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
          void video.play().catch(() => undefined);
        }
      },
      { rootMargin: "400px 0px", threshold: [0, 0.55] },
    );

    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const controller = new AbortController();
    const probeAsset = async (src: string, expectedType: "video/" | "image/") => {
      try {
        const response = await fetch(src, { method: "HEAD", signal: controller.signal });
        const contentType = response.headers.get("content-type") || "";
        return response.ok && contentType.startsWith(expectedType) ? src : undefined;
      } catch {
        return undefined;
      }
    };

    void Promise.all([
      probeAsset(webmSrc, "video/"),
      probeAsset(mp4Src, "video/"),
      probeAsset(posterSrc, "image/"),
    ]).then(([webm, mp4, poster]) => {
      if (controller.signal.aborted) return;
      setAvailableSources({ webm, mp4 });
      setAvailablePoster(poster);
      setHasError(!webm && !mp4);
    });

    return () => controller.abort();
  }, [mp4Src, posterSrc, shouldLoad, webmSrc]);

  useEffect(() => {
    if (!availableSources.webm && !availableSources.mp4) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const constrainPlayback = Boolean(
      connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType || ""),
    );
    if (isVisibleRef.current && !reduceMotion && !constrainPlayback) {
      void video.play().catch(() => undefined);
    }
  }, [availableSources]);

  useEffect(() => {
    const pauseOtherVideos = (event: Event) => {
      const activeId = (event as CustomEvent<string>).detail;
      if (activeId !== id) videoRef.current?.pause();
    };

    window.addEventListener("robotics-video-play", pauseOtherVideos);
    return () => window.removeEventListener("robotics-video-play", pauseOtherVideos);
  }, [id]);

  useEffect(() => () => {
    if (visibilityTimer.current) clearTimeout(visibilityTimer.current);
  }, []);

  const handleCanPlay = () => {
    setIsReady(true);
    setHasError(false);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean((navigator as NavigatorWithConnection).connection?.saveData);
    if (isVisibleRef.current && !reduceMotion && !saveData) {
      void videoRef.current?.play().catch(() => undefined);
    }
  };

  const handlePlay = () => {
    window.dispatchEvent(new CustomEvent("robotics-video-play", { detail: id }));

    if (!firstPlayTracked.current) {
      firstPlayTracked.current = true;
      trackRoboticsEvent("robotics_video_first_play", {
        video_id: id,
        autoplay: true,
        device_category: window.innerWidth < 768 ? "mobile" : "desktop",
      });
    }

    if (!visibleFourSecondsTracked.current && !visibilityTimer.current) {
      visibilityTimer.current = setTimeout(() => {
        if (isVisibleRef.current && !videoRef.current?.paused) {
          visibleFourSecondsTracked.current = true;
          trackRoboticsEvent("robotics_video_visible_4s", {
            video_id: id,
            device_category: window.innerWidth < 768 ? "mobile" : "desktop",
          });
        }
        visibilityTimer.current = null;
      }, 4000);
    }
  };

  const handlePause = () => {
    if (visibilityTimer.current) {
      clearTimeout(visibilityTimer.current);
      visibilityTimer.current = null;
    }
  };

  return (
    <figure ref={figureRef} className="group">
      <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-white/60 bg-gradient-to-br from-white/80 via-white/55 to-primary/10 shadow-elevated backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,hsl(170_82%_45%/0.18),transparent_38%),radial-gradient(circle_at_85%_80%,hsl(242_33%_25%/0.12),transparent_44%)]" />

        <div className={`absolute inset-0 z-10 flex items-center justify-center p-6 transition-opacity duration-500 ${isReady && !hasError ? "pointer-events-none opacity-0" : "opacity-100"}`}>
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-white/75 text-primary shadow-soft backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
              {hasError ? <Film className="h-7 w-7" /> : <PlayCircle className="h-8 w-8" />}
            </div>
            <p className="font-heading text-lg font-bold text-foreground">Video placeholder</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Add the WebM or MP4 file at the reserved paths to activate this silent loop automatically.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] text-foreground/60">
              <code className="rounded-full border border-border/70 bg-white/70 px-3 py-1">{webmSrc.split("/").pop()}</code>
              <code className="rounded-full border border-border/70 bg-white/70 px-3 py-1">{mp4Src.split("/").pop()}</code>
              <code className="rounded-full border border-border/70 bg-white/70 px-3 py-1">{posterSrc.split("/").pop()}</code>
            </div>
          </div>
        </div>

        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isReady && !hasError ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          preload={shouldLoad ? "metadata" : "none"}
          poster={availablePoster}
          width={1920}
          height={1080}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={handleCanPlay}
          onPlay={handlePlay}
          onPause={handlePause}
          onError={() => setHasError(true)}
        >
          {availableSources.webm && <source src={availableSources.webm} type="video/webm" />}
          {availableSources.mp4 && <source src={availableSources.mp4} type="video/mp4" />}
        </video>
      </div>
      <figcaption className="mt-5 border-l-2 border-primary/35 pl-5">
        <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{caption}</p>
      </figcaption>
    </figure>
  );
};

export default RoboticsMediaSlot;

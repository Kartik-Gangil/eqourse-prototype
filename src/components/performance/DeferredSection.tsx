import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  minHeight: number;
}

/**
 * Keeps below-the-fold modules out of the initial network and render workload,
 * then loads them before the visitor reaches the section.
 */
const DeferredSection = ({ children, minHeight }: DeferredSectionProps) => {
  const markerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "1000px 0px" },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  if (shouldRender) {
    return <Suspense fallback={<div aria-hidden="true" style={{ minHeight }} />}>{children}</Suspense>;
  }

  return <div ref={markerRef} aria-hidden="true" style={{ minHeight }} />;
};

export default DeferredSection;

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";

interface RoboticsLottieProps {
  src: string;
  label: string;
  className?: string;
  loop?: boolean;
}

const RoboticsLottie = ({ src, label, className = "", loop = true }: RoboticsLottieProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} role="img" aria-label={label}>
      {isNearViewport && (
        <DotLottieReact
          src={src}
          loop={loop && !reduceMotion}
          autoplay={!reduceMotion}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
};

export default RoboticsLottie;

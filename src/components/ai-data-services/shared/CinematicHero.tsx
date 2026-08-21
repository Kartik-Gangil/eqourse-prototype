import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import "./cinematic-hero.css";

interface CinematicHeroProps {
  kicker: string;
  headline: string;
  headlineAccent?: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  imageSrc: string;
  imageAvifSrc?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  stats?: { value: string; label: string }[];
  scrollTarget?: string;
  scrollLabel?: string;
}

const CinematicHero = ({
  kicker,
  headline,
  headlineAccent,
  subtext,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  onCtaClick,
  onSecondaryCtaClick,
  imageSrc,
  imageAvifSrc,
  imageAlt,
  imageWidth = 1920,
  imageHeight = 1072,
  stats,
  scrollTarget,
  scrollLabel = "Explore our services",
}: CinematicHeroProps) => {
  const reduceMotion = useReducedMotion();

  const ctaIsRoute = ctaLink.startsWith("/");
  const secondaryCtaIsRoute = secondaryCtaLink?.startsWith("/");

  return (
    <section className="rx-hero">
      <motion.picture
        className="rx-hero__image"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {imageAvifSrc && (
          <source
            srcSet={`${imageAvifSrc.replace(/\.avif$/, "-960.avif")} 960w, ${imageAvifSrc} ${imageWidth}w`}
            sizes="100vw"
            type="image/avif"
          />
        )}
        {imageSrc && (
          <source
            srcSet={`${imageSrc.replace(/\.webp$/, "-960.webp")} 960w, ${imageSrc} ${imageWidth}w`}
            sizes="100vw"
            type="image/webp"
          />
        )}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          loading="eager"
          decoding="async"
          {...{ fetchpriority: "high" }}
        />
      </motion.picture>
      <div className="rx-hero__wash" />
      <div className="rx-hero__grid" />
      <div className="rx-hero__sensor" aria-hidden="true">
        <motion.div
          className="rx-hero__scan"
          animate={reduceMotion ? undefined : { y: ["-10%", "760%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div className="rx-hero__content">
        <motion.div
          className="rx-kicker"
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span /> {kicker}
        </motion.div>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline} {headlineAccent && <strong>{headlineAccent}</strong>}
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          {subtext}
        </motion.p>
        <motion.div
          className="rx-hero__actions"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
        >
          {ctaIsRoute ? (
            <Link to={ctaLink} onClick={onCtaClick}>
              <Button size="lg">
                {ctaText} <ArrowRight />
              </Button>
            </Link>
          ) : (
            <a href={ctaLink} onClick={onCtaClick}>
              <Button size="lg">
                {ctaText} <ArrowRight />
              </Button>
            </a>
          )}
          {secondaryCtaText && secondaryCtaLink && (
            secondaryCtaIsRoute ? (
              <Link to={secondaryCtaLink} onClick={onSecondaryCtaClick}>
                <span>
                  {secondaryCtaText} <ArrowRight />
                </span>
              </Link>
            ) : (
              <a href={secondaryCtaLink} onClick={onSecondaryCtaClick}>
                <span>
                  {secondaryCtaText} <ArrowRight />
                </span>
              </a>
            )
          )}
        </motion.div>
      </motion.div>

      {stats && stats.length > 0 && (
        <div className="rx-hero__telemetry" aria-label="eQOURSE delivery scale">
          {stats.map((stat, i) => (
            <div key={i}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {scrollTarget && (
        <a className="rx-hero__scroll" href={scrollTarget}>
          <span /> {scrollLabel}
        </a>
      )}
    </section>
  );
};

export default CinematicHero;

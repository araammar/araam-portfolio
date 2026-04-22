"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CompanyConfig } from "@/lib/types";
import FocusAreas from "@/components/chunks/FocusAreas";

type HeroProps = Pick<
  CompanyConfig,
  "hero" | "heroSubtitle" | "company" | "role" | "accent" | "focusAreas"
>;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({
  hero,
  heroSubtitle,
  company,
  role,
  accent,
  focusAreas,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const topY = useTransform(scrollYProgress, [0.2, 1], ["0%", "-100%"]);
  const bottomY = useTransform(scrollYProgress, [0.2, 1], ["0%", "100%"]);
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const idx = hero.indexOf(company);
  const prefix = idx !== -1 ? hero.slice(0, idx).trim() : hero;
  const hasCompany = idx !== -1;

  const textContent = (
    <div className="px-6 md:px-12 lg:px-16 w-full">
      <p className="text-sm uppercase tracking-widest text-neutral-400 mb-6 md:mb-8">
        {role}
      </p>
      <h1 className="text-5xl md:text-9xl lg:text-[10rem] font-bold leading-[0.95] tracking-tight mb-8">
        <span className="block text-white">{prefix}</span>
        {hasCompany && (
          <span className="block" style={{ color: accent }}>
            {company}
          </span>
        )}
      </h1>
      <p className="text-lg md:text-xl text-neutral-300 max-w-xl leading-relaxed">
        {heroSubtitle}
      </p>
    </div>
  );

  if (reducedMotion) {
    return (
      <div className="h-[100dvh] bg-[#0A0A0A] flex items-center">
        {textContent}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-[200vh]">
      <motion.div
        className="sticky top-0 h-[100dvh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* FocusAreas - sits at z-0, revealed as panels split */}
        {/* Mobile: items-start so top bullets are always visible in the reveal */}
        {/* Desktop: items-center for the centered editorial look */}
        <div className="absolute inset-0 z-0 bg-white flex items-start pt-20 md:items-center md:pt-0">
          <FocusAreas
            focusAreas={focusAreas}
            labelOpacity={labelOpacity}
            animateBullets={false}
          />
        </div>

        {/* TOP PANEL: z-10, clips top half of text, slides up on scroll */}
        <motion.div
          className="absolute top-0 left-0 w-full overflow-hidden bg-[#0A0A0A] z-10"
          style={{ height: "50%", y: topY }}
        >
          <div
            className="absolute top-0 left-0 w-full h-[200%] flex items-center"
            aria-hidden="true"
          >
            {textContent}
          </div>
        </motion.div>

        {/* BOTTOM PANEL: z-10, clips bottom half of text, slides down on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 w-full overflow-hidden bg-[#0A0A0A] z-10"
          style={{ height: "50%", y: bottomY }}
        >
          <div className="absolute bottom-0 left-0 w-full h-[200%] flex items-center">
            {textContent}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

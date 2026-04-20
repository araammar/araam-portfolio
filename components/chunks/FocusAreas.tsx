"use client";

import { motion, MotionValue } from "framer-motion";
import { CompanyConfig } from "@/lib/types";

type FocusAreasProps = Pick<CompanyConfig, "focusAreas"> & {
  labelOpacity?: MotionValue<number>;
  animateBullets?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function FocusAreas({
  focusAreas,
  labelOpacity,
  animateBullets = true,
}: FocusAreasProps) {
  const labelEl = labelOpacity ? (
    <motion.p
      className="text-sm font-medium tracking-wide text-neutral-900 mb-10 md:mb-12"
      style={{ opacity: labelOpacity }}
    >
      01 · What I&apos;d focus on first
    </motion.p>
  ) : (
    <p className="text-sm font-medium tracking-wide text-neutral-900 mb-10 md:mb-12">
      01 · What I&apos;d focus on first
    </p>
  );

  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full">
      {labelEl}
      <motion.div
        variants={containerVariants}
        initial={animateBullets ? "hidden" : "visible"}
        whileInView={animateBullets ? "visible" : undefined}
        animate={animateBullets ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-8 md:space-y-10"
      >
        {focusAreas.map((area, i) => (
          <motion.div
            key={area}
            variants={itemVariants}
            className="grid grid-cols-12 gap-x-4 md:gap-x-10 items-start"
          >
            <span
              aria-hidden="true"
              className="col-span-2 text-xl md:text-2xl font-bold tracking-tight leading-none select-none text-neutral-900 pt-1"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="col-span-10 md:col-span-8 text-lg md:text-xl font-medium leading-[1.4] text-neutral-900">
              {area}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

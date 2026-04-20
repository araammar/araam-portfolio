"use client";

import { motion } from "framer-motion";
import { CompanyConfig } from "@/lib/types";

type WhyUsefulProps = Pick<CompanyConfig, "whyUseful">;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function WhyUseful({ whyUseful }: WhyUsefulProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full">
      <p className="text-sm font-medium tracking-wide text-neutral-900 mb-10 md:mb-12">
        02 · Why I&apos;d be useful
      </p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8 md:space-y-10"
      >
        {whyUseful.map((item) => (
          <motion.div
            key={item}
            variants={itemVariants}
            className="grid grid-cols-12 gap-x-6 md:gap-x-10"
          >
            <p className="col-span-12 md:col-span-10 md:col-start-3 text-lg md:text-xl font-medium leading-[1.4] text-neutral-900">
              {item}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

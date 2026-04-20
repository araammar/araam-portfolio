"use client";

import { motion } from "framer-motion";
import { CompanyConfig } from "@/lib/types";

type ClosingProps = Pick<CompanyConfig, "closing" | "email">;

export default function Closing({ closing, email }: ClosingProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-12 gap-6 md:gap-8"
      >
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <p className="text-xl md:text-2xl font-medium leading-[1.4] text-neutral-900 mb-8">
            {closing}
          </p>
          <a
            href={`mailto:${email}`}
            className="text-lg text-neutral-900 underline underline-offset-4 decoration-neutral-900 hover:decoration-neutral-500 active:opacity-60 transition-colors"
          >
            {email}
          </a>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { CompanyConfig } from "@/lib/types";

type WhyCompanyProps = Pick<CompanyConfig, "company" | "whyCompany">;

export default function WhyCompany({ company, whyCompany }: WhyCompanyProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full">
      <p className="text-sm font-medium tracking-wide text-neutral-900 mb-10 md:mb-12">
        04 · Why {company}, specifically
      </p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-12 gap-6 md:gap-8"
      >
        <p className="col-span-12 md:col-span-8 md:col-start-3 text-xl md:text-2xl font-medium leading-[1.4] text-neutral-900">
          {whyCompany}
        </p>
      </motion.div>
    </div>
  );
}

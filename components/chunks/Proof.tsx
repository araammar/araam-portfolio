"use client";

import { motion } from "framer-motion";
import { CompanyConfig } from "@/lib/types";

type ProofItem = NonNullable<CompanyConfig["proof"]>[number];
type ProofProps = { proof: NonNullable<CompanyConfig["proof"]> };

function ProofItem({
  item,
  isLast,
}: {
  item: ProofItem;
  isLast: boolean;
}) {
  const isPlaceholder = !item.url || item.url === "#";

  if (isPlaceholder) {
    return (
      <div className={!isLast ? "border-b border-neutral-200" : undefined}>
        <div className="py-6 cursor-default">
          <div className="flex items-baseline gap-3">
            <span className="text-xl md:text-2xl font-medium text-neutral-400">
              {item.title}
            </span>
            <span className="text-xs text-neutral-400 font-normal">
              [placeholder]
            </span>
          </div>
          {item.description && (
            <p className="text-base text-neutral-400 mt-1">{item.description}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={!isLast ? "border-b border-neutral-200" : undefined}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-6 group active:opacity-60"
      >
        <span className="text-xl md:text-2xl font-medium text-neutral-900 group-hover:text-neutral-500 underline-offset-4 group-hover:underline group-hover:decoration-neutral-900 transition-colors">
          {item.title}
        </span>
        {item.description && (
          <p className="text-base text-neutral-600 mt-1">{item.description}</p>
        )}
      </a>
    </div>
  );
}

export default function Proof({ proof }: ProofProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full">
      <p className="text-sm font-medium tracking-wide text-neutral-900 mb-10 md:mb-12">
        03 · Proof
      </p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-12 gap-6 md:gap-8"
      >
        <div className="col-span-12 md:col-span-10 md:col-start-3">
          {proof.map((item, i) => (
            <ProofItem
              key={item.url + item.title}
              item={item}
              isLast={i === proof.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

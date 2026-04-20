"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Structural type — matches CardData in PortfolioContent
type Project = {
  id: string;
  name: string;
  meta: string;
  description: string;
  context: string;
  outcomes: string[];
  stack: string;
  links: string[];
  tags: string[];
  status: string;
};

function MobileCard({ card }: { card: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b-[0.5px] border-neutral-900">
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-6 text-left flex flex-col gap-3"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${card.name}`}
      >
        {/* Tags */}
        <div className="flex items-center flex-wrap gap-x-1">
          {card.tags.map((tag, i) => (
            <span key={tag} className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">
              {tag}
              {i < card.tags.length - 1 && (
                <span className="ml-1 text-neutral-300">/</span>
              )}
            </span>
          ))}
        </div>

        {/* Number + chevron */}
        <div className="flex items-start justify-between">
          <span className="text-base font-bold text-neutral-900">{card.id}</span>
          <span
            className="text-sm text-neutral-400 shrink-0"
            style={{
              display: "inline-block",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            ↓
          </span>
        </div>

        {/* Accent rule */}
        <div className="w-8 h-[1px] bg-neutral-900" />

        {/* Project name */}
        <h3 className="text-xl font-bold text-neutral-900">{card.name}</h3>

        {/* Meta */}
        <p className="text-xs text-neutral-500">{card.meta}</p>

        {/* Description — always visible, not truncated */}
        <p className="text-sm text-neutral-700 leading-relaxed">{card.description}</p>

        {/* Status */}
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium mt-1">
          {card.status}
        </span>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 flex flex-col gap-6">

              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                  Context
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">{card.context}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-3">
                  Outcomes
                </p>
                <ul className="flex flex-col gap-2">
                  {card.outcomes.map((o, i) => (
                    <li key={i} className="flex gap-3 text-sm text-neutral-700">
                      <span className="text-neutral-400 shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                  Stack
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">{card.stack}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                  Links
                </p>
                <div className="flex flex-col gap-2">
                  {card.links.map((link) => (
                    <span key={link} className="text-sm text-neutral-700">
                      {link}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Props = {
  cards: Project[];
};

export default function MobileHero({ cards }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Top strip */}
      <div className="flex items-center justify-between px-6 py-3 border-b-[0.5px] border-neutral-900 shrink-0">
        <span className="text-xs uppercase tracking-widest text-neutral-600 font-medium">
          Aram Marmoud
        </span>
        <span className="text-sm font-bold text-neutral-900">↓</span>
      </div>

      {/* Hero text */}
      <motion.div
        className="px-6 py-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      >
        <p className="text-base text-neutral-600">I&apos;m a business student who builds</p>
        <h1 className="text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 mt-4">
          the <span style={{ color: "#0066FF" }}>tools</span> I&apos;d normally be asked to use.
        </h1>
      </motion.div>

      {/* Card list */}
      <div className="border-t-[0.5px] border-neutral-900 flex-1">
        {cards.map((card) => (
          <MobileCard key={card.id} card={card} />
        ))}
      </div>

    </div>
  );
}

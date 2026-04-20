"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function About() {
  return (
    <>
      {/* ── Mobile (below md) ──────────────────────────────────────────── */}
      <section className="md:hidden px-6 py-16 border-t-[0.5px] border-neutral-900">
        <p className="text-[10px] uppercase tracking-widest text-neutral-900 font-bold">
          § 003 — About
        </p>

        <h2 className="text-2xl font-bold leading-tight text-neutral-900 mt-8">
          Business Administration student at the University at Buffalo — with a
          focus on{" "}
          <span style={{ color: "#0066FF" }}>marketing strategy</span>
          {", "}web, and the systems that connect them.
        </h2>

        <div
          className="w-12 mt-8"
          style={{ height: "1px", backgroundColor: "#0066FF" }}
        />

        <p className="text-base text-neutral-700 leading-relaxed mt-8">
          Currently Marketing Director at TrendArt, running campaigns across
          six active client accounts. Previously international market strategy
          at Eblon Dynamics in Beirut.
        </p>

        <p className="text-base text-neutral-700 leading-relaxed mt-4">
          Most business students study marketing. I build the tools marketers
          use — sales systems, lead scoring pipelines, personalized landing
          pages, this portfolio. The plan is simple: skip the gap between
          understanding and doing.
        </p>

        <p className="text-base text-neutral-700 leading-relaxed mt-4">
          Based in Buffalo. Open to remote.
        </p>
      </section>

      {/* ── Desktop (md+) ──────────────────────────────────────────────── */}
      <section className="hidden md:block relative overflow-hidden py-24 md:py-32">

        {/* Ghosted 03 — bottom-right */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <span
            className="block font-bold leading-none select-none"
            style={{
              fontSize: "clamp(18rem, 35vw, 32rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(10, 10, 10, 0.06)",
              transform: "translate(15%, 20%)",
              letterSpacing: "-0.05em",
            }}
          >
            03
          </span>
        </div>

        {/* Content */}
        <div
          className="relative max-w-[1440px] mx-auto px-8 md:px-16 w-full"
          style={{ zIndex: 10 }}
        >

          {/* Section label */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-900 font-bold mb-16 md:mb-20"
          >
            § 003 — About
          </motion.p>

          {/* Staggered content column */}
          <motion.div
            className="grid grid-cols-12 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="col-span-12 md:col-span-8">

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-neutral-900"
              >
                Business Administration student at the University at Buffalo —
                with a focus on{" "}
                <span style={{ color: "#0066FF" }}>marketing strategy</span>
                {", "}web, and the systems that connect them.
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="w-16 mt-10"
                style={{ height: "1px", backgroundColor: "#0066FF" }}
              />

              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-neutral-700 leading-relaxed mt-10 max-w-[70ch]"
              >
                Currently Marketing Director at TrendArt, running campaigns
                across six active client accounts. Previously international
                market strategy at Eblon Dynamics in Beirut.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-neutral-700 leading-relaxed mt-6 max-w-[70ch]"
              >
                Most business students study marketing. I build the tools
                marketers use — sales systems, lead scoring pipelines,
                personalized landing pages, this portfolio. The plan is simple:
                skip the gap between understanding and doing.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-neutral-700 leading-relaxed mt-6 max-w-[70ch]"
              >
                Based in Buffalo. Open to remote.
              </motion.p>

            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

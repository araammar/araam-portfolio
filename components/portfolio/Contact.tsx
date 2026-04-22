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

export default function Contact() {
  return (
    <>
      {/* ── Mobile (below md) ──────────────────────────────────────────── */}
      <section className="md:hidden px-6 py-16 border-t-[0.5px] border-neutral-900">
        <p className="text-[10px] uppercase tracking-widest text-neutral-900 font-bold">
          § 004 · Contact
        </p>

        <p className="text-base text-neutral-600 mt-10">Let&apos;s talk.</p>

        <a
          href="mailto:araammarmoud@gmail.com"
          className="block text-2xl font-bold leading-tight text-neutral-900 mt-4 break-all hover:text-[#0066FF] transition-colors"
          style={{ transitionDuration: "250ms" }}
        >
          araammarmoud@gmail.com
        </a>

        <div
          className="w-12 mt-8"
          style={{ height: "1px", backgroundColor: "#0066FF" }}
        />

        <div className="mt-8">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">
            Also at
          </span>
          <a
            href="https://linkedin.com/in/araam-marmoud-468333307/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-900 underline underline-offset-4 hover:text-[#0066FF] transition-colors"
            style={{ transitionDuration: "250ms" }}
          >
            linkedin.com/in/araam-marmoud
          </a>
        </div>

        {/* Mobile footer strip */}
        <div className="mt-20 pt-6 border-t-[0.5px] border-neutral-900 flex flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">
          <span>Araam Marmoud</span>
          <span>Portfolio · v.2026.001</span>
          <span>NEW YORK</span>
        </div>
      </section>

      {/* ── Desktop (md+) ──────────────────────────────────────────────── */}
      <section className="hidden md:block relative overflow-hidden pt-24 md:pt-32 pb-0 border-t-[0.5px] border-neutral-900">

        {/* Ghosted 04 */}
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
            04
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
            § 004 · Contact
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

              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-neutral-600 font-normal"
              >
                Let&apos;s talk.
              </motion.p>

              <motion.a
                variants={fadeUp}
                href="mailto:araammarmoud@gmail.com"
                className="block text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-neutral-900 mt-6 hover:text-[#0066FF] transition-colors w-fit"
                style={{ transitionDuration: "250ms" }}
              >
                araammarmoud@gmail.com
              </motion.a>

              <motion.div
                variants={fadeUp}
                className="w-16 mt-10"
                style={{ height: "1px", backgroundColor: "#0066FF" }}
              />

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-baseline gap-3 md:gap-4"
              >
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                  Also at
                </span>
                <a
                  href="https://linkedin.com/in/araam-marmoud-468333307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base md:text-lg text-neutral-900 hover:text-[#0066FF] transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-[#0066FF]"
                  style={{ transitionDuration: "250ms" }}
                >
                  linkedin.com/in/araam-marmoud
                </a>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* Footer strip */}
        <div
          className="relative mt-24 md:mt-32 px-8 md:px-16 py-6 border-t-[0.5px] border-neutral-900"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium font-mono">
            <span>Araam Marmoud</span>
            <span>Portfolio · v.2026.001</span>
            <span>NEW YORK</span>
          </div>
        </div>

      </section>
    </>
  );
}

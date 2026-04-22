"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioDivider from "@/components/shared/PortfolioDivider";
import SkillsTree from "@/components/portfolio/SkillsTree";
import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import ScrollReset from "@/components/shared/ScrollReset";
import MobileHero from "@/components/portfolio/MobileHero";

const EASE = [0.22, 1, 0.36, 1] as const;
const T = "400ms cubic-bezier(0.22, 1, 0.36, 1)";
const ACCENT = "#0066FF";

// ── Entrance animation variants ───────────────────────────────────────────────

const stripVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
} as const;

// ── Stagger variants for ActiveContent ───────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

// ── Data ──────────────────────────────────────────────────────────────────────

type CardId = "01" | "02" | "03" | "04" | "05";
type CardMode = "default" | "active" | "compact";

type CardData = {
  id: CardId;
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

const CARDS: CardData[] = [
  {
    id: "01",
    name: "TrendArt Marketing Agency",
    meta: "Marketing Lead · May 2025 – Aug 2025 · Dubai, UAE / Remote",
    description:
      "Designed and executed performance-driven campaigns for clients across multiple sectors, driving a 42% client sign-up lift and 27% summer revenue growth in three months.",
    context:
      "Joined during a scaling phase across six active client accounts spanning e-commerce, hospitality, and professional services. Owned campaign strategy, creative direction, and media execution across all accounts, pushing the agency toward a more performance-focused model.",
    outcomes: [
      "Drove 42% increase in client sign-ups over 3 months through data-driven campaigns",
      "Grew agency revenue 27% over the summer via new service packages, pricing restructure, and upsell framework",
      "Rebuilt internal workflows across creative, media, and account teams, cutting turnaround time and improving execution quality",
      "Strengthened delivery during a period of agency growth and pricing changes",
    ],
    stack: "Meta Ads Manager, Google Ads, Figma, Notion, WordPress, GA4",
    links: ["trendartagency.com", "Case study PDF, coming soon"],
    tags: ["MARKETING", "GROWTH"],
    status: "SUMMER 2025",
  },
  {
    id: "02",
    name: "The Sniper",
    meta: "Solo Build · 2026",
    description:
      "Lead-generation system built to identify businesses spending on paid ads while sending traffic to weak landing pages. Designed as a prospecting tool for targeted outreach, combining data collection, signal detection, and ranking into one workflow.",
    context:
      "Built to solve a specific business-development problem: finding companies worth pitching without relying on slow manual research. The system pulls business data, checks for advertising activity and marketing signals, evaluates landing-page quality, and outputs ranked outreach targets. Developed independently during evenings and weekends.",
    outcomes: [
      "Generated 12,000+ ranked prospects across three target verticals",
      "Identified a high-value subset of businesses spending on ads while underperforming on landing-page quality",
      "Reduced lead-research time from roughly 30 minutes per prospect to under 1 minute",
      "Built a repeatable workflow for business discovery, qualification, and outreach prioritization",
    ],
    stack:
      "Python, Playwright, SQLAlchemy, SQLite, Google Places API, Meta Ads Library, PageSpeed Insights API",
    links: ["Demo video, coming soon", "Repo, private"],
    tags: ["TECHNICAL", "SOLO"],
    status: "SOLO BUILD",
  },
  {
    id: "03",
    name: "Eblon Dynamics",
    meta: "Business Development Associate · 2025–Present · Beirut / UAE (Remote)",
    description:
      "Supported business development and procurement strategy for a heavy-equipment parts distributor operating in Lebanon and surrounding markets. Worked across sourcing, supplier evaluation, market research, and strategic positioning.",
    context:
      "The role focused on helping the company build a stronger supply and growth foundation in a fragmented market. Researched suppliers, explored partnership paths, and supported efforts to improve sourcing reliability while identifying commercial opportunities in heavy-equipment and generator parts.",
    outcomes: [
      "Contributed to a 15% reduction in shipment lead time",
      "Identified supplier and partnership opportunities across regional and international markets",
      "Supported market research for heavy-equipment and generator-parts demand in Lebanon",
      "Helped shape a more structured business development and sourcing approach",
    ],
    stack:
      "Market research, procurement strategy, supplier sourcing, partnership evaluation, business development, competitive analysis",
    links: ["eblondynamics.com", "Case study PDF, coming soon"],
    tags: ["BUSINESS DEV", "INTERNATIONAL"],
    status: "2025 – PRESENT",
  },
  {
    id: "04",
    name: "Startup Bootcamp, 2nd Place",
    meta: "UB Blackstone LaunchPad · Fall 2025",
    description:
      "Won second place in a university-wide startup pitch competition by presenting a venture concept built around clear market need, structured business logic, and strong pitch delivery.",
    context:
      "The competition brought together student founders and early-stage ideas from across the university. Advanced to the final round and pitched to a judging panel, refining the concept around problem definition, value proposition, and founder-market fit.",
    outcomes: [
      "Awarded 2nd place in a $2,500 university-wide prize pool",
      "Received feedback from judges with experience in startups and venture-backed thinking",
      "Improved how to structure, defend, and communicate early-stage business ideas",
      "Strengthened ability to turn an idea into a credible, pitchable opportunity",
    ],
    stack: "Figma, Google Sheets, pitch strategy, business modeling",
    links: ["UB Blackstone LaunchPad", "Pitch deck, available on request"],
    tags: ["PITCH", "COMPETITION"],
    status: "FALL 2025",
  },
  {
    id: "05",
    name: "Personalized Page System",
    meta: "Solo Build · 2026",
    description:
      "Application-page system that generates tailored landing pages for individual companies and roles. Built to present strategic fit, relevant work, and design/technical ability in a format more direct than a traditional cover letter.",
    context:
      "Created as a configurable system for publishing company-specific pages at araammarmoud.com/for/[company]. Each page adapts content, color, and structure to the target company while using a shared design framework. The goal was to build something more intentional than a static portfolio and more convincing than a generic application.",
    outcomes: [
      "Built a reusable system for generating tailored pages from a single config-driven structure",
      "Designed a Swiss-inspired hero with a sticky split-reveal interaction",
      "Enabled fast company-level customization across copy, color palette, and content modules",
      "Created a workflow that reduces per-page publishing time to under 30 seconds after copy is ready",
    ],
    stack: "Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Vercel",
    links: ["araammarmoud.com/for/smartly", "System overview, coming soon"],
    tags: ["WEB", "SYSTEM"],
    status: "LIVE ↗",
  },
];

const CARD_BORDERS: Record<CardId, string> = {
  "01": "border-r-[0.5px] border-b-[0.5px] border-neutral-900",
  "02": "border-b-[0.5px] border-neutral-900",
  "03": "border-r-[0.5px] border-b-[0.5px] border-neutral-900",
  "04": "border-b-[0.5px] border-neutral-900",
  "05": "",
};

function getProjectName(id: CardId): string {
  return CARDS.find((c) => c.id === id)?.name ?? "";
}

function getGridTemplate(id: CardId | null): { cols: string; rows: string } {
  switch (id) {
    case "01": return { cols: "3fr 1fr", rows: "3fr 1fr 0.8fr"   };
    case "02": return { cols: "1fr 3fr", rows: "3fr 1fr 0.8fr"   };
    case "03": return { cols: "3fr 1fr", rows: "1fr 3fr 0.8fr"   };
    case "04": return { cols: "1fr 3fr", rows: "1fr 3fr 0.8fr"   };
    case "05": return { cols: "1fr 1fr", rows: "0.5fr 0.5fr 4fr" };
    default:   return { cols: "1fr 1fr", rows: "1fr 1fr 1fr"     };
  }
}

// ── Content sub-components ────────────────────────────────────────────────────

function DefaultContent({
  id, name, meta, description, tags, status,
}: {
  id: CardId; name: string; meta: string; description: string;
  tags: string[]; status: string;
}) {
  const isLive = status.includes("LIVE");
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="h-full flex flex-col p-4 md:p-5 overflow-hidden relative"
    >
      {/* Tags - tiny, uppercase, architectural */}
      <div className="flex items-center flex-wrap gap-x-1 mb-2 shrink-0">
        {tags.map((tag, i) => (
          <span key={tag} className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium">
            {tag}
            {i < tags.length - 1 && (
              <span className="ml-1 text-neutral-300"> /</span>
            )}
          </span>
        ))}
      </div>

      {/* Number - moves up 4px and turns accent on hover */}
      <span className="text-base md:text-lg font-bold text-neutral-900 group-hover:text-[#0066FF] group-hover:-translate-y-1 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0">
        {id}
      </span>

      {/* Accent rule - extends + turns blue on hover */}
      <div className="w-6 h-[1px] bg-neutral-900 mt-2 mb-1 transition-all duration-[250ms] group-hover:w-12 group-hover:bg-[#0066FF] shrink-0" />

      {/* Arrow - slides in from right on hover */}
      <span className="absolute top-4 right-4 text-sm font-bold text-neutral-900 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] select-none">
        →
      </span>

      <h3 className="text-base md:text-lg font-bold text-neutral-900 mt-2 leading-tight shrink-0 transition-colors duration-[250ms] group-hover:text-[#0066FF]">
        {name}
      </h3>
      <p className="text-xs text-neutral-500 mt-1 shrink-0">{meta}</p>
      <p className="text-xs md:text-sm text-neutral-700 mt-2 leading-snug line-clamp-3 pb-4">
        {description}
      </p>

      {/* Status indicator - bottom-right, turns blue on hover if LIVE */}
      <span
        className={[
          "absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.15em] font-medium transition-colors duration-[250ms]",
          isLive ? "text-neutral-500 group-hover:text-[#0066FF]" : "text-neutral-400",
        ].join(" ")}
      >
        {status}
      </span>
    </motion.div>
  );
}

function ActiveContent({
  id, name, meta, description, context, outcomes, stack, links, onClose,
}: CardData & { onClose: (e: React.MouseEvent) => void }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -4 }}
      variants={containerVariants}
      className="h-full flex flex-col p-6 md:p-8 overflow-y-auto relative"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-xl text-neutral-500 hover:text-neutral-900 transition-colors leading-none z-10"
      >
        ×
      </button>

      <motion.span
        variants={itemVariants}
        className="text-base md:text-lg font-bold shrink-0"
        style={{ color: ACCENT }}
      >
        {id}
      </motion.span>

      <motion.h3
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold text-neutral-900 mt-4 leading-tight shrink-0"
      >
        {name}
      </motion.h3>

      <motion.p variants={itemVariants} className="text-sm text-neutral-500 mt-2 shrink-0">
        {meta}
      </motion.p>

      <motion.p variants={itemVariants} className="text-base text-neutral-700 mt-6 leading-relaxed max-w-[70ch]">
        {description}
      </motion.p>

      <motion.div variants={itemVariants} className="mt-8">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Context</p>
        <p className="text-base text-neutral-700 leading-relaxed max-w-[70ch]">{context}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Outcomes</p>
        <ul className="space-y-2 text-base text-neutral-700 max-w-[70ch]">
          {outcomes.map((o, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-neutral-400 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Stack</p>
        <p className="text-base text-neutral-700 leading-relaxed max-w-[70ch]">{stack}</p>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 mb-4">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Links</p>
        <div className="flex flex-col gap-2">
          {links.map((link, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-base text-neutral-900 underline underline-offset-4 hover:text-[#0066FF] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CompactContent({ id, name }: { id: CardId; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="h-full flex flex-col justify-center p-3 overflow-hidden"
    >
      <span className="text-[10px] font-bold text-neutral-400 leading-none">{id}</span>
      <p className="text-xs font-bold text-neutral-900 mt-1 leading-tight line-clamp-2">{name}</p>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function PortfolioContent() {
  const [activeCardId, setActiveCardId] = useState<CardId | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<CardId | null>(null);
  const { cols, rows } = getGridTemplate(activeCardId);

  function toggle(id: CardId) {
    setActiveCardId((prev) => (prev === id ? null : id));
  }

  return (
    <main className="bg-white text-neutral-900">
      <ScrollReset />

      {/* ── Mobile hero (below md) ────────────────────────────────────── */}
      <div className="md:hidden">
        <MobileHero cards={CARDS} />
      </div>

      {/* ── Hero - exactly one viewport ───────────────────────────────── */}
      {/*
        position: relative needed so the absolute-positioned decorative
        layers (ghosted 2026, corner annotations) anchor to this section.
      */}
      <section className="hidden md:flex h-screen overflow-hidden flex-col relative">

        {/*
          ── z-0: Background ghosted "2026" ──────────────────────────────
          Large outlined-only text bleeds off the bottom-right corner.
          Transparent fill, 6% opacity stroke - evokes blueprint annotation.
          pointer-events-none so it never intercepts clicks.
        */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <span
            className="block font-bold leading-none select-none"
            style={{
              fontSize: "clamp(20rem, 40vw, 36rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(10, 10, 10, 0.06)",
              transform: "translate(15%, 20%)",
              letterSpacing: "-0.05em",
            }}
          >
            2026
          </span>
        </div>

        {/*
          ── z-5: Corner annotations ──────────────────────────────────────
          Tiny monospace-style notations in the four hero corners.
          Discoverable on close inspection; hidden on mobile.
        */}
        <span
          className="absolute top-[56px] left-6 text-[10px] font-mono text-neutral-400 pointer-events-none hidden md:block"
          style={{ zIndex: 5 }}
        >
          v.2026.001
        </span>
        <span
          className="absolute top-[56px] right-6 text-[10px] font-mono text-neutral-400 pointer-events-none hidden md:block"
          style={{ zIndex: 5 }}
        >
          NEW YORK
        </span>
        <span
          className="absolute bottom-6 left-6 text-[10px] font-mono text-neutral-400 pointer-events-none hidden md:block"
          style={{ zIndex: 5 }}
        >
          NY / US
        </span>
        <span
          className="absolute bottom-6 right-6 text-[10px] font-mono text-neutral-400 pointer-events-none hidden md:block"
          style={{ zIndex: 5 }}
        >
          LOCAL · 0001
        </span>

        {/*
          ── z-5: Left spine section index ───────────────────────────────
          Tiny rotated notation on the absolute left edge.
          Book-chapter annotation vibe - § 001 - HERO.
          Hidden on mobile.
        */}
        <div
          className="absolute left-2 pointer-events-none hidden md:flex items-center"
          style={{ top: "50%", transform: "translateY(-50%)", zIndex: 5 }}
        >
          <span
            className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            § 001 · HERO
          </span>
        </div>

        {/* ── z-10: Top strip ─────────────────────────────────────────── */}
        <motion.div
          variants={stripVariants}
          initial="hidden"
          animate="visible"
          className="shrink-0 flex items-center border-b-[0.5px] border-neutral-900 px-8 md:px-16 py-3 relative z-10"
        >
          <span className="text-sm uppercase tracking-widest text-neutral-600 font-bold shrink-0">
            Araam Marmoud
          </span>

          {/* Scale axis ruler - hidden on mobile */}
          <div className="flex-1 relative h-full items-center mx-8 hidden md:flex">
            <div className="w-full h-[0.5px] bg-neutral-900 relative">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-[0.5px] bg-neutral-900"
                  style={{
                    left: `${(i / 10) * 100}%`,
                    height: i % 5 === 0 ? "8px" : "4px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Viewing indicator - slides in when a card is active */}
          <AnimatePresence>
            {activeCardId && (
              <motion.div
                key="viewing"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:flex items-center gap-2 mr-6 shrink-0"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                  Viewing
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-900 font-medium">
                  · {activeCardId} {getProjectName(activeCardId)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            <span className="hidden md:inline text-[10px] uppercase tracking-widest text-neutral-500">
              Work
            </span>
            <span className="hidden md:inline text-[10px] uppercase tracking-widest text-neutral-500">
              Click to expand
            </span>
            <span className="text-sm font-bold text-neutral-900">↓</span>
          </div>
        </motion.div>

        {/* ── z-10: Hero body - outer split animates on card expand ────── */}
        <div
          className="flex-1 flex flex-col md:grid md:grid-cols-[58%_42%] min-h-0 relative z-10"
          style={{
            gridTemplateColumns: activeCardId !== null ? "20% 80%" : undefined,
            transition: `grid-template-columns ${T}`,
          }}
        >

          {/* Left region */}
          <div className="overflow-hidden md:h-full flex flex-col pt-8 md:pt-16 px-8 md:pl-16 md:pr-12 relative">

            {/* Hero text - entrance slide-up, then fade-out when card expands */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
            >
              <motion.div
                animate={{ opacity: activeCardId !== null ? 0 : 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="text-xl md:text-2xl text-neutral-600">
                  I&apos;m a Business student with
                </p>
                <h1 className="mt-6 md:mt-8 text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-neutral-900">
                  <span style={{ color: ACCENT }}>Applied</span> ambition.
                </h1>
                <p className="text-base md:text-lg text-neutral-500 mt-8 max-w-[40ch]">
                  Built through systems, strategy, and execution.
                </p>
              </motion.div>
            </motion.div>

            {/* Vertical WORK label - fades in when a card is expanded */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeCardId !== null ? 1 : 0 }}
              transition={{
                duration: 0.4,
                ease: EASE,
                delay: activeCardId !== null ? 0.2 : 0,
              }}
              className="absolute inset-0 hidden md:flex items-center pl-6 pointer-events-none"
              aria-hidden="true"
            >
              <span
                className="text-2xl md:text-3xl uppercase tracking-[0.3em] text-neutral-900 font-bold"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Work
              </span>
            </motion.div>

          </div>

          {/* Right region - card grid, orchestrates card entrance stagger */}
          <motion.div
            className={[
              "flex flex-col md:grid",
              "md:grid-cols-[1fr_1fr] md:grid-rows-[1fr_1fr_1fr]",
              "h-full overflow-hidden",
              "border-l-[0.5px] border-neutral-900",
            ].join(" ")}
            style={{
              gridTemplateColumns: activeCardId !== null ? cols : undefined,
              gridTemplateRows: activeCardId !== null ? rows : undefined,
              transition: `grid-template-columns ${T}, grid-template-rows ${T}`,
            }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.3 },
              },
            }}
          >
            {CARDS.map((card) => {
              const mode: CardMode =
                activeCardId === null
                  ? "default"
                  : activeCardId === card.id
                  ? "active"
                  : "compact";

              return (
                /*
                 * Outer motion.div: entrance stagger (cardVariants) + flex/grid position.
                 * Inner div: interaction, borders, hover styles. No transforms on hover.
                 */
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  className={[
                    "min-h-0 relative",
                    card.id === "05" ? "md:col-span-2" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    flex: activeCardId === card.id ? "4 1 0" : "1 1 0",
                    transition: `flex ${T}`,
                  }}
                >
                  <div
                    className={[
                      "overflow-hidden cursor-pointer h-full group relative",
                      mode === "default" ? "hover:bg-neutral-100" : "",
                      CARD_BORDERS[card.id],
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => toggle(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(card.id);
                      }
                      if (e.key === "Escape" && activeCardId === card.id) {
                        setActiveCardId(null);
                      }
                    }}
                    onMouseEnter={() => mode === "default" && setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={activeCardId === card.id}
                    aria-label={`${activeCardId === card.id ? "Collapse" : "Expand"} ${card.name}`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {mode === "active" ? (
                        <ActiveContent
                          key="active"
                          id={card.id}
                          name={card.name}
                          meta={card.meta}
                          description={card.description}
                          context={card.context}
                          outcomes={card.outcomes}
                          stack={card.stack}
                          links={card.links}
                          tags={card.tags}
                          status={card.status}
                          onClose={(e) => {
                            e.stopPropagation();
                            setActiveCardId(null);
                          }}
                        />
                      ) : mode === "compact" ? (
                        <CompactContent key="compact" id={card.id} name={card.name} />
                      ) : (
                        <DefaultContent
                          key="default"
                          id={card.id}
                          name={card.name}
                          meta={card.meta}
                          description={card.description}
                          tags={card.tags}
                          status={card.status}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Hover rule - extends from card right edge, only in default mode */}
                  {mode === "default" && (
                    <div
                      className="absolute pointer-events-none hidden md:block"
                      style={{
                        top: "50%",
                        left: "100%",
                        height: "1px",
                        backgroundColor: "#0066FF",
                        opacity: 0.4,
                        width: hoveredCardId === card.id ? "120px" : "0px",
                        transitionProperty: "width",
                        transitionDuration: hoveredCardId === card.id ? "250ms" : "150ms",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      <div className="hidden md:block"><PortfolioDivider /></div>

      {/* ── Skills ───────────────────────────────────────────────────── */}
      <SkillsTree />

      <div className="hidden md:block"><PortfolioDivider /></div>

      {/* ── About ────────────────────────────────────────────────────── */}
      <About />

      {/* ── Contact / Footer ─────────────────────────────────────────── */}
      <Contact />
    </main>
  );
}

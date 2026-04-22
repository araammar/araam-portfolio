"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HUBS, SKILLS } from "@/content/portfolio/skills";
import type { Skill } from "@/content/portfolio/skills";
import SkillNode from "./SkillNode";
import SkillDetail from "./SkillDetail";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#0066FF";

const W = 1100;
const H = 840;
const CX = 550;
const CY = 450;

const CENTER_SIZE = 140;
const HUB_SIZE = 100;
const SKILL_SIZE = 72;

const HUB_DISTANCE = 220;
const SKILL_DISTANCE = 170;
const CROSS_CUT_DISTANCE = 195;
const SKILL_SPREAD = 35;

const HUB_ANGLES: Record<string, number> = {
  marketing: -90,
  web: 150,
  technical: 30,
};

const CROSS_CUT_META: { id: string; angle: number }[] = [
  { id: "pitch-storytelling", angle: -30 },
  { id: "research-positioning", angle: 210 },
];

// ── Geometry ───────────────────────────────────────────────────────────────
const toRad = (deg: number) => (deg * Math.PI) / 180;

function getHubPos(hubId: string): { x: number; y: number } {
  const a = HUB_ANGLES[hubId];
  return {
    x: CX + HUB_DISTANCE * Math.cos(toRad(a)),
    y: CY + HUB_DISTANCE * Math.sin(toRad(a)),
  };
}

function getSkillPos(
  hubId: string,
  idxInHub: number,
  totalInHub: number
): { x: number; y: number } {
  const hubAngle = HUB_ANGLES[hubId];
  const center = (totalInHub - 1) / 2;
  const offset = (idxInHub - center) * SKILL_SPREAD;
  const skillAngle = hubAngle + offset;
  const { x: hx, y: hy } = getHubPos(hubId);
  return {
    x: hx + SKILL_DISTANCE * Math.cos(toRad(skillAngle)),
    y: hy + SKILL_DISTANCE * Math.sin(toRad(skillAngle)),
  };
}

function getCrossCutPos(angle: number): { x: number; y: number } {
  return {
    x: CX + CROSS_CUT_DISTANCE * Math.cos(toRad(angle)),
    y: CY + CROSS_CUT_DISTANCE * Math.sin(toRad(angle)),
  };
}

/**
 * Compute line endpoints at circle edges, accounting for each node's current
 * hover/select scale. Only pass hover/select scale - breathing (1.0–1.02) is
 * absorbed visually and intentionally ignored here to avoid coordinate jitter.
 */
function edgeEndpoints(
  ax: number, ay: number, ra: number, sa: number,
  bx: number, by: number, rb: number, sb: number
) {
  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: ax + ux * (ra * sa),
    y1: ay + uy * (ra * sa),
    x2: bx - ux * (rb * sb),
    y2: by - uy * (rb * sb),
  };
}

// ── Relation computation ───────────────────────────────────────────────────
type ActiveType = "center" | "hub" | "skill" | "crosscut" | null;

function getRelated(id: string | null, type: ActiveType): Set<string> {
  if (!id || !type) return new Set<string>();
  if (type === "center") {
    return new Set<string>([
      "center",
      ...HUBS.map((h) => h.id),
      ...CROSS_CUT_META.map((c) => c.id),
    ]);
  }
  if (type === "hub") {
    const skills = SKILLS.filter((s) => s.hubId === id);
    return new Set<string>(["center", id, ...skills.map((s) => s.id)]);
  }
  if (type === "skill") {
    const skill = SKILLS.find((s) => s.id === id);
    if (!skill) return new Set<string>();
    return new Set<string>(["center", skill.hubId, id]);
  }
  if (type === "crosscut") {
    return new Set<string>(["center", id]);
  }
  return new Set<string>();
}

// ── Precomputed data ───────────────────────────────────────────────────────
const skillsByHub: Record<string, Skill[]> = Object.fromEntries(
  HUBS.map((h) => [h.id, SKILLS.filter((s) => s.hubId === h.id)])
);
const crossCutSkills = SKILLS.filter((s) => s.hubId === "center");

// ── Mobile filtered arrays ─────────────────────────────────────────────────
const mobileMarketingSkills = SKILLS.filter((s) => s.hubId === "marketing");
const mobileWebSkills = SKILLS.filter((s) => s.hubId === "web");
const mobileTechnicalSkills = SKILLS.filter((s) => s.hubId === "technical");
const mobileCrossCuttingSkills = SKILLS.filter((s) => s.hubId === "center");

// ── Mobile accordion row ───────────────────────────────────────────────────
function MobileSkillRow({ skill }: { skill: Skill }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b-[0.5px] border-neutral-900">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 flex items-center justify-between text-left"
        aria-expanded={isExpanded}
      >
        <span className="text-base font-medium text-neutral-900">{skill.name}</span>
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
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <div className="pb-5 flex flex-col gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                  What
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">{skill.what}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                  How
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">{skill.how}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                  Where
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">{skill.where}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSkillGroup({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: "#0066FF" }}>
        {title}
      </h3>
      <div className="border-t-[0.5px] border-neutral-900">
        {skills.map((skill) => (
          <MobileSkillRow key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function SkillsTree() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<ActiveType>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [sectionEntranceComplete, setSectionEntranceComplete] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Mark entrance complete after the last skill node has fully appeared.
  // Last node enters at ~780ms delay + 450ms animation = ~1230ms. Use 1400ms buffer.
  useEffect(() => {
    if (!isInView) return;
    const id = setTimeout(() => setSectionEntranceComplete(true), 1400);
    return () => clearTimeout(id);
  }, [isInView]);

  const activeId = hoveredId ?? selectedSkillId;
  const activeType: ActiveType =
    hoveredType ??
    (selectedSkillId
      ? (() => {
          const s = SKILLS.find((sk) => sk.id === selectedSkillId);
          return s?.hubId === "center" ? "crosscut" : "skill";
        })()
      : null);
  const related = getRelated(activeId, activeType);
  const anyActive = related.size > 0;

  function isHighlighted(id: string) {
    return id === hoveredId || id === selectedSkillId;
  }
  function isDimmed(id: string) {
    return anyActive && !related.has(id) && !isHighlighted(id);
  }

  // Effective visual scale for line endpoint math.
  // Breathing (1.0–1.02) is intentionally excluded - only hover/select matter.
  function getNodeScale(nodeId: string): number {
    if (selectedSkillId === nodeId) return 1.15;
    if (hoveredId === nodeId) return 1.1;
    return 1.0;
  }

  function hoverNode(id: string, type: ActiveType) {
    setHoveredId(id);
    setHoveredType(type);
  }
  function clearHover() {
    setHoveredId(null);
    setHoveredType(null);
  }
  function toggleSkill(id: string) {
    setSelectedSkillId((prev) => (prev === id ? null : id));
  }

  const selectedSkill = SKILLS.find((s) => s.id === selectedSkillId) ?? null;
  const isExpanded = selectedSkillId !== null;

  // ── Line helpers ───────────────────────────────────────────────────────────
  function lineStyleCSS(fromId: string, toId: string): React.CSSProperties {
    const isRel = related.has(fromId) && related.has(toId);
    return {
      stroke: isRel ? ACCENT : "#0a0a0a",
      strokeWidth: isRel ? 1.5 : 0.5,
      transition: "stroke 250ms ease-out, stroke-width 250ms ease-out",
    };
  }

  function lineOpacity(fromId: string, toId: string): number {
    const isRel = related.has(fromId) && related.has(toId);
    return !isInView ? 0 : isRel ? 1 : anyActive ? 0.07 : 0.22;
  }

  // Opacity transition: uses entrance stagger delay until entrance is done,
  // then responds instantly to hover/relation state changes.
  function lineOpacityTransition(entranceDelaySecs: number) {
    return sectionEntranceComplete
      ? { duration: 0.25, ease: "easeOut" as const }
      : { duration: 0.3, delay: entranceDelaySecs, ease: "easeOut" as const };
  }

  // Coordinate animation transition - always fast, no entrance delay
  const coordTransition = { duration: 0.2, ease: EASE };

  // ── Stable node indices for breathing stagger ──────────────────────────
  let nodeCounter = 0;
  const centerIdx = nodeCounter++;
  const hubIndices = Object.fromEntries(HUBS.map((h) => [h.id, nodeCounter++]));
  const skillIndices: Record<string, number> = {};
  for (const hub of HUBS) {
    for (const sk of skillsByHub[hub.id]) {
      skillIndices[sk.id] = nodeCounter++;
    }
  }
  const crossCutIndices: Record<string, number> = {};
  for (const cc of CROSS_CUT_META) {
    crossCutIndices[cc.id] = nodeCounter++;
  }

  return (
    <>
      {/* ── Mobile (below md) ──────────────────────────────────────────── */}
      <section className="md:hidden px-6 py-16 border-t-[0.5px] border-neutral-900">
        <p className="text-[10px] uppercase tracking-widest text-neutral-900 font-bold mb-10">
          § 002 · Skills
        </p>
        <p className="text-base text-neutral-600 mb-12">
          What I know, how I use it, and where it shows up in the work.
        </p>
        <div className="flex flex-col gap-10">
          <MobileSkillGroup title="Marketing" skills={mobileMarketingSkills} />
          <MobileSkillGroup title="Web" skills={mobileWebSkills} />
          <MobileSkillGroup title="Technical" skills={mobileTechnicalSkills} />
          <MobileSkillGroup title="Cross-Cutting" skills={mobileCrossCuttingSkills} />
        </div>
      </section>

      {/* ── Desktop (md+) ──────────────────────────────────────────────── */}
      <section ref={sectionRef} className="hidden md:block py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-sm font-medium tracking-wide text-neutral-900 mb-12 md:mb-16"
        >
          § 002 · Skills
        </motion.p>

        {/* ── Desktop: split-screen diagram (xl+) ───────────────────────── */}
        <div
          className="hidden xl:grid"
          style={{
            gridTemplateColumns: isExpanded ? "55% 45%" : "100% 0%",
            transition: `grid-template-columns 450ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {/* Left column: diagram */}
          <div
            className="flex justify-center overflow-hidden"
            style={{ height: H }}
          >
            <motion.div
              style={{ width: W, height: H, position: "relative", flexShrink: 0 }}
              animate={{
                scale: isExpanded ? 0.85 : 1,
                x: isExpanded ? "-3%" : "0%",
              }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {/* ── SVG: connection lines ──────────────────────────── */}
              <svg
                className="absolute inset-0 pointer-events-none"
                width={W}
                height={H}
                style={{ zIndex: 0, overflow: "visible" }}
              >
                {/* Center → sub-hub lines */}
                {HUBS.map((hub, hi) => {
                  const hp = getHubPos(hub.id);
                  const ep = edgeEndpoints(
                    CX, CY, CENTER_SIZE / 2, getNodeScale("center"),
                    hp.x, hp.y, HUB_SIZE / 2, getNodeScale(hub.id)
                  );
                  const baseEp = edgeEndpoints(
                    CX, CY, CENTER_SIZE / 2, 1,
                    hp.x, hp.y, HUB_SIZE / 2, 1
                  );
                  return (
                    <motion.line
                      key={`c-${hub.id}`}
                      style={lineStyleCSS("center", hub.id)}
                      initial={{ opacity: 0, x1: baseEp.x1, y1: baseEp.y1, x2: baseEp.x2, y2: baseEp.y2 }}
                      animate={{ opacity: lineOpacity("center", hub.id), x1: ep.x1, y1: ep.y1, x2: ep.x2, y2: ep.y2 }}
                      transition={{
                        opacity: lineOpacityTransition(0.35 + hi * 0.05),
                        x1: coordTransition,
                        y1: coordTransition,
                        x2: coordTransition,
                        y2: coordTransition,
                      }}
                    />
                  );
                })}

                {/* Sub-hub → skill lines */}
                {HUBS.map((hub, hi) =>
                  skillsByHub[hub.id].map((skill, si) => {
                    const hp = getHubPos(hub.id);
                    const sp = getSkillPos(hub.id, si, skillsByHub[hub.id].length);
                    const ep = edgeEndpoints(
                      hp.x, hp.y, HUB_SIZE / 2, getNodeScale(hub.id),
                      sp.x, sp.y, SKILL_SIZE / 2, getNodeScale(skill.id)
                    );
                    const baseEp = edgeEndpoints(
                      hp.x, hp.y, HUB_SIZE / 2, 1,
                      sp.x, sp.y, SKILL_SIZE / 2, 1
                    );
                    return (
                      <motion.line
                        key={`h-${skill.id}`}
                        style={lineStyleCSS(hub.id, skill.id)}
                        initial={{ opacity: 0, x1: baseEp.x1, y1: baseEp.y1, x2: baseEp.x2, y2: baseEp.y2 }}
                        animate={{ opacity: lineOpacity(hub.id, skill.id), x1: ep.x1, y1: ep.y1, x2: ep.x2, y2: ep.y2 }}
                        transition={{
                          opacity: lineOpacityTransition(0.5 + hi * 0.1 + si * 0.05),
                          x1: coordTransition,
                          y1: coordTransition,
                          x2: coordTransition,
                          y2: coordTransition,
                        }}
                      />
                    );
                  })
                )}

                {/* Center → cross-cutting lines (dashed) */}
                {CROSS_CUT_META.map((cc, ci) => {
                  const cp = getCrossCutPos(cc.angle);
                  const ep = edgeEndpoints(
                    CX, CY, CENTER_SIZE / 2, getNodeScale("center"),
                    cp.x, cp.y, SKILL_SIZE / 2, getNodeScale(cc.id)
                  );
                  const baseEp = edgeEndpoints(
                    CX, CY, CENTER_SIZE / 2, 1,
                    cp.x, cp.y, SKILL_SIZE / 2, 1
                  );
                  return (
                    <motion.line
                      key={`cc-${cc.id}`}
                      strokeDasharray="3 4"
                      style={lineStyleCSS("center", cc.id)}
                      initial={{ opacity: 0, x1: baseEp.x1, y1: baseEp.y1, x2: baseEp.x2, y2: baseEp.y2 }}
                      animate={{ opacity: lineOpacity("center", cc.id), x1: ep.x1, y1: ep.y1, x2: ep.x2, y2: ep.y2 }}
                      transition={{
                        opacity: lineOpacityTransition(0.7 + ci * 0.08),
                        x1: coordTransition,
                        y1: coordTransition,
                        x2: coordTransition,
                        y2: coordTransition,
                      }}
                    />
                  );
                })}
              </svg>

              {/* ── Center hub ────────────────────────────────────── */}
              <SkillNode
                x={CX} y={CY}
                size={CENTER_SIZE}
                label="Skills"
                type="center"
                isHovered={hoveredId === "center"}
                isSelected={false}
                isDimmed={isDimmed("center")}
                isCrossCutting={false}
                nodeIndex={centerIdx}
                isInView={isInView}
                entranceDelay={0}
                entranceComplete={sectionEntranceComplete}
                onMouseEnter={() => hoverNode("center", "center")}
                onMouseLeave={clearHover}
              />

              {/* ── Sub-hubs ──────────────────────────────────────── */}
              {HUBS.map((hub, hi) => {
                const hp = getHubPos(hub.id);
                return (
                  <SkillNode
                    key={hub.id}
                    x={hp.x} y={hp.y}
                    size={HUB_SIZE}
                    label={hub.name}
                    type="hub"
                    isHovered={hoveredId === hub.id}
                    isSelected={false}
                    isDimmed={isDimmed(hub.id)}
                    isCrossCutting={false}
                    nodeIndex={hubIndices[hub.id]}
                    isInView={isInView}
                    entranceDelay={180 + hi * 80}
                    entranceComplete={sectionEntranceComplete}
                    onMouseEnter={() => hoverNode(hub.id, "hub")}
                    onMouseLeave={clearHover}
                  />
                );
              })}

              {/* ── Regular skill nodes ───────────────────────────── */}
              {HUBS.map((hub, hi) =>
                skillsByHub[hub.id].map((skill, si) => {
                  const sp = getSkillPos(hub.id, si, skillsByHub[hub.id].length);
                  return (
                    <SkillNode
                      key={skill.id}
                      x={sp.x} y={sp.y}
                      size={SKILL_SIZE}
                      label={skill.name}
                      type="skill"
                      isHovered={hoveredId === skill.id}
                      isSelected={selectedSkillId === skill.id}
                      isDimmed={isDimmed(skill.id)}
                      isCrossCutting={false}
                      nodeIndex={skillIndices[skill.id]}
                      isInView={isInView}
                      entranceDelay={400 + hi * 100 + si * 55}
                      entranceComplete={sectionEntranceComplete}
                      onClick={() => toggleSkill(skill.id)}
                      onMouseEnter={() => hoverNode(skill.id, "skill")}
                      onMouseLeave={clearHover}
                    />
                  );
                })
              )}

              {/* ── Cross-cutting skill nodes ─────────────────────── */}
              {CROSS_CUT_META.map((cc, ci) => {
                const cp = getCrossCutPos(cc.angle);
                return (
                  <SkillNode
                    key={cc.id}
                    x={cp.x} y={cp.y}
                    size={SKILL_SIZE}
                    label={crossCutSkills.find((s) => s.id === cc.id)?.name ?? cc.id}
                    type="skill"
                    isHovered={hoveredId === cc.id}
                    isSelected={selectedSkillId === cc.id}
                    isDimmed={isDimmed(cc.id)}
                    isCrossCutting={true}
                    nodeIndex={crossCutIndices[cc.id]}
                    isInView={isInView}
                    entranceDelay={700 + ci * 80}
                    entranceComplete={sectionEntranceComplete}
                    onClick={() => toggleSkill(cc.id)}
                    onMouseEnter={() => hoverNode(cc.id, "crosscut")}
                    onMouseLeave={clearHover}
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Right column: vertical hairline + detail panel */}
          <div
            className="overflow-hidden"
            style={{
              height: H,
              borderLeft: "0.5px solid",
              borderColor: isExpanded ? "#0a0a0a" : "transparent",
              transition: "border-color 350ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <AnimatePresence mode="wait">
              {isExpanded && selectedSkill && (
                <motion.div
                  key={selectedSkillId}
                  className="h-full"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 32 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <SkillDetail
                    skill={selectedSkill}
                    onClose={() => setSelectedSkillId(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile / below-xl: structured list + detail below ─────────── */}
        <div className="xl:hidden">
          <div className="space-y-10">
            {HUBS.map((hub) => (
              <div key={hub.id}>
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold pb-3 border-b-[0.5px] border-neutral-900 mb-1">
                  {hub.name}
                </p>
                <div>
                  {skillsByHub[hub.id].map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={[
                        "w-full text-left py-3 text-sm font-medium border-b-[0.5px] border-neutral-200 transition-colors",
                        selectedSkillId === skill.id
                          ? "text-[#0066FF]"
                          : "text-neutral-900 hover:text-[#0066FF]",
                      ].join(" ")}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold pb-3 border-b-[0.5px] border-neutral-900 mb-1">
                Cross-Cutting
              </p>
              <div>
                {crossCutSkills.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={[
                      "w-full text-left py-3 text-sm font-medium border-b-[0.5px] border-neutral-200 border-dashed transition-colors",
                      selectedSkillId === skill.id
                        ? "text-[#0066FF]"
                        : "text-neutral-900 hover:text-[#0066FF]",
                    ].join(" ")}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedSkillId && selectedSkill && (
              <motion.div
                key={selectedSkillId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-16 border-t-[0.5px] border-neutral-900 pt-10"
              >
                <SkillDetail
                  skill={selectedSkill}
                  onClose={() => setSelectedSkillId(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
    </>
  );
}

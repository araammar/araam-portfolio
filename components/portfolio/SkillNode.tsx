"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

const ACCENT = "#0066FF";
const EASE = [0.22, 1, 0.36, 1] as const;

type NodeType = "center" | "hub" | "skill";

type Props = {
  x: number;
  y: number;
  size: number;
  label: string;
  type: NodeType;
  isHovered: boolean;
  isSelected: boolean;
  isDimmed: boolean;
  isCrossCutting: boolean;
  nodeIndex: number;
  isInView: boolean;
  entranceDelay: number; // ms
  entranceComplete: boolean; // breathing only starts after section entrance finishes
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function SkillNode({
  x,
  y,
  size,
  label,
  type,
  isHovered,
  isSelected,
  isDimmed,
  isCrossCutting,
  nodeIndex,
  isInView,
  entranceDelay,
  entranceComplete,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const [hasEntered, setHasEntered] = useState(false);

  const isHighlighted = isHovered || isSelected;

  // ── Outer: entrance opacity ──────────────────────────────────────────────
  const targetOpacity = !isInView ? 0 : isDimmed ? 0.2 : 1;
  const opacityTransition: Transition = !isInView
    ? { duration: 0.3 }
    : hasEntered
    ? { duration: 0.2, ease: "easeOut" as const }
    : { duration: 0.45, ease: EASE, delay: entranceDelay / 1000 };

  // ── Inner: scale states ──────────────────────────────────────────────────
  // Breathing is gated behind entranceComplete so it never fights the entrance.
  const breathPeriod = 2.8 + (nodeIndex % 11) * 0.2;

  let innerAnimate: { scale: number | number[] };
  let innerTransition: Record<string, unknown>;

  if (isDimmed) {
    innerAnimate = { scale: 1 };
    innerTransition = { duration: 0.2, ease: "easeOut" };
  } else if (isSelected) {
    innerAnimate = { scale: 1.15 };
    innerTransition = { duration: 0.2, ease: EASE };
  } else if (isHovered) {
    innerAnimate = { scale: 1.1 };
    innerTransition = { duration: 0.15, ease: EASE };
  } else if (entranceComplete) {
    // Idle breathing — only after all nodes have entered
    innerAnimate = { scale: [1, 1.02, 1] };
    innerTransition = {
      scale: {
        duration: breathPeriod,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    };
  } else {
    // Entrance still in progress — hold flat at scale 1
    innerAnimate = { scale: 1 };
    innerTransition = { duration: 0.3 };
  }

  // ── Visual styles ────────────────────────────────────────────────────────
  const borderStyle = isCrossCutting && !isHighlighted ? "dashed" : "solid";
  const borderColor = isHighlighted ? ACCENT : "#0a0a0a";
  const borderWidth = isHighlighted ? 1.5 : 0.5;
  const bgColor = isHighlighted ? "rgba(0,102,255,0.05)" : "#ffffff";
  const fontSize = type === "center" ? "11px" : type === "hub" ? "9px" : "8px";
  const fontWeight = type === "center" ? 700 : 600;
  const textColor = isHighlighted ? ACCENT : "#0a0a0a";

  return (
    // Outer: absolute position + entrance opacity only
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: x - size / 2,
        top: y - size / 2,
        zIndex: 10,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: targetOpacity }}
      transition={opacityTransition}
      onAnimationComplete={() => {
        if (isInView && !hasEntered) setHasEntered(true);
      }}
    >
      {/* Inner: scale + visual + interaction */}
      <motion.div
        className="w-full h-full flex items-center justify-center text-center rounded-full"
        style={{
          backgroundColor: bgColor,
          border: `${borderWidth}px ${borderStyle} ${borderColor}`,
          cursor: type === "skill" ? "pointer" : "default",
          padding: 6,
          transition:
            "background-color 180ms ease-out, border-color 180ms ease-out, border-style 180ms ease-out",
        }}
        animate={innerAnimate}
        transition={innerTransition}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role={type === "skill" ? "button" : undefined}
        tabIndex={type === "skill" ? 0 : undefined}
        aria-label={type === "skill" ? label : undefined}
        onKeyDown={
          type === "skill"
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
      >
        <span
          style={{
            fontSize,
            fontWeight,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            lineHeight: 1.25,
            color: textColor,
            transition: "color 180ms ease-out",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

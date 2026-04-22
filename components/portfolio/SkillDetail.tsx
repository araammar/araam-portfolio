"use client";

import type { Skill } from "@/content/portfolio/skills";

type Props = {
  skill: Skill;
  onClose: () => void;
};

export default function SkillDetail({ skill, onClose }: Props) {
  return (
    <div className="relative h-full flex flex-col pl-10 pr-8 pt-0 max-w-[500px]">
      <button
        onClick={onClose}
        aria-label="Close skill detail"
        className="absolute top-0 right-0 text-xl text-neutral-500 hover:text-neutral-900 transition-colors leading-none"
      >
        ×
      </button>

      {/* Header */}
      <div className="mb-8 flex-shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-[#0066FF] font-bold">
          Skill
        </span>
        <h3 className="text-2xl font-bold text-neutral-900 mt-2 leading-tight">
          {skill.name}
        </h3>
        <div
          className="mt-4 w-full"
          style={{ height: "0.5px", backgroundColor: "#0066FF", opacity: 0.3 }}
        />
      </div>

      {/* Fields - stacked vertically */}
      <div className="flex flex-col gap-7 overflow-y-auto flex-1">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
            What
          </p>
          <p className="text-sm text-neutral-900 leading-relaxed">
            {skill.what}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
            How
          </p>
          <p className="text-sm text-neutral-900 leading-relaxed">
            {skill.how}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
            Where
          </p>
          <p className="text-sm text-neutral-900 leading-relaxed">
            {skill.where}
          </p>
        </div>
      </div>
    </div>
  );
}

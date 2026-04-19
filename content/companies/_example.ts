import { CompanyConfig } from "@/lib/types";

const config: CompanyConfig = {
  slug: "_example",
  company: "Example Co.",
  role: "Software Engineering Intern",
  accent: "#6366F1",
  hero: "Working with Example Co.",
  heroSubtitle:
    "I want to help Example Co. build the future of developer tooling — here's why I'm the right fit.",
  whyCompany:
    "Example Co. is redefining how developers interact with infrastructure at scale. Their commitment to open-source and developer experience aligns directly with the work I care most about. I want to be part of the team building tools that millions of engineers rely on every day.",
  focusAreas: [
    "Distributed systems & API design",
    "Developer experience & tooling",
    "Performance optimization",
    "TypeScript & React ecosystems",
  ],
  whyUseful: [
    "Built and shipped production TypeScript/React apps with 10k+ users",
    "Contributed to open-source projects in the developer tooling space",
    "Strong systems thinking — comfortable moving between frontend, backend, and infra",
    "Fast learner who ramps quickly on new codebases and tech stacks",
  ],
  proof: [
    {
      title: "Project Alpha",
      url: "https://github.com/example/project-alpha",
      description:
        "A distributed task queue built in Go — handles 50k jobs/minute.",
    },
    {
      title: "Project Beta",
      url: "https://github.com/example/project-beta",
      description:
        "Open-source CLI tool for scaffolding TypeScript monorepos. 200+ GitHub stars.",
    },
  ],
  email: "aram@example.com",
};

export default config;

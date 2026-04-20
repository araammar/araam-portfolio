export type Skill = {
  id: string;
  name: string;
  hubId: string; // 'marketing' | 'web' | 'technical' | 'center'
  what: string;
  how: string;
  where: string;
};

export type Hub = {
  id: string;
  name: string;
};

export const HUBS: Hub[] = [
  { id: "marketing", name: "Marketing & Growth" },
  { id: "web", name: "Web & Design" },
  { id: "technical", name: "Technical & Systems" },
];

export const SKILLS: Skill[] = [
  // --- Marketing & Growth (4) ---
  {
    id: "campaign-strategy",
    name: "Campaign Strategy",
    hubId: "marketing",
    what: "Designing and owning performance-driven marketing campaigns from strategy through live execution.",
    how: "Audience research → positioning → creative brief → asset production → channel deployment → measurement. End-to-end ownership, not handoffs.",
    where: "TrendArt Marketing Agency (6+ active client accounts, 50% sign-up lift in six months)",
  },
  {
    id: "paid-ads",
    name: "Paid Ads",
    hubId: "marketing",
    what: "Running paid media on Meta and Google — performance-focused, not brand-vanity.",
    how: "Full funnel: audience building, creative testing, budget allocation, weekly performance reviews against CAC/ROAS targets.",
    where: "TrendArt (client campaigns), Eblon Dynamics (bilingual ad research for Middle Eastern markets)",
  },
  {
    id: "brand-positioning",
    name: "Brand Positioning",
    hubId: "marketing",
    what: "Finding the sharpest true claim a brand can make — and building everything around it.",
    how: "Competitor audit → audience research → positioning statement → downstream application across copy, design, and channels.",
    where: "TrendArt (generalist → performance-specialist repositioning), Eblon (built international trusted-supplier positioning from scratch)",
  },
  {
    id: "copywriting",
    name: "Copywriting",
    hubId: "marketing",
    what: "Writing copy that does a job — sells, persuades, or converts. Landing pages, outreach, positioning statements.",
    how: "Start with the claim, then the structure, then the polish. Avoid filler. Every sentence earns its spot.",
    where: "TrendArt client pages, Eblon positioning materials, personalized page system copy, sales outreach scripts",
  },

  // --- Web & Design (4) ---
  {
    id: "landing-pages",
    name: "Landing Pages",
    hubId: "web",
    what: "Building high-converting client landing pages, end-to-end.",
    how: "Copy-first approach: write the message, then design the structure around it. Every element CRO-justified. No decorative filler.",
    where: "TrendArt client work, this portfolio, the personalized page system (araammarmoud.com/for/[company])",
  },
  {
    id: "design-systems",
    name: "Design Systems",
    hubId: "web",
    what: "Building modular, scalable design systems that enforce consistency without rigidity.",
    how: "Swiss-influenced: restraint first, accent second, type scale doing most of the work. Systems that stay coherent when new components get added.",
    where: "This portfolio, the personalized page system (one config + one system powers unlimited per-company pages)",
  },
  {
    id: "visual-storytelling",
    name: "Visual Storytelling",
    hubId: "web",
    what: "Translating ideas into visual content that holds attention and moves someone closer to a decision.",
    how: "Hook-first structure, before/after patterns, proof placement, trust-signal positioning. Content designed for the funnel, not for the feed.",
    where: "TrendArt client content strategy, personalized page system hero mechanics, pitch deck visual direction",
  },
  {
    id: "cro-conversion",
    name: "CRO / Conversion",
    hubId: "web",
    what: "Reading a landing page like a funnel — identifying what kills conversion and what drives it.",
    how: "Above-the-fold audit → message clarity check → trust signal inventory → CTA positioning → friction points. First principles, not templates.",
    where: "TrendArt client sites, every /for/[company] page in the personalized page system",
  },

  // --- Technical & Systems (4) ---
  {
    id: "automation-data-tooling",
    name: "Automation & Data Tooling",
    hubId: "technical",
    what: "Building tools that turn manual research and outreach into ranked, repeatable systems.",
    how: "Python + Playwright for data collection, API integration across Google Places / Meta Ads Library / PageSpeed Insights, custom scoring models, pipeline architecture.",
    where: "The Sniper (lead-generation system spanning 4 external APIs, used to rank businesses by signal-based conversion opportunity)",
  },
  {
    id: "signal-detection",
    name: "Marketing Signal Detection",
    hubId: "technical",
    what: "Identifying measurable signals in the market that reveal opportunity — who is spending on ads, who has weak infrastructure, where the gaps are.",
    how: "Combining Meta Pixel detection, Google Ads Transparency Center research, tracking-infrastructure audits, and cross-market analysis to surface prospects most others miss.",
    where: "The Sniper (built entirely on this logic — scoring businesses by the mismatch between ad spend and conversion infrastructure)",
  },
  {
    id: "nextjs-react",
    name: "Next.js / React",
    hubId: "technical",
    what: "Shipping production React applications with Next.js App Router.",
    how: "TypeScript throughout, Server Components where it makes sense, Client Components where interactivity demands, Framer Motion for motion, Tailwind for styling.",
    where: "This portfolio, the personalized page system (config-driven platform generating tailored pages per company)",
  },
  {
    id: "lead-gen-sales",
    name: "Lead Gen & Sales Systems",
    hubId: "technical",
    what: "Building end-to-end sales and lead-gen infrastructure — from target identification through outreach through close-tracking.",
    how: "Score → enrich → outreach → track. Apollo/Hunter/Lusha for enrichment, The Sniper for ranking, structured trial-to-retainer commercial model.",
    where: "Running a commission-only sales partnership service with a team of reps; The Sniper powers prospect scoring",
  },

  // --- Cross-cutting skills — attached to center hub ---
  {
    id: "pitch-storytelling",
    name: "Pitch & Storytelling",
    hubId: "center",
    what: "Turning a complex situation into a clear, compelling narrative — for a pitch, a deck, an interview, or a campaign.",
    how: "Find the one thing that matters most, lead with it, structure the rest underneath. Visual + verbal + logical at once.",
    where: "UB Startup Boot Camp (2nd place, $2,500 prize pool), KGO/ABC7 interview prep, TrendArt client pitches, agency positioning work",
  },
  {
    id: "research-positioning",
    name: "Research & Positioning",
    hubId: "center",
    what: "Doing the research most people skip, then using it to find the unobvious positioning angle.",
    how: "Competitor ad audits, Meta Ads Library deep dives, cross-market research (Arabic + English), customer interview synthesis.",
    where: "Eblon Dynamics (Middle East heavy-machinery market), TrendArt (client positioning), The Sniper (built on positioning-gap detection)",
  },
];

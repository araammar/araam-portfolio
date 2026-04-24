import type { CompanyConfig } from "@/lib/types";

const config: CompanyConfig = {
  slug: "spothero",
  company: "SpotHero",
  role: "Sales Operations Intern, Summer 2026",
  accent: "#F26B2F",
  email: "araammarmoud@gmail.com",

  hero: "Working with SpotHero",
  heroSubtitle:
    "A summer in Chicago on Salesforce hygiene, operator segmentation, and the sales ops reps running through the Uber integration window.",

  focusAreas: [
    "Audit Salesforce data hygiene against the Uber acquisition integration timeline. The JD already names Salesforce field consolidation and data hygiene as possible projects, and merger integration (announced Feb 2026, closing H1 2026) makes that work existential, since operator contract data, pipeline stages, and CRM records need to map cleanly to Uber's systems or cause friction when SpotHero rolls into the Uber app.",
    "Segment the 11,000+ operator base by tier and motion. Independent single-lot owners, regional groups, and national chains like LAZ, SP+ Metropolis, Impark, and Ace Parking all need different touch cadences, deal desk process, and contract templates, and the CRM stages probably reflect that imperfectly today.",
    "Synthesize post-Flex Rates operator feedback into sales enablement. Flex Rates launched in 2023 as dynamic pricing for operators, and by 2026 there's enough adoption and non-adoption data to turn into concrete sales talking points and objection handling for the team selling SpotHero IQ.",
    "Map where operator onboarding stalls in the pipeline. First conversation to live-on-platform is the metric that drives operator growth, and the Uber integration is likely about to accelerate onboarding volume, so any stall point that's currently tolerated becomes a bottleneck under higher throughput.",
    "Build a reusable event operator playbook in the CRM. SpotHero leans heavily on event parking (World Series, college sports, USA Fencing, Cubs games historically), and the operator coordination that each event requires probably lives in someone's head or scattered tasks today, which is exactly the kind of process SpotHero IQ and a clean CRM should systematize.",
  ],

  whyUseful: [
    "Run a commission-only sales partnership business, including Apollo prospecting, CRM tracking, call scripts, and weekly follow-up cadences. Pipeline hygiene and stage definition work is the day job.",
    "Built The Sniper, a solo lead-gen system that scrapes Google Places, Meta Ad Library, and PageSpeed Insights to rank 12,000+ prospects across 3 verticals. Same qualification and segmentation logic applies to operator tiering at SpotHero's scale.",
    "Comfortable with AI/LLM tools in daily workflow. Use Claude and similar models for data cleaning, Excel formulas, and first-draft synthesis of user interviews, which the JD explicitly flags as a preferred skill.",
    "2nd Place at UB Startup Bootcamp in Fall 2025 ($2,500 prize), plus ongoing ownership of The Sniper and the config-driven portfolio platform that shipped this page. Comfortable owning ambiguous projects end to end, which is how the JD frames the summer.",
  ],

  whyCompany:
    "SpotHero sits at an unusually specific moment. The Uber acquisition announced in February 2026 is closing in H1, right as this internship starts, and sales operations is one of the functions where merger integration actually lives or dies. Underneath that, the business has 11,000+ operator partners, a dynamic pricing product (Flex Rates / SpotHero IQ) that's been live since 2023, and a digitization thesis for a $36B industry that's still only around 2% digital. The Salesforce field consolidation and operator segmentation work the JD describes all sit directly on that integration path. That's the kind of sales ops project I want to own end to end.",

  closing: "Happy to expand on any of this if helpful.",
};

export default config;

# Aram Marmoud — Portfolio

Personal portfolio and per-company tailored landing page system. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## How it works

Each company page is a statically generated Next.js route. The page reads a config file from `content/companies/[slug].ts` and renders it through a set of chunk components.

## Adding a new company

1. Create `content/companies/[slug].ts` (e.g. `stripe.ts`)
2. Export a default `CompanyConfig` object — copy `_example.ts` as a starting point
3. Visit `/for/[slug]` in dev, or it will be pre-rendered at build time

```ts
// content/companies/stripe.ts
import { CompanyConfig } from "@/lib/types";

const config: CompanyConfig = {
  slug: "stripe",
  company: "Stripe",
  role: "Software Engineering Intern",
  accent: "#635BFF",
  hero: "Working with Stripe",
  heroSubtitle: "...",
  whyCompany: "...",
  focusAreas: ["Payments infrastructure", "..."],
  whyUseful: ["..."],
  proof: [{ title: "My Project", url: "https://github.com/..." }],
  email: "justaramgg@gmail.com",
};

export default config;
```

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/` — placeholder homepage (name + email)
- `/for/_example` — example company page
- `/for/[slug]` — any configured company
- `/for/nonexistent` — redirects to `/`

## Deploying

Push to GitHub. Vercel auto-detects Next.js and deploys on every push to `main`. No extra config needed — `generateStaticParams` ensures all company pages are pre-rendered at build time.

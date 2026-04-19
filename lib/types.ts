export type CompanyConfig = {
  slug: string;
  company: string;
  role: string;
  accent: string; // hex color e.g. "#635BFF"
  hero: string; // e.g. "Working with Stripe"
  heroSubtitle: string;
  whyCompany: string; // 2-3 sentences
  focusAreas: string[]; // 3-5 items
  whyUseful: string[]; // 3-4 items
  proof: {
    title: string;
    url: string;
    description?: string;
  }[];
  email: string;
};

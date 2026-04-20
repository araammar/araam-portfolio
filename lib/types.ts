export type CompanyConfig = {
  // meta
  slug: string;
  company: string;
  role: string;
  accent: string;
  email: string;
  // section 1
  hero: string;
  heroSubtitle: string;
  // section 2
  focusAreas: string[];
  // section 3
  whyUseful: string[];
  // section 4 (optional — omit to hide the Proof section)
  proof?: { title: string; url: string; description?: string }[];
  // section 5
  whyCompany: string;
  // closing
  closing: string;
};

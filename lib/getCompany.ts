import { CompanyConfig } from "./types";

export async function getCompany(slug: string): Promise<CompanyConfig | null> {
  try {
    const mod = await import(`@/content/companies/${slug}`);
    return mod.default as CompanyConfig;
  } catch {
    return null;
  }
}

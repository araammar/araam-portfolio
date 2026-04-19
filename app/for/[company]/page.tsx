import { redirect } from "next/navigation";
import { getCompany } from "@/lib/getCompany";
import Hero from "@/components/chunks/Hero";
import WhyCompany from "@/components/chunks/WhyCompany";
import FocusAreas from "@/components/chunks/FocusAreas";
import WhyUseful from "@/components/chunks/WhyUseful";
import ProofClosing from "@/components/chunks/ProofClosing";
import Section from "@/components/ui/Section";
import { CompanyConfig } from "@/lib/types";
import { Metadata } from "next";
import { glob } from "glob";
import path from "path";

type PageProps = {
  params: { company: string };
};

export async function generateStaticParams() {
  const files = await glob("content/companies/*.ts", {
    cwd: process.cwd(),
  });
  return files.map((file) => ({
    company: path.basename(file, ".ts"),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const config = await getCompany(params.company);
  if (!config) return {};
  return {
    title: `${config.hero} | Aram Marmoud`,
    description: config.heroSubtitle,
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const config: CompanyConfig | null = await getCompany(params.company);

  if (!config) {
    redirect("/");
  }

  return (
    <main
      style={{ "--accent": config.accent } as React.CSSProperties}
      className="min-h-screen bg-white text-gray-900"
    >
      <Section>
        <Hero
          hero={config.hero}
          heroSubtitle={config.heroSubtitle}
          company={config.company}
          role={config.role}
          accent={config.accent}
        />
      </Section>

      <Section>
        <WhyCompany company={config.company} whyCompany={config.whyCompany} />
      </Section>

      <Section>
        <FocusAreas focusAreas={config.focusAreas} />
      </Section>

      <Section>
        <WhyUseful whyUseful={config.whyUseful} />
      </Section>

      <Section>
        <ProofClosing proof={config.proof} email={config.email} />
      </Section>
    </main>
  );
}

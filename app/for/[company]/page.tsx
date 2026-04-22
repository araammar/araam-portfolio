import { redirect } from "next/navigation";
import { getCompany } from "@/lib/getCompany";
import Hero from "@/components/chunks/Hero";
import WhyUseful from "@/components/chunks/WhyUseful";
import Proof from "@/components/chunks/Proof";
import WhyCompany from "@/components/chunks/WhyCompany";
import Closing from "@/components/chunks/Closing";
import Section from "@/components/ui/Section";
import TopNav from "@/components/shared/TopNav";
import Divider from "@/components/shared/Divider";
import ScrollReset from "@/components/shared/ScrollReset";
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
    title: `${config.hero} | Araam Marmoud`,
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
      className="bg-white text-[#0A0A0A]"
    >
      <ScrollReset />
      <TopNav />

      {/* Hero with split-reveal - FocusAreas renders behind the panels */}
      <Hero
        hero={config.hero}
        heroSubtitle={config.heroSubtitle}
        company={config.company}
        role={config.role}
        accent={config.accent}
        focusAreas={config.focusAreas}
      />

      {/* Document flow - no FocusAreas duplicate */}
      <Section className="py-24 md:py-32">
        <WhyUseful whyUseful={config.whyUseful} />
      </Section>

      {config.proof && config.proof.length > 0 && (
        <>
          <Divider />
          <Section className="py-24 md:py-32">
            <Proof proof={config.proof} />
          </Section>
        </>
      )}

      <Divider />

      <Section className="py-24 md:py-32">
        <WhyCompany company={config.company} whyCompany={config.whyCompany} />
      </Section>

      <Section className="py-24 md:py-32 pb-40 md:pb-60">
        <Closing closing={config.closing} email={config.email} />
      </Section>
    </main>
  );
}

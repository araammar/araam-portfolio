import { CompanyConfig } from "@/lib/types";

type HeroProps = Pick<
  CompanyConfig,
  "hero" | "heroSubtitle" | "company" | "role" | "accent"
>;

export default function Hero({ hero, heroSubtitle, company, role }: HeroProps) {
  return (
    <div>
      <h1>{hero}</h1>
      <p>{heroSubtitle}</p>
      <p>{role} @ {company}</p>
    </div>
  );
}

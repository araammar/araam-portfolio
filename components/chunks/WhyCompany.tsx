import { CompanyConfig } from "@/lib/types";

type WhyCompanyProps = Pick<CompanyConfig, "company" | "whyCompany">;

export default function WhyCompany({ company, whyCompany }: WhyCompanyProps) {
  return (
    <div>
      <h2>Why {company}?</h2>
      <p>{whyCompany}</p>
    </div>
  );
}

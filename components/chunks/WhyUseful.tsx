import { CompanyConfig } from "@/lib/types";

type WhyUsefulProps = Pick<CompanyConfig, "whyUseful">;

export default function WhyUseful({ whyUseful }: WhyUsefulProps) {
  return (
    <div>
      <h2>Why I&apos;d Be Useful</h2>
      <ul>
        {whyUseful.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

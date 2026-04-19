import { CompanyConfig } from "@/lib/types";

type FocusAreasProps = Pick<CompanyConfig, "focusAreas">;

export default function FocusAreas({ focusAreas }: FocusAreasProps) {
  return (
    <div>
      <h2>Focus Areas</h2>
      <ul>
        {focusAreas.map((area) => (
          <li key={area}>{area}</li>
        ))}
      </ul>
    </div>
  );
}

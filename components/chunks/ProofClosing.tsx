import { CompanyConfig } from "@/lib/types";

type ProofClosingProps = Pick<CompanyConfig, "proof" | "email">;

export default function ProofClosing({ proof, email }: ProofClosingProps) {
  return (
    <div>
      <h2>Proof of Work</h2>
      <ul>
        {proof.map((item) => (
          <li key={item.url}>
            <a href={item.url}>{item.title}</a>
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ul>
      <p>
        Get in touch: <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  );
}

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`w-full max-w-3xl mx-auto px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}

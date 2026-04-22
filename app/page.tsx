import type { Metadata } from "next";
import PortfolioContent from "@/components/portfolio/PortfolioContent";

export const metadata: Metadata = {
  title: "Araam Marmoud · Portfolio",
  description:
    "Business student who builds marketing systems, web tools, and lead-generation infrastructure.",
};

export default function Home() {
  return <PortfolioContent />;
}

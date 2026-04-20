"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopNav() {
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setOnHero(window.scrollY < window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50">
      <Link
        href="/"
        className="text-sm font-medium tracking-wide underline underline-offset-4 decoration-1 hover:opacity-60 active:opacity-60 transition-opacity p-3"
        style={{
          color: onHero ? "#ffffff" : "#0A0A0A",
          transition: "color 0.3s, opacity 0.2s",
        }}
      >
        Portfolio
      </Link>
    </div>
  );
}

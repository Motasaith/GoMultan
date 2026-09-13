"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@/components/icons";

export default function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = progress > 0.08;
  const circumference = 2 * Math.PI * 22;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-30 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lg transition-all duration-500 hover:bg-clay hover:text-white ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24" cy="24" r="22" fill="none" stroke="var(--color-clay)" strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <ArrowUp size={18} />
    </button>
  );
}

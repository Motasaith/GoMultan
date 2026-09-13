"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

// Countdown to the end of the current week (Sunday midnight), recomputed each week.
function nextDeadline() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const deadline = nextDeadline();
    const tick = () => setLeft(Math.max(0, deadline - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return left;
}

export default function DealBanner() {
  const left = useCountdown();
  const s = Math.floor((left ?? 0) / 1000);
  const units = [
    { label: "Days", value: Math.floor(s / 86400) },
    { label: "Hours", value: Math.floor((s % 86400) / 3600) },
    { label: "Mins", value: Math.floor((s % 3600) / 60) },
    { label: "Secs", value: s % 60 },
  ];

  return (
    <section className="relative overflow-hidden bg-indigo text-white">
      {/* Decorative tile pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id="tiles" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 4 52 28 28 52 4 28Z" fill="none" stroke="#fff" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="6" fill="none" stroke="#fff" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tiles)" />
      </svg>

      <div className="container-x relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-0">
        <Reveal className="space-y-6 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">Deal of the week</p>
          <h2 className="section-title text-4xl font-semibold leading-tight md:text-5xl">
            Camel Skin Lamps <br />
            <span className="text-gold">Save 15%</span> This Week
          </h2>
          <p className="max-w-md text-white/75">
            Each lamp is shaped, painted and finished by hand in Multan&apos;s old city. Limited pieces available.
          </p>
          <div className="flex gap-3" aria-live="off">
            {units.map((u) => (
              <div key={u.label} className="w-[4.5rem] rounded border border-white/20 bg-white/5 py-3 text-center backdrop-blur">
                <span className="block font-display text-3xl font-semibold tabular-nums">
                  {left === null ? "--" : String(u.value).padStart(2, "0")}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-white/60">{u.label}</span>
              </div>
            ))}
          </div>
          <Link href="/product/camel-skin-lamp" className="btn btn-clay">Grab the deal</Link>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto aspect-square w-full max-w-md md:my-12">
          <div className="absolute inset-6 animate-[spin_30s_linear_infinite] rounded-full border-2 border-dashed border-gold/40" />
          <div className="absolute inset-12 overflow-hidden rounded-full">
            <Image src="https://picsum.photos/seed/gomultan-deal/700/700" alt="Camel skin lamp" fill sizes="400px" className="object-cover" />
          </div>
          <span className="absolute right-6 top-10 grid size-24 animate-bounce place-items-center rounded-full bg-clay text-center font-display text-xl font-semibold leading-tight [animation-duration:2.5s]">
            -15%
          </span>
        </Reveal>
      </div>
    </section>
  );
}

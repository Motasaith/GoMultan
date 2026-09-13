"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { slides } from "@/lib/data";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/icons";

const INTERVAL = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      className="relative h-[560px] overflow-hidden md:h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${active ? "z-10 opacity-100" : "z-0 opacity-0"}`}
            style={{ background: s.tone }}
            aria-hidden={!active}
          >
            <div className="absolute inset-y-0 right-0 w-full overflow-hidden md:w-[58%]">
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width:768px) 58vw, 100vw"
                className={`object-cover ${active ? "animate-ken-burns" : ""}`}
              />
              <div
                className="absolute inset-0 md:bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${s.tone} 0%, transparent 35%)` }}
              />
              <div className="absolute inset-0 bg-black/35 md:hidden" />
            </div>

            <div className="container-x relative flex h-full items-center">
              <div className="max-w-xl text-white md:text-ink">
                {active && (
                  <>
                    <p className="mb-4 animate-fade-up text-sm font-semibold uppercase tracking-[0.3em] text-gold md:text-clay [animation-delay:200ms]">
                      {s.eyebrow}
                    </p>
                    <h1 className="section-title animate-fade-up text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-7xl [animation-delay:350ms]">
                      {s.title}
                    </h1>
                    <p className="mt-5 max-w-md animate-fade-up text-lg text-white/90 md:text-muted [animation-delay:500ms]">
                      {s.text}
                    </p>
                    <div className="mt-8 animate-fade-up [animation-delay:650ms]">
                      <Link href={s.href} className="btn btn-dark group/btn" tabIndex={active ? 0 : -1}>
                        {s.cta}
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {[
        { dir: -1, label: "Previous slide", icon: <ChevronLeft size={22} />, pos: "left-4" },
        { dir: 1, label: "Next slide", icon: <ChevronRight size={22} />, pos: "right-4" },
      ].map((b) => (
        <button
          key={b.label}
          aria-label={b.label}
          onClick={() => go(b.dir)}
          className={`absolute top-1/2 z-20 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/80 backdrop-blur transition hover:bg-ink hover:text-white md:grid ${b.pos}`}
        >
          {b.icon}
        </button>
      ))}

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="relative h-1 w-12 overflow-hidden rounded-full bg-ink/20"
          >
            {i === index && (
              <span
                key={`${index}-${paused}`}
                className="absolute inset-y-0 left-0 bg-clay"
                style={{
                  width: paused ? "100%" : undefined,
                  animation: paused ? undefined : `hero-progress ${INTERVAL}ms linear forwards`,
                }}
              />
            )}
          </button>
        ))}
      </div>
      <style>{`@keyframes hero-progress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState<string | null>(null);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex gap-3 sm:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            className={`relative h-28 w-24 overflow-hidden bg-sand transition ${
              active === i ? "ring-2 ring-ink" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Hover to zoom: the image scales from the cursor position */}
      <div
        className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-sand"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        onMouseLeave={() => setOrigin(null)}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === active ? name : ""}
            fill
            priority={i === 0}
            sizes="(min-width:1024px) 45vw, 100vw"
            className={`object-cover transition-[opacity,transform] duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            style={{ transformOrigin: origin ?? "center", transform: origin && i === active ? "scale(1.8)" : "scale(1)" }}
          />
        ))}
      </div>
    </div>
  );
}

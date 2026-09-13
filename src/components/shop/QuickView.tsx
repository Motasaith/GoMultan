"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { formatPrice } from "@/lib/data";
import { useStore } from "@/lib/store";
import { CloseIcon } from "@/components/icons";
import AddToCartForm from "./AddToCartForm";
import Rating from "./Rating";

export default function QuickView() {
  const { quickView: p, openQuickView } = useStore();

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && openQuickView(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [p, openQuickView]);

  return (
    <div
      className={`fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/60 p-4 transition-opacity duration-300 ${
        p ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={() => openQuickView(null)}
      role="dialog"
      aria-modal="true"
    >
      {p && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-4xl animate-fade-up bg-white md:grid-cols-2"
        >
          <button
            aria-label="Close"
            onClick={() => openQuickView(null)}
            className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white transition hover:rotate-90 hover:bg-ink hover:text-white"
          >
            <CloseIcon size={20} />
          </button>
          <div className="relative aspect-[4/5] bg-sand">
            <Image src={p.images[0]} alt={p.name} fill sizes="(min-width:768px) 448px, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-muted">{p.category}</p>
            <h2 className="font-display text-3xl font-semibold">{p.name}</h2>
            <Rating value={p.rating} reviews={p.reviews} />
            <p className="space-x-3 text-2xl">
              <span className="font-semibold text-clay">{formatPrice(p.price)}</span>
              {p.oldPrice && <del className="text-lg text-muted">{formatPrice(p.oldPrice)}</del>}
            </p>
            <p className="text-sm leading-relaxed text-muted">{p.description}</p>
            <AddToCartForm product={p} onAdded={() => openQuickView(null)} />
            <Link
              href={`/product/${p.slug}`}
              onClick={() => openQuickView(null)}
              className="link-underline self-start text-sm font-medium"
            >
              View full details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { products, type Product } from "@/lib/data";
import ProductCard from "@/components/shop/ProductCard";
import SectionHeading from "./SectionHeading";

const tabs: { key: Product["tags"][number] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New Arrivals" },
  { key: "popular", label: "Popular" },
  { key: "sale", label: "On Sale" },
  { key: "top", label: "Top Rated" },
];

export default function ProductTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("all");
  const list = products.filter((p) => active === "all" || p.tags.includes(active)).slice(0, 8);

  return (
    <section className="bg-cream py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Trending now" title="Loved by Our Customers" />

        <div className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-3" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              onClick={() => setActive(t.key)}
              className={`relative pb-2 text-sm font-semibold uppercase tracking-widest transition-colors ${
                active === t.key ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 origin-center bg-clay transition-transform duration-300 ${
                  active === t.key ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Key on the tab so the grid replays its entrance animation on every switch */}
        <div key={active} className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <div key={p.slug} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop" className="btn btn-outline">View all products</Link>
        </div>
      </div>
    </section>
  );
}

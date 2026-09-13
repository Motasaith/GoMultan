"use client";

import { useMemo, useState } from "react";
import { categories, formatPrice, products } from "@/lib/data";
import { CloseIcon, FilterIcon } from "@/components/icons";
import ProductCard from "./ProductCard";

type Filters = { category: string; tag: string; q: string };

const sorts = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a: number, b: number) => a - b },
  "price-desc": { label: "Price: high to low", fn: (a: number, b: number) => b - a },
} as const;

const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)) / 1000) * 1000;

export default function ShopView({ initial }: { initial: Filters }) {
  const [filters, setFilters] = useState<Filters>(initial);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<keyof typeof sorts>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  // Keep local filters in sync when the header search/menu changes the URL.
  const [prevInitial, setPrevInitial] = useState(initial);
  if (initial.category !== prevInitial.category || initial.tag !== prevInitial.tag || initial.q !== prevInitial.q) {
    setPrevInitial(initial);
    setFilters(initial);
  }

  const list = useMemo(() => {
    const q = filters.q.toLowerCase();
    return products
      .filter((p) => !filters.category || p.category === filters.category)
      .filter((p) => !filters.tag || p.tags.includes(filters.tag as never))
      .filter((p) => !q || p.name.toLowerCase().includes(q))
      .filter((p) => p.price <= maxPrice)
      .sort((a, b) => (sort === "featured" ? 0 : sorts[sort].fn(a.price, b.price)));
  }, [filters, maxPrice, sort]);

  const set = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));
  const activeChips = [
    filters.category && { label: categories.find((c) => c.slug === filters.category)?.name, clear: () => set({ category: "" }) },
    filters.tag && { label: filters.tag, clear: () => set({ tag: "" }) },
    filters.q && { label: `"${filters.q}"`, clear: () => set({ q: "" }) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  const sidebar = (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 border-b border-line pb-3 font-display text-lg font-semibold">Categories</h3>
        <ul className="space-y-1">
          {[{ slug: "", name: "All products", count: products.length }, ...categories].map((c) => (
            <li key={c.slug}>
              <button
                onClick={() => set({ category: c.slug })}
                className={`flex w-full justify-between py-1.5 text-sm transition-all hover:translate-x-1 hover:text-clay ${
                  filters.category === c.slug ? "font-semibold text-clay" : "text-muted"
                }`}
              >
                {c.name}
                <span>({c.slug ? products.filter((p) => p.category === c.slug).length : c.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 border-b border-line pb-3 font-display text-lg font-semibold">Price</h3>
        <input
          type="range"
          min={500}
          max={MAX_PRICE}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-clay"
          aria-label="Maximum price"
        />
        <p className="mt-2 text-sm text-muted">Up to <span className="font-semibold text-ink">{formatPrice(maxPrice)}</span></p>
      </div>

      <div>
        <h3 className="mb-4 border-b border-line pb-3 font-display text-lg font-semibold">Collections</h3>
        <div className="flex flex-wrap gap-2">
          {["new", "popular", "sale", "top"].map((t) => (
            <button
              key={t}
              onClick={() => set({ tag: filters.tag === t ? "" : t })}
              className={`border px-3 py-1.5 text-xs uppercase tracking-widest transition ${
                filters.tag === t ? "border-clay bg-clay text-white" : "border-line hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="container-x grid gap-10 py-16 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">{sidebar}</aside>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden ${panelOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setPanelOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[86%] overflow-y-auto bg-white p-6 transition-transform duration-500 lg:hidden ${
          panelOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="mb-6 ml-auto block" aria-label="Close filters" onClick={() => setPanelOpen(false)}>
          <CloseIcon size={24} />
        </button>
        {sidebar}
      </aside>

      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-4">
            <button onClick={() => setPanelOpen(true)} className="flex items-center gap-2 text-sm font-medium lg:hidden">
              <FilterIcon size={18} /> Filters
            </button>
            <p className="text-sm text-muted">Showing {list.length} of {products.length} products</p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            className="h-10 border border-line bg-white px-3 text-sm outline-none focus:border-ink"
            aria-label="Sort products"
          >
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {activeChips.map((c) => (
              <button key={c.label} onClick={c.clear} className="flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-sm capitalize hover:bg-clay hover:text-white">
                {c.label} <CloseIcon size={14} />
              </button>
            ))}
          </div>
        )}

        {list.length === 0 ? (
          <p className="py-20 text-center text-muted">No products match these filters.</p>
        ) : (
          <div key={JSON.stringify(filters) + sort} className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {list.map((p, i) => (
              <div key={p.slug} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import Rating from "./Rating";

export default function ProductInfoTabs({ product }: { product: Product }) {
  const tabs = ["Description", "Details", `Reviews (${product.reviews})`];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-8 border-b border-line" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`relative pb-4 font-display text-xl transition-colors ${active === i ? "text-ink" : "text-muted hover:text-ink"}`}
          >
            {t}
            <span className={`absolute inset-x-0 -bottom-px h-0.5 bg-clay transition-transform duration-300 ${active === i ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>

      <div key={active} className="max-w-3xl animate-fade-up py-8 leading-relaxed text-muted">
        {active === 0 && (
          <div className="space-y-4">
            <p>{product.description}</p>
            <p>
              Every GoMultan piece is sourced directly from the workshop that made it. Small variations in colour and
              pattern are a sign of handwork, not a flaw.
            </p>
          </div>
        )}
        {active === 1 && (
          <table className="w-full text-sm">
            <tbody className="divide-y divide-line">
              {[
                ["Category", product.category],
                ["Made in", "Multan, Punjab"],
                ["Sizes", product.sizes?.join(", ") ?? "One size"],
                ["Care", "Gentle hand wash or wipe clean"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <th className="w-40 py-3 text-left font-medium text-ink">{k}</th>
                  <td className="py-3 capitalize">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {active === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-semibold text-ink">{product.rating.toFixed(1)}</span>
              <Rating value={product.rating} reviews={product.reviews} size={18} />
            </div>
            <p>Reviews will appear here once you connect a backend.</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { BagIcon, HeartIcon, MinusIcon, PlusIcon } from "@/components/icons";

export default function AddToCartForm({ product, onAdded }: { product: Product; onAdded?: () => void }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [color, setColor] = useState(product.colors[0]);
  const wished = wishlist.includes(product.slug);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Colour</p>
        <div className="flex gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              aria-label={`Colour ${c}`}
              onClick={() => setColor(c)}
              className={`size-8 rounded-full ring-offset-2 transition ${color === c ? "ring-2 ring-ink" : "ring-1 ring-line"}`}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {product.sizes && (
        <div>
          <p className="mb-2 text-sm font-medium">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-11 border px-3 py-2 text-sm transition ${
                  size === s ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="flex h-12 items-center border border-line">
          <button aria-label="Decrease" className="px-3 hover:text-clay" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <MinusIcon size={16} />
          </button>
          <span className="w-10 text-center">{qty}</span>
          <button aria-label="Increase" className="px-3 hover:text-clay" onClick={() => setQty((q) => q + 1)}>
            <PlusIcon size={16} />
          </button>
        </div>
        <button
          className="btn btn-dark h-12 flex-1 justify-center"
          onClick={() => {
            addToCart(product.slug, qty, size);
            onAdded?.();
          }}
        >
          <BagIcon size={16} /> Add to bag
        </button>
        <button
          aria-label="Wishlist"
          onClick={() => toggleWishlist(product.slug)}
          className={`grid size-12 place-items-center border transition ${
            wished ? "border-clay text-clay" : "border-line hover:border-ink"
          }`}
        >
          <HeartIcon size={18} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

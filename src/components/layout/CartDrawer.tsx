"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { formatPrice, getProduct } from "@/lib/data";
import { useStore } from "@/lib/store";
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";

const FREE_SHIPPING = 5000;

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartTotal, setQty, removeFromCart } = useStore();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  const progress = Math.min(100, (cartTotal / FREE_SHIPPING) * 100);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-xl font-semibold">Your Bag</h2>
          <button aria-label="Close cart" onClick={() => setCartOpen(false)} className="transition hover:rotate-90">
            <CloseIcon size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-sand text-clay">
              <BagIcon size={34} />
            </span>
            <p className="text-muted">Your bag is empty.</p>
            <Link href="/shop" onClick={() => setCartOpen(false)} className="btn btn-dark">Start shopping</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-4 text-sm">
              {progress >= 100 ? (
                <p>You&apos;ve unlocked <strong className="text-clay">free delivery</strong>.</p>
              ) : (
                <p>Add <strong>{formatPrice(FREE_SHIPPING - cartTotal)}</strong> more for free delivery.</p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
                <div className="h-full bg-clay transition-[width] duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {cart.map((line) => {
                const p = getProduct(line.slug);
                if (!p) return null;
                return (
                  <li key={line.slug + line.size} className="flex gap-4 py-5">
                    <Link href={`/product/${p.slug}`} onClick={() => setCartOpen(false)} className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand">
                      <Image src={p.images[0]} alt={p.name} fill sizes="80px" className="object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link href={`/product/${p.slug}`} onClick={() => setCartOpen(false)} className="text-sm font-medium hover:text-clay">
                          {p.name}
                        </Link>
                        <button aria-label="Remove" onClick={() => removeFromCart(p.slug, line.size)} className="text-muted hover:text-clay">
                          <TrashIcon size={16} />
                        </button>
                      </div>
                      {line.size && <span className="text-xs text-muted">Size: {line.size}</span>}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-line">
                          <button aria-label="Decrease" className="p-1.5 hover:text-clay" onClick={() => setQty(p.slug, line.qty - 1, line.size)}>
                            <MinusIcon size={14} />
                          </button>
                          <span className="w-8 text-center text-sm">{line.qty}</span>
                          <button aria-label="Increase" className="p-1.5 hover:text-clay" onClick={() => setQty(p.slug, line.qty + 1, line.size)}>
                            <PlusIcon size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">{formatPrice(p.price * line.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-3 border-t border-line p-6">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <Link href="/cart" onClick={() => setCartOpen(false)} className="btn btn-outline w-full justify-center">View bag</Link>
              <Link href="/cart" onClick={() => setCartOpen(false)} className="btn btn-clay w-full justify-center">Checkout</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

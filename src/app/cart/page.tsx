"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, getProduct } from "@/lib/data";
import { useStore } from "@/lib/store";
import PageBanner from "@/components/PageBanner";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";

export default function CartPage() {
  const { cart, cartTotal, setQty, removeFromCart } = useStore();
  const shipping = cartTotal >= 5000 || cartTotal === 0 ? 0 : 250;

  return (
    <>
      <PageBanner title="Your Bag" crumbs={[{ label: "Bag" }]} />
      <section className="container-x py-16">
        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mb-6 text-muted">Your bag is empty.</p>
            <Link href="/shop" className="btn btn-dark">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <ul className="divide-y divide-line border-y border-line">
              {cart.map((line) => {
                const p = getProduct(line.slug);
                if (!p) return null;
                return (
                  <li key={line.slug + line.size} className="flex animate-fade-up gap-5 py-6">
                    <Link href={`/product/${p.slug}`} className="relative h-32 w-28 shrink-0 overflow-hidden bg-sand">
                      <Image src={p.images[0]} alt={p.name} fill sizes="112px" className="object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <Link href={`/product/${p.slug}`} className="font-medium hover:text-clay">{p.name}</Link>
                        <p className="text-sm text-muted">{formatPrice(p.price)}{line.size && ` · Size ${line.size}`}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border border-line">
                          <button aria-label="Decrease" className="p-2 hover:text-clay" onClick={() => setQty(p.slug, line.qty - 1, line.size)}><MinusIcon size={14} /></button>
                          <span className="w-8 text-center">{line.qty}</span>
                          <button aria-label="Increase" className="p-2 hover:text-clay" onClick={() => setQty(p.slug, line.qty + 1, line.size)}><PlusIcon size={14} /></button>
                        </div>
                        <span className="w-24 text-right font-semibold">{formatPrice(p.price * line.qty)}</span>
                        <button aria-label="Remove" onClick={() => removeFromCart(p.slug, line.size)} className="text-muted hover:text-clay"><TrashIcon size={18} /></button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit space-y-4 bg-cream p-8">
              <h2 className="font-display text-2xl font-semibold">Order Summary</h2>
              <div className="flex justify-between text-muted"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between text-muted"><span>Delivery</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
              <div className="flex justify-between border-t border-line pt-4 text-lg font-semibold"><span>Total</span><span>{formatPrice(cartTotal + shipping)}</span></div>
              <button className="btn btn-clay w-full justify-center" onClick={() => alert("Connect your payment provider here.")}>
                Proceed to checkout
              </button>
              <Link href="/shop" className="link-underline block text-center text-sm">Continue shopping</Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

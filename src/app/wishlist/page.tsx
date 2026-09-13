"use client";

import Link from "next/link";
import { getProduct } from "@/lib/data";
import { useStore } from "@/lib/store";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/shop/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p) => p !== undefined);

  return (
    <>
      <PageBanner title="Wishlist" crumbs={[{ label: "Wishlist" }]} />
      <section className="container-x py-16">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mb-6 text-muted">You haven&apos;t saved anything yet. Tap the heart on any product to save it here.</p>
            <Link href="/shop" className="btn btn-dark">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p, i) => (
              <div key={p.slug} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

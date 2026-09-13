"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { BagIcon, EyeIcon, HeartIcon } from "@/components/icons";
import Rating from "./Rating";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist, openQuickView } = useStore();
  const wished = wishlist.includes(product.slug);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const actions = [
    {
      label: wished ? "Remove from wishlist" : "Add to wishlist",
      icon: <HeartIcon size={17} fill={wished ? "currentColor" : "none"} />,
      onClick: () => toggleWishlist(product.slug),
      active: wished,
    },
    { label: "Quick view", icon: <EyeIcon size={17} />, onClick: () => openQuickView(product), active: false },
  ];

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            className="scale-110 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-clay px-2 py-1 text-[11px] font-semibold text-white">-{discount}%</span>
          )}
          {product.tags.includes("new") && (
            <span className="bg-indigo px-2 py-1 text-[11px] font-semibold uppercase text-white">New</span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {actions.map((a, i) => (
            <button
              key={a.label}
              aria-label={a.label}
              title={a.label}
              onClick={a.onClick}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`grid size-10 place-items-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-ink hover:text-white lg:translate-x-14 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 ${
                a.active ? "text-clay" : ""
              }`}
            >
              {a.icon}
            </button>
          ))}
        </div>

        <button
          onClick={() => addToCart(product.slug, 1, product.sizes?.[Math.floor(product.sizes.length / 2)])}
          className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center gap-2 bg-ink text-xs font-semibold uppercase tracking-widest text-white transition-all duration-400 hover:bg-clay lg:translate-y-full lg:group-hover:translate-y-0"
        >
          <BagIcon size={16} /> Add to bag
        </button>
      </div>

      <div className="pt-4 text-center">
        <p className="text-xs uppercase tracking-widest text-muted">{product.category}</p>
        <h3 className="mt-1 font-medium">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-clay">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1.5 flex justify-center">
          <Rating value={product.rating} reviews={product.reviews} size={13} />
        </div>
        <p className="mt-1.5 space-x-2">
          <span className="font-semibold text-clay">{formatPrice(product.price)}</span>
          {product.oldPrice && <del className="text-sm text-muted">{formatPrice(product.oldPrice)}</del>}
        </p>
      </div>
    </article>
  );
}

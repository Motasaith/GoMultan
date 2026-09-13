"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "./data";

export type CartLine = { slug: string; qty: number; size?: string };

type Store = {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  quickView: Product | null;
  cartCount: number;
  cartTotal: number;
  addToCart: (slug: string, qty?: number, size?: string) => void;
  setQty: (slug: string, qty: number, size?: string) => void;
  removeFromCart: (slug: string, size?: string) => void;
  toggleWishlist: (slug: string) => void;
  setCartOpen: (open: boolean) => void;
  openQuickView: (p: Product | null) => void;
};

const StoreContext = createContext<Store | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const same = (l: CartLine, slug: string, size?: string) => l.slug === slug && l.size === size;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, openQuickView] = useState<Product | null>(null);

  useEffect(() => {
    // Restore saved cart after hydration so server and client markup match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(read("gm-cart", []));
    setWishlist(read("gm-wishlist", []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("gm-cart", JSON.stringify(cart));
      localStorage.setItem("gm-wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [cart, wishlist, loaded]);

  const addToCart = useCallback((slug: string, qty = 1, size?: string) => {
    setCart((c) =>
      c.some((l) => same(l, slug, size))
        ? c.map((l) => (same(l, slug, size) ? { ...l, qty: l.qty + qty } : l))
        : [...c, { slug, qty, size }],
    );
    setCartOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number, size?: string) => {
    setCart((c) =>
      qty <= 0 ? c.filter((l) => !same(l, slug, size)) : c.map((l) => (same(l, slug, size) ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, size?: string) => {
    setCart((c) => c.filter((l) => !same(l, slug, size)));
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));
  }, []);

  const value = useMemo<Store>(() => {
    const cartCount = cart.reduce((n, l) => n + l.qty, 0);
    const cartTotal = cart.reduce((n, l) => n + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return {
      cart, wishlist, cartOpen, quickView, cartCount, cartTotal,
      addToCart, setQty, removeFromCart, toggleWishlist, setCartOpen, openQuickView,
    };
  }, [cart, wishlist, cartOpen, quickView, addToCart, setQty, removeFromCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, categories, navLinks } from "@/lib/data";
import { useStore } from "@/lib/store";
import {
  BagIcon, ChevronDown, CloseIcon, HeartIcon, MenuIcon, PhoneIcon, SearchIcon, SocialIcon, UserIcon,
} from "@/components/icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label={`${brand.name} home`}>
      <span className="grid size-9 place-items-center rounded-full bg-clay text-white transition-transform duration-500 group-hover:rotate-[360deg]">
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Zm0 4 4.5 2.8v6.4L12 18l-4.5-2.8V8.8L12 6Z" fill="currentColor" />
        </svg>
      </span>
      <span className={`font-display text-2xl font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Go<span className="text-clay">Multan</span>
      </span>
    </Link>
  );
}

function CountBadge({ n }: { n: number }) {
  if (!n) return null;
  return (
    <span
      key={n}
      className="absolute -right-2 -top-1.5 grid size-[18px] animate-[fade-up_.4s_ease] place-items-center rounded-full bg-clay text-[10px] font-semibold text-white"
    >
      {n}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close menus whenever the route changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (cat) params.set("category", cat);
    router.push(`/shop?${params}`);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-indigo text-[13px] text-white/85 md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <p className="flex items-center gap-2">
            <PhoneIcon size={14} /> {brand.phone}
            <span className="mx-3 h-3 w-px bg-white/25" />
            Free delivery across Pakistan on orders over Rs 5,000
          </p>
          <div className="flex items-center gap-4">
            {(["facebook", "instagram", "youtube", "tiktok"] as const).map((s) => (
              <a key={s} href="#" aria-label={s} className="transition hover:-translate-y-0.5 hover:text-gold">
                <SocialIcon name={s} size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-[box-shadow,border-color] duration-300 ${
          scrolled ? "border-transparent shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]" : "border-line"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon size={24} />
            </button>
            <Logo />
          </div>

          <nav className="hidden lg:block" aria-label="Main">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href.split("?")[0]);
                return (
                  <li key={l.label} className="group relative">
                    <Link
                      href={l.href}
                      className={`relative flex items-center gap-1 py-7 text-[15px] font-medium transition-colors hover:text-clay ${
                        active ? "text-clay" : ""
                      }`}
                    >
                      {l.label}
                      {l.children && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                      <span
                        className={`absolute bottom-5 left-0 h-0.5 bg-clay transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                    {l.children && (
                      <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="grid grid-cols-[1fr_220px] gap-6 border-t-2 border-clay bg-white p-6 shadow-2xl">
                          <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {l.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className="block py-2 text-sm text-muted transition-all hover:translate-x-1.5 hover:text-clay"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link href="/shop?tag=sale" className="relative flex flex-col justify-end overflow-hidden rounded bg-sand p-4">
                            <span className="text-xs font-semibold uppercase tracking-widest text-clay">Limited time</span>
                            <span className="font-display text-xl font-semibold">Eid Sale up to 40%</span>
                            <span className="mt-2 text-sm underline">Shop now</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <button aria-label="Search" onClick={() => setSearchOpen((s) => !s)} className="transition hover:text-clay">
              {searchOpen ? <CloseIcon size={22} /> : <SearchIcon size={22} />}
            </button>
            <Link href="/account" aria-label="Account" className="hidden transition hover:text-clay sm:block">
              <UserIcon size={22} />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="relative transition hover:text-clay">
              <HeartIcon size={22} />
              <CountBadge n={wishlist.length} />
            </Link>
            <button aria-label="Cart" onClick={() => setCartOpen(true)} className="relative transition hover:text-clay">
              <BagIcon size={22} />
              <CountBadge n={cartCount} />
            </button>
          </div>
        </div>

        {/* Search panel */}
        <div
          className={`grid overflow-hidden border-line bg-cream transition-[grid-template-rows,border] duration-400 ${
            searchOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <form onSubmit={submitSearch} className="container-x flex flex-col gap-3 py-5 sm:flex-row">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="h-12 border border-line bg-white px-3 text-sm outline-none focus:border-ink sm:w-48"
                aria-label="Category"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search kurtas, khussa, pottery…"
                className="h-12 flex-1 border border-line bg-white px-4 text-sm outline-none focus:border-ink"
                autoFocus={searchOpen}
              />
              <button className="btn btn-dark h-12 justify-center">
                <SearchIcon size={16} /> Search
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-5">
          <Logo />
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <CloseIcon size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          {navLinks.map((l, i) => (
            <div
              key={l.label}
              className={`border-b border-line transition-all duration-500 ${
                mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? `${100 + i * 50}ms` : "0ms" }}
            >
              <Link href={l.href} className="block py-3.5 font-medium">{l.label}</Link>
              {l.children && (
                <div className="grid grid-cols-2 pb-3">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} className="py-1.5 text-sm text-muted">{c.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="border-t border-line p-5 text-sm text-muted">
          <p>{brand.phone}</p>
          <p>{brand.email}</p>
        </div>
      </aside>
    </>
  );
}

import Link from "next/link";
import { brand, categories } from "@/lib/data";
import { MailIcon, PhoneIcon, PinIcon, SocialIcon } from "@/components/icons";
import { Logo } from "./Header";

const columns = [
  {
    title: "Shop",
    links: categories.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` })),
  },
  {
    title: "Help",
    links: [
      { label: "Track your order", href: "/contact" },
      { label: "Shipping & delivery", href: "/contact" },
      { label: "Returns & exchanges", href: "/contact" },
      { label: "Size guide", href: "/contact" },
      { label: "FAQs", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/blog" },
      { label: "Meet the artisans", href: "/blog" },
      { label: "Journal", href: "/blog" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

const payments = ["Visa", "Mastercard", "JazzCash", "Easypaisa", "COD"];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/70">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed">
            {brand.tagline}. We work directly with artisans across South Punjab to bring their craft to your doorstep.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><PinIcon size={18} className="shrink-0 text-clay" />{brand.address}</li>
            <li className="flex gap-3"><PhoneIcon size={18} className="shrink-0 text-clay" />{brand.phone}</li>
            <li className="flex gap-3"><MailIcon size={18} className="shrink-0 text-clay" />{brand.email}</li>
          </ul>
          <div className="flex gap-2">
            {(["facebook", "instagram", "youtube", "tiktok"] as const).map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:-translate-y-1 hover:border-clay hover:bg-clay hover:text-white"
              >
                <SocialIcon name={s} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-5 font-display text-lg font-semibold text-white">{col.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="inline-block transition-all hover:translate-x-1 hover:text-clay">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {payments.map((p) => (
              <li key={p} className="rounded border border-white/15 px-2.5 py-1 text-xs text-white/80">{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

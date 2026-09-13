import Link from "next/link";
import { ChevronRight } from "@/components/icons";

export default function PageBanner({ title, crumbs }: { title: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="relative overflow-hidden bg-sand">
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id="banner-tiles" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M24 2 46 24 24 46 2 24Z" fill="none" stroke="#1b1f24" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#banner-tiles)" />
      </svg>
      <div className="container-x relative py-14 text-center md:py-20">
        <h1 className="section-title animate-fade-up text-4xl font-semibold md:text-5xl">{title}</h1>
        <nav aria-label="Breadcrumb" className="mt-4 flex animate-fade-up items-center justify-center gap-2 text-sm text-muted [animation-delay:150ms]">
          <Link href="/" className="hover:text-clay">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight size={14} />
              {c.href ? <Link href={c.href} className="hover:text-clay">{c.label}</Link> : <span className="text-ink">{c.label}</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import SectionHeading from "./SectionHeading";

export default function CategoryShowcase() {
  const [women, men, ...rest] = categories;

  return (
    <section className="container-x py-20">
      <SectionHeading eyebrow="Shop by category" title="Find Your Next Favourite" />

      <div className="grid gap-5 md:grid-cols-2">
        {[women, men].map((c, i) => (
          <Reveal key={c.slug} delay={i * 120}>
            <Link href={`/shop?category=${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-sand">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              {/* Inner frame that draws in on hover */}
              <span className="absolute inset-5 scale-95 border border-white/70 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm uppercase tracking-[0.25em] text-white/80">{c.count} products</p>
                <h3 className="section-title mt-1 text-4xl font-semibold">{c.name}&apos;s Collection</h3>
                <span className="mt-4 inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-semibold uppercase tracking-widest">
                  Shop now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {rest.map((c, i) => (
          <Reveal key={c.slug} delay={i * 100}>
            <Link href={`/shop?category=${c.slug}`} className="group block text-center">
              <div className="relative aspect-square overflow-hidden rounded-full bg-sand">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                />
                <span className="absolute inset-0 rounded-full ring-0 ring-clay ring-inset transition-all duration-300 group-hover:ring-4" />
              </div>
              <h3 className="mt-4 font-semibold transition-colors group-hover:text-clay">{c.name}</h3>
              <p className="text-sm text-muted">{c.count} items</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

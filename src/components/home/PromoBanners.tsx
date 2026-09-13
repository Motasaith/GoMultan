import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const promos = [
  {
    eyebrow: "Summer Lawn",
    title: "Breezy Prints for Hot Days",
    href: "/shop?category=women",
    image: "https://picsum.photos/seed/gomultan-promo-1/900/700",
    span: "lg:row-span-2",
    ratio: "aspect-[4/3] lg:aspect-auto lg:h-full",
  },
  {
    eyebrow: "Just Landed",
    title: "Hand-Tooled Leather",
    href: "/shop?category=accessories",
    image: "https://picsum.photos/seed/gomultan-promo-2/900/500",
    span: "",
    ratio: "aspect-[16/9]",
  },
  {
    eyebrow: "Clearance",
    title: "End of Season, Up to 50% Off",
    href: "/shop?tag=sale",
    image: "https://picsum.photos/seed/gomultan-promo-3/900/500",
    span: "",
    ratio: "aspect-[16/9]",
  },
];

export default function PromoBanners() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-5 lg:grid-cols-2 lg:grid-rows-2">
        {promos.map((p, i) => (
          <Reveal key={p.title} delay={i * 120} className={p.span}>
            <Link href={p.href} className={`group relative block overflow-hidden bg-sand ${p.ratio}`}>
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              {/* Light sweep on hover */}
              <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-1000 group-hover:left-[150%]" />
              <div className="absolute inset-y-0 left-0 flex max-w-xs flex-col justify-center p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{p.eyebrow}</p>
                <h3 className="section-title mt-2 text-3xl font-semibold leading-tight">{p.title}</h3>
                <span className="mt-4 self-start border-b-2 border-white pb-1 text-xs font-semibold uppercase tracking-widest transition-colors group-hover:border-gold group-hover:text-gold">
                  Shop now
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

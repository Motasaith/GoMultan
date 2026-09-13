import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice, getCategory, getProduct, products } from "@/lib/data";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import AddToCartForm from "@/components/shop/AddToCartForm";
import ProductCard from "@/components/shop/ProductCard";
import ProductGallery from "@/components/shop/ProductGallery";
import ProductInfoTabs from "@/components/shop/ProductInfoTabs";
import Rating from "@/components/shop/Rating";
import SectionHeading from "@/components/home/SectionHeading";
import { RefreshIcon, ShieldIcon, TruckIcon } from "@/components/icons";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.description } : {};
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const fill = products.filter((p) => p.slug !== product.slug && !related.includes(p)).slice(0, 4 - related.length);

  return (
    <>
      <PageBanner
        title={product.name}
        crumbs={[
          { label: "Shop", href: "/shop" },
          { label: category?.name ?? product.category, href: `/shop?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <p className="animate-fade-up text-xs uppercase tracking-[0.25em] text-clay">{category?.name}</p>
          <h1 className="section-title animate-fade-up text-4xl font-semibold [animation-delay:80ms]">{product.name}</h1>
          <div className="animate-fade-up [animation-delay:160ms]">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
          </div>
          <p className="animate-fade-up space-x-3 text-3xl [animation-delay:240ms]">
            <span className="font-semibold text-clay">{formatPrice(product.price)}</span>
            {product.oldPrice && <del className="text-xl text-muted">{formatPrice(product.oldPrice)}</del>}
          </p>
          <p className="animate-fade-up leading-relaxed text-muted [animation-delay:320ms]">{product.description}</p>
          <div className="animate-fade-up border-y border-line py-6 [animation-delay:400ms]">
            <AddToCartForm product={product} />
          </div>
          <ul className="grid gap-3 text-sm sm:grid-cols-3">
            {[
              { icon: TruckIcon, text: "Ships in 2 to 4 days" },
              { icon: RefreshIcon, text: "14-day exchanges" },
              { icon: ShieldIcon, text: "Artisan certified" },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-2 text-muted">
                <f.icon size={20} className="text-clay" /> {f.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pb-16">
        <ProductInfoTabs product={product} />
      </section>

      <section className="bg-cream py-20">
        <div className="container-x">
          <SectionHeading eyebrow="You may also like" title="Related Products" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {[...related, ...fill].map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

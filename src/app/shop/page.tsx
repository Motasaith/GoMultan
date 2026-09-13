import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ShopView from "@/components/shop/ShopView";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

  return (
    <>
      <PageBanner title="Shop" crumbs={[{ label: "Shop" }]} />
      <ShopView
        initial={{ category: one(sp.category), tag: one(sp.tag), q: one(sp.q) }}
      />
    </>
  );
}

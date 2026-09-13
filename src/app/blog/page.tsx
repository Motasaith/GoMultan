import type { Metadata } from "next";
import { posts } from "@/lib/data";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { PostCard } from "@/components/home/BlogSection";

export const metadata: Metadata = { title: "Journal" };

export default function BlogPage() {
  return (
    <>
      <PageBanner title="Journal" crumbs={[{ label: "Journal" }]} />
      <section className="container-x grid gap-x-8 gap-y-14 py-16 md:grid-cols-2 lg:grid-cols-3">
        {[...posts, ...posts].map((post, i) => (
          <Reveal key={`${post.slug}-${i}`} delay={(i % 3) * 120}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </section>
    </>
  );
}

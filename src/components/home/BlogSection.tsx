import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export function PostCard({ post }: { post: (typeof posts)[number] }) {
  const [day, month] = formatDate(post.date).split(" ");
  return (
    <article className="group">
      <Link href="/blog" className="relative block aspect-[3/2] overflow-hidden bg-sand">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width:768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 bg-white px-3 py-2 text-center leading-none shadow">
          <span className="block font-display text-2xl font-semibold">{day}</span>
          <span className="text-[11px] uppercase tracking-widest text-muted">{month}</span>
        </span>
      </Link>
      <div className="pt-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-clay">
          {post.category} <span className="text-muted">· by {post.author}</span>
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
          <Link href="/blog" className="link-underline">{post.title}</Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}

export default function BlogSection() {
  return (
    <section className="container-x py-20">
      <SectionHeading eyebrow="From the journal" title="Stories, Craft & Style" />
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 120}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

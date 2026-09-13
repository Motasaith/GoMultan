import Reveal from "@/components/Reveal";

export default function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-clay">
        <span className="h-px w-8 bg-clay" />
        {eyebrow}
        <span className="h-px w-8 bg-clay" />
      </p>
      <h2 className="section-title text-3xl font-semibold md:text-[2.6rem] md:leading-tight">{title}</h2>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </Reveal>
  );
}

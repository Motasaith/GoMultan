const words = ["Handloom", "Blue Pottery", "Khussa", "Ajrak", "Camel Skin Lamps", "Multani Mitti", "Chikankari", "Ralli Quilts"];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-line bg-sand py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl italic text-ink/80 md:text-3xl">
            {w}
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-clay">
              <path d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

import { StarIcon } from "@/components/icons";

export default function Rating({ value, reviews, size = 14 }: { value: number; reviews?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} filled={i <= Math.round(value)} size={size} />
        ))}
      </div>
      {reviews !== undefined && <span className="text-xs text-muted">({reviews})</span>}
    </div>
  );
}

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps, children: React.ReactNode) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) =>
  base(p, <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const HeartIcon = (p: IconProps) =>
  base(p, <path d="M12 20s-7-4.4-9.2-8.6C1.3 8.4 3.2 5 6.6 5c2 0 3.4 1.1 4.4 2.5C12 6.1 13.4 5 15.4 5c3.4 0 5.3 3.4 3.8 6.4C19 15.6 12 20 12 20Z" />);
export const BagIcon = (p: IconProps) =>
  base(p, <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>);
export const UserIcon = (p: IconProps) =>
  base(p, <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>);
export const MenuIcon = (p: IconProps) =>
  base(p, <><path d="M3 6h18" /><path d="M3 12h12" /><path d="M3 18h18" /></>);
export const CloseIcon = (p: IconProps) =>
  base(p, <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>);
export const ChevronDown = (p: IconProps) => base(p, <path d="m6 9 6 6 6-6" />);
export const ChevronLeft = (p: IconProps) => base(p, <path d="m15 6-6 6 6 6" />);
export const ChevronRight = (p: IconProps) => base(p, <path d="m9 6 6 6-6 6" />);
export const ArrowUp = (p: IconProps) => base(p, <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>);
export const ArrowRight = (p: IconProps) => base(p, <><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>);
export const EyeIcon = (p: IconProps) =>
  base(p, <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>);
export const TruckIcon = (p: IconProps) =>
  base(p, <><path d="M2 6h11v10H2z" /><path d="M13 9h4l4 4v3h-8" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>);
export const ShieldIcon = (p: IconProps) =>
  base(p, <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>);
export const RefreshIcon = (p: IconProps) =>
  base(p, <><path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4" /></>);
export const HeadsetIcon = (p: IconProps) =>
  base(p, <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>);
export const PhoneIcon = (p: IconProps) =>
  base(p, <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />);
export const MailIcon = (p: IconProps) =>
  base(p, <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
export const PinIcon = (p: IconProps) =>
  base(p, <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>);
export const PlusIcon = (p: IconProps) => base(p, <><path d="M12 5v14" /><path d="M5 12h14" /></>);
export const MinusIcon = (p: IconProps) => base(p, <path d="M5 12h14" />);
export const TrashIcon = (p: IconProps) =>
  base(p, <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></>);
export const FilterIcon = (p: IconProps) =>
  base(p, <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>);
export const CheckIcon = (p: IconProps) => base(p, <path d="m5 12 5 5 9-10" />);

export const StarIcon = ({ filled = true, size = 14 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z"
      fill={filled ? "var(--color-gold)" : "#e5e7eb"}
    />
  </svg>
);

// Simple original social glyphs
export const SocialIcon = ({ name, size = 16 }: { name: "facebook" | "instagram" | "youtube" | "tiktok"; size?: number }) => {
  const paths = {
    facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" fill="currentColor" />,
    instagram: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
      </g>
    ),
    youtube: (
      <g>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" />
        <path d="m10 9 5 3-5 3V9Z" fill="#fff" />
      </g>
    ),
    tiktok: <path d="M14 3h3a4 4 0 0 0 4 4v3a7 7 0 0 1-4-1.3V15a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 14 15V3Z" fill="currentColor" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

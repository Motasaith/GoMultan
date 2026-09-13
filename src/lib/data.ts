// All store content lives here. Swap the image URLs for your own files in
// /public (e.g. "/images/products/kurta-1.jpg") when your photos are ready.

const img = (seed: string, w = 700, h = 875) =>
  `https://picsum.photos/seed/gomultan-${seed}/${w}/${h}`;

export type Category = {
  slug: string;
  name: string;
  image: string;
  count: number;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  images: [string, string];
  tags: ("new" | "popular" | "sale" | "top")[];
  colors: string[];
  sizes?: string[];
  description: string;
};

export type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  tone: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
};

export const brand = {
  name: "GoMultan",
  tagline: "Crafted in the City of Saints",
  phone: "+92 300 000 0000",
  email: "hello@gomultan.pk",
  address: "Hussain Agahi Road, Multan, Punjab, Pakistan",
};

export const slides: Slide[] = [
  {
    eyebrow: "New Season Arrivals",
    title: "Heritage Weaves, Modern Cuts",
    text: "Handloom fabrics from South Punjab, tailored for everyday comfort.",
    cta: "Shop Collection",
    href: "/shop?category=women",
    image: img("hero-1", 1600, 900),
    tone: "#f4e6d4",
  },
  {
    eyebrow: "Up to 40% Off",
    title: "The Blue Pottery Edit",
    text: "Hand-glazed ceramics inspired by the tiles of Multan's shrines.",
    cta: "Explore Home Decor",
    href: "/shop?category=home",
    image: img("hero-2", 1600, 900),
    tone: "#dde8f0",
  },
  {
    eyebrow: "Made by Local Artisans",
    title: "Khussa Made for Walking",
    text: "Soft leather, hand embroidered, and built to last for years.",
    cta: "Shop Footwear",
    href: "/shop?category=footwear",
    image: img("hero-3", 1600, 900),
    tone: "#efe3dc",
  },
];

export const categories: Category[] = [
  { slug: "women", name: "Women", image: img("cat-women", 800, 1000), count: 48 },
  { slug: "men", name: "Men", image: img("cat-men", 800, 1000), count: 36 },
  { slug: "footwear", name: "Footwear", image: img("cat-shoes", 600, 600), count: 22 },
  { slug: "home", name: "Home Decor", image: img("cat-home", 600, 600), count: 30 },
  { slug: "accessories", name: "Accessories", image: img("cat-acc", 600, 600), count: 41 },
  { slug: "beauty", name: "Beauty", image: img("cat-beauty", 600, 600), count: 18 },
];

const p = (
  n: number,
  slug: string,
  name: string,
  category: string,
  price: number,
  extra: Partial<Product> = {},
): Product => ({
  slug,
  name,
  category,
  price,
  rating: 4 + ((n * 7) % 10) / 10,
  reviews: 8 + ((n * 13) % 90),
  images: [img(`p${n}a`), img(`p${n}b`)],
  tags: [],
  colors: ["#1e3a5f", "#c2410c", "#e7dccb"],
  description:
    "Thoughtfully made in small batches by artisans in Multan. Breathable, durable and finished by hand, so every piece is a little different from the next.",
  ...extra,
});

export const products: Product[] = [
  p(1, "embroidered-lawn-kurta", "Embroidered Lawn Kurta", "women", 4200, {
    oldPrice: 5600, tags: ["sale", "popular"], sizes: ["XS", "S", "M", "L", "XL"],
  }),
  p(2, "cotton-shalwar-kameez", "Classic Cotton Shalwar Kameez", "men", 6500, {
    tags: ["new", "top"], sizes: ["S", "M", "L", "XL"],
  }),
  p(3, "handmade-khussa", "Handmade Leather Khussa", "footwear", 3200, {
    oldPrice: 3900, tags: ["sale", "popular"], sizes: ["6", "7", "8", "9", "10"],
  }),
  p(4, "blue-pottery-vase", "Blue Pottery Vase", "home", 2800, { tags: ["top", "popular"] }),
  p(5, "ajrak-shawl", "Printed Ajrak Shawl", "accessories", 2400, { tags: ["new"] }),
  p(6, "camel-skin-lamp", "Camel Skin Table Lamp", "home", 7800, {
    oldPrice: 9200, tags: ["sale", "top"],
  }),
  p(7, "silver-jhumka", "Oxidised Silver Jhumkas", "accessories", 1900, { tags: ["popular"] }),
  p(8, "mens-waistcoat", "Textured Wool Waistcoat", "men", 5400, {
    tags: ["new"], sizes: ["S", "M", "L", "XL"],
  }),
  p(9, "rose-attar", "Rose Attar, 12ml", "beauty", 1500, {
    oldPrice: 1800, tags: ["sale", "top"],
  }),
  p(10, "chikankari-dupatta", "Chikankari Dupatta", "women", 3100, { tags: ["popular", "new"] }),
  p(11, "peshawari-chappal", "Peshawari Chappal", "footwear", 4600, {
    tags: ["top"], sizes: ["7", "8", "9", "10", "11"],
  }),
  p(12, "ralli-cushion", "Ralli Quilt Cushion Cover", "home", 1700, {
    oldPrice: 2200, tags: ["sale", "new"],
  }),
  p(13, "multani-clay-mask", "Multani Mitti Face Mask", "beauty", 850, { tags: ["popular"] }),
  p(14, "leather-tote", "Hand-Tooled Leather Tote", "accessories", 6900, { tags: ["top", "new"] }),
  p(15, "silk-kurta-men", "Raw Silk Kurta", "men", 7200, {
    oldPrice: 8500, tags: ["sale"], sizes: ["M", "L", "XL"],
  }),
  p(16, "block-print-frock", "Block Print Frock", "women", 5200, {
    tags: ["new", "top"], sizes: ["S", "M", "L"],
  }),
];

export const posts: Post[] = [
  {
    slug: "story-of-multani-blue-pottery",
    title: "The Story Behind Multan's Blue Pottery",
    excerpt: "Cobalt, turquoise and white: how a centuries-old craft is kept alive by a handful of families.",
    category: "Craft",
    date: "2026-08-28",
    author: "Ayesha Khan",
    image: img("blog-1", 900, 600),
  },
  {
    slug: "styling-a-lawn-kurta",
    title: "Five Ways to Style a Lawn Kurta This Summer",
    excerpt: "From office to evening chai, one versatile piece can carry you through the whole day.",
    category: "Style",
    date: "2026-08-14",
    author: "Hamza Qureshi",
    image: img("blog-2", 900, 600),
  },
  {
    slug: "caring-for-leather-khussa",
    title: "How to Care for Your Leather Khussa",
    excerpt: "A simple routine that keeps hand-stitched footwear soft and bright for years.",
    category: "Guides",
    date: "2026-07-30",
    author: "Sana Malik",
    image: img("blog-3", 900, 600),
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    children: categories.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` })),
  },
  { label: "New In", href: "/shop?tag=new" },
  { label: "Sale", href: "/shop?tag=sale" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const formatPrice = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

export const getProduct = (slug: string) => products.find((x) => x.slug === slug);
export const getCategory = (slug: string) => categories.find((x) => x.slug === slug);

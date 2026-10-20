export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export type Size = (typeof SIZES)[number];

export type Product = {
  slug: string;
  name: string;
  price: number;
  soldOut: boolean;
  category: string;
  blurb: string;
  description: string;
  details: string[];
  image: string;
  alt: string;
};

export type Collection = {
  slug: string;
  name: string;
  text: string;
  image: string;
  productSlugs: string[];
};

export const FREE_SHIPPING_AT = 120;
export const SHIPPING_FLAT = 8;

export const products: Product[] = [
  {
    slug: "hoodie",
    name: "Hoodie",
    price: 88,
    soldOut: true,
    category: "Outerwear",
    blurb: "Heavyweight fleece with the arched mark on the chest and the horizon on the back.",
    description:
      "Cut from heavyweight fleece and built to live in. The chest carries the arched club mark. The back opens into a range, a ringed globe, and the phases of the moon — the horizon you train toward.",
    details: [
      "Heavyweight cotton fleece",
      "Arched chest mark and prompt",
      "Back print: range, ringed globe, moon phases",
      "Kangaroo pocket, rib cuff and hem",
      "Dropped shoulder",
    ],
    image: asset("images/hoodie.jpg"),
    alt: "Deep Tech Lifting Club hoodie, front and back with detail close-ups",
  },
  {
    slug: "tank-top",
    name: "Tank Top",
    price: 32,
    soldOut: true,
    category: "Training",
    blurb: "Mesh racerback. A small prompt on the chest. The name runs down the spine.",
    description:
      "A mesh racerback for the work itself. A small prompt sits on the chest. Down the spine, the name runs vertical, so it reads when you are facing the bar.",
    details: [
      "Open mesh, racerback cut",
      "Chest prompt mark",
      "Vertical spine wordmark",
      "Curved hem",
      "Interior neck label",
    ],
    image: asset("images/tank.jpg"),
    alt: "Deep Tech Lifting Club mesh tank, front, back, and worn views",
  },
  {
    slug: "shorts",
    name: "Shorts",
    price: 48,
    soldOut: true,
    category: "Training",
    blurb: "Training short with a white drawcord, zip pocket, and contour panels down both sides.",
    description:
      "A training short with a white drawcord, a zip pocket, and contour-line panels down both sides. The club mark sits low on the leg. Built to move and then stay on.",
    details: [
      "Elastic waist with white drawcord",
      "Contour print on the side panels",
      "Rear zip pocket",
      "Club mark on the leg",
      "Side vent at the hem",
    ],
    image: asset("images/shorts.jpg"),
    alt: "Deep Tech Lifting Club training shorts, front, back, and worn views",
  },
  {
    slug: "pants",
    name: "Pants",
    price: 68,
    soldOut: true,
    category: "Training",
    blurb: "Straight training pant. White drawcord, rear zip pocket, contour print on the outer leg.",
    description:
      "A straight training pant for the warm-up and the walk out. Elastic waist, white drawcord, a zip pocket at the back, and the same contour print running the outer seam.",
    details: [
      "Elastic waist with white drawcord",
      "Contour print along the outer leg",
      "Rear zip pocket",
      "Club mark on the thigh",
      "Straight leg",
    ],
    image: asset("images/pants.jpg"),
    alt: "Deep Tech Lifting Club training pants, front, back, and worn views",
  },
];

export const collections: Collection[] = [
  {
    slug: "essentials",
    name: "Essentials",
    text: "The four pieces the club is built on. Fleece, mesh, short, pant.",
    image: asset("images/hoodie.jpg"),
    productSlugs: ["hoodie", "tank-top", "shorts", "pants"],
  },
  {
    slug: "training",
    name: "Training",
    text: "What you wear for the work. Light where the session gets hot.",
    image: asset("images/shorts.jpg"),
    productSlugs: ["tank-top", "shorts", "pants"],
  },
  {
    slug: "outer-layer",
    name: "Outer Layer",
    text: "Heavy fleece for the walk in and the walk out.",
    image: asset("images/hoodie.jpg"),
    productSlugs: ["hoodie"],
  },
];

export function money(amount: number) {
  return `$${amount}`;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT;
}

export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export type Size = (typeof SIZES)[number];

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  soldOut: boolean;
  category: string;
  blurb: string;
  description: string;
  details: string[];
  image: string;
  images?: string[];
  alt: string;
  sizeNote?: string;
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

const pieces: Product[] = [
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

const setFull = pieces.reduce((sum, piece) => sum + piece.price, 0);
const setPrice = Math.round(setFull * 85) / 100;

export const products: Product[] = [
  {
    slug: "the-set",
    name: "The Set",
    price: setPrice,
    compareAt: setFull,
    soldOut: false,
    category: "Bundle",
    blurb: "Hoodie, tank, shorts, and pants. Fifteen percent off, and it goes in the bag now.",
    description:
      "The four pieces in one size. Heavyweight hoodie, mesh tank, training shorts, and pants. Fifteen percent off the line when they ship together.",
    details: [
      "Hoodie, mesh tank, training shorts, and pants",
      "One size for every piece",
      "15% off the four",
      "Available now",
    ],
    image: asset("images/hoodie.jpg"),
    images: pieces.map((piece) => piece.image),
    alt: "Deep Tech Lifting Club set: hoodie, mesh tank, training shorts, and pants",
    sizeNote: "One size for every piece in the set.",
  },
  ...pieces,
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
  const cents = Math.round(amount * 100);
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

export function catalogPieces() {
  return products.filter((product) => product.slug !== "the-set");
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

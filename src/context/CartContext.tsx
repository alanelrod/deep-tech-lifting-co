import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, shippingFor } from "../data/products";

export type CartLine = {
  slug: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "dtlc-cart";
const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line &&
        typeof line.slug === "string" &&
        typeof line.size === "string" &&
        typeof line.qty === "number" &&
        line.qty > 0 &&
        getProduct(line.slug)
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readCart);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const subtotal = lines.reduce((sum, line) => {
      const product = getProduct(line.slug);
      return sum + (product ? product.price * line.qty : 0);
    }, 0);
    const shipping = shippingFor(subtotal);
    return {
      lines,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      open,
      setOpen,
      add: (slug, size, qty = 1) => {
        setLines((prev) => {
          const index = prev.findIndex((line) => line.slug === slug && line.size === size);
          if (index === -1) return [...prev, { slug, size, qty }];
          return prev.map((line, i) => (i === index ? { ...line, qty: line.qty + qty } : line));
        });
        setOpen(true);
      },
      setQty: (slug, size, qty) => {
        setLines((prev) =>
          qty <= 0
            ? prev.filter((line) => !(line.slug === slug && line.size === size))
            : prev.map((line) => (line.slug === slug && line.size === size ? { ...line, qty } : line))
        );
      },
      remove: (slug, size) => {
        setLines((prev) => prev.filter((line) => !(line.slug === slug && line.size === size)));
      },
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

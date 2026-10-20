import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProduct, money } from "../data/products";

type FormState = {
  name: string;
  email: string;
  address: string;
  city: string;
  region: string;
  postal: string;
};

type Order = FormState & {
  id: string;
  lines: { name: string; size: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  address: "",
  city: "",
  region: "",
  postal: "",
};

const FIELDS: { key: keyof FormState; label: string; auto: string }[] = [
  { key: "name", label: "Full name", auto: "name" },
  { key: "email", label: "Email", auto: "email" },
  { key: "address", label: "Street address", auto: "street-address" },
  { key: "city", label: "City", auto: "address-level2" },
  { key: "region", label: "State / region", auto: "address-level1" },
  { key: "postal", label: "Postal code", auto: "postal-code" },
];

export function Checkout() {
  const { lines, subtotal, shipping, total, clear } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [order, setOrder] = useState<Order | null>(() => {
    try {
      const raw = sessionStorage.getItem("dtlc-order");
      return raw ? (JSON.parse(raw) as Order) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    document.title = order ? "Request received — Deep Tech Lifting Club" : "Checkout — Deep Tech Lifting Club";
  }, [order]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    (Object.keys(EMPTY) as (keyof FormState)[]).forEach((key) => {
      if (!form[key].trim()) nextErrors[key] = "Required.";
    });
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a real email.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || lines.length === 0) return;

    const placed: Order = {
      ...form,
      id: `DTLC-${Date.now().toString().slice(-6)}`,
      lines: lines.flatMap((line) => {
        const product = getProduct(line.slug);
        if (!product) return [];
        return [{ name: product.name, size: line.size, qty: line.qty, price: product.price * line.qty }];
      }),
      subtotal,
      shipping,
      total,
    };
    sessionStorage.setItem("dtlc-order", JSON.stringify(placed));
    clear();
    setOrder(placed);
    window.scrollTo(0, 0);
  }

  if (order && lines.length === 0) {
    return (
      <div className="wrap checkout">
        <header className="page-head">
          <p className="kicker">Checkout</p>
          <h1>Request {order.id}</h1>
          <p className="lede">
            Saved in this browser for {order.name}. No payment was taken and nothing will ship — this is a preview of the club shop.
          </p>
        </header>
        <ul className="confirm-lines">
          {order.lines.map((line) => (
            <li key={`${line.name}-${line.size}`}>
              <span>
                {line.name} · Size {line.size} · Qty {line.qty}
              </span>
              <span>{money(line.price)}</span>
            </li>
          ))}
        </ul>
        <p className="confirm-total">Total {money(order.total)}</p>
        <Link to="/shop" className="btn">
          Back to the collection <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="wrap missing">
        <p className="kicker">Checkout</p>
        <h1>The bag is empty.</h1>
        <Link to="/shop" className="btn">
          Shop collection <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap checkout">
      <header className="page-head">
        <p className="kicker">Checkout</p>
        <h1>Where it ships</h1>
        <p className="lede">No card. This preview stores the request in your browser and stops there.</p>
      </header>

      <div className="checkout-grid">
        <form className="stack" onSubmit={submit} noValidate>
          {FIELDS.map((field) => (
            <label key={field.key} className="field">
              <span>{field.label}</span>
              <input
                autoComplete={field.auto}
                value={form[field.key]}
                aria-invalid={Boolean(errors[field.key])}
                onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
              />
              {errors[field.key] && <em className="form-error">{errors[field.key]}</em>}
            </label>
          ))}
          <button className="btn" type="submit">
            Place request · {money(total)} <span aria-hidden="true">→</span>
          </button>
        </form>

        <aside className="summary">
          <h2>Bag</h2>
          <ul>
            {lines.map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              return (
                <li key={`${line.slug}-${line.size}`}>
                  <img src={product.image} alt="" />
                  <span>
                    <strong>
                      {product.name} · {line.size}
                    </strong>
                    <em>Qty {line.qty}</em>
                  </span>
                  <span>{money(product.price * line.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="totals">
            <div>
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : money(shipping)}</span>
            </div>
            <div className="totals-strong">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

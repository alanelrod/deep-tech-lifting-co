import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FREE_SHIPPING_AT, getProduct, money } from "../data/products";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, subtotal, shipping, total, count } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (!open) return null;

  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);

  return (
    <div className="drawer-root">
      <button className="backdrop" aria-label="Close bag" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Bag">
        <header className="drawer-head">
          <h2>Bag{count > 0 ? ` (${count})` : ""}</h2>
          <button ref={closeRef} className="icon-btn" onClick={() => setOpen(false)} aria-label="Close bag">
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="prompt-lg" aria-hidden="true">
              &gt;_
            </p>
            <p>The bag is empty.</p>
            <Link to="/shop" className="btn" onClick={() => setOpen(false)}>
              Shop collection <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer-lines">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li key={`${line.slug}-${line.size}`} className="line">
                    <Link to={`/product/${product.slug}`} onClick={() => setOpen(false)}>
                      <img src={product.image} alt="" />
                    </Link>
                    <div className="line-copy">
                      <div className="line-top">
                        <Link to={`/product/${product.slug}`} onClick={() => setOpen(false)}>
                          {product.name}
                        </Link>
                        <span>{money(product.price * line.qty)}</span>
                      </div>
                      <p>Size {line.size}</p>
                      <div className="line-actions">
                        <div className="stepper" aria-label={`Quantity for ${product.name}`}>
                          <button onClick={() => setQty(line.slug, line.size, line.qty - 1)} aria-label="Decrease quantity">
                            −
                          </button>
                          <span>{line.qty}</span>
                          <button onClick={() => setQty(line.slug, line.size, line.qty + 1)} aria-label="Increase quantity">
                            +
                          </button>
                        </div>
                        <button className="text-btn" onClick={() => remove(line.slug, line.size)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="drawer-foot">
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
              <p className="ship-note">
                {remaining === 0
                  ? "Shipping is on the club."
                  : `${money(remaining)} away from free shipping.`}
              </p>
              <Link to="/checkout" className="btn btn-block" onClick={() => setOpen(false)}>
                Checkout <span aria-hidden="true">→</span>
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

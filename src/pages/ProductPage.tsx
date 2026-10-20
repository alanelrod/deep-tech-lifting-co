import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { SIZES, getProduct, money, products } from "../data/products";

export function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [openDetails, setOpenDetails] = useState(true);

  useEffect(() => {
    setSize(null);
    setQty(1);
    setSizeError(false);
    if (product) document.title = `${product.name} — Deep Tech Lifting Club`;
    else document.title = "Not found — Deep Tech Lifting Club";
  }, [product]);

  if (!product) {
    return (
      <div className="wrap missing">
        <p className="prompt-lg" aria-hidden="true">
          &gt;_
        </p>
        <h1>That piece isn&apos;t on the floor.</h1>
        <Link to="/shop" className="btn">
          Back to the collection <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  const related = products.filter((item) => item.slug !== product.slug);

  function addToBag() {
    if (!size) {
      setSizeError(true);
      return;
    }
    add(product!.slug, size, qty);
  }

  return (
    <article className="wrap product">
      <div className="gallery">
        <div className="stage">
          <img src={product.image} alt={product.alt} />
        </div>
      </div>

      <div className="buy">
        <p className="kicker">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price">{money(product.price)}</p>
        <p className="lede">{product.description}</p>

        <fieldset className={`sizes ${sizeError ? "has-error" : ""}`}>
          <legend>Size</legend>
          <div className="size-row">
            {SIZES.map((option) => (
              <button
                key={option}
                type="button"
                className={size === option ? "is-on" : ""}
                aria-pressed={size === option}
                onClick={() => {
                  setSize(option);
                  setSizeError(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {sizeError && <p className="form-error">Choose a size.</p>}
        </fieldset>

        <div className="buy-row">
          <div className="stepper" aria-label="Quantity">
            <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((value) => Math.min(8, value + 1))} aria-label="Increase quantity">
              +
            </button>
          </div>
          <button type="button" className="btn btn-grow" onClick={addToBag}>
            Add to bag <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="accordion">
          <button type="button" aria-expanded={openDetails} onClick={() => setOpenDetails((open) => !open)}>
            Details
            <span aria-hidden="true">{openDetails ? "–" : "+"}</span>
          </button>
          {openDetails && (
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <section className="related" aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title">Also in the club</h2>
          <Link to="/shop">
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="product-grid">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </article>
  );
}

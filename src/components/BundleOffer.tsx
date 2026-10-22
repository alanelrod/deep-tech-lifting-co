import { Link } from "react-router-dom";
import { getProduct, money } from "../data/products";

export function BundleOffer() {
  const product = getProduct("the-set");
  if (!product?.images) return null;

  return (
    <Link to={`/product/${product.slug}`} className="bundle">
      <div className="sheet-grid bundle-sheet" role="img" aria-label={product.alt}>
        {product.images.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
      <div className="bundle-copy">
        <p className="kicker">Available now</p>
        <h2>{product.name}</h2>
        <p>{product.blurb}</p>
        <p className="bundle-price">
          {product.compareAt && <span className="price-was">{money(product.compareAt)}</span>}
          {money(product.price)}
        </p>
        <span className="btn">
          Shop the set <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

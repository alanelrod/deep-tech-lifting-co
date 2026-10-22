import { Link } from "react-router-dom";
import { money, type Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="pcard">
      <div className="pcard-media">
        {product.images && product.images.length > 1 ? (
          <div className="sheet-grid" role="img" aria-label={product.alt}>
            {product.images.map((src) => (
              <img key={src} src={src} alt="" />
            ))}
          </div>
        ) : (
          <img src={product.image} alt={product.alt} />
        )}
      </div>
      <div className="pcard-meta">
        <div>
          <div className="pcard-name">{product.name}</div>
          <div className="pcard-price">
            {product.compareAt && <span className="price-was">{money(product.compareAt)}</span>}
            {money(product.price)}
          </div>
          {product.soldOut ? (
            <div className="pcard-sold">Waitlist</div>
          ) : (
            product.compareAt && <div className="pcard-sold">15% off</div>
          )}
        </div>
        <span className="pcard-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}

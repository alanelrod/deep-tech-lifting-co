import { Link } from "react-router-dom";
import { money, type Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="pcard">
      <div className="pcard-media">
        <img src={product.image} alt={product.alt} />
      </div>
      <div className="pcard-meta">
        <div>
          <div className="pcard-name">{product.name}</div>
          <div className="pcard-price">{money(product.price)}</div>
          {product.soldOut && <div className="pcard-sold">Sold out</div>}
        </div>
        <span className="pcard-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}

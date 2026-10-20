import { useEffect } from "react";
import { Link } from "react-router-dom";
import { collections, getProduct } from "../data/products";

export function Collections() {
  useEffect(() => {
    document.title = "Collections — Deep Tech Lifting Club";
  }, []);

  return (
    <div className="wrap collections">
      <header className="page-head">
        <p className="kicker">Collections</p>
        <h1>How the floor is split</h1>
        <p className="lede">Three ways through the same four pieces. Start with the set, the session, or the layer.</p>
      </header>

      <div className="collection-list">
        {collections.map((collection) => (
          <article key={collection.slug} className="collection-row">
            <Link to={`/shop?collection=${collection.slug}`} className="collection-shot">
              <img src={collection.image} alt="" />
            </Link>
            <div className="collection-copy">
              <p className="kicker">{String(collection.productSlugs.length).padStart(2, "0")} pieces</p>
              <h2>{collection.name}</h2>
              <p>{collection.text}</p>
              <ul>
                {collection.productSlugs.map((slug) => {
                  const product = getProduct(slug);
                  if (!product) return null;
                  return (
                    <li key={slug}>
                      <Link to={`/product/${product.slug}`}>
                        {product.name}
                        <span>${product.price}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link to={`/shop?collection=${collection.slug}`} className="btn">
                Shop {collection.name.toLowerCase()} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

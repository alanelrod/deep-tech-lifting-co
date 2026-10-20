import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { collections, getCollection, products } from "../data/products";

export function Shop() {
  const [params] = useSearchParams();
  const slug = params.get("collection") ?? "";
  const collection = slug ? getCollection(slug) : undefined;
  const list = collection
    ? products.filter((product) => collection.productSlugs.includes(product.slug))
    : products;

  useEffect(() => {
    document.title = collection
      ? `${collection.name} — Deep Tech Lifting Club`
      : "Shop — Deep Tech Lifting Club";
  }, [collection]);

  return (
    <div className="wrap shop">
      <header className="page-head">
        <p className="kicker">{collection ? "Collection" : "Shop"}</p>
        <h1>{collection ? collection.name : "The collection"}</h1>
        <p className="lede">
          {collection
            ? collection.text
            : "Four pieces. Hoodie, tank, shorts, pants. Black, built for the work."}
        </p>
      </header>

      <div className="filters" role="tablist" aria-label="Filter the collection">
        <Link to="/shop" className={!collection ? "is-on" : ""}>
          All
        </Link>
        {collections.map((item) => (
          <Link
            key={item.slug}
            to={`/shop?collection=${item.slug}`}
            className={collection?.slug === item.slug ? "is-on" : ""}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="product-grid">
        {list.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

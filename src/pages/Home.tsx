import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { asset, products } from "../data/products";

const CREED = ["Code", "Lift", "Learn", "Build", "Repeat"];

export function Home() {
  useEffect(() => {
    document.title = "Deep Tech Lifting Club";
  }, []);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="kicker">Train higher</p>
            <h1>
              Deep Tech
              <br />
              Lifting Club
            </h1>
            <p className="hero-deck">
              Discipline builds
              <br />
              a higher horizon.
            </p>
            <Link to="/shop" className="btn">
              Shop collection <span aria-hidden="true">→</span>
            </Link>
            <ul className="creed">
              {CREED.map((word) => (
                <li key={word}>{word}</li>
              ))}
              <li className="creed-prompt" aria-hidden="true">
                &gt;_
              </li>
            </ul>
          </div>
          <img
            className="hero-sheet"
            src={asset("images/hoodie.jpg")}
            alt="Deep Tech Lifting Club hoodie, front and back with detail close-ups"
          />
        </div>
      </section>

      <section className="collection" aria-labelledby="collection-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="collection-title">The collection</h2>
            <Link to="/shop">
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

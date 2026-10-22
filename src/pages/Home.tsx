import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LogoMark } from "../components/LogoMark";
import { BundleOffer } from "../components/BundleOffer";
import { ProductCard } from "../components/ProductCard";
import { asset, catalogPieces } from "../data/products";

const CREED = ["Code", "Lift", "Learn", "Build", "Repeat"];

export function Home() {
  useEffect(() => {
    document.title = "Deep Tech Lifting Club — Lift Deeper | Gym Wear";
  }, []);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="kicker">Lift deeper</p>
            <h1>
              <span className="sr">Deep Tech Lifting Club — Lift deeper</span>
              <LogoMark />
            </h1>
            <p className="hero-deck">
              Wear for the
              <br />
              jacked tech nerds.
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
          <BundleOffer />
          <div className="product-grid">
            {catalogPieces().map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

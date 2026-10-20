import { useEffect } from "react";
import { Link } from "react-router-dom";
import { asset } from "../data/products";

const PILLARS = [
  { title: "Code", text: "The prompt on the chest is the next line. Write it, then lift it." },
  { title: "Lift", text: "Clothes for the session. Mesh when it's hot. Fleece when you leave." },
  { title: "Repeat", text: "A small line. Four pieces. The same standard, every drop." },
];

export function About() {
  useEffect(() => {
    document.title = "About — Deep Tech Lifting Club";
  }, []);

  return (
    <div className="wrap about">
      <header className="page-head">
        <p className="kicker">About</p>
        <h1>Wear for the jacked tech nerds.</h1>
      </header>

      <div className="about-grid">
        <div className="about-copy">
          <p>
            Deep Tech Lifting Club. The mark is a prompt — &gt;_ — because the next
            line is the next rep.
          </p>
          <p>
            The line is small on purpose. A hoodie, a tank, a short, a pant. Black. Heavy where it should be
            heavy, open where the work gets hot. The back of the hoodie is a horizon: a range, a ringed globe,
            the phases of the moon. You face the bar. The horizon stays behind you.
          </p>
          <p>Established 2026. Train deeper.</p>
          <Link to="/shop" className="btn">
            Shop collection <span aria-hidden="true">→</span>
          </Link>
        </div>
        <img src={asset("images/hoodie.jpg")} alt="Deep Tech Lifting Club hoodie, front and back with detail close-ups" />
      </div>

      <ul className="pillars">
        {PILLARS.map((pillar) => (
          <li key={pillar.title}>
            <h2>{pillar.title}</h2>
            <p>{pillar.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

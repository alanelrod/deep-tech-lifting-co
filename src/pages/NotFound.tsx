import { useEffect } from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  useEffect(() => {
    document.title = "Not found — Deep Tech Lifting Club";
  }, []);

  return (
    <div className="wrap missing">
      <p className="prompt-lg" aria-hidden="true">
        &gt;_
      </p>
      <h1>That page isn&apos;t on the floor.</h1>
      <Link to="/" className="btn">
        Back home <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

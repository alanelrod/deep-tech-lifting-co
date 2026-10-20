import { Link } from "react-router-dom";
import { asset } from "../data/products";
import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <LogoMark variant="compact" />
          <span className="footer-est">Est. 2026</span>
        </div>
        <div className="footer-prompt" aria-hidden="true">
          &gt;_
        </div>
        <div className="footer-links">
          <Link to="/support">Support</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/privacy">Privacy</Link>
          <span className="footer-social" aria-hidden="true">
            <SocialIcon kind="instagram" />
            <SocialIcon kind="tiktok" />
            <SocialIcon kind="youtube" />
          </span>
        </div>
      </div>
      <div className="wrap footer-solis">
        <img src={asset("images/solis.png")} alt="" />
        <span>a Solis Consulting company</span>
      </div>
    </footer>
  );
}

function SocialIcon({ kind }: { kind: "instagram" | "tiktok" | "youtube" }) {
  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14 6.2c.7 1.6 1.9 2.6 3.6 2.9v2.2c-1.3 0-2.5-.4-3.6-1.2v5.4a5.1 5.1 0 1 1-5.1-5.1c.3 0 .6 0 .9.1v2.3a2.8 2.8 0 1 0 1.9 2.7V6.2H14z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="6.5" width="17" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 9.5 L15.2 12 L11 14.5 Z" fill="currentColor" />
    </svg>
  );
}

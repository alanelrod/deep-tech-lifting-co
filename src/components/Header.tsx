import { useEffect, useId, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { LogoMark } from "./LogoMark";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop", end: false },
  { to: "/collections", label: "Collections", end: false },
  { to: "/about", label: "About", end: false },
];

export function Header({ overlay }: { overlay: boolean }) {
  const { count, setOpen } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setAccountOpen(false);
    setQuery("");
  }, [location.pathname]);

  useEffect(() => {
    if (!searchOpen && !accountOpen && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setAccountOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, accountOpen, menuOpen]);

  const solid = !overlay || scrolled || menuOpen || searchOpen || accountOpen;
  const results = products.filter((product) => {
    const haystack = `${product.name} ${product.category} ${product.blurb}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={`header ${solid ? "is-solid" : ""}`}>
        <div className="wrap header-inner">
          <Link to="/" className="logo" aria-label="Deep Tech Lifting Club, home">
            <LogoMark variant="compact" />
          </Link>

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-tools">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <button className="icon-btn" aria-label="Account" onClick={() => setAccountOpen(true)}>
              <UserIcon />
            </button>
            <button className="icon-btn bag-btn" aria-label={`Bag, ${count} items`} onClick={() => setOpen(true)}>
              <BagIcon />
              <span className="bag-count">{count}</span>
            </button>
            <button
              className="icon-btn menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-nav">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
          >
            Search
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              setAccountOpen(true);
            }}
          >
            Account
          </button>
        </div>
      )}

      {searchOpen && (
        <div className="modal-root">
          <button className="backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} />
          <div className="modal" role="dialog" aria-modal="true" aria-label="Search the collection">
            <div className="modal-head">
              <h2>Search</h2>
              <button className="icon-btn" onClick={() => setSearchOpen(false)}>
                Close
              </button>
            </div>
            <label className="field">
              <span className="sr">Search the collection</span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Hoodie, tank, shorts, pants"
              />
            </label>
            <ul className="search-results">
              {results.length === 0 ? (
                <li className="search-empty">Nothing under that name.</li>
              ) : (
                results.map((product) => (
                  <li key={product.slug}>
                    <Link to={`/product/${product.slug}`} onClick={() => setSearchOpen(false)}>
                      <img src={product.image} alt="" />
                      <span>
                        <strong>{product.name}</strong>
                        <em>{product.soldOut ? "Sold out" : `$${product.price}`}</em>
                      </span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {accountOpen && <AccountDialog onClose={() => setAccountOpen(false)} />}
    </>
  );
}

function AccountDialog({ onClose }: { onClose: () => void }) {
  const formId = useId();
  const [email, setEmail] = useState(() => localStorage.getItem("dtlc-member") ?? "");
  const [saved, setSaved] = useState(() => Boolean(localStorage.getItem("dtlc-member")));
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const next = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
      setError("Enter a real email.");
      setSaved(false);
      return;
    }
    localStorage.setItem("dtlc-member", next);
    setEmail(next);
    setSaved(true);
    setError("");
  }

  return (
    <div className="modal-root">
      <button className="backdrop" aria-label="Close account" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true" aria-label="Account">
        <div className="modal-head">
          <h2>Member</h2>
          <button className="icon-btn" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="modal-copy">
          Drop notes only. No weekly letter. Your email stays in this browser.
        </p>
        <form onSubmit={submit} className="stack">
          <label className="field" htmlFor={formId}>
            <span>Email</span>
            <input
              id={formId}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSaved(false);
              }}
              placeholder="you@domain.com"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          {saved && <p className="form-ok">You&apos;re on the list.</p>}
          <button className="btn" type="submit">
            {saved ? "Update email" : "Join the list"}
          </button>
        </form>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16.5 L20 20.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8.2" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.2 19.2c1.4-3 3.8-4.4 6.8-4.4s5.4 1.4 6.8 4.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.2 8.5h11.6l-.8 11H7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8.5V7.2A3 3 0 0 1 12 4.2 3 3 0 0 1 15 7.2v1.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

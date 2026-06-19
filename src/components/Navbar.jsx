import React, { useState } from "react";

export function Navbar({ active }) {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["About", "Skills", "Projects", "Certs", "Hackathons", "Timeline", "Contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(2,2,2,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border-light3)", fontFamily: "var(--font-mono)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#hero" aria-label="Home" style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--accent)", textDecoration: "none", animation: "flicker 6s infinite" }}>
          {"<PAVAN/>"}
        </a>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
        </button>
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} aria-label={l} onClick={() => setIsOpen(false)} style={{ color: active === l.toLowerCase() ? "var(--accent)" : "var(--text3)", textDecoration: "none", fontSize: 11, padding: "6px 10px", border: active === l.toLowerCase() ? "1px solid var(--border-hover)" : "1px solid transparent", borderRadius: 3, transition: "all 0.2s", letterSpacing: 1 }}
              onMouseEnter={e => { if (active !== l.toLowerCase()) e.target.style.color = "var(--text2)"; }}
              onMouseLeave={e => { if (active !== l.toLowerCase()) e.target.style.color = "var(--text3)"; }}>
              {l.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

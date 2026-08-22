import { useState, useEffect } from "react";
import { Command, Menu, X, Shield } from "lucide-react";
import { DATA } from "../data/portfolioData";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Certifications", href: "#certs" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ activeSection, onOpenCmd }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 860) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <a href="#hero" className="nav-logo" aria-label="Pavan Kumar Home">
            <Shield size={20} color="var(--accent)" />
            <span>PAVAN<span className="nav-logo-accent">.DEV</span></span>
          </a>

          {/* Desktop Links */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.href.substring(1) ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Quick Cmd+K Button */}
            <button
              onClick={onOpenCmd}
              className="nav-cmd-btn"
              title="Open Command Palette (⌘K)"
              aria-label="Open Command Palette"
            >
              <Command size={14} />
              <span>Search</span>
              <kbd className="nav-cmd-kbd">⌘K</kbd>
            </button>

            {/* Mobile Menu Button - Hidden on Desktop (>=860px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary btn-sm nav-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="nav-mobile-drawer">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-link ${activeSection === link.href.substring(1) ? "active" : ""}`}
                style={{ padding: "12px 14px", fontSize: "1rem", borderRadius: "var(--radius-sm)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 85,
          }}
        />
      )}
    </>
  );
}

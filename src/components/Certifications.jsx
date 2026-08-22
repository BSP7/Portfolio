import { useState } from "react";
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Filter } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";
import { useSpotlight } from "../hooks/useSpotlight";

export function Certifications() {
  const [filterCategory, setFilterCategory] = useState("All");
  const spotlight = useSpotlight();

  const categories = ["All", "Cybersecurity", "Blockchain", "Data Science", "Engineering"];

  const filteredCerts = DATA.certs.filter((c) => {
    if (filterCategory === "All") return true;
    return c.category === filterCategory;
  });

  return (
    <section id="certs" className="section">
      <div className="container">
        <SectionHeader
          tag="Verified Credentials"
          title="Certifications & Accreditations"
          description="Industry certifications demonstrating rigorous study across computer science, blockchain architectures, and information security."
        />

        {/* Category Filters */}
        <div className="reveal-on-scroll" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-8)" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`skill-category-pill ${filterCategory === cat ? "active" : ""}`}
              style={{
                transform: filterCategory === cat ? "translateY(-1px)" : "none",
                boxShadow: filterCategory === cat ? "0 0 10px var(--accent-glow)" : "none",
                transition: "all var(--transition-fast)"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "var(--space-4)" }}>
          {filteredCerts.map((cert, idx) => (
            <div
              key={cert.id}
              className={`card card-spotlight reveal-on-scroll stagger-${(idx % 4) + 1}`}
              {...spotlight}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                transition: "transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    boxShadow: "0 0 8px var(--accent-glow)"
                  }}
                >
                  <Award size={20} />
                </div>
                <span className="badge badge-success" style={{ fontSize: "0.6875rem", boxShadow: "0 0 8px rgba(16, 185, 129, 0.2)" }}>
                  <CheckCircle2 size={11} />
                  Verified
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 4 }}>
                  {cert.name}
                </h4>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                  {cert.org} · <span style={{ fontFamily: "var(--font-mono)" }}>{cert.year}</span>
                </div>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "var(--space-2)" }}>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ width: "100%", justifyContent: "center" }}
                  aria-label={`Verify ${cert.name} Credential`}
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

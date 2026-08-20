import { useState } from "react";
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Filter } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

export function Certifications() {
  const [filterCategory, setFilterCategory] = useState("All");

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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-8)" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`skill-category-pill ${filterCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-4)" }}>
          {filteredCerts.map((cert) => (
            <div key={cert.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
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
                    color: "var(--accent)"
                  }}
                >
                  <Award size={20} />
                </div>
                <span className="badge badge-success" style={{ fontSize: "0.6875rem" }}>
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
                  aria-label={`View ${cert.name} Credential`}
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

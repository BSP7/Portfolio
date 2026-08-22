import { Trophy, Calendar, MapPin, Award, ExternalLink, ArrowUpRight } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";
import { useSpotlight } from "../hooks/useSpotlight";

export function Hackathons() {
  const spotlight = useSpotlight();

  return (
    <section id="hackathons" className="section">
      <div className="container">
        <SectionHeader
          tag="Competitions & Hackathons"
          title="Hackathon Highlights"
          description="Competitive hackathons where I designed, built, and presented cryptographic & AI security systems under intensive timelines."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "var(--space-6)" }}>
          {DATA.hackathons.map((hackathon, idx) => {
            const isTopAward = hackathon.result.toLowerCase().includes("top");
            return (
              <div
                key={hackathon.event}
                className={`card card-spotlight reveal-on-scroll stagger-${(idx % 4) + 1}`}
                {...spotlight}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                  transition: "transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-3)" }}>
                  <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-sm)",
                        background: isTopAward ? "var(--accent-dim)" : "var(--surface)",
                        border: `1px solid ${isTopAward ? "var(--accent-border)" : "var(--border)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isTopAward ? "var(--accent)" : "var(--text-muted)",
                        boxShadow: isTopAward ? "0 0 14px var(--accent-glow)" : "none",
                        flexShrink: 0,
                        transition: "transform var(--transition-fast)"
                      }}
                    >
                      <Trophy size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)" }}>
                        {hackathon.event}
                      </h3>
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        {hackathon.institution}
                      </span>
                    </div>
                  </div>

                  <span className={`badge ${isTopAward ? "badge-success" : "badge"}`}>
                    {hackathon.year}
                  </span>
                </div>

                {/* Result Pill */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span className={isTopAward ? "badge badge-accent" : "badge"}>
                    <Award size={12} />
                    {hackathon.result}
                  </span>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                    Project: <strong style={{ color: "var(--text)" }}>{hackathon.project}</strong>
                  </span>
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {hackathon.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { GraduationCap, Milestone, Trophy, Calendar, Briefcase, Filter } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";
import { useSpotlight } from "../hooks/useSpotlight";

const TYPE_ICONS = {
  Education: GraduationCap,
  Milestone: Milestone,
  Hackathons: Trophy,
  work: Briefcase
};

export function Timeline() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const spotlight = useSpotlight();

  const filterOptions = ["All", "Education", "Milestone", "Hackathons"];

  const filteredTimeline = DATA.timeline.filter((item) => {
    if (selectedFilter === "All") return true;
    return item.category === selectedFilter;
  });

  return (
    <section id="timeline" className="section">
      <div className="container">
        <SectionHeader
          tag="Career Journey"
          title="Timeline & Milestones"
          description="Chronological journey through education at Garden City University, research milestones, hackathons, and projects."
        />

        {/* Filter Pills */}
        <div className="reveal-on-scroll" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-8)" }}>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`skill-category-pill ${selectedFilter === opt ? "active" : ""}`}
              style={{
                transform: selectedFilter === opt ? "translateY(-1px)" : "none",
                boxShadow: selectedFilter === opt ? "0 0 10px var(--accent-glow)" : "none",
                transition: "all var(--transition-fast)"
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Timeline Path */}
        <div className="timeline-wrapper">
          <div className="timeline-line" />

          {filteredTimeline.map((item, idx) => {
            const Icon = TYPE_ICONS[item.category] || Milestone;
            return (
              <div key={idx} className={`timeline-item reveal-on-scroll stagger-${(idx % 4) + 1}`}>
                <div
                  className="timeline-dot"
                  style={{
                    boxShadow: "0 0 14px var(--accent)",
                    transition: "transform var(--transition-fast)"
                  }}
                />
                <div
                  className="card card-spotlight"
                  {...spotlight}
                  style={{
                    padding: "var(--space-5)",
                    transition: "transform var(--transition-fast), border-color var(--transition-fast)"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon size={16} color="var(--accent)" />
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>
                        {item.title}
                      </h3>
                    </div>
                    <span className="badge" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
                      <Calendar size={12} />
                      {item.year}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.8125rem", color: "var(--accent-text)", fontFamily: "var(--font-mono)", marginBottom: "var(--space-2)" }}>
                    {item.org}
                  </div>

                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

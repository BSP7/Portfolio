import { useState } from "react";
import { GraduationCap, Milestone, Trophy, Calendar, Briefcase, Filter } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

const TYPE_ICONS = {
  Education: GraduationCap,
  Milestone: Milestone,
  Hackathons: Trophy,
  work: Briefcase
};

export function Timeline() {
  const [selectedFilter, setSelectedFilter] = useState("All");

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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-8)" }}>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedFilter(opt)}
              className={`skill-category-pill ${selectedFilter === opt ? "active" : ""}`}
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
              <div key={idx} className="timeline-item">
                <div className="timeline-dot" />
                <div className="card" style={{ padding: "var(--space-5)" }}>
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

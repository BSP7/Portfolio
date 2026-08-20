import { useState, useMemo } from "react";
import { Search, Shield, Brain, Link2, Code2, Cloud, BarChart3, Users, CheckCircle2, Sparkles, Filter, PieChart as PieIcon, Layers, ChevronRight } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

const ICON_MAP = {
  Shield,
  Brain,
  Link2,
  Code2,
  Cloud,
  BarChart3,
  Users
};

// Rich Solar Amber & Gold harmonious spectrum
const CATEGORY_COLORS = {
  "Security & Networking": { primary: "#f59e0b", glow: "rgba(245, 158, 11, 0.35)", gradient: "linear-gradient(135deg, #f59e0b, #d97706)" },
  "Programming": { primary: "#f97316", glow: "rgba(249, 115, 22, 0.35)", gradient: "linear-gradient(135deg, #f97316, #ea580c)" },
  "AI / Machine Learning": { primary: "#fbbf24", glow: "rgba(251, 191, 36, 0.35)", gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)" },
  "Blockchain": { primary: "#d97706", glow: "rgba(217, 119, 6, 0.35)", gradient: "linear-gradient(135deg, #d97706, #b45309)" },
  "Cloud & Tools": { primary: "#eab308", glow: "rgba(234, 179, 8, 0.35)", gradient: "linear-gradient(135deg, #eab308, #ca8a04)" },
  "Data Science": { primary: "#b45309", glow: "rgba(180, 83, 9, 0.35)", gradient: "linear-gradient(135deg, #b45309, #92400e)" },
  "Soft Skills & Professional": { primary: "#a16207", glow: "rgba(161, 98, 7, 0.35)", gradient: "linear-gradient(135deg, #a16207, #78350f)" }
};

export function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const totalSkillsCount = useMemo(() => {
    return DATA.skills.reduce((acc, curr) => acc + curr.items.length, 0);
  }, []);

  // Compute angles for the interactive SVG Donut chart
  const slices = useMemo(() => {
    let cumulativeAngle = -90; // Start at top (12 o'clock)
    const gap = 3; // Gap in degrees between slices

    return DATA.skills.map((cat, index) => {
      const percentage = (cat.items.length / totalSkillsCount) * 100;
      const angleSpan = (cat.items.length / totalSkillsCount) * 360;
      const startAngle = cumulativeAngle + gap / 2;
      const endAngle = cumulativeAngle + angleSpan - gap / 2;
      cumulativeAngle += angleSpan;

      // Color scheme
      const color = CATEGORY_COLORS[cat.cat]?.primary || "#f59e0b";
      const glow = CATEGORY_COLORS[cat.cat]?.glow || "rgba(245, 158, 11, 0.3)";

      return {
        ...cat,
        index,
        percentage: Math.round(percentage),
        startAngle,
        endAngle,
        color,
        glow
      };
    });
  }, [totalSkillsCount]);

  // Selected category data
  const currentCategory = slices[activeCategoryIndex] || slices[0];
  const IconComponent = ICON_MAP[currentCategory.icon] || Shield;

  // Filter skills based on search query
  const displayedSkills = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentCategory.items;
    }
    // If searching, search across all categories
    return DATA.skills.flatMap((cat) =>
      cat.items
        .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((item) => ({ ...item, categoryName: cat.cat }))
    );
  }, [searchQuery, currentCategory]);

  // Helper to generate SVG Donut Arc Path
  const getArcPath = (startAngle, endAngle, innerR, outerR, cx = 160, cy = 160) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const x1 = cx + outerR * Math.cos(toRad(startAngle));
    const y1 = cy + outerR * Math.sin(toRad(startAngle));
    const x2 = cx + outerR * Math.cos(toRad(endAngle));
    const y2 = cy + outerR * Math.sin(toRad(endAngle));

    const x3 = cx + innerR * Math.cos(toRad(endAngle));
    const y3 = cy + innerR * Math.sin(toRad(endAngle));
    const x4 = cx + innerR * Math.cos(toRad(startAngle));
    const y4 = cy + innerR * Math.sin(toRad(startAngle));

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          tag="Core Competencies"
          title="Skills & Technical Matrix"
          description="An interactive radial distribution matrix illustrating capability weights across Cybersecurity, AI, Blockchain, and Systems Engineering."
        />

        {/* Top Summary Stats Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "var(--space-4)",
            marginBottom: "var(--space-8)",
            padding: "var(--space-4) var(--space-6)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)"
          }}
        >
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              TOTAL CAPABILITIES
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)" }}>
              {totalSkillsCount}+ Verified
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              CORE DOMAINS
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-text)" }}>
              {DATA.skills.length} Technical Pillars
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              PRIMARY FOCUS
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)" }}>
              Security & AI / ML
            </div>
          </div>
        </div>

        {/* Main Matrix Grid: Left = Pie / Donut Chart, Right = Skill Inspector */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-8)",
            alignItems: "start"
          }}
        >
          {/* LEFT: INTERACTIVE SVG PIE / DONUT CHART */}
          <div
            className="card"
            style={{
              padding: "var(--space-6)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative"
            }}
          >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8125rem", fontFamily: "var(--font-mono)", color: "var(--accent-text)", fontWeight: 700 }}>
                <PieIcon size={16} />
                <span>RADIAL DOMAIN DISTRIBUTION</span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Click slice to inspect
              </span>
            </div>

            {/* SVG Donut Canvas */}
            <div style={{ position: "relative", width: 320, height: 320, margin: "0 auto" }}>
              <svg viewBox="0 0 320 320" width="320" height="320" style={{ transform: "rotate(0deg)" }}>
                {slices.map((slice) => {
                  const isSelected = activeCategoryIndex === slice.index;
                  const isHovered = hoveredIndex === slice.index;
                  const outerR = isSelected || isHovered ? 148 : 138;
                  const innerR = isSelected || isHovered ? 82 : 88;

                  const pathD = getArcPath(slice.startAngle, slice.endAngle, innerR, outerR);

                  return (
                    <path
                      key={slice.cat}
                      d={pathD}
                      fill={slice.color}
                      stroke="var(--bg)"
                      strokeWidth="2"
                      style={{
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        opacity: hoveredIndex !== null && !isHovered && !isSelected ? 0.45 : 1,
                        filter: isSelected ? `drop-shadow(0 0 12px ${slice.glow})` : "none"
                      }}
                      onMouseEnter={() => setHoveredIndex(slice.index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => {
                        setActiveCategoryIndex(slice.index);
                        setSearchQuery("");
                      }}
                    />
                  );
                })}
              </svg>

              {/* Center Donut Hub */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  width: 154,
                  height: 154,
                  borderRadius: "50%",
                  background: "var(--surface)",
                  border: "1px solid var(--border-strong)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 12,
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
                  pointerEvents: "none"
                }}
              >
                <div
                  style={{
                    color: currentCategory.color,
                    marginBottom: 4,
                    transition: "transform 0.2s ease"
                  }}
                >
                  <IconComponent size={22} />
                </div>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    lineHeight: 1.2,
                    maxWidth: 130
                  }}
                >
                  {currentCategory.cat}
                </div>
                <div
                  style={{
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-text)",
                    marginTop: 4,
                    fontWeight: 700
                  }}
                >
                  {currentCategory.items.length} Skills · {currentCategory.percentage}%
                </div>
              </div>
            </div>

            {/* Clickable Legend Pills */}
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "var(--space-2)",
                marginTop: "var(--space-6)"
              }}
            >
              {slices.map((slice) => {
                const isSelected = activeCategoryIndex === slice.index;
                return (
                  <button
                    key={slice.cat}
                    onClick={() => {
                      setActiveCategoryIndex(slice.index);
                      setSearchQuery("");
                    }}
                    onMouseEnter={() => setHoveredIndex(slice.index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="btn btn-secondary btn-sm"
                    style={{
                      justifyContent: "flex-start",
                      padding: "6px 10px",
                      borderColor: isSelected ? slice.color : "var(--border)",
                      background: isSelected ? "var(--surface-active)" : "var(--surface)",
                      fontSize: "0.75rem"
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: slice.color,
                        boxShadow: isSelected ? `0 0 6px ${slice.color}` : "none",
                        flexShrink: 0
                      }}
                    />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>
                      {slice.cat}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontSize: "0.6875rem" }}>
                      {slice.percentage}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: SKILL INSPECTOR & PROFICIENCY BREAKDOWN */}
          <div
            className="card"
            style={{
              padding: "var(--space-6)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)"
            }}
          >
            {/* Header with Search */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "var(--space-3)" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: currentCategory.color
                    }}
                  />
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--text)" }}>
                    {searchQuery ? `Search Results ("${searchQuery}")` : currentCategory.cat}
                  </h3>
                </div>
                {!searchQuery && (
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {currentCategory.desc}
                  </p>
                )}
              </div>

              {/* Quick Skill Search */}
              <div style={{ position: "relative", minWidth: 200, flex: "1 1 180px" }}>
                <Search
                  size={14}
                  color="var(--text-muted)"
                  style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
                />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: 34, paddingBlock: 6, fontSize: "0.8125rem" }}
                  placeholder="Filter skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "0.6875rem",
                      color: "var(--text-muted)"
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Skill Cards List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                marginTop: "var(--space-2)",
                maxHeight: 460,
                overflowY: "auto",
                paddingRight: 4
              }}
            >
              {displayedSkills.length === 0 ? (
                <div style={{ textAlign: "center", padding: "var(--space-8)", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                  No skills matching "{searchQuery}".
                </div>
              ) : (
                displayedSkills.map((skill) => {
                  const levelTier =
                    skill.level >= 90 ? "Advanced Mastery" : skill.level >= 85 ? "Proficient" : "Core Competency";

                  return (
                    <div
                      key={skill.name}
                      style={{
                        padding: "var(--space-3) var(--space-4)",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        transition: "all var(--transition-fast)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text)" }}>
                            {skill.name}
                          </span>
                          {skill.categoryName && (
                            <span style={{ fontSize: "0.6875rem", padding: "2px 6px", borderRadius: 4, background: "var(--surface-active)", color: "var(--text-muted)" }}>
                              {skill.categoryName}
                            </span>
                          )}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              fontSize: "0.6875rem",
                              fontFamily: "var(--font-mono)",
                              color: "var(--text-muted)",
                              padding: "2px 6px",
                              borderRadius: "var(--radius-xs)",
                              background: "var(--bg)"
                            }}
                          >
                            {levelTier}
                          </span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--accent-text)", fontWeight: 700 }}>
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Smooth Proficiency Meter */}
                      <div
                        style={{
                          height: 6,
                          borderRadius: "var(--radius-full)",
                          backgroundColor: "var(--bg)",
                          border: "1px solid var(--border)",
                          overflow: "hidden"
                        }}
                      >
                        <div
                          style={{
                            width: `${skill.level}%`,
                            height: "100%",
                            borderRadius: "var(--radius-full)",
                            background: "var(--gradient-accent)",
                            transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

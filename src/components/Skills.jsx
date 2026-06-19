import React, { useRef } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  return (
    <section id="skills" ref={ref} style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
      <SectionHeader title="SKILLS.db" subtitle="02 // CAPABILITIES" />
      <div style={{ maxWidth: 1100, margin: "60px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        {DATA.skills.map((cat, i) => (
          <div key={cat.cat} className={`section-reveal ${vis ? "visible" : ""} stagger-${Math.min(i + 1, 5)} card card-skill`}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>{cat.icon}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--accent)", letterSpacing: 1 }}>{cat.cat.toUpperCase()}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.items.map(item => (
                <span key={item} className="skill-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useRef } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function Certifications() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  return (
    <section id="certs" ref={ref} style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
      <SectionHeader title="CERTS.pem" subtitle="04 // CREDENTIALS" />
      <div style={{ maxWidth: 1000, margin: "60px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        {DATA.certs.map((c, i) => (
          <div key={c.name} className={`section-reveal ${vis ? "visible" : ""} stagger-${Math.min((i % 5) + 1, 5)} card card-cert`}
            style={{ border: `1px solid ${c.color}30`, transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) perspective(1000px) rotateX(2deg) rotateY(-2deg)"; e.currentTarget.style.borderColor = c.color + "99"; e.currentTarget.style.boxShadow = `0 0 30px ${c.color}30`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = c.color + "30"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${c.color}20`, border: `2px solid ${c.color}60`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏅</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: c.color, marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>{c.org}</div>
            <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "var(--font-mono)", marginTop: 4 }}>{c.year}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  const [hover, setHover] = useState(null);
  return (
    <section id="projects" ref={ref} style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
      <SectionHeader title="PROJECTS.sh" subtitle="03 // ARSENAL" />
      <div style={{ maxWidth: 1100, margin: "60px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
        {DATA.projects.map((p, i) => (
          <div key={p.title} className={`section-reveal ${vis ? "visible" : ""} stagger-${Math.min(i + 1, 5)} card card-project`}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            style={{ position: "relative", border: `1px solid ${hover === i ? p.color + "66" : "rgba(255,255,255,0.06)"}`, transform: hover === i ? "translateY(-6px) perspective(1000px) rotateX(2deg) rotateY(-2deg)" : "none", boxShadow: hover === i ? `0 20px 60px ${p.color}22` : "none", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
            {/* top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${p.color},transparent)`, opacity: hover === i ? 1 : 0.3, transition: "opacity 0.3s" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, color: p.color, fontWeight: 700 }}>{p.title}</h3>
              <span style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)" }}>★ {p.stars}</span>
            </div>
            <p style={{ color: "var(--text3)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {p.tech.map(t => (
                <span key={t} className="tag" style={{ background: `${p.color}18`, border: `1px solid ${p.color}40`, color: p.color }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#" style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 14px", borderRadius: 4, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.color = p.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text3)"; }}>
                ⌥ GitHub
              </a>
              <a href="#" style={{ fontSize: 12, color: p.color, fontFamily: "var(--font-mono)", textDecoration: "none", border: `1px solid ${p.color}60`, padding: "6px 14px", borderRadius: 4, transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = `${p.color}20`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                ↗ Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

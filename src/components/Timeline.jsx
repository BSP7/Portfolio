import { useRef } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function Timeline() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  const typeColor = { edu: "#60A5FA", work: "#34D399", milestone: "#FBBF24" };
  return (
    <section id="timeline" ref={ref} style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
      <SectionHeader title="JOURNEY.md" subtitle="06 // CAREER PATH" />
      <div style={{ maxWidth: 700, margin: "60px auto 0", position: "relative" }}>
        <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,transparent,rgba(251,191,36,0.4),transparent)" }} />
        {DATA.timeline.map((t, i) => (
          <div key={t.year} className={`section-reveal ${vis ? "visible" : ""} stagger-${Math.min(i + 1, 5)}`}
            style={{ display: "flex", gap: 32, marginBottom: 36, position: "relative" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${typeColor[t.type]}20`, border: `2px solid ${typeColor[t.type]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, zIndex: 1, position: "relative" }}>
                {t.type === "edu" ? "🎓" : t.type === "work" ? "💼" : "⚡"}
              </div>
            </div>
            <div style={{ paddingTop: 8, flex: 1, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: typeColor[t.type] }}>{t.year}</span>
                <span className="tag" style={{ background: `${typeColor[t.type]}15`, border: `1px solid ${typeColor[t.type]}40`, color: typeColor[t.type] }}>{t.type.toUpperCase()}</span>
              </div>
              <div style={{ fontSize: 16, color: "var(--text)", fontWeight: 600, marginBottom: 2 }}>{t.title}</div>
              <div style={{ fontSize: 13, color: "var(--text3)" }}>{t.org}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

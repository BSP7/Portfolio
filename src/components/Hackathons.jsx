import { useRef } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function Hackathons() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  return (
    <section id="hackathons" ref={ref} style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
      <SectionHeader title="HACKATHONS.log" subtitle="05 // BATTLE RECORD" />
      <div style={{ maxWidth: 900, margin: "60px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 20 }}>
        {DATA.hackathons.map((h, i) => (
          <div key={h.event} className={`section-reveal ${vis ? "visible" : ""} stagger-${Math.min(i + 1, 5)} card card-hackathon`}>
            <div style={{ fontSize: 28, lineHeight: 1 }}>{h.result.split(" ")[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--text)", fontSize: 15 }}>{h.event}</div>
                <span style={{ fontSize: 11, color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{h.year}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--accent)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>{h.result.split(" ").slice(1).join(" ")}</div>
              <div style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.5 }}>{h.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

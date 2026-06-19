import React, { useRef } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  return (
    <section id="about" ref={ref} style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
      <SectionHeader title="ABOUT.exe" subtitle="01 // IDENTITY" />
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32, marginTop: 60 }}>
        <div className={`section-reveal ${vis ? "visible" : ""} stagger-1`}>
          <div className="card card-about">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", marginBottom: 16, letterSpacing: 2 }}>// BIO</div>
            <p style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: 16 }}>{DATA.bio}</p>
          </div>
        </div>
        <div className={`section-reveal ${vis ? "visible" : ""} stagger-2`} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: "📍", label: "Location", value: DATA.location },
            { icon: "🎯", label: "Focus", value: "Offensive Security & AI" },
            { icon: "🏆", label: "Status", value: "Open to Opportunities" },
            { icon: "🔐", label: "Clearance", value: "Top Secret (Active)" },
          ].map(item => (
            <div key={item.label} className="card-contact" style={{ cursor: "default" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)", letterSpacing: 1 }}>{item.label.toUpperCase()}</div>
                <div style={{ color: "var(--text)", fontSize: 15 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

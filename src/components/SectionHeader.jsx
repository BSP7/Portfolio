import React from "react";

export function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: 4, marginBottom: 12, opacity: 0.8 }}>{subtitle}</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,44px)", color: "var(--text)", fontWeight: 900, letterSpacing: 2, animation: "flicker 8s infinite" }}>{title}</h2>
      <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,transparent,var(--accent),transparent)", margin: "16px auto 0" }} />
    </div>
  );
}

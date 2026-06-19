import React from "react";
import { useCounter } from "../hooks/useCounter";

export function StatBadge({ label, value, visible }) {
  const count = useCounter(value, visible);
  return (
    <div style={{ textAlign: "center", padding: "16px 24px", border: "1px solid var(--border)", borderRadius: 8, background: "rgba(251,191,36,0.05)", minWidth: 90 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--accent)", fontWeight: 700 }}>{count}{label.toLowerCase() !== "graduation" ? "+" : ""}</div>
      <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "var(--font-mono)", letterSpacing: 1 }}>{label.toUpperCase()}</div>
    </div>
  );
}

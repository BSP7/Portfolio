import React from "react";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-light)", padding: "32px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#4B5563" }}>
        <span style={{ color: "var(--accent)" }}>{"<"}</span>
        {" PAVAN KUMAR B S // Cybersecurity • Artificial Intelligence • Blockchain "}
        <span style={{ color: "var(--accent)" }}>{"/>"}</span>
      </div>
      <div style={{ fontSize: 11, color: "#374151", marginTop: 6, fontFamily: "var(--font-mono)" }}>
        © 2026 Pavan Kumar B S
      </div>
    </footer>
  );
}

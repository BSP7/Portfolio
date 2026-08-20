import { useCounter } from "../hooks/useCounter";

export function StatBadge({ label, value, visible }) {
  const count = useCounter(value, visible);
  const isGraduation = label.toLowerCase() === "graduation";

  return (
    <div
      style={{
        textAlign: "center",
        padding: "var(--space-4) var(--space-6)",
        border: "1px solid var(--border-light2)",
        borderRadius: "var(--radius-md)",
        background: "var(--accent-dim)",
        minWidth: 96,
        transition: "var(--transition-base)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--accent-dim)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-light2)";
        e.currentTarget.style.background = "var(--accent-dim)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 26,
          color: "var(--accent)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.5px",
        }}
      >
        {count}
        {!isGraduation && "+"}
      </div>
      <div
        style={{
          fontSize: 10,
          color: "var(--text3)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "1.2px",
          marginTop: 4,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

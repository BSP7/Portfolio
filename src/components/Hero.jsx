import { useRef } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { useTypewriter } from "../hooks/useTypewriter";
import { StatBadge } from "./StatBadge";

export function Hero() {
  const typed = useTypewriter(DATA.title);
  const ref = useRef(null);
  const vis = useIntersection(ref);

  return (
    <section id="hero" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>
      {/* Hex grid bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 26L15 0h30l15 26-15 26H15z' fill='none' stroke='%23FBBF24' strokeWidth='1'/%3E%3C/svg%3E\")", backgroundSize: "60px 52px" }} />
      {/* Scanner Line */}
      <div className="scanner-line" />

      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Avatar */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 32, animation: vis ? "fadeUp 0.8s ease both" : "none" }}>
          <div style={{ width: 140, height: 140, borderRadius: "50%", border: "2px solid rgba(251,191,36,0.5)", margin: "0 auto", overflow: "hidden", position: "relative", animation: "glowPulse 3s ease infinite" }}>
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a2744,#0d1526)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.5))" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
          </div>
          <div style={{ position: "absolute", top: -4, left: -4, right: -4, bottom: -4, borderRadius: "50%", border: "1px solid rgba(251,191,36,0.2)", animation: "borderSpin 8s linear infinite" }} />
          <div style={{ position: "absolute", bottom: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: "var(--accent-emerald)", border: "2px solid var(--bg)", animation: "pulse 2s ease infinite" }} />
        </div>

        <div style={{ animation: vis ? "fadeUp 0.8s 0.2s ease both" : "none", opacity: vis ? undefined : 0 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)", letterSpacing: 4, marginBottom: 12 }}>// IDENTITY VERIFIED</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,7vw,72px)", fontWeight: 900, color: "var(--text)", lineHeight: 1.1, marginBottom: 16 }}>{DATA.name}</h1>
        </div>

        <div style={{ height: 50, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 24, animation: vis ? "fadeUp 0.8s 0.4s ease both" : "none", opacity: vis ? undefined : 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px,3vw,24px)", color: "var(--accent)" }}>{typed}</span>
          <span style={{ width: 3, height: 28, background: "var(--accent)", animation: "blink 0.8s step-end infinite" }} />
        </div>

        <p style={{ color: "var(--text2)", fontSize: 18, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7, animation: vis ? "fadeUp 0.8s 0.6s ease both" : "none", opacity: vis ? undefined : 0 }}>
          {DATA.tagline}
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: vis ? "fadeUp 0.8s 0.8s ease both" : "none", opacity: vis ? undefined : 0 }}>
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#" className="btn btn-secondary">Download Resume</a>
          <a href="#contact" className="btn btn-secondary">Contact Me</a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 60, flexWrap: "wrap", animation: vis ? "fadeUp 0.8s 1s ease both" : "none", opacity: vis ? undefined : 0 }}>
          {DATA.stats.map(s => <StatBadge key={s.label} label={s.label} value={s.value} visible={vis} />)}
        </div>
      </div>
    </section>
  );
}

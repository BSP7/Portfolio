import { useState, useEffect } from "react";
import { Shield, CheckCircle2, Sparkles, ArrowRight, Lock, Terminal } from "lucide-react";
import { DATA } from "../data/portfolioData";

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // 'loading' | 'welcome' | 'exit'
  const [statusText, setStatusText] = useState("Initializing security modules & state...");

  // Time of day greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    // Cinematic progress over ~2.6s
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Smooth non-linear increment
        const increment = prev < 60 ? Math.floor(Math.random() * 5) + 4 : Math.floor(Math.random() * 8) + 6;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 110);

    return () => clearInterval(timer);
  }, []);

  // Update status messages & transition to welcome greeting
  useEffect(() => {
    if (progress < 25) {
      setStatusText("[01/04] Initializing secure systems environment...");
    } else if (progress < 55) {
      setStatusText("[02/04] Loading AI threat intelligence models...");
    } else if (progress < 85) {
      setStatusText("[03/04] Preparing cryptographic identity & ZK proofs...");
    } else if (progress < 100) {
      setStatusText("[04/04] Finalizing interactive project sandboxes...");
    } else if (progress >= 100 && phase === "loading") {
      setStatusText("Initialization Complete");
      const welcomeTimer = setTimeout(() => {
        setPhase("welcome");
      }, 400);
      return () => clearTimeout(welcomeTimer);
    }
  }, [progress, phase]);

  // Auto transition from welcome greeting to main page after 1.8 seconds
  useEffect(() => {
    if (phase === "welcome") {
      const exitTimer = setTimeout(() => {
        handleProceed();
      }, 2000);
      return () => clearTimeout(exitTimer);
    }
  }, [phase]);

  const handleProceed = () => {
    setPhase("exit");
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      onClick={handleProceed}
      className={`loading-screen-root ${phase === "exit" ? "loading-screen-exit" : ""}`}
      role="dialog"
      aria-label="Loading and Welcome Greeting"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease",
        cursor: "pointer",
        userSelect: "none"
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "pulseSubtle 2.5s infinite ease-in-out"
        }}
      />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
        {phase === "loading" ? (
          /* ── PHASE 1: LOADING STATE ── */
          <div className="animate-fade-in">
            {/* Animated Brand Shield Icon */}
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "var(--radius-md)",
                background: "var(--surface)",
                border: "1px solid var(--accent-border)",
                margin: "0 auto var(--space-6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent)",
                boxShadow: "0 8px 30px var(--accent-glow)",
                animation: "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <Shield size={34} />
            </div>

            {/* Monogram Name */}
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text)",
                marginBottom: "var(--space-2)",
                lineHeight: 1.2
              }}
            >
              {DATA.name}
            </h1>

            <div
              style={{
                fontSize: "0.8125rem",
                color: "var(--accent-text)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                marginBottom: "var(--space-8)"
              }}
            >
              CYBERSECURITY · AI · BLOCKCHAIN
            </div>

            {/* Sleek Progress Track */}
            <div
              style={{
                width: "100%",
                height: 4,
                background: "var(--surface-active)",
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
                marginBottom: "var(--space-4)",
                border: "1px solid var(--border)"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "var(--gradient-accent)",
                  borderRadius: "var(--radius-full)",
                  transition: "width 0.18s ease-out"
                }}
              />
            </div>

            {/* Status Text & Percentage */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)"
              }}
            >
              <span style={{ color: "var(--text-secondary)" }}>{statusText}</span>
              <span style={{ color: "var(--accent-text)", fontWeight: 700 }}>{progress}%</span>
            </div>

            {/* Skip hint */}
            <div
              style={{
                marginTop: "var(--space-8)",
                fontSize: "0.6875rem",
                color: "var(--text-subtle)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em"
              }}
            >
              [ Click anywhere to skip ]
            </div>
          </div>
        ) : (
          /* ── PHASE 2: WELCOME GREETING STATE ── */
          <div className="animate-scale-in" style={{ animationDuration: "0.45s" }}>
            {/* Verified Welcome Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "var(--success-bg)",
                border: "2px solid var(--success)",
                margin: "0 auto var(--space-6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--success)",
                boxShadow: "0 0 35px rgba(16, 185, 129, 0.35)",
                animation: "pulseSubtle 2s infinite"
              }}
            >
              <CheckCircle2 size={38} />
            </div>

            {/* Time-based Welcome Headline */}
            <div
              style={{
                fontSize: "0.875rem",
                fontFamily: "var(--font-mono)",
                color: "var(--accent-text)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "var(--space-2)"
              }}
            >
              {getTimeGreeting()}, Welcome!
            </div>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 800,
                color: "var(--text)",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                marginBottom: "var(--space-4)"
              }}
            >
              Welcome to <span style={{ color: "var(--accent-text)" }}>{DATA.name}</span>'s Workspace
            </h2>

            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "var(--space-8)"
              }}
            >
              Explore live AI threat detection simulators, cryptographic identity verifiers, and engineering achievements.
            </p>

            {/* Enter Button */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", background: "var(--surface)", border: "1px solid var(--accent-border)", borderRadius: "var(--radius-full)", color: "var(--text)", fontSize: "0.875rem", fontWeight: 600 }}>
              <span>Entering Portfolio</span>
              <ArrowRight size={16} color="var(--accent)" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

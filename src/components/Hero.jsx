import { useState, useEffect } from "react";
import { ArrowRight, Copy, Check, Terminal, Shield, Sparkles, Mail, ExternalLink, Activity, Cpu, Lock, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { DATA } from "../data/portfolioData";
import { useToast } from "./Toast";
import { useTypewriter } from "../hooks/useTypewriter";
import { useSpotlight } from "../hooks/useSpotlight";
import { useCounter } from "../hooks/useCounter";

const TELEMETRY_LOGS = [
  { time: "01:04:12", type: "INFO", text: "Network telemetry normal. Packet latency: 12ms." },
  { time: "01:04:15", type: "AI", text: "Inference engine heuristic score: 98.4% confidence." },
  { time: "01:04:19", type: "DEFENSE", text: "Zero-Knowledge attestation proofs synced to EVM root." },
  { time: "01:04:24", type: "AUTH", text: "ID-Trust decentralised identifier verification complete." },
  { time: "01:04:28", type: "THREAT", text: "Zero anomaly threats detected in active network mesh." }
];

export function Hero({ onOpenCmd }) {
  const typedRole = useTypewriter(DATA.title, 60, 2000);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("telemetry");
  const [logIndex, setLogIndex] = useState(0);
  const { addToast } = useToast();
  const spotlightProps = useSpotlight();

  // Cycling real-time security log ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TELEMETRY_LOGS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DATA.email);
    setCopied(true);
    addToast("Copied " + DATA.email + " to clipboard!", "success");
    setTimeout(() => setCopied(false), 2200);
  };

  const currentLog = TELEMETRY_LOGS[logIndex];

  return (
    <section id="hero" className="hero-wrapper">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Intro & Calls to Action */}
          <div className="reveal-on-scroll">
            {/* Status Pill with harmonic float */}
            <div
              className="animate-float"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "var(--space-4)" }}
            >
              <span className="badge badge-success" style={{ padding: "6px 14px", fontSize: "0.8125rem", boxShadow: "0 0 16px rgba(16, 185, 129, 0.2)" }}>
                <span className="avail-dot" />
                Open for Security & AI Roles / Research
              </span>
            </div>

            {/* Main Name & Title */}
            <h1 className="hero-title">
              Hi, I'm <span className="hero-gradient-text">{DATA.name}</span>
            </h1>

            {/* Typewriter role */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                color: "var(--accent-text)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: "var(--space-4)",
                minHeight: 36
              }}
            >
              <span>{typedRole}</span>
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 24,
                  backgroundColor: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                  animation: "blinkCursor 1s infinite"
                }}
              />
            </div>

            {/* Compelling Value Proposition */}
            <p className="hero-lead">
              Computer Science undergraduate at <strong>Garden City University</strong> specializing in 
              AI-driven threat intelligence, cryptographic identity systems, and zero-knowledge verification.
            </p>

            {/* CTA Buttons with hover lift and glowing shine */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary btn-lg" style={{ position: "relative", overflow: "hidden" }}>
                <span>Explore Projects & Simulators</span>
                <ArrowRight size={16} />
              </a>

              <button onClick={handleCopyEmail} className="btn btn-secondary btn-lg">
                {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>

              <button onClick={onOpenCmd} className="btn btn-ghost btn-lg" title="Open Command Runner">
                <Terminal size={16} />
                <span>Run ⌘K</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
              <a
                href={`https://${DATA.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
              </a>
              <a
                href={`https://${DATA.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${DATA.email}`}
                className="btn btn-secondary btn-sm"
                aria-label="Send direct email"
              >
                <Mail size={15} />
                <span>{DATA.email}</span>
              </a>
            </div>

            {/* Key Stats Bar with Animated Counter */}
            <div className="hero-stats-row">
              {DATA.stats.map((st, i) => (
                <HeroStat key={st.label} label={st.label} rawValue={st.value} delay={i * 100} />
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Terminal Preview & Live Telemetry with 3D Spotlight */}
          <div className="reveal-on-scroll stagger-2">
            <div
              className="terminal-window card-spotlight"
              {...spotlightProps}
              style={{
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
              }}
            >
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot" style={{ background: "#ef4444", boxShadow: "0 0 6px rgba(239,68,68,0.4)" }} />
                  <span className="terminal-dot" style={{ background: "#f59e0b", boxShadow: "0 0 6px rgba(245,158,11,0.4)" }} />
                  <span className="terminal-dot" style={{ background: "#10b981", boxShadow: "0 0 6px rgba(16,185,129,0.4)" }} />
                </div>
                <div className="terminal-title">pavan@threat-mesh: ~/workspace</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => setActiveTab("telemetry")}
                    className={`btn btn-sm ${activeTab === "telemetry" ? "btn-outline" : "btn-ghost"}`}
                    style={{ padding: "2px 8px", fontSize: "0.75rem" }}
                  >
                    Telemetry
                  </button>
                  <button
                    onClick={() => setActiveTab("spec")}
                    className={`btn btn-sm ${activeTab === "spec" ? "btn-outline" : "btn-ghost"}`}
                    style={{ padding: "2px 8px", fontSize: "0.75rem" }}
                  >
                    Profile.json
                  </button>
                </div>
              </div>

              <div className="terminal-body" style={{ position: "relative", minHeight: 280 }}>
                {activeTab === "telemetry" ? (
                  <div>
                    <div style={{ color: "var(--text-muted)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <Activity size={14} color="var(--accent)" />
                      <span># Active Security & Verifier Mesh Telemetry</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, padding: "4px 0" }}>
                      <span style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: 6 }}>
                        <Cpu size={14} /> AI Inference Engine:
                      </span>
                      <span style={{ color: "var(--success)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                        <span className="avail-dot" /> ACTIVE (v2.4.1)
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, padding: "4px 0" }}>
                      <span style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: 6 }}>
                        <Lock size={14} /> Zero-Knowledge Attestation:
                      </span>
                      <span style={{ color: "var(--success)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                        <span className="avail-dot" /> READY (zk-SNARK)
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, padding: "4px 0" }}>
                      <span style={{ color: "var(--accent)" }}>Keccak256 State Root:</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                        0x7f9a...c4b2
                      </span>
                    </div>

                    {/* Dynamic Real-time Event Stream Box */}
                    <div style={{ marginBlock: "16px 8px", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                          LIVE TELEMETRY STREAM
                        </span>
                        <span className="badge badge-accent" style={{ fontSize: "0.6875rem", padding: "2px 6px" }}>
                          LIVE FEED
                        </span>
                      </div>

                      <div
                        style={{
                          background: "rgba(0,0,0,0.45)",
                          padding: 10,
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.75rem",
                          border: "1px solid var(--border)",
                          minHeight: 52,
                          display: "flex",
                          alignItems: "center",
                          transition: "background 0.3s ease",
                        }}
                      >
                        <div>
                          <span style={{ color: "var(--success)", fontFamily: "var(--font-mono)" }}>
                            [{currentLog.type} {currentLog.time}]
                          </span>{" "}
                          <span style={{ color: "var(--text)" }}>{currentLog.text}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "var(--accent)" }}>$</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.8125rem" }}>
                        try clicking below to test live simulators 👇
                      </span>
                    </div>
                  </div>
                ) : (
                  <pre style={{ margin: 0, color: "var(--accent-text)", fontSize: "0.75rem", overflowX: "auto" }}>
{JSON.stringify(
  {
    developer: DATA.name,
    specialization: "Cybersecurity & AI",
    institution: "Garden City University",
    year_of_study: "2023 - 2027",
    primary_stacks: ["Python", "Solidity", "FastAPI", "Machine Learning", "EVM"],
    certifications_count: 8,
    hackathon_awards: "Top 20 Finalist @ Inceptrix 2.0",
    status: "Available for internships & developer roles"
  },
  null,
  2
)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, rawValue, delay }) {
  // Extract number if applicable
  const isNumber = !isNaN(parseFloat(rawValue));
  const numericVal = isNumber ? parseFloat(rawValue.replace(/[^0-9.]/g, "")) : 0;
  const suffix = rawValue.includes("+") ? "+" : "";
  const count = useCounter(numericVal, true, 1800 + delay);

  return (
    <div className="stat-item" style={{ transition: "transform var(--transition-fast)" }}>
      <span className="stat-value" style={{ color: "var(--accent-text)" }}>
        {isNumber ? `${count}${suffix}` : rawValue}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

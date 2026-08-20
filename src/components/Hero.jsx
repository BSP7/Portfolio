import { useState, useEffect } from "react";
import { ArrowRight, Copy, Check, Terminal, Shield, Sparkles, Mail, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { DATA } from "../data/portfolioData";
import { useToast } from "./Toast";
import { useTypewriter } from "../hooks/useTypewriter";

export function Hero({ onOpenCmd }) {
  const typedRole = useTypewriter(DATA.title, 60, 2000);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("telemetry");
  const { addToast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DATA.email);
    setCopied(true);
    addToast("Copied " + DATA.email + " to clipboard!", "success");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="hero" className="hero-wrapper">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Intro & Calls to Action */}
          <div className="animate-fade-up">
            {/* Status Pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "var(--space-4)" }}>
              <span className="badge badge-success">
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
                  animation: "blinkCursor 1s infinite"
                }}
              />
            </div>

            {/* Compelling Value Proposition */}
            <p className="hero-lead">
              Computer Science undergraduate at <strong>Garden City University</strong> specializing in 
              AI-driven threat intelligence, cryptographic identity systems, and zero-knowledge verification.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary btn-lg">
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
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
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

            {/* Key Stats Bar */}
            <div className="hero-stats-row">
              {DATA.stats.map((st) => (
                <div key={st.label} className="stat-item">
                  <span className="stat-value">{st.value}</span>
                  <span className="stat-label">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Terminal Preview & Live Telemetry */}
          <div className="animate-fade-up stagger-2">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot" style={{ background: "#ef4444" }} />
                  <span className="terminal-dot" style={{ background: "#f59e0b" }} />
                  <span className="terminal-dot" style={{ background: "#10b981" }} />
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

              <div className="terminal-body">
                {activeTab === "telemetry" ? (
                  <div>
                    <div style={{ color: "var(--text-muted)", marginBottom: 8 }}>
                      # System Architecture & Active Security Nodes
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "var(--accent)" }}>AI Inference Engine:</span>
                      <span style={{ color: "var(--success)" }}>● ACTIVE (v2.4.1)</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "var(--accent)" }}>Zero-Knowledge Attestation:</span>
                      <span style={{ color: "var(--success)" }}>● READY (zk-SNARK)</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "var(--accent)" }}>Keccak256 State Root:</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>0x7f9a...c4b2</span>
                    </div>

                    <div style={{ marginBlock: "16px 8px", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: 4 }}>
                        LIVE SECURITY MONITORING STREAM
                      </div>
                      <div style={{ background: "rgba(0,0,0,0.3)", padding: 8, borderRadius: 6, fontSize: "0.75rem" }}>
                        <span style={{ color: "var(--success)" }}>[INFO 01:04:12]</span> Network telemetry normal. Packet latency: 12ms.
                        <br />
                        <span style={{ color: "var(--accent)" }}>[DEFENSE]</span> Inceptrix 2.0 & Fusion-X verified builds synced.
                      </div>
                    </div>

                    <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "var(--accent)" }}>$</span>
                      <span style={{ color: "var(--text-secondary)" }}>
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

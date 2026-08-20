import { useState } from "react";
import { Shield, Brain, Link2, GraduationCap, MapPin, Target, CheckCircle2, Award, BookOpen, Lock, Terminal, Sparkles } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const pillars = [
    {
      icon: Shield,
      title: "Threat Detection & Security Monitoring",
      desc: "Practical experience in vulnerability assessment, incident response, SIEM log monitoring, and network security analysis using Wireshark & Nmap."
    },
    {
      icon: Brain,
      title: "AI / Machine Learning for Cyber Defense",
      desc: "Developing machine learning and NLP models for behavioral anomaly detection, predictive security analytics, and real-time threat classification."
    },
    {
      icon: Link2,
      title: "Blockchain & Cryptographic Systems",
      desc: "Building Ethereum smart contracts, zero-knowledge proof KYC workflows, and cryptographic authentication systems that eliminate single points of failure."
    }
  ];

  const coreCompetencies = [
    "Threat Detection",
    "Vulnerability Assessment",
    "Incident Response",
    "Network Security Monitoring",
    "Machine Learning & NLP",
    "Cryptography Fundamentals",
    "Secure System Design",
    "Blockchain Authentication"
  ];

  const softSkills = [
    "Attention to Detail",
    "Problem-Solving",
    "Responsiveness",
    "Cross-Functional Collaboration",
    "Time Management"
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader
          tag="Professional Profile"
          title="About Me"
          description="Cybersecurity, AI/ML, and Blockchain developer with hands-on experience in building secure, mathematically verifiable, and intelligent systems."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-8)", alignItems: "start" }}>
          {/* Main Story & Education Card */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
            {/* Bio & Education Card */}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    flexShrink: 0
                  }}
                >
                  <Lock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)" }}>
                    Security-First Systems Engineering
                  </h3>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {DATA.location} · B.Tech Computer Science
                  </span>
                </div>
              </div>

              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                {DATA.bio}
              </p>

              {/* Practical Areas Checklist */}
              <div>
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", display: "block", marginBottom: 8, textTransform: "uppercase" }}>
                  // Practical Experience Focus
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {coreCompetencies.map((comp) => (
                    <span key={comp} className="badge badge-accent" style={{ fontSize: "0.75rem" }}>
                      <CheckCircle2 size={11} />
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education Box */}
              <div
                style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius-sm)",
                  padding: "var(--space-4)",
                  border: "1px solid var(--border)",
                  marginTop: "auto"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <GraduationCap size={20} color="var(--accent)" />
                    <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text)" }}>
                      {DATA.education.institution}
                    </span>
                  </div>
                  <span className="badge badge-success" style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                    CGPA: {DATA.education.cgpa}
                  </span>
                </div>

                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginLeft: 30 }}>
                  {DATA.education.degree}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginLeft: 30, marginTop: 3 }}>
                  Duration: {DATA.education.duration}
                </div>
              </div>
            </div>

            {/* Right Column: Core Pillars & Soft Skills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="card"
                    style={{
                      padding: "var(--space-5)",
                      display: "flex",
                      gap: "var(--space-4)",
                      alignItems: "flex-start"
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--radius-sm)",
                        background: "var(--accent-subtle)",
                        border: "1px solid var(--accent-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                        flexShrink: 0
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                        {pillar.title}
                      </h4>
                      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Soft Skills Card */}
              <div className="card" style={{ padding: "var(--space-5)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--space-3)" }}>
                  <Sparkles size={16} color="var(--accent)" />
                  <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--text)" }}>
                    Professional & Soft Skills
                  </h4>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {softSkills.map((s) => (
                    <span key={s} className="skill-tag-pill">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

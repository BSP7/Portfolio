import { useState } from "react";
import { ExternalLink, Terminal, Shield, Play, CheckCircle2, AlertTriangle, Lock, Cpu, Sparkles, RefreshCw, Key } from "lucide-react";
import { GithubIcon } from "./Icons";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";
import { useToast } from "./Toast";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(DATA.projects[0].id);
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'overview' | 'architecture'

  // Simulator States
  // Shadow Intent State
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [customPayload, setCustomPayload] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // ID Trust Auth State
  const [didInput, setDidInput] = useState("did:pavan:auth:user_94821");
  const [hashOutput, setHashOutput] = useState("");
  const [isVerifyingCrypto, setIsVerifyingCrypto] = useState(false);
  const [cryptoVerified, setCryptoVerified] = useState(false);

  // ZK-KYC State
  const [zkAgeInput, setZkAgeInput] = useState(21);
  const [zkState, setZkState] = useState({ proving: false, proof: null, verified: false });

  const { addToast } = useToast();

  const currentProject = DATA.projects.find((p) => p.id === selectedProject) || DATA.projects[0];

  // Run Shadow Intent Threat Simulator
  const handleRunThreatScan = (scenario) => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(scenario);
      addToast(`Threat analyzed: ${scenario.name} (${scenario.severity})`, scenario.severity === "Safe" ? "info" : "error");
    }, 450);
  };

  // Run Crypto Verifier
  const handleGenerateCryptoHash = () => {
    setIsVerifyingCrypto(true);
    setTimeout(() => {
      // Deterministic mock keccak256
      let hash = "0x";
      for (let i = 0; i < didInput.length; i++) {
        hash += (didInput.charCodeAt(i) * 17 % 16).toString(16);
      }
      while (hash.length < 66) hash += "f";
      setHashOutput(hash.substring(0, 66));
      setCryptoVerified(true);
      setIsVerifyingCrypto(false);
      addToast("Keccak256 cryptographic identity verified on EVM state!", "success");
    }, 400);
  };

  // Run ZK Prover
  const handleGenerateZkProof = () => {
    setZkState({ proving: true, proof: null, verified: false });
    setTimeout(() => {
      const isEligible = zkAgeInput >= 18;
      setZkState({
        proving: false,
        proof: {
          statement: "Claim: Age >= 18",
          claimValid: isEligible,
          zkProofHash: "pi_a: 0x8a92...b71c | pi_b: 0x4f12...e90a | pi_c: 0x11e4...345a",
          revealedInfo: "Zero PII leaked. Raw DOB is concealed."
        },
        verified: isEligible
      });
      addToast(isEligible ? "ZK-Proof generated & verified: Age >= 18 (True)" : "ZK-Proof Failed: Age < 18", isEligible ? "success" : "error");
    }, 500);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          tag="Engineering Projects"
          title="Interactive Project Simulators"
          description="Explore real architectures, threat vectors, and live interactive simulators for AI defense, Ethereum authentication, and Zero-Knowledge proofs."
        />

        {/* Project Selector Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
          {DATA.projects.map((proj) => {
            const isSelected = proj.id === selectedProject;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProject(proj.id);
                  setScanResult(null);
                }}
                className={`btn ${isSelected ? "btn-primary" : "btn-secondary"}`}
                style={{ borderRadius: "var(--radius-full)" }}
              >
                <Shield size={16} />
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Card */}
        <div className="project-card">
          {/* Project Header Info */}
          <div style={{ padding: "var(--space-6) var(--space-6) var(--space-4)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-4)", marginBottom: "var(--space-2)" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>
                  {currentProject.title}
                </h3>
                <span style={{ fontSize: "0.875rem", color: "var(--accent-text)", fontFamily: "var(--font-mono)" }}>
                  {currentProject.subtitle}
                </span>
              </div>

              <div style={{ display: "flex", gap: "var(--space-2)" }}>
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  aria-label="View Source on GitHub"
                >
                  <GithubIcon size={14} />
                  <span>Source Code</span>
                </a>
                <a
                  href={currentProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  aria-label="Live Demo Link"
                >
                  <ExternalLink size={14} />
                  <span>Live Sandbox</span>
                </a>
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", maxWidth: 840, lineHeight: 1.6, marginBlock: "var(--space-3)" }}>
              {currentProject.desc}
            </p>

            {/* Tech Stack Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
              {currentProject.tech.map((t) => (
                <span key={t} className="skill-tag-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="project-tabs">
            <button
              onClick={() => setActiveTab("simulator")}
              className={`project-tab-btn ${activeTab === "simulator" ? "active" : ""}`}
            >
              <Play size={13} style={{ display: "inline", marginRight: 6 }} />
              Live Interactive Simulator
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`project-tab-btn ${activeTab === "architecture" ? "active" : ""}`}
            >
              <Cpu size={13} style={{ display: "inline", marginRight: 6 }} />
              Architecture & Security Model
            </button>
          </div>

          {/* Tab Content Box */}
          <div style={{ padding: "var(--space-6)" }}>
            {/* 1. SIMULATOR TAB */}
            {activeTab === "simulator" && (
              <div>
                {/* A. SHADOW INTENT SIMULATOR */}
                {currentProject.id === "shadow-intent" && (
                  <div className="project-simulator-box">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
                      <div>
                        <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-text)", fontFamily: "var(--font-mono)" }}>
                          // AI THREAT DETECTION PLAYGROUND
                        </span>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          Select an attack payload scenario to simulate real-time heuristic packet inspection:
                        </div>
                      </div>
                      <span className="badge badge-accent">Model: Heuristic Random Forest v2.4</span>
                    </div>

                    {/* Threat Scenarios Selection */}
                    <div className="sim-control-row">
                      {currentProject.threatScenarios?.map((sc, idx) => (
                        <button
                          key={sc.name}
                          onClick={() => {
                            setSelectedScenarioIndex(idx);
                            handleRunThreatScan(sc);
                          }}
                          className={`btn btn-sm ${selectedScenarioIndex === idx ? "btn-primary" : "btn-secondary"}`}
                        >
                          {sc.name}
                        </button>
                      ))}
                    </div>

                    {/* Scan Trigger & Output */}
                    <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "var(--radius-sm)", padding: "var(--space-4)", border: "1px solid var(--border)" }}>
                      {isScanning ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12 }}>
                          <RefreshCw size={16} className="avail-dot" />
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                            Analyzing telemetry & vector weights through ML classifier...
                          </span>
                        </div>
                      ) : scanResult ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              {scanResult.severity === "Safe" ? (
                                <CheckCircle2 size={18} color="var(--success)" />
                              ) : (
                                <AlertTriangle size={18} color="var(--danger)" />
                              )}
                              <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text)" }}>
                                {scanResult.name}
                              </span>
                            </div>
                            <span
                              className={`badge ${scanResult.severity === "Safe" ? "badge-success" : "badge-warning"}`}
                            >
                              Severity: {scanResult.severity}
                            </span>
                          </div>

                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            Payload: <code style={{ color: "var(--accent-text)" }}>{scanResult.payload}</code>
                          </div>

                          {/* Confidence Bar */}
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                              <span>Threat Confidence:</span>
                              <span style={{ color: scanResult.confidence > 50 ? "var(--danger)" : "var(--success)" }}>
                                {scanResult.confidence}%
                              </span>
                            </div>
                            <div className="sim-output-meter">
                              <div
                                className="sim-meter-fill"
                                style={{
                                  width: `${scanResult.confidence}%`,
                                  backgroundColor: scanResult.confidence > 50 ? "var(--danger)" : "var(--success)"
                                }}
                              />
                            </div>
                          </div>

                          <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: 4 }}>
                            <strong>Automated Action:</strong> <span style={{ color: "var(--text)" }}>{scanResult.status}</span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ textAlign: "center", padding: "16px", color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                          Click any attack scenario above to run the live AI classifier!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* B. ID TRUST AUTH SIMULATOR */}
                {currentProject.id === "id-trust-auth" && (
                  <div className="project-simulator-box">
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-text)", fontFamily: "var(--font-mono)" }}>
                        // CRYPTOGRAPHIC IDENTITY GENERATOR & VERIFIER
                      </span>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Generate a deterministic Keccak-256 identifier and simulate EVM on-chain state verification:
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                      <input
                        type="text"
                        className="form-input"
                        value={didInput}
                        onChange={(e) => {
                          setDidInput(e.target.value);
                          setCryptoVerified(false);
                        }}
                        placeholder="Enter Decentralized Identifier (DID)..."
                      />
                      <button
                        onClick={handleGenerateCryptoHash}
                        disabled={isVerifyingCrypto || !didInput}
                        className="btn btn-primary"
                      >
                        <Key size={14} />
                        <span>{isVerifyingCrypto ? "Computing..." : "Verify Hash"}</span>
                      </button>
                    </div>

                    {hashOutput && (
                      <div style={{ background: "rgba(0,0,0,0.4)", padding: "var(--space-4)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 4, fontFamily: "var(--font-mono)" }}>
                          KECCAK-256 HASH COMMITMENT:
                        </div>
                        <code style={{ fontSize: "0.8125rem", color: "var(--accent-text)", wordBreak: "break-all" }}>
                          {hashOutput}
                        </code>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: "0.8125rem", color: "var(--success)" }}>
                          <CheckCircle2 size={16} />
                          <span>Identity successfully anchored to simulated Ethereum Smart Contract State Root.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* C. ZERO-KNOWLEDGE KYC SIMULATOR */}
                {currentProject.id === "zero-knowledge-kyc" && (
                  <div className="project-simulator-box">
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--accent-text)", fontFamily: "var(--font-mono)" }}>
                        // ZERO-KNOWLEDGE ATTRIBUTES PROVER (zk-SNARK)
                      </span>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Prove the claim "Age &gt;= 18" mathematically without revealing the user's birthdate or personally identifiable records:
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                          User Age (Private Input):
                        </label>
                        <input
                          type="number"
                          className="form-input"
                          style={{ width: 80, padding: "8px 12px" }}
                          value={zkAgeInput}
                          min={10}
                          max={99}
                          onChange={(e) => setZkAgeInput(Number(e.target.value))}
                        />
                      </div>

                      <button
                        onClick={handleGenerateZkProof}
                        disabled={zkState.proving}
                        className="btn btn-primary"
                      >
                        <Lock size={14} />
                        <span>{zkState.proving ? "Synthesizing Proof..." : "Generate ZK Proof"}</span>
                      </button>
                    </div>

                    {zkState.proof && (
                      <div style={{ background: "rgba(0,0,0,0.4)", padding: "var(--space-4)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text)" }}>
                            {zkState.proof.statement}
                          </span>
                          <span className={`badge ${zkState.verified ? "badge-success" : "badge-warning"}`}>
                            {zkState.verified ? "VALID PROOF" : "INVALID PROOF"}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-text)", marginBottom: 6 }}>
                          {zkState.proof.zkProofHash}
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                          {zkState.proof.revealedInfo}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 2. ARCHITECTURE TAB */}
            {activeTab === "architecture" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <div style={{ background: "var(--surface)", padding: "var(--space-5)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                    System Architecture & Verification Model
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {currentProject.architecture}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
                  <div className="card" style={{ padding: "var(--space-4)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>THREAT VECTOR MITIGATIONS</div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", marginTop: 4 }}>
                      Zero-Trust Principle & Tamper-Resistant Proofs
                    </div>
                  </div>
                  <div className="card" style={{ padding: "var(--space-4)" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>DEPLOYMENT READINESS</div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--accent-text)", marginTop: 4 }}>
                      Verified in Hackathon Competitions
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

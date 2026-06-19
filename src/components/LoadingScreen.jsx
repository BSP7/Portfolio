import React, { useState, useEffect } from "react";

export function LoadingScreen({ onDone }) {
  const [authStep, setAuthStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [scanLine, setScanLine] = useState(0);
  const [phase, setPhase] = useState(0); // 0: auth, 1: success, 2: welcome, 3: entering, 4: done

  const authSequence = [
    { label: "Initializing Security Protocol", duration: 800 },
    { label: "Loading Portfolio Assets", duration: 1000 },
    { label: "Verifying Identity", duration: 900 },
    { label: "Establishing Secure Connection", duration: 800 },
    { label: "Authentication Successful", duration: 500 }
  ];

  const terminalMessages = [
    "Loading Skills Database...",
    "Decrypting modules...",
    "Initializing AI Security Modules...",
    "Verifying Portfolio Integrity...",
    "Bypassing firewalls...",
    "Establishing Secure Session...",
    "Handshake verified.",
    "Access Granted."
  ];

  useEffect(() => {
    let currentStep = 0;
    let timeAcc = 0;
    const timeouts = [];

    // Auth sequence logic
    authSequence.forEach((step, idx) => {
      timeAcc += step.duration;
      timeouts.push(setTimeout(() => setAuthStep(idx + 1), timeAcc));
    });

    // Final phase triggers
    timeouts.push(setTimeout(() => setPhase(1), timeAcc + 200)); // Success
    timeouts.push(setTimeout(() => setPhase(2), timeAcc + 1500)); // Welcome
    timeouts.push(setTimeout(() => setPhase(3), timeAcc + 3000)); // Entering
    timeouts.push(setTimeout(() => onDone(), timeAcc + 4200)); // Done

    // Terminal logs logic
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < terminalMessages.length) {
        setLogs(prev => [...prev, terminalMessages[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, (timeAcc + 200) / terminalMessages.length);

    // Progress logic
    let prog = 0;
    const pTimer = setInterval(() => {
      prog += (100 / (timeAcc / 50));
      if (prog >= 100) { prog = 100; clearInterval(pTimer); }
      setProgress(Math.min(100, prog));
    }, 50);

    // Fingerprint scan beam logic
    const scanTimer = setInterval(() => setScanLine(s => (s + 2) % 100), 20);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(pTimer);
      clearInterval(logInterval);
      clearInterval(scanTimer);
    };
  }, [onDone]);

  // Generate matrix code rain
  const codeRain = Array.from({ length: 15 }).map((_, i) => (
    <div key={i} style={{
      position: "absolute",
      left: `${(i / 15) * 100}%`,
      top: "-10%",
      color: "var(--accent)",
      opacity: Math.random() * 0.15 + 0.05,
      fontSize: "10px",
      fontFamily: "var(--font-mono)",
      writingMode: "vertical-rl",
      textOrientation: "upright",
      animation: `codeRain ${Math.random() * 3 + 2}s linear infinite`,
      animationDelay: `${Math.random() * 2}s`
    }}>
      {Array.from({ length: 20 }).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')}
    </div>
  ));

  const mobileStyles = `
    @keyframes fadeOut { to { opacity: 0; } }
    .loading-container {
      display: flex;
      width: 100%;
      max-width: 1000px;
      padding: 0 24px;
      position: relative;
      z-index: 1;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 60px;
      align-items: center;
    }
    .hud-element { display: flex; }
    .col-left { order: 1; flex: 1; min-width: 280px; max-width: 350px; }
    .col-center { order: 2; width: 280px; display: flex; flex-direction: column; align-items: center; }
    .col-right { order: 3; flex: 1; min-width: 280px; max-width: 350px; }
    
    @media (max-width: 850px) {
      .loading-container {
        flex-direction: column;
        gap: 30px;
        padding: 80px 20px 40px;
        height: 100vh;
        overflow-y: auto;
        justify-content: flex-start;
      }
      .col-center { order: 1; }
      .col-right { order: 2; width: 100% !important; max-width: 100% !important; }
      .col-left { order: 3; width: 100% !important; max-width: 100% !important; height: 150px !important; }
      .hud-element { display: none !important; }
    }
  `;

  if (phase >= 1) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "var(--bg)", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", overflow: "hidden", animation: phase === 3 ? "glitch 0.2s 3, fadeOut 1s forwards" : "none", opacity: phase === 3 ? 0 : 1, transition: "opacity 1s ease" }}>
        <style>{mobileStyles}</style>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(251,191,36,0.03) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(251,191,36,0.03) 60px)`, backgroundSize: "60px 60px" }} />
        
        {phase >= 1 && <div style={{ fontSize: "clamp(24px, 5vw, 42px)", color: "var(--accent)", letterSpacing: 4, marginBottom: 40, animation: "flicker 2s infinite" }}>AUTHENTICATION SUCCESSFUL</div>}
        {phase >= 2 && <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 6vw, 56px)", color: "var(--text)", fontWeight: "bold", marginBottom: 20, animation: "fadeUp 0.8s ease both", textAlign: "center" }}>WELCOME</div>}
        {phase >= 3 && <div style={{ fontSize: 16, color: "var(--accent-emerald)", letterSpacing: 6, animation: "pulse 1s infinite", textAlign: "center" }}>ENTERING SECURE WORKSPACE...</div>}
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--bg)", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", overflow: "hidden" }}>
      <style>{mobileStyles}</style>
      {/* Background Enhancements */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(251,191,36,0.03) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(251,191,36,0.03) 60px)`, backgroundSize: "60px 60px", animation: "gridMove 10s linear infinite" }} />
      {codeRain}

      {/* Security Metrics HUD */}
      <div className="hud-element" style={{ position: "absolute", top: 24, left: 24, fontSize: 10, color: "var(--accent)", letterSpacing: 2, opacity: 0.7, flexDirection: "column", gap: 4 }}>
        <span style={{ color: "var(--text3)" }}>SYSTEM STATUS</span>
        <span>ONLINE</span>
      </div>
      <div className="hud-element" style={{ position: "absolute", top: 24, right: 24, fontSize: 10, color: "var(--accent)", letterSpacing: 2, opacity: 0.7, flexDirection: "column", gap: 4, textAlign: "right" }}>
        <span style={{ color: "var(--text3)" }}>ENCRYPTION</span>
        <span>AES-256</span>
      </div>
      <div className="hud-element" style={{ position: "absolute", bottom: 24, left: 24, fontSize: 10, color: "var(--accent)", letterSpacing: 2, opacity: 0.7, flexDirection: "column", gap: 4 }}>
        <span style={{ color: "var(--text3)" }}>LOCATION</span>
        <span>BENGALURU</span>
      </div>
      <div className="hud-element" style={{ position: "absolute", bottom: 24, right: 24, fontSize: 10, color: "var(--accent-emerald)", letterSpacing: 2, opacity: 0.7, flexDirection: "column", gap: 4, textAlign: "right" }}>
        <span style={{ color: "var(--text3)" }}>SECURE CHANNEL</span>
        <span style={{ animation: "pulse 2s infinite" }}>ACTIVE</span>
      </div>

      <div className="loading-container">
        
        {/* Dynamic Terminal Logs (Left Side) */}
        <div className="col-left" style={{ border: "1px solid rgba(251,191,36,0.2)", background: "rgba(2,2,2,0.8)", borderRadius: 4, padding: 16, height: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", position: "relative", backdropFilter: "blur(4px)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--accent)", opacity: 0.5 }} />
          <div style={{ fontSize: 10, color: "var(--accent)", marginBottom: 12, opacity: 0.6 }}>[ TERMINAL / LOGS ]</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {logs.map((log, i) => (
              <div key={i} style={{ fontSize: 11, color: "var(--text2)", animation: "fadeIn 0.3s ease" }}>{`> ${log}`}</div>
            ))}
            <div style={{ fontSize: 11, color: "var(--accent)", animation: "blink 1s step-end infinite" }}>_</div>
          </div>
        </div>

        {/* Center: Fingerprint & Identity */}
        <div className="col-center">
          {/* Enhanced Fingerprint Scanner */}
          <div style={{ position: "relative", width: 140, height: 140, marginBottom: 24, border: "1px solid rgba(251,191,36,0.3)", borderRadius: "50%", padding: 20, boxShadow: "0 0 30px rgba(251,191,36,0.1)", background: "rgba(2,2,2,0.5)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, border: "2px solid var(--accent)", borderRadius: "50%", opacity: 0.2, animation: "borderSpin 4s linear infinite" }} />
            
            <svg viewBox="0 0 180 180" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 15px rgba(251,191,36,0.6))" }}>
              <defs>
                <radialGradient id="fpGrad" cx="50%" cy="50%"><stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" /><stop offset="100%" stopColor="var(--accent)" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="90" cy="90" r="85" fill="url(#fpGrad)" />
              {[18, 28, 38, 48, 58, 68, 78, 88].map((r, i) => (
                <ellipse key={i} cx="90" cy="90" rx={r} ry={r * 1.15} fill="none" stroke="rgba(251,191,36,0.8)" strokeWidth="1.5" strokeDasharray={authStep >= 5 ? "none" : "4 4"} style={{ opacity: authStep >= 5 ? 1 : 0.6 }} />
              ))}
            </svg>
            
            {/* Animated scanning beam */}
            {authStep < 5 && (
              <div style={{ position: "absolute", left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, transparent, rgba(251,191,36,0.4), transparent)", top: `${scanLine}%`, transform: "translateY(-50%)", pointerEvents: "none" }} />
            )}
            {authStep < 5 && (
              <div style={{ position: "absolute", left: 0, right: 0, height: "2px", background: "var(--accent)", top: `${scanLine}%`, transform: "translateY(-50%)", boxShadow: "0 0 10px var(--accent)", pointerEvents: "none" }} />
            )}
            
            {/* Success Particle Burst Overlay */}
            {authStep >= 5 && <div style={{ position: "absolute", inset: 0, background: "var(--accent)", opacity: 0.2, animation: "pulse 0.5s ease 2" }} />}
          </div>

          {/* Professional Identity */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text)", fontWeight: "bold", letterSpacing: 2, marginBottom: 8, animation: "flicker 5s infinite" }}>PAVAN//PORTFOLIO</div>
            <div style={{ color: "var(--accent)", fontSize: 11, letterSpacing: 2, opacity: 0.8 }}>Cybersecurity • AI • Blockchain</div>
          </div>
        </div>

        {/* Authentication Sequence (Right Side) */}
        <div className="col-right" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 10, color: "var(--accent)", marginBottom: 8, opacity: 0.6 }}>[ AUTHENTICATION SEQUENCE ]</div>
          {authSequence.map((step, i) => {
            const isActive = authStep === i;
            const isDone = authStep > i;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: isDone || isActive ? 1 : 0.3, transition: "opacity 0.3s" }}>
                <div style={{ width: 16, height: 16, border: "1px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", background: isDone ? "var(--accent)" : "transparent", color: "var(--bg)", fontSize: 10, transition: "all 0.3s" }}>
                  {isDone ? "✓" : isActive ? <span style={{ animation: "pulse 1s infinite" }}>■</span> : ""}
                </div>
                <div style={{ fontSize: 12, color: isDone ? "var(--accent)" : "var(--text2)", textShadow: isDone ? "0 0 8px rgba(251,191,36,0.4)" : "none" }}>{step.label}</div>
              </div>
            );
          })}
          
          {/* Segmented Progress System */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--accent)", marginBottom: 8 }}>
              <span>PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ display: "flex", gap: 2, height: 8 }}>
              {Array.from({ length: 20 }).map((_, i) => {
                const filled = (i / 20) * 100 <= progress;
                return (
                  <div key={i} style={{ flex: 1, background: filled ? "var(--accent)" : "rgba(251,191,36,0.1)", boxShadow: filled ? "0 0 5px rgba(251,191,36,0.5)" : "none", transition: "background 0.1s" }} />
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

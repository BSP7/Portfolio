import React, { useState, useEffect } from "react";

export function LoadingScreen({ onDone }) {
  // 0: Black, 1: Grid, 2: HUD, 3: Terminal+FP, 4: Typing, 5: Pulse, 6: Transition Out
  const [bootStage, setBootStage] = useState(0);
  const [activeTermIdx, setActiveTermIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const [history, setHistory] = useState([]);
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [scanPos, setScanPos] = useState(0);

  const authSteps = [
    "Initializing Security Protocol",
    "Loading Portfolio Assets",
    "Verifying Identity",
    "Secure Connection",
    "Access Granted"
  ];

  const terminalSequence = [
    { text: "Initializing Secure Kernel...", progress: 20 },
    { text: "Decrypting Portfolio Modules...", progress: 40 },
    { text: "Biometric Authentication...", progress: 65, scanning: true },
    { text: "Establishing Encrypted Tunnel...", progress: 85 },
    { text: "Initializing AI Security Engine...", progress: 100 },
  ];

  // Smooth progress ease
  useEffect(() => {
    let animationFrame;
    const updateProgress = () => {
      setDisplayProgress(prev => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) return progress;
        return prev + diff * 0.1; 
      });
      animationFrame = requestAnimationFrame(updateProgress);
    };
    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [progress]);

  // Master Boot Timeline
  useEffect(() => {
    const t1 = setTimeout(() => setBootStage(1), 300);
    const t2 = setTimeout(() => setBootStage(2), 600);
    const t3 = setTimeout(() => setBootStage(3), 1000);
    const t4 = setTimeout(() => setBootStage(4), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Terminal Typing Logic
  useEffect(() => {
    if (bootStage < 4 || activeTermIdx >= terminalSequence.length) return;

    let isCancelled = false;
    const currentTask = terminalSequence[activeTermIdx];
    
    setTypedChars(0);
    setShowCheck(false);

    const typeNextChar = () => {
      if (isCancelled) return;
      setTypedChars(prev => {
        const next = prev + 1;
        if (next < currentTask.text.length) {
           setTimeout(typeNextChar, Math.random() * 15 + 15);
        } else {
           setTimeout(() => {
             if (isCancelled) return;
             if (currentTask.scanning) {
               setTimeout(() => {
                 if (!isCancelled) {
                   setShowCheck(true);
                   setProgress(currentTask.progress);
                   finishLine();
                 }
               }, 900);
             } else {
               setShowCheck(true);
               setProgress(currentTask.progress);
               finishLine();
             }
           }, 150);
        }
        return next;
      });
    };

    setTimeout(typeNextChar, 100);

    const finishLine = () => {
      setTimeout(() => {
        if (isCancelled) return;
        setHistory(h => [...h, { text: currentTask.text, check: true }]);
        
        if (activeTermIdx === terminalSequence.length - 1) {
          setTimeout(() => setBootStage(5), 400); // Trigger climax
        } else {
          setActiveTermIdx(i => i + 1);
        }
      }, 400); 
    };

    return () => { isCancelled = true; };
  }, [bootStage, activeTermIdx]);

  // Transition Out
  useEffect(() => {
    if (bootStage === 5) {
      const t = setTimeout(() => {
        setBootStage(6);
        setTimeout(() => onDone(), 1200); 
      }, 1500); // 1.5s hold on climax
      return () => clearTimeout(t);
    }
  }, [bootStage, onDone]);

  // Scan line animation
  useEffect(() => {
    if (bootStage >= 4 && bootStage < 5) {
      let startTime = performance.now();
      let frame;
      const animateScan = (time) => {
        const elapsed = time - startTime;
        const cycle = (elapsed % 2500) / 2500;
        const eased = (Math.sin(cycle * Math.PI * 2 - Math.PI/2) + 1) / 2;
        setScanPos(eased * 100);
        frame = requestAnimationFrame(animateScan);
      };
      frame = requestAnimationFrame(animateScan);
      return () => cancelAnimationFrame(frame);
    }
  }, [bootStage]);

  // CSS injected for cinematic styling
  const premiumStyles = `
    @keyframes fadeZoomIn {
      0% { opacity: 0; transform: scale(0.97); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes fadeOutZoom {
      0% { opacity: 1; transform: scale(1); filter: blur(0px); }
      100% { opacity: 0; transform: scale(1.05); filter: blur(4px); }
    }
    @keyframes slideRightFade {
      0% { opacity: 0; transform: translateX(-15px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes subtleFlicker {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 0.4; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes signatureBloom {
      0% { filter: drop-shadow(0 0 15px rgba(251,191,36,0.2)); transform: scale(1); }
      50% { filter: drop-shadow(0 0 60px rgba(251,191,36,0.8)); transform: scale(1.02); }
      100% { filter: drop-shadow(0 0 20px rgba(251,191,36,0.4)); transform: scale(1); }
    }
    @keyframes pulseRing {
      0% { transform: scale(1); opacity: 0.8; border-width: 2px; }
      100% { transform: scale(2.5); opacity: 0; border-width: 0px; }
    }
    @keyframes borderSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .ease-out-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
    .ease-in-out-cubic { transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1); }

    .loading-container {
      display: flex;
      width: 100%;
      max-width: 1000px;
      padding: 0 24px;
      position: relative;
      z-index: 2;
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

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;

  // Determine which auth steps are pending/active/done based on activeTermIdx
  const getAuthStepStatus = (index) => {
    if (activeTermIdx > index) return 'done';
    if (activeTermIdx === index && bootStage >= 4) return 'active';
    return 'pending';
  };

  return (
    <div style={{ 
      position: "fixed", inset: 0, background: "var(--bg)", zIndex: 9999, 
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
      fontFamily: "var(--font-mono)", overflow: "hidden",
      animation: bootStage === 6 ? "fadeOutZoom 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards" : "none"
    }}>
      <style>{premiumStyles}</style>
      
      {/* Visual Depth: Background Layer */}
      {bootStage >= 1 && (
        <>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(251,191,36,0.02) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(251,191,36,0.02) 60px)`, backgroundSize: "60px 60px", opacity: 0.5, animation: "fadeIn 2s ease-out forwards" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 30%, var(--bg) 90%)", zIndex: 1 }} />
        </>
      )}

      {/* Visual Depth: Middle Layer (HUD) */}
      {bootStage >= 2 && (
        <div style={{ animation: "fadeIn 1s ease-out forwards", position: "absolute", inset: 0, zIndex: 1 }}>
          <div className="hud-element" style={{ position: "absolute", top: 24, left: 24, fontSize: 10, color: "var(--accent)", letterSpacing: 2, opacity: 0.7, flexDirection: "column", gap: 4 }}>
            <span style={{ color: "var(--text3)" }}>SYSTEM STATUS</span>
            <span style={{ animation: "subtleFlicker 3s infinite" }}>ONLINE</span>
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
            <span style={{ animation: "subtleFlicker 4s infinite" }}>ACTIVE</span>
          </div>
        </div>
      )}

      {/* Visual Depth: Foreground Layer (Core UI) */}
      <div className="loading-container">
        
        {/* Terminal (Left) */}
        <div className="col-left">
          {bootStage >= 3 && (
            <div style={{ border: "1px solid rgba(251,191,36,0.15)", background: "rgba(10,10,10,0.6)", borderRadius: 4, padding: "20px 24px", height: 220, display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", position: "relative", backdropFilter: "blur(8px)", animation: "fadeZoomIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.3 }} />
              <div style={{ fontSize: 9, color: "var(--accent)", marginBottom: 16, opacity: 0.5, letterSpacing: 2 }}>[ SECURE KERNEL / LOGS ]</div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {history.map((log, i) => (
                  <div key={i} style={{ fontSize: 11, color: "var(--text2)" }}>
                    <div style={{ opacity: 0.8 }}>{`> ${log.text}`}</div>
                    <div style={{ color: "var(--accent)", marginTop: 2, fontSize: 10, opacity: 0.9 }}>✓ Complete</div>
                  </div>
                ))}
                
                {bootStage >= 4 && activeTermIdx < terminalSequence.length && (
                  <div style={{ fontSize: 11, color: "var(--text2)" }}>
                    <div style={{ opacity: 0.9 }}>
                      {`> ${terminalSequence[activeTermIdx].text.substring(0, typedChars)}`}
                      <span style={{ color: "var(--accent)", animation: "blink 1s step-end infinite" }}>_</span>
                    </div>
                    {terminalSequence[activeTermIdx].scanning && typedChars === terminalSequence[activeTermIdx].text.length && !showCheck && (
                      <div style={{ color: "var(--text3)", marginTop: 2, fontSize: 10, animation: "fadeIn 0.3s ease-out" }}>Scanning...</div>
                    )}
                    {showCheck && (
                      <div style={{ color: "var(--accent)", marginTop: 2, fontSize: 10, animation: "fadeIn 0.3s ease-out" }}>✓ Complete</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Center: Fingerprint */}
        <div className="col-center">
          {bootStage >= 3 && (
            <div style={{ animation: "fadeZoomIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards" }}>
              <div style={{ position: "relative", width: 140, height: 140, marginBottom: 32, border: "1px solid rgba(251,191,36,0.15)", borderRadius: "50%", padding: 20, background: "rgba(10,10,10,0.4)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", animation: bootStage === 5 ? "signatureBloom 1.5s ease-out forwards" : "none", transition: "all 0.5s ease" }}>
                
                {/* Slow rotating outer ring */}
                <div style={{ position: "absolute", inset: 0, border: "1px dashed rgba(251,191,36,0.3)", borderRadius: "50%", animation: "borderSpin 20s linear infinite" }} />
                
                {/* Signature Pulse Ring */}
                {bootStage === 5 && <div style={{ position: "absolute", inset: 0, border: "2px solid var(--accent)", borderRadius: "50%", animation: "pulseRing 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards" }} />}

                <svg className="fingerprint-svg-enhanced" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", opacity: bootStage >= 5 ? 1 : 0.85, transition: "opacity 0.5s ease" }}>
                  <defs>
                    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur1" />
                      <feGaussianBlur stdDeviation="5" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#neon-glow)">
                    <path d="M 57 60 A 3 3 0 1 1 63 60 L 63 75 M 57 60 L 57 65" />
                    <path d="M 53 60 A 7 7 0 1 1 67 60 L 67 70 M 53 60 L 53 78" />
                    <path d="M 49 60 A 11 11 0 1 1 71 60 L 71 85 M 49 60 L 49 72 M 49 78 L 49 82" />
                    <path d="M 45 60 A 15 15 0 1 1 75 60 L 75 65 M 75 72 L 75 88 M 45 60 L 45 92" />
                    <path d="M 41 60 A 19 19 0 1 1 79 60 L 79 90 M 41 60 L 41 70 M 41 76 L 41 85" />
                    <path d="M 37 60 A 23 23 0 1 1 83 60 L 83 75 M 83 80 L 83 95 M 37 60 L 37 98" />
                    <path d="M 33 60 A 27 27 0 1 1 87 60 L 87 88 M 33 60 L 33 80 M 33 86 L 33 92" />
                    <path d="M 29 60 A 31 31 0 1 1 91 60 L 91 96 M 29 60 L 29 75 M 29 82 L 29 100" />
                    <path d="M 25 60 A 35 35 0 1 1 95 60 L 95 85 M 95 90 L 95 98 M 25 60 L 25 90" />
                    <path d="M 21 60 A 39 39 0 1 1 99 60 L 99 75 M 99 82 L 99 102 M 21 60 L 21 78 M 21 84 L 21 95" />
                    <path d="M 17 60 A 43 43 0 1 1 103 60 L 103 90 M 17 60 L 17 85 M 17 92 L 17 105" />
                    <path d="M 13 60 A 47 47 0 1 1 107 60 L 107 100 M 13 60 L 13 72 M 13 80 L 13 98" />
                  </g>
                </svg>

                {/* Ambient breathing glow */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(251,191,36,0.15) 0%, transparent 60%)", pointerEvents: "none", animation: "subtleFlicker 4s infinite alternate" }} />

                {/* Animated scanning beam */}
                {bootStage >= 4 && bootStage < 5 && (
                  <>
                    <div style={{ position: "absolute", left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, transparent, rgba(251,191,36,0.15), transparent)", top: `${scanPos}%`, transform: "translateY(-50%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "var(--accent)", top: `${scanPos}%`, transform: "translateY(-50%)", boxShadow: "0 0 15px var(--accent)", pointerEvents: "none", opacity: 0.8 }} />
                  </>
                )}
              </div>

              {/* Branding */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: bootStage === 5 ? "var(--accent)" : "var(--text)", fontWeight: "bold", letterSpacing: 4, marginBottom: 8, transition: "color 0.5s ease" }}>
                  {bootStage === 5 ? "ACCESS GRANTED" : "PAVAN//PORTFOLIO"}
                </div>
                <div style={{ color: "var(--accent)", fontSize: 10, letterSpacing: 3, opacity: 0.6 }}>Cybersecurity • AI • Blockchain</div>
              </div>
            </div>
          )}
        </div>

        {/* Auth Timeline (Right) */}
        <div className="col-right">
          {bootStage >= 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeZoomIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards", animationDelay: "0.2s", opacity: 0 }}>
              <div style={{ fontSize: 9, color: "var(--accent)", opacity: 0.5, letterSpacing: 2 }}>[ AUTHENTICATION ]</div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {authSteps.map((step, i) => {
                  const status = getAuthStepStatus(i);
                  const isDone = status === 'done';
                  const isActive = status === 'active';
                  
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, opacity: isDone ? 0.4 : (isActive ? 1 : 0.2), transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)", transform: isActive ? "translateX(4px)" : "translateX(0)" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1px solid ${isActive || isDone ? "var(--accent)" : "var(--text3)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: isDone ? "var(--accent)" : "transparent", color: "var(--bg)", fontSize: 8, transition: "all 0.5s ease", boxShadow: isActive ? "0 0 10px rgba(251,191,36,0.4)" : "none" }}>
                        {isDone ? "✓" : isActive ? <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", animation: "blink 1.5s ease infinite" }} /> : ""}
                      </div>
                      <div style={{ fontSize: 12, color: isActive || isDone ? "var(--text)" : "var(--text2)", letterSpacing: 0.5, transition: "color 0.5s ease" }}>{step}</div>
                    </div>
                  );
                })}
              </div>

              {/* Segmented Progress */}
              <div style={{ marginTop: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--accent)", marginBottom: 12, opacity: 0.7, letterSpacing: 2 }}>
                  <span>PROGRESS</span>
                  <span>{Math.round(displayProgress)}%</span>
                </div>
                <div style={{ display: "flex", gap: 4, height: 4 }}>
                  {Array.from({ length: 10 }).map((_, i) => {
                    const threshold = (i / 10) * 100;
                    const filled = displayProgress >= threshold;
                    return (
                      <div key={i} style={{ flex: 1, background: filled ? "var(--accent)" : "rgba(251,191,36,0.1)", borderRadius: 1, boxShadow: filled ? "0 0 8px rgba(251,191,36,0.6)" : "none", transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)" }} />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

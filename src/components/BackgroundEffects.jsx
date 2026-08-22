/*
 * BackgroundEffects — Global ambient effects layer.
 *
 * Features:
 * - Animated perspective grid with subtle amber horizon
 * - Aurora gradient blobs (Solar Amber, Warm Gold, Deep Indigo)
 * - Floating code / cybersecurity telemetry tags
 * - Completely hardware-accelerated, pointer-events: none
 */
export function BackgroundEffects() {
  const codeTags = [
    { text: "0x7f9a...c4b2 // KECCAK-256", top: "12%", left: "6%", delay: 0 },
    { text: "const proof = await zkSnark.prove();", top: "28%", right: "8%", delay: 2 },
    { text: "class ThreatClassifier(nn.Module):", top: "54%", left: "4%", delay: 4 },
    { text: "did:pavan:auth:user_94821 // EVM VERIFIED", top: "72%", right: "6%", delay: 1 },
    { text: "export default async function verifyAttestation()", top: "86%", left: "10%", delay: 3 },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* 1. Perspective Matrix Grid */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) perspective(600px) rotateX(65deg)",
          width: "220vw",
          height: "80vh",
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transformOrigin: "center bottom",
        }}
      />

      {/* 2. Top-Right Solar Amber Aurora Blob */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: "-5%",
          width: "clamp(350px, 45vw, 650px)",
          height: "clamp(350px, 45vw, 650px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.07) 0%, rgba(217, 119, 6, 0.03) 45%, transparent 70%)",
          filter: "blur(90px)",
          animation: "auroraMorph 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* 3. Bottom-Left Gold/Amber Aurora Blob */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "-10%",
          width: "clamp(300px, 40vw, 550px)",
          height: "clamp(300px, 40vw, 550px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.02) 50%, transparent 75%)",
          filter: "blur(100px)",
          animation: "auroraMorph 34s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />

      {/* 4. Center Subtle Deep Pulse */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "35%",
          width: "clamp(250px, 35vw, 450px)",
          height: "clamp(250px, 35vw, 450px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "auroraMorph 22s ease-in-out infinite 5s",
          willChange: "transform",
        }}
      />

      {/* 5. Floating Code & Telemetry Tags */}
      {codeTags.map((tag, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: tag.top,
            left: tag.left,
            right: tag.right,
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            color: "rgba(245, 158, 11, 0.12)",
            letterSpacing: "0.08em",
            userSelect: "none",
            animation: `floatSlow 14s ease-in-out infinite ${tag.delay}s`,
            whiteSpace: "nowrap",
          }}
        >
          {tag.text}
        </div>
      ))}
    </div>
  );
}

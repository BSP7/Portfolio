/*
 * BackgroundEffects — Global ambient effects layer.
 *
 * Features:
 * - Animated perspective grid
 * - Aurora gradient blobs (animated)
 * - Floating code snippet elements
 * All behind content (z-index: 0), pointer-events: none
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >
      {/* Perspective grid */}
      <div
        style={{
          position:   "absolute",
          bottom:     0,
          left:       "50%",
          transform:  "translateX(-50%) perspective(500px) rotateX(65deg)",
          width:      "200vw",
          height:     "80vh",
          opacity:    0.02,
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transformOrigin: "center bottom",
        }}
      />

      {/* Aurora blobs — slow morphing gradients */}
      <div
        style={{
          position:    "absolute",
          top:         "20%",
          left:        "-10%",
          width:       "clamp(300px, 50vw, 600px)",
          height:      "clamp(300px, 50vw, 600px)",
          borderRadius: "50%",
          background:  "radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)",
          filter:      "blur(80px)",
          animation:   "auroraMorph 30s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position:    "absolute",
          bottom:      "10%",
          right:       "-10%",
          width:       "clamp(250px, 40vw, 500px)",
          height:      "clamp(250px, 40vw, 500px)",
          borderRadius: "50%",
          background:  "radial-gradient(circle, rgba(108,99,255,0.03) 0%, transparent 70%)",
          filter:      "blur(80px)",
          animation:   "auroraMorph 25s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position:    "absolute",
          top:         "60%",
          left:        "30%",
          width:       "clamp(200px, 30vw, 400px)",
          height:      "clamp(200px, 30vw, 400px)",
          borderRadius: "50%",
          background:  "radial-gradient(circle, rgba(255,0,255,0.02) 0%, transparent 70%)",
          filter:      "blur(80px)",
          animation:   "auroraMorph 35s ease-in-out infinite 10s",
        }}
      />

      {/* Floating code snippets */}
      {[
        { text: "const secure = true;", top: "15%", left: "8%", delay: 0 },
        { text: "await encrypt(data);", top: "45%", right: "5%", delay: 3 },
        { text: "yield* analyze();",    top: "75%", left: "12%", delay: 6 },
        { text: "async fn deploy()",    top: "30%", right: "15%", delay: 9 },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position:      "absolute",
            top:           s.top,
            left:          s.left,
            right:         s.right,
            fontFamily:    "var(--font-mono)",
            fontSize:      10,
            color:         "rgba(0,245,255,0.06)",
            letterSpacing: "0.5px",
            animation:     `float 12s ease-in-out infinite ${s.delay}s`,
            userSelect:    "none",
          }}
        >
          {s.text}
        </div>
      ))}
    </div>
  );
}

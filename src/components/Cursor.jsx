import { useEffect, useRef, useState } from "react";

/*
 * Cursor — Enhanced cyberpunk custom cursor.
 *
 * Features:
 * - Cyan dot + trailing ring with glow
 * - Context labels on interactive elements
 * - Glow trail effect
 * - Click ripple animation
 * - Velocity-based stretch effect
 * - Event delegation for hover detection
 * - Respects reduced-motion
 */
export function Cursor() {
  const posRef   = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });
  const prevRef  = useRef({ x: -100, y: -100 });
  const dotEl    = useRef(null);
  const ringEl   = useRef(null);
  const trailEl  = useRef(null);

  const [isMobile, setIsMobile]     = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel]           = useState(null);
  const [ripples, setRipples]       = useState([]);

  // Set real mobile value after mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Mouse tracking + rAF loop
  useEffect(() => {
    if (isMobile) return;

    // Skip if reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Event delegation for hover detection + labels
    const INTERACTIVE = "a, button, [role=button], input, textarea, select, label, .card-skill, .card-project, .skill-tag";
    const LABELS = {
      "a":         "VIEW",
      "button":    "CLICK",
      ".btn":      "CLICK",
      "input":     "TYPE",
      "textarea":  "TYPE",
    };

    const onOver = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (target) {
        setIsHovering(true);
        // Determine label
        let foundLabel = null;
        for (const [sel, lbl] of Object.entries(LABELS)) {
          if (target.matches(sel)) { foundLabel = lbl; break; }
        }
        setLabel(foundLabel);
      }
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        setIsHovering(false);
        setLabel(null);
      }
    };
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);

    // Click ripple
    const onClick = (e) => {
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((r) => r.filter((rp) => rp.id !== id));
      }, 600);
    };
    document.addEventListener("click", onClick);

    let rafId;
    const loop = () => {
      const p = posRef.current;
      const t = trailRef.current;
      const prev = prevRef.current;

      trailRef.current = {
        x: t.x + (p.x - t.x) * 0.12,
        y: t.y + (p.y - t.y) * 0.12,
      };

      // Velocity for stretch
      const vx = p.x - prev.x;
      const vy = p.y - prev.y;
      const velocity = Math.sqrt(vx * vx + vy * vy);
      const stretch = Math.min(velocity / 20, 0.3);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      prevRef.current = { ...p };

      if (dotEl.current) {
        const scaleX = 1 + stretch;
        const scaleY = 1 - stretch * 0.3;
        dotEl.current.style.transform = `translate3d(${p.x - 4}px,${p.y - 4}px,0) rotate(${angle}deg) scale(${scaleX},${scaleY})`;
      }
      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${trailRef.current.x - 20}px,${trailRef.current.y - 20}px,0)`;
      }
      if (trailEl.current) {
        const tx = t.x + (trailRef.current.x - t.x) * 0.3;
        const ty = t.y + (trailRef.current.y - t.y) * 0.3;
        trailEl.current.style.transform = `translate3d(${tx - 30}px,${ty - 30}px,0)`;
        trailEl.current.style.opacity = Math.min(velocity / 15, 0.5);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("click", onClick);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const ringSize = isHovering ? 48 : 40;

  return (
    <>
      {/* Glow trail */}
      <div
        ref={trailEl}
        aria-hidden="true"
        style={{
          position:      "fixed",
          left:          0,
          top:           0,
          width:         60,
          height:        60,
          borderRadius:  "50%",
          background:    "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex:        9996,
          willChange:    "transform, opacity",
          opacity:       0,
          transition:    "opacity 0.3s",
        }}
      />

      {/* Dot */}
      <div
        ref={dotEl}
        aria-hidden="true"
        style={{
          position:      "fixed",
          left:          0,
          top:           0,
          width:         8,
          height:        8,
          background:    "var(--accent)",
          borderRadius:  "50%",
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform",
          boxShadow:     "0 0 8px rgba(0,245,255,0.6), 0 0 16px rgba(0,245,255,0.2)",
          transition:    isHovering
            ? "width 0.2s, height 0.2s, background 0.2s"
            : "none",
        }}
      />

      {/* Ring */}
      <div
        ref={ringEl}
        aria-hidden="true"
        style={{
          position:      "fixed",
          left:          0,
          top:           0,
          width:         ringSize,
          height:        ringSize,
          border:        isHovering
            ? "1.5px solid rgba(0,245,255,0.5)"
            : "1px solid rgba(0,245,255,0.25)",
          borderRadius:  "50%",
          pointerEvents: "none",
          zIndex:        9998,
          willChange:    "transform",
          transition:    "width 0.3s var(--ease-out-back), height 0.3s var(--ease-out-back), border 0.3s",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
          boxShadow:     isHovering
            ? "0 0 12px rgba(0,245,255,0.15)"
            : "none",
        }}
      >
        {/* Context label */}
        {label && (
          <span
            style={{
              fontSize:      8,
              fontFamily:    "var(--font-mono)",
              letterSpacing: "2px",
              color:         "rgba(0,245,255,0.7)",
              pointerEvents: "none",
              animation:     "fadeIn 0.15s ease both",
            }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Click ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          aria-hidden="true"
          style={{
            position:      "fixed",
            left:          r.x - 10,
            top:           r.y - 10,
            width:         20,
            height:        20,
            borderRadius:  "50%",
            border:        "1px solid rgba(0,245,255,0.4)",
            pointerEvents: "none",
            zIndex:        9997,
            animation:     "rippleExpand 0.6s ease-out forwards",
          }}
        />
      ))}
    </>
  );
}

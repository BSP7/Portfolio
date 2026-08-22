import { useEffect, useRef, useState } from "react";

/*
 * Cursor — Enhanced Cyberpunk Custom Cursor with Solar Amber Glow.
 *
 * Features:
 * - Amber dot + spring-interpolated trailing ring with glow
 * - Dynamic context labels on interactive elements
 * - Velocity-based kinetic stretch effect
 * - Click shockwave ripple animation
 * - Event delegation for hover detection
 * - Respects prefers-reduced-motion & touch devices
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

  useEffect(() => {
    const checkTouch = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch, { passive: true });
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Event delegation for hover detection and smart action labels
    const INTERACTIVE = "a, button, [role=button], input, textarea, select, label, .card, .project-card, .skill-card, .btn";
    const LABELS = {
      ".project-tab-btn":  "SWITCH",
      ".btn-primary":      "EXECUTE",
      "button":            "ACTION",
      "a":                 "VISIT",
      "input":             "INPUT",
      "textarea":          "WRITE",
    };

    const onOver = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (target) {
        setIsHovering(true);
        let foundLabel = null;
        for (const [sel, lbl] of Object.entries(LABELS)) {
          if (target.matches(sel)) {
            foundLabel = lbl;
            break;
          }
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

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // Click shockwave ripples
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

      // Spring interpolation for smooth trailing
      trailRef.current = {
        x: t.x + (p.x - t.x) * 0.16,
        y: t.y + (p.y - t.y) * 0.16,
      };

      // Velocity for kinetic stretch
      const vx = p.x - prev.x;
      const vy = p.y - prev.y;
      const velocity = Math.sqrt(vx * vx + vy * vy);
      const stretch = Math.min(velocity / 25, 0.35);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      prevRef.current = { ...p };

      if (dotEl.current) {
        const scaleX = 1 + stretch;
        const scaleY = 1 - stretch * 0.35;
        dotEl.current.style.transform = `translate3d(${p.x - 4}px,${p.y - 4}px,0) rotate(${angle}deg) scale(${scaleX},${scaleY})`;
      }
      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${trailRef.current.x - 20}px,${trailRef.current.y - 20}px,0)`;
      }
      if (trailEl.current) {
        const tx = t.x + (trailRef.current.x - t.x) * 0.35;
        const ty = t.y + (trailRef.current.y - t.y) * 0.35;
        trailEl.current.style.transform = `translate3d(${tx - 30}px,${ty - 30}px,0)`;
        trailEl.current.style.opacity = Math.min(velocity / 12, 0.45);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("click", onClick);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const ringSize = isHovering ? 46 : 38;

  return (
    <>
      {/* Glow trail */}
      <div
        ref={trailEl}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9996,
          willChange: "transform, opacity",
          opacity: 0,
          transition: "opacity 0.25s",
        }}
      />

      {/* Center Amber Dot */}
      <div
        ref={dotEl}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          background: "var(--accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          boxShadow: "0 0 10px rgba(245, 158, 11, 0.8), 0 0 20px rgba(245, 158, 11, 0.3)",
          transition: isHovering
            ? "width 0.2s, height 0.2s, background 0.2s"
            : "none",
        }}
      />

      {/* Outer Spring Ring */}
      <div
        ref={ringEl}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: ringSize,
          height: ringSize,
          border: isHovering
            ? "1.5px solid rgba(245, 158, 11, 0.6)"
            : "1px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isHovering
            ? "0 0 16px rgba(245, 158, 11, 0.2)"
            : "none",
        }}
      >
        {/* Context badge label */}
        {label && (
          <span
            style={{
              fontSize: 8,
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: "var(--accent-text)",
              pointerEvents: "none",
              animation: "fadeIn 0.15s ease both",
            }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Click shockwave ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          aria-hidden="true"
          style={{
            position: "fixed",
            left: r.x - 12,
            top: r.y - 12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "1.5px solid rgba(245, 158, 11, 0.6)",
            pointerEvents: "none",
            zIndex: 9997,
            animation: "rippleExpand 0.5s ease-out forwards",
          }}
        />
      ))}
    </>
  );
}

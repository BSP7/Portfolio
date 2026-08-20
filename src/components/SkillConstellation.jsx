import { useRef, useEffect, useCallback, useState } from "react";

/*
 * SkillConstellation — Canvas-based neural network visualization.
 *
 * Features:
 * - Interactive nodes per skill category with pulsing rings
 * - Animated connections between related skills
 * - Hover reveals glassmorphism tooltip with skill detail
 * - Tri-color scheme based on category index
 * - IntersectionObserver pauses rendering off-screen
 * - Respects prefers-reduced-motion
 */

const NODE_COLORS = [
  { r: 0, g: 245, b: 255 },    // cyan
  { r: 108, g: 99, b: 255 },   // purple
  { r: 255, g: 0, b: 255 },    // magenta
  { r: 0, g: 255, b: 136 },    // green
  { r: 0, g: 212, b: 224 },    // teal
  { r: 249, g: 115, b: 22 },   // orange
];

function layoutNodes(categories, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.33;
  const count = categories.length;

  return categories.map((cat, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const color = NODE_COLORS[i % NODE_COLORS.length];
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      baseX: cx + Math.cos(angle) * radius,
      baseY: cy + Math.sin(angle) * radius,
      radius: 28 + cat.items.length * 1.5,
      color,
      cat: cat.cat,
      items: cat.items,
      angle,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  });
}

export function SkillConstellation({ categories, style }) {
  const canvasRef   = useRef(null);
  const tooltipRef  = useRef(null);
  const nodesRef    = useRef([]);
  const mouseRef    = useRef({ x: -9999, y: -9999 });
  const hoveredRef  = useRef(-1);
  const visibleRef  = useRef(true);
  const rafRef      = useRef(null);
  const timeRef     = useRef(0);
  const [tooltip, setTooltip] = useState(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    nodesRef.current = layoutNodes(categories, w, h);

    return { dpr, w, h };
  }, [categories]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !categories.length) return;

    // Reduced-motion: draw static
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const { dpr, w, h } = init() || {};
      if (!dpr) return;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawStatic(ctx, nodesRef.current, w, h);
      return;
    }

    init();

    // Mouse tracking
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Hit-test nodes
      const nodes = nodesRef.current;
      let found = -1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = mouseRef.current.x - n.x;
        const dy = mouseRef.current.y - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.radius + 8) {
          found = i;
          break;
        }
      }
      if (found !== hoveredRef.current) {
        hoveredRef.current = found;
        if (found >= 0) {
          const n = nodes[found];
          setTooltip({
            x: n.x,
            y: n.y - n.radius - 16,
            cat: n.cat,
            items: n.items,
            color: n.color,
          });
          canvas.style.cursor = "pointer";
        } else {
          setTooltip(null);
          canvas.style.cursor = "default";
        }
      }
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      hoveredRef.current = -1;
      setTooltip(null);
    };

    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave, { passive: true });

    // IntersectionObserver
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    io.observe(canvas);

    // Resize
    const onResize = () => { init(); };
    window.addEventListener("resize", onResize, { passive: true });

    // Render loop
    const ctx = canvas.getContext("2d");
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current) return;

      timeRef.current += 0.016;
      const t = timeRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const cx = w / 2;
      const cy = h / 2;

      // Subtle node floating
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x = n.baseX + Math.sin(t * 0.5 + n.pulsePhase) * 3;
        n.y = n.baseY + Math.cos(t * 0.4 + n.pulsePhase) * 3;
      }

      // Draw connections to center
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isHov = i === hoveredRef.current;
        const alpha = isHov ? 0.3 : 0.06;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},${alpha})`;
        ctx.lineWidth = isHov ? 1.2 : 0.5;
        ctx.stroke();
      }

      // Draw connections between adjacent nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const b = nodes[(i + 1) % nodes.length];
        const isEitherHov = i === hoveredRef.current || (i + 1) % nodes.length === hoveredRef.current;
        const alpha = isEitherHov ? 0.2 : 0.04;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${a.color.r},${a.color.g},${a.color.b},${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw center node
      const centerPulse = 0.5 + Math.sin(t * 1.5) * 0.3;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,255,${centerPulse * 0.4})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,245,255,0.8)";
      ctx.fill();

      // Draw category nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isHov = i === hoveredRef.current;
        const pulse = 0.5 + Math.sin(t * 2 + n.pulsePhase) * 0.3;

        // Outer glow ring
        if (isHov) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 10, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},0.15)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Pulsing ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},${pulse * (isHov ? 0.4 : 0.12)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Main circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},${isHov ? 0.15 : 0.06})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},${isHov ? 0.6 : 0.25})`;
        ctx.lineWidth = isHov ? 1.5 : 1;
        ctx.stroke();

        // Inner glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},${isHov ? 0.9 : 0.5})`;
        ctx.fill();

        // Label
        ctx.font = `500 ${isHov ? 11 : 10}px 'Fira Code', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},${isHov ? 1 : 0.7})`;
        ctx.fillText(n.cat.toUpperCase(), n.x, n.y + n.radius + 16);

        // Item count
        ctx.font = "400 9px 'Fira Code', monospace";
        ctx.fillStyle = `rgba(255,255,255,${isHov ? 0.5 : 0.25})`;
        ctx.fillText(`${n.items.length} skills`, n.x, n.y + n.radius + 28);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [categories, init]);

  return (
    <div style={{ position: "relative", ...style }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* Glassmorphism tooltip */}
      {tooltip && (
        <div
          ref={tooltipRef}
          style={{
            position:   "absolute",
            left:       tooltip.x,
            top:        tooltip.y,
            transform:  "translate(-50%, -100%)",
            background: "rgba(5,8,22,0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border:     `1px solid rgba(${tooltip.color.r},${tooltip.color.g},${tooltip.color.b},0.3)`,
            borderRadius: "var(--radius-md)",
            padding:    "12px 16px",
            minWidth:   180,
            maxWidth:   260,
            zIndex:     10,
            pointerEvents: "none",
            animation:  "fadeIn 0.15s ease both",
            boxShadow:  `0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(${tooltip.color.r},${tooltip.color.g},${tooltip.color.b},0.08)`,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: `rgb(${tooltip.color.r},${tooltip.color.g},${tooltip.color.b})`,
              letterSpacing: "1.5px",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            {tooltip.cat.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {tooltip.items.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  padding: "2px 6px",
                  borderRadius: 3,
                  background: `rgba(${tooltip.color.r},${tooltip.color.g},${tooltip.color.b},0.1)`,
                  border: `1px solid rgba(${tooltip.color.r},${tooltip.color.g},${tooltip.color.b},0.2)`,
                  color: `rgba(${tooltip.color.r},${tooltip.color.g},${tooltip.color.b},0.9)`,
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function drawStatic(ctx, nodes, w, h) {
  const cx = w / 2;
  const cy = h / 2;

  // Center
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,245,255,0.6)";
  ctx.fill();

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    // Connection to center
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(n.x, n.y);
    ctx.strokeStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},0.08)`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
    // Node
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},0.06)`;
    ctx.fill();
    ctx.strokeStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},0.25)`;
    ctx.lineWidth = 1;
    ctx.stroke();
    // Label
    ctx.font = "500 10px 'Fira Code', monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = `rgba(${n.color.r},${n.color.g},${n.color.b},0.7)`;
    ctx.fillText(n.cat.toUpperCase(), n.x, n.y + n.radius + 16);
  }
}

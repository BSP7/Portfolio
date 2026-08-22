import { useRef, useEffect, useCallback } from "react";

/*
 * ParticleNetwork — High-performance Interactive Cyber Particle Constellation.
 *
 * Features:
 * - Dynamic Solar Amber & Gold nodes connected by energetic lines
 * - Fluid interactive attraction & connection to user's cursor
 * - Distance-based alpha falloff & subtle particle halos
 * - Auto-pauses off-screen / tab blur for zero idle GPU overhead
 * - Fully respects prefers-reduced-motion
 */

const COLORS = [
  { r: 245, g: 158, b: 11 },   // Solar Amber (primary)
  { r: 251, g: 191, b: 36 },   // Warm Gold
  { r: 217, g: 119, b: 6 },    // Deep Amber
  { r: 16,  g: 185, b: 129 },  // Emerald Security Node (sparse)
];

const PARTICLE_COUNT_DESKTOP = 65;
const PARTICLE_COUNT_MOBILE  = 28;
const CONNECTION_DISTANCE    = 130;
const MOUSE_RADIUS           = 160;
const MOUSE_FORCE            = 0.025;
const PARTICLE_SPEED         = 0.35;

function createParticle(w, h) {
  const colorIdx = Math.random() < 0.08 ? 3 : Math.floor(Math.random() * 3);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * PARTICLE_SPEED,
    vy: (Math.random() - 0.5) * PARTICLE_SPEED,
    radius: Math.random() * 1.6 + 0.6,
    color: COLORS[colorIdx],
    alpha: Math.random() * 0.45 + 0.25,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

export function ParticleNetwork({ style, className }) {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const visibleRef = useRef(true);
  const dprRef     = useRef(1);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;

    const count = w < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    particlesRef.current = Array.from({ length: count }, () => createParticle(w, h));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      init();
      const ctx = canvas.getContext("2d");
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha * 0.4})`;
        ctx.fill();
      });
      return;
    }

    init();

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    const onResize = () => { init(); };
    window.addEventListener("resize", onResize, { passive: true });

    const onVisibilityChange = () => {
      visibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const ctx = canvas.getContext("2d");
    let tick = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      if (!visibleRef.current) return;
      tick++;

      const dpr = dprRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Subtle harmonic pulse
        const currentAlpha = p.alpha + Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.12;

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply velocity with air friction damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Screen boundary wrapping
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${Math.max(0.1, currentAlpha)})`;
        ctx.fill();

        // Draw outer glow halo
        if (p.radius > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${currentAlpha * 0.12})`;
          ctx.fill();
        }
      }

      // Draw connection webbing between nearby nodes
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.14;
            const cr = (a.color.r + b.color.r) >> 1;
            const cg = (a.color.g + b.color.g) >> 1;
            const cb = (a.color.b + b.color.b) >> 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw interactive energetic lines to cursor
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.22;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.lineWidth = 0.6;
          }
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

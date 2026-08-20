import { useRef, useEffect, useCallback } from "react";

/*
 * ParticleNetwork — Canvas-based connected particle system.
 *
 * Features:
 * - Particles drift with subtle velocity
 * - Lines drawn between nearby particles (distance-based alpha)
 * - Mouse interaction: particles within radius are attracted
 * - Tri-color scheme: cyan, purple, magenta particles
 * - IntersectionObserver pauses rendering when off-screen
 * - Respects prefers-reduced-motion
 * - Resizes with viewport
 */

const COLORS = [
  { r: 0, g: 245, b: 255 },    // cyan
  { r: 108, g: 99, b: 255 },   // purple
  { r: 255, g: 0, b: 255 },    // magenta
  { r: 0, g: 255, b: 136 },    // green (sparse)
];

const PARTICLE_COUNT_DESKTOP = 80;
const PARTICLE_COUNT_MOBILE  = 35;
const CONNECTION_DISTANCE    = 140;
const MOUSE_RADIUS           = 180;
const MOUSE_FORCE            = 0.02;
const PARTICLE_SPEED         = 0.25;

function createParticle(w, h) {
  const colorIdx = Math.random() < 0.1 ? 3 : Math.floor(Math.random() * 3);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * PARTICLE_SPEED,
    vy: (Math.random() - 0.5) * PARTICLE_SPEED,
    radius: Math.random() * 1.5 + 0.5,
    color: COLORS[colorIdx],
    alpha: Math.random() * 0.5 + 0.3,
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
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;

    const count = w < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    particlesRef.current = Array.from({ length: count }, () => createParticle(w, h));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Draw a single static frame
      init();
      const ctx = canvas.getContext("2d");
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha * 0.5})`;
        ctx.fill();
      });
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
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave, { passive: true });

    // IntersectionObserver — pause off-screen
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

      const dpr = dprRef.current;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha})`;
        ctx.fill();

        // Draw glow for larger particles
        if (p.radius > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${p.alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            // Use average color of the two particles
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

      // Draw mouse connection lines to nearby particles
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(0,245,255,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.lineWidth = 0.5;
          }
        }
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
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto", /* for mouse tracking */
        ...style,
      }}
    />
  );
}

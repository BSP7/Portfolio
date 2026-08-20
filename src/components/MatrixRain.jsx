import { useEffect, useRef, useState } from "react";

/*
 * MatrixRain — Canvas-based cyan/purple matrix rain background.
 *
 * Fix: `window.innerWidth` is no longer read during the initial render.
 * Initialise isMobile as `false` and resolve it in a useEffect so
 * the component is safe for SSR and avoids hydration mismatches.
 */
export function MatrixRain() {
  const canvasRef = useRef(null);
  // Safe initialisation — do not read window during render
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const fontSize = 13;
    // cols is computed from the current canvas size, refreshed on resize via closure
    let drops = [];
    const initDrops = () => {
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    };
    initDrops();

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>{}[]";

    let animId;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const rnd = Math.random();
        if (rnd > 0.97) {
          ctx.fillStyle = "rgba(0, 245, 255, 0.7)";
        } else if (rnd > 0.94) {
          ctx.fillStyle = "rgba(108, 99, 255, 0.4)";
        } else {
          ctx.fillStyle = "rgba(0, 245, 255, 0.06)";
        }
        ctx.fillText(char, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.978) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      initDrops(); // Re-initialise drops array to match new column count
    };

    draw();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        zIndex:        0,
        opacity:       0.22,
        pointerEvents: "none",
      }}
    />
  );
}

import { useRef, useCallback } from "react";

/**
 * useSpotlight — Attaches mousemove listeners to cards to create a dynamic
 * cursor-following spotlight glow and subtle 3D tilt effect.
 *
 * Sets CSS variables `--mouse-x` and `--mouse-y` on the element.
 */
export function useSpotlight() {
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = e.currentTarget;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const el = e.currentTarget;
    if (!el) return;
    el.style.removeProperty("--mouse-x");
    el.style.removeProperty("--mouse-y");
  }, []);

  return {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

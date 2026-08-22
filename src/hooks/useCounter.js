import { useState, useEffect } from "react";

/**
 * useCounter — Smoothly counts up to target value with easeOutExpo interpolation.
 */
export function useCounter(target, visible = true, duration = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const parsedTarget = typeof target === "string" ? parseFloat(target.replace(/[^0-9.]/g, "")) : target;
    if (isNaN(parsedTarget) || parsedTarget <= 0) {
      setCount(target);
      return;
    }

    let startTime = null;
    let rafId = null;

    const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const currentVal = Math.floor(easedProgress * parsedTarget);
      setCount(currentVal);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(parsedTarget);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible, target, duration]);

  return count;
}

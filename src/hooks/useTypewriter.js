import { useState, useEffect, useRef } from "react";

/**
 * useTypewriter — Cycles through an array of strings with a typewriter effect.
 *
 * Fixes applied:
 * 1. The inner "pause" setTimeout (1800ms hold before deleting) is now tracked
 *    and cancelled in the cleanup function, preventing state updates on unmounted components.
 * 2. A `mounted` ref guards all state updates — safe for StrictMode double-invocation.
 * 3. `words` array identity is stabilised via a ref so it does not appear in the
 *    dependency array (avoids re-running the effect when the array is re-created inline).
 */
export function useTypewriter(words, speed = 80) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Stable reference to the words array so callers can pass inline arrays
  // without causing the effect to reset on every render.
  const wordsRef = useRef(words);
  useEffect(() => { wordsRef.current = words; }, [words]);

  useEffect(() => {
    let mainTimer = null;
    let pauseTimer = null;
    let cancelled = false;

    const current = wordsRef.current[wIdx];
    const delay = deleting ? 40 : speed;

    mainTimer = setTimeout(() => {
      if (cancelled) return;

      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else if (!deleting && charIdx === current.length) {
        // Hold before starting deletion — inner timer is now tracked
        pauseTimer = setTimeout(() => {
          if (!cancelled) setDeleting(true);
        }, 1800);
      } else {
        // Move to next word
        setDeleting(false);
        setWIdx((w) => (w + 1) % wordsRef.current.length);
        setCharIdx(0);
      }
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(mainTimer);
      clearTimeout(pauseTimer);
    };
  }, [charIdx, deleting, wIdx, speed]);

  return display;
}

import { useState, useEffect, useRef } from "react";

/**
 * useIntersection — Fires once when the element enters the viewport.
 *
 * StrictMode fix: React 18 StrictMode double-invokes effects (mount → cleanup → mount).
 * On the second mount, ref.current is available again. We use a local `active` boolean
 * captured in the closure so each effect invocation is self-contained.
 * Once `visible` is set to true it is never reset (one-shot reveal).
 */
export function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  // Keep a stable ref to visible so the observer callback never triggers
  // a state update after the component unmounts.
  const visibleRef = useRef(false);

  useEffect(() => {
    // If already visible (e.g. from a previous StrictMode invocation),
    // don't create another observer.
    if (visibleRef.current) return;

    const node = ref.current;
    if (!node) return;

    let cancelled = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cancelled) {
          visibleRef.current = true;
          setVisible(true);
          // Disconnect immediately — we only need one-shot reveal
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(node);

    return () => {
      cancelled = true;
      obs.disconnect();
    };
    // ref and threshold are stable — including them causes no extra runs
  }, [ref, threshold]);

  return visible;
}

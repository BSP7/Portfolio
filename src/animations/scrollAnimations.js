/**
 * scrollAnimations.js - Centralized scroll-reveal engine.
 *
 * Progressive Enhancement Model:
 *   1. Observes all `.reveal-on-scroll` elements via IntersectionObserver.
 *   2. When an element intersects viewport, adds `.is-revealed`.
 *   3. Adds `.anim-done` once animation completes to free memory.
 *   4. Watches for dynamically added DOM nodes (React component state toggles).
 *   5. Skips animations cleanly if prefers-reduced-motion is detected.
 */

const STAGGER_BASE_MS = 70;

let observer = null;
let mutationObserver = null;
let initialized = false;

function applyStagger(el) {
  const stagger = parseInt(el.dataset.stagger || "0", 10);
  if (stagger > 0) {
    el.style.transitionDelay = `${stagger * STAGGER_BASE_MS}ms`;
    el.style.animationDelay = `${stagger * STAGGER_BASE_MS}ms`;
  }
}

function observeElement(el) {
  if (!observer) return;
  if (el.classList.contains("is-revealed")) return;
  observer.observe(el);
}

export function initRevealAnimations() {
  if (typeof window === "undefined") return () => {};
  if (initialized) return () => {};
  initialized = true;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("is-revealed", "anim-done");
    });
    return () => {};
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        applyStagger(el);
        el.classList.add("is-revealed");
        observer.unobserve(el);
        setTimeout(() => {
          el.classList.add("anim-done");
        }, 900);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
  );

  // Observe existing elements
  document.querySelectorAll(".reveal-on-scroll").forEach(observeElement);

  // Watch for dynamically rendered items
  mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mut) => {
      mut.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.classList && node.classList.contains("reveal-on-scroll")) {
          observeElement(node);
        }
        if (node.querySelectorAll) {
          node.querySelectorAll(".reveal-on-scroll").forEach(observeElement);
        }
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  return () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }
    initialized = false;
  };
}
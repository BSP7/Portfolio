/**
 * scrollAnimations.js - Centralised scroll-reveal engine.
 *
 * Progressive Enhancement Model:
 *   1. Adds `.js-reveal-ready` to <html> — this activates the
 *      CSS hidden states for .cyber-reveal elements.
 *   2. Creates ONE IntersectionObserver for the entire page.
 *   3. When an element intersects, adds `.is-visible` which
 *      triggers the CSS animation for that variant.
 *   4. After the animation ends, adds `.anim-done` which locks
 *      the element at opacity:1 and frees will-change memory.
 *
 * If this module fails to run, elements remain visible (default).
 */

const STAGGER_BASE_MS = 60;

const ANIM_DURATION = {
  hud:      650,
  scan:     650,
  glitch:   220,
  grid:     650,
  pulse:    450,
  terminal: 650,
  fade:     650,
};

var observer = null;
var initialized = false;

function getAnimEnd(el) {
  var type    = el.dataset.reveal || 'fade';
  var stagger = parseInt(el.dataset.stagger || '0', 10);
  var delay   = stagger * STAGGER_BASE_MS;
  var dur     = ANIM_DURATION[type] || 650;
  return delay + dur + 100;
}

function applyStaggerDelay(el) {
  var stagger = parseInt(el.dataset.stagger || '0', 10);
  if (stagger > 0) {
    el.style.setProperty('--reveal-delay', stagger * STAGGER_BASE_MS + 'ms');
  }
}

function observeElement(el) {
  if (!observer) return;
  if (el.classList.contains('is-visible')) return;
  observer.observe(el);
}

export function initRevealAnimations() {
  if (initialized) return function() {};
  initialized = true;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Reduced motion: skip animations, everything stays visible
    return function() {};
  }

  observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        applyStaggerDelay(el);
        el.classList.add('is-visible');
        observer.unobserve(el);
        setTimeout(function() { el.classList.add('anim-done'); }, getAnimEnd(el));
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -2% 0px' }
  );

  // Observe current elements
  document.querySelectorAll('.cyber-reveal').forEach(observeElement);

  // IMPORTANT: Add sentinel AFTER creating observer and calling observe().
  // The IO fires asynchronously for initially-visible elements.
  // We add .js-reveal-ready here so CSS hides elements right as the
  // IO is set up — timing is essentially simultaneous from user's perspective.
  document.documentElement.classList.add('js-reveal-ready');

  // Watch for lazy-loaded elements (React Suspense)
  var mutObs = new MutationObserver(function(mutations) {
    mutations.forEach(function(mut) {
      mut.addedNodes.forEach(function(node) {
        if (node.nodeType !== 1) return;
        if (node.classList && node.classList.contains('cyber-reveal')) observeElement(node);
        if (node.querySelectorAll) node.querySelectorAll('.cyber-reveal').forEach(observeElement);
      });
    });
  });
  mutObs.observe(document.body, { childList: true, subtree: true });

  return function() {
    if (observer) { observer.disconnect(); observer = null; }
    mutObs.disconnect();
    initialized = false;
    document.documentElement.classList.remove('js-reveal-ready');
  };
}

export function resetRevealAnimations() {
  initialized = false;
  if (observer) { observer.disconnect(); observer = null; }
  document.documentElement.classList.remove('js-reveal-ready');
}
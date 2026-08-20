/**
 * gsapEffects.js - GSAP + ScrollTrigger signature interactions.
 * Loaded lazily after browser idle. Respects prefers-reduced-motion.
 */

var gsapRef = null;
var stRef   = null;

export function loadGSAP() {
  if (gsapRef && stRef) return Promise.resolve({ gsap: gsapRef, ScrollTrigger: stRef });
  if (window.gsap && window.ScrollTrigger) {
    gsapRef = window.gsap;
    stRef   = window.ScrollTrigger;
    gsapRef.registerPlugin(stRef);
    return Promise.resolve({ gsap: gsapRef, ScrollTrigger: stRef });
  }

  return new Promise(function(resolve) {
    function injectScript(src, onLoad, onError) {
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = onLoad;
      s.onerror = onError;
      document.head.appendChild(s);
    }

    var gsapSrc = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    var stSrc   = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

    injectScript(gsapSrc, function() {
      injectScript(stSrc, function() {
        if (!window.gsap || !window.ScrollTrigger) { resolve(null); return; }
        gsapRef = window.gsap;
        stRef   = window.ScrollTrigger;
        gsapRef.registerPlugin(stRef);
        resolve({ gsap: gsapRef, ScrollTrigger: stRef });
      }, function() { resolve(null); });
    }, function() { resolve(null); });
  });
}

/**
 * Signature 1 - Hero multi-layer parallax.
 * Background moves slower, foreground has subtle counter-movement.
 */
export function initHeroParallax(gsap, ScrollTrigger) {
  var hero = document.getElementById('hero');
  if (!hero) return function() {};

  var bgLayer = hero.querySelector('[data-parallax="bg"]');
  var mgLayer = hero.querySelector('[data-parallax="mg"]');
  var fgLayer = hero.querySelector('[data-parallax="fg"]');

  var isMobile = window.innerWidth < 768;
  var bgDist   = isMobile ? 20  : 60;
  var mgDist   = isMobile ? 10  : 30;
  var fgDist   = isMobile ? -5  : -15;

  var triggers = [];

  function makeTween(target, dist, scrub) {
    if (!target) return null;
    return gsap.to(target, {
      y: dist,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end:   'bottom top',
        scrub: scrub,
      },
    });
  }

  triggers.push(makeTween(bgLayer, bgDist, 1.5));
  triggers.push(makeTween(mgLayer, mgDist, 1.2));
  triggers.push(makeTween(fgLayer, fgDist, 0.8));

  return function() {
    triggers.forEach(function(t) {
      if (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); }
    });
  };
}

/**
 * Signature 2 - Scroll-driven radar scanner in the Skills section.
 * Sweep arm rotates with scroll, markers illuminate at their angles.
 */
export function initRadarScrollAnim(gsap, ScrollTrigger) {
  var skillsSection = document.getElementById('skills');
  var radarArm      = document.querySelector('.radar-sweep-arm');
  var radarGlow     = document.querySelector('.radar-glow-ring');
  var markers       = document.querySelectorAll('.radar-marker');

  if (!skillsSection || !radarArm) return function() {};

  var tweens = [];

  var sweepTween = gsap.to(radarArm, {
    rotation: 720,
    ease: 'none',
    transformOrigin: '50% 50%',
    scrollTrigger: {
      trigger: skillsSection,
      start:   'top 80%',
      end:     'bottom 20%',
      scrub:   true,
    },
  });
  tweens.push(sweepTween);

  if (radarGlow) {
    var glowTween = gsap.to(radarGlow, {
      opacity: 0.65,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 3,
      scrollTrigger: {
        trigger: skillsSection,
        start:   'top 80%',
        end:     'bottom 20%',
        scrub:   1,
      },
    });
    tweens.push(glowTween);
  }

  markers.forEach(function(marker) {
    var angle    = parseInt(marker.dataset.angle || '0', 10);
    var progress = (angle % 360) / 360 * 0.5;
    var t = gsap.fromTo(
      marker,
      { opacity: 0.2, scale: 0.9 },
      {
        opacity: 1,
        scale:   1.2,
        duration: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: skillsSection,
          start:   'top+=' + (progress * 100) + '% 80%',
          end:     'top+=' + ((progress + 0.06) * 100) + '% 80%',
          scrub:   true,
          toggleActions: 'play reverse play reverse',
        },
      }
    );
    tweens.push(t);
  });

  return function() {
    tweens.forEach(function(t) {
      if (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); }
    });
  };
}

/**
 * Signature 3 - System boot transition between About -> Skills.
 * CRT noise overlay + heading glitch plays once on scroll entry.
 */
export function initBootTransition(gsap, ScrollTrigger) {
  var sentinel   = document.getElementById('boot-transition');
  var overlay    = document.querySelector('.boot-overlay');
  var skillsHead = document.querySelector('#skills h2');

  if (!sentinel || !overlay) return function() {};

  var triggered = false;

  var st = ScrollTrigger.create({
    trigger: sentinel,
    start: 'top 65%',
    onEnter: function() {
      if (triggered) return;
      triggered = true;

      var tl = gsap.timeline();

      tl.set(overlay, { display: 'block' });
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 0.9, duration: 0.07, ease: 'none' });
      tl.to(overlay, { opacity: 0.1, duration: 0.05, ease: 'none' });
      tl.to(overlay, { opacity: 0.85, duration: 0.06, ease: 'none' });
      tl.to(overlay, { opacity: 0.05, duration: 0.07, ease: 'none' });
      tl.to(overlay, { opacity: 0.7, duration: 0.04, ease: 'none' });
      tl.to(overlay, { opacity: 0.1, duration: 0.05, ease: 'none' });

      if (skillsHead) {
        tl.to(skillsHead, {
          x: -3, duration: 0.05, ease: 'none', yoyo: true, repeat: 5,
        }, '<');
      }

      tl.to(overlay, {
        opacity: 0,
        duration: 0.28,
        ease: 'power2.out',
        onComplete: function() {
          overlay.style.display = 'none';
          if (skillsHead) gsap.set(skillsHead, { x: 0 });
        },
      });
    },
  });

  return function() { st.kill(); };
}
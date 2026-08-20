/**
 * RadarDecor.jsx - Decorative SVG radar for the Skills section.
 * GSAP targets: .radar-sweep-arm, .radar-glow-ring, .radar-marker[data-angle]
 */
import React from "react";

export function RadarDecor() {
  var cx = 100;
  var cy = 100;
  var r  = 88;

  var markers = [
    { angle: 42,  label: 'SYS' },
    { angle: 115, label: 'NET' },
    { angle: 198, label: 'AI'  },
    { angle: 285, label: 'CLD' },
  ];

  return React.createElement('div', {
    'aria-hidden': 'true',
    style: {
      position:      'absolute',
      right:         '-20px',
      top:           '50%',
      transform:     'translateY(-50%)',
      width:         220,
      height:        220,
      opacity:       0.15,
      pointerEvents: 'none',
      zIndex:        0,
      overflow:      'visible',
    },
  },
    React.createElement('svg', {
      viewBox: '0 0 200 200',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      style: { width: '100%', height: '100%', overflow: 'visible' },
    },
      /* Concentric rings */
      React.createElement('circle', { cx: cx, cy: cy, r: 88, stroke: 'rgba(0,245,255,0.4)', strokeWidth: 1.5 }),
      React.createElement('circle', { cx: cx, cy: cy, r: 66, stroke: 'rgba(0,245,255,0.35)', strokeWidth: 0.8, strokeDasharray: '3 4' }),
      React.createElement('circle', { cx: cx, cy: cy, r: 44, stroke: 'rgba(0,245,255,0.3)', strokeWidth: 0.8, strokeDasharray: '3 4' }),
      React.createElement('circle', { cx: cx, cy: cy, r: 22, stroke: 'rgba(0,245,255,0.25)', strokeWidth: 0.8, strokeDasharray: '3 4' }),
      /* Cross-hairs */
      React.createElement('line', { x1: cx, y1: cy - r, x2: cx, y2: cy + r, stroke: 'rgba(0,245,255,0.25)', strokeWidth: 0.6 }),
      React.createElement('line', { x1: cx - r, y1: cy, x2: cx + r, y2: cy, stroke: 'rgba(0,245,255,0.25)', strokeWidth: 0.6 }),
      /* Diagonals */
      React.createElement('line', { x1: cx - 62, y1: cy - 62, x2: cx + 62, y2: cy + 62, stroke: 'rgba(0,245,255,0.1)', strokeWidth: 0.5 }),
      React.createElement('line', { x1: cx + 62, y1: cy - 62, x2: cx - 62, y2: cy + 62, stroke: 'rgba(0,245,255,0.1)', strokeWidth: 0.5 }),
      /* Glow ring */
      React.createElement('circle', { className: 'radar-glow-ring', cx: cx, cy: cy, r: r, stroke: 'rgba(0,245,255,0.6)', strokeWidth: 1.5, opacity: 0.35 }),
      /* Markers */
      ...markers.map(function(m) {
        var rad = (m.angle - 90) * (Math.PI / 180);
        var mx  = cx + r * Math.cos(rad);
        var my  = cy + r * Math.sin(rad);
        var lx  = cx + (r + 14) * Math.cos(rad);
        var ly  = cy + (r + 14) * Math.sin(rad);
        var ix  = cx + (r - 10) * Math.cos(rad);
        var iy  = cy + (r - 10) * Math.sin(rad);
        return React.createElement('g', { key: m.label, className: 'radar-marker', 'data-angle': m.angle, opacity: 0.3 },
          React.createElement('circle', { cx: mx, cy: my, r: 3, fill: 'rgba(0,245,255,0.8)' }),
          React.createElement('line', { x1: mx, y1: my, x2: ix, y2: iy, stroke: 'rgba(0,245,255,0.6)', strokeWidth: 0.8 }),
          React.createElement('text', {
            x: lx, y: ly,
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            fontSize: '7',
            fontFamily: "'Fira Code', monospace",
            fill: 'rgba(0,245,255,0.9)',
            letterSpacing: '0.5',
          }, m.label)
        );
      }),
      /* Sweep arm group — GSAP rotates this, CSS keyframe is fallback */
      React.createElement('g', {
        className: 'radar-sweep-arm',
        style: { transformOrigin: cx + 'px ' + cy + 'px', animation: 'radarSweep 4s linear infinite' },
      },
        React.createElement('line', { x1: cx, y1: cy, x2: cx, y2: cy - r, stroke: 'rgba(0,245,255,0.85)', strokeWidth: 1.2 }),
        React.createElement('line', {
          x1: cx, y1: cy,
          x2: cx + r * Math.sin(15 * Math.PI / 180),
          y2: cy - r * Math.cos(15 * Math.PI / 180),
          stroke: 'rgba(0,245,255,0.2)', strokeWidth: 1,
        }),
        React.createElement('line', {
          x1: cx, y1: cy,
          x2: cx - r * Math.sin(15 * Math.PI / 180),
          y2: cy - r * Math.cos(15 * Math.PI / 180),
          stroke: 'rgba(0,245,255,0.1)', strokeWidth: 0.8,
        }),
        React.createElement('circle', { cx: cx, cy: cy - r, r: 2.5, fill: 'rgba(0,245,255,1)' })
      ),
      /* Centre */
      React.createElement('circle', { cx: cx, cy: cy, r: 3, fill: 'rgba(0,245,255,0.9)' }),
      React.createElement('circle', { cx: cx, cy: cy, r: 6, stroke: 'rgba(0,245,255,0.4)', strokeWidth: 0.8, fill: 'none' })
    )
  );
}
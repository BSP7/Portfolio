import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const id = requestAnimationFrame(() => setTrail(t => ({ x: t.x + (pos.x - t.x) * 0.15, y: t.y + (pos.y - t.y) * 0.15 })));
    return () => cancelAnimationFrame(id);
  }, [pos, trail, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div className="hide-on-mobile" style={{ position: "fixed", left: 0, top: 0, transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`, width: 8, height: 8, background: "var(--accent)", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, willChange: "transform" }} />
      <div className="hide-on-mobile" style={{ position: "fixed", left: 0, top: 0, transform: `translate3d(${trail.x - 16}px, ${trail.y - 16}px, 0)`, width: 32, height: 32, border: "1px solid var(--border-hover)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, willChange: "transform" }} />
    </>
  );
}

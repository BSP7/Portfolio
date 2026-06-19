import { useState, useEffect } from "react";

export function useTypewriter(words, speed = 80) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wIdx];
    const delay = deleting ? 40 : speed;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else {
        setDeleting(false);
        setWIdx(w => (w + 1) % words.length);
        setCharIdx(0);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wIdx, words, speed]);
  return display;
}

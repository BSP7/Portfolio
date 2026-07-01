import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { MatrixRain } from "./components/MatrixRain";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";

const Projects = lazy(() => import("./components/Projects").then(m => ({ default: m.Projects })));
const Certifications = lazy(() => import("./components/Certifications").then(m => ({ default: m.Certifications })));
const Hackathons = lazy(() => import("./components/Hackathons").then(m => ({ default: m.Hackathons })));
const Timeline = lazy(() => import("./components/Timeline").then(m => ({ default: m.Timeline })));
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("hero");

  const handleDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading) return;
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [loading]);

  if (loading) return <LoadingScreen onDone={handleDone} />;

  return (
    <div style={{ minHeight: "100vh", cursor: "none" }}>
      <Cursor />
      <MatrixRain />
      <Navbar active={active} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={<div style={{ padding: "100px", textAlign: "center", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>Loading section...</div>}>
          <Projects />
          <Certifications />
          <Hackathons />
          <Timeline />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
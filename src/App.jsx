import "./App.css";
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Hackathons } from "./components/Hackathons";
import { Certifications } from "./components/Certifications";
import { Timeline } from "./components/Timeline";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CommandPalette } from "./components/CommandPalette";
import { ToastProvider } from "./components/Toast";
import { LoadingScreen } from "./components/LoadingScreen";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { ParticleNetwork } from "./components/ParticleNetwork";
import { Cursor } from "./components/Cursor";
import { initRevealAnimations } from "./animations/scrollAnimations";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [cmdOpen, setCmdOpen] = useState(false);

  // Apply permanent dark theme & Solar Amber accent to html root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-accent", "amber");
  }, []);

  // Initialize scroll-driven reveal animations once loading completes
  useEffect(() => {
    if (isLoading) return;
    const cleanup = initRevealAnimations();
    return () => {
      if (cleanup) cleanup();
    };
  }, [isLoading]);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Robust active section detection using getBoundingClientRect
  useEffect(() => {
    if (isLoading) return;

    const sectionIds = ["hero", "about", "skills", "projects", "hackathons", "certs", "timeline", "contact"];

    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const headerOffset = 140;
      let current = "hero";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <ToastProvider>
      <div className="app-root">
        {/* Modern Animated Loading Screen */}
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}

        {/* Global Ambient Perspective Grid & Aurora Blobs */}
        <BackgroundEffects />

        {/* Interactive Cyber Particle Constellation Canvas */}
        <ParticleNetwork />

        {/* Custom Dynamic Solar Amber Cursor */}
        <Cursor />

        <Navbar
          activeSection={activeSection}
          onOpenCmd={() => setCmdOpen(true)}
        />

        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero onOpenCmd={() => setCmdOpen(true)} />
          <About />
          <Skills />
          <Projects />
          <Hackathons />
          <Certifications />
          <Timeline />
          <Contact />
        </main>

        <Footer />

        {/* Global Command Palette */}
        <CommandPalette
          isOpen={cmdOpen}
          onClose={() => setCmdOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}
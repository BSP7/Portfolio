import { useState, useEffect, useRef } from "react";
import { Search, Terminal, ArrowRight, Shield, Code2, FolderGit2, Trophy, Award, Mail, Sparkles, X, Sun, Moon } from "lucide-react";
import { DATA } from "../data/portfolioData";
import { useToast } from "./Toast";

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState(null);
  const inputRef = useRef(null);
  const { addToast } = useToast();

  const baseCommands = [
    {
      id: "nav-about",
      title: "Go to About",
      desc: "View background, education, and security focus",
      icon: Shield,
      category: "Navigation",
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-projects",
      title: "Go to Projects & Simulators",
      desc: "Test Shadow Intent, ID Trust, and ZK-KYC live demos",
      icon: FolderGit2,
      category: "Navigation",
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-skills",
      title: "Go to Skills Matrix",
      desc: "Explore cybersecurity, AI, and blockchain capabilities",
      icon: Code2,
      category: "Navigation",
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-hackathons",
      title: "Go to Hackathons",
      desc: "Inceptrix 2.0 & Fusion-X competition highlights",
      icon: Trophy,
      category: "Navigation",
      action: () => {
        document.getElementById("hackathons")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-certs",
      title: "Go to Certifications",
      desc: "Verified Cisco, Blockchain & Data Science credentials",
      icon: Award,
      category: "Navigation",
      action: () => {
        document.getElementById("certs")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "nav-contact",
      title: "Go to Contact",
      desc: "Send a message or schedule a conversation",
      icon: Mail,
      category: "Navigation",
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }
    },
    {
      id: "act-copy-email",
      title: "Copy Email Address",
      desc: DATA.email,
      icon: Mail,
      category: "Actions",
      action: () => {
        navigator.clipboard.writeText(DATA.email);
        addToast("Copied email to clipboard: " + DATA.email, "success");
        onClose();
      }
    },

    {
      id: "cli-whoami",
      title: "whoami",
      desc: "Display identity, specialization, and institution",
      icon: Terminal,
      category: "Terminal CLI",
      action: () => {
        setTerminalOutput({
          cmd: "whoami",
          result: `${DATA.name} | Specializing in Cybersecurity & AI @ Garden City University (Expected 2027)`
        });
      }
    },
    {
      id: "cli-skills-json",
      title: "skills --summary",
      desc: "Output JSON structured summary of engineering skillset",
      icon: Terminal,
      category: "Terminal CLI",
      action: () => {
        setTerminalOutput({
          cmd: "skills --summary",
          result: JSON.stringify(
            DATA.skills.map((s) => ({ category: s.cat, count: s.items.length })),
            null,
            2
          )
        });
      }
    },
    {
      id: "cli-threat-scan",
      title: "threat-scan --quick",
      desc: "Simulate quick heuristic network anomaly scan",
      icon: Terminal,
      category: "Terminal CLI",
      action: () => {
        setTerminalOutput({
          cmd: "threat-scan --quick",
          result: "[✓] 1,024 packets inspected. 0 critical vulnerabilities. Shadow Intent AI model online (v2.4.1)."
        });
      }
    }
  ];

  const filteredCommands = baseCommands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.desc.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTerminalOutput(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="cmd-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Input bar */}
        <div className="cmd-input-row">
          <Search size={18} color="var(--accent)" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search (e.g. 'projects', 'theme', 'whoami')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={onClose} aria-label="Close dialog" style={{ display: "flex", color: "var(--text-muted)" }}>
            <X size={18} />
          </button>
        </div>

        {/* Terminal output box if triggered */}
        {terminalOutput && (
          <div style={{ background: "var(--code-bg)", padding: "14px 18px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>
                $ {terminalOutput.cmd}
              </span>
              <button
                onClick={() => setTerminalOutput(null)}
                style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                [clear]
              </button>
            </div>
            <pre style={{ margin: 0, fontSize: "0.8rem", color: "var(--text)", whiteSpace: "pre-wrap" }}>
              {terminalOutput.result}
            </pre>
          </div>
        )}

        {/* Command list */}
        <div className="cmd-list">
          {filteredCommands.length === 0 ? (
            <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>
              No commands found for "{query}". Try "about", "projects", "theme", or "whoami".
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  className={`cmd-item ${isSelected ? "selected" : ""}`}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-left">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "var(--radius-xs)",
                        background: isSelected ? "var(--accent-subtle)" : "var(--surface)",
                        border: `1px solid ${isSelected ? "var(--accent-border)" : "var(--border)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isSelected ? "var(--accent)" : "var(--text-secondary)"
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: isSelected ? "var(--text)" : "var(--text-secondary)" }}>
                        {cmd.title}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{cmd.desc}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="badge" style={{ fontSize: "0.6875rem", padding: "2px 6px" }}>
                      {cmd.category}
                    </span>
                    {isSelected && <ArrowRight size={14} color="var(--accent)" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="cmd-footer">
          <span>Use ↑ ↓ to navigate, ↵ to select, ESC to exit</span>
          <span>PAVAN KUMAR · PORTFOLIO CLI</span>
        </div>
      </div>
    </div>
  );
}

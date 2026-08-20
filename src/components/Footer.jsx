import { useState, useEffect } from "react";
import { ArrowUp, Mail, Shield, Clock, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { DATA } from "../data/portfolioData";

export function Footer() {
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        paddingBlock: "var(--space-12) var(--space-8)",
        marginTop: "var(--space-16)"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--space-6)",
            marginBottom: "var(--space-8)"
          }}
        >
          {/* Logo & Tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: "1.125rem", color: "var(--text)" }}>
              <Shield size={20} color="var(--accent)" />
              <span>PAVAN KUMAR B S</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 4, maxWidth: 460 }}>
              Cybersecurity & AI Engineer · Garden City University
            </p>
          </div>

          {/* Bengaluru Clock & Location */}
          <div
            className="card"
            style={{
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: "0.8125rem",
              fontFamily: "var(--font-mono)"
            }}
          >
            <Clock size={15} color="var(--accent)" />
            <span style={{ color: "var(--text-muted)" }}>Bengaluru, India:</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>{istTime || "Loading IST..."}</span>
          </div>

          {/* Socials & Back to Top */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <a
              href={`https://${DATA.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              aria-label="GitHub"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={`https://${DATA.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={15} />
            </a>
            <a
              href={`mailto:${DATA.email}`}
              className="btn btn-secondary btn-sm"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "var(--space-6)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            gap: "var(--space-2)"
          }}
        >
          <div>
            © {new Date().getFullYear()} Pavan Kumar B S. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
            <span>Built with React 19 & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

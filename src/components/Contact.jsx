import React, { useRef, useState } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  const [sent, setSent] = useState(false);

  const contacts = [
    { icon: "📧", label: "Email", value: DATA.email, key: "email", url: `mailto:${DATA.email}` },
    { icon: "💼", label: "LinkedIn", value: DATA.linkedin, key: "linkedin", url: `https://${DATA.linkedin}` },
    { icon: "🐙", label: "GitHub", value: DATA.github, key: "github", url: `https://${DATA.github}` },
    { icon: "📍", label: "Location", value: DATA.location, key: "location", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DATA.location)}` },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
      <SectionHeader title="CONTACT.sh" subtitle="07 // OPEN CHANNEL" />
      <div style={{ maxWidth: 1000, margin: "60px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 40 }}>
        {/* Contact cards */}
        <div className={`section-reveal ${vis ? "visible" : ""} stagger-1`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {contacts.map(c => (
            <a key={c.key} href={c.url} target="_blank" rel="noopener noreferrer" className="card card-contact" aria-label={c.label} style={{ textDecoration: "none" }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "var(--font-mono)", letterSpacing: 1 }}>{c.label.toUpperCase()}</div>
                <div style={{ fontSize: 14, color: "var(--text2)" }}>{c.value}</div>
              </div>
              <span style={{ fontSize: 11, color: "#6B7280", fontFamily: "var(--font-mono)", transition: "color 0.2s" }}>VISIT ↗</span>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className={`section-reveal ${vis ? "visible" : ""} stagger-2 card form-card`}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16, animation: "fadeUp 0.5s ease both" }}>✅</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--accent)" }}>MESSAGE ENCRYPTED & SENT</div>
              <div style={{ color: "var(--text3)", fontSize: 14, marginTop: 8 }}>Will respond within 24 hours.</div>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: 2, marginBottom: 20 }}>// SECURE TRANSMISSION</div>
              {[
                { id: "name", label: "NAME", type: "text", placeholder: "Your Name" },
                { id: "email", label: "EMAIL", type: "email", placeholder: "your@email.com" },
              ].map(f => (
                <div key={f.id} style={{ marginBottom: 16 }}>
                  <label htmlFor={f.id} style={{ display: "block", fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)", letterSpacing: 1, marginBottom: 6 }}>{f.label}</label>
                  <input id={f.id} type={f.type} placeholder={f.placeholder} className="input-field" />
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="message" style={{ display: "block", fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)", letterSpacing: 1, marginBottom: 6 }}>MESSAGE</label>
                <textarea id="message" placeholder="Your encrypted message..." rows={4} className="input-field" style={{ resize: "vertical" }} />
              </div>
              <button onClick={() => setSent(true)} style={{ width: "100%", padding: "12px", background: "var(--accent)", color: "var(--bg)", border: "none", borderRadius: 4, fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: 2, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(251,191,36,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; }}>
                TRANSMIT ▶
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

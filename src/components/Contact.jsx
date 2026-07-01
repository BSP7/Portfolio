import { useRef, useState } from "react";
import { DATA } from "../data/portfolioData";
import { useIntersection } from "../hooks/useIntersection";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const ref = useRef(null);
  const vis = useIntersection(ref);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Name requires minimum 2 characters.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("Invalid email format.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError("Message must be at least 10 characters.");
      return;
    }
    if (formData.message.trim().length > 1000) {
      setError("Message must not exceed 1000 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }
      setSent(true);
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: 2, marginBottom: 20 }}>// SECURE TRANSMISSION</div>
              
              <input type="text" id="website" value={formData.website} onChange={handleChange} style={{ display: "none" }} aria-hidden="true" tabIndex={-1} />

              {[
                { id: "name", label: "NAME", type: "text", placeholder: "Your Name" },
                { id: "email", label: "EMAIL", type: "email", placeholder: "your@email.com" },
              ].map(f => (
                <div key={f.id} style={{ marginBottom: 16 }}>
                  <label htmlFor={f.id} style={{ display: "block", fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)", letterSpacing: 1, marginBottom: 6 }}>{f.label}</label>
                  <input id={f.id} type={f.type} value={formData[f.id]} onChange={handleChange} placeholder={f.placeholder} className="input-field" disabled={isSubmitting} />
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label htmlFor="message" style={{ display: "block", fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)", letterSpacing: 1, marginBottom: 6 }}>MESSAGE</label>
                <textarea id="message" value={formData.message} onChange={handleChange} placeholder="Your encrypted message..." rows={4} className="input-field" style={{ resize: "vertical" }} disabled={isSubmitting} />
              </div>

              {error && (
                <div aria-live="polite" style={{ color: "#ef4444", fontSize: 12, marginBottom: 16, fontFamily: "var(--font-mono)", background: "rgba(239,68,68,0.1)", padding: 8, borderRadius: 4, border: "1px solid rgba(239,68,68,0.2)" }}>
                  Error: {error}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "12px", background: "var(--accent)", color: "var(--bg)", border: "none", borderRadius: 4, fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: 2, cursor: isSubmitting ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: isSubmitting ? 0.7 : 1 }}
                onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = "var(--accent2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(251,191,36,0.5)"; } }}
                onMouseLeave={e => { if (!isSubmitting) { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; } }}>
                {isSubmitting ? "SENDING..." : "TRANSMIT ▶"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

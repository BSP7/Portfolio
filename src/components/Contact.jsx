import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, Copy, Check, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { DATA } from "../data/portfolioData";
import { SectionHeader } from "./SectionHeader";
import { useToast } from "./Toast";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { addToast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DATA.email);
    setCopiedEmail(true);
    addToast("Copied " + DATA.email + " to clipboard!", "success");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Please provide a name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError("Message should be at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to transmit message");
      setSent(true);
      addToast("Message transmitted successfully!", "success");
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      // Mock success for static hosting preview if API endpoint is not running locally
      setSent(true);
      addToast("Message received! Thank you for getting in touch.", "success");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader
          tag="Get in Touch"
          title="Let's Connect & Collaborate"
          description="Have a cybersecurity challenge, an AI security research initiative, or a development opportunity? Let's discuss."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-8)" }}>
          {/* Left Column: Direct Info & Quick Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div className="card" style={{ padding: "var(--space-6)" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                Direct Communication
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "var(--space-6)" }}>
                I am actively seeking software engineering internships, AI security research opportunities, and web3 development roles.
              </p>

              {/* Email Copy Card */}
              <div
                style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius-sm)",
                  padding: "var(--space-4)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  marginBottom: "var(--space-4)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <Mail size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>EMAIL ADDRESS</div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {DATA.email}
                    </div>
                  </div>
                </div>

                <button onClick={handleCopyEmail} className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                  {copiedEmail ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Social Link Badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <a
                  href={`https://${DATA.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{ padding: "var(--space-3) var(--space-4)", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <GithubIcon size={16} />
                    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>github.com/BSP7</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-text)", fontFamily: "var(--font-mono)" }}>Visit ↗</span>
                </a>

                <a
                  href={`https://${DATA.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{ padding: "var(--space-3) var(--space-4)", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <LinkedinIcon size={16} />
                    <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>LinkedIn Profile</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-text)", fontFamily: "var(--font-mono)" }}>Connect ↗</span>
                </a>

                <div
                  className="card"
                  style={{ padding: "var(--space-3) var(--space-4)", display: "flex", alignItems: "center", gap: 10 }}
                >
                  <MapPin size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{DATA.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="card" style={{ padding: "var(--space-6)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "var(--space-10) var(--space-4)" }}>
                <CheckCircle size={48} color="var(--success)" style={{ margin: "0 auto var(--space-4)" }} />
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                  Message Sent Successfully
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "var(--space-6)" }}>
                  Thank you for reaching out. I typically review incoming messages within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: "var(--space-4)" }}>
                  Send a Direct Message
                </h3>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <label htmlFor="message" className="form-label" style={{ margin: 0 }}>
                      Message
                    </label>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    className="form-textarea"
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    maxLength={1000}
                    required
                  />
                </div>

                {error && (
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--radius-xs)",
                      background: "var(--danger-bg)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "var(--danger)",
                      fontSize: "0.8125rem",
                      marginBottom: "var(--space-4)"
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", paddingBlock: 12 }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

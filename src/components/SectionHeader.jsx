export function SectionHeader({ tag, title, description }) {
  return (
    <div className="section-header">
      {tag && (
        <div className="section-tag">
          <span style={{ color: "var(--accent)" }}>//</span> {tag}
        </div>
      )}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

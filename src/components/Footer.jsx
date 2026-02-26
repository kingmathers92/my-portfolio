import { T } from "../shared/theme";

export function Footer() {
  const links = [
    ["GitHub", "https://github.com/kingmathers92"],
    ["DEV.to", "https://dev.to/khaledbenyahya_"],
    ["Email", "mailto:khaledb.yahya@gmail.com"],
  ];

  return (
    <footer
      style={{
        padding: "26px 48px",
        borderTop: `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 11,
        color: T.muted2,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span>© 2025 Khaled Ben Yahya — Crafted with ♥ in Tunisia 🇹🇳</span>
      <div style={{ display: "flex", gap: 20 }}>
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            style={{ color: T.muted, transition: "color .2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

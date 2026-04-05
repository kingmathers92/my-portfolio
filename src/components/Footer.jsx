import { T } from "../lib/theme";

export function Footer() {
  const links = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Writing", "#writing"],
    ["AI", "#ai"],
  ];

  return (
    <footer
      style={{
        padding: "28px 48px",
        borderTop: `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 11,
        color: T.muted2,
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            style={{
              color: T.muted,
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            {label}
          </a>
        ))}

        <span style={{ color: T.border }}>|</span>

        <a
          href="#hero"
          style={{
            color: T.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = T.accent;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = T.muted;
            e.currentTarget.style.transform = "none";
          }}
        >
          ↑ Top
        </a>
      </div>
      <span>© 2026 Khaled Ben Yahya — Crafted with ♥ in Tunisia</span>
    </footer>
  );
}

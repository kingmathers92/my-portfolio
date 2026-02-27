import { T } from "../lib/theme";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export function Contact() {
  const links = [
    {
      icon: "✉️",
      label: "Email",
      value: "khaledb.yahya@gmail.com",
      href: "mailto:khaledb.yahya@gmail.com",
    },
    {
      icon: <GithubIcon />,
      label: "GitHub",
      value: "kingmathers92",
      href: "https://github.com/kingmathers92",
    },
    {
      icon: "📝",
      label: "DEV.to",
      value: "@khaledbenyahya_",
      href: "https://dev.to/khaledbenyahya_",
    },
    {
      icon: "📖",
      label: "Medium",
      value: "@khaledb.yahya",
      href: "https://medium.com/@khaledb.yahya",
    },
  ];

  return (
    <section
      id="contact"
      style={{ padding: "100px 48px", background: T.surface }}
    >
      <SectionLabel>Contact</SectionLabel>
      <SectionTitle>
        Let's <em>work together</em>
      </SectionTitle>

      <div style={{ maxWidth: 680 }}>
        <p
          className="reveal"
          style={{
            fontFamily: "'Instrument Serif',serif",
            fontStyle: "italic",
            fontSize: 18,
            color: T.muted,
            marginBottom: 40,
            lineHeight: 1.75,
          }}
        >
          Have a project? A role? Or just want to say hello — I'd love to hear
          from you.
        </p>

        <div className="reveal" style={{ border: `1px solid ${T.border}` }}>
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              className="contact-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom:
                  i < links.length - 1 ? `1px solid ${T.border}` : "none",
                color: T.text,
                transition: "background .2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: T.surface2,
                    border: `1px solid ${T.border}`,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  {l.icon}
                </div>
                <div>
                  <div
                    className="c-label"
                    style={{ fontWeight: 500, fontSize: 13 }}
                  >
                    {l.label}
                  </div>
                  <div style={{ fontSize: 12, color: T.muted }}>{l.value}</div>
                </div>
              </div>
              <span
                className="c-arrow"
                style={{ color: T.muted2, fontSize: 18 }}
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

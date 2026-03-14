import { T } from "../lib/theme";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";

export function About() {
  const highlights = [
    {
      icon: "🎓",
      title: "CS50W Graduate",
      sub: "Harvard Web Programming — solid foundation",
    },
    {
      icon: "✍️",
      title: "Technical Writer",
      sub: "Publishing on DEV.to & Medium",
    },
    {
      icon: "🌐",
      title: "Full-Stack Capable",
      sub: "React frontend + Django/Node.js backend",
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      sub: "React → Android via Ionic Capacitor",
    },
    {
      icon: "🤝",
      title: "Open to Collaborate",
      sub: "Remote-first, open to interesting work",
    },
  ];

  return (
    <section
      id="about"
      style={{ padding: "100px 48px", background: T.surface }}
    >
      <SectionLabel>About me</SectionLabel>
      <SectionTitle>
        The person behind
        <br />
        <em>the code</em>
      </SectionTitle>

      <div
        className="agrid reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "start",
        }}
      >
        {/* Text */}
        <div
          style={{
            fontSize: 15,
            lineHeight: 1.95,
            color: "rgba(240,239,232,0.8)",
          }}
        >
          <p>
            Hey — I'm Khaled, a developer from Tunisia with a genuine passion
            for building things people actually enjoy using. Started with
            vanilla JS, fell deep into React, haven't looked back.
          </p>
          <p style={{ marginTop: 18 }}>
            I care about the full creative process: understanding a problem,
            designing the solution, shipping it. I also document what I learn on{" "}
            <a
              href="https://dev.to/khaledbenyahya_"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: T.accent }}
            >
              DEV.to
            </a>{" "}
            and{" "}
            <a
              href="https://medium.com/@khaledb.yahya"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: T.accent }}
            >
              Medium
            </a>
            .
          </p>
          <p style={{ marginTop: 18 }}>
            When I'm not building, I'm thinking about how interfaces can feel
            more{" "}
            <em
              style={{
                color: T.accent,
                fontFamily: "'Instrument Serif', serif",
              }}
            >
              human
            </em>{" "}
            — the details that make someone smile.
          </p>
          <p style={{ marginTop: 24 }}>
            Currently building{" "}
            <strong style={{ color: T.accent }}>MegaDL</strong>, a project I'm
            genuinely excited about.
          </p>
        </div>

        {/* Highlights */}
        <div style={{ border: `1px solid ${T.border}` }}>
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="hi-item"
              style={{
                padding: "20px 24px",
                borderBottom:
                  i < highlights.length - 1 ? `1px solid ${T.border}` : "none",
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 20, marginTop: 2 }}>{h.icon}</span>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 3 }}>
                  {h.title}
                </div>
                <div style={{ fontSize: 11, color: T.muted }}>{h.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

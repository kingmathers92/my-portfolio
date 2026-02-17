import { T } from "../shared/theme";
import { SectionLabel } from "../shared/SectionLabel";
import { SectionTitle } from "../shared/SectionTitle";

export function Skills() {
  const categories = [
    {
      name: "Frontend",
      tags: [
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Redux",
        "Tailwind",
        "Material UI",
      ],
    },
    {
      name: "Backend",
      tags: [
        "Node.js",
        "Django",
        "REST APIs",
        "PostgreSQL",
        "MongoDB",
        "Python",
        "Express",
      ],
    },
    {
      name: "Mobile & Tools",
      tags: [
        "Ionic Capacitor",
        "Git",
        "Figma",
        "VS Code",
        "Linux",
        "Postman",
        "Vite",
      ],
    },
    {
      name: "Concepts",
      tags: [
        "Responsive Design",
        "Accessibility",
        "Performance",
        "SEO",
        "State Management",
        "Web APIs",
      ],
    },
  ];

  return (
    <section id="skills" style={{ padding: "100px 48px" }}>
      <SectionLabel>Expertise</SectionLabel>
      <SectionTitle>
        Tools & <em>technologies</em>
      </SectionTitle>

      <div
        className="slayout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* Sticky sidebar */}
        <div
          className="ssticky reveal"
          style={{ position: "sticky", top: 120 }}
        >
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.9,
              color: "rgba(240,239,232,0.7)",
              marginBottom: 20,
            }}
          >
            Centered on JavaScript and its ecosystem — structured, performant,
            accessible web apps.
          </p>
          <div
            style={{
              marginTop: 28,
              padding: "16px 20px",
              border: `1px solid ${T.border}`,
              borderLeft: `2px solid ${T.accent}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                color: T.accent,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Current Focus
            </div>
            <div style={{ fontSize: 12, color: T.muted }}>
              Next.js App Router · Server Components · Edge
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div
          className="sgrid reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: T.border,
            border: `1px solid ${T.border}`,
          }}
        >
          {categories.map((cat) => (
            <div key={cat.name} style={{ background: T.surface, padding: 28 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: T.accent,
                  marginBottom: 16,
                }}
              >
                {cat.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="skill-tag"
                    style={{
                      background: T.bg,
                      border: `1px solid ${T.border}`,
                      padding: "5px 12px",
                      fontSize: 12,
                      color: T.muted,
                      borderRadius: 2,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

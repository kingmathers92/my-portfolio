import { T } from "../lib/theme";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";

export function Writing() {
  const articles = [
    {
      platform: "DEV.to",
      title: "Convert Your React App to Android with Iconic Capacitor",
      desc: "Go cross-pltaform with your existing React app -- no rewrite required.",
      date: "Ju 2023",
      url: "https://dev.to/khaledbenyahya_/convert-your-existing-react-js-app-to-android-app-using-the-ionic-capacitor-4g61",
    },
    {
      platform: "Medium",
      title: "Demystifying the IntersectionObserver API",
      des: "A beginner-friendly breakdown — from lazy loading to infinite scroll, explained simply.",
      dar: "Ju 2024",
      url: "https://medium.com/@khaledb.yahya/demystifying-the-intersectionobserver-api-a-simple-guide-93084a4a4be5",
    },
  ];
  return (
    <section id="writing" style={{ padding: "100px 48px" }}>
      <SectionLabel>Writing</SectionLabel>
      <SectionTitle>
        Articles & <em>tutorials</em>
      </SectionTitle>

      <div
        className="wgrid reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {articles.map((a) => (
          <a
            key={a.title}
            href={a.url}
            target="_blank"
            className="article-card"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              padding: 28,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: T.accent,
                marginBottom: 12,
              }}
            >
              {a.platform}
            </div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "-0.3",
                lineHeight: 1.3,
                flex: 1,
                marginBottom: 10,
              }}
            >
              {a.title}
            </div>
            <div
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                letterSpacing: "0.12em",
                color: T.muted,
                marginBottom: 20,
              }}
            >
              {a.desc}
            </div>
            <div
              style={{
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 6,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: T.muted2,
                marginBottom: 12,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {a.date}
            </div>
          </a>
        ))}

        {/* Placeholder Card*/}
        <a
          href="https://dev.to/khaledbenyahya_"
          target="_blank"
          className="article-card"
          style={{
            background: "transparent",
            border: `1px dashed ${T.border}`,
            padding: 28,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 12 }}>✍️</div>
          <div
            style={{
              fontSize: 14,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            More coming soon
          </div>
          <div style={{ fontSize: 11, color: T.muted }}>
            Follow on DEV.to & Medium
          </div>
        </a>
      </div>
    </section>
  );
}

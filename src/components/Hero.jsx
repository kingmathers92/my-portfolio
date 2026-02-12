import { T } from "../shared/theme";

export function Hero() {
  return (
    <section
      id="Hero"
      className="hgrid"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 48px",
        gap: 48,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(44px, 6vw, 78px",
            lineHeight: 1.0,
            letterSpacing: -2,
          }}
        >
          Khaled
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: `1px rgba(240, 239, 232, 0.25)`,
            }}
          >
            Ben Yahya
          </span>
        </h1>
      </div>

      <div className="hcode" style={{ position: "relative", zIndex: 2 }}>
        <p style={{ color: T.muted }}>Code card coming soon</p>
      </div>
    </section>
  );
}

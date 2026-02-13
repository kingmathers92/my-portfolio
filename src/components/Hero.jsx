import { T } from "../shared/theme";

export function Hero() {
  return (
    <section
      id="hero"
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
      {/* Background grid pattern */}
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

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(232,168,56,0.06) 0%, transparent 68%)",
          top: "50%",
          left: "45%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Left column */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Available tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: T.surface2,
            border: `1px solid ${T.border}`,
            padding: "6px 14px",
            borderRadius: 2,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: T.accent,
            marginBottom: 28,
            animation: "fadeUp 0.6s ease both",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.accent,
              animation: "pulse 2s infinite",
            }}
          />
          Available for work
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(44px, 6vw, 78px)",
            lineHeight: 1.0,
            letterSpacing: -2,
            marginBottom: 14,
            animation: "fadeUp 0.7s 0.1s ease both",
          }}
        >
          Khaled
          <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: `1px rgba(240,239,232,0.25)`,
            }}
          >
            Ben Yahya
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            color: T.muted,
            marginBottom: 36,
            maxWidth: 460,
            lineHeight: 1.8,
            animation: "fadeUp 0.7s 0.2s ease both",
          }}
        >
          Building{" "}
          <strong style={{ color: T.text }}>thoughtful web experiences</strong>{" "}
          with React & Next.js — fast, accessible, pixel-perfect.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            animation: "fadeUp 0.7s 0.3s ease both",
          }}
        >
          <a
            href="#projects"
            className="btn-p"
            style={{
              background: T.accent,
              color: "#000",
              padding: "12px 28px",
              borderRadius: 3,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: `1px solid ${T.accent}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6H10M10 6L7 3M10 6L7 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View Work
          </a>
          <a
            href="#ai"
            className="btn-s"
            style={{
              background: "transparent",
              color: T.text,
              padding: "12px 28px",
              borderRadius: 3,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: `1px solid ${T.accent}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 14 }}>✦</span> Try AI Twin
          </a>
        </div>
      </div>

      {/* Right column */}
      <div className="hcode" style={{ position: "relative", zIndex: 2 }}>
        <p style={{ color: T.muted }}>Code card coming soon</p>
      </div>
    </section>
  );
}

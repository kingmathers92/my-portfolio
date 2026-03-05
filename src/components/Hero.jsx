import { T } from "../lib/theme";
import { CodeCard } from "./CodeCard";

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

        {/* Stats*/}
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: T.border,
            border: `1px solid ${T.border}`,
            borderRadius: 3,
            overflow: "hidden",
            marginTop: 32,
          }}
        >
          {[
            ["3+", "Years"],
            ["10+", "Projects"],
            ["🇹🇳", "Tunisia"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                background: T.surface,
                padding: "18px 12px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 26,
                  fontWeight: 800,
                  color: T.accent,
                  display: "block",
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: T.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Right column */}
      <div
        className="hcode"
        style={{ position: "relative", zIndex: 2, marginLeft: "90px" }}
      >
        <div
          className="hcode"
          style={{
            position: "relative",
            zIndex: 2,
            animation: "fadeUp 0.8s 0.5s ease both",
          }}
        >
          <CodeCard />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: T.muted,
          animation: "fadeUp 0.6s 0.9s ease both",
        }}
      >
        <span style={{ width: 40, height: 1, background: T.muted2 }} /> Scroll
        to explore
      </div>
    </section>
  );
}

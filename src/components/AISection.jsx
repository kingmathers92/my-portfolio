import { useState } from "react";
import { T } from "../shared/theme";
import { SectionLabel } from "../shared/SectionLabel";
import { callClaude, JOB_MATCH_SYSTEM } from "../shared/api";

// ── SVG progress ring ──────────────────────────────────────────
function ScoreRing({ score }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  // Color changes based on score
  const color =
    score >= 75
      ? "#28C840"
      : score >= 50
        ? T.accent
        : score >= 30
          ? "#FEBC2E"
          : "#FF5F57";

  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle
        cx="55"
        cy="55"
        r={radius}
        fill="none"
        stroke={T.border}
        strokeWidth="6"
      />

      <circle
        cx="55"
        cy="55"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
        strokeDashoffset={circumference * 0.25}
        style={{
          transition: "stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1)",
          filter: `drop-shadow(0 0 6px ${color}88)`,
        }}
      />

      <text
        x="55"
        y="52"
        textAnchor="middle"
        fill={T.text}
        fontSize="22"
        fontFamily="'Syne',sans-serif"
        fontWeight="800"
      >
        {score}
      </text>
      <text
        x="55"
        y="67"
        textAnchor="middle"
        fill={T.muted}
        fontSize="9"
        fontFamily="'JetBrains Mono',monospace"
      >
        / 100
      </text>
    </svg>
  );
}

// Individual skill bar
function SkillBar({ name, score, found }) {
  const color = found ? (score >= 70 ? "#28C840" : T.accent) : T.muted2;

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span style={{ fontSize: 12, color: found ? T.text : T.muted }}>
          {name}
        </span>
        <span style={{ fontSize: 11, color }}>{score}%</span>
      </div>
      <div
        style={{
          background: T.border,
          borderRadius: 2,
          height: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: color,
            borderRadius: 2,
            transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: found ? `0 0 8px ${color}66` : "none",
          }}
        />
      </div>
    </div>
  );
}

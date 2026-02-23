import { useState } from "react";
import { T } from "../shared/theme";
import { SectionLabel } from "../shared/SectionLabel";
import { callClaude, JOB_MATCH_SYSTEM } from "../shared/api";

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

function JobMatcher() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!jd.trim() || jd.length < 50) {
      setError("Please paste a complete job description.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const raw = await callClaude(
        [
          {
            role: "user",
            content: `Analyze this JD for Khaled's fit:\n\n${jd}`,
          },
        ],
        JOB_MATCH_SYSTEM,
        null,
      );
      const clean = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      setError("Analysis failed — please try again.");
    }
    setLoading(false);
  };

  const verdictColor = (v) =>
    ({
      "Strong Match": "#28C840",
      "Good Match": T.accent,
      "Partial Match": "#FEBC2E",
      "Weak Match": "#FF5F57",
    })[v] || T.muted;

  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 28px",
          borderBottom: `1px solid ${T.border}`,
          background: T.surface2,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          🎯
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Job Match Analyzer
          </div>
          <div style={{ fontSize: 11, color: T.muted }}>
            Paste a JD — AI scores Khaled's fit instantly
          </div>
        </div>
      </div>

      <div style={{ padding: 28 }}>
        {!result ? (
          // INPUT STATE
          <>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder={
                "Paste the full job description here…\n\ne.g. We're looking for a Senior Frontend Developer with 3+ years of React experience…"
              }
              style={{
                width: "100%",
                minHeight: 160,
                background: T.bg,
                border: `1px solid ${T.border}`,
                borderRadius: 4,
                padding: "14px 16px",
                color: T.text,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12,
                lineHeight: 1.7,
                resize: "vertical",
                outline: "none",
                transition: "border-color .2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = T.accent)}
              onBlur={(e) => (e.target.style.borderColor = T.border)}
            />
            {error && (
              <div style={{ color: "#FF5F57", fontSize: 12, marginTop: 8 }}>
                {error}
              </div>
            )}
            <button
              onClick={analyze}
              disabled={loading || !jd.trim()}
              style={{
                marginTop: 16,
                background: loading ? T.surface2 : T.accent,
                color: loading ? T.muted : "#000",
                border: `1px solid ${loading ? T.border : T.accent}`,
                padding: "12px 28px",
                borderRadius: 3,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all .2s",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      border: `2px solid ${T.muted}`,
                      borderTopColor: T.accent,
                      borderRadius: "50%",
                      animation: "spin .7s linear infinite",
                      display: "inline-block",
                    }}
                  />{" "}
                  Analyzing…
                </>
              ) : (
                <>
                  <span>✦</span> Analyze Match
                </>
              )}
            </button>
          </>
        ) : (
          // RESULTS STATE
          <div style={{ animation: "chatUp .4s ease both" }}>
            {/* Score + verdict */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              <ScoreRing score={result.overallScore} />
              <div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 22,
                    fontWeight: 800,
                    color: verdictColor(result.verdict),
                    marginBottom: 6,
                  }}
                >
                  {result.verdict}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: T.muted,
                    lineHeight: 1.7,
                    maxWidth: 360,
                  }}
                >
                  {result.summary}
                </div>
              </div>
            </div>

            {/* Skill bars */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: T.accent,
                  marginBottom: 14,
                }}
              >
                Skill Breakdown
              </div>
              {result.skills?.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>

            {/* Strengths and gaps */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  background: T.bg,
                  border: "1px solid rgba(40,200,64,.15)",
                  padding: "16px 18px",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#28C840",
                    marginBottom: 10,
                  }}
                >
                  Strengths
                </div>
                {result.strengths?.map((s) => (
                  <div
                    key={s}
                    style={{
                      fontSize: 12,
                      color: T.muted,
                      marginBottom: 6,
                      paddingLeft: 14,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "#28C840",
                      }}
                    >
                      ✓
                    </span>
                    {s}
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: T.bg,
                  border: "1px solid rgba(255,95,87,.12)",
                  padding: "16px 18px",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#FF5F57",
                    marginBottom: 10,
                  }}
                >
                  Gaps
                </div>
                {result.gaps?.length > 0 ? (
                  result.gaps.map((g) => (
                    <div
                      key={g}
                      style={{
                        fontSize: 12,
                        color: T.muted,
                        marginBottom: 6,
                        paddingLeft: 14,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#FF5F57",
                        }}
                      >
                        △
                      </span>
                      {g}
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 12, color: T.muted }}>
                    No significant gaps.
                  </div>
                )}
              </div>
            </div>

            {/* Recruiter note */}
            <div
              style={{
                background: T.bg,
                border: `1px solid ${T.border}`,
                borderLeft: `2px solid ${T.accent}`,
                padding: "14px 18px",
                borderRadius: 4,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.accent,
                  marginBottom: 6,
                }}
              >
                Recruiter Note
              </div>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>
                {result.recruiterNote}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href="mailto:khaledb.yahya@gmail.com"
                style={{
                  background: T.accent,
                  color: "#000",
                  padding: "10px 22px",
                  borderRadius: 3,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                ✉ Contact Khaled
              </a>
              <button
                onClick={() => setResult(null)}
                style={{
                  background: "transparent",
                  color: T.muted,
                  border: `1px solid ${T.border}`,
                  padding: "10px 22px",
                  borderRadius: 3,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "none",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.accent;
                  e.currentTarget.style.color = T.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.color = T.muted;
                }}
              >
                ← New analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

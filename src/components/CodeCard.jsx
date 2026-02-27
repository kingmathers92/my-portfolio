import { T } from "../shared/theme";

export function CodeCard() {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        overflow: "hidden",
        animation: "float 7s ease-in-out infinite",
        width: 420,
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          background: T.surface2,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div
            key={c}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
        <span style={{ marginLeft: 8, fontSize: 11, color: T.muted }}>
          khaled.config.ts
        </span>
      </div>

      {/* Code lines */}
      <div
        style={{
          padding: "22px 24px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12.5,
          lineHeight: 1.85,
        }}
      >
        {[
          [
            <>
              <span style={{ color: "#c792ea" }}>const</span>{" "}
              <span style={{ color: "#82aaff" }}>developer</span> = {"{"}
            </>,
          ],
          [
            <>
              &nbsp;&nbsp;name:{" "}
              <span style={{ color: "#c3e88d" }}>"Khaled Ben Yahya"</span>,
            </>,
          ],
          [
            <>
              &nbsp;&nbsp;role:{" "}
              <span style={{ color: "#c3e88d" }}>"Frontend Developer"</span>,
            </>,
          ],
          [
            <>
              &nbsp;&nbsp;location:{" "}
              <span style={{ color: "#c3e88d" }}>"Tunisia 🇹🇳"</span>,
            </>,
          ],
          [
            <>
              &nbsp;&nbsp;stack: [
              <span style={{ color: "#c3e88d" }}>"React"</span>,{" "}
              <span style={{ color: "#c3e88d" }}>"Next.js"</span>],
            </>,
          ],
          [
            <>
              &nbsp;&nbsp;currently:{" "}
              <span style={{ color: T.accent }}>"Ballagh 🚀"</span>,
            </>,
          ],
          [
            <>
              &nbsp;&nbsp;
              <span style={{ color: T.muted }}>
                // ✦ chat with my AI twin below
              </span>
            </>,
          ],
          [
            <>
              &nbsp;&nbsp;available:{" "}
              <span style={{ color: "#c792ea" }}>true</span>
            </>,
          ],
          [<>{"}"}</>],
        ].map((line, i) => (
          <div key={i} style={{ display: "flex" }}>
            <span
              style={{
                color: T.muted2,
                marginRight: 16,
                minWidth: 20,
                userSelect: "none",
                fontSize: 11,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

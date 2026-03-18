import { T } from "../lib/theme";
export function SectionLabel({ children }) {
  return (
    <div
      className="flex items-center text-accent uppercase"
      style={{
        fontSize: 11,
        letterSpacing: "0.2em",
        marginBottom: 12,
        gap: 14,
      }}
    >
      <span style={{ width: 24, height: 1, background: T.accent }} />
      {children}
    </div>
  );
}

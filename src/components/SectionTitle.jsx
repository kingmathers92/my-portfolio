import { T } from "../lib/theme";

export function SectionTitle({ children }) {
  const process = (child) => {
    if (!child) return child;
    if (typeof child === "string") return child;
    if (child.type === "em")
      return (
        <em
          key="em"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontWeight: 400,
            color: T.accent,
          }}
        >
          {child.props.children}
        </em>
      );
    if (child.type === "br") return <br key="br" />;
    return child;
  };

  const kids = Array.isArray(children)
    ? children.map(process)
    : process(children);

  return (
    <h2
      className="reveal"
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(30px, 4vw, 50px)",
        fontWeight: 800,
        letterSpacing: -1.5,
        marginBottom: 48,
        lineHeight: 1.1,
      }}
    >
      {kids}
    </h2>
  );
}

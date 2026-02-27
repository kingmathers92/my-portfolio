import { useState, useEffect } from "react";
import { T } from "../lib/theme";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "writing",
        "ai",
        "contact",
      ];

      // Find which section is active
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "14px 48px" : "22px 48px",
        background: scrolled ? "rgba(8,8,7,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${T.border}`
          : "1px solid transparent",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: -0.5,
          color: T.text,
        }}
      >
        K<span style={{ color: T.accent }}>.</span>BY
      </a>

      <ul style={{ display: "flex", gap: 28, listStyle: "none" }}>
        {["About", "Skills", "Projects", "Writing", "AI", "Contact"].map(
          (link) => {
            const id = link.toLowerCase();

            return (
              <li key={link}>
                <a
                  href={`#${id}`}
                  className="nav-link"
                  style={{
                    color:
                      activeSection === link.toLowerCase() ? T.text : T.muted,
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {link}
                </a>
              </li>
            );
          },
        )}
      </ul>
    </nav>
  );
}

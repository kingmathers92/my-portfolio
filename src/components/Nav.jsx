import { useState, useEffect } from "react";
import { T } from "../lib/theme";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleLinkClick = () => setMenuOpen(false);

  const links = ["About", "Skills", "Projects", "Writing", "AI", "Contact"];

  return (
    <>
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
        {/* Logo */}
        <a
          href="#hero"
          className="nav-logo"
          style={{
            color: T.text,
          }}
        >
          K<span style={{ color: T.accent }}>.</span>BY
        </a>

        {/* Desktop nav */}
        <ul
          className="navlinks flex"
          style={{
            gap: 28,
            listStyle: "none",
          }}
        >
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="nav-link uppercase"
                style={{
                  color:
                    activeSection === link.toLowerCase() ? T.text : T.muted,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="hamburger"
          style={{
            display: "none",
            background: "transparent",
            border: `1px solid ${T.border}`,
            borderRadius: 4,
            padding: "6px 10px",
            cursor: "pointer",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: 20,
              height: 1.5,
              background: menuOpen ? T.accent : T.text,
              transform: menuOpen
                ? "rotate(45deg) translate(4.5px, 4.5px)"
                : "none",
              transition: "all 0.25s",
            }}
          />
          <span
            style={{
              width: 20,
              height: 1.5,
              background: T.text,
              opacity: menuOpen ? 0 : 1,
              transition: "all 0.25s",
            }}
          />
          <span
            style={{
              width: 20,
              height: 1.5,
              background: menuOpen ? T.accent : T.text,
              transform: menuOpen
                ? "rotate(-45deg) translate(4.5px, -4.5px)"
                : "none",
              transition: "all 0.25s",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(8,8,7,0.97)",
            backdropFilter: "blur(20px)",
            gap: 8,
          }}
        >
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={handleLinkClick}
              className="font-syne fw-800"
              style={{
                fontSize: "clamp(32px, 8vw, 48px)",
                letterSpacing: -1,
                color: activeSection === link.toLowerCase() ? T.accent : T.text,
                padding: "8px 0",
                opacity: 0,
                animation: `fadeUp 0.4s ${i * 0.06}s ease forwards`,
              }}
            >
              {link}
            </a>
          ))}

          {/* Footer text */}
          <div
            className="uppercase"
            style={{
              position: "absolute",
              bottom: 48,
              fontSize: 11,
              color: T.muted,
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            khaledb.yahya@gmail.com
          </div>
        </div>
      )}
    </>
  );
}

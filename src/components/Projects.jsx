import { T } from "../lib/theme";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function ProjectCard({
  num,
  name,
  desc,
  stack,
  badge,
  badgeAccent,
  ghUrl,
  liveUrl,
  delay = 0,
}) {
  return (
    <div
      className="project-card reveal relative overflow-hidden"
      style={{
        background: T.surface,
        padding: 36,
        transitionDelay: `${delay}s`,
      }}
    >
      {badge && (
        <div
          className="uppercase"
          style={{
            position: "absolute",
            top: 36,
            right: 36,
            background: badgeAccent ? "transparent" : T.accent,
            color: badgeAccent ? T.accent : "#000",
            border: badgeAccent ? `1px solid ${T.accent}` : "none",
            fontSize: 9,
            letterSpacing: "0.15em",
            padding: "4px 10px",
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          {badge}
        </div>
      )}

      <div className="project-num text-muted2">{num} —</div>
      <div className="project-name">{name}</div>
      <p className="project-desc text-muted">{desc}</p>

      <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 26 }}>
        {stack.map((s) => (
          <span key={s} className="stack-tag">
            {s}
          </span>
        ))}
      </div>

      <div className="flex" style={{ gap: 18 }}>
        {ghUrl && (
          <a
            href={ghUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link text-muted"
            onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            <GithubIcon /> GitHub
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link text-muted"
            onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const projects = [
    {
      num: "01",
      name: "MovieHub",
      desc: "Netflix-inspired movie platform with voice search powered by Alan AI, real TMDB data, Redux state management, dark mode, and user features like watchlist & favorites.",
      stack: ["React", "Redux", "Material UI", "Alan AI", "TMDB API"],
      badge: "Live",
      ghUrl: "https://github.com/kingmathers92/moviehub",
      liveUrl: "https://moviehubnet.netlify.app/",
      delay: 0,
    },
    {
      num: "02",
      name: "Ejari",
      desc: "Modern TypeScript web application. Currently in active development with a clean, professional architecture.",
      stack: ["TypeScript", "React", "TailwindCSS"],
      badge: "In Progress",
      badgeAccent: true,
      ghUrl: "https://github.com/kingmathers92/ejari",
      delay: 0.06,
    },
    {
      num: "03",
      name: "Mega-DL",
      desc: "Powerful Python tool for downloading albums from file-hosting sites. Features parallel downloads, resume support, speed limiting, and a beautiful dark-mode Tkinter GUI.",
      stack: ["Python", "Tkinter", "Requests", "Tqdm"],
      ghUrl: "https://github.com/kingmathers92/mega-dl",
      delay: 0.12,
    },
    {
      num: "04",
      name: "Pizza Si 🍕",
      desc: "Delightful pizza ordering experience built for a local restaurant. Focused on smooth animations and intuitive UX.",
      stack: ["JavaScript", "CSS3", "HTML5", "Framer Motion"],
      ghUrl: "https://github.com/kingmathers92/pizza-si",
      delay: 0.18,
    },
  ];

  return (
    <section
      id="projects"
      style={{ padding: "100px 48px", background: T.surface }}
    >
      <SectionLabel>Work</SectionLabel>
      <SectionTitle>
        Selected <em>projects</em>
      </SectionTitle>

      <div
        className="pgrid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          background: T.border,
          border: `1px solid ${T.border}`,
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.num} {...p} />
        ))}
      </div>

      <div className="reveal text-center" style={{ marginTop: 28 }}>
        <a
          href="https://github.com/kingmathers92"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center uppercase"
          style={{
            display: "inline-flex",
            gap: 8,
            fontSize: 12,
            letterSpacing: "0.1em",
            color: T.muted,
            border: `1px solid ${T.border}`,
            padding: "12px 24px",
            borderRadius: 3,
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
          <GithubIcon /> View all on GitHub
        </a>
      </div>
    </section>
  );
}

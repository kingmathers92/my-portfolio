import { useReveal } from "./lib/useReveal";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Writing } from "./components/Writing";
// import { AISection } from "./components/AI/AISection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AskKhaledChat } from "./components/AI/AskKhaledChat";
import { T } from "./lib/theme";

function App() {
  useReveal();

  const MAINTENANCE = true;

  function MaintenanceOverlay() {
    if (!MAINTENANCE) return null;

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: 24,
          background: `
            radial-gradient(circle at 60% 40%, rgba(232,168,56,.08), transparent 60%),
            ${T.bg}
          `,
        }}
      >
        {/* glow orb */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(232,168,56,.12), transparent 70%)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 32,
              fontWeight: 800,
              marginBottom: 12,
              letterSpacing: -1,
            }}
          >
            🚧 Under Maintenance
          </div>

          <div
            style={{
              fontSize: 14,
              color: T.muted,
              maxWidth: 420,
              lineHeight: 1.8,
              marginBottom: 24,
            }}
          >
            I'm currently refining the experience and upgrading a few things.
            The site will be back very soon.
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 11,
              color: T.muted2,
            }}
          >
            — Khaled Ben Yahya
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MaintenanceOverlay />
      <div className="noise" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Writing />
        {/* <AISection /> */}
        <Contact />
      </main>
      <Footer />
      <AskKhaledChat />
    </>
  );
}

export default App;

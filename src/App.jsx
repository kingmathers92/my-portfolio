import { useReveal } from "./shared/useReveal";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Writing } from "./components/Writing";
import { AISection } from "./components/AISection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AskKhaledChat } from "./components/AskKhaledChat";

function App() {
  useReveal();

  return (
    <>
      <div className="noise" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Writing />
        <AISection />
        <Contact />
      </main>
      <Footer />
      <AskKhaledChat />
    </>
  );
}

export default App;

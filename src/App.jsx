import { T } from "./shared/theme";
import { useReveal } from "./shared/useReveal";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Writing } from "./components/Writing";
import { Contact } from "./components/Contact";

function App() {
  useReveal();

  return (
    <>
      <div className="noise" />
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Writing />
      <Contact />
    </>
  );
}

export default App;

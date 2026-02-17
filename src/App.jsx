import { T } from "./shared/theme";
import { useReveal } from "./shared/useReveal";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";

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
    </>
  );
}

export default App;

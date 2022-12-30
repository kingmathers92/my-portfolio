import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} />
      <Home />
      <About />
      <Skills />
      <Work />
      <Contact />
    </div>
  );
}

export default App;

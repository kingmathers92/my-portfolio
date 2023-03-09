import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
//import Skills from "./components/Skills";
//import Work from "./components/Work";
import { useState, useEffect, Suspense, lazy } from "react";

const SkillsLazy = lazy(() => import("./components/Skills"));
const WorkLazy = lazy(() => import("./components/Work"));

function App() {
  const [theme, setTheme] = useState("light");
  const [nav, setNav] = useState(false);

  useEffect(() => {
    // Get the preferred theme of the user's device so it would be set as default intially
    const preferredColorScheme =
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "dark"
        : "light";
    setTheme(preferredColorScheme);
  }, []);
  document.body.className = theme === "light" ? "light-theme" : "dark-theme";

  return (
    <>
      <Suspense fallback={<h1 className="loader">Loading</h1>}>
        <Navbar theme={theme} setTheme={setTheme} setNav={setNav} />
        <Home />
        <About />
        <SkillsLazy />
        <WorkLazy />
        <Contact nav={nav} />
      </Suspense>
    </>
  );
}

export default App;

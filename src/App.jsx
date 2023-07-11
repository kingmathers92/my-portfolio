import { useState, useEffect, Suspense, lazy } from "react";
import {
  Navbar,
  Home,
  About,
  Blog,
  Youtube,
  Contact,
} from "./components/index";

const Skills = lazy(() => import("./components/Skills"));
const Work = lazy(() => import("./components/Work"));

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
        <Skills />
        <Work />
        <Blog />
        <Youtube />
        <Contact nav={nav} />
      </Suspense>
    </>
  );
}

export default App;

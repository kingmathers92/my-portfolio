import { useState, useEffect, Suspense, lazy } from "react";
import { Navbar } from "./components/index";
import { Home, Blog, Youtube, Contact } from "./pages/index";

const Skills = lazy(() => import("./pages/Skills"));
const Work = lazy(() => import("./pages/Work"));

function App() {
  const [theme, setTheme] = useState("light");
  const [nav, setNav] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  const onScroll = () => {
    let pixelsFromTop = window.scrollY;
    let documentHeight = document.body.clientHeight;
    let windowHeight = window.innerHeight;
    let difference = documentHeight - windowHeight;
    let percentage = (100 * pixelsFromTop) / difference;
    setProgressWidth(percentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
        <div className="progress_wrapper">
          <div
            className="progress_bar"
            id="bar"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <Home />
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

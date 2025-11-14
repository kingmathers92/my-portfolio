import { useState, useEffect, Suspense, lazy } from "react";
import { Navbar } from "./components/index";
import { Home, Blog, Contact } from "./pages/index";
import { ErrorBoundary } from "./components/index";
import { MrMiyagi } from "@uiball/loaders";
const Skills = lazy(() => import("./pages/Skills"));
const Work = lazy(() => import("./pages/Work"));
const Youtube = lazy(() => import("./pages/Youtube"));
function App() {
  const [theme, setTheme] = useState("light");
  const [nav, setNav] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isAllowed, setIsAllowed] = useState(null);

  const apiKey = process.env.REACT_APP_IPAPI_KEY;
  const bs = ['MA', 'SE'];

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
  }, []);
  useEffect(() => {
    const preferredColorScheme =
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "dark"
        : "light";
    setTheme(preferredColorScheme);
  }, []);

  useEffect(() => {
    const checkC = async () => {
      try {
        const response = await fetch(`https://api.ipapi.com/api/check?access_key=${apiKey}&fields=country_code`);
        const data = await response.json();
        const cc = data.country_code || 'UNKNOWN';

        if (bs.includes(cc)) {
          setIsAllowed(false);
        } else {
          setIsAllowed(true);
        }
      } catch (error) {
        console.error('Geolocation failed:', error);
        setIsAllowed(true);
      }
    };

    checkC();
  }, []);

  document.body.className = theme === "light" ? "light-theme" : "dark-theme";

  if (isAllowed === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <MrMiyagi size={60} lineWeight={3.5} speed={1} color="#68d391" />
      </div>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <MrMiyagi size={60} lineWeight={3.5} speed={1} color="#68d391" />
          </div>
        }
      >
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
    </ErrorBoundary>
  );
}
export default App;
import { T } from "./shared/theme";
import { useReveal } from "./shared/useReveal";

function App() {
  useReveal();
  return (
    <>
      <div className="noise" />
      <h1 className="reveal" style={{ color: T.accent }}>
        Khaled Ben Yahya
      </h1>
    </>
  );
}

export default App;

import { T } from "./shared/theme";
import { useReveal } from "./shared/useReveal";
import { Cursor } from "./components/Cursor";

function App() {
  useReveal();
  return (
    <>
<div className="noise" />
<Cursor />
      <h1 className="reveal" style={{ color: T.accent }}>
        Khaled Ben Yahya
      </h1>
    </>
  );
}

export default App;

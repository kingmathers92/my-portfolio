import { useState, useEffect } from "react";
import { T } from "../lib/theme";

export function Typewriter({ strings, speed = 80, pause = 1800 }) {
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const current = strings[stringIndex];
  const displayText = current.slice(0, charIndex);

  useEffect(() => {
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setStringIndex((i) => (i + 1) % strings.length);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    stringIndex,
    current,
    speed,
    pause,
    strings.length,
  ]);

  return (
    <span
      style={{
        color: T.accent,
        fontFamily: "'Instrument Serif', serif",
        fontStyle: "italic",
        fontSize: 18,
      }}
    >
      {displayText}
      <span style={{ animation: "blink 1s infinite", marginLeft: 1 }}>|</span>
    </span>
  );
}

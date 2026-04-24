import { useState, useRef, useEffect } from "react";
import { T } from "../lib/theme";
import { findResponse, SUGGESTED_PROMPTS } from "../lib/knowledgeBase";
import { initEngine, chatWithAI, isEngineLoading } from "../lib/webllm-helper";

export function AskKhaledChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! Ask me anything about Khaled's work, stack, or availability. I'll answer instantly — or load the AI twin for deeper questions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState(false); // false = hardcoded, true = WebLLM
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiHistory, setAiHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendHardcoded = async (text) => {
    const userMsg = text.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay (800ms - 1.5s based on response length)
    const response = findResponse(userMsg);
    const delay = Math.min(800 + response.length * 10, 1500);

    await new Promise((r) => setTimeout(r, delay));

    setIsTyping(false);
    const words = response.split(" ");
    let currentText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i];
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return [
            ...prev.slice(0, -1),
            { role: "assistant", content: currentText },
          ];
        }
        return prev;
      });
      await new Promise((r) => setTimeout(r, 30));
    }
  };

  const sendAI = async (text) => {
    const userMsg = text.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await chatWithAI(userMsg, aiHistory);
      let fullResponse = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      for await (const chunk of reply) {
        const text = chunk.choices[0]?.delta?.content || "";
        fullResponse += text;

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              { role: "assistant", content: fullResponse },
            ];
          }
          return prev;
        });
      }

      setAiHistory((prev) => [
        ...prev,
        { role: "user", content: userMsg },
        { role: "assistant", content: fullResponse },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, my AI twin is having trouble thinking. Try asking me the simple way, or email Khaled directly.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (aiMode) {
      sendAI(input);
    } else {
      sendHardcoded(input);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const loadAI = async () => {
    if (isEngineLoading()) return;
    setAiLoading(true);
    setAiProgress(0);

    try {
      await initEngine((pct) => setAiProgress(pct));
      setAiMode(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "🔮 AI Twin loaded! I can now answer deeper questions about Khaled's work. What would you like to know?",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Couldn't load the AI twin. Your browser might not support WebGPU, or the connection is slow. I'll stick to my prepared answers — they're still pretty good!",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const suggestedPrompt = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <section
      id="ask-khaled"
      style={{ padding: "100px 48px", maxWidth: 800, margin: "0 auto" }}
    >
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: T.accent,
            marginBottom: 12,
          }}
        >
          Ask Khaled
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          Ask my{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif" }}>AI twin</em>
        </h2>
        <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.7 }}>
          {aiMode
            ? "🔮 AI Twin active — running locally in your browser. No data leaves your device."
            : "⚡ Instant answers powered by handcrafted responses. Load the AI twin for deeper questions."}
        </p>
      </div>

      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {/* Messages */}
        <div
          style={{
            height: 400,
            overflowY: "auto",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "12px 16px",
                borderRadius:
                  msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                background: msg.role === "user" ? T.accent : T.surface2,
                color: msg.role === "user" ? "#000" : T.text,
                fontSize: 13,
                lineHeight: 1.7,
                wordBreak: "break-word",
              }}
            >
              {msg.content}
              {msg.role === "assistant" && !msg.content && isTyping && (
                <span style={{ opacity: 0.6 }}>Thinking...</span>
              )}
            </div>
          ))}

          {isTyping &&
            !aiMode &&
            messages[messages.length - 1]?.role === "user" && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "12px 16px",
                  borderRadius: "16px 16px 16px 4px",
                  background: T.surface2,
                  color: T.muted,
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  Thinking
                  <span
                    style={{
                      animation: "dotBounce 1.4s infinite",
                      animationDelay: "0s",
                    }}
                  >
                    .
                  </span>
                  <span
                    style={{
                      animation: "dotBounce 1.4s infinite",
                      animationDelay: "0.2s",
                    }}
                  >
                    .
                  </span>
                  <span
                    style={{
                      animation: "dotBounce 1.4s infinite",
                      animationDelay: "0.4s",
                    }}
                  >
                    .
                  </span>
                </span>
              </div>
            )}

          <div ref={messagesEndRef} />
        </div>

        <div
          style={{
            padding: "16px 20px",
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              aiMode
                ? "Ask anything deeper..."
                : "Ask about my work, stack, or availability..."
            }
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: T.text,
              fontSize: 13,
              fontFamily: "inherit",
              lineHeight: 1.7,
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            style={{
              background: input.trim() && !isTyping ? T.accent : T.border,
              color: input.trim() && !isTyping ? "#000" : T.muted,
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Syne', sans-serif",
              cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
              transition: "all 0.2s",
            }}
          >
            Send
          </button>
        </div>
      </div>

      {!aiMode && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => suggestedPrompt(prompt)}
              style={{
                background: "transparent",
                border: `1px solid ${T.border}`,
                color: T.muted,
                padding: "6px 12px",
                borderRadius: 4,
                fontSize: 11,
                fontFamily: "inherit",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = T.accent;
                e.target.style.color = T.accent;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = T.border;
                e.target.style.color = T.muted;
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {!aiMode && !aiLoading && (
        <button
          onClick={loadAI}
          style={{
            background: "transparent",
            border: `1px dashed ${T.accentDim}`,
            color: T.accent,
            padding: "10px 20px",
            borderRadius: 4,
            fontSize: 12,
            fontFamily: "'Syne', sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
            width: "100%",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(232, 168, 56, 0.04)";
            e.target.style.borderStyle = "solid";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.borderStyle = "dashed";
          }}
        >
          <span>🔮</span> Load AI Twin (runs locally, ~1.2GB download)
        </button>
      )}

      {aiLoading && (
        <div
          style={{
            padding: "10px 20px",
            border: `1px solid ${T.border}`,
            borderRadius: 4,
            color: T.muted,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: 8 }}>
            Downloading AI model... {aiProgress}%
          </div>
          <div
            style={{
              width: "100%",
              height: 4,
              background: T.surface2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${aiProgress}%`,
                height: "100%",
                background: T.accent,
                transition: "width 0.3s",
                borderRadius: 2,
              }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7 }}>
            This runs entirely in your browser. No data is sent to any server.
          </div>
        </div>
      )}

      {aiMode && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: T.accent,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: "#4ade80",
              borderRadius: "50%",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          AI Twin Active · Local · Private
        </div>
      )}
    </section>
  );
}

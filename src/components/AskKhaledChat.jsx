import { useState, useRef, useEffect } from "react";
import { findResponse, SUGGESTED_PROMPTS } from "../lib/knowledgeBase";
import {
  initEngine,
  chatWithAI,
  isEngineLoading,
  supportsWebLLM,
} from "../lib/webllm-helper";

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

  const [aiMode, setAiMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiHistory, setAiHistory] = useState([]);

  const [canUseAI, setCanUseAI] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (messages.length !== prevMessagesLength.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      prevMessagesLength.current = messages.length;
    }
  }, [messages.length]);

  useEffect(() => {
    let mounted = true;

    supportsWebLLM().then((supported) => {
      if (mounted) {
        setCanUseAI(supported);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const sendHardcoded = async (text) => {
    const userMsg = text.trim();

    if (!userMsg) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMsg,
      },
    ]);

    setInput("");
    setIsTyping(true);

    const response = findResponse(userMsg);

    const delay = Math.min(800 + response.length * 10, 1500);

    await new Promise((r) => setTimeout(r, delay));

    setIsTyping(false);

    const words = response.split(" ");
    let currentText = "";

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
      },
    ]);

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i];

      setMessages((prev) => {
        const last = prev[prev.length - 1];

        if (last?.role === "assistant") {
          return [
            ...prev.slice(0, -1),
            {
              role: "assistant",
              content: currentText,
            },
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

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMsg,
      },
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const reply = await chatWithAI(userMsg, aiHistory);

      let fullResponse = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
        },
      ]);

      for await (const chunk of reply) {
        const text = chunk.choices[0]?.delta?.content || "";

        fullResponse += text;

        setMessages((prev) => {
          const last = prev[prev.length - 1];

          if (last?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              {
                role: "assistant",
                content: fullResponse,
              },
            ];
          }

          return prev;
        });
      }

      setAiHistory((prev) => [
        ...prev,
        {
          role: "user",
          content: userMsg,
        },
        {
          role: "assistant",
          content: fullResponse,
        },
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
          content: `⚠️ ${err.message}`,
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
    <section id="ask-khaled" className="chat-section flex flex-col">
      <div
        className="flex flex-col"
        style={{
          marginBottom: 32,
          gap: 12,
        }}
      >
        <div className="chat-label">Ask Khaled</div>

        <h2 className="chat-title">
          Ask my <em className="font-serif-italic">AI twin</em>
        </h2>

        <p className="chat-subtitle">
          {aiMode
            ? "🔮 AI Twin active — running locally in your browser. No data leaves your device."
            : "⚡ Instant answers powered by handcrafted responses. Load the AI twin for deeper questions."}
        </p>
      </div>

      <div className="chat-window flex flex-col overflow-hidden">
        <div className="chat-messages flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                msg.role === "user"
                  ? "chat-bubble-user"
                  : "chat-bubble-assistant"
              }`}
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
              <div className="chat-typing">
                <span className="flex items-center" style={{ gap: 4 }}>
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

        <div className="chat-input-area">
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
            className="chat-input"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`chat-send-btn ${
              input.trim() && !isTyping
                ? "chat-send-btn-active"
                : "chat-send-btn-disabled"
            }`}
          >
            Send
          </button>
        </div>
      </div>

      {!aiMode && (
        <div className="chat-suggestions flex flex-wrap">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => suggestedPrompt(prompt)}
              className="chat-suggestion-btn"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col">
        {canUseAI && !aiMode && !aiLoading && (
          <button onClick={loadAI} className="chat-load-ai-btn">
            <span>🔮</span>
            Load AI Twin (runs locally, ~1.2GB download)
          </button>
        )}

        {canUseAI === false && (
          <div className="chat-loading-box">
            <div
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                opacity: 0.8,
              }}
            >
              🔒 Local AI is unavailable on this device/browser.
              <br />
              Try Chrome or Edge with hardware acceleration enabled and a modern
              GPU.
              <br />
              <br />
              Instant handcrafted responses still work perfectly.
            </div>

            <a
              href="https://webgpureport.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              style={{
                gap: 6,
                marginTop: 14,
                fontSize: 12,
                textDecoration: "none",
                opacity: 0.85,
                justifyContent: "center",
              }}
            >
              🔍 Check WebGPU Support
            </a>
          </div>
        )}

        {aiLoading && (
          <div className="chat-loading-box">
            <div style={{ marginBottom: 8 }}>
              Downloading AI model...
              {aiProgress}%
            </div>

            <div className="chat-progress-bar-bg">
              <div
                className="chat-progress-bar-fill"
                style={{
                  width: `${aiProgress}%`,
                }}
              />
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                opacity: 0.7,
              }}
            >
              This runs entirely in your browser. No data is sent to any server.
            </div>
          </div>
        )}

        {aiMode && (
          <div className="chat-ai-status">
            <span className="chat-status-dot" />
            AI Twin Active · Local · Private
          </div>
        )}
      </div>
    </section>
  );
}

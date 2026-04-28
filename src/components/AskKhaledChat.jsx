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
        "Hey! Ask me anything about Khaled's work, stack, or availability. Instant responses are built-in, and you can optionally load the experimental local AI assistant for deeper conversations.",
      links: [],
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [aiMode, setAiMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiHistory, setAiHistory] = useState([]);

  const [canUseAI, setCanUseAI] = useState(null);

  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, 50);
  }, [messages]);

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

    if (!userMsg || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMsg,
      },
    ]);

    setInput("");
    setIsTyping(true);

    const result = findResponse(userMsg);

    const response = result.response;
    const links = result.links || [];

    const shouldAnimateTyping = response.length < 220;

    await new Promise((r) => setTimeout(r, shouldAnimateTyping ? 500 : 250));

    if (!shouldAnimateTyping) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
          links,
        },
      ]);

      setIsTyping(false);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
        links,
      },
    ]);

    const words = response.split(" ");
    let currentText = "";

    const speed = response.length > 140 ? 18 : 30;

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i];

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: currentText,
        };

        return updated;
      });

      await new Promise((r) => setTimeout(r, speed));
    }

    setIsTyping(false);
  };

  const sendAI = async (text) => {
    const userMsg = text.trim();

    if (!userMsg || isTyping) return;

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
      let pending = "";
      let lastFlush = Date.now();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          links: [],
        },
      ]);

      for await (const chunk of reply) {
        const textChunk = chunk.choices[0]?.delta?.content || "";

        fullResponse += textChunk;
        pending += textChunk;

        const shouldFlush = pending.length > 12 || Date.now() - lastFlush > 40;

        if (shouldFlush) {
          const snapshot = fullResponse;

          setMessages((prev) => {
            const updated = [...prev];

            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: snapshot,
            };

            return updated;
          });

          pending = "";
          lastFlush = Date.now();
        }
      }

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: fullResponse,
        };

        return updated;
      });

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
            "Sorry, the local AI assistant ran into an issue. Try asking a simpler question or contact Khaled directly.",
          links: [],
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
            "🔮 Experimental local AI loaded! You can now ask deeper questions about Khaled's projects, workflow, and technical decisions.",
          links: [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${err.message}`,
          links: [],
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
          Ask my <em className="font-serif-italic">AI assistant</em>
        </h2>

        <p className="chat-subtitle">
          {aiMode &&
            "🔮 Experimental local AI active — running privately in your browser."}
        </p>
      </div>

      <div className="chat-window flex flex-col overflow-hidden">
        <div ref={messagesContainerRef} className="chat-messages flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                msg.role === "user"
                  ? "chat-bubble-user"
                  : "chat-bubble-assistant"
              }`}
            >
              <div>{msg.content}</div>

              {msg.links?.length > 0 && (
                <div className="ai-links">
                  {msg.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ai-link"
                    >
                      ↗ {link.label}
                    </a>
                  ))}
                </div>
              )}

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
                ? "Ask deeper technical questions..."
                : "Ask about projects, stack, or availability..."
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
          <>
            <button onClick={loadAI} className="chat-load-ai-btn">
              <span>🔮</span>
              Load Experimental Local AI (~500MB)
            </button>

            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                opacity: 0.7,
                textAlign: "center",
              }}
            >
              First load may take a minute depending on your device.
            </div>
          </>
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
              Preparing local AI model...
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
            Experimental Local AI Active · Private
          </div>
        )}
      </div>
    </section>
  );
}

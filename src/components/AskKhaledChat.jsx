import { useState, useEffect, useRef, useCallback } from "react";
import { T } from "../shared/theme";
import { callClaude, KHALED_SYSTEM_PROMPT } from "../shared/api";

function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "10px 14px",
        background: T.surface2,
        borderRadius: "12px 12px 12px 2px",
        width: "fit-content",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: T.muted,
            animation: `dotBounce 1.2s ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const QUICK_QUESTIONS = [
  "Are you available?",
  "What's your React experience?",
  "Tell me about Ballagh",
  "What's your expected rate?",
];

export function AskKhaledChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey 👋 I'm Khaled's AI twin. Ask me anything — availability, stack, projects, rates.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const endRef = useRef(null);
  const abortRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(
        () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    }
  }, [messages, isOpen]);

  const sendMessage = useCallback(
    async (text) => {
      const question = (text || input).trim();
      if (!question || isTyping) return;

      setInput("");
      const newMessages = [...messages, { role: "user", content: question }];
      setMessages(newMessages);
      setIsTyping(true);

      // Shows unread badge if chat is closed
      if (!isOpen) setUnread((u) => u + 1);

      abortRef.current = new AbortController();
      let reply = "";

      try {
        // Add empty assistant message — we'll fill it as text streams in
        setMessages((m) => [...m, { role: "assistant", content: "" }]);

        await callClaude(
          newMessages.map((m) => ({ role: m.role, content: m.content })),
          KHALED_SYSTEM_PROMPT,
          (chunk) => {
            reply += chunk;
            setMessages((m) => {
              const updated = [...m];
              updated[updated.length - 1] = {
                role: "assistant",
                content: reply,
              };
              return updated;
            });
          },
          abortRef.current.signal,
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setMessages((m) => {
            const updated = [...m];
            updated[updated.length - 1] = {
              role: "assistant",
              content: "Sorry, something went wrong. Try again?",
            };
            return updated;
          });
        }
      }

      setIsTyping(false);
    },
    [input, messages, isTyping, isOpen],
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating bubble button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 500,
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: T.accent,
          border: "none",
          cursor: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          animation: "glowPulse 3s infinite",
          transition: "transform .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isOpen ? "✕" : "🤖"}
        {/* Unread badge */}
        {!isOpen && unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#FF5F57",
              fontSize: 9,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          id="chatpanel"
          style={{
            position: "fixed",
            bottom: 100,
            right: 28,
            zIndex: 499,
            width: 380,
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
            animation: "chatUp .3s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: T.surface2,
              padding: "14px 18px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: T.bg,
                border: `2px solid ${T.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                Ask Khaled
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: T.muted,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#28C840",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                AI Digital Twin · Claude
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: T.muted,
                cursor: "none",
                fontSize: 16,
                padding: 4,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              height: 320,
              overflowY: "auto",
              padding: "16px 16px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  animation: "scanIn .25s ease both",
                }}
              >
                {m.role === "assistant" && (
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: T.bg,
                      border: `1px solid ${T.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      marginRight: 8,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "82%",
                    background: m.role === "user" ? T.accent : T.surface2,
                    color: m.role === "user" ? "#000" : T.text,
                    padding: "9px 13px",
                    borderRadius:
                      m.role === "user"
                        ? "12px 12px 2px 12px"
                        : "12px 12px 12px 2px",
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {m.content ||
                    (isTyping && i === messages.length - 1 ? (
                      <TypingDots />
                    ) : (
                      ""
                    ))}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick question chips, only shows on fresh conversation */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: "4px 14px 10px",
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: T.bg,
                    border: `1px solid ${T.border}`,
                    color: T.muted,
                    fontSize: 10,
                    padding: "5px 10px",
                    borderRadius: 12,
                    cursor: "none",
                    fontFamily: "'JetBrains Mono',monospace",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = T.accent;
                    e.currentTarget.style.color = T.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.color = T.muted;
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div
            style={{
              padding: "10px 14px 14px",
              borderTop: `1px solid ${T.border}`,
              display: "flex",
              gap: 8,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask anything about Khaled…"
              disabled={isTyping}
              style={{
                flex: 1,
                background: T.bg,
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                padding: "9px 12px",
                color: T.text,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12,
                outline: "none",
                transition: "border-color .2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = T.accent)}
              onBlur={(e) => (e.target.style.borderColor = T.border)}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              style={{
                background: !input.trim() || isTyping ? T.surface2 : T.accent,
                color: !input.trim() || isTyping ? T.muted : "#000",
                border: "none",
                borderRadius: 6,
                width: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isTyping ? "not-allowed" : "none",
                transition: "all .2s",
                flexShrink: 0,
              }}
            >
              {isTyping ? (
                <span
                  style={{
                    width: 14,
                    height: 14,
                    border: `2px solid ${T.muted}`,
                    borderTopColor: T.accent,
                    borderRadius: "50%",
                    animation: "spin .7s linear infinite",
                    display: "inline-block",
                  }}
                />
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

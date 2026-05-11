import { useState, useRef, useEffect } from "react";
import MessageBubble from "../components/MessageBubble";
import Layout from "../components/Layout";
import "../styles/EmpathyChat.css";

const INITIAL_MESSAGE = {
  id: 1,
  role: "ai",
  text: "Hey, I'm here for you 💜 What's on your mind today?",
  timestamp: new Date(),
};

export default function EmpathyChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3000/empathy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        text: data.data?.response || data.data?.reply || data.data?.text || "I hear you. Tell me more…",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "I'm having trouble connecting right now, but I'm still here for you 💜",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout>
      <div className="ec-layout">
        <div className="ec-shell">
          {/* Header */}
          <header className="ec-header">
            <div className="ec-header__icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 28s-8-5.6-8-11a8 8 0 0116 0c0 5.4-8 11-8 11z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="ec-header__title">Empathy AI</h1>
              <p className="ec-header__sub"></p>
            </div>
            <div className="ec-header__status">
              <span className="ec-pulse" />
              <span>Online</span>
            </div>
          </header>

          {/* Messages */}
          <main className="ec-messages">
            {messages.map((msg, i) => (
              <MessageBubble key={msg.id} message={msg} index={i} />
            ))}
            {isTyping && (
              <div className="ec-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </main>

          {/* Input */}
          <footer className="ec-footer">
            <div className="ec-input-wrap">
              <textarea
                ref={inputRef}
                className="ec-input"
                placeholder="Share what's on your mind…"
                value={input}
                rows={1}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="ec-send"
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                aria-label="Send"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="ec-hint">Press Enter to send · Shift+Enter for new line</p>
          </footer>
        </div>
      </div>
    </Layout>
  );
}
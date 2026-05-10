import { useState, useRef, useEffect } from "react";
import MessageBubble from "../components/MessageBubble";
import "../styles/EmpathyChat.css";
import bgImage from "../assets/Background.png";

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
     console.log("SEND MESSAGE TRIGGERED");

  const text = input.trim();
  console.log("INPUT VALUE:", text);

  if (!text) {
    console.log("EMPTY INPUT → STOPPED");
    return;
  }

    

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        text:
  data.success === false ? `Server Error: ${data.message}` : (
    data.data?.response ||
    data.data?.reply ||
    data.data?.text ||
    data.data ||
    "I hear you. Tell me more…"
  ),
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
    <div
      className="ec-root"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background blobs restored */}
      <div className="ec-blob ec-blob--1" />
      <div className="ec-blob ec-blob--2" />
      <div className="ec-blob ec-blob--3" />
{/* Sidebar */}
<aside className="ec-sidebar">
  <div className="ec-logo">
    <div className="ec-logo__dot" />
    <span>Emence.pk</span>
  </div>

  <div className="ec-search">
    <input type="text" placeholder="Search for.." />
  </div>

  <nav className="ec-nav">
    <p className="ec-nav__label">All pages</p>

    <button className="ec-nav__item ec-nav__item--active">
      Journal
    </button>

    <button className="ec-nav__item">
      Log Habits
    </button>

    <button className="ec-nav__item">
      View Analysis
    </button>

    <button className="ec-nav__item">
      Features
    </button>

    <button className="ec-nav__item">
      Users
    </button>
  </nav>

  <div className="ec-sidebar__bottom">
    <button className="ec-nav__item">
      Settings
    </button>

    <div className="ec-user">
      <div className="ec-user__avatar">J</div>

      <div>
        <div className="ec-user__name">
          John Carter
        </div>

        <div className="ec-user__sub">
          Account settings
        </div>
      </div>
    </div>

    <button className="ec-contact">
      →
    </button>
  </div>
</aside>
<div className="ec-layout">
      <div className="ec-shell">
        {/* Header */}
        <header className="ec-header">
          <div className="ec-header__icon">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="19"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M20 28s-8-5.6-8-11a8 8 0 0116 0c0 5.4-8 11-8 11z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <h1 className="ec-header__title">Empathy AI</h1>
            <p className="ec-header__sub">Always here to listen</p>
          </div>

          <div className="ec-header__status">
            <span className="ec-pulse" />
            <span>Online</span>
          </div>
        </header>

        {/* Messages */}
        <main className="ec-messages">
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              index={i}
            />
          ))}

          {isTyping && (
            <div className="ec-typing">
              <span />
              <span />
              <span />
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
              onChange={(e) => {
  console.log("TYPE:", e.target.value);
  setInput(e.target.value);
}}
              onKeyDown={handleKeyDown}
            />

            <button
              className="ec-send"
              onClick={() => {
  console.log("BUTTON CLICKED");
  sendMessage();
}}
              disabled={!input.trim() || isTyping}
              aria-label="Send"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="ec-hint">
            Press Enter to send · Shift+Enter for new line
          </p>
        </footer>
      </div>
    </div>
    </div>
  );
}
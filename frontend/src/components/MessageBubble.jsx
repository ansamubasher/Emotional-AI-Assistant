export default function MessageBubble({ message, index }) {
  const isAI = message.role === "ai";
  const time = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`ec-bubble-row ${isAI ? "ec-bubble-row--ai" : "ec-bubble-row--user"}`}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      {isAI && (
        <div className="ec-avatar">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-7-4.9-7-9.5a7 7 0 0114 0C19 16.1 12 21 12 21z"
              fill="currentColor"
              fillOpacity="0.3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      <div className="ec-bubble-col">
        <div className={`ec-bubble ${isAI ? "ec-bubble--ai" : "ec-bubble--user"}`}>
          {message.text}
        </div>
        <span className="ec-time">{time}</span>
      </div>
    </div>
  );
}

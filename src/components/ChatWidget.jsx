function ChatWidget() {
  return (
    <div className="chat-widget">
      <span className="chat-tooltip">Habla con nosotros</span>
      <button type="button" className="chat-button" aria-label="Abrir chat con nosotros">
        <svg className="chat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
          <path d="M19 11a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V23h2v-3.06A9 9 0 0 0 21 11h-2z" />
        </svg>
      </button>
    </div>
  );
}

export default ChatWidget;
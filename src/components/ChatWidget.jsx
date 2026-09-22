import { useState } from "react";

const STREAMLIT_URL = `${import.meta.env.VITE_STREAMLIT_URL}/?embed=true`;

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Ventana flotante del Asistente de Voz (Streamlit) */}
      <div
        className="chat-popup-container"
        role="dialog"
        aria-label="Asistente de Voz"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="chat-popup-header">
          <div className="chat-header-info">
            <span className="chat-header-avatar">👨‍🍳</span>
            <div>
              <h4 className="chat-header-title">La Huaca AI</h4>
              <span className="chat-header-status">
                <span className="status-dot"></span> Asistente por voz en línea
              </span>
            </div>
          </div>
          <div className="chat-header-actions">
            <a
              href={import.meta.env.VITE_STREAMLIT_URL}
              target="_blank"
              rel="noreferrer"
              className="chat-action-btn"
              title="Abrir en pestaña completa"
            >
              ↗
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="chat-action-btn"
              aria-label="Cerrar chat"
              title="Cerrar asistente"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="chat-popup-body">
          <iframe
            src={STREAMLIT_URL}
            title="Asistente de Voz de Restaurante"
            className="chat-iframe"
            allow="microphone *; camera *; clipboard-read *; clipboard-write *; autoplay *"
          />
        </div>
      </div>

      {/* Botón flotante inferior */}
      <div className="chat-widget">
        {!isOpen && <span className="chat-tooltip">Habla con nosotros</span>}
        <button
          type="button"
          className={`chat-button ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente de voz"}
          title={isOpen ? "Cerrar" : "Habla con nuestro asistente de IA"}
        >
          {isOpen ? (
            <span style={{ fontSize: "20px", fontWeight: "bold", lineHeight: 1 }}>✕</span>
          ) : (
            <svg className="chat-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
              <path d="M19 11a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V23h2v-3.06A9 9 0 0 0 21 11h-2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

export default ChatWidget;
interface Props {
  cleanMessage: () => void;
  messageInfo: string;
}

export const MessageAlert: React.FC<Props> = ({
  cleanMessage,
  messageInfo,
}) => {
  return (
    <article
      style={{
        width: "100dvw",
        height: "100dvh",
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        inset: 0,
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "min(500px, 90vw)",
          minHeight: "220px",
          background: "#fff",
          borderRadius: "20px",
          padding: "1.5rem",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        <div
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#333",
            wordBreak: "break-word",
          }}
        >
          {messageInfo}
        </div>

        <button
          onClick={cleanMessage}
          style={{
            alignSelf: "flex-end",
            border: "none",
            borderRadius: "12px",
            padding: "0.75rem 1.25rem",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Cerrar
        </button>
      </div>
    </article>
  );
};
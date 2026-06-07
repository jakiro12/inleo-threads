import { useUser } from "../context/provider";

interface Props {
  cleanMessage: () => void;
  messageInfo: string;
}

export const MessageAlert: React.FC<Props> = ({
  cleanMessage,
  messageInfo,
}) => {
    const {t}=useUser()
  
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
    fontSize: "1.05rem",
    lineHeight: 1.8,
    color: "#1f2937",
    fontWeight: "bold",
    letterSpacing: "0.01em",
    textAlign: "center",
    wordBreak: "break-word",
    maxWidth: "65ch",
    margin: "0 auto",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  }}
>
  {messageInfo}
</div>

<button
  onClick={cleanMessage}
  style={{
    width: "fit-content",
    border: "none",
    borderRadius: "14px",
    padding: "0.85rem 1.5rem",
    background:
      "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.95rem",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "all 0.2s ease",
    alignSelf: "center",
    boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
  }}
>
  {t("closebtn")}
</button>
      </div>
    </article>
  );
};
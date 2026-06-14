import "./logo3d.css";

export default function LogoThreads() {
  const DEPTH = 5;

  return (
    <div className="scene">
      <div className="coin">
        {Array.from({ length: DEPTH }).map((_, i) => (
          <img
            key={i}
            src="/leo_.png"
            alt=""
            className="layer"
            style={{
              transform: `translateZ(${i}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
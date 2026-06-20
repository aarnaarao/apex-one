"use client";

import { useRef, useState } from "react";

export default function FloatingCard() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: "380px",
        height: "460px",
        perspective: "1000px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "var(--red)",
              marginBottom: "8px",
            }}
          >
            DRIVER OF THE WEEK
          </div>
          <div
            className="font-display"
            style={{ fontSize: "36px", letterSpacing: "0.03em" }}
          >
            MAX VERSTAPPEN
          </div>
          <div
            className="font-mono"
            style={{ fontSize: "11px", color: "var(--text3)" }}
          >
            RED BULL RACING · #1
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <div
            className="font-display"
            style={{
              fontSize: "140px",
              color: "rgba(255,255,255,0.06)",
              lineHeight: "1",
            }}
          >
            1
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "20px",
          }}
        >
          <Stat label="POINTS" value="362" />
          <Stat label="WINS" value="7" />
          <Stat label="PODIUMS" value="11" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-display" style={{ fontSize: "22px" }}>
        {value}
      </div>
      <div
        className="font-mono"
        style={{ fontSize: "8px", color: "var(--text3)", letterSpacing: "0.1em" }}
      >
        {label}
      </div>
    </div>
  );
}
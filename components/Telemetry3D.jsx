"use client";

import { useRef, useState } from "react";

const SECTORS = [
  { name: "S1", ver: 28.4, nor: 28.9, lec: 29.1 },
  { name: "S2", ver: 31.2, nor: 31.0, lec: 31.6 },
  { name: "S3", ver: 24.8, nor: 25.1, lec: 24.9 },
  { name: "S4", ver: 19.6, nor: 19.9, lec: 20.2 },
  { name: "S5", ver: 22.1, nor: 22.4, lec: 22.0 },
  { name: "S6", ver: 27.3, nor: 27.0, lec: 27.8 },
];

const DRIVERS = [
  { key: "ver", name: "Verstappen", color: "#3671C6" },
  { key: "nor", name: "Norris", color: "#FF8000" },
  { key: "lec", name: "Leclerc", color: "#E8002D" },
];

export default function Telemetry3D() {
  const wrapRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 22, y: -28 });

  function handleMouseMove(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: 22 - py * 24, y: -28 + px * 40 });
  }

  const maxTime = Math.max(...SECTORS.flatMap((s) => [s.ver, s.nor, s.lec]));

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      style={{
        background: "var(--dark3)",
        border: "1px solid var(--gray)",
        borderRadius: "12px",
        padding: "40px",
        perspective: "1200px",
        overflow: "hidden",
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--text3)",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Sector Time Comparison — 3D View (move your mouse)
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "60px 0 30px",
        }}
      >
        <div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.1s ease-out",
            transformStyle: "preserve-3d",
            display: "flex",
            gap: "28px",
            alignItems: "flex-end",
          }}
        >
          {SECTORS.map((sector) => (
            <div
              key={sector.name}
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "flex-end",
                transformStyle: "preserve-3d",
              }}
            >
              {DRIVERS.map((d) => {
                const time = sector[d.key];
                const height = (time / maxTime) * 140;
                const isFastest =
                  time === Math.min(sector.ver, sector.nor, sector.lec);
                return (
                  <div
                    key={d.key}
                    title={`${d.name} ${sector.name}: ${time}s`}
                    style={{
                      width: "20px",
                      height: `${height}px`,
                      background: `linear-gradient(180deg, ${d.color}, ${d.color}88)`,
                      boxShadow: isFastest
                        ? `0 0 16px ${d.color}, inset 0 0 8px rgba(255,255,255,0.3)`
                        : "inset 0 0 8px rgba(255,255,255,0.1)",
                      border: isFastest ? `1px solid ${d.color}` : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px 2px 0 0",
                      position: "relative",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {isFastest && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-18px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "9px",
                        }}
                      >
                        ⚡
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Floor grid for depth illusion */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "28px",
          marginTop: "-4px",
          paddingBottom: "8px",
        }}
      >
        {SECTORS.map((s) => (
          <div
            key={s.name}
            className="font-mono"
            style={{
              fontSize: "10px",
              color: "var(--text3)",
              width: "66px",
              textAlign: "center",
            }}
          >
            {s.name}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {DRIVERS.map((d) => (
          <div key={d.key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: d.color }} />
            <span style={{ fontSize: "12px", color: "var(--text2)" }}>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
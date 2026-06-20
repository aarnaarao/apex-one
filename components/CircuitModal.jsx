"use client";

import { useEffect, useState } from "react";

const LEADERBOARD = [
  { pos: 1, code: "VER", gap: "Leader", color: "#3671C6" },
  { pos: 2, code: "LEC", gap: "+1.247", color: "#E8002D" },
  { pos: 3, code: "NOR", gap: "+2.345", color: "#FF8000" },
  { pos: 4, code: "PIA", gap: "+3.134", color: "#FF8000" },
  { pos: 5, code: "SAI", gap: "+4.512", color: "#888888" },
  { pos: 6, code: "HAM", gap: "+5.732", color: "#E8002D" },
  { pos: 7, code: "RUS", gap: "+6.245", color: "#27F4D2" },
  { pos: 8, code: "ALO", gap: "+7.684", color: "#229971" },
];

export default function CircuitModal({ circuit, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    function handleKey(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 350);
  }

  if (!circuit) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "background 0.4s, backdrop-filter 0.4s",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1000px, 95vw)",
          background: "linear-gradient(160deg, rgba(18,18,18,0.97), rgba(6,6,6,0.99))",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          boxShadow: "0 60px 120px rgba(0,0,0,0.7)",
          transform: visible ? "scale(1)" : "scale(0.9)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid var(--gray)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              className="font-display"
              style={{ fontSize: "16px", color: "var(--red)", letterSpacing: "0.05em" }}
            >
              APEX.ONE LIVE
            </span>
            <span className="font-mono" style={{ fontSize: "11px", color: "var(--text3)" }}>
              {circuit.flag} {circuit.name}
            </span>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              fontSize: "14px",
              cursor: "none",
            }}
          >
            ✕
          </button>
        </div>

        {/* Main grid: leaderboard | track | driver detail */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr 220px",
            gap: "0",
          }}
        >
          {/* Leaderboard */}
          <div style={{ borderRight: "1px solid var(--gray)", padding: "16px 12px", maxHeight: "420px", overflowY: "auto" }}>
            <div className="font-mono" style={{ fontSize: "9px", color: "var(--text3)", letterSpacing: "0.1em", marginBottom: "12px", paddingLeft: "8px" }}>
              LAP 26 / {circuit.laps}
            </div>
            {LEADERBOARD.map((d) => (
              <div
                key={d.code}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  borderRadius: "6px",
                  background: d.pos === 1 ? "rgba(232,0,45,0.08)" : "transparent",
                  marginBottom: "2px",
                }}
              >
                <span className="font-display" style={{ fontSize: "14px", width: "18px", color: d.pos === 1 ? "var(--red)" : "var(--text3)" }}>
                  {d.pos}
                </span>
                <span style={{ width: "3px", height: "16px", background: d.color, borderRadius: "2px" }} />
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600 }}>{d.code}</div>
                  <div className="font-mono" style={{ fontSize: "9px", color: "var(--text3)" }}>{d.gap}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Track map */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 200 80" style={{ width: "100%", maxWidth: "440px", height: "auto" }}>
              <path d={circuit.path} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round" />
              <path
                d={circuit.path}
                fill="none"
                stroke={circuit.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: visible ? 0 : 1,
                  transition: "stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
                  filter: `drop-shadow(0 0 6px ${circuit.color})`,
                }}
              />
              {/* Sector markers */}
              <circle cx="40" cy="70" r="3" fill="#3671C6" />
              <circle cx="190" cy="15" r="3" fill="#E8002D" />
              <circle cx="110" cy="40" r="3" fill="#fff" opacity="0.6" />
            </svg>
            <div className="font-mono" style={{ fontSize: "10px", color: "var(--text3)", letterSpacing: "0.1em", marginTop: "12px" }}>
              ROUND {circuit.round} · {circuit.length} KM · {circuit.laps} LAPS
            </div>
          </div>

          {/* Driver detail panel */}
          <div style={{ borderLeft: "1px solid var(--gray)", padding: "20px" }}>
            <div className="font-display" style={{ fontSize: "20px", marginBottom: "2px" }}>VERSTAPPEN</div>
            <div className="font-mono" style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "20px" }}>RED BULL RACING</div>

            <DetailRow label="LAST LAP" value="1:29.240" />
            <DetailRow label="BEST LAP" value="1:28.945" highlight />
            <DetailRow label="GAP TO NEXT" value="+1.247" />
            <DetailRow label="TYRE" value="SOFT (8 LAPS)" />
          </div>
        </div>

        {/* Bottom stat strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--gray)",
          }}
        >
          <StatChip label="TRACK TEMP" value="32.4°C" />
          <StatChip label="AIR TEMP" value="24.1°C" />
          <StatChip label="HUMIDITY" value="45%" />
          <StatChip label="WIND" value="12.4 KM/H" />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div className="font-mono" style={{ fontSize: "9px", color: "var(--text3)", letterSpacing: "0.08em", marginBottom: "4px" }}>
        {label}
      </div>
      <div className="font-display" style={{ fontSize: "18px", color: highlight ? "var(--red)" : "#fff" }}>
        {value}
      </div>
    </div>
  );
}

function StatChip({ label, value }) {
  return (
    <div style={{ padding: "16px 24px", borderRight: "1px solid var(--gray)" }}>
      <div className="font-mono" style={{ fontSize: "9px", color: "var(--text3)", letterSpacing: "0.08em", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: "14px", fontWeight: 600 }}>{value}</div>
    </div>
  );
}
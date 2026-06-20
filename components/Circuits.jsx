"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import CircuitModal from "./CircuitModal";

const CIRCUITS = [
  {
    round: "07",
    name: "Monaco Grand Prix",
    country: "Monte Carlo",
    flag: "🇲🇨",
    length: "3.337",
    laps: "78",
    status: "completed",
    color: "#888888",
    path: "M30,65 L30,30 Q30,15 45,15 L80,15 Q95,15 95,30 L95,40 Q95,50 110,50 L140,50 Q155,50 160,40 L165,25 Q170,15 180,15 L190,15",
  },
  {
    round: "14",
    name: "British Grand Prix",
    country: "Silverstone",
    flag: "🇬🇧",
    length: "5.891",
    laps: "52",
    status: "next",
    color: "#E8002D",
    path: "M40,70 Q15,70 15,50 L15,30 Q15,10 40,10 L80,10 Q100,10 105,25 L110,40 Q115,55 130,55 L160,55 Q180,55 185,40 L185,25 Q185,10 165,10 L145,10",
  },
  {
    round: "15",
    name: "Belgian Grand Prix",
    country: "Spa-Francorchamps",
    flag: "🇧🇪",
    length: "7.004",
    laps: "44",
    status: "upcoming",
    color: "#555555",
    path: "M20,70 L20,50 Q20,30 40,20 L80,10 Q110,5 130,20 L150,35 Q165,45 170,35 L175,20 Q180,10 195,10",
  },
  {
    round: "16",
    name: "Italian Grand Prix",
    country: "Monza",
    flag: "🇮🇹",
    length: "5.793",
    laps: "53",
    status: "upcoming",
    color: "#555555",
    path: "M20,60 L80,60 Q100,60 100,45 L100,35 Q100,20 115,20 L155,20 Q175,20 175,35 L175,50 Q175,65 155,65 L120,65 Q100,65 95,50 L90,35",
  },
  {
    round: "17",
    name: "Singapore Grand Prix",
    country: "Marina Bay",
    flag: "🇸🇬",
    length: "5.063",
    laps: "61",
    status: "upcoming",
    color: "#555555",
    path: "M20,70 L20,40 Q20,15 45,15 L90,15 L90,30 Q90,45 105,45 L130,45 L130,30 Q130,15 145,15 L175,15 L175,55 Q175,70 160,70 L80,70 Q60,70 55,55 L50,40",
  },
  {
    round: "01",
    name: "Australian Grand Prix",
    country: "Melbourne",
    flag: "🇦🇺",
    length: "5.278",
    laps: "58",
    status: "completed",
    color: "#888888",
    path: "M20,60 Q20,20 60,20 L100,20 Q120,20 120,35 L120,45 Q120,60 140,60 L170,60 Q185,60 185,45 L185,35 Q185,20 170,20 L150,20",
  },
];

const STATUS_LABEL = {
  completed: "COMPLETED",
  next: "NEXT RACE",
  upcoming: "UPCOMING",
};

export default function Circuits() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        padding: "140px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <div
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "var(--red)",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          2025 Season Calendar
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            marginBottom: "56px",
            letterSpacing: "0.03em",
          }}
        >
          ICONIC CIRCUITS
        </h2>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2px",
        }}
      >
        {CIRCUITS.map((circuit, i) => (
          <Reveal key={circuit.round} delay={i * 0.08}>
            <CircuitCard circuit={circuit} onClick={() => setSelected(circuit)} />
          </Reveal>
        ))}
      </div>

      {selected && (
        <CircuitModal circuit={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function CircuitCard({ circuit, onClick }) {
  const isNext = circuit.status === "next";
  const badgeStyles = {
    completed: { background: "rgba(255,255,255,0.05)", color: "var(--text3)" },
    next: { background: "var(--red)", color: "#fff" },
    upcoming: { background: "rgba(232,0,45,0.08)", color: "var(--red)", border: "1px solid rgba(232,0,45,0.2)" },
  };

  return (
    <div
      className="circuit-card"
      onClick={onClick}
      style={{
        background: "var(--dark3)",
        border: isNext ? "1px solid var(--red)" : "1px solid transparent",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        className="font-mono"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "9px",
          padding: "4px 10px",
          letterSpacing: "0.1em",
          ...badgeStyles[circuit.status],
        }}
      >
        {STATUS_LABEL[circuit.status]}
      </span>

      <div className="font-display" style={{ fontSize: "48px", color: "var(--gray2)", lineHeight: 1, marginBottom: "12px" }}>
        {circuit.round}
      </div>
      <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
        {circuit.name}
      </div>
      <div className="font-mono" style={{ fontSize: "10px", color: "var(--text3)", letterSpacing: "0.1em", marginBottom: "20px" }}>
        {circuit.flag} {circuit.country.toUpperCase()}
      </div>

      <svg viewBox="0 0 200 80" style={{ width: "100%", height: "80px", marginBottom: "16px" }}>
        <path d={circuit.path} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" strokeLinecap="round" />
        <path
          className="circuit-trace"
          d={circuit.path}
          fill="none"
          stroke={circuit.color}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="1"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--gray)" }}>
        <div>
          <div className="font-mono" style={{ fontSize: "13px" }}>{circuit.length} KM</div>
          <div className="font-mono" style={{ fontSize: "9px", color: "var(--text3)", letterSpacing: "0.1em", marginTop: "2px" }}>LENGTH</div>
        </div>
        <div>
          <div className="font-mono" style={{ fontSize: "13px" }}>{circuit.laps}</div>
          <div className="font-mono" style={{ fontSize: "9px", color: "var(--text3)", letterSpacing: "0.1em", marginTop: "2px" }}>LAPS</div>
        </div>
      </div>
    </div>
  );
}
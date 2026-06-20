"use client";

const RACES = ["AUS", "BHR", "SAU", "JAP", "CHN", "MIA", "EMI", "MON", "ESP", "CAN", "AUT", "GBR", "HUN", "BEL"];

const DRIVERS = [
  { name: "Verstappen", color: "#3671C6", points: [25, 50, 75, 100, 125, 143, 168, 193, 218, 243, 268, 293, 330, 362] },
  { name: "Norris", color: "#FF8000", points: [18, 33, 48, 63, 78, 103, 121, 146, 171, 186, 204, 229, 254, 288] },
  { name: "Leclerc", color: "#E8002D", points: [15, 30, 45, 63, 81, 96, 118, 137, 152, 174, 199, 220, 245, 271] },
];

const MAX_POINTS = 400;
const W = 800;
const H = 320;
const PAD_LEFT = 40;
const PAD_BOTTOM = 30;
const PAD_TOP = 20;

function toXY(index, value) {
  const x = PAD_LEFT + (index / (RACES.length - 1)) * (W - PAD_LEFT - 20);
  const y = H - PAD_BOTTOM - (value / MAX_POINTS) * (H - PAD_BOTTOM - PAD_TOP);
  return { x, y };
}

export default function TelemetryChart() {
  return (
    <div
      style={{
        background: "var(--dark3)",
        border: "1px solid var(--gray)",
        borderRadius: "12px",
        padding: "32px",
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
        Points Progression — Top 3 Drivers (2025 Season)
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {[0, 100, 200, 300, 400].map((val) => {
          const { y } = toXY(0, val);
          return (
            <g key={val}>
              <line x1={PAD_LEFT} y1={y} x2={W - 20} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x={4} y={y + 4} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="JetBrains Mono, monospace">
                {val}
              </text>
            </g>
          );
        })}

        {RACES.map((r, i) => {
          const { x } = toXY(i, 0);
          if (i % 2 !== 0) return null;
          return (
            <text
              key={r}
              x={x}
              y={H - 8}
              fill="rgba(255,255,255,0.3)"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              textAnchor="middle"
            >
              {r}
            </text>
          );
        })}

        {DRIVERS.map((driver) => {
          const pathD = driver.points
            .map((p, i) => {
              const { x, y } = toXY(i, p);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ");

          return (
            <g key={driver.name}>
              <path d={pathD} fill="none" stroke={driver.color} strokeWidth="2.5" />
              {driver.points.map((p, i) => {
                const { x, y } = toXY(i, p);
                return <circle key={i} cx={x} cy={y} r="3" fill={driver.color} />;
              })}
            </g>
          );
        })}
      </svg>

      <div style={{ display: "flex", gap: "24px", marginTop: "20px", flexWrap: "wrap" }}>
        {DRIVERS.map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: d.color }} />
            <span style={{ fontSize: "12px", color: "var(--text2)" }}>
              {d.name} — {d.points[d.points.length - 1]} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
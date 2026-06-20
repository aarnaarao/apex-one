const STATS = [
  { label: "TOP SPEED — SILVERSTONE STRAIGHT", value: "328", unit: "km/h", fill: 92 },
  { label: "FASTEST LAP — VER — CANADA", value: "1:12", unit: ".842", fill: 78 },
  { label: "AVERAGE PIT STOP — 2025", value: "2.4", unit: "sec", fill: 40 },
  { label: "TOTAL RACE DISTANCE — 2025", value: "5,892", unit: "km", fill: 60 },
];

export default function TelemetryStats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "2px",
      }}
    >
      {STATS.map((stat) => (
        <div
          key={stat.label}
          style={{
            background: "var(--dark3)",
            border: "1px solid var(--gray)",
            padding: "28px",
          }}
        >
          <div
            className="font-mono"
            style={{ fontSize: "10px", color: "var(--text3)", letterSpacing: "0.1em", marginBottom: "12px" }}
          >
            {stat.label}
          </div>
          <div className="font-display" style={{ fontSize: "44px", lineHeight: "1" }}>
            {stat.value}
            <span style={{ fontSize: "18px", color: "var(--text3)" }}>{stat.unit}</span>
          </div>
          <div
            style={{
              height: "4px",
              background: "var(--gray2)",
              marginTop: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${stat.fill}%`,
                background: "var(--red)",
                boxShadow: "0 0 8px rgba(232,0,45,0.6)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
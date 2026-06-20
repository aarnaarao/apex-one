import { getDrivers, getLatestSession } from "../lib/openf1";
import Reveal from "./Reveal";

export default async function Standings() {
  let drivers = [];
  let session = null;
  let errorMsg = null;

  try {
    session = await getLatestSession();
    drivers = await getDrivers(session?.session_key ?? "latest");
  } catch (err) {
    errorMsg = err.message;
  }

  const seen = new Set();
  const uniqueDrivers = drivers.filter((d) => {
    if (seen.has(d.driver_number)) return false;
    seen.add(d.driver_number);
    return true;
  });

  // Fallback demo data so the section always looks alive, even with no live session
  const demoDrivers = [
    { driver_number: 1, full_name: "Max Verstappen", team_name: "Red Bull Racing", team_colour: "3671C6" },
    { driver_number: 4, full_name: "Lando Norris", team_name: "McLaren", team_colour: "FF8000" },
    { driver_number: 16, full_name: "Charles Leclerc", team_name: "Ferrari", team_colour: "E8002D" },
    { driver_number: 44, full_name: "Lewis Hamilton", team_name: "Ferrari", team_colour: "E8002D" },
    { driver_number: 63, full_name: "George Russell", team_name: "Mercedes", team_colour: "27F4D2" },
  ];

  const displayDrivers = uniqueDrivers.length > 0 ? uniqueDrivers : demoDrivers;
  const isLive = uniqueDrivers.length > 0;

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
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: isLive ? "var(--red)" : "var(--text3)",
              boxShadow: isLive ? "0 0 8px var(--red)" : "none",
            }}
          />
          {isLive
            ? `${session.session_name} · ${session.location} ${session.year}`
            : "Demo Grid · Connect during a live session for real-time data"}
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            marginBottom: "56px",
            letterSpacing: "0.03em",
          }}
        >
          CURRENT GRID
        </h2>
      </Reveal>

      {errorMsg && (
        <p style={{ color: "var(--text3)", fontSize: "13px", marginBottom: "32px" }}>
          Live data temporarily unavailable — showing demo grid below.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {displayDrivers.map((driver, i) => (
          <Reveal key={driver.driver_number} delay={i * 0.06}>
            <DriverRow driver={driver} position={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DriverRow({ driver, position }) {
  const color = driver.team_colour ? `#${driver.team_colour}` : "#888";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr auto",
        gap: "16px",
        alignItems: "center",
        padding: "20px 16px",
        borderBottom: "1px solid var(--gray)",
        borderRadius: "8px",
        position: "relative",
        transition: "background 0.3s, padding-left 0.3s",
        cursor: "pointer",
      }}
      className="driver-row"
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "10%",
          bottom: "10%",
          width: "3px",
          background: color,
          borderRadius: "2px",
        }}
      />
      <div
        className="font-display"
        style={{
          fontSize: "26px",
          color: position <= 3 ? color : "var(--text3)",
        }}
      >
        {String(position).padStart(2, "0")}
      </div>
      <div>
        <div style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.01em" }}>
          {driver.full_name}
        </div>
        <div
          className="font-mono"
          style={{ fontSize: "10px", color: "var(--text3)", letterSpacing: "0.05em", marginTop: "2px" }}
        >
          {driver.team_name?.toUpperCase()} · #{driver.driver_number}
        </div>
      </div>
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: `${color}1a`,
          border: `1px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
      </div>
    </div>
  );
}
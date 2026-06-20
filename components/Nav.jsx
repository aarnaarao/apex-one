export default function Nav() {
  return (
    <>
      <div className="ticker-bar">
        <div className="ticker-track">
          {Array(2).fill(0).map((_, i) => (
            <span key={i} style={{ display: "flex", gap: "48px" }}>
              <span>P1 VERSTAPPEN — 362 PTS</span>
              <span className="ticker-sep">·</span>
              <span>P2 NORRIS — 288 PTS</span>
              <span className="ticker-sep">·</span>
              <span>P3 LECLERC — 271 PTS</span>
              <span className="ticker-sep">·</span>
              <span>NEXT: BRITISH GP — SILVERSTONE</span>
              <span className="ticker-sep">·</span>
              <span>FASTEST LAP 1:26.842</span>
              <span className="ticker-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      <nav className="main-nav">
        <div className="font-display nav-logo">
          APEX<span style={{ color: "var(--red)" }}>.</span>ONE
        </div>
        <div className="nav-links">
         <a href="/standings">Standings</a>
          <a href="/circuits">Circuits</a>
          <a href="/telemetry">Telemetry</a>
        </div>
        <div className="nav-live">
          <span className="live-dot" />
          <span className="font-mono" style={{ fontSize: "10px", color: "var(--red)", letterSpacing: "0.12em" }}>
            LIVE DATA
          </span>
        </div>
      </nav>
    </>
  );
}
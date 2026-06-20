import HeroBackground from "../../components/HeroBackground";
import TelemetryChart from "../../components/TelemetryChart";
import TelemetryStats from "../../components/TelemetryStats";
import Telemetry3D from "../../components/Telemetry3D";

export default function TelemetryPage() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <HeroBackground />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "140px",
          paddingBottom: "40px",
          textAlign: "center",
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "var(--red)",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Live Telemetry Snapshot
        </div>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(48px, 7vw, 90px)",
            letterSpacing: "0.03em",
            lineHeight: "0.95",
          }}
        >
          RACE <span style={{ color: "var(--red)" }}>ANALYTICS</span>
        </h1>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 48px 120px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <TelemetryChart />
        <Telemetry3D />

        <TelemetryStats />
      </div>
    </main>
  );
}
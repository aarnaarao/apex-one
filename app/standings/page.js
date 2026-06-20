import Standings from "../../components/Standings";
import HeroBackground from "../../components/HeroBackground";

export default function StandingsPage() {
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
          2025 FIA Formula One World Championship
        </div>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(48px, 7vw, 90px)",
            letterSpacing: "0.03em",
            lineHeight: "0.95",
          }}
        >
          DRIVER <span style={{ color: "var(--red)" }}>STANDINGS</span>
        </h1>
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <Standings />
      </div>
    </main>
  );
}
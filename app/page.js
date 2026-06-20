import HeroBackground from "../components/HeroBackground";
import FloatingCard from "../components/FloatingCard";
import Standings from "../components/Standings";
import Circuits from "../components/Circuits";
import TrackOrbit from "../components/TrackOrbit";
import ParallaxHero from "../components/ParallaxHero";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <HeroBackground />

      <section
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <ParallaxHero>
          <div data-parallax="8" style={{ position: "absolute", inset: 0 }}>
            <TrackOrbit />
          </div>

          <div data-parallax="-6" style={{ maxWidth: "560px", position: "relative", zIndex: 1 }}>
            <div
              className="font-mono"
              style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "var(--red)",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              2025 FIA Formula One World Championship
            </div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(64px, 9vw, 120px)",
                lineHeight: "0.9",
                letterSpacing: "0.02em",
                marginBottom: "28px",
              }}
            >
              FORMULA
              <br />
              <span style={{ color: "var(--red)" }}>ONE</span>
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px rgba(245,245,245,0.25)",
                  color: "transparent",
                }}
              >
                DECODED
              </span>
            </h1>
            <p
              style={{
                fontSize: "15px",
                color: "var(--text2)",
                lineHeight: "1.8",
                maxWidth: "420px",
              }}
            >
              Live standings, telemetry, and circuit data — built for those who
              think in milliseconds.
            </p>
          </div>

          <div data-parallax="14" style={{ position: "relative", zIndex: 1 }}>
            <FloatingCard />
          </div>
        </ParallaxHero>
      </section>

   
   
    </main>
  );
}
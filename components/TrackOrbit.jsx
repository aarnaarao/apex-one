"use client";

import { useEffect, useRef } from "react";

const PATH_POINTS = [
  { x: 100, y: 200 }, { x: 100, y: 130 }, { x: 150, y: 100 }, { x: 250, y: 100 },
  { x: 350, y: 100 }, { x: 420, y: 100 }, { x: 450, y: 130 }, { x: 450, y: 165 },
  { x: 450, y: 200 }, { x: 480, y: 220 }, { x: 550, y: 220 }, { x: 620, y: 220 },
  { x: 670, y: 220 }, { x: 700, y: 200 }, { x: 700, y: 165 }, { x: 700, y: 130 },
  { x: 670, y: 100 }, { x: 620, y: 100 }, { x: 580, y: 100 }, { x: 500, y: 100 },
  { x: 400, y: 100 }, { x: 250, y: 100 }, { x: 150, y: 100 }, { x: 100, y: 130 },
  { x: 100, y: 200 },
];

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function getPoint(t) {
  const n = PATH_POINTS.length - 1;
  const seg = t * n;
  const i = Math.min(Math.floor(seg), n - 1);
  const f = seg - i;
  const p0 = PATH_POINTS[Math.max(0, i - 1)];
  const p1 = PATH_POINTS[i];
  const p2 = PATH_POINTS[Math.min(n, i + 1)];
  const p3 = PATH_POINTS[Math.min(n, i + 2)];
  return {
    x: catmullRom(p0.x, p1.x, p2.x, p3.x, f),
    y: catmullRom(p0.y, p1.y, p2.y, p3.y, f),
  };
}

const TRAIL_LENGTH = 18;

export default function TrackOrbit() {
  const carRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);
  const trailData = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: 100, y: 200 }))
  );

  useEffect(() => {
    let progress = 0;
    let raf;

    function animate() {
      progress = (progress + 0.0022) % 1;
      const ahead = getPoint((progress + 0.01) % 1);
      const behind = getPoint((progress - 0.01 + 1) % 1);
      const pos = getPoint(progress);
      const angle =
        (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

      if (carRef.current) {
        carRef.current.setAttribute(
          "transform",
          `translate(${pos.x}, ${pos.y}) rotate(${angle})`
        );
      }
      if (glowRef.current) {
        glowRef.current.setAttribute("cx", pos.x);
        glowRef.current.setAttribute("cy", pos.y);
      }

      // Shift trail history and update each dot
      trailData.current.unshift({ x: pos.x, y: pos.y });
      trailData.current.length = TRAIL_LENGTH;
      trailData.current.forEach((p, idx) => {
        const el = trailRefs.current[idx];
        if (el) {
          el.setAttribute("cx", p.x);
          el.setAttribute("cy", p.y);
        }
      });

      raf = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(raf);
  }, []);

  const pathD =
    "M100,200 Q100,100 200,100 L400,100 Q450,100 450,150 L450,180 Q450,220 500,220 L650,220 Q700,220 700,180 L700,150 Q700,100 650,100 L580,100 Q480,100 400,100 L250,100 Q150,100 100,130 Z";

  return (
    <svg
      viewBox="0 0 800 400"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "140%",
        height: "140%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <path d={pathD} fill="none" stroke="#E8002D" strokeWidth="2" opacity="0.08" />

      <defs>
        <radialGradient id="carGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8002D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E8002D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Fading trail dots, oldest = smallest/faintest */}
      {trailData.current.map((_, idx) => {
        const ratio = 1 - idx / TRAIL_LENGTH;
        return (
          <circle
            key={idx}
            ref={(el) => (trailRefs.current[idx] = el)}
            r={2.5 * ratio}
            fill="#E8002D"
            opacity={ratio * 0.5}
          />
        );
      })}

      <circle ref={glowRef} r="40" fill="url(#carGlow)" />

      <g ref={carRef}>
        <rect x="-15" y="-6" width="2.5" height="12" fill="#E8002D" opacity="0.95" />
        <rect x="-15" y="-6" width="2.5" height="2" fill="#fff" opacity="0.6" />
        <rect x="-15" y="4" width="2.5" height="2" fill="#fff" opacity="0.6" />
        <rect x="-9" y="-7" width="4" height="3" rx="1" fill="#111" />
        <rect x="-9" y="4" width="4" height="3" rx="1" fill="#111" />
        <path
          d="M -12 -3 L 4 -3 Q 10 -3 13 0 Q 10 3 4 3 L -12 3 Z"
          fill="#E8002D"
          opacity="0.95"
        />
        <ellipse cx="-2" cy="0" rx="3" ry="2" fill="#1a1a1a" opacity="0.9" />
        <rect x="2" y="-6.5" width="4" height="3" rx="1" fill="#111" />
        <rect x="2" y="3.5" width="4" height="3" rx="1" fill="#111" />
        <rect x="11" y="-5" width="2.5" height="10" fill="#E8002D" opacity="0.95" />
        <rect x="11" y="-5" width="2.5" height="2" fill="#fff" opacity="0.6" />
        <rect x="11" y="3" width="2.5" height="2" fill="#fff" opacity="0.6" />
        <path d="M 13 0 L 16 0" stroke="#E8002D" strokeWidth="2" opacity="0.95" />
      </g>
    </svg>
  );
}
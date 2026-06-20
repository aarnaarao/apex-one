"use client";

import { useEffect, useRef } from "react";

export default function ParallaxHero({ children }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      const { innerWidth, innerHeight } = window;
      const px = (e.clientX / innerWidth - 0.5) * 2;
      const py = (e.clientY / innerHeight - 0.5) * 2;

      const layers = wrapRef.current?.querySelectorAll("[data-parallax]");
      layers?.forEach((el) => {
        const depth = parseFloat(el.dataset.parallax) || 0;
        const x = px * depth;
        const y = py * depth;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={wrapRef} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
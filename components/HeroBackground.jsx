"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, mx = 0, my = 0, pmx = 0, pmy = 0, speed = 0, t = 0;
    let raf;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }
    window.addEventListener("mousemove", handleMove);

    const STARS = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.4 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const LINES = Array.from({ length: 90 }, createLine);
    function createLine() {
      const angle = (Math.random() - 0.5) * 0.5;
      return {
        x: Math.random(),
        y: Math.random(),
        len: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.01 + 0.003,
        angle,
        alpha: Math.random() * 0.35 + 0.1,
        width: Math.random() * 1.1 + 0.2,
      };
    }

    function draw() {
      t += 0.016;
      const dx = mx - pmx, dy = my - pmy;
      const msSpeed = Math.sqrt(dx * dx + dy * dy);
      speed += (msSpeed * 0.06 - speed) * 0.05;
      speed = Math.max(0, speed * 0.96);
      pmx = mx;
      pmy = my;

      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H));
      bg.addColorStop(0, "#0a0005");
      bg.addColorStop(0.4, "#060010");
      bg.addColorStop(0.8, "#030008");
      bg.addColorStop(1, "#000000");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const horizon = H * 0.5;
      ctx.save();
      for (let i = 0; i <= 22; i++) {
        const p = i / 22;
        const eased = Math.pow(p, 2.2);
        const y = horizon + eased * (H - horizon + 60);
        if (y > H + 10) continue;
        const a = (0.05 + speed * 0.01) * eased;
        const isRed = i % 6 === 0;
        ctx.strokeStyle = isRed
          ? `rgba(232,0,45,${a * 1.6})`
          : `rgba(100,60,180,${a})`;
        ctx.lineWidth = isRed ? 1.2 : 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

      STARS.forEach((s) => {
        s.x -= 0.0002 * (1 + speed * 0.3);
        s.twinkle += 0.03;
        if (s.x < 0) { s.x = 1; s.y = Math.random(); }
        const tw = 0.5 + Math.sin(s.twinkle) * 0.5;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${tw * 0.5})`;
        ctx.fill();
      });

      const lineBoost = 1 + speed * 0.2;
      LINES.forEach((l) => {
        l.x -= l.speed * lineBoost;
        if (l.x < -l.len) Object.assign(l, createLine(), { x: 1.1 });
        const ax = l.x * W, ay = l.y * H;
        const stretch = l.len * W * (1 + speed * 0.1);
        const alpha = l.alpha * Math.min(1, speed * 0.25 + 0.08);
        if (alpha < 0.01) return;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = l.width;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + stretch * Math.cos(l.angle), ay + stretch * Math.sin(l.angle));
        ctx.stroke();
      });

      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
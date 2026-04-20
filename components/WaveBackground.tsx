"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#bae6fd", "#7dd3fc", "#38bdf8", "#fed7aa", "#0ea5e9"];
    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.25 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;
      const scrollOffset = scrollYRef.current * 0.08;

      // Draw ambient sine waves
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const amp = 30 + w * 15;
        const freq = 0.004 + w * 0.002;
        const yBase = canvas.height * (0.35 + w * 0.2) + scrollOffset * (w + 1) * 0.3;
        const speed = time * (0.5 + w * 0.3);
        const waveOpacity = 0.04 - w * 0.01;
        ctx.strokeStyle = `rgba(14, 165, 233, ${waveOpacity})`;
        ctx.lineWidth = 60 - w * 15;

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = yBase + Math.sin(x * freq + speed) * amp;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY + scrollOffset * 0.003;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="wave-canvas"
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

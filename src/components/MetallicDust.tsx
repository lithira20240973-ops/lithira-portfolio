"use client";

import React, { useEffect, useRef } from "react";

// Subtle chrome/silver palette
const COLORS = [
  "rgba(245, 245, 250, 0.65)", // Bright reflection
  "rgba(190, 200, 215, 0.7)",  // Silver
  "rgba(140, 150, 165, 0.55)",  // Darker graphite
  "rgba(215, 220, 230, 0.85)",  // Clean metallic
];

interface Particle {
  x: number;
  y: number;
  z: number; // Depth (1 is closest, higher is further)
  radius: number;
  color: string;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  shimmerPhase: number;
  shimmerSpeed: number;
}

export const MetallicDust = ({ density = "normal" }: { density?: "normal" | "sparse" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: true to composite over the section's background
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Adjust density based on prop
    const areaDivider = density === "sparse" ? 25000 : 8000;
    const maxParticles = density === "sparse" ? 50 : 100;
    const particleCount = Math.min(Math.floor((width * height) / areaDivider), maxParticles);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 3 + 1.2; // Depth from 1.2 to 4.2
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        z,
        // Small metallic dots
        radius: (Math.random() * 1.2 + 0.6) * (3 / z),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        // Ambient drift
        vx: (Math.random() - 0.5) * 0.08 * (3 / z),
        vy: (Math.random() - 0.5) * 0.08 * (3 / z),
        shimmerPhase: Math.random() * Math.PI * 2,
        shimmerSpeed: 0.01 + Math.random() * 0.03,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let animationFrameId: number;

    const render = () => {
      // Smooth interpolation for elegant parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Global parallax offset based on distance from center
      const dx = (mouseX - cx) * 0.07;
      const dy = (mouseY - cy) * 0.07;

      particles.forEach((p) => {
        // Natural slow atmospheric drift
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Seamless wrap around
        if (p.baseX > width + 50) p.baseX = -50;
        if (p.baseX < -50) p.baseX = width + 50;
        if (p.baseY > height + 50) p.baseY = -50;
        if (p.baseY < -50) p.baseY = height + 50;

        // Apply depth-based parallax
        p.x = p.baseX - dx / p.z;
        p.y = p.baseY - dy / p.z;

        // Mouse repulsion (very subtle, creating "open empty spaces" interaction)
        const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
        if (distToMouse < 150) {
          const force = (150 - distToMouse) / 150;
          // Gentle push away
          p.baseX -= ((mouseX - p.x) / distToMouse) * force * 0.5;
          p.baseY -= ((mouseY - p.y) / distToMouse) * force * 0.5;
        }

        p.shimmerPhase += p.shimmerSpeed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Shimmer via opacity only — no shadowBlur (avoids expensive GPU buffer flush)
        const shimmerMod = Math.sin(p.shimmerPhase);
        const alpha = shimmerMod > 0.8 ? 0.7 + (shimmerMod - 0.8) * 1.5 : 0.4;
        ctx.fillStyle = p.color.replace(/[\.\d]+(?=\))/, alpha.toFixed(2));
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        // Mask out the center-left area slightly to preserve typography contrast
        maskImage: "radial-gradient(ellipse 60% 70% at 35% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 35% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 80%)",
      }}
    />
  );
};

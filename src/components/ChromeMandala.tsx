"use client";

import React, { useEffect, useRef } from "react";

export const ChromeMandala: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Fixed High-DPI canvas
    const dpr = window.devicePixelRatio || 1;
    // Set explicit logical sizes based on typical display needs to avoid resize loops
    const logicalWidth = canvas.clientWidth || 600;
    const logicalHeight = canvas.clientHeight || 600;
    
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    ctx.scale(dpr, dpr);

    const cx = logicalWidth / 2;
    const cy = logicalHeight / 2;
    const baseRadius = Math.min(cx, cy) * 0.8;

    // Build static dot structure (Zero CPU overhead after first frame)
    const rings = 8;
    
    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    
    for (let r = 1; r <= rings; r++) {
      const ringScale = r / rings; 
      
      const numPetals = 12;
      const petalAmp = ringScale * 0.12;
      const dotsInRing = Math.floor(r * 22);
      
      for (let i = 0; i < dotsInRing; i++) {
        const theta = (i / dotsInRing) * Math.PI * 2;
        
        const phaseOffset = (r % 2 === 0) ? (Math.PI / numPetals) : 0;
        const petalShape = Math.abs(Math.sin((numPetals / 2) * (theta + phaseOffset)));
        
        const rNorm = ringScale + petalShape * petalAmp;
        const size = (Math.random() * 0.7 + 0.4) * 1.4;
        
        const isHighlight = Math.random() > 0.65;

        // Static positioning
        const currentR = rNorm * baseRadius;
        const finalX = cx + currentR * Math.cos(theta);
        const finalY = cy + currentR * Math.sin(theta);

        ctx.beginPath();
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);

        // Pre-computed static shading - greatly increased base visibility
        const alpha = Math.random() * 0.6 + 0.4;

        if (isHighlight) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        } else {
          ctx.fillStyle = `rgba(220, 230, 240, ${alpha})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        
        // Static micro-glint
        if (isHighlight && Math.random() > 0.4) {
           ctx.beginPath();
           ctx.arc(finalX, finalY, size * 0.65, 0, Math.PI * 2);
           ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
           ctx.shadowBlur = 0;
           ctx.fill();
        }
      }
    }
  }, []); // Empty dependency array ensures it only renders exactly once

  return <canvas ref={canvasRef} className={`w-full h-full object-contain ${className}`} />;
};

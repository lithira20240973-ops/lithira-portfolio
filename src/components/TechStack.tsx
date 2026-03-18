"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Global Overlays ---
const NoiseOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.025] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilterStack">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilterStack)" />
    </svg>
  </div>
);

// --- Magnetic Hover Wrap ---
const MagneticContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Panel Background Visuals (Full Screen) ---
const PixelGrid = () => (
  <div className="absolute inset-0 grid grid-cols-[repeat(auto-fit,minmax(20px,1fr))] gap-px opacity-30 group-hover:opacity-100 transition-opacity duration-700">
    {Array.from({ length: 400 }).map((_, i) => (
      <motion.div
        key={i}
        className="bg-white/5 w-full h-full rounded-[1px]"
        whileHover={{ backgroundColor: "rgba(255,255,255,0.8)", scale: 1.1 }}
        transition={{ duration: 0.1 }}
      />
    ))}
  </div>
);

const AnimatedTerminal = () => (
  <div className="absolute inset-0 flex flex-col justify-end p-8 font-mono text-[0.6rem] text-[#2DFF8A] opacity-60 overflow-hidden">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, staggerChildren: 0.2 }}
      className="space-y-2"
    >
      <p>sys.init()</p>
      <p>loading modules...</p>
      <p className="text-white/40">import * as java from 'core/java'</p>
      <p>evaluating expressions...</p>
      <p>class Engineer implements Visionary {'{'}</p>
      <p className="pl-4">public void execute() {'{'}</p>
      <p className="pl-8 text-white">System.out.println("Hello, World.");</p>
      <div className="flex">
        <span>{'>'} </span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-3 bg-[#2DFF8A] ml-1 mt-0.5"
        />
      </div>
    </motion.div>
  </div>
);

const WaveformVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="flex items-center gap-1 h-32 opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#2D7FFF] rounded-full"
          initial={{ height: 4 }}
          animate={{ height: ["4px", `${Math.random() * 100 + 10}px`, "4px"] }}
          transition={{ repeat: Infinity, duration: Math.random() * 1 + 0.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  </div>
);

const TopoMapVisual = () => (
  <div className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-1000 flex items-center justify-center overflow-hidden">
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="w-[150%] h-[150%] absolute"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px'
      }}
    />
  </div>
);

// --- Card Visuals (Inner Box) ---
const FrontendCube = () => (
  <div className="absolute inset-0 flex items-center justify-center [perspective:1000px] opacity-80">
    <motion.div
      className="relative w-32 h-32 [transform-style:preserve-3d]"
      animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
    >
      {['front', 'back', 'top', 'bottom', 'left', 'right'].map((face, i) => {
        const transforms: Record<string, string> = {
          front: 'translateZ(64px)',
          back: 'rotateY(180deg) translateZ(64px)',
          top: 'rotateX(90deg) translateZ(64px)',
          bottom: 'rotateX(-90deg) translateZ(64px)',
          left: 'rotateY(-90deg) translateZ(64px)',
          right: 'rotateY(90deg) translateZ(64px)'
        };
        return (
          <div
            key={i}
            className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            style={{ transform: transforms[face] }}
          />
        );
      })}
    </motion.div>
  </div>
);

const NodeNetwork = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-70">
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="max-w-[80%] max-h-[80%]">
      <g stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <line x1="50" y1="50" x2="150" y2="80" />
        <line x1="150" y1="80" x2="100" y2="150" />
        <line x1="100" y1="150" x2="50" y2="50" />
        <line x1="150" y1="80" x2="180" y2="30" />
        <line x1="50" y1="50" x2="20" y2="120" />
      </g>
      <g fill="rgba(255,255,255,0.6)">
        <circle cx="50" cy="50" r="4" />
        <circle cx="150" cy="80" r="5" />
        <circle cx="100" cy="150" r="4" />
        <circle cx="180" cy="30" r="3" />
        <circle cx="20" cy="120" r="3" />
      </g>
      <motion.circle r="3" fill="#2DFF8A"
        animate={{ cx: [50, 150, 100, 50], cy: [50, 80, 150, 50] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 4px #2DFF8A)" }}
      />
    </svg>
  </div>
);

const FilmStrips = () => (
  <div className="absolute inset-0 flex items-center justify-center gap-4 overflow-hidden rotate-12 scale-125 opacity-80">
    <motion.div
      className="flex flex-col gap-4"
      animate={{ y: [0, -200] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-16 h-24 border border-white/20 rounded-md bg-white/5 backdrop-blur-md" />
      ))}
    </motion.div>
    <motion.div
      className="flex flex-col gap-4"
      animate={{ y: [-200, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-20 h-28 border border-white/20 rounded-md bg-white/5 backdrop-blur-md" />
      ))}
    </motion.div>
  </div>
);

const DroneRadar = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-80">
    <div className="relative w-48 h-48 rounded-full border border-white/10 flex items-center justify-center">
      <div className="absolute w-32 h-32 rounded-full border border-white/5" />
      <div className="absolute w-16 h-16 rounded-full border border-white/5" />

      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-white/10" />
      <div className="absolute h-full w-[1px] bg-white/10" />

      {/* Sweeping Radar */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.15) 100%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Blips */}
      <motion.div
        className="absolute w-2 h-2 bg-[#FF4D2D] rounded-full top-12 right-12"
        style={{ filter: "drop-shadow(0 0 6px #FF4D2D)" }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 bg-white rounded-full bottom-16 left-10 text-[0.4rem] font-mono leading-none tracking-tighter"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
      >
        ALT_400
      </motion.div>
    </div>
  </div>
);


// --- Main Data ---
const STACK_DATA = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Architecting interactive user interfaces.",
    skills: ["HTML", "CSS", "JavaScript (Basic)"],
    visualBg: <PixelGrid />,
    visualCard: <FrontendCube />
  },
  {
    id: "programming",
    title: "Programming",
    description: "Building the logic underneath.",
    skills: ["Java (Beginner)"],
    visualBg: <AnimatedTerminal />,
    visualCard: <NodeNetwork />
  },
  {
    id: "media",
    title: "Creative Media",
    description: "Crafting visual narratives.",
    skills: ["Adobe Premiere Pro", "DaVinci Resolve"],
    visualBg: <WaveformVisual />,
    visualCard: <FilmStrips />
  },
  {
    id: "drone",
    title: "Production",
    description: "Capturing the world from above.",
    skills: ["Drone Videography", "Aerial Cinematography"],
    visualBg: <TopoMapVisual />,
    visualCard: <DroneRadar />
  }
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0B0C0F] text-white"
      style={{ height: "400vh", fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <NoiseOverlay />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_150%,#1a1b26_0%,#0B0C0F_70%)] opacity-80 pointer-events-none z-0" />

        {/* Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <motion.div
            className="h-full bg-white/80"
            style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

        {/* Header */}
        <div className="absolute top-12 left-8 md:left-24 z-40 pointer-events-none">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tighter leading-none text-white/90 mix-blend-difference">
            My Stack, <br />
            <span className="text-white/40 font-normal">My Playground.</span>
          </h2>
        </div>

        {/* Horizontal Track */}
        <motion.div
          className="flex h-full w-[400vw] z-10"
          style={{ x: xTransform }}
        >
          {STACK_DATA.map((panel, idx) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const parallaxX = useTransform(
              smoothProgress,
              [idx * 0.25 - 0.25, idx * 0.25 + 0.25],
              ["-10%", "10%"]
            );

            return (
              <div key={panel.id} className="relative w-screen h-full flex items-center justify-center p-8 md:p-24 overflow-hidden group">

                {/* Background Parallax */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{ x: parallaxX }}
                >
                  {panel.visualBg}
                </motion.div>

                <div className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                  {/* Text Content */}
                  <div className="order-2 md:order-1 outline-none pointer-events-auto">
                    <h3 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">{panel.title}</h3>
                    <p className="text-white/50 text-sm md:text-base mb-12 font-[450] tracking-wide max-w-sm">
                      {panel.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {panel.skills.map((skill, sIdx) => (
                        <MagneticContainer key={sIdx}>
                          <div className="px-5 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-white/80 text-xs uppercase tracking-widest font-bold cursor-pointer hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                            {skill}
                          </div>
                        </MagneticContainer>
                      ))}
                    </div>
                  </div>

                  {/* Feature Visual/Abstract Card */}
                  <div className="order-1 md:order-2 aspect-square md:aspect-auto md:h-[60vh] rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl relative overflow-hidden pointer-events-none shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    {panel.visualCard}
                    {/* Base gradient overlay to ground the abstract art */}
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#0B0C0F]/80 to-transparent" />
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          className="absolute bottom-12 right-8 md:right-24 z-40 pointer-events-auto flex items-center gap-6"
          style={{
            opacity: useTransform(smoothProgress, [0.8, 0.95], [0, 1]),
            y: useTransform(smoothProgress, [0.8, 0.95], [20, 0]),
          }}
        >
          <span className="text-white/40 text-xs tracking-widest uppercase font-bold hidden md:block">
            Want the full CV?
          </span>
          <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <ArrowUpRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

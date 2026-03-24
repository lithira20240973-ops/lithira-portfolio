"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { MetallicDust } from "./MetallicDust";

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 0,
    name: "AquaGuard",
    year: "2025",
    sideLabel: "SMART MONITORING SYSTEM",
    tags: ["IoT", "Dashboard", "Monitoring", "Smart System"],
    accent: "var(--text-primary)",
    bg: "linear-gradient(145deg, var(--background-secondary) 0%, var(--background-elevated) 50%, var(--background-primary) 100%)",
    glow: "radial-gradient(ellipse 70% 55% at 50% 42%, var(--glow-soft) 0%, transparent 100%)",
    images: [
      "/images/projects/aquaguard-1.png",
      "/images/projects/aquaguard-2.png",
      "/images/projects/aquaguard-3.png",
    ],
  },
  {
    id: 1,
    name: "MediHouse",
    year: "2025",
    sideLabel: "DIGITAL HEALTHCARE PLATFORM",
    tags: ["Healthcare", "UI/UX", "Platform", "Service Design"],
    accent: "var(--accent-primary)",
    bg: "linear-gradient(145deg, var(--background-primary) 0%, var(--background-secondary) 50%, var(--background-primary) 100%)",
    glow: "radial-gradient(ellipse 70% 55% at 50% 42%, var(--glow-soft) 0%, transparent 100%)",
    images: [
      "/images/projects/medihouse-1.png",
      "/images/projects/medihouse-2.png",
      "/images/projects/medihouse-3.png",
    ],
  },
  {
    id: 2,
    name: "EstateApp",
    year: "2025",
    sideLabel: "REAL ESTATE PLATFORM",
    tags: ["Real Estate", "Web App", "UX Design", "Listings"],
    accent: "var(--accent-secondary)",
    bg: "linear-gradient(145deg, var(--background-secondary) 0%, var(--background-elevated) 50%, var(--background-primary) 100%)",
    glow: "radial-gradient(ellipse 70% 55% at 50% 42%, var(--glow-soft) 0%, transparent 100%)",
    images: [
      "/images/projects/estateapp-1.png",
      "/images/projects/estateapp-2.png",
      "/images/projects/estateapp-3.png",
    ],
  },
];

type Project = (typeof PROJECTS)[number];

// ─── Premium placeholder ──────────────────────────────────────────────────────
const Placeholder = ({ project, index }: { project: Project; index: number }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base bg */}
    <div className="absolute inset-0" style={{ background: project.bg }} />
    {/* Ambient glow */}
    <div className="absolute inset-0" style={{ background: project.glow }} />
    {/* Subtle grid */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    {/* Center label */}
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
      <div
        className="w-11 h-11 rounded-full border flex items-center justify-center"
        style={{ borderColor: `var(--border-medium)` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="1.5" opacity={0.7}>
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <p
        className="text-[0.58rem] tracking-[0.4em] uppercase font-medium"
        style={{ color: `var(--text-secondary)` }}
      >
        {project.name} · Preview {index + 1}
      </p>
      <p className="text-[0.5rem] tracking-[0.25em] uppercase text-[var(--text-muted)]">
        Project Assets In Production
      </p>
    </div>
  </div>
);

// ─── Single project slide ─────────────────────────────────────────────────────
const ProjectSlide = ({
  project,
  imgIdx,
  onPrev,
  onNext,
}: {
  project: Project;
  imgIdx: number;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#050505]">
    
    {/* --- LUXURY SHOWROOM BACKGROUND LAYERS --- */}
    
    {/* 1. Base Graphite/Metal Gradient */}
    <div 
      className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--background-secondary)] via-[var(--background-primary)] to-[#030303] opacity-80"
    />
    
    {/* 2. Metallic Grain Texture */}
    <div
      className="absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />

    {/* 3. Soft Diffused Spotlight / Radial Glow (Cool Silver) */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[70vw] h-[70vh] rounded-full blur-[130px] opacity-40 mix-blend-screen pointer-events-none z-0"
      style={{ background: "radial-gradient(ellipse at center, rgba(160, 175, 195, 0.1) 0%, transparent 70%)" }}
    />

    {/* 4. Sparse Metallic Micro-particles (masked from the center card) */}
    <div 
      className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      style={{
        maskImage: "radial-gradient(ellipse 65% 70% at 50% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 50% 55%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
       <MetallicDust />
    </div>

    {/* 5. Luminous Sweeps / Light Streaks (slowly animated) */}
    <motion.div
      className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen"
      animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
      transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      style={{
        backgroundImage: "linear-gradient(110deg, transparent 15%, rgba(200, 215, 230, 0.4) 25%, transparent 35%, transparent 75%, rgba(200, 215, 230, 0.2) 80%, transparent 90%)",
        backgroundSize: "200% 200%",
      }}
    />

    {/* Atmospheric top silver haze */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[35vh] bg-[var(--text-secondary)]/5 blur-[120px] rounded-full pointer-events-none z-0" />
    
    {/* --- CONTENT (Elevated via z-10) --- */}

    {/* ① Section label */}
    <div className="relative z-10 flex-none pt-8 md:pt-10 flex justify-center">
      <span className="text-[0.58rem] tracking-[0.5em] text-[var(--text-muted)] uppercase font-medium select-none">
        My Work
      </span>
    </div>

    {/* ② Project title */}
    <div className="relative z-10 flex-none mt-2 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.h3
          key={project.name}
          className="text-[clamp(2.5rem,5vw,6.5rem)] font-light tracking-[-0.035em] text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
        >
          {project.name}
        </motion.h3>
      </AnimatePresence>
    </div>

    {/* ③ Main row: left meta | hero frame | right meta */}
    <div className="relative z-10 flex-1 flex items-center px-6 md:px-14 gap-4 md:gap-8 min-h-0 py-3">

      {/* Left */}
      <div className="flex-none w-24 md:w-32 flex flex-col items-start gap-4 lg:gap-5 drop-shadow-md">
        <div>
          <p className="text-[0.45rem] tracking-[0.4em] text-[var(--accent-primary)] uppercase font-semibold">Date</p>
          <p className="text-[0.9rem] text-[var(--text-primary)] font-medium mt-1 tracking-wide">{project.year}</p>
        </div>
        <div className="w-8 h-px bg-[var(--border-medium)]" />
        <button
          onClick={onPrev}
          className="w-10 h-10 rounded-full border border-[var(--border-medium)] bg-[var(--background-elevated)] flex items-center justify-center
                     text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] hover:shadow-[0_0_15px_var(--glow-soft)]
                     transition-all duration-300 text-base leading-none shadow-[0_2px_10px_rgba(0,0,0,0.3)] mt-2"
          aria-label="Previous image"
        >
          ←
        </button>
      </div>

      {/* Center hero frame */}
      <div className="flex-1 flex items-center justify-center min-w-0 relative">
        {/* Under-card studio glow (tight and elegant) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[110%] bg-[radial-gradient(ellipse_at_center,_rgba(160,170,185,0.06)_0%,_transparent_60%)] blur-[40px] pointer-events-none z-0" />
        
        <div
          className="relative w-full rounded-[16px] overflow-hidden bg-[#0A0B0D] z-10"
          style={{
            maxWidth: "min(840px, 100%)",
            height: "min(56vh, 480px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: `0 30px 80px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.08)`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${project.id}-${imgIdx}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.images[imgIdx] ? (
                <Image
                  src={project.images[imgIdx]}
                  alt={`${project.name} screenshot ${imgIdx + 1}`}
                  fill
                  className="object-cover object-top"
                  priority={imgIdx === 0}
                />
              ) : (
                <Placeholder project={project} index={imgIdx} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {Array.from({ length: Math.max(project.images.length, 1) }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === imgIdx ? "20px" : "6px",
                  height: "4px",
                  background: i === imgIdx ? "var(--accent-primary)" : "var(--border-medium)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-none w-24 md:w-32 flex flex-col items-end gap-4 lg:gap-5 drop-shadow-md">
        <div className="text-right">
          <p className="text-[0.45rem] tracking-[0.4em] text-[var(--accent-primary)] uppercase font-semibold">Project</p>
          <p
            className="text-[0.65rem] tracking-[0.15em] text-[var(--text-primary)] font-medium mt-1 leading-snug"
            style={{ maxWidth: "120px" }}
          >
            {project.sideLabel}
          </p>
        </div>
        <div className="w-8 h-px bg-[var(--border-medium)]" />
        <button
          onClick={onNext}
          className="w-10 h-10 rounded-full border border-[var(--border-medium)] bg-[var(--background-elevated)] flex items-center justify-center
                     text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] hover:shadow-[0_0_15px_var(--glow-soft)]
                     transition-all duration-300 text-base leading-none shadow-[0_2px_10px_rgba(0,0,0,0.3)] mt-2"
          aria-label="Next image"
        >
          →
        </button>
      </div>
    </div>

    {/* ④ Bottom tags */}
    <div className="relative z-10 flex-none pb-8 md:pb-10 flex justify-center gap-2.5 flex-wrap px-6">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="px-4 py-1.5 rounded-full border border-[var(--border-medium)] bg-[var(--background-elevated)]
                     text-[0.6rem] tracking-[0.2em] text-[var(--text-secondary)] uppercase font-medium
                     hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)] hover:shadow-[0_0_12px_var(--glow-soft)]
                     shadow-[0_4px_12px_rgba(0,0,0,0.4)]
                     transition-all duration-300 backdrop-blur-md cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// ─── Main exported component ──────────────────────────────────────────────────
export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [galleryIndices, setGalleryIndices] = useState([0, 0, 0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.0005 });

  // Slide elevation transforms — each project rises from 100% → 0
  const slide1Y = useTransform(smooth, [0.28, 0.52], ["100%", "0%"]);
  const slide2Y = useTransform(smooth, [0.62, 0.86], ["100%", "0%"]);

  const handleNav = (projectIdx: number, dir: 1 | -1) => {
    setGalleryIndices((prev) => {
      const next = [...prev];
      const len = Math.max(PROJECTS[projectIdx].images.length, 1);
      next[projectIdx] = (next[projectIdx] + dir + len) % len;
      return next;
    });
  };

  return (
    <section
      data-cursor-theme="projects"
      ref={sectionRef}
      id="projects"
      className="relative bg-[var(--background-primary)]"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Slide 0 — AquaGuard (base layer, gets covered) */}
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <ProjectSlide
            project={PROJECTS[0]}
            imgIdx={galleryIndices[0]}
            onPrev={() => handleNav(0, -1)}
            onNext={() => handleNav(0, 1)}
          />
        </div>

        {/* Slide 1 — MediHouse (rises in) */}
        <motion.div className="absolute inset-0" style={{ y: slide1Y, zIndex: 20 }}>
          <ProjectSlide
            project={PROJECTS[1]}
            imgIdx={galleryIndices[1]}
            onPrev={() => handleNav(1, -1)}
            onNext={() => handleNav(1, 1)}
          />
        </motion.div>

        {/* Slide 2 — EstateApp (rises in last) */}
        <motion.div className="absolute inset-0" style={{ y: slide2Y, zIndex: 30 }}>
          <ProjectSlide
            project={PROJECTS[2]}
            imgIdx={galleryIndices[2]}
            onPrev={() => handleNav(2, -1)}
            onNext={() => handleNav(2, 1)}
          />
        </motion.div>

      </div>
    </section>
  );
};

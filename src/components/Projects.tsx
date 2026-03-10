"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 0,
    name: "AquaGuard",
    year: "2025",
    sideLabel: "SMART MONITORING SYSTEM",
    tags: ["IoT", "Dashboard", "Monitoring", "Smart System"],
    accent: "#00B4D8",
    bg: "linear-gradient(145deg, #020c18 0%, #061a2e 50%, #03101e 100%)",
    glow: "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(0,180,216,0.22) 0%, transparent 100%)",
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
    accent: "#A8D8EA",
    bg: "linear-gradient(145deg, #060910 0%, #0b1422 50%, #070a14 100%)",
    glow: "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(168,216,234,0.15) 0%, transparent 100%)",
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
    accent: "#C8AB8A",
    bg: "linear-gradient(145deg, #0c0a08 0%, #1a1510 50%, #100d0a 100%)",
    glow: "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(200,171,138,0.16) 0%, transparent 100%)",
    images: [] as string[],
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
        style={{ borderColor: `${project.accent}50` }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="1.5" opacity={0.7}>
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <p
        className="text-[0.58rem] tracking-[0.4em] uppercase font-medium"
        style={{ color: `${project.accent}70` }}
      >
        {project.name} · Preview {index + 1}
      </p>
      <p className="text-[0.5rem] tracking-[0.25em] uppercase text-white/18">
        Replace with actual screenshot
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
  <div
    className="absolute inset-0 flex flex-col overflow-hidden"
    style={{ background: "radial-gradient(ellipse at 50% 20%, #161616 0%, #0a0a0a 70%)" }}
  >
    {/* ① Section label */}
    <div className="flex-none pt-8 md:pt-10 flex justify-center">
      <span className="text-[0.58rem] tracking-[0.5em] text-white/22 uppercase font-medium select-none">
        My Work
      </span>
    </div>

    {/* ② Project title */}
    <div className="flex-none mt-2 flex justify-center">
      <AnimatePresence mode="wait">
        <motion.h3
          key={project.name}
          className="text-[clamp(2rem,4.5vw,5.5rem)] font-light tracking-[-0.03em] text-white/90"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.name}
        </motion.h3>
      </AnimatePresence>
    </div>

    {/* ③ Main row: left meta | hero frame | right meta */}
    <div className="flex-1 flex items-center px-6 md:px-14 gap-4 md:gap-8 min-h-0 py-3">

      {/* Left */}
      <div className="flex-none w-24 md:w-32 flex flex-col items-start gap-3">
        <div>
          <p className="text-[0.5rem] tracking-[0.35em] text-white/28 uppercase">Date</p>
          <p className="text-sm text-white/60 font-light mt-0.5 tracking-wide">{project.year}</p>
        </div>
        <div className="w-full h-px bg-white/10" />
        <button
          onClick={onPrev}
          className="w-9 h-9 rounded-full border border-white/14 flex items-center justify-center
                     text-white/40 hover:text-white/80 hover:border-white/35
                     transition-all duration-300 text-base leading-none"
          aria-label="Previous image"
        >
          ←
        </button>
      </div>

      {/* Center hero frame */}
      <div className="flex-1 flex items-center justify-center min-w-0">
        <div
          className="relative w-full rounded-[16px] overflow-hidden"
          style={{
            maxWidth: "min(780px, 100%)",
            height: "min(52vh, 440px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: `0 0 100px rgba(0,0,0,0.85), 0 0 50px ${project.accent}14, inset 0 0 0 1px rgba(255,255,255,0.04)`,
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
                  background: i === imgIdx ? project.accent : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-none w-24 md:w-32 flex flex-col items-end gap-3">
        <div className="text-right">
          <p className="text-[0.5rem] tracking-[0.35em] text-white/28 uppercase">Project</p>
          <p
            className="text-[0.58rem] tracking-[0.1em] text-white/50 font-light mt-0.5 leading-snug"
            style={{ maxWidth: "120px" }}
          >
            {project.sideLabel}
          </p>
        </div>
        <div className="w-full h-px bg-white/10" />
        <button
          onClick={onNext}
          className="w-9 h-9 rounded-full border border-white/14 flex items-center justify-center
                     text-white/40 hover:text-white/80 hover:border-white/35
                     transition-all duration-300 text-base leading-none"
          aria-label="Next image"
        >
          →
        </button>
      </div>
    </div>

    {/* ④ Bottom tags */}
    <div className="flex-none pb-8 md:pb-10 flex justify-center gap-2 flex-wrap px-6">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="px-4 py-1.5 rounded-full border border-white/[0.09] bg-white/[0.03]
                     text-[0.58rem] tracking-[0.18em] text-white/38 uppercase
                     hover:border-white/20 hover:text-white/60
                     transition-all duration-300 backdrop-blur-sm cursor-default"
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
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0a0a0a]"
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

"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
  { id: 0, title: "Mountain Ridge", location: "Highlands", angle: -135, videoSrc: "/videos/drone/drone1.mp4" },
  { id: 1, title: "Coastal Drift", location: "Southern Coast", angle: -45, videoSrc: "/videos/drone/drone2.mp4" },
  { id: 2, title: "Urban Heights", location: "City Rooftops", angle: 180, videoSrc: "/videos/drone/drone3.mp4" },
  { id: 3, title: "Valley Sweep", location: "Highland Valleys", angle: 0, videoSrc: "/videos/drone/drone4.mp4" },
  { id: 4, title: "Seascape", location: "Lagoon & Shore", angle: 135, videoSrc: "/videos/drone/drone5.mp4" },
  { id: 5, title: "Golden Hour", location: "Hillside Sunset", angle: 90, videoSrc: "/videos/drone/drone6.mp4" },
  { id: 6, title: "Nightfall", location: "City by Night", angle: 45, videoSrc: "/videos/drone/drone7.mp4" },
];

const CARD_BG = "var(--background-elevated)";
const CARD_BORDER = "var(--border-medium)";

// Geometry Constants
const RX = 420; // Horizontal radius
const RY = 240; // Vertical radius
const SPIRAL_ROT = Math.PI * 1.8; // How much the orbit rotates over the scroll distance
const VERTICAL_DRIFT = 600; // How much the cards rise upward

// ─── Single Drone Card ────────────────────────────────────────────────────────
function DroneCard({
  card,
  progress,
  onSelect,
}: {
  card: (typeof CARDS)[0];
  progress: MotionValue<number>;
  onSelect: (card: (typeof CARDS)[0]) => void;
}) {
  const baseAngleRad = (card.angle * Math.PI) / 180;

  // Position & Motion
  const angle = useTransform(progress, p => baseAngleRad + p * SPIRAL_ROT);
  const x = useTransform(angle, a => Math.cos(a) * RX);
  const zPos = useTransform(angle, a => Math.sin(a)); // -1 to 1 (depth guide)

  // Vertical drift: cards move upward as scroll progresses
  const y = useTransform(progress, p => Math.sin(baseAngleRad + p * SPIRAL_ROT) * RY - p * VERTICAL_DRIFT);

  // Visual tweaks based on depth (zPos)
  const scale = useTransform(zPos, [-1, 1], [0.75, 1.15]);
  const opacity = useTransform(zPos, [-1, -0.4, 1], [0.35, 0.6, 1]);
  const blur = useTransform(zPos, [-1, 0, 1], ["blur(4px)", "blur(1px)", "blur(0px)"]);
  const zIndex = useTransform(zPos, [-1, 1], [10, 50]);
  const rotateY = useTransform(x, [-RX, 0, RX], [-22, 0, 22]);

  return (
    <motion.div
      className="absolute"
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex: zIndex as any,
        filter: blur,
        rotateY,
        perspective: 1000,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="cursor-pointer group relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onSelect(card)}
      >
        <div
          className="relative rounded-2xl overflow-hidden border backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.8)] group-hover:shadow-[0_20px_50px_var(--glow-soft)] transition-shadow duration-500"
          style={{
            width: "190px",
            height: "320px",
            background: CARD_BG,
            borderColor: CARD_BORDER,
          }}
        >
          {/* Video Preview */}
          <video
            src={card.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-14 h-14 rounded-full bg-[var(--background-elevated)]/60 backdrop-blur-xl border border-[var(--border-medium)] flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent-soft)] group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_25px_var(--glow-soft)] transition-all duration-500 shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-primary)" stroke="var(--text-primary)" strokeWidth="1" className="ml-1 opacity-80 group-hover:opacity-100">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>

          {/* Info */}
          <div className="absolute bottom-0 inset-x-0 p-4 z-20">
            <p className="text-white text-[0.75rem] font-medium tracking-tight mb-0.5">{card.title}</p>
            <p className="text-white/40 text-[0.5rem] tracking-[0.25em] uppercase font-light">{card.location}</p>
          </div>

          {/* Highlight effect */}
          <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
}

import { X } from "lucide-react";

// ─── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ card, onClose }: { card: (typeof CARDS)[0] | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {card && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />

          <motion.div
            className="relative z-10 w-full max-w-[440px]"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button - Small & Aesthetic */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 md:-right-14 md:top-0 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all duration-300 backdrop-blur-xl group z-50"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={18} strokeWidth={2} className="transition-transform duration-500" />
              
              {/* Tooltip-like label for desktop */}
              <span className="absolute right-12 text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap pointer-events-none text-white/40 font-light">Close</span>
            </motion.button>

            <div className="w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative group/video">
              <video 
                src={card.videoSrc} 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 flex justify-between items-end px-2">
              <div>
                <motion.h3 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-xl font-light tracking-tight"
                >
                  {card.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/30 text-[0.6rem] tracking-[0.4em] uppercase mt-1.5"
                >
                  {card.location}
                </motion.p>
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ delay: 0.4 }}
                className="text-white text-[0.55rem] tracking-[0.5em] uppercase pb-1 font-light"
              >
                Aerial Unit 01
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export const Droneography = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<(typeof CARDS)[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001,
  });

  // Center Content Parallax
  const titleY = useTransform(smoothProgress, [0, 0.4], [0, -120]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  // Mouse Parallax for Atmospheric Depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) - 0.5);
    mouseY.set((e.clientY / window.innerHeight) - 0.5);
  };

  const smoothMouseX = useSpring(mouseX, { stiffness: 35, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 35, damping: 25 });

  // Mouse tracking is kept for future interaction if needed, but unused in background to save layout reflows.
  return (
    <>
      <section
        ref={sectionRef}
        id="droneography"
        className="relative bg-[#020305]"
        style={{ height: "200vh" }}
        onMouseMove={handleMouseMove}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

          {/* ── Cinematic Atmospheric Background ────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#020305]">

            {/* 1. Deep Aerial Foundation Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14] via-[#05070a] to-[#020203]" />

            {/* 2. Unified Atmospheric Haze (Performance Optimized: Static + Soft Pulse) */}
            <motion.div
              className="absolute top-[-20%] left-[-10%] w-[120vw] h-[140vh] bg-[radial-gradient(ellipse_at_center,rgba(80,110,140,0.15)_0%,transparent_60%)] blur-[100px] rounded-full mix-blend-screen"
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 3. Volumetric Light Beam (Simplified, drifting slowly, no mouse tracking) */}
            <motion.div
              className="absolute top-0 left-[20%] w-[40vw] h-[150%] -rotate-[15deg] bg-gradient-to-b from-transparent via-[rgba(160,190,220,0.1)] to-transparent blur-[70px] mix-blend-screen"
              animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 4. Edge Vignette (Controls light spill) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10" />

          </div>

          {/* ── Centered Heading ──────────────────────────────────── */}
          <motion.div
            className="relative z-40 text-center pointer-events-none select-none px-6"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <motion.span
              className="text-[0.6rem] tracking-[0.6em] text-white/20 uppercase font-medium block mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Droneography
            </motion.span>
            <motion.h2
              className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-[-0.03em] text-[var(--text-primary)] leading-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ textShadow: "0 10px 40px rgba(0,0,0,0.9)" }}
            >
              Aerial Visual Archive
            </motion.h2>
            <motion.p
              className="mt-6 text-[0.8rem] text-white/30 tracking-wider font-light max-w-[320px] mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              Cinematic landscapes, architecture & motion from above
            </motion.p>
          </motion.div>

          {/* ── Orbital Card Field — desktop only ────────────────── */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            {/* Center Axis Nudge */}
            <div className="relative" style={{ width: "1px", height: "1px", marginTop: "20px" }}>
              <div className="pointer-events-auto">
                {CARDS.map((card) => (
                  <DroneCard
                    key={card.id}
                    card={card}
                    progress={smoothProgress}
                    onSelect={setSelected}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Mobile horizontal card scroll ─────────────────────── */}
          <div className="md:hidden absolute inset-x-0 bottom-20 flex gap-4 overflow-x-auto px-6 pb-2 pointer-events-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}>
            {CARDS.map((card) => (
              <div
                key={card.id}
                className="flex-none snap-center rounded-2xl overflow-hidden border border-white/10 bg-[var(--background-elevated)] shadow-[0_10px_30px_rgba(0,0,0,0.7)] cursor-pointer"
                style={{ width: "160px", height: "260px" }}
                onClick={() => setSelected(card)}
              >
                <video
                  src={card.videoSrc}
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[0.65rem] font-medium tracking-tight">{card.title}</p>
                  <p className="text-white/40 text-[0.5rem] tracking-widest uppercase">{card.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Scroll Hint ───────────────────────────────────────── */}
          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-3 opacity-20"
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0.2, 0]) }}
          >
            <span className="text-[0.55rem] tracking-[0.5em] uppercase text-white font-light">Explore Orbit</span>
            <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
          </motion.div>

        </div>
      </section>

      <VideoModal card={selected} onClose={() => setSelected(null)} />
    </>
  );
};

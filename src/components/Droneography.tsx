"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
  { id: 0, title: "Mountain Ridge",   location: "Highlands", angle: -135, videoSrc: "/videos/drone/drone1.mp4" },
  { id: 1, title: "Coastal Drift",    location: "Southern Coast", angle: -45,  videoSrc: "/videos/drone/drone2.mp4" },
  { id: 2, title: "Urban Heights",    location: "City Rooftops", angle: 180,  videoSrc: "/videos/drone/drone3.mp4" },
  { id: 3, title: "Valley Sweep",     location: "Highland Valleys", angle: 0,    videoSrc: "/videos/drone/drone4.mp4" },
  { id: 4, title: "Seascape",         location: "Lagoon & Shore", angle: 135,  videoSrc: "/videos/drone/drone5.mp4" },
  { id: 5, title: "Golden Hour",      location: "Hillside Sunset", angle: 90,   videoSrc: "/videos/drone/drone6.mp4" },
  { id: 6, title: "Nightfall",        location: "City by Night", angle: 45,   videoSrc: "/videos/drone/drone7.mp4" },
];

const CARD_BG = "rgba(15, 15, 20, 0.85)";
const CARD_BORDER = "rgba(255, 255, 255, 0.08)";

// Geometry Constants
const RX = 420; // Horizontal radius
const RY = 240; // Vertical radius
const SPIRAL_ROT = Math.PI * 2.2; // How much the orbit rotates over the scroll distance
const VERTICAL_DRIFT = 800; // How much the cards rise upward

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
  const angle   = useTransform(progress, p => baseAngleRad + p * SPIRAL_ROT);
  const x       = useTransform(angle, a => Math.cos(a) * RX);
  const zPos    = useTransform(angle, a => Math.sin(a)); // -1 to 1 (depth guide)
  
  // Vertical drift: cards move upward as scroll progresses
  const y       = useTransform(progress, p => Math.sin(baseAngleRad + p * SPIRAL_ROT) * RY - p * VERTICAL_DRIFT);
  
  // Visual tweaks based on depth (zPos)
  const scale   = useTransform(zPos, [-1, 1], [0.75, 1.15]);
  const opacity = useTransform(zPos, [-1, -0.4, 1], [0.35, 0.6, 1]);
  const blur    = useTransform(zPos, [-1, 0, 1], ["blur(4px)", "blur(1px)", "blur(0px)"]);
  const zIndex  = useTransform(zPos, [-1, 1], [10, 50]);
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
          className="relative rounded-2xl overflow-hidden border backdrop-blur-md shadow-2xl"
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
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-1">
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

// ─── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ card, onClose }: { card: (typeof CARDS)[0] | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {card && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

          <motion.div
            className="relative z-10 w-full max-w-[420px]"
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 15, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 flex items-center gap-2 text-white/40 hover:text-white/80 text-[0.6rem] tracking-[0.4em] uppercase transition-all"
            >
              Close <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px]">✕</span>
            </button>

            <div className="w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black/50 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
              <video src={card.videoSrc} controls autoPlay className="w-full h-full object-cover" />
            </div>

            <div className="mt-6 flex justify-between items-end px-1">
              <div>
                <h3 className="text-white text-lg font-light tracking-tight">{card.title}</h3>
                <p className="text-white/30 text-[0.6rem] tracking-[0.4em] uppercase mt-1">{card.location}</p>
              </div>
              <span className="text-white/10 text-[0.55rem] tracking-[0.5em] uppercase pb-1">Original Scale</span>
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

  return (
    <>
      <section
        ref={sectionRef}
        id="droneography"
        className="relative bg-[#050508]"
        style={{ height: "450vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          
          {/* ── Background ────────────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0c0c1e_0%,#050508_70%)] opacity-60" />
            
            {/* Subtle glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />

            {/* Orbital Traces */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.035]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
              <ellipse cx="720" cy="450" rx={RX} ry={RY} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 20" />
              <ellipse cx="720" cy="450" rx={RX * 0.7} ry={RY * 0.7} fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="2 15" />
              <circle cx="720" cy="450" r="1" fill="white" />
            </svg>

            {/* Film Grain */}
            <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
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
              className="text-[clamp(2rem,5vw,4.5rem)] font-extralight tracking-[-0.03em] text-white/90 leading-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

          {/* ── Orbital Card Field ────────────────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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

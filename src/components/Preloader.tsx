"use client";

import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[var(--background-primary)]"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        delay: 3.2,
      }}
      onAnimationComplete={onComplete}
    >
      {/* Name */}
      <motion.p
        className="text-[var(--text-primary)] select-none"
        style={{
          fontFamily: "var(--font-dancing)",
          fontSize: "clamp(2.4rem, 6vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "0.03em",
          lineHeight: 1.2,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        Lithira Kalubowila
      </motion.p>

      {/* Thin divider */}
      <motion.div
        className="h-px bg-[var(--text-primary)]/20"
        initial={{ width: 0 }}
        animate={{ width: "min(280px, 55vw)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
      />

      {/* Portfolio subtitle */}
      <motion.p
        className="tracking-[0.45em] text-[0.6rem] uppercase text-[var(--text-secondary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.8 }}
      >
        Portfolio &copy; 2026
      </motion.p>

      {/* Bottom progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-[var(--text-primary)]/15"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3.2, ease: "linear" }}
      />
    </motion.div>
  );
}

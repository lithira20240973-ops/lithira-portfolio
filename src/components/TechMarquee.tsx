"use client";

import React from "react";
import { motion } from "framer-motion";

const TECH_ITEMS = [
  "Java",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Framer Motion",
  "Tailwind CSS",
  "Three.js",
  "GSAP",
  "Premiere Pro",
  "DaVinci Resolve"
];

export function TechMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A] py-12 border-t border-white/5 z-20">
      
      {/* Top and Bottom faded edges for a sleek look */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      
      {/* Left and Right heavy fades to blend the marquee */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap items-center gap-12 md:gap-24"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            duration: 30, // Adjust this to speed up or slow down
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* 
            We duplicate the list to ensure a seamless loop. 
            The first half scrolls out while the second half takes its place.
          */}
          {[...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => (
            <span
              key={idx}
              className="text-white/20 hover:text-white/80 transition-colors duration-500 text-3xl md:text-5xl font-bold tracking-tighter uppercase cursor-default mix-blend-difference"
              style={{ fontFamily: "var(--font-neue, var(--font-space-grotesk))" }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations for the scanline effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // The scanline moves down the terminal as we scroll
  const scanlineY = useTransform(scrollYProgress, [0.3, 0.7], ["-10%", "110%"]);

  // Staged reveal settings
  const staggerDelay = 0.2;

  // Simple magnetic button effect state
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    setBtnPos({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-[140vh] w-full bg-[#0A0A0A] overflow-hidden text-white flex flex-col justify-center py-24"
    >
      {/* Background Soft Glow & Noise */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-8 md:px-12 relative z-10 sticky top-[20vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left: Oversized Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h2
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05]"
              style={{ fontFamily: "var(--font-neue, var(--font-space-grotesk))" }}
            >
              Let&apos;s build something that feels <span className="text-white/40 italic">impossible.</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-[450] max-w-md">
              Whether it&apos;s a groundbreaking digital experience or an ambitious technical challenge,
              I&apos;m ready to collaborate. Let&apos;s make it reality.
            </p>

            {/* Direct Contact Links */}
            <div className="mt-8 flex flex-col gap-2 text-sm text-white/40 font-mono tracking-wide">
              <a href="mailto:lithiratk@gmail.com" className="hover:text-white transition-colors duration-300 w-fit">
                {">"} lithiratk@gmail.com
              </a>
              <a href="https://linkedin.com/in/lithira-kalubowila" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 w-fit">
                {">"} linkedin.com/in/lithira-kalubowila
              </a>
            </div>
          </motion.div>

          {/* Right: Contact Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: staggerDelay, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            <div className="relative w-full rounded-2xl bg-[#111] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden p-[1px]">

              {/* Scanline Effect */}
              <motion.div
                className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent z-20 pointer-events-none"
                style={{ top: scanlineY }}
              />

              <div className="bg-[#0A0A0A]/90 rounded-[15px] h-full w-full flex flex-col relative z-10">

                {/* Terminal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <span className="ml-4 font-mono text-[0.65rem] text-white/40 tracking-widest uppercase">sys.contact</span>
                  </div>

                  {/* Availability Chip */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#2DFF8A]"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="text-[0.65rem] font-mono tracking-wider text-white/70 uppercase">Status: Open</span>
                  </div>
                </div>

                {/* Terminal Body (Form) */}
                <div className="p-8 lg:p-10 flex flex-col gap-6">

                  {/* Blinking Cursor Intro */}
                  <div className="flex items-center gap-2 font-mono text-sm text-white/50 mb-4">
                    <span>{`> INITIATE_CONNECTION`}</span>
                    <motion.span
                      className="w-2 h-4 bg-white/80 inline-block translate-y-[1px]"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Form Fields */}
                  <div className="flex flex-col gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: staggerDelay * 2 }}
                      className="relative group"
                    >
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-white/50 transition-colors peer"
                        placeholder="Name"
                      />
                      <label className="absolute left-0 top-3 text-white/30 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white/70 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/70">
                        Name
                      </label>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: staggerDelay * 3 }}
                      className="relative group"
                    >
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-white/50 transition-colors peer"
                        placeholder="Email"
                      />
                      <label className="absolute left-0 top-3 text-white/30 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white/70 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/70">
                        Email Address
                      </label>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: staggerDelay * 4 }}
                      className="relative group mt-2"
                    >
                      <textarea
                        required
                        rows={3}
                        className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-transparent focus:outline-none focus:border-white/50 transition-colors peer resize-none"
                        placeholder="Message"
                      />
                      <label className="absolute left-0 top-3 text-white/30 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white/70 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/70">
                        Message Data
                      </label>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: staggerDelay * 5 }}
                  >
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors text-sm">
                      Transmit
                    </button>

                    <a
                      href="/CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto h-full"
                    >
                      <motion.button
                        ref={btnRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        animate={{ x: btnPos.x, y: btnPos.y }}
                        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                        className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all text-sm flex items-center justify-center gap-2 group"
                      >
                        View My CV
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </a>
                  </motion.div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

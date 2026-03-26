"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MetallicDust } from "./MetallicDust";

// Fixed segments with explicit line-break control — no random wrapping
const segments = [
  { t: "I'm Lithira -", h: false, br: false },
  { t: " a Computer Science undergraduate", h: false, br: true },
  { t: "who blends ", h: false, br: false },
  { t: "design, development,", h: true, br: true },
  { t: "and ", h: false, br: false },
  { t: "creative media", h: true, br: false },
  { t: " to build ", h: false, br: true },
  { t: "impactful digital experiences.", h: true, br: true },
  { t: "I focus on ", h: false, br: false },
  { t: "clear interfaces,", h: true, br: true },
  { t: "sharp execution, and meaningful ", h: false, br: false },
  { t: "visual storytelling.", h: true, br: false },
] as const;

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  // Pre-compute all useTransform calls (constant length array = safe)
  const colors = segments.map((seg, i) => {
    const start = 0.18 + (i / segments.length) * 0.52;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(smooth, [start, start + 0.08], ["var(--text-muted)", seg.h ? "var(--text-primary)" : "var(--text-secondary)"]);
  });

  // Fade out dust particles as we scroll down to transition
  const dustOpacity = useTransform(smooth, [0.45, 0.75], [1, 0]);

  return (
    <section
      data-cursor-theme="about"
      ref={sectionRef}
      id="about"
      className="relative bg-[var(--background-primary)]"
      style={{ minHeight: "200vh" }}
    >
      {/* Sticky viewport-sized card */}
      <div
        className="sticky top-0 h-screen flex flex-col overflow-hidden
                    px-6 md:px-16 lg:px-24 xl:px-28
                    pt-10 pb-10 md:pt-14 md:pb-14 z-0"
      >
        {/* Subtle metallic dust */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ opacity: dustOpacity }}
        >
          <MetallicDust />
        </motion.div>

        {/* ① Top label */}
        <div className="relative z-10 mb-6 md:mb-8">
          <span className="text-[var(--text-muted)] text-[0.65rem] tracking-[0.35em] uppercase font-medium select-none">
            // About
          </span>
        </div>

        {/* ② Two-column layout: headline left | portrait + bio right */}
        <div className="flex-1 flex flex-col md:flex-row items-start gap-10 md:gap-12 lg:gap-20 relative z-10 min-h-0">

          {/* LEFT — Headline */}
          <div className="w-full md:flex-1 flex flex-col justify-center h-full">
            <motion.h2
              className="text-[clamp(1.45rem,2.6vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em]"
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {segments.map((seg, i) => (
                <span key={i}>
                  <motion.span style={{ color: colors[i] }}>{seg.t}</motion.span>
                  {seg.br && <br />}
                </span>
              ))}
            </motion.h2>
          </div>

          {/* RIGHT — Portrait + bio + CTA stacked vertically */}
          <motion.div
            className="w-full md:w-[34%] lg:w-[32%] flex flex-col gap-5 md:gap-6 h-full justify-center"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Portrait image */}
            <div className="group relative self-start w-full">
              {/* Atmospheric glow behind portrait */}
              <div className="absolute inset-0 bg-[var(--accent-primary)]/8 blur-[50px] rounded-3xl scale-[1.15] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <motion.div
                className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-medium)] shadow-[0_12px_40px_rgb(0,0,0,0.65)] cursor-pointer bg-[var(--background-elevated)]"
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/infoimage.png"
                  alt="Lithira Kalubowila"
                  fill
                  className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  priority
                />
              </motion.div>
            </div>

            {/* Bio paragraph */}
            <p className="text-[0.875rem] md:text-[0.9rem] text-[var(--text-secondary)] font-light leading-[1.9] tracking-tight">
              From front-end development to UI design, media direction, and drone-based visual
              production, I bring together technology and creativity to craft work that is both
              functional and visually compelling. I value clarity, speed, collaboration, and
              building experiences that leave a lasting impression.
            </p>

            {/* CTA */}
            <div>
              <motion.a
                href="#projects"
                className="inline-flex items-center px-6 py-[0.65rem] rounded-full border border-[var(--border-medium)] bg-[var(--background-elevated)]
                           text-[var(--text-primary)] text-[0.82rem] font-medium tracking-tight
                           shadow-[0_2px_10px_rgba(0,0,0,0.3)]
                           hover:bg-[var(--accent-soft)] hover:border-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--glow-soft)]
                           active:scale-[0.97] transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
              >
                See My Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll space — gives the color animation time to play */}
      <div className="h-[100vh]" />

      {/* Smooth atmospheric fade to blend into the Projects section */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-transparent to-[#050505] pointer-events-none z-20" />
    </section>
  );
};

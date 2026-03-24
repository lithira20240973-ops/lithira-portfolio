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

  // Fade out dust particles as we scroll down the extra 100vh
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
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden
                      px-8 md:px-16 lg:px-24 xl:px-28
                      pt-10 pb-12 md:pt-12 md:pb-16 z-0"
      >
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: dustOpacity }}>
          <MetallicDust />
        </motion.div>

        {/* ① Top label */}
        <div className="relative z-10">
          <span className="text-[var(--text-muted)] text-[0.65rem] tracking-[0.35em] uppercase font-medium select-none">
            // About
          </span>
        </div>

        {/* ② Main row — headline left, image right */}
        <div className="flex-1 flex items-center gap-10 lg:gap-16 relative z-10">

          {/* Headline */}
          <div className="flex-1" style={{ maxWidth: "min(760px, 58vw)" }}>
            <motion.h2
              className="text-[clamp(1.7rem,3vw,4.4rem)] font-bold leading-[1.08] tracking-[-0.035em]"
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
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

          {/* Portrait image — right side */}
          <motion.div
            className="flex flex-shrink-0 items-center group relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Atmospheric glow behind portrait */}
            <div className="absolute inset-0 bg-[var(--accent-primary)]/10 blur-[60px] rounded-full scale-[1.2] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <motion.div
              className="relative w-[180px] md:w-[210px] xl:w-[250px] aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--border-medium)] shadow-[0_8px_30px_rgb(0,0,0,0.6)] cursor-pointer bg-[var(--background-elevated)]"
              whileHover={{ scale: 1.04, rotate: 1.5 }}
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
          </motion.div>
        </div>

        {/* ③ Bottom-right — supporting paragraph + CTA */}
        <div className="flex justify-end relative z-10">
          <motion.div
            className="w-full max-w-[390px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.875rem] md:text-[0.925rem] text-[var(--text-secondary)] font-light leading-[1.8] tracking-tight">
              From front-end development to UI design, media direction, and drone-based visual
              production, I bring together technology and creativity to craft work that is both
              functional and visually compelling. I value clarity, speed, collaboration, and
              building experiences that leave a lasting impression.
            </p>

            <div className="mt-7">
              <motion.button
                className="px-6 py-[0.7rem] rounded-full border border-[var(--border-medium)] bg-[var(--background-elevated)]
                           text-[var(--text-primary)] text-[0.8rem] md:text-sm font-medium tracking-tight
                           shadow-[0_2px_10px_rgba(0,0,0,0.3)]
                           hover:bg-[var(--accent-soft)] hover:border-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--glow-soft)]
                           transition-all duration-300"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
              >
                See My Work
              </motion.button>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll space — gives the color animation time to play */}
      <div className="h-[100vh]" />

      {/* Smooth atmospheric fade to blend into the Projects section (#050505 base) */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-transparent to-[#050505] pointer-events-none z-20" />
    </section>
  );
};

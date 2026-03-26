"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ChromeMandala } from "./ChromeMandala";

interface EducationEntry {
  id: number;
  year: string;
  label: string; // Used for timeline display
  institution: string;
  qualification: string;
  expected?: string;
  modules?: string[];
  subjects?: { name: string; grade: string }[];
  color: string;
}

const educationData: EducationEntry[] = [
  {
    id: 1,
    year: "2025 – Present",
    label: "2025",
    institution: "IIT (University of Westminster)",
    qualification: "BSc (Hons) Computer Science",
    expected: "Expected Graduation: Sep 2028",
    modules: ["Web Development", "Object-Oriented Programming", "Database Systems"],
    color: "var(--accent-primary)",
  },
  {
    id: 2,
    year: "Jun 2024 – Sep 2024",
    label: "Jun 2024",
    institution: "IIT",
    qualification: "Foundation Certificate",
    color: "var(--text-primary)",
  },
  {
    id: 3,
    year: "2024",
    label: "2024",
    institution: "Lyceum International School, Panadura",
    qualification: "Edexcel Advanced Level",
    subjects: [
      { name: "IT", grade: "A*" },
      { name: "Business", grade: "A" },
      { name: "Economics", grade: "A" }
    ],
    color: "var(--text-secondary)",
  },
  {
    id: 4,
    year: "2022",
    label: "2022",
    institution: "Lyceum International School, Panadura",
    qualification: "GCSE Ordinary Level",
    subjects: [
      { name: "Sinhala", grade: "A*" },
      { name: "Mathematics", grade: "A" },
      { name: "Chemistry", grade: "A" },
      { name: "Biology", grade: "A" },
      { name: "English", grade: "A" },
      { name: "Computer Science", grade: "A" },
      { name: "Physics", grade: "B" },
      { name: "English Literature", grade: "B" },
    ],
    color: "var(--text-muted)",
  },
];

const softSkills = ["Leadership", "Communication", "Teamwork", "Problem-Solving", "Creativity", "Adaptability"];

// Removed GrainOverlay for performance optimization

const AlevelAccordion = ({ subjects }: { subjects: { name: string; grade: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border-t border-[var(--border-soft)] pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
      >
        Subjects & Results
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={14} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-y-2 gap-x-8 pt-4 pb-2">
              {subjects.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-[var(--border-soft)] pb-1"
                >
                  <span className="text-[0.75rem] font-medium text-[var(--text-secondary)]">{s.name}</span>
                  <span className="text-[0.75rem] font-bold text-[var(--text-primary)]">{s.grade}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EducationCard = ({ card, index, progress }: { card: EducationEntry, index: number, progress: any }) => {
  const total = educationData.length;
  const startBoundary = index / total;
  const endBoundary = (index + 1) / total;
  const buffer = 0.06; // Overlap zone for crossfade

  // Opacity with centering crossfades at boundaries (0.25, 0.5, 0.75)
  const opacity = useTransform(
    progress,
    [
      startBoundary - buffer, // Fade in start
      startBoundary + buffer, // Fade in complete
      endBoundary - buffer,   // Fade out start
      endBoundary + buffer    // Fade out complete
    ],
    index === 0
      ? [1, 1, 1, 0] // First card starts visible
      : index === total - 1
        ? [0, 1, 1, 1] // Last card stays visible
        : [0, 1, 1, 0]
  );

  // Y Shift for high-end cinematic feel
  const y = useTransform(
    progress,
    [
      startBoundary - buffer,
      startBoundary + buffer,
      endBoundary - buffer,
      endBoundary + buffer
    ],
    index === 0
      ? [0, 0, 0, -12] // First card
      : index === total - 1
        ? [12, 0, 0, 0] // Last card
        : [12, 0, 0, -12]
  );

  // Toggle pointer events to prevent clicking invisible cards underneath
  const pointerEvents = useTransform(progress, (p: number) => {
    const isActive = index === 0
      ? p < endBoundary
      : index === total - 1
        ? p > startBoundary - buffer
        : p > startBoundary - buffer && p < endBoundary + buffer;
    return isActive ? "auto" : "none";
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4"
      style={{ opacity, y, pointerEvents: pointerEvents as any }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 w-full max-w-7xl mx-auto">
        <div className="hidden md:block md:col-span-2" />

        <div className="col-span-1 md:col-span-7 flex flex-col justify-center">
          <p className="text-[clamp(0.8rem,2vw,1.25rem)] text-[var(--text-muted)] font-medium leading-tight mb-2">
            {card.institution}
          </p>

          <h3 className="text-[clamp(1.4rem,4vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-[var(--text-primary)]">
            {card.qualification}
          </h3>

          <div className="mt-5 md:mt-8 flex items-center gap-4 flex-wrap">
            <div className="bg-[var(--background-elevated)] px-4 py-2 rounded-full text-[0.8rem] font-bold tracking-widest text-[var(--accent-primary)] border border-[var(--border-medium)] shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
              {card.year}
            </div>
            {card.expected && (
              <span className="text-[0.75rem] text-[var(--text-secondary)] font-bold tracking-tight">
                // {card.expected}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col justify-center">
          <div className="space-y-4 md:space-y-6">
            {card.modules && card.modules.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-[var(--text-muted)]">
                  Featured Modules
                </h4>
                <div className="flex flex-wrap gap-2">
                  {card.modules.map((m, i) => (
                    <span
                      key={i}
                      className="text-[0.7rem] font-medium text-[var(--text-primary)] bg-[var(--background-elevated)] px-3 py-1.5 rounded-full border border-[var(--border-medium)] shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {card.subjects && <AlevelAccordion subjects={card.subjects} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ item, index, progress }: { item: EducationEntry, index: number, progress: any }) => {
  const total = educationData.length;
  const startBoundary = index / total;
  const endBoundary = (index + 1) / total;
  const buffer = 0.06;

  // Active state: sync with the card crossfade boundaries
  const isActiveProgress = useTransform(
    progress,
    [startBoundary - buffer, startBoundary + buffer, endBoundary - buffer, endBoundary + buffer],
    [0, 1, 1, 0]
  );

  // Visual props
  const dotColor = useTransform(
    progress,
    [startBoundary - buffer, startBoundary + buffer, endBoundary - buffer, endBoundary + buffer],
    ["transparent", item.color, item.color, "transparent"]
  );
  const labelOpacity = useTransform(
    progress,
    [startBoundary - buffer, startBoundary + buffer, endBoundary - buffer, endBoundary + buffer],
    [0.25, 1, 1, 0.25]
  );
  const labelScale = useTransform(
    progress,
    [startBoundary - buffer, startBoundary + buffer, endBoundary - buffer, endBoundary + buffer],
    [1, 1.05, 1.05, 1]
  );

  return (
    <div className="flex items-center gap-6">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-2 h-2 rounded-full z-10 shadow-[0_0_10px_var(--glow-soft)]"
          style={{ backgroundColor: dotColor }}
        />
        <motion.div
          className="absolute w-4 h-4 rounded-full border border-[var(--border-medium)]"
          style={{ opacity: isActiveProgress }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </div>
      <motion.span
        style={{ opacity: labelOpacity, scale: labelScale }}
        className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[var(--text-primary)]"
      >
        {item.label}
      </motion.span>
    </div>
  );
};

export function Education() {
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

  return (
    // FIX applied here: Remvoed overflow-hidden which broke the sticky positioning for 400vh
    <section
      data-cursor-theme="education"
      ref={containerRef}
      id="education"
      className="relative bg-[var(--background-secondary)] text-[var(--text-primary)]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 px-8 md:px-16 lg:px-24 overflow-hidden relative">
        {/* --- ATMOSPHERIC LIGHTING (Optimized for Performance) --- */}
        
        {/* Centered ambient glow with ultra-lightweight static mandala */}
        <div className="absolute inset-0 m-auto w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] min-w-[500px] min-h-[500px] pointer-events-none z-0 opacity-100 mix-blend-screen overflow-hidden">
           <motion.div 
             className="absolute inset-0 opacity-100 flex items-center justify-center p-8" 
             style={{ maskImage: "radial-gradient(circle at center, black 50%, transparent 95%)", WebkitMaskImage: "radial-gradient(circle at center, black 50%, transparent 95%)" }}
             animate={{ rotate: 360 }}
             transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
           >
             <ChromeMandala />
           </motion.div>
        </div>

        <div className="z-10 flex justify-between items-start relative">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[var(--text-muted)] text-[0.65rem] tracking-[0.4em] uppercase font-bold"
          >
            // Education History
          </motion.span>
          <div className="text-[var(--text-muted)] opacity-60 text-[0.6rem] tracking-[0.2em] font-medium text-right uppercase hidden md:block">
            Curriculum Vitae <br /> Vol. 02 - Ref. 2025
          </div>
        </div>

        <div className="relative flex-1">
          {educationData.map((card, index) => (
            <EducationCard
              key={card.id}
              card={card}
              index={index}
              progress={smoothProgress}
            />
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8 items-end z-10">

          <div className="hidden md:flex col-span-3 h-full items-end pb-2">
            <div className="flex flex-col gap-8">
              {educationData.map((item, i) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={i}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 flex flex-col md:items-end gap-10">
            <div className="w-full h-[1px] bg-[var(--border-soft)] md:hidden" />
            <div className="flex flex-col md:items-end gap-5">
              <h4 className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-[var(--text-muted)]">
                Core Competencies
              </h4>
              <div className="flex flex-wrap md:justify-end gap-2.5 max-w-2xl">
                {softSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full border border-[var(--border-medium)] bg-[var(--background-elevated)] text-[0.75rem] font-bold tracking-tight text-[var(--text-primary)] shadow-[0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute left-8 md:left-16 lg:left-24 top-0 bottom-0 w-[1px] bg-[var(--border-soft)] z-0" />
    </section>
  );
}

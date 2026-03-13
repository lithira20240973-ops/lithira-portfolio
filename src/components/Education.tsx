"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface EducationEntry {
  id: number;
  year: string;
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
    institution: "IIT (University of Westminster)",
    qualification: "BSc (Hons) Computer Science",
    expected: "Expected Graduation: Sep 2028",
    modules: ["Web Development", "Object-Oriented Programming", "Database Systems"],
    color: "#FF4D2D",
  },
  {
    id: 2,
    year: "Jun 2024 – Sep 2024",
    institution: "Informatics Institute of Technology (IIT)",
    qualification: "Foundation Certificate in Higher Education",
    color: "#2D7FFF",
  },
  {
    id: 3,
    year: "2024",
    institution: "Lyceum International School, Panadura",
    qualification: "Edexcel Advanced Level",
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
    color: "#2DFF8A",
  },
  {
    id: 4,
    year: "2022",
    institution: "Lyceum International School, Panadura",
    qualification: "GCSE Ordinary Level",
    color: "#FFC72D",
  },
];

const softSkills = ["Leadership", "Communication", "Teamwork", "Problem-Solving", "Creativity", "Adaptability"];

const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const AlevelAccordion = ({ subjects }: { subjects: { name: string; grade: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border-t border-[#111]/10 pt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[#111]/40 hover:text-[#111] transition-colors group pointer-events-auto"
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
            className="overflow-hidden pointer-events-auto"
          >
            <div className="grid grid-cols-2 gap-y-2 gap-x-8 pt-4 pb-2">
              {subjects.map((s, i) => (
                <div 
                  key={i}
                  className="flex justify-between items-center border-b border-[#111]/5 pb-1"
                >
                  <span className="text-[0.75rem] font-medium text-[#111]/60">{s.name}</span>
                  <span className="text-[0.75rem] font-bold text-[#111]">{s.grade}</span>
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
  const stepSize = 1 / educationData.length;
  const start = index * stepSize;
  const end = (index + 1) * stepSize;
  
  // Transitions: 250-450ms equivalent in scroll range
  // We use a tighter transition window (0.05 of the scroll)
  const transitionWindow = 0.05;

  // Opacity: fade in at start, fade out at end
  const opacity = useTransform(
    progress, 
    [start, start + transitionWindow, end - transitionWindow, end], 
    [0, 1, 1, 0]
  );

  // Y Shift: slight vertical movement for incoming/outgoing
  const y = useTransform(
    progress,
    [start, start + transitionWindow, end - transitionWindow, end],
    [10, 0, 0, -10]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, y }}
    >
      <div className="grid grid-cols-12 gap-8 md:gap-16 w-full max-w-7xl mx-auto px-8 md:px-0">
        
        {/* Left: Spacer for Timeline */}
        <div className="hidden md:block col-span-2" />

        {/* Center: Main Content */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
          <p className="text-[clamp(0.875rem,2vw,1.25rem)] text-[#111]/40 font-medium font-[var(--font-ibm-plex)] leading-tight mb-2">
            {card.institution}
          </p>
          
          <h3 className="text-[clamp(1.75rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-[#111] font-[var(--font-inter)] pointer-events-auto">
            {card.qualification}
          </h3>

          <div className="mt-8 flex items-center gap-6 pointer-events-auto">
            <div className="bg-[#111]/5 px-4 py-2 rounded-full text-[0.8rem] font-bold tracking-tight text-[#111]/60 border border-[#111]/10">
              {card.year}
            </div>
            {card.expected && (
              <span className="text-[0.8rem] text-[#FF4D2D] font-bold tracking-tight">
                // {card.expected}
              </span>
            )}
          </div>
        </div>

        {/* Right: Detailed Notes */}
        <div className="col-span-12 md:col-span-3 flex flex-col justify-center pointer-events-auto">
          <div className="space-y-6">
            {card.modules && card.modules.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-[0.65rem] uppercase tracking-[0.25em] font-bold text-[#111]/30">
                  Featured Modules
                </h4>
                <div className="flex flex-wrap gap-2">
                  {card.modules.map((m, i) => (
                    <span 
                      key={i} 
                      className="text-[0.7rem] font-medium text-[#111]/50 bg-[#111]/5 px-3 py-1.5 rounded-full border border-[#111]/5"
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

  // Reveal Animation - Trigger earlier for instant visibility
  const sectionReveal = useScroll({
    target: containerRef,
    offset: ["start 90%", "start start"]
  });
  
  // Reduced motion and faster fade for the "instant" feel
  const revealOpacity = useTransform(sectionReveal.scrollYProgress, [0, 0.15], [0, 1]);
  const revealY = useTransform(sectionReveal.scrollYProgress, [0, 0.15], ["5vh", "0vh"]);

  return (
    <section 
      ref={containerRef} 
      id="education" 
      className="relative bg-[#F2F2F0] text-[#111] overflow-hidden" 
      style={{ height: `${educationData.length * 100}vh` }}
    >
      <GrainOverlay />
      
      <motion.div 
        style={{ opacity: revealOpacity, y: revealY }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 px-8 md:px-16 lg:px-24"
      >
        
        {/* Label Header */}
        <div className="z-10 flex justify-between items-start">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#111]/20 text-[0.65rem] tracking-[0.4em] uppercase font-bold"
          >
            // Education History
          </motion.span>
          <div className="text-[#111]/10 text-[0.6rem] tracking-[0.2em] font-medium text-right uppercase hidden md:block">
            Curriculum Vitae <br/> Vol. 02 - Ref. 2025
          </div>
        </div>

        {/* Center Spotlight - THE LOCKED AREA */}
        <div className="relative flex-1 py-12">
          {educationData.map((card, index) => (
            <EducationCard 
              key={card.id} 
              card={card} 
              index={index} 
              progress={smoothProgress} 
            />
          ))}
        </div>

        {/* Footer: Timeline + Skills */}
        <div className="grid grid-cols-12 gap-8 items-end z-10">
          
          {/* Timeline Spine */}
          <div className="col-span-12 md:col-span-3 h-full flex items-end">
            <div className="flex flex-col gap-10 mb-2">
              {educationData.map((item, i) => {
                const step = 1 / educationData.length;
                const activeStart = i * step;
                const activeEnd = (i + 1) * step;

                // Sync dot highlighting precisely
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const dotColor = useTransform(
                  smoothProgress, 
                  [activeStart - 0.05, activeStart, activeEnd - 0.05, activeEnd], 
                  ["rgba(17,17,17,0.1)", item.color, item.color, "rgba(17,17,17,0.1)"]
                );
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const dotScale = useTransform(
                   smoothProgress,
                   [activeStart - 0.05, activeStart, activeEnd - 0.05, activeEnd],
                   [1, 1.4, 1.4, 1]
                );

                return (
                  <div 
                    key={item.id}
                    className="flex items-center gap-6"
                  >
                    <div className="relative flex items-center justify-center">
                       <motion.div 
                         className="w-1.5 h-1.5 rounded-full z-10"
                         style={{ backgroundColor: dotColor, scale: dotScale }}
                       />
                       <motion.div 
                         className="absolute w-4 h-4 rounded-full border border-[#111]/10"
                         style={{ borderColor: dotColor }}
                         animate={{ scale: [1, 1.2, 1] }}
                         transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                       />
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[#111]/25">
                      {item.year.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soft Skills Panel - Sticky visible */}
          <div className="col-span-12 md:col-span-9 flex flex-col md:items-end gap-10">
             <div className="w-full h-[1px] bg-[#111]/5 md:hidden" />
             <div className="flex flex-col md:items-end gap-5">
                <h4 className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-[#111]/20">
                  Core Competencies
                </h4>
                <div className="flex flex-wrap md:justify-end gap-2.5 max-w-2xl">
                  {softSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full border border-[#111]/10 text-[0.75rem] font-bold tracking-tight text-[#111]/40 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
             </div>
          </div>
        </div>

      </motion.div>

      {/* Decorative center line */}
      <div className="absolute left-8 md:left-16 lg:left-24 top-0 bottom-0 w-[1px] bg-[#111]/5 z-0" />
    </section>
  );
}

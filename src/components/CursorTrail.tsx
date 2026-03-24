"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type Theme = "home" | "about" | "projects" | "education" | "tech" | "contact" | "default";
type HoverState = "default" | "link" | "text" | "card" | "input";

export default function CursorTrail() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const [theme, setTheme] = useState<Theme>("home");
  const [hoverState, setHoverState] = useState<HoverState>("default");

  const [cursorText, setCursorText] = useState("");
  const [isClicking, setIsClicking] = useState(false);

  // Motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth elegant motion
  const innerX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const innerY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  // Outer ring lags a bit more, creating the "premium trail" feel
  const outerX = useSpring(mouseX, { stiffness: 350, damping: 35, mass: 0.3 });
  const outerY = useSpring(mouseY, { stiffness: 350, damping: 35, mass: 0.3 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;

      // 1. Detect Page/Section Theme using closest
      const themeNode = target.closest("[data-cursor-theme]");
      if (themeNode) {
        const detectedTheme = themeNode.getAttribute("data-cursor-theme") as Theme;
        if (detectedTheme && detectedTheme !== theme) {
          setTheme(detectedTheme);
        }
      } else {
        setTheme("default");
      }

      // 2. Detect Specific Hover States
      const link = target.closest("a, button, [role='button'], input[type='button'], input[type='submit']");
      const card = target.closest("[data-cursor='card']");
      const text = target.closest("p, h1, h2, h3, h4, h5, h6, li, blockquote, caption");
      const input = target.closest("input[type='text'], input[type='email'], textarea");

      if (card) {
        setHoverState("card");
        setCursorText(card.getAttribute("data-cursor-text") || "VIEW");
      } else if (input) {
        setHoverState("input");
        setCursorText("");
      } else if (link) {
        setHoverState("link");
        setCursorText("");
      } else if (text) {
        setHoverState("text");
        setCursorText("");
      } else {
        setHoverState("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible, theme]);

  if (isTouch) return null;

  // --- Dynamic Theme Generators ---

  // Base designs for each page theme (applied when hoverState === 'default')
  const getThemeOuterBase = (t: Theme) => {
    const base = {
      opacity: isVisible ? 1 : 0,
      scale: isClicking ? 0.85 : 1,
      rotate: 0,
      borderRadius: "50%",
      borderStyle: "solid",
    };

    switch (t) {
      case "home": // Bold, cinematic
        return { ...base, width: 44, height: 44, borderColor: "rgba(17,17,17,0.4)", borderWidth: 1.5, backgroundColor: "rgba(17,17,17,0)" };
      case "about": // Soft, intimate halo
        return { ...base, width: 56, height: 56, borderColor: "rgba(17,17,17,0.15)", borderWidth: 1, backgroundColor: "rgba(17,17,17,0.02)", backdropFilter: "blur(2px)" };
      case "projects": // Active, ready to expand
        return { ...base, width: 36, height: 36, borderColor: "rgba(255,255,255,0.8)", borderWidth: 1.5, backgroundColor: "rgba(255,255,255,0.05)", mixBlendMode: "difference" as any };
      case "education": // Structured, grid-aligned (square)
        return { ...base, width: 40, height: 40, borderRadius: "8px", borderColor: "rgba(17,17,17,0.3)", borderWidth: 1.5, backgroundColor: "transparent" };
      case "tech": // Digital, technical (diamond rotating)
        return { ...base, width: 44, height: 44, borderRadius: "4px", borderColor: "rgba(255, 255, 255, 0.4)", borderWidth: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", rotate: 45 };
      case "contact": // Intentional, solid
        return { ...base, width: 40, height: 40, borderColor: "rgba(255,255,255,0.5)", borderWidth: 2, backgroundColor: "rgba(255,255,255,0)", mixBlendMode: "difference" as any };
      default:
        return { ...base, width: 36, height: 36, borderColor: "rgba(17,17,17,0.25)", borderWidth: 1, backgroundColor: "transparent" };
    }
  };

  const getThemeInnerBase = (t: Theme) => {
    const base = { opacity: isVisible ? 1 : 0, borderRadius: "50%", rotate: 0 };
    switch (t) {
      case "home": return { ...base, width: 6, height: 6, backgroundColor: "rgba(17,17,17,1)" };
      case "about": return { ...base, width: 4, height: 4, backgroundColor: "rgba(17,17,17,0.6)" };
      case "projects": return { ...base, width: 8, height: 8, backgroundColor: "rgba(255,255,255,1)", mixBlendMode: "difference" as const };
      case "education": return { ...base, width: 6, height: 6, borderRadius: "2px", backgroundColor: "rgba(17,17,17,0.8)" };
      case "tech": return { ...base, width: 8, height: 8, borderRadius: "1px", backgroundColor: "rgba(255, 255, 255, 1)", rotate: 45, filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))" };
      case "contact": return { ...base, width: 5, height: 5, backgroundColor: "rgba(255,255,255,1)", mixBlendMode: "difference" as const };
      default: return { ...base, width: 6, height: 6, backgroundColor: "rgba(17,17,17,1)" };
    }
  };

  // Calculate final outer/inner styles by merging base theme with hover logic
  const outerBase = getThemeOuterBase(theme);
  const innerBase = getThemeInnerBase(theme);

  // --- Outer Ring Overrides for Hover States ---
  let activeOuter = { ...outerBase };
  if (hoverState === "link") {
    activeOuter = {
      ...activeOuter,
      width: (activeOuter.width as number) + 16,
      height: (activeOuter.height as number) + 16,
      backgroundColor: theme === "tech" ? "rgba(255,255,255,0.15)" : theme === "contact" || theme === "projects" ? "rgba(255,255,255,0.1)" : "rgba(17,17,17,0.05)",
      borderWidth: 2,
      scale: isClicking ? 0.9 : 1,
    };
  } else if (hoverState === "text") {
    activeOuter = {
      ...activeOuter,
      width: 2,
      height: 32,
      borderRadius: "2px",
      backgroundColor: "transparent",
      borderColor: "transparent",
      rotate: 0,
    };
  } else if (hoverState === "input") {
    activeOuter = {
      ...activeOuter,
      width: 4,
      height: 24,
      borderRadius: "2px",
      borderColor: "transparent",
      backgroundColor: theme === "contact" ? "rgba(255,255,255,0.6)" : "rgba(17,17,17,0.5)",
      rotate: 0,
    };
  } else if (hoverState === "card") {
    activeOuter = {
      ...activeOuter,
      width: 86,
      height: 86,
      borderRadius: "50%",
      backgroundColor: theme === "projects" || theme === "contact" ? "rgba(255,255,255,1)" : "rgba(17,17,17,1)",
      borderColor: "transparent",
      rotate: 0,
      mixBlendMode: "normal" as const, // Override any difference blending so text is legible
      backdropFilter: "none",
    };
  }

  // --- Inner Dot Overrides for Hover States ---
  let activeInner = { ...innerBase };
  if (hoverState === "link" || hoverState === "card") {
    activeInner = { ...activeInner, opacity: 0, width: 0, height: 0 };
  } else if (hoverState === "text") {
    activeInner = {
      ...activeInner,
      width: 2,
      height: 28,
      borderRadius: "2px",
      backgroundColor: theme === "tech" ? "rgba(255,255,255,0.8)" : theme === "projects" || theme === "contact" ? "rgba(255,255,255,0.8)" : "rgba(17,17,17,0.8)",
      rotate: 0,
    };
  } else if (hoverState === "input") {
    activeInner = { ...activeInner, opacity: 0, width: 0, height: 0 };
  }

  // Theme-driven text color for card hover
  const labelColor = theme === "projects" || theme === "contact" ? "#000" : "#fff";

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* --- Outer Architectural Ring --- */}
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          position: "fixed",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center center",
        }}
        animate={activeOuter}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence>
          {hoverState === "card" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-[10px] uppercase font-bold tracking-[0.2em]"
              style={{ color: labelColor, pointerEvents: 'none', mixBlendMode: 'normal' }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Tech Theme Segmented/Tech Accents (Internal to outer ring) */}
        {theme === "tech" && hoverState === "default" && (
          <motion.div
            className="absolute inset-[-4px] border border-dashed border-white/30 rounded-[6px]"
            animate={{ rotate: -90 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* --- Inner Precision Core --- */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
          position: "fixed",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          transformOrigin: "center center",
        }}
        animate={activeInner}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}

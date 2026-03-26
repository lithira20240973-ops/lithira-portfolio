"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#",          label: "Home" },
  { href: "#about",     label: "About" },
  { href: "#projects",  label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#tech-stack",label: "Tech" },
  { href: "#contact",   label: "Contact" },
];

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden absolute top-5 right-5 z-50">
      {/* Hamburger toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation menu"
        className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-black/30 backdrop-blur-sm border border-black/10"
      >
        <span className={`block w-5 h-[1.5px] bg-black transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-black transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-black transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
      </button>

      {/* Full-screen slide-in drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/96 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-black/50 text-3xl leading-none"
            >
              &times;
            </button>

            {/* Copyright at top-left */}
            <span className="absolute top-6 left-6 text-black/40 text-[11px] tracking-widest uppercase">
              &copy; Lithira D&amp;M
            </span>

            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  if (l.href === "#") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
                  setOpen(false);
                }}
                className="text-[2.2rem] font-bold tracking-tight text-black/70 hover:text-black active:text-black transition-colors uppercase"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  return (
    <>
      {/* ── Desktop nav (md+) ─────────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 w-full px-6 pt-6 md:px-10 md:pt-7 flex justify-between items-start z-20 text-black/80 text-[14px] md:text-[15px] font-medium tracking-widest uppercase">
        <div className="hidden md:block w-1/3">
          <span>&copy; Lithira Design &amp; Media</span>
        </div>
        <div className="w-full md:w-1/3 flex justify-between md:justify-center gap-10 md:gap-20">
          <div className="md:hidden">
            <span>&copy; Lithira D&amp;M</span>
          </div>
          <div className="hidden md:flex gap-6 lg:gap-10 text-xs md:text-[13px] font-medium tracking-widest uppercase">
            <a href="#" className="hover:text-black transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Home</a>
            <a href="#about"     className="hover:text-black transition-colors">About</a>
            <a href="#projects"  className="hover:text-black transition-colors">Projects</a>
            <a href="#education" className="hover:text-black transition-colors">Education</a>
            <a href="#tech-stack"className="hover:text-black transition-colors">Tech</a>
          </div>
        </div>
        <div className="hidden md:flex w-1/3 justify-end">
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
      </nav>

      {/* ── Mobile hamburger + drawer (< md) ─────────────────────────────── */}
      <MobileNav />
    </>
  );
}

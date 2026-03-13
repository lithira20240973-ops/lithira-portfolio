"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Preloader } from "@/components/Preloader";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Droneography } from "@/components/Droneography";
import { Education } from "@/components/Education";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <motion.main
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
          <Hero />
        </div>

        {/* Subsequent sections cover the Hero */}
        <div className="relative z-10">
          <About />
          <Projects />
          <Droneography />
          <Education />

          <section
            id="contact"
            className="min-h-[70vh] w-full flex items-center justify-center bg-[#0a0a0a] border-t border-white/5"
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white/10">
              Contact section
            </h2>
          </section>
        </div>
      </motion.main>
    </>
  );
}

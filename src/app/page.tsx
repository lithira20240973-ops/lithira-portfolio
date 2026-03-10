"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Preloader } from "@/components/Preloader";
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
        className="min-h-screen relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
          <Hero />
        </div>
        
        {/* Subsequent sections need relative positioning, explicit backgrounds, and a higher z-index to cover the fixed Hero */}
        <div className="relative z-10 bg-[#efefef]">
          <section id="about" className="min-h-screen w-full flex items-center justify-center border-t border-black/10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black/20">About section</h2>
          </section>

          <section id="projects" className="min-h-screen w-full flex items-center justify-center border-t border-black/10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-black/20">Projects section</h2>
          </section>

          <section id="contact" className="min-h-[60vh] w-full flex items-center justify-center border-t border-black/10 bg-[#111111] text-white">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white/20">Contact section</h2>
          </section>
        </div>
      </motion.main>
    </>
  );
}

"use client";

import Image from "next/image";
import { Navbar } from "./Navbar";
import { SocialRail } from "./SocialRail";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollYProgress } = useScroll();

  // Transform values based on scroll progress (0 to 1 as we scroll past the hero)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Move text laterally from right to left
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-full h-full overflow-hidden bg-gray-100">

        {/* Background Image / Portrait with Parallax */}
        <motion.div
          className="absolute inset-0 z-0 bg-white"
          style={{ y: imageY }}
        >
          {/* Actual portrait image */}
          <Image
            src="/images/portrait.png"
            alt="Lithira Portrait"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Overlay Layout */}
        <Navbar />
        <SocialRail />

        {/* Role Text Bottom Right */}
        <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 text-right z-20 text-[#111]">
          <p className="text-2xl md:text-5xl font-bold tracking-tighter mb-0 md:mb-1">Web Designer</p>
          <p className="text-xl md:text-3xl font-medium text-black/70 tracking-tight">Art Director</p>
        </div>

        {/* Huge Name Text with combined scroll translation and continuous marquee */}
        <motion.div
          style={{ x: textX }}
          className="absolute top-1/2 left-0 -translate-y-[45%] md:-translate-y-1/2 w-full z-10 pointer-events-none flex overflow-visible mix-blend-difference"
        >
          <motion.h1
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear"
            }}
            className="text-[40vw] sm:text-[30vw] md:text-[22vw] lg:text-[18vw] leading-[0.8] font-[500] tracking-[-0.05em] text-white flex whitespace-nowrap w-fit"
          >
            <span className="pr-4 md:pr-8">Lithira Kalubowila - </span>
            <span className="pr-4 md:pr-8">Lithira Kalubowila - </span>
            {/* Duplicated for seamless marquee looping at -50% translation */}
            <span className="pr-4 md:pr-8">Lithira Kalubowila - </span>
            <span className="pr-4 md:pr-8">Lithira Kalubowila - </span>
          </motion.h1>
        </motion.div>

      </div>
    </div>
  );
}

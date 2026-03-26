"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message);
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 8000);
    }
  };

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
      data-cursor-theme="contact"
      id="contact"
      ref={containerRef}
      className="relative min-h-[140vh] w-full bg-[var(--background-primary)] overflow-hidden text-[var(--text-primary)] flex flex-col justify-center py-24"
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

      <div className="container mx-auto max-w-7xl px-5 md:px-8 lg:px-12 relative z-10 sticky top-[20vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Oversized Headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h2
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tighter leading-[1.05]"
              style={{ fontFamily: "var(--font-neue, var(--font-space-grotesk))" }}
            >
              Let&apos;s build something that feels <span className="text-[var(--text-muted)] italic">impossible.</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl font-[450] max-w-md">
              Whether it&apos;s a groundbreaking digital experience or an ambitious technical challenge,
              I&apos;m ready to collaborate. Let&apos;s make it reality.
            </p>

            {/* Direct Contact Links */}
            <div className="mt-8 flex flex-col gap-2 text-sm text-white/40 font-mono tracking-wide">
              <a href="mailto:lithiratk@gmail.com" className="hover:text-white transition-colors duration-300 w-fit">
                {">"} mail: lithiratk@gmail.com
              </a>
              <a href="https://linkedin.com/in/lithira-kalubowila" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 w-fit">
                {">"} linkedin.com/in/lithira-kalubowila
              </a>
              <a href="https://github.com/lithira20240973-ops" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 w-fit">
                {">"} github.com/lithira20240973-ops
              </a>
              <a href="https://www.instagram.com/lithira.kalubowila?igsh=c2NlcjRobnZwYzNr&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 w-fit">
                {">"} instagram.com/lithira.kalubowila
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
            <div className="relative w-full rounded-2xl bg-[var(--background-elevated)] border border-[var(--border-medium)] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.9),inset_0_1px_0_var(--border-medium),0_0_50px_var(--glow-soft)] overflow-hidden p-[1px]">

              {/* Scanline Effect */}
              <motion.div
                className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-white/5 to-transparent z-20 pointer-events-none"
                style={{ top: scanlineY }}
              />

              <div className="bg-[var(--background-primary)]/90 rounded-[15px] h-full w-full flex flex-col relative z-10">

                {/* Terminal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-medium)] bg-[var(--background-secondary)]/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <span className="ml-4 font-mono text-[0.65rem] text-white/40 tracking-widest uppercase">sys.contact</span>
                  </div>

                  {/* Availability Chip */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--background-elevated)] border border-[var(--border-soft)]">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="text-[0.65rem] font-mono tracking-wider text-[var(--accent-primary)] uppercase font-semibold">Status: Open</span>
                  </div>
                </div>

                {/* Terminal Body (Form) */}
                <div className="p-5 md:p-8 lg:p-10 flex flex-col gap-6">

                  {/* Blinking Cursor Intro */}
                  <div className="flex items-center gap-2 font-mono text-sm text-white/50 mb-4">
                    <span>{`> INITIATE_CONNECTION`}</span>
                    <motion.span
                      className="w-2 h-4 bg-white/80 inline-block translate-y-[1px]"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Form Fields & Submit Wrapper */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[var(--background-primary)]/50 border border-[var(--border-soft)] rounded-lg px-4 py-4 text-[var(--text-primary)] placeholder-transparent focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--background-secondary)] hover:border-[var(--border-medium)] hover:bg-[var(--background-secondary)] transition-all peer shadow-inner"
                        placeholder="Name"
                      />
                      <label className="absolute left-4 top-4 text-[var(--text-muted)] text-sm transition-all pointer-events-none peer-focus:-top-3 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:text-[var(--accent-primary)] peer-focus:bg-[var(--background-primary)] peer-focus:px-2 peer-focus:py-0.5 peer-focus:rounded-full peer-focus:border peer-focus:border-[var(--border-soft)] peer-valid:-top-3 peer-valid:left-2 peer-valid:text-[0.65rem] peer-valid:text-[var(--text-secondary)] peer-valid:bg-[var(--background-primary)] peer-valid:px-2 peer-valid:py-0.5 peer-valid:rounded-full peer-valid:border peer-valid:border-[var(--border-soft)]">
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[var(--background-primary)]/50 border border-[var(--border-soft)] rounded-lg px-4 py-4 text-[var(--text-primary)] placeholder-transparent focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--background-secondary)] hover:border-[var(--border-medium)] hover:bg-[var(--background-secondary)] transition-all peer shadow-inner"
                        placeholder="Email"
                      />
                      <label className="absolute left-4 top-4 text-[var(--text-muted)] text-sm transition-all pointer-events-none peer-focus:-top-3 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:text-[var(--accent-primary)] peer-focus:bg-[var(--background-primary)] peer-focus:px-2 peer-focus:py-0.5 peer-focus:rounded-full peer-focus:border peer-focus:border-[var(--border-soft)] peer-valid:-top-3 peer-valid:left-2 peer-valid:text-[0.65rem] peer-valid:text-[var(--text-secondary)] peer-valid:bg-[var(--background-primary)] peer-valid:px-2 peer-valid:py-0.5 peer-valid:rounded-full peer-valid:border peer-valid:border-[var(--border-soft)]">
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
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[var(--background-primary)]/50 border border-[var(--border-soft)] rounded-lg px-4 py-4 text-[var(--text-primary)] placeholder-transparent focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--background-secondary)] hover:border-[var(--border-medium)] hover:bg-[var(--background-secondary)] transition-all peer shadow-inner resize-none min-h-[120px]"
                        placeholder="Message"
                      />
                      <label className="absolute left-4 top-4 text-[var(--text-muted)] text-sm transition-all pointer-events-none peer-focus:-top-3 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:text-[var(--accent-primary)] peer-focus:bg-[var(--background-primary)] peer-focus:px-2 peer-focus:py-0.5 peer-focus:rounded-full peer-focus:border peer-focus:border-[var(--border-soft)] peer-valid:-top-3 peer-valid:left-2 peer-valid:text-[0.65rem] peer-valid:text-[var(--text-secondary)] peer-valid:bg-[var(--background-primary)] peer-valid:px-2 peer-valid:py-0.5 peer-valid:rounded-full peer-valid:border peer-valid:border-[var(--border-soft)]">
                        Message Data
                      </label>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: staggerDelay * 5 }}
                    >
                      <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className={`w-full sm:w-auto px-8 py-3.5 font-bold tracking-wide rounded-lg transition-all text-[0.85rem] uppercase relative overflow-hidden ${
                          status === 'success' ? 'bg-[var(--accent-primary)] text-[var(--background-primary)]' : status === 'error' ? 'bg-[var(--background-elevated)] text-[var(--text-muted)] border border-[var(--border-medium)]' : 'bg-[var(--text-primary)] text-[var(--background-primary)] hover:bg-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--glow-soft)]'
                        }`}
                      >
                        {status === 'loading' ? 'Transmitting...' : status === 'success' ? 'Transmission Sent' : status === 'error' ? 'Failed' : 'Transmit'}
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
                        className="w-full sm:w-auto px-8 py-3.5 bg-[var(--background-elevated)] border border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] hover:shadow-[0_0_15px_var(--glow-soft)] font-medium tracking-wide rounded-lg transition-all text-[0.85rem] flex items-center justify-center gap-2 group shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                      >
                        View My CV
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </a>
                    
                    {/* Error Message Display */}
                    <AnimatePresence>
                      {status === 'error' && errorMessage && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="pt-2 sm:pt-0 sm:pl-4 text-red-500 text-xs font-mono tracking-wide"
                        >
                          {errorMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    
                  </motion.div>
                  </form>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { HeroVisual } from './HeroVisual';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-between overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16181E] border border-[rgba(215,226,234,0.18)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-kanit font-medium text-xs tracking-[0.2em] text-[#D7E2EA] uppercase">
              {personalInfo.eyebrow}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-medium text-emerald-400">
            <CheckCircle className="w-3 h-3" />
            <span>Open for Projects & Roles</span>
          </div>
        </motion.div>

        {/* Two-Column Editorial Layout: Left Typography, Right 3D Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Oversized Kanit Typography */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-kanit font-black tracking-[-0.03em] leading-[0.9] sm:leading-[0.88] uppercase mb-6"
              style={{
                fontSize: 'clamp(2.1rem, 7.5vw, 6.8rem)',
              }}
            >
              <span className="block hero-heading drop-shadow-sm">MARKETING</span>
              <span className="block hero-heading">MEETS</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D7E2EA] via-cyan-300 to-blue-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.25)]">
                INTELLIGENCE.
              </span>
            </motion.h1>

            {/* Introduction paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-[#D7E2EA]/85 font-light leading-relaxed max-w-2xl mb-8"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* Strategic Value Pillars Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {['SEO & GEO Visibility', 'Performance Marketing', 'E-commerce Ops', 'Content Strategy'].map(
                (pillar) => (
                  <span
                    key={pillar}
                    className="px-3.5 py-1.5 rounded-lg bg-[#14151A] border border-[rgba(215,226,234,0.12)] text-xs font-kanit tracking-wider text-[#D7E2EA]/90 flex items-center gap-1.5 hover:border-cyan-400/40 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {pillar}
                  </span>
                )
              )}
            </motion.div>

            {/* Location & Status Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8E99A4]"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Based in India</span>
              </div>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="text-[#8E99A4]/90">Available for Global Roles & Consulting</span>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Metallic Sphere & GEO Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-8 border-t border-[rgba(215,226,234,0.1)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
      >
        <p className="font-kanit text-xs sm:text-sm tracking-[0.12em] text-[#8E99A4] uppercase">
          {personalInfo.bottomBarText}
        </p>

        <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="#projects"
            className="w-full xs:w-auto flex items-center justify-center gap-1.5 text-xs font-kanit tracking-[0.14em] uppercase text-[#D7E2EA]/70 hover:text-cyan-400 transition-colors py-2 px-3"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>

          <a
            href="#contact"
            className="w-full xs:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-kanit font-bold text-xs tracking-[0.15em] uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span className="text-black group-hover:text-white transition-colors">
              LET'S WORK TOGETHER
            </span>
            <ArrowUpRight className="w-4 h-4 text-black group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

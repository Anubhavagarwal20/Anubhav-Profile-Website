import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Search, Sparkles, Bot, Zap, TrendingUp } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics-based spring interpolation
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations based on mouse position
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const translateZ = useTransform(smoothX, [-0.5, 0.5], [0, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-orange-500/15 blur-3xl -z-10 animate-pulse-glow" />
      <div className="absolute w-72 h-72 rounded-full bg-cyan-400/10 blur-2xl top-1/4 left-1/4 -z-10" />

      {/* 3D Tilting Canvas Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Outer Orbital Cyan Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="absolute w-[240px] h-[240px] xs:w-[290px] xs:h-[290px] sm:w-[420px] sm:h-[420px] rounded-full border border-cyan-400/25 border-dashed"
          style={{ transform: 'rotateX(65deg) rotateY(15deg)' }}
        >
          {/* Orbital Satellite Node */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-cyan-400 shadow-[0_0_16px_#00F0FF] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </motion.div>

        {/* Counter Orbital Orange/Amber Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
          className="absolute w-[200px] h-[200px] xs:w-[240px] xs:h-[240px] sm:w-[350px] sm:h-[350px] rounded-full border border-orange-500/25"
          style={{ transform: 'rotateX(-60deg) rotateY(-25deg)' }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-orange-500 shadow-[0_0_14px_#FF6B00] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white" />
          </div>
        </motion.div>

        {/* Central Floating Metallic Chrome Sphere */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotateZ: [0, 4, -4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-56 sm:h-56 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_20px_rgba(255,255,255,0.4),0_0_40px_rgba(0,240,255,0.25)] flex items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #A6B4C0 22%, #383E48 55%, #101216 85%, #050608 100%)',
          }}
        >
          {/* Specular Highlight Sheen */}
          <div className="absolute top-4 left-6 w-16 h-8 rounded-full bg-white/50 blur-sm transform -rotate-45 pointer-events-none" />
          
          {/* Secondary rim lighting */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-orange-500/20 blur-xl pointer-events-none" />

          {/* Core Symbol within Sphere */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 py-3 sm:p-4 max-w-full">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center mb-1 text-cyan-300 shadow-inner">
              <Bot className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <span className="font-kanit font-extrabold text-[10px] xs:text-[11px] sm:text-[13px] tracking-[0.12em] sm:tracking-[0.16em] text-white uppercase drop-shadow whitespace-nowrap">
              ANUBHAV AGARWAL
            </span>
            <span className="text-[7.5px] xs:text-[8px] sm:text-[10px] text-cyan-300/90 font-mono tracking-wider uppercase whitespace-nowrap mt-0.5">
              DIGITAL MARKETER
            </span>
          </div>
        </motion.div>

        {/* Floating AI Search Interaction Pill (Top-Right) */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            x: [4, -4, 4],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-3 right-0 sm:-right-4 z-20 bg-[#12141A]/90 backdrop-blur-xl border border-cyan-400/35 rounded-2xl p-2 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,255,0.15)] max-w-[170px] xs:max-w-[200px] sm:max-w-[240px]"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Search className="w-3 h-3" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-kanit uppercase tracking-wider text-cyan-300 font-semibold truncate">
              Perplexity & ChatGPT Query
            </span>
          </div>
          <p className="text-[9px] sm:text-[11px] text-[#D7E2EA] font-medium leading-tight">
            "Best AI search & GEO growth strategies"
          </p>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1 font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cited in LLM Answer
            </span>
            <span className="text-[#8E99A4] font-mono">98% Match</span>
          </div>
        </motion.div>

        {/* Floating SEO & Traffic Metric Card (Bottom-Left) */}
        <motion.div
          animate={{
            y: [8, -8, 8],
            x: [-4, 4, -4],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute -bottom-4 left-0 sm:-left-4 z-20 bg-[#14151C]/90 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-2 sm:p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(255,107,0,0.12)] max-w-[160px] xs:max-w-[180px] sm:max-w-[210px]"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] sm:text-[10px] font-kanit uppercase tracking-wider text-orange-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-400 flex-shrink-0" />
              Entity Authority
            </span>
            <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono">
              ACTIVE
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-kanit font-extrabold text-base sm:text-lg text-white">AI-SOV</span>
            <span className="text-emerald-400 text-[10px] sm:text-xs font-mono flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> High Impact
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-[#8E99A4] mt-0.5 leading-snug">
            Brand entity visibility across Generative Search Engines
          </p>
        </motion.div>

        {/* Floating Data Ribbon Chip */}
        <motion.div
          animate={{
            scale: [0.96, 1.04, 0.96],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-16 right-2 sm:-right-2 z-10 px-3 py-1.5 rounded-full bg-[#181A22]/90 border border-violet-500/40 text-[10px] font-mono text-violet-300 flex items-center gap-1.5 backdrop-blur-md shadow-lg"
        >
          <Zap className="w-3 h-3 text-violet-400" />
          <span>Organic + LLM Discovery</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Target, BarChart3, Sparkles, Cpu, Search, Layers } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#0C0C0C] overflow-hidden text-[#D7E2EA]">
      {/* 4 Floating Abstract Decorative Visual Elements in Corners */}
      
      {/* Corner 1: Metallic Sphere (Top-Left) */}
      <div className="absolute top-12 left-4 sm:left-12 pointer-events-none -z-10 animate-float">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8),inset_0_2px_15px_rgba(255,255,255,0.4)] opacity-40 sm:opacity-60"
             style={{
               background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #7E8C9A 40%, #16181F 80%)'
             }}>
          <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
        </div>
      </div>

      {/* Corner 2: Glass-like Abstract Prism (Top-Right) */}
      <div className="absolute top-16 right-4 sm:right-14 pointer-events-none -z-10 animate-float-reverse">
        <div className="w-20 h-28 sm:w-28 sm:h-36 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 border border-white/15 backdrop-blur-md rotate-12 shadow-[0_8px_30px_rgba(0,240,255,0.1)] flex items-center justify-center opacity-40 sm:opacity-65">
          <div className="w-10 h-10 rounded-full bg-cyan-400/20 blur-md" />
        </div>
      </div>

      {/* Corner 3: Minimal Search Symbol with pulse (Bottom-Left) */}
      <div className="absolute bottom-20 left-6 sm:left-16 pointer-events-none -z-10 animate-float-reverse">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#14161C]/80 border border-orange-500/20 backdrop-blur-sm -rotate-6 flex items-center justify-center shadow-lg opacity-35 sm:opacity-60">
          <Search className="w-8 h-8 text-orange-400/70" />
        </div>
      </div>

      {/* Corner 4: 3D Geometric Form / Hexagon (Bottom-Right) */}
      <div className="absolute bottom-16 right-6 sm:right-16 pointer-events-none -z-10 animate-float">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#13141A]/70 border border-violet-500/25 rotate-45 backdrop-blur-md flex items-center justify-center shadow-[0_10px_30px_rgba(139,92,246,0.15)] opacity-35 sm:opacity-60">
          <Layers className="w-9 h-9 text-violet-400/70 -rotate-45" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase mb-3"
          >
            THE PROFESSIONAL STORY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-kanit font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight hero-heading"
          >
            ABOUT ME
          </motion.h2>
        </div>

        {/* Scroll-Reveal Main Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-20"
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-[#D7E2EA] font-light leading-relaxed tracking-tight max-w-4xl mx-auto">
            I'm <span className="font-medium text-white underline decoration-cyan-400/50 decoration-2 underline-offset-8">Anubhav Agarwal</span>, a digital marketing professional with hands-on experience in{' '}
            <span className="text-cyan-300 font-normal">SEO</span>,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-semibold">Generative Engine Optimization (GEO)</span>,{' '}
            <span className="text-white font-normal">performance marketing</span>, e-commerce operations, social media strategy, content creation, and website development.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-[#8E99A4] font-light leading-relaxed max-w-3xl mx-auto">
            I enjoy combining research, creative thinking, technology, and practical execution to help businesses strengthen their digital presence. My particular interest lies in how search is evolving — from traditional search engines to <span className="text-[#D7E2EA] font-medium">AI-powered discovery</span> and brand citation in large language model answers.
          </p>

          <div className="pt-2">
            <blockquote className="inline-block px-6 py-4 rounded-2xl bg-[#14161C]/90 border border-[rgba(215,226,234,0.15)] text-sm sm:text-base font-kanit tracking-wide text-cyan-200/90 shadow-xl max-w-2xl mx-auto">
              "From improving how a brand is discovered to creating the content and digital experiences that help it grow, I focus on connecting strategy with execution."
            </blockquote>
          </div>
        </motion.div>

        {/* Professional Philosophy - 4 Compact Cards */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-kanit font-bold text-xl sm:text-2xl uppercase tracking-wider text-white">
              MY WORKING PHILOSOPHY
            </h3>
            <p className="text-xs font-mono text-[#8E99A4] mt-1">
              Guiding principles across every campaign, audit, and deliverable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {personalInfo.philosophyCards.map((card, idx) => {
              const icons = [
                <Target key="target" className="w-5 h-5 text-cyan-400" />,
                <BarChart3 key="chart" className="w-5 h-5 text-orange-400" />,
                <Sparkles key="sparkles" className="w-5 h-5 text-violet-400" />,
                <Cpu key="cpu" className="w-5 h-5 text-blue-400" />,
              ];

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-[#131418] border border-[rgba(215,226,234,0.12)] hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-[#8E99A4] tracking-widest">
                        {card.number}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {icons[idx]}
                      </div>
                    </div>
                    <h4 className="font-kanit font-bold text-lg text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#8E99A4] font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Factual Touchpoints / Track Record Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14161E] via-[#101217] to-[#14161E] border border-[rgba(215,226,234,0.15)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col text-center md:text-left">
            <span className="font-kanit font-bold text-xl text-white">
              Hands-On Practical Competence
            </span>
            <span className="text-xs text-[#8E99A4] mt-1 max-w-lg">
              Verified touchpoints across B2B consulting, fashion retail, AI search labs, and global marketplace listing operations.
            </span>
          </div>

          <a
            href="#projects"
            className="flex-shrink-0 px-6 py-3 rounded-full bg-white/10 hover:bg-cyan-500/20 border border-white/20 hover:border-cyan-400/50 text-xs font-kanit font-semibold tracking-[0.16em] uppercase text-white transition-all duration-300 flex items-center gap-2 group"
          >
            <span>MORE ABOUT MY WORK</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

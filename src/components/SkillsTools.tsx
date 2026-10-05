import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  ShieldCheck,
  Search,
  TrendingUp,
  ShoppingBag,
  FileText,
  Palette,
  BarChart2,
} from 'lucide-react';
import { skillGroups, verifiedToolsList } from '../data/portfolioData';

export const SkillsTools: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkillGroups =
    activeCategory === 'all'
      ? skillGroups
      : skillGroups.filter((group) => group.id === activeCategory);

  const categoryIcons: Record<string, React.ReactNode> = {
    'seo-ai': <Search className="w-4 h-4 text-cyan-400" />,
    performance: <TrendingUp className="w-4 h-4 text-orange-400" />,
    ecommerce: <ShoppingBag className="w-4 h-4 text-blue-400" />,
    content: <FileText className="w-4 h-4 text-violet-400" />,
    'web-creative': <Palette className="w-4 h-4 text-pink-400" />,
    research: <BarChart2 className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <section id="skills" className="relative py-28 md:py-36 bg-[#0C0C0C] text-[#D7E2EA] overflow-hidden border-t border-[rgba(215,226,234,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase mb-3"
          >
            TECHNICAL & STRATEGIC CAPABILITIES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight hero-heading mb-4"
          >
            MY TOOLKIT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#8E99A4] font-light max-w-2xl mx-auto"
          >
            Structured areas of domain expertise and genuine hands-on marketing platforms.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-14 px-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-kanit tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-[#15171F] border border-[rgba(215,226,234,0.1)] text-[#D7E2EA]/70 hover:text-white hover:border-cyan-400/40'
            }`}
          >
            All Disciplines
          </button>
          {skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveCategory(group.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-kanit tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeCategory === group.id
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-[#15171F] border border-[rgba(215,226,234,0.1)] text-[#D7E2EA]/70 hover:text-white hover:border-cyan-400/40'
              }`}
            >
              {categoryIcons[group.id]}
              <span>{group.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {filteredSkillGroups.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#131419] border border-[rgba(215,226,234,0.12)] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {categoryIcons[group.id]}
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#8E99A4]">
                    {group.skills.length} Capabilities
                  </span>
                </div>

                <h3 className="font-kanit font-bold text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                  {group.title}
                </h3>
                <p className="text-xs text-[#8E99A4] mb-5 sm:mb-6 leading-relaxed">
                  {group.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-[#181A22] border border-white/5 text-[10px] sm:text-[11px] font-kanit tracking-wide text-[#D7E2EA]/90 group-hover:border-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verified Tools Showcase */}
        <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#14161E] via-[#101217] to-[#14161E] border border-[rgba(215,226,234,0.15)] shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1 text-cyan-400 font-kanit font-bold text-xs uppercase tracking-widest">
                <Wrench className="w-4 h-4" />
                Verified Platforms & Workflows
              </div>
              <h3 className="font-kanit font-extrabold text-xl sm:text-3xl text-white uppercase tracking-tight">
                Software & Tool Ecosystem
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 sm:justify-end">
                <ShieldCheck className="w-3.5 h-3.5" /> Hands-On Tested
              </span>
              <p className="text-xs text-[#8E99A4] mt-0.5">
                Platforms routinely configured and operated in production
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {verifiedToolsList.map((tool) => (
              <div
                key={tool.name}
                className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#171922] border border-[rgba(215,226,234,0.08)] hover:border-cyan-400/40 hover:bg-[#1C1F2B] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[9px] font-mono text-[#8E99A4] uppercase tracking-wider block mb-1">
                    {tool.category}
                  </span>
                  <span className="font-kanit font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors block">
                    {tool.name}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-cyan-400/90 truncate">
                    {tool.proficiencyLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

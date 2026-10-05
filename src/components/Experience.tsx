import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { professionalExperience, leadershipAndCampusExperience } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const [expandedLeadership, setExpandedLeadership] = useState(false);

  return (
    <section id="experience" className="relative py-28 md:py-36 bg-[#0C0C0C] text-[#D7E2EA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase mb-3"
          >
            CAREER TIMELINE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight hero-heading mb-4"
          >
            MY JOURNEY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#8E99A4] font-light max-w-2xl mx-auto"
          >
            A growing professional journey across digital marketing, search optimization, e-commerce, and creative execution.
          </motion.p>
        </div>

        {/* Timeline Container with Center Glowing Spine */}
        <div className="relative border-l border-[rgba(215,226,234,0.12)] ml-2.5 sm:ml-8 md:ml-20 lg:ml-28 space-y-8 sm:space-y-12">
          {professionalExperience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative pl-4 sm:pl-8 md:pl-10 group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#121318] border-2 border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_#00F0FF] transition-all duration-300" />

              {/* Card Container */}
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-[#131419] border border-[rgba(215,226,234,0.12)] hover:border-cyan-400/40 transition-all duration-300 shadow-xl group-hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                {/* Header: Dates, Location, Type */}
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-3 text-xs font-mono text-[#8E99A4]">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="text-[#D7E2EA] font-medium">{exp.period}</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8E99A4] flex-shrink-0" />
                      {exp.location}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-cyan-300">
                      {exp.arrangement}
                    </span>
                  </div>
                </div>

                {/* Role and Organization */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2 mb-3">
                  <h3 className="font-kanit font-extrabold text-xl sm:text-2xl md:text-3xl text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-kanit font-semibold text-base sm:text-lg text-cyan-400">
                      {exp.organization}
                    </span>
                    {exp.websiteUrl && (
                      <a
                        href={exp.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8E99A4] hover:text-white transition-colors"
                        title="Visit company website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Role Overview */}
                <p className="text-sm sm:text-base text-[#D7E2EA]/90 font-light leading-relaxed mb-6">
                  {exp.overview}
                </p>

                {/* Responsibilities List */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8E99A4] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Key Responsibilities & Contributions:
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8E99A4]">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400/80 flex-shrink-0 mt-0.5" />
                        <span className="text-[#D7E2EA]/85">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights Metrics (if verified) */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-4 border-t border-[rgba(215,226,234,0.08)]">
                    {exp.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="font-kanit font-extrabold text-lg sm:text-xl text-white block">
                          {hl.stat}
                        </span>
                        <span className="text-[11px] font-mono text-[#8E99A4]">
                          {hl.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills Demonstrated Chips */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[rgba(215,226,234,0.08)]">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skillsDemonstrated.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-[#181A22] border border-[rgba(215,226,234,0.08)] text-[11px] font-kanit tracking-wide text-[#D7E2EA]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {exp.verificationNote && (
                    <span className="text-[10px] font-mono text-emerald-400/90 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Verified Record
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Leadership, Creative Work & Campus Experience */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setExpandedLeadership(!expandedLeadership)}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#15171F] hover:bg-[#1C1F2A] border border-[rgba(215,226,234,0.2)] hover:border-cyan-400/50 text-xs sm:text-sm font-kanit tracking-[0.14em] uppercase text-white transition-all duration-300 shadow-lg cursor-pointer"
          >
            <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="truncate">
              {expandedLeadership
                ? 'Hide Leadership & Campus Roles'
                : 'Leadership & Campus Roles (5)'}
            </span>
            {expandedLeadership ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
          </button>

          <AnimatePresence>
            {expandedLeadership && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 sm:mt-10 overflow-hidden text-left"
              >
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-[#12141A] border border-[rgba(215,226,234,0.15)] shadow-2xl space-y-6">
                  <div className="border-b border-white/10 pb-4 mb-4 sm:mb-6">
                    <h3 className="font-kanit font-extrabold text-xl sm:text-2xl text-white uppercase tracking-tight">
                      Leadership, Event Operations & Design Roles
                    </h3>
                    <p className="text-xs text-[#8E99A4] mt-1 font-mono">
                      Demonstrating visual communication, team leadership, cross-functional coordination, and event hosting
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {leadershipAndCampusExperience.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#171922] border border-[rgba(215,226,234,0.08)] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#8E99A4] mb-2">
                            <span>{item.organization}</span>
                            <span className="text-cyan-400">{item.period}</span>
                          </div>
                          <h4 className="font-kanit font-bold text-lg text-white mb-2 leading-snug">
                            {item.role}
                          </h4>
                          <p className="text-xs text-[#8E99A4] leading-relaxed mb-4">
                            {item.overview}
                          </p>
                          <ul className="space-y-1.5 mb-4">
                            {item.responsibilities.map((r, rIdx) => (
                              <li key={rIdx} className="text-xs text-[#D7E2EA]/85 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                          {item.skillsDemonstrated.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded text-[10px] font-mono text-[#8E99A4] bg-white/5"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

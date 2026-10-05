import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, CheckCircle, Wrench, Sparkles } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="services"
      className="relative bg-white text-[#0C0C0C] py-16 sm:py-24 md:py-36 rounded-t-[32px] sm:rounded-t-[60px] md:rounded-t-[80px] rounded-b-[32px] sm:rounded-b-[60px] md:rounded-b-[80px] shadow-2xl z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-24 pb-6 sm:pb-8 border-b border-[#0C0C0C]/10 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-kanit font-semibold tracking-[0.22em] text-[#0C0C0C]/60 uppercase mb-2"
            >
              SERVICES & SOLUTIONS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-kanit font-black text-3xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#0C0C0C]"
            >
              WHAT I DO
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#0C0C0C]/70 font-normal max-w-md"
          >
            Practical digital marketing solutions designed around visibility, engagement, and business growth.
          </motion.p>
        </div>

        {/* 5 Service Rows */}
        <div className="divide-y divide-[#0C0C0C]/15 border-b border-[#0C0C0C]/15">
          {servicesData.map((service, idx) => {
            const isExpanded = expandedId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group py-6 sm:py-8 md:py-12 transition-colors duration-300 hover:bg-[#0C0C0C]/[0.02]"
              >
                <div
                  onClick={() => toggleExpand(service.id)}
                  className="cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start select-none"
                >
                  {/* Oversized Number Column */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-start">
                    <span className="font-kanit font-black text-3xl sm:text-5xl md:text-6xl text-[#0C0C0C]/25 group-hover:text-[#0C0C0C] transition-colors duration-300">
                      {service.id}
                    </span>
                    {/* Mobile toggle button */}
                    <button
                      className="lg:hidden p-2 rounded-full border border-[#0C0C0C]/20 text-[#0C0C0C]"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Title and Summary Column */}
                  <div className="lg:col-span-8 flex flex-col pr-0 sm:pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-kanit font-bold text-xl sm:text-2xl md:text-3xl text-[#0C0C0C] group-hover:translate-x-1 transition-transform duration-300">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-[#0C0C0C]/75 font-normal leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  {/* Action / Arrow Column */}
                  <div className="hidden lg:flex lg:col-span-2 items-center justify-end">
                    <div className="w-12 h-12 rounded-full border border-[#0C0C0C]/20 flex items-center justify-center group-hover:border-[#0C0C0C] group-hover:bg-[#0C0C0C] group-hover:text-white transition-all duration-300">
                      {isExpanded ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Deliverables & Strategy Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden mt-6 pt-6 border-t border-[#0C0C0C]/10"
                    >
                      <div className="bg-[#0C0C0C]/[0.03] rounded-2xl p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {/* Left: Detailed Strategy & Deliverables */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-[#0C0C0C]" />
                            <h4 className="font-kanit font-bold text-sm uppercase tracking-wider text-[#0C0C0C]">
                              Key Deliverables & Framework
                            </h4>
                          </div>
                          <ul className="space-y-2.5">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0C0C0C]/80">
                                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: Tools & Impact Focus */}
                        <div className="flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Wrench className="w-4 h-4 text-[#0C0C0C]" />
                              <h4 className="font-kanit font-bold text-sm uppercase tracking-wider text-[#0C0C0C]">
                                Applied Tools & Platforms
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {service.keyTools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-3 py-1 rounded-full bg-white border border-[#0C0C0C]/15 text-xs font-mono font-medium text-[#0C0C0C]"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-[#0C0C0C]/10 shadow-sm">
                            <span className="text-[11px] font-mono text-[#0C0C0C]/50 uppercase tracking-wider block mb-1">
                              Strategic Impact Focus
                            </span>
                            <p className="text-xs sm:text-sm font-medium text-[#0C0C0C]">
                              {service.impactFocus}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

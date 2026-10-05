import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, ExternalLink, Bot, ShoppingBag, Eye } from 'lucide-react';
import { featuredProjects } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const FeaturedProjects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-32 md:pt-28 md:pb-40 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-8 border-b border-[rgba(215,226,234,0.1)] gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase mb-2"
            >
              FEATURED CASE STUDIES
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight hero-heading"
            >
              SELECTED WORK
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#8E99A4] font-light max-w-md"
          >
            Projects, campaigns, and creative work across digital marketing, search visibility, and e-commerce.
          </motion.p>
        </div>

        {/* Sticky-Stacking Project Cards Container */}
        <div className="space-y-12 md:space-y-16">
          {featuredProjects.map((project, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="sticky top-20 sm:top-24 md:top-28 rounded-2xl sm:rounded-3xl bg-[#131419] border border-[rgba(215,226,234,0.15)] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-4 sm:p-8 lg:p-12 overflow-hidden group"
              >
                {/* Subtle top ambient glow inside card */}
                <div
                  className="absolute top-0 right-1/4 w-96 h-48 blur-[100px] pointer-events-none -z-10 opacity-30"
                  style={{
                    backgroundColor: project.accentColor,
                  }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Metadata & Narrative */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      {/* Top Bar: Number & Category */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-kanit font-black text-2xl sm:text-4xl text-white/30 group-hover:text-white/60 transition-colors">
                          {project.id}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-medium text-cyan-300">
                          {project.badge}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-[#8E99A4] uppercase tracking-wider block mb-1">
                        {project.category}
                      </span>

                      <h3 className="font-kanit font-extrabold text-2xl sm:text-4xl text-white mb-3 tracking-tight">
                        {project.title}
                      </h3>

                      <h4 className="text-sm sm:text-lg text-cyan-200/90 font-medium mb-4 leading-snug">
                        {project.headline}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#8E99A4] font-light leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tag Pills */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#181A22] border border-[rgba(215,226,234,0.08)] text-[10px] sm:text-[11px] font-kanit tracking-wider text-[#D7E2EA]/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-4 border-t border-[rgba(215,226,234,0.08)]">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="w-full xs:w-auto justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-kanit font-bold text-xs tracking-[0.14em] uppercase hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full xs:w-auto justify-center px-4 py-2 rounded-full border border-[rgba(215,226,234,0.2)] hover:border-cyan-400/50 hover:bg-white/5 text-xs font-kanit tracking-wider text-[#D7E2EA] transition-all flex items-center gap-1.5"
                        >
                          <span>{project.externalLabel || 'Live Site'}</span>
                          <ExternalLink className="w-3 h-3 text-[#8E99A4]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Asymmetrical Editorial Composition */}
                  <div className="lg:col-span-7">
                    <div
                      onClick={() => setActiveProject(project)}
                      data-cursor-text="VIEW"
                      className="cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-4"
                    >
                      {/* Main Large Visual Card (8 cols) */}
                      <div className="sm:col-span-8 rounded-2xl bg-gradient-to-br from-[#1A1C24] to-[#12141A] border border-[rgba(215,226,234,0.15)] p-5 sm:p-6 shadow-xl relative overflow-hidden group/card hover:border-cyan-400/50 transition-colors">
                        {/* Header bar of simulated card */}
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            <span className="text-[10px] font-mono text-[#8E99A4] ml-2">
                              {project.brand} • Executive Overview
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                            Verified Case
                          </span>
                        </div>

                        {/* Simulated Visual Content Based on Project */}
                        {isFirst ? (
                          // GEO SEO Lab Visual
                          <div className="space-y-4">
                            <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-400/20">
                              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300 mb-1">
                                <span className="flex items-center gap-1">
                                  <Bot className="w-3.5 h-3.5" /> LLM Entity Citation Audit
                                </span>
                                <span className="text-emerald-400 font-bold">Optimal</span>
                              </div>
                              <p className="text-xs text-[#D7E2EA] font-medium">
                                "Mapping Brand Authority across Perplexity, ChatGPT & Google AI Overviews"
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-[#8E99A4] block">AI Share of Voice</span>
                                <span className="text-white text-sm font-bold font-kanit">
                                  Entity Focus
                                </span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-[#8E99A4] block">Discovery Engine</span>
                                <span className="text-cyan-400 text-sm font-bold font-kanit">
                                  Multi-LLM
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-[#8E99A4] pt-2">
                              <span>Topic: Generative Engine Optimization</span>
                              <span className="text-cyan-400 flex items-center gap-1">
                                <Eye className="w-3 h-3" /> Click to inspect case study
                              </span>
                            </div>
                          </div>
                        ) : isSecond ? (
                          // Sri Ganpati Collection Visual
                          <div className="space-y-4">
                            <div className="p-3.5 rounded-xl bg-black/40 border border-orange-500/20">
                              <div className="flex items-center justify-between text-[11px] font-mono text-orange-400 mb-1">
                                <span className="flex items-center gap-1">
                                  <ShoppingBag className="w-3.5 h-3.5" /> Fashion Retail Multi-Channel
                                </span>
                                <span className="text-orange-300 font-bold">Seasonal Campaign</span>
                              </div>
                              <p className="text-xs text-[#D7E2EA] font-medium">
                                "Website Management, Promotional Creatives & Local Retail Discovery"
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-[#8E99A4] block">Campaign Visuals</span>
                                <span className="text-white text-sm font-bold font-kanit">
                                  20+ Creatives
                                </span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-[#8E99A4] block">Channels Aligned</span>
                                <span className="text-orange-400 text-sm font-bold font-kanit">
                                  Web + Social + WA
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-[#8E99A4] pt-2">
                              <span>Brand: Sri Ganpati Collection</span>
                              <span className="text-orange-400 flex items-center gap-1">
                                <Eye className="w-3 h-3" /> Click to inspect case study
                              </span>
                            </div>
                          </div>
                        ) : (
                          // Chloia Visual
                          <div className="space-y-4">
                            <div className="p-3.5 rounded-xl bg-black/40 border border-blue-500/20">
                              <div className="flex items-center justify-between text-[11px] font-mono text-blue-400 mb-1">
                                <span className="flex items-center gap-1">
                                  <Layers className="w-3.5 h-3.5" /> Amazon & Shopify Catalog Ops
                                </span>
                                <span className="text-blue-300 font-bold">100% Accuracy</span>
                              </div>
                              <p className="text-xs text-[#D7E2EA] font-medium">
                                "Product Listing SEO, Customization Attributes & Variation Hierarchies"
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-[#8E99A4] block">Marketplace Channels</span>
                                <span className="text-white text-sm font-bold font-kanit">
                                  Amazon + Shopify
                                </span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-[#8E99A4] block">Search Optimization</span>
                                <span className="text-blue-400 text-sm font-bold font-kanit">
                                  Backend Search Terms
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-[#8E99A4] pt-2">
                              <span>Brand: Chloia E-commerce</span>
                              <span className="text-blue-400 flex items-center gap-1">
                                <Eye className="w-3 h-3" /> Click to inspect case study
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stacked 2 Smaller Visual Cards (4 cols) */}
                      <div className="sm:col-span-4 flex flex-col gap-4">
                        <div className="p-4 rounded-2xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] hover:border-cyan-400/40 transition-colors">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                            Deliverable 01
                          </span>
                          <h5 className="font-kanit font-bold text-sm text-white leading-snug">
                            {project.visualPreview.subItem1.title}
                          </h5>
                          <p className="text-[11px] text-[#8E99A4] mt-1 line-clamp-2">
                            {project.visualPreview.subItem1.subtitle}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] hover:border-cyan-400/40 transition-colors">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 block mb-1">
                            Deliverable 02
                          </span>
                          <h5 className="font-kanit font-bold text-sm text-white leading-snug">
                            {project.visualPreview.subItem2.title}
                          </h5>
                          <p className="text-[11px] text-[#8E99A4] mt-1 line-clamp-2">
                            {project.visualPreview.subItem2.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};

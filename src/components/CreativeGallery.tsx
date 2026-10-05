import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import { creativeGalleryItems } from '../data/portfolioData';
import type { CreativeItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';

export const CreativeGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<CreativeItem | null>(null);

  const categories = [
    'All',
    'LinkedIn Carousels',
    'SEO & GEO Explainers',
    'Social Media Creatives',
    'Marketing Campaigns',
    'E-commerce Listings',
    'Website Projects',
    'Event Graphics',
  ];

  const filteredItems =
    selectedFilter === 'All'
      ? creativeGalleryItems
      : creativeGalleryItems.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-[#0C0C0C] text-[#D7E2EA] overflow-hidden border-t border-[rgba(215,226,234,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase mb-3"
          >
            VISUAL ASSETS & CAMPAIGN COLLATERAL
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight hero-heading mb-4"
          >
            CREATIVE PORTFOLIO
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#8E99A4] font-light max-w-2xl mx-auto"
          >
            Visual work across marketing campaigns, educational carousels, e-commerce listings, and event branding.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-14 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-kanit tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-[#15171F] border border-[rgba(215,226,234,0.1)] text-[#D7E2EA]/70 hover:text-white hover:border-cyan-400/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setActiveItem(item)}
              data-cursor-text="INSPECT"
              className="group relative rounded-3xl bg-[#131419] border border-[rgba(215,226,234,0.12)] hover:border-cyan-400/50 overflow-hidden cursor-pointer flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Graphic Card Preview Canvas */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1A1D27] via-[#121319] to-[#151720] p-6 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                    {item.format}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* Central Title on simulated mockup */}
                <div className="my-auto z-10 text-center px-2">
                  <span className="text-[10px] font-mono text-cyan-400/90 uppercase tracking-widest block mb-1">
                    {item.headlineTag}
                  </span>
                  <h4 className="font-kanit font-extrabold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>

                {/* Subtle bottom gradient & overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131419] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />
              </div>

              {/* Lower Details Box */}
              <div className="p-5 border-t border-[rgba(215,226,234,0.08)] bg-[#111216] flex flex-col justify-between flex-1">
                <div>
                  <span className="font-mono text-[10px] text-[#8E99A4] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <p className="text-xs text-[#8E99A4] line-clamp-2 font-light mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                    Inspect Asset <ArrowUpRight className="w-3 h-3" />
                  </span>
                  <span className="text-[#8E99A4]">
                    {item.toolsUsed[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Detail Modal */}
      <LightboxModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
};

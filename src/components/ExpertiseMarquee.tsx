import React from 'react';
import { marqueeRow1, marqueeRow2 } from '../data/portfolioData';
import type { ExpertiseMarqueeItem } from '../types/portfolio';
import { DynamicIcon } from './IconHelper';

interface MarqueeCardProps {
  item: ExpertiseMarqueeItem;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ item }) => {
  const accentStyles = {
    cyan: {
      border: 'hover:border-cyan-400/50',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      icon: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      glow: 'group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    },
    orange: {
      border: 'hover:border-orange-500/50',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      icon: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      glow: 'group-hover:shadow-[0_0_30px_rgba(255,107,0,0.15)]',
    },
    violet: {
      border: 'hover:border-violet-500/50',
      badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      icon: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
      glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    },
    blue: {
      border: 'hover:border-blue-500/50',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    },
  }[item.accent];

  return (
    <div
      className={`group relative flex-shrink-0 w-[270px] sm:w-[320px] md:w-[340px] p-4 sm:p-5 rounded-2xl bg-[#131418]/90 backdrop-blur-md border border-[rgba(215,226,234,0.12)] transition-all duration-300 hover:-translate-y-1.5 cursor-default ${accentStyles.border} ${accentStyles.glow}`}
    >
      {/* Top row: Category & Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-kanit text-[11px] uppercase tracking-[0.16em] text-[#8E99A4] font-medium truncate">
          {item.category}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${accentStyles.badge}`}
        >
          {item.badge}
        </span>
      </div>

      {/* Main Row: Icon + Title */}
      <div className="flex items-start gap-3.5 mb-2.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 flex-shrink-0 ${accentStyles.icon}`}
        >
          <DynamicIcon name={item.iconName} className="w-5 h-5" />
        </div>
        <h3 className="font-kanit font-bold text-base sm:text-lg text-[#D7E2EA] group-hover:text-white transition-colors leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-[#8E99A4] font-light leading-relaxed line-clamp-2">
        {item.description}
      </p>

      {/* Bottom corner light flare on hover */}
      <div className="absolute -bottom-px right-6 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export const ExpertiseMarquee: React.FC = () => {
  // Duplicate arrays for infinite marquee looping
  const doubleRow1 = [...marqueeRow1, ...marqueeRow1];
  const doubleRow2 = [...marqueeRow2, ...marqueeRow2];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-[#0C0C0C] border-y border-[rgba(215,226,234,0.06)]">
      {/* Ambient side fade gradients for continuous cinematic look */}
      <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-28 md:w-48 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-28 md:w-48 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10 pointer-events-none" />

      {/* Section Sub-Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-[11px] font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase">
          CORE CAPABILITIES & SPECIALIZATIONS
        </p>
      </div>

      {/* Row 1: Left to Right */}
      <div className="relative mb-5 flex overflow-hidden group/row">
        <div className="animate-marquee-left flex gap-5 group-hover/row:[animation-play-state:paused]">
          {doubleRow1.map((item, index) => (
            <MarqueeCard key={`row1-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2: Right to Left */}
      <div className="relative flex overflow-hidden group/row">
        <div className="animate-marquee-right flex gap-5 group-hover/row:[animation-play-state:paused]">
          {doubleRow2.map((item, index) => (
            <MarqueeCard key={`row2-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

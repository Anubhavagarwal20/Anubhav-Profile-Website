import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wrench, Tag, Layers } from 'lucide-react';
import type { CreativeItem } from '../types/portfolio';

interface LightboxModalProps {
  item: CreativeItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#121319] border border-[rgba(215,226,234,0.18)] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-[rgba(215,226,234,0.1)] flex items-start justify-between bg-[#151720]">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                {item.category} • {item.format}
              </span>
              <h3 className="font-kanit font-extrabold text-xl sm:text-2xl text-white">
                {item.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#8E99A4] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Showcase Stage */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-[#181B26] via-[#101218] to-[#161822] border border-cyan-400/20 p-8 sm:p-12 shadow-inner text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Layers className="w-8 h-8" />
              </div>
              <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest block mb-1">
                {item.headlineTag}
              </span>
              <h4 className="font-kanit font-extrabold text-2xl sm:text-3xl text-white max-w-xl mx-auto leading-tight">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#8E99A4] font-light max-w-lg mx-auto mt-2">
                {item.format}
              </p>
            </div>

            {/* Description */}
            <div>
              <h5 className="font-kanit font-bold text-sm uppercase tracking-wider text-white mb-2">
                Asset Overview & Context
              </h5>
              <p className="text-sm text-[#D7E2EA]/85 leading-relaxed font-light">
                {item.description}
              </p>
              {item.presentationNote && (
                <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#8E99A4] font-mono">
                  Note: {item.presentationNote}
                </div>
              )}
            </div>

            {/* Tools & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[rgba(215,226,234,0.08)]">
              <div>
                <span className="text-xs font-mono text-[#8E99A4] block mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  Software Used:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md bg-[#181A22] border border-white/5 text-xs font-mono text-[#D7E2EA]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-[#8E99A4] block mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-orange-400" />
                  Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-[#8E99A4] bg-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-[rgba(215,226,234,0.1)] bg-[#101217] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-kanit text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

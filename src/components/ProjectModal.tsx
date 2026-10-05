import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Wrench, Lightbulb, Target, ShieldCheck, Sparkles } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#121318] border border-[rgba(215,226,234,0.18)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-[rgba(215,226,234,0.1)] flex items-start justify-between bg-[#15171F] gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-kanit font-bold text-xs uppercase tracking-widest text-cyan-400">
                  {project.category}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs font-mono text-[#8E99A4]">{project.caseStudy.verifiedStatus}</span>
              </div>
              <h2 className="font-kanit font-extrabold text-xl sm:text-3xl md:text-4xl text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs sm:text-base text-cyan-200/90 font-light mt-1">
                {project.headline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#8E99A4] hover:text-white transition-colors cursor-pointer flex-shrink-0"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 sm:space-y-8 text-[#D7E2EA]">
            {/* The Challenge & Objective Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#171922] border border-[rgba(215,226,234,0.08)]">
                <div className="flex items-center gap-2 mb-2 text-orange-400 font-kanit font-semibold text-sm uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  The Business Challenge
                </div>
                <p className="text-xs sm:text-sm text-[#8E99A4] leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#171922] border border-[rgba(215,226,234,0.08)]">
                <div className="flex items-center gap-2 mb-2 text-cyan-400 font-kanit font-semibold text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  Strategic Objective
                </div>
                <p className="text-xs sm:text-sm text-[#8E99A4] leading-relaxed">
                  {project.caseStudy.objective}
                </p>
              </div>
            </div>

            {/* My Strategic Approach */}
            <div>
              <h3 className="font-kanit font-bold text-lg text-white uppercase tracking-wider mb-3">
                Execution Approach & Methodology
              </h3>
              <div className="space-y-2.5">
                {project.caseStudy.approach.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#15171F] border border-[rgba(215,226,234,0.06)] flex items-start gap-3 text-xs sm:text-sm"
                  >
                    <span className="font-mono text-cyan-400 font-bold text-xs mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="text-[#D7E2EA]/90">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Delivered */}
            <div>
              <h3 className="font-kanit font-bold text-lg text-white uppercase tracking-wider mb-3">
                Tangible Work Delivered
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.caseStudy.workDelivered.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-xs sm:text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Results & Highlights */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-kanit font-bold text-lg text-white uppercase tracking-wider">
                  Verified Milestones & Impact
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Grounded In Verified Records
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.caseStudy.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#181B24] to-[#12141A] border border-[rgba(215,226,234,0.12)]"
                  >
                    <div className="font-kanit font-extrabold text-xl text-white mb-1">
                      {res.stat}
                    </div>
                    <div className="text-xs text-cyan-300 font-medium mb-1">
                      {res.label}
                    </div>
                    {res.verifiedNote && (
                      <div className="text-[10px] font-mono text-[#8E99A4]">
                        {res.verifiedNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Genuinely Used */}
            <div>
              <h3 className="font-kanit font-bold text-xs uppercase tracking-widest text-[#8E99A4] mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                Tools Genuinely Applied
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.caseStudy.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full bg-[#181B24] border border-[rgba(215,226,234,0.15)] text-xs font-mono text-[#D7E2EA]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Learnings */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/20 via-[#161822] to-[#161822] border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2 text-cyan-300 font-kanit font-bold text-sm uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                Key Strategic Takeaway
              </div>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed italic">
                "{project.caseStudy.keyLearnings}"
              </p>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="p-4 sm:p-6 border-t border-[rgba(215,226,234,0.1)] bg-[#101217] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono text-[#8E99A4] bg-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial justify-center px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 font-kanit font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  <span>{project.externalLabel || 'Visit Platform'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial justify-center px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-kanit text-xs tracking-wider uppercase transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

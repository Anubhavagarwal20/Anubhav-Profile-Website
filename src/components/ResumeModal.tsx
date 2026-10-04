import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, Globe, MapPin } from 'lucide-react';
import { LinkedinIcon } from './LinkedinIcon';
import { personalInfo, professionalExperience, educationData, certificationsData, skillGroups } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-4xl bg-[#121318] border border-[rgba(215,226,234,0.2)] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
        >
          {/* Header Controls */}
          <div className="p-4 sm:p-6 border-b border-[rgba(215,226,234,0.1)] flex items-center justify-between bg-[#151720]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-kanit font-bold text-sm uppercase tracking-wider text-white">
                Executive Profile & Verified Resume
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 font-kanit text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#8E99A4] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Sheet */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#D7E2EA] bg-[#0E0F14]">
            {/* Top Identity Block */}
            <div className="border-b border-white/15 pb-6">
              <h1 className="font-kanit font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                {personalInfo.name}
              </h1>
              <p className="font-kanit font-semibold text-sm sm:text-base text-cyan-400 mt-1">
                {personalInfo.title}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#8E99A4] mt-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.email}
                </span>
                <span className="flex items-center gap-1">
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                  linkedin.com/in/anubhavagarwal20
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  India
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="font-kanit font-extrabold text-sm uppercase tracking-widest text-cyan-400 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/90 leading-relaxed font-light">
                {personalInfo.positioningStatement}
              </p>
            </div>

            {/* Work Experience */}
            <div>
              <h2 className="font-kanit font-extrabold text-sm uppercase tracking-widest text-cyan-400 mb-4">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {professionalExperience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-cyan-400/40 pl-4 py-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h3 className="font-kanit font-bold text-base text-white">
                        {exp.role} — <span className="text-cyan-300">{exp.organization}</span>
                      </h3>
                      <span className="text-xs font-mono text-[#8E99A4]">{exp.period}</span>
                    </div>
                    <p className="text-xs text-[#8E99A4] mb-2">{exp.overview}</p>
                    <ul className="space-y-1">
                      {exp.responsibilities.map((r, rIdx) => (
                        <li key={rIdx} className="text-xs text-[#D7E2EA]/85 flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies */}
            <div>
              <h2 className="font-kanit font-extrabold text-sm uppercase tracking-widest text-cyan-400 mb-3">
                Key Competencies & Toolsets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {skillGroups.map((g) => (
                  <div key={g.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="font-kanit font-bold text-white block mb-1">
                      {g.title}
                    </span>
                    <span className="text-[#8E99A4] font-mono leading-relaxed">
                      {g.skills.slice(0, 6).join(' • ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <h2 className="font-kanit font-extrabold text-sm uppercase tracking-widest text-cyan-400 mb-3">
                  Academic Education
                </h2>
                {educationData.map((edu) => (
                  <div key={edu.degree} className="mb-3">
                    <div className="font-kanit font-bold text-sm text-white">{edu.degree}</div>
                    <div className="text-xs text-cyan-300">{edu.institution}</div>
                    <div className="text-[11px] font-mono text-[#8E99A4]">{edu.period}</div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="font-kanit font-extrabold text-sm uppercase tracking-widest text-orange-400 mb-3">
                  Recognized Certifications
                </h2>
                {certificationsData.map((c) => (
                  <div key={c.title} className="mb-3">
                    <div className="font-kanit font-bold text-sm text-white">{c.title}</div>
                    <div className="text-xs text-orange-300">{c.issuer} • {c.issueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

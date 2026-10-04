import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { educationData, certificationsData, allCertificationsLinkedInUrl } from '../data/portfolioData';

export const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="relative py-28 md:py-36 bg-[#0C0C0C] text-[#D7E2EA] overflow-hidden border-t border-[rgba(215,226,234,0.06)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase mb-3"
          >
            ACADEMIC FOUNDATION & CREDENTIALS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-kanit font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight hero-heading mb-4"
          >
            EDUCATION & LEARNING
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#8E99A4] font-light max-w-2xl mx-auto"
          >
            Verified university qualifications and recognized industry credentials.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Academic Education (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 mb-4 text-white">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3 className="font-kanit font-extrabold text-2xl uppercase tracking-tight">
                Academic Degrees
              </h3>
            </div>

            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-3xl bg-[#131419] border border-[rgba(215,226,234,0.12)] hover:border-cyan-400/40 transition-all shadow-xl"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E99A4] mb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8E99A4]" />
                      {edu.location}
                    </span>
                  </div>

                  <h4 className="font-kanit font-bold text-xl text-white mb-1.5 leading-snug">
                    {edu.degree}
                  </h4>

                  <div className="text-sm text-cyan-300 font-medium mb-3">
                    {edu.institution}
                  </div>

                  {edu.credentialNote && (
                    <p className="text-xs text-[#8E99A4] font-light leading-relaxed pt-3 border-t border-white/5">
                      {edu.credentialNote}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Certifications (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-orange-400" />
                <h3 className="font-kanit font-extrabold text-2xl uppercase tracking-tight">
                  Verified Certifications
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Links
              </span>
            </div>

            <div className="space-y-4">
              {certificationsData.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-3xl bg-[#131419] border border-[rgba(215,226,234,0.12)] hover:border-orange-500/40 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#8E99A4] mb-2">
                      <span className="text-orange-400 font-medium">{cert.issuer}</span>
                      <span>{cert.issueDate}</span>
                    </div>

                    <h4 className="font-kanit font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                      {cert.title}
                    </h4>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.topics.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#D7E2EA]/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-kanit font-semibold tracking-wider uppercase text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[10px] font-mono text-[#8E99A4]">LinkedIn Learning</span>
                  </div>
                </motion.div>
              ))}

              {/* View Full LinkedIn Certifications Button */}
              <div className="p-4 rounded-2xl bg-[#151720] border border-[rgba(215,226,234,0.08)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-kanit font-bold text-white block">
                    Complete Licensure & Credentials
                  </span>
                  <span className="text-[11px] text-[#8E99A4] font-mono">
                    Includes 20+ additional specialized course credentials on LinkedIn
                  </span>
                </div>
                <a
                  href={allCertificationsLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-cyan-500/20 text-xs font-kanit text-cyan-300 border border-white/10 hover:border-cyan-400/40 transition-colors flex items-center gap-1 flex-shrink-0"
                >
                  <span>View All</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

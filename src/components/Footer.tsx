import React from 'react';
import { ArrowUp, Mail, Globe } from 'lucide-react';
import { LinkedinIcon } from './LinkedinIcon';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#08080A] text-[#D7E2EA] border-t border-[rgba(215,226,234,0.08)] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5">
            <a href="#" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E232A] to-[#121316] border border-cyan-400/40 flex items-center justify-center font-kanit font-black text-xs text-cyan-400">
                AA
              </div>
              <span className="font-kanit font-extrabold text-lg tracking-[0.18em] text-white uppercase group-hover:text-cyan-300 transition-colors">
                ANUBHAV AGARWAL
              </span>
            </a>

            <p className="text-xs sm:text-sm text-[#8E99A4] font-light max-w-sm mb-4 leading-relaxed">
              Digital Marketing • SEO & GEO • Performance Marketing • E-commerce • Web Development
            </p>

            <div className="flex items-center gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 flex items-center justify-center text-[#8E99A4] hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 flex items-center justify-center text-[#8E99A4] hover:text-cyan-400 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 flex items-center justify-center text-[#8E99A4] hover:text-cyan-400 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4">
            <span className="font-kanit font-bold text-xs uppercase tracking-widest text-cyan-400 block mb-4">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-kanit text-xs tracking-wider text-[#8E99A4] hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top & Location (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <span className="font-kanit font-bold text-xs uppercase tracking-widest text-[#8E99A4] block mb-1">
                Domain Status
              </span>
              <span className="text-xs font-mono text-emerald-400">
                ● anubhavagarwal.tech
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-xs font-kanit tracking-wider text-white transition-all cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex items-center justify-center text-center text-xs font-mono text-[#8E99A4]/60">
          <p>© {currentYear} Anubhav Agarwal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

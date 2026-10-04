import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sectionIds = ['about', 'services', 'projects', 'experience', 'skills', 'gallery', 'contact'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0C0C0C]/85 backdrop-blur-md border-b border-[rgba(215,226,234,0.08)] py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E232A] to-[#121316] border border-[rgba(215,226,234,0.2)] flex items-center justify-center font-kanit font-black text-sm text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:border-cyan-400/60 transition-colors">
              AA
            </div>
            <div className="flex flex-col">
              <span className="font-kanit font-extrabold text-base tracking-[0.18em] text-[#D7E2EA] group-hover:text-white transition-colors uppercase">
                ANUBHAV AGARWAL
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-[#8E99A4]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span>SEO & GEO Specialist</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-kanit text-[13px] font-medium tracking-[0.15em] transition-colors duration-200 relative group py-1 ${
                    isActive ? 'text-cyan-400 font-bold' : 'text-[#D7E2EA]/80 hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[rgba(215,226,234,0.25)] text-xs font-kanit tracking-[0.12em] text-[#D7E2EA] hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-200 cursor-pointer"
              title="View verified resume"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>RESUME</span>
            </button>

            <a
              href="#contact"
              className="relative group overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-black font-kanit font-semibold text-xs tracking-[0.14em] uppercase shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all duration-300"
            >
              <span className="relative z-10 text-white flex items-center gap-1.5 font-bold">
                LET'S TALK
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="p-2 rounded-lg border border-[rgba(215,226,234,0.2)] text-[#D7E2EA] text-xs font-kanit hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[rgba(215,226,234,0.2)] text-[#D7E2EA] hover:text-cyan-400 hover:border-cyan-400/50 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0C0C0C]/98 border-b border-[rgba(215,226,234,0.15)] backdrop-blur-xl px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-kanit text-lg tracking-[0.15em] transition-colors py-1 ${
                      isActive ? 'text-cyan-400 font-bold' : 'text-[#D7E2EA] hover:text-cyan-400'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-[rgba(215,226,234,0.1)] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-3 rounded-xl border border-[rgba(215,226,234,0.25)] text-center font-kanit text-sm tracking-[0.14em] text-[#D7E2EA] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  VIEW RESUME
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-kanit font-bold text-sm tracking-[0.14em] text-center shadow-lg"
                >
                  LET'S WORK TOGETHER
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

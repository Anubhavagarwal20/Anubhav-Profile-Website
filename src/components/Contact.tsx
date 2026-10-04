import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  FileText,
  MapPin,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { LinkedinIcon } from './LinkedinIcon';
import { personalInfo } from '../data/portfolioData';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'SEO & Generative Engine Optimization (GEO)',
    budget: 'Flexible / Let’s Discuss',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState({
    name: '',
    email: '',
    service: 'SEO & Generative Engine Optimization (GEO)',
    budget: 'Flexible / Let’s Discuss',
    message: '',
  });

  const activeData = submittedData.name ? submittedData : formData;

  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const buildSubject = (data = activeData) =>
    `Project Inquiry: ${data.service} from ${data.name}`;

  const buildBody = (data = activeData) =>
    `Hello Anubhav,\n\nMy name is ${data.name} (${data.email}).\n\nService Needed: ${data.service}\nScope / Budget: ${data.budget}\n\nProject Details:\n${data.message}\n\nLooking forward to speaking with you!`;

  const getMailtoUrl = (data = activeData) => {
    const subject = encodeURIComponent(buildSubject(data));
    const body = encodeURIComponent(buildBody(data));
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const getGmailUrl = (data = activeData) => {
    const subject = encodeURIComponent(buildSubject(data));
    const body = encodeURIComponent(buildBody(data));
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      personalInfo.email
    )}&su=${subject}&body=${body}`;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#00F0FF', '#3B82F6', '#FF6B00'],
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  const handleSendGmail = () => {
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;

    const trimmedName = formData.name.trim();
    const finalData = { ...formData, name: trimmedName };
    setSubmittedData(finalData);

    triggerConfetti();
    setStatus('success');
    window.open(getGmailUrl(finalData), '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    const trimmedName = formData.name.trim();
    const finalData = { ...formData, name: trimmedName };
    setSubmittedData(finalData);

    triggerConfetti();
    setStatus('success');
    window.location.href = getMailtoUrl(finalData);
  };

  const handleResetForm = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      service: 'SEO & Generative Engine Optimization (GEO)',
      budget: 'Flexible / Let’s Discuss',
      message: '',
    });
    setSubmittedData({
      name: '',
      email: '',
      service: 'SEO & Generative Engine Optimization (GEO)',
      budget: 'Flexible / Let’s Discuss',
      message: '',
    });
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#0C0C0C] text-[#D7E2EA] overflow-hidden border-t border-[rgba(215,226,234,0.06)]">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-t from-cyan-500/10 via-blue-600/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & CTAs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-3"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-kanit font-semibold tracking-[0.25em] text-cyan-400 uppercase">
                  GET IN TOUCH
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-kanit font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight hero-heading mb-6"
              >
                LET'S CREATE SOMETHING MEANINGFUL.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-[#8E99A4] font-light leading-relaxed mb-8"
              >
                Have a project in mind, need support with digital marketing, or want to discuss a professional opportunity? Let's connect.
              </motion.p>

              {/* Direct Communication Channels */}
              <div className="space-y-4 mb-8">
                {/* Email Item with 1-click copy */}
                <div className="p-4 rounded-2xl bg-[#14161F] border border-[rgba(215,226,234,0.12)] flex items-center justify-between group hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#8E99A4] uppercase tracking-wider block">
                          Direct Email
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                          Active Inbox
                        </span>
                      </div>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-sm font-kanit font-bold text-white group-hover:text-cyan-300 transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E99A4] hover:text-white transition-colors cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <Check className="w-4 h-4" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Item */}
                <div className="p-4 rounded-2xl bg-[#14161F] border border-[rgba(215,226,234,0.12)] flex items-center justify-between group hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#8E99A4] uppercase tracking-wider block">
                        Professional Network
                      </span>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-kanit font-bold text-white group-hover:text-blue-300 transition-colors"
                      >
                        linkedin.com/in/anubhavagarwal20
                      </a>
                    </div>
                  </div>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8E99A4] hover:text-white transition-colors"
                    aria-label="Visit LinkedIn Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Location & Resume row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-[#14161F] border border-[rgba(215,226,234,0.08)] flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-kanit text-[#D7E2EA]">
                      Based in India
                    </span>
                  </div>

                  <button
                    onClick={onOpenResume}
                    className="p-4 rounded-2xl bg-[#14161F] border border-[rgba(215,226,234,0.08)] hover:border-cyan-400/40 transition-colors flex items-center justify-between text-xs font-kanit text-cyan-400 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      View Verified CV
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#131419] border border-[rgba(215,226,234,0.15)] shadow-2xl relative"
            >
              <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-kanit font-extrabold text-2xl text-white uppercase tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-xs text-[#8E99A4] mt-0.5">
                    Messages are delivered directly to <span className="text-cyan-400 font-mono font-medium">{personalInfo.email}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Delivery</span>
                </div>
              </div>

              {/* SUCCESS / DISPATCHED VIEW */}
              {status === 'success' && (
                <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#161A24] to-[#12141C] border border-cyan-500/30 shadow-[0_0_40px_rgba(0,240,255,0.08)] text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-mono uppercase tracking-wider">
                      <Check className="w-3 h-3" />
                      <span>Inquiry Sent Successfully</span>
                    </div>
                    <h4 className="font-kanit font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      Thank You, <span className="text-cyan-400 font-black">{activeData.name || 'Friend'}</span>!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#8E99A4] max-w-md mx-auto leading-relaxed">
                      {activeData.name ? (
                        <>We've received your project inquiry, <strong className="text-white font-semibold">{activeData.name}</strong>. </>
                      ) : null}
                      Your message has been dispatched to{' '}
                      <strong className="text-cyan-300 font-mono font-medium">{personalInfo.email}</strong>.
                      Anubhav will review your details and get back to you shortly at{' '}
                      <strong className="text-white font-mono">{activeData.email}</strong>.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-kanit uppercase tracking-wider text-white transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              )}

              {/* FORM VIEW */}
              {status !== 'success' && (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-kanit uppercase tracking-wider text-[#8E99A4] mb-2">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] placeholder-[#8E99A4]/50 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-kanit uppercase tracking-wider text-[#8E99A4] mb-2">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] placeholder-[#8E99A4]/50 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-kanit uppercase tracking-wider text-[#8E99A4] mb-2">
                        Service of Interest
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="SEO & Generative Engine Optimization (GEO)">
                          SEO & Generative Engine Optimization (GEO)
                        </option>
                        <option value="Performance & Paid Marketing (Meta/Google)">
                          Performance Marketing (Meta/Google Ads)
                        </option>
                        <option value="E-commerce Optimization (Shopify/Amazon)">
                          E-commerce Optimization (Shopify/Amazon)
                        </option>
                        <option value="Content Strategy & LinkedIn Growth">
                          Content Strategy & LinkedIn Growth
                        </option>
                        <option value="Website Development & Creative Production">
                          Website & Creative Production
                        </option>
                        <option value="Full Digital Growth Advisory">
                          Full Digital Growth Advisory
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-kanit uppercase tracking-wider text-[#8E99A4] mb-2">
                        Project Scope / Budget
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="Flexible / Let’s Discuss">Flexible / Let’s Discuss</option>
                        <option value="Monthly Retainer / Ongoing Work">Monthly Retainer / Ongoing</option>
                        <option value="One-Time Audit or Campaign">One-Time Project / Audit</option>
                        <option value="Full-Time Employment Opportunity">Full-Time Career Role</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-kanit uppercase tracking-wider text-[#8E99A4] mb-2">
                      Project Details & Objectives *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share a brief overview of your business, website URL, target timeline, or what you'd like to achieve..."
                      className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] placeholder-[#8E99A4]/50 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-[11px] font-mono text-[#8E99A4] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>
                        Delivers directly to <strong className="text-cyan-300 font-semibold">{personalInfo.email}</strong>
                      </span>
                    </span>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleSendGmail}
                        className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-[#181A22] border border-cyan-500/30 hover:border-cyan-400 text-xs font-kanit font-semibold text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer group"
                        title="Open pre-filled draft in Gmail Web browser"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span>VIA GMAIL</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button
                        type="submit"
                        className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-kanit font-bold text-xs tracking-[0.16em] uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span className="text-black group-hover:text-white transition-colors">
                          SEND INQUIRY
                        </span>
                        <Send className="w-3.5 h-3.5 text-black group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

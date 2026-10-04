import React, { useState } from 'react';
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
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { LinkedinIcon } from './LinkedinIcon';
import { personalInfo } from '../data/portfolioData';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'SEO & Generative Engine Optimization (GEO)',
    budget: 'Flexible / Let’s Discuss',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      // POST directly to FormSubmit endpoint configured to deliver to anubhavagarwal2020@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Portfolio Inquiry from ${formData.name} (${formData.service})`,
          Name: formData.name,
          Email: formData.email,
          Service_Requested: formData.service,
          Scope_or_Budget: formData.budget,
          Project_Message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
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
      } else {
        throw new Error(data.message || 'Submission was not completed');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      console.warn('FormSubmit AJAX fallback:', msg);
      setStatus('error');
      setErrorMessage(
        'Automated dispatch was interrupted. A pre-filled draft has also been prepared in your email app.'
      );

      // Reliable backup: trigger mailto draft directly to anubhavagarwal2020@gmail.com
      const subject = encodeURIComponent(`Project Inquiry: ${formData.service} from ${formData.name}`);
      const body = encodeURIComponent(
        `Hello Anubhav,\n\nMy name is ${formData.name} (${formData.email}).\n\nService Needed: ${formData.service}\nScope / Budget: ${formData.budget}\n\nProject Details:\n${formData.message}\n\nLooking forward to speaking with you!`
      );
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
    }
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Anubhav,\n\nMy name is ${formData.name} (${formData.email}).\n\nService Needed: ${formData.service}\nScope / Budget: ${formData.budget}\n\nProject Details:\n${formData.message}\n\nLooking forward to speaking with you!`
    );
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
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

              {/* SUCCESS VIEW */}
              {status === 'success' && (
                <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-kanit font-extrabold text-2xl text-white uppercase tracking-tight">
                      Inquiry Sent Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/90 max-w-md mx-auto leading-relaxed mt-2">
                      Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your message has been dispatched to{' '}
                      <span className="text-cyan-300 font-mono font-medium">{personalInfo.email}</span>. Anubhav will respond to you shortly at{' '}
                      <span className="text-white font-mono">{formData.email}</span>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left text-xs space-y-1.5 max-w-md mx-auto font-mono text-[#8E99A4]">
                    <div><span className="text-white">Service:</span> {formData.service}</div>
                    <div><span className="text-white">Scope:</span> {formData.budget}</div>
                    <div className="truncate"><span className="text-white">Message:</span> {formData.message}</div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-kanit uppercase tracking-wider text-white transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <button
                      onClick={handleOpenMailClient}
                      className="px-5 py-2.5 rounded-full border border-cyan-400/40 text-xs font-kanit uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Open Copy In Email App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR VIEW (with fallback) */}
              {status === 'error' && (
                <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-center space-y-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-kanit font-bold text-lg text-white uppercase">
                      Direct Dispatch Notice
                    </h4>
                    <p className="text-xs text-[#D7E2EA]/90 mt-1 max-w-md mx-auto">
                      {errorMessage}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleOpenMailClient}
                      className="px-6 py-2.5 rounded-full bg-cyan-500 text-black font-kanit font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Default Email App</span>
                    </button>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-4 py-2.5 rounded-full bg-white/10 text-xs font-kanit uppercase text-white hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* FORM VIEW */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        disabled={status === 'submitting'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] placeholder-[#8E99A4]/50 text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
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
                        disabled={status === 'submitting'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] placeholder-[#8E99A4]/50 text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
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
                        disabled={status === 'submitting'}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
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
                        disabled={status === 'submitting'}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] text-sm focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
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
                      disabled={status === 'submitting'}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share a brief overview of your business, website URL, target timeline, or what you'd like to achieve..."
                      className="w-full px-4 py-3 rounded-xl bg-[#181A22] border border-[rgba(215,226,234,0.12)] text-[#D7E2EA] placeholder-[#8E99A4]/50 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-[11px] font-mono text-[#8E99A4] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>
                        Delivers directly to <strong className="text-cyan-300 font-semibold">{personalInfo.email}</strong>
                      </span>
                    </span>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-kanit font-bold text-xs tracking-[0.16em] uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 text-black animate-spin" />
                          <span className="text-black font-bold">SENDING TO INBOX...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-black group-hover:text-white transition-colors">
                            SEND INQUIRY
                          </span>
                          <Send className="w-3.5 h-3.5 text-black group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
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

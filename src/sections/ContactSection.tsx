import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons';
import { SITE_METADATA } from '../lib/constants';
import { ContactFormData } from '../types';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'Architectural Platform Development',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_METADATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate deterministic submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#101112]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="reveal-on-scroll space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8F36B]">
            <span>04</span>
            <span aria-hidden="true" className="text-[#929795]">/</span>
            <span>Initiate Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#E8E9E5]">
            Let's build something enduring.
          </h2>
          <p className="text-base text-[#929795] font-light leading-relaxed">
            I am currently open to select engineering contracts, platform architecture advisory, and ambitious digital atelier collaborations.
          </p>
        </div>

        {/* Contact Split */}
        <div className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Channels */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Quick Email Copy Box */}
            <div className="p-5 sm:p-6 bg-[#191B1C] border border-[#292C2D] space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#929795]">
                Direct Transmission
              </div>
              <div className="text-base sm:text-xl font-mono text-[#E8E9E5] break-all select-all">
                {SITE_METADATA.email}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#101112] bg-[#B8F36B] hover:bg-[#c9f688] font-medium transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${SITE_METADATA.email}?subject=Project%20Inquiry%20-%20Arifzyn`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#E8E9E5] bg-[#202223] hover:bg-[#292C2D] border border-[#292C2D] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Client</span>
                </a>
              </div>
            </div>

            {/* Network Channels */}
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#929795]">
                Verified Digital Profiles
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={SITE_METADATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#191B1C] border border-[#292C2D] hover:border-[#383C3E] hover:text-[#B8F36B] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E8E9E5]">
                    <GithubIcon className="w-4 h-4 text-[#929795] group-hover:text-[#B8F36B] transition-colors" />
                    <span>GitHub</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#929795]" />
                </a>

                <a
                  href={SITE_METADATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#191B1C] border border-[#292C2D] hover:border-[#383C3E] hover:text-[#B8F36B] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E8E9E5]">
                    <LinkedinIcon className="w-4 h-4 text-[#929795] group-hover:text-[#B8F36B] transition-colors" />
                    <span>LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#929795]" />
                </a>

                <a
                  href={SITE_METADATA.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#191B1C] border border-[#292C2D] hover:border-[#383C3E] hover:text-[#B8F36B] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E8E9E5]">
                    <TwitterIcon className="w-4 h-4 text-[#929795] group-hover:text-[#B8F36B] transition-colors" />
                    <span>X / Twitter</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#929795]" />
                </a>
              </div>
            </div>

            {/* Availability Note */}
            <div className="p-4 border border-[#292C2D]/80 text-xs font-mono text-[#929795] space-y-1">
              <div className="text-[#E8E9E5] font-medium">Response Schedule</div>
              <p className="font-light">
                Inquiries are reviewed within 24 hours. Typical engagements range from full architectural execution to focused senior advisory.
              </p>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 bg-[#191B1C] border border-[#292C2D]">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-10 h-10 mx-auto rounded-none bg-[#B8F36B] text-[#101112] flex items-center justify-center">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-[#E8E9E5]">
                  Transmission Dispatched
                </h3>
                <p className="text-sm text-[#929795] max-w-md mx-auto font-light">
                  Thank you for reaching out. A confirmation has been drafted to your provided address.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Architectural Platform Development', message: '' });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#E8E9E5] bg-[#202223] hover:bg-[#292C2D] border border-[#292C2D] transition-colors"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#B8F36B]">
                    Project Dispatch
                  </div>
                  <p className="text-sm text-[#929795] font-light">
                    Provide project parameters and specifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#929795] block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#101112] border border-[#292C2D] text-sm text-[#E8E9E5] placeholder-[#929795]/40 focus:outline-none focus:border-[#B8F36B] transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#929795] block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. elena@atelier.studio"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#101112] border border-[#292C2D] text-sm text-[#E8E9E5] placeholder-[#929795]/40 focus:outline-none focus:border-[#B8F36B] transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#929795] block">
                    Domain Focus
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#101112] border border-[#292C2D] text-sm text-[#E8E9E5] focus:outline-none focus:border-[#B8F36B] transition-colors font-mono"
                  >
                    <option value="Application Ecosystem Architecture">Application Ecosystem Architecture</option>
                    <option value="3D WebGL & Creative Technology">3D WebGL & Creative Technology</option>
                    <option value="Native Android Systems & Database">Native Android Systems & Database</option>
                    <option value="High-Throughput Streaming Infrastructure">High-Throughput Streaming Infrastructure</option>
                    <option value="General Engineering Contract">General Engineering Contract</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#929795] block">
                    Project Parameters & Timeline *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Outline the core objective, architectural constraints, and estimated launch schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#101112] border border-[#292C2D] text-sm text-[#E8E9E5] placeholder-[#929795]/40 focus:outline-none focus:border-[#B8F36B] transition-colors font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-mono uppercase tracking-wider text-[#101112] bg-[#B8F36B] hover:bg-[#c9f688] font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

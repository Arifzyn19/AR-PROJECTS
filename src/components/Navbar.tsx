import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SITE_METADATA } from '../lib/constants';

interface NavbarProps {
  onContactClick?: () => void;
  activeSection?: string;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onContactClick,
  activeSection = '',
  onReplayIntro,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Expertise', href: '#expertise', id: 'expertise' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#101112]/85 backdrop-blur-md border-b border-[#292C2D] py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-base md:text-lg font-bold tracking-tight text-[#E8E9E5] hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          <span className="w-2 h-2 rounded-none bg-[#B8F36B] transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-mono tracking-widest uppercase">{SITE_METADATA.author}</span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#B8F36B] after:transition-all after:duration-200 ${
                  isActive
                    ? 'text-[#E8E9E5] font-semibold after:w-full'
                    : 'text-[#929795] hover:text-[#E8E9E5] after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#929795] hover:text-[#B8F36B] transition-colors cursor-pointer"
              title="Replay 3D Cinematic Intro"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8F36B]" />
              <span className="hidden lg:inline text-[11px]">Replay Intro</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={onContactClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#101112] bg-[#B8F36B] hover:bg-[#c9f688] transition-colors whitespace-nowrap shrink-0 font-medium rounded-none"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile top bar actions (replaces hamburger button) */}
        <div className="flex md:hidden items-center gap-2">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="p-1.5 text-[#929795] hover:text-[#B8F36B] transition-colors"
              title="Replay 3D Intro"
              aria-label="Replay 3D Intro"
            >
              <Sparkles className="w-4 h-4 text-[#B8F36B]" />
            </button>
          )}

          <a
            href="#contact"
            onClick={onContactClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#101112] bg-[#B8F36B] hover:bg-[#c9f688] font-medium transition-colors"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};

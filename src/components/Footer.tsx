import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { SITE_METADATA } from '../lib/constants';
import { ambientSoundscape } from '../features/audio/ambientSoundscape';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState(ambientSoundscape.getIsMuted());

  useEffect(() => {
    const unsubscribe = ambientSoundscape.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const updateTime = () => {
      // Jakarta is UTC+7
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101112] border-t border-[#292C2D] pt-14 pb-24 md:pb-12 text-[#929795] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-[#292C2D]/60">
          {/* Col 1: Wordmark & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-[#E8E9E5] tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#B8F36B] inline-block" />
              <span>{SITE_METADATA.author}</span>
              <span className="text-xs text-[#929795] font-normal lowercase tracking-normal font-sans ml-2">
                / digital atelier
              </span>
            </div>
            <p className="text-sm text-[#929795] max-w-md font-sans leading-relaxed">
              {SITE_METADATA.subheadline}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#929795]">
              <span>Jakarta, ID (WIB)</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E8E9E5] font-mono tabular-nums">
                {currentTime ? `${currentTime} UTC+7` : 'UTC+7'}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="text-[#E8E9E5] uppercase tracking-wider text-xs font-semibold">
              Index
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#work" className="hover:text-[#B8F36B] transition-colors">
                  01. Selected Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#B8F36B] transition-colors">
                  02. About & Philosophy
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-[#B8F36B] transition-colors">
                  03. Technical Capabilities
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#B8F36B] transition-colors">
                  04. Direct Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Network */}
          <div className="space-y-3">
            <div className="text-[#E8E9E5] uppercase tracking-wider text-xs font-semibold">
              Network
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE_METADATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#B8F36B] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_METADATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#B8F36B] transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_METADATA.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#B8F36B] transition-colors"
                >
                  <TwitterIcon className="w-3.5 h-3.5" />
                  <span>X / Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_METADATA.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#B8F36B] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{SITE_METADATA.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#929795]">
          <div className="flex items-center gap-2">
            <span>© 2026 Arifzyn</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
            <span aria-hidden="true">·</span>
            <span>Built with Three.js & Tailwind</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            {/* Ambient Soundscape Mute Toggle */}
            <button
              onClick={() => ambientSoundscape.toggleMute()}
              className={`inline-flex items-center gap-2 px-2.5 py-1 bg-[#191B1C] border transition-colors cursor-pointer select-none ${
                isMuted
                  ? 'border-[#292C2D] text-[#929795] hover:text-[#E8E9E5]'
                  : 'border-[#B8F36B]/40 text-[#E8E9E5] hover:border-[#B8F36B]'
              }`}
              title={
                isMuted
                  ? 'Unmute low-frequency ambient soundscape'
                  : 'Mute ambient soundscape'
              }
              aria-label={
                isMuted ? 'Unmute ambient soundscape' : 'Mute ambient soundscape'
              }
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-[#929795]" />
              ) : (
                <div className="flex items-end gap-0.5 h-3 w-3">
                  <span className="w-0.5 h-1.5 bg-[#B8F36B] animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#B8F36B] animate-pulse [animation-delay:150ms]" />
                  <span className="w-0.5 h-2 bg-[#B8F36B] animate-pulse [animation-delay:300ms]" />
                </div>
              )}
              <span className="text-[10px] tracking-wider uppercase font-mono">
                {isMuted ? 'Sound: Muted' : 'Sound: Ambient'}
              </span>
            </button>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 hover:text-[#B8F36B] transition-colors cursor-pointer group"
                title="Replay Orbital Genesis cinematic intro"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B8F36B]" />
                <span>Replay 3D Intro</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#E8E9E5] transition-colors cursor-pointer group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

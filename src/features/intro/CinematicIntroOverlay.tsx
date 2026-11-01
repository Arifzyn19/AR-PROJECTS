import React, { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicIntroOverlayProps {
  progress: number;
  isActive: boolean;
  onSkip: () => void;
}

export const CinematicIntroOverlay: React.FC<CinematicIntroOverlayProps> = ({
  progress,
  isActive,
  onSkip,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        onSkip();
      }
    };
    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onSkip]);

  if (!isActive) return null;

  // Animation Stage Timing derived from progress (0.0 to 1.0, ~2.1 seconds)
  // Stage 1: 0.00 - 0.22 -> Darkness with center ignition
  // Stage 2: 0.22 - 0.65 -> Emergence, ring assembly, typography fade-in
  // Stage 3: 0.65 - 1.00 -> Camera swoop into hero, typography dissolve out

  // Center spark / ignition pulse
  const sparkOpacity = progress < 0.25 ? Math.sin((progress / 0.25) * Math.PI) : 0;

  // Typography visibility
  let textOpacity = 0;
  let textTranslateY = 16;
  if (progress >= 0.25 && progress <= 0.65) {
    const t = (progress - 0.25) / 0.25;
    textOpacity = Math.min(1, Math.max(0, t));
    textTranslateY = Math.max(0, 16 * (1 - textOpacity));
  } else if (progress > 0.65) {
    const t = (progress - 0.65) / 0.3;
    textOpacity = Math.max(0, 1 - t * 1.5);
    textTranslateY = -14 * t;
  }

  // Backdrop opacity: deep obsidian #090A0B fade out into hero atmosphere
  let backdropOpacity = 1;
  if (progress > 0.65) {
    const t = (progress - 0.65) / 0.35;
    backdropOpacity = Math.max(0, 1 - Math.pow(t, 1.4));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 pointer-events-none transition-opacity duration-300"
      style={{
        backgroundColor: `rgba(9, 10, 11, ${backdropOpacity * 0.94})`,
        backdropFilter: backdropOpacity > 0.1 ? 'blur(1px)' : 'none',
      }}
      role="region"
      aria-label="Orbital Genesis Cinematic Introduction"
    >
      {/* Top Bar: Sequence Label Left, Skip Button Right */}
      <div className="flex items-center justify-between w-full pointer-events-auto">
        <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase text-[#929795]">
          <span className="w-2 h-2 bg-[#B8F36B] inline-block" />
          <span className="text-[#E8E9E5] font-semibold">Orbital Genesis</span>
          <span aria-hidden="true" className="text-[#292C2D] hidden sm:inline">/</span>
          <span className="hidden sm:inline text-[#929795]">Intro Sequence</span>
        </div>

        <button
          onClick={onSkip}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#929795] hover:text-[#B8F36B] border border-[#292C2D] hover:border-[#B8F36B]/50 bg-[#101112]/80 backdrop-blur-sm transition-all cursor-pointer"
          aria-label="Skip Cinematic Intro"
        >
          <span>Skip Intro</span>
          <span className="text-[10px] text-[#929795] opacity-70 group-hover:opacity-100">[ESC]</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Center Cinematic Typography Stage */}
      <div className="my-auto mx-auto text-center max-w-xl space-y-4 select-none">
        {/* Subtle center lime ignition indicator (Stage 1) */}
        {sparkOpacity > 0.05 && (
          <div
            className="flex items-center justify-center gap-2 mb-2 transition-opacity duration-150"
            style={{ opacity: sparkOpacity }}
          >
            <div className="w-2 h-2 rounded-full bg-[#B8F36B] shadow-[0_0_12px_#B8F36B]" />
          </div>
        )}

        {/* Wordmark & Technical Label (Stage 2) */}
        <div
          className="space-y-3 transition-all duration-300 ease-out"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <div className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.25em] sm:tracking-[0.35em] text-[#E8E9E5] uppercase font-sans">
            ARIFZYN
          </div>

          <div className="inline-block text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B8F36B] font-medium">
            DIGITAL ATELIER & SYSTEMS ENGINEERING
          </div>
        </div>
      </div>

      {/* Bottom Progress Telemetry */}
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#929795] uppercase">
        <div className="flex items-center gap-2">
          <span>Kinematic Assembly</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#B8F36B] tabular-nums">
            {Math.round(progress * 100)}%
          </span>
        </div>

        <div className="w-28 sm:w-40 h-[1px] bg-[#292C2D] overflow-hidden">
          <div
            className="h-full bg-[#B8F36B] transition-all duration-75 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

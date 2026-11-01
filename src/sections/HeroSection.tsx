import React from 'react';
import { ArrowDown, Compass, Terminal } from 'lucide-react';
import { SculptureCanvas, SculptureCanvasHandle } from '../features/sculpture/SculptureCanvas';
import { SITE_METADATA } from '../lib/constants';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onContactClick?: () => void;
  onSceneReady?: (handle: SculptureCanvasHandle) => void;
  introProgress?: number;
  isIntroActive?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onContactClick,
  onSceneReady,
  introProgress = 1,
  isIntroActive = false,
}) => {
  // During intro, hero content fades in as camera swoops in (Stage 3, progress 0.65 to 1.0)
  const heroContentOpacity = isIntroActive
    ? introProgress < 0.65
      ? 0
      : Math.min(1, (introProgress - 0.65) / 0.35)
    : 1;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-[95vh] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 bg-[#101112] border-b border-[#292C2D] overflow-hidden"
    >
      {/* 3D Sculpture Viewport in Hero Center */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <SculptureCanvas className="w-full h-full" onSceneReady={onSceneReady} />
      </div>

      {/* Subtle radial ambient scrim for maximum typographic legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_78%_65%_at_50%_48%,rgba(16,17,18,0.76)_0%,rgba(16,17,18,0.42)_55%,rgba(16,17,18,0.96)_100%)]"
        aria-hidden="true"
      />

      {/* Hero Content Overlay */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 md:px-12 w-full flex-1 flex flex-col justify-between pointer-events-none transition-opacity duration-300"
        style={{ opacity: heroContentOpacity }}
      >
        {/* Top Status Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-[#292C2D]/60 text-xs font-mono text-[#929795] pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-[#B8F36B] inline-block shrink-0" />
            <span className="text-[#E8E9E5] font-medium tracking-wide uppercase">
              {SITE_METADATA.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#B8F36B] font-mono font-medium text-[11px] sm:text-xs">
              {SITE_METADATA.availability}
            </span>
          </div>
        </div>

        {/* Centered Editorial Hero Block */}
        <div className="my-auto py-10 sm:py-16 md:py-20 text-center max-w-3xl mx-auto flex flex-col items-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#191B1C]/80 border border-[#292C2D] text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#B8F36B] mb-5 sm:mb-7 backdrop-blur-xs">
            <Terminal className="w-3.5 h-3.5 shrink-0" />
            <span>Digital Atelier & Systems Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#E8E9E5] leading-[1.06] mb-5 sm:mb-6 text-balance drop-shadow-sm">
            {SITE_METADATA.headline}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#929795] font-light leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 text-balance">
            {SITE_METADATA.subheadline}
          </p>

          {/* Centered Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#work"
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-xs font-mono uppercase tracking-wider text-[#101112] bg-[#B8F36B] hover:bg-[#c9f688] font-semibold transition-colors group cursor-pointer shadow-md"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-[#E8E9E5] bg-[#191B1C]/90 hover:bg-[#202223] border border-[#292C2D] backdrop-blur-sm transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#929795]" />
              <span>Atelier Overview</span>
            </a>
          </div>
        </div>

        {/* Grounded Architectural Specs Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-4 sm:pt-6 border-t border-[#292C2D]/70 text-xs font-mono pointer-events-auto">
          <div className="p-3 sm:p-4 bg-[#191B1C]/85 backdrop-blur-sm border border-[#292C2D] space-y-1 text-left">
            <div className="text-[#929795] uppercase text-[10px] sm:text-[11px] tracking-wider">Focus</div>
            <div className="text-[#E8E9E5] font-medium text-xs sm:text-sm">Full-Stack & Systems</div>
          </div>
          <div className="p-3 sm:p-4 bg-[#191B1C]/85 backdrop-blur-sm border border-[#292C2D] space-y-1 text-left">
            <div className="text-[#929795] uppercase text-[10px] sm:text-[11px] tracking-wider">Primary Stack</div>
            <div className="text-[#E8E9E5] font-medium text-xs sm:text-sm truncate">React · Three.js · Node · Kotlin</div>
          </div>
          <div className="p-3 sm:p-4 bg-[#191B1C]/85 backdrop-blur-sm border border-[#292C2D] space-y-1 text-left">
            <div className="text-[#929795] uppercase text-[10px] sm:text-[11px] tracking-wider">Aesthetics</div>
            <div className="text-[#E8E9E5] font-medium text-xs sm:text-sm truncate">Dark Minimalism</div>
          </div>
          <div className="p-3 sm:p-4 bg-[#191B1C]/85 backdrop-blur-sm border border-[#292C2D] space-y-1 text-left">
            <div className="text-[#929795] uppercase text-[10px] sm:text-[11px] tracking-wider">Rendering</div>
            <div className="text-[#B8F36B] font-medium text-xs sm:text-sm">60fps WebGL</div>
          </div>
        </div>
      </div>
    </section>
  );
};

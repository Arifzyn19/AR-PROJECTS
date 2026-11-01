import React, { useEffect, useRef, useState } from 'react';
import { ArchitecturalSculptureScene } from './ArchitecturalSculpture';

export interface SculptureCanvasHandle {
  playIntro: (onProgress?: (p: number) => void, onComplete?: () => void) => void;
  skipIntro: () => void;
}

interface SculptureCanvasProps {
  className?: string;
  onSceneReady?: (handle: SculptureCanvasHandle) => void;
}

export const SculptureCanvas: React.FC<SculptureCanvasProps> = ({
  className = '',
  onSceneReady,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ArchitecturalSculptureScene | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Instantiate isolated Three.js sculpture
    const scene = new ArchitecturalSculptureScene(container);
    sceneRef.current = scene;

    // Expose handle to parent
    if (onSceneReady) {
      onSceneReady({
        playIntro: (onProgress, onComplete) => scene.playIntro(onProgress, onComplete),
        skipIntro: () => scene.skipIntro(),
      });
    }

    // Pause rendering when scene is not visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          scene.setVisibility(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden touch-pan-y ${className}`}
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      aria-label="Interactive 3D Architectural Sculpture"
      role="img"
    >
      {/* Architectural status and orientation indicators */}
      <div className="absolute top-28 right-4 sm:right-8 z-10 pointer-events-none hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#929795] uppercase opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8F36B] inline-block shrink-0" />
        <span>3D Orbital Geometry · Interactive Parallax</span>
      </div>
    </div>
  );
};

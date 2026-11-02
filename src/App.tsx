import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { WorkSection } from './sections/WorkSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { CinematicIntroOverlay } from './features/intro/CinematicIntroOverlay';
import { SculptureCanvasHandle } from './features/sculpture/SculptureCanvas';
import { ambientSoundscape } from './features/audio/ambientSoundscape';
import { Project } from './types';

const INTRO_SESSION_KEY = 'arifzyn_orbital_intro_seen';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Check if first visit of browser session and respect prefers-reduced-motion
  const [isIntroActive, setIsIntroActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const hasSeen = sessionStorage.getItem(INTRO_SESSION_KEY);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !hasSeen && !prefersReduced;
    } catch {
      return false;
    }
  });

  const [introProgress, setIntroProgress] = useState<number>(0);
  const sculptureHandleRef = useRef<SculptureCanvasHandle | null>(null);

  // If intro is already inactive on mount (returning visitor), start ambient soundscape
  useEffect(() => {
    if (!isIntroActive) {
      ambientSoundscape.start();
    }
  }, [isIntroActive]);

  // Skip Intro Handler
  const handleSkipIntro = useCallback(() => {
    sculptureHandleRef.current?.skipIntro();
    setIsIntroActive(false);
    setIntroProgress(1.0);
    ambientSoundscape.start();
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {}
  }, []);

  // Replay Intro Handler
  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsIntroActive(true);
    setIntroProgress(0);

    setTimeout(() => {
      sculptureHandleRef.current?.playIntro(
        (progress) => setIntroProgress(progress),
        () => {
          setIsIntroActive(false);
          setIntroProgress(1.0);
          ambientSoundscape.start();
          try {
            sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
          } catch {}
        }
      );
    }, 150);
  }, []);

  // Scene Ready Callback from 3D Canvas
  const handleSceneReady = useCallback(
    (handle: SculptureCanvasHandle) => {
      sculptureHandleRef.current = handle;

      if (isIntroActive) {
        handle.playIntro(
          (progress) => setIntroProgress(progress),
          () => {
            setIsIntroActive(false);
            setIntroProgress(1.0);
            ambientSoundscape.start();
            try {
              sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
            } catch {}
          }
        );
      }
    },
    [isIntroActive]
  );

  // IntersectionObserver 1: Active section detection for navigation
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'about', 'expertise', 'contact'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionElements.forEach((el) => sectionObserver.observe(el));

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  // IntersectionObserver 2: Subtle fade-in entrance animations for elements entering viewport
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#101112] text-[#E8E9E5] selection:bg-[#B8F36B] selection:text-[#101112] flex flex-col font-sans">
      {/* Cinematic 3D Intro Splash Overlay */}
      <CinematicIntroOverlay
        progress={introProgress}
        isActive={isIntroActive}
        onSkip={handleSkipIntro}
      />

      {/* Top Bar Navigation with active section indicator & replay intro option */}
      <Navbar
        onContactClick={scrollToContact}
        activeSection={activeSection}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onExploreClick={scrollToWork}
          onContactClick={scrollToContact}
          onSceneReady={handleSceneReady}
          introProgress={introProgress}
          isIntroActive={isIntroActive}
        />
        <WorkSection onSelectProject={(p) => setSelectedProject(p)} />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Architectural Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer with Replay Intro Option */}
      <Footer onReplayIntro={handleReplayIntro} />

      {/* Fixed Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeSection={activeSection}
        onContactClick={scrollToContact}
      />
    </div>
  );
};
export default App;

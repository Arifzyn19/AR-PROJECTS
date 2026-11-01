import React, { useEffect } from 'react';
import { X, ExternalLink, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 bg-[#101112]/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#191B1C] border border-[#292C2D] overflow-y-auto shadow-2xl flex flex-col text-[#E8E9E5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#191B1C] border-b border-[#292C2D]">
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-[#929795] truncate">
            <span className="text-[#B8F36B] uppercase">{project.category}</span>
            <span aria-hidden="true">/</span>
            <span>{project.year}</span>
            <span aria-hidden="true" className="hidden sm:inline">/</span>
            <span className="hidden sm:inline truncate">{project.role}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#929795] hover:text-[#E8E9E5] hover:bg-[#202223] transition-colors shrink-0"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8E9E5]">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#929795] font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Project Screenshot / Media Display */}
          <div className="relative w-full aspect-video bg-[#101112] border border-[#292C2D] overflow-hidden group">
            <img
              src={project.screenshotUrl}
              alt={`${project.title} interface architecture`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback container
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 bg-[#202223] border border-[#292C2D]">
                  <div className="text-[11px] font-mono text-[#929795] uppercase tracking-wider mb-1">
                    {m.label}
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-semibold text-[#B8F36B] tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Executive Overview */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#929795]">
              Executive Summary
            </h3>
            <p className="text-sm sm:text-base text-[#E8E9E5] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Architecture Breakdown */}
          <div className="space-y-4 pt-2 border-t border-[#292C2D]">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#929795]">
              <Layers className="w-4 h-4 text-[#B8F36B]" />
              <span>Architectural Specifications</span>
            </div>
            <ul className="space-y-3">
              {project.architectureDetails.map((detail, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-[#E8E9E5] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#B8F36B] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack (Unboxed text with separators) */}
          <div className="space-y-3 pt-2 border-t border-[#292C2D]">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-[#929795]">
              <Cpu className="w-4 h-4 text-[#B8F36B]" />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#929795]">
              {project.techStack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="text-[#E8E9E5]">{tech}</span>
                  {idx < project.techStack.length - 1 && (
                    <span aria-hidden="true" className="text-[#292C2D]">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#292C2D]">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#E8E9E5] bg-[#202223] hover:bg-[#292C2D] border border-[#292C2D] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-[#101112] bg-[#B8F36B] hover:bg-[#c9f688] font-medium transition-colors"
              >
                <span>Live Environment</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

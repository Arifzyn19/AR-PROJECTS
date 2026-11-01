import React, { useState } from 'react';
import { ArrowUpRight, Layers, SlidersHorizontal } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { PROJECTS } from '../lib/constants';
import { Project } from '../types';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    'Ecosystem',
    'Platform',
    'Streaming',
    'Mobile & DB',
    'Systems & Automation',
  ];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-20 md:py-32 bg-[#101112] border-b border-[#292C2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#292C2D]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8F36B]">
              <span>01</span>
              <span aria-hidden="true" className="text-[#929795]">/</span>
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#E8E9E5]">
              Production Systems & Products
            </h2>
            <p className="text-base text-[#929795] max-w-xl font-light">
              Bespoke digital platforms, high-throughput architectures, and native systems engineered with surgical attention to performance.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#191B1C] border border-[#292C2D] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 ${
                  activeFilter === cat
                    ? 'bg-[#202223] text-[#B8F36B] border border-[#292C2D]'
                    : 'text-[#929795] hover:text-[#E8E9E5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`reveal-on-scroll group flex flex-col justify-between bg-[#191B1C] border border-[#292C2D] hover:border-[#383C3E] transition-all duration-300 ${
                index === 0 && activeFilter === 'All' ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Media Thumbnail */}
              <div
                className="relative aspect-video w-full bg-[#101112] border-b border-[#292C2D] overflow-hidden cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.screenshotUrl}
                  alt={`${project.title} - ${project.subtitle}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-[#101112]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#191B1C]/90 border border-[#292C2D] text-xs font-mono uppercase tracking-wider text-[#B8F36B] flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Architecture Breakdown</span>
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Metadata Row (Unboxed with separators) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#929795]">
                    <span className="text-[#B8F36B] uppercase font-semibold">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.role}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E8E9E5] group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-mono text-[#929795] mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#929795] font-light leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Stack & Action Footnote */}
                <div className="pt-6 border-t border-[#292C2D]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Technology Stack (Unboxed text with separators) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#929795]">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span className="text-[#E8E9E5]">{tech}</span>
                        {idx < Math.min(3, project.techStack.length - 1) && (
                          <span aria-hidden="true" className="text-[#292C2D]">/</span>
                        )}
                      </React.Fragment>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[#929795] font-light">+{project.techStack.length - 4}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#929795] hover:text-[#E8E9E5] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.title} GitHub repository`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}

                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-[#B8F36B] hover:text-[#c9f688] font-medium transition-colors cursor-pointer"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

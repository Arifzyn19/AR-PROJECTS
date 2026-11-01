import React, { useState } from 'react';
import { Check, Code2, Database, Layout, Smartphone, Terminal } from 'lucide-react';
import { EXPERTISE_AREAS, TECHNICAL_PHILOSOPHY } from '../lib/constants';

export const AboutSection: React.FC = () => {
  const [selectedExpertiseId, setSelectedExpertiseId] = useState<string>('frontend');

  const selectedExpertise = EXPERTISE_AREAS.find((e) => e.id === selectedExpertiseId) || EXPERTISE_AREAS[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Code2 className="w-4 h-4 text-[#B8F36B]" />;
      case 'backend':
        return <Database className="w-4 h-4 text-[#B8F36B]" />;
      case 'android':
        return <Smartphone className="w-4 h-4 text-[#B8F36B]" />;
      case 'architecture':
        return <Terminal className="w-4 h-4 text-[#B8F36B]" />;
      case 'ui-engineering':
        return <Layout className="w-4 h-4 text-[#B8F36B]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#B8F36B]" />;
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-[#101112] border-b border-[#292C2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-16 sm:space-y-24">
        {/* Editorial Introduction Split */}
        <div className="reveal-on-scroll grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8F36B]">
              <span>02</span>
              <span aria-hidden="true" className="text-[#929795]">/</span>
              <span>About & Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#E8E9E5] text-balance">
              Engineering with architectural intent.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[#929795] font-light text-base sm:text-lg leading-relaxed">
            <p>
              I am an independent developer operating at the boundary of software engineering and digital art direction. My work centers on building resilient digital systems where deterministic performance meets dark architectural minimalism.
            </p>
            <p>
              Rather than assembling generic off-the-shelf templates, every project is conceived as an integrated atelier piece: from zero-GC WebGL render pipelines and low-latency streaming infrastructure down to typed design token systems and native mobile kernels.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-[#E8E9E5]">
              <div className="space-y-1">
                <span className="text-[#929795] block uppercase">Location</span>
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#929795] block uppercase">Working Style</span>
                <span>Autonomous · Async · Global</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#929795] block uppercase">Discipline</span>
                <span>Full-Stack & Systems Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Philosophy Grid */}
        <div className="reveal-on-scroll space-y-8 pt-8 border-t border-[#292C2D]">
          <div className="text-xs font-mono uppercase tracking-widest text-[#929795]">
            Engineering Tenets
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNICAL_PHILOSOPHY.map((tenet) => (
              <div
                key={tenet.number}
                className="p-6 bg-[#191B1C] border border-[#292C2D] space-y-3"
              >
                <div className="text-xs font-mono text-[#B8F36B] tracking-wider">
                  {tenet.number}
                </div>
                <h3 className="text-lg font-bold text-[#E8E9E5]">
                  {tenet.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#929795] leading-relaxed font-light">
                  {tenet.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Expertise Inspector Section */}
        <div id="expertise" className="reveal-on-scroll space-y-8 pt-8 border-t border-[#292C2D]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8F36B]">
                <span>03</span>
                <span aria-hidden="true" className="text-[#929795]">/</span>
                <span>Core Capabilities</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E9E5]">
                Technical Expertise Spectrum
              </h3>
            </div>
            <p className="text-xs font-mono text-[#929795]">
              Select a discipline to inspect practices
            </p>
          </div>

          {/* Interactive Category Selector (Button elements for functional interaction) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {EXPERTISE_AREAS.map((item) => {
              const active = item.id === selectedExpertiseId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedExpertiseId(item.id)}
                  className={`p-3.5 sm:p-4 text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[80px] sm:min-h-[90px] last:col-span-2 sm:last:col-span-1 ${
                    active
                      ? 'bg-[#202223] border-[#B8F36B] text-[#E8E9E5]'
                      : 'bg-[#191B1C] border-[#292C2D] text-[#929795] hover:border-[#383C3E] hover:text-[#E8E9E5]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    {getCategoryIcon(item.id)}
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#B8F36B]" />}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Expertise Detail Panel */}
          <div className="p-6 sm:p-8 md:p-10 bg-[#191B1C] border border-[#292C2D] space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B8F36B]">
                {getCategoryIcon(selectedExpertise.id)}
                <span>{selectedExpertise.title}</span>
              </div>
              <p className="text-lg sm:text-xl text-[#E8E9E5] font-light">
                {selectedExpertise.shortDesc}
              </p>
              <p className="text-sm text-[#929795] font-light leading-relaxed pt-2">
                {selectedExpertise.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#292C2D]">
              {/* Key Architectural Practices */}
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#929795]">
                  Architectural Tenets & Standards
                </div>
                <ul className="space-y-3">
                  {selectedExpertise.keyPractices.map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E8E9E5] font-light">
                      <Check className="w-4 h-4 text-[#B8F36B] shrink-0 mt-0.5" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies & Focus Areas */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#929795]">
                    Primary Technologies
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#929795]">
                    {selectedExpertise.coreTechnologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span className="text-[#E8E9E5]">{tech}</span>
                        {idx < selectedExpertise.coreTechnologies.length - 1 && (
                          <span aria-hidden="true" className="text-[#292C2D]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#929795]">
                    Focus Domains
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#929795]">
                    {selectedExpertise.focusAreas.map((area, idx) => (
                      <React.Fragment key={area}>
                        <span className="text-[#E8E9E5]">{area}</span>
                        {idx < selectedExpertise.focusAreas.length - 1 && (
                          <span aria-hidden="true" className="text-[#292C2D]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

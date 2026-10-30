import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function SitePortfolio({ onSelectProject }) {
  const [filter, setFilter] = useState('ALL');

  const filteredProjects = projectsData.filter((proj) => {
    if (filter === 'ALL') return true;
    return proj.statusType.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section id="portfolio" className="section-wrapper" style={{ position: 'relative', backgroundColor: '#FFFFFF', padding: '90px 0', overflow: 'hidden' }}>
      {/* Background Watermark (Exact Reference Style) */}
      <div className="watermark-bg" style={{ top: '15px' }}>
        PORTFOLIO
      </div>

      {/* Floating Geometric Accents */}
      <div className="geo-diamond" style={{ top: '60px', right: '12%' }} />
      <div className="geo-ring" style={{ bottom: '90px', left: '4%' }} />

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '38px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#64748B',
                textTransform: 'uppercase',
              }}
            >
              // 03 • FEATURED PROJECTS • CURATED PORTFOLIO
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
                  fontWeight: 900,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                }}
              >
                Featured Projects
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.98rem', margin: 0, fontWeight: 500 }}>
                Bespoke residential estates and architectural landmarks engineered for permanence.
              </p>
            </div>

            {/* Filter Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#F8FAFC',
                padding: '4px',
                borderRadius: '9999px',
                border: '1px solid #E2E8F0',
              }}
            >
              {[
                { id: 'ALL', label: 'All Projects', count: projectsData.length },
                { id: 'completed', label: 'Completed', count: projectsData.filter((p) => p.statusType === 'completed').length },
                { id: 'ongoing', label: 'In Progress', count: projectsData.filter((p) => p.statusType === 'ongoing').length },
              ].map((pill) => {
                const isActive = filter === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setFilter(pill.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: isActive ? 800 : 600,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: isActive ? '#F9DF04' : 'transparent',
                      color: isActive ? '#000000' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isActive ? '0 2px 8px rgba(249, 223, 4, 0.35)' : 'none',
                    }}
                  >
                    <span>{pill.label}</span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '1px 6px',
                        borderRadius: '6px',
                        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.12)' : '#E2E8F0',
                        color: isActive ? '#000000' : '#64748B',
                        fontWeight: 700,
                      }}
                    >
                      {pill.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compact 2-Column Projects Grid with Reference Card Style */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredProjects.map((project, index) => {
            const isCompleted = project.statusType === 'completed';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.09)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Project Image Frame with Yellow Corner Accent */}
                <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden', backgroundColor: '#111111' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />

                  {/* Top-Right Yellow/Dark Status Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      backgroundColor: isCompleted ? '#000000' : '#F9DF04',
                      color: isCompleted ? '#F9DF04' : '#000000',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.status}
                  </div>

                  {/* Bottom Location Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    <MapPin size={12} color="#F9DF04" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Card Body with Reference Bullets & Button */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#000000',
                        marginBottom: '10px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Yellow Dash Bullets (Exact Reference Style) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div className="ref-bullet">
                        <span>{project.type} • {project.area}</span>
                      </div>
                      <div className="ref-bullet">
                        <span>{project.features[0] || 'Seismic Zone-IV Monolithic RCC Framework'}</span>
                      </div>
                      <div className="ref-bullet">
                        <span>Contractual Handover: {project.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <button
                      onClick={() => onSelectProject(project)}
                      className="btn-yellow-ref"
                      style={{ padding: '7px 14px', fontSize: '0.78rem' }}
                    >
                      <span>View Blueprint Dossier</span>
                      <ArrowRight size={13} />
                    </button>

                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
                      Year {project.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

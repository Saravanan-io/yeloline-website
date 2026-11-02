import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Building2, Clock, Shield } from 'lucide-react';
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

        {/* Modern Sculpted Architectural Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
          }}
        >
          {filteredProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -7 }}
                onClick={() => onSelectProject(project)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(0, 0, 0, 0.07)',
                  boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.02)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(249, 223, 4, 0.7)';
                  e.currentTarget.style.boxShadow = '0 24px 50px -10px rgba(0, 0, 0, 0.08), 0 0 25px rgba(249, 223, 4, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.07)';
                  e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.02)';
                }}
              >
                {/* 1. Floating Sculpted Image Container */}
                <div
                  style={{
                    position: 'relative',
                    height: '240px',
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#0F172A',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />

                  {/* Gradient shade over image for badge contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, transparent 40%, rgba(0, 0, 0, 0.45) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top-Left Frosted Glass Location Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      backgroundColor: 'rgba(15, 23, 42, 0.72)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <MapPin size={12} color="#F9DF04" />
                    <span>{project.location}</span>
                  </div>

                  {/* Bottom-Right Architectural Index */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '12px',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      backgroundColor: 'rgba(0, 0, 0, 0.55)',
                      backdropFilter: 'blur(8px)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    PRJ // 0{index + 1}
                  </div>
                </div>

                {/* 2. Card Body Content */}
                <div style={{ padding: '18px 8px 6px 8px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.32rem',
                        fontWeight: 900,
                        color: '#0F172A',
                        margin: '0 0 10px 0',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Modern Architectural Specs Pill Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 11px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(249, 223, 4, 0.12)',
                          border: '1px solid rgba(249, 223, 4, 0.35)',
                          color: '#0F172A',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          letterSpacing: '0.03em',
                        }}
                      >
                        <Building2 size={12} color="#92750A" />
                        {project.type}
                      </span>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 11px',
                          borderRadius: '9999px',
                          backgroundColor: '#F1F5F9',
                          border: '1px solid #E2E8F0',
                          color: '#475569',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.03em',
                        }}
                      >
                        {project.area}
                      </span>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 11px',
                          borderRadius: '9999px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          color: '#64748B',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                        }}
                      >
                        <Clock size={12} color="#64748B" />
                        {project.timeline}
                      </span>
                    </div>

                    {/* Structural Deliverable Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '11px 13px',
                        borderRadius: '14px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #EDF2F7',
                        marginBottom: '16px',
                      }}
                    >
                      <Shield size={14} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span
                        style={{
                          fontSize: '0.80rem',
                          color: '#475569',
                          lineHeight: 1.5,
                          fontFamily: 'var(--font-body)',
                          fontWeight: 500,
                        }}
                      >
                        {project.features[0] || 'Seismic Zone-IV Monolithic RCC Framework'}
                      </span>
                    </div>
                  </div>

                  {/* 3. Bottom Action Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 18px',
                        borderRadius: '9999px',
                        backgroundColor: '#0F172A',
                        color: '#F9DF04',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.80rem',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
                      }}
                    >
                      <span>Explore Dossier</span>
                      <ArrowUpRight size={14} color="#F9DF04" />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: '#94A3B8',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
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

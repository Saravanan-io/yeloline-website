import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  ArrowUpRight,
  Building2,
  Clock,
  Shield,
  User,
  Folder,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { projectsData } from '../data/projectsData';

// Architectural Blueprint Card Banner (Used while photos are awaiting upload)
function BlueprintHeader({ project, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        height: '220px',
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#0B1120',
        border: '1px solid rgba(254, 198, 3, 0.25)',
      }}
    >
      {!imgError && project.image ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
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
          {/* Subtle contrast gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, transparent 45%, rgba(0, 0, 0, 0.65) 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Top-Left Location pill */}
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
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '4px 10px',
              borderRadius: '9999px',
            }}
          >
            <MapPin size={12} color="#FEC603" />
            <span>{project.location}</span>
          </div>
          {/* Top-Right Site index pill */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              color: '#000000',
              backgroundColor: '#FEC603',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.74rem',
              fontWeight: 900,
              padding: '4px 10px',
              borderRadius: '6px',
            }}
          >
            SITE // {project.index}
          </div>
          {/* Photos count pill */}
          {project.gallery && project.gallery.length > 0 && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                fontSize: '0.70rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                padding: '3px 9px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              📷 {project.gallery.length} Photos
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            background:
              'radial-gradient(circle at 80% 20%, rgba(254, 198, 3, 0.15) 0%, transparent 60%), linear-gradient(135deg, #0B1120 0%, #151D30 100%)',
          }}
        >
          {/* Subtle Blueprint Grid Lines */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.18,
              pointerEvents: 'none',
            }}
          >
            <defs>
              <pattern id={`bp-grid-${project.index}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FEC603" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#bp-grid-${project.index})`} />
            <circle cx="85%" cy="50%" r="55" stroke="#FEC603" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#FEC603" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#FEC603" strokeWidth="0.5" strokeDasharray="3 3" />
          </svg>

          {/* Top Row: Location Pill & Status */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#FFFFFF',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '4px 10px',
                borderRadius: '9999px',
                maxWidth: '70%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <MapPin size={12} color="#FEC603" style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.location}</span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: 900,
                letterSpacing: '0.08em',
                color: '#000000',
                backgroundColor: '#FEC603',
                padding: '4px 10px',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(254, 198, 3, 0.4)',
                flexShrink: 0,
              }}
            >
              SITE // {project.index}
            </span>
          </div>

          {/* Center Blueprint Icon & Folder Name */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              margin: 'auto 0',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(254, 198, 3, 0.35)',
                padding: '6px 14px',
                borderRadius: '9999px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Folder size={13} color="#FEC603" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                }}
              >
                Folder: {project.folderName}
              </span>
            </div>
          </div>

          {/* Bottom Bar: Image Queue Note */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.68rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
            }}
          >
            <span>ARCHITECTURAL DOSSIER</span>
            <span style={{ color: '#FEC603' }}>● Photos Pending Upload</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SitePortfolio({ onSelectProject }) {
  const [filter, setFilter] = useState('ALL');

  // Filter Logic
  const filteredProjects = projectsData.filter((proj) => {
    if (filter === 'residential' && proj.category !== 'Residential') return false;
    if (filter === 'renovation' && proj.category !== 'Renovation & Lifting') return false;
    if (filter === 'commercial' && proj.category !== 'Commercial') return false;
    return true;
  });

  return (
    <section
      id="portfolio"
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '70px 0 90px 0',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark */}
      <div className="watermark-bg" style={{ top: '15px' }}>
        PORTFOLIO
      </div>

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: '#64748B',
                textTransform: 'uppercase',
              }}
            >
              // OFFICIAL ARCHIVE • 22 COMPLETED & ONGOING SITES
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
              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  marginBottom: '6px',
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                }}
              >
                Project Portfolio
              </h1>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '1rem',
                  margin: 0,
                  fontWeight: 500,
                  maxWidth: '720px',
                  lineHeight: 1.5,
                }}
              >
                Completed Residential, Commercial, Renovation &amp; Extension Works arranged in the exact order of the
                supplied folder list. Click any site to view complete architectural specifications.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              marginTop: '22px',
            }}
          >
            {[
              { id: 'ALL', label: 'All 22 Sites', count: projectsData.length },
              {
                id: 'residential',
                label: 'Residential Turnkey',
                count: projectsData.filter((p) => p.category === 'Residential').length,
              },
              {
                id: 'renovation',
                label: 'Renovation & Lifting',
                count: projectsData.filter((p) => p.category === 'Renovation & Lifting').length,
              },
              {
                id: 'commercial',
                label: 'Commercial & Mixed-Use',
                count: projectsData.filter((p) => p.category === 'Commercial').length,
              },
            ].map((pill) => {
              const isActive = filter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setFilter(pill.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: isActive ? 800 : 600,
                    border: isActive ? '1px solid #FEC603' : '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? '#FEC603' : '#FFFFFF',
                    color: isActive ? '#000000' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 2px 10px rgba(254, 198, 3, 0.35)' : 'none',
                  }}
                >
                  <span>{pill.label}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      backgroundColor: isActive ? 'rgba(0, 0, 0, 0.12)' : '#F1F5F9',
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

        {/* 22 Projects Responsive Architectural Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={() => onSelectProject(project)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 10px 28px -6px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(254, 198, 3, 0.85)';
                  e.currentTarget.style.boxShadow =
                    '0 20px 45px -8px rgba(0, 0, 0, 0.09), 0 0 24px rgba(254, 198, 3, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 28px -6px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02)';
                }}
              >
                {/* 1. Header with Architectural Blueprint / Photo */}
                <BlueprintHeader project={project} index={index} />

                {/* 2. Card Body Content */}
                <div
                  style={{
                    padding: '16px 8px 6px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Client & Project Type Tag */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={13} color="#FEC603" />
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            color: '#0F172A',
                          }}
                        >
                          {project.client}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '0.70rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          color: '#64748B',
                          backgroundColor: '#F1F5F9',
                          padding: '2px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.24rem',
                        fontWeight: 900,
                        color: '#0F172A',
                        margin: '0 0 10px 0',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Architectural Specs Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(254, 198, 3, 0.14)',
                          border: '1px solid rgba(254, 198, 3, 0.4)',
                          color: '#0F172A',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                        }}
                      >
                        <Building2 size={11} color="#B45309" />
                        {project.type}
                      </span>

                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          color: '#475569',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}
                      >
                        {project.builtUpArea || project.area}
                      </span>
                    </div>

                    {/* Overview Brief Snippet */}
                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: '#64748B',
                        lineHeight: 1.5,
                        margin: '0 0 12px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Key Highlights Chips */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        padding: '10px 12px',
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #EDF2F7',
                        marginBottom: '14px',
                      }}
                    >
                      {project.keyHighlights.slice(0, 2).map((hl, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <CheckCircle2 size={12} color="#10B981" style={{ flexShrink: 0 }} />
                          <span
                            style={{
                              fontSize: '0.76rem',
                              color: '#334155',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {hl}
                          </span>
                        </div>
                      ))}
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
                        gap: '7px',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        backgroundColor: '#0F172A',
                        color: '#FEC603',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        boxShadow: '0 3px 10px rgba(15, 23, 42, 0.15)',
                      }}
                    >
                      <span>Explore Dossier</span>
                      <ArrowUpRight size={13} color="#FEC603" />
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: '#94A3B8',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {project.folderName}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '20px',
              border: '1px dashed #CBD5E1',
              marginTop: '20px',
            }}
          >
            <Folder size={36} color="#94A3B8" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
              No Sites Found in This Category
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '16px' }}>
              Select "All Sites" to view our complete project portfolio.
            </p>
            <button
              onClick={() => setFilter('ALL')}
              style={{
                backgroundColor: '#FEC603',
                color: '#000000',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import {
  X,
  MapPin,
  Building2,
  Maximize2,
  CheckCircle2,
  Shield,
  Sparkles,
  User,
  Folder,
  Layers,
  Calendar,
} from 'lucide-react';

export default function ProjectModal({ project, onClose, onConsultProject }) {
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#000000';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Image Hero / Blueprint Banner */}
        <div style={{ position: 'relative', height: '280px', width: '100%', backgroundColor: '#0B1120' }}>
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
                background:
                  'radial-gradient(circle at 75% 25%, rgba(254, 198, 3, 0.18) 0%, transparent 60%), linear-gradient(135deg, #0B1120 0%, #151D30 100%)',
              }}
            >
              {/* Blueprint Grid Lines */}
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
                  <pattern id="modal-bp-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#FEC603" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#modal-bp-grid)" />
                <circle cx="80%" cy="50%" r="70" stroke="#FEC603" strokeWidth="1" strokeDasharray="5 5" fill="none" />
              </svg>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(254, 198, 3, 0.15)',
                  border: '1px solid #FEC603',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  marginBottom: '10px',
                }}
              >
                <Folder size={14} color="#FEC603" />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#FEC603',
                  }}
                >
                  Folder Reference: {project.folderName}
                </span>
              </div>
              <p
                style={{
                  position: 'relative',
                  zIndex: 2,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.82rem',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Architectural Site Blueprint • Official Yeloline Dossier
              </p>
            </div>
          )}

          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 35%, rgba(11, 17, 32, 0.95) 100%)',
            }}
          />

          {/* Bottom Title Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '24px',
              right: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '12px',
              zIndex: 5,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span
                  style={{
                    padding: '3px 9px',
                    borderRadius: '6px',
                    backgroundColor: '#FEC603',
                    color: '#000000',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  SITE // {project.index}
                </span>
                <span
                  style={{
                    padding: '3px 9px',
                    borderRadius: '6px',
                    backgroundColor: project.statusType === 'completed' ? '#10B981' : '#F59E0B',
                    color: '#FFFFFF',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.status}
                </span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.02em',
                }}
              >
                {project.title}
              </h2>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: '#FFFFFF',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Year: <strong style={{ color: '#FEC603' }}>{project.year}</strong>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Key Quick Specs Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              background: '#F8FAFC',
              padding: '16px 20px',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={18} color="#FEC603" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Client</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A' }}>{project.client}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={18} color="#FEC603" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Location</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A' }}>{project.location}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building2 size={18} color="#FEC603" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Project Type</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A' }}>{project.type}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Maximize2 size={18} color="#FEC603" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Built-Up Space</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A' }}>
                  {project.builtUpArea || project.area}
                </div>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h4
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#0F172A',
                marginBottom: '8px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Project Overview
            </h4>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.94rem', margin: 0, fontFamily: 'var(--font-body)' }}>
              {project.description}
            </p>
          </div>

          {/* Key Highlights Bullet Points */}
          {project.keyHighlights && project.keyHighlights.length > 0 && (
            <div>
              <h4
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Key Highlights
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                  gap: '8px',
                }}
              >
                {project.keyHighlights.map((hl, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '10px 14px',
                      background: '#F8FAFC',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.84rem', color: '#334155', fontWeight: 600 }}>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materials & Quality Standards Breakdown */}
          {project.materialsAndStandards && project.materialsAndStandards.length > 0 && (
            <div>
              <h4
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Materials &amp; Quality Standards
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                  gap: '8px',
                }}
              >
                {project.materialsAndStandards.map((mat, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '10px 14px',
                      background: 'rgba(254, 198, 3, 0.08)',
                      borderRadius: '10px',
                      border: '1px solid rgba(254, 198, 3, 0.3)',
                    }}
                  >
                    <Shield size={15} color="#B45309" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.84rem', color: '#0F172A', fontWeight: 600 }}>{mat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Structural Features Matrix */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '10px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Architectural &amp; Engineering Specifications
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                  gap: '8px',
                }}
              >
                {project.features.map((feat, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '9px 12px',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <CheckCircle2 size={14} color="#000000" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 500 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              paddingTop: '16px',
              borderTop: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748B',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
              }}
            >
              <Sparkles size={16} color="#FEC603" />
              <span>Turnkey warranty &amp; structural engineering dossier documented by Yeloline.</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={onClose}
                className="btn-black-ref"
                style={{ padding: '9px 18px', fontSize: '0.82rem' }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onConsultProject) onConsultProject(project);
                }}
                className="btn-yellow-ref"
                style={{ padding: '9px 20px', fontSize: '0.82rem' }}
              >
                <span>Consult On Similar Project</span>
                <span style={{ fontSize: '0.9rem' }}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

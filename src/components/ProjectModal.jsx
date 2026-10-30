import React from 'react';
import { X, MapPin, Home, Maximize2, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function ProjectModal({ project, onClose, onConsultProject }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
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
          borderRadius: '16px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Image Hero */}
        <div style={{ position: 'relative', height: '300px', width: '100%' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.85) 100%)',
            }}
          />

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
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: project.statusType === 'completed' ? '#10B981' : '#F59E0B',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '6px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {project.status.toUpperCase()} ARCHITECTURAL LANDMARK
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                {project.title}
              </h2>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#FFFFFF',
                fontWeight: 600,
              }}
            >
              Year: <strong style={{ color: '#FDE68A' }}>{project.year}</strong>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Key Quick Specs Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              background: '#F8FAFC',
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="#000000" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Location</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>{project.location}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={18} color="#000000" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Configuration</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>{project.type}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Maximize2 size={18} color="#000000" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Built-Up Space</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>{project.area}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} color="#000000" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Handover / Status</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>{project.timeline}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
              Architectural Concept &amp; Engineering
            </h4>
            <p style={{ color: '#475569', lineHeight: 1.65, fontSize: '0.9rem', margin: 0 }}>
              {project.description}
            </p>
          </div>

          {/* Structural Features Matrix */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
              Structural &amp; Material Specifications
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '8px',
              }}
            >
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '9px 12px',
                    background: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <CheckCircle2 size={15} color="#000000" />
                  <span style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 500 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.8rem' }}>
              <Sparkles size={15} color="#000000" />
              <span>Turnkey warranty &amp; structural dossier available upon private request.</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={onClose} className="btn-black-ref" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onConsultProject) onConsultProject(project);
                }}
                className="btn-yellow-ref"
                style={{ padding: '8px 18px', fontSize: '0.8rem' }}
              >
                <span>Request Similar Villa Blueprint</span>
                <span style={{ fontSize: '0.9rem' }}>↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

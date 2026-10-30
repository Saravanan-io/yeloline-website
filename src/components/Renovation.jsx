import React, { useState, useRef } from 'react';
import { Hammer, MoveHorizontal, Sliders, Shield, Layers } from 'lucide-react';
import { renovationData } from '../data/projectsData';

export default function Renovation({ onGetQuote }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Estimator state
  const [renoType, setRenoType] = useState('full-villa');
  const [renoSqft, setRenoSqft] = useState(3500);

  const containerRef = useRef(null);

  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const onTouchMove = (e) => {
    handleSliderMove(e.touches[0].clientX);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const getEstimatedDuration = () => {
    if (renoType === 'facade') return '45 - 60 Days';
    if (renoType === 'interior') return '75 - 90 Days';
    return '110 - 140 Days';
  };

  return (
    <section
      id="renovation"
      className="section-wrapper"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        padding: '100px 0',
      }}
    >
      {/* Background Watermark Typography */}
      <div
        className="watermark-bg select-none pointer-events-none"
        style={{ top: '20px', left: '3%' }}
      >
        RENOVATION
      </div>

      {/* Floating Geometric Accents from Reference Style */}
      <div
        className="geo-diamond"
        style={{
          position: 'absolute',
          top: '80px',
          right: '5%',
          width: '32px',
          height: '32px',
        }}
      />
      <div
        className="geo-ring"
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '4%',
          width: '42px',
          height: '42px',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '46px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Hammer size={13} color="#000000" />
            <span>07 // PROJECT BEFORE &amp; AFTER • STRUCTURAL METAMORPHOSIS</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 900,
              color: '#000000',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: '10px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Project Before &amp; After Transformation
          </h2>
          <p
            style={{
              color: '#475569',
              fontSize: '1rem',
              maxWidth: '720px',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Transforming conventional plots and aging structures into modern architectural monuments with zero safety compromises.
          </p>
        </div>

        {/* 1. Interactive Before & After Transformation Slider with Offset Backdrop */}
        <div style={{ marginBottom: '52px', position: 'relative' }}>
          {/* Subtle yellow offset backing block */}
          <div
            style={{
              position: 'absolute',
              top: '26px',
              right: '-10px',
              width: '65%',
              height: '85%',
              backgroundColor: '#F9DF04',
              borderRadius: '4px',
              zIndex: 0,
              opacity: 0.9,
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#000000',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase',
                }}
              >
                <MoveHorizontal size={16} color="#000000" />
                <span>Interactive Slider: Drag to compare Before &amp; After transformation</span>
              </div>
              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#000000',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  background: '#F9DF04',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  letterSpacing: '0.04em',
                }}
              >
                PRECISION COMPARATOR
              </div>
            </div>

            {/* Interactive Slider Canvas */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={onMouseMove}
              onTouchMove={onTouchMove}
              style={{
                position: 'relative',
                width: '100%',
                containerType: 'inline-size',
                height: 'clamp(340px, 44vw, 500px)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'ew-resize',
                border: '2px solid #000000',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                userSelect: 'none',
                backgroundColor: '#0B0F17',
              }}
            >
              {/* "AFTER" Image - Yeloline Luxury Transformation */}
              <img
                src="/images/renovation_masterpiece.jpg"
                alt="Yeloline After Renovation Transformation"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
              />

              {/* "BEFORE" Image Layer (Clipped dynamically by slider position) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${sliderPosition}%`,
                  overflow: 'hidden',
                  borderRight: '3px solid #F9DF04',
                  boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
                  backgroundColor: '#111827',
                }}
              >
                <img
                  src="/images/skyline_residency.jpg"
                  alt="Before Structural Renovation"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100cqi',
                    minWidth: '100%',
                    maxWidth: 'none',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(90%) contrast(1.1) brightness(0.75)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Before Floating Label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                  }}
                >
                  BEFORE // INITIAL STRUCTURAL SHELL
                </div>
              </div>

              {/* After Floating Label */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#F9DF04',
                  border: '1px solid #000000',
                  color: '#000000',
                  padding: '6px 16px',
                  borderRadius: '2px',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                }}
              >
                AFTER // YELOLINE TURNKEY RESIDENCE
              </div>

              {/* Draggable Divider Handle */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${sliderPosition}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  border: '3px solid #F9DF04',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F9DF04',
                  cursor: 'ew-resize',
                  zIndex: 10,
                }}
              >
                <MoveHorizontal size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Connected Engineering Conduit Pipeline */}
        <div style={{ marginBottom: '52px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                color: '#64748B',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              ENGINEERING METHODOLOGY • 4-PHASE PRECISION CONDUIT
            </span>
            <h3
              style={{
                fontSize: '1.5rem',
                color: '#000000',
                marginTop: '4px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
              }}
            >
              The Structural Metamorphosis Conduit
            </h3>
          </div>

          {/* 4-Phase Grid styled with reference cues */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {renovationData.steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#000000',
                    borderRadius: '3px',
                    border: '1px solid',
                    borderColor: isSelected ? '#000000' : '#E2E8F0',
                    borderTop: isSelected ? '4px solid #F9DF04' : '4px solid #000000',
                    padding: '22px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 12px 28px rgba(0, 0, 0, 0.2)' : '0 4px 14px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 900, color: isSelected ? '#F9DF04' : '#64748B', letterSpacing: '0.05em' }}>
                      PHASE 0{idx + 1}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: isSelected ? '#CBD5E1' : '#64748B', fontWeight: 700 }}>
                      {step.timeline}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
                    {step.title}
                  </h4>

                  <p style={{ fontSize: '0.84rem', color: isSelected ? '#CBD5E1' : '#64748B', lineHeight: 1.55, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Blueprint Scope Console */}
        <div
          style={{
            position: 'relative',
            background: '#FFFFFF',
            border: '2px solid #000000',
            borderRadius: '4px',
            padding: '32px 28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Blueprint Drafting Controls */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sliders size={16} color="#000000" />
              <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#000000', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                SPATIAL SCOPE ESTIMATOR
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000', textTransform: 'uppercase', marginBottom: '20px' }}>
              Configure Your Structural Renovation
            </h3>

            {/* Scope Type Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#475569', marginBottom: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                Transformation Scope
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { id: 'full-villa', label: 'Complete Villa Overhaul' },
                  { id: 'interior', label: 'Living & Atrium Conversion' },
                  { id: 'facade', label: 'Luxury Facade & Balconies' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setRenoType(type.id)}
                    style={{
                      padding: '9px 16px',
                      borderRadius: '3px',
                      border: '1px solid',
                      borderColor: renoType === type.id ? '#000000' : '#CBD5E1',
                      backgroundColor: renoType === type.id ? '#F9DF04' : '#F8FAFC',
                      color: '#000000',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>
                  Estimated Built-Up Area
                </label>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: '#000000' }}>
                  {renoSqft.toLocaleString()} sq.ft.
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="12000"
                step="250"
                value={renoSqft}
                onChange={(e) => setRenoSqft(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#000000',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          {/* Specifications Output */}
          <div
            style={{
              borderLeft: '2px solid #E2E8F0',
              paddingLeft: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '3px', backgroundColor: '#000000', color: '#F9DF04', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                  Estimated Engineering Turnaround
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#000000' }}>
                  {getEstimatedDuration()}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '3px', backgroundColor: '#000000', color: '#F9DF04', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                  Structural Assurance
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#000000' }}>
                  15-Year Non-Settlement Warranty
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.55, margin: 0 }}>
              Includes 3D architectural rendering, load-bearing structural clearance, municipal compliance, and high-precision finishes.
            </p>

            <button
              onClick={onGetQuote}
              className="btn-yellow-ref"
              style={{ width: '100%', marginTop: '6px', padding: '12px 20px', fontSize: '0.84rem', justifyContent: 'center' }}
            >
              <span>Schedule On-Site Structural Audit</span>
              <span style={{ fontSize: '0.9rem' }}>↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

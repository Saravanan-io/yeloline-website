import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function AboutUs({ onStartProject }) {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Seismic Grade A+ Engineering',
      desc: 'Engineered for Zone-IV seismic resistance with M30+ concrete and Fe550D primary steel frameworks.',
    },
    {
      icon: Award,
      title: '100% Fixed BOQ Guarantee',
      desc: 'Transparent line-item billing with contractual price freeze and zero hidden mid-project escalations.',
    },
    {
      icon: Compass,
      title: 'Bioclimatic Architecture',
      desc: 'Passive solar orientation, natural ventilation corridors, and energy-efficient thermal envelope design.',
    },
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '90px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark (Exact Reference Style) */}
      <div className="watermark-bg" style={{ top: '15px' }}>
        PHILOSOPHY
      </div>

      {/* Floating Geometric Shapes */}
      <div className="geo-ring" style={{ top: '60px', left: '5%' }} />
      <div className="geo-diamond" style={{ bottom: '40px', right: '8%' }} />

      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
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
              // 02 • ABOUT YELOLINE • ARCHITECTURAL STUDIO
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
                  lineHeight: 1.15,
                  fontFamily: 'var(--font-heading)',
                  maxWidth: '750px',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                We Build More Than Structures.
              </h2>
              <p
                style={{
                  color: '#475569',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  maxWidth: '680px',
                  marginTop: '8px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                A building is a lifelong dream shaped by dedication, perseverance, and technical mastery.
                Since 2014, Yeloline has transformed visionary concepts into enduring architectural landmarks.
              </p>
            </div>

            <button
              onClick={onStartProject}
              className="btn-yellow-ref"
              id="about-cta-btn"
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Main Content: Photographic Showcase & Narrative */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left Photographic Showcase with Black Backing Block (Reference Block 2 Style) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* The Solid Black Backdrop Block */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '-10px',
                width: '85%',
                height: '92%',
                backgroundColor: '#111111',
                borderRadius: '8px',
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.2)',
                border: '1px solid #E2E8F0',
                backgroundColor: '#111111',
              }}
            >
              <img
                src="/images/about_architecture.jpg"
                alt="Yeloline Architectural Engineering Craftsmanship"
                style={{
                  width: '100%',
                  height: '380px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Overlapping Precision Spec Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '-14px',
                right: '10px',
                zIndex: 2,
                backgroundColor: '#000000',
                color: '#FFFFFF',
                padding: '12px 18px',
                borderRadius: '6px',
                border: '1.5px solid #F9DF04',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                maxWidth: '240px',
              }}
            >
              <div style={{ fontSize: '0.66rem', color: '#CBD5E1', fontWeight: 700 }}>
                CERTIFIED STANDARDS
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#F9DF04' }}>
                IS 456 &amp; IS 1893
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                Structural Stability Code Compliance
              </div>
            </div>
          </div>

          {/* Right Narrative & Compact Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: '#334155',
                margin: 0,
              }}
            >
              At Yeloline, we approach construction not merely as pouring concrete and stacking masonry,
              but as the rigorous discipline of giving physical form to human aspirations. Every cantilever,
              every span, and every facade we engineer is built to outlast generations with zero structural compromise.
            </p>

            {/* Compact Pillars List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '14px 18px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: '#000000',
                        color: '#F9DF04',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.98rem',
                          fontWeight: 700,
                          color: '#000000',
                          marginBottom: '2px',
                        }}
                      >
                        {pillar.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.84rem',
                          color: '#64748B',
                          lineHeight: 1.45,
                          margin: 0,
                        }}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quality Checklist */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
                paddingTop: '14px',
                borderTop: '1px solid #E2E8F0',
              }}
            >
              {[
                'NDT Concrete Core Tested',
                'Fe550D Primary Steel',
                'Dual-Layer Waterproofing',
                'Single-Point Contact',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <CheckCircle2 size={15} color="#000000" />
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#000000',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

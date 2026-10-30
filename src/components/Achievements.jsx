import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck } from 'lucide-react';

export default function Achievements() {
  const stats = [
    {
      number: '250+',
      label: 'Turnkey Builds Delivered',
      subtext: 'Bespoke residential estates & commercial landmarks',
    },
    {
      number: '500,000+',
      label: 'Sq. Ft. Built Footprint',
      subtext: 'Engineered with Seismic Zone-IV monolithic RCC',
    },
    {
      number: '10+ Yrs',
      label: 'Engineering Track Record',
      subtext: 'Pioneering structural excellence since 2014',
    },
    {
      number: '100%',
      label: 'Structural Safety Index',
      subtext: 'Zero structural failures across a decade of builds',
    },
    {
      number: '15 Yrs',
      label: 'Comprehensive Warranty',
      subtext: 'Written legal guarantee on slabs & waterproofing',
    },
    {
      number: '0%',
      label: 'Budget Overrun Rate',
      subtext: 'Strict contractual line-item price protection',
    },
  ];

  const certifications = [
    { title: 'ISO 9001:2015', desc: 'Certified Quality Management' },
    { title: 'ZONE-IV SEISMIC', desc: 'Earthquake-Resistant RCC' },
    { title: 'IGBC COMPLIANT', desc: 'Green Building Standards' },
    { title: 'FE-550D REBAR', desc: 'Ultra High-Tensile Steel' },
  ];

  return (
    <section
      id="achievements"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark Typography */}
      <div
        className="watermark-bg select-none pointer-events-none"
        style={{ top: '20px', right: '3%' }}
      >
        STATISTICS
      </div>

      {/* Floating Geometric Accents from Reference Style */}
      <div
        className="geo-diamond"
        style={{
          position: 'absolute',
          top: '70px',
          left: '4%',
          width: '32px',
          height: '32px',
        }}
      />
      <div
        className="geo-ring"
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '5%',
          width: '38px',
          height: '38px',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '46px' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Trophy size={13} color="#000000" />
            <span>08 // VERIFIABLE TRACK RECORD • OUR ACHIEVEMENTS</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div>
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
                Numbers That Define A Decade
              </h2>
              <p
                style={{
                  color: '#475569',
                  fontSize: '1rem',
                  maxWidth: '680px',
                  lineHeight: 1.6,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Behind every number is a home built with passion, rigorous structural calculations,
                and uncompromising honesty. Here is our decade-long footprint.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Key Stats Grid styled with Reference Card Architecture */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '36px',
          }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid #000000',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000000';
                e.currentTarget.style.borderTopColor = '#F9DF04';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.borderTopColor = '#000000';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.04)';
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.2rem, 3.2vw, 2.8rem)',
                    fontWeight: 900,
                    color: '#000000',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    marginBottom: '10px',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#000000',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.84rem',
                    color: '#64748B',
                    lineHeight: 1.5,
                  }}
                >
                  {stat.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signature Reference Element: Yellow Card Banner (exact match for bottom block of reference image) */}
        <div
          style={{
            backgroundColor: '#F9DF04',
            borderRadius: '4px',
            border: '2px solid #000000',
            padding: '36px 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'center',
            boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.15)',
            marginBottom: '28px',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                fontWeight: 900,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                marginBottom: '14px',
              }}
            >
              Certified Structural Standards
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
              <div className="ref-bullet" style={{ color: '#000000', fontSize: '0.9rem', fontWeight: 600 }}>
                100% Core Non-Destructive Lab Ultrasonic Compaction Testing
              </div>
              <div className="ref-bullet" style={{ color: '#000000', fontSize: '0.9rem', fontWeight: 600 }}>
                High-Yield Primary Tata Tiscon Fe550D Rebar Exclusively
              </div>
              <div className="ref-bullet" style={{ color: '#000000', fontSize: '0.9rem', fontWeight: 600 }}>
                15-Year Written Transferable Structural Non-Settlement Warranty
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-black-ref"
              style={{ padding: '11px 22px', fontSize: '0.82rem' }}
            >
              <span>Verify Engineering Dossier</span>
              <span style={{ fontSize: '0.9rem' }}>↓</span>
            </button>
          </div>

          {/* Right Column: 4 Credential Badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  borderRadius: '3px',
                  padding: '16px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '2px',
                    backgroundColor: '#F9DF04',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: '#F9DF04',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cert.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '2px', fontWeight: 500 }}>
                    {cert.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

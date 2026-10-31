import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import FloatingIsland3D from './FloatingIsland3D';
import FlyingBirds3D from './FlyingBirds3D';

export default function Hero({ onExploreProjects, onGetQuote }) {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '90vh',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        paddingTop: '135px',
        paddingBottom: '90px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 1. Giant Background Watermark (Exact Reference Style: "OFFERS" / "YELOLINE") */}
      <div className="watermark-bg" style={{ top: '25px', opacity: 0.65 }}>
        YELOLINE
      </div>

      {/* 2. Realistic 3D Flying Birds Animation in the Upper Sky */}
      <FlyingBirds3D />

      {/* 3. Floating Geometric Accents from Reference Image */}
      <div className="geo-diamond" style={{ top: '130px', left: '46%' }} />
      <div className="geo-ring" style={{ top: '360px', right: '3%' }} />
      <div className="geo-triangle" style={{ bottom: '80px', left: '4%' }} />

      <div className="app-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Typographic Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >
            {/* Top Pill / Label */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  color: '#64748B',
                  textTransform: 'uppercase',
                }}
              >
                // ARCHITECTURAL EXCELLENCE • EST. 2014
              </span>
            </div>

            {/* Bold Headline Matching Reference */}
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  color: '#000000',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Building Dreams. <br />
                <span style={{ color: '#000000' }}>Shaping Tomorrow.</span>
              </h1>
            </div>

            {/* Bullet Points with Yellow Dash (Exact Reference Style) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
              <div className="ref-bullet">
                <span>Turnkey engineering from geotechnical soil testing to bespoke interior handover</span>
              </div>
              <div className="ref-bullet">
                <span>Monolithic Seismic Zone-IV high-yield reinforced concrete structural skeleton</span>
              </div>
              <div className="ref-bullet">
                <span>100% Fixed-Price line-item BOQ with zero mid-construction escalation</span>
              </div>
              <div className="ref-bullet">
                <span>15-Year legally enforceable structural non-settlement &amp; waterproofing warranty</span>
              </div>
            </div>

            {/* Reference Buttons (Yellow Button with Arrow + Secondary Black) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                marginTop: '8px',
              }}
            >
              <button
                onClick={onExploreProjects}
                className="btn-yellow-ref"
                id="hero-primary-cta"
              >
                <span>Explore Portfolio</span>
                <ArrowDown size={14} />
              </button>

              <button
                onClick={onGetQuote}
                className="btn-black-ref"
                id="hero-secondary-cta"
              >
                <span>Book Consultation</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '18px',
                paddingTop: '22px',
                marginTop: '6px',
                borderTop: '2px solid #000000',
                maxWidth: '540px',
              }}
            >
              {[
                { number: '250+', label: 'Turnkey Builds' },
                { number: '100%', label: 'Seismic Safety' },
                { number: '15 Yrs', label: 'Written Warranty' },
                { number: '0%', label: 'Price Escalation' },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.45rem',
                      fontWeight: 900,
                      color: '#000000',
                      lineHeight: 1,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      color: '#64748B',
                      marginTop: '4px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Floating Sky Island House with Falling Stones */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FloatingIsland3D />
          </div>
        </div>
      </div>
    </section>
  );
}

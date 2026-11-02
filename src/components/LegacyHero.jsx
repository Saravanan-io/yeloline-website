import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import FloatingIsland3D from './FloatingIsland3D';
import FlyingBirds3D from './FlyingBirds3D';

export default function LegacyHero({ onExploreProjects, onGetQuote }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section
      id="architectural-excellence"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '88vh',
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        paddingTop: '110px',
        paddingBottom: '90px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* 1. Giant Background Watermark */}
      <div 
        className="watermark-bg select-none pointer-events-none" 
        style={{ top: '25px', opacity: 0.55 }}
      >
        YELOLINE
      </div>

      {/* Subtle Ambient Light Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'radial-gradient(ellipse at 80% 30%, rgba(249, 223, 4, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 2. Realistic 3D Flying Birds Animation in the Upper Sky */}
      <FlyingBirds3D />

      {/* 3. Floating Geometric Accents */}
      <div className="geo-diamond" style={{ top: '130px', left: '46%' }} />
      <div className="geo-ring" style={{ top: '360px', right: '3%' }} />
      <div className="geo-triangle" style={{ bottom: '80px', left: '4%' }} />

      <motion.div 
        className="app-container" 
        style={{ position: 'relative', zIndex: 1, width: '100%' }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Typographic Narrative */}
          <motion.div
            variants={containerVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Top Pill / Badge */}
            <motion.div variants={itemVariants}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(249, 223, 4, 0.15)',
                  border: '1px solid rgba(249, 223, 4, 0.35)',
                }}
              >
                <Sparkles size={13} color="#92750a" />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: '#0F172A',
                    textTransform: 'uppercase',
                  }}
                >
                  ARCHITECTURAL EXCELLENCE • EST. 2014
                </span>
              </div>
            </motion.div>

            {/* Bold Headline */}
            <motion.div variants={itemVariants}>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.06,
                  color: '#0F172A',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Building Dreams. <br />
                <span style={{ color: '#0F172A' }}>Shaping Tomorrow.</span>
              </h2>
            </motion.div>

            {/* Bullet Points with Gold Dots */}
            <motion.div 
              variants={itemVariants}
              style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}
            >
              {[
                'Turnkey engineering from geotechnical soil testing to bespoke interior handover',
                'Monolithic Seismic Zone-IV high-yield reinforced concrete structural skeleton',
                '100% Fixed-Price line-item BOQ with zero mid-construction escalation',
                '15-Year legally enforceable structural non-settlement & waterproofing warranty',
              ].map((bullet, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.88rem, 1vw, 0.96rem)',
                    color: '#334155',
                    lineHeight: 1.5,
                    fontWeight: 450,
                  }}
                >
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#F9DF04',
                      boxShadow: '0 0 10px rgba(249, 223, 4, 0.6)',
                      marginTop: '7px',
                      flexShrink: 0,
                    }}
                  />
                  <span>{bullet}</span>
                </div>
              ))}
            </motion.div>

            {/* Reference Modern Pill Buttons */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                marginTop: '10px',
              }}
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreProjects}
                className="btn-yellow-ref"
                id="hero-primary-cta"
              >
                <span>Explore Portfolio</span>
                <ArrowDown size={14} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetQuote}
                className="btn-black-ref"
                id="hero-secondary-cta"
              >
                <span>Book Consultation</span>
                <ArrowUpRight size={14} />
              </motion.button>
            </motion.div>

            {/* Trust Metrics Bar */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '18px',
                paddingTop: '24px',
                marginTop: '8px',
                borderTop: '2px solid rgba(15, 23, 42, 0.08)',
                maxWidth: '560px',
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
                      fontSize: 'clamp(1.4rem, 1.8vw, 1.65rem)',
                      fontWeight: 900,
                      color: '#0F172A',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.74rem',
                      color: '#64748B',
                      marginTop: '5px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Floating Sky Island House with Falling Stones */}
          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <FloatingIsland3D />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

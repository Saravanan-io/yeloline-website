import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, ShieldCheck, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function AboutUs({ onStartProject }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { 
      opacity: 1, y: 0, scale: 1, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '110px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Watermark (Modern Style) */}
      <div className="watermark-bg" style={{ top: '15px' }}>
        PHILOSOPHY
      </div>

      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'radial-gradient(ellipse at 80% 30%, rgba(249, 223, 4, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="geo-ring" style={{ top: '60px', left: '5%' }} />
      <div className="geo-diamond" style={{ bottom: '40px', right: '8%' }} />

      <motion.div 
        className="app-container" 
        style={{ position: 'relative', zIndex: 1 }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '48px' }}>
          <div style={{ marginBottom: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.76rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: '#94A3B8',
                textTransform: 'uppercase',
              }}
            >
              03 • About Yeloline • Architectural Studio
            </span>
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
                  fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-heading)',
                  maxWidth: '750px',
                  margin: 0,
                }}
              >
                We Build More Than Structures.
              </h2>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  maxWidth: '680px',
                  marginTop: '12px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                }}
              >
                A building is a lifelong dream shaped by dedication, perseverance, and technical mastery.
                Since 2014, Yeloline has transformed visionary concepts into enduring architectural landmarks.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartProject}
              className="btn-yellow-ref"
              id="about-cta-btn"
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={15} />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content: Photographic Showcase & Narrative */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Photographic Showcase with Modern Rounded Design */}
          <motion.div 
            variants={itemVariants}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* Gradient Backdrop Block */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '-10px',
                width: '85%',
                height: '92%',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                borderRadius: 'var(--radius-xl)',
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <img
                src="/images/about_architecture.jpg"
                alt="Yeloline Architectural Engineering Craftsmanship"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Overlapping Precision Spec Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                bottom: '-16px',
                right: '10px',
                zIndex: 2,
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                color: '#FFFFFF',
                padding: '14px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(249, 223, 4, 0.3)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                maxWidth: '240px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                CERTIFIED STANDARDS
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#F9DF04', marginTop: '2px' }}>
                IS 456 &amp; IS 1893
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '3px', fontWeight: 400 }}>
                Structural Stability Code Compliance
              </div>
            </motion.div>
          </motion.div>

          {/* Right Narrative & Compact Pillars */}
          <motion.div 
            variants={containerVariants}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.75,
                color: '#475569',
                margin: 0,
                fontWeight: 400,
              }}
            >
              At Yeloline, we approach construction not merely as pouring concrete and stacking masonry,
              but as the rigorous discipline of giving physical form to human aspirations. Every cantilever,
              every span, and every facade we engineer is built to outlast generations with zero structural compromise.
            </motion.p>

            {/* Compact Pillars List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ x: 6, scale: 1.01 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      padding: '18px 20px',
                      backgroundColor: 'rgba(248, 250, 252, 0.8)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'default',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                        color: '#F9DF04',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.96rem',
                          fontWeight: 700,
                          color: '#0F172A',
                          marginBottom: '3px',
                        }}
                      >
                        {pillar.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.84rem',
                          color: '#64748B',
                          lineHeight: 1.5,
                          margin: 0,
                          fontWeight: 400,
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
            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              {[
                'NDT Concrete Core Tested',
                'Fe550D Primary Steel',
                'Dual-Layer Waterproofing',
                'Single-Point Contact',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="#10B981" />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

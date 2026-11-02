import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <footer
      ref={ref}
      style={{
        background: 'linear-gradient(145deg, #0B0F17 0%, #0F172A 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        paddingTop: '72px',
        paddingBottom: '88px',
        position: 'relative',
        zIndex: 10,
        color: '#F8FAFC',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '10%',
          width: '40%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(249, 223, 4, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        className="app-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '52px',
          }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'linear-gradient(135deg, #F9DF04 0%, #E5CC00 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  boxShadow: '0 4px 14px rgba(249, 223, 4, 0.25)',
                }}
              >
                Y
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                  YELOLINE.
                </span>
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', color: '#F9DF04', fontWeight: 600, textTransform: 'uppercase' }}>
                  CONSTRUCTION
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.7, fontWeight: 400 }}>
              "A building is more than bricks and concrete… it's a lifelong dream shaped by dedication and perseverance. Realizing it with total peace of mind is our commitment."
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F9DF04', fontSize: '0.8rem', fontWeight: 600 }}>
              <ShieldCheck size={15} />
              <span>Registered Architectural Practice • Est. 2014</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Home Page', page: 'home' },
                { label: 'Site Portfolio', page: 'portfolio' },
                { label: 'Renovation Transformations', page: 'renovation' },
                { label: 'Contact Us & Free Quote', page: 'contact' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={`#${link.page}`}
                  onClick={(e) => handleNav(e, link.page)}
                  style={{
                    color: '#64748B',
                    textDecoration: 'none',
                    fontSize: '0.86rem',
                    fontWeight: 400,
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#F9DF04')}
                  onMouseLeave={(e) => (e.target.style.color = '#64748B')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Regional Studios */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Regional Studios
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={15} color="#F9DF04" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ lineHeight: 1.5 }}>Ahmedabad Studio: SG Highway Financial Corridor, Gujarat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={15} color="#F9DF04" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ lineHeight: 1.5 }}>Surat Studio: VIP Road, Vesu Waterfront, Gujarat</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={15} color="#F9DF04" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ lineHeight: 1.5 }}>Vadodara Studio: Alkapuri High Street, Gujarat</span>
              </div>
            </div>
          </motion.div>

          {/* Direct Contact */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
              Direct Line
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="tel:+919876543210"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 400, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Phone size={15} color="#F9DF04" />
                <span>+91 98765 43210</span>
              </a>

              <a
                href="mailto:projects@yelolineconstruction.com"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 400, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                <Mail size={15} color="#F9DF04" />
                <span>projects@yelolineconstruction.com</span>
              </a>

              <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px', fontWeight: 400 }}>
                Studio Hours: Mon – Sat · 9:00 AM – 8:00 PM IST
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 400 }}>
            © 2026 YELOLINE CONSTRUCTION. All rights reserved. Registered Architectural Practice.
          </div>

          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #F9DF04, #E5CC00)';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}

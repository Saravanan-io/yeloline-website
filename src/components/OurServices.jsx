import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Building, ArrowRight, CheckCircle2, Play, Pause } from 'lucide-react';

export default function OurServices({ onSelectService }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeService, setActiveService] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  // 8 Services arranged in a full 360° circle at 45° intervals
  // Angles start from Top (12 o'clock = -90°) and proceed clockwise
  const services = [
    {
      no: '01',
      id: 'residential',
      title: 'Residential Construction',
      tagline: 'Homes planned for modern family living',
      scope: 'Custom private villas, multi-storey turnkey homes, and monolithic earthquake-resistant RCC framed structures.',
      deliverables: ['Turnkey Architectural Execution', 'Seismic Zone-IV RCC Framework', 'Thermal & Acoustic Insulation'],
      angleDeg: -90, // 12 o'clock (Top)
    },
    {
      no: '02',
      id: 'duplex-luxury',
      title: 'Duplex & Luxury Homes',
      tagline: 'Thoughtful multi-level home design',
      scope: 'Ultra-luxury bespoke duplexes engineered with double-height atriums, cantilevered slabs, and smart home automation.',
      deliverables: ['Double-Height Ceilings & Column-Free Spans', 'Smart Climate Automation', 'Artisanal Marble & Facades'],
      angleDeg: -45, // 1:30 (Top-Right)
    },
    {
      no: '03',
      id: 'renovation-remodeling',
      title: 'Renovation & Remodeling',
      tagline: 'Transforming existing spaces',
      scope: 'Structural retrofitting, spatial reconfigurations, modern facade claddings, and upgraded MEP utility conduits.',
      deliverables: ['Structural Retrofitting', 'Facade Modernization & Stone Cladding', 'Complete MEP Overhaul'],
      angleDeg: 0, // 3 o'clock (Right)
    },
    {
      no: '04',
      id: 'building-extension',
      title: 'Building Extension',
      tagline: 'More room for growing needs',
      scope: 'Vertical floor additions with load recalculation, cantilevered balconies, and seamless structural tie-in joints.',
      deliverables: ['Vertical Floor Additions', 'Seamless Structural Tie-Ins', 'Municipal Permitting Approvals'],
      angleDeg: 45, // 4:30 (Bottom-Right)
    },
    {
      no: '05',
      id: 'house-lifting',
      title: 'Structural House Lifting',
      tagline: 'Safe elevation of existing homes',
      scope: 'Synchronized hydraulic jack engineering to elevate homes above flood levels and reinforce foundation footings.',
      deliverables: ['Synchronized Hydraulic Elevation', 'Reinforced Plinth Underpinning', 'Zero Structural Cracks Guarantee'],
      angleDeg: 90, // 6 o'clock (Bottom)
    },
    {
      no: '06',
      id: 'commercial',
      title: 'Commercial Construction',
      tagline: 'Spaces built for business',
      scope: 'Corporate headquarters, retail showrooms, post-tensioned spans, and high-traffic commercial architecture.',
      deliverables: ['Post-Tensioned Column-Free Spans', 'HVAC & VRV Energy Integration', 'Fire Safety & Grade-A Standards'],
      angleDeg: 135, // 7:30 (Bottom-Left)
    },
    {
      no: '07',
      id: 'apartment-rental',
      title: 'Apartment & Rental Construction',
      tagline: 'Practical multi-unit developments',
      scope: 'High-yield residential multi-unit complexes engineered for low maintenance, space optimization, and durability.',
      deliverables: ['Multi-Unit Spatial Optimization', 'Central Utility Conduits', 'High Rental Yield Architecture'],
      angleDeg: 180, // 9 o'clock (Left)
    },
    {
      no: '08',
      id: 'specialized',
      title: 'Specialized Construction',
      tagline: 'Interlock, solid block & custom finishes',
      scope: 'Complex topography piling, sloped terrain terracing, industrial pre-engineered steel frames, and custom masonry.',
      deliverables: ['Deep Piling & Soil Stabilization', 'Pre-Engineered Structural Frames', 'Strict NDT Quality Audits'],
      angleDeg: 225, // 10:30 (Top-Left)
    },
  ];

  // Mathematical Radial Geometry:
  // Center is strictly at (500, 500)
  const centerX = 500;
  const centerY = 500;
  const hubRadius = 120; // Hub is strictly 0 <= r <= 120px
  const iconRadius = 35; // Icon disc is 70px diameter
  const iconCenterRadius = 265; // Discs sit at r = 265px (span: 230px to 300px)
  const cardCenterRadius = 390; // Cards sit strictly in outer space at r = 390px (span: 345px to 455px)

  // Precompute precise coordinates for every ray
  const computedServices = services.map((srv, idx) => {
    const rad = (srv.angleDeg * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);

    // Spoke line: strictly lives between hub edge (120px) and icon disc inner edge (230px)
    // NEVER crosses or touches any card!
    const spokeStartX = centerX + hubRadius * cosA;
    const spokeStartY = centerY + hubRadius * sinA;

    const spokeEndX = centerX + (iconCenterRadius - iconRadius) * cosA;
    const spokeEndY = centerY + (iconCenterRadius - iconRadius) * sinA;

    // Icon disc center at r = 265px
    const iconX = centerX + iconCenterRadius * cosA;
    const iconY = centerY + iconCenterRadius * sinA;

    // Card center: strictly in the outer buffer at r = 390px
    const cardX = centerX + cardCenterRadius * cosA;
    const cardY = centerY + cardCenterRadius * sinA;

    return {
      ...srv,
      idx,
      spokeStartX,
      spokeStartY,
      spokeEndX,
      spokeEndY,
      iconX,
      iconY,
      cardX,
      cardY,
    };
  });

  // Custom vector illustrations corresponding to each service node
  const renderServiceIcon = (no) => {
    switch (no) {
      case '01':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <path d="M8 22L24 9L40 22" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M33 16.5V11H37V19.8" stroke="#0F172A" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M12 20.5V37C12 37.8 12.7 38.5 13.5 38.5H34.5C35.3 38.5 36 37.8 36 37V20.5" stroke="#0F172A" strokeWidth="3" fill="#FFFFFF" />
            <rect x="20" y="23" width="8" height="8" rx="1" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.8" />
            <line x1="24" y1="23" x2="24" y2="31" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="20" y1="27" x2="28" y2="27" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="9" y1="38.5" x2="39" y2="38.5" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case '02':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <rect x="16" y="10" width="16" height="3" rx="1.5" fill="#F9DF04" stroke="#0F172A" strokeWidth="2" />
            <path d="M18 13V22H30V13" fill="#F9DF04" stroke="#0F172A" strokeWidth="2.2" />
            <rect x="21" y="15" width="6" height="4" rx="0.8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="10" y="22" width="28" height="3" rx="1.5" fill="#F9DF04" stroke="#0F172A" strokeWidth="2" />
            <path d="M13 25V38H35V25" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.4" />
            <line x1="16" y1="25" x2="16" y2="38" stroke="#0F172A" strokeWidth="2" />
            <line x1="32" y1="25" x2="32" y2="38" stroke="#0F172A" strokeWidth="2" />
            <path d="M21 38V30C21 28.5 27 28.5 27 30V38" fill="#F9DF04" stroke="#0F172A" strokeWidth="2" />
            <line x1="8" y1="38" x2="40" y2="38" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        );
      case '03':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <path d="M13 35L29 19" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="32" cy="16" r="6" fill="#F9DF04" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M30 14L34 18" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M35 35L19 19" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
            <rect x="11" y="13" width="10" height="7" rx="1.5" transform="rotate(-45 16 16.5)" fill="#F9DF04" stroke="#0F172A" strokeWidth="2.2" />
          </svg>
        );
      case '04':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <rect x="12" y="27" width="24" height="4" rx="1" fill="#F9DF04" stroke="#0F172A" strokeWidth="2.2" />
            <line x1="15" y1="31" x2="15" y2="39" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <line x1="33" y1="31" x2="33" y2="39" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <path d="M14 27V18L24 13L34 18V27" stroke="#0F172A" strokeWidth="2" strokeDasharray="3 3" fill="none" />
            <path d="M36 21L36 12M36 12L32 16M36 12L40 16" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case '05':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <path d="M12 21L24 11L36 21V28H12V21Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.4" strokeLinejoin="round" />
            <rect x="18" y="21" width="4" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="26" y="21" width="4" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="15" y="32" width="6" height="4" rx="0.5" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.8" />
            <line x1="18" y1="28" x2="18" y2="36" stroke="#0F172A" strokeWidth="2" />
            <rect x="27" y="32" width="6" height="4" rx="0.5" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.8" />
            <line x1="30" y1="28" x2="30" y2="36" stroke="#0F172A" strokeWidth="2" />
            <line x1="9" y1="39" x2="39" y2="39" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M10 35L10 28M10 28L8 30M10 28L12 30" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M38 35L38 28M38 28L36 30M38 28L40 30" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case '06':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <path d="M11 16H37L39 22H9L11 16Z" fill="#F9DF04" stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
            <line x1="16" y1="16" x2="16" y2="22" stroke="#0F172A" strokeWidth="2" />
            <line x1="24" y1="16" x2="24" y2="22" stroke="#0F172A" strokeWidth="2" />
            <line x1="32" y1="16" x2="32" y2="22" stroke="#0F172A" strokeWidth="2" />
            <rect x="12" y="22" width="24" height="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.4" />
            <rect x="21" y="27" width="6" height="11" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.8" />
            <rect x="14" y="25" width="5" height="7" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="29" y="25" width="5" height="7" stroke="#0F172A" strokeWidth="1.5" />
            <line x1="8" y1="38" x2="40" y2="38" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case '07':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <rect x="12" y="11" width="16" height="27" rx="1" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.4" />
            <rect x="15" y="14" width="3" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="21" y="14" width="3" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="15" y="21" width="3" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="21" y="21" width="3" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="15" y="28" width="3" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="21" y="28" width="3" height="4" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="28" y="20" width="10" height="18" rx="1" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <rect x="31" y="23" width="4" height="3" fill="#F9DF04" stroke="#0F172A" strokeWidth="1" />
            <rect x="31" y="29" width="4" height="3" fill="#F9DF04" stroke="#0F172A" strokeWidth="1" />
            <line x1="9" y1="38" x2="40" y2="38" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        );
      case '08':
        return (
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <rect x="18" y="16" width="12" height="6" rx="1" fill="#F9DF04" stroke="#0F172A" strokeWidth="2" />
            <rect x="12" y="23" width="11" height="6" rx="1" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <rect x="25" y="23" width="11" height="6" rx="1" fill="#F9DF04" stroke="#0F172A" strokeWidth="2" />
            <rect x="9" y="30" width="9" height="6" rx="1" fill="#F9DF04" stroke="#0F172A" strokeWidth="2" />
            <rect x="19.5" y="30" width="9" height="6" rx="1" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <rect x="30" y="30" width="9" height="6" rx="1" fill="#F9DF04" stroke="#0F172A" strokeWidth="2" />
            <line x1="7" y1="37" x2="41" y2="37" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="services"
      ref={ref}
      style={{
        backgroundColor: '#FAFBFD',
        padding: '90px 0 110px 0',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* 1. Corner Architectural Graphic Accents */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '180px',
          height: '180px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', height: '100%' }}>
          <path d="M-20 80 L80 -20 L-20 -20 Z" fill="#0F172A" />
          <path d="M-10 130 L130 -10 L100 -20 L-20 100 Z" fill="#F9DF04" />
          <path d="M-10 160 L160 -10 L140 -10 L-10 140 Z" fill="#0F172A" opacity="0.85" />
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '180px',
          height: '180px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', height: '100%' }}>
          <path d="M200 100 L100 200 L200 200 Z" fill="#0F172A" />
          <path d="M190 50 L50 190 L80 200 L200 80 Z" fill="#F9DF04" />
          <path d="M190 20 L20 190 L40 190 L190 40 Z" fill="#0F172A" opacity="0.85" />
        </svg>
      </div>

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div
            className="badge-gold"
            style={{
              margin: '0 auto 16px auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Building size={13} color="#92750a" />
            <span>COMPREHENSIVE EXPERTISE • OUR SERVICES</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.03em',
              margin: '0 0 14px 0',
            }}
          >
            Disciplines & Services
          </h2>

          <p
            style={{
              color: '#64748B',
              fontSize: '1.02rem',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            From visionary architectural blueprinting to turnkey structural delivery, our integrated engineering
            protocols eliminate subcontracting bloat and deliver guaranteed architectural excellence.
          </p>

          {/* Interactive Orbit Control Bar */}
          <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsOrbitPaused(!isOrbitPaused)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 16px',
                borderRadius: '9999px',
                backgroundColor: isOrbitPaused ? '#0F172A' : '#FFFFFF',
                color: isOrbitPaused ? '#F9DF04' : '#0F172A',
                border: '1.5px solid rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.25s ease',
              }}
            >
              {isOrbitPaused ? <Play size={12} fill="#F9DF04" /> : <Pause size={12} />}
              <span>{isOrbitPaused ? 'Resume Orbit Rotation' : 'Pause Orbit Rotation'}</span>
            </button>
          </div>
        </div>

        {/* 2. Desktop Centered 360° Circular Orbit (Completely Unobstructed Lines) */}
        <div
          className="radial-services-desktop"
          style={{
            position: 'relative',
            width: '1000px',
            height: '1000px',
            margin: '0 auto',
            maxWidth: '100%',
          }}
        >
          {/* STATIC CENTER: Central Yeloline Construction Hub (Center: 500, 500) */}
          <motion.div
            className="hub-breathing-core"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: `${centerX - hubRadius}px`,
              top: `${centerY - hubRadius}px`,
              width: `${hubRadius * 2}px`,
              height: `${hubRadius * 2}px`,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '7px solid #F9DF04',
              boxShadow:
                '0 28px 60px -10px rgba(0, 0, 0, 0.16), 0 0 0 12px #FFFFFF, 0 0 35px rgba(249, 223, 4, 0.35)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
              userSelect: 'none',
              animation: 'hubCorePulse 3.4s infinite ease-in-out',
            }}
          >
            {/* Architectural Roof Graphic */}
            <div style={{ marginBottom: '6px' }}>
              <svg width="60" height="34" viewBox="0 0 68 38" fill="none">
                <path
                  d="M12 28L34 9L56 28"
                  stroke="#F9DF04"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M46 19.5V11.5H51V23.5" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
                <rect x="30" y="19" width="8" height="8" rx="1.5" fill="#0F172A" />
              </svg>
            </div>

            {/* Brand Title */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                margin: '0 0 5px 0',
              }}
            >
              YELOLINE
            </h1>

            {/* Pill Banner */}
            <div
              style={{
                backgroundColor: '#F9DF04',
                color: '#0F172A',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.70rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '3px 16px',
                borderRadius: '9999px',
                marginBottom: '6px',
                boxShadow: '0 2px 8px rgba(249, 223, 4, 0.35)',
              }}
            >
              CONSTRUCTION
            </div>

            {/* Sub-label */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.70rem',
                color: '#0F172A',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
              }}
            >
              SERVICES
            </div>

            {/* Faint Architectural Skyline Watermark at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                opacity: 0.12,
                pointerEvents: 'none',
              }}
            >
              <svg width="100" height="22" viewBox="0 0 120 26" fill="none">
                <path d="M5 26V15H15V8H25V18H35V12H48V26H5V26Z" fill="#0F172A" />
                <path d="M52 26V9H68V4H82V14H95V26H52V26Z" fill="#0F172A" />
                <path d="M98 26V16H115V26H98Z" fill="#0F172A" />
              </svg>
            </div>
          </motion.div>

          {/* DYNAMIC REVOLVING ORBITAL SYSTEM: Spokes & Discs in Inner Zone, Cards in Outer Zone */}
          <div
            className="orbit-revolution-container"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              animation: `orbitRotation 55s linear infinite`,
              animationPlayState: isOrbitPaused || hoveredNode ? 'paused' : 'running',
              transformOrigin: `${centerX}px ${centerY}px`,
            }}
          >
            {/* SVG Spokes & Moving Energy Points (Entirely Unobstructed) */}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2,
                overflow: 'visible',
              }}
            >
              <defs>
                <filter id="energy-bead-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="blur1" />
                  <feGaussianBlur stdDeviation="7" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 8 Radial Spokes connecting Center Hub to Icon Discs */}
              {computedServices.map((srv) => {
                const isHovered = hoveredNode === srv.no;
                const spokePathD = `M ${srv.spokeStartX} ${srv.spokeStartY} L ${srv.spokeEndX} ${srv.spokeEndY}`;
                const animDelay = (srv.idx * 0.42).toFixed(2);

                return (
                  <g key={srv.no}>
                    {/* Glowing Spoke Underlay */}
                    <path
                      d={spokePathD}
                      fill="none"
                      stroke="#F9DF04"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity={isHovered ? 0.9 : 0.25}
                      filter="url(#energy-bead-glow)"
                      style={{ transition: 'opacity 0.3s ease' }}
                    />

                    {/* Architectural Spoke Path (100% Unobstructed Line) */}
                    <path
                      id={`spoke-path-${srv.id}`}
                      d={spokePathD}
                      fill="none"
                      stroke={isHovered ? '#0F172A' : '#1E293B'}
                      strokeWidth={isHovered ? '3.2' : '2.4'}
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                      opacity={isHovered ? 1 : 0.75}
                      style={{ transition: 'all 0.3s ease' }}
                    />

                    {/* The ONLY Point: Traveling Energy Flow Point Moving Along the Spoke Line */}
                    <g>
                      <animateMotion
                        dur="3.4s"
                        repeatCount="indefinite"
                        begin={`${animDelay}s`}
                        keyPoints="0; 1; 1"
                        keyTimes="0; 0.65; 1"
                        calcMode="linear"
                      >
                        <mpath href={`#spoke-path-${srv.id}`} />
                      </animateMotion>

                      <animate
                        attributeName="opacity"
                        values="0; 1; 1; 0; 0"
                        keyTimes="0; 0.08; 0.62; 0.65; 1"
                        dur="3.4s"
                        repeatCount="indefinite"
                        begin={`${animDelay}s`}
                      />

                      <circle r="9" fill="#F9DF04" filter="url(#energy-bead-glow)" opacity="0.85" />
                      <circle r="5" fill="#F9DF04" stroke="#0F172A" strokeWidth="1.2" />
                      <circle r="2.8" fill="#FFFFFF" />
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* 8 Circular Icon Discs & 8 Outward Cards (Each in its own zone) */}
            {computedServices.map((srv) => {
              const isHovered = hoveredNode === srv.no;
              const animDelay = `${(srv.idx * 0.42).toFixed(2)}s`;

              return (
                <React.Fragment key={srv.no}>
                  {/* ZONE A: The Circular Icon Disc at r = 265px */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${srv.iconX}px`,
                      top: `${srv.iconY}px`,
                      width: '0px',
                      height: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 5,
                    }}
                  >
                    {/* 3D Shockwave Ripple Ring (Fires on point impact) */}
                    <div
                      className="node-3d-ripple-ring"
                      style={{
                        position: 'absolute',
                        left: `-${iconRadius}px`,
                        top: `-${iconRadius}px`,
                        width: `${iconRadius * 2}px`,
                        height: `${iconRadius * 2}px`,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 1,
                        animation: `node3DRipple 3.4s infinite cubic-bezier(0.16, 1, 0.3, 1) ${animDelay}`,
                      }}
                    />

                    {/* Circular 3D Icon Disc */}
                    <div
                      className={`service-3d-disc ${isHovered ? 'is-hovered' : ''}`}
                      onMouseEnter={() => setHoveredNode(srv.no)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => {
                        setActiveService(activeService === srv.no ? null : srv.no);
                        onSelectService?.(srv.title);
                      }}
                      style={{
                        position: 'absolute',
                        left: `-${iconRadius}px`,
                        top: `-${iconRadius}px`,
                        width: `${iconRadius * 2}px`,
                        height: `${iconRadius * 2}px`,
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        border: '5px solid #F9DF04',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 5,
                        animation: isHovered ? 'none' : `node3DGlowPulse 3.4s infinite ease-in-out ${animDelay}`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {renderServiceIcon(srv.no)}
                    </div>
                  </div>

                  {/* ZONE B: The Outward Card at r = 390px (Completely outside all lines!) */}
                  <div
                    className="counter-rotate-satellite"
                    style={{
                      position: 'absolute',
                      left: `${srv.cardX}px`,
                      top: `${srv.cardY}px`,
                      width: '0px',
                      height: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: `orbitCounterRotation 55s linear infinite`,
                      animationPlayState: isOrbitPaused || hoveredNode ? 'paused' : 'running',
                      zIndex: 6,
                    }}
                  >
                    <div
                      onMouseEnter={() => setHoveredNode(srv.no)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => {
                        setActiveService(activeService === srv.no ? null : srv.no);
                        onSelectService?.(srv.title);
                      }}
                      style={{
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '9px 16px',
                        border: isHovered ? '1.5px solid #F9DF04' : '1.5px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: isHovered
                          ? '0 14px 32px -4px rgba(0, 0, 0, 0.12), 0 2px 10px rgba(249, 223, 4, 0.3)'
                          : '0 6px 20px -4px rgba(0, 0, 0, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        width: '185px',
                        transition: 'all 0.25s ease',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.88rem',
                          fontWeight: 900,
                          color: '#0F172A',
                          margin: 0,
                          lineHeight: 1.25,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {srv.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.70rem',
                          color: '#64748B',
                          fontWeight: 500,
                          marginTop: '2px',
                          lineHeight: 1.2,
                        }}
                      >
                        {srv.tagline}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 3. Mobile Responsive Flow (< 1024px) */}
        <div className="radial-services-mobile">
          {/* Central Emblem for Mobile */}
          <div
            style={{
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '6px solid #F9DF04',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.14), 0 0 25px rgba(249, 223, 4, 0.3)',
              margin: '0 auto 40px auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '18px',
              textAlign: 'center',
              animation: 'hubCorePulse 3.4s infinite ease-in-out',
            }}
          >
            <div style={{ marginBottom: '6px' }}>
              <svg width="58" height="32" viewBox="0 0 68 38" fill="none">
                <path
                  d="M12 28L34 9L56 28"
                  stroke="#F9DF04"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M46 19.5V11.5H51V23.5" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
                <rect x="30" y="19" width="8" height="8" rx="1.5" fill="#0F172A" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 900,
                color: '#0F172A',
                margin: '0 0 4px 0',
              }}
            >
              YELOLINE
            </h1>
            <div
              style={{
                backgroundColor: '#F9DF04',
                color: '#0F172A',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                padding: '3px 14px',
                borderRadius: '9999px',
                marginBottom: '6px',
              }}
            >
              CONSTRUCTION
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.68rem',
                color: '#0F172A',
                letterSpacing: '0.3em',
              }}
            >
              SERVICES
            </div>
          </div>

          {/* Sequential Service Cards on Mobile with Glowing Wave Effect */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            {services.map((srv, idx) => {
              const animDelay = `${(idx * 0.42).toFixed(2)}s`;

              return (
                <motion.div
                  key={srv.no}
                  whileHover={{ y: -3 }}
                  onClick={() => {
                    setActiveService(activeService === srv.no ? null : srv.no);
                    onSelectService?.(srv.title);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '14px 18px',
                    border: '1.5px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                  }}
                >
                  {/* Disc Icon with 3D Glowing Animation */}
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '4.5px solid #F9DF04',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      animation: `node3DGlowPulse 3.4s infinite ease-in-out ${animDelay}`,
                    }}
                  >
                    {renderServiceIcon(srv.no)}
                  </div>

                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: '0 0 2px 0',
                      }}
                    >
                      {srv.title}
                    </h3>
                    <span style={{ fontSize: '0.80rem', color: '#64748B', fontWeight: 500 }}>
                      {srv.tagline}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. Active Service Engineering Drawer / Modal */}
        <AnimatePresence>
          {activeService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{
                marginTop: '45px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '2px solid #F9DF04',
                boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 0 30px rgba(249, 223, 4, 0.25)',
                padding: '28px 36px',
                maxWidth: '820px',
                margin: '40px auto 0 auto',
                position: 'relative',
                zIndex: 20,
              }}
            >
              {(() => {
                const srv = services.find((s) => s.no === activeService);
                if (!srv) return null;
                return (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #F1F5F9',
                        paddingBottom: '16px',
                        marginBottom: '18px',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            backgroundColor: '#F9DF04',
                            color: '#0F172A',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            fontSize: '0.74rem',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            padding: '4px 14px',
                            borderRadius: '9999px',
                          }}
                        >
                          ARCHITECTURAL SERVICE
                        </div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.35rem',
                            fontWeight: 900,
                            color: '#0F172A',
                            margin: 0,
                          }}
                        >
                          {srv.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => setActiveService(null)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1.2rem',
                          color: '#94A3B8',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '18px' }}>
                      {srv.scope}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
                      {srv.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(249, 223, 4, 0.12)',
                            border: '1px solid rgba(249, 223, 4, 0.35)',
                            color: '#0F172A',
                            fontSize: '0.80rem',
                            fontWeight: 700,
                          }}
                        >
                          <CheckCircle2 size={13} color="#92750A" />
                          {item}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => onSelectService?.(srv.title)}
                        className="btn-yellow-ref"
                        style={{
                          padding: '10px 22px',
                          fontSize: '0.84rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span>Inquire About {srv.title}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3D Keyframe Animations & Responsive Styling */}
      <style>{`
        /* 1. Orbit Rotation: Clockwise smooth continuous revolution */
        @keyframes orbitRotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* 2. Counter-Rotation: Keeps all cards and icons perfectly horizontal & upright */
        @keyframes orbitCounterRotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        /* 3. Hub Core Breathing Pulse */
        @keyframes hubCorePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 28px 60px -10px rgba(0, 0, 0, 0.16), 0 0 0 12px #FFFFFF, 0 0 35px rgba(249, 223, 4, 0.35);
          }
          50% {
            transform: scale(1.025);
            box-shadow: 0 32px 75px -6px rgba(0, 0, 0, 0.22), 0 0 0 14px #FFFFFF, 0 0 60px rgba(249, 223, 4, 0.7);
          }
        }

        /* 5. Node 3D Glow & Scale upon Point Impact */
        @keyframes node3DGlowPulse {
          0%, 61% {
            transform: scale(1) translateZ(0);
            box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.12), 0 0 12px rgba(249, 223, 4, 0.25);
            border-color: #F9DF04;
            background-color: #FFFFFF;
          }
          65% {
            /* 3D bloom explosion */
            transform: scale(1.20) translateZ(55px);
            box-shadow: 0 24px 65px -4px rgba(0, 0, 0, 0.26), 0 0 50px #F9DF04, 0 0 100px rgba(249, 223, 4, 0.95), inset 0 0 18px rgba(249, 223, 4, 0.6);
            border-color: #FFFFFF;
            background-color: #FFFFF8;
          }
          72% {
            transform: scale(1.10) translateZ(28px);
            box-shadow: 0 16px 40px -4px rgba(0, 0, 0, 0.18), 0 0 35px #F9DF04, 0 0 65px rgba(249, 223, 4, 0.55);
            border-color: #F9DF04;
          }
          82% {
            transform: scale(1) translateZ(0);
            box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.12), 0 0 12px rgba(249, 223, 4, 0.25);
            border-color: #F9DF04;
            background-color: #FFFFFF;
          }
          100% {
            transform: scale(1) translateZ(0);
            box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.12), 0 0 12px rgba(249, 223, 4, 0.25);
            border-color: #F9DF04;
            background-color: #FFFFFF;
          }
        }

        /* 6. Shockwave Ripple expanding from Node on Impact */
        @keyframes node3DRipple {
          0%, 63% {
            transform: scale(0.7);
            opacity: 0;
            border: 2px solid #F9DF04;
          }
          65% {
            transform: scale(1.0);
            opacity: 0.95;
            border: 3.5px solid #FFF266;
            box-shadow: 0 0 25px #F9DF04;
          }
          82% {
            transform: scale(1.85);
            opacity: 0;
            border: 1px solid #F9DF04;
            box-shadow: 0 0 45px rgba(249, 223, 4, 0);
          }
          100% {
            transform: scale(1.85);
            opacity: 0;
          }
        }

        /* Manual Hover State */
        .service-3d-disc.is-hovered {
          transform: scale(1.18) translateZ(45px) !important;
          box-shadow: 0 24px 60px -4px rgba(0, 0, 0, 0.25), 0 0 50px #F9DF04, 0 0 95px rgba(249, 223, 4, 0.85) !important;
          border-color: #FFFFFF !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-3d-disc svg {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-3d-disc:hover svg {
          transform: scale(1.12);
        }

        /* Responsive Layouts */
        .radial-services-desktop {
          display: block;
        }
        .radial-services-mobile {
          display: none;
        }
        @media (max-width: 1024px) {
          .radial-services-desktop {
            display: none !important;
          }
          .radial-services-mobile {
            display: flex !important;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}

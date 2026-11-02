import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Building, ArrowRight, CheckCircle2, Play, Pause } from 'lucide-react';

export default function OurServices({ onSelectService }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeService, setActiveService] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  // 8 Services arranged in exact circular clock order matching reference image
  const services = [
    {
      no: '01',
      id: 'transforming-spaces',
      title: 'Transforming Existing Spaces',
      tagline: 'Modern living & spatial upgrades',
      scope: 'Structural retrofitting, interior spatial reconfiguration, premium architectural finishes, and complete modern living upgrades.',
      deliverables: ['Interior Space Planning', 'Luxury Finishes & Millwork', 'Structural Wall Removal & MEP Overhaul'],
      img: '/services/renovation-remodeling.png',
      angleDeg: -90, // 12 o'clock (Top)
    },
    {
      no: '02',
      id: 'building-extension',
      title: 'Building Extension',
      tagline: 'More room for growing needs',
      scope: 'Vertical floor additions with structural load recalculation, cantilevered balconies, and seamless structural tie-in joints.',
      deliverables: ['Vertical Floor Additions', 'Cantilevered Balconies', 'Municipal Permitting Approvals'],
      img: '/services/building-extension.png',
      angleDeg: -45, // 1:30 (Top-Right)
    },
    {
      no: '03',
      id: 'house-lifting',
      title: 'Structural House Lifting',
      tagline: 'Safe elevation of existing homes',
      scope: 'Synchronized hydraulic jack engineering to elevate homes above flood levels and reinforce foundation footings.',
      deliverables: ['Synchronized Hydraulic Elevation', 'Reinforced Plinth Underpinning', 'Zero Structural Cracks Guarantee'],
      img: '/services/house-lifting.png',
      angleDeg: 0, // 3 o'clock (Right)
    },
    {
      no: '04',
      id: 'commercial',
      title: 'Commercial Construction',
      tagline: 'Spaces built for business',
      scope: 'Corporate headquarters, retail showrooms, post-tensioned spans, and high-traffic commercial architecture.',
      deliverables: ['Post-Tensioned Column-Free Spans', 'HVAC & VRV Energy Integration', 'Fire Safety & Grade-A Standards'],
      img: '/services/commercial-construction.png',
      angleDeg: 45, // 4:30 (Bottom-Right)
    },
    {
      no: '05',
      id: 'apartment-rental',
      title: 'Apartment & Rental Construction',
      tagline: 'Practical multi-unit developments',
      scope: 'High-yield residential multi-unit complexes engineered for low maintenance, space optimization, and durability.',
      deliverables: ['Multi-Unit Spatial Optimization', 'Central Utility Conduits', 'High Rental Yield Architecture'],
      img: '/services/apartment-rental.png',
      angleDeg: 90, // 6 o'clock (Bottom)
    },
    {
      no: '06',
      id: 'specialized',
      title: 'Specialized Construction',
      tagline: 'Interlock, solid block & custom finishes',
      scope: 'Complex topography piling, sloped terrain terracing, industrial pre-engineered steel frames, and custom masonry.',
      deliverables: ['Deep Piling & Soil Stabilization', 'Pre-Engineered Structural Frames', 'Strict NDT Quality Audits'],
      img: '/services/specialized-construction.png',
      angleDeg: 135, // 7:30 (Bottom-Left)
    },
    {
      no: '07',
      id: 'residential',
      title: 'Residential Construction',
      tagline: 'Homes planned for modern family living',
      scope: 'Custom private villas, multi-storey turnkey homes, and monolithic earthquake-resistant RCC framed structures.',
      deliverables: ['Turnkey Architectural Execution', 'Seismic Zone-IV RCC Framework', 'Thermal & Acoustic Insulation'],
      img: '/services/residential-construction.png',
      angleDeg: 180, // 9 o'clock (Left)
    },
    {
      no: '08',
      id: 'luxury-homes',
      title: 'Luxury Homes',
      tagline: 'Thoughtful multi-level home design',
      scope: 'Ultra-luxury bespoke duplexes engineered with double-height atriums, cantilevered slabs, and smart home automation.',
      deliverables: ['Double-Height Ceilings & Column-Free Spans', 'Smart Climate Automation', 'Artisanal Marble & Facades'],
      img: '/services/luxury-homes.png',
      angleDeg: 225, // 10:30 (Top-Left)
    },
  ];

  // Mathematical Geometry for the Centered 3D Orbit
  const centerX = 500;
  const centerY = 500;
  const hubRadius = 120; // Center hub diameter is 240px
  const discRadius = 42; // Each service disc is 84px diameter
  const discCenterRadius = 245; // Discs sit at r = 245px
  const cardCenterRadius = 370; // Cards sit at r = 370px (guaranteed 10px+ clearance)

  // Compute precise spoke lines, anchor beads, and energy flow paths
  const computedServices = services.map((srv, idx) => {
    const rad = (srv.angleDeg * Math.PI) / 180;
    const cosA = Math.cos(rad);
    const sinA = Math.sin(rad);

    // Spoke line start on hub perimeter
    const spokeStartX = centerX + hubRadius * cosA;
    const spokeStartY = centerY + hubRadius * sinA;

    // Spoke line end on service disc inner edge
    const spokeEndX = centerX + (discCenterRadius - discRadius) * cosA;
    const spokeEndY = centerY + (discCenterRadius - discRadius) * sinA;

    // Midpoint anchor yellow ring node
    const midX = (spokeStartX + spokeEndX) / 2;
    const midY = (spokeStartY + spokeEndY) / 2;

    // Service Disc Center
    const discX = centerX + discCenterRadius * cosA;
    const discY = centerY + discCenterRadius * sinA;

    // Service Card Center
    const cardX = centerX + cardCenterRadius * cosA;
    const cardY = centerY + cardCenterRadius * sinA;

    return {
      ...srv,
      idx,
      spokeStartX,
      spokeStartY,
      spokeEndX,
      spokeEndY,
      midX,
      midY,
      discX,
      discY,
      cardX,
      cardY,
    };
  });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        backgroundColor: '#FAFAF8',
        padding: '80px 0 100px 0',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1400px',
      }}
    >
      {/* 1. Golden Curved Wave Graphic Accents Matching Reference */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '380px',
          height: '240px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 380 240" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="gold-swoosh-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9DF04" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FDE047" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-60 0 C100 30 200 100 260 240 L0 240 L0 0 Z" fill="url(#gold-swoosh-top)" />
          <path d="M-40 -20 C120 20 230 110 300 240" stroke="#F9DF04" strokeWidth="18" fill="none" opacity="0.85" />
          <path d="M-20 -30 C140 10 260 120 340 240" stroke="#FDE047" strokeWidth="8" fill="none" opacity="0.6" />
        </svg>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '380px',
          height: '240px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 380 240" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="gold-swoosh-btm" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F9DF04" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#FDE047" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-60 240 C100 210 200 140 260 0 L0 0 L0 240 Z" fill="url(#gold-swoosh-btm)" />
          <path d="M-40 260 C120 220 230 130 300 0" stroke="#F9DF04" strokeWidth="18" fill="none" opacity="0.85" />
          <path d="M-20 270 C140 230 260 120 340 0" stroke="#FDE047" strokeWidth="8" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* Subtle Construction Tower Crane Watermark at Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '30px',
          width: '260px',
          height: '220px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.28,
        }}
      >
        <svg viewBox="0 0 200 180" fill="none" style={{ width: '100%', height: '100%' }}>
          <path d="M120 180V45H180L165 25H120V12L110 4L100 12V45H25L8 58H100V180H120Z" fill="#F9DF04" />
          <path d="M120 45L165 25M100 45L25 58M110 4L25 58M110 4L165 25" stroke="#0F172A" strokeWidth="1.6" />
          <path d="M100 65H120M100 88H120M100 110H120M100 132H120M100 155H120M100 178H120" stroke="#0F172A" strokeWidth="1.3" />
        </svg>
      </div>

      <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div
            className="badge-gold"
            style={{
              margin: '0 auto 14px auto',
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
              fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.03em',
              margin: '0 0 10px 0',
            }}
          >
            Disciplines & Services
          </h2>

          <p
            style={{
              color: '#64748B',
              fontSize: '1rem',
              maxWidth: '660px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            From visionary architectural blueprinting to turnkey structural delivery, our integrated engineering
            protocols deliver guaranteed architectural excellence.
          </p>

          {/* Interactive 3D Orbit Control Button */}
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsOrbitPaused(!isOrbitPaused)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 18px',
                borderRadius: '9999px',
                backgroundColor: isOrbitPaused ? '#0F172A' : '#FFFFFF',
                color: isOrbitPaused ? '#F9DF04' : '#0F172A',
                border: '1.5px solid rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.25s ease',
              }}
            >
              {isOrbitPaused ? <Play size={12} fill="#F9DF04" /> : <Pause size={12} />}
              <span>{isOrbitPaused ? 'Resume 3D Orbit Revolution' : 'Pause 3D Orbit Revolution'}</span>
            </button>
          </div>
        </div>

        {/* 2. Desktop Centered 3D Revolving Orbital Wheel */}
        <div
          className="radial-services-desktop"
          style={{
            position: 'relative',
            width: '1000px',
            height: '1000px',
            margin: '0 auto',
            maxWidth: '100%',
            overflow: 'visible',
          }}
        >
          {/* STATIC CENTER: Central Yeloline Construction Hub */}
          <motion.div
            className="hub-breathing-core"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: `${centerX - hubRadius}px`,
              top: `${centerY - hubRadius}px`,
              width: `${hubRadius * 2}px`,
              height: `${hubRadius * 2}px`,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '8px solid #F9DF04',
              boxShadow:
                '0 24px 60px -10px rgba(0, 0, 0, 0.14), 0 0 0 8px #FFFFFF, 0 0 45px rgba(249, 223, 4, 0.55)',
              zIndex: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center',
              userSelect: 'none',
              animation: 'hubCorePulse 3.4s infinite ease-in-out',
            }}
          >
            {/* Logo Roof Icon */}
            <div style={{ marginBottom: '4px' }}>
              <svg width="64" height="34" viewBox="0 0 68 38" fill="none">
                <path
                  d="M12 28L34 9L56 28"
                  stroke="#F9DF04"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M46 19.5V11.5H51V23.5" stroke="#0F172A" strokeWidth="3.2" strokeLinejoin="round" />
                <rect x="30" y="19" width="8" height="8" rx="1.5" fill="#0F172A" />
              </svg>
            </div>

            {/* Brand Title */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.65rem',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '0.04em',
                margin: '0 0 5px 0',
                lineHeight: 1,
              }}
            >
              YELOLINE
            </h1>

            {/* Yellow Pill Badge */}
            <div
              style={{
                backgroundColor: '#F9DF04',
                color: '#0F172A',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '4px 18px',
                borderRadius: '9999px',
                marginBottom: '5px',
                boxShadow: '0 2px 10px rgba(249, 223, 4, 0.4)',
              }}
            >
              CONSTRUCTION
            </div>

            {/* Sub-label */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.72rem',
                color: '#0F172A',
                letterSpacing: '0.40em',
                textTransform: 'uppercase',
              }}
            >
              SERVICES
            </div>

            {/* Faint Architectural Skyline Watermark at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                opacity: 0.16,
                pointerEvents: 'none',
              }}
            >
              <svg width="115" height="24" viewBox="0 0 120 26" fill="none">
                <path d="M5 26V15H15V8H25V18H35V12H48V26H5V26Z" fill="#0F172A" />
                <path d="M52 26V9H68V4H82V14H95V26H52V26Z" fill="#0F172A" />
                <path d="M98 26V16H115V26H98Z" fill="#0F172A" />
              </svg>
            </div>
          </motion.div>

          {/* 3D REVOLVING ORBITAL CONTAINER: Continuous Smooth 360° Revolution */}
          <div
            className="orbit-3d-revolution-container"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              animation: `orbit3DRotation 55s linear infinite`,
              animationPlayState: isOrbitPaused || hoveredNode ? 'paused' : 'running',
              transformOrigin: `${centerX}px ${centerY}px`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* SVG Spokes & Animated Moving Energy Points */}
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

              {/* Faint Dotted Circular Guide Ring in Background */}
              <circle
                cx={centerX}
                cy={centerY}
                r="185"
                fill="none"
                stroke="rgba(249, 223, 4, 0.40)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />

              {/* 8 Radial Spokes connecting Center Hub to 3D Service Discs */}
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
                      opacity={isHovered ? 0.95 : 0.28}
                      filter="url(#energy-bead-glow)"
                      style={{ transition: 'opacity 0.3s ease' }}
                    />

                    {/* Architectural Dotted Spoke Path */}
                    <path
                      id={`spoke-path-${srv.id}`}
                      d={spokePathD}
                      fill="none"
                      stroke={isHovered ? '#0F172A' : '#1E293B'}
                      strokeWidth={isHovered ? '2.8' : '2.0'}
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                      opacity={isHovered ? 1 : 0.75}
                      style={{ transition: 'all 0.3s ease' }}
                    />

                    {/* Midpoint Anchor Yellow Ring Node */}
                    <circle
                      cx={srv.midX}
                      cy={srv.midY}
                      r={isHovered ? '5.5' : '4.5'}
                      fill="#F9DF04"
                      stroke="#0F172A"
                      strokeWidth="1.4"
                    />

                    {/* Traveling Energy Flow Point Moving Along Spoke Line to Service Disc */}
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

            {/* 8 Photorealistic 3D Circular Service Nodes & Paired Cards (With 3D Counter-Rotation) */}
            {computedServices.map((srv) => {
              const isHovered = hoveredNode === srv.no;
              const animDelay = `${(srv.idx * 0.42).toFixed(2)}s`;

              return (
                <React.Fragment key={srv.no}>
                  {/* ZONE A: 3D Photorealistic Circular Disc Node */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${srv.discX}px`,
                      top: `${srv.discY}px`,
                      width: '0px',
                      height: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                    }}
                  >
                    {/* 3D Shockwave Ripple Ring (Fires on point impact) */}
                    <div
                      className="node-3d-ripple-ring"
                      style={{
                        position: 'absolute',
                        left: `-${discRadius}px`,
                        top: `-${discRadius}px`,
                        width: `${discRadius * 2}px`,
                        height: `${discRadius * 2}px`,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 1,
                        animation: `node3DRipple 3.4s infinite cubic-bezier(0.16, 1, 0.3, 1) ${animDelay}`,
                      }}
                    />

                    {/* Circular 3D Image Disc with Golden Beveled Halo Border */}
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
                        left: `-${discRadius}px`,
                        top: `-${discRadius}px`,
                        width: `${discRadius * 2}px`,
                        height: `${discRadius * 2}px`,
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        border: '5.5px solid #F9DF04',
                        boxShadow: isHovered
                          ? '0 16px 45px -4px rgba(0, 0, 0, 0.22), 0 0 35px #F9DF04, 0 0 70px rgba(249, 223, 4, 0.7)'
                          : '0 10px 28px -4px rgba(0, 0, 0, 0.12), 0 0 0 3px #FFFFFF, 0 0 25px rgba(249, 223, 4, 0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        animation: isHovered ? 'none' : `node3DGlowPulse 3.4s infinite ease-in-out ${animDelay}`,
                        transformStyle: 'preserve-3d',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Inner image counter-rotates smoothly so buildings stay upright! */}
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          animation: `orbit3DCounterRotation 55s linear infinite`,
                          animationPlayState: isOrbitPaused || hoveredNode ? 'paused' : 'running',
                        }}
                      >
                        <img
                          src={srv.img}
                          alt={srv.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ZONE B: White Content Card with Counter-Rotation & Yellow Accent Line */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${srv.cardX}px`,
                      top: `${srv.cardY}px`,
                      width: '0px',
                      height: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: `orbit3DCounterRotation 55s linear infinite`,
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
                        padding: '8px 12px',
                        border: isHovered ? '1.5px solid #F9DF04' : '1.5px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: isHovered
                          ? '0 14px 35px -4px rgba(0, 0, 0, 0.12), 0 2px 12px rgba(249, 223, 4, 0.3)'
                          : '0 8px 24px -4px rgba(0, 0, 0, 0.07)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        cursor: 'pointer',
                        width: '136px',
                        transition: 'all 0.28s ease',
                      }}
                    >
                      {/* Bold Service Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.84rem',
                          fontWeight: 900,
                          color: '#0F172A',
                          margin: 0,
                          lineHeight: 1.22,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {srv.title}
                      </h3>

                      {/* Yellow Accent Bar (Matches Reference Image) */}
                      <div
                        style={{
                          width: '26px',
                          height: '3.5px',
                          backgroundColor: '#F9DF04',
                          borderRadius: '2px',
                          margin: '4px 0 5px 0',
                        }}
                      />

                      {/* Tagline */}
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.67rem',
                          color: '#64748B',
                          fontWeight: 500,
                          lineHeight: 1.25,
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
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '7px solid #F9DF04',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.14), 0 0 30px rgba(249, 223, 4, 0.35)',
              margin: '0 auto 40px auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
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
                fontWeight: 900,
                fontSize: '0.70rem',
                letterSpacing: '0.12em',
                padding: '3px 16px',
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
                letterSpacing: '0.34em',
              }}
            >
              SERVICES
            </div>
          </div>

          {/* Sequential Service Cards on Mobile with 3D Photorealistic Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
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
                  {/* 3D Photorealistic Disc on Mobile */}
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '4.5px solid #F9DF04',
                      boxShadow: '0 6px 18px rgba(249, 223, 4, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      overflow: 'hidden',
                      animation: `node3DGlowPulse 3.4s infinite ease-in-out ${animDelay}`,
                    }}
                  >
                    <img
                      src={srv.img}
                      alt={srv.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.02rem',
                        fontWeight: 900,
                        color: '#0F172A',
                        margin: 0,
                        lineHeight: 1.25,
                      }}
                    >
                      {srv.title}
                    </h3>
                    <div
                      style={{
                        width: '24px',
                        height: '3px',
                        backgroundColor: '#F9DF04',
                        borderRadius: '2px',
                        margin: '4px 0 5px 0',
                      }}
                    />
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '50%',
                            border: '3.5px solid #F9DF04',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={srv.img}
                            alt={srv.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <div
                            style={{
                              backgroundColor: '#F9DF04',
                              color: '#0F172A',
                              fontFamily: 'var(--font-heading)',
                              fontWeight: 800,
                              fontSize: '0.72rem',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                              padding: '3px 12px',
                              borderRadius: '9999px',
                              display: 'inline-block',
                              marginBottom: '4px',
                            }}
                          >
                            DISCIPLINE {srv.no}
                          </div>
                          <h3
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.35rem',
                              fontWeight: 900,
                              color: '#0F172A',
                              margin: 0,
                            }}
                          >
                            {srv.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveService(null)}
                        style={{
                          backgroundColor: '#F1F5F9',
                          border: 'none',
                          color: '#64748B',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          fontWeight: 700,
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                      {srv.scope}
                    </p>

                    <div style={{ marginBottom: '24px' }}>
                      <h4
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: '#0F172A',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '10px',
                        }}
                      >
                        Core Deliverables & Standards
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                        {srv.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              backgroundColor: '#F8FAFC',
                              padding: '10px 14px',
                              borderRadius: '12px',
                              border: '1px solid #E2E8F0',
                            }}
                          >
                            <CheckCircle2 size={16} color="#0F172A" />
                            <span style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: 600 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                      <button
                        onClick={() => onSelectService?.(srv.title)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 22px',
                          borderRadius: '12px',
                          backgroundColor: '#0F172A',
                          color: '#F9DF04',
                          border: 'none',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.88rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <span>Consult Principal Engineer</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scoped CSS Animations */}
      <style>{`
        /* 1. Orbit 3D Rotation: Clockwise smooth continuous revolution */
        @keyframes orbit3DRotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* 2. Counter-Rotation: Keeps cards & inner images perfectly upright */
        @keyframes orbit3DCounterRotation {
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
            box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.14), 0 0 0 8px #FFFFFF, 0 0 45px rgba(249, 223, 4, 0.55);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 28px 70px -6px rgba(0, 0, 0, 0.18), 0 0 0 10px #FFFFFF, 0 0 65px rgba(249, 223, 4, 0.75);
          }
        }

        /* 4. Node 3D Glow & Scale upon Point Impact */
        @keyframes node3DGlowPulse {
          0%, 61% {
            transform: scale(1) translateZ(0);
            box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.12), 0 0 0 3px #FFFFFF, 0 0 25px rgba(249, 223, 4, 0.45);
            border-color: #F9DF04;
          }
          65% {
            transform: scale(1.15) translateZ(40px);
            box-shadow: 0 22px 60px -4px rgba(0, 0, 0, 0.24), 0 0 0 4px #FFFFFF, 0 0 50px #F9DF04, 0 0 90px rgba(249, 223, 4, 0.95);
            border-color: #FFF266;
          }
          72% {
            transform: scale(1.08) translateZ(20px);
            box-shadow: 0 16px 38px -4px rgba(0, 0, 0, 0.16), 0 0 0 3px #FFFFFF, 0 0 35px #F9DF04;
            border-color: #F9DF04;
          }
          82%, 100% {
            transform: scale(1) translateZ(0);
            box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.12), 0 0 0 3px #FFFFFF, 0 0 25px rgba(249, 223, 4, 0.45);
            border-color: #F9DF04;
          }
        }

        /* 5. Shockwave Ripple expanding from Node on Impact */
        @keyframes node3DRipple {
          0%, 63% {
            transform: scale(0.8);
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
            transform: scale(1.75);
            opacity: 0;
            border: 1px solid #F9DF04;
            box-shadow: 0 0 45px rgba(249, 223, 4, 0);
          }
          100% {
            transform: scale(1.75);
            opacity: 0;
          }
        }

        /* Hover Elevation on Disc */
        .service-3d-disc.is-hovered {
          transform: scale(1.14) translateZ(35px) !important;
          box-shadow: 0 22px 55px -4px rgba(0, 0, 0, 0.22), 0 0 0 4px #FFFFFF, 0 0 45px #F9DF04, 0 0 85px rgba(249, 223, 4, 0.85) !important;
          border-color: #FFF266 !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
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

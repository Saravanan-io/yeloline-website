import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2, X } from 'lucide-react';

export default function OurServices({ onSelectService }) {
  const [activeService, setActiveService] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  // 9 Services arranged symmetrically around the central orbital hub
  const services = [
    // --- LEFT COLUMN (5 Construction & Execution Services) ---
    {
      no: '01',
      id: 'residential-building',
      title: 'Residential Building',
      tagline: 'Custom villas & modern family homes',
      scope: 'Custom private villas, multi-storey turnkey homes, and monolithic earthquake-resistant RCC framed structures.',
      deliverables: ['Custom Villa Architecture', 'Seismic Zone-IV RCC Framework', 'Turnkey Finishing & Handover'],
      img: '/services/residential-building.png',
      side: 'left',
      discPos: { x: 375, y: 55 },
      cardStyle: { left: '13.0%', top: '1.0%', width: '255px' },
    },
    {
      no: '02',
      id: 'commercial-building',
      title: 'Commercial Building',
      tagline: 'Spaces built for business & enterprise',
      scope: 'Corporate headquarters, retail complexes, column-free commercial floors, and high-footfall business architecture.',
      deliverables: ['Column-Free Structural Spans', 'HVAC & Fire Safety Integration', 'Commercial Grade-A Finishes'],
      img: '/services/commercial-building.png',
      side: 'left',
      discPos: { x: 255, y: 165 },
      cardStyle: { left: '2.0%', top: '20.0%', width: '255px' },
    },
    {
      no: '03',
      id: 'turnkey-contracts',
      title: 'Turnkey Contracts',
      tagline: 'End-to-end design & construction',
      scope: 'Complete hands-off construction management from excavation to handover with fixed pricing and guaranteed timelines.',
      deliverables: ['Single-Point Accountability', 'Fixed Cost & Timeline Guarantee', 'Material Procurement & Execution'],
      img: '/services/turnkey-contracts.png',
      side: 'left',
      discPos: { x: 228, y: 288 },
      cardStyle: { left: '0.0%', top: '41.5%', width: '255px' },
    },
    {
      no: '04',
      id: 'labour-contracts',
      title: 'Labour Contracts',
      tagline: 'Skilled workforce & site supervision',
      scope: 'Expert civil masons, bar benders, shuttering carpenters, and certified site supervisors for structural and finish works.',
      deliverables: ['Skilled Civil Trades & Masons', 'Daily Engineering Supervision', 'Productivity & Safety Compliance'],
      img: '/services/labour-contracts.png',
      side: 'left',
      discPos: { x: 260, y: 410 },
      cardStyle: { left: '2.5%', top: '62.5%', width: '255px' },
    },
    {
      no: '05',
      id: 'renovation',
      title: 'Renovation',
      tagline: 'Transforming existing spaces',
      scope: 'Structural retrofitting, floor additions, kitchen & bath remodeling, waterproofing, and contemporary aesthetic upgrades.',
      deliverables: ['Structural Reinforcement & Remodel', 'Modern Interior & Exterior Facelift', 'Plumbing & Electrical Overhaul'],
      img: '/services/renovation.png',
      side: 'left',
      discPos: { x: 380, y: 518 },
      cardStyle: { left: '13.5%', top: '81.0%', width: '255px' },
    },

    // --- RIGHT COLUMN (4 Planning, Design & PMC Services) ---
    {
      no: '06',
      id: '2d-vaastu-plan',
      title: '2D Vaastu Plan',
      tagline: 'Harmonious spatial architectural layouts',
      scope: 'Precise 2D floor plans harmonized with traditional Vaastu Shastra principles, natural lighting, and cross ventilation.',
      deliverables: ['Vaastu Direction Alignment', 'Optimal Furniture & Room Layouts', 'Municipal Approval Blueprints'],
      img: '/services/2d-vaastu-plan.png',
      side: 'right',
      discPos: { x: 625, y: 68 },
      cardStyle: { left: '59.5%', top: '3.5%', width: '265px' },
    },
    {
      no: '07',
      id: '3d-elevation',
      title: '3D Elevation',
      tagline: 'Photorealistic exterior visualisations',
      scope: 'High-fidelity 3D architectural renders showcasing daylight, dusk lighting, exterior textures, and facade details.',
      deliverables: ['Photorealistic Day & Night Renders', 'Material & Texture Detailing', '360° Architectural Elevation View'],
      img: '/services/3d-elevation.png',
      side: 'right',
      discPos: { x: 745, y: 195 },
      cardStyle: { left: '71.0%', top: '25.0%', width: '265px' },
    },
    {
      no: '08',
      id: 'bank-estimation',
      title: 'Bank Estimation',
      tagline: 'Certified BOQ & loan valuation reports',
      scope: 'Official structural valuation and itemized Bill of Quantities (BOQ) prepared for smooth housing loan sanction.',
      deliverables: ['Bank-Approved Itemized BOQ', 'Certified Engineer Valuation', 'Stage-Wise Disbursement Docs'],
      img: '/services/bank-estimation.png',
      side: 'right',
      discPos: { x: 745, y: 375 },
      cardStyle: { left: '71.0%', top: '56.0%', width: '265px' },
    },
    {
      no: '09',
      id: 'pmc',
      title: 'PMC (Project Management)',
      tagline: 'Quality audits, budget & site control',
      scope: 'Independent third-party civil inspection, bill verification, material testing, and timeline enforcement for property owners.',
      deliverables: ['Independent Quality Audits', 'Contractor Bill Verification', 'Milestone & Budget Tracking'],
      img: '/services/pmc.png',
      side: 'right',
      discPos: { x: 630, y: 505 },
      cardStyle: { left: '60.0%', top: '78.5%', width: '280px' },
    },
  ];

  // Center Hub in 1024x576 coordinates
  const hubCenter = { x: 508, y: 288 };
  const hubRadius = 113;

  const handleCardClick = (srv) => {
    setActiveService(srv);
    onSelectService?.(srv.title);
  };

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '30px 0 50px 0',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* ================= 1. BACKGROUND ACCENTS MATCHING REFERENCE ================= */}

      {/* Top-Left Dynamic Golden Waves */}
      <svg
        viewBox="0 0 500 320"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(280px, 35vw, 480px)',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="gold-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEC603" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFDE43" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFF285" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gold-wave-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEC603" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFDE43" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Soft yellow background sweep */}
        <path d="M 0,0 C 140,50 260,140 340,300 L 0,300 Z" fill="url(#gold-wave-1)" />
        {/* Upper flowing ribbon */}
        <path
          d="M 0,40 C 160,80 290,180 380,320"
          stroke="#FEC603"
          strokeWidth="24"
          fill="none"
          opacity="0.9"
          strokeLinecap="round"
        />
        {/* Secondary thinner ribbon */}
        <path
          d="M 0,70 C 180,105 320,200 420,320"
          stroke="#FFDE43"
          strokeWidth="10"
          fill="none"
          opacity="0.75"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom-Right Dynamic Golden Waves */}
      <svg
        viewBox="0 0 500 320"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 'clamp(280px, 35vw, 480px)',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 1,
          transform: 'rotate(180deg)',
        }}
      >
        <path d="M 0,0 C 140,50 260,140 340,300 L 0,300 Z" fill="url(#gold-wave-2)" />
        <path
          d="M 0,40 C 160,80 290,180 380,320"
          stroke="#FEC603"
          strokeWidth="24"
          fill="none"
          opacity="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 0,70 C 180,105 320,200 420,320"
          stroke="#FFDE43"
          strokeWidth="10"
          fill="none"
          opacity="0.75"
          strokeLinecap="round"
        />
      </svg>

      {/* Top-Right Architectural Building Render */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '38%',
          height: '55%',
          backgroundImage: 'url(/images/about_architecture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          opacity: 0.18,
          filter: 'grayscale(100%) contrast(110%) brightness(120%)',
          maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Bottom-Left Subtle Architectural Blueprint Wireframe */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '15px',
          width: '260px',
          height: '180px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.22,
        }}
      >
        <svg viewBox="0 0 260 180" fill="none" style={{ width: '100%', height: '100%' }}>
          <rect x="20" y="70" width="120" height="90" stroke="#FEC603" strokeWidth="1.6" strokeDasharray="3 3" />
          <polygon points="10,70 80,20 150,70" stroke="#FEC603" strokeWidth="1.8" />
          <rect x="40" y="90" width="35" height="40" stroke="#FEC603" strokeWidth="1.4" />
          <rect x="90" y="90" width="35" height="70" stroke="#FEC603" strokeWidth="1.4" />
          <line x1="80" y1="20" x2="80" y2="70" stroke="#FEC603" strokeWidth="1.4" strokeDasharray="2 2" />
          <line x1="0" y1="160" x2="260" y2="160" stroke="#FEC603" strokeWidth="2" />
        </svg>
      </div>

      {/* ================= 2. MASTER INFOGRAPHIC CANVAS (DESKTOP) ================= */}
      <div className="disciplines-desktop-canvas" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1160px',
            margin: '0 auto',
            aspectRatio: '1024 / 576',
            minHeight: '560px',
          }}
        >
          {/* SVG Spokes, Midpoint Beads & Dotted Orbital Ring */}
          <svg
            viewBox="0 0 1024 576"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <defs>
              <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="7" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Realistic 3D Spherical Radial Gradient for Flowing Points */}
              <radialGradient id="sphere-3d-point" cx="35%" cy="35%" r="65%" fx="28%" fy="28%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="22%" stopColor="#FFF275" />
                <stop offset="55%" stopColor="#FEC603" />
                <stop offset="85%" stopColor="#E09F00" />
                <stop offset="100%" stopColor="#7A4D00" />
              </radialGradient>

              {/* Glowing Comet Tail Gradient */}
              <linearGradient id="flow-comet-tail" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEC603" stopOpacity="0" />
                <stop offset="50%" stopColor="#FEC603" stopOpacity="0.45" />
                <stop offset="85%" stopColor="#FFE066" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* 1. Spoke Lines with Attractive 3D Energy Point Flow Animation to Each Fixed Service Disc */}
            {services.map((srv, idx) => {
              const dx = srv.discPos.x - hubCenter.x;
              const dy = srv.discPos.y - hubCenter.y;
              const dist = Math.hypot(dx, dy);
              const ux = dx / dist;
              const uy = dy / dist;

              // Line starts on hub perimeter and extends to disc edge
              const sx = hubCenter.x + hubRadius * ux;
              const sy = hubCenter.y + hubRadius * uy;
              const ex = srv.discPos.x - 52 * ux;
              const ey = srv.discPos.y - 52 * uy;

              const lineLen = Math.hypot(ex - sx, ey - sy);
              const angleDeg = (Math.atan2(ey - sy, ex - sx) * 180) / Math.PI;
              const isHovered = hoveredNode === srv.no;
              const baseDelay = idx * 0.22;

              return (
                <g key={`spoke-${srv.no}`} transform={`translate(${sx}, ${sy}) rotate(${angleDeg})`}>
                  {/* Glowing Spoke Underlay */}
                  <line
                    x1="0"
                    y1="0"
                    x2={lineLen}
                    y2="0"
                    stroke="#FEC603"
                    strokeWidth={isHovered ? '4.5' : '3.0'}
                    strokeLinecap="round"
                    opacity={isHovered ? 0.95 : 0.35}
                    filter="url(#hub-glow)"
                  />

                  {/* High-Precision Dashed Spoke Line */}
                  <line
                    x1="0"
                    y1="0"
                    x2={lineLen}
                    y2="0"
                    stroke="#FEC603"
                    strokeWidth={isHovered ? '2.6' : '2.0'}
                    strokeDasharray="4 5"
                    strokeLinecap="round"
                    opacity={isHovered ? 1 : 0.85}
                  />

                  {/* Primary 3D Flowing Point with Streaking Comet Tail */}
                  <motion.g
                    initial={{ x: 0, opacity: 0 }}
                    animate={{
                      x: [0, lineLen],
                      opacity: [0, 1, 1, 0.9, 0],
                      scale: [0.7, 1.15, 1.0, 1.0, 0.5],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: baseDelay,
                    }}
                  >
                    {/* Dynamic 3D Streaking Comet Tail */}
                    <line
                      x1="-30"
                      y1="0"
                      x2="0"
                      y2="0"
                      stroke="url(#flow-comet-tail)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Outer Radiant Aura Glow */}
                    <circle cx="0" cy="0" r="10" fill="#FFDE00" opacity="0.8" filter="url(#hub-glow)" />
                    {/* 3D Spherical Bead */}
                    <circle
                      cx="0"
                      cy="0"
                      r="6"
                      fill="url(#sphere-3d-point)"
                      stroke="#111111"
                      strokeWidth="1.2"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))' }}
                    />
                    {/* 3D Specular Sun Highlight */}
                    <circle cx="-1.8" cy="-1.8" r="2.0" fill="#FFFFFF" opacity="0.95" />
                  </motion.g>

                  {/* Secondary Staggered 3D Micro-Point */}
                  <motion.g
                    initial={{ x: 0, opacity: 0 }}
                    animate={{
                      x: [0, lineLen],
                      opacity: [0, 0.95, 0.95, 0.7, 0],
                      scale: [0.5, 0.95, 0.9, 0.85, 0.4],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: baseDelay + 1.1,
                    }}
                  >
                    <line
                      x1="-20"
                      y1="0"
                      x2="0"
                      y2="0"
                      stroke="url(#flow-comet-tail)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="0" cy="0" r="7" fill="#FFDE00" opacity="0.6" filter="url(#hub-glow)" />
                    <circle
                      cx="0"
                      cy="0"
                      r="4.2"
                      fill="url(#sphere-3d-point)"
                      stroke="#111111"
                      strokeWidth="1.0"
                    />
                    <circle cx="-1.2" cy="-1.2" r="1.4" fill="#FFFFFF" opacity="0.95" />
                  </motion.g>
                </g>
              );
            })}

            {/* 2. Rotating 3D Wheel Mechanism (Only This Wheel Design Rotates, Icons & Cards Stay Fixed) */}
            <g
              className="rotating-3d-kinetic-wheel"
              style={{
                transformOrigin: `${hubCenter.x}px ${hubCenter.y}px`,
                animation: 'wheelRotate3D 40s linear infinite',
              }}
            >
              {/* Outer Primary Dotted Orbital Wheel Rim */}
              <circle
                cx={hubCenter.x}
                cy={hubCenter.y}
                r="170"
                fill="none"
                stroke="#FEC603"
                strokeWidth="2.2"
                strokeDasharray="5 7"
                opacity="0.95"
              />

              {/* Secondary Concentric Tech Dial Ring */}
              <circle
                cx={hubCenter.x}
                cy={hubCenter.y}
                r="142"
                fill="none"
                stroke="#FFDE43"
                strokeWidth="1.2"
                strokeDasharray="2 6"
                opacity="0.55"
              />

              {/* Tertiary Inner Orbit Ring */}
              <circle
                cx={hubCenter.x}
                cy={hubCenter.y}
                r="124"
                fill="none"
                stroke="#FEC603"
                strokeWidth="1.0"
                strokeDasharray="1 5"
                opacity="0.45"
              />

              {/* 9 Rotating Radial Spokes with Golden Ring Beads matching 9 Services */}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const cosA = Math.cos(rad);
                const sinA = Math.sin(rad);

                const sx = hubCenter.x + hubRadius * cosA;
                const sy = hubCenter.y + hubRadius * sinA;
                const ex = hubCenter.x + 170 * cosA;
                const ey = hubCenter.y + 170 * sinA;
                const px = hubCenter.x + 184 * cosA;
                const py = hubCenter.y + 184 * sinA;

                return (
                  <g key={idx}>
                    {/* Spoke Line radiating outward with subtle pin extension */}
                    <line
                      x1={sx}
                      y1={sy}
                      x2={px}
                      y2={py}
                      stroke="#FEC603"
                      strokeWidth="2.0"
                      strokeDasharray="3 4"
                      strokeLinecap="round"
                      opacity="0.9"
                    />

                    {/* Golden Ring Bead with Black Core at Orbital Rim */}
                    <circle
                      cx={ex}
                      cy={ey}
                      r="5.5"
                      fill="#FEC603"
                      stroke="#000000"
                      strokeWidth="1.4"
                    />
                    <circle cx={ex} cy={ey} r="2" fill="#000000" />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* ================= 3. CENTRAL YELOLINE HUB ================= */}
          <div
            style={{
              position: 'absolute',
              left: `${(hubCenter.x / 1024) * 100}%`,
              top: `${(hubCenter.y / 576) * 100}%`,
              transform: 'translate(-50%, -50%)',
              width: '232px',
              height: '232px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow:
                '0 0 50px rgba(254, 198, 3, 0.45), 0 0 0 7px #FEC603, 0 16px 40px rgba(0, 0, 0, 0.12)',
              zIndex: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            {/* Iconic Chevron Wings Logo */}
            <div style={{ marginBottom: '6px' }}>
              <svg width="52" height="36" viewBox="0 0 54 38" fill="none">
                <polygon points="12,2 26,24 20,34 2,12" fill="#FEC603" />
                <polygon points="42,2 28,24 34,34 52,12" fill="#FEC603" />
              </svg>
            </div>

            {/* Brand Title: YELOLINE® */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.58rem',
                fontWeight: 950,
                color: '#000000',
                letterSpacing: '0.04em',
                margin: '0 0 4px 0',
                lineHeight: 1,
              }}
            >
              YELOLINE<span style={{ fontSize: '0.85rem', verticalAlign: 'super' }}>®</span>
            </h2>

            {/* Yellow Pill Badge: CONSTRUCTION */}
            <div
              style={{
                backgroundColor: '#FEC603',
                color: '#000000',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.74rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '3.5px 18px',
                borderRadius: '9999px',
                marginBottom: '6px',
                boxShadow: '0 2px 10px rgba(254, 198, 3, 0.4)',
              }}
            >
              CONSTRUCTION
            </div>

            {/* Sub-label: S E R V I C E S */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.68rem',
                color: '#000000',
                letterSpacing: '0.36em',
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
                opacity: 0.20,
                pointerEvents: 'none',
              }}
            >
              <svg width="105" height="22" viewBox="0 0 120 26" fill="none">
                <path d="M5 26V15H15V8H25V18H35V12H48V26H5V26Z" fill="#0F172A" />
                <path d="M52 26V9H68V4H82V14H95V26H52V26Z" fill="#0F172A" />
                <path d="M98 26V16H115V26H98Z" fill="#0F172A" />
              </svg>
            </div>
          </div>

          {/* ================= 4. ALL 9 SERVICE UNITS ================= */}
          {services.map((srv) => {
            const isHovered = hoveredNode === srv.no;

            const isRightSide = srv.side === 'right';

            return (
              <div
                key={srv.no}
                onClick={() => handleCardClick(srv)}
                onMouseEnter={() => setHoveredNode(srv.no)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  position: 'absolute',
                  ...srv.cardStyle,
                  cursor: 'pointer',
                  zIndex: isHovered ? 20 : 10,
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >

                {/* Compound Card Body */}
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: isRightSide ? 'row' : 'row-reverse',
                    filter: isHovered
                      ? 'drop-shadow(0 14px 28px rgba(254, 198, 3, 0.35))'
                      : 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.08))',
                    transition: 'filter 0.25s ease',
                  }}
                >
                  {/* 3D Photorealistic Circular Disc */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 10,
                      width: '102px',
                      height: '102px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '5.5px solid #FEC603',
                      boxShadow: isHovered
                        ? '0 0 25px #FEC603'
                        : '0 0 15px rgba(254, 198, 3, 0.35)',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={srv.img}
                      alt={srv.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </div>

                  {/* Aerodynamic White Card */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 5,
                      flexGrow: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: isRightSide ? '0 20px 20px 0' : '20px 0 0 20px',
                      [isRightSide ? 'marginLeft' : 'marginRight']: '-32px',
                      [isRightSide ? 'padding' : 'padding']: isRightSide
                        ? '12px 16px 14px 38px'
                        : '12px 38px 14px 16px',
                      borderBottom: '4px solid #FEC603',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      minHeight: '74px',
                    }}
                  >
                    {/* Text Details */}
                    <div style={{ textAlign: 'left', flexGrow: 1 }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.90rem',
                          fontWeight: 900,
                          color: '#0F172A',
                          margin: '0 0 2px 0',
                          lineHeight: 1.2,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {srv.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          color: '#64748B',
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {srv.tagline}
                      </p>
                    </div>

                    {/* Circular Yellow Arrow Button (>) */}
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: '#FEC603',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(254, 198, 3, 0.45)',
                        transform: isHovered ? 'translateX(2px)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <ChevronRight size={14} color="#000000" strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 5. MOBILE RESPONSIVE FLOW (< 1024px) ================= */}
      <div className="disciplines-mobile-flow">
        {/* Mobile Central Emblem */}
        <div
          style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow:
              '0 0 40px rgba(254, 198, 3, 0.45), 0 0 0 6px #FEC603, 0 12px 30px rgba(0, 0, 0, 0.1)',
            margin: '0 auto 35px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '4px' }}>
            <svg width="46" height="32" viewBox="0 0 54 38" fill="none">
              <polygon points="12,2 26,24 20,34 2,12" fill="#FEC603" />
              <polygon points="42,2 28,24 34,34 52,12" fill="#FEC603" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 950,
              color: '#000000',
              margin: '0 0 4px 0',
              lineHeight: 1,
            }}
          >
            YELOLINE<span style={{ fontSize: '0.8rem', verticalAlign: 'super' }}>®</span>
          </h2>
          <div
            style={{
              backgroundColor: '#FEC603',
              color: '#000000',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.70rem',
              padding: '3px 14px',
              borderRadius: '9999px',
              marginBottom: '5px',
            }}
          >
            CONSTRUCTION
          </div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '0.64rem',
              color: '#000000',
              letterSpacing: '0.35em',
            }}
          >
            SERVICES
          </div>
        </div>

        {/* 9 Mobile Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            padding: '0 20px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {services.map((srv) => (
            <div
              key={srv.no}
              onClick={() => handleCardClick(srv)}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                borderBottom: '4px solid #FEC603',
                padding: '12px 16px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                gap: '14px',
                position: 'relative',
              }}
            >

              {/* Disc */}
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  border: '4px solid #FEC603',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(254, 198, 3, 0.3)',
                }}
              >
                <img
                  src={srv.img}
                  alt={srv.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Text */}
              <div style={{ flexGrow: 1 }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    margin: '0 0 3px 0',
                    lineHeight: 1.2,
                  }}
                >
                  {srv.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    color: '#64748B',
                    margin: 0,
                    lineHeight: 1.25,
                  }}
                >
                  {srv.tagline}
                </p>
              </div>

              {/* Arrow */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#FEC603',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ChevronRight size={15} color="#000000" strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 6. INTERACTIVE SERVICE DETAIL MODAL ================= */}
      <AnimatePresence>
        {activeService && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.72)',
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
                border: '1.5px solid #FEC603',
                zIndex: 10,
              }}
            >
              <button
                onClick={() => setActiveService(null)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.08)',
                  backgroundColor: '#F8FAFC',
                  color: '#0F172A',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '3.5px solid #FEC603',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={activeService.img}
                    alt={activeService.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#000000',
                      backgroundColor: '#FEC603',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      display: 'inline-block',
                      marginBottom: '4px',
                    }}
                  >
                    ENGINEERING SPECIALTY
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      color: '#0F172A',
                      margin: 0,
                    }}
                  >
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                {activeService.scope}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <h4
                  style={{
                    fontSize: '0.80rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '10px',
                  }}
                >
                  Key Engineering Deliverables
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeService.deliverables?.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.86rem',
                        color: '#334155',
                      }}
                    >
                      <CheckCircle2 size={16} color="#FEC603" strokeWidth={2.5} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveService(null);
                  onSelectService?.(activeService.title);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#FEC603',
                  color: '#000000',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(254, 198, 3, 0.45)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span>Consult Principal Engineer</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scoped Responsive Styles */}
      <style>{`
        @keyframes wheelRotate3D {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .disciplines-desktop-canvas {
          display: block;
        }
        .disciplines-mobile-flow {
          display: none;
        }

        @media (max-width: 1024px) {
          .disciplines-desktop-canvas {
            display: none !important;
          }
          .disciplines-mobile-flow {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}

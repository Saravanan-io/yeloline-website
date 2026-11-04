import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, QrCode } from 'lucide-react';

export default function AboutAppBanner() {
  const [downloadModal, setDownloadModal] = useState(false);

  // Refs for 3D Orbital Animation along the glowing neon ring
  const phoneContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const isHoveredOrbitRef = useRef(false);

  // 3D Orbital Revolution Loop: Cards travel along the tilted golden glowing ring
  useEffect(() => {
    let animId;
    let angle = 0;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Orbit speed: 0.48 rad/sec (~13 seconds per full 360° orbit)
      // When hovered, slows down smoothly so the user can easily read/inspect each badge
      const targetSpeed = isHoveredOrbitRef.current ? 0.08 : 0.48;
      angle += targetSpeed * dt;

      const container = phoneContainerRef.current;
      const w = container ? container.offsetWidth : 420;
      const h = container ? container.offsetHeight : 540;

      // Ellipse parameters measured precisely from the glowing ring on the mockup
      const rx = w * 0.475;
      const ry = h * 0.155;
      const cx = w * 0.50;
      const cy = h * 0.47;
      const tiltRad = -12.5 * (Math.PI / 180);
      const cosTilt = Math.cos(tiltRad);
      const sinTilt = Math.sin(tiltRad);

      for (let i = 0; i < 4; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // 4 cards spaced evenly by 90 degrees (π/2)
        const phi = angle + i * (Math.PI / 2);
        const u = rx * Math.cos(phi);
        const v = ry * Math.sin(phi);

        // Apply -12.5° elliptical tilt rotation
        const x = cx + (u * cosTilt - v * sinTilt);
        const y = cy + (u * sinTilt + v * cosTilt);

        // 3D Depth Perception:
        // When v >= 0, the card is in FRONT of the phone (bottom-half of tilted ellipse)
        // When v < 0, the card is BEHIND the phone (top-half of tilted ellipse)
        const isFront = v >= 0;
        const depthNorm = (v / ry + 1) / 2; // 0.0 (furthest back) to 1.0 (nearest front)

        const scale = 0.80 + 0.32 * depthNorm; // 0.80 behind -> 1.12 in front
        const opacity = 0.65 + 0.35 * depthNorm; // 0.65 behind -> 1.00 in front
        const zIndex = isFront ? 10 : 2; // Phone is at zIndex: 4

        el.style.left = `${x.toFixed(1)}px`;
        el.style.top = `${y.toFixed(1)}px`;
        el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = zIndex;

        if (!isFront) {
          el.style.filter = 'blur(0.6px) brightness(0.92)';
          el.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.08)';
        } else {
          el.style.filter = 'none';
          el.style.boxShadow =
            '0 18px 38px rgba(0, 0, 0, 0.18), 0 4px 10px rgba(0, 0, 0, 0.06)';
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePlayStoreClick = (e) => {
    e.preventDefault();
    setDownloadModal(true);
  };

  return (
    <section
      id="download-our-app"
      style={{
        width: '100%',
        minHeight: '660px',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        backgroundImage:
          'radial-gradient(circle at 18% 35%, rgba(254, 198, 3, 0.06) 0%, transparent 60%), radial-gradient(circle at 85% 75%, rgba(241, 245, 249, 0.7) 0%, transparent 55%)',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        overflow: 'hidden',
        padding: '75px 0 85px 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ================================================================ */}
      {/* TOP RIGHT ANGLED YELLOW BRANDING BANNER (Edge-to-Edge)           */}
      {/* ================================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(260px, 32vw, 420px)',
          height: 'clamp(85px, 11vw, 130px)',
          backgroundColor: '#FEC603',
          clipPath: 'polygon(16% 0, 100% 0, 100% 100%, 0% 100%)',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 'clamp(20px, 4vw, 56px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <img
          src="/images/yeloline_logo.png"
          alt="Yeloline Construction"
          style={{
            height: 'clamp(32px, 4vw, 46px)',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
          }}
        />
      </div>

      {/* ================================================================ */}
      {/* BOTTOM LEFT ARCHITECTURAL ANGULAR SLASHES (Edge-to-Edge)         */}
      {/* ================================================================ */}
      {/* Sharp Black Polygonal Wedge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 'clamp(200px, 26vw, 360px)',
          height: 'clamp(100px, 14vw, 180px)',
          backgroundColor: '#0F172A',
          clipPath: 'polygon(0 52%, 100% 100%, 0 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      {/* Sharp Vibrant Yellow Accent Slash */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 'clamp(240px, 30vw, 410px)',
          height: 'clamp(120px, 16vw, 215px)',
          backgroundColor: '#FEC603',
          clipPath: 'polygon(0 28%, 42% 100%, 0 74%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ================================================================ */}
      {/* RIGHT SIDE BACKGROUND: LUXURY VILLA & BLUEPRINT CAD OVERLAY       */}
      {/* ================================================================ */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 'clamp(380px, 50vw, 760px)',
          height: '92%',
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        {/* Architectural Blueprint Isometric Wireframe SVG */}
        <svg
          style={{
            position: 'absolute',
            right: '6%',
            top: '8%',
            width: '420px',
            height: '320px',
            opacity: 0.16,
          }}
          viewBox="0 0 380 280"
          fill="none"
          stroke="#0F172A"
          strokeWidth="1.2"
        >
          <polygon points="50,180 200,90 350,170 190,260" strokeDasharray="3 3" />
          <line x1="200" y1="90" x2="200" y2="20" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="350" y1="170" x2="350" y2="100" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="50" y1="180" x2="50" y2="110" stroke="#0F172A" strokeWidth="1.5" />
          <polygon points="50,110 200,20 350,100 200,190" />
          <line x1="125" y1="65" x2="125" y2="145" stroke="#FEC603" strokeWidth="1.5" />
          <line x1="275" y1="60" x2="275" y2="135" stroke="#FEC603" strokeWidth="1.5" />
          <circle cx="200" cy="90" r="3" fill="#FEC603" />
          <circle cx="350" cy="170" r="3" fill="#FEC603" />
          <circle cx="50" cy="180" r="3" fill="#FEC603" />
        </svg>

        {/* Villa Image with Smooth Ambient Fade */}
        <img
          src="/images/why_choose_villa_transparent.png"
          alt="Yeloline Villa Project"
          style={{
            width: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            opacity: 0.85,
            filter: 'contrast(1.02)',
          }}
        />

        {/* Soft gradient mask across the villa */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0.72) 40%, rgba(255, 255, 255, 0.15) 75%, transparent 100%)',
          }}
        />
      </div>

      {/* ================================================================ */}
      {/* INNER CONTENT CONTAINER (Full-Width Responsive Grid)             */}
      {/* ================================================================ */}
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4.5vw, 64px)',
          position: 'relative',
          zIndex: 4,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* -------------------------------------------------------------- */}
          {/* LEFT COLUMN: 3D PHONE MOCKUP WITH 4 ORBITING SQUIRCLE BADGES    */}
          {/* -------------------------------------------------------------- */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '520px',
              padding: '20px 10px',
            }}
          >
            {/* Dedicated Orbit Stage Container */}
            <div
              ref={phoneContainerRef}
              onMouseEnter={() => {
                isHoveredOrbitRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredOrbitRef.current = false;
              }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                height: '520px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Central Phone Mockup on Pedestal (Pinned at zIndex: 4) */}
              <img
                src="/images/yeloline-app-mockup.png"
                alt="Yeloline Construction Mobile App"
                style={{
                  position: 'relative',
                  zIndex: 4,
                  width: '100%',
                  height: 'auto',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 24px 48px rgba(0, 0, 0, 0.18))',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />

              {/* 1. BADGE 0: Safety Hard Hat 🪖 */}
              <div
                ref={(el) => (cardRefs.current[0] = el)}
                style={{
                  position: 'absolute',
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
                  border: '1.2px solid rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform, left, top',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M7 21C7 15 11 10 16 10C21 10 25 15 25 21H7Z"
                    fill="#FEC603"
                    stroke="#D97706"
                    strokeWidth="1.5"
                  />
                  <path d="M14 10V21" stroke="#D97706" strokeWidth="1.5" />
                  <path d="M18 10V21" stroke="#D97706" strokeWidth="1.5" />
                  <rect x="4" y="20" width="24" height="4" rx="2" fill="#F59E0B" />
                </svg>
              </div>

              {/* 2. BADGE 1: 2D Blueprint / Floor Plan 📐 */}
              <div
                ref={(el) => (cardRefs.current[1] = el)}
                style={{
                  position: 'absolute',
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
                  border: '1.2px solid rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform, left, top',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                  <rect x="5" y="5" width="22" height="22" rx="2" stroke="#1E293B" strokeWidth="1.8" />
                  <path d="M5 14H18V27" stroke="#1E293B" strokeWidth="1.8" />
                  <path d="M18 19H27" stroke="#1E293B" strokeWidth="1.8" />
                  <path d="M11 5V14" stroke="#64748B" strokeWidth="1.2" strokeDasharray="2 2" />
                  <rect x="8" y="8" width="4" height="3" fill="#FEC603" opacity="0.8" />
                </svg>
              </div>

              {/* 3. BADGE 2: Progress Analytics & Material Logs 📈 */}
              <div
                ref={(el) => (cardRefs.current[2] = el)}
                style={{
                  position: 'absolute',
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
                  border: '1.2px solid rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform, left, top',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                  <line x1="6" y1="26" x2="26" y2="26" stroke="#0F172A" strokeWidth="1.8" />
                  <rect x="8" y="16" width="4" height="10" rx="1" fill="#94A3B8" />
                  <rect x="14" y="12" width="4" height="14" rx="1" fill="#475569" />
                  <rect x="20" y="8" width="4" height="18" rx="1" fill="#FEC603" />
                  <path d="M9 13L16 9L23 5" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M19 5H23V9" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* 4. BADGE 3: Construction Tower Crane 🏗️ */}
              <div
                ref={(el) => (cardRefs.current[3] = el)}
                style={{
                  position: 'absolute',
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
                  border: '1.2px solid rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform, left, top',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
                  <line x1="12" y1="8" x2="12" y2="26" stroke="#0F172A" strokeWidth="2" />
                  <line x1="16" y1="8" x2="16" y2="26" stroke="#0F172A" strokeWidth="2" />
                  <line x1="12" y1="12" x2="16" y2="16" stroke="#FEC603" strokeWidth="1.2" />
                  <line x1="16" y1="12" x2="12" y2="16" stroke="#FEC603" strokeWidth="1.2" />
                  <line x1="12" y1="18" x2="16" y2="22" stroke="#FEC603" strokeWidth="1.2" />
                  <line x1="16" y1="18" x2="12" y2="22" stroke="#FEC603" strokeWidth="1.2" />
                  <line x1="4" y1="8" x2="28" y2="8" stroke="#0F172A" strokeWidth="2.5" />
                  <rect x="4" y="6" width="4" height="5" fill="#FEC603" />
                  <line x1="24" y1="8" x2="24" y2="18" stroke="#475569" strokeWidth="1.2" strokeDasharray="2 2" />
                  <circle cx="24" cy="19" r="1.5" fill="#0F172A" />
                </svg>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* RIGHT COLUMN: TYPOGRAPHY, BUTTONS & ACTIONS                     */}
          {/* -------------------------------------------------------------- */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '580px',
              margin: '0 auto',
              padding: '10px 0',
            }}
          >


            {/* Main Headline: Download Our */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Download Our
            </h2>

            {/* Yellow Skewed Banner: Mobile App */}
            <div
              style={{
                backgroundColor: '#FEC603',
                padding: '6px 32px',
                borderRadius: '12px',
                transform: 'skewX(-6deg)',
                boxShadow: '0 10px 28px rgba(254, 198, 3, 0.42)',
                marginTop: '8px',
                marginBottom: '20px',
                display: 'inline-block',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.4rem, 4.6vw, 3.7rem)',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  display: 'inline-block',
                  transform: 'skewX(6deg)',
                }}
              >
                Mobile App
              </span>
            </div>

            {/* Divider: Yellow Accent Line + DOWNLOAD THE APP NOW + Yellow Accent Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  width: '42px',
                  height: '2.5px',
                  backgroundColor: '#FEC603',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.94rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                DOWNLOAD THE APP NOW
              </span>
              <span
                style={{
                  width: '42px',
                  height: '2.5px',
                  backgroundColor: '#FEC603',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
            </div>

            {/* Paragraph Description */}
            <p
              style={{
                fontSize: '0.96rem',
                lineHeight: 1.68,
                color: '#475569',
                fontWeight: 500,
                maxWidth: '520px',
                margin: '0 auto 28px auto',
              }}
            >
              Track on-site construction milestones in real time, inspect 3D engineering blueprints, and view daily
              material and labor logs directly on your mobile device.
            </p>

            {/* Official Google Play Store Button (Enlarged Hero Size) */}
            <motion.button
              onClick={handlePlayStoreClick}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{
                backgroundColor: '#000000',
                border: '3px solid #FEC603',
                borderRadius: '22px',
                padding: '16px 42px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '18px',
                cursor: 'pointer',
                boxShadow: '0 12px 36px rgba(254, 198, 3, 0.42), 0 6px 18px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                marginBottom: '24px',
              }}
            >
              {/* Official Google Play 4-Color Triangle Logo */}
              <svg width="42" height="48" viewBox="0 0 28 30" fill="none">
                <path
                  d="M1.3 1.2C1.1 1.6 1 2.2 1 2.9V27.1C1 27.8 1.1 28.4 1.3 28.8L1.4 28.9L15.3 15V14.8L1.4 1.1L1.3 1.2Z"
                  fill="url(#gpBlueOrbit)"
                />
                <path
                  d="M19.9 19.6L15.3 15V14.8L19.9 10.2L20 10.3L25.4 13.4C27 14.3 27 15.7 25.4 16.6L20 19.6L19.9 19.6Z"
                  fill="url(#gpYellowOrbit)"
                />
                <path
                  d="M20 19.6L15.3 15L1.3 28.9C1.8 29.5 2.7 29.5 3.8 28.9L20 19.6Z"
                  fill="url(#gpRedOrbit)"
                />
                <path
                  d="M20 10.4L3.8 1.1C2.7 0.5 1.8 0.5 1.3 1.1L15.3 15L20 10.4Z"
                  fill="url(#gpGreenOrbit)"
                />
                <defs>
                  <linearGradient id="gpBlueOrbit" x1="13.9" y1="2.7" x2="-2.4" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00A0FF" />
                    <stop offset="0.007" stopColor="#00A1FF" />
                    <stop offset="0.26" stopColor="#00BEFF" />
                    <stop offset="0.512" stopColor="#00D2FF" />
                    <stop offset="0.76" stopColor="#00DFFF" />
                    <stop offset="1" stopColor="#00E3FF" />
                  </linearGradient>
                  <linearGradient id="gpYellowOrbit" x1="27.4" y1="15" x2="0.6" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFE000" />
                    <stop offset="0.409" stopColor="#FFBD00" />
                    <stop offset="0.775" stopColor="#FFA500" />
                    <stop offset="1" stopColor="#FF9C00" />
                  </linearGradient>
                  <linearGradient id="gpRedOrbit" x1="17.6" y1="17.3" x2="2.7" y2="32.2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3A44" />
                    <stop offset="1" stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient id="gpGreenOrbit" x1="2.7" y1="-2.2" x2="17.6" y2="12.7" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#32A071" />
                    <stop offset="0.069" stopColor="#2DA771" />
                    <stop offset="0.476" stopColor="#15CF74" />
                    <stop offset="0.801" stopColor="#06E775" />
                    <stop offset="1" stopColor="#00F076" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Text Block: GET IT ON / Google Play */}
              <div style={{ textAlign: 'left', lineHeight: 1.12 }}>
                <div
                  style={{
                    fontSize: '0.80rem',
                    letterSpacing: '0.14em',
                    color: '#E2E8F0',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  GET IT ON
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.65rem, 2.4vw, 1.95rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Google Play
                </div>
              </div>
            </motion.button>


          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* GOOGLE PLAY DOWNLOAD / QR CODE MODAL DIALOG                      */}
      {/* ================================================================ */}
      <AnimatePresence>
        {downloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDownloadModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '36px',
                maxWidth: '440px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setDownloadModal(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                <X size={18} />
              </button>

              {/* QR Code Container */}
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  backgroundColor: '#FEF9C3',
                  borderRadius: '22px',
                  margin: '0 auto 20px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #FEC603',
                  boxShadow: '0 8px 20px rgba(254, 198, 3, 0.25)',
                }}
              >
                <QrCode size={54} color="#0F172A" />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  marginBottom: '8px',
                }}
              >
                Install Yeloline App
              </h3>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  marginBottom: '22px',
                }}
              >
                Scan with your phone camera or click below to launch the official Google Play Store listing.
              </p>

              {/* Google Play Direct Open Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.yeloline.construction"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  alert(
                    'Redirecting to Google Play Store listing: Yeloline Construction (com.yeloline.construction)'
                  );
                  setDownloadModal(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  padding: '13px 26px',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '2px solid #FEC603',
                  boxShadow: '0 8px 24px rgba(254, 198, 3, 0.35)',
                }}
              >
                <span>Open on Google Play</span>
                <ExternalLink size={16} color="#FEC603" />
              </a>

              {/* Safety Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  color: '#10B981',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                <CheckCircle2 size={14} />
                <span>Verified Android Package (Package ID: com.yeloline.construction)</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

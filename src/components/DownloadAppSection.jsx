import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, X, Check } from 'lucide-react';

export default function DownloadAppSection({
  title = 'DOWNLOAD OUR',
  highlight = 'MOBILE APP',
  subheading = 'DOWNLOAD THE APP NOW',
  description = 'Track on-site construction milestones in real time, inspect 3D engineering blueprints, and view daily material and labor logs directly on your mobile device.',
}) {
  const [showModal, setShowModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Refs for 3D Orbital Animation along the glowing neon ring (Image 2 effect)
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
      const h = container ? container.offsetHeight : 520;

      // Ellipse parameters measured precisely from the glowing ring on the 3D phone mockup
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

        const baseScale = w < 380 ? 0.72 : 0.82;
        const scale = baseScale + 0.32 * depthNorm; // ~0.82 behind -> 1.14 in front
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

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleDirectDownload = (e) => {
    e.stopPropagation();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <>
      <section
        id="download-app-section"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '540px',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        {/* ================= BACKGROUND GRAPHICS & CURVES ================= */}

        {/* 1. Subtle Architectural Building in Top Right */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '52%',
            height: '100%',
            backgroundImage: 'url(/images/about_architecture.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'right 20% top',
            opacity: 0.16,
            filter: 'grayscale(100%) contrast(110%) brightness(115%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 85%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* 2. Top-Left Yellow Curved Arc */}
        <svg
          viewBox="0 0 400 400"
          style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '320px',
            height: '320px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {/* Outer yellow swoosh curve */}
          <path
            d="M 60,60 C 20,180 80,320 220,380 C 120,340 60,240 80,120 Z"
            fill="#FEC603"
            opacity="0.95"
          />
        </svg>

        {/* 3. Left Yellow Circle Backdrop behind the Phone */}
        <div
          style={{
            position: 'absolute',
            left: '3%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(360px, 42vw, 540px)',
            height: 'clamp(360px, 42vw, 540px)',
            borderRadius: '50%',
            backgroundColor: '#FFC700',
            boxShadow: '0 0 60px rgba(254, 198, 3, 0.35)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* 4. Bottom Fluid Dark Wave with Yellow Ribbon */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 'clamp(110px, 16vw, 175px)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {/* Yellow Wave Ribbon Contour */}
          <path
            d="M 0,165 C 160,110 320,80 480,125 C 680,180 860,185 1100,120 C 1240,82 1360,68 1440,78 L 1440,102 C 1360,92 1240,105 1100,142 C 860,208 680,202 480,148 C 320,102 160,132 0,186 Z"
            fill="#FEC603"
          />

          {/* Bottom Dark Obsidian Wave Area */}
          <path
            d="M 0,180 C 160,125 320,95 480,140 C 680,195 860,200 1100,135 C 1240,97 1360,82 1440,92 L 1440,220 L 0,220 Z"
            fill="#18181B"
          />

          {/* Bottom Right Golden Accent Swoosh */}
          <path
            d="M 1260,220 C 1320,180 1390,160 1440,150 L 1440,220 Z"
            fill="#FFC700"
            opacity="0.9"
          />
        </svg>

        {/* ================= CONTENT CONTAINER ================= */}
        <div
          className="app-container"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            alignItems: 'center',
            minHeight: '520px',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          {/* LEFT COLUMN: 3D Phone Mockup with 4 Orbiting Squircle Badges */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              minHeight: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
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
              {/* Central 3D Gold Phone Mockup on Marble Pedestal (Pinned at zIndex: 4) */}
              <motion.img
                src="/images/yeloline-app-mockup.png"
                alt="Yeloline Construction Mobile App"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
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
                onClick={handleDownloadClick}
                title="Safety & Quality Audits"
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
                onClick={handleDownloadClick}
                title="3D Elevation & Blueprints"
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
                onClick={handleDownloadClick}
                title="Real-time Milestone Progress"
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
                onClick={handleDownloadClick}
                title="On-site Machinery & Execution"
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

          {/* RIGHT COLUMN: DOWNLOAD OUR MOBILE APP LOCKUP */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px 10px',
              position: 'relative',
            }}
          >
            {/* 1. Golden Download Icon Button with Spark Burst Rays */}
            <div
              style={{
                position: 'relative',
                marginBottom: '18px',
                display: 'inline-block',
              }}
            >
              {/* Radiating Yellow Spark Rays (Top-Right of Button) */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-24px',
                  width: '40px',
                  height: '40px',
                  pointerEvents: 'none',
                }}
              >
                {/* Spark Ray 1 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '12px',
                    width: '4.5px',
                    height: '14px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(25deg)',
                    display: 'block',
                  }}
                />
                {/* Spark Ray 2 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '0px',
                    width: '4.5px',
                    height: '14px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(65deg)',
                    display: 'block',
                  }}
                />
                {/* Spark Ray 3 */}
                <span
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '2px',
                    width: '4px',
                    height: '9px',
                    backgroundColor: '#FFC700',
                    borderRadius: '9999px',
                    transform: 'rotate(45deg)',
                    display: 'block',
                  }}
                />
              </div>

              {/* The Rounded Golden Download Button */}
              <motion.button
                onClick={handleDownloadClick}
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.94 }}
                aria-label="Download Yeloline Mobile App"
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '22px',
                  backgroundColor: '#FEC603',
                  background: 'linear-gradient(145deg, #FFDE00 0%, #FFB600 100%)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 28px rgba(254, 198, 3, 0.45)',
                  outline: 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Download Tray & Down Arrow Icon */}
                <svg
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />
                  <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
                  <path d="M4 17.5v1.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5" />
                </svg>
              </motion.button>
            </div>



            {/* 3. Top Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
                margin: '0 0 10px 0',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </h2>

            {/* 4. Skewed Yellow Banner */}
            <motion.div
              onClick={handleDownloadClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-block',
                cursor: 'pointer',
                transform: 'skewX(-11deg)',
                backgroundColor: '#FEC603',
                background: 'linear-gradient(90deg, #FFD100 0%, #FFC100 100%)',
                padding: '10px 42px',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(254, 198, 3, 0.42)',
                margin: '4px 0 16px 0',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
                  fontWeight: 950,
                  fontStyle: 'italic',
                  color: '#000000',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  WebkitTextStroke: '0.5px #000000',
                }}
              >
                {highlight}
              </span>
            </motion.div>

            {/* 5. DOWNLOAD THE APP NOW Callout */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.015em',
                margin: '2px 0 10px 0',
                textTransform: 'uppercase',
              }}
            >
              {subheading}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.94rem',
                color: '#475569',
                lineHeight: 1.6,
                maxWidth: '520px',
                margin: '0 auto 24px auto',
                fontWeight: 500,
              }}
            >
              {description}
            </p>

            {/* 6. PROMINENT GOOGLE PLAY DOWNLOAD BUTTON */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '26px',
              }}
            >
              {/* Large Hero Google Play Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleDownloadClick}
                aria-label="Get it on Google Play"
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '15px 36px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  border: '2px solid rgba(254, 198, 3, 0.45)',
                  boxShadow: '0 14px 35px rgba(0, 0, 0, 0.28), 0 0 24px rgba(254, 198, 3, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Official Google Play 4-Color Logo */}
                <svg width="34" height="38" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.3 1.2C1.1 1.6 1 2.2 1 2.9V27.1C1 27.8 1.1 28.4 1.3 28.8L1.4 28.9L15.3 15V14.8L1.4 1.1L1.3 1.2Z" fill="url(#mainGpBlue)" />
                  <path d="M19.9 19.6L15.3 15V14.8L19.9 10.2L20 10.3L25.4 13.4C27 14.3 27 15.7 25.4 16.6L20 19.6L19.9 19.6Z" fill="url(#mainGpYellow)" />
                  <path d="M20 19.6L15.3 15L1.3 28.9C1.8 29.5 2.7 29.5 3.8 28.9L20 19.6Z" fill="url(#mainGpRed)" />
                  <path d="M20 10.4L3.8 1.1C2.7 0.5 1.8 0.5 1.3 1.1L15.3 15L20 10.4Z" fill="url(#mainGpGreen)" />
                  <defs>
                    <linearGradient id="mainGpBlue" x1="13.9" y1="2.7" x2="-2.4" y2="19" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00A0FF" />
                      <stop offset="0.007" stopColor="#00A1FF" />
                      <stop offset="0.26" stopColor="#00BEFF" />
                      <stop offset="0.512" stopColor="#00D2FF" />
                      <stop offset="0.76" stopColor="#00DFFF" />
                      <stop offset="1" stopColor="#00E3FF" />
                    </linearGradient>
                    <linearGradient id="mainGpYellow" x1="27.4" y1="15" x2="0.6" y2="15" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFE000" />
                      <stop offset="0.409" stopColor="#FFBD00" />
                      <stop offset="0.775" stopColor="#FFA500" />
                      <stop offset="1" stopColor="#FF9C00" />
                    </linearGradient>
                    <linearGradient id="mainGpRed" x1="17.6" y1="17.3" x2="2.7" y2="32.2" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF3A44" />
                      <stop offset="1" stopColor="#C31162" />
                    </linearGradient>
                    <linearGradient id="mainGpGreen" x1="2.7" y1="-2.2" x2="17.6" y2="12.7" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#32A071" />
                      <stop offset="0.069" stopColor="#2DA771" />
                      <stop offset="0.476" stopColor="#15CF74" />
                      <stop offset="0.801" stopColor="#06E775" />
                      <stop offset="1" stopColor="#00F076" />
                    </linearGradient>
                  </defs>
                </svg>

                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div
                    style={{
                      fontSize: '0.80rem',
                      letterSpacing: '0.14em',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      fontWeight: 800,
                    }}
                  >
                    GET IT ON
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.5rem, 2.6vw, 1.95rem)',
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
      </section>

      {/* ================= INTERACTIVE APP DOWNLOAD MODAL ================= */}
      <AnimatePresence>
        {showModal && (
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
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.72)',
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '36px 32px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(254, 198, 3, 0.3)',
                zIndex: 10,
                textAlign: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
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
                  transition: 'background-color 0.2s',
                }}
              >
                <X size={18} />
              </button>

              {/* Yeloline App Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: '#FEF9C3',
                  border: '1px solid #FEC603',
                  color: '#000000',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '14px',
                }}
              >
                <Smartphone size={15} color="#000000" />
                YELOLINE OFFICIAL APPLICATION
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.02em',
                }}
              >
                Get The Yeloline App
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#64748B',
                  lineHeight: 1.55,
                  margin: '0 auto 24px auto',
                  maxWidth: '380px',
                }}
              >
                Track on-site construction progress in real-time, inspect 3D engineering blueprints, and view live BOQ updates.
              </p>

              {/* QR Code Container */}
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                  borderRadius: '20px',
                  backgroundColor: '#FFFDF0',
                  border: '2px dashed #FEC603',
                  marginBottom: '24px',
                }}
              >
                <img
                  src="/images/yeloline_qr_code.png"
                  alt="Scan QR code to download Yeloline App"
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginTop: '10px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Scan with Camera to Install
                </span>
              </div>

              {/* Google Play Button */}
              <div
                style={{
                  marginBottom: '16px',
                }}
              >
                <button
                  onClick={handleDirectDownload}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '13px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(254, 198, 3, 0.4)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                  }}
                >
                  <svg width="22" height="24" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.3 1.2C1.1 1.6 1 2.2 1 2.9V27.1C1 27.8 1.1 28.4 1.3 28.8L1.4 28.9L15.3 15V14.8L1.4 1.1L1.3 1.2Z" fill="url(#modalGpBlue)" />
                    <path d="M19.9 19.6L15.3 15V14.8L19.9 10.2L20 10.3L25.4 13.4C27 14.3 27 15.7 25.4 16.6L20 19.6L19.9 19.6Z" fill="url(#modalGpYellow)" />
                    <path d="M20 19.6L15.3 15L1.3 28.9C1.8 29.5 2.7 29.5 3.8 28.9L20 19.6Z" fill="url(#modalGpRed)" />
                    <path d="M20 10.4L3.8 1.1C2.7 0.5 1.8 0.5 1.3 1.1L15.3 15L20 10.4Z" fill="url(#modalGpGreen)" />
                    <defs>
                      <linearGradient id="modalGpBlue" x1="13.9" y1="2.7" x2="-2.4" y2="19" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00A0FF" />
                        <stop offset="0.007" stopColor="#00A1FF" />
                        <stop offset="0.26" stopColor="#00BEFF" />
                        <stop offset="0.512" stopColor="#00D2FF" />
                        <stop offset="0.76" stopColor="#00DFFF" />
                        <stop offset="1" stopColor="#00E3FF" />
                      </linearGradient>
                      <linearGradient id="modalGpYellow" x1="27.4" y1="15" x2="0.6" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFE000" />
                        <stop offset="0.409" stopColor="#FFBD00" />
                        <stop offset="0.775" stopColor="#FFA500" />
                        <stop offset="1" stopColor="#FF9C00" />
                      </linearGradient>
                      <linearGradient id="modalGpRed" x1="17.6" y1="17.3" x2="2.7" y2="32.2" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF3A44" />
                        <stop offset="1" stopColor="#C31162" />
                      </linearGradient>
                      <linearGradient id="modalGpGreen" x1="2.7" y1="-2.2" x2="17.6" y2="12.7" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#32A071" />
                        <stop offset="0.069" stopColor="#2DA771" />
                        <stop offset="0.476" stopColor="#15CF74" />
                        <stop offset="0.801" stopColor="#06E775" />
                        <stop offset="1" stopColor="#00F076" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.64rem', opacity: 0.85, letterSpacing: '0.08em', fontWeight: 700 }}>GET IT ON</div>
                    <div style={{ fontSize: '1.18rem', fontWeight: 800 }}>Google Play</div>
                  </div>
                </button>
              </div>

              {/* Direct APK Download feedback */}
              {downloadSuccess ? (
                <div
                  style={{
                    backgroundColor: '#DCFCE7',
                    color: '#166534',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={16} /> APK Download initiated successfully!
                </div>
              ) : (
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  Compatible with iOS 15+ and Android 10+ devices
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Responsive Styles for the App Section */}
      <style>{`
        @media (max-width: 900px) {
          #download-app-section .app-container {
            grid-template-columns: 1fr !important;
            padding-top: 40px !important;
            padding-bottom: 70px !important;
            text-align: center;
          }
          #download-app-section .app-container > div:first-child {
            order: 2;
            min-height: 300px !important;
            justify-content: center !important;
          }
          #download-app-section .app-container > div:last-child {
            order: 1;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}

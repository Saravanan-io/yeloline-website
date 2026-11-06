import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * Hero Component
 * 
 * Cinematic architectural video hero section for Yeloline Construction.
 * Runs once from beginning to end every time the user visits the home page,
 * then pauses on the final completed house frame with a clean, unobstructed view.
 * 
 * Features 3D animated text effects on heading and quote.
 */
export default function Hero() {
  const videoRef = useRef(null);

  // Play the video once from beginning and pause at the end
  const restartVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Handled if browser autoplay policy delays playback
      });
    }
  }, []);

  // 1. Run video once whenever user visits the home page
  useEffect(() => {
    restartVideo();

    // Replay once if user clicks Home link / hash changes to #home
    const handleHashOrNav = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'home' || hash === '') {
        restartVideo();
      }
    };

    // Replay once when user scrolls back to the very top after exploring lower sections
    let hasScrolledDown = false;
    const handleScroll = () => {
      if (window.scrollY > 350) {
        hasScrolledDown = true;
      } else if (window.scrollY < 30 && hasScrolledDown) {
        hasScrolledDown = false;
        restartVideo();
      }
    };

    window.addEventListener('hashchange', handleHashOrNav);
    window.addEventListener('popstate', handleHashOrNav);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashOrNav);
      window.removeEventListener('popstate', handleHashOrNav);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [restartVideo]);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // 3D text and element animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const roofVariants = {
    hidden: { opacity: 0, y: -25, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const heading3DVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      rotateX: -25,
      z: -80,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      z: 0,
      transition: { 
        duration: 1.1, 
        ease: [0.16, 1, 0.3, 1],
      } 
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        delay: 0.35, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0B0F17',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}
    >
      {/* 1. Cinematic Full-Bleed Background Video */}
      <video
        ref={videoRef}
        src="/videos/cd6b9a49-bb23-4ef2-9b2b-894db164bf38.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
          filter: 'brightness(0.88) contrast(1.08) saturate(1.1)',
        }}
      />

      {/* 2. Multi-Stop Cinematic Ambient Overlays */}
      {/* Top Navbar Clearance Shadow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(180deg, rgba(11, 15, 23, 0.8) 0%, rgba(11, 15, 23, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Dark Readability Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(11, 15, 23, 0.2) 0%, rgba(11, 15, 23, 0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Bottom Transition Gradient to Next Section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(0deg, rgba(11, 15, 23, 0.9) 0%, rgba(11, 15, 23, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 3. Hero Content */}
      <div
        className="app-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          perspective: '1200px',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1060px',
            width: '100%',
            transformStyle: 'preserve-3d',
          }}
        >

          {/* 1. Golden Roof Gable Motif & Flanked 'MORE THAN' Sub-heading */}
          <motion.div
            variants={roofVariants}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '10px',
              width: '100%',
            }}
          >
            {/* Architectural Roof Peak with 4-Pane Apex Window */}
            <svg
              width="110"
              height="50"
              viewBox="0 0 110 50"
              fill="none"
              style={{
                overflow: 'visible',
                filter: 'drop-shadow(0 2px 10px rgba(249, 223, 4, 0.45))',
              }}
            >
              {/* Triangular Gable Roof Slopes */}
              <path
                d="M12 46 L55 8 L98 46"
                stroke="#F9DF04"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 4-Pane Window in Apex */}
              <rect
                x="48"
                y="18"
                width="14"
                height="14"
                rx="1.5"
                stroke="#F9DF04"
                strokeWidth="1.8"
                fill="rgba(249, 223, 4, 0.22)"
              />
              {/* Window Cross Grids */}
              <line x1="55" y1="18" x2="55" y2="32" stroke="#F9DF04" strokeWidth="1.4" />
              <line x1="48" y1="25" x2="62" y2="25" stroke="#F9DF04" strokeWidth="1.4" />
            </svg>

            {/* 'MORE THAN' Flanked by Golden Architectural Divider Lines */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '4px',
                width: '100%',
                maxWidth: '440px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '1.5px',
                  background: 'linear-gradient(90deg, transparent, #F9DF04)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.88rem, 1.35vw, 1.18rem)',
                  fontWeight: 800,
                  letterSpacing: '0.24em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)',
                }}
              >
                MORE THAN
              </span>
              <div
                style={{
                  flex: 1,
                  height: '1.5px',
                  background: 'linear-gradient(90deg, #F9DF04, transparent)',
                }}
              />
            </div>
          </motion.div>

          {/* 2. Main Headline: 'BRICKS & CONCRETE,' in 3D Metallic Chrome */}
          <motion.h1
            variants={heading3DVariants}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.3rem, 5.4vw, 5.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.015em',
              lineHeight: 1.08,
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 28%, #E2E8F0 42%, #94A3B8 52%, #475569 56%, #CBD5E1 68%, #F8FAFC 90%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.95)) drop-shadow(0 10px 28px rgba(0, 0, 0, 0.85))',
              transformStyle: 'preserve-3d',
            }}
          >
            BRICKS & CONCRETE,
          </motion.h1>

          {/* 3. Golden Slanted Parallelogram Badge: "IT'S A LIFELONG DREAM." */}
          <motion.div
            variants={badgeVariants}
            style={{
              display: 'inline-block',
              marginTop: '4px',
              marginBottom: '28px',
              transform: 'skewX(-11deg)',
              background: 'linear-gradient(90deg, #F9DF04 0%, #FFC700 50%, #F59E0B 100%)',
              borderRadius: '4px',
              padding: '10px 36px',
              boxShadow: '0 8px 32px rgba(249, 223, 4, 0.45), 0 2px 10px rgba(0, 0, 0, 0.6)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.35rem, 3.1vw, 2.6rem)',
                fontWeight: 900,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: '#111111',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)',
              }}
            >
              IT'S A LIFELONG DREAM.
            </span>
          </motion.div>

          {/* 4. Dual Bilingual Philosophy Quotes (Transparent Video Background) */}
          <motion.div
            variants={quoteVariants}
            style={{
              position: 'relative',
              maxWidth: '960px',
              width: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Top: Tamil Philosophy Quote */}
            <p
              style={{
                fontFamily: "'Noto Sans Tamil', 'Mukta Malar', 'Latha', var(--font-body), sans-serif",
                fontSize: 'clamp(0.98rem, 1.25vw, 1.16rem)',
                color: '#FFFFFF',
                lineHeight: 1.88,
                margin: 0,
                fontWeight: 500,
                letterSpacing: '0.015em',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 4px 28px rgba(0, 0, 0, 0.85)',
              }}
            >
              “ஒரு கட்டிடம் என்பது வெறும் செங்கல்லும் சிமெண்டும் அல்ல… பல ஆண்டுகளின் உழைப்பு, எண்ணற்ற தியாகங்கள், சொல்லப்படாத கஷ்டங்கள் இவற்றால் உருவான ஒருவரின் வாழ்நாள் கனவு. அந்தக் கனவை அடைய நீங்கள் கடந்து வந்த பாதை எவ்வளவு கடினமாக இருந்தாலும், அதைக் கட்டியெழுப்பும் பயணம் அப்படியிருக்கக் கூடாது. ஏனென்றால், உங்கள் கனவுக்காக நீங்கள் பட்ட கஷ்டங்கள் போதும்… இனி அந்தக் கனவை நிம்மதியுடனும் நம்பிக்கையுடனும் நனவாக்குவதே எங்கள் பொறுப்பு.”
            </p>

            {/* Golden Architectural Skyline Silhouette Divider (3 Towers) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                width: '100%',
                maxWidth: '320px',
                margin: '4px 0',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(249, 223, 4, 0.85))',
                }}
              />
              <svg
                width="34"
                height="26"
                viewBox="0 0 34 26"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 8px rgba(249, 223, 4, 0.7))' }}
              >
                {/* Left Tower */}
                <rect x="3" y="9" width="7" height="15" rx="1" stroke="#F9DF04" strokeWidth="1.6" />
                <line x1="6.5" y1="12" x2="6.5" y2="20" stroke="#F9DF04" strokeWidth="1.2" strokeDasharray="2 2" />

                {/* Center Tower (Tall with Arched Peak) */}
                <path
                  d="M13 24V5C13 3.34315 14.3431 2 16 2H18C19.6569 2 21 3.34315 21 5V24"
                  stroke="#F9DF04"
                  strokeWidth="1.6"
                />
                <line x1="17" y1="6" x2="17" y2="20" stroke="#F9DF04" strokeWidth="1.2" strokeDasharray="2 2" />

                {/* Right Tower */}
                <rect x="24" y="9" width="7" height="15" rx="1" stroke="#F9DF04" strokeWidth="1.6" />
                <line x1="27.5" y1="12" x2="27.5" y2="20" stroke="#F9DF04" strokeWidth="1.2" strokeDasharray="2 2" />

                {/* Foundation Line */}
                <line x1="1" y1="24" x2="33" y2="24" stroke="#F9DF04" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(249, 223, 4, 0.85), transparent)',
                }}
              />
            </div>

            {/* Bottom: English Philosophy Quote with Highlighted Yellow Accent */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.92rem, 1.15vw, 1.05rem)',
                color: 'rgba(255, 255, 255, 0.92)',
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '0.01em',
                maxWidth: '860px',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.95), 0 4px 28px rgba(0, 0, 0, 0.85)',
              }}
            >
              “A building is more than bricks and concrete… It's a lifelong dream shaped by years of hard work, sacrifice, and struggle. You've struggled enough to reach that dream. Building it shouldn't be another struggle.{' '}
              <span style={{ color: '#F9DF04', fontWeight: 600, fontStyle: 'italic' }}>
                Bringing it to life with confidence and peace of mind is our responsibility.
              </span>”
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Bottom Architectural Luminous Golden Swoop */}
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '80px',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      >
        <defs>
          <filter id="heroSwoopGlow" x="-20%" y="-40%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="heroSwoopGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9DF04" stopOpacity="0.0" />
            <stop offset="25%" stopColor="#F9DF04" stopOpacity="0.3" />
            <stop offset="65%" stopColor="#F9DF04" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#FFF275" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="heroSwoopFlare" cx="95%" cy="30%" r="25%">
            <stop offset="0%" stopColor="#FFF7A1" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#F9DF04" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F9DF04" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Flare */}
        <ellipse cx="1380" cy="35" rx="180" ry="45" fill="url(#heroSwoopFlare)" />

        {/* Diffuse Outer Glow */}
        <path
          d="M -20 90 C 400 95, 900 85, 1460 25"
          stroke="#F9DF04"
          strokeWidth="6"
          strokeOpacity="0.45"
          filter="url(#heroSwoopGlow)"
        />

        {/* Sharp Luminous Core Beam */}
        <path
          d="M -20 90 C 400 95, 900 85, 1460 25"
          stroke="url(#heroSwoopGradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>



    </section>
  );
}

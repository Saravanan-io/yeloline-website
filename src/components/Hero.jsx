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

  // 3D text animation variants
  const heading3DVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotateX: -25,
      z: -100,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      z: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      } 
    },
  };

  const word3DVariant = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      rotateX: -35,
      rotateY: 8,
      scale: 0.85,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: 1, 
        delay: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  const headingLine1Words = ['MORE', 'THAN', 'BRICKS', '&', 'CONCRETE,'];
  const headingLine2Words = ["IT'S", 'A', 'LIFELONG', 'DREAM.'];

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
          variants={heading3DVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1040px',
            transformStyle: 'preserve-3d',
          }}
        >

          {/* Main Philosophy Heading with 3D Word Animation */}
          <motion.h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.1rem, 4.4vw, 3.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#FFFFFF',
              margin: '0 0 24px 0',
              textTransform: 'uppercase',
              transformStyle: 'preserve-3d',
              perspective: '800px',
            }}
          >
            {/* Line 1: 3D word-by-word animation */}
            <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 12px' }}>
              {headingLine1Words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={word3DVariant}
                  style={{
                    display: 'inline-block',
                    textShadow: '0 4px 30px rgba(0, 0, 0, 0.75), 0 1px 3px rgba(0, 0, 0, 0.5)',
                    animation: 'hero3dFloat 6s ease-in-out infinite',
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2: 3D word-by-word with golden color */}
            <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 12px', marginTop: '4px' }}>
              {headingLine2Words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={word3DVariant}
                  style={{
                    display: 'inline-block',
                    color: '#F9DF04',
                    textShadow: '0 4px 30px rgba(249, 223, 4, 0.35), 0 0 80px rgba(249, 223, 4, 0.15)',
                    animation: 'hero3dFloat 6s ease-in-out infinite',
                    animationDelay: `${(headingLine1Words.length + i) * 0.15}s`,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Dual Bilingual Philosophy Quotes (Tamil on Top, English on Bottom) with Neon Effect */}
          <motion.div
            variants={quoteVariants}
            style={{
              position: 'relative',
              maxWidth: '980px',
              width: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
              textAlign: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Top: Tamil Quote with Neon Glow & Breathing Transition Animation */}
            <p
              className="hero-neon-tamil-quote"
              style={{
                fontFamily: "'Noto Sans Tamil', 'Mukta Malar', 'Latha', var(--font-body), sans-serif",
                fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                lineHeight: 1.95,
                margin: 0,
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              “ஒரு கட்டிடம் என்பது வெறும் செங்கல்லும் சிமெண்டும் அல்ல… பல ஆண்டுகளின் உழைப்பு, எண்ணற்ற தியாகங்கள், சொல்லப்படாத கஷ்டங்கள் இவற்றால் உருவான ஒருவரின் வாழ்நாள் கனவு. அந்தக் கனவை அடைய நீங்கள் கடந்து வந்த பாதை எவ்வளவு கடினமாக இருந்தாலும், அதைக் கட்டியெழுப்பும் பயணம் அப்படியிருக்கக் கூடாது. ஏனென்றால், உங்கள் கனவுக்காக நீங்கள் பட்ட கஷ்டங்கள் போதும்… இனி அந்தக் கனவை நிம்மதியுடனும் நம்பிக்கையுடனும் நனவாக்குவதே எங்கள் பொறுப்பு.”
            </p>

            {/* Architectural Golden Divider Line with Synchronized Neon Diamond Accent */}
            <div
              className="hero-neon-divider"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
                maxWidth: '300px',
                margin: '2px 0',
              }}
            >
              <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(249, 223, 4, 0.85))' }} />
              <div
                className="hero-neon-diamond"
                style={{
                  width: '7px',
                  height: '7px',
                  backgroundColor: '#F9DF04',
                  transform: 'rotate(45deg)',
                }}
              />
              <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, rgba(249, 223, 4, 0.85), transparent)' }} />
            </div>

            {/* Bottom: English Quote with Complementary Radiant Neon Glow */}
            <p
              className="hero-neon-english-quote"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.94rem, 1.2vw, 1.08rem)',
                lineHeight: 1.8,
                margin: 0,
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '0.015em',
                maxWidth: '880px',
              }}
            >
              “A building is more than bricks and concrete… It's a lifelong dream shaped by years of hard work, sacrifice, and struggle. You've struggled enough to reach that dream. Building it shouldn't be another struggle. Bringing it to life with confidence and peace of mind is our responsibility.”
            </p>
          </motion.div>
        </motion.div>
      </div>



    </section>
  );
}

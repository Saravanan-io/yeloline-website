import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FloatingIsland3D from './FloatingIsland3D';
import FlyingBirds3D from './FlyingBirds3D';

export default function LegacyHero({ onExploreProjects: _onExploreProjects, onGetQuote: _onGetQuote } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isSectionActive = useInView(ref, { margin: '-15% 0px -15% 0px' });

  // Section Audio Ambience (Only plays when user is on this section)
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio('/audio/architectural_ambience.mp3');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  // Play audio only when user is on this section, with smooth volume fade-in and fade-out
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    if (isSectionActive) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            const targetVolume = 0.65;
            fadeIntervalRef.current = setInterval(() => {
              if (!audioRef.current) return;
              if (audio.volume < targetVolume - 0.05) {
                audio.volume = Math.min(targetVolume, audio.volume + 0.05);
              } else {
                audio.volume = targetVolume;
                clearInterval(fadeIntervalRef.current);
                fadeIntervalRef.current = null;
              }
            }, 60);
          })
          .catch(() => {});
      }
    } else {
      // Smooth fade-out before pausing
      const fadeInterval = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(fadeInterval);
          return;
        }
        if (audio.volume > 0.06) {
          audio.volume = Math.max(0, audio.volume - 0.06);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeInterval);
          fadeIntervalRef.current = null;
        }
      }, 50);
      fadeIntervalRef.current = fadeInterval;
    }
  }, [isSectionActive]);

  // Handle user interaction to unlock audio playback if autoplay was initially restricted
  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRef.current;
      if (audio && isSectionActive && audio.paused) {
        audio.play().catch(() => {});
      }
    };

    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isSectionActive]);

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

            {/* Mission Statement Copy */}
            <motion.div variants={itemVariants}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.04rem, 1.45vw, 1.25rem)',
                  lineHeight: 1.8,
                  color: '#334155',
                  fontWeight: 450,
                  maxWidth: '560px',
                  margin: '8px 0 0 0',
                  letterSpacing: '-0.01em',
                }}
              >
                A home is never just a structure on a site. It is the place where
                a family expects safety, comfort and peace. Our responsibility
                is to convert that expectation into clear planning, disciplined
                execution and a construction journey the client can trust at
                every stage.
              </p>
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

import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/**
 * Hero Component
 * 
 * Cinematic architectural video hero section for Yeloline Construction.
 * Runs once from beginning to end every time the user visits the home page,
 * then pauses on the final completed house frame with a clean, unobstructed view.
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
          filter: 'brightness(0.92) contrast(1.05)',
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
          height: '140px',
          background: 'linear-gradient(180deg, rgba(11, 15, 23, 0.75) 0%, rgba(11, 15, 23, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Dark Readability Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(11, 15, 23, 0.25) 0%, rgba(11, 15, 23, 0.65) 100%)',
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
          height: '120px',
          background: 'linear-gradient(0deg, rgba(11, 15, 23, 0.85) 0%, rgba(11, 15, 23, 0) 100%)',
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
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1040px',
          }}
        >

          {/* Main Philosophy Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.1rem, 4.4vw, 3.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#FFFFFF',
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.75), 0 1px 3px rgba(0, 0, 0, 0.5)',
            }}
          >
            MORE THAN BRICKS & CONCRETE, <br />
            <span style={{ color: '#F9DF04' }}>IT’S A LIFELONG DREAM.</span>
          </h1>

          {/* User Required Philosophy Quote */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.02rem, 1.35vw, 1.22rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '820px',
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 450,
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.8)',
            }}
          >
            “A building is more than bricks and concrete… it’s a lifelong dream shaped by years of hard work, sacrifice, and struggle. You’ve struggled enough to reach that dream. Building it shouldn’t be another struggle. Bringing it to life with confidence and peace of mind is our responsibility.”
          </p>
        </motion.div>
      </div>


      {/* 5. Bottom Center Scroll Cue */}
      <div
        style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: '0.68rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        <span>SCROLL TO DISCOVER</span>
        <div style={{ animation: 'bounce 1.5s infinite' }}>
          <ArrowDown size={14} color="#F9DF04" />
        </div>
      </div>
    </section>
  );
}

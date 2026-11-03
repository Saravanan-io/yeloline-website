import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  HardHat, 
  TrendingUp, 
  FileCheck2, 
  Users, 
  CheckCircle2, 
  Download, 
  Sparkles,
  Smartphone,
  ExternalLink,
  ArrowUpRight,
  X
} from 'lucide-react';

export default function ContactUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [downloadModal, setDownloadModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const features = [
    {
      id: 'start-project',
      title: 'Start a Project',
      desc: 'Begin your construction or renovation easily.',
      icon: (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Construction Hardhat Outline in Yeloline Gold */}
          <path d="M6 21C6 15.5 10.5 11 17 11C23.5 11 28 15.5 28 21" stroke="#F9DF04" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 22C4 21.45 4.45 21 5 21H29C29.55 21 30 21.45 30 22V23C30 23.55 29.55 24 29 24H5C4.45 24 4 23.55 4 23V22Z" fill="#F9DF04" stroke="#E5CC00" strokeWidth="1.2" />
          <path d="M17 11V7" stroke="#F9DF04" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M12 13V9" stroke="#F9DF04" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M22 13V9" stroke="#F9DF04" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'track-progress',
      title: 'Track Project Progress',
      desc: 'Monitor real-time updates at every stage.',
      icon: (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bar Chart with Rising Trend Arrow */}
          <rect x="6" y="19" width="4.5" height="9" rx="1.5" fill="#F9DF04" />
          <rect x="14.5" y="14" width="4.5" height="14" rx="1.5" fill="#F9DF04" />
          <rect x="23" y="9" width="4.5" height="19" rx="1.5" fill="#F9DF04" />
          <path d="M6 14L15 6L21 11L28 4" stroke="#E5CC00" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 4H28V8" stroke="#E5CC00" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'get-quotes',
      title: 'Get Quotes & Updates',
      desc: 'Receive quotations and important project updates.',
      icon: (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Document with Checkmark Seal */}
          <rect x="7" y="5" width="16" height="23" rx="2.5" stroke="#F9DF04" strokeWidth="2.4" />
          <line x1="11" y1="10" x2="19" y2="10" stroke="#F9DF04" strokeWidth="2" strokeLinecap="round" />
          <line x1="11" y1="15" x2="17" y2="15" stroke="#F9DF04" strokeWidth="2" strokeLinecap="round" />
          <circle cx="23" cy="23" r="5.5" fill="#F9DF04" />
          <path d="M21 23L22.5 24.5L25.5 21.5" stroke="#000000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'connect-team',
      title: 'Connect with Our Team',
      desc: 'Stay in touch with our architectural experts.',
      icon: (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 3 People / Team Icon in Gold */}
          <circle cx="17" cy="11" r="3.5" stroke="#F9DF04" strokeWidth="2.2" />
          <path d="M10 24C10 20.5 13 18 17 18C21 18 24 20.5 24 24" stroke="#F9DF04" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="8" cy="13" r="2.8" stroke="#F9DF04" strokeWidth="1.8" />
          <path d="M3.5 23C3.5 20.5 5.5 19 8 19" stroke="#F9DF04" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="26" cy="13" r="2.8" stroke="#F9DF04" strokeWidth="1.8" />
          <path d="M30.5 23C30.5 20.5 28.5 19 26 19" stroke="#F9DF04" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        padding: '90px 0 110px 0',
      }}
    >
      {/* Background Architectural CAD Blueprint Wireframe Lines */}
      <svg
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(400px, 45vw, 750px)',
          height: '100%',
          opacity: 0.1,
          zIndex: 1,
        }}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M50 500L450 150L580 200V550H50V500Z" stroke="#0F172A" strokeWidth="1.2" />
        <path d="M450 150L450 550" stroke="#0F172A" strokeWidth="1.2" />
        <path d="M120 500V300L350 190V500" stroke="#0F172A" strokeWidth="1.2" />
        <path d="M160 350H240V430H160V350Z" stroke="#0F172A" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M260 350H320V430H260V350Z" stroke="#0F172A" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="50" y1="200" x2="580" y2="200" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="4 4" />
        <line x1="50" y1="350" x2="580" y2="350" stroke="#0F172A" strokeWidth="0.8" strokeDasharray="4 4" />
        <line x1="50" y1="500" x2="580" y2="500" stroke="#0F172A" strokeWidth="1.5" />
      </svg>

      {/* Sweeping Gold Ribbon Waves in Background */}
      <svg
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          top: '15%',
          left: '-5%',
          width: '75%',
          height: '75%',
          opacity: 0.45,
          zIndex: 1,
        }}
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 380C120 420 220 220 400 320C580 420 680 280 850 350"
          stroke="url(#goldRibbonGrad)"
          strokeWidth="32"
          strokeLinecap="round"
        />
        <path
          d="M-30 420C140 450 250 260 420 350C600 440 700 310 880 370"
          stroke="url(#goldRibbonGrad2)"
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9DF04" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E5CC00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F9DF04" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="goldRibbonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FACC15" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F9DF04" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="app-container"
        style={{ position: 'relative', zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Top Header matching Reference Image */}
        <motion.div variants={itemVariants} style={{ marginBottom: '48px' }}>
          {/* Eyebrow: // DOWNLOAD OUR MOBILE APP with yellow trailing bar */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                color: '#F9DF04',
                fontWeight: 900,
                fontSize: '1.15rem',
                letterSpacing: '-0.05em',
                lineHeight: 1,
              }}
            >
              //
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.84rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#0F172A',
                textTransform: 'uppercase',
              }}
            >
              DOWNLOAD OUR MOBILE APP
            </span>
            <div
              style={{
                width: '70px',
                height: '2px',
                backgroundColor: '#F9DF04',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Main Title: GET THE [YELOLINE] APP */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4.6vw, 4rem)',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              margin: '0 0 12px 0',
              textTransform: 'uppercase',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>GET THE</span>
            <span
              style={{
                backgroundColor: '#F9DF04',
                color: '#0F172A',
                padding: '4px 18px',
                borderRadius: '10px',
                display: 'inline-block',
                boxShadow: '0 8px 24px rgba(249, 223, 4, 0.35)',
              }}
            >
              YELOLINE
            </span>
            <span>APP</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.8vw, 1.22rem)',
              color: '#475569',
              fontWeight: 500,
              margin: 0,
              maxWidth: '680px',
            }}
          >
            Your construction project, always within reach.
          </p>
        </motion.div>

        {/* 2-Column Split: Dual 3D Smartphone Showcase (Left) + Features & Download Action (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: 'clamp(36px, 5vw, 64px)',
          }}
        >
          {/* Left Column: 3D Dual Smartphones on Marble Podium with Yellow Ribbon */}
          <motion.div
            variants={itemVariants}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 0',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
              }}
            >
              {/* 3D Dual Smartphones Floating Mockup with Transparent Background */}
              <motion.img
                src="/images/yeloline_app_phones_transparent.png"
                alt="Yeloline Construction Mobile App on iOS & Android"
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  filter: 'drop-shadow(0 30px 45px rgba(0, 0, 0, 0.16))',
                }}
              />
            </div>
          </motion.div>

          {/* Right Column: Built For Your Next Project + 4 Features + Google Play & QR Code */}
          <motion.div variants={itemVariants}>
            {/* Pill Badge: BUILT FOR YOUR NEXT PROJECT */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  backgroundColor: '#F9DF04',
                  color: '#000000',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.76rem',
                  fontWeight: 900,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '7px 20px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 14px rgba(249, 223, 4, 0.35)',
                }}
              >
                BUILT FOR YOUR NEXT PROJECT
              </span>
              <div
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: '#F9DF04',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                margin: '0 0 34px 0',
              }}
            >
              Everything you need, in one app
            </h2>

            {/* 4 Feature Items */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                marginBottom: '42px',
              }}
            >
              {features.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                  }}
                >
                  {/* Yellow Custom Icon */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(249, 223, 4, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px',
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.14rem',
                        fontWeight: 900,
                        color: '#0F172A',
                        margin: '0 0 3px 0',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.94rem',
                        color: '#64748B',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full-Width Maximum-Width Google Play Store Hero Banner */}
        <motion.div
          variants={itemVariants}
          style={{
            width: '100%',
            maxWidth: '100%',
            marginTop: '32px',
          }}
        >
          {/* Full Width Eye-Catching Google Play Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.015, y: -3 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setDownloadModal(true)}
            aria-label="Get it on Google Play"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #090D16 0%, #111827 50%, #000000 100%)',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '20px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              border: '2px solid rgba(254, 198, 3, 0.85)',
              boxShadow: '0 18px 45px rgba(0, 0, 0, 0.28), 0 0 32px rgba(254, 198, 3, 0.28)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              flexWrap: 'wrap',
            }}
          >
            {/* Left side: Logo + Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Official Google Play 4-Color Logo */}
              <svg width="40" height="44" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.3 1.2C1.1 1.6 1 2.2 1 2.9V27.1C1 27.8 1.1 28.4 1.3 28.8L1.4 28.9L15.3 15V14.8L1.4 1.1L1.3 1.2Z" fill="url(#gpBlue)" />
                <path d="M19.9 19.6L15.3 15V14.8L19.9 10.2L20 10.3L25.4 13.4C27 14.3 27 15.7 25.4 16.6L20 19.6L19.9 19.6Z" fill="url(#gpYellow)" />
                <path d="M20 19.6L15.3 15L1.3 28.9C1.8 29.5 2.7 29.5 3.8 28.9L20 19.6Z" fill="url(#gpRed)" />
                <path d="M20 10.4L3.8 1.1C2.7 0.5 1.8 0.5 1.3 1.1L15.3 15L20 10.4Z" fill="url(#gpGreen)" />
                <defs>
                  <linearGradient id="gpBlue" x1="13.9" y1="2.7" x2="-2.4" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00A0FF" />
                    <stop offset="0.007" stopColor="#00A1FF" />
                    <stop offset="0.26" stopColor="#00BEFF" />
                    <stop offset="0.512" stopColor="#00D2FF" />
                    <stop offset="0.76" stopColor="#00DFFF" />
                    <stop offset="1" stopColor="#00E3FF" />
                  </linearGradient>
                  <linearGradient id="gpYellow" x1="27.4" y1="15" x2="0.6" y2="15" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFE000" />
                    <stop offset="0.409" stopColor="#FFBD00" />
                    <stop offset="0.775" stopColor="#FFA500" />
                    <stop offset="1" stopColor="#FF9C00" />
                  </linearGradient>
                  <linearGradient id="gpRed" x1="17.6" y1="17.3" x2="2.7" y2="32.2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3A44" />
                    <stop offset="1" stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient id="gpGreen" x1="2.7" y1="-2.2" x2="17.6" y2="12.7" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#32A071" />
                    <stop offset="0.069" stopColor="#2DA771" />
                    <stop offset="0.476" stopColor="#15CF74" />
                    <stop offset="0.801" stopColor="#06E775" />
                    <stop offset="1" stopColor="#00F076" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Text Block */}
              <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                <div
                  style={{
                    fontSize: '0.82rem',
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
                    fontSize: 'clamp(1.65rem, 2.8vw, 2.25rem)',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Google Play
                </div>
              </div>
            </div>

            {/* Middle Feature Tagline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                maxWidth: '460px',
              }}
            >
              <span
                style={{
                  color: '#FEC603',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '2px',
                }}
              >
                OFFICIAL MOBILE APPLICATION
              </span>
              <span
                style={{
                  color: '#CBD5E1',
                  fontSize: '0.88rem',
                  lineHeight: 1.45,
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                }}
              >
                Track on-site construction milestones, 3D engineering blueprints &amp; BOQ updates on Android.
              </span>
            </div>

            {/* Right side: High-Attraction Yellow CTA Button */}
            <div
              style={{
                backgroundColor: '#F9DF04',
                color: '#000000',
                padding: '11px 24px',
                borderRadius: '9999px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(249, 223, 4, 0.45)',
                flexShrink: 0,
              }}
            >
              <span>INSTALL NOW</span>
              <ArrowUpRight size={17} color="#000000" />
            </div>
          </motion.button>

          {/* Trust Badge Subtitle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '12px',
              color: '#64748B',
              fontSize: '0.82rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: '#10B981', fontWeight: 800 }}>✓ Verified Android Release</span>
            <span>•</span>
            <span>100% Free on Android</span>
            <span>•</span>
            <span>Instant Installation on Google Play</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Download Feedback Modal */}
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
              zIndex: 999,
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
              <button
                onClick={() => setDownloadModal(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                <X size={20} />
              </button>

              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(249, 223, 4, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 18px',
                }}
              >
                <Smartphone size={32} color="#000000" />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  margin: '0 0 8px 0',
                }}
              >
                Download Yeloline App
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: '#64748B',
                  lineHeight: 1.55,
                  marginBottom: '24px',
                }}
              >
                The Yeloline Construction companion app is ready for download. Manage blueprints, track construction milestones, and access line-item BOQ estimates.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="#download-playstore"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Redirecting to Google Play Store listing: Yeloline Construction (com.yeloline.construction)');
                    setDownloadModal(false);
                  }}
                  className="btn-yellow-ref"
                  style={{ justifyContent: 'center', padding: '12px' }}
                >
                  <Download size={16} />
                  <span>Download APK / Play Store</span>
                </a>

                <button
                  onClick={() => setDownloadModal(false)}
                  className="btn-black-ref"
                  style={{ justifyContent: 'center', padding: '12px' }}
                >
                  <span>Close</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

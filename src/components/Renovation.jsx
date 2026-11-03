import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Hammer, 
  Zap,
  PaintRoller,
  Settings,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Smartphone,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Download,
  Sparkles,
  X
} from 'lucide-react';
import Renovan3DBackground from './Renovan3DBackground';

export default function Renovation({ onGetQuote }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const appSectionRef = useRef(null);
  const isAppInView = useInView(appSectionRef, { once: true, margin: '-60px' });
  const moduleMousePos = useRef({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  const handleModuleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    moduleMousePos.current = { x, y };
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen().catch(() => {});
      } else if (videoRef.current && videoRef.current.webkitEnterFullscreen) {
        videoRef.current.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // 6 Core Services from Reference Infographic
  const services = [
    {
      id: 'plumbing',
      title: 'Plumbing',
      desc: 'Leak detection, pipe replacement, fixtures & water pressure audits.',
      icon: (props) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M15 7h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" />
          <path d="M9 7H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1" />
          <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
          <path d="M10 13v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-6" />
        </svg>
      ),
      image: '/images/service_plumbing.jpg',
      offsetX: 30,
    },
    {
      id: 'electrical',
      title: 'Electrical',
      desc: 'Rewiring, MCB & circuit upgrades, architectural lighting & earthing.',
      icon: (props) => <Zap size={22} color="#0F172A" strokeWidth={2.2} {...props} />,
      image: '/images/service_electrical.jpg',
      offsetX: 85,
    },
    {
      id: 'masonry',
      title: 'Masonry',
      desc: 'Structural crack stitching, high-strength plastering & tile fixes.',
      icon: (props) => <Layers size={22} color="#0F172A" strokeWidth={2.2} {...props} />,
      image: '/images/service_masonry.jpg',
      offsetX: 10,
    },
    {
      id: 'carpentry',
      title: 'Carpentry',
      desc: 'Door/window realignment, custom woodwork repairs & fittings.',
      icon: (props) => <Hammer size={22} color="#0F172A" strokeWidth={2.2} {...props} />,
      image: '/images/service_carpentry.jpg',
      offsetX: 80,
    },
    {
      id: 'painting',
      title: 'Painting',
      desc: 'Weatherproof exterior coats, interior textures & damp priming.',
      icon: (props) => <PaintRoller size={22} color="#0F172A" strokeWidth={2.2} {...props} />,
      image: '/images/service_painting.jpg',
      offsetX: 15,
    },
    {
      id: 'maintenance',
      title: 'General Maintenance',
      desc: 'Waterproofing, seismic joints, roof upkeep & hardware overhaul.',
      icon: (props) => <Settings size={22} color="#0F172A" strokeWidth={2.2} {...props} />,
      image: '/images/service_maintenance.jpg',
      offsetX: 75,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div>
      {/* 1. Renovan Hero & Video Section */}
      <section
        id="renovation"
        ref={ref}
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          padding: '76px 0 0 0',
          width: '100%',
        }}
      >
        {/* Background Watermark */}
        <div
          className="watermark-bg select-none pointer-events-none"
          style={{ top: '20px', left: '3%', opacity: 0.55 }}
        >
          RENOVAN
        </div>

        {/* Floating Geometric Accents in Header Area */}
        <div className="geo-diamond" style={{ top: '60px', right: '5%' }} />

        {/* Top Header Information Container */}
        <motion.div 
          className="app-container" 
          style={{ position: 'relative', zIndex: 10 }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* 1. Header Section */}
          <motion.div variants={itemVariants} style={{ marginBottom: '38px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                    fontWeight: 900,
                    color: '#0F172A',
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    lineHeight: 1.1,
                    margin: 0,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Renovation <span style={{ color: '#E5CC00' }}>Made Easy</span>
                </h1>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 2. Full-View Edge-to-Edge Video Showcase (Without Borders) */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            position: 'relative',
            width: '100%',
            margin: 0,
            padding: 0,
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            backgroundColor: '#000000',
            overflow: 'hidden',
          }}
        >
          <div
            ref={videoContainerRef}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: 'none',
              borderRadius: 0,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                border: 'none',
                borderRadius: 0,
                outline: 'none',
              }}
            >
              <source src="/videos/14acf651-4c41-4ade-9024-cef3f42288de.mp4" type="video/mp4" />
              <source src="/videos/renovan_showcase.mp4" type="video/mp4" />
            </video>

            {/* Floating Glassmorphic Video Controls */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 20,
              }}
            >
              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlay}
                type="button"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9DF04';
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                type="button"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9DF04';
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Services Offered - Exact Serpentine Timeline Layout from Reference Image */}
      <section
        id="renovan-services"
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          padding: '90px 0 100px 0',
          overflow: 'hidden',
        }}
      >
        <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Centered Section Header matching Reference Image */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            {/* — OUR SERVICES — */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                justifyContent: 'center',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '2.5px',
                  backgroundColor: '#F9DF04',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#0F172A',
                  textTransform: 'uppercase',
                }}
              >
                OUR SERVICES
              </span>
              <div
                style={{
                  width: '32px',
                  height: '2.5px',
                  backgroundColor: '#F9DF04',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Main Headline */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 4vw, 3.3rem)',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.03em',
                margin: '0 0 12px 0',
              }}
            >
              Services Offered
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.02rem',
                color: '#64748B',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Specialized doorstep trade services with diagnostic equipment and master technicians.
            </p>
          </div>

          {/* Serpentine Timeline Container */}
          <div
            style={{
              position: 'relative',
              maxWidth: '880px',
              margin: '0 auto',
              padding: '10px 0',
            }}
          >
            {/* Fluid Serpentine Golden Ribbon Path behind Circular Nodes */}
            <svg
              className="pointer-events-none select-none"
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '240px',
                height: '980px',
                zIndex: 2,
              }}
              viewBox="0 0 240 980"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="serpentineGoldGrad" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#F9DF04" />
                  <stop offset="25%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#F9DF04" />
                  <stop offset="75%" stopColor="#E5B800" />
                  <stop offset="100%" stopColor="#F9DF04" />
                </linearGradient>
              </defs>
              {/* Outer Vibrant Ribbon */}
              <path
                d="M 98 68 C 98 152, 153 152, 153 236 C 153 320, 78 320, 78 404 C 78 488, 148 488, 148 572 C 148 656, 83 656, 83 740 C 83 824, 143 824, 143 908"
                stroke="url(#serpentineGoldGrad)"
                strokeWidth="60"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Core Bright Sheen */}
              <path
                d="M 98 68 C 98 152, 153 152, 153 236 C 153 320, 78 320, 78 404 C 78 488, 148 488, 148 572 C 148 656, 83 656, 83 740 C 83 824, 143 824, 143 908"
                stroke="#FEF08A"
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>

            {/* 6 Serpentine Service Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {services.map((svc) => {
                const IconComp = svc.icon;

                return (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 5,
                    }}
                  >
                    {/* Left: Circular Image Node with Thick Gold Gradient Halo */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '136px',
                        height: '136px',
                        flexShrink: 0,
                        marginLeft: `${svc.offsetX}px`,
                        position: 'relative',
                        zIndex: 6,
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          border: '7px solid #F9DF04',
                          boxShadow: '0 8px 24px rgba(249, 223, 4, 0.45), 0 2px 8px rgba(0, 0, 0, 0.1)',
                          overflow: 'hidden',
                          backgroundColor: '#0F172A',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <img
                          src={svc.image}
                          alt={svc.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Right: Sleek White Card Overlapping Circular Node */}
                    <motion.div
                      whileHover={{ x: 6 }}
                      style={{
                        marginLeft: '-45px',
                        zIndex: 4,
                        flex: 1,
                        backgroundColor: '#FFFFFF',
                        borderRadius: '24px',
                        border: '1px solid rgba(0, 0, 0, 0.07)',
                        boxShadow: '0 10px 30px -4px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.02)',
                        padding: '24px 34px 24px 68px',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {/* Title Row: [Icon] Title */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '6px',
                        }}
                      >
                        {/* Outline Icon */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                          }}
                        >
                          <IconComp size={22} color="#0F172A" strokeWidth={2.2} />
                        </div>

                        {/* Service Title */}
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.2rem, 2vw, 1.38rem)',
                            fontWeight: 900,
                            color: '#0F172A',
                            letterSpacing: '-0.02em',
                            margin: 0,
                          }}
                        >
                          {svc.title}
                        </h3>
                      </div>

                      {/* Description aligned under title */}
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.94rem',
                          color: '#64748B',
                          lineHeight: 1.5,
                          margin: 0,
                          paddingLeft: '36px',
                        }}
                      >
                        {svc.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. On-Demand Mobile App Booking Showcase (Module Image Section with Colorful 3D Animation Background) */}
      <section
        ref={appSectionRef}
        id="renovan-app-module"
        onMouseMove={handleModuleMouseMove}
        style={{
          position: 'relative',
          background: 'radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.22) 0%, transparent 45%), radial-gradient(circle at 90% 25%, rgba(249, 223, 4, 0.24) 0%, transparent 50%), radial-gradient(circle at 50% 85%, rgba(6, 182, 212, 0.22) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%), #06080E',
          color: '#FFFFFF',
          padding: '110px 0 120px 0',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Three.js Vibrant Colorful 3D WebGL Background (Rainbow Aurora Waves + 3D Light Orbs) */}
        <Renovan3DBackground mousePos={moduleMousePos} isVisible={isAppInView} />

        {/* Ambient Multi-Color Gradient Mesh Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(60px)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249, 223, 4, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(60px)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '20%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(65px)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-80px',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(60px)',
            zIndex: 1,
          }}
        />

        <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="renovan-module-grid">
            {/* Left Column: Value Proposition & Feature Cards in White Mode */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isAppInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '28px',
                padding: '38px 34px',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 0 35px rgba(249, 223, 4, 0.15)',
              }}
            >
              {/* Headline */}
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#0F172A',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  margin: '0 0 16px 0',
                }}
              >
                Book Your Renovation Van <br />
                <span style={{ 
                  background: 'linear-gradient(90deg, #D97706 0%, #EAB308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  At Your Doorstep in 3 Taps
                </span>
              </h2>

              {/* Subheading */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.02rem',
                  color: '#475569',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                  margin: '0 0 32px 0',
                }}
              >
                Select your specialized discipline, pick your preferred date and time slot, and have our master technicians arrive fully equipped with 100+ diagnostic and structural power tools—right at your doorstep in Erode and across Tamil Nadu.
              </p>

              {/* 3 Modern Feature Cards in White Mode */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                {/* Feature 1 (Gold Accent) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(249, 223, 4, 0.45)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(249, 223, 4, 0.22)',
                      border: '1px solid rgba(249, 223, 4, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Wrench size={20} color="#92750a" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.02rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: '0 0 4px 0',
                      }}
                    >
                      Instant Trade Selection
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.88rem',
                        color: '#64748B',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Choose Masonry, Plumbing, Electrical, Carpentry, Painting, or General Maintenance in one tap.
                    </p>
                  </div>
                </div>

                {/* Feature 2 (Cyan Accent) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(6, 182, 212, 0.4)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(6, 182, 212, 0.16)',
                      border: '1px solid rgba(6, 182, 212, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={20} color="#0891b2" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.02rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: '0 0 4px 0',
                      }}
                    >
                      Tailored Time Slot Reservation
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.88rem',
                        color: '#64748B',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Select convenient morning (9:00 AM – 12:00 PM), afternoon, or evening arrival slots that suit your schedule.
                    </p>
                  </div>
                </div>

                {/* Feature 3 (Purple / Magenta Accent) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(168, 85, 247, 0.4)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(168, 85, 247, 0.16)',
                      border: '1px solid rgba(168, 85, 247, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={20} color="#7c3aed" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.02rem',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: '0 0 4px 0',
                      }}
                    >
                      Master Craftsmen &amp; 100+ Onboard Tools
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.88rem',
                        color: '#64748B',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Laser levellers, thermal detectors, core drills, and certified technicians for immediate on-site completion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-To-Action Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                {/* Official Google Play Store Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAppModal(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '12px 24px',
                    border: '1.5px solid rgba(249, 223, 4, 0.45)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35), 0 0 20px rgba(249, 223, 4, 0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="26" height="28" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.3 1.2C1.1 1.6 1 2.2 1 2.9V27.1C1 27.8 1.1 28.4 1.3 28.8L1.4 28.9L15.3 15V14.8L1.4 1.1L1.3 1.2Z" fill="url(#renovModGpBlue)" />
                    <path d="M19.9 19.6L15.3 15V14.8L19.9 10.2L20 10.3L25.4 13.4C27 14.3 27 15.7 25.4 16.6L20 19.6L19.9 19.6Z" fill="url(#renovModGpYellow)" />
                    <path d="M20 19.6L15.3 15L1.3 28.9C1.8 29.5 2.7 29.5 3.8 28.9L20 19.6Z" fill="url(#renovModGpRed)" />
                    <path d="M20 10.4L3.8 1.1C2.7 0.5 1.8 0.5 1.3 1.1L15.3 15L20 10.4Z" fill="url(#renovModGpGreen)" />
                    <defs>
                      <linearGradient id="renovModGpBlue" x1="14.07" y1="2.46" x2="-2.9" y2="19.43" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00A0FF" />
                        <stop offset="0.007" stopColor="#00A1FF" />
                        <stop offset="0.26" stopColor="#00BEFF" />
                        <stop offset="0.512" stopColor="#00D2FF" />
                        <stop offset="0.76" stopColor="#00DFFF" />
                        <stop offset="1" stopColor="#00E3FF" />
                      </linearGradient>
                      <linearGradient id="renovModGpYellow" x1="27.42" y1="15" x2="0.67" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFE000" />
                        <stop offset="0.409" stopColor="#FFBD00" />
                        <stop offset="0.775" stopColor="#FFA500" />
                        <stop offset="1" stopColor="#FF9C00" />
                      </linearGradient>
                      <linearGradient id="renovModGpRed" x1="17.65" y1="17.38" x2="3.12" y2="31.9" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF3A44" />
                        <stop offset="1" stopColor="#C31162" />
                      </linearGradient>
                      <linearGradient id="renovModGpGreen" x1="3.12" y1="-1.9" x2="17.65" y2="12.62" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#32A071" />
                        <stop offset="0.069" stopColor="#2DA771" />
                        <stop offset="0.476" stopColor="#15CF74" />
                        <stop offset="0.801" stopColor="#06E775" />
                        <stop offset="1" stopColor="#00F076" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                    <div style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                      GET IT ON
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.08rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                      Google Play
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Trust Indicators in White Mode */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  color: '#64748B',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span style={{ color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
                  <CheckCircle2 size={14} color="#059669" /> Verified Android App
                </span>
                <span>•</span>
                <span>Zero Booking Fee</span>
                <span>•</span>
                <span>Doorstep Mobile Workshop</span>
              </div>
            </motion.div>

            {/* Right Column: High-End Smartphone Mockup with Module Screen */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isAppInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '340px',
                  margin: '0 auto',
                }}
              >
                {/* Ambient Golden Radial Halo */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '125%',
                    height: '115%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(249, 223, 4, 0.24) 0%, rgba(249, 223, 4, 0.05) 50%, transparent 75%)',
                    filter: 'blur(35px)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />

                {/* Smartphone Device Chassis with 3D Hover Depth */}
                <motion.div
                  whileHover={{ scale: 1.025, rotateY: -3, rotateX: 2 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    borderRadius: '46px',
                    border: '10px solid #1E293B',
                    backgroundColor: '#0F172A',
                    boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 60px rgba(249, 223, 4, 0.22)',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Module Screenshot Image */}
                  <img
                    src="/images/renovan_booking_screen.png"
                    alt="Renovation Van Booking Module Screen"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '36px',
                    }}
                  />

                  {/* Realistic Screen Glare Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%)',
                      pointerEvents: 'none',
                      borderRadius: '36px',
                      zIndex: 5,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Responsive CSS for Module Layout */}
        <style>{`
          .renovan-module-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            align-items: center;
            gap: 64px;
          }
          @media (max-width: 968px) {
            .renovan-module-grid {
              grid-template-columns: 1fr;
              gap: 48px;
            }
          }
        `}</style>

        {/* Modal for Google Play / QR Code Download */}
        <AnimatePresence>
          {showAppModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAppModal(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(5, 8, 15, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '440px',
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  border: '1.5px solid rgba(249, 223, 4, 0.35)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(249, 223, 4, 0.15)',
                  textAlign: 'center',
                }}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowAppModal(false)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <X size={18} />
                </button>

                {/* Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(249, 223, 4, 0.15)',
                    border: '1px solid rgba(249, 223, 4, 0.35)',
                    color: '#F9DF04',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <Smartphone size={14} color="#F9DF04" />
                  Yeloline Mobile Experience
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Get The Yeloline App
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: '#94A3B8',
                    lineHeight: 1.55,
                    margin: '0 auto 22px auto',
                    maxWidth: '340px',
                  }}
                >
                  Scan the QR code with your mobile camera or click below to install directly from Google Play.
                </p>

                {/* QR Code Container */}
                <div
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '2px dashed #F9DF04',
                    marginBottom: '22px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <img
                    src="/images/yeloline_qr_code.png"
                    alt="Scan QR code to install Yeloline"
                    style={{
                      width: '130px',
                      height: '130px',
                      display: 'block',
                      borderRadius: '8px',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginTop: '8px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Scan with Mobile Camera
                  </span>
                </div>

                {/* Direct Google Play link */}
                <a
                  href="#download-playstore"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Redirecting to Google Play Store: Yeloline Construction (com.yeloline.construction)');
                    setShowAppModal(false);
                  }}
                  className="btn-yellow-ref"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '13px 20px',
                    borderRadius: '14px',
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                  }}
                >
                  <Download size={16} />
                  <span>Open on Google Play Store</span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}

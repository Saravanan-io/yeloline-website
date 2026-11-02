import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Truck, 
  Layers, 
  Hammer, 
  Zap,
  PaintRoller,
  Settings,
  Play,
  Pause,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function Renovation({ onGetQuote }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(249, 223, 4, 0.15)',
                border: '1px solid rgba(249, 223, 4, 0.35)',
                marginBottom: '14px',
              }}
            >
              <Truck size={14} color="#92750a" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#0F172A',
                  textTransform: 'uppercase',
                }}
              >
                Renovation Van Booking • Doorstep Mobile Workshop
              </span>
            </div>

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
                    margin: '0 0 10px 0',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Renovation <span style={{ color: '#E5CC00' }}>Made Easy</span>
                </h1>
                <p
                  style={{
                    color: '#64748B',
                    fontSize: '1rem',
                    maxWidth: '700px',
                    lineHeight: 1.65,
                    margin: 0,
                    fontWeight: 450,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Our Renovation Van brings expertise to your doorstep. Book a visit and let our specialists handle the rest.
                  Fully equipped with 100+ diagnostic and structural tools for immediate on-site solutions.
                </p>
              </div>

              {/* Quick Dispatch Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 10px #10B981',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                >
                  Vans Available On-Call in Gujarat
                </span>
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

    </div>
  );
}

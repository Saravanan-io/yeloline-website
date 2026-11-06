import React, { useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowUp,
  ShieldCheck,
  MapPin,
  Home,
  Layers,
  Wrench,
  MessageSquareQuote,
} from 'lucide-react';
import Footer3DBackground from './Footer3DBackground';
import './Footer.css';

export default function Footer({ onNavigate }) {
  const ref = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isInView = useInView(ref, { once: false, margin: '80px' });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mousePosRef.current = { x, y };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = { x: 0, y: 0 };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer ref={ref} className="yeloline-footer" aria-label="Website Footer">
      {/* -------------------------------------------------------------------- */}
      {/* Top Section: Architectural Wave + 3D Background + 3 Columns Layout   */}
      {/* -------------------------------------------------------------------- */}
      <div
        className="yeloline-footer-top"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Wave Graphic (Confined to left ~50% so right columns stay on pure white) */}
        <div className="yeloline-footer-wave-bg" aria-hidden="true">
          <svg
            className="yeloline-footer-wave-svg"
            viewBox="0 0 1024 250"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Soft golden feathered gradient for outer highlight swoop */}
              <linearGradient id="footerSwoopGlow" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#F9DF04" stopOpacity="0.9" />
                <stop offset="35%" stopColor="#FEDB04" stopOpacity="0.65" />
                <stop offset="70%" stopColor="#FFF275" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Feather blur filter */}
              <filter id="softSwoopBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* Base white backdrop */}
            <rect width="1024" height="250" fill="#FFFFFF" />

            {/* 1. Outer Golden Highlight Swoop */}
            <path
              d="M 180 20
                 C 300 22, 400 60, 460 130
                 C 490 170, 510 200, 518 220
                 L 510 250
                 C 480 200, 430 140, 370 90
                 C 290 38, 200 20, 70 20 Z"
              fill="url(#footerSwoopGlow)"
              filter="url(#softSwoopBlur)"
            />

            {/* 2. Primary Yellow Field (Anchored to left edge, curving down safely before Head Office) */}
            <path
              d="M 0 20
                 L 70 20
                 C 180 20, 260 45, 330 110
                 C 390 170, 430 220, 460 250
                 L 0 250 Z"
              fill="#F9DF04"
            />

            {/* 3. Aerodynamic Black Ribbon Swoop (Ends completely before Head Office column) */}
            <path
              d="M 70 20
                 C 200 20, 290 38, 370 90
                 C 430 140, 480 200, 510 250
                 L 460 250
                 C 430 220, 390 170, 330 110
                 C 260 45, 180 20, 70 20 Z"
              fill="#111111"
            />
          </svg>
        </div>

        {/* Real-time Three.js 3D Kinetic Architectural Background */}
        <Footer3DBackground mousePos={mousePosRef} isVisible={isInView} />

        {/* Foreground Content Grid */}
        <motion.div
          className="yeloline-footer-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Column 1: Brand Column (Left Side, Inside Yellow Wave) */}
          <motion.div className="yeloline-footer-brand-col" variants={itemVariants}>
            <a
              href="#home"
              onClick={(e) => handleNav(e, 'home')}
              className="yeloline-footer-logo-link"
              aria-label="Yeloline Construction Home"
            >
              <img
                src="/images/yeloline_logo.png"
                alt="YELOLINE CONSTRUCTION"
                className="yeloline-footer-logo-img"
              />
            </a>

            <p className="yeloline-footer-quote">
              &ldquo;A building is more than bricks and concrete... it's a lifelong dream shaped by dedication and perseverance. Realizing it with total peace of mind is our commitment.&rdquo;
            </p>

            <div className="yeloline-footer-badge">
              <ShieldCheck size={18} className="yeloline-footer-badge-icon" />
              <span>Registered Architectural Practice &bull; Est. 2014</span>
            </div>
          </motion.div>

          {/* Column 2: Head Office Column (Moved to Right Side, Pure White Background) */}
          <motion.div className="yeloline-footer-office-col" variants={itemVariants}>
            <div className="yeloline-footer-office-header">
              <div className="yeloline-footer-office-badge">
                <MapPin size={17} strokeWidth={2.5} />
              </div>
              <h3 className="yeloline-footer-office-title">HEAD OFFICE</h3>
            </div>

            <address className="yeloline-footer-office-address">
              160, Lakshmi Saw Mill,<br />
              Nasiyanur Rd, Kaikattivalasu,<br />
              Erode, Tamil Nadu 638107
            </address>

            <div className="yeloline-footer-office-line" aria-hidden="true" />
          </motion.div>

          {/* Column 3: Navigation Column (Moved to Right Side, Pure White Background) */}
          <motion.div className="yeloline-footer-nav-col" variants={itemVariants}>
            <h3 className="yeloline-footer-nav-title">NAVIGATION</h3>

            <nav className="yeloline-footer-nav-list" aria-label="Footer Navigation">
              {[
                { label: 'Home Page', page: 'home', icon: Home },
                { label: 'Site Portfolio', page: 'portfolio', icon: Layers },
                { label: 'Renovation Transformations', page: 'renovation', icon: Wrench },
                { label: 'Contact Us & Free Quote', page: 'contact', icon: MessageSquareQuote },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={`#${item.page}`}
                    onClick={(e) => handleNav(e, item.page)}
                    className="yeloline-footer-nav-link"
                  >
                    <IconComponent size={18} strokeWidth={2} className="yeloline-footer-nav-icon" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        </motion.div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Bottom Bar: Full-Width Solid Black Bar                               */}
      {/* -------------------------------------------------------------------- */}
      <div className="yeloline-footer-bottom">
        <div className="yeloline-footer-bottom-container">
          <div className="yeloline-footer-copyright">
            &copy; 2026 YELOLINE CONSTRUCTION. All rights reserved. Registered Architectural Practice.
          </div>

          <button
            onClick={scrollToTop}
            className="yeloline-footer-top-btn"
            aria-label="Scroll back to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp size={13} strokeWidth={2.5} className="yeloline-footer-top-btn-icon" />
          </button>
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Building2,
  Maximize2,
  CheckCircle2,
  Layers,
  Sparkles,
  Shield,
  Award,
  ArrowUp,
  Armchair,
  Compass,
  Trees,
  Check,
  X,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

export default function ProjectDetailView({ project, onBackToProjects, onNavigateHome, onConsult }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [insideFilter, setInsideFilter] = useState('ALL');
  const insideScrollRef = useRef(null);

  if (!project) return null;

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const activeImage = gallery[activeImgIndex] || project.image;

  // Inside View images
  const insideImages = project.insideView && project.insideView.length > 0 ? project.insideView : gallery;

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const scrollInside = (dir) => {
    if (insideScrollRef.current) {
      const offset = dir === 'left' ? -360 : 360;
      insideScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Helper to render icon for highlights
  const renderHighlightIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return <Home size={26} color="#FEC603" />;
      case 'building':
        return <Building2 size={26} color="#FEC603" />;
      case 'arrowUp':
        return <ArrowUp size={26} color="#FEC603" />;
      case 'shield':
        return <Shield size={26} color="#FEC603" />;
      case 'layers':
        return <Layers size={26} color="#FEC603" />;
      case 'compass':
        return <Compass size={26} color="#FEC603" />;
      case 'sparkles':
        return <Sparkles size={26} color="#FEC603" />;
      case 'award':
        return <Award size={26} color="#FEC603" />;
      case 'tree':
        return <Trees size={26} color="#FEC603" />;
      default:
        return <CheckCircle2 size={26} color="#FEC603" />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: '30px 0 80px 0',
      }}
    >
      {/* ================= CORNER GOLDEN DYNAMIC WAVES MATCHING REFERENCE ================= */}
      {/* Top-Right Dynamic Ribbon Accent */}
      <svg
        viewBox="0 0 420 300"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(260px, 30vw, 420px)',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <defs>
          <linearGradient id="detail-gold-wave-top" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEC603" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FFDE43" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 420,0 C 300,40 180,120 120,300 L 420,300 Z" fill="url(#detail-gold-wave-top)" />
        <path
          d="M 420,40 C 310,80 200,160 140,300"
          stroke="#FEC603"
          strokeWidth="20"
          fill="none"
          opacity="0.85"
          strokeLinecap="round"
        />
      </svg>

      {/* Bottom-Right Dynamic Ribbon Accent */}
      <svg
        viewBox="0 0 380 260"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 'clamp(220px, 25vw, 360px)',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <path d="M 380,260 C 260,220 180,150 140,0 L 380,0 Z" fill="#FFF285" opacity="0.35" />
        <path
          d="M 380,210 C 270,180 190,120 160,0"
          stroke="#FEC603"
          strokeWidth="18"
          fill="none"
          opacity="0.75"
          strokeLinecap="round"
        />
      </svg>

      <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* ================= 1. BREADCRUMB BAR ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 700,
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: 'none',
                background: 'none',
                color: '#0F172A',
                cursor: 'pointer',
                padding: 0,
                fontWeight: 700,
                fontSize: '0.88rem',
              }}
            >
              <Home size={16} color="#0F172A" />
              <span>Home</span>
            </button>

            <ChevronRight size={14} color="#94A3B8" />

            <button
              onClick={onBackToProjects}
              style={{
                border: 'none',
                background: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: 0,
                fontWeight: 700,
                fontSize: '0.88rem',
              }}
            >
              Projects
            </button>

            <ChevronRight size={14} color="#94A3B8" />

            <span style={{ color: '#EAB308', fontWeight: 800 }}>{project.title}</span>
          </div>

          <button
            onClick={onBackToProjects}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              padding: '7px 16px',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: '#0F172A',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0F172A';
              e.currentTarget.style.color = '#FEC603';
              e.currentTarget.style.borderColor = '#0F172A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.color = '#0F172A';
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to All 22 Sites</span>
          </button>
        </div>

        {/* ================= 2. MAIN SPLIT SECTION ================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '42px',
            alignItems: 'start',
            marginBottom: '50px',
          }}
        >
          {/* ----- LEFT: LARGE GALLERY VIEWER & THUMBNAIL STRIP ----- */}
          <div>
            {/* Main Interactive Hero Image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '430px',
                borderRadius: '26px',
                overflow: 'hidden',
                backgroundColor: '#0F172A',
                boxShadow: '0 20px 45px -12px rgba(0, 0, 0, 0.15)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={project.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </AnimatePresence>

              {/* Navigation Arrow: Prev */}
              <button
                onClick={handlePrev}
                aria-label="Previous Image"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                  zIndex: 10,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEC603';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronLeft size={22} />
              </button>

              {/* Navigation Arrow: Next */}
              <button
                onClick={handleNext}
                aria-label="Next Image"
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                  zIndex: 10,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEC603';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                <ChevronRight size={22} />
              </button>

              {/* Fullscreen Expand Button (Top Right) */}
              <button
                onClick={() => setFullscreenImage(activeImage)}
                aria-label="Expand Fullscreen"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEC603')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.75)')}
              >
                <Maximize2 size={16} />
              </button>

              {/* Image Counter Pill (Bottom Left) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.80rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  zIndex: 10,
                }}
              >
                {activeImgIndex + 1} / {gallery.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '16px',
                overflowX: 'auto',
                paddingBottom: '6px',
              }}
            >
              {gallery.map((thumb, idx) => {
                const isActive = idx === activeImgIndex;
                const isOverLimit = idx === 5 && gallery.length > 6;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    style={{
                      position: 'relative',
                      width: '88px',
                      height: '62px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      padding: 0,
                      border: isActive ? '2.5px solid #FEC603' : '1.5px solid #E2E8F0',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: isActive ? '0 0 12px rgba(254, 198, 3, 0.5)' : 'none',
                      transition: 'all 0.2s ease',
                      backgroundColor: '#0F172A',
                    }}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isActive ? 1 : 0.78,
                      }}
                    />
                    {isOverLimit && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(15, 23, 42, 0.82)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        +{gallery.length - 5} More
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ----- RIGHT: PROJECT SPECIFICATIONS, OVERVIEW & HIGHLIGHTS ----- */}
          <div>
            {/* Status Pill Badge */}
            <div style={{ marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FEC603',
                  color: '#000000',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.80rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  padding: '6px 18px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 10px rgba(254, 198, 3, 0.35)',
                }}
              >
                {project.status === 'Completed' ? 'Completed Project' : project.status}
              </span>
            </div>

            {/* Project Title */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                fontWeight: 950,
                color: '#000000',
                letterSpacing: '-0.03em',
                margin: '0 0 8px 0',
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h1>

            {/* Location with Pin */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                color: '#475569',
                fontSize: '0.94rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              <MapPin size={16} color="#000000" />
              <span>{project.location}</span>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span style={{ color: '#64748B', fontWeight: 600 }}>Client: {project.client}</span>
            </div>

            {/* Quick Specs Row (Matching Reference) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '24px',
                padding: '14px 0',
                borderTop: '1px solid #E2E8F0',
                borderBottom: '1px solid #E2E8F0',
                marginBottom: '26px',
              }}
            >
              {/* Spec 1: Type */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Home size={18} color="#FEC603" />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                >
                  {project.type}
                </span>
              </div>

              <div style={{ height: '20px', width: '1px', backgroundColor: '#E2E8F0' }} />

              {/* Spec 2: Built-up Area */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Maximize2 size={18} color="#FEC603" />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                >
                  {project.builtUpArea || project.area}
                </span>
              </div>

              <div style={{ height: '20px', width: '1px', backgroundColor: '#E2E8F0' }} />

              {/* Spec 3: Completed Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                >
                  {project.status} ({project.year})
                </span>
              </div>
            </div>

            {/* Project Overview Section */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.24rem',
                    fontWeight: 900,
                    color: '#000000',
                    margin: 0,
                  }}
                >
                  Project Overview
                </h3>
                <div style={{ width: '32px', height: '3.5px', backgroundColor: '#FEC603', borderRadius: '2px' }} />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.94rem',
                  lineHeight: 1.68,
                  color: '#475569',
                  margin: 0,
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Project Highlights Section with 4 Golden Outline Cards */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.24rem',
                    fontWeight: 900,
                    color: '#000000',
                    margin: 0,
                  }}
                >
                  Project Highlights
                </h3>
                <div style={{ width: '32px', height: '3.5px', backgroundColor: '#FEC603', borderRadius: '2px' }} />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                  gap: '12px',
                }}
              >
                {(project.projectHighlights || [
                  { title: 'Spacious Interiors', icon: 'home' },
                  { title: 'Modern Design', icon: 'compass' },
                  { title: 'Premium Materials', icon: 'layers' },
                  { title: 'Turnkey Handover', icon: 'check' },
                ]).map((hl, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#FFFFFF',
                      border: '1.5px solid #F1F5F9',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                      borderRadius: '16px',
                      padding: '16px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '10px',
                      transition: 'transform 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#FEC603';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#F1F5F9';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>{renderHighlightIcon(hl.icon)}</div>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#0F172A',
                        lineHeight: 1.25,
                      }}
                    >
                      {hl.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. BOTTOM "INSIDE VIEW" GALLERY SECTION ================= */}
        <div style={{ marginTop: '20px', paddingTop: '32px', borderTop: '1px solid #F1F5F9' }}>
          {/* Section Heading & Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '18px',
              marginBottom: '24px',
            }}
          >
            {/* Title with yellow double slash */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  color: '#FEC603',
                  fontSize: '1.6rem',
                  fontWeight: 950,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                //
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 950,
                  color: '#000000',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Inside View
              </h2>
            </div>

            {/* Filter Pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              {[
                'All',
                'Living Room',
                'Bedrooms',
                'Kitchen',
                'Dining',
                'Exterior & Elevation',
                'Structural Work',
              ].map((tab) => {
                const isActive = insideFilter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setInsideFilter(tab)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.80rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: isActive ? 800 : 600,
                      border: isActive ? '1px solid #FEC603' : '1px solid #E2E8F0',
                      backgroundColor: isActive ? '#FEC603' : '#FFFFFF',
                      color: isActive ? '#000000' : '#64748B',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 2px 8px rgba(254, 198, 3, 0.35)' : 'none',
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horizontal Gallery Carousel with Scroll Buttons */}
          <div style={{ position: 'relative' }}>
            {/* Carousel Left Button */}
            <button
              onClick={() => scrollInside('left')}
              aria-label="Scroll Inside View Left"
              style={{
                position: 'absolute',
                left: '-18px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                zIndex: 10,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEC603';
                e.currentTarget.style.borderColor = '#FEC603';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Carousel Container */}
            <div
              ref={insideScrollRef}
              style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                padding: '8px 4px 18px 4px',
                scrollbarWidth: 'none',
              }}
            >
              {insideImages.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const matchIndex = gallery.indexOf(imgSrc);
                    if (matchIndex >= 0) setActiveImgIndex(matchIndex);
                    window.scrollTo({ top: 80, behavior: 'smooth' });
                  }}
                  style={{
                    minWidth: '320px',
                    height: '220px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                    backgroundColor: '#0F172A',
                    boxShadow: '0 10px 25px -6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow =
                      '0 18px 35px -8px rgba(0, 0, 0, 0.18), 0 0 15px rgba(254, 198, 3, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px -6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title} - View ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.6) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '14px',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                    }}
                  >
                    View {idx + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Right Button */}
            <button
              onClick={() => scrollInside('right')}
              aria-label="Scroll Inside View Right"
              style={{
                position: 'absolute',
                right: '-18px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                zIndex: 10,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEC603';
                e.currentTarget.style.borderColor = '#FEC603';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ================= 4. BOTTOM ACTION CALLOUT ================= */}
        <div
          style={{
            marginTop: '45px',
            padding: '24px 30px',
            backgroundColor: '#0F172A',
            borderRadius: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div>
            <div style={{ color: '#FEC603', fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Architectural Site Dossier • Yeloline Construction
            </div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.28rem', fontWeight: 900, margin: 0, fontFamily: 'var(--font-heading)' }}>
              Looking To Build Or Renovate A Similar Property?
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={onBackToProjects}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '11px 22px',
                borderRadius: '9999px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Back to All Projects
            </button>

            <button
              onClick={onConsult}
              className="btn-yellow-ref"
              style={{ padding: '11px 24px', fontSize: '0.84rem' }}
            >
              <span>Consult Chief Engineer</span>
              <span style={{ fontSize: '0.9rem' }}>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      {fullscreenImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.94)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: '#FEC603',
              color: '#000000',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={22} />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen View"
            style={{
              maxWidth: '92vw',
              maxHeight: '92vh',
              objectFit: 'contain',
              borderRadius: '12px',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

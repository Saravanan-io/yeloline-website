import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Hammer, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 50;

// Format frame index 0..49 to path: /images/homepage/ezgif-frame-001.jpg .. ezgif-frame-050.jpg
const getFramePath = (index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/images/homepage/ezgif-frame-${frameNumber}.jpg`;
};

// Construction stage metadata according to user specifications
const getStageInfo = (frameIndex) => {
  const frame = frameIndex + 1;
  if (frame <= 10) {
    return {
      stageNum: '01',
      title: 'Foundation Preparation & Groundwork',
      desc: 'Excavation, soil compaction, and subterranean anti-settlement foundation grid.',
    };
  } else if (frame <= 20) {
    return {
      stageNum: '02',
      title: 'Structural Pillars & High-Yield Framework',
      desc: 'Monolithic seismic reinforced columns, shear walls, and core skeletal beams.',
    };
  } else if (frame <= 30) {
    return {
      stageNum: '03',
      title: 'Main Structure & Cantilevered Roof Formation',
      desc: 'Post-tensioned floor slabs, upper cantilevered volumes, and aerodynamic overhangs.',
    };
  } else if (frame <= 40) {
    return {
      stageNum: '04',
      title: 'Exterior Walls, Glass Glazing & Architectural Finishes',
      desc: 'Double-glazed thermal curtain walls, ventilated stone facade, and precision balconies.',
    };
  } else {
    return {
      stageNum: '05',
      title: 'Completed Modern Luxury House & Final Handover',
      desc: 'Turnkey architectural villa completed with landscaping, illumination, and bespoke interiors.',
    };
  }
};

export default function ScrollConstructionHero({ onExploreProjects, onGetQuote }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const triggerRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentStage, setCurrentStage] = useState(getStageInfo(0));
  const [displayFrame, setDisplayFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // High-Performance Canvas Renderer (Contain scaling)
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;

    // Clear canvas to maintain transparent background
    ctx.clearRect(0, 0, w, h);

    // Full-width edge-to-edge scaling (spans 100% of the screen width with no side gaps or borders)
    const imgW = 1920;
    const imgH = 1080;
    const scale = Math.max(w / imgW, h / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (w - drawW) / 2;
    const drawY = (h - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    currentFrameRef.current = frameIndex;
  };

  // 1. Preload all 50 sequential images
  useEffect(() => {
    let isCancelled = false;
    let count = 0;
    const images = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);

        // Draw initial frame as soon as frame 1 is ready
        if (i === 0 && canvasRef.current) {
          renderFrame(0);
        }

        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // 3. GSAP ScrollTrigger Scroll-Controlled Frame Scrubbing
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Initial render
    renderFrame(currentFrameRef.current);

    // Pinning the hero section for 2500px of fluid scroll progress
    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=2500',
      pin: true,
      scrub: 0.45, // Ultra-smooth responsive scrubbing
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        setScrollProgress(progress);

        // Map scroll progress 0..1 to frame index 0..49
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * (TOTAL_FRAMES - 0.001))
        );

        if (targetFrame !== currentFrameRef.current) {
          requestAnimationFrame(() => {
            renderFrame(targetFrame);
            setDisplayFrame(targetFrame + 1);
            setCurrentStage(getStageInfo(targetFrame));
          });
        }
      },
    });

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [isReady]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        background: 'transparent',
        color: '#000000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* 2. Top Header Area (Above the construction platform) */}
      <div
        className="app-container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '85px',
          paddingBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Architectural pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            padding: '6px 18px',
            borderRadius: '9999px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#F9DF04',
              boxShadow: '0 0 8px rgba(249, 223, 4, 0.8)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: '#334155',
              textTransform: 'uppercase',
            }}
          >
            INTERACTIVE 3D CONSTRUCTION EXPERIENCE
          </span>
        </div>

        {/* User Required Main Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#000000',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            maxWidth: '950px',
          }}
        >
          BUILDING YOUR DREAMS, <br />
          <span style={{ color: '#000000' }}>CREATING YOUR FUTURE.</span>
        </h1>

        {/* User Required Description */}
        <p
          style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 1.0rem)',
            color: '#475569',
            maxWidth: '680px',
            lineHeight: 1.5,
            margin: '0 0 14px 0',
          }}
        >
          From the first foundation t1 the final finish, we bring your vision to life with precision, quality and innovation.
        </p>

        {/* User Required CTAs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={onExploreProjects}
            className="btn-yellow-ref"
            style={{
              padding: '10px 22px',
              fontSize: '0.84rem',
            }}
          >
            <span>Explore Our Projects</span>
            <ArrowDown size={14} />
          </button>

          <button
            onClick={onGetQuote}
            className="btn-black-ref"
            style={{
              padding: '10px 22px',
              fontSize: '0.84rem',
            }}
          >
            <span>Get a Free Consultation</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* 3. Full-Width Canvas Container */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          padding: 0,
          margin: 0,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
        />

        {/* Preload Status Bar (Shown only during initial load) */}
        {!isReady && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              color: '#FFFFFF',
              padding: '16px 28px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              zIndex: 30,
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.1em' }}>
              <Hammer size={16} color="#F9DF04" />
              <span>PRELOADING 3D ARCHITECTURAL FRAMES ({loadedCount}/{TOTAL_FRAMES})</span>
            </div>
            <div
              style={{
                width: '200px',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(loadedCount / TOTAL_FRAMES) * 100}%`,
                  backgroundColor: '#F9DF04',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Architectural Stage HUD Bar */}
      <div
        className="app-container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingBottom: '22px',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: 'none',
            borderRadius: '14px',
            padding: '12px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          }}
        >
          {/* Left: Dynamic Stage Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                backgroundColor: '#F9DF04',
                color: '#000000',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '0.92rem',
                padding: '6px 12px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Layers size={14} />
              <span>STAGE {currentStage.stageNum}</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.92rem', color: '#000000' }}>
                {currentStage.title}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748B', display: 'none', smDisplay: 'block' }}>
                {currentStage.desc}
              </div>
            </div>
          </div>

          {/* Right: Frame Counter & Interactive Scroll Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Scroll Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '130px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#334155' }}>
                <span>PROGRESS</span>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '5px',
                  backgroundColor: '#E2E8F0',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${scrollProgress * 100}%`,
                    backgroundColor: '#000000',
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
            </div>

            {/* Frame Badge */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#0F172A',
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
              }}
            >
              FRAME {String(displayFrame).padStart(3, '0')} / 050
            </div>

            {/* Scroll Direction Cue */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.04em',
              }}
            >
              <div className="animate-bounce">
                <ArrowDown size={14} color="#000000" />
              </div>
              <span>SCROLL TO BUILD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShieldCheck,
  CircleDollarSign,
  Building2,
  Layers,
  Award,
  CheckCircle2,
  Mouse
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * WhyChooseUs Component
 * 
 * Scroll-Controlled 3D Curved Coverflow Carousel:
 * - Perfectly balanced vertical rhythm within the 100vh viewport
 * - Standard site container alignment (app-container)
 * - GSAP ScrollTrigger pin & scrub across a 3D cylindrical perspective arc
 * - Scrolling down glides through all 6 milestone metric cards
 * - Real-time continuous 3D transforms: rotation, depth, scale, and active golden halo
 * - Illuminated glowing pedestal beneath the center active card
 * - Synchronized interactive pagination dots and direct click-to-focus
 */
export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Continuous virtual position for sub-pixel 3D flow (0 to total - 1)
  const [virtualPos, setVirtualPos] = useState(2);
  const [scrollPercent, setScrollPercent] = useState(0.4);

  // The 6 Metric Cards featured in the 3D Coverflow Carousel
  const carouselItems = [
    {
      id: 'warranty',
      icon: ShieldCheck,
      stat: '15 Yrs',
      title: 'COMPREHENSIVE WARRANTY',
      desc: 'Written legal guarantee on slabs & waterproofing.',
    },
    {
      id: 'builds',
      icon: Layers,
      stat: '250+',
      title: 'TURNKEY BUILDS DELIVERED',
      desc: 'Bespoke residential estates & commercial landmarks.',
    },
    {
      id: 'footprint',
      icon: Building2,
      stat: '500,000+',
      title: 'SQ. FT. BUILT FOOTPRINT',
      desc: 'Engineered with Seismic Zone-IV monolithic RCC.',
    },
    {
      id: 'track_record',
      icon: Award,
      stat: '10+ Yrs',
      title: 'ENGINEERING TRACK RECORD',
      desc: 'Pioneering structural excellence since 2014.',
    },
    {
      id: 'safety',
      icon: CheckCircle2,
      stat: '100%',
      title: 'STRUCTURAL SAFETY INDEX',
      desc: 'Zero structural failures across a decade of builds.',
    },
    {
      id: 'overrun',
      icon: CircleDollarSign,
      stat: '0%',
      title: 'BUDGET OVERRUN RATE',
      desc: 'Strict contractual line-item price protection.',
    },
  ];

  const total = carouselItems.length;

  // 1. GSAP ScrollTrigger Pin & Scrub Setup
  useEffect(() => {
    if (!containerRef.current) return;

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.sort();
    }

    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=2400',
      pin: true,
      scrub: 0.35,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        setScrollPercent(progress);
        const pos = progress * (total - 1);
        setVirtualPos(pos);
      },
    });

    const refreshTimer1 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 400);

    const refreshTimer2 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 1500);

    const handleResize = () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [total]);

  // Programmatic smooth scroll to a specific card
  const scrollToCard = useCallback((targetIndex) => {
    const trigger = triggerRef.current;
    if (trigger && typeof window !== 'undefined') {
      const targetProgress = targetIndex / (total - 1);
      const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      setVirtualPos(targetIndex);
    }
  }, [total]);

  const activeIntIndex = Math.min(total - 1, Math.max(0, Math.round(virtualPos)));

  const handleNext = () => {
    const nextIdx = Math.min(total - 1, activeIntIndex + 1);
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeIntIndex - 1);
    scrollToCard(prevIdx);
  };

  // Keyboard arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Calculate Continuous 3D Transform based on float offset from virtualPos
  const getContinuousCardStyle = (index, currentPos) => {
    const diff = index - currentPos;
    const absDiff = Math.abs(diff);

    // Uniform fanning with clear visibility for numbers and text
    const sign = Math.sign(diff);
    const x = sign * (absDiff * 215 + Math.pow(absDiff, 1.05) * 15);
    const z = Math.max(-210, 100 - absDiff * 95);
    const rotY = Math.max(-48, Math.min(48, -diff * 18));
    const scale = Math.max(0.72, 1.06 - absDiff * 0.12);
    const opacity = Math.max(0.18, 1 - absDiff * 0.22);
    const zIndex = Math.round(20 - absDiff * 3);

    // Active center glow proximity (1 at dead center, 0 when moved away)
    const proximity = Math.max(0, 1 - absDiff * 1.5);
    const isCenter = absDiff < 0.45;

    return {
      transform: `translateX(${x.toFixed(1)}px) translateZ(${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
      zIndex,
      opacity,
      border: proximity > 0.2
        ? `2px solid rgba(249, 223, 4, ${0.5 + proximity * 0.5})`
        : '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: proximity > 0.2
        ? `0 ${12 + proximity * 16}px ${30 + proximity * 22}px -8px rgba(249, 223, 4, ${proximity * 0.45}), 0 8px 22px rgba(0, 0, 0, 0.06)`
        : '0 4px 18px rgba(0, 0, 0, 0.04)',
      pointerEvents: opacity > 0.25 ? 'auto' : 'none',
      cursor: isCenter ? 'default' : 'pointer',
      transition: 'border 0.2s ease, box-shadow 0.2s ease',
    };
  };

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      style={{
        backgroundColor: '#F8F9FA',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        color: '#0F172A',
        paddingTop: '80px', // Clearance below the 70px fixed navbar
        paddingBottom: '20px',
      }}
    >
      {/* 1. Giant Faint Watermark Typography "ADVANTAGES" */}
      <div
        className="select-none pointer-events-none"
        style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(5.5rem, 12vw, 11rem)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          color: 'rgba(15, 23, 42, 0.03)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        ADVANTAGES
      </div>

      {/* Neat & Clean Vertically Balanced Container */}
      <div
        className="app-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          paddingBottom: '8px'
        }}
      >
        {/* 2. Header Section */}
        <div style={{ maxWidth: '780px', paddingTop: '6px' }}>
          {/* Main Headline: Two-tone WHY CHOOSE YELOLINE */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.9rem, 3.4vw, 2.85rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#0F172A', display: 'inline', marginRight: '14px' }}>WHY CHOOSE</span>
            <span style={{ color: '#F9DF04', display: 'inline' }}>YELOLINE</span>
          </h2>

          {/* Description Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 0.95vw, 0.94rem)',
              color: '#64748B',
              lineHeight: 1.5,
              margin: 0,
              fontWeight: 500,
              maxWidth: '660px',
            }}
          >
            We have eliminated the uncertainty, delays, and hidden costs typical of conventional construction.
            Here is why discerning homeowners across Gujarat trust Yeloline.
          </p>
        </div>

        {/* 3. Centered 3D Curved Coverflow Stage */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            userSelect: 'none',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* 3D Stage Viewport */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Floor Pedestal Glowing Platform Aura under active card */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '320px',
                height: '42px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(249, 223, 4, 0.55) 0%, rgba(249, 223, 4, 0.15) 50%, transparent 75%)',
                boxShadow: '0 0 38px rgba(249, 223, 4, 0.40)',
                filter: 'blur(5px)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '190px',
                height: '16px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(249, 223, 4, 0.85) 0%, transparent 70%)',
                filter: 'blur(6px)',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* 3D Cylindrical Perspective Cards */}
            {carouselItems.map((item, idx) => {
              const IconComponent = item.icon;
              const dynamicStyle = getContinuousCardStyle(idx, virtualPos);
              const isCenter = Math.abs(idx - virtualPos) < 0.45;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToCard(idx)}
                  style={{
                    position: 'absolute',
                    width: '235px',
                    height: '315px',
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    padding: '24px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    backdropFilter: 'blur(10px)',
                    ...dynamicStyle,
                  }}
                >
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Top Circular Icon with Soft Yellow Aura */}
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: isCenter ? 'rgba(249, 223, 4, 0.22)' : 'rgba(249, 223, 4, 0.12)',
                        border: isCenter ? '1.5px solid #F9DF04' : '1px solid rgba(249, 223, 4, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px auto',
                        boxShadow: isCenter ? '0 0 16px rgba(249, 223, 4, 0.35)' : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <IconComponent size={24} color="#000000" strokeWidth={1.9} />
                    </div>

                    {/* Big Stat Typography */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.75rem, 2.2vw, 2.15rem)',
                        fontWeight: 900,
                        color: '#000000',
                        lineHeight: 1.05,
                        marginBottom: '6px',
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {item.stat}
                    </div>

                    {/* Card Metric Title */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.80rem',
                        fontWeight: 900,
                        color: '#0F172A',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        lineHeight: 1.25,
                        marginBottom: '8px',
                      }}
                    >
                      {item.title}
                    </div>

                    {/* Card Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        color: '#64748B',
                        lineHeight: 1.45,
                        margin: 0,
                        fontWeight: 450,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Scroll Cue */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#94A3B8',
            fontSize: '0.70rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            paddingTop: '6px',
            pointerEvents: 'none',
          }}
        >
          <Mouse size={13} color="#F9DF04" />
          <span>SCROLL TO EXPLORE PROVEN METRICS ({Math.round(scrollPercent * 100)}%)</span>
        </div>
      </div>
    </section>
  );
}

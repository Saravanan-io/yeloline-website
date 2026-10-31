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
 * - GSAP ScrollTrigger pin & scrub across a 3D cylindrical perspective arc
 * - Scrolling down glides through all 6 milestone metric cards
 * - Real-time continuous 3D transforms: rotation, depth, scale, and active golden halo
 * - Illuminated glowing pedestal beneath the center active card
 * - Synchronized interactive pagination dots, arrows, and direct click-to-focus
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

    // Ensure triggers are evaluated in proper document DOM order
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

    // Refresh after DOM and preceding dynamic sections settle
    const refreshTimer1 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 400);

    const refreshTimer2 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 1500);

    const handleResize = () => {
      ScrollTrigger.refresh();
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

    // Dynamic curve parameters
    const sign = Math.sign(diff);
    const x = sign * Math.pow(absDiff, 0.88) * 195;
    const z = Math.max(-190, 95 - absDiff * 85);
    const rotY = Math.max(-50, Math.min(50, -diff * 19));
    const scale = Math.max(0.68, 1.08 - absDiff * 0.14);
    const opacity = Math.max(0, 1 - absDiff * 0.28);
    const zIndex = Math.round(20 - absDiff * 3);

    // Active center glow proximity (1 at dead center, 0 when moved away)
    const proximity = Math.max(0, 1 - absDiff * 1.6);
    const isCenter = absDiff < 0.45;

    return {
      transform: `translateX(${x.toFixed(1)}px) translateZ(${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
      zIndex,
      opacity,
      border: proximity > 0.2
        ? `2px solid rgba(249, 223, 4, ${0.4 + proximity * 0.6})`
        : '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: proximity > 0.2
        ? `0 ${10 + proximity * 12}px ${28 + proximity * 20}px -8px rgba(249, 223, 4, ${proximity * 0.45}), 0 6px 20px rgba(0, 0, 0, 0.06)`
        : '0 4px 16px rgba(0, 0, 0, 0.04)',
      pointerEvents: opacity > 0.35 ? 'auto' : 'none',
      cursor: isCenter ? 'default' : 'pointer',
      transition: 'border 0.15s ease, box-shadow 0.15s ease',
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '76px', // Clearance below the 70px fixed navbar
        paddingBottom: '16px',
      }}
    >
      {/* 1. Giant Faint Watermark Typography "ADVANTAGES" */}
      <div
        className="select-none pointer-events-none"
        style={{
          position: 'absolute',
          top: '25px',
          left: '30%',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(5rem, 11vw, 10.5rem)',
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

      <div className="app-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* 2. Header Section */}
        <div style={{ maxWidth: '820px', marginBottom: '10px' }}>
          {/* Top Tag with Yellow Line */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '3px',
                backgroundColor: '#F9DF04',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.76rem',
                fontWeight: 900,
                letterSpacing: '0.14em',
                color: '#0F172A',
                textTransform: 'uppercase',
              }}
            >
              06 / UNCOMPROMISING ADVANTAGES
            </span>
          </div>

          {/* Main Headline: Two-tone WHY CHOOSE YELOLINE */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 6px 0',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#0F172A', display: 'block' }}>WHY CHOOSE</span>
            <span style={{ color: '#F9DF04', display: 'block' }}>YELOLINE</span>
          </h2>

          {/* Description Subtext */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem, 0.95vw, 0.94rem)',
              color: '#64748B',
              lineHeight: 1.45,
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
          }}
        >
          {/* 3D Stage Viewport */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '345px',
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
                bottom: '12px',
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
                bottom: '18px',
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
                    width: '230px',
                    height: '315px',
                    borderRadius: '18px',
                    backgroundColor: '#FFFFFF',
                    padding: '22px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    ...dynamicStyle,
                  }}
                >
                  <div>
                    {/* Top Circular Icon with Soft Yellow Aura */}
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: isCenter ? 'rgba(249, 223, 4, 0.22)' : 'rgba(249, 223, 4, 0.12)',
                        border: isCenter ? '1.5px solid #F9DF04' : '1px solid rgba(249, 223, 4, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px auto',
                        boxShadow: isCenter ? '0 0 14px rgba(249, 223, 4, 0.35)' : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <IconComponent size={23} color="#000000" strokeWidth={1.9} />
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

                  {/* Active Indicator Dot */}
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isCenter ? '#F9DF04' : 'transparent',
                      boxShadow: isCenter ? '0 0 8px #F9DF04' : 'none',
                      marginTop: '8px',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Clean Minimal Pagination Dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '12px',
              zIndex: 10,
            }}
          >
            {carouselItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to card ${i + 1}`}
                style={{
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  height: '8px',
                  width: i === activeIntIndex ? '26px' : '8px',
                  borderRadius: '4px',
                  backgroundColor: i === activeIntIndex ? '#F9DF04' : '#CBD5E1',
                  boxShadow: i === activeIntIndex ? '0 0 10px rgba(249, 223, 4, 0.6)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
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
            marginTop: '8px',
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

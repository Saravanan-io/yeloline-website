import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function CoverflowMilestones() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  // 5 Milestones from Reference
  const milestones = [
    {
      period: 'Nov 2017',
      title: 'Foundation & First Milestone',
      desc: 'Yeloline Construction begins its journey with a first residential project.',
      status: 'Inception',
      image: '/images/triveni_bungalows.jpg',
      tag: 'Phase 1 • Foundations',
      isPrimaryBadge: true,
    },
    {
      period: 'Early Projects',
      title: 'Trust & Client Coordination',
      desc: 'Trust is built through practical residential execution and client coordination.',
      status: 'Foundation',
      image: '/images/green_view_bungalows.jpg',
      tag: 'Phase 2 • Client Trust',
      isPrimaryBadge: false,
    },
    {
      period: 'Growth Phase',
      title: 'Portfolio & Turnkey Expansion',
      desc: 'Project handling expands through turnkey works, extensions and renovations.',
      status: 'Scale',
      image: '/images/skyline_residency.jpg',
      tag: 'Phase 3 • Turnkey Growth',
      isPrimaryBadge: false,
    },
    {
      period: 'Service Expansion',
      title: 'Integrated Engineering Suite',
      desc: '2D Vaastu Plan, Bank Estimation, 3D Elevation, Renovation and PMC support strengthen the service range.',
      status: 'Evolution',
      image: '/images/about_architecture.jpg',
      tag: 'Phase 4 • Integrated Suite',
      isPrimaryBadge: false,
    },
    {
      period: 'Present',
      title: '25+ Delivered Landmarks',
      desc: '25+ residential projects, ongoing works and growing client relationships.',
      status: 'Ongoing Excellence',
      image: '/images/palm_springs_villa.jpg',
      tag: 'Phase 5 • 25+ Landmarks',
      isPrimaryBadge: true,
    },
  ];

  // We duplicate the 5 milestones twice into 10 items for a seamless 360° cylindrical loop
  const totalCards = 10;
  const cards = Array.from({ length: totalCards }, (_, i) => ({
    ...milestones[i % milestones.length],
    cardIndex: i,
    milestoneIndex: i % milestones.length,
  }));

  const stepAngle = (2 * Math.PI) / totalCards; // 36 degrees per card

  // Animation & Physics Refs
  const angleRef = useRef(0);
  const targetAngleRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isPlayingRef = useRef(true);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startAngle: 0,
    lastX: 0,
    velocity: 0,
    lastTime: 0,
  });

  const cardElsRef = useRef([]);

  // Responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cylinder Transform Geometry Calculator
  const updateCardTransforms = useCallback((currentAngle) => {
    const radius = isMobile ? 380 : 560;
    const zOffset = isMobile ? 80 : 120;

    cardElsRef.current.forEach((el, i) => {
      if (!el) return;

      // Card absolute angle on the cylinder
      const rawTheta = i * stepAngle + currentAngle;
      // Normalize angle to [-PI, +PI]
      let theta = ((rawTheta + Math.PI) % (2 * Math.PI)) - Math.PI;
      if (theta < -Math.PI) theta += 2 * Math.PI;

      const absTheta = Math.abs(theta);

      // Concave cylinder:
      // Center (theta = 0) is recessed deeper (-radius + zOffset)
      // Sides (theta = +/- PI/3) curve forward toward the viewer
      const x = radius * Math.sin(theta);
      const z = -radius * Math.cos(theta) + zOffset;
      const rotateYDeg = (-theta * 180) / Math.PI;

      // Only render cards visible in the front hemisphere (~105 degrees)
      if (absTheta > (105 * Math.PI) / 180) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.transform = `translate3d(-50%, -50%, -2000px)`;
        return;
      }

      // Smooth opacity & depth shading
      // Center card is highlighted; cards approaching the edges are visible and prominent
      const opacity = Math.max(0.2, 1 - Math.pow(absTheta / 1.7, 1.8));
      const zIndex = Math.round(100 - absTheta * 30);
      const isCenter = absTheta < 0.22;

      el.style.display = 'flex';
      el.style.pointerEvents = 'auto';
      el.style.opacity = String(opacity);
      el.style.zIndex = String(zIndex);
      el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotateYDeg.toFixed(2)}deg)`;

      // Active gold rim on closest card
      if (isCenter) {
        el.style.borderColor = '#F9DF04';
        el.style.boxShadow = '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(249, 223, 4, 0.35)';
      } else {
        el.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        el.style.boxShadow = '0 15px 35px -8px rgba(0, 0, 0, 0.6)';
      }
    });
  }, [isMobile, stepAngle]);

  // Main 60fps / 120fps Animation Loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const drag = dragRef.current;

      if (drag.isDragging) {
        // Dragging handled in pointermove
      } else if (targetAngleRef.current !== null) {
        // Smoothly interpolate to target angle
        const diff = targetAngleRef.current - angleRef.current;
        if (Math.abs(diff) < 0.002) {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        } else {
          angleRef.current += diff * Math.min(dt * 8, 0.3);
        }
      } else {
        // Apply inertia if dragging just released
        if (Math.abs(drag.velocity) > 0.0005) {
          angleRef.current += drag.velocity * dt * 60;
          drag.velocity *= Math.pow(0.92, dt * 60);
        } else {
          drag.velocity = 0;
          // Continuous Auto 3D Revolving Motion (when playing & not hovered)
          if (isPlayingRef.current && !isHoveredRef.current) {
            // Speed: ~0.14 radians per second (~22s for full rotation)
            const speed = 0.14;
            angleRef.current -= speed * dt;
          }
        }
      }

      // Keep angle in range
      if (angleRef.current < -Math.PI * 2) angleRef.current += Math.PI * 2;
      if (angleRef.current > Math.PI * 2) angleRef.current -= Math.PI * 2;

      updateCardTransforms(angleRef.current);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [updateCardTransforms]);

  // Navigate directly to a milestone index
  const rotateToMilestone = useCallback((mIndex) => {
    // Find the closest card representation of this milestone
    const currentA = angleRef.current;
    let bestDelta = Infinity;
    let bestTarget = currentA;

    cards.forEach((c) => {
      if (c.milestoneIndex === mIndex) {
        // We want (c.cardIndex * stepAngle + targetA) = 0 (mod 2PI)
        // targetA = -c.cardIndex * stepAngle
        const idealA = -c.cardIndex * stepAngle;
        // Compute shortest angular distance from currentA to idealA
        let delta = ((idealA - currentA + Math.PI) % (2 * Math.PI)) - Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;

        if (Math.abs(delta) < Math.abs(bestDelta)) {
          bestDelta = delta;
          bestTarget = currentA + delta;
        }
      }
    });

    targetAngleRef.current = bestTarget;
    dragRef.current.velocity = 0;
  }, [cards, stepAngle]);

  // Pointer & Touch Drag Handlers
  const handlePointerDown = (e) => {
    // Left click or touch only
    if (e.button !== undefined && e.button !== 0) return;

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startAngle: angleRef.current,
      lastX: e.clientX,
      velocity: 0,
      lastTime: performance.now(),
    };
    targetAngleRef.current = null;
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag.isDragging) return;

    const currentX = e.clientX;
    const now = performance.now();
    const dt = Math.max((now - drag.lastTime) / 1000, 0.001);

    const deltaX = currentX - drag.startX;
    // Map pixels to radians: ~1200px = 2PI
    const radPerPixel = (2 * Math.PI) / (isMobile ? 1000 : 1600);
    angleRef.current = drag.startAngle + deltaX * radPerPixel;

    // Track velocity for inertia release
    const moveDiff = currentX - drag.lastX;
    drag.velocity = (moveDiff * radPerPixel) / Math.max(dt * 60, 1);
    drag.lastX = currentX;
    drag.lastTime = now;
  };

  const handlePointerUp = () => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
  };

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        width: '100%',
        padding: '90px 0 100px 0',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Ambient Spotlight & Grid Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '1200px',
          height: '650px',
          background: 'radial-gradient(ellipse at center, rgba(249, 223, 4, 0.09) 0%, rgba(15, 23, 42, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 5, width: '100%' }}>
        {/* ================= 1. SECTION HEADER ================= */}
        <div style={{ maxWidth: '840px', marginBottom: '35px', textAlign: 'left' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
              lineHeight: 1.18,
            }}
          >
            A Journey Built on Trust Since 2017
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#94A3B8', fontWeight: 400, margin: 0 }}>
            Milestones from the first project to a growing project portfolio.
          </p>
        </div>

        {/* ================= 2. 3D CYLINDRICAL AUTO-ROTATING STAGE ================= */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            handlePointerUp();
            isHoveredRef.current = false;
          }}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          style={{
            position: 'relative',
            width: '100%',
            height: isMobile ? '430px' : '470px',
            perspective: isMobile ? '850px' : '1100px',
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            margin: '0 auto',
            cursor: 'grab',
          }}
        >
          {/* All 10 Cards in the 360° Cylindrical Arc */}
          {cards.map((c, i) => (
            <div
              key={i}
              ref={(el) => (cardElsRef.current[i] = el)}
              onClick={() => rotateToMilestone(c.milestoneIndex)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: isMobile ? '230px' : '280px',
                height: isMobile ? '350px' : '390px',
                borderRadius: '18px',
                backgroundColor: '#131B2E',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                willChange: 'transform, opacity',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Card Photo Header */}
              <div style={{ position: 'relative', height: isMobile ? '160px' : '190px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={c.image}
                  alt={c.title}
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
                    background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 0%, rgba(19, 27, 46, 0.95) 100%)',
                  }}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: '16px 18px 20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: isMobile ? '1.02rem' : '1.12rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '8px',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {c.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: isMobile ? '0.78rem' : '0.84rem',
                    color: '#94A3B8',
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 400,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import CoverflowMilestones from './CoverflowMilestones';
import AboutAppBanner from './AboutAppBanner';
import {
  Calendar,
  Building2,
  HardHat,
  Award,
  Layers,
  Search,
  Eye,
  Key,
  Handshake,
  FileText,
  Users,
  ArrowUpRight,
} from 'lucide-react';

// Realistic Black Metal Binder Clip (Bulldog Clip) clamping onto the hanging circles
function BinderClip() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-18px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.35))',
      }}
    >
      <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
        {/* Silver loop wire handle extending UP */}
        <path
          d="M11 2 C11 0.8, 13.5 0, 17 0 C20.5 0, 23 0.8, 23 2 L23.5 12 L20.5 12 L20 3 C20 2, 18.8 1.6, 17 1.6 C16.7 1.6, 15.5 2.2, 15.5 3 L15 13 L11.5 13 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="0.6"
        />
        {/* Black clamp body */}
        <polygon points="6,10 28,10 30,23 4,23" fill="#18181B" stroke="#000000" strokeWidth="0.8" />
        {/* Clamp bottom lip pinching the circle rim */}
        <rect x="3" y="22" width="28" height="6" rx="1.5" fill="#27272A" stroke="#000000" strokeWidth="0.8" />
        <line x1="5" y1="25" x2="29" y2="25" stroke="#71717A" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export default function AboutYeloline({ onContact }) {
  const heroRef = useRef(null);
  const approachRef = useRef(null);
  const teamRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const isApproachInView = useInView(approachRef, { once: true, margin: '-60px' });
  const isTeamInView = useInView(teamRef, { once: true, margin: '-60px' });

  // Refs for 3D Clock Pendulum Kinetic Animation
  const pendulumRefs = useRef([]);
  const isHoveredRef = useRef(false);
  const dampingRef = useRef(1.0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // 5 Core Highlights from Image 2
  const highlights = [
    { title: 'Since November 2017', desc: 'Established civil engineering practice in Erode', icon: Calendar },
    { title: '25+ Residential Projects', desc: 'Crafted with structural precision and timely delivery', icon: Building2 },
    { title: 'Civil Engineering Leadership', desc: 'Hands-on technical supervision and site management', icon: HardHat },
    { title: 'Residential & Commercial Expertise', desc: 'Bespoke custom homes, extensions, and commercial builds', icon: Award },
    { title: 'Turnkey | Labour | PMC', desc: 'Flexible contracting models tailored to client needs', icon: Layers },
  ];

  // 6 Structured Approach Steps in Horizontal Chain Order: 01 -> 04 -> 02 -> 05 -> 03 -> 06
  const approachSteps = [
    {
      number: '01',
      title: "Understanding the Client's Dream",
      desc: 'We begin by listening to lifestyle needs, purpose, budget expectations and practical priorities.',
      icon: Handshake,
      tag: 'DISCOVERY',
      theme: 'black',
      left: 0,
      top: 90,
      zIndex: 2,
      wireHeight: 90,
    },
    {
      number: '04',
      title: 'Material, Labour & Execution Planning',
      desc: 'Resources, sequence and workforce are organised to keep the site controlled and productive.',
      icon: Layers,
      tag: 'LOGISTICS',
      theme: 'yellow',
      left: 172,
      top: 260,
      zIndex: 4,
      wireHeight: 260,
    },
    {
      number: '02',
      title: 'Site Study & Requirement Discussion',
      desc: 'The site, access, orientation, plot condition and usage goals are reviewed before planning.',
      icon: Search,
      tag: 'SITE FEASIBILITY',
      theme: 'yellow',
      left: 344,
      top: 90,
      zIndex: 2,
      wireHeight: 90,
    },
    {
      number: '05',
      title: 'Site Supervision & Quality Monitoring',
      desc: 'Progress is reviewed with a focus on civil execution, workmanship and practical detailing.',
      icon: Eye,
      tag: 'CIVIL DETAILING',
      theme: 'black',
      left: 516,
      top: 260,
      zIndex: 4,
      wireHeight: 260,
    },
    {
      number: '03',
      title: 'Planning, Vaastu & Estimation',
      desc: 'Plans, Vaastu considerations, estimation and elevation coordination are connected before execution.',
      icon: FileText,
      tag: 'ARCHITECTURE & BOQ',
      theme: 'black',
      left: 688,
      top: 90,
      zIndex: 2,
      wireHeight: 90,
    },
    {
      number: '06',
      title: 'Updates, Handover & Long-Term Value',
      desc: 'Client coordination continues through finishing, handover and value-focused completion.',
      icon: Key,
      tag: 'HANDOVER & VALUE',
      theme: 'yellow',
      left: 860,
      top: 260,
      zIndex: 4,
      wireHeight: 260,
    },
  ];

  // 3D Clock Movement Pendulum / Newton's Cradle Kinetic Physics Loop
  useEffect(() => {
    let animId;
    const startTime = performance.now();

    const loop = (now) => {
      const elapsed = (now - startTime) / 1000;

      // Smooth hover damping: slows down smoothly when user inspects a card
      const targetDamp = isHoveredRef.current ? 0.05 : 1.0;
      dampingRef.current += (targetDamp - dampingRef.current) * 0.08;
      const damp = dampingRef.current;

      const T = 2.85; // 2.85s per complete back-and-forth pendulum cycle
      const t = elapsed % T;
      const maxAngle = 15.0; // max swing angle in degrees
      const angles = [0, 0, 0, 0, 0, 0];

      // Phase 1: Ball 0 (Circle 01) swings out to the left and accelerates back down (0.00s to 1.05s)
      if (t < 1.05) {
        const u = t / 1.05;
        angles[0] = -maxAngle * Math.sin(u * Math.PI) * damp;
      }
      // Phase 2: Shockwave Left to Right through Balls 1, 2, 3, 4 (1.05s to 1.38s)
      // When Ball 0 strikes Ball 1, Ball 1 pushes Ball 2, Ball 2 pushes Ball 3, Ball 3 pushes Ball 4
      else if (t < 1.38) {
        // Recoil on Ball 0 upon strike
        const recT = (t - 1.05) / 0.12;
        if (recT <= 1) {
          angles[0] = 0.9 * Math.sin(recT * Math.PI) * damp;
        }

        // Sequential impulse wave: 1 -> 2 -> 3 -> 4
        const waveProgress = t - 1.05;
        const delays = [0.0, 0.06, 0.12, 0.18];
        const pulseDuration = 0.12;

        for (let i = 0; i < 4; i++) {
          const ballIdx = i + 1;
          const localT = (waveProgress - delays[i]) / pulseDuration;
          if (localT >= 0 && localT <= 1) {
            angles[ballIdx] = 3.6 * Math.sin(localT * Math.PI) * damp;
          }
        }
      }
      // Phase 3: Ball 5 (Circle 06) receives impulse and swings out to the right (1.38s to 2.43s)
      else if (t < 2.43) {
        const u = (t - 1.38) / 1.05;
        angles[5] = maxAngle * Math.sin(u * Math.PI) * damp;
      }
      // Phase 4: Shockwave Right to Left through Balls 4, 3, 2, 1 (2.43s to 2.76s)
      // When Ball 5 swings back and strikes Ball 4, Ball 4 pushes Ball 3, Ball 3 pushes Ball 2, Ball 2 pushes Ball 1
      else if (t < 2.76) {
        // Recoil on Ball 5 upon strike
        const recT = (t - 2.43) / 0.12;
        if (recT <= 1) {
          angles[5] = -0.9 * Math.sin(recT * Math.PI) * damp;
        }

        // Sequential impulse wave: 4 -> 3 -> 2 -> 1
        const waveProgress = t - 2.43;
        const delays = [0.0, 0.06, 0.12, 0.18];
        const pulseDuration = 0.12;

        for (let i = 0; i < 4; i++) {
          const ballIdx = 4 - i;
          const localT = (waveProgress - delays[i]) / pulseDuration;
          if (localT >= 0 && localT <= 1) {
            angles[ballIdx] = -3.6 * Math.sin(localT * Math.PI) * damp;
          }
        }
      }
      // Phase 5: Settle (2.76s to 2.85s) before seamless loop to 0.00s

      // Apply 3D transforms directly to DOM elements (60fps/120fps hardware accelerated)
      angles.forEach((deg, idx) => {
        const el = pendulumRefs.current[idx];
        if (!el) return;

        const rad = (deg * Math.PI) / 180;
        // 3D perspective rotation: as it swings sideways, it also rotates subtly on Y axis and pops forward
        const rotY = deg * 0.45;
        const zPush = Math.abs(Math.sin(rad)) * 36;

        el.style.transform = `rotateZ(${deg.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${zPush.toFixed(1)}px)`;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#0F172A', minHeight: '100vh', paddingTop: '72px' }}>
      {/* ==================================================================== */}
      {/* SECTION 1: CORPORATE OVERVIEW & COMPANY PROFILE                      */}
      {/* ==================================================================== */}
      <section
        ref={heroRef}
        style={{
          padding: '80px 0 90px 0',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        {/* Ambient Top Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '60%',
            height: '350px',
            background: 'radial-gradient(ellipse at top, rgba(249, 223, 4, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Main Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            style={{ maxWidth: '920px', marginBottom: '56px' }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#0F172A',
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}
            >
              About Yeloline Construction
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: '#475569',
                lineHeight: 1.6,
                fontWeight: 500,
                borderLeft: '4px solid #F9DF04',
                paddingLeft: '16px',
              }}
            >
              A professional construction firm built on trust, planning and responsible execution.
            </p>
          </motion.div>

          {/* Two-Column Layout: Story (Left) + Highlights Grid (Right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Left Story Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
            >
              <motion.p
                variants={itemVariants}
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                  color: '#334155',
                  fontWeight: 400,
                }}
              >
                <strong>Yeloline Construction</strong> is a partnership firm based in Erode, started in November 2017 and managed by civil engineering professionals. The firm has grown through residential building work, practical planning support, construction execution, renovation, estimation and project management guidance.
              </motion.p>

              <motion.p
                variants={itemVariants}
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                  color: '#334155',
                  fontWeight: 400,
                }}
              >
                With experience across <strong>25+ residential projects</strong>, Yeloline Construction works with a clear purpose: to help clients build with confidence. Every project is approached with attention to planning clarity, site practicality, quality-focused execution and communication that reduces the client&rsquo;s stress during construction.
              </motion.p>

              <motion.p
                variants={itemVariants}
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.75,
                  color: '#334155',
                  fontWeight: 400,
                }}
              >
                The company combines construction knowledge with client-first responsibility, offering services from <strong>2D Vaastu planning</strong> and <strong>3D elevation</strong> to <strong>turnkey execution</strong>, labour contract work, bank estimation, renovation and PMC support.
              </motion.p>

              {/* Action Link */}
              <motion.div variants={itemVariants} style={{ paddingTop: '12px' }}>
                <button
                  onClick={onContact}
                  className="btn-yellow-ref"
                  style={{
                    padding: '13px 26px',
                    fontSize: '0.88rem',
                    boxShadow: '0 4px 18px rgba(249, 223, 4, 0.45)',
                  }}
                >
                  <span>Request Project Feasibility Consultation</span>
                  <ArrowUpRight size={17} />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Highlights Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isHeroInView ? 'visible' : 'hidden'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                const isPrimary = idx === 0 || idx === 1;

                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '18px',
                      padding: '18px 22px',
                      borderRadius: '14px',
                      backgroundColor: isPrimary ? '#111111' : '#F8FAFC',
                      color: isPrimary ? '#FFFFFF' : '#0F172A',
                      border: isPrimary ? '1px solid #1E293B' : '1px solid #E2E8F0',
                      boxShadow: isPrimary
                        ? '0 8px 24px rgba(0, 0, 0, 0.08)'
                        : '0 2px 8px rgba(0, 0, 0, 0.02)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: isPrimary ? '#F9DF04' : '#F1F5F9',
                        color: isPrimary ? '#000000' : '#854D0E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={22} strokeWidth={2.2} />
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '1.02rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-heading)',
                          color: isPrimary ? '#F9DF04' : '#0F172A',
                          marginBottom: '3px',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.84rem',
                          color: isPrimary ? '#CBD5E1' : '#64748B',
                          lineHeight: 1.45,
                          margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: SCROLL-DRIVEN 3D COVERFLOW GALLERY (Image 3)              */}
      {/* ==================================================================== */}
      <CoverflowMilestones />

      {/* ==================================================================== */}
      {/* SECTION 3: OUR APPROACH: PLANNED. TRANSPARENT. RESPONSIBLE.          */}
      {/* ==================================================================== */}
      <section
        ref={approachRef}
        style={{
          padding: '90px 0 110px 0',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Centered Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isApproachInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55 }}
            style={{ textAlign: 'center', marginBottom: '45px' }}
          >
            {/* Top row with yellow horizontal dash + Our Approach */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  width: '36px',
                  height: '4px',
                  backgroundColor: '#FEC603',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                Our <span style={{ color: '#FEC603' }}>Approach</span>
              </h2>
            </div>

            {/* Subtitle */}
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.01em',
                margin: '0 0 10px 0',
                lineHeight: 1.25,
              }}
            >
              Planned. Transparent. Responsible.
            </h3>

            {/* Caption */}
            <p
              style={{
                fontSize: '1rem',
                color: '#64748B',
                fontWeight: 500,
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: 1.5,
              }}
            >
              A construction journey made easier through structured coordination.
            </p>
          </motion.div>

          {/* Staggered Hanging Circles Canvas with Suspension Wires */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isApproachInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              position: 'relative',
              width: '100%',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '20px 70px 50px 70px',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '1140px',
                minWidth: '1140px',
                height: '580px',
                margin: '0 auto',
                perspective: '1400px',
                perspectiveOrigin: '50% 25%',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Horizontal Top Suspension Track Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-30px',
                  right: '-30px',
                  height: '3px',
                  backgroundColor: '#CBD5E1',
                  zIndex: 1,
                  borderRadius: '2px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                }}
              />

              {approachSteps.map((step, idx) => {
                const IconComp = step.icon;
                const isYellowTheme = step.theme === 'yellow';

                return (
                  <div
                    key={idx}
                    ref={(el) => (pendulumRefs.current[idx] = el)}
                    onMouseEnter={() => {
                      isHoveredRef.current = true;
                    }}
                    onMouseLeave={() => {
                      isHoveredRef.current = false;
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: `${step.left}px`,
                      width: '280px',
                      height: `${step.top + 280}px`,
                      transformOrigin: '50% 0',
                      transformStyle: 'preserve-3d',
                      zIndex: step.zIndex,
                      willChange: 'transform',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Vertical Suspension Wire dropping from top track */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: `${step.wireHeight + 2}px`,
                        backgroundColor: '#1E293B',
                        zIndex: 1,
                      }}
                    >
                      {/* Top Track Eyelet */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#0F172A',
                          border: '1.5px solid #94A3B8',
                        }}
                      />
                    </div>

                    {/* Circular Pendant Card */}
                    <div
                      style={{
                        position: 'absolute',
                        top: `${step.top}px`,
                        left: 0,
                        width: '280px',
                        height: '280px',
                      }}
                    >
                      {/* Metal Binder Clip gripping the circle rim */}
                      <BinderClip />

                      {/* Main Circular Disc */}
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          border: isYellowTheme ? '13px solid #FEC603' : '13px solid #18181B',
                          boxShadow: isYellowTheme
                            ? '0 18px 40px rgba(254, 198, 3, 0.32), 0 4px 12px rgba(0, 0, 0, 0.08)'
                            : '0 18px 40px rgba(0, 0, 0, 0.22), 0 4px 12px rgba(0, 0, 0, 0.1)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          padding: '22px 18px 20px 18px',
                          boxSizing: 'border-box',
                          position: 'relative',
                          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                        }}
                      >
                        {/* Soft Yellow Icon Badge */}
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '9px',
                            backgroundColor: '#FEF3C7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#B45309',
                            marginBottom: '4px',
                            flexShrink: 0,
                          }}
                        >
                          <IconComp size={18} strokeWidth={2.2} />
                        </div>

                        {/* Step Number in Bold Golden Yellow */}
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.7rem',
                            fontWeight: 900,
                            color: '#FEC603',
                            lineHeight: 1.05,
                            margin: '2px 0 3px 0',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {step.number}
                        </span>

                        {/* Step Title */}
                        <h4
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            fontSize: '0.88rem',
                            color: '#0F172A',
                            lineHeight: 1.25,
                            maxWidth: '210px',
                            margin: '0 auto 4px auto',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {step.title}
                        </h4>

                        {/* Step Description */}
                        <p
                          style={{
                            fontSize: '0.67rem',
                            color: '#64748B',
                            lineHeight: 1.4,
                            maxWidth: '205px',
                            margin: '0 auto 8px auto',
                            fontWeight: 400,
                          }}
                        >
                          {step.desc}
                        </p>

                        {/* Bottom Action Pill */}
                        <div
                          style={{
                            border: '1.5px solid #FEC603',
                            borderRadius: '9999px',
                            backgroundColor: '#FFFFFF',
                            padding: '3px 12px',
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            color: '#0F172A',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            letterSpacing: '0.04em',
                            boxShadow: '0 2px 6px rgba(254, 198, 3, 0.15)',
                          }}
                        >
                          <span>{step.tag}</span>
                          <span style={{ color: '#FEC603', fontWeight: 900, fontSize: '0.78rem' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: OUR TEAM                                                  */}
      {/* ==================================================================== */}
      <section
        id="our-team"
        ref={teamRef}
        style={{
          padding: '90px 0 100px 0',
          position: 'relative',
          backgroundColor: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55 }}
            style={{ maxWidth: '840px', marginBottom: '36px' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(249, 223, 4, 0.15)',
                border: '1px solid rgba(249, 223, 4, 0.35)',
                color: '#854D0E',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
                marginBottom: '14px',
              }}
            >
              <Users size={14} color="#854D0E" />
              <span>YELOLINE LEADERSHIP &amp; SITE TEAMS</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
                lineHeight: 1.18,
              }}
            >
              Our Team
            </h2>
          </motion.div>

          {/* Blank Canvas Area - strictly no dummy content per request */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isTeamInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              minHeight: '260px',
              borderRadius: '20px',
              border: '2px dashed #CBD5E1',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
            }}
          />

          {/* Bottom Interactive Call to Action Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              marginTop: '56px',
              borderRadius: '20px',
              padding: '40px 48px',
              background: 'linear-gradient(135deg, #0B0F17 0%, #1E293B 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(249, 223, 4, 0.2)',
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <span
                style={{
                  color: '#F9DF04',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                BEGIN YOUR CONSTRUCTION JOURNEY
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
                  fontWeight: 800,
                  marginTop: '6px',
                  marginBottom: '8px',
                }}
              >
                Ready to Build with Total Confidence?
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Speak directly with civil engineering professionals in Erode. Get 2D Vaastu planning, 3D elevation renderings, or an itemized turnkey quotation.
              </p>
            </div>

            <button
              onClick={onContact}
              className="btn-yellow-ref"
              style={{
                padding: '14px 28px',
                fontSize: '0.9rem',
                boxShadow: '0 4px 20px rgba(249, 223, 4, 0.4)',
                flexShrink: 0,
              }}
            >
              <span>Connect With Our Engineers</span>
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 5: DOWNLOAD OUR MOBILE APP (Exact Design & Style from Ref)   */}
      {/* ==================================================================== */}
      <AboutAppBanner />
    </div>
  );
}

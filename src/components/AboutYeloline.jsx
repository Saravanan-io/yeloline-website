import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import CoverflowMilestones from './CoverflowMilestones';
import AboutAppBanner from './AboutAppBanner';
import {
  Layers,
  Search,
  Eye,
  Key,
  Handshake,
  FileText,
  ArrowUpRight,
  Bell,
  BellOff,
  Quote,
  ShieldCheck,
  HardHat,
} from 'lucide-react';

// Yellow Double Quotation Mark SVG (Matching Reference Graphic)
function YellowQuoteMark({ rotate = false }) {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 24 18"
      fill="#F9DF04"
      style={{
        display: 'inline-block',
        flexShrink: 0,
        transform: rotate ? 'rotate(180deg)' : 'none',
      }}
    >
      <path d="M0 10.5C0 4.7 3.5 1 8.5 0l1.2 2.8C6.6 3.4 5 5.5 4.8 7.8H9V18H0V10.5zm13.5 0C13.5 4.7 17 1 22 0l1.2 2.8c-3.1.6-4.7 2.7-4.9 5H22V18h-8.5V10.5z" />
    </svg>
  );
}

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

// Cinematic 3D Floating Gold Logo with interactive tilt, gold shimmer beam & falling 3D golden sparks
function Cinematic3DGoldLogo() {
  const containerRef = useRef(null);
  const canvasBackRef = useRef(null);
  const canvasFrontRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({
      x: -y * 18,
      y: x * 22,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  useEffect(() => {
    const canvasBack = canvasBackRef.current;
    const canvasFront = canvasFrontRef.current;
    if (!canvasBack || !canvasFront) return;

    const ctxBack = canvasBack.getContext('2d');
    const ctxFront = canvasFront.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      const parent = canvasBack.parentElement;
      if (parent) {
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        canvasBack.width = w;
        canvasBack.height = h;
        canvasFront.width = w;
        canvasFront.height = h;
      }
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize falling golden sparks originating directly from the 3D Logo
    const resetSpark = (p, w, h, isInit = false) => {
      const logoWidth = Math.min(w * 0.88, 520);
      const logoHeight = logoWidth * 0.243;
      const logoLeft = (w - logoWidth) / 2;
      const logoCenterY = h / 2 - 14;
      const logoBottom = logoCenterY + logoHeight / 2;

      // 80% originate from the bottom spear & bottom of letters; 20% drip from upper letters & chevron wings
      const fromBottom = Math.random() < 0.8;
      p.x = logoLeft + 15 + Math.random() * (logoWidth - 30);
      const startY = fromBottom
        ? logoBottom - 18 + Math.random() * 16
        : logoCenterY - logoHeight * 0.35 + Math.random() * (logoHeight * 0.7);

      p.startY = startY;
      // Stagger initial Y along the downward fall path so sparks cascade continuously from frame 1
      p.y = isInit ? startY + Math.random() * Math.max(20, h - startY - 30) : startY;

      // 3D Depth: negative is behind the logo, positive is in front of the logo
      p.z = (Math.random() - 0.45) * 160;

      // Realistic falling spark physics
      p.vx = (Math.random() - 0.5) * 0.85;
      p.vy = 0.9 + Math.random() * 2.1;
      p.gravity = 0.045 + Math.random() * 0.04;
      p.radius = 1.1 + Math.random() * 2.2;
      p.sway = Math.random() * Math.PI * 2;
      p.swaySpeed = 0.025 + Math.random() * 0.04;
      p.swayAmp = 0.3 + Math.random() * 0.55;
      p.flicker = Math.random() * Math.PI * 2;
      p.flickerSpeed = 0.12 + Math.random() * 0.18;
      p.isGlint = Math.random() < 0.35; // 35% are sparkling 4-pointed golden diamond stars
      p.glintRot = Math.random() * Math.PI;
      p.glintRotSpeed = (Math.random() - 0.5) * 0.08;
      p.maxLife = 100 + Math.random() * 90;
      p.life = isInit ? Math.random() * 100 : 0;
    };

    const sparkCount = 65;
    const initialW = canvasBack.width || 480;
    const initialH = canvasBack.height || 440;
    const sparks = Array.from({ length: sparkCount }, () => {
      const p = {};
      resetSpark(p, initialW, initialH, true);
      return p;
    });

    const drawSpark = (ctx, p, w, h) => {
      // 3D perspective projection
      const fov = 550;
      const scale = fov / (fov + p.z);
      const projX = w / 2 + (p.x - w / 2) * scale;
      const projY = h / 2 + (p.y - h / 2) * scale;
      const currentRadius = p.radius * scale;

      // Dynamic 3D tilt offset tracking mouse orientation
      const screenX = projX + rotate.y * (p.z / 100) * 1.4;
      const screenY = projY - rotate.x * (p.z / 100) * 1.4;

      // Alpha life fade: fade-in at origin, fade-out near bottom ground
      const progress = p.life / p.maxLife;
      let alpha = 1;
      if (p.y - p.startY < 20) {
        alpha = Math.min(1, (p.y - p.startY) / 20);
      } else if (p.y > h - 45 || progress > 0.8) {
        alpha = Math.max(0, 1 - (p.y - (h - 45)) / 45) * Math.max(0, 1 - (progress - 0.8) / 0.2);
      }

      // Sparkle glimmer / flicker modulation
      const flickerFactor = 0.72 + 0.28 * Math.sin(p.flicker);
      alpha = Math.max(0, Math.min(1, alpha * flickerFactor));
      if (alpha <= 0.02) return;

      ctx.save();
      ctx.translate(screenX, screenY);

      // 1. Motion blur downward falling streak trail
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const streakLen = Math.min(speed * 3.6 * scale, 18);
      const angle = Math.atan2(p.vy, p.vx);

      ctx.rotate(angle);

      const grad = ctx.createLinearGradient(-streakLen, 0, 0, 0);
      grad.addColorStop(0, 'rgba(254, 198, 3, 0)');
      grad.addColorStop(0.5, `rgba(254, 198, 3, ${alpha * 0.45})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.95})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = currentRadius * 1.35;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-streakLen, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

      // 2. White-hot golden spark core
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, currentRadius * 0.75, 0, Math.PI * 2);
      ctx.fill();

      // 3. Glowing golden corona haze
      const glowRad = currentRadius * 2.8;
      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRad);
      glowGrad.addColorStop(0, `rgba(254, 215, 60, ${alpha * 0.8})`);
      glowGrad.addColorStop(0.5, `rgba(254, 198, 3, ${alpha * 0.4})`);
      glowGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, glowRad, 0, Math.PI * 2);
      ctx.fill();

      // 4. Sparkling 4-point diamond star glint for larger embers
      if (p.isGlint && alpha > 0.28) {
        ctx.rotate(p.glintRot - angle);
        const glintSize = currentRadius * 3.2;
        ctx.fillStyle = `rgba(255, 255, 240, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.moveTo(0, -glintSize);
        ctx.quadraticCurveTo(0, 0, glintSize, 0);
        ctx.quadraticCurveTo(0, 0, 0, glintSize);
        ctx.quadraticCurveTo(0, 0, -glintSize, 0);
        ctx.quadraticCurveTo(0, 0, 0, -glintSize);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      const w = canvasBack.width;
      const h = canvasBack.height;
      ctxBack.clearRect(0, 0, w, h);
      ctxFront.clearRect(0, 0, w, h);

      for (let i = 0; i < sparks.length; i++) {
        const p = sparks[i];

        // Physics update: gravity acceleration & gentle sway
        p.vy += p.gravity;
        p.x += p.vx + Math.sin(p.sway) * p.swayAmp;
        p.y += p.vy;
        p.sway += p.swaySpeed;
        p.flicker += p.flickerSpeed;
        p.glintRot += p.glintRotSpeed;
        p.life += 1;

        // Reset if reached bottom of container or expired
        if (p.y > h - 15 || p.life >= p.maxLife) {
          resetSpark(p, w, h, false);
        }

        // True 3D depth separation: behind logo (z < 0) vs in front of logo (z >= 0)
        if (p.z < 0) {
          drawSpark(ctxBack, p, w, h);
        } else {
          drawSpark(ctxFront, p, w, h);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [rotate.x, rotate.y]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        userSelect: 'none',
        background: 'transparent',
      }}
    >
      {/* 1. Cinematic Ambient Golden Backlight Aura */}
      <div
        style={{
          position: 'absolute',
          width: '88%',
          height: '68%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(254, 198, 3, 0.18) 0%, rgba(254, 198, 3, 0.05) 50%, rgba(255, 255, 255, 0) 75%)',
          filter: 'blur(36px)',
          pointerEvents: 'none',
          zIndex: 1,
          transform: `scale(${isHovered ? 1.15 : 1})`,
          transition: 'transform 0.4s ease-out',
        }}
      />

      {/* 2. 3D Sparks Falling BEHIND Logo (z < 0) */}
      <canvas
        ref={canvasBackRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 3. Floating Contact Shadow on the virtual ground */}
      <motion.div
        animate={{
          scaleX: [0.88, 1.05, 0.88],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '44px',
          width: '72%',
          maxWidth: '460px',
          height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(180, 130, 20, 0.28) 0%, rgba(0, 0, 0, 0.12) 35%, transparent 70%)',
          filter: 'blur(14px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 4. Interactive 3D Card with Continuous Floating Orbit */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          rotateX: [2, -2, 2],
          rotateY: [-3.5, 3.5, -3.5],
          rotateZ: [-0.8, 0.8, -0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(30px)`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 3,
          cursor: 'grab',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main 3D Gold Logo */}
          <img
            src="/images/yeloline_3d_gold_logo.png"
            alt="Yeloline Construction 3D Gold Architectural Emblem"
            style={{
              width: '100%',
              maxWidth: '520px',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              filter: isHovered
                ? 'drop-shadow(0 26px 34px rgba(0, 0, 0, 0.22)) drop-shadow(0 8px 18px rgba(254, 198, 3, 0.45)) brightness(1.05)'
                : 'drop-shadow(0 20px 26px rgba(0, 0, 0, 0.15)) drop-shadow(0 6px 14px rgba(254, 198, 3, 0.35))',
              transition: 'filter 0.3s ease',
              pointerEvents: 'none',
              transform: 'translateZ(40px)',
            }}
          />

          {/* Shimmer Light Reflection Beam masked strictly to the 3D logo surface */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              maxWidth: '520px',
              margin: '0 auto',
              maskImage: 'url(/images/yeloline_3d_gold_logo.png)',
              WebkitMaskImage: 'url(/images/yeloline_3d_gold_logo.png)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              pointerEvents: 'none',
              transform: 'translateZ(42px)',
              overflow: 'hidden',
            }}
          >
            <div
              className="gold-beam-sweep"
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(115deg, transparent 25%, rgba(255, 255, 255, 0.75) 50%, transparent 75%)',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* 5. 3D Sparks Falling IN FRONT OF Logo (z >= 0) */}
      <canvas
        ref={canvasFrontRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* Shimmer Sweep Animation Keyframes */}
      <style>{`
        @keyframes goldBeamSweep {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          32%, 100% {
            transform: translateX(150%) skewX(-20deg);
          }
        }
        .gold-beam-sweep {
          animation: goldBeamSweep 4.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

const teamMembers = [
  {
    name: 'P. Surya Prakash',
    degree: 'B.E. Civil',
    role: 'Managing Partner',
    image: '/images/team/surya_prakash.png',
    quote:
      'A home is never just a structure on a site. It is the place where a family expects safety, comfort and peace. Our responsibility is to convert that expectation into clear planning, disciplined execution and a construction journey the client can trust at every stage.',
    leadershipFocus:
      'Trust, engineering quality, transparent coordination and long-term client peace of mind.',
  },
  {
    name: 'S. Balachandran',
    degree: 'B.E. Civil',
    role: 'Managing Partner',
    image: '/images/team/balachandran.png',
    quote:
      'Good construction is not measured only on the day of handover. It should continue to give confidence, value and comfort for years. At Yeloline, we focus on practical engineering, honest coordination and work quality that respects the client’s dream.',
    leadershipFocus:
      'Trust, engineering quality, transparent coordination and long-term client peace of mind.',
  },
];

export default function AboutYeloline({ onContact }) {
  const heroRef = useRef(null);
  const approachRef = useRef(null);
  const teamRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const isApproachInView = useInView(approachRef, { once: true, margin: '-60px' });
  const isApproachSoundActive = useInView(approachRef, { margin: '-60px' });
  const isTeamInView = useInView(teamRef, { once: false, amount: 0.15 });

  // Audio Context & Bell Sound Ref for circle collisions
  const audioCtxRef = useRef(null);
  const [soundMuted, setSoundMuted] = useState(false);
  const soundMutedRef = useRef(soundMuted);
  useEffect(() => {
    soundMutedRef.current = soundMuted;
  }, [soundMuted]);

  const hasPlayedLeftRef = useRef(false);
  const hasPlayedRightRef = useRef(false);
  const lastWaveLeftRef = useRef(-1);
  const lastWaveRightRef = useRef(-1);

  // Unlock browser audio context on user gesture
  useEffect(() => {
    const unlockAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    };
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('scroll', unlockAudio, { passive: true });
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
    };
  }, []);

  // Web Audio API Bell Chime Synthesis
  const playBellSound = (frequency = 1046.5, volume = 0.32) => {
    if (soundMutedRef.current) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, now);
      masterGain.connect(ctx.destination);

      // Bell chime harmonic modes (Fund, Tierce, Quint, Nominal, Super-octave, Strike)
      const harmonics = [
        { ratio: 1.0,   gain: 0.65, decay: 1.4 },
        { ratio: 1.198, gain: 0.38, decay: 1.0 },
        { ratio: 1.503, gain: 0.30, decay: 0.8 },
        { ratio: 2.002, gain: 0.28, decay: 0.6 },
        { ratio: 2.74,  gain: 0.16, decay: 0.35 },
        { ratio: 4.12,  gain: 0.12, decay: 0.12 },
      ];

      harmonics.forEach(({ ratio, gain: hGain, decay }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency * ratio, now);

        oscGain.gain.setValueAtTime(0.0001, now);
        oscGain.gain.exponentialRampToValueAtTime(hGain, now + 0.0025);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decay + 0.03);
      });
    } catch (e) {
      // Audio fallback
    }
  };

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

      // Collision Detection & Bell Sound Triggers (When circles touch)
      if (t < 0.5) {
        hasPlayedLeftRef.current = false;
        hasPlayedRightRef.current = false;
        lastWaveLeftRef.current = -1;
        lastWaveRightRef.current = -1;
      }

      // Phase 1: Ball 0 (Circle 01) swings out to the left and accelerates back down (0.00s to 1.05s)
      if (t < 1.05) {
        const u = t / 1.05;
        angles[0] = -maxAngle * Math.sin(u * Math.PI) * damp;
      }
      // Phase 2: Shockwave Left to Right through Balls 1, 2, 3, 4 (1.05s to 1.38s)
      // When Ball 0 strikes Ball 1, Ball 1 pushes Ball 2, Ball 2 pushes Ball 3, Ball 3 pushes Ball 4
      else if (t < 1.38) {
        // Bell chime at instant of Left Contact strike (Circle 01 strikes Circle 04)
        if (!hasPlayedLeftRef.current) {
          hasPlayedLeftRef.current = true;
          if (!soundMutedRef.current && isApproachSoundActive && damp > 0.4) {
            playBellSound(1046.5, 0.32); // High C bell chime
          }
        }

        // Recoil on Ball 0 upon strike
        const recT = (t - 1.05) / 0.12;
        if (recT <= 1) {
          angles[0] = 0.9 * Math.sin(recT * Math.PI) * damp;
        }

        // Sequential impulse wave: 1 -> 2 -> 3 -> 4
        const waveProgress = t - 1.05;
        const delays = [0.0, 0.06, 0.12, 0.18];
        const pulseDuration = 0.12;
        const clinkFreqs = [1174.7, 1318.5, 1396.9];

        for (let i = 0; i < 4; i++) {
          const ballIdx = i + 1;
          const localT = (waveProgress - delays[i]) / pulseDuration;
          if (localT >= 0 && localT <= 1) {
            angles[ballIdx] = 3.6 * Math.sin(localT * Math.PI) * damp;
          }

          // Intermediate harmonic clinks when circles pass impulse
          if (i > 0 && waveProgress >= delays[i] && lastWaveLeftRef.current < i) {
            lastWaveLeftRef.current = i;
            if (!soundMutedRef.current && isApproachSoundActive && damp > 0.4) {
              playBellSound(clinkFreqs[i - 1], 0.14);
            }
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
        // Bell chime at instant of Right Contact strike (Circle 06 strikes Circle 05)
        if (!hasPlayedRightRef.current) {
          hasPlayedRightRef.current = true;
          if (!soundMutedRef.current && isApproachSoundActive && damp > 0.4) {
            playBellSound(1318.5, 0.32); // High E bell chime
          }
        }

        // Recoil on Ball 5 upon strike
        const recT = (t - 2.43) / 0.12;
        if (recT <= 1) {
          angles[5] = -0.9 * Math.sin(recT * Math.PI) * damp;
        }

        // Sequential impulse wave: 4 -> 3 -> 2 -> 1
        const waveProgress = t - 2.43;
        const delays = [0.0, 0.06, 0.12, 0.18];
        const pulseDuration = 0.12;
        const clinkFreqs = [1318.5, 1174.7, 1046.5];

        for (let i = 0; i < 4; i++) {
          const ballIdx = 4 - i;
          const localT = (waveProgress - delays[i]) / pulseDuration;
          if (localT >= 0 && localT <= 1) {
            angles[ballIdx] = -3.6 * Math.sin(localT * Math.PI) * damp;
          }

          // Intermediate harmonic clinks when circles pass impulse
          if (i > 0 && waveProgress >= delays[i] && lastWaveRightRef.current < i) {
            lastWaveRightRef.current = i;
            if (!soundMutedRef.current && isApproachSoundActive && damp > 0.4) {
              playBellSound(clinkFreqs[i - 1], 0.14);
            }
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
              alignItems: 'center',
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

            {/* Right Column: Cinematic 3D Floating Gold Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={isHeroInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 18 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                width: '100%',
              }}
            >
              <Cinematic3DGoldLogo />
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

            {/* Interactive Bell Chime Sound Toggle */}
            <div style={{ marginTop: '16px' }}>
              <button
                onClick={() => {
                  if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                    audioCtxRef.current.resume().catch(() => {});
                  }
                  setSoundMuted((prev) => !prev);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: soundMuted ? '#F1F5F9' : 'rgba(254, 198, 3, 0.16)',
                  border: '1.5px solid',
                  borderColor: soundMuted ? '#CBD5E1' : '#FEC603',
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: soundMuted ? '#64748B' : '#854D0E',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: soundMuted ? 'none' : '0 2px 10px rgba(254, 198, 3, 0.2)',
                }}
                title={soundMuted ? 'Click to enable collision bell chime sound' : 'Click to mute collision bell chime sound'}
              >
                {soundMuted ? <BellOff size={15} color="#64748B" /> : <Bell size={15} color="#854D0E" />}
                <span>{soundMuted ? 'Collision Bell: Muted' : 'Collision Bell: Active'}</span>
              </button>
            </div>
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
                      if (!soundMutedRef.current) {
                        playBellSound(987.8 + idx * 75, 0.2);
                      }
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
      {/* SECTION 4: OUR TEAM (Editorial Reference Design)                     */}
      {/* ==================================================================== */}
      <section
        id="our-team"
        ref={teamRef}
        style={{
          padding: '100px 0 110px 0',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Architectural Villa Watermark on Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isTeamInView ? { opacity: 0.18, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'min(50vw, 560px)',
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/why_choose_villa_transparent.png"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'grayscale(100%) contrast(110%)',
              maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)',
            }}
          />
        </motion.div>

        <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: '640px', marginBottom: '52px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 4.4vw, 3.4rem)',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.025em',
                marginBottom: '14px',
                lineHeight: 1.12,
              }}
            >
              Our{' '}
              <span style={{ position: 'relative', display: 'inline-block', color: '#F9DF04' }}>
                Team
                {/* Curved Underline Brush Stroke */}
                <svg
                  width="100%"
                  height="10"
                  viewBox="0 0 120 10"
                  fill="none"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: '100%',
                    pointerEvents: 'none',
                  }}
                >
                  <motion.path
                    d="M3 7C40 2 85 2 117 7"
                    stroke="#F9DF04"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isTeamInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                color: '#475569',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 500,
              }}
            >
              Civil engineers and managing partners directing every Yeloline project with technical precision, disciplined execution, and long-term client trust.
            </p>
          </motion.div>

          {/* Two Profile Columns Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '48px 40px',
              alignItems: 'start',
            }}
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 35 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                transition={{ duration: 0.8, delay: 0.15 + idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="team-profile-row"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '24px',
                }}
              >
                {/* Avatar with Sharp Angular Yellow Polygon Behind */}
                <div
                  className="team-avatar-wrapper"
                  style={{
                    position: 'relative',
                    width: '200px',
                    height: '200px',
                    flexShrink: 0,
                  }}
                >
                  {/* Yellow Geometric Angular Shard / Wing */}
                  <motion.svg
                    className="team-avatar-polygon"
                    viewBox="0 0 250 250"
                    fill="none"
                    initial={{ scale: 0.72, rotate: idx === 0 ? -14 : 14, opacity: 0 }}
                    animate={
                      isTeamInView
                        ? { scale: 1, rotate: 0, opacity: 1 }
                        : { scale: 0.72, rotate: idx === 0 ? -14 : 14, opacity: 0 }
                    }
                    transition={{
                      duration: 0.9,
                      delay: 0.22 + idx * 0.18,
                      ease: [0.34, 1.25, 0.64, 1],
                    }}
                    style={{
                      position: 'absolute',
                      top: '-60px',
                      left: '-60px',
                      width: '320px',
                      height: '320px',
                      zIndex: 0,
                      pointerEvents: 'none',
                      filter: 'drop-shadow(0 12px 24px rgba(249, 223, 4, 0.45))',
                    }}
                  >
                    <defs>
                      <linearGradient id={`yellowWing-${idx}`} x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F9DF04" />
                        <stop offset="70%" stopColor="#FEC603" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="180,6 8,162 174,196 194,92"
                      fill={`url(#yellowWing-${idx})`}
                    />
                  </motion.svg>

                  {/* Circular Portrait Image */}
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={isTeamInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.18 + idx * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ scale: 1.03 }}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: '#F1F5F9',
                      border: '5px solid #FFFFFF',
                      boxShadow: '0 10px 28px -4px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Profile Details & Quote */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isTeamInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.26 + idx * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ flex: 1, minWidth: 0, paddingTop: '4px' }}
                >
                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.4rem, 2.2vw, 1.7rem)',
                      fontWeight: 800,
                      color: '#0F172A',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {member.name}
                  </h3>

                  {/* Badges Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                      marginTop: '10px',
                      marginBottom: '18px',
                    }}
                  >
                    {/* Professional Degree Tag */}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#0F172A',
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 6px rgba(15, 23, 42, 0.1)',
                      }}
                    >
                      {member.degree}
                    </span>

                    {/* Managing Partner with Yellow Dot */}
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#334155',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#F9DF04',
                        }}
                      />
                      {member.role}
                    </span>
                  </div>

                  {/* Quote with Yellow Double Quotes */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#F9DF04', flexShrink: 0, marginTop: '2px' }}>
                      <YellowQuoteMark />
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.88rem, 1.2vw, 0.96rem)',
                        lineHeight: 1.68,
                        color: '#334155',
                        fontStyle: 'italic',
                        fontWeight: 450,
                        margin: 0,
                      }}
                    >
                      {member.quote}
                      <span
                        style={{
                          display: 'inline-block',
                          marginLeft: '8px',
                          verticalAlign: 'bottom',
                          transform: 'translateY(2px)',
                        }}
                      >
                        <YellowQuoteMark rotate={true} />
                      </span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Unified Slanted Leadership Focus Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={isTeamInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="leadership-focus-ribbon"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              marginTop: '56px',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 6px 18px rgba(0, 0, 0, 0.05))',
            }}
          >
            {/* Left Yellow Slanted Tag */}
            <motion.div
              className="leadership-focus-badge"
              initial={{ x: -25, opacity: 0 }}
              animate={isTeamInView ? { x: 0, opacity: 1 } : { x: -25, opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(135deg, #F9DF04 0%, #FEC603 100%)',
                clipPath: 'polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)',
                padding: '14px 34px 14px 28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                flexShrink: 0,
                marginLeft: '-4px',
              }}
            >
              <HardHat size={26} strokeWidth={2.4} color="#000000" />
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: '#000000',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Leadership Focus
              </span>
            </motion.div>

            {/* Right Light Grey Slanted Band */}
            <motion.div
              className="leadership-focus-content"
              initial={{ x: 25, opacity: 0 }}
              animate={isTeamInView ? { x: 0, opacity: 1 } : { x: 25, opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: 1,
                background: 'linear-gradient(90deg, #F1F5F9 0%, #F8FAFC 85%, #FFFFFF 100%)',
                clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 100%, 0% 100%)',
                borderTop: '1px solid #E2E8F0',
                borderBottom: '1px solid #E2E8F0',
                borderRight: '1px solid #E2E8F0',
                padding: '14px 28px 14px 24px',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '-14px',
                minWidth: 0,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.88rem, 1.3vw, 0.95rem)',
                  fontWeight: 600,
                  color: '#1E293B',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Trust, engineering quality, transparent coordination and long-term client peace of mind.
              </p>
            </motion.div>
          </motion.div>

          {/* Embedded Mobile Responsive Style for Team Section */}
          <style>{`
            .team-avatar-wrapper {
              width: 200px;
              height: 200px;
            }
            .team-avatar-polygon {
              top: -60px;
              left: -60px;
              width: 320px;
              height: 320px;
            }
            @media (max-width: 1100px) {
              .team-avatar-wrapper {
                width: 175px !important;
                height: 175px !important;
              }
              .team-avatar-polygon {
                top: -52px !important;
                left: -52px !important;
                width: 280px !important;
                height: 280px !important;
              }
            }
            @media (max-width: 768px) {
              .leadership-focus-ribbon {
                flex-direction: column !important;
              }
              .leadership-focus-badge {
                clip-path: none !important;
                border-radius: 14px 14px 0 0 !important;
                margin-left: 0 !important;
                justifyContent: center !important;
              }
              .leadership-focus-content {
                clip-path: none !important;
                border-radius: 0 0 14px 14px !important;
                margin-left: 0 !important;
                border-left: 1px solid #E2E8F0 !important;
                padding: 16px 20px !important;
              }
            }
            @media (max-width: 580px) {
              .team-avatar-wrapper {
                width: 160px !important;
                height: 160px !important;
              }
              .team-avatar-polygon {
                top: -48px !important;
                left: -48px !important;
                width: 256px !important;
                height: 256px !important;
              }
              .team-profile-row {
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
              }
              .team-profile-row > div:last-child {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
              }
            }
          `}</style>

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

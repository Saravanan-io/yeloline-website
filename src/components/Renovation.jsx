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
  Volume2,
  VolumeX,
  Smartphone,
  Calendar,
  Clock,
  MapPin,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Download,
  Sparkles,
  X,
  Bell,
  ArrowRight
} from 'lucide-react';
import Renovan3DBackground from './Renovan3DBackground';

// ============================================================================
// DYNAMIC WEB AUDIO API RENOVAN CAR SOUND ENGINE
// Realistic vehicle audio synchronized to the 10-second showcase video:
// - 0.0s - 1.1s: Ignition key turn & starter motor crank
// - 1.1s - 2.5s: Engine catch & throttle rev blip
// - 2.5s - 5.0s: In-gear acceleration & road roll
// - 5.0s - 8.0s: Smooth cruising & exhaust hum
// - 8.0s - 9.8s: Deceleration & throaty van idle rumble
// - 9.8s - 10.0s: Seamless loop crossfade
// ============================================================================
class RenovanCarAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.isRunning = false;

    // Engine Oscillators & Filters
    this.engineOsc1 = null; // Cylinder fundamental pulse
    this.engineOsc2 = null; // Cylinder 2nd harmonic overtone
    this.subOsc = null;     // Sub-bass exhaust pressure
    this.exhaustFilter = null; // Acoustic muffler resonator
    this.engineGain = null;

    // Road Tire Noise
    this.noiseNode = null;
    this.noiseFilter = null;
    this.noiseGain = null;

    // Starter Motor
    this.starterOsc = null;
    this.starterGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.connect(this.ctx.destination);

      // 1. Engine Audio Path
      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.001, now);

      this.exhaustFilter = this.ctx.createBiquadFilter();
      this.exhaustFilter.type = 'lowpass';
      this.exhaustFilter.frequency.setValueAtTime(180, now);
      this.exhaustFilter.Q.setValueAtTime(2.2, now);

      // Fundamental cylinder firing waveform (Sawtooth rich in all harmonics)
      this.engineOsc1 = this.ctx.createOscillator();
      this.engineOsc1.type = 'sawtooth';
      this.engineOsc1.frequency.setValueAtTime(32, now); // ~960 RPM idle
      this.engineOsc1.connect(this.exhaustFilter);

      // Secondary overtone (Triangle for rounded acoustic body)
      this.engineOsc2 = this.ctx.createOscillator();
      this.engineOsc2.type = 'triangle';
      this.engineOsc2.frequency.setValueAtTime(64, now);
      this.engineOsc2.connect(this.exhaustFilter);

      // Deep sub-bass pulse (Piston stroke thud)
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(42, now);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.35, now);
      this.subOsc.connect(subGain);
      subGain.connect(this.exhaustFilter);

      this.exhaustFilter.connect(this.engineGain);
      this.engineGain.connect(this.masterGain);

      // 2. Starter Motor Audio Path
      this.starterGain = this.ctx.createGain();
      this.starterGain.gain.setValueAtTime(0.001, now);

      this.starterOsc = this.ctx.createOscillator();
      this.starterOsc.type = 'sawtooth';
      this.starterOsc.frequency.setValueAtTime(260, now);

      const starterFilter = this.ctx.createBiquadFilter();
      starterFilter.type = 'bandpass';
      starterFilter.frequency.setValueAtTime(320, now);
      starterFilter.Q.setValueAtTime(3.5, now);

      this.starterOsc.connect(starterFilter);
      starterFilter.connect(this.starterGain);
      this.starterGain.connect(this.masterGain);

      // 3. Road / Tire Surface Noise (Pink/White noise loop)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        output[i] = (b0 + b1 + b2 + white * 0.1848) * 0.05;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.noiseFilter = this.ctx.createBiquadFilter();
      this.noiseFilter.type = 'lowpass';
      this.noiseFilter.frequency.setValueAtTime(260, now);

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(0.001, now);

      this.noiseNode.connect(this.noiseFilter);
      this.noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(this.masterGain);

      // Start all continuous source nodes
      this.engineOsc1.start(now);
      this.engineOsc2.start(now);
      this.subOsc.start(now);
      this.starterOsc.start(now);
      this.noiseNode.start(now);

      this.isRunning = true;
    } catch {
      // Audio fallback
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    if (muted) {
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.06);
    } else {
      this.masterGain.gain.setTargetAtTime(0.28, now, 0.08);
    }
  }

  /**
   * Called on every video frame to shape engine parameters to the exact video timeline
   * @param {number} currentTime - video.currentTime in seconds
   * @param {boolean} isPlaying - whether video is playing
   * @param {boolean} isVisible - whether video element is in viewport
   */
  update(currentTime, isPlaying, isVisible) {
    if (this.isMuted || !isPlaying || !isVisible) {
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.06);
      }
      return;
    }

    if (!this.ctx || !this.isRunning) {
      this.init();
    }
    this.resume();

    if (!this.ctx || this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    // Base master volume
    this.masterGain.gain.setTargetAtTime(0.28, now, 0.05);

    // Normalize timeline to 10-second video loop
    const t = (currentTime || 0) % 10.0;

    let targetRPM = 950;
    let starterVol = 0;
    let engineVol = 0.55;
    let roadVol = 0;
    let filterFreq = 180;

    if (t < 1.1) {
      // PHASE 1: Starter motor crank before engine starts
      const crankPhase = (t / 1.1);
      starterVol = 0.42 * (1 - crankPhase * 0.3);
      // Pulsing starter motor cadence (4-cylinder compression cycles)
      const pulse = Math.sin(t * Math.PI * 9);
      starterVol *= (pulse > 0 ? 1.0 : 0.4);
      // Engine sputtering into life
      engineVol = crankPhase * 0.25;
      targetRPM = 420 + crankPhase * 450;
      filterFreq = 140 + crankPhase * 80;
    } else if (t < 2.5) {
      // PHASE 2: Engine Catch & Enthusiastic Throttle Blip
      const blipT = (t - 1.1) / 1.4;
      starterVol = 0;
      // Parabolic rev curve peaking at 2800 RPM
      const revCurve = Math.sin(blipT * Math.PI);
      targetRPM = 950 + revCurve * 1850;
      engineVol = 0.65 + revCurve * 0.25;
      filterFreq = 220 + revCurve * 320;
      roadVol = blipT * 0.04;
    } else if (t < 5.0) {
      // PHASE 3: In-Gear Acceleration & Van Movement
      const driveT = (t - 2.5) / 2.5;
      targetRPM = 2200 + driveT * 400; // Accelerating to ~2600 RPM
      engineVol = 0.72;
      filterFreq = 340 + driveT * 80;
      roadVol = 0.08 + driveT * 0.04;
    } else if (t < 8.0) {
      // PHASE 4: Steady Van Cruising
      const cruiseT = (t - 5.0) / 3.0;
      targetRPM = 2400 - cruiseT * 450; // High gear cruising ~2000 RPM
      engineVol = 0.65;
      filterFreq = 320 - cruiseT * 60;
      roadVol = 0.09 - cruiseT * 0.03;
    } else {
      // PHASE 5: Deceleration & Deep Warm Idle (8.0s - 10.0s)
      const idleT = (t - 8.0) / 2.0;
      targetRPM = 1950 - idleT * 1000; // Drops to 950 RPM
      engineVol = 0.58 - idleT * 0.08;
      filterFreq = 260 - idleT * 90; // Closes to warm 170Hz
      roadVol = Math.max(0, 0.06 - idleT * 0.06);
    }

    // Convert RPM to cylinder firing frequency (4-cylinder, 4-stroke: RPM / 30)
    const firingFreq = Math.max(18, targetRPM / 30);

    // Apply audio parameters with smooth interpolation
    this.engineOsc1.frequency.setTargetAtTime(firingFreq, now, 0.04);
    this.engineOsc2.frequency.setTargetAtTime(firingFreq * 2.0, now, 0.04);
    this.subOsc.frequency.setTargetAtTime(Math.max(22, firingFreq * 1.5), now, 0.04);
    this.exhaustFilter.frequency.setTargetAtTime(filterFreq, now, 0.04);
    this.engineGain.gain.setTargetAtTime(engineVol, now, 0.04);

    this.starterGain.gain.setTargetAtTime(starterVol, now, 0.03);
    this.noiseGain.gain.setTargetAtTime(roadVol, now, 0.05);
  }

  destroy() {
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
    this.isRunning = false;
  }
}

export default function Renovation({ onGetQuote: _onGetQuote }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const appSectionRef = useRef(null);
  const isAppInView = useInView(appSectionRef, { once: true, margin: '-60px' });
  const moduleMousePos = useRef({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const isVideoInView = useInView(videoContainerRef, { margin: '40px' });
  const carAudioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const homeOnWheelsRef = useRef(null);
  const isHomeOnWheelsInView = useInView(homeOnWheelsRef, { once: true, margin: '-60px' });

  // Initialize and unlock Web Audio API on first user interaction
  useEffect(() => {
    carAudioRef.current = new RenovanCarAudioEngine();

    const unlockAudio = () => {
      if (carAudioRef.current) {
        carAudioRef.current.init();
        carAudioRef.current.resume();
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('scroll', unlockAudio, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      if (carAudioRef.current) {
        carAudioRef.current.destroy();
      }
    };
  }, []);

  // Frame-accurate 60fps audio update synchronized with video.currentTime
  useEffect(() => {
    let animId;
    const tick = () => {
      if (videoRef.current && carAudioRef.current) {
        const currentTime = videoRef.current.currentTime || 0;
        const activePlaying = !videoRef.current.paused && !videoRef.current.ended && isPlaying;
        carAudioRef.current.update(currentTime, activePlaying, isVideoInView);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isVideoInView]);

  const toggleSound = () => {
    setIsSoundMuted((prev) => {
      const next = !prev;
      if (carAudioRef.current) {
        carAudioRef.current.setMuted(next);
        if (!next) {
          carAudioRef.current.init();
          carAudioRef.current.resume();
        }
      }
      return next;
    });
  };

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
      if (carAudioRef.current && !isSoundMuted) {
        carAudioRef.current.resume();
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      if (carAudioRef.current) {
        carAudioRef.current.update(videoRef.current.currentTime || 0, false, false);
      }
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
          backgroundColor: '#000000',
          padding: 0,
          width: '100%',
        }}
      >
        {/* Full-View Edge-to-Edge Video Showcase with Overlay Title */}
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
            {/* Top Vignette Gradient for High-Contrast Readability */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '220px',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.45) 50%, transparent 100%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />

            {/* Floating Top-Center Title Overlay directly on the Video */}
            <div
              style={{
                position: 'absolute',
                top: 'clamp(20px, 4.5vh, 44px)',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                textAlign: 'center',
                width: '100%',
                maxWidth: '900px',
                padding: '0 24px',
                pointerEvents: 'none',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(1.3rem, 2.4vw, 2.1rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  lineHeight: 1.15,
                  margin: 0,
                  fontFamily: 'var(--font-heading)',
                  textShadow: '0 3px 20px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9)',
                }}
              >
                Renovation <span style={{ color: '#F9DF04' }}>Made Easy</span>
              </h1>
            </div>

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

              {/* Car Audio Mute / Unmute Toggle */}
              <button
                onClick={toggleSound}
                type="button"
                aria-label={isSoundMuted ? 'Unmute car audio' : 'Mute car audio'}
                title={isSoundMuted ? 'Unmute Car Audio' : 'Mute Car Audio'}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: isSoundMuted ? 'rgba(15, 23, 42, 0.75)' : '#F9DF04',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: isSoundMuted ? '1px solid rgba(255, 255, 255, 0.25)' : '1.5px solid #F9DF04',
                  color: isSoundMuted ? '#FFFFFF' : '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSoundMuted
                    ? '0 4px 14px rgba(0, 0, 0, 0.4)'
                    : '0 4px 18px rgba(249, 223, 4, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isSoundMuted ? 'rgba(255, 255, 255, 0.2)' : '#FFE855';
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isSoundMuted ? 'rgba(15, 23, 42, 0.75)' : '#F9DF04';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isSoundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
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

      {/* ======================================================================== */}
      {/* RENOVAN • HOME ON WHEELS SHOWCASE SECTION                                */}
      {/* Precise high-fidelity recreation of Reference Design                     */}
      {/* ======================================================================== */}
      <section
        id="renovan-home-on-wheels"
        ref={homeOnWheelsRef}
        style={{
          position: 'relative',
          background: '#FFFFFF',
          padding: '100px 0 110px',
          overflow: 'hidden',
          color: '#0F172A',
          fontFamily: 'inherit'
        }}
      >
        {/* Dynamic Top-Right Angular Accent Swoop with Yeloline Brand Colors (#F9DF04 & #111111) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '42%',
            maxWidth: '560px',
            height: '200px',
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden'
          }}
        >
          <svg
            viewBox="0 0 560 200"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Aerodynamic Black Ribbon Swoop matching footer wave */}
            <path
              d="M 100 0 Q 300 80 560 220 L 560 180 Q 320 70 140 0 Z"
              fill="#111111"
            />
            {/* Primary Yellow Field matching footer wave */}
            <path
              d="M 140 0 Q 320 70 560 180 L 560 0 Z"
              fill="#F9DF04"
            />
          </svg>
        </div>

        {/* Bottom Fluid Architectural Swooshes with Footer Wave Styling */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '46%',
            maxWidth: '600px',
            height: '96px',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <svg
            viewBox="0 0 600 96"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Black ribbon border */}
            <path
              d="M 0 96 L 0 38 Q 250 8 600 96 L 560 96 Q 250 20 0 48 Z"
              fill="#111111"
            />
            {/* Primary Yellow field */}
            <path
              d="M 0 96 L 0 48 Q 250 20 560 96 Z"
              fill="#F9DF04"
            />
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '46%',
            maxWidth: '600px',
            height: '96px',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <svg
            viewBox="0 0 600 96"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Black ribbon border */}
            <path
              d="M 0 96 Q 350 8 600 38 L 600 48 Q 350 20 40 96 Z"
              fill="#111111"
            />
            {/* Primary Yellow field */}
            <path
              d="M 40 96 Q 350 20 600 48 L 600 96 Z"
              fill="#F9DF04"
            />
          </svg>
        </div>

        <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="renovan-wheels-grid">
            {/* Left Column: Headlines, Copy, Feature Badges, Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={isHomeOnWheelsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="renovan-wheels-content"
            >
              {/* Top Pill with Flanking Lines */}
              <div className="renovan-pill-wrapper">
                <div className="renovan-pill-line" />
                <div className="renovan-top-pill">
                  RENOVAN • HOME ON WHEELS
                </div>
                <div className="renovan-pill-line" />
              </div>

              {/* Main Headline */}
              <div style={{ marginTop: '14px', marginBottom: '16px' }}>
                <h2
                  style={{
                    fontSize: 'clamp(2.6rem, 5.8vw, 4.4rem)',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    color: '#0F172A',
                    lineHeight: 1.05,
                    margin: 0,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase'
                  }}
                >
                  BOOK YOUR
                </h2>

                {/* RENOVAN with slanted yellow badge & racing slashes // */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    marginTop: '8px'
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: '#F9DF04',
                      padding: '4px 22px 6px 18px',
                      transform: 'skewX(-11deg)',
                      boxShadow: '0 8px 24px rgba(249, 223, 4, 0.35)',
                      borderRadius: '4px'
                    }}
                  >
                    <span
                      style={{
                        color: '#111111',
                        fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.05
                      }}
                    >
                      RENOVAN
                    </span>
                  </div>

                  {/* Slanted racing stripes // */}
                  <div
                    style={{
                      display: 'inline-flex',
                      gap: '7px',
                      marginLeft: '12px',
                      transform: 'skewX(-11deg)'
                    }}
                  >
                    <div style={{ width: '9px', height: '46px', background: '#F9DF04', borderRadius: '2px' }} />
                    <div style={{ width: '9px', height: '46px', background: '#F9DF04', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>

              {/* Sub-headline */}
              <p
                style={{
                  fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  color: '#0F172A',
                  margin: '0 0 14px 0',
                  lineHeight: 1.3
                }}
              >
                Expert home services, right at your doorstep.
              </p>

              {/* Small yellow accent underline */}
              <div
                style={{
                  width: '64px',
                  height: '4px',
                  background: '#F9DF04',
                  borderRadius: '9999px',
                  marginBottom: '20px'
                }}
              />

              {/* Description text */}
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.35vw, 1.05rem)',
                  color: '#475569',
                  lineHeight: 1.7,
                  maxWidth: '540px',
                  margin: '0 0 28px 0',
                  fontWeight: 450
                }}
              >
                Book electrical, plumbing, general maintenance and masonry services in just a few taps.
                Track your service request and get reliable help when you need it.
              </p>

              {/* 3 Feature Badges in Row */}
              <div className="renovan-features-row">
                {/* Quick Booking */}
                <div className="renovan-feature-item">
                  <div className="renovan-feature-icon-box">
                    <Calendar size={20} strokeWidth={2.4} />
                  </div>
                  <div className="renovan-feature-text">
                    <div>Quick</div>
                    <div>Booking</div>
                  </div>
                </div>

                <div className="renovan-feature-divider" />

                {/* Verified Service Team */}
                <div className="renovan-feature-item">
                  <div className="renovan-feature-icon-box">
                    <ShieldCheck size={20} strokeWidth={2.4} />
                  </div>
                  <div className="renovan-feature-text">
                    <div>Verified</div>
                    <div>Service Team</div>
                  </div>
                </div>

                <div className="renovan-feature-divider" />

                {/* Live Booking Updates */}
                <div className="renovan-feature-item">
                  <div className="renovan-feature-icon-box">
                    <Bell size={20} strokeWidth={2.4} />
                  </div>
                  <div className="renovan-feature-text">
                    <div>Live Booking</div>
                    <div>Updates</div>
                  </div>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="renovan-cta-row">
                {/* Button 1: Book Renovan Now */}
                <button
                  type="button"
                  onClick={() => {
                    const moduleElem = document.getElementById('renovan-app-module');
                    if (moduleElem) {
                      moduleElem.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setShowAppModal(true);
                    }
                  }}
                  className="renovan-btn-book"
                >
                  <Calendar size={19} strokeWidth={2.5} />
                  <span>BOOK RENOVAN NOW</span>
                  <ArrowRight size={19} strokeWidth={2.5} />
                </button>

                {/* Button 2: Download Google Play */}
                <button
                  type="button"
                  onClick={() => setShowAppModal(true)}
                  className="renovan-btn-play"
                >
                  {/* Google Play official color icon */}
                  <svg width="22" height="24" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.37891 0.771484C1.04891 1.13148 0.858906 1.70148 0.858906 2.45148V23.5515C0.858906 24.3015 1.04891 24.8715 1.38891 25.2315L1.45891 25.3015L13.1689 13.5915V13.3115L1.45891 1.60148L1.37891 0.771484Z" fill="url(#play_linear_1)" />
                    <path d="M17.0689 17.5015L13.1689 13.5915V13.3115L17.0689 9.40148L17.1589 9.45148L21.7889 12.0815C23.1089 12.8315 23.1089 14.0715 21.7889 14.8215L17.1589 17.4515L17.0689 17.5015Z" fill="url(#play_linear_2)" />
                    <path d="M17.1589 17.4515L13.1689 13.4515L1.37891 25.2415C1.81891 25.7015 2.56891 25.7615 3.42891 25.2715L17.1589 17.4515Z" fill="url(#play_linear_3)" />
                    <path d="M17.1589 9.45148L3.42891 1.63148C2.56891 1.14148 1.81891 1.20148 1.37891 1.66148L13.1689 13.4515L17.1589 9.45148Z" fill="url(#play_linear_4)" />
                    <defs>
                      <linearGradient id="play_linear_1" x1="12.04" y1="2.18" x2="-2.9" y2="17.12" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00A0FF" />
                        <stop offset="0.007" stopColor="#00A1FF" />
                        <stop offset="0.26" stopColor="#00BEFF" />
                        <stop offset="0.512" stopColor="#00D2FF" />
                        <stop offset="0.76" stopColor="#00DFFF" />
                        <stop offset="1" stopColor="#00E3FF" />
                      </linearGradient>
                      <linearGradient id="play_linear_2" x1="23.67" y1="13.45" x2="-0.4" y2="13.45" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFE000" />
                        <stop offset="0.409" stopColor="#FFBD00" />
                        <stop offset="0.775" stopColor="#FFA500" />
                        <stop offset="1" stopColor="#FF9C00" />
                      </linearGradient>
                      <linearGradient id="play_linear_3" x1="14.95" y1="15.68" x2="-7.3" y2="37.93" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF3A44" />
                        <stop offset="1" stopColor="#C31162" />
                      </linearGradient>
                      <linearGradient id="play_linear_4" x1="-3.45" y1="-8.42" x2="8.63" y2="3.66" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#32A071" />
                        <stop offset="0.068" stopColor="#2DA771" />
                        <stop offset="0.476" stopColor="#15CF74" />
                        <stop offset="0.801" stopColor="#06E775" />
                        <stop offset="1" stopColor="#00F076" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>
                      DOWNLOAD THE APP
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2, marginTop: '2px' }}>
                      Google Play
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Right Column: User's 3rd Image (Van + Mobile Phone Mockup) */}
            <motion.div
              initial={{ opacity: 0, x: 45, scale: 0.96 }}
              animate={isHomeOnWheelsInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 45, scale: 0.96 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="renovan-wheels-visual"
            >
              {/* Ambient Warm Golden Halo matching #F9DF04 */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '85%',
                  height: '75%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(249, 223, 4, 0.22) 0%, rgba(249, 223, 4, 0.06) 55%, transparent 75%)',
                  filter: 'blur(45px)',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              {/* Soft Floor Shadow beneath Wheels & Smartphone */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '4%',
                  width: '92%',
                  height: '24px',
                  background: 'radial-gradient(ellipse at center, rgba(17, 17, 17, 0.28) 0%, rgba(17, 17, 17, 0.08) 55%, transparent 75%)',
                  filter: 'blur(7px)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />

              {/* Showcase Visual Cutout */}
              <img
                src="/images/renovan_showcase_van_phone.png?v=2"
                alt="Yeloline Renovan - Home on Wheels Service Van and Booking App"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  maxWidth: '720px',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.08))'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Section-Specific Scoped CSS with Footer Color Matching */}
        <style>{`
          .renovan-wheels-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 44px;
          }
          .renovan-pill-wrapper {
            display: inline-flex;
            align-items: center;
            gap: 14px;
          }
          .renovan-pill-line {
            width: 44px;
            height: 1.5px;
            background: #E2E8F0;
          }
          .renovan-top-pill {
            background: #F9DF04;
            color: #111111;
            padding: 6px 20px;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            box-shadow: 0 2px 10px rgba(249, 223, 4, 0.35);
          }
          .renovan-features-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px 20px;
            margin-top: 24px;
            margin-bottom: 32px;
          }
          .renovan-feature-item {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .renovan-feature-icon-box {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: rgba(249, 223, 4, 0.16);
            border: 1.5px solid #F9DF04;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111111;
            flex-shrink: 0;
          }
          .renovan-feature-text {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0F172A;
            line-height: 1.25;
          }
          .renovan-feature-divider {
            width: 1px;
            height: 34px;
            background: #E2E8F0;
          }
          .renovan-cta-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
          }
          .renovan-btn-book {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 26px;
            border-radius: 14px;
            background: #F9DF04;
            color: #111111;
            font-weight: 800;
            font-size: 0.92rem;
            letter-spacing: 0.04em;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(249, 223, 4, 0.35);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .renovan-btn-book:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(249, 223, 4, 0.45);
            background: #FEDB04;
          }
          .renovan-btn-book:active {
            transform: translateY(0);
          }
          .renovan-btn-play {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 10px 22px;
            border-radius: 14px;
            background: #111111;
            border: 1px solid #1E293B;
            color: #FFFFFF;
            cursor: pointer;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .renovan-btn-play:hover {
            transform: translateY(-2px);
            background: #1A1A1A;
            border-color: #334155;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
          }
          .renovan-btn-play:active {
            transform: translateY(0);
          }
          .renovan-wheels-visual {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @media (max-width: 968px) {
            .renovan-wheels-grid {
              grid-template-columns: 1fr;
              gap: 48px;
            }
            .renovan-wheels-content {
              text-align: left;
            }
            .renovan-features-row {
              justify-content: flex-start;
            }
            .renovan-cta-row {
              justify-content: flex-start;
            }
          }
          @media (max-width: 640px) {
            .renovan-feature-divider {
              display: none;
            }
            .renovan-features-row {
              gap: 16px;
            }
            .renovan-cta-row {
              flex-direction: column;
              align-items: stretch;
            }
            .renovan-btn-book, .renovan-btn-play {
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>
      </section>

    </div>
  );
}

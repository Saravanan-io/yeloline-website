import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Hammer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 50;

// Format frame index 0..49 to path: /images/homepage/ezgif-frame-001.jpg .. ezgif-frame-050.jpg
const getFramePath = (index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/images/homepage/ezgif-frame-${frameNumber}.jpg`;
};

// ============================================================================
// DYNAMIC WEB AUDIO API CONSTRUCTION SCROLL SOUND ENGINE
// ============================================================================
class ConstructionAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.humOsc = null;
    this.humGain = null;
    this.lastClickTime = 0;
    this.humStopTimeout = null;
    this.milestoneCooldown = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Continuous Hydraulic Crane / Engine Hum
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65, this.ctx.currentTime); // 65Hz low engine rumble

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(125, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.humOsc = osc;
      this.humGain = gain;
    } catch {
      // AudioContext blocked or unsupported
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // 1. Tactile Construction Placement Ratchet / Concrete Thud & Snap
  playBuildClick(frameIndex, velocity = 0, isForward = true) {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx || this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    // Throttle clicks to avoid clipping or harsh buzzing on ultra-fast trackpad scrolls
    if (now - this.lastClickTime < 0.032) return;
    this.lastClickTime = now;

    // Pitch rises as building rises (Frame 0 -> 49)
    // Low frequency during excavation/foundation (110Hz - 160Hz)
    // Mid frequency during concrete beams (180Hz - 280Hz)
    // Crisp high frequency during glass, roof & finishing (320Hz - 480Hz)
    const frameNorm = Math.min(1, Math.max(0, frameIndex / TOTAL_FRAMES));
    const baseFreq = isForward
      ? 120 + frameNorm * 260
      : 240 - frameNorm * 90;

    // Volume gently scales with scroll velocity
    const absV = Math.abs(velocity);
    const vol = Math.min(0.24, 0.08 + Math.min(absV / 2500, 0.16));

    // A. Low Concrete / Stone Foundation Impact Thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(45, baseFreq * 0.45), now + 0.045);

    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.048);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.052);

    // B. High Mechanical Tool Snap / Structural Lock
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();

    snapOsc.type = 'sine';
    const snapFreq = 950 + frameNorm * 650;
    snapOsc.frequency.setValueAtTime(snapFreq, now);
    snapOsc.frequency.exponentialRampToValueAtTime(snapFreq * 0.4, now + 0.018);

    snapGain.gain.setValueAtTime(vol * 0.42, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);

    snapOsc.start(now);
    snapOsc.stop(now + 0.026);
  }

  // 2. Active Scroll Hydraulic Engine Hum
  updateScrollHum(velocity = 0) {
    if (this.isMuted || !this.humGain || !this.ctx || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const absV = Math.abs(velocity);

    if (absV > 40) {
      // Scale hum volume & frequency with scroll speed
      const targetGain = Math.min(0.09, (absV / 2800) * 0.09);
      const targetFreq = 62 + Math.min(48, (absV / 2000) * 48);

      this.humGain.gain.setTargetAtTime(targetGain, now, 0.06);
      if (this.humOsc) {
        this.humOsc.frequency.setTargetAtTime(targetFreq, now, 0.06);
      }

      // Reset auto-stop timeout
      if (this.humStopTimeout) clearTimeout(this.humStopTimeout);
      this.humStopTimeout = setTimeout(() => {
        if (this.humGain && this.ctx) {
          this.humGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.12);
        }
      }, 90);
    }
  }

  // 3. Milestone Completion Chimes (Plays when crossing construction phases)
  playMilestoneChime(phaseIndex) {
    if (this.isMuted) return;
    this.init();
    this.resume();
    if (!this.ctx || this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    if (now - this.milestoneCooldown < 0.6) return;
    this.milestoneCooldown = now;

    // Harmonic chords per phase
    const chords = [
      [261.63, 329.63, 392.00],          // Phase 1 (Foundation): C4 - E4 - G4
      [329.63, 392.00, 493.88],          // Phase 2 (RCC Columns): E4 - G4 - B4
      [392.00, 493.88, 587.33],          // Phase 3 (Roof & Walls): G4 - B4 - D5
      [523.25, 659.25, 783.99, 1046.50], // Phase 4 (Full Completion): C5 - E5 - G5 - C6
    ];

    const notes = chords[Math.min(phaseIndex, chords.length - 1)];
    const duration = phaseIndex === 3 ? 1.5 : 0.85;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.038);

      const noteVol = phaseIndex === 3 ? 0.14 : 0.09;
      gain.gain.setValueAtTime(0.001, now + idx * 0.038);
      gain.gain.exponentialRampToValueAtTime(noteVol, now + idx * 0.038 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.038 + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.038);
      osc.stop(now + idx * 0.038 + duration + 0.05);
    });
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.humGain && this.ctx) {
      this.humGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  destroy() {
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
  }
}

export default function ScrollConstructionHero({ onExploreProjects, onGetQuote }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const triggerRef = useRef(null);

  // Audio Engine Instance Ref
  const audioRef = useRef(null);
  const lastMilestoneRef = useRef(-1);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Audio Engine once
  useEffect(() => {
    audioRef.current = new ConstructionAudioEngine();

    // Browser Audio Autoplay Unlock: Listen to first user gesture
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.init();
        audioRef.current.resume();
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('scroll', unlockAudio, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      if (audioRef.current) {
        audioRef.current.destroy();
      }
    };
  }, []);

  // High-Precision Canvas Renderer (Guaranteed Proper View with Strict Contain Scaling)
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const targetWidth = Math.round(w * dpr);
    const targetHeight = Math.round(h * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 1. Strict CONTAIN scaling calculation: ensures the whole house fits properly without being cropped
    const isMobile = w < 768;
    const padTop = isMobile ? 80 : 85;
    const padBottom = isMobile ? 30 : 25;
    const padHorizontal = isMobile ? 16 : 36;

    const availW = Math.max(100, w - padHorizontal * 2);
    const availH = Math.max(100, h - padTop - padBottom);

    const imgW = 1920;
    const imgH = 1080;

    // Guaranteed contain scaling - whole 1920x1080 frame fits completely with zero cropping
    const scale = Math.min(availW / imgW, availH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    // Center horizontally and vertically within available space
    const drawX = (w - drawW) / 2;
    const drawY = padTop + (availH - drawH) / 2;

    // 2. Smooth vertical gradient matching the render studio background exactly
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#D6D2C6');
    bgGrad.addColorStop(0.5, '#E2DED2');
    bgGrad.addColorStop(1, '#D8D0C2');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 3. Subtle soft ambient foundation ground shadow
    ctx.save();
    const shadowY = drawY + drawH * 0.94;
    const shadowGrad = ctx.createRadialGradient(
      drawX + drawW * 0.5, shadowY, drawW * 0.1,
      drawX + drawW * 0.5, shadowY, drawW * 0.45
    );
    shadowGrad.addColorStop(0, 'rgba(40, 32, 20, 0.15)');
    shadowGrad.addColorStop(0.6, 'rgba(40, 32, 20, 0.04)');
    shadowGrad.addColorStop(1, 'rgba(40, 32, 20, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(drawX + drawW * 0.5, shadowY, drawW * 0.45, drawH * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Draw the house frame
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // 5. Soft feather blend on left & right edges if canvas is wider than frame
    if (drawX > 2) {
      const leftFade = ctx.createLinearGradient(drawX, 0, drawX + 18, 0);
      leftFade.addColorStop(0, '#E2DED2');
      leftFade.addColorStop(1, 'rgba(226, 222, 210, 0)');
      ctx.fillStyle = leftFade;
      ctx.fillRect(drawX - 1, drawY, 19, drawH);

      const rightFade = ctx.createLinearGradient(drawX + drawW, 0, drawX + drawW - 18, 0);
      rightFade.addColorStop(0, '#E2DED2');
      rightFade.addColorStop(1, 'rgba(226, 222, 210, 0)');
      ctx.fillStyle = rightFade;
      ctx.fillRect(drawX + drawW - 18, drawY, 19, drawH);
    }

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

  // 2. GSAP ScrollTrigger Scroll-Controlled Frame Scrubbing & Audio Synchronization
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Initial render
    renderFrame(currentFrameRef.current);

    // Pinning the hero section for fluid scroll progress
    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=2600',
      pin: true,
      scrub: 0.45,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        setScrollProgress(progress);

        // Scroll velocity in pixels/sec
        const velocity = self.getVelocity ? self.getVelocity() : 0;

        // Scrub frames from 0% to 85% scroll progress, then hold on the completed frame 50
        // from 85% to 100% so the user has comfortable scroll cushion to admire the full completed house
        const scrubProgress = Math.min(1, progress / 0.85);
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(scrubProgress * (TOTAL_FRAMES - 0.001))
        );

        if (targetFrame !== currentFrameRef.current) {
          const prevFrame = currentFrameRef.current;
          const isForward = targetFrame > prevFrame;

          requestAnimationFrame(() => {
            renderFrame(targetFrame);
          });

          // ==========================================================
          // DYNAMIC SOUND EFFECT TRIGGER ON SCROLL
          // ==========================================================
          if (audioRef.current) {
            // 1. Play tactile mechanical construction placement sound
            audioRef.current.playBuildClick(targetFrame, velocity, isForward);

            // 2. Modulate engine/hydraulic hum based on scroll speed
            audioRef.current.updateScrollHum(velocity);

            // 3. Milestone Phase Completion Chimes
            let phase = -1;
            if (targetFrame >= 12 && targetFrame <= 14) phase = 0;       // Phase 1: Foundation
            else if (targetFrame >= 24 && targetFrame <= 26) phase = 1;  // Phase 2: RCC Columns
            else if (targetFrame >= 36 && targetFrame <= 38) phase = 2;  // Phase 3: Roof Slab
            else if (targetFrame >= 48) phase = 3;                      // Phase 4: Full Complete

            if (phase !== -1 && phase !== lastMilestoneRef.current) {
              lastMilestoneRef.current = phase;
              audioRef.current.playMilestoneChime(phase);
            } else if (phase === -1) {
              lastMilestoneRef.current = -1;
            }
          }
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
      id="construction-experience"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#E2DED2',
        color: '#000000',
        userSelect: 'none',
      }}
    >
      {/* 1. Full-Viewport Canvas (Layer 1: Behind UI) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. Top Header Narrative (Visible at start, fades smoothly as construction begins) */}
      <div
        className="app-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingTop: '88px', // Proper clearance below the 70px fixed navbar
          paddingBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: Math.max(0, 1 - scrollProgress * 5),
          transform: `translateY(-${scrollProgress * 30}px)`,
          pointerEvents: scrollProgress > 0.08 ? 'none' : 'auto',
          transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        }}
      >
        {/* Main Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.7rem, 3.2vw, 2.7rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#000000',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
            maxWidth: '920px',
          }}
        >
          BUILDING YOUR DREAMS, <br />
          <span style={{ color: '#000000' }}>CREATING YOUR FUTURE.</span>
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(0.85rem, 1.1vw, 0.96rem)',
            color: '#475569',
            maxWidth: '680px',
            lineHeight: 1.5,
            margin: '0 0 14px 0',
            fontWeight: 500,
          }}
        >
          From the first foundation to the final finish, we bring your vision to life with precision, quality and innovation.
        </p>

        {/* CTA Buttons */}
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

      {/* Preload Status Bar (Shown only during initial frame download) */}
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
    </section>
  );
}

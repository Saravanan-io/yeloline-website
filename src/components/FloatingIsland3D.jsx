import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingIsland3D() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Interactive 3D mouse tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Falling Stones Canvas Physics Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Realistic 3D rock and pebble sprite asset URLs
    const ROCK_SPRITES = [
      // Craggy boulders, mountain rocks & sandstone formations
      '/images/rocks_opt/stone_0.png',
      '/images/rocks_opt/stone_1.png',
      '/images/rocks_opt/stone_2.png',
      '/images/rocks_opt/stone_3.png',
      '/images/rocks_opt/stone_4.png',
      '/images/rocks_opt/stone_5.png',
      '/images/rocks_opt/stone_6.png',
      '/images/rocks_opt/stone_7.png',
      '/images/rocks_opt/stone_8.png',
      // River pebbles, slate chips, mineral fragments & stone shards
      '/images/rocks_opt/pebble_0.png',
      '/images/rocks_opt/pebble_1.png',
      '/images/rocks_opt/pebble_2.png',
      '/images/rocks_opt/pebble_3.png',
      '/images/rocks_opt/pebble_4.png',
      '/images/rocks_opt/pebble_5.png',
      '/images/rocks_opt/pebble_6.png',
      '/images/rocks_opt/pebble_7.png',
      '/images/rocks_opt/pebble_8.png',
      '/images/rocks_opt/pebble_9.png',
      '/images/rocks_opt/pebble_10.png',
      '/images/rocks_opt/pebble_11.png',
    ];

    // Preload all photorealistic rock sprite images
    const rockImages = ROCK_SPRITES.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    // Exact piece-wise contour points of the lowest rocky underside of the floating island
    const ROCK_CONTOUR_POINTS = [
      [0.18, 0.856],
      [0.21, 0.864],
      [0.24, 0.855],
      [0.27, 0.871],
      [0.31, 0.884],
      [0.35, 0.875],
      [0.39, 0.936],
      [0.43, 0.935],
      [0.47, 0.953],
      [0.51, 0.970],
      [0.55, 0.994],
      [0.58, 0.976],
      [0.62, 0.945],
      [0.66, 0.916],
      [0.70, 0.878],
      [0.74, 0.852],
      [0.78, 0.868],
      [0.82, 0.835],
    ];

    const getRockBottomY = (xNorm) => {
      if (xNorm <= ROCK_CONTOUR_POINTS[0][0]) return ROCK_CONTOUR_POINTS[0][1];
      const last = ROCK_CONTOUR_POINTS[ROCK_CONTOUR_POINTS.length - 1];
      if (xNorm >= last[0]) return last[1];
      for (let i = 0; i < ROCK_CONTOUR_POINTS.length - 1; i++) {
        const [x0, y0] = ROCK_CONTOUR_POINTS[i];
        const [x1, y1] = ROCK_CONTOUR_POINTS[i + 1];
        if (xNorm >= x0 && xNorm <= x1) {
          const t = (xNorm - x0) / (x1 - x0);
          return y0 + t * (y1 - y0);
        }
      }
      return 0.90;
    };

    class FallingStone {
      constructor(canvasWidth, canvasHeight, isInitial = false) {
        this.reset(canvasWidth, canvasHeight, isInitial);
      }

      reset(w, h, isInitial = false) {
        // Read live rendered position of the floating island image
        const imgEl = imgRef.current;
        let imgLeft = w * 0.05;
        let imgTop = h * 0.08;
        let imgW = w * 0.9;
        let imgH = h * 0.75;

        if (imgEl && canvas) {
          const imgRect = imgEl.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          imgLeft = imgRect.left - canvasRect.left;
          imgTop = imgRect.top - canvasRect.top;
          imgW = imgRect.width;
          imgH = imgRect.height;
        }

        // Spawn strictly along the rock underside of the island
        // X ranges between 20% and 80% with organic distribution
        const xNorm = 0.20 + Math.random() * 0.60;
        this.x = imgLeft + imgW * xNorm + (Math.random() - 0.5) * 8;

        // Base spawn Y is right along the real rock boundary
        const rockYNorm = getRockBottomY(xNorm);
        const originY = imgTop + imgH * rockYNorm + 1 + Math.random() * 4;

        if (isInitial) {
          // Stagger initial stones gracefully downwards into the sky
          this.y = originY + Math.random() * (h - originY) * 0.88;
        } else {
          this.y = originY;
        }

        this.originY = originY;

        // Select a realistic rock sprite
        this.imageIndex = Math.floor(Math.random() * ROCK_SPRITES.length);

        // Size variety: large boulders, medium rocks, and small pebbles
        const randSize = Math.random();
        if (randSize < 0.20) {
          // Large foreground rock chunk (20px - 29px)
          this.targetWidth = 20 + Math.random() * 9;
        } else if (randSize < 0.68) {
          // Medium craggy stone (12px - 19px)
          this.targetWidth = 12 + Math.random() * 7;
        } else {
          // Small pebble or chipping shard (6px - 11px)
          this.targetWidth = 6 + Math.random() * 5;
        }

        // Smooth, slow gravity and descent parameters
        this.vy = 0.22 + Math.random() * 0.25; // Gentle initial descent
        this.gravity = 0.0032 + Math.random() * 0.0022; // Ultra-low gravity for smooth slow fall
        this.maxVy = 0.72 + Math.random() * 0.26; // Soft terminal velocity (never rushes)

        // Subtle horizontal air sway / drift
        this.vx = (Math.random() - 0.5) * 0.16;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.010 + Math.random() * 0.012;
        this.swayAmplitude = 0.18 + Math.random() * 0.22;

        // 3D perspective tumbling parameters
        this.angle = Math.random() * Math.PI * 2; // In-plane rotation
        this.angularSpeed = (Math.random() - 0.5) * 0.011; // Slow majestic rotation
        this.pitch = Math.random() * Math.PI * 2; // 3D X-axis flip
        this.pitchSpeed = (Math.random() - 0.5) * 0.014;
        this.roll = Math.random() * Math.PI * 2; // 3D Y-axis roll
        this.rollSpeed = (Math.random() - 0.5) * 0.013;

        this.maxOpacity = 0.82 + Math.random() * 0.18;
        this.opacity = isInitial ? this.maxOpacity : 0; // Fade-in smoothly on detachment
      }

      update(w, h) {
        // Accelerate smoothly up to terminal velocity
        this.vy = Math.min(this.maxVy, this.vy + this.gravity);
        this.swayAngle += this.swaySpeed;

        this.x += this.vx + Math.sin(this.swayAngle) * this.swayAmplitude;
        this.y += this.vy;

        // 3D rotations
        this.angle += this.angularSpeed;
        this.pitch += this.pitchSpeed;
        this.roll += this.rollSpeed;

        // Smooth fade-in right after detaching from the rock
        const distFromOrigin = this.y - this.originY;
        if (distFromOrigin < 22) {
          this.opacity = Math.min(this.maxOpacity, (distFromOrigin / 22) * this.maxOpacity);
        }

        // Smooth fade-out as it falls deep toward the bottom
        const bottomFadeStart = h * 0.82;
        if (this.y > bottomFadeStart) {
          const fadeProgress = (this.y - bottomFadeStart) / (h - bottomFadeStart);
          this.opacity = Math.max(0, this.maxOpacity * (1 - fadeProgress));
        }

        // Respawn when fully faded or beyond bottom
        if (this.y > h + 18 || (this.opacity <= 0 && distFromOrigin > 25)) {
          this.reset(w, h, false);
        }
      }

      draw(context, loadedImages) {
        if (this.opacity <= 0.01) return;
        const img = loadedImages[this.imageIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        // Realistic 3D perspective tumbling (scale oscillates with non-zero thickness)
        const cosRoll = Math.cos(this.roll);
        const cosPitch = Math.cos(this.pitch);
        const scaleX = (Math.abs(cosRoll) * 0.65 + 0.35) * (cosRoll >= 0 ? 1 : -1);
        const scaleY = (Math.abs(cosPitch) * 0.65 + 0.35) * (cosPitch >= 0 ? 1 : -1);
        context.scale(scaleX, scaleY);

        context.globalAlpha = Math.max(0, Math.min(1, this.opacity));

        // Soft ambient 3D depth shadow
        context.shadowColor = 'rgba(25, 18, 12, 0.22)';
        context.shadowBlur = Math.max(2, this.targetWidth * 0.22);
        context.shadowOffsetX = 1.2;
        context.shadowOffsetY = 2.2;

        const aspect = img.naturalHeight / img.naturalWidth;
        const drawW = this.targetWidth;
        const drawH = this.targetWidth * aspect;
        context.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

        context.restore();
      }
    }

    // Micro-earthen dust motes & gravel specks floating slowly
    class FallingDust {
      constructor(w, h) {
        this.reset(w, h, true);
      }
      reset(w, h, isInitial = false) {
        const imgEl = imgRef.current;
        let imgLeft = w * 0.1;
        let imgTop = h * 0.1;
        let imgW = w * 0.8;
        let imgH = h * 0.75;

        if (imgEl && canvas) {
          const imgRect = imgEl.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          imgLeft = imgRect.left - canvasRect.left;
          imgTop = imgRect.top - canvasRect.top;
          imgW = imgRect.width;
          imgH = imgRect.height;
        }

        const xNorm = 0.22 + Math.random() * 0.58;
        this.x = imgLeft + imgW * xNorm + (Math.random() - 0.5) * 8;
        const rockYNorm = getRockBottomY(xNorm);
        const originY = imgTop + imgH * rockYNorm + Math.random() * 5;

        this.originY = originY;
        this.y = isInitial ? originY + Math.random() * (h - originY) * 0.82 : originY;

        this.vy = 0.18 + Math.random() * 0.20; // very slow atmospheric drift
        this.vx = (Math.random() - 0.5) * 0.16;
        this.radius = 0.8 + Math.random() * 1.4;
        this.maxOpacity = 0.40 + Math.random() * 0.30;
        this.opacity = isInitial ? this.maxOpacity : 0;
      }
      update(w, h) {
        this.y += this.vy;
        this.x += this.vx;

        const dist = this.y - this.originY;
        if (dist < 15) {
          this.opacity = Math.min(this.maxOpacity, (dist / 15) * this.maxOpacity);
        }
        if (this.y > h * 0.84) {
          this.opacity -= 0.005;
        }
        if (this.y > h + 10 || (this.opacity <= 0 && dist > 15)) {
          this.reset(w, h, false);
        }
      }
      draw(context) {
        if (this.opacity <= 0.01) return;
        context.save();
        context.globalAlpha = Math.max(0, Math.min(1, this.opacity));
        context.fillStyle = 'rgba(95, 75, 55, 0.65)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;

    // 32 realistic stones + 16 micro-dust motes for a mesmerizing, gentle stream
    const stones = Array.from({ length: 32 }, () => new FallingStone(w, h, true));
    const dustMotes = Array.from({ length: 16 }, () => new FallingDust(w, h));

    const render = () => {
      const currentW = canvas.parentElement ? canvas.parentElement.clientWidth : w;
      const currentH = canvas.parentElement ? canvas.parentElement.clientHeight : h;

      ctx.clearRect(0, 0, currentW, currentH);

      for (let i = 0; i < dustMotes.length; i++) {
        dustMotes[i].update(currentW, currentH);
        dustMotes[i].draw(ctx);
      }

      for (let i = 0; i < stones.length; i++) {
        stones[i].update(currentW, currentH);
        stones[i].draw(ctx, rockImages);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        height: '560px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        userSelect: 'none',
      }}
    >
      {/* Soft Ambient Levitation Cloud Shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: '26px',
          width: '54%',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          filter: 'blur(18px)',
          transform: `scale(${1 - mouseOffset.y * 0.01})`,
          transition: 'transform 0.3s ease-out',
          animation: 'shadowBreathe 6s ease-in-out infinite',
          zIndex: 1,
        }}
      />

      {/* 3D Floating Island Wrapper */}
      <motion.div
        animate={{
          y: [-10, 12, -10],
          rotateX: [1.5, -1.5, 1.5],
          rotateY: [-2, 2, -2],
          rotateZ: [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${mouseOffset.x}deg) rotateX(${mouseOffset.y}deg)`,
          transition: 'transform 0.2s ease-out',
          zIndex: 2,
        }}
      >
        {/* The Transparent Floating Island House Image */}
        <img
          ref={imgRef}
          src="/images/floating_island_house.png"
          alt="Floating 3D Modern Architectural Villa by Yeloline"
          style={{
            width: '100%',
            maxHeight: '460px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 28px 36px rgba(0, 0, 0, 0.16))',
            pointerEvents: 'none',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Falling Stones Canvas (Overlayed in 3D Space, with stones spawning strictly below the rock base) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Shadow Breathing Keyframe Style */}
      <style>{`
        @keyframes shadowBreathe {
          0%, 100% {
            transform: scale(0.92);
            opacity: 0.12;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.07;
          }
        }
      `}</style>
    </div>
  );
}

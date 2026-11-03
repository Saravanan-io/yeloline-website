import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShieldCheck,
  Layers,
  Building2,
  Award,
  CheckCircle2,
  Mouse
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Procedural Circular Golden Particle Sprite for Three.js
 */
function createGoldParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 210, 1)');
  gradient.addColorStop(0.25, 'rgba(249, 223, 4, 0.9)');
  gradient.addColorStop(0.65, 'rgba(245, 158, 11, 0.35)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * 3D WebGL Architectural Background Component (Three.js)
 * Features:
 * - Concentric 3D Golden Architectural Canopy / Spiral Rings (Upper Right)
 * - Undulating 3D Golden Particle Topography Wave (Bottom & Foreground)
 * - 3D Circular Illuminated Stage Podium on the floor
 * - Ambient floating golden construction embers / architectural dust
 * - Smooth camera parallax synced to mouse movements
 */
function ThreeSceneBackground({ mousePos }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene, Camera & WebGL Renderer with Alpha Transparency
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to allow smooth CSS gradient flow

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 120);
    camera.position.set(0, 0.5, 23);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x2a2408, 1.8);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xffea75, 3.2);
    mainSpot.position.set(10, 16, 12);
    scene.add(mainSpot);

    const goldFill = new THREE.PointLight(0xf9df04, 3.5, 35);
    goldFill.position.set(0, -3.5, 8);
    scene.add(goldFill);

    const particleTexture = createGoldParticleTexture();

    // 3. Architectural Concentric Spiral Rings (Upper Right)
    const ringGroup = new THREE.Group();
    ringGroup.position.set(8.5, 5.8, -4);
    ringGroup.rotation.set(0.65, -0.4, 0.25);
    scene.add(ringGroup);

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf9df04,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x926102,
      emissiveIntensity: 0.35,
    });

    const darkRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x161820,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x0a0c10,
    });

    const ringRadii = [6.2, 5.0, 3.9, 2.8, 1.8];
    const rings = [];

    ringRadii.forEach((r, idx) => {
      const isGold = idx % 2 === 0;
      const geom = new THREE.TorusGeometry(r, isGold ? 0.18 : 0.28, 16, 96);
      const mesh = new THREE.Mesh(geom, isGold ? goldMaterial : darkRingMaterial);
      mesh.rotation.x = Math.PI / 2 + idx * 0.05;
      ringGroup.add(mesh);
      rings.push(mesh);
    });

    // 4. Undulating 3D Golden Particle Wave Topography (Floor & Horizon)
    const waveCols = 90;
    const waveRows = 45;
    const waveCount = waveCols * waveRows;
    const wavePositions = new Float32Array(waveCount * 3);
    const waveInitial = [];

    let pIdx = 0;
    for (let i = 0; i < waveCols; i++) {
      for (let j = 0; j < waveRows; j++) {
        const u = (i / waveCols - 0.5) * 44;
        const v = (j / waveRows - 0.5) * 22;
        wavePositions[pIdx * 3] = u;
        wavePositions[pIdx * 3 + 1] = -5.0; // Base floor height
        wavePositions[pIdx * 3 + 2] = v - 2;

        waveInitial.push({ x: u, z: v - 2, seed: Math.sin(i * 0.4) * Math.cos(j * 0.3) });
        pIdx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.45,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xf9df04,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // 5. 3D Glowing Circular Stage Podium (Bottom Center)
    const podiumGroup = new THREE.Group();
    podiumGroup.position.set(0, -4.6, 2.5);
    scene.add(podiumGroup);

    // Outer Illuminated Golden Stage Rim
    const rimGeom = new THREE.TorusGeometry(8.2, 0.16, 16, 120);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xffef66,
      emissive: 0xf9df04,
      emissiveIntensity: 1.2,
      metalness: 0.95,
      roughness: 0.1,
    });
    const stageRim = new THREE.Mesh(rimGeom, rimMat);
    stageRim.rotation.x = Math.PI / 2;
    podiumGroup.add(stageRim);

    // Secondary Inner Golden Tier
    const innerRimGeom = new THREE.TorusGeometry(6.6, 0.08, 16, 100);
    const innerRim = new THREE.Mesh(innerRimGeom, rimMat);
    innerRim.rotation.x = Math.PI / 2;
    podiumGroup.add(innerRim);

    // Glossy Dark Mirrored Stage Disc
    const discGeom = new THREE.CylinderGeometry(8.1, 8.1, 0.3, 64);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x0e1017,
      metalness: 0.9,
      roughness: 0.12,
      emissive: 0x1f1905,
      emissiveIntensity: 0.3,
    });
    const stageDisc = new THREE.Mesh(discGeom, discMat);
    stageDisc.position.y = -0.15;
    podiumGroup.add(stageDisc);

    // 6. Ambient Floating Golden Embers / Dust Motes
    const emberCount = 80;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocity = [];

    for (let k = 0; k < emberCount; k++) {
      emberPositions[k * 3] = (Math.random() - 0.5) * 36;
      emberPositions[k * 3 + 1] = (Math.random() - 0.5) * 20;
      emberPositions[k * 3 + 2] = (Math.random() - 0.5) * 22;

      emberVelocity.push({
        vy: Math.random() * 0.02 + 0.008,
        vx: (Math.random() - 0.5) * 0.006,
        vz: (Math.random() - 0.5) * 0.006,
      });
    }

    const emberGeometry = new THREE.BufferGeometry();
    emberGeometry.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMaterial = new THREE.PointsMaterial({
      size: 0.38,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffe066,
      opacity: 0.75,
    });

    const embers = new THREE.Points(emberGeometry, emberMaterial);
    scene.add(embers);

    // 7. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax based on mouse coordinates
      const targetCamX = (mousePos.current.x / width - 0.5) * 2.8;
      const targetCamY = -(mousePos.current.y / height - 0.5) * 1.8 + 0.5;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, -1.0, 0);

      // Rotate and float overhead architectural rings
      ringGroup.rotation.z = Math.sin(elapsedTime * 0.35) * 0.15 + 0.25;
      ringGroup.rotation.x = Math.cos(elapsedTime * 0.25) * 0.1 + 0.65;
      rings.forEach((r, idx) => {
        r.rotation.z = elapsedTime * (0.15 + idx * 0.05) * (idx % 2 === 0 ? 1 : -1);
      });

      // Animate undulating golden particle wave
      const posAttr = waveGeometry.attributes.position;
      for (let m = 0; m < waveCount; m++) {
        const item = waveInitial[m];
        // Dynamic harmonic fluid wave simulation
        const y = -5.0 + 
          Math.sin(item.x * 0.22 + elapsedTime * 1.4) * 0.85 +
          Math.cos(item.z * 0.35 + elapsedTime * 0.9) * 0.65 +
          Math.sin((item.x + item.z) * 0.15 + elapsedTime * 0.6) * 0.45;

        posAttr.setY(m, y);
      }
      posAttr.needsUpdate = true;

      // Animate ambient embers
      const emberAttr = emberGeometry.attributes.position;
      for (let n = 0; n < emberCount; n++) {
        let ey = emberAttr.getY(n) + emberVelocity[n].vy;
        let ex = emberAttr.getX(n) + emberVelocity[n].vx;
        let ez = emberAttr.getZ(n) + emberVelocity[n].vz;

        if (ey > 10) ey = -10;
        if (ex > 18) ex = -18;
        if (ex < -18) ex = 18;

        emberAttr.setXYZ(n, ex, ey, ez);
      }
      emberAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Listener
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      goldMaterial.dispose();
      darkRingMaterial.dispose();
      waveMaterial.dispose();
      emberMaterial.dispose();
      rimMat.dispose();
      discMat.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

/**
 * Main WhyChooseUs Component
 * 
 * True 3D Animated Architecture & Kinetic Stage:
 * - Real-time Three.js 3D kinetic background:
 *     • Concentric Golden Architectural Torus Rings
 *     • Undulating 3D Topographical Golden Particle Wave
 *     • 3D Mirrored Golden Podium Stage on the floor
 *     • Ambient golden embers drifting in 3D volume
 * - 6 3D Metric Cards standing on the golden podium
 * - Alternating 24K Gold Metallic and Obsidian Black + Illuminated Gold Bevel styling
 * - Center card (500,000+ SQ. FT.) elevated as the prominent Hero card
 * - Unified 3D mouse parallax tilt, hover lift, and GSAP scroll scrub
 */
export default function WhyChooseUs({ onStartProject }) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Mouse tilt position for dynamic 3D parallax
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  // Virtual scroll position (default center index = 2, the Hero card)
  const [virtualPos, setVirtualPos] = useState(2);
  const [scrollPercent, setScrollPercent] = useState(0.32);

  // The 6 Metric Cards featured in the reference design
  const carouselItems = [
    {
      id: 'warranty',
      theme: 'gold',
      icon: ShieldCheck,
      stat: '15 Yrs',
      title: 'COMPREHENSIVE WARRANTY',
      desc: 'Written legal guarantee on slabs & waterproofing.',
    },
    {
      id: 'builds',
      theme: 'black',
      icon: Layers,
      stat: '250+',
      title: 'TURNKEY BUILDS DELIVERED',
      desc: 'Bespoke residential estates & commercial landmarks.',
    },
    {
      id: 'footprint',
      theme: 'hero-gold',
      icon: Building2,
      stat: '500,000+',
      title: 'SQ. FT. BUILT FOOTPRINT',
      desc: 'Engineered with Seismic Zone-IV monolithic RCC.',
    },
    {
      id: 'track_record',
      theme: 'black',
      icon: Award,
      stat: '10+ Yrs',
      title: 'ENGINEERING TRACK RECORD',
      desc: 'Pioneering structural excellence since 2014.',
    },
    {
      id: 'safety',
      theme: 'gold',
      icon: CheckCircle2,
      stat: '100%',
      title: 'STRUCTURAL SAFETY INDEX',
      desc: 'Zero structural failures across a decade of builds.',
    },
    {
      id: 'overrun',
      theme: 'black',
      icon: () => (
        <span style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
          ₹
        </span>
      ),
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
      end: '+=2200',
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
    }, 1200);

    const handleResize = () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(refreshTimer1);
      clearTimeout(refreshTimer2);
      window.removeEventListener('resize', handleResize);
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [total]);

  // Handle interactive 3D mouse parallax tilt
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setTilt({
      x: normY * -3.5, // Pitch
      y: normX * 5.0,  // Yaw
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHoveredCard(null);
  }, []);

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

  // Calculate 3D transformation for each card in the cylindrical arc
  const getCardStyle = (index, currentPos) => {
    const diff = index - currentPos;
    const absDiff = Math.abs(diff);

    // Spatial distribution across the stage
    const sign = Math.sign(diff);
    const x = sign * (absDiff * 218 + Math.pow(absDiff, 1.05) * 10);
    const z = Math.max(-180, 50 - absDiff * 70);
    const rotY = Math.max(-36, Math.min(36, -diff * 11));
    const isHero = absDiff < 0.45;
    const isHovered = hoveredCard === index;

    const baseScale = isHero ? 1.05 : Math.max(0.88, 0.98 - absDiff * 0.05);
    const finalScale = isHovered ? baseScale * 1.06 : baseScale;
    const finalZ = isHovered ? z + 55 : z;
    const opacity = Math.max(0.45, 1 - absDiff * 0.14);
    const zIndex = isHovered ? 50 : Math.round(30 - absDiff * 4);

    return {
      transform: `translateX(${x.toFixed(1)}px) translateZ(${finalZ.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${finalScale.toFixed(3)})`,
      zIndex,
      opacity,
      pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      cursor: isHero ? 'default' : 'pointer',
      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
    };
  };

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'linear-gradient(180deg, #E2DED2 0%, #2A261D 8%, #08090C 20%, #08090C 80%, #1A1C24 92%, #FAFBFC 100%)',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        color: '#FFFFFF',
        paddingTop: '92px',
        paddingBottom: '20px',
        userSelect: 'none',
      }}
    >
      {/* Seamless Top Ingress Blend from Construction Hero (#E2DED2) */}
      <div
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(180deg, #E2DED2 0%, rgba(226, 222, 210, 0.75) 20%, rgba(42, 38, 29, 0.4) 55%, transparent 100%)',
          zIndex: 3,
        }}
      />

      {/* Seamless Bottom Egress Blend to Testimonials (#FAFBFC) */}
      <div
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(26, 28, 36, 0.4) 45%, rgba(250, 251, 252, 0.75) 80%, #FAFBFC 100%)',
          zIndex: 3,
        }}
      />

      {/* 1. Real-time Three.js 3D Animated Kinetic Background */}
      <ThreeSceneBackground mousePos={mousePosRef} />

      {/* 2. Main Vertically Balanced Content Container */}
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
          paddingBottom: '10px',
        }}
      >
        {/* Top Header Section matching Reference Image */}
        <div style={{ maxWidth: '780px', paddingTop: '4px' }}>
          {/* Eyebrow: // WHY CHOOSE YELOLINE */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ color: '#F9DF04' }}>//</span>
            <span style={{ color: '#FFFFFF' }}>WHY CHOOSE</span>
            <span style={{ color: '#F9DF04' }}>YELOLINE</span>
          </h2>

          {/* Underline yellow bar */}
          <div
            style={{
              width: '54px',
              height: '3.5px',
              backgroundColor: '#F9DF04',
              borderRadius: '2px',
              marginBottom: '14px',
            }}
          />

          {/* Subtitle Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.88rem, 1vw, 0.98rem)',
              color: '#CBD5E1',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 450,
              maxWidth: '680px',
            }}
          >
            We have eliminated the uncertainty, delays, and hidden costs typical of conventional
            construction. Here is why discerning homeowners trust Yeloline.
          </p>
        </div>

        {/* 3. 3D Stage with the 6 Cards Standing on the Golden Podium */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            perspective: '1300px',
            perspectiveOrigin: '50% 55%',
          }}
        >
          {/* 3D Tilting Cards Plane */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '380px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
              paddingBottom: '25px',
            }}
          >
            {/* The 6 3D Cards */}
            {carouselItems.map((item, idx) => {
              const IconComponent = item.icon;
              const dynamicStyle = getCardStyle(idx, virtualPos);
              const isHero = item.theme === 'hero-gold' || Math.abs(idx - virtualPos) < 0.45;
              const isGold = item.theme === 'gold' || item.theme === 'hero-gold';

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToCard(idx)}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position: 'absolute',
                    bottom: '25px',
                    width: isHero ? '255px' : '222px',
                    height: isHero ? '365px' : '330px',
                    borderRadius: '26px',
                    boxSizing: 'border-box',
                    padding: isHero ? '28px 20px' : '24px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(10px)',
                    // Theme Styles matching Reference Image:
                    // 24K Gold Metallic vs Obsidian Black + Illuminated Gold Bevel
                    background: isGold
                      ? 'linear-gradient(150deg, #FFE855 0%, #F5B014 42%, #D48806 82%, #B46B02 100%)'
                      : 'linear-gradient(165deg, #1C1D24 0%, #101116 50%, #090A0E 100%)',
                    border: isGold
                      ? '3.5px solid #FFF8B0'
                      : '3px solid #F9DF04',
                    boxShadow: isGold
                      ? isHero
                        ? '0 30px 65px -10px rgba(0, 0, 0, 0.95), 0 0 50px rgba(249, 223, 4, 0.7), inset 0 2px 5px rgba(255, 255, 255, 0.95), inset 0 -3px 6px rgba(161, 98, 7, 0.65)'
                        : '0 24px 50px -10px rgba(0, 0, 0, 0.88), 0 0 35px rgba(249, 223, 4, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.85), inset 0 -2px 5px rgba(161, 98, 7, 0.5)'
                      : '0 25px 55px -10px rgba(0, 0, 0, 0.95), 0 0 36px rgba(249, 223, 4, 0.4), inset 0 1px 3px rgba(255, 240, 100, 0.5), inset 0 0 16px rgba(249, 223, 4, 0.15)',
                    ...dynamicStyle,
                  }}
                >
                  {/* Top Specular Sheen for 3D Bevel Lighting */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '12%',
                      right: '12%',
                      height: '2.5px',
                      background: isGold
                        ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)'
                        : 'linear-gradient(90deg, transparent 0%, rgba(254, 240, 138, 0.9) 50%, transparent 100%)',
                      borderRadius: '2px',
                      pointerEvents: 'none',
                    }}
                  />

                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Circular Icon Badge */}
                    <div
                      style={{
                        width: isHero ? '54px' : '48px',
                        height: isHero ? '54px' : '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                        backgroundColor: isGold ? '#0F1015' : '#F9DF04',
                        border: isGold ? '2.5px solid #F9DF04' : '2.5px solid #FFFFFF',
                        boxShadow: isGold
                          ? '0 4px 14px rgba(0, 0, 0, 0.5), 0 0 12px rgba(249, 223, 4, 0.4)'
                          : '0 4px 14px rgba(0, 0, 0, 0.4), 0 0 16px rgba(249, 223, 4, 0.6)',
                        color: isGold ? '#F9DF04' : '#0F1015',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <IconComponent size={isHero ? 26 : 22} strokeWidth={2.2} />
                    </div>

                    {/* Big Stat Typography */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isHero
                          ? 'clamp(2.15rem, 2.8vw, 2.8rem)'
                          : 'clamp(1.85rem, 2.3vw, 2.3rem)',
                        fontWeight: 900,
                        color: isGold ? '#0F172A' : '#FFFFFF',
                        lineHeight: 1.02,
                        marginBottom: '8px',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {item.stat}
                    </div>

                    {/* Metric Title */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: isHero ? '0.88rem' : '0.80rem',
                        fontWeight: 900,
                        color: isGold ? '#0F172A' : '#F9DF04',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        lineHeight: 1.25,
                        marginBottom: '10px',
                        padding: '0 4px',
                      }}
                    >
                      {item.title}
                    </div>

                    {/* Description Paragraph */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: isHero ? '0.84rem' : '0.78rem',
                        color: isGold ? '#334155' : '#CBD5E1',
                        lineHeight: 1.45,
                        margin: 0,
                        fontWeight: isGold ? 550 : 450,
                        maxWidth: '220px',
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Floor Contact Shadow beneath each card */}
                  <div
                    style={{
                      width: '75%',
                      height: '6px',
                      background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, transparent 80%)',
                      borderRadius: '50%',
                      marginTop: '6px',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Scroll Cue matching Reference Image */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            paddingTop: '2px',
            pointerEvents: 'none',
          }}
        >
          {/* Left subtle gold rule */}
          <div
            style={{
              width: '42px',
              height: '1px',
              backgroundColor: 'rgba(249, 223, 4, 0.5)',
            }}
          />
          <Mouse size={14} color="#F9DF04" />
          <span>SCROLL TO EXPLORE PROVEN METRICS ({Math.round(scrollPercent * 100)}%)</span>
          {/* Right subtle gold rule */}
          <div
            style={{
              width: '42px',
              height: '1px',
              backgroundColor: 'rgba(249, 223, 4, 0.5)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Procedural Glowing Radial Sprite Texture for Three.js particles
 */
function createGlowSprite() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Vibrant Colorful 3D WebGL Background Component (Three.js)
 * Features:
 * - Undulating Chromatic Aurora Wave with dynamic rainbow vertex color spectrum
 * - 5 Floating Colorful 3D Light Orbs (Cyan, Magenta, Gold, Emerald, Pink) with planetary rings
 * - Multi-colored floating energy embers drifting through 3D space
 * - Interactive 3D mouse parallax
 * - Optimized 60 FPS loop paused when out of view
 */
export default function Renovan3DBackground({ mousePos, isVisible = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 21);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Dynamic Colorful Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(0, 15, 15);
    scene.add(mainLight);

    const particleTexture = createGlowSprite();

    // 3. Chromatic Undulating Wave with Rainbow Vertex Colors
    const cols = 80;
    const rows = 40;
    const pointCount = cols * rows;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const waveMeta = [];

    const tempColor = new THREE.Color();

    let pIdx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const u = (i / cols - 0.5) * 44;
        const v = (j / rows - 0.5) * 22;
        positions[pIdx * 3] = u;
        positions[pIdx * 3 + 1] = -4.5;
        positions[pIdx * 3 + 2] = v - 2;

        const normX = i / cols;
        const normZ = j / rows;
        // Initial vivid rainbow spectrum
        tempColor.setHSL((normX * 0.75 + normZ * 0.25) % 1.0, 1.0, 0.55);
        colors[pIdx * 3] = tempColor.r;
        colors[pIdx * 3 + 1] = tempColor.g;
        colors[pIdx * 3 + 2] = tempColor.b;

        waveMeta.push({ u, v: v - 2, normX, normZ });
        pIdx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    waveGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.52,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // 4. Floating Colorful 3D Glowing Orbs & Rings
    const orbs = [];
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const orbConfigs = [
      { color: 0x00f0ff, emissive: 0x0088cc, x: -11.5, y: 4.8, z: -3.5, size: 1.15, speed: 0.8, lightColor: 0x00f0ff },
      { color: 0xa855f7, emissive: 0x7c3aed, x: -9.0, y: -3.8, z: -2.0, size: 0.95, speed: 1.1, lightColor: 0xa855f7 },
      { color: 0xf9df04, emissive: 0xd97706, x: 10.5, y: 5.2, z: -3.0, size: 1.35, speed: 0.7, lightColor: 0xf9df04 },
      { color: 0x10b981, emissive: 0x059669, x: 12.0, y: -3.2, z: -2.5, size: 1.0, speed: 1.2, lightColor: 0x10b981 },
      { color: 0xec4899, emissive: 0xdb2777, x: 0.5, y: 6.8, z: -5.0, size: 0.85, speed: 0.9, lightColor: 0xec4899 },
    ];

    orbConfigs.forEach((cfg) => {
      const orbSubGroup = new THREE.Group();
      orbSubGroup.position.set(cfg.x, cfg.y, cfg.z);

      // Sphere
      const sphereGeo = new THREE.SphereGeometry(cfg.size, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 1.8,
        roughness: 0.15,
        metalness: 0.85,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      orbSubGroup.add(sphere);

      // Outer Halo Ring
      const ringGeo = new THREE.TorusGeometry(cfg.size * 1.55, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.75,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      orbSubGroup.add(ring);

      // Point Light
      const pointLight = new THREE.PointLight(cfg.lightColor, 3.2, 22);
      orbSubGroup.add(pointLight);

      orbGroup.add(orbSubGroup);
      orbs.push({ group: orbSubGroup, ring, baseY: cfg.y, speed: cfg.speed });
    });

    // 5. Multi-Color Floating Embers
    const emberCount = 180;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);
    const emberSpeeds = [];

    const palette = [
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xf9df04), // Yeloline Gold
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xff6b6b), // Coral
    ];

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 40;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const c = palette[Math.floor(Math.random() * palette.length)];
      emberColors[i * 3] = c.r;
      emberColors[i * 3 + 1] = c.g;
      emberColors[i * 3 + 2] = c.b;

      emberSpeeds.push({
        y: 0.008 + Math.random() * 0.015,
        x: (Math.random() - 0.5) * 0.006,
      });
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    emberGeo.setAttribute('color', new THREE.BufferAttribute(emberColors, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.44,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // 6. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Undulate Wave & Dynamic Rainbow Shifting
      const posArr = waveGeometry.attributes.position.array;
      const colArr = waveGeometry.attributes.color.array;

      for (let k = 0; k < pointCount; k++) {
        const meta = waveMeta[k];
        const elevation =
          Math.sin(meta.u * 0.28 + elapsed * 1.5) * 1.4 +
          Math.cos(meta.v * 0.32 + elapsed * 1.2) * 1.1 +
          Math.sin((meta.u + meta.v) * 0.2 + elapsed * 0.8) * 0.6;
        posArr[k * 3 + 1] = -4.5 + elevation;

        // Vivid dynamic rainbow color shift across time
        const hue = (meta.normX * 0.7 + meta.normZ * 0.25 + elapsed * 0.07) % 1.0;
        tempColor.setHSL(hue, 1.0, 0.58);
        colArr[k * 3] = tempColor.r;
        colArr[k * 3 + 1] = tempColor.g;
        colArr[k * 3 + 2] = tempColor.b;
      }
      waveGeometry.attributes.position.needsUpdate = true;
      waveGeometry.attributes.color.needsUpdate = true;

      // Animate Floating Orbs
      orbs.forEach((orb, idx) => {
        orb.group.position.y = orb.baseY + Math.sin(elapsed * orb.speed + idx) * 0.65;
        orb.ring.rotation.z = elapsed * 0.6 * (idx % 2 === 0 ? 1 : -1);
      });

      // Drift Embers
      const emberArr = emberGeo.attributes.position.array;
      for (let m = 0; m < emberCount; m++) {
        emberArr[m * 3 + 1] += emberSpeeds[m].y;
        emberArr[m * 3] += emberSpeeds[m].x;
        if (emberArr[m * 3 + 1] > 11) emberArr[m * 3 + 1] = -11;
        if (emberArr[m * 3] > 20) emberArr[m * 3] = -20;
        if (emberArr[m * 3] < -20) emberArr[m * 3] = 20;
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Smooth Mouse Parallax Camera Motion
      const currentMouse = mousePos?.current || { x: 0, y: 0 };
      const targetX = currentMouse.x * 2.5;
      const targetY = -currentMouse.y * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY + 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      particleTexture.dispose();
    };
  }, [isVisible]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
}

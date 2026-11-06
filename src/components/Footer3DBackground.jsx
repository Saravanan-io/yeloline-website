import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Procedural Glowing Stardust Particle Texture for Three.js
 */
function createStardustTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  gradient.addColorStop(0.2, 'rgba(255, 240, 60, 0.95)');
  gradient.addColorStop(0.5, 'rgba(249, 223, 4, 0.45)');
  gradient.addColorStop(0.8, 'rgba(234, 179, 8, 0.12)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural Yellow & Black Swallowtail Butterfly Wing Texture
 * Generated on canvas so it loads instantly with zero HTTP latency.
 */
function createButterflyWingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Root hinge at (460, 260)
  const root = { x: 460, y: 260 };

  // 1. Forewing Path (Top wing)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(root.x, root.y);
  ctx.bezierCurveTo(430, 190, 380, 120, 300, 50);
  ctx.bezierCurveTo(200, 20, 140, 25, 110, 25); // Apex
  ctx.bezierCurveTo(60, 55, 80, 110, 120, 170);
  ctx.bezierCurveTo(170, 220, 230, 265, 320, 285);
  ctx.closePath();

  // 2. Hindwing Path (Bottom wing with swallowtail tail)
  ctx.moveTo(root.x, root.y);
  ctx.bezierCurveTo(350, 290, 260, 310, 180, 330);
  ctx.bezierCurveTo(130, 360, 100, 400, 80, 440);
  ctx.bezierCurveTo(65, 480, 90, 470, 130, 460); // Tail
  ctx.bezierCurveTo(190, 445, 260, 430, 350, 410);
  ctx.bezierCurveTo(420, 370, 450, 320, root.x, root.y);
  ctx.closePath();

  // Vibrant Yeloline Yellow Gradient fill
  const grad = ctx.createRadialGradient(root.x, root.y, 40, root.x - 200, root.y, 420);
  grad.addColorStop(0, '#FFF544');
  grad.addColorStop(0.35, '#F9DF04');
  grad.addColorStop(0.75, '#FEDB04');
  grad.addColorStop(1, '#EAB308');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  // 3. Black Veins & Markings
  ctx.save();
  ctx.strokeStyle = '#111111';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const drawVein = (pts, width = 3) => {
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
  };

  // Forewing main radial veins
  drawVein([root, { x: 320, y: 160 }, { x: 200, y: 80 }, { x: 110, y: 25 }], 5);
  drawVein([{ x: 320, y: 160 }, { x: 190, y: 110 }, { x: 80, y: 75 }], 3.5);
  drawVein([{ x: 320, y: 160 }, { x: 180, y: 160 }, { x: 80, y: 110 }], 3);
  drawVein([{ x: 270, y: 210 }, { x: 170, y: 200 }, { x: 120, y: 170 }], 3);
  drawVein([{ x: 270, y: 210 }, { x: 200, y: 240 }, { x: 170, y: 220 }], 2.5);

  // Forewing Tiger Stripes
  drawVein([{ x: 400, y: 170 }, { x: 370, y: 110 }], 4);
  drawVein([{ x: 350, y: 200 }, { x: 310, y: 110 }], 4);
  drawVein([{ x: 300, y: 230 }, { x: 260, y: 130 }], 3.5);

  // Hindwing radial veins
  drawVein([root, { x: 320, y: 360 }, { x: 200, y: 390 }, { x: 100, y: 400 }], 4);
  drawVein([{ x: 320, y: 360 }, { x: 180, y: 420 }, { x: 65, y: 480 }], 4.5);
  drawVein([{ x: 320, y: 360 }, { x: 220, y: 430 }, { x: 130, y: 460 }], 3);
  drawVein([root, { x: 380, y: 360 }, { x: 280, y: 420 }, { x: 190, y: 445 }], 3);

  // Outer bold black border band
  ctx.lineWidth = 22;
  ctx.beginPath();
  ctx.moveTo(140, 25);
  ctx.lineTo(110, 25);
  ctx.lineTo(60, 55);
  ctx.lineTo(80, 110);
  ctx.lineTo(120, 170);
  ctx.lineTo(170, 220);
  ctx.lineTo(230, 265);
  ctx.stroke();

  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(180, 330);
  ctx.lineTo(130, 360);
  ctx.lineTo(100, 400);
  ctx.lineTo(80, 440);
  ctx.lineTo(65, 480);
  ctx.lineTo(90, 470);
  ctx.lineTo(130, 460);
  ctx.lineTo(190, 445);
  ctx.lineTo(260, 430);
  ctx.stroke();

  // Tiny jewel dots along the outer margin
  const spots = [
    [85, 45], [75, 75], [95, 125], [140, 185], [190, 235],
    [115, 385], [95, 420], [105, 465], [150, 455], [215, 440]
  ];
  ctx.fillStyle = '#FFFDE0';
  spots.forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Peacock blue accent dot near swallowtail notch
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(135, 395, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Footer3DBackground
 * Real-time Three.js 3D Yellow & Black Butterflies Flying Animation
 * with sparkling glowing stardust particle trails.
 */
export default function Footer3DBackground({ mousePos, isVisible = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 250;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5cc, 2.8);
    sunLight.position.set(10, 15, 12);
    scene.add(sunLight);

    const goldGlow = new THREE.PointLight(0xf9df04, 3.2, 30);
    goldGlow.position.set(0, 0, 6);
    scene.add(goldGlow);

    // 3. Load / Create Butterfly Wing Texture & Particle Sprite
    const wingTexture = createButterflyWingTexture();
    const stardustTexture = createStardustTexture();

    // 4. Construct Articulated 3D Butterfly Rig
    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.35,
    });

    const antennaMat = new THREE.LineBasicMaterial({
      color: 0x111111,
      linewidth: 1.5,
    });

    const wingMat = new THREE.MeshStandardMaterial({
      map: wingTexture,
      transparent: true,
      alphaTest: 0.04,
      side: THREE.DoubleSide,
      emissive: 0x665500,
      emissiveIntensity: 0.45,
      roughness: 0.35,
      metalness: 0.1,
    });

    // Master Wing Plane Geometry (Graceful, well-balanced wings)
    // Texture root is at (U = 0.898, V = 0.508)
    const wingW = 1.35;
    const wingH = 1.35;
    const masterWingGeo = new THREE.PlaneGeometry(wingW, wingH);
    // Shift geometry so the hinge root sits exactly at (0, 0, 0)
    masterWingGeo.translate(-wingW * 0.398, wingH * 0.008, 0);

    const createButterfly = (scale = 1.0) => {
      const bGroup = new THREE.Group();

      // Slender Segmented Body
      const bodyGroup = new THREE.Group();

      // Thorax + Abdomen
      const abdomenGeo = new THREE.CylinderGeometry(0.045, 0.025, 0.9, 10);
      const abdomen = new THREE.Mesh(abdomenGeo, bodyMat);
      abdomen.position.set(0, -0.2, 0);
      bodyGroup.add(abdomen);

      // Thorax / Chest
      const thoraxGeo = new THREE.SphereGeometry(0.075, 12, 12);
      thoraxGeo.scale(0.8, 1.2, 0.8);
      const thorax = new THREE.Mesh(thoraxGeo, bodyMat);
      thorax.position.set(0, 0.22, 0);
      bodyGroup.add(thorax);

      // Head
      const headGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const head = new THREE.Mesh(headGeo, bodyMat);
      head.position.set(0, 0.35, 0);
      bodyGroup.add(head);

      // Antennae
      const leftAntennaPts = [
        new THREE.Vector3(0, 0.35, 0),
        new THREE.Vector3(-0.08, 0.48, 0.04),
        new THREE.Vector3(-0.16, 0.56, 0.08),
      ];
      const leftAntennaGeo = new THREE.BufferGeometry().setFromPoints(leftAntennaPts);
      const leftAntenna = new THREE.Line(leftAntennaGeo, antennaMat);
      bodyGroup.add(leftAntenna);

      const rightAntennaPts = [
        new THREE.Vector3(0, 0.35, 0),
        new THREE.Vector3(0.08, 0.48, 0.04),
        new THREE.Vector3(0.16, 0.56, 0.08),
      ];
      const rightAntennaGeo = new THREE.BufferGeometry().setFromPoints(rightAntennaPts);
      const rightAntenna = new THREE.Line(rightAntennaGeo, antennaMat);
      bodyGroup.add(rightAntenna);

      bGroup.add(bodyGroup);

      // Left Wing Pivot (Flaps around Y axis)
      const leftWingPivot = new THREE.Group();
      leftWingPivot.position.set(-0.035, 0.08, 0.015);

      const leftWingMesh = new THREE.Mesh(masterWingGeo, wingMat);
      leftWingPivot.add(leftWingMesh);
      bGroup.add(leftWingPivot);

      // Right Wing Pivot (Mirrored scale along X, flaps symmetrically)
      const rightWingPivot = new THREE.Group();
      rightWingPivot.position.set(0.035, 0.08, 0.015);
      rightWingPivot.scale.set(-1, 1, 1);

      const rightWingMesh = new THREE.Mesh(masterWingGeo, wingMat);
      rightWingPivot.add(rightWingMesh);
      bGroup.add(rightWingPivot);

      bGroup.scale.set(scale, scale, scale);
      scene.add(bGroup);

      return {
        group: bGroup,
        leftPivot: leftWingPivot,
        rightPivot: rightWingPivot,
        scale,
      };
    };

    // 5. Spawn Multiple 3D Butterflies across the Footer
    const butterflies = [];
    const butterflyCount = 12;

    for (let i = 0; i < butterflyCount; i++) {
      // Balanced scale: clearly visible and delicate without overpowering text
      const scale = 0.45 + Math.random() * 0.35;
      const bObj = createButterfly(scale);

      butterflies.push({
        ...bObj,
        // 3D Position
        x: (Math.random() - 0.5) * 26,
        y: -3.2 + Math.random() * 6.4,
        z: (Math.random() - 0.5) * 5.0 - 0.5,
        // Flight path physics & rhythm
        speed: 0.016 + Math.random() * 0.024,
        flapSpeed: 14 + Math.random() * 8, // Smooth natural flutter
        flapPhase: Math.random() * Math.PI * 2,
        bobSpeed: 3 + Math.random() * 2,
        waveXFreq: 0.6 + Math.random() * 0.8,
        waveZFreq: 0.4 + Math.random() * 0.6,
        curveSeed: Math.random() * 100,
        // Heading & banking
        pitch: 0,
        roll: 0,
        yaw: 0,
        // Particle trail tracking
        trailIdx: i,
      });
    }

    // 6. Glowing Stardust Particle Trails (Like the Reference Video!)
    // 24 trailing stardust particles per butterfly
    const particlesPerButterfly = 24;
    const totalTrailParticles = butterflyCount * particlesPerButterfly;

    const trailPositions = new Float32Array(totalTrailParticles * 3);
    const trailColors = new Float32Array(totalTrailParticles * 3);
    const trailData = [];

    const brightGold = new THREE.Color(0xfffa80);
    const yeloGold = new THREE.Color(0xf9df04);
    const warmAmber = new THREE.Color(0xeab308);

    for (let b = 0; b < butterflyCount; b++) {
      for (let p = 0; p < particlesPerButterfly; p++) {
        const idx = b * particlesPerButterfly + p;
        trailPositions[idx * 3] = 0;
        trailPositions[idx * 3 + 1] = -999; // Start offscreen
        trailPositions[idx * 3 + 2] = 0;

        // Subtle gradient color among particles
        const col = p % 3 === 0 ? brightGold : p % 2 === 0 ? yeloGold : warmAmber;
        trailColors[idx * 3] = col.r;
        trailColors[idx * 3 + 1] = col.g;
        trailColors[idx * 3 + 2] = col.b;

        trailData.push({
          bIdx: b,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          vx: (Math.random() - 0.5) * 0.01,
          vy: -0.012 - Math.random() * 0.015, // Gently float downwards
          vz: (Math.random() - 0.5) * 0.01,
          wobbleSpeed: 2 + Math.random() * 3,
        });
      }
    }

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    const trailMaterial = new THREE.PointsMaterial({
      size: 0.38,
      map: stardustTexture,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const trailPoints = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trailPoints);

    // 7. Ambient Floating Sparkles (Fairy Dust Atmosphere)
    const ambientSparkleCount = 42;
    const sparklePositions = new Float32Array(ambientSparkleCount * 3);
    const sparkleVelocities = [];

    for (let s = 0; s < ambientSparkleCount; s++) {
      sparklePositions[s * 3] = (Math.random() - 0.5) * 32;
      sparklePositions[s * 3 + 1] = (Math.random() - 0.5) * 6;
      sparklePositions[s * 3 + 2] = (Math.random() - 0.5) * 6;

      sparkleVelocities.push({
        vx: (Math.random() - 0.5) * 0.005,
        vy: 0.004 + Math.random() * 0.01,
        vz: (Math.random() - 0.5) * 0.005,
        pulseSpeed: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const sparkleGeometry = new THREE.BufferGeometry();
    sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));

    const sparkleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      map: stardustTexture,
      color: 0xf9df04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const ambientSparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(ambientSparkles);

    // 8. 60 FPS Animation & 3D Flight Simulation Loop
    let animId;
    let spawnTimer = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = clock.getElapsedTime();
      spawnTimer++;

      // Mouse Parallax Coordinates
      const currentMouse = mousePos?.current || { x: 0, y: 0 };
      const mouseWorldX = currentMouse.x * 12;
      const mouseWorldY = -currentMouse.y * 3;

      // Update Butterflies
      butterflies.forEach((b, bIdx) => {
        // Natural Flapping Motion: Wing swing between folded up (~0.85 rad) and flat (-0.25 rad)
        const flapSin = Math.sin(elapsed * b.flapSpeed + b.flapPhase);
        const flapAngle = 0.35 + flapSin * 0.65;
        b.leftPivot.rotation.y = flapAngle;
        b.rightPivot.rotation.y = -flapAngle;

        // Dynamic 3D Flight Path (Ascending and meandering across the footer)
        const prevX = b.x;
        const prevY = b.y;
        const prevZ = b.z;

        // Upward flight + horizontal meandering waves
        b.y += b.speed * 1.35;
        b.x += Math.sin(elapsed * b.waveXFreq + b.curveSeed) * 0.024 + 0.008;
        b.z += Math.cos(elapsed * b.waveZFreq + b.curveSeed) * 0.018;

        // Vertical bobbing synchronized with downstroke
        const bob = Math.abs(flapSin) * 0.08 * b.scale;
        const currentY = b.y + bob;

        // Gentle interactive avoidance/attraction to cursor
        const dx = mouseWorldX - b.x;
        const dy = mouseWorldY - currentY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < 4.0 && distToMouse > 0.1) {
          // Softly steer around cursor
          b.x -= (dx / distToMouse) * 0.025;
          b.y += 0.015;
        }

        // Apply updated position
        b.group.position.set(b.x, currentY, b.z);

        // Compute 3D Heading & Bank into turns
        const moveDx = b.x - prevX;
        const moveDy = currentY - prevY;
        const moveDz = b.z - prevZ;

        // Roll into horizontal turn
        const targetRoll = -moveDx * 18;
        // Pitch upward in direction of flight
        const targetPitch = Math.atan2(moveDz, Math.sqrt(moveDx * moveDx + moveDy * moveDy));
        // Yaw turning toward motion
        const targetYaw = Math.atan2(moveDx, moveDy);

        b.group.rotation.z = -targetYaw;
        b.group.rotation.x = targetPitch * 0.6;
        b.group.rotation.y = targetRoll * 0.5;

        // Screen Boundary Wrapping: Seamless continuous flight
        // If butterfly flies above top (+3.8), respawn at bottom with new path
        if (b.y > 3.8) {
          b.y = -3.8;
          b.x = (Math.random() - 0.5) * 28;
          b.z = (Math.random() - 0.5) * 4.5;
          b.curveSeed = Math.random() * 100;
        }
        // Wrap horizontal edges
        if (b.x > 18) b.x = -18;
        if (b.x < -18) b.x = 18;

        // Emit glowing stardust particles at the butterfly's tail
        if (spawnTimer % 2 === 0) {
          const startParticleIdx = bIdx * particlesPerButterfly;
          // Find an inactive particle in this butterfly's pool
          for (let p = 0; p < particlesPerButterfly; p++) {
            const pIdx = startParticleIdx + p;
            const pData = trailData[pIdx];
            if (pData.life <= 0) {
              pData.life = pData.maxLife;
              // Tail emitter position
              trailPositions[pIdx * 3] = b.x + (Math.random() - 0.5) * 0.05;
              trailPositions[pIdx * 3 + 1] = currentY - 0.14 * b.scale;
              trailPositions[pIdx * 3 + 2] = b.z + (Math.random() - 0.5) * 0.05;
              break;
            }
          }
        }
      });

      // Update Glowing Stardust Particle Trails
      const trailPosArr = trailGeometry.attributes.position.array;
      for (let t = 0; t < totalTrailParticles; t++) {
        const pData = trailData[t];
        if (pData.life > 0) {
          pData.life--;
          // Particles gently flutter down like glowing embers
          trailPosArr[t * 3] += pData.vx + Math.sin(elapsed * pData.wobbleSpeed + t) * 0.003;
          trailPosArr[t * 3 + 1] += pData.vy;
          trailPosArr[t * 3 + 2] += pData.vz;
        } else {
          // Hide dead particle offscreen
          trailPosArr[t * 3 + 1] = -999;
        }
      }
      trailGeometry.attributes.position.needsUpdate = true;

      // Update Ambient Floating Sparkles
      const sparklePosArr = sparkleGeometry.attributes.position.array;
      for (let s = 0; s < ambientSparkleCount; s++) {
        const sVel = sparkleVelocities[s];
        sparklePosArr[s * 3] += sVel.vx + Math.sin(elapsed * 1.5 + sVel.phase) * 0.002;
        sparklePosArr[s * 3 + 1] += sVel.vy;
        sparklePosArr[s * 3 + 2] += sVel.vz;

        // Respawn at bottom when floating above screen
        if (sparklePosArr[s * 3 + 1] > 3.6) {
          sparklePosArr[s * 3 + 1] = -3.5;
          sparklePosArr[s * 3] = (Math.random() - 0.5) * 32;
        }
      }
      sparkleGeometry.attributes.position.needsUpdate = true;

      // Smooth Camera Parallax Response
      const targetCamX = currentMouse.x * 1.8;
      const targetCamY = -currentMouse.y * 0.8;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 250;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      wingTexture.dispose();
      stardustTexture.dispose();
      masterWingGeo.dispose();
      wingMat.dispose();
      bodyMat.dispose();
      antennaMat.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      sparkleGeometry.dispose();
      sparkleMaterial.dispose();
    };
  }, [isVisible]);

  return (
    <div
      ref={mountRef}
      className="yeloline-footer-3d-canvas"
      aria-hidden="true"
    />
  );
}

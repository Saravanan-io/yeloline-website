import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * FlyingBirds3D
 * Realistic 3D Birds Flight Animation crossing from the RIGHT edge of the screen
 * to the LEFT edge of the screen across the top sky region of Yeloline.
 * Features articulated wing flapping, aerodynamic gliding, natural V-formation flocking,
 * and seamless continuous flight wrapping.
 */
export default function FlyingBirds3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 0, 160);
    camera.lookAt(0, 0, 0);

    // Compute half-visible width in world space at z = 0
    const getVisibleBounds = () => {
      const aspect = width / height;
      const vHalfHeight = Math.tan((camera.fov / 2) * (Math.PI / 180)) * camera.position.z;
      const vHalfWidth = vHalfHeight * aspect;
      return { halfW: vHalfWidth, halfH: vHalfHeight };
    };

    let bounds = getVisibleBounds();

    // 2. WebGL Renderer with Transparent Background
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // 3. Directional Sunlight & Ambient Sky Illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8e7, 1.3);
    sunLight.position.set(100, 140, 80);
    scene.add(sunLight);

    // 4. Create Articulated 3D Bird Rig
    const createBird = (scale = 1.0, colorHex = 0x1e293b) => {
      const birdGroup = new THREE.Group();

      const birdMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.42,
        metalness: 0.12,
        side: THREE.DoubleSide,
      });

      // Streamlined aerodynamic body
      const bodyGeo = new THREE.ConeGeometry(0.42, 2.8, 5);
      bodyGeo.rotateX(Math.PI / 2); // Point forward along local +Z
      const bodyMesh = new THREE.Mesh(bodyGeo, birdMat);
      bodyMesh.scale.set(0.65, 0.4, 1.0);
      birdGroup.add(bodyMesh);

      // Tail feathers fan
      const tailGeo = new THREE.BufferGeometry();
      const tailVerts = new Float32Array([
        0, 0.02, -1.0,
        -0.55, 0.05, -2.2,
        0.55, 0.05, -2.2,
      ]);
      tailGeo.setAttribute('position', new THREE.BufferAttribute(tailVerts, 3));
      tailGeo.computeVertexNormals();
      const tailMesh = new THREE.Mesh(tailGeo, birdMat);
      birdGroup.add(tailMesh);

      // Left Wing Joint (Inner + Outer)
      const leftWing = new THREE.Group();
      leftWing.position.set(-0.2, 0.06, 0.15);

      const innerLeftGeo = new THREE.BufferGeometry();
      const innerLeftVerts = new Float32Array([
        0, 0, 0.35,
        -1.35, 0.04, 0.08,
        -1.15, 0, -0.45,
        0, 0, -0.35,
      ]);
      innerLeftGeo.setAttribute('position', new THREE.BufferAttribute(innerLeftVerts, 3));
      innerLeftGeo.setIndex([0, 1, 2, 0, 2, 3]);
      innerLeftGeo.computeVertexNormals();
      const innerLeftMesh = new THREE.Mesh(innerLeftGeo, birdMat);
      leftWing.add(innerLeftMesh);

      const leftElbow = new THREE.Group();
      leftElbow.position.set(-1.3, 0.02, 0.0);

      const outerLeftGeo = new THREE.BufferGeometry();
      const outerLeftVerts = new Float32Array([
        0, 0, 0.18,
        -1.75, -0.02, -0.28,
        0, 0, -0.45,
      ]);
      outerLeftGeo.setAttribute('position', new THREE.BufferAttribute(outerLeftVerts, 3));
      outerLeftGeo.computeVertexNormals();
      const outerLeftMesh = new THREE.Mesh(outerLeftGeo, birdMat);
      leftElbow.add(outerLeftMesh);
      leftWing.add(leftElbow);
      birdGroup.add(leftWing);

      // Right Wing Joint (Inner + Outer)
      const rightWing = new THREE.Group();
      rightWing.position.set(0.2, 0.06, 0.15);

      const innerRightGeo = new THREE.BufferGeometry();
      const innerRightVerts = new Float32Array([
        0, 0, 0.35,
        1.35, 0.04, 0.08,
        1.15, 0, -0.45,
        0, 0, -0.35,
      ]);
      innerRightGeo.setAttribute('position', new THREE.BufferAttribute(innerRightVerts, 3));
      innerRightGeo.setIndex([0, 2, 1, 0, 3, 2]);
      innerRightGeo.computeVertexNormals();
      const innerRightMesh = new THREE.Mesh(innerRightGeo, birdMat);
      rightWing.add(innerRightMesh);

      const rightElbow = new THREE.Group();
      rightElbow.position.set(1.3, 0.02, 0.0);

      const outerRightGeo = new THREE.BufferGeometry();
      const outerRightVerts = new Float32Array([
        0, 0, 0.18,
        1.75, -0.02, -0.28,
        0, 0, -0.45,
      ]);
      outerRightGeo.setAttribute('position', new THREE.BufferAttribute(outerRightVerts, 3));
      outerRightGeo.computeVertexNormals();
      const outerRightMesh = new THREE.Mesh(outerRightGeo, birdMat);
      rightElbow.add(outerRightMesh);
      rightWing.add(rightElbow);
      birdGroup.add(rightWing);

      birdGroup.scale.set(scale, scale, scale);
      scene.add(birdGroup);

      return {
        group: birdGroup,
        leftWing,
        leftElbow,
        rightWing,
        rightElbow,
      };
    };

    // 5. Flock Formation Specifications (V-Formation flying towards LEFT)
    // Positive offsetX places trailing birds behind the leader (to the right)
    const flockData = [
      // 1. Lead Bird (Front-most towards the left)
      { scale: 2.2, offsetX: 0, offsetY: 0, offsetZ: 0, phase: 0.0 },
      // 2. Upper Right Wingman
      { scale: 1.95, offsetX: 16, offsetY: 4, offsetZ: -12, phase: 0.65 },
      // 3. Lower Right Wingman
      { scale: 1.90, offsetX: 18, offsetY: -3.5, offsetZ: 10, phase: 1.15 },
      // 4. Upper Outer Wingman
      { scale: 1.75, offsetX: 32, offsetY: 7, offsetZ: -22, phase: 1.85 },
      // 5. Lower Outer Wingman
      { scale: 1.70, offsetX: 36, offsetY: -6, offsetZ: 18, phase: 2.45 },
      // 6. High-Altitude Soaring Bird (Trailing in deep background)
      { scale: 1.35, offsetX: 62, offsetY: 16, offsetZ: -45, phase: 3.2 },
      // 7. Trailing Rear Wingman
      { scale: 1.55, offsetX: 75, offsetY: 2, offsetZ: -6, phase: 3.8 },
    ];

    const birds = flockData.map((d) => {
      const birdRig = createBird(d.scale);
      return {
        ...birdRig,
        spec: d,
        flapCycle: d.phase,
        isGliding: false,
        glideTimer: 110 + Math.random() * 120,
        flapTimer: 130 + Math.random() * 100,
        currentFlapAmp: 0.46,
        targetFlapAmp: 0.46,
      };
    });

    // 6. Right-to-Left Flight Motion State
    // Start midway across screen so birds are visible immediately on load
    let flockWorldX = bounds.halfW * 0.25;
    let baseAltitudeY = 16; // Upper sky region
    let baseDepthZ = -10;
    const cruiseSpeed = 0.42; // Smooth, majestic cruising speed from Right to Left

    let animationFrameId;
    let time = 0;

    // 7. Render & Flight Physics Loop
    const animate = () => {
      time += 0.016;

      // Move flock from RIGHT to LEFT (decreasing X)
      flockWorldX -= cruiseSpeed;

      // Max offset in flock
      const maxOffset = 80;

      // When the entire flock exits past the LEFT edge of screen:
      if (flockWorldX < -bounds.halfW - maxOffset) {
        // Reset to beyond the RIGHT edge of the screen
        flockWorldX = bounds.halfW + 40;
        // Subtle altitude & depth variety on each continuous pass
        baseAltitudeY = 14 + (Math.random() - 0.5) * 8;
        baseDepthZ = -10 + (Math.random() - 0.5) * 15;
      }

      // Gentle undulating atmospheric wave as flock soars
      const waveY = Math.sin(time * 0.9) * 2.5;
      const waveVy = Math.cos(time * 0.9) * 0.038;

      // Heading: strictly pointing towards LEFT (-X axis)
      // Velocity vector: vx = -cruiseSpeed, vy = waveVy, vz = 0
      const heading = Math.atan2(-cruiseSpeed, 0); // Exactly -Math.PI / 2 (-90 deg, facing left)
      const pitch = -Math.asin(waveVy / cruiseSpeed); // Gentle climb/dive pitch
      const roll = waveVy * 3.5; // Natural subtle banking into atmospheric wave

      // Update each bird in the flock
      birds.forEach((bird) => {
        // Position each bird relative to the flock center
        const birdX = flockWorldX + bird.spec.offsetX;
        const birdY = baseAltitudeY + bird.spec.offsetY + waveY;
        const birdZ = baseDepthZ + bird.spec.offsetZ;

        // Realistic body heave on downstroke (aerodynamic lift)
        const heave = Math.sin(bird.flapCycle) * (bird.isGliding ? 0.04 : 0.35);

        bird.group.position.set(birdX, birdY + heave, birdZ);

        // Orient bird facing towards the LEFT
        bird.group.rotation.y = heading;
        bird.group.rotation.x = pitch;
        bird.group.rotation.z = roll;

        // Flapping vs Gliding State Machine
        if (bird.isGliding) {
          bird.glideTimer--;
          bird.targetFlapAmp = 0.06; // Gentle positive dihedral wings during glide
          if (bird.glideTimer <= 0) {
            bird.isGliding = false;
            bird.flapTimer = 110 + Math.random() * 120; // Flap for ~2 seconds
          }
        } else {
          bird.flapTimer--;
          bird.targetFlapAmp = 0.48; // Full powerful wing stroke
          if (bird.flapTimer <= 0) {
            bird.isGliding = true;
            bird.glideTimer = 130 + Math.random() * 140; // Glide peacefully for ~3-4 seconds
          }
        }

        // Smoothly blend flap amplitude
        bird.currentFlapAmp += (bird.targetFlapAmp - bird.currentFlapAmp) * 0.08;

        // Advance wing flap cycle
        const flapRate = bird.isGliding ? 0.045 : 0.22;
        bird.flapCycle += flapRate;

        // Aerodynamic wing flexion (downstroke vs upstroke lag)
        const isDownstroke = Math.cos(bird.flapCycle) > 0;
        const flexLag = isDownstroke ? 0.32 : 0.62;
        const shoulderAngle = Math.sin(bird.flapCycle) * bird.currentFlapAmp;
        const elbowAngle = Math.sin(bird.flapCycle - flexLag) * (bird.currentFlapAmp * 0.75);

        // Animate left wing
        bird.leftWing.rotation.z = -shoulderAngle;
        bird.leftElbow.rotation.z = -elbowAngle;
        bird.leftWing.rotation.x = shoulderAngle * 0.14; // Aerodynamic wing twist

        // Animate right wing (mirrored)
        bird.rightWing.rotation.z = shoulderAngle;
        bird.rightElbow.rotation.z = elbowAngle;
        bird.rightWing.rotation.x = -shoulderAngle * 0.14;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 360;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      bounds = getVisibleBounds();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '380px',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    />
  );
}

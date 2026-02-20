"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface ServiceSceneProps {
  scene: "cinematography" | "animation" | "direction" | "capture";
  className?: string;
}

/* ================================================================== */
/*  Shared: Mouse Parallax Group                                       */
/* ================================================================== */

function MouseParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    },
    [size]
  );

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () =>
      window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = mouse.current.y * 0.06;
    const targetY = mouse.current.x * 0.06;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.03
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.03
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ================================================================== */
/*  SCENE 1: CINEMATOGRAPHY - Virtual World Viewport                   */
/* ================================================================== */

function CinematographyTerrain() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const { geometry, basePositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 40, 40);
    geo.rotateX(-Math.PI / 2);
    const posAttr = geo.attributes.position;
    const base = new Float32Array(posAttr.array.length);
    base.set(posAttr.array as Float32Array);
    return { geometry: geo, basePositions: base };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.elapsedTime;
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < posAttr.count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const bz = basePositions[i3 + 2];

      // Two overlapping sine waves for gentle displacement
      const wave1 = Math.sin(bx * 0.4 + time * 0.3) * Math.cos(bz * 0.3 + time * 0.2) * 0.8;
      const wave2 = Math.sin(bx * 0.2 - time * 0.15 + bz * 0.25) * 0.5;

      arr[i3 + 1] = basePositions[i3 + 1] + wave1 + wave2;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -2, 0]}>
      <meshBasicMaterial
        color="#6366F1"
        wireframe
        transparent
        opacity={0.25}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CinematographyCameraPath() {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const progressRef = useRef(0);

  // Generate a smooth bezier-like camera path with 40 points
  const pathPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const numPoints = 40;
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);
      // Sweep from left to right, rising and dipping
      const x = THREE.MathUtils.lerp(-6, 6, t);
      const y = -0.5 + Math.sin(t * Math.PI * 2.5) * 1.2 + Math.cos(t * Math.PI * 1.3) * 0.6;
      const z = Math.sin(t * Math.PI * 1.8) * 2.5;
      points.push([x, y, z]);
    }
    return points;
  }, []);

  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    // Animate the sphere along the path
    const speed = 0.08;
    progressRef.current = (clock.elapsedTime * speed) % 1;
    const idx = progressRef.current * (pathPoints.length - 1);
    const i = Math.floor(idx);
    const frac = idx - i;
    const p1 = pathPoints[Math.min(i, pathPoints.length - 1)];
    const p2 = pathPoints[Math.min(i + 1, pathPoints.length - 1)];

    sphereRef.current.position.x = THREE.MathUtils.lerp(p1[0], p2[0], frac);
    sphereRef.current.position.y = THREE.MathUtils.lerp(p1[1], p2[1], frac);
    sphereRef.current.position.z = THREE.MathUtils.lerp(p1[2], p2[2], frac);
  });

  return (
    <>
      <Line
        points={pathPoints}
        color="#F97316"
        lineWidth={1.5}
        transparent
        opacity={0.8}
      />
      {/* Camera sphere traveling the path */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial
          color="#F97316"
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function CinematographyGlowTrail() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const progressRef = useRef(0);

  const pathPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const numPoints = 40;
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);
      const x = THREE.MathUtils.lerp(-6, 6, t);
      const y = -0.5 + Math.sin(t * Math.PI * 2.5) * 1.2 + Math.cos(t * Math.PI * 1.3) * 0.6;
      const z = Math.sin(t * Math.PI * 1.8) * 2.5;
      points.push([x, y, z]);
    }
    return points;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const speed = 0.08;
    progressRef.current = (clock.elapsedTime * speed) % 1;
    const idx = progressRef.current * (pathPoints.length - 1);
    const i = Math.floor(idx);
    const frac = idx - i;
    const p1 = pathPoints[Math.min(i, pathPoints.length - 1)];
    const p2 = pathPoints[Math.min(i + 1, pathPoints.length - 1)];

    meshRef.current.position.x = THREE.MathUtils.lerp(p1[0], p2[0], frac);
    meshRef.current.position.y = THREE.MathUtils.lerp(p1[1], p2[1], frac);
    meshRef.current.position.z = THREE.MathUtils.lerp(p1[2], p2[2], frac);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial
        color="#F97316"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function CinematographyViewportFrame() {
  // Rectangular viewport frame around the scene
  const w = 7.5;
  const h = 4.5;
  const z = -1;

  // Crosshair size at corners
  const cs = 0.3;

  const frameLines: [number, number, number][][] = [
    // Top
    [[-w, h, z], [w, h, z]],
    // Bottom
    [[-w, -h, z], [w, -h, z]],
    // Left
    [[-w, -h, z], [-w, h, z]],
    // Right
    [[w, -h, z], [w, h, z]],
  ];

  // Crosshairs at corners
  const crosshairs: [number, number, number][][] = [
    // Top-left
    [[-w - cs, h, z], [-w + cs, h, z]],
    [[-w, h - cs, z], [-w, h + cs, z]],
    // Top-right
    [[w - cs, h, z], [w + cs, h, z]],
    [[w, h - cs, z], [w, h + cs, z]],
    // Bottom-left
    [[-w - cs, -h, z], [-w + cs, -h, z]],
    [[-w, -h - cs, z], [-w, -h + cs, z]],
    // Bottom-right
    [[w - cs, -h, z], [w + cs, -h, z]],
    [[w, -h - cs, z], [w, -h + cs, z]],
  ];

  return (
    <>
      {frameLines.map((pts, i) => (
        <Line
          key={`frame-${i}`}
          points={pts}
          color="#ffffff"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
      {crosshairs.map((pts, i) => (
        <Line
          key={`cross-${i}`}
          points={pts}
          color="#ffffff"
          lineWidth={0.8}
          transparent
          opacity={0.15}
        />
      ))}
    </>
  );
}

function CinematographyGridOverlay() {
  const z = -1;
  const w = 7.5;
  const h = 4.5;

  // A few vertical and horizontal reference lines
  const lines: [number, number, number][][] = [
    // Vertical lines
    [[-2.5, -h, z], [-2.5, h, z]],
    [[0, -h, z], [0, h, z]],
    [[2.5, -h, z], [2.5, h, z]],
    // Horizontal lines
    [[-w, -1.5, z], [w, -1.5, z]],
    [[-w, 0, z], [w, 0, z]],
    [[-w, 1.5, z], [w, 1.5, z]],
  ];

  return (
    <>
      {lines.map((pts, i) => (
        <Line
          key={`grid-${i}`}
          points={pts}
          color="#ffffff"
          lineWidth={0.3}
          transparent
          opacity={0.05}
        />
      ))}
    </>
  );
}

function CinematographyScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <MouseParallaxGroup>
        <CinematographyTerrain />
        <CinematographyCameraPath />
        <CinematographyGlowTrail />
        <CinematographyViewportFrame />
        <CinematographyGridOverlay />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  SCENE 2: ANIMATION - 3D Product Stage                              */
/* ================================================================== */

function AnimationProduct() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Main body - box representing a product/bottle body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.8, 0.8]} />
        <meshBasicMaterial
          color="#6366F1"
          wireframe
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>
      {/* Cap/nozzle on top */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.5, 12]} />
        <meshBasicMaterial
          color="#6366F1"
          wireframe
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function AnimationMeasurementLines() {
  // Vertical measurement line on the left
  const topY = 0.2 + 1.4; // product offset + half body + cap top
  const bottomY = 0.2 - 0.9; // product offset - half body

  const verticalLine: [number, number, number][] = [
    [-1.2, bottomY, 0],
    [-1.2, topY, 0],
  ];
  const vertTickTop: [number, number, number][] = [
    [-1.35, topY, 0],
    [-1.05, topY, 0],
  ];
  const vertTickBottom: [number, number, number][] = [
    [-1.35, bottomY, 0],
    [-1.05, bottomY, 0],
  ];

  // Horizontal measurement line below
  const leftX = -0.6;
  const rightX = 0.6;
  const horizY = bottomY - 0.3;

  const horizontalLine: [number, number, number][] = [
    [leftX, horizY, 0],
    [rightX, horizY, 0],
  ];
  const horizTickLeft: [number, number, number][] = [
    [leftX, horizY - 0.15, 0],
    [leftX, horizY + 0.15, 0],
  ];
  const horizTickRight: [number, number, number][] = [
    [rightX, horizY - 0.15, 0],
    [rightX, horizY + 0.15, 0],
  ];

  return (
    <>
      <Line points={verticalLine} color="#F97316" lineWidth={1} transparent opacity={0.4} />
      <Line points={vertTickTop} color="#F97316" lineWidth={1} transparent opacity={0.4} />
      <Line points={vertTickBottom} color="#F97316" lineWidth={1} transparent opacity={0.4} />
      <Line points={horizontalLine} color="#F97316" lineWidth={1} transparent opacity={0.4} />
      <Line points={horizTickLeft} color="#F97316" lineWidth={1} transparent opacity={0.4} />
      <Line points={horizTickRight} color="#F97316" lineWidth={1} transparent opacity={0.4} />
    </>
  );
}

function AnimationOrbitRing() {
  return (
    <mesh position={[0, 0.4, 0]} rotation={[Math.PI * 0.35, 0, Math.PI * 0.1]}>
      <torusGeometry args={[2.2, 0.005, 8, 64]} />
      <meshBasicMaterial
        color="#6366F1"
        wireframe
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </mesh>
  );
}

function AnimationGridFloor() {
  return (
    <mesh position={[0, -0.9, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[6, 6, 15, 15]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

function AnimationFloatingPoints() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 10;

  const { positions, colors, angles, radii, speeds, yOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);
    const spd = new Float32Array(count);
    const yOff = new Float32Array(count);

    const indigoColor = new THREE.Color("#6366F1");
    const coralColor = new THREE.Color("#F97316");

    for (let i = 0; i < count; i++) {
      ang[i] = Math.random() * Math.PI * 2;
      rad[i] = 1.5 + Math.random() * 1.0;
      spd[i] = 0.2 + Math.random() * 0.4;
      yOff[i] = (Math.random() - 0.5) * 2.0;

      const c = Math.random() > 0.5 ? indigoColor : coralColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col, angles: ang, radii: rad, speeds: spd, yOffsets: yOff };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const angle = angles[i] + t * speeds[i];
      arr[i * 3] = Math.cos(angle) * radii[i];
      arr[i * 3 + 1] = yOffsets[i] + Math.sin(t * 0.5 + angles[i]) * 0.3 + 0.2;
      arr[i * 3 + 2] = Math.sin(angle) * radii[i];
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function AnimationScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <MouseParallaxGroup>
        <AnimationProduct />
        <AnimationMeasurementLines />
        <AnimationOrbitRing />
        <AnimationGridFloor />
        <AnimationFloatingPoints />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  SCENE 3: DIRECTION - Multi-Channel Content Flow                    */
/* ================================================================== */

function DirectionCentralFrame() {
  const w = 1.5 / 2;
  const h = 1.0 / 2;

  const framePoints: [number, number, number][] = [
    [-w, -h, 0],
    [w, -h, 0],
    [w, h, 0],
    [-w, h, 0],
    [-w, -h, 0],
  ];

  return (
    <group position={[-1.5, 0, 0]}>
      <Line
        points={framePoints}
        color="#6366F1"
        lineWidth={2.5}
        transparent
        opacity={0.9}
      />
      {/* Inner glow plane */}
      <mesh>
        <planeGeometry args={[1.5, 1.0]} />
        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.04}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function DirectionOutputFrame({
  position,
  width,
  height,
  color,
  phaseOffset,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  color: string;
  phaseOffset: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const w = width / 2;
  const h = height / 2;

  const framePoints: [number, number, number][] = [
    [-w, -h, 0],
    [w, -h, 0],
    [w, h, 0],
    [-w, h, 0],
    [-w, -h, 0],
  ];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.8 + phaseOffset) * 0.15;
  });

  return (
    <group ref={groupRef} position={position}>
      <Line
        points={framePoints}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0.7}
      />
      {/* Subtle fill */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.03}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function DirectionParticleStreams() {
  const pointsRef = useRef<THREE.Points>(null!);
  const particlesPerStream = 18;
  const streamCount = 3;
  const count = particlesPerStream * streamCount;

  // Targets for the 3 output frames
  const targets: [number, number, number][] = [
    [2.0, 1.2, 0],   // top-right (mobile)
    [2.2, 0.0, 0],   // middle-right (social)
    [2.0, -1.2, 0],  // bottom-right (cinema)
  ];
  const source: [number, number, number] = [-1.5, 0, 0]; // central frame

  // Per-particle progress values
  const progressRef = useRef<Float32Array>(new Float32Array(count));
  const speedsRef = useRef<Float32Array>(new Float32Array(count));

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const indigoColor = new THREE.Color("#6366F1");

    for (let i = 0; i < count; i++) {
      // Random initial progress
      progressRef.current[i] = Math.random();
      speedsRef.current[i] = 0.003 + Math.random() * 0.005;

      col[i * 3] = indigoColor.r;
      col[i * 3 + 1] = indigoColor.g;
      col[i * 3 + 2] = indigoColor.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const colAttr = pointsRef.current.geometry.attributes.color as THREE.BufferAttribute;
    const colArr = colAttr.array as Float32Array;

    const indigoColor = new THREE.Color("#6366F1");
    const coralColor = new THREE.Color("#F97316");

    for (let s = 0; s < streamCount; s++) {
      const target = targets[s];
      for (let p = 0; p < particlesPerStream; p++) {
        const idx = s * particlesPerStream + p;
        let progress = progressRef.current[idx];
        progress += speedsRef.current[idx];

        if (progress >= 1) {
          progress = 0;
          speedsRef.current[idx] = 0.003 + Math.random() * 0.005;
        }
        progressRef.current[idx] = progress;

        // Curved bezier path from source to target
        // Control point creates a curve
        const cpX = (source[0] + target[0]) * 0.5;
        const cpY = (source[1] + target[1]) * 0.5 + (s === 0 ? 0.5 : s === 2 ? -0.5 : 0.3);
        const cpZ = -0.5;

        const t = progress;
        const oneMinusT = 1 - t;

        // Quadratic bezier
        const x = oneMinusT * oneMinusT * source[0] + 2 * oneMinusT * t * cpX + t * t * target[0];
        const y = oneMinusT * oneMinusT * source[1] + 2 * oneMinusT * t * cpY + t * t * target[1];
        const z = oneMinusT * oneMinusT * source[2] + 2 * oneMinusT * t * cpZ + t * t * target[2];

        arr[idx * 3] = x;
        arr[idx * 3 + 1] = y;
        arr[idx * 3 + 2] = z;

        // Color: transition from indigo near center to coral near output
        const c = new THREE.Color().lerpColors(indigoColor, coralColor, progress);
        colArr[idx * 3] = c.r;
        colArr[idx * 3 + 1] = c.g;
        colArr[idx * 3 + 2] = c.b;
      }
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function DirectionAmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 30;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
      spd[i * 3] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += speeds[i * 3];
      arr[i * 3 + 1] += speeds[i * 3 + 1];
      arr[i * 3 + 2] += speeds[i * 3 + 2];

      // Wrap
      if (Math.abs(arr[i * 3]) > 4) arr[i * 3] *= -0.9;
      if (Math.abs(arr[i * 3 + 1]) > 2.5) arr[i * 3 + 1] *= -0.9;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366F1"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function DirectionScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <MouseParallaxGroup>
        <DirectionCentralFrame />
        {/* Output frames: mobile (9:16), social (1:1), cinema (16:9) */}
        <DirectionOutputFrame
          position={[2.0, 1.2, 0]}
          width={0.56}
          height={1.0}
          color="#6366F1"
          phaseOffset={0}
        />
        <DirectionOutputFrame
          position={[2.2, 0.0, 0]}
          width={0.7}
          height={0.7}
          color="#818CF8"
          phaseOffset={2.0}
        />
        <DirectionOutputFrame
          position={[2.0, -1.2, 0]}
          width={1.2}
          height={0.675}
          color="#F97316"
          phaseOffset={4.0}
        />
        <DirectionParticleStreams />
        <DirectionAmbientParticles />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  SCENE 4: CAPTURE - Videography & Photography                       */
/* ================================================================== */

function CaptureCinemaCamera() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.3;
  });

  const wireframeMat = useMemo(
    () => ({
      color: "#6366F1",
      wireframe: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    }),
    []
  );

  const accentMat = useMemo(
    () => ({
      color: "#F97316",
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Camera body — main housing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.1, 1.0]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>

      {/* Lens barrel — primary */}
      <mesh position={[0, -0.05, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.8, 16]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>

      {/* Lens hood — front ring */}
      <mesh position={[0, -0.05, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.44, 0.38, 0.2, 16]} />
        <meshBasicMaterial {...accentMat} />
      </mesh>

      {/* Lens glass — front element */}
      <mesh position={[0, -0.05, 1.46]}>
        <circleGeometry args={[0.32, 16]} />
        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.08}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Film magazine — top cylinder (classic cinema look) */}
      <mesh position={[0.3, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 16]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>

      {/* Second film magazine — slightly offset */}
      <mesh position={[-0.3, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 16]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>

      {/* Viewfinder — rear box */}
      <mesh position={[0, 0.25, -0.6]}>
        <boxGeometry args={[0.3, 0.25, 0.25]} />
        <meshBasicMaterial {...accentMat} />
      </mesh>

      {/* Viewfinder eyepiece */}
      <mesh position={[0, 0.25, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 8]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>

      {/* Handle — top grip bar */}
      <mesh position={[0, 0.7, -0.15]}>
        <boxGeometry args={[0.8, 0.08, 0.08]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>
      {/* Handle supports */}
      <mesh position={[0.35, 0.62, -0.15]}>
        <boxGeometry args={[0.06, 0.12, 0.06]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>
      <mesh position={[-0.35, 0.62, -0.15]}>
        <boxGeometry args={[0.06, 0.12, 0.06]} />
        <meshBasicMaterial {...wireframeMat} />
      </mesh>

      {/* Matte box — front of lens */}
      <mesh position={[0, -0.05, 1.15]}>
        <boxGeometry args={[0.95, 0.75, 0.15]} />
        <meshBasicMaterial
          color="#6366F1"
          wireframe
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Follow focus ring */}
      <mesh position={[0.5, -0.05, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.025, 6, 12]} />
        <meshBasicMaterial {...accentMat} />
      </mesh>
    </group>
  );
}

function CaptureOrbitRing() {
  return (
    <mesh position={[0, 0.3, 0]} rotation={[Math.PI * 0.4, 0, Math.PI * 0.08]}>
      <torusGeometry args={[2.5, 0.005, 8, 64]} />
      <meshBasicMaterial
        color="#6366F1"
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  );
}

function CaptureGridFloor() {
  return (
    <mesh position={[0, -0.7, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[6, 6, 15, 15]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

function CaptureFloatingPoints() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 12;

  const { positions, colors, angles, radii, speeds, yOffsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);
    const spd = new Float32Array(count);
    const yOff = new Float32Array(count);

    const indigoColor = new THREE.Color("#6366F1");
    const coralColor = new THREE.Color("#F97316");

    for (let i = 0; i < count; i++) {
      ang[i] = Math.random() * Math.PI * 2;
      rad[i] = 1.8 + Math.random() * 1.2;
      spd[i] = 0.15 + Math.random() * 0.3;
      yOff[i] = (Math.random() - 0.5) * 2.0;

      const c = Math.random() > 0.5 ? indigoColor : coralColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col, angles: ang, radii: rad, speeds: spd, yOffsets: yOff };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const angle = angles[i] + t * speeds[i];
      arr[i * 3] = Math.cos(angle) * radii[i];
      arr[i * 3 + 1] = yOffsets[i] + Math.sin(t * 0.5 + angles[i]) * 0.3 + 0.3;
      arr[i * 3 + 2] = Math.sin(angle) * radii[i];
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function CaptureScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <MouseParallaxGroup>
        <CaptureCinemaCamera />
        <CaptureOrbitRing />
        <CaptureGridFloor />
        <CaptureFloatingPoints />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  Scene Map & Camera Configs                                         */
/* ================================================================== */

const sceneComponents: Record<ServiceSceneProps["scene"], React.FC> = {
  cinematography: CinematographyScene,
  animation: AnimationScene,
  direction: DirectionScene,
  capture: CaptureScene,
};

const cameraPositions: Record<ServiceSceneProps["scene"], [number, number, number]> = {
  cinematography: [0, 3, 8],
  animation: [0, 1, 5],
  direction: [0, 0, 6],
  capture: [0, 0, 5.5],
};

/* ================================================================== */
/*  Exported Component                                                 */
/* ================================================================== */

export default function ServiceScene({ scene, className }: ServiceSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} aria-hidden="true" />;
  }

  const SceneComponent = sceneComponents[scene];
  const cameraPos = cameraPositions[scene];

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ fov: 50, position: cameraPos, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <SceneComponent />
      </Canvas>
    </div>
  );
}

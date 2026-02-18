"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface ProjectSceneProps {
  theme: "space" | "ocean" | "energy" | "automotive";
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
    const targetX = mouse.current.y * 0.08;
    const targetY = mouse.current.x * 0.08;
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
/*  THEME 1: SPACE  (New Era Cap)                                      */
/* ================================================================== */

function SpacePlanet() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geoRef = useRef<THREE.SphereGeometry>(null!);

  // Store original positions for vertex displacement
  const originalPositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (geoRef.current) {
      originalPositions.current = new Float32Array(
        geoRef.current.attributes.position.array
      );
      // Apply noise-based displacement
      const pos = geoRef.current.attributes.position;
      const orig = originalPositions.current;
      for (let i = 0; i < pos.count; i++) {
        const x = orig[i * 3];
        const y = orig[i * 3 + 1];
        const z = orig[i * 3 + 2];
        // Simple pseudo-noise using sin combinations
        const noise =
          Math.sin(x * 5.0 + y * 3.0) * Math.cos(z * 4.0 + x * 2.0) *
          Math.sin(y * 6.0 + z * 2.5);
        const displacement = noise * 0.05;
        const len = Math.sqrt(x * x + y * y + z * z);
        if (len > 0) {
          pos.setXYZ(
            i,
            x + (x / len) * displacement,
            y + (y / len) * displacement,
            z + (z / len) * displacement
          );
        }
      }
      pos.needsUpdate = true;
      geoRef.current.computeVertexNormals();
    }
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} rotation-z={0.3}>
      <sphereGeometry ref={geoRef} args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#1a1a4e"
        emissive="#1a1a4e"
        emissiveIntensity={0.15}
        roughness={0.8}
      />
    </mesh>
  );
}

function SpaceRing() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 250;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const indigoColor = new THREE.Color("#6366F1");
    const whiteColor = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.0;
      const yOff = (Math.random() - 0.5) * 0.15;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = yOff;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const c = Math.random() > 0.4 ? indigoColor : whiteColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= 0.001;
    }
  });

  return (
    <points ref={pointsRef} rotation-z={0.3}>
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
        size={0.04}
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

function SpaceStars() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 100;
  const phasesRef = useRef<Float32Array>(new Float32Array(count));

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 7;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      phasesRef.current[i] = Math.random() * Math.PI * 2;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.5 + Math.sin(clock.elapsedTime * 0.5) * 0.3;
    }
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
        color="#ffffff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function SpaceScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 2, 3]}
        intensity={0.6}
        color="#fff5e6"
      />
      <MouseParallaxGroup>
        <SpacePlanet />
        <SpaceRing />
        <SpaceStars />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  THEME 2: OCEAN  (SeaWorld)                                         */
/* ================================================================== */

function OceanCausticRays() {
  const raysRef = useRef<THREE.Group>(null!);
  const count = 7;

  const rayData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (i - count / 2) * 1.8 + (Math.random() - 0.5) * 1.5,
      height: 8 + Math.random() * 2,
      width: 0.02 + Math.random() * 0.03,
      color: Math.random() > 0.5 ? "#22D3EE" : "#14B8A6",
      opacity: 0.06 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!raysRef.current) return;
    raysRef.current.children.forEach((child, i) => {
      const data = rayData[i];
      child.rotation.z = Math.sin(clock.elapsedTime * data.speed + data.phase) * 0.08;
      child.scale.x = 1 + Math.sin(clock.elapsedTime * 0.5 + data.phase) * 0.3;
    });
  });

  return (
    <group ref={raysRef}>
      {rayData.map((ray, i) => (
        <mesh key={i} position={[ray.x, 0, -2 + Math.random() * 2]}>
          <planeGeometry args={[ray.width, ray.height]} />
          <meshBasicMaterial
            color={ray.color}
            transparent
            opacity={ray.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function OceanBubbles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 180;
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count));
  const phasesRef = useRef<Float32Array>(new Float32Array(count));

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyanColor = new THREE.Color("#22D3EE");
    const tealColor = new THREE.Color("#14B8A6");
    const whiteColor = new THREE.Color("#e0f7fa");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      velocitiesRef.current[i] = 0.002 + Math.random() * 0.004;
      phasesRef.current[i] = Math.random() * Math.PI * 2;

      const pick = Math.random();
      const c = pick < 0.4 ? cyanColor : pick < 0.7 ? tealColor : whiteColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += velocitiesRef.current[i];
      arr[i * 3] +=
        Math.sin(clock.elapsedTime * 0.5 + phasesRef.current[i]) * 0.002;

      // Wrap around when reaching top
      if (arr[i * 3 + 1] > 5) {
        arr[i * 3 + 1] = -5;
        arr[i * 3] = (Math.random() - 0.5) * 12;
      }
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function OceanSurface() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geoRef = useRef<THREE.PlaneGeometry>(null!);
  const originalPositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (geoRef.current) {
      originalPositions.current = new Float32Array(
        geoRef.current.attributes.position.array
      );
    }
  }, []);

  useFrame(({ clock }) => {
    if (!geoRef.current || !originalPositions.current) return;
    const pos = geoRef.current.attributes.position;
    const orig = originalPositions.current;
    const t = clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      const x = orig[i * 3];
      const y = orig[i * 3 + 1];
      const wave =
        Math.sin(x * 0.8 + t * 0.5) * 0.15 +
        Math.sin(y * 1.2 + t * 0.3) * 0.1;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    geoRef.current.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} position={[0, 4, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry ref={geoRef} args={[16, 12, 20, 20]} />
      <meshBasicMaterial
        color="#22D3EE"
        wireframe
        transparent
        opacity={0.05}
        depthWrite={false}
      />
    </mesh>
  );
}

function OceanScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[0, 5, 2]}
        intensity={0.4}
        color="#22D3EE"
      />
      <MouseParallaxGroup>
        <OceanCausticRays />
        <OceanBubbles />
        <OceanSurface />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  THEME 3: ENERGY  (Barry's Bootcamp)                                */
/* ================================================================== */

function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const scale = 1.0 + Math.sin(clock.elapsedTime * 3) * 0.15;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 24, 24]} />
      <meshStandardMaterial
        color="#F97316"
        emissive="#F97316"
        emissiveIntensity={0.8}
        toneMapped={false}
      />
    </mesh>
  );
}

function EnergyRadiatingRings() {
  const groupRef = useRef<THREE.Group>(null!);
  const ringCount = 4;
  const particlesPerRing = 35;
  const maxRadius = 5;

  // Create ring data: each ring has its own phase offset
  const ringData = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      phase: (i / ringCount) * maxRadius,
      angles: Array.from(
        { length: particlesPerRing },
        () => Math.random() * Math.PI * 2
      ),
    }));
  }, []);

  const { positions, colors } = useMemo(() => {
    const total = ringCount * particlesPerRing;
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    const coralColor = new THREE.Color("#F97316");

    for (let i = 0; i < total; i++) {
      col[i * 3] = coralColor.r;
      col[i * 3 + 1] = coralColor.g;
      col[i * 3 + 2] = coralColor.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const points = groupRef.current.children[0] as THREE.Points;
    if (!points) return;
    const posAttr = points.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const colAttr = points.geometry.attributes.color as THREE.BufferAttribute;
    const colArr = colAttr.array as Float32Array;
    const t = clock.elapsedTime;

    const coralColor = new THREE.Color("#F97316");
    const amberColor = new THREE.Color("#F59E0B");

    for (let r = 0; r < ringCount; r++) {
      const currentRadius =
        ((t * 0.8 + ringData[r].phase) % maxRadius) + 0.5;
      const alpha = 1 - (currentRadius - 0.5) / maxRadius;

      for (let p = 0; p < particlesPerRing; p++) {
        const idx = r * particlesPerRing + p;
        const angle = ringData[r].angles[p];
        arr[idx * 3] = Math.cos(angle) * currentRadius;
        arr[idx * 3 + 1] = Math.sin(angle) * currentRadius;
        arr[idx * 3 + 2] = (Math.random() - 0.5) * 0.1;

        const c = new THREE.Color().lerpColors(coralColor, amberColor, 1 - alpha);
        colArr[idx * 3] = c.r;
        colArr[idx * 3 + 1] = c.g;
        colArr[idx * 3 + 2] = c.b;
      }
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    const mat = points.material as THREE.PointsMaterial;
    mat.opacity = 0.7;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={ringCount * particlesPerRing}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={ringCount * particlesPerRing}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function EnergyParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 100;
  const maxDist = 6;

  const velocitiesRef = useRef<Float32Array>(new Float32Array(count * 3));
  const lifetimesRef = useRef<Float32Array>(new Float32Array(count));

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const coralColor = new THREE.Color("#F97316");
    const amberColor = new THREE.Color("#F59E0B");
    const whiteColor = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // Random spherical direction
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.01 + Math.random() * 0.03;
      velocitiesRef.current[i * 3] =
        Math.sin(phi) * Math.cos(theta) * speed;
      velocitiesRef.current[i * 3 + 1] =
        Math.sin(phi) * Math.sin(theta) * speed;
      velocitiesRef.current[i * 3 + 2] = Math.cos(phi) * speed;

      // Start at random distances
      const startDist = Math.random() * maxDist;
      pos[i * 3] =
        Math.sin(phi) * Math.cos(theta) * startDist;
      pos[i * 3 + 1] =
        Math.sin(phi) * Math.sin(theta) * startDist;
      pos[i * 3 + 2] = Math.cos(phi) * startDist;

      lifetimesRef.current[i] = Math.random();

      const pick = Math.random();
      const c =
        pick < 0.5 ? coralColor : pick < 0.8 ? amberColor : whiteColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocitiesRef.current[i * 3];
      arr[i * 3 + 1] += velocitiesRef.current[i * 3 + 1];
      arr[i * 3 + 2] += velocitiesRef.current[i * 3 + 2];

      const dist = Math.sqrt(
        arr[i * 3] ** 2 + arr[i * 3 + 1] ** 2 + arr[i * 3 + 2] ** 2
      );

      if (dist > maxDist) {
        // Reset to center
        arr[i * 3] = 0;
        arr[i * 3 + 1] = 0;
        arr[i * 3 + 2] = 0;
        // New random direction
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const speed = 0.01 + Math.random() * 0.03;
        velocitiesRef.current[i * 3] =
          Math.sin(phi) * Math.cos(theta) * speed;
        velocitiesRef.current[i * 3 + 1] =
          Math.sin(phi) * Math.sin(theta) * speed;
        velocitiesRef.current[i * 3 + 2] = Math.cos(phi) * speed;
      }
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
        size={0.04}
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

function EnergyScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1.0} color="#F97316" />
      <MouseParallaxGroup>
        <EnergyCore />
        <EnergyRadiatingRings />
        <EnergyParticles />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  THEME 4: AUTOMOTIVE  (Ford)                                        */
/* ================================================================== */

// Car side profile points (sporty silhouette)
const carProfileRight: [number, number, number][] = [
  // Front bumper bottom
  [-1.5, -0.3, 0.7],
  // Front bumper top
  [-1.5, 0.0, 0.7],
  // Hood line
  [-1.3, 0.05, 0.7],
  [-0.5, 0.1, 0.7],
  // Windshield base
  [-0.3, 0.1, 0.7],
  // Windshield top
  [0.0, 0.55, 0.7],
  // Roof
  [0.4, 0.6, 0.7],
  [0.8, 0.55, 0.7],
  // Rear window
  [1.1, 0.3, 0.7],
  // Trunk
  [1.3, 0.15, 0.7],
  [1.5, 0.1, 0.7],
  // Rear bumper
  [1.5, -0.3, 0.7],
  // Underside
  [1.2, -0.35, 0.7],
  // Rear wheel arch
  [1.0, -0.2, 0.7],
  [0.8, -0.35, 0.7],
  // Bottom mid
  [0.3, -0.35, 0.7],
  // Front wheel arch
  [-0.5, -0.35, 0.7],
  [-0.7, -0.2, 0.7],
  [-0.9, -0.35, 0.7],
  [-1.2, -0.35, 0.7],
  // Close the loop
  [-1.5, -0.3, 0.7],
];

const carProfileLeft: [number, number, number][] = carProfileRight.map(
  ([x, y]) => [x, y, -0.7]
);

// Cross-connects between left and right side at key vertices
const crossConnectIndices = [0, 1, 5, 6, 7, 8, 10, 11];

function AutomotiveWireframeCar() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Generate cross-connect lines
  const crossLines = crossConnectIndices.map((idx) => {
    return [carProfileRight[idx], carProfileLeft[idx]] as [
      [number, number, number],
      [number, number, number]
    ];
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Right side profile */}
      <Line
        points={carProfileRight}
        color="#34D399"
        lineWidth={2}
        transparent
        opacity={0.9}
      />
      {/* Left side profile */}
      <Line
        points={carProfileLeft}
        color="#34D399"
        lineWidth={2}
        transparent
        opacity={0.9}
      />
      {/* Cross-connects */}
      {crossLines.map((line, i) => (
        <Line
          key={i}
          points={line}
          color="#34D399"
          lineWidth={1.5}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}

function AutomotiveSpeedParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 40;
  const speedsRef = useRef<Float32Array>(new Float32Array(count));

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const emeraldColor = new THREE.Color("#34D399");
    const tealColor = new THREE.Color("#14B8A6");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speedsRef.current[i] = 0.03 + Math.random() * 0.06;

      const c = Math.random() > 0.5 ? emeraldColor : tealColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] -= speedsRef.current[i];
      if (arr[i * 3] < -5) {
        arr[i * 3] = 5;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 3;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function AutomotiveGridFloor() {
  return (
    <mesh position={[0, -0.5, 0]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[8, 8, 20, 20]} />
      <meshBasicMaterial
        color="#34D399"
        wireframe
        transparent
        opacity={0.05}
        depthWrite={false}
      />
    </mesh>
  );
}

function AutomotiveScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 4, 3]} intensity={0.5} />
      <MouseParallaxGroup>
        <AutomotiveWireframeCar />
        <AutomotiveSpeedParticles />
        <AutomotiveGridFloor />
      </MouseParallaxGroup>
    </>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */

const themeScenes: Record<ProjectSceneProps["theme"], React.FC> = {
  space: SpaceScene,
  ocean: OceanScene,
  energy: EnergyScene,
  automotive: AutomotiveScene,
};

export default function ProjectScene({ theme, className }: ProjectSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const SceneComponent = themeScenes[theme];

  return (
    <div className={className}>
      <Canvas
        camera={{ fov: 60, position: [0, 0, 8] }}
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

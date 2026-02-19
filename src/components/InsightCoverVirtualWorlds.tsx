"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Constants – kept minimal for card-sized cover art
// ---------------------------------------------------------------------------
const GRID_SEG = 24;
const GRID_SIZE = 4;
const PARTICLE_COUNT = 18;
const ACCENT = new THREE.Color("#6366F1");

// ---------------------------------------------------------------------------
// Terrain mesh – half solid / half wireframe with animated divide
// ---------------------------------------------------------------------------
function Terrain() {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Shared geometry template
  const basePositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE, GRID_SEG, GRID_SEG);
    geo.rotateX(-Math.PI * 0.45);
    return geo.attributes.position.array.slice() as Float32Array;
  }, []);

  // Two geometries: one for solid half, one for wireframe half
  const solidGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE, GRID_SEG, GRID_SEG);
    g.rotateX(-Math.PI * 0.45);
    return g;
  }, []);

  const wireGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE, GRID_SEG, GRID_SEG);
    g.rotateX(-Math.PI * 0.45);
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // The dividing line oscillates in normalised X [0..1]
    const divide = 0.5 + Math.sin(t * 0.35) * 0.35;

    // Displace vertices with sine-wave terrain
    const count = solidGeo.attributes.position.count;
    const solidPos = solidGeo.attributes.position.array as Float32Array;
    const wirePos = wireGeo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      // Animated height displacement
      const wave =
        Math.sin(bx * 1.2 + t * 0.6) * 0.25 +
        Math.sin(bz * 1.5 + t * 0.4) * 0.18 +
        Math.cos((bx + bz) * 0.8 + t * 0.3) * 0.12;

      solidPos[i * 3] = bx;
      solidPos[i * 3 + 1] = by + wave;
      solidPos[i * 3 + 2] = bz;

      wirePos[i * 3] = bx;
      wirePos[i * 3 + 1] = by + wave;
      wirePos[i * 3 + 2] = bz;
    }

    solidGeo.attributes.position.needsUpdate = true;
    wireGeo.attributes.position.needsUpdate = true;

    // Adjust vertex colours to create the divide effect
    // Solid: visible where normalised x < divide, faded otherwise
    // Wire:  visible where normalised x >= divide, faded otherwise
    const solidColors = solidGeo.attributes.color;

    if (!solidColors) {
      // Initialise vertex colours
      const cols = new Float32Array(count * 3);
      solidGeo.setAttribute("color", new THREE.BufferAttribute(cols.slice(), 3));
      wireGeo.setAttribute("color", new THREE.BufferAttribute(cols.slice(), 3));
    }

    const sc = (solidGeo.attributes.color as THREE.BufferAttribute).array as Float32Array;
    const wc = (wireGeo.attributes.color as THREE.BufferAttribute).array as Float32Array;

    for (let i = 0; i < count; i++) {
      const nx = (solidPos[i * 3] / GRID_SIZE) + 0.5; // 0..1
      const solidAlpha = THREE.MathUtils.smoothstep(divide - nx, -0.12, 0.12);
      const wireAlpha = THREE.MathUtils.smoothstep(nx - divide, -0.12, 0.12);

      sc[i * 3] = ACCENT.r * solidAlpha;
      sc[i * 3 + 1] = ACCENT.g * solidAlpha;
      sc[i * 3 + 2] = ACCENT.b * solidAlpha;

      wc[i * 3] = ACCENT.r * wireAlpha;
      wc[i * 3 + 1] = ACCENT.g * wireAlpha;
      wc[i * 3 + 2] = ACCENT.b * wireAlpha;
    }

    (solidGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    (wireGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;

    // Gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Solid half */}
      <mesh ref={solidRef} geometry={solidGeo}>
        <meshBasicMaterial
          vertexColors
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Wireframe half */}
      <mesh ref={wireRef} geometry={wireGeo}>
        <meshBasicMaterial
          vertexColors
          wireframe
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Floating particles above the terrain
// ---------------------------------------------------------------------------
function Particles() {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const spd = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 1] = Math.random() * 1.2 + 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      spd[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArr[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * speeds[i] + i) * 0.15;
      posArr[i * 3] = positions[i * 3] + Math.sin(t * 0.3 + i * 2) * 0.08;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6366F1"
        size={0.04}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Exported component
// ---------------------------------------------------------------------------
export default function InsightCoverVirtualWorlds() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.8, 3.5], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Terrain />
      <Particles />
    </Canvas>
  );
}

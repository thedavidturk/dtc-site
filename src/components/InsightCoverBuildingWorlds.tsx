"use client";

import { useRef, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const BLOCK_COUNT = 28;
const DUST_COUNT = 12;

interface BlockData {
  targetX: number;
  targetY: number;
  targetZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  delay: number;
  speed: number;
  rotSpeed: number;
  bobPhase: number;
}

// ---------------------------------------------------------------------------
// Generate a loose cityscape layout
// ---------------------------------------------------------------------------
function generateBlocks(): BlockData[] {
  const blocks: BlockData[] = [];
  for (let i = 0; i < BLOCK_COUNT; i++) {
    const col = (i % 7) - 3;
    const row = Math.floor(i / 7);
    const sx = 0.1 + Math.random() * 0.15;
    const sy = 0.15 + Math.random() * 0.35;
    const sz = 0.1 + Math.random() * 0.12;

    blocks.push({
      targetX: col * 0.35 + (Math.random() - 0.5) * 0.12,
      targetY: row * 0.18 - 0.3 + sy * 0.5,
      targetZ: (Math.random() - 0.5) * 0.6,
      scaleX: sx,
      scaleY: sy,
      scaleZ: sz,
      delay: i * 0.4 + Math.random() * 2.0,
      speed: 0.8 + Math.random() * 0.5,
      rotSpeed: (Math.random() - 0.5) * 0.4,
      bobPhase: Math.random() * Math.PI * 2,
    });
  }
  return blocks;
}

// ---------------------------------------------------------------------------
// Single animated block with deterministic wireframe flag
// ---------------------------------------------------------------------------
function BlockInner({ data, wireframe }: { data: BlockData; wireframe: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !matRef.current) return;
    const t = clock.getElapsedTime();

    const cycleTime = 18;
    const localT = ((t - data.delay) % cycleTime + cycleTime) % cycleTime;
    const riseTime = 2.5 / data.speed;

    if (localT < riseTime) {
      // Rising phase
      const p = Math.min(localT / riseTime, 1);
      const eased = 1 - Math.pow(1 - p, 3);

      const startY = data.targetY - 2.5;
      ref.current.position.x = data.targetX;
      ref.current.position.y = THREE.MathUtils.lerp(startY, data.targetY, eased);
      ref.current.position.z = data.targetZ;

      ref.current.rotation.x = (1 - eased) * data.rotSpeed * 3;
      ref.current.rotation.z = (1 - eased) * data.rotSpeed * 2;

      matRef.current.opacity = eased * 0.65;
    } else {
      // Placed -- gentle bob
      const bobT = localT - riseTime;
      ref.current.position.x = data.targetX;
      ref.current.position.y =
        data.targetY + Math.sin(bobT * 0.6 + data.bobPhase) * 0.025;
      ref.current.position.z = data.targetZ;

      ref.current.rotation.x = Math.sin(bobT * 0.3 + data.bobPhase) * 0.02;
      ref.current.rotation.z = Math.cos(bobT * 0.25 + data.bobPhase) * 0.015;

      matRef.current.opacity = 0.65;
    }
  });

  return (
    <mesh ref={ref} position={[data.targetX, data.targetY - 2.5, data.targetZ]}>
      <boxGeometry args={[data.scaleX, data.scaleY, data.scaleZ]} />
      <meshBasicMaterial
        ref={matRef}
        color="#F97316"
        transparent
        opacity={0}
        wireframe={wireframe}
      />
    </mesh>
  );
}

const Block = memo(BlockInner);

// ---------------------------------------------------------------------------
// Cityscape container
// ---------------------------------------------------------------------------
function Cityscape() {
  const groupRef = useRef<THREE.Group>(null);
  const blocks = useMemo(() => generateBlocks(), []);
  const wireframeFlags = useMemo(
    () => blocks.map((_, i) => i % 3 === 0),
    [blocks]
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {blocks.map((b, i) => (
        <Block key={i} data={b} wireframe={wireframeFlags[i]} />
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Floating dust particles
// ---------------------------------------------------------------------------
function Dust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const p = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 3;
      p[i * 3 + 1] = (Math.random() - 0.5) * 2;
      p[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return p;
  }, []);

  const seeds = useMemo(() => {
    const s = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) s[i] = Math.random() * Math.PI * 2;
    return s;
  }, []);

  // Keep base positions for reference (copy of initial values)
  const basePositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3 + 1] =
        basePositions[i * 3 + 1] + Math.sin(t * 0.5 + seeds[i]) * 0.15;
      pos[i * 3] =
        basePositions[i * 3] + Math.cos(t * 0.3 + seeds[i]) * 0.05;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={DUST_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F97316"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Exported component
// ---------------------------------------------------------------------------
export default function InsightCoverBuildingWorlds() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 3.8], fov: 38 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Cityscape />
      <Dust />
    </Canvas>
  );
}

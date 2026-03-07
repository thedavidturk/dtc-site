"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A rotating 3D product-like object (gem/crystal) with orbiting particles
const FACET_COUNT = 12;
const ORBIT_COUNT = 20;
const ACCENT = new THREE.Color("#10B981");

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.3;
      wireRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.15} />
      </mesh>
      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function OrbitRing() {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds, radii } = useMemo(() => {
    const pos = new Float32Array(ORBIT_COUNT * 3);
    const spd = new Float32Array(ORBIT_COUNT);
    const rad = new Float32Array(ORBIT_COUNT);
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const angle = (i / ORBIT_COUNT) * Math.PI * 2;
      const r = 1.0 + Math.random() * 0.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 2] = Math.sin(angle) * r;
      spd[i] = 0.2 + Math.random() * 0.4;
      rad[i] = r;
    }
    return { positions: pos, speeds: spd, radii: rad };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < ORBIT_COUNT; i++) {
      const angle = (i / ORBIT_COUNT) * Math.PI * 2 + t * speeds[i];
      arr[i * 3] = Math.cos(angle) * radii[i];
      arr[i * 3 + 2] = Math.sin(angle) * radii[i];
      arr[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * 0.5 + i) * 0.1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={ORBIT_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#10B981" size={0.04} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function ScanLines() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={ref}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.5 + i * 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9 + i * 0.15, 0.92 + i * 0.15, 48]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function InsightCoverProductViz() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.5, 3], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <Crystal />
      <OrbitRing />
      <ScanLines />
    </Canvas>
  );
}

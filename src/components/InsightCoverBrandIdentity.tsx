"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Morphing geometric shapes representing adaptive brand identity
const ACCENT = new THREE.Color("#F59E0B");
const PARTICLE_COUNT = 16;

function MorphShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Use icosahedron as base, morph vertices
  const baseGeo = useMemo(() => new THREE.IcosahedronGeometry(0.8, 1), []);
  const basePositions = useMemo(
    () => baseGeo.attributes.position.array.slice() as Float32Array,
    [baseGeo]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
    }

    // Morph vertices
    const pos = baseGeo.attributes.position.array as Float32Array;
    const count = baseGeo.attributes.position.count;
    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const len = Math.sqrt(bx * bx + by * by + bz * bz);
      const nx = bx / len;
      const ny = by / len;
      const nz = bz / len;

      // Morph factor oscillates between sphere and spiky
      const morph =
        Math.sin(t * 0.5 + nx * 3) * 0.12 +
        Math.cos(t * 0.4 + ny * 2) * 0.08 +
        Math.sin(t * 0.3 + nz * 4) * 0.06;

      const scale = 1 + morph;
      pos[i * 3] = bx * scale;
      pos[i * 3 + 1] = by * scale;
      pos[i * 3 + 2] = bz * scale;
    }
    baseGeo.attributes.position.needsUpdate = true;
    baseGeo.computeVertexNormals();
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={baseGeo}>
        <meshBasicMaterial color={ACCENT} transparent opacity={0.12} />
      </mesh>
      <mesh ref={wireRef} geometry={baseGeo}>
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

// Orbiting brand "tokens" - small shapes circling the main form
function BrandTokens() {
  const groupRef = useRef<THREE.Group>(null);
  const tokens = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      angle: (i / 5) * Math.PI * 2,
      radius: 1.3 + Math.random() * 0.3,
      speed: 0.15 + Math.random() * 0.15,
      yOffset: (Math.random() - 0.5) * 0.6,
      size: 0.06 + Math.random() * 0.04,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const token = tokens[i];
      const angle = token.angle + t * token.speed;
      child.position.x = Math.cos(angle) * token.radius;
      child.position.z = Math.sin(angle) * token.radius;
      child.position.y = token.yOffset + Math.sin(t * 0.5 + i) * 0.1;
      child.rotation.y = t * 0.5;
      child.rotation.z = t * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {tokens.map((token, i) => (
        <mesh key={i}>
          <boxGeometry args={[token.size, token.size, token.size]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingDots() {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const spd = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      spd[i] = 0.3 + Math.random() * 0.5;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * speeds[i] + i) * 0.12;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#F59E0B" size={0.03} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function InsightCoverBrandIdentity() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 3.2], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <MorphShape />
      <BrandTokens />
      <FloatingDots />
    </Canvas>
  );
}

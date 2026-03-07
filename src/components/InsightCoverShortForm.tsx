"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = new THREE.Color("#EC4899");
const PARTICLE_COUNT = 15;

function PhoneFrame({ position, delay }: { position: [number, number, number]; delay: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const bar0 = useRef<THREE.Mesh>(null);
  const bar1 = useRef<THREE.Mesh>(null);
  const bar2 = useRef<THREE.Mesh>(null);
  const bar3 = useRef<THREE.Mesh>(null);

  const edgeGeo = useMemo(() => {
    const plane = new THREE.PlaneGeometry(0.55, 1.0);
    return new THREE.EdgesGeometry(plane);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.4 + delay) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.3 + delay) * 0.03;
    }
    const bars = [bar0, bar1, bar2, bar3];
    bars.forEach((barRef, i) => {
      if (!barRef.current) return;
      const offset = ((t * 0.5 + delay + i * 0.35) % 2.0) - 1.0;
      barRef.current.position.y = offset * 0.4;
      const mat = barRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.4 - Math.abs(offset) * 0.5);
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Phone fill */}
      <mesh>
        <planeGeometry args={[0.55, 1.0]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.06} />
      </mesh>
      {/* Phone border */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#EC4899" transparent opacity={0.35} />
      </lineSegments>
      {/* Scrolling bars */}
      <mesh ref={bar0} position={[0, 0, 0.01]}>
        <planeGeometry args={[0.35, 0.04]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.3} />
      </mesh>
      <mesh ref={bar1} position={[0, 0, 0.01]}>
        <planeGeometry args={[0.3, 0.04]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.3} />
      </mesh>
      <mesh ref={bar2} position={[0, 0, 0.01]}>
        <planeGeometry args={[0.25, 0.04]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.3} />
      </mesh>
      <mesh ref={bar3} position={[0, 0, 0.01]}>
        <planeGeometry args={[0.35, 0.04]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.3} />
      </mesh>
      {/* Play triangle */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.08, 3]} />
        <meshBasicMaterial color="#EC4899" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Sparkles() {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const spd = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1;
      spd[i] = 0.5 + Math.random() * 1.0;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * speeds[i] + i * 2) * 0.15;
      arr[i * 3] = positions[i * 3] + Math.cos(t * 0.3 + i) * 0.05;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#EC4899" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function InsightCoverShortForm() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.5], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <PhoneFrame position={[-0.7, 0.05, 0]} delay={0} />
      <PhoneFrame position={[0, -0.05, 0.2]} delay={1.2} />
      <PhoneFrame position={[0.7, 0.05, 0]} delay={2.4} />
      <Sparkles />
    </Canvas>
  );
}

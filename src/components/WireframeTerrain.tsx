"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface WireframeTerrainProps {
  className?: string;
  color?: string; // default electric-indigo
  opacity?: number; // default 0.08
  speed?: number; // animation speed multiplier, default 1
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const GRID_SEGMENTS = 80;
const GRID_SIZE = 40;

// ---------------------------------------------------------------------------
// Floating Data Points - small glowing spheres above the terrain
// ---------------------------------------------------------------------------
function FloatingPoints() {
  const point1 = useRef<THREE.Mesh>(null);
  const point2 = useRef<THREE.Mesh>(null);
  const point3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (point1.current) {
      point1.current.position.x = Math.sin(t * 0.12) * 8 - 3;
      point1.current.position.y = 1.5 + Math.sin(t * 0.25) * 0.5;
      point1.current.position.z = Math.cos(t * 0.1) * 6;
      const s = 0.06 + Math.sin(t * 0.6) * 0.02;
      point1.current.scale.setScalar(s);
    }

    if (point2.current) {
      point2.current.position.x = Math.cos(t * 0.09) * 10 + 4;
      point2.current.position.y = 2.0 + Math.cos(t * 0.3) * 0.4;
      point2.current.position.z = Math.sin(t * 0.08) * 5 - 2;
      const s = 0.05 + Math.cos(t * 0.5 + 1) * 0.015;
      point2.current.scale.setScalar(s);
    }

    if (point3.current) {
      point3.current.position.x = Math.sin(t * 0.07 + 2) * 6;
      point3.current.position.y = 1.8 + Math.sin(t * 0.2 + 1.5) * 0.6;
      point3.current.position.z = Math.cos(t * 0.11 + 1) * 8;
      const s = 0.04 + Math.sin(t * 0.45 + 2) * 0.018;
      point3.current.scale.setScalar(s);
    }
  });

  return (
    <>
      {/* Electric-indigo point */}
      <Sphere ref={point1} args={[1, 8, 8]}>
        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Warm-coral point */}
      <Sphere ref={point2} args={[1, 8, 8]}>
        <meshBasicMaterial
          color="#F97316"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Mixed indigo-coral point */}
      <Sphere ref={point3} args={[1, 8, 8]}>
        <meshBasicMaterial
          color="#9B6AF0"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
    </>
  );
}

// ---------------------------------------------------------------------------
// Animated Wireframe Grid
// ---------------------------------------------------------------------------
interface TerrainMeshProps {
  color: string;
  opacity: number;
  speed: number;
}

function TerrainMesh({ color, opacity, speed }: TerrainMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Create geometry and store original positions
  const { geometry, basePositions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      GRID_SIZE,
      GRID_SIZE,
      GRID_SEGMENTS,
      GRID_SEGMENTS
    );
    // Rotate to horizontal
    geo.rotateX(-Math.PI / 2);

    // Clone the base positions before any animation
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
    const vertexCount = posAttr.count;

    for (let i = 0; i < vertexCount; i++) {
      const i3 = i * 3;

      // Original X and Z positions (Y is up after rotation, but in the buffer
      // the plane was rotated so the layout is: x stays x, former-y became z, former-z became y)
      const bx = basePositions[i3]; // x
      const bz = basePositions[i3 + 2]; // z

      // Wave 1: primary rolling wave
      const wave1 =
        Math.sin(bx * 0.3 + time * 0.35 * speed) *
        Math.cos(bz * 0.2 + time * 0.25 * speed) *
        0.6;

      // Wave 2: secondary cross-wave for organic feel
      const wave2 =
        Math.cos(bx * 0.15 - time * 0.4 * speed + bz * 0.25) * 0.4;

      // Wave 3: high-frequency detail ripple
      const wave3 =
        Math.sin(bx * 0.5 + bz * 0.5 + time * 0.5 * speed) * 0.15;

      // Apply displacement to Y (which is the "up" axis after rotation)
      arr[i3 + 1] = basePositions[i3 + 1] + wave1 + wave2 + wave3;
    }

    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Slow drift - very gentle Y rotation for immersion
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.00008 * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Scene wrapper
// ---------------------------------------------------------------------------
interface SceneProps {
  color: string;
  opacity: number;
  speed: number;
}

function Scene({ color, opacity, speed }: SceneProps) {
  return (
    <>
      <TerrainMesh color={color} opacity={opacity} speed={speed} />
      <FloatingPoints />
    </>
  );
}

// ---------------------------------------------------------------------------
// Exported component - handles SSR, canvas, and container styling
// ---------------------------------------------------------------------------
export default function WireframeTerrain({
  className = "",
  color = "#6366F1",
  opacity = 0.08,
  speed = 1,
}: WireframeTerrainProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / pre-hydration fallback - render empty container
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <div className={className} aria-hidden="true">
      {/* Top fade overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-deep-space to-transparent z-10 pointer-events-none" />
      {/* Bottom fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-deep-space to-transparent z-10 pointer-events-none" />

      <Canvas
        camera={{
          fov: 60,
          position: [0, 8, 15],
          near: 0.1,
          far: 100,
          rotation: [-0.4, 0, 0],
        }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: "transparent" }}
        onCreated={({ camera }) => {
          // Ensure camera looks down at the grid at an angle
          camera.lookAt(0, 0, 0);
          camera.rotateX(-0.1);
        }}
      >
        <Scene color={color} opacity={opacity} speed={speed} />
      </Canvas>
    </div>
  );
}

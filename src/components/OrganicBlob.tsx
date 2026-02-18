"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface OrganicBlobProps {
  className?: string;
}

interface BlobSceneProps {
  mouse: React.MutableRefObject<THREE.Vector2>;
  isHovered: React.MutableRefObject<boolean>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const ICOSAHEDRON_DETAIL = 4;
const NOISE_SPEED = 0.4;
const NOISE_AMPLITUDE = 0.32;
const BREATHING_SPEED = 0.5;
const BREATHING_AMOUNT = 0.03;
const AUTO_ROTATION_SPEED = 0.002;
const MOUSE_LERP = 0.04;
const MAX_TILT = 0.1;
const MOUSE_INFLUENCE_RADIUS = 1.5;
const MOUSE_ATTRACT_STRENGTH = 0.25;
const PARTICLE_COUNT = 40;
const PARTICLE_ORBIT_RADIUS_MIN = 2.0;
const PARTICLE_ORBIT_RADIUS_MAX = 2.5;

// Brand colors
const COLOR_INDIGO = new THREE.Color("#6366F1");
const COLOR_CORAL = new THREE.Color("#F97316");
const EMISSIVE_DARK_INDIGO = new THREE.Color("#2a2d6e");

// ---------------------------------------------------------------------------
// Pseudo-noise: layered sin/cos for organic vertex displacement
// ---------------------------------------------------------------------------
function noise(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 1.5 + y * 2.1) * Math.cos(y * 1.8 + z * 1.3) * 0.5 +
    Math.sin(z * 2.5 + x * 1.1) * Math.cos(x * 1.7 + y * 2.9) * 0.3 +
    Math.sin(y * 3.2 + z * 1.6) * Math.cos(z * 2.2 + x * 1.4) * 0.2
  );
}

// ---------------------------------------------------------------------------
// Smoothstep utility
// ---------------------------------------------------------------------------
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// ---------------------------------------------------------------------------
// The Organic Blob mesh with vertex displacement and vertex colors
// ---------------------------------------------------------------------------
function BlobMesh({ mouse, isHovered }: BlobSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const orbitLightRef = useRef<THREE.PointLight>(null);

  // Smoothed mouse for interaction
  const smoothMouse = useRef(new THREE.Vector2(0, 0));
  const mouseInfluence = useRef(0);

  // Build geometry, store originals, compute vertex colors
  const { geometry, originalPositions, vertexNormals } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, ICOSAHEDRON_DETAIL);
    const posAttr = geo.attributes.position;
    const originals = new Float32Array(posAttr.array.length);
    originals.set(posAttr.array as Float32Array);

    // Compute radial normals (unit sphere normals = normalized positions)
    const normals = new Float32Array(posAttr.count * 3);
    for (let i = 0; i < posAttr.count; i++) {
      const i3 = i * 3;
      const x = originals[i3];
      const y = originals[i3 + 1];
      const z = originals[i3 + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      normals[i3] = x / len;
      normals[i3 + 1] = y / len;
      normals[i3 + 2] = z / len;
    }

    // Vertex colors: gradient from warm-coral (bottom) to electric-indigo (top)
    const colors = new Float32Array(posAttr.count * 3);
    const tmpColor = new THREE.Color();
    let minY = Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < posAttr.count; i++) {
      const y = originals[i * 3 + 1];
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    for (let i = 0; i < posAttr.count; i++) {
      const i3 = i * 3;
      const y = originals[i3 + 1];
      // Normalize Y to 0..1 (bottom=0, top=1)
      const t = (y - minY) / (maxY - minY);
      // Lerp from coral (bottom) to indigo (top)
      tmpColor.copy(COLOR_CORAL).lerp(COLOR_INDIGO, t);
      colors[i3] = tmpColor.r;
      colors[i3 + 1] = tmpColor.g;
      colors[i3 + 2] = tmpColor.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return { geometry: geo, originalPositions: originals, vertexNormals: normals };
  }, []);

  // Project mouse to world space
  const { camera } = useThree();
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current || !materialRef.current) return;

    const time = clock.elapsedTime;

    // --- Smooth mouse ---
    smoothMouse.current.x +=
      (mouse.current.x - smoothMouse.current.x) * MOUSE_LERP;
    smoothMouse.current.y +=
      (mouse.current.y - smoothMouse.current.y) * MOUSE_LERP;

    // --- Mouse influence fade in/out ---
    const targetInfluence = isHovered.current ? 1 : 0;
    mouseInfluence.current +=
      (targetInfluence - mouseInfluence.current) * 0.05;

    // --- Project mouse to world space on z=0 plane ---
    const vec = new THREE.Vector3(
      smoothMouse.current.x,
      smoothMouse.current.y,
      0.5
    );
    vec.unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    mouseWorld.current
      .copy(camera.position)
      .add(dir.multiplyScalar(dist));

    // --- Breathing scale oscillation ---
    const breathingScale = 1.0 + Math.sin(time * BREATHING_SPEED) * BREATHING_AMOUNT;

    // --- Vertex displacement ---
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const vertCount = posAttr.count;

    for (let i = 0; i < vertCount; i++) {
      const i3 = i * 3;

      // Original position on unit sphere
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Radial normal
      const nx = vertexNormals[i3];
      const ny = vertexNormals[i3 + 1];
      const nz = vertexNormals[i3 + 2];

      // Noise-based displacement along normal
      const noiseVal = noise(
        ox * 1.5 + time * NOISE_SPEED,
        oy * 1.5 + time * NOISE_SPEED * 0.7,
        oz * 1.5 + time * NOISE_SPEED * 0.5
      );

      let displacement = noiseVal * NOISE_AMPLITUDE;

      // --- Mouse attraction: vertices near mouse get extra outward push ---
      if (mouseInfluence.current > 0.01) {
        // Vertex world position (approximate, without group transform for simplicity)
        const vx = ox * breathingScale;
        const vy = oy * breathingScale;
        const vz = oz * breathingScale;

        const dx = vx - mouseWorld.current.x;
        const dy = vy - mouseWorld.current.y;
        const dz = vz - mouseWorld.current.z;
        const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
          // Smooth quadratic falloff
          const falloff = smoothstep(MOUSE_INFLUENCE_RADIUS, 0, distToMouse);
          displacement +=
            falloff * MOUSE_ATTRACT_STRENGTH * mouseInfluence.current;
        }
      }

      // Apply displacement along normal, then breathing scale
      arr[i3] = (ox + nx * displacement) * breathingScale;
      arr[i3 + 1] = (oy + ny * displacement) * breathingScale;
      arr[i3 + 2] = (oz + nz * displacement) * breathingScale;
    }

    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // --- Mouse tilt (parallax) ---
    const targetRotX =
      -smoothMouse.current.y * MAX_TILT * mouseInfluence.current;
    const targetRotY =
      smoothMouse.current.x * MAX_TILT * mouseInfluence.current;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * MOUSE_LERP;
    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * MOUSE_LERP;

    // --- Auto rotation ---
    groupRef.current.rotation.y += AUTO_ROTATION_SPEED;

    // --- Orbiting point light ---
    if (orbitLightRef.current) {
      const orbitRadius = 3;
      orbitLightRef.current.position.x =
        Math.cos(time * 0.4) * orbitRadius;
      orbitLightRef.current.position.y =
        Math.sin(time * 0.3) * orbitRadius * 0.5;
      orbitLightRef.current.position.z =
        Math.sin(time * 0.4) * orbitRadius;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[-3, 5, 4]}
        intensity={0.7}
        color="#ffffff"
      />
      <pointLight
        ref={orbitLightRef}
        color="#6366F1"
        intensity={0.5}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[3, -2, -4]}
        color="#F97316"
        intensity={0.3}
        distance={10}
        decay={2}
      />

      {/* The blob */}
      <group ref={groupRef}>
        <mesh ref={meshRef} geometry={geometry}>
          <meshPhysicalMaterial
            ref={materialRef}
            vertexColors
            metalness={0.15}
            roughness={0.2}
            emissive={EMISSIVE_DARK_INDIGO}
            emissiveIntensity={0.2}
            clearcoat={0.4}
            clearcoatRoughness={0.15}
            envMapIntensity={0.8}
          />
        </mesh>
      </group>
    </>
  );
}

// ---------------------------------------------------------------------------
// Orbiting particles around the blob
// ---------------------------------------------------------------------------
function OrbitingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Build particle data once
  const { positions, colors, sizes, orbits } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    const orb = new Float32Array(PARTICLE_COUNT * 4); // radius, speed, phaseX, phaseY

    const tmpColor = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      // Orbital parameters
      const radius =
        PARTICLE_ORBIT_RADIUS_MIN +
        Math.random() * (PARTICLE_ORBIT_RADIUS_MAX - PARTICLE_ORBIT_RADIUS_MIN);
      const speed = 0.15 + Math.random() * 0.25;
      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;

      orb[i4] = radius;
      orb[i4 + 1] = speed;
      orb[i4 + 2] = phaseX;
      orb[i4 + 3] = phaseY;

      // Initial position
      pos[i3] = Math.cos(phaseX) * radius;
      pos[i3 + 1] = Math.sin(phaseY) * radius * 0.6;
      pos[i3 + 2] = Math.sin(phaseX) * radius;

      // Color: mix of indigo and coral
      const t = Math.random();
      if (t < 0.6) {
        tmpColor.copy(COLOR_INDIGO);
      } else {
        tmpColor.copy(COLOR_CORAL);
      }
      // Add slight randomness
      tmpColor.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
      col[i3] = tmpColor.r;
      col[i3 + 1] = tmpColor.g;
      col[i3 + 2] = tmpColor.b;

      // Size: 0.015 - 0.04
      sz[i] = 0.015 + Math.random() * 0.025;
    }

    return { positions: pos, colors: col, sizes: sz, orbits: orb };
  }, []);

  // Soft circle texture for particles
  const particleTexture = useMemo(() => {
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      const radius = orbits[i4];
      const speed = orbits[i4 + 1];
      const phaseX = orbits[i4 + 2];
      const phaseY = orbits[i4 + 3];

      const angle = time * speed + phaseX;
      const angleY = time * speed * 0.7 + phaseY;

      posArr[i3] = Math.cos(angle) * radius;
      posArr[i3 + 1] =
        Math.sin(angleY) * radius * 0.6 +
        Math.sin(time * 0.3 + phaseX) * 0.2;
      posArr[i3 + 2] = Math.sin(angle) * radius;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.6}
        size={0.06}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Full scene: blob + particles
// ---------------------------------------------------------------------------
function BlobScene({ mouse, isHovered }: BlobSceneProps) {
  return (
    <>
      <BlobMesh mouse={mouse} isHovered={isHovered} />
      <OrbitingParticles />
    </>
  );
}

// ---------------------------------------------------------------------------
// Mouse tracking hook
// ---------------------------------------------------------------------------
function useMousePosition() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const isHovered = useRef(false);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    },
    []
  );

  const onPointerEnter = useCallback(() => {
    isHovered.current = true;
  }, []);

  const onPointerLeave = useCallback(() => {
    isHovered.current = false;
    mouse.current.set(0, 0);
  }, []);

  return { mouse, isHovered, onPointerMove, onPointerEnter, onPointerLeave };
}

// ---------------------------------------------------------------------------
// Exported OrganicBlob component - SSR-safe with mount check
// ---------------------------------------------------------------------------
export default function OrganicBlob({ className = "" }: OrganicBlobProps) {
  const [mounted, setMounted] = useState(false);
  const { mouse, isHovered, onPointerMove, onPointerEnter, onPointerLeave } =
    useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / pre-hydration fallback
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <div
      className={className}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      <Canvas
        camera={{ fov: 50, position: [0, 0, 4], near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <BlobScene mouse={mouse} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}

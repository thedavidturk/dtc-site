"use client";

import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 2500;
const SPHERE_RADIUS = 15;
const MOUSE_INFLUENCE_RADIUS = 3;
const MOUSE_REPULSION_STRENGTH = 0.8;
const LERP_FACTOR = 0.03;

// Brand colors
const COLOR_INDIGO = new THREE.Color("#6366F1");
const COLOR_CORAL = new THREE.Color("#F97316");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fibonacci sphere distribution for even particle spread */
function fibonacciSphere(index: number, total: number, radius: number): THREE.Vector3 {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2; // y goes from 1 to -1
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = goldenAngle * index;

  // Add some jitter so it looks organic, not perfectly uniform
  const jitter = 0.92 + Math.random() * 0.16;
  const r = radius * jitter;

  return new THREE.Vector3(
    Math.cos(theta) * radiusAtY * r,
    y * r,
    Math.sin(theta) * radiusAtY * r
  );
}

// ---------------------------------------------------------------------------
// Mouse tracker — updates a shared ref from pointer events on the Canvas
// ---------------------------------------------------------------------------
function useMousePosition() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 - 1;
  }, []);
  return { mouse, onPointerMove };
}

// ---------------------------------------------------------------------------
// Particle Nebula scene content
// ---------------------------------------------------------------------------
interface NebulaParticlesProps {
  mouse: React.MutableRefObject<THREE.Vector2>;
}

function NebulaParticles({ mouse }: NebulaParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Smoothed mouse for parallax
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  // Build geometry once
  const { positions, colors, sizes, basePositions, phases } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const ph = new Float32Array(PARTICLE_COUNT); // per-particle phase offset

    const tmpColor = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const v = fibonacciSphere(i, PARTICLE_COUNT, SPHERE_RADIUS);
      const i3 = i * 3;

      pos[i3] = v.x;
      pos[i3 + 1] = v.y;
      pos[i3 + 2] = v.z;

      base[i3] = v.x;
      base[i3 + 1] = v.y;
      base[i3 + 2] = v.z;

      // Blend between indigo and coral based on normalised height + some noise
      const t = (v.y / SPHERE_RADIUS + 1) * 0.5; // 0..1
      const noise = Math.random() * 0.3;
      tmpColor.copy(COLOR_INDIGO).lerp(COLOR_CORAL, THREE.MathUtils.clamp(t + noise - 0.15, 0, 1));
      col[i3] = tmpColor.r;
      col[i3 + 1] = tmpColor.g;
      col[i3 + 2] = tmpColor.b;

      // Varied sizes
      sz[i] = 0.02 + Math.random() * 0.13;

      // Random phase
      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, colors: col, sizes: sz, basePositions: base, phases: ph };
  }, []);

  // Texture for soft circle particles
  const particleTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.7, "rgba(255,255,255,0.15)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Project mouse into 3D for repulsion
  const { camera } = useThree();
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_state) => {
    if (!pointsRef.current || !groupRef.current) return;

    const time = _state.clock.elapsedTime;

    // --- Smooth mouse ---
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * LERP_FACTOR;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * LERP_FACTOR;

    // --- Parallax tilt ---
    const targetRotX = smoothMouse.current.y * 0.1;
    const targetRotY = smoothMouse.current.x * 0.1;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * LERP_FACTOR;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * LERP_FACTOR;

    // --- Slow auto rotation ---
    groupRef.current.rotation.y += 0.0003;
    groupRef.current.rotation.x += 0.0001;

    // --- Mouse world position (project onto z=0 plane for simplicity) ---
    const vec = new THREE.Vector3(smoothMouse.current.x, smoothMouse.current.y, 0.5);
    vec.unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    mouseWorld.current.copy(camera.position).add(dir.multiplyScalar(dist));

    // --- Animate particles ---
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      // Base oscillation
      const oscX = Math.sin(time * 0.3 + phase) * 0.15;
      const oscY = Math.cos(time * 0.25 + phase * 1.3) * 0.15;
      const oscZ = Math.sin(time * 0.2 + phase * 0.7) * 0.15;

      let tx = basePositions[i3] + oscX;
      let ty = basePositions[i3 + 1] + oscY;
      let tz = basePositions[i3 + 2] + oscZ;

      // Mouse repulsion
      const dx = tx - mouseWorld.current.x;
      const dy = ty - mouseWorld.current.y;
      const dz = tz; // mouse is on z=0 plane
      const distSq = dx * dx + dy * dy + dz * dz;
      const influence = MOUSE_INFLUENCE_RADIUS * MOUSE_INFLUENCE_RADIUS;

      if (distSq < influence && distSq > 0.001) {
        const d = Math.sqrt(distSq);
        const falloff = 1 - d / MOUSE_INFLUENCE_RADIUS;
        const push = MOUSE_REPULSION_STRENGTH * falloff * falloff;
        tx += (dx / d) * push;
        ty += (dy / d) * push;
        tz += (dz / d) * push;
      }

      // Lerp toward target for smoothness
      posArr[i3] += (tx - posArr[i3]) * 0.08;
      posArr[i3 + 1] += (ty - posArr[i3 + 1]) * 0.08;
      posArr[i3 + 2] += (tz - posArr[i3 + 2]) * 0.08;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
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
          opacity={0.7}
          size={0.12}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          map={particleTexture}
        />
      </points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Glow Orbs — large, translucent spheres that drift and pulse
// ---------------------------------------------------------------------------
function GlowOrbs() {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (orb1.current) {
      orb1.current.position.x = Math.sin(t * 0.15) * 4 - 5;
      orb1.current.position.y = Math.cos(t * 0.12) * 3 + 2;
      orb1.current.position.z = Math.sin(t * 0.1) * 2 - 3;
      const s1 = 2.5 + Math.sin(t * 0.4) * 0.4;
      orb1.current.scale.setScalar(s1);
    }

    if (orb2.current) {
      orb2.current.position.x = Math.cos(t * 0.1) * 5 + 4;
      orb2.current.position.y = Math.sin(t * 0.13) * 3 - 3;
      orb2.current.position.z = Math.cos(t * 0.08) * 2 + 1;
      const s2 = 2 + Math.cos(t * 0.35) * 0.35;
      orb2.current.scale.setScalar(s2);
    }

    if (orb3.current) {
      orb3.current.position.x = Math.sin(t * 0.08) * 3;
      orb3.current.position.y = Math.cos(t * 0.09) * 4;
      orb3.current.position.z = Math.sin(t * 0.11) * 2 + 2;
      const s3 = 3 + Math.sin(t * 0.3 + 1) * 0.5;
      orb3.current.scale.setScalar(s3);
    }
  });

  return (
    <>
      {/* Indigo orb */}
      <Sphere ref={orb1} args={[1, 16, 16]}>
        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Coral orb */}
      <Sphere ref={orb2} args={[1, 16, 16]}>
        <meshBasicMaterial
          color="#F97316"
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Mixed orb */}
      <Sphere ref={orb3} args={[1, 16, 16]}>
        <meshBasicMaterial
          color="#9B6AF0"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
    </>
  );
}

// ---------------------------------------------------------------------------
// Scene wrapper (holds particles + orbs)
// ---------------------------------------------------------------------------
function Scene({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  return (
    <>
      <NebulaParticles mouse={mouse} />
      <GlowOrbs />
    </>
  );
}

// ---------------------------------------------------------------------------
// Exported component — handles SSR, canvas, and pointer tracking
// ---------------------------------------------------------------------------
export default function ParticleNebula() {
  const [mounted, setMounted] = useState(false);
  const { mouse, onPointerMove } = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / pre-hydration fallback
    return (
      <div className="absolute inset-0 z-0 bg-deep-space" aria-hidden="true" />
    );
  }

  return (
    <div
      className="absolute inset-0 z-0"
      onPointerMove={onPointerMove}
      aria-hidden="true"
    >
      <Canvas
        camera={{ fov: 75, position: [0, 0, 30], near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}

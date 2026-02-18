"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CinematicIntroProps {
  onComplete: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DEEP_SPACE = "#0B0F19";
const ELECTRIC_INDIGO = "#6366F1";
const WARM_CORAL = "#F97316";

const PARTICLE_COUNT = 300;
const AMBIENT_COUNT = 120;

// ---------------------------------------------------------------------------
// Letter position generators
// ---------------------------------------------------------------------------

/** Generate approximate positions for the letter "D" */
function generateD(offsetX: number, scale: number): [number, number][] {
  const pts: [number, number][] = [];
  // Vertical bar
  for (let i = 0; i < 14; i++) {
    const y = (i / 13) * 2 - 1;
    pts.push([offsetX, y * scale]);
  }
  // Right curve
  for (let i = 0; i < 18; i++) {
    const angle = (i / 17) * Math.PI - Math.PI / 2;
    const cx = offsetX + 0.5 * scale;
    const cy = 0;
    pts.push([cx + Math.cos(angle) * 0.5 * scale, cy + Math.sin(angle) * scale]);
  }
  return pts;
}

/** Generate approximate positions for the letter "T" */
function generateT(offsetX: number, scale: number): [number, number][] {
  const pts: [number, number][] = [];
  // Horizontal top
  for (let i = 0; i < 14; i++) {
    const x = (i / 13) * 1.2 - 0.6;
    pts.push([offsetX + x * scale, scale]);
  }
  // Vertical center
  for (let i = 0; i < 16; i++) {
    const y = (i / 15) * 2 - 1;
    pts.push([offsetX, y * scale]);
  }
  return pts;
}

/** Generate approximate positions for "+" */
function generatePlus(offsetX: number, scale: number): [number, number][] {
  const pts: [number, number][] = [];
  // Horizontal
  for (let i = 0; i < 10; i++) {
    const x = (i / 9) * 1.0 - 0.5;
    pts.push([offsetX + x * scale, 0]);
  }
  // Vertical
  for (let i = 0; i < 10; i++) {
    const y = (i / 9) * 1.0 - 0.5;
    pts.push([offsetX, y * scale]);
  }
  return pts;
}

/** Generate approximate positions for the letter "C" */
function generateC(offsetX: number, scale: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < 22; i++) {
    const angle = (i / 21) * Math.PI * 1.4 + Math.PI * 0.3;
    pts.push([
      offsetX + Math.cos(angle) * 0.6 * scale,
      Math.sin(angle) * scale,
    ]);
  }
  return pts;
}

/** Build all letter target positions with jitter */
function buildLetterPositions(): [number, number][] {
  const scale = 1.2;
  const allPts: [number, number][] = [
    ...generateD(-2.8, scale),
    ...generateT(-1.0, scale),
    ...generatePlus(0.7, scale),
    ...generateC(2.4, scale),
  ];
  // Add small jitter
  return allPts.map(([x, y]) => [
    x + (Math.random() - 0.5) * 0.12,
    y + (Math.random() - 0.5) * 0.12,
  ]);
}

// ---------------------------------------------------------------------------
// Particle Texture (soft circle)
// ---------------------------------------------------------------------------
function createParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.15)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Shockwave Ring
// ---------------------------------------------------------------------------
function ShockwaveRing({ startTime }: { startTime: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const elapsed = clock.getElapsedTime() - startTime.current;

    if (elapsed < 2.0 || elapsed > 2.8) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;
    const t = (elapsed - 2.0) / 0.8; // 0 -> 1
    const radius = t * 8;
    meshRef.current.scale.set(radius, radius, radius);

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.5 * (1 - t);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]} visible={false}>
      <torusGeometry args={[1, 0.015, 8, 64]} />
      <meshBasicMaterial
        color="#FFFFFF"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Pulse Ring (initial spark)
// ---------------------------------------------------------------------------
function PulseRing({ startTime }: { startTime: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const elapsed = clock.getElapsedTime() - startTime.current;

    if (elapsed < 0.2 || elapsed > 1.2) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;
    const t = (elapsed - 0.2) / 1.0;
    const radius = t * 3;
    meshRef.current.scale.set(radius, radius, radius);

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.4 * (1 - t);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]} visible={false}>
      <torusGeometry args={[1, 0.01, 8, 64]} />
      <meshBasicMaterial
        color="#FFFFFF"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Central Light Sphere
// ---------------------------------------------------------------------------
function CentralLight({ startTime }: { startTime: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || !lightRef.current) return;
    const elapsed = clock.getElapsedTime() - startTime.current;

    if (elapsed < 0.2) {
      meshRef.current.visible = false;
      lightRef.current.intensity = 0;
      return;
    }

    meshRef.current.visible = true;

    // Phase 1 (0.2-1s): appear and grow
    if (elapsed < 1.0) {
      const t = (elapsed - 0.2) / 0.8;
      const scale = 0.02 + t * 0.08;
      meshRef.current.scale.setScalar(scale * 10);
      lightRef.current.intensity = t * 2;
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.8 + t * 0.2;
    }
    // Phase 2 (1-2s): pulse and intensify
    else if (elapsed < 2.0) {
      const t = (elapsed - 1.0);
      const pulse = 1 + Math.sin(t * 8) * 0.15;
      const growFactor = 1 + t * 0.3;
      meshRef.current.scale.setScalar(1.0 * pulse * growFactor);
      lightRef.current.intensity = 2 + t * 2 + Math.sin(t * 8) * 0.5;
      // Energy build-up near end of phase 2
      if (elapsed > 1.7) {
        const buildT = (elapsed - 1.7) / 0.3;
        lightRef.current.intensity = 4 + buildT * 4;
        meshRef.current.scale.setScalar(1.3 * (1 + buildT * 0.5));
      }
    }
    // Phase 3 (2-2.8s): flash then fade
    else if (elapsed < 2.8) {
      const t = (elapsed - 2.0) / 0.8;
      if (t < 0.1) {
        // Bright flash
        meshRef.current.scale.setScalar(3);
        lightRef.current.intensity = 12;
      } else {
        const fadeT = (t - 0.1) / 0.9;
        meshRef.current.scale.setScalar(3 * (1 - fadeT));
        lightRef.current.intensity = 12 * (1 - fadeT);
      }
    }
    // Phase 4 (2.8+): gone
    else {
      meshRef.current.visible = false;
      lightRef.current.intensity = 0;
    }
  });

  return (
    <>
      <mesh ref={meshRef} visible={false}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight ref={lightRef} color="#FFFFFF" intensity={0} distance={30} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Particles
// ---------------------------------------------------------------------------
function IntroParticles({ startTime }: { startTime: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const letterTargets = useMemo(() => buildLetterPositions(), []);

  const particleTexture = useMemo(() => createParticleTexture(), []);

  const data = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    // Per-particle data stored as plain arrays for animation
    const startPositions: number[][] = [];
    const letterPositions: number[][] = [];
    const explodeVelocities: number[][] = [];
    const particlePhases: number[] = [];

    const colorIndigo = new THREE.Color(ELECTRIC_INDIGO);
    const colorCoral = new THREE.Color(WARM_CORAL);
    const tmpColor = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Start near center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.3;
      const z = (Math.random() - 0.5) * 0.3;
      const sx = Math.cos(angle) * radius;
      const sy = Math.sin(angle) * radius;
      startPositions.push([sx, sy, z]);

      // Letter target
      const letterIdx = i % letterTargets.length;
      const [lx, ly] = letterTargets[letterIdx];
      letterPositions.push([lx, ly, (Math.random() - 0.5) * 0.3]);

      // Explode velocity (outward from center, with variation)
      const explodeAngle = Math.random() * Math.PI * 2;
      const explodePhi = Math.acos(2 * Math.random() - 1);
      const speed = 3 + Math.random() * 2;
      explodeVelocities.push([
        Math.sin(explodePhi) * Math.cos(explodeAngle) * speed,
        Math.sin(explodePhi) * Math.sin(explodeAngle) * speed,
        Math.cos(explodePhi) * speed,
      ]);

      particlePhases.push(Math.random() * Math.PI * 2);

      // Initial positions at center
      const i3 = i * 3;
      positions[i3] = sx;
      positions[i3 + 1] = sy;
      positions[i3 + 2] = z;

      // Color mix
      const t = Math.random();
      tmpColor.copy(colorIndigo).lerp(colorCoral, t);
      colors[i3] = tmpColor.r;
      colors[i3 + 1] = tmpColor.g;
      colors[i3 + 2] = tmpColor.b;

      sizes[i] = 0.04 + Math.random() * 0.08;
    }

    return {
      positions,
      colors,
      sizes,
      startPositions,
      letterPositions,
      explodeVelocities,
      particlePhases,
    };
  }, [letterTargets]);

  // Track positions during explosion (current animated positions)
  const explodePositions = useRef<number[][] | null>(null);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime() - startTime.current;
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = data.particlePhases[i];

      // Phase 1 (0-1s): drift from start toward letter positions
      if (elapsed < 1.0) {
        const t = Math.min(1, Math.max(0, (elapsed - 0.2) / 0.8));
        const eased = t * t * (3 - 2 * t); // smoothstep
        posArr[i3] = data.startPositions[i][0] + (data.letterPositions[i][0] - data.startPositions[i][0]) * eased * 0.6;
        posArr[i3 + 1] = data.startPositions[i][1] + (data.letterPositions[i][1] - data.startPositions[i][1]) * eased * 0.6;
        posArr[i3 + 2] = data.startPositions[i][2] + (data.letterPositions[i][2] - data.startPositions[i][2]) * eased * 0.6;
      }
      // Phase 2 (1-2s): settle into letter positions with vibration buildup
      else if (elapsed < 2.0) {
        const t = (elapsed - 1.0) / 1.0;
        const eased = t * t * (3 - 2 * t);

        // Lerp rest of the way to letter positions
        const lerpT = 0.6 + 0.4 * eased;
        const baseX = data.startPositions[i][0] + (data.letterPositions[i][0] - data.startPositions[i][0]) * lerpT;
        const baseY = data.startPositions[i][1] + (data.letterPositions[i][1] - data.startPositions[i][1]) * lerpT;
        const baseZ = data.startPositions[i][2] + (data.letterPositions[i][2] - data.startPositions[i][2]) * lerpT;

        // Vibration increases toward end of phase 2
        let vibration = 0;
        if (elapsed > 1.7) {
          vibration = ((elapsed - 1.7) / 0.3) * 0.15;
        }

        posArr[i3] = baseX + Math.sin(elapsed * 30 + phase) * vibration;
        posArr[i3 + 1] = baseY + Math.cos(elapsed * 25 + phase * 1.3) * vibration;
        posArr[i3 + 2] = baseZ + Math.sin(elapsed * 20 + phase * 0.7) * vibration;

        // Store positions for explosion start
        if (elapsed > 1.95 && !explodePositions.current) {
          explodePositions.current = [];
          for (let j = 0; j < PARTICLE_COUNT; j++) {
            const j3 = j * 3;
            explodePositions.current.push([posArr[j3], posArr[j3 + 1], posArr[j3 + 2]]);
          }
        }
      }
      // Phase 3 (2-2.8s): explosion outward
      else if (elapsed < 2.8) {
        const t = elapsed - 2.0;
        const decel = Math.exp(-t * 1.5); // deceleration

        const startPos = explodePositions.current
          ? explodePositions.current[i]
          : [data.letterPositions[i][0], data.letterPositions[i][1], data.letterPositions[i][2]];

        posArr[i3] = startPos[0] + data.explodeVelocities[i][0] * t * decel;
        posArr[i3 + 1] = startPos[1] + data.explodeVelocities[i][1] * t * decel;
        posArr[i3 + 2] = startPos[2] + data.explodeVelocities[i][2] * t * decel;
      }
      // Phase 4 (2.8+): drift outward and fade
      else {
        const t = elapsed - 2.0;
        const decel = Math.exp(-t * 1.5);

        const startPos = explodePositions.current
          ? explodePositions.current[i]
          : [data.letterPositions[i][0], data.letterPositions[i][1], data.letterPositions[i][2]];

        posArr[i3] = startPos[0] + data.explodeVelocities[i][0] * t * decel;
        posArr[i3 + 1] = startPos[1] + data.explodeVelocities[i][1] * t * decel;
        posArr[i3 + 2] = startPos[2] + data.explodeVelocities[i][2] * t * decel;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Fade out particles in phase 4
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (elapsed > 2.8) {
      const fadeT = Math.min(1, (elapsed - 2.8) / 1.2);
      mat.opacity = 0.85 * (1 - fadeT);
    } else {
      // Fade in during phase 1
      const fadeIn = Math.min(1, elapsed / 0.5);
      mat.opacity = 0.85 * fadeIn;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
          count={PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[data.colors, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.85}
        size={0.15}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Ambient Background Stars
// ---------------------------------------------------------------------------
function AmbientStars({ startTime }: { startTime: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleTexture = useMemo(() => createParticleTexture(), []);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(AMBIENT_COUNT * 3);
    const col = new Float32Array(AMBIENT_COUNT * 3);

    for (let i = 0; i < AMBIENT_COUNT; i++) {
      const i3 = i * 3;
      // Spread across a larger area
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 15 - 5;

      // Mostly white/bluish
      const t = Math.random();
      col[i3] = 0.7 + t * 0.3;
      col[i3 + 1] = 0.7 + t * 0.3;
      col[i3 + 2] = 0.85 + t * 0.15;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime() - startTime.current;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    // Fade in during phase 2
    if (elapsed < 1.0) {
      mat.opacity = 0;
    } else if (elapsed < 2.0) {
      mat.opacity = ((elapsed - 1.0) / 1.0) * 0.4;
    } else if (elapsed > 2.8) {
      const fadeT = Math.min(1, (elapsed - 2.8) / 1.2);
      mat.opacity = 0.4 * (1 - fadeT);
    } else {
      mat.opacity = 0.4;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={AMBIENT_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={AMBIENT_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0}
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
// Scene wrapper
// ---------------------------------------------------------------------------
function IntroScene({ startTime }: { startTime: React.MutableRefObject<number> }) {
  return (
    <>
      <CentralLight startTime={startTime} />
      <PulseRing startTime={startTime} />
      <ShockwaveRing startTime={startTime} />
      <IntroParticles startTime={startTime} />
      <AmbientStars startTime={startTime} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);
  const startTime = useRef(0);
  const hasStarted = useRef(false);

  const setStartTime = useCallback((time: number) => {
    if (!hasStarted.current) {
      startTime.current = time;
      hasStarted.current = true;
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // After the 3D detonation + particle fade, begin overlay fade-out
    timers.push(setTimeout(() => setFadeOut(true), 2800));
    // Remove overlay and signal completion so Hero can animate its text in
    timers.push(
      setTimeout(() => {
        setRemoved(true);
        onComplete();
      }, 3300)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [mounted, onComplete]);

  if (!mounted || removed) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="absolute inset-0" style={{ background: DEEP_SPACE }}>
        <Canvas
          camera={{ fov: 60, position: [0, 0, 8], near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
          frameloop="always"
        >
          <color attach="background" args={[DEEP_SPACE]} />
          <StartTimeTracker onStart={setStartTime} />
          <IntroScene startTime={startTime} />
        </Canvas>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: tracks when the canvas clock starts and reports it
// ---------------------------------------------------------------------------
function StartTimeTracker({ onStart }: { onStart: (time: number) => void }) {
  const reported = useRef(false);

  useFrame(({ clock }) => {
    if (!reported.current) {
      onStart(clock.getElapsedTime());
      reported.current = true;
    }
  });

  return null;
}

"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CinematicIntroProps {
  onComplete: () => void;
  onReady?: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DEEP_SPACE = "#0B0F19";
const ELECTRIC_INDIGO = "#6366F1";
const WARM_CORAL = "#F97316";

const PARTICLE_COUNT = 300;
const AMBIENT_COUNT = 120;
const WARP_PARTICLE_COUNT = 800;

/** Time offset added to all original phases so the warp tunnel plays first */
const WARP_DURATION = 2.0;

// ---------------------------------------------------------------------------
// Letter position generators
// ---------------------------------------------------------------------------

/** Generate approximate positions for the letter "D" */
function generateD(offsetX: number, scale: number): [number, number][] {
  const pts: [number, number][] = [];
  // Vertical bar
  for (let i = 0; i < 16; i++) {
    const y = (i / 15) * 2 - 1;
    pts.push([offsetX - 0.35 * scale, y * scale]);
  }
  // Right curve
  for (let i = 0; i < 20; i++) {
    const angle = -Math.PI / 2 + (i / 19) * Math.PI;
    pts.push([
      offsetX + Math.cos(angle) * 0.45 * scale,
      Math.sin(angle) * scale,
    ]);
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

/** Generate approximate positions for the "+" symbol */
function generatePlus(offsetX: number, scale: number): [number, number][] {
  const pts: [number, number][] = [];
  // Vertical bar
  for (let i = 0; i < 14; i++) {
    const y = (i / 13) * 1.6 - 0.8;
    pts.push([offsetX, y * scale]);
  }
  // Horizontal bar
  for (let i = 0; i < 14; i++) {
    const x = (i / 13) * 1.6 - 0.8;
    pts.push([offsetX + x * scale, 0]);
  }
  return pts;
}

/** Generate approximate positions for the letter "C" */
function generateC(offsetX: number, scale: number): [number, number][] {
  const pts: [number, number][] = [];
  // Arc from top-right around to bottom-right (open on the right)
  for (let i = 0; i < 28; i++) {
    const angle = Math.PI / 3 + (i / 27) * (Math.PI * 4 / 3);
    pts.push([
      offsetX + Math.cos(angle) * 0.5 * scale,
      Math.sin(angle) * scale,
    ]);
  }
  return pts;
}

/** Build all letter target positions with jitter */
function buildLetterPositions(): [number, number][] {
  const scale = 1.1;
  const allPts: [number, number][] = [
    ...generateD(-2.8, scale),
    ...generateT(-1.2, scale),
    ...generatePlus(0.4, scale),
    ...generateC(2.2, scale),
  ];
  // Add small jitter
  return allPts.map(([x, y]) => [
    x + (Math.random() - 0.5) * 0.1,
    y + (Math.random() - 0.5) * 0.1,
  ]);
}

// ---------------------------------------------------------------------------
// Particle Texture (soft circle)
// ---------------------------------------------------------------------------
function createParticleTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.1, "rgba(255,255,255,0.9)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.4)");
  gradient.addColorStop(0.6, "rgba(255,255,255,0.08)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Create a soft, spherical glow texture for warp particles */
function createWarpTexture(): THREE.CanvasTexture {
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
  gradient.addColorStop(0.15, "rgba(255,255,255,0.7)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.15)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.03)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Warp Tunnel
// ---------------------------------------------------------------------------
function WarpTunnel({ startTime }: { startTime: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleTexture = useMemo(() => createWarpTexture(), []);

  const data = useMemo(() => {
    const positions = new Float32Array(WARP_PARTICLE_COUNT * 3);
    const colors = new Float32Array(WARP_PARTICLE_COUNT * 3);

    const colorWhite = new THREE.Color(1, 1, 1);
    const colorIndigo = new THREE.Color(ELECTRIC_INDIGO);
    const colorCoral = new THREE.Color(WARM_CORAL);
    const tmpColor = new THREE.Color();

    // Per-particle base data for animation
    const angles: number[] = [];
    const radii: number[] = [];
    const zOffsets: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < WARP_PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 5; // 3-8
      const z = (Math.random() - 0.5) * 100; // -50 to 50
      const speed = 15 + Math.random() * 25; // base speed (will be multiplied by acceleration)

      angles.push(angle);
      radii.push(radius);
      zOffsets.push(z);
      speeds.push(speed);

      const i3 = i * 3;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius;
      positions[i3 + 2] = z;

      // Color: 70% white, 20% electric-indigo, 10% warm-coral
      const roll = Math.random();
      if (roll < 0.7) {
        tmpColor.copy(colorWhite);
        // Slight warmth variation
        tmpColor.r = 0.9 + Math.random() * 0.1;
        tmpColor.g = 0.9 + Math.random() * 0.1;
        tmpColor.b = 0.95 + Math.random() * 0.05;
      } else if (roll < 0.9) {
        tmpColor.copy(colorIndigo);
        tmpColor.lerp(colorWhite, 0.3 + Math.random() * 0.3);
      } else {
        tmpColor.copy(colorCoral);
        tmpColor.lerp(colorWhite, 0.3 + Math.random() * 0.3);
      }
      colors[i3] = tmpColor.r;
      colors[i3 + 1] = tmpColor.g;
      colors[i3 + 2] = tmpColor.b;
    }

    return { positions, colors, angles, radii, zOffsets, speeds };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime() - startTime.current;

    // Warp tunnel only active 0 - 2.2s (extra 0.2s for fade-out)
    if (elapsed > WARP_DURATION + 0.3) {
      pointsRef.current.visible = false;
      return;
    }

    pointsRef.current.visible = true;

    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Acceleration curve: starts slow, gets very fast
    // Normalized time within warp phase
    const warpT = Math.min(1, elapsed / WARP_DURATION);
    // Ease-in-quad acceleration
    const accel = 0.3 + warpT * warpT * 3.0;

    // Convergence: between t=1.5 and t=2.0, radius shrinks toward center
    const convergeStart = 1.5;
    const convergeT = elapsed > convergeStart
      ? Math.min(1, (elapsed - convergeStart) / (WARP_DURATION - convergeStart))
      : 0;
    // Smooth convergence with ease-in-out
    const convergeFactor = convergeT * convergeT * (3 - 2 * convergeT);
    const radiusMultiplier = 1 - convergeFactor * 0.92; // shrink to ~8% of original radius

    // Camera z position (used to determine wrap-around point)
    const cameraZ = 50 - (50 - 8) * (warpT * warpT * (3 - 2 * warpT));

    for (let i = 0; i < WARP_PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Move particle toward camera (increase z)
      data.zOffsets[i] += data.speeds[i] * accel * 0.016; // ~60fps dt

      // Wrap around: if particle passes camera, send it back
      if (data.zOffsets[i] > cameraZ + 5) {
        data.zOffsets[i] -= 100;
      }

      const currentRadius = data.radii[i] * radiusMultiplier;
      posArr[i3] = Math.cos(data.angles[i]) * currentRadius;
      posArr[i3 + 1] = Math.sin(data.angles[i]) * currentRadius;
      posArr[i3 + 2] = data.zOffsets[i];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Opacity: fade in 0-0.5, full 0.5-1.8, fade out 1.8-2.2
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (elapsed < 0.5) {
      mat.opacity = (elapsed / 0.5) * 0.75;
    } else if (elapsed < WARP_DURATION - 0.2) {
      mat.opacity = 0.75;
    } else {
      const fadeOutT = (elapsed - (WARP_DURATION - 0.2)) / 0.4;
      mat.opacity = 0.75 * Math.max(0, 1 - fadeOutT);
    }

    // Soft spherical particles that grow slightly with speed
    mat.size = 0.12 + warpT * 0.14;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
          count={WARP_PARTICLE_COUNT}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[data.colors, 3]}
          count={WARP_PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0}
        size={0.12}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Camera Controller (warp movement then static)
// ---------------------------------------------------------------------------
function CameraController({ startTime }: { startTime: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime() - startTime.current;

    if (elapsed < WARP_DURATION) {
      // Smoothstep from z=50 to z=8 during warp phase
      const t = Math.min(1, elapsed / WARP_DURATION);
      const eased = t * t * (3 - 2 * t);
      camera.position.z = 50 - (50 - 8) * eased;
    } else {
      // Hold at z=8 for the letter formation phases
      camera.position.z = 8;
    }

    camera.position.x = 0;
    camera.position.y = 0;
  });

  return null;
}

// ---------------------------------------------------------------------------
// Main Particles (shifted by +WARP_DURATION)
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
      // Start near center (particles emerge from the warp convergence point)
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

      sizes[i] = 0.08 + Math.random() * 0.14;
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

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime() - startTime.current;

    // Use local time shifted by WARP_DURATION
    const t_local = elapsed - WARP_DURATION;

    // Don't render until warp phase is nearly done
    if (t_local < -0.1) {
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0;
      return;
    }

    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = data.particlePhases[i];

      // Phase 1 (0-1s local): drift from start toward letter positions
      if (t_local < 1.0) {
        const t = Math.min(1, Math.max(0, (t_local - 0.2) / 0.8));
        const eased = t * t * (3 - 2 * t); // smoothstep
        posArr[i3] = data.startPositions[i][0] + (data.letterPositions[i][0] - data.startPositions[i][0]) * eased * 0.6;
        posArr[i3 + 1] = data.startPositions[i][1] + (data.letterPositions[i][1] - data.startPositions[i][1]) * eased * 0.6;
        posArr[i3 + 2] = data.startPositions[i][2] + (data.letterPositions[i][2] - data.startPositions[i][2]) * eased * 0.6;
      }
      // Phase 2 (1-2.2s local): settle into letter positions and hold
      else if (t_local < 2.2) {
        const t = Math.min(1, (t_local - 1.0) / 1.0);
        const eased = t * t * (3 - 2 * t);

        // Lerp rest of the way to letter positions
        const lerpT = 0.6 + 0.4 * eased;
        const baseX = data.startPositions[i][0] + (data.letterPositions[i][0] - data.startPositions[i][0]) * lerpT;
        const baseY = data.startPositions[i][1] + (data.letterPositions[i][1] - data.startPositions[i][1]) * lerpT;
        const baseZ = data.startPositions[i][2] + (data.letterPositions[i][2] - data.startPositions[i][2]) * lerpT;

        // Gentle shimmer while holding
        const shimmer = 0.02;
        posArr[i3] = baseX + Math.sin(t_local * 4 + phase) * shimmer;
        posArr[i3 + 1] = baseY + Math.cos(t_local * 3.5 + phase * 1.3) * shimmer;
        posArr[i3 + 2] = baseZ;
      }
      // Phase 3 (2.2+ local): gentle dissolve — particles drift slowly outward
      else {
        const t = t_local - 2.2;
        const driftSpeed = 0.4;

        const baseX = data.letterPositions[i][0];
        const baseY = data.letterPositions[i][1];
        const baseZ = data.letterPositions[i][2];

        // Gentle outward drift using explode velocities at very low speed
        posArr[i3] = baseX + data.explodeVelocities[i][0] * t * driftSpeed * 0.15;
        posArr[i3 + 1] = baseY + data.explodeVelocities[i][1] * t * driftSpeed * 0.15;
        posArr[i3 + 2] = baseZ + data.explodeVelocities[i][2] * t * driftSpeed * 0.1;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Particle opacity
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (t_local < 0) {
      mat.opacity = 0;
    } else if (t_local < 0.5) {
      // Fade in during phase 1
      mat.opacity = 0.85 * (t_local / 0.5);
    } else if (t_local < 2.2) {
      // Full opacity while forming and holding
      mat.opacity = 0.85;
    } else {
      // Gentle dissolve fade starting when particles drift
      const fadeT = Math.min(1, (t_local - 2.2) / 1.0);
      mat.opacity = 0.85 * (1 - fadeT * fadeT); // ease-in fade
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
        opacity={0}
        size={0.22}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Ambient Background Stars (shifted by +WARP_DURATION)
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

    // Shift all timings by +WARP_DURATION
    const t_local = elapsed - WARP_DURATION;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    // Fade in during phase 2 (local time)
    if (t_local < 1.0) {
      mat.opacity = 0;
    } else if (t_local < 2.0) {
      mat.opacity = ((t_local - 1.0) / 1.0) * 0.4;
    } else if (t_local > 2.2) {
      const fadeT = Math.min(1, (t_local - 2.2) / 1.0);
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
      <CameraController startTime={startTime} />
      <WarpTunnel startTime={startTime} />
      <IntroParticles startTime={startTime} />
      <AmbientStars startTime={startTime} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function CinematicIntro({ onComplete, onReady }: CinematicIntroProps) {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [canvasError, setCanvasError] = useState(false);
  const startTime = useRef(0);
  const hasStarted = useRef(false);
  const completedRef = useRef(false);

  const setStartTime = useCallback((time: number) => {
    if (!hasStarted.current) {
      startTime.current = time;
      hasStarted.current = true;
    }
  }, []);

  const safeComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setRemoved(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // After the 3D detonation + particle fade, begin overlay fade-out
    // Start fade slightly earlier for a smoother blend
    timers.push(setTimeout(() => setFadeOut(true), 4500));
    // Remove overlay after the 1.2s CSS fade completes
    timers.push(setTimeout(safeComplete, 5800));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [mounted, safeComplete]);

  // If Canvas fails to create a WebGL context, skip the intro gracefully
  useEffect(() => {
    if (canvasError) {
      safeComplete();
    }
  }, [canvasError, safeComplete]);

  if (!mounted || removed) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1.2s ease-in-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="absolute inset-0" style={{ background: DEEP_SPACE }}>
        <Canvas
          camera={{ fov: 60, position: [0, 0, 50], near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
          frameloop="always"
          onCreated={() => {}}
          onError={() => setCanvasError(true)}
        >
          <color attach="background" args={[DEEP_SPACE]} />
          <StartTimeTracker onStart={setStartTime} onReady={onReady} />
          <IntroScene startTime={startTime} />
        </Canvas>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: tracks when the canvas clock starts and reports it
// ---------------------------------------------------------------------------
function StartTimeTracker({ onStart, onReady }: { onStart: (time: number) => void; onReady?: () => void }) {
  const reported = useRef(false);

  useFrame(({ clock }) => {
    if (!reported.current) {
      onStart(clock.getElapsedTime());
      onReady?.();
      reported.current = true;
    }
  });

  return null;
}

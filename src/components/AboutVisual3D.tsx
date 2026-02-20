"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const COLOR_INDIGO = "#6366F1";
const COLOR_CORAL = "#F97316";
const DEEP_SPACE = "#0B0F19";
const PARTICLE_COUNT = 60;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AboutVisual3DProps {
  className?: string;
}

interface InputState {
  mouseX: number;
  mouseY: number;
  scroll: number;
}

// ---------------------------------------------------------------------------
// Letter shape builders — return ExtrudeGeometry for each character
// ---------------------------------------------------------------------------
function buildLetterD(): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(0, 1.2);
  s.lineTo(0.35, 1.2);
  s.quadraticCurveTo(0.85, 1.2, 0.85, 0.6);
  s.quadraticCurveTo(0.85, 0, 0.35, 0);
  s.lineTo(0, 0);

  const hole = new THREE.Path();
  hole.moveTo(0.18, 0.18);
  hole.lineTo(0.18, 1.02);
  hole.lineTo(0.32, 1.02);
  hole.quadraticCurveTo(0.67, 1.02, 0.67, 0.6);
  hole.quadraticCurveTo(0.67, 0.18, 0.32, 0.18);
  hole.lineTo(0.18, 0.18);
  s.holes.push(hole);

  return new THREE.ExtrudeGeometry(s, { depth: 0.25, bevelEnabled: false });
}

function buildLetterT(): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  // Top bar
  s.moveTo(0, 1.02);
  s.lineTo(0.8, 1.02);
  s.lineTo(0.8, 1.2);
  s.lineTo(0, 1.2);
  s.lineTo(0, 1.02);
  // Vertical stem
  const stem = new THREE.Shape();
  stem.moveTo(0.31, 0);
  stem.lineTo(0.49, 0);
  stem.lineTo(0.49, 1.02);
  stem.lineTo(0.31, 1.02);
  stem.lineTo(0.31, 0);

  // Combine by making a single shape for the T
  const combined = new THREE.Shape();
  // Top bar
  combined.moveTo(0, 1.02);
  combined.lineTo(0, 1.2);
  combined.lineTo(0.8, 1.2);
  combined.lineTo(0.8, 1.02);
  // Step down to stem right
  combined.lineTo(0.49, 1.02);
  combined.lineTo(0.49, 0);
  combined.lineTo(0.31, 0);
  combined.lineTo(0.31, 1.02);
  combined.lineTo(0, 1.02);

  return new THREE.ExtrudeGeometry(combined, { depth: 0.25, bevelEnabled: false });
}

function buildPlus(): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  const w = 0.5;
  const h = 0.5;
  const t = 0.14; // bar thickness
  const cx = w / 2;
  const cy = h / 2;

  // Cross shape
  s.moveTo(cx - t / 2, 0);
  s.lineTo(cx + t / 2, 0);
  s.lineTo(cx + t / 2, cy - t / 2);
  s.lineTo(w, cy - t / 2);
  s.lineTo(w, cy + t / 2);
  s.lineTo(cx + t / 2, cy + t / 2);
  s.lineTo(cx + t / 2, h);
  s.lineTo(cx - t / 2, h);
  s.lineTo(cx - t / 2, cy + t / 2);
  s.lineTo(0, cy + t / 2);
  s.lineTo(0, cy - t / 2);
  s.lineTo(cx - t / 2, cy - t / 2);
  s.lineTo(cx - t / 2, 0);

  return new THREE.ExtrudeGeometry(s, { depth: 0.25, bevelEnabled: false });
}

function buildLetterC(): THREE.ExtrudeGeometry {
  const s = new THREE.Shape();
  const segments = 24;
  const outerR = 0.6;
  const innerR = 0.42;
  const startAngle = 0.45; // gap opening angle
  const endAngle = Math.PI * 2 - 0.45;

  // Outer arc
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + (i / segments) * (endAngle - startAngle);
    const x = 0.45 + Math.cos(angle) * outerR;
    const y = 0.6 + Math.sin(angle) * outerR;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }

  // Inner arc (reverse)
  for (let i = segments; i >= 0; i--) {
    const angle = startAngle + (i / segments) * (endAngle - startAngle);
    const x = 0.45 + Math.cos(angle) * innerR;
    const y = 0.6 + Math.sin(angle) * innerR;
    s.lineTo(x, y);
  }

  s.closePath();

  return new THREE.ExtrudeGeometry(s, { depth: 0.25, bevelEnabled: false });
}

// ---------------------------------------------------------------------------
// DTCText — the 3D letters group
// ---------------------------------------------------------------------------
function DTCText({ input }: { input: React.MutableRefObject<InputState> }) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });

  const geometries = useMemo(() => {
    const d = buildLetterD();
    const t = buildLetterT();
    const plus = buildPlus();
    const c = buildLetterC();

    // Center each geometry vertically
    d.center();
    t.center();
    plus.center();
    c.center();

    return { d, t, plus, c };
  }, []);

  // Letter refs for individual animation
  const dRef = useRef<THREE.Mesh>(null);
  const tRef = useRef<THREE.Mesh>(null);
  const plusRef = useRef<THREE.Mesh>(null);
  const cRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.elapsedTime;
    const { mouseX, mouseY, scroll } = input.current;

    // Smooth mouse
    smoothMouse.current.x += (mouseX - smoothMouse.current.x) * 0.08;
    smoothMouse.current.y += (mouseY - smoothMouse.current.y) * 0.08;
    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;
    const mouseStrength = Math.sqrt(mx * mx + my * my);

    // Group rotation — tilts toward mouse
    groupRef.current.rotation.y = mx * 0.5;
    groupRef.current.rotation.x = -my * 0.35;

    // Gentle floating bob
    groupRef.current.position.y = Math.sin(time * 0.4) * 0.08;

    // Scroll pushes slightly back and rotates
    groupRef.current.rotation.z = scroll * 0.15;
    groupRef.current.position.z = -scroll * 0.5;

    // Individual letter reactions
    const letterRefs = [dRef, tRef, plusRef, cRef];
    letterRefs.forEach((ref, i) => {
      if (!ref.current) return;
      // Each letter bobs at a different phase
      ref.current.position.y =
        ref.current.userData.baseY +
        Math.sin(time * 0.6 + i * 0.8) * 0.04;

      // On hover, letters spread apart slightly
      const spreadX = mouseStrength * 0.08 * (i - 1.5);
      ref.current.position.x = ref.current.userData.baseX + spreadX;

      // Each letter rotates subtly on its own axis
      ref.current.rotation.y = Math.sin(time * 0.3 + i * 1.2) * 0.06 * (1 + mouseStrength);
      ref.current.rotation.x = Math.cos(time * 0.25 + i * 0.9) * 0.04;
    });

    // Plus sign spins faster on hover
    if (plusRef.current) {
      plusRef.current.rotation.z =
        time * 0.2 + mouseStrength * time * 0.5;
    }
  });

  const wireframeMat = useMemo(
    () => ({
      color: COLOR_INDIGO,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    }),
    []
  );

  // Letter positions — spaced for "D T + C"
  const positions = useMemo(() => {
    const spacing = 1.15;
    const totalW = spacing * 3;
    const startX = -totalW / 2;
    return [
      { x: startX, y: 0 },
      { x: startX + spacing, y: 0 },
      { x: startX + spacing * 2, y: 0 },
      { x: startX + spacing * 3, y: 0 },
    ];
  }, []);

  return (
    <group ref={groupRef}>
      <mesh
        ref={dRef}
        geometry={geometries.d}
        position={[positions[0].x, positions[0].y, 0]}
        userData={{ baseX: positions[0].x, baseY: positions[0].y }}
      >
        <meshBasicMaterial {...wireframeMat} />
      </mesh>
      <mesh
        ref={tRef}
        geometry={geometries.t}
        position={[positions[1].x, positions[1].y, 0]}
        userData={{ baseX: positions[1].x, baseY: positions[1].y }}
      >
        <meshBasicMaterial {...wireframeMat} />
      </mesh>
      <mesh
        ref={plusRef}
        geometry={geometries.plus}
        position={[positions[2].x, positions[2].y, 0]}
        userData={{ baseX: positions[2].x, baseY: positions[2].y }}
      >
        <meshBasicMaterial {...wireframeMat} color={COLOR_CORAL} opacity={0.5} />
      </mesh>
      <mesh
        ref={cRef}
        geometry={geometries.c}
        position={[positions[3].x, positions[3].y, 0]}
        userData={{ baseX: positions[3].x, baseY: positions[3].y }}
      >
        <meshBasicMaterial {...wireframeMat} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Ambient particles orbiting the text
// ---------------------------------------------------------------------------
function TextParticles({ input }: { input: React.MutableRefObject<InputState> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const angles = new Float32Array(PARTICLE_COUNT);
    const radii = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const yOffsets = new Float32Array(PARTICLE_COUNT);

    const indigo = new THREE.Color(COLOR_INDIGO);
    const coral = new THREE.Color(COLOR_CORAL);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      angles[i] = Math.random() * Math.PI * 2;
      radii[i] = 2.0 + Math.random() * 1.5;
      speeds[i] = 0.1 + Math.random() * 0.25;
      yOffsets[i] = (Math.random() - 0.5) * 2.0;

      const c = Math.random() > 0.4 ? indigo : coral;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors, angles, radii, speeds, yOffsets };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    const { mouseX, mouseY, scroll } = input.current;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const radiusMult = 1 + scroll * 0.4;
    const mouseStrength = Math.sqrt(mouseX * mouseX + mouseY * mouseY);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = data.angles[i] + t * data.speeds[i];
      const r = data.radii[i] * radiusMult;

      let px = Math.cos(angle) * r;
      let py = data.yOffsets[i] + Math.sin(t * 0.4 + data.angles[i]) * 0.3;
      const pz = Math.sin(angle) * r * 0.5;

      // Mouse repulsion
      const dx = px - mouseX * 2;
      const dy = py - mouseY * 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.5) {
        const repel = (1 - dist / 1.5) * 0.6;
        px += (dx / (dist + 0.01)) * repel;
        py += (dy / (dist + 0.01)) * repel;
      }

      arr[i * 3] = px;
      arr[i * 3 + 1] = py;
      arr[i * 3 + 2] = pz;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.size = 0.04 + mouseStrength * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} count={PARTICLE_COUNT} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} count={PARTICLE_COUNT} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.7}
        size={0.04}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Orbit ring around the text
// ---------------------------------------------------------------------------
function TextOrbitRing({ input }: { input: React.MutableRefObject<InputState> }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const { scroll } = input.current;
    const s = 2.8 + scroll * 0.5;
    ref.current.scale.set(s, s, s);
    ref.current.rotation.x = Math.PI * 0.38 + Math.sin(t * 0.2) * 0.08;
    ref.current.rotation.y = t * 0.12;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.004, 8, 64]} />
      <meshBasicMaterial color={COLOR_INDIGO} transparent opacity={0.15} depthWrite={false} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Scene — orchestrates everything
// ---------------------------------------------------------------------------
function Scene({ input }: { input: React.MutableRefObject<InputState> }) {
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 5.5);

  return (
    <group scale={[scale, scale, scale]}>
      <DTCText input={input} />
      <TextParticles input={input} />
      <TextOrbitRing input={input} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// AboutVisual3D — SSR-safe container with mouse + scroll tracking
// ---------------------------------------------------------------------------
export default function AboutVisual3D({ className = "" }: AboutVisual3DProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputState>({ mouseX: 0, mouseY: 0, scroll: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    inputRef.current.mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    inputRef.current.mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }, []);

  const onPointerLeave = useCallback(() => {
    inputRef.current.mouseX = 0;
    inputRef.current.mouseY = 0;
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - rect.bottom / (vh + rect.height);
      inputRef.current.scroll = Math.max(0, Math.min(1, progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          background: `linear-gradient(160deg, #131A2B 0%, #1a1f35 30%, ${DEEP_SPACE} 70%, #1a1535 100%)`,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      <Canvas
        camera={{ fov: 50, position: [0, 0, 5], near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Scene input={inputRef} />
      </Canvas>
    </div>
  );
}

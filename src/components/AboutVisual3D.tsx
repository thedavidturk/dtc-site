"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 100;
const RING_SEGMENTS = 64;

const COLOR_INDIGO = "#6366F1";
const COLOR_CORAL = "#F97316";
const DEEP_SPACE = "#0B0F19";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AboutVisual3DProps {
  className?: string;
}

// ---------------------------------------------------------------------------
// Shared state — mouse + scroll passed into the Canvas
// ---------------------------------------------------------------------------
interface InputState {
  mouseX: number;
  mouseY: number;
  scroll: number; // 0..1 section visibility
}

// ---------------------------------------------------------------------------
// CoreStructure — icosahedron with vertex displacement toward mouse
// ---------------------------------------------------------------------------
function CoreStructure({ input }: { input: React.MutableRefObject<InputState> }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Base geometry for vertex displacement
  const { outerGeo, basePositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 2);
    const base = geo.attributes.position.array.slice() as Float32Array;
    return { outerGeo: geo, basePositions: base };
  }, []);

  const innerGeo = useMemo(() => new THREE.IcosahedronGeometry(0.55, 1), []);
  const glowGeo = useMemo(() => new THREE.IcosahedronGeometry(1.65, 2), []);

  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const { mouseX, mouseY, scroll } = input.current;

    // Smooth mouse for vertex displacement
    smoothMouse.current.x += (mouseX - smoothMouse.current.x) * 0.08;
    smoothMouse.current.y += (mouseY - smoothMouse.current.y) * 0.08;

    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;
    const mouseStrength = Math.sqrt(mx * mx + my * my);

    // Scroll-driven rotation speed boost
    const rotSpeed = 0.1 + scroll * 0.3;

    // --- Vertex displacement on outer icosahedron ---
    const posArr = outerGeo.attributes.position.array as Float32Array;
    const count = outerGeo.attributes.position.count;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];

      // Normalize vertex direction
      const len = Math.sqrt(bx * bx + by * by + bz * bz);
      const nx = bx / len;
      const ny = by / len;

      // Mouse proximity effect — vertices near the projected mouse pull outward
      const dx = nx - mx * 0.8;
      const dy = ny - my * 0.8;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = Math.max(0, 1 - dist / 1.2) * mouseStrength * 0.35;

      // Organic breathing wave
      const wave = Math.sin(t * 0.8 + bx * 2 + by * 2) * 0.04 +
                   Math.sin(t * 0.5 + bz * 3) * 0.03;

      const scale = 1 + pull + wave;
      posArr[i * 3] = bx * scale;
      posArr[i * 3 + 1] = by * scale;
      posArr[i * 3 + 2] = bz * scale;
    }
    outerGeo.attributes.position.needsUpdate = true;
    outerGeo.computeVertexNormals();

    // Outer rotation
    if (outerRef.current) {
      outerRef.current.rotation.x += rotSpeed * 0.008;
      outerRef.current.rotation.y += rotSpeed * 0.012;
    }
    if (glowRef.current) {
      glowRef.current.rotation.copy(outerRef.current!.rotation);
    }

    // Inner — counter-rotate, breathe with scroll
    if (innerRef.current) {
      const breathe = 0.8 + Math.sin(t * 0.7) * 0.2 + scroll * 0.3;
      innerRef.current.scale.setScalar(breathe);
      innerRef.current.rotation.x = -t * 0.18;
      innerRef.current.rotation.y = -t * 0.12 + scroll * Math.PI * 0.5;
      innerRef.current.rotation.z = t * 0.06;

      // Inner color shifts from indigo to coral as mouse moves
      const mat = innerRef.current.material as THREE.MeshBasicMaterial;
      const lerpT = mouseStrength * 0.6;
      mat.color.set(COLOR_INDIGO).lerp(new THREE.Color(COLOR_CORAL), lerpT);
      mat.opacity = 0.1 + mouseStrength * 0.15;
    }
  });

  return (
    <group>
      {/* Outer glow shell */}
      <mesh ref={glowRef} geometry={glowGeo}>
        <meshBasicMaterial
          color={COLOR_INDIGO}
          transparent
          opacity={0.04}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main wireframe — displaces toward mouse */}
      <mesh ref={outerRef} geometry={outerGeo}>
        <meshBasicMaterial
          color={COLOR_INDIGO}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Inner breathing form */}
      <mesh ref={innerRef} geometry={innerGeo}>
        <meshBasicMaterial
          color={COLOR_INDIGO}
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// OrbitRings — two rotating ring outlines that respond to scroll
// ---------------------------------------------------------------------------
function OrbitRings({ input }: { input: React.MutableRefObject<InputState> }) {
  const ring1Ref = useRef<THREE.LineLoop>(null);
  const ring2Ref = useRef<THREE.LineLoop>(null);

  const ringGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= RING_SEGMENTS; i++) {
      const angle = (i / RING_SEGMENTS) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const { scroll } = input.current;

    // Ring 1 — expands with scroll, tilts
    if (ring1Ref.current) {
      const s = 2.2 + scroll * 0.8;
      ring1Ref.current.scale.set(s, s, s);
      ring1Ref.current.rotation.x = Math.PI * 0.35 + Math.sin(t * 0.2) * 0.1;
      ring1Ref.current.rotation.y = t * 0.15;
      ring1Ref.current.rotation.z = Math.sin(t * 0.1) * 0.1;
    }

    // Ring 2 — counter-rotates, different tilt
    if (ring2Ref.current) {
      const s = 2.6 + scroll * 0.6;
      ring2Ref.current.scale.set(s, s, s);
      ring2Ref.current.rotation.x = Math.PI * 0.55 + Math.cos(t * 0.15) * 0.12;
      ring2Ref.current.rotation.y = -t * 0.1;
      ring2Ref.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group>
      <lineLoop ref={ring1Ref} geometry={ringGeo}>
        <lineBasicMaterial color={COLOR_INDIGO} transparent opacity={0.15} />
      </lineLoop>
      <lineLoop ref={ring2Ref} geometry={ringGeo}>
        <lineBasicMaterial color={COLOR_CORAL} transparent opacity={0.1} />
      </lineLoop>
    </group>
  );
}

// ---------------------------------------------------------------------------
// ReactiveParticles — scatter from mouse, expand with scroll
// ---------------------------------------------------------------------------
function ReactiveParticles({ input }: { input: React.MutableRefObject<InputState> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const baseAngles = new Float32Array(PARTICLE_COUNT);
    const baseRadii = new Float32Array(PARTICLE_COUNT);
    const basePhi = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    const indigoColor = new THREE.Color(COLOR_INDIGO);
    const coralColor = new THREE.Color(COLOR_CORAL);
    const whiteColor = new THREE.Color("#FFFFFF");
    const tmpColor = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Spherical distribution
      baseAngles[i] = Math.random() * Math.PI * 2;
      baseRadii[i] = 1.8 + Math.random() * 1.6;
      basePhi[i] = Math.acos(2 * Math.random() - 1);
      speeds[i] = 0.1 + Math.random() * 0.3;
      phases[i] = Math.random() * Math.PI * 2;

      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;

      // Color: 50% indigo, 30% coral, 20% white
      const roll = Math.random();
      if (roll < 0.5) {
        tmpColor.copy(indigoColor);
      } else if (roll < 0.8) {
        tmpColor.copy(coralColor);
      } else {
        tmpColor.copy(whiteColor);
      }
      colors[i3] = tmpColor.r;
      colors[i3 + 1] = tmpColor.g;
      colors[i3 + 2] = tmpColor.b;
    }

    return { positions, colors, baseAngles, baseRadii, basePhi, speeds, phases };
  }, []);

  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.3, "rgba(255,255,255,0.7)");
    gradient.addColorStop(0.7, "rgba(255,255,255,0.15)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    const { mouseX, mouseY, scroll } = input.current;
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Scroll expands the particle cloud
    const radiusMult = 1 + scroll * 0.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const angle = data.baseAngles[i] + t * data.speeds[i];
      const phi = data.basePhi[i] + Math.sin(t * 0.2 + data.phases[i]) * 0.3;
      const r = data.baseRadii[i] * radiusMult;

      // Base spherical position
      let px = r * Math.sin(phi) * Math.cos(angle);
      let py = r * Math.sin(phi) * Math.sin(angle);
      const pz = r * Math.cos(phi);

      // Mouse repulsion — particles near projected mouse push away
      const dx = px - mouseX * 2.5;
      const dy = py - mouseY * 2.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2.0) {
        const repel = (1 - dist / 2.0) * 0.8;
        px += (dx / (dist + 0.01)) * repel;
        py += (dy / (dist + 0.01)) * repel;
      }

      posArr[i3] = px;
      posArr[i3 + 1] = py;
      posArr[i3 + 2] = pz;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Particle size pulses with mouse movement
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    const mouseStrength = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    mat.size = 0.05 + mouseStrength * 0.03;
  });

  if (!particleTexture) return null;

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
        opacity={0.75}
        size={0.05}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// AmbientGlow — reactive glow that shifts with mouse
// ---------------------------------------------------------------------------
function AmbientGlow({ input }: { input: React.MutableRefObject<InputState> }) {
  const spriteRef = useRef<THREE.Sprite>(null);

  const glowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "rgba(99,102,241,0.4)");
    gradient.addColorStop(0.25, "rgba(99,102,241,0.15)");
    gradient.addColorStop(0.5, "rgba(249,115,22,0.06)");
    gradient.addColorStop(1, "rgba(99,102,241,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    if (!spriteRef.current) return;
    const t = clock.elapsedTime;
    const { mouseX, mouseY } = input.current;

    // Glow follows mouse slightly
    spriteRef.current.position.x = mouseX * 0.5;
    spriteRef.current.position.y = mouseY * 0.5;

    // Pulse + react to mouse
    const mouseStrength = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const scale = 4.0 + Math.sin(t * 0.5) * 0.4 + mouseStrength * 1.2;
    spriteRef.current.scale.set(scale, scale, 1);

    const mat = spriteRef.current.material as THREE.SpriteMaterial;
    mat.opacity = 0.35 + mouseStrength * 0.2;
  });

  if (!glowTexture) return null;

  return (
    <sprite ref={spriteRef} position={[0, 0, -1]}>
      <spriteMaterial
        map={glowTexture}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

// ---------------------------------------------------------------------------
// Scene — orchestrates everything, handles parallax
// ---------------------------------------------------------------------------
function Scene({ input }: { input: React.MutableRefObject<InputState> }) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const scale = Math.min(1, viewport.width / 6);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const { mouseX, mouseY, scroll } = input.current;

    // Mouse parallax — more responsive with higher lerp
    smoothMouse.current.x += (mouseX - smoothMouse.current.x) * 0.1;
    smoothMouse.current.y += (mouseY - smoothMouse.current.y) * 0.1;

    // Tilt toward mouse — stronger effect
    groupRef.current.rotation.y = smoothMouse.current.x * 0.4;
    groupRef.current.rotation.x = -smoothMouse.current.y * 0.3;

    // Floating bob
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.12;

    // Slight z-shift with scroll (push back / pull forward)
    groupRef.current.position.z = -scroll * 0.8;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <CoreStructure input={input} />
      <OrbitRings input={input} />
      <ReactiveParticles input={input} />
      <AmbientGlow input={input} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// AboutVisual3D — SSR-safe container with mouse + scroll tracking
// ---------------------------------------------------------------------------
export default function AboutVisual3D({
  className = "",
}: AboutVisual3DProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputState>({ mouseX: 0, mouseY: 0, scroll: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse tracking
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    inputRef.current.mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    inputRef.current.mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }, []);

  const onPointerLeave = useCallback(() => {
    // Slowly drift back to center (handled by lerp in Scene)
    inputRef.current.mouseX = 0;
    inputRef.current.mouseY = 0;
  }, []);

  // Scroll tracking — how far through the about section viewport
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section top enters viewport, 1 when section bottom leaves
      const progress = 1 - (rect.bottom / (vh + rect.height));
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
          background:
            `linear-gradient(160deg, #131A2B 0%, #1a1f35 30%, ${DEEP_SPACE} 70%, #1a1535 100%)`,
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
        camera={{ fov: 50, position: [0, 0, 5.5], near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Scene input={inputRef} />
      </Canvas>
    </div>
  );
}

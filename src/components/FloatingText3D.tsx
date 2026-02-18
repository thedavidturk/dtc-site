"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 80;
const LERP_FACTOR = 0.05;

// Brand colors
const COLOR_INDIGO = "#6366F1";
const COLOR_CORAL = "#F97316";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FloatingText3DProps {
  className?: string;
}

// ---------------------------------------------------------------------------
// Mouse hook — normalized -1..1 from pointer events on the container
// ---------------------------------------------------------------------------
function useMousePosition() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    },
    []
  );
  const onPointerLeave = useCallback(() => {
    // Drift back to center when mouse leaves
    mouse.current.x = 0;
    mouse.current.y = 0;
  }, []);
  return { mouse, onPointerMove, onPointerLeave };
}

// ---------------------------------------------------------------------------
// Floating Particles — small dots scattered around the text area
// ---------------------------------------------------------------------------
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Per-particle data
  const { positions, colors, basePositions, phases } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const ph = new Float32Array(PARTICLE_COUNT);

    const tmpColor = new THREE.Color();
    const indigoColor = new THREE.Color(COLOR_INDIGO);
    const coralColor = new THREE.Color(COLOR_CORAL);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Scatter within a box around the text area
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 3;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;

      // Mix colors: mostly indigo, some coral
      const blend = Math.random();
      if (blend < 0.35) {
        tmpColor.copy(coralColor);
      } else {
        tmpColor.copy(indigoColor);
      }
      col[i3] = tmpColor.r;
      col[i3 + 1] = tmpColor.g;
      col[i3 + 2] = tmpColor.b;

      ph[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, colors: col, basePositions: base, phases: ph };
  }, []);

  // Soft circle texture
  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
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
    gradient.addColorStop(0.8, "rgba(255,255,255,0.1)");
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
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const phase = phases[i];

      // Gentle orbital / drifting motion
      posArr[i3] =
        basePositions[i3] +
        Math.sin(t * 0.2 + phase) * 0.4 +
        Math.cos(t * 0.15 + phase * 1.5) * 0.2;
      posArr[i3 + 1] =
        basePositions[i3 + 1] +
        Math.cos(t * 0.18 + phase * 1.2) * 0.3 +
        Math.sin(t * 0.12 + phase) * 0.15;
      posArr[i3 + 2] =
        basePositions[i3 + 2] + Math.sin(t * 0.14 + phase * 0.8) * 0.25;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!particleTexture) return null;

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
// Glow Sprite — a soft colored blob behind the "+" sign
// ---------------------------------------------------------------------------
function PlusGlow() {
  const spriteRef = useRef<THREE.Sprite>(null);

  // Soft glow texture
  const glowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 128;
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
    gradient.addColorStop(0, "rgba(249,115,22,0.5)");
    gradient.addColorStop(0.3, "rgba(249,115,22,0.2)");
    gradient.addColorStop(0.7, "rgba(249,115,22,0.05)");
    gradient.addColorStop(1, "rgba(249,115,22,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    if (!spriteRef.current) return;
    const t = clock.elapsedTime;
    // Gentle pulse
    const scale = 1.6 + Math.sin(t * 0.8) * 0.15;
    spriteRef.current.scale.set(scale, scale, 1);
  });

  if (!glowTexture) return null;

  return (
    <sprite ref={spriteRef} position={[0.55, 0.05, -0.1]}>
      <spriteMaterial
        map={glowTexture}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

// ---------------------------------------------------------------------------
// Main 3D Text Group — "DT+C" with depth layers, parallax, animations
// ---------------------------------------------------------------------------
interface TextGroupProps {
  mouse: React.MutableRefObject<THREE.Vector2>;
}

function TextGroup({ mouse }: TextGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  // Depth layer config: z-offset, opacity, color tint
  const depthLayers = useMemo(
    () => [
      { z: -0.08, opacity: 0.12, color: "#4F46E5" },
      { z: -0.16, opacity: 0.08, color: "#4338CA" },
      { z: -0.24, opacity: 0.05, color: "#3730A3" },
      { z: -0.32, opacity: 0.03, color: "#312E81" },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    // Smooth mouse tracking
    smoothMouse.current.x +=
      (mouse.current.x - smoothMouse.current.x) * LERP_FACTOR;
    smoothMouse.current.y +=
      (mouse.current.y - smoothMouse.current.y) * LERP_FACTOR;

    // Mouse parallax rotation
    const targetRotY = smoothMouse.current.x * 0.15;
    const targetRotX = -smoothMouse.current.y * 0.1;

    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * LERP_FACTOR;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * LERP_FACTOR;

    // Slow continuous Y rotation (base drift)
    groupRef.current.rotation.y += 0.002;

    // Gentle floating (sin wave on Y position)
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main text: "DT" in white */}
      <Text
        position={[-1.15, 0, 0]}
        fontSize={2}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.25}
        outlineWidth={0.025}
        outlineColor={COLOR_INDIGO}
        outlineOpacity={0.8}
      >
        DT
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </Text>

      {/* "+" in warm-coral */}
      <Text
        position={[0.55, 0.05, 0]}
        fontSize={2}
        color={COLOR_CORAL}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.35}
        outlineWidth={0.025}
        outlineColor={COLOR_CORAL}
        outlineOpacity={0.9}
      >
        +
        <meshBasicMaterial
          color={COLOR_CORAL}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </Text>

      {/* "C" in white */}
      <Text
        position={[1.85, 0, 0]}
        fontSize={2}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.25}
        outlineWidth={0.025}
        outlineColor={COLOR_INDIGO}
        outlineOpacity={0.8}
      >
        C
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </Text>

      {/* Depth / extrusion layers — full "DT+C" at increasing Z offsets */}
      {depthLayers.map((layer, idx) => (
        <Text
          key={idx}
          position={[0.35, 0, layer.z]}
          fontSize={2}
          color={layer.color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={layer.opacity}
        >
          DT+C
          <meshBasicMaterial
            color={layer.color}
            transparent
            opacity={layer.opacity}
            depthWrite={false}
          />
        </Text>
      ))}

      {/* Glow behind the "+" */}
      <PlusGlow />

      {/* Particles scattered around */}
      <FloatingParticles />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Scene — assembles everything inside the Canvas
// ---------------------------------------------------------------------------
function Scene({
  mouse,
}: {
  mouse: React.MutableRefObject<THREE.Vector2>;
}) {
  // Adjust camera for the container aspect ratio
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 6);

  return (
    <group scale={[scale, scale, scale]}>
      <TextGroup mouse={mouse} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Exported component — SSR-safe container with Canvas
// ---------------------------------------------------------------------------
export default function FloatingText3D({
  className = "",
}: FloatingText3DProps) {
  const [mounted, setMounted] = useState(false);
  const { mouse, onPointerMove, onPointerLeave } = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / pre-hydration fallback — matches the size but shows nothing
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(160deg, #131A2B 0%, #1a1f35 30%, #0B0F19 70%, #1a1535 100%)",
        }}
      />
    );
  }

  return (
    <div
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      <Canvas
        camera={{ fov: 50, position: [0, 0, 6], near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}

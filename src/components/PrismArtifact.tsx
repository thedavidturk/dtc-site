"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  PrismArtifact - the brand's only chromatic element                 */
/*                                                                     */
/*  A staggered cluster of glass cubes over the obsidian void. The RGB */
/*  channels (prism-red / prism-cyan / prism-lime) exist ONLY here:    */
/*  they bleed through the transmission material's chromatic           */
/*  aberration as dispersion at the cube edges. Black cores, bone      */
/*  speculars, no shadows. The only motion is a slow ~6.5s oscillation */
/*  of the whole cluster.                                              */
/*                                                                     */
/*  SSR-safe: the Canvas mounts only on the client, after an effect.   */
/*  Reduced-motion or no-WebGL visitors get a static SVG of            */
/*  overlapping cube outlines with offset red/cyan/lime strokes.       */
/* ------------------------------------------------------------------ */

/* The transmission buffer renders against the page void so the glass
   reads as obsidian-cored, not washed out. */
const VOID = new THREE.Color("#101010");

const PRISM_RED = "#ff2a2a";
const PRISM_CYAN = "#2a7fff";
const PRISM_LIME = "#2aff2a";

interface CubeSpec {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

/* Five cubes in a staggered cluster: one anchor, four satellites. */
const CUBES: CubeSpec[] = [
  { position: [0, 0.15, 0], rotation: [0.42, 0.58, 0.1], scale: 1.5 },
  { position: [-1.35, -1.0, 0.4], rotation: [0.12, -0.5, 0.32], scale: 0.95 },
  { position: [1.4, -0.85, -0.3], rotation: [-0.3, 0.36, -0.14], scale: 1.05 },
  { position: [-0.95, 1.35, -0.5], rotation: [0.52, 0.2, -0.4], scale: 0.7 },
  { position: [1.05, 1.3, 0.35], rotation: [-0.2, -0.62, 0.26], scale: 0.6 },
];

/* One full oscillation every ~6.5s, tiny amplitude: the sole motion. */
const OSCILLATION_PERIOD = 6.5;

/* The channel-offset edges: each cube's silhouette drawn three times in
   red/cyan/lime with tiny opposing offsets. This IS the RGB-split
   signature: deterministic, independent of lighting. */
const EDGE_CHANNELS: { color: string; offset: [number, number, number] }[] = [
  { color: PRISM_RED, offset: [-0.035, -0.012, 0] },
  { color: PRISM_CYAN, offset: [0.035, 0.012, 0] },
  { color: PRISM_LIME, offset: [0, 0.035, 0] },
];

/* Per-cube character: each satellite turns on its own axis at its own
   pace and floats on its own phase, so the cluster reads as five
   individuals travelling together rather than one rigid prop. */
const CUBE_SPIN = [0.1, -0.16, 0.13, -0.2, 0.18];
const CUBE_FLOAT_PHASE = [0, 1.4, 2.9, 4.1, 5.3];

function Cluster({
  scrollRotation,
  converge,
}: {
  scrollRotation?: MotionValue<number>;
  converge?: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const cubeRefs = useRef<(THREE.Group | null)[]>([]);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
    []
  );

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    const phase = Math.sin((t * Math.PI * 2) / OSCILLATION_PERIOD);
    // Scroll advances the cluster's rotation; the oscillation breathes
    // on top of it.
    const scroll = scrollRotation?.get() ?? 0;
    g.rotation.y = scroll + phase * 0.14;
    g.rotation.x = scroll * 0.35 + phase * 0.05;

    // The morph: as converge approaches 1 the satellites collapse into
    // the anchor and the whole cluster spins up, winding toward the
    // flash that hands off to the next section.
    const cv = converge?.get() ?? 0;
    const spread = Math.max(0.04, 1 - cv);
    const spinBoost = 1 + cv * 9;

    CUBES.forEach((cube, i) => {
      const c = cubeRefs.current[i];
      if (!c) return;
      const float = Math.sin(t * 0.55 + CUBE_FLOAT_PHASE[i]) * 0.08 * spread;
      c.position.set(
        cube.position[0] * spread,
        cube.position[1] * spread + float,
        cube.position[2] * spread
      );
      c.rotation.set(
        cube.rotation[0] + t * CUBE_SPIN[i] * 0.6 * spinBoost,
        cube.rotation[1] + t * CUBE_SPIN[i] * spinBoost,
        cube.rotation[2]
      );
    });
  });

  return (
    <group ref={group}>
      {CUBES.map((cube, i) => (
        <group
          key={i}
          ref={(el) => {
            cubeRefs.current[i] = el;
          }}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
        >
          <RoundedBox args={[1, 1, 1]} radius={0.06} smoothness={4}>
            <MeshTransmissionMaterial
              transmission={1}
              thickness={1.5}
              roughness={0.08}
              ior={1.5}
              chromaticAberration={1.25}
              anisotropicBlur={0.25}
              distortion={0.12}
              distortionScale={0.4}
              temporalDistortion={0}
              samples={4}
              resolution={256}
              background={VOID}
            />
          </RoundedBox>
          {EDGE_CHANNELS.map((channel) => (
            <lineSegments
              key={channel.color}
              geometry={edges}
              position={channel.offset}
              scale={1.001}
            >
              <lineBasicMaterial
                color={channel.color}
                transparent
                opacity={0.65}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
                depthWrite={false}
              />
            </lineSegments>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Static fallback - overlapping cube outlines, RGB-split strokes     */
/* ------------------------------------------------------------------ */

const r = (n: number) => Math.round(n * 100) / 100;

/** Isometric cube wireframe (hexagon silhouette + inner Y) at cx,cy. */
function cubePath(cx: number, cy: number, s: number): string {
  const w = r(s * 0.866);
  const h = r(s * 0.5);
  const hexagon =
    `M${r(cx)} ${r(cy - s)} L${r(cx + w)} ${r(cy - h)} ` +
    `L${r(cx + w)} ${r(cy + h)} L${r(cx)} ${r(cy + s)} ` +
    `L${r(cx - w)} ${r(cy + h)} L${r(cx - w)} ${r(cy - h)} Z`;
  const innerY =
    ` M${r(cx)} ${r(cy)} L${r(cx)} ${r(cy - s)}` +
    ` M${r(cx)} ${r(cy)} L${r(cx - w)} ${r(cy + h)}` +
    ` M${r(cx)} ${r(cy)} L${r(cx + w)} ${r(cy + h)}`;
  return hexagon + innerY;
}

const STATIC_CUBES: { cx: number; cy: number; s: number }[] = [
  { cx: 200, cy: 180, s: 74 },
  { cx: 122, cy: 288, s: 46 },
  { cx: 282, cy: 272, s: 52 },
  { cx: 146, cy: 84, s: 34 },
  { cx: 272, cy: 96, s: 30 },
];

/* Channel offsets: the RGB-split look, lime holds center. */
const CHANNELS: { color: string; dx: number; dy: number }[] = [
  { color: PRISM_RED, dx: -3, dy: -1 },
  { color: PRISM_CYAN, dx: 3, dy: 1 },
  { color: PRISM_LIME, dx: 0, dy: 0 },
];

function StaticPrism({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        fill="none"
        role="presentation"
      >
        {STATIC_CUBES.map((cube, i) => (
          <g key={i}>
            {CHANNELS.map((channel) => (
              <path
                key={channel.color}
                d={cubePath(cube.cx + channel.dx, cube.cy + channel.dy, cube.s)}
                stroke={channel.color}
                strokeWidth={1.25}
                strokeLinejoin="round"
                opacity={0.85}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

export default function PrismArtifact({
  className = "",
  scrollRotation,
  converge,
}: {
  className?: string;
  /** Optional scroll-linked rotation (radians), read per-frame. */
  scrollRotation?: MotionValue<number>;
  /** Optional 0..1 morph progress: cubes merge and spin up toward 1. */
  converge?: MotionValue<number>;
}) {
  // "pending" on the server and first client paint; resolved in effect.
  const [mode, setMode] = useState<"pending" | "canvas" | "static">("pending");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let hasWebGL = false;
    try {
      const probe = document.createElement("canvas");
      hasWebGL = !!(
        window.WebGLRenderingContext &&
        (probe.getContext("webgl2") || probe.getContext("webgl"))
      );
    } catch {
      hasWebGL = false;
    }

    setMode(reducedMotion || !hasWebGL ? "static" : "canvas");
  }, []);

  if (mode !== "canvas") {
    return <StaticPrism className={className} />;
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        {/* Bone key light for the speculars, three prism channels so
            saturated color bleeds through the dispersion at the edges. */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 8]} intensity={2.2} color="#fffdf9" />
        <pointLight position={[-4, 2, 3]} intensity={90} color={PRISM_RED} />
        <pointLight position={[4, -1.5, 3.5]} intensity={90} color={PRISM_CYAN} />
        <pointLight position={[0, 4, -2.5]} intensity={80} color={PRISM_LIME} />
        <Cluster scrollRotation={scrollRotation} converge={converge} />
      </Canvas>
    </div>
  );
}

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const COLS = 10;
const ROWS = 6;
const SPACING = 0.42;
const NODE_COUNT = COLS * ROWS;
const MAX_CONN_DIST = 0.65;

// ---------------------------------------------------------------------------
// Node grid with pulsing dots and dynamic connections
// ---------------------------------------------------------------------------
function NodeGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Base positions on a grid, centred at origin
  const { basePositions, driftSeeds } = useMemo(() => {
    const bp = new Float32Array(NODE_COUNT * 3);
    const ds = new Float32Array(NODE_COUNT * 2); // per-node drift seeds
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = (r * COLS + c) * 3;
        bp[idx] = (c - (COLS - 1) / 2) * SPACING;
        bp[idx + 1] = (r - (ROWS - 1) / 2) * SPACING;
        bp[idx + 2] = 0;
        const si = (r * COLS + c) * 2;
        ds[si] = Math.random() * Math.PI * 2;
        ds[si + 1] = Math.random() * Math.PI * 2;
      }
    }
    return { basePositions: bp, driftSeeds: ds };
  }, []);

  // Pre-allocate positions buffer for points
  const positions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  // Pre-allocate sizes for per-node sizing
  const sizes = useMemo(() => {
    const s = new Float32Array(NODE_COUNT);
    s.fill(0.04);
    return s;
  }, []);

  // Line segments – max possible connections
  const maxLines = NODE_COUNT * 3; // generous upper bound
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    g.setDrawRange(0, 0);
    return g;
  }, [linePositions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Sweep wave: normalised x position of the brightness sweep
    const sweepX = ((t * 0.6) % 3.0) - 1.0; // repeats every ~5 seconds
    const sweepWidth = 0.4;

    // Update node positions with subtle drift
    for (let i = 0; i < NODE_COUNT; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const sx = driftSeeds[i * 2];
      const sy = driftSeeds[i * 2 + 1];

      positions[i * 3] = bx + Math.sin(t * 0.4 + sx) * 0.04;
      positions[i * 3 + 1] = by + Math.cos(t * 0.35 + sy) * 0.04;
      positions[i * 3 + 2] = 0;

      // Brightness based on sweep proximity
      const nx = positions[i * 3]; // already centred
      const sweepDist = Math.abs(nx - sweepX);
      const sweepBoost = sweepDist < sweepWidth ? (1 - sweepDist / sweepWidth) * 0.6 : 0;
      sizes[i] = 0.035 + sweepBoost * 0.04 + Math.sin(t * 1.5 + i * 0.5) * 0.008;
    }

    if (pointsRef.current) {
      (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (pointsRef.current.geometry.attributes.size as THREE.BufferAttribute).needsUpdate = true;
    }

    // Build connections between nearby nodes
    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_CONN_DIST) {
          // Fade connections in/out based on time + distance
          const phase = Math.sin(t * 0.8 + i * 0.3 + j * 0.2);
          if (phase > -0.2) {
            linePositions[lineIdx * 6] = positions[i * 3];
            linePositions[lineIdx * 6 + 1] = positions[i * 3 + 1];
            linePositions[lineIdx * 6 + 2] = 0;
            linePositions[lineIdx * 6 + 3] = positions[j * 3];
            linePositions[lineIdx * 6 + 4] = positions[j * 3 + 1];
            linePositions[lineIdx * 6 + 5] = 0;
            lineIdx++;
            if (lineIdx >= maxLines) break;
          }
        }
      }
      if (lineIdx >= maxLines) break;
    }

    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx * 2);
  });

  return (
    <group>
      {/* Dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={NODE_COUNT}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#06B6D4"
          size={0.045}
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#06B6D4" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Sweep glow – a faint fullscreen-ish plane that follows the sweep
// ---------------------------------------------------------------------------
function SweepGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const sweepX = ((t * 0.6) % 3.0) - 1.0;
    ref.current.position.x = sweepX;
    // Fade opacity based on visibility
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      sweepX > -2 && sweepX < 2.5 ? 0.06 : 0;
  });

  return (
    <mesh ref={ref} position={[0, 0, -0.1]}>
      <planeGeometry args={[0.5, 3]} />
      <meshBasicMaterial color="#06B6D4" transparent opacity={0.06} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Exported component
// ---------------------------------------------------------------------------
export default function InsightCoverRealTime4K() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.2], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <NodeGrid />
      <SweepGlow />
    </Canvas>
  );
}

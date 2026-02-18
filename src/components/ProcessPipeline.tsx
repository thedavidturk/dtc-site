"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ProcessPipelineProps {
  activeStep: number; // 0-3, which step is currently active/visible
  className?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const NODE_POSITIONS: [number, number, number][] = [
  [-4.5, 0, 0],
  [-1.5, 0, 0],
  [1.5, 0, 0],
  [4.5, 0, 0],
];

const COLOR_INDIGO = "#6366F1";
const COLOR_CORAL = "#F97316";
const PARTICLES_PER_BEAM = 3;
const PARTICLE_TRAVEL_DURATION = 2; // seconds for one full traversal

// ---------------------------------------------------------------------------
// Utility: smooth lerp toward target
// ---------------------------------------------------------------------------
function lerpValue(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

// ---------------------------------------------------------------------------
// Single Pipeline Node
// ---------------------------------------------------------------------------
interface PipelineNodeProps {
  position: [number, number, number];
  index: number;
  activeStep: number;
}

function PipelineNode({ position, index, activeStep }: PipelineNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const currentOpacity = useRef(0.2);
  const currentGlowOpacity = useRef(0);
  const currentScale = useRef(1);
  const activatedTime = useRef<number | null>(null);

  const isActive = activeStep >= index;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Track when node first becomes active for pulse effect
    if (isActive && activatedTime.current === null) {
      activatedTime.current = t;
    }
    if (!isActive) {
      activatedTime.current = null;
    }

    // Lerp opacity
    const targetOpacity = isActive ? 0.8 : 0.2;
    currentOpacity.current = lerpValue(currentOpacity.current, targetOpacity, 0.04);

    // Lerp glow
    const targetGlow = isActive ? 0.1 : 0;
    currentGlowOpacity.current = lerpValue(currentGlowOpacity.current, targetGlow, 0.04);

    // Scale pulse on activation
    let targetScale = 1;
    if (isActive && activatedTime.current !== null) {
      const elapsed = t - activatedTime.current;
      if (elapsed < 0.6) {
        // Quick pulse: scale up then back down
        targetScale = 1 + Math.sin(elapsed * Math.PI / 0.6) * 0.25;
      }
    }
    currentScale.current = lerpValue(currentScale.current, targetScale, 0.08);

    // Apply to mesh
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = currentOpacity.current;
      mat.wireframe = !isActive;
      meshRef.current.scale.setScalar(currentScale.current);
    }

    // Apply to glow
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = currentGlowOpacity.current;
      glowRef.current.scale.setScalar(currentScale.current);
    }
  });

  return (
    <group position={position}>
      {/* Core node sphere */}
      <Sphere ref={meshRef} args={[0.2, 16, 16]}>
        <meshBasicMaterial
          color={COLOR_INDIGO}
          transparent
          opacity={0.2}
          wireframe
          depthWrite={false}
        />
      </Sphere>

      {/* Outer glow sphere */}
      <Sphere ref={glowRef} args={[0.4, 16, 16]}>
        <meshBasicMaterial
          color={COLOR_INDIGO}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Node Label (01, 02, 03, 04)
// ---------------------------------------------------------------------------
interface NodeLabelProps {
  position: [number, number, number];
  label: string;
  index: number;
  activeStep: number;
}

function NodeLabel({ position, label, index, activeStep }: NodeLabelProps) {
  const textRef = useRef<THREE.Mesh>(null);
  const currentOpacity = useRef(0.15);

  const isActive = activeStep >= index;

  useFrame(() => {
    const target = isActive ? 0.4 : 0.15;
    currentOpacity.current = lerpValue(currentOpacity.current, target, 0.04);

    if (textRef.current) {
      const mat = textRef.current.material as THREE.MeshBasicMaterial;
      if (mat && typeof mat.opacity === "number") {
        mat.opacity = currentOpacity.current;
      }
    }
  });

  return (
    <Text
      ref={textRef}
      position={[position[0], position[1] - 0.55, position[2]]}
      fontSize={0.25}
      color="#FFFFFF"
      anchorX="center"
      anchorY="middle"
    >
      {label}
      <meshBasicMaterial
        color="#FFFFFF"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </Text>
  );
}

// ---------------------------------------------------------------------------
// Connecting Beam between two nodes
// ---------------------------------------------------------------------------
interface ConnectingBeamProps {
  from: [number, number, number];
  to: [number, number, number];
  beamIndex: number; // 0, 1, 2
  activeStep: number;
}

function ConnectingBeam({ from, to, beamIndex, activeStep }: ConnectingBeamProps) {
  // Beam activates when activeStep reaches the second node of the pair
  const isActive = activeStep >= beamIndex + 1;
  const currentOpacity = useRef(0.05);

  useFrame(() => {
    const target = isActive ? 0.2 : 0.05;
    currentOpacity.current = lerpValue(currentOpacity.current, target, 0.04);
  });

  // Line component from drei doesn't support animated opacity easily via ref,
  // so we re-render with current opacity. We use a wrapper that reads from ref.
  return (
    <BeamLine from={from} to={to} opacityRef={currentOpacity} />
  );
}

interface BeamLineProps {
  from: [number, number, number];
  to: [number, number, number];
  opacityRef: React.MutableRefObject<number>;
}

function BeamLine({ from, to, opacityRef }: BeamLineProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineRef = useRef<any>(null);

  useFrame(() => {
    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.opacity = opacityRef.current;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[from, to]}
      color={COLOR_INDIGO}
      lineWidth={1}
      transparent
      opacity={0.05}
    />
  );
}

// ---------------------------------------------------------------------------
// Energy Particles traveling along a beam
// ---------------------------------------------------------------------------
interface EnergyParticlesProps {
  from: [number, number, number];
  to: [number, number, number];
  beamIndex: number;
  activeStep: number;
}

function EnergyParticles({ from, to, beamIndex, activeStep }: EnergyParticlesProps) {
  const isActive = activeStep >= beamIndex + 1;
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Stagger offsets for each particle
  const offsets = useMemo(
    () => Array.from({ length: PARTICLES_PER_BEAM }, (_, i) => i / PARTICLES_PER_BEAM),
    []
  );

  useFrame(({ clock }) => {
    if (!isActive) {
      // Hide particles when beam is inactive
      particleRefs.current.forEach((p) => {
        if (p) {
          const mat = p.material as THREE.MeshBasicMaterial;
          mat.opacity = lerpValue(mat.opacity, 0, 0.08);
        }
      });
      return;
    }

    const t = clock.elapsedTime;

    particleRefs.current.forEach((particle, i) => {
      if (!particle) return;

      // Progress along the beam (0 to 1, looping)
      const progress = ((t / PARTICLE_TRAVEL_DURATION + offsets[i]) % 1);

      // Lerp position from -> to
      particle.position.x = from[0] + (to[0] - from[0]) * progress;
      particle.position.y = from[1] + (to[1] - from[1]) * progress;
      particle.position.z = from[2] + (to[2] - from[2]) * progress;

      // Fade in/out at endpoints for smooth looping
      const edgeFade = Math.sin(progress * Math.PI);
      const mat = particle.material as THREE.MeshBasicMaterial;
      mat.opacity = lerpValue(mat.opacity, 0.6 * edgeFade, 0.1);
    });
  });

  return (
    <>
      {offsets.map((_, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el as THREE.Mesh | null;
          }}
          args={[0.06, 8, 8]}
          position={[from[0], from[1], from[2]]}
        >
          <meshBasicMaterial
            color={COLOR_CORAL}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </Sphere>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Pipeline Scene — assembles nodes, beams, particles, labels
// ---------------------------------------------------------------------------
interface PipelineSceneProps {
  activeStep: number;
}

function PipelineScene({ activeStep }: PipelineSceneProps) {
  const { viewport } = useThree();
  // Scale to fit the viewport — the pipeline is ~9 units wide (-4.5 to 4.5)
  const scale = Math.min(1, viewport.width / 12);

  const labels = ["01", "02", "03", "04"];

  return (
    <group scale={[scale, scale, scale]}>
      {/* Connecting Beams (render behind nodes) */}
      {[0, 1, 2].map((i) => (
        <ConnectingBeam
          key={`beam-${i}`}
          from={NODE_POSITIONS[i]}
          to={NODE_POSITIONS[i + 1]}
          beamIndex={i}
          activeStep={activeStep}
        />
      ))}

      {/* Energy Particles */}
      {[0, 1, 2].map((i) => (
        <EnergyParticles
          key={`particles-${i}`}
          from={NODE_POSITIONS[i]}
          to={NODE_POSITIONS[i + 1]}
          beamIndex={i}
          activeStep={activeStep}
        />
      ))}

      {/* Nodes */}
      {NODE_POSITIONS.map((pos, i) => (
        <PipelineNode
          key={`node-${i}`}
          position={pos}
          index={i}
          activeStep={activeStep}
        />
      ))}

      {/* Labels */}
      {NODE_POSITIONS.map((pos, i) => (
        <NodeLabel
          key={`label-${i}`}
          position={pos}
          label={labels[i]}
          index={i}
          activeStep={activeStep}
        />
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Exported Component — SSR-safe container with Canvas
// ---------------------------------------------------------------------------
export default function ProcessPipeline({
  activeStep,
  className = "",
}: ProcessPipelineProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        orthographic
        camera={{
          zoom: 50,
          position: [0, 0, 10],
          near: 0.1,
          far: 100,
        }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <PipelineScene activeStep={activeStep} />
      </Canvas>
    </div>
  );
}

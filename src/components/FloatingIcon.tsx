"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Icosahedron, Torus, TorusKnot, Line } from "@react-three/drei";
import * as THREE from "three";

interface FloatingIconProps {
  shape: "globe" | "icosahedron" | "camera" | "aperture" | "nodes" | "torusKnot";
  color?: string;
  size?: number;
}

/* -------------------------------------------------------------------------- */
/*  Shared animation hook                                                      */
/* -------------------------------------------------------------------------- */

function useFloatAnimation(
  ref: React.RefObject<THREE.Group | THREE.Mesh | null>,
  speed = 1,
) {
  const clock = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    clock.current += delta * speed;
    // Slow Y rotation
    ref.current.rotation.y += 0.005;
    // Subtle X wobble
    ref.current.rotation.x = Math.sin(clock.current * 0.7) * 0.08;
    // Gentle float up/down
    ref.current.position.y = Math.sin(clock.current * 0.5) * 0.1;
  });
}

/* -------------------------------------------------------------------------- */
/*  Globe  (Virtual Cinematography)                                            */
/* -------------------------------------------------------------------------- */

function GlobeShape({ color, size }: { color: string; size: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFloatAnimation(groupRef);

  // Build latitude and longitude line points
  const { latLines, lonLines } = useMemo(() => {
    const lats: THREE.Vector3[][] = [];
    const lons: THREE.Vector3[][] = [];
    const r = size;
    const segments = 48;

    // Latitude lines at -60, -30, 0, 30, 60 degrees
    for (const deg of [-60, -30, 0, 30, 60]) {
      const phi = (90 - deg) * (Math.PI / 180);
      const ring: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ring.push(
          new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta),
          ),
        );
      }
      lats.push(ring);
    }

    // Longitude lines every 30 degrees (6 lines, each a full half-circle)
    for (let j = 0; j < 6; j++) {
      const theta = (j / 6) * Math.PI;
      const arc: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const phi = (i / segments) * Math.PI;
        arc.push(
          new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta),
          ),
        );
      }
      lons.push(arc);
    }

    return { latLines: lats, lonLines: lons };
  }, [size]);

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere shell */}
      <Sphere args={[size, 16, 12]}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
      {/* Latitude rings */}
      {latLines.map((pts, i) => (
        <Line
          key={`lat-${i}`}
          points={pts}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.8}
        />
      ))}
      {/* Longitude arcs */}
      {lonLines.map((pts, i) => (
        <Line
          key={`lon-${i}`}
          points={pts}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.8}
        />
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icosahedron  (3D Animation)                                                */
/* -------------------------------------------------------------------------- */

function IcosahedronShape({ color, size }: { color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFloatAnimation(ref);

  return (
    <Icosahedron ref={ref} args={[size, 0]}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.85}
      />
    </Icosahedron>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera  (Videography)                                                      */
/* -------------------------------------------------------------------------- */

function CameraShape({ color, size }: { color: string; size: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFloatAnimation(groupRef);

  const s = size;
  return (
    <group ref={groupRef}>
      {/* Camera body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[s * 1.4, s * 0.9, s * 0.8]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Lens cylinder */}
      <mesh position={[0, 0, s * 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[s * 0.28, s * 0.35, s * 0.5, 12]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Viewfinder bump */}
      <mesh position={[-s * 0.35, s * 0.55, -s * 0.1]}>
        <boxGeometry args={[s * 0.35, s * 0.25, s * 0.3]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Aperture  (Photography)  -- wireframe torus                                */
/* -------------------------------------------------------------------------- */

function ApertureShape({ color, size }: { color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFloatAnimation(ref);

  return (
    <Torus ref={ref} args={[size * 0.7, size * 0.25, 12, 24]}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.85}
      />
    </Torus>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nodes  (Intelligent Workflows) -- small spheres + lines                    */
/* -------------------------------------------------------------------------- */

function NodesShape({ color, size }: { color: string; size: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFloatAnimation(groupRef);

  const { positions, edges } = useMemo(() => {
    const s = size * 0.7;
    const pos: [number, number, number][] = [
      [0, s * 0.8, 0],
      [-s * 0.9, 0.05, s * 0.3],
      [s * 0.9, 0.1, s * 0.3],
      [s * 0.5, -s * 0.7, -s * 0.3],
      [-s * 0.5, -s * 0.7, -s * 0.3],
    ];
    // Connect in a network pattern
    const edg: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 4],
      [2, 3],
      [1, 2],
      [3, 4],
    ];
    return { positions: pos, edges: edg };
  }, [size]);

  return (
    <group ref={groupRef}>
      {/* Node spheres */}
      {positions.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[size * 0.1, 8, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Edge lines */}
      {edges.map(([a, b], i) => (
        <Line
          key={`edge-${i}`}
          points={[positions[a], positions[b]]}
          color={color}
          lineWidth={1.2}
          transparent
          opacity={0.6}
        />
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Torus Knot  (Audience-First Craft)                                         */
/* -------------------------------------------------------------------------- */

function TorusKnotShape({ color, size }: { color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFloatAnimation(ref);

  return (
    <TorusKnot ref={ref} args={[size * 0.55, size * 0.15, 64, 8]}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.85}
      />
    </TorusKnot>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shape resolver                                                             */
/* -------------------------------------------------------------------------- */

const DEFAULT_COLORS: Record<FloatingIconProps["shape"], string> = {
  globe: "#6366F1",
  icosahedron: "#818CF8",
  camera: "#F97316",
  aperture: "#FB923C",
  nodes: "#A78BFA",
  torusKnot: "#34D399",
};

function SceneContent({
  shape,
  color,
  size,
}: {
  shape: FloatingIconProps["shape"];
  color: string;
  size: number;
}) {
  switch (shape) {
    case "globe":
      return <GlobeShape color={color} size={size} />;
    case "icosahedron":
      return <IcosahedronShape color={color} size={size} />;
    case "camera":
      return <CameraShape color={color} size={size} />;
    case "aperture":
      return <ApertureShape color={color} size={size} />;
    case "nodes":
      return <NodesShape color={color} size={size} />;
    case "torusKnot":
      return <TorusKnotShape color={color} size={size} />;
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Main exported component                                                    */
/* -------------------------------------------------------------------------- */

export default function FloatingIcon({
  shape,
  color,
  size = 1,
}: FloatingIconProps) {
  const resolvedColor = color ?? DEFAULT_COLORS[shape];

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 3.5], fov: 40 }}
      frameloop="always"
      style={{ background: "transparent" }}
    >
      <SceneContent shape={shape} color={resolvedColor} size={size} />
    </Canvas>
  );
}

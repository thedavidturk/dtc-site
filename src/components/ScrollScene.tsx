"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface ShapeConfig {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "tetrahedron" | "torusKnot";
  size: number;
  color: string;
  opacity: number;
  rotationSpeed: [number, number, number];
  parallaxMultiplier: number;
}

/* ================================================================== */
/*  Shape Data                                                         */
/* ================================================================== */

const SHAPES: ShapeConfig[] = [
  {
    position: [-12, 5, -45],
    geometry: "icosahedron",
    size: 3.5,
    color: "#6366F1",
    opacity: 0.05,
    rotationSpeed: [0.002, 0.003, 0.001],
    parallaxMultiplier: 0.5,
  },
  {
    position: [15, -3, -35],
    geometry: "octahedron",
    size: 2.5,
    color: "#F97316",
    opacity: 0.06,
    rotationSpeed: [0.003, 0.001, 0.002],
    parallaxMultiplier: 0.7,
  },
  {
    position: [-8, -10, -25],
    geometry: "tetrahedron",
    size: 2,
    color: "#6366F1",
    opacity: 0.07,
    rotationSpeed: [0.001, 0.004, 0.002],
    parallaxMultiplier: 1.0,
  },
  {
    position: [20, 8, -50],
    geometry: "torusKnot",
    size: 3,
    color: "#F97316",
    opacity: 0.04,
    rotationSpeed: [0.002, 0.002, 0.003],
    parallaxMultiplier: 0.5,
  },
  {
    position: [-18, 12, -40],
    geometry: "octahedron",
    size: 4,
    color: "#6366F1",
    opacity: 0.05,
    rotationSpeed: [0.003, 0.002, 0.001],
    parallaxMultiplier: 0.6,
  },
  {
    position: [8, -15, -30],
    geometry: "icosahedron",
    size: 1.5,
    color: "#F97316",
    opacity: 0.08,
    rotationSpeed: [0.004, 0.001, 0.003],
    parallaxMultiplier: 0.9,
  },
  {
    position: [-5, 18, -28],
    geometry: "tetrahedron",
    size: 2.8,
    color: "#6366F1",
    opacity: 0.06,
    rotationSpeed: [0.001, 0.003, 0.004],
    parallaxMultiplier: 0.95,
  },
  {
    position: [25, -8, -48],
    geometry: "torusKnot",
    size: 2,
    color: "#F97316",
    opacity: 0.05,
    rotationSpeed: [0.003, 0.002, 0.002],
    parallaxMultiplier: 0.55,
  },
  {
    position: [-22, -5, -22],
    geometry: "icosahedron",
    size: 1.2,
    color: "#6366F1",
    opacity: 0.07,
    rotationSpeed: [0.002, 0.004, 0.001],
    parallaxMultiplier: 1.3,
  },
  {
    position: [12, 14, -38],
    geometry: "octahedron",
    size: 3.2,
    color: "#F97316",
    opacity: 0.04,
    rotationSpeed: [0.001, 0.002, 0.003],
    parallaxMultiplier: 0.65,
  },
];

/* ================================================================== */
/*  Wireframe Shape                                                    */
/* ================================================================== */

function WireframeShape({
  config,
  scrollProgress,
}: {
  config: ShapeConfig;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const baseY = config.position[1];

  useFrame(() => {
    if (!meshRef.current) return;

    // Self-rotation
    meshRef.current.rotation.x += config.rotationSpeed[0];
    meshRef.current.rotation.y += config.rotationSpeed[1];
    meshRef.current.rotation.z += config.rotationSpeed[2];

    // Parallax vertical offset based on scroll
    const parallaxOffset =
      scrollProgress.current * -15 * config.parallaxMultiplier;
    meshRef.current.position.y = baseY + parallaxOffset;
  });

  const geometry = useMemo(() => {
    switch (config.geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[config.size, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[config.size, 0]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[config.size, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[config.size * 0.5, config.size * 0.15, 32, 8]} />;
    }
  }, [config.geometry, config.size]);

  return (
    <mesh
      ref={meshRef}
      position={[config.position[0], config.position[1], config.position[2]]}
    >
      {geometry}
      <meshBasicMaterial
        color={config.color}
        wireframe
        transparent
        opacity={config.opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ================================================================== */
/*  Dust Particles                                                     */
/* ================================================================== */

function DustParticles({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 200;
  const basePositionsRef = useRef<Float32Array | null>(null);

  const { positions, opacities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ops = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // x: -30 to 30, y: -50 to 50, z: -30 to -5
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = Math.random() * 100 - 50;
      pos[i * 3 + 2] = -5 - Math.random() * 25;
      ops[i] = 0.03 + Math.random() * 0.05;
    }

    return { positions: pos, opacities: ops };
  }, []);

  // Store base Y positions for parallax
  useEffect(() => {
    basePositionsRef.current = new Float32Array(positions);
  }, [positions]);

  useFrame(() => {
    if (!pointsRef.current || !basePositionsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const base = basePositionsRef.current;
    const progress = scrollProgress.current;

    for (let i = 0; i < count; i++) {
      // Subtle parallax based on depth (z)
      const depth = Math.abs(base[i * 3 + 2]);
      const depthFactor = depth / 30; // 0 to ~1
      const parallaxOffset = progress * -15 * (0.3 + depthFactor * 0.7);
      arr[i * 3 + 1] = base[i * 3 + 1] + parallaxOffset;
    }
    posAttr.needsUpdate = true;
  });

  // Average opacity for the material
  const avgOpacity = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < count; i++) sum += opacities[i];
    return sum / count;
  }, [opacities, count]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={avgOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ================================================================== */
/*  Camera Controller                                                  */
/* ================================================================== */

function CameraController({
  scrollProgress,
  mousePosition,
  reducedMotion,
}: {
  scrollProgress: React.MutableRefObject<number>;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();

  // Smoothed values
  const smoothScroll = useRef(0);
  const smoothMouseX = useRef(0);
  const smoothMouseY = useRef(0);

  useFrame(() => {
    if (reducedMotion) {
      // Static default position
      camera.position.set(0, 0, 10);
      camera.rotation.set(0, 0, 0);
      return;
    }

    const targetScroll = scrollProgress.current;

    // Smooth lerp toward target scroll
    smoothScroll.current = THREE.MathUtils.lerp(
      smoothScroll.current,
      targetScroll,
      0.05
    );

    // Smooth lerp toward target mouse
    smoothMouseX.current = THREE.MathUtils.lerp(
      smoothMouseX.current,
      mousePosition.current.x,
      0.05
    );
    smoothMouseY.current = THREE.MathUtils.lerp(
      smoothMouseY.current,
      mousePosition.current.y,
      0.05
    );

    const s = smoothScroll.current;

    // Camera Y: 0 to -15
    const camY = s * -15;
    // Camera Z: 10 to 8
    const camZ = 10 - s * 2;

    camera.position.set(0, camY, camZ);

    // Camera rotation X: 0 to -0.05 from scroll, plus mouse Y influence
    const scrollRotX = s * -0.05;
    const mouseRotX = smoothMouseY.current * 0.01;
    const mouseRotY = smoothMouseX.current * 0.02;

    camera.rotation.set(scrollRotX + mouseRotX, mouseRotY, 0);
  });

  return null;
}

/* ================================================================== */
/*  Inner Scene                                                        */
/* ================================================================== */

function InnerScene({ reducedMotion }: { reducedMotion: boolean }) {
  const scrollProgress = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Scroll tracking with passive listener
  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    let latestScrollY = 0;
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(
          1,
          Math.max(0, latestScrollY / maxScroll)
        );
      }
      ticking = false;
    };

    const onScroll = () => {
      latestScrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initialize
    latestScrollY = window.scrollY;
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  // Mouse tracking
  useEffect(() => {
    if (reducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [reducedMotion]);

  return (
    <>
      <CameraController
        scrollProgress={scrollProgress}
        mousePosition={mousePosition}
        reducedMotion={reducedMotion}
      />

      {/* Floating Wireframe Shapes */}
      {SHAPES.map((config, i) => (
        <WireframeShape
          key={i}
          config={config}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Dust Particles */}
      <DustParticles scrollProgress={scrollProgress} />
    </>
  );
}

/* ================================================================== */
/*  Main Export                                                         */
/* ================================================================== */

export default function ScrollScene() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[2] pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ fov: 60, position: [0, 0, 10] }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <InnerScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

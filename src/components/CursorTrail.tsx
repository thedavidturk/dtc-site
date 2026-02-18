'use client';

import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const TRAIL_LENGTH = 25;
const LERP_FACTOR = 0.12;
const IDLE_TIMEOUT = 1500; // ms before fade-out
const FADE_SPEED = 0.04;
const PULSE_SPEED = 1.8;
const PULSE_AMPLITUDE = 0.06;

const COLOR_INDIGO = new THREE.Color('#6366F1');
const COLOR_CORAL = new THREE.Color('#F97316');

// ---------------------------------------------------------------------------
// GlowOrb -- the main sphere + soft outer glow that follows the cursor
// ---------------------------------------------------------------------------
function GlowOrb({
  mouseRef,
  visibilityRef,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector3>;
  visibilityRef: React.MutableRefObject<number>;
}) {
  const innerRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  const smoothed = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ clock }) => {
    // Lerp toward current mouse position
    smoothed.current.lerp(mouseRef.current, LERP_FACTOR);

    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * PULSE_SPEED) * PULSE_AMPLITUDE;
    const vis = visibilityRef.current;

    // Inner orb
    if (innerRef.current) {
      innerRef.current.position.copy(smoothed.current);
      innerRef.current.scale.setScalar(pulse);
      (innerRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 * vis;
    }
    // Outer glow
    if (outerRef.current) {
      outerRef.current.position.copy(smoothed.current);
      outerRef.current.scale.setScalar(pulse * 1.05);
      (outerRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 * vis;
    }
  });

  return (
    <>
      {/* Inner orb */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer glow */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// ---------------------------------------------------------------------------
// ParticleTrail -- ring-buffer trail rendered as THREE.Points
// ---------------------------------------------------------------------------
function ParticleTrail({
  mouseRef,
  visibilityRef,
}: {
  mouseRef: React.MutableRefObject<THREE.Vector3>;
  visibilityRef: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const smoothed = useRef(new THREE.Vector3(0, 0, 0));
  const head = useRef(0);

  // Pre-allocate typed arrays
  const { positions, sizes, colors } = useMemo(() => {
    const p = new Float32Array(TRAIL_LENGTH * 3);
    const s = new Float32Array(TRAIL_LENGTH);
    const c = new Float32Array(TRAIL_LENGTH * 3);
    return { positions: p, sizes: s, colors: c };
  }, []);

  // Temp color for lerping
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    smoothed.current.lerp(mouseRef.current, LERP_FACTOR);
    const vis = visibilityRef.current;

    // Write current smoothed position into the ring buffer at head
    const idx = head.current % TRAIL_LENGTH;
    positions[idx * 3] = smoothed.current.x;
    positions[idx * 3 + 1] = smoothed.current.y;
    positions[idx * 3 + 2] = smoothed.current.z;
    head.current++;

    // Update sizes and colors based on age (newest = head, oldest = head - TRAIL_LENGTH)
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      // How old is this sample? 0 = newest, TRAIL_LENGTH-1 = oldest
      const ringIdx = (head.current - 1 - i + TRAIL_LENGTH * 1000) % TRAIL_LENGTH;
      const age = i / (TRAIL_LENGTH - 1); // 0 newest, 1 oldest

      // Size: newest ~4, oldest ~0.5
      sizes[ringIdx] = (4 - age * 3.5) * vis;

      // Color: lerp indigo -> coral
      tmpColor.copy(COLOR_INDIGO).lerp(COLOR_CORAL, age);
      colors[ringIdx * 3] = tmpColor.r;
      colors[ringIdx * 3 + 1] = tmpColor.g;
      colors[ringIdx * 3 + 2] = tmpColor.b;
    }

    // Flag attributes for GPU upload
    const geom = pointsRef.current?.geometry;
    if (geom) {
      geom.attributes.position.needsUpdate = true;
      geom.attributes.size.needsUpdate = true;
      geom.attributes.color.needsUpdate = true;
    }
  });

  // Custom shader material for size attenuation + per-particle color
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (1.0 / -mvPosition.z) * 50.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          // Soft circle falloff
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, d);
          gl_FragColor = vec4(vColor, alpha * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });
  }, []);

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={TRAIL_LENGTH}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={TRAIL_LENGTH}
          itemSize={1}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={TRAIL_LENGTH}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
    </points>
  );
}

// ---------------------------------------------------------------------------
// Scene -- orchestrator that lives inside the Canvas, owns mouse + visibility
// ---------------------------------------------------------------------------
function Scene() {
  const { viewport } = useThree();
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const visibilityRef = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMoving = useRef(false);

  // Convert screen px to world coordinates for an orthographic camera
  const screenToWorld = useCallback(
    (clientX: number, clientY: number) => {
      // Viewport dimensions in world units
      const hw = viewport.width / 2;
      const hh = viewport.height / 2;

      // Normalised device coords
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = -(clientY / window.innerHeight) * 2 + 1;

      return new THREE.Vector3(nx * hw, ny * hh, 0);
    },
    [viewport.width, viewport.height],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = screenToWorld(e.clientX, e.clientY);
      isMoving.current = true;

      // Reset idle timer
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        isMoving.current = false;
      }, IDLE_TIMEOUT);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [screenToWorld]);

  // Animate visibility fade-in / fade-out via ref (no setState)
  useFrame(() => {
    if (isMoving.current) {
      visibilityRef.current = Math.min(1, visibilityRef.current + FADE_SPEED);
    } else {
      visibilityRef.current = Math.max(0, visibilityRef.current - FADE_SPEED);
    }
  });

  return (
    <>
      <GlowOrb mouseRef={mouseRef} visibilityRef={visibilityRef} />
      <ParticleTrail mouseRef={mouseRef} visibilityRef={visibilityRef} />
    </>
  );
}

// ---------------------------------------------------------------------------
// CursorTrail -- public component (renders nothing on touch devices)
// ---------------------------------------------------------------------------
export default function CursorTrail() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    // Only render for devices with a fine pointer (mouse/trackpad)
    const mq = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mq.matches);

    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!hasFinePointer) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        orthographic
        camera={{ zoom: 50, position: [0, 0, 100], near: 0.1, far: 1000 }}
        frameloop="always"
        style={{ pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

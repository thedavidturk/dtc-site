"use client";

import { useEffect, useRef, useState } from "react";

// --- Types ---

interface StreakParticle {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  colorR: number;
  colorG: number;
  colorB: number;
  maxOpacity: number;
}

// --- Color Distribution ---
// 70% white/cool-gray, 20% electric-indigo, 10% warm-coral

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

const COLORS: { rgb: RgbColor; weight: number; maxOpacity: number }[] = [
  { rgb: { r: 248, g: 250, b: 252 }, weight: 50, maxOpacity: 0.2 },
  { rgb: { r: 148, g: 163, b: 184 }, weight: 20, maxOpacity: 0.2 },
  { rgb: { r: 99, g: 102, b: 241 }, weight: 20, maxOpacity: 0.15 },
  { rgb: { r: 249, g: 115, b: 22 }, weight: 10, maxOpacity: 0.15 },
];

const TOTAL_WEIGHT = COLORS.reduce((sum, c) => sum + c.weight, 0);

// --- Helpers ---

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function pickColor(): { rgb: RgbColor; maxOpacity: number } {
  let roll = Math.random() * TOTAL_WEIGHT;
  for (const entry of COLORS) {
    roll -= entry.weight;
    if (roll <= 0) return { rgb: entry.rgb, maxOpacity: entry.maxOpacity };
  }
  return { rgb: COLORS[0].rgb, maxOpacity: COLORS[0].maxOpacity };
}

// --- Particle Generation ---

function generateParticles(count: number, w: number, h: number): StreakParticle[] {
  const particles: StreakParticle[] = [];

  for (let i = 0; i < count; i++) {
    const color = pickColor();
    // Random drift direction when idle — very slow
    const angle = randomBetween(0, Math.PI * 2);
    const driftSpeed = randomBetween(0.1, 0.3);

    particles.push({
      x: randomBetween(0, w),
      y: randomBetween(0, h),
      baseVx: Math.cos(angle) * driftSpeed,
      baseVy: Math.sin(angle) * driftSpeed,
      size: randomBetween(1, 3),
      opacity: randomBetween(0.05, 0.12),
      colorR: color.rgb.r,
      colorG: color.rgb.g,
      colorB: color.rgb.b,
      maxOpacity: color.maxOpacity,
    });
  }

  return particles;
}

// --- Constants ---

const SMOOTHING_FACTOR = 0.15; // exponential moving average factor for velocity
const VELOCITY_DECAY = 0.92; // per-frame decay when not scrolling
const MAX_STREAK_LENGTH = 40;
const STREAK_VELOCITY_THRESHOLD = 2; // velocity above which particles start stretching

// --- Component ---

export default function ScrollStreaks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<StreakParticle[]>([]);
  const rafRef = useRef(0);
  const canvasSizeRef = useRef({ w: 0, h: 0 });

  // Scroll tracking refs
  const lastScrollYRef = useRef(0);
  const smoothVelocityRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const scrollDeltaAccRef = useRef(0); // accumulated scroll delta since last frame

  // SSR-safe mount + prefers-reduced-motion check
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    setMounted(true);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMounted(false);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Main effect: setup canvas, particles, animation loop, event listeners
  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 60;
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const oldSize = canvasSizeRef.current;

      // If we already had particles, re-generate them for the new size
      // Only re-generate if this is a real resize (not initial)
      if (oldSize.w > 0 && oldSize.h > 0) {
        particlesRef.current = generateParticles(particleCount, w, h);
      }

      canvasSizeRef.current = { w, h };
    }

    resizeCanvas();

    // Generate initial particles
    const { w, h } = canvasSizeRef.current;
    particlesRef.current = generateParticles(particleCount, w, h);

    // Initialize scroll tracking
    lastScrollYRef.current = window.scrollY;
    smoothVelocityRef.current = 0;
    scrollDeltaAccRef.current = 0;
    lastFrameTimeRef.current = performance.now();

    // Accumulate scroll deltas between frames for accuracy
    function onScroll() {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      scrollDeltaAccRef.current += delta;
      lastScrollYRef.current = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    function animate() {
      if (!ctx || !canvas) return;

      const now = performance.now();
      const dt = Math.min((now - lastFrameTimeRef.current) / 16.667, 3); // normalize to ~60fps, cap at 3x
      lastFrameTimeRef.current = now;

      const { w: cw, h: ch } = canvasSizeRef.current;
      if (cw === 0 || ch === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Compute raw scroll velocity for this frame
      const rawVelocity = scrollDeltaAccRef.current / Math.max(dt, 0.5);
      scrollDeltaAccRef.current = 0;

      // Smooth velocity with exponential moving average
      if (Math.abs(rawVelocity) > 0.1) {
        smoothVelocityRef.current =
          smoothVelocityRef.current * (1 - SMOOTHING_FACTOR) +
          rawVelocity * SMOOTHING_FACTOR;
      } else {
        // Decay towards zero when not scrolling
        smoothVelocityRef.current *= VELOCITY_DECAY;
        // Snap to zero when very small
        if (Math.abs(smoothVelocityRef.current) < 0.05) {
          smoothVelocityRef.current = 0;
        }
      }

      const velocity = smoothVelocityRef.current;
      const absVelocity = Math.abs(velocity);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Compute particle movement
        // Horizontal: always apply base drift + slight random perturbation during scroll
        let vx = p.baseVx * dt;
        let vy = p.baseVy * dt;

        if (absVelocity > 0.1) {
          // Scroll-driven movement: particles move opposite to scroll direction
          // Scrolling down (positive velocity) -> particles stream upward (negative y)
          vy -= velocity * 0.5 * dt;

          // Slight horizontal scatter for natural feel
          vx += (Math.random() - 0.5) * absVelocity * 0.05 * dt;
        }

        p.x += vx;
        p.y += vy;

        // Wrap around edges
        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;
        if (p.y < -50) p.y = ch + 50;
        if (p.y > ch + 50) p.y = -50;

        // Compute streak length based on velocity
        const streakFactor = Math.min(absVelocity / 30, 1);
        const streakLength = streakFactor * MAX_STREAK_LENGTH;

        // Opacity increases slightly with velocity (but stays subtle)
        const dynamicOpacity = Math.min(
          p.opacity + streakFactor * 0.06,
          p.maxOpacity
        );

        const r = p.colorR;
        const g = p.colorG;
        const b = p.colorB;

        if (absVelocity > STREAK_VELOCITY_THRESHOLD && streakLength > 1) {
          // Draw as a streak/line
          // Direction of streak is opposite to movement
          const streakDir = velocity > 0 ? 1 : -1; // positive = streak extends downward (trail behind upward movement)
          const halfSize = p.size * 0.5;

          // Glow behind the streak
          const glowOpacity = dynamicOpacity * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + streakDir * streakLength);
          ctx.strokeStyle = `rgba(${r},${g},${b},${glowOpacity})`;
          ctx.lineWidth = p.size * 2.5;
          ctx.lineCap = "round";
          ctx.stroke();

          // Main streak
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + streakDir * streakLength);
          ctx.strokeStyle = `rgba(${r},${g},${b},${dynamicOpacity})`;
          ctx.lineWidth = halfSize * 2;
          ctx.lineCap = "round";
          ctx.stroke();

          // Bright head of the streak
          ctx.beginPath();
          ctx.arc(p.x, p.y, halfSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(dynamicOpacity * 1.5, p.maxOpacity)})`;
          ctx.fill();
        } else {
          // Draw as a dot when idle or slow

          // Subtle glow
          if (p.size > 1.5) {
            const glowSize = p.size * 2;
            const glowOpacity = dynamicOpacity * 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${glowOpacity})`;
            ctx.fill();
          }

          // Main dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${dynamicOpacity})`;
          ctx.fill();
        }
      }

      ctx.restore();

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[6] pointer-events-none"
      aria-hidden="true"
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface ShootingStar {
  x: number;
  y: number;
  angle: number; // radians
  speed: number;
  trailLength: number;
  headRadius: number;
  opacity: number;
  color: string;
  lineWidth: number;
  lifespan: number;
  age: number;
  fadeoutStart: number;
}

const COLORS = {
  white: "#FFFFFF",
  softWhite: "#F8FAFC",
  electricIndigo: "#6366F1",
  warmCoral: "#F97316",
};

function pickTrailColor(): string {
  const roll = Math.random();
  if (roll < 0.7) return COLORS.white;
  if (roll < 0.9) return COLORS.electricIndigo;
  return COLORS.warmCoral;
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createShootingStar(width: number, height: number): ShootingStar {
  const isReverse = Math.random() < 0.2;

  let angle: number;
  let x: number;
  let y: number;

  if (isReverse) {
    // Top-left to bottom-right: 290-340 degrees
    angle = degToRad(randomBetween(290, 340));
    // Spawn along top edge or left edge
    if (Math.random() < 0.5) {
      x = randomBetween(0, width * 0.4);
      y = -10;
    } else {
      x = -10;
      y = randomBetween(0, height * 0.4);
    }
  } else {
    // Top-right to bottom-left: 200-250 degrees
    angle = degToRad(randomBetween(200, 250));
    // Spawn along top edge or right edge
    if (Math.random() < 0.5) {
      x = randomBetween(width * 0.3, width + 10);
      y = -10;
    } else {
      x = width + 10;
      y = randomBetween(0, height * 0.5);
    }
  }

  const lifespan = Math.floor(randomBetween(30, 60));

  return {
    x,
    y,
    angle,
    speed: randomBetween(8, 15),
    trailLength: randomBetween(80, 180),
    headRadius: randomBetween(2, 3),
    opacity: randomBetween(0.5, 0.8),
    color: pickTrailColor(),
    lineWidth: randomBetween(1, 1.5),
    lifespan,
    age: 0,
    fadeoutStart: lifespan - 10,
  };
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: ShootingStar[] = [];
    let framesSinceLastSpawn = 0;
    let nextSpawnFrame: number;

    // Detect mobile for reduced frequency
    const isMobile = window.innerWidth < 768;
    const maxStars = isMobile ? 2 : 3;

    function getSpawnInterval(): number {
      // Convert seconds to approximate frames (assuming ~60fps)
      const minSec = isMobile ? 4 : 2;
      const maxSec = isMobile ? 8 : 5;
      return Math.floor(randomBetween(minSec * 60, maxSec * 60));
    }

    nextSpawnFrame = getSpawnInterval();

    function handleResize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    function animate() {
      if (!ctx || !canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Spawn logic
      framesSinceLastSpawn++;
      if (framesSinceLastSpawn >= nextSpawnFrame && stars.length < maxStars) {
        stars.push(createShootingStar(width, height));
        framesSinceLastSpawn = 0;
        nextSpawnFrame = getSpawnInterval();
      }

      // Update and draw stars
      const aliveStars: ShootingStar[] = [];

      for (const star of stars) {
        star.age++;

        // Move
        star.x += Math.cos(star.angle) * star.speed;
        star.y -= Math.sin(star.angle) * star.speed;

        // Calculate current opacity with fadeout
        let currentOpacity = star.opacity;
        if (star.age >= star.fadeoutStart) {
          const fadeProgress =
            (star.age - star.fadeoutStart) /
            (star.lifespan - star.fadeoutStart);
          currentOpacity = star.opacity * (1 - fadeProgress);
        }

        // Skip if fully faded or past lifespan
        if (star.age > star.lifespan || currentOpacity <= 0.01) {
          continue;
        }

        // Calculate trail end position (behind the head along the travel direction)
        const tailX =
          star.x - Math.cos(star.angle) * star.trailLength;
        const tailY =
          star.y + Math.sin(star.angle) * star.trailLength;

        // Draw trail with gradient
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          tailX,
          tailY
        );

        // Parse color for gradient
        const color = star.color;
        gradient.addColorStop(0, colorWithAlpha(color, currentOpacity));
        gradient.addColorStop(1, colorWithAlpha(color, 0));

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw head glow (larger, more transparent circle behind)
        ctx.beginPath();
        ctx.arc(star.x, star.y, randomBetween(4, 5), 0, Math.PI * 2);
        ctx.fillStyle = colorWithAlpha(COLORS.white, currentOpacity * 0.1);
        ctx.fill();

        // Draw bright head dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.headRadius, 0, Math.PI * 2);
        ctx.fillStyle = colorWithAlpha(
          Math.random() < 0.5 ? COLORS.white : COLORS.softWhite,
          currentOpacity
        );
        ctx.fill();

        aliveStars.push(star);
      }

      stars = aliveStars;
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[5] pointer-events-none"
      aria-hidden="true"
    />
  );
}

/** Convert a hex color to rgba string with given alpha */
function colorWithAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

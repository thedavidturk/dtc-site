"use client";

import { useEffect, useRef, useState } from "react";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use a small canvas and let CSS scale it up for organic grain + performance
    const GRAIN_WIDTH = 256;
    const GRAIN_HEIGHT = 256;
    canvas.width = GRAIN_WIDTH;
    canvas.height = GRAIN_HEIGHT;

    const imageData = ctx.createImageData(GRAIN_WIDTH, GRAIN_HEIGHT);
    const data = imageData.data;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function generateNoise() {
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;     // R
        data[i + 1] = v; // G
        data[i + 2] = v; // B
        data[i + 3] = 12; // A (~4.7% opacity for subtlety)
      }
      ctx!.putImageData(imageData, 0, 0);
    }

    // Generate initial noise
    generateNoise();

    // If user prefers reduced motion, show static grain only
    if (prefersReducedMotion) {
      return;
    }

    // Animate: update noise every 3 frames (~20 updates/sec at 60fps)
    function animate() {
      frameCountRef.current += 1;
      if (frameCountRef.current % 3 === 0) {
        generateNoise();
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] h-full w-full opacity-40"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}

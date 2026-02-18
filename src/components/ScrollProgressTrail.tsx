"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// --- Design system colors ---
const ELECTRIC_INDIGO = { r: 99, g: 102, b: 241 }; // #6366F1
const WARM_CORAL = { r: 249, g: 115, b: 22 }; // #F97316

const NODE_COUNT = 9;
const PARTICLE_COUNT = 6;

const DESKTOP_WIDTH = 40;
const MOBILE_WIDTH = 24;
const DESKTOP_LINE_X = 16;
const MOBILE_LINE_X = 10;

const FADE_EDGE_PX = 40;

interface Particle {
  y: number;
  speed: number;
  opacity: number;
}

export default function ScrollProgressTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  const scrollProgressRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const nodeFlashRef = useRef<number[]>(new Array(NODE_COUNT).fill(0));
  const prevPassedNodesRef = useRef<boolean[]>(
    new Array(NODE_COUNT).fill(false)
  );
  const pulsePhaseRef = useRef(0);
  const shouldHideRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const isMobileRef = useRef(false);

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        y: Math.random(),
        speed: 0.5 + Math.random() * 1.0,
        opacity: 0.15 + Math.random() * 0.1,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    setMounted(true);
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const isMobile = window.innerWidth < 768;
      isMobileRef.current = isMobile;
      const width = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;

      canvas.width = width * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      shouldHideRef.current = scrollHeight <= windowHeight * 1.2;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) {
        scrollProgressRef.current = 0;
        return;
      }
      scrollProgressRef.current = Math.min(
        1,
        Math.max(0, window.scrollY / maxScroll)
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const fadeMult = (y: number, h: number): number => {
      if (y < FADE_EDGE_PX) return y / FADE_EDGE_PX;
      if (y > h - FADE_EDGE_PX) return (h - y) / FADE_EDGE_PX;
      return 1;
    };

    const rgba = (
      c: { r: number; g: number; b: number },
      a: number
    ): string => `rgba(${c.r},${c.g},${c.b},${a})`;

    let lastTime = 0;

    const draw = (timestamp: number) => {
      const deltaMs = lastTime ? timestamp - lastTime : 16;
      lastTime = timestamp;

      const isMobile = isMobileRef.current;
      const canvasW = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
      const canvasH = window.innerHeight;
      const lineX = isMobile ? MOBILE_LINE_X : DESKTOP_LINE_X;
      const progress = scrollProgressRef.current;
      const reducedMotion = prefersReducedMotionRef.current;

      ctx.clearRect(0, 0, canvasW, canvasH);

      if (shouldHideRef.current) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const trailEndY = progress * canvasH;

      // Glow line (wider, behind core)
      if (trailEndY > 0) {
        ctx.save();
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, trailEndY);

        const safeEnd = Math.max(trailEndY, 1);
        const glowGrad = ctx.createLinearGradient(0, 0, 0, safeEnd);
        glowGrad.addColorStop(0, rgba(ELECTRIC_INDIGO, 0));
        const fadeTopStop = Math.min(FADE_EDGE_PX / safeEnd, 0.99);
        glowGrad.addColorStop(fadeTopStop, rgba(ELECTRIC_INDIGO, 0.08));
        if (trailEndY > canvasH - FADE_EDGE_PX) {
          const fadeBotStart = Math.max(
            (canvasH - FADE_EDGE_PX) / safeEnd,
            fadeTopStop + 0.001
          );
          glowGrad.addColorStop(
            Math.min(fadeBotStart, 0.999),
            rgba(ELECTRIC_INDIGO, 0.08)
          );
          glowGrad.addColorStop(1, rgba(ELECTRIC_INDIGO, 0));
        } else {
          glowGrad.addColorStop(1, rgba(ELECTRIC_INDIGO, 0.08));
        }
        ctx.strokeStyle = glowGrad;
        ctx.stroke();
        ctx.restore();
      }

      // Core line
      if (trailEndY > 0) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, trailEndY);

        const safeEnd = Math.max(trailEndY, 1);
        const coreGrad = ctx.createLinearGradient(0, 0, 0, safeEnd);
        coreGrad.addColorStop(0, rgba(ELECTRIC_INDIGO, 0));
        const fadeTopStop = Math.min(FADE_EDGE_PX / safeEnd, 0.99);
        coreGrad.addColorStop(fadeTopStop, rgba(ELECTRIC_INDIGO, 0.4));
        if (trailEndY > canvasH - FADE_EDGE_PX) {
          const fadeBotStart = Math.max(
            (canvasH - FADE_EDGE_PX) / safeEnd,
            fadeTopStop + 0.001
          );
          coreGrad.addColorStop(
            Math.min(fadeBotStart, 0.999),
            rgba(ELECTRIC_INDIGO, 0.4)
          );
          coreGrad.addColorStop(1, rgba(ELECTRIC_INDIGO, 0));
        } else {
          coreGrad.addColorStop(1, rgba(ELECTRIC_INDIGO, 0.4));
        }
        ctx.strokeStyle = coreGrad;
        ctx.stroke();
        ctx.restore();
      }

      // Section node markers
      for (let i = 0; i < NODE_COUNT; i++) {
        const nodeProgress = (i + 1) / (NODE_COUNT + 1);
        const nodeY = nodeProgress * canvasH;
        const fade = fadeMult(nodeY, canvasH);
        const passed = progress >= nodeProgress;

        if (passed && !prevPassedNodesRef.current[i]) {
          nodeFlashRef.current[i] = 1.0;
        }
        prevPassedNodesRef.current[i] = passed;

        if (nodeFlashRef.current[i] > 0) {
          nodeFlashRef.current[i] = Math.max(
            0,
            nodeFlashRef.current[i] - deltaMs / 600
          );
        }

        let opacity: number;
        if (passed) {
          const flashBoost = nodeFlashRef.current[i] * 0.3;
          opacity = (0.3 + flashBoost) * fade;
        } else {
          opacity = 0.06 * fade;
        }

        ctx.beginPath();
        ctx.arc(lineX, nodeY, 2, 0, Math.PI * 2);
        ctx.fillStyle = passed
          ? rgba(ELECTRIC_INDIGO, opacity)
          : `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      // Energy pulse at leading edge
      if (trailEndY > 0) {
        const fade = fadeMult(trailEndY, canvasH);

        if (!reducedMotion) {
          pulsePhaseRef.current += (deltaMs / 1500) * Math.PI * 2;
        }
        const pulseScale = reducedMotion
          ? 1.0
          : 0.8 + 0.4 * (0.5 + 0.5 * Math.sin(pulsePhaseRef.current));

        const glowRad = ctx.createRadialGradient(
          lineX,
          trailEndY,
          0,
          lineX,
          trailEndY,
          12 * pulseScale
        );
        glowRad.addColorStop(0, rgba(ELECTRIC_INDIGO, 0.15 * fade));
        glowRad.addColorStop(1, rgba(ELECTRIC_INDIGO, 0));
        ctx.beginPath();
        ctx.arc(lineX, trailEndY, 12 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = glowRad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(lineX, trailEndY, 3 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = rgba(ELECTRIC_INDIGO, 0.8 * fade);
        ctx.fill();
      }

      // Energy particles
      if (!reducedMotion && trailEndY > 5) {
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speed / Math.max(trailEndY, 1);

          if (p.y < 0) {
            p.y = 0.85 + Math.random() * 0.15;
            p.speed = 0.5 + Math.random() * 1.0;
            p.opacity = 0.15 + Math.random() * 0.1;
          }

          const particleAbsY = p.y * trailEndY;
          const pFade = fadeMult(particleAbsY, canvasH);

          ctx.beginPath();
          ctx.arc(lineX, particleAbsY, 1, 0, Math.PI * 2);
          ctx.fillStyle = rgba(WARM_CORAL, p.opacity * pFade);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 z-[4] pointer-events-none"
      aria-hidden="true"
    />
  );
}

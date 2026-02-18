"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glareEnabled?: boolean;
  glareMaxOpacity?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.02,
  glareEnabled = true,
  glareMaxOpacity = 0.15,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const isHovered = useRef(false);

  // Current animated values (lerped)
  const current = useRef({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  // Target values (raw mouse position)
  const target = useRef({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  const animate = useCallback(() => {
    const lerpFactor = 0.1;

    current.current.rotateX = lerp(
      current.current.rotateX,
      target.current.rotateX,
      lerpFactor
    );
    current.current.rotateY = lerp(
      current.current.rotateY,
      target.current.rotateY,
      lerpFactor
    );
    current.current.glareX = lerp(
      current.current.glareX,
      target.current.glareX,
      lerpFactor
    );
    current.current.glareY = lerp(
      current.current.glareY,
      target.current.glareY,
      lerpFactor
    );

    const card = cardRef.current;
    if (card) {
      const currentScale = isHovered.current ? scale : 1;
      card.style.transform = `perspective(1000px) rotateX(${current.current.rotateX}deg) rotateY(${current.current.rotateY}deg) scale3d(${currentScale}, ${currentScale}, ${currentScale})`;

      // Dynamic shadow based on tilt
      const shadowX = -current.current.rotateY * 1.5;
      const shadowY = current.current.rotateX * 1.5;
      card.style.boxShadow = `${shadowX}px ${shadowY + 8}px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)`;
    }

    if (glareEnabled && glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${current.current.glareX}% ${current.current.glareY}%, rgba(255, 255, 255, ${glareMaxOpacity}), transparent 60%)`;
    }

    // Keep animating until values settle
    const dx = Math.abs(target.current.rotateX - current.current.rotateX);
    const dy = Math.abs(target.current.rotateY - current.current.rotateY);
    if (dx > 0.01 || dy > 0.01 || isHovered.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [scale, glareEnabled, glareMaxOpacity]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalize to -1..1 range
      const normalizedX = (x - centerX) / centerX;
      const normalizedY = (y - centerY) / centerY;

      // rotateX is based on Y position (tilts forward/back)
      // rotateY is based on X position (tilts left/right)
      // Negative rotateX when mouse is below center makes card tilt toward viewer
      target.current.rotateX = -normalizedY * maxTilt;
      target.current.rotateY = normalizedX * maxTilt;

      // Glare position as percentage
      target.current.glareX = (x / rect.width) * 100;
      target.current.glareY = (y / rect.height) * 100;
    },
    [maxTilt, prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    isHovered.current = true;

    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
    }

    // Start animation loop
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    isHovered.current = false;

    // Reset targets to flat
    target.current.rotateX = 0;
    target.current.rotateY = 0;
    target.current.glareX = 50;
    target.current.glareY = 50;

    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }

    // Continue animation to settle back to flat
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate, prefersReducedMotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      {children}

      {/* Glare overlay */}
      {glareEnabled && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl"
          style={{
            opacity: 0,
            transition: "opacity 0.3s ease-out",
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}

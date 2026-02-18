"use client";

import React, { useRef, useEffect, useState, useCallback, useId } from "react";

interface DistortionCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function DistortionCard({
  children,
  className = "",
}: DistortionCardProps) {
  const reactId = useId();
  // Create a CSS-safe ID by stripping colons from React's useId output
  const filterId = `distortion-${reactId.replace(/:/g, "")}`;
  const seedRef = useRef(Math.floor(Math.random() * 1000));

  const wrapperRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const rafId = useRef<number>(0);
  const isHovered = useRef(false);
  const currentScale = useRef(0);
  const targetScale = useRef(0);
  const isAnimating = useRef(false);

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
    const lerpFactor = isHovered.current ? 0.1 : 0.06; // Slower exit
    currentScale.current = lerp(
      currentScale.current,
      targetScale.current,
      lerpFactor
    );

    // Update the SVG filter attribute directly
    if (displacementRef.current) {
      displacementRef.current.setAttribute(
        "scale",
        String(currentScale.current)
      );
    }

    // Check if we're close enough to stop
    const diff = Math.abs(currentScale.current - targetScale.current);
    if (diff > 0.01) {
      isAnimating.current = true;
      rafId.current = requestAnimationFrame(animate);
    } else {
      // Snap to target and stop
      currentScale.current = targetScale.current;
      if (displacementRef.current) {
        displacementRef.current.setAttribute(
          "scale",
          String(targetScale.current)
        );
      }
      isAnimating.current = false;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    isHovered.current = true;
    targetScale.current = 8;
    startAnimation();
  }, [prefersReducedMotion, startAnimation]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      if (!turbulenceRef.current || !wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Subtly shift baseFrequency based on mouse position for organic variation
      const baseFreqX = 0.008 + x * 0.006;
      const baseFreqY = 0.008 + y * 0.006;
      turbulenceRef.current.setAttribute(
        "baseFrequency",
        `${baseFreqX} ${baseFreqY}`
      );
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    isHovered.current = false;
    targetScale.current = 0;
    startAnimation();

    // Reset base frequency
    if (turbulenceRef.current) {
      turbulenceRef.current.setAttribute("baseFrequency", "0.01");
    }
  }, [prefersReducedMotion, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`distortion-card-wrapper relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.5s ease",
      }}
    >
      {/* Inline SVG filter definition */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <filter id={filterId}>
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves={3}
            result="noise"
            seed={seedRef.current}
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Content with filter applied */}
      <div
        className="distortion-card-content"
        style={{
          filter: prefersReducedMotion ? "none" : `url(#${filterId})`,
          transition: "transform 0.5s ease",
        }}
      >
        {children}
      </div>

      {/* Hover scale via CSS */}
      <style jsx>{`
        .distortion-card-wrapper:hover {
          transform: scale(1.01);
        }
        @media (prefers-reduced-motion: reduce) {
          .distortion-card-wrapper:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

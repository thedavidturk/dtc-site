"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

interface HolographicSheenProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicSheen({
  children,
  className = "",
}: HolographicSheenProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      wrapperRef.current.style.setProperty("--mouse-x", `${x}%`);
      wrapperRef.current.style.setProperty("--mouse-y", `${y}%`);
    },
    [prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Specular highlight — soft radial light that follows the cursor */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: prefersReducedMotion
            ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 50%)"
            : "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.05), transparent 45%)",
          opacity: prefersReducedMotion ? 1 : isHovered ? 1 : 0,
          transition: isHovered
            ? "opacity 0.3s ease-in"
            : "opacity 0.5s ease-out",
        }}
      />

      {/* Iridescent sweep — the holographic rainbow band */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          /* Make the overlay much wider than the card so the gradient
             band can sweep across as --mouse-x changes */
          top: 0,
          bottom: 0,
          left: "-100%",
          width: "300%",
          background: prefersReducedMotion
            ? "linear-gradient(105deg, transparent 40%, rgba(99,102,241,0.06) 45%, rgba(139,92,246,0.04) 48%, rgba(249,115,22,0.04) 52%, rgba(52,211,153,0.04) 55%, transparent 60%)"
            : "linear-gradient(105deg, transparent 36%, rgba(99,102,241,0.08) 42%, rgba(139,92,246,0.06) 45%, rgba(168,85,247,0.05) 48%, rgba(249,115,22,0.06) 51%, rgba(52,211,153,0.06) 54%, rgba(56,189,248,0.05) 57%, transparent 63%)",
          transform: prefersReducedMotion
            ? "translateX(0%)"
            : `translateX(calc(var(--mouse-x) * 0.6 - 30%))`,
          opacity: prefersReducedMotion ? 0.5 : isHovered ? 1 : 0,
          transition: isHovered
            ? "opacity 0.3s ease-in"
            : "opacity 0.5s ease-out",
        }}
      />

      {/* Edge shimmer — extremely subtle border highlight near cursor */}
      <div
        className="absolute inset-0 z-20 pointer-events-none rounded-[inherit]"
        style={{
          background: prefersReducedMotion
            ? "none"
            : `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.06), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          transition: isHovered
            ? "opacity 0.3s ease-in"
            : "opacity 0.5s ease-out",
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
    </div>
  );
}

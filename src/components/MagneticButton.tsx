"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element pulls toward the cursor (0-1). Default: 0.3 */
  strength?: number;
  /** The magnetic field radius in pixels. Default: 150 */
  radius?: number;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  radius = 150,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Motion values for x/y offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-animated values for smooth physics-based movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        x.set(distX * strength);
        y.set(distY * strength);
        if (!isHovered) setIsHovered(true);
      } else {
        x.set(0);
        y.set(0);
        if (isHovered) setIsHovered(false);
      }
    },
    [prefersReducedMotion, strength, radius, x, y, isHovered]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  // If reduced motion is preferred, render without the magnetic effect
  if (prefersReducedMotion) {
    return <div className={className} style={{ display: "inline-block" }}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{ display: "inline-block", position: "relative" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Expand the hit area by using padding + negative margin
      // so the magnetic field extends beyond the visual boundary
    >
      <motion.div
        ref={ref}
        style={{
          x: springX,
          y: springY,
          display: "inline-block",
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

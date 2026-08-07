"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic -- wraps an element so it leans toward the pointer while
 * hovered and springs home on leave. Desktop-only by nature (no
 * mousemove on touch); strength is the fraction of the pointer's
 * offset from center the element follows.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className = "inline-block",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </m.div>
  );
}

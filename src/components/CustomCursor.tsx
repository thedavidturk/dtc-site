"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

/* The pill's RGB-split outline: the artifact's channel offsets. */
const PILL_CHANNELS: { color: string; x: number; y: number }[] = [
  { color: "#ff2a2a", x: -2, y: -1 },
  { color: "#2a7fff", x: 2, y: 1 },
  { color: "#2aff2a", x: 0, y: 2 },
];

type Mode = "default" | "view" | "hidden";

/**
 * CustomCursor -- the viewfinder. A small bone dot tracks the
 * pointer; over work tiles (elements marked data-cursor="view") it
 * blooms into a VIEW pill ringed by the prism's channel outlines.
 * Desktop pointers only; native cursor returns over text fields and
 * under reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("input, textarea, select")) setMode("hidden");
      else if (t.closest('[data-cursor="view"]')) setMode("view");
      else setMode("default");
    };
    const leave = () => setMode("hidden");

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999]"
      style={{ x: sx, y: sy }}
    >
      {/* The dot */}
      <m.div
        animate={{ scale: mode === "default" ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.52, 0.01, 0, 1] }}
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone mix-blend-difference"
      />

      {/* The viewfinder pill */}
      <m.div
        animate={{ scale: mode === "view" ? 1 : 0, opacity: mode === "view" ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.52, 0.01, 0, 1] }}
        className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone"
      >
        <span className="text-[10px] font-normal uppercase tracking-[0.08em] text-obsidian">
          View
        </span>
        {PILL_CHANNELS.map((channel) => (
          <span
            key={channel.color}
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: channel.color,
              transform: `translate(${channel.x}px, ${channel.y}px)`,
              opacity: 0.7,
            }}
          />
        ))}
      </m.div>
    </m.div>
  );
}

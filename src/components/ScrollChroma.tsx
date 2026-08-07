"use client";

import { useEffect } from "react";
import { useScroll, useSpring, useVelocity } from "framer-motion";

/**
 * ScrollChroma -- drives the site-wide `--chroma` custom property from
 * scroll velocity. At rest it sits at 0; scroll fast and it rises
 * toward 1, splitting headline text into the prism's red/cyan/lime
 * channels (the text-shadow lives on the headline classes in
 * globals.css), then settling back into focus as the page stops.
 * Inert under reduced motion.
 */
export default function ScrollChroma() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 320, damping: 60, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const unsub = smooth.on("change", (v) => {
      const c = Math.min(Math.abs(v) / 2600, 1);
      root.style.setProperty("--chroma", c < 0.02 ? "0" : c.toFixed(3));
    });
    return () => {
      unsub();
      root.style.setProperty("--chroma", "0");
    };
  }, [smooth]);

  return null;
}

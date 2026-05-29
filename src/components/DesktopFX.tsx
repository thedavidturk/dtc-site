"use client";

import { useEffect, useState, ReactNode } from "react";

/**
 * DesktopFX - renders heavy decorative effects (continuous canvas / rAF loops)
 * only on non-touch desktop devices that haven't requested reduced motion.
 *
 * These effects (shooting stars, scroll streaks, scroll-progress trail, film
 * grain) add main-thread work on every frame. On phones that competes with
 * scrolling and causes jank/freezes, for very little visual payoff on a small
 * screen. Gating them to desktop keeps mobile fast.
 */
export default function DesktopFX({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isNarrow = window.innerWidth < 1024;

    if (!isTouch && !reducedMotion && !isNarrow) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;
  return <>{children}</>;
}

"use client";

import { useEffect, useRef, ReactNode } from "react";

interface WorkMarqueeProps {
  /** Rendered tiles, already duplicated by the caller for a seamless loop. */
  children: ReactNode;
  orientation: "vertical" | "horizontal";
  /** Auto-scroll speed in px per second. */
  speed?: number;
  /** Reverse the auto-scroll direction. */
  reverse?: boolean;
  className?: string;
  /** Classes for the moving track (layout of the tiles). */
  trackClassName?: string;
}

/**
 * Auto-scrolling marquee the visitor can also control.
 *
 * - Auto-advances via requestAnimationFrame (paused when offscreen or when
 *   the user prefers reduced motion).
 * - Pauses on hover (desktop) and while being dragged/swiped (any device).
 * - Uses transform + pointer-drag with overflow hidden, so it never traps
 *   the page's own scroll. On horizontal strips, touch-action: pan-y keeps
 *   vertical page scrolling working while horizontal drags scrub the wall.
 * - A drag past a small threshold suppresses the click on release, so a real
 *   tap still navigates but a swipe does not.
 */
export default function WorkMarquee({
  children,
  orientation,
  speed = 40,
  reverse = false,
  className = "",
  trackClassName = "",
}: WorkMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const visibleRef = useRef(true);
  const reducedRef = useRef(false);
  const lastPointerRef = useRef(0);
  const movedRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  const isVertical = orientation === "vertical";

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Half the track measures one full (un-duplicated) set, the wrap point.
    const measure = () => {
      halfRef.current = isVertical
        ? track.scrollHeight / 2
        : track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    // Pause work when the wall is offscreen.
    const io = new IntersectionObserver(
      ([entry]) => (visibleRef.current = entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(track);

    const wrap = (v: number) => {
      const half = halfRef.current;
      if (half <= 0) return v;
      // keep offset within (-half, 0]
      while (v <= -half) v += half;
      while (v > 0) v -= half;
      return v;
    };

    const apply = () => {
      track.style.transform = isVertical
        ? `translateY(${offsetRef.current}px)`
        : `translateX(${offsetRef.current}px)`;
    };

    const tick = (t: number) => {
      const last = lastTimeRef.current || t;
      const dt = Math.min((t - last) / 1000, 0.05); // clamp big gaps
      lastTimeRef.current = t;

      if (
        !pausedRef.current &&
        !draggingRef.current &&
        visibleRef.current &&
        !reducedRef.current
      ) {
        const dir = reverse ? 1 : -1;
        offsetRef.current = wrap(offsetRef.current + dir * speed * dt);
        apply();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // ---- Pointer drag (mouse + touch) ----
    // A press alone does NOT start a drag or capture the pointer, so a plain
    // tap/click still reaches the tile's <a> and navigates. We only begin
    // dragging (and capture) once movement crosses DRAG_THRESHOLD px.
    const DRAG_THRESHOLD = 8;
    const getPos = (e: PointerEvent) => (isVertical ? e.clientY : e.clientX);
    const pressedRef = { current: false };
    const startPosRef = { current: 0 };
    const activePointerRef = { current: -1 };

    const onDown = (e: PointerEvent) => {
      pressedRef.current = true;
      draggingRef.current = false;
      movedRef.current = 0;
      startPosRef.current = getPos(e);
      lastPointerRef.current = getPos(e);
      activePointerRef.current = e.pointerId;
    };
    const onMove = (e: PointerEvent) => {
      if (!pressedRef.current) return;
      const pos = getPos(e);

      // Promote to a real drag only after crossing the threshold.
      if (!draggingRef.current) {
        if (Math.abs(pos - startPosRef.current) < DRAG_THRESHOLD) return;
        draggingRef.current = true;
        track.setPointerCapture?.(e.pointerId);
      }

      const delta = pos - lastPointerRef.current;
      lastPointerRef.current = pos;
      movedRef.current += Math.abs(delta);
      offsetRef.current = wrap(offsetRef.current + delta);
      apply();
    };
    const onUp = (e: PointerEvent) => {
      pressedRef.current = false;
      if (draggingRef.current) {
        track.releasePointerCapture?.(e.pointerId);
      }
      // Defer clearing the drag flag so onClickCapture (which fires right
      // after pointerup) can still see that this was a drag.
      const wasDrag = draggingRef.current;
      draggingRef.current = false;
      if (!wasDrag) movedRef.current = 0;
    };

    // Suppress click navigation only if this was an actual drag.
    const onClickCapture = (e: MouseEvent) => {
      if (movedRef.current > DRAG_THRESHOLD) {
        e.preventDefault();
        e.stopPropagation();
        movedRef.current = 0;
      }
    };

    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => (pausedRef.current = false);

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    track.addEventListener("click", onClickCapture, true);
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      track.removeEventListener("click", onClickCapture, true);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
    };
  }, [isVertical, reverse, speed]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className={`${trackClassName} cursor-grab active:cursor-grabbing select-none`}
        style={{
          // Horizontal strips: let vertical page-scroll through, capture
          // horizontal drags. Vertical columns: capture all (desktop mouse).
          touchAction: isVertical ? "pan-x" : "pan-y",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Shared IntersectionObserver-driven video autoplay                  */
/*                                                                     */
/*  All registered videos share a single module-level observer:        */
/*  .play() when a tile scrolls into view, .pause() when it leaves.    */
/*  Videos should use preload="none" + a poster so nothing downloads   */
/*  or decodes until the tile is actually visible.                     */
/* ------------------------------------------------------------------ */

let sharedObserver: IntersectionObserver | null = null;
let reducedMotionQuery: MediaQueryList | null = null;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !("matchMedia" in window)) return true;
  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return reducedMotionQuery.matches;
}

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Autoplay can be blocked by the browser - ignore the rejection.
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
  }
  return sharedObserver;
}

/**
 * Returns a ref callback for a <video> element. The video plays only while
 * it intersects the viewport, and never autoplays when the user prefers
 * reduced motion (the poster stays in place instead).
 */
export default function useAutoplayInView<T extends HTMLVideoElement>() {
  const nodeRef = useRef<T | null>(null);

  return useCallback((node: T | null) => {
    const observer = getSharedObserver();
    if (nodeRef.current && observer) {
      observer.unobserve(nodeRef.current);
    }
    nodeRef.current = node;
    if (node && observer && !prefersReducedMotion()) {
      observer.observe(node);
    }
  }, []);
}

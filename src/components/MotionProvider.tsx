"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * MotionProvider -- mounts framer-motion's LazyMotion with the domAnimation
 * feature bundle so `m.` components animate without shipping the full
 * `motion` runtime in every route's First Load JS.
 *
 * domAnimation (not domMax) is sufficient: no component in src/ uses
 * framer drag, layout/layoutId, or Reorder. The hero wall / work marquee
 * drag-to-scrub interactions are custom pointer + rAF code, not framer.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

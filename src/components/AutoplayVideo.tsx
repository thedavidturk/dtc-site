"use client";

import type { VideoHTMLAttributes } from "react";
import useAutoplayInView from "./useAutoplayInView";

type AutoplayVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay"
>;

/**
 * Lazy-autoplay <video> built on the shared useAutoplayInView observer.
 *
 * - Plays only while intersecting the viewport, pauses on exit.
 * - Never autoplays under prefers-reduced-motion (the poster stays put).
 * - Defaults: muted, loop, playsInline. With a poster it defaults to
 *   preload="none" (nothing downloads until visible); without one it falls
 *   back to preload="metadata" so the first frame paints instead of a
 *   blank box.
 *
 * Being a component (rather than a bare hook) lets mapped JSX cells adopt
 * the hook without hook-in-loop violations.
 */
export default function AutoplayVideo({
  muted = true,
  loop = true,
  playsInline = true,
  preload,
  poster,
  children,
  ...rest
}: AutoplayVideoProps) {
  const videoRef = useAutoplayInView<HTMLVideoElement>();

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload={preload ?? (poster ? "none" : "metadata")}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      {...rest}
    >
      {children}
    </video>
  );
}

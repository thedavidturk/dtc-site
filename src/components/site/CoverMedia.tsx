"use client";

import { useState } from "react";
import Image from "next/image";
import useAutoplayInView from "@/components/useAutoplayInView";

/**
 * A card's media: the still paints first; an optional loop fades in over
 * it and plays only while on screen. Reduced-motion visitors keep the still.
 */
export default function CoverMedia({
  still,
  loop,
  alt,
  sizes,
  priority = false,
}: {
  still?: string;
  loop?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const videoRef = useAutoplayInView<HTMLVideoElement>();
  const [playing, setPlaying] = useState(false);

  return (
    <>
      {still && (
        <Image
          src={still}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
      {loop && (
        <video
          ref={videoRef}
          src={loop}
          poster={still}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-prism ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
}

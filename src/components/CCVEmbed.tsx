"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * CCVEmbed -- click-to-load wrapper for Adobe CCV (Creative Cloud
 * Video) project embeds.
 *
 * The CCV player ships roughly 826KB of player JS the instant its
 * iframe mounts, regardless of the `lazyLoading=true` query param
 * (that flag is internal to the player, not a browser lazy-load
 * signal). Every project page previously rendered the iframe directly
 * inside a whileInView-animated wrapper, but whileInView only
 * animates opacity -- the iframe itself was always in the DOM and
 * fetching from first paint.
 *
 * Here the iframe is withheld entirely until the visitor clicks play:
 * a still from the project's own gallery stands in as the poster with
 * the site's established click-to-play affordance (see
 * HeroVideo.tsx's play button). Pages with no spare still to reuse as
 * a poster should pass no `poster` prop; the component then falls
 * back to mounting the iframe directly with native `loading="lazy"`
 * instead of inventing artwork.
 *
 * The embed URL is built from the same three parts every project page
 * already used (bgcolor, lazyLoading, api_key) and is never altered.
 */
interface CCVEmbedProps {
  videoId: string;
  title: string;
  /** Hex color (no '#') matching each page's original bgcolor param. */
  bgcolor?: string;
  /** Matches each page's original iframe `allow` attribute. */
  allow?: string;
  /** Existing project image reused as the poster. Omit to fall back
   *  to a directly-mounted, natively lazy iframe. */
  poster?: string;
  posterAlt?: string;
  className?: string;
}

const DEFAULT_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

export default function CCVEmbed({
  videoId,
  title,
  bgcolor = "120D1A",
  allow = DEFAULT_ALLOW,
  poster,
  posterAlt,
  className = "",
}: CCVEmbedProps) {
  const [loaded, setLoaded] = useState(!poster);

  const src = `https://www-ccv.adobe.io/v1/player/ccv/${videoId}/embed?bgcolor=%23${bgcolor}&lazyLoading=true&api_key=BehancePro2View`;

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className={`group/play absolute inset-0 h-full w-full cursor-pointer ${className}`}
        aria-label={`Play ${title}`}
      >
        <Image
          src={poster as string}
          alt={posterAlt || title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-[5px] border border-bone bg-transparent text-bone transition-colors duration-500 ease-prism group-hover/play:bg-bone group-hover/play:text-obsidian md:h-20 md:w-20">
            <svg
              className="ml-1 h-7 w-7 md:h-8 md:w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
    );
  }

  return (
    <iframe
      src={src}
      title={title}
      allow={allow}
      allowFullScreen
      loading={poster ? undefined : "lazy"}
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
